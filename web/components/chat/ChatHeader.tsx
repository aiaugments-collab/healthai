import React from "react";
import { Bot, Trash2, Download, Settings, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  onClearChat: () => void;
  onExportChat?: () => void;
  onSettings?: () => void;
  messageCount: number;
  isOnline?: boolean;
}

export default function ChatHeader({ 
  onClearChat, 
  onExportChat, 
  onSettings, 
  messageCount,
  isOnline = true 
}: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      {/* AI Assistant Info */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          {/* Online Status Indicator */}
          <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-gray-800 ${
            isOnline ? 'bg-green-500' : 'bg-gray-400'
          }`} />
        </div>
        
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            HealthAI Enterprise Assistant
          </h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Activity className="w-3 h-3 text-green-500" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
            {messageCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {messageCount} messages
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {onExportChat && messageCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onExportChat}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Export conversation"
          >
            <Download className="w-4 h-4" />
          </Button>
        )}
        
        {onSettings && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onSettings}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </Button>
        )}

        {messageCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearChat}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="Clear conversation"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
