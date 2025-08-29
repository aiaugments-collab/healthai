import React from "react";
import Head from "next/head";
import { Users, CreditCard, TrendingUp, Activity } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  // Mock data
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users,
      description: "Active registered users",
    },
    {
      title: "Premium Subscribers",
      value: "1,234",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: CreditCard,
      description: "Paid subscription users",
    },
    {
      title: "Monthly Revenue",
      value: "$24,680",
      change: "+15% from last month",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Total recurring revenue",
    },
    {
      title: "Active Sessions",
      value: "847",
      change: "Currently online",
      changeType: "neutral" as const,
      icon: Activity,
      description: "Users online right now",
    },
  ];

  const recentActivity = [
    { user: "Sarah Johnson", action: "Upgraded to Premium", time: "2 minutes ago" },
    { user: "Mike Chen", action: "Created new account", time: "5 minutes ago" },
    { user: "Emma Wilson", action: "Logged medication reminder", time: "8 minutes ago" },
    { user: "David Brown", action: "Scheduled appointment", time: "12 minutes ago" },
    { user: "Lisa Garcia", action: "Updated health profile", time: "15 minutes ago" },
  ];

  const quickActions = [
    { label: "Add New User", action: () => console.log("Add user") },
    { label: "Send Notification", action: () => console.log("Send notification") },
    { label: "Export Data", action: () => console.log("Export data") },
    { label: "System Settings", action: () => console.log("Settings") },
  ];

  return (
    <>
      <Head>
        <title>Admin Dashboard - Health AI</title>
      </Head>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Welcome back! Here&apos;s what&apos;s happening with Health AI today.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Generate Report
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                description={stat.description}
              />
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {activity.action}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={action.action}
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium text-gray-900 dark:text-white">API Status</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Operational</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium text-gray-900 dark:text-white">Database</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Healthy</p>
                </div>
                <div className="text-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
                  <p className="font-medium text-gray-900 dark:text-white">AI Service</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Maintenance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
};

export default AdminDashboard;
