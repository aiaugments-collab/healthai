import React, { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence } from "framer-motion";
import { chatWithHealthAI } from "@/lib/aiChat";
import { getMedicationRemindersByUser } from "@/lib/medications";
import { getAppointmentRemindersByUser } from "@/lib/appointmentReminders";
import { getHealthLogsByUser } from "@/lib/healthLogs";
import { toast } from "sonner";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import ChatHeader from "@/components/chat/ChatHeader";
import TypingIndicator from "@/components/chat/TypingIndicator";
import EmptyState from "@/components/chat/EmptyState";
import UpgradeModal from "@/components/subscription/UpgradeModal";

type Role = "user" | "model";

type ChatMessageType = {
  role: Role;
  text: string;
  timestamp?: Date;
};





// Been facing hydration issues for ages... So trying this workaround
// to ensure the component only mounts on the client side
// We don't need the entire chat to be server-rendered anyway...
const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <>{children}</>;
};

export default function AIChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [dailyMessageCount, setDailyMessageCount] = useState(3); // Mock: 3 out of 5 used
  const hasSentMessageRef = useRef(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const broadcastChannelRef = useRef<any>(null);

  useEffect(() => {
    async function checkUserAuth() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
      } else {
        setUserId(user.id);
      }
    }
    checkUserAuth();
  }, [router]);

  useEffect(() => {
    if (!userId) return;
    const stored = localStorage.getItem(`symptomSyncChat-${userId}`);
    if (stored) {
      try {
        setMessages(JSON.parse(stored));
      } catch {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    localStorage.setItem(`symptomSyncChat-${userId}`, JSON.stringify(messages));
    if (hasSentMessageRef.current) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, userId]);

  useEffect(() => {
    async function subscribeToUserChannel() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      const userChannelName = `user-channel-${user.id}`;
      broadcastChannelRef.current = supabase.channel(userChannelName, {
        config: { broadcast: { self: false } },
      });
      const channel = broadcastChannelRef.current;

      channel
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .on("broadcast", { event: "*" }, (payload: any) => {
          toast.success(
            `Notification: ${payload.payload.message.replace(/\./g, "")} from another device or tab.`,
          );
        })
        .subscribe((status: string) => {
          console.log("User-specific channel status:", status);
        });

      return () => {
        supabase.removeChannel(channel);
        broadcastChannelRef.current = null;
      };
    }

    subscribeToUserChannel();
  }, [router]);

  /**
   * This function handles sending the user's input to the AI and receiving a response
   *
   * @returns The AI's response to the user's input
   */
  async function handleSend() {
    if (!userInput.trim() || loading) return;
    
    // Mock: Check daily limit for free users
    if (dailyMessageCount >= 5) {
      setShowUpgradeModal(true);
      return;
    }
    
    setLoading(true);
    setDailyMessageCount(prev => prev + 1);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not logged in");

      const [meds, appts, logs] = await Promise.all([
        getMedicationRemindersByUser(user.id),
        getAppointmentRemindersByUser(user.id),
        getHealthLogsByUser(user.id),
      ]);

      let userDataSummary = `Appointments:\n`;
      if (appts.length === 0) {
        userDataSummary += `- None\n`;
      } else {
        appts.forEach((a) => {
          const dateString = new Date(a.date).toLocaleString();
          userDataSummary += `- ${a.appointment_name} on ${dateString}\n`;
        });
      }
      userDataSummary += `\nMedications:\n`;
      if (meds.length === 0) {
        userDataSummary += `- None\n`;
      } else {
        meds.forEach((m) => {
          userDataSummary += `- ${m.medication_name}, dosage: ${
            m.dosage ?? "N/A"
          }, next time: ${new Date(
            m.reminder_time,
          ).toLocaleString()}, recurrence: ${m.recurrence ?? "N/A"}\n`;
        });
      }
      userDataSummary += `\nRecent Health Logs:\n`;
      if (logs.length === 0) {
        userDataSummary += `- None\n`;
      } else {
        const recent = logs.slice(-3);
        recent.forEach((l) => {
          userDataSummary += `- Symptom: ${l.symptom_type ?? "N/A"}, severity: ${
            l.severity ?? 0
          }, start: ${new Date(l.start_date).toLocaleString()}\n`;
        });
      }

      const newUserMessage: ChatMessageType = { 
        role: "user", 
        text: userInput,
        timestamp: new Date()
      };

      const updatedMessages = [...messages, newUserMessage];
      setMessages(updatedMessages);
      hasSentMessageRef.current = true;

      const newHistory = updatedMessages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));
      if (newHistory.length === 0 || newHistory[0].role !== "user") {
        newHistory.splice(0, newHistory.length, {
          role: "user",
          parts: [{ text: userInput }],
        });
      }

      const aiResponse = await chatWithHealthAI(
        newHistory,
        userInput,
        undefined,
        userDataSummary,
      );

      setMessages((prev) => [...prev, { 
        role: "model", 
        text: aiResponse,
        timestamp: new Date()
      }]);
      setUserInput("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  /**
   * This function clears the chat messages in UI and local storage
   */
  const handleClear = () => {
    setMessages([]);
    if (userId) {
      localStorage.removeItem(`symptomSyncChat-${userId}`);
    }
    hasSentMessageRef.current = false;
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setUserInput(prompt);
  };

  const handleUpgrade = () => {
    setShowUpgradeModal(false);
    router.push('/pricing');
  };

  /**
   * Scroll to the bottom of the chat when new messages are added or on initial load
   * since the messages are loaded from local storage
   */
  useEffect(() => {
    if (messages.length > 0) {
      const timeout = setTimeout(() => {
        scrollRef.current?.scrollIntoView({ behavior: "auto" });
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [messages]);

  return (
    <>
      <Head>
        <title>Health AI | AI Assistant</title>
        <meta name="description" content="Chat with your intelligent Health AI Assistant" />
      </Head>

      <ClientOnly>
        <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex flex-col">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative flex flex-col h-full max-w-6xl mx-auto w-full">
            {/* Header */}
            <ChatHeader 
              onClearChat={handleClear}
              messageCount={messages.length}
              isOnline={true}
            />

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-hidden flex flex-col">
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
                {messages.length === 0 && !loading ? (
                  <EmptyState onSuggestedPrompt={handleSuggestedPrompt} />
                ) : (
                  <AnimatePresence initial={false}>
                    {messages.map((msg, idx) => (
                      <ChatMessage
                        key={idx}
                        role={msg.role}
                        text={msg.text}
                        timestamp={msg.timestamp}
                      />
                    ))}
                  </AnimatePresence>
                )}

                {loading && <TypingIndicator />}

                <div ref={scrollRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-4">
              <div className="max-w-4xl mx-auto">
                <ChatInput
                  value={userInput}
                  onChange={setUserInput}
                  onSend={handleSend}
                  disabled={loading}
                  placeholder="Ask me anything about your health..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Upgrade Modal */}
        <UpgradeModal
          isOpen={showUpgradeModal}
          onClose={() => setShowUpgradeModal(false)}
          onUpgrade={handleUpgrade}
          trigger="chat_limit"
        />
      </ClientOnly>
    </>
  );
}
