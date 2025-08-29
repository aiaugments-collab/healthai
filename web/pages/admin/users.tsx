import React from "react";
import Head from "next/head";
import { Users, UserPlus, UserCheck, UserX } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import UserTable from "@/components/admin/UserTable";

const UsersPage = () => {
  const userStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12% from last month",
      changeType: "positive" as const,
      icon: Users,
      description: "All registered users",
    },
    {
      title: "New Users",
      value: "234",
      change: "This month",
      changeType: "neutral" as const,
      icon: UserPlus,
      description: "New registrations",
    },
    {
      title: "Active Users",
      value: "2,103",
      change: "+5% from last week",
      changeType: "positive" as const,
      icon: UserCheck,
      description: "Active in last 30 days",
    },
    {
      title: "Inactive Users",
      value: "744",
      change: "-2% from last month",
      changeType: "positive" as const,
      icon: UserX,
      description: "Inactive users",
    },
  ];

  return (
    <>
      <Head>
        <title>User Management - Health AI Admin</title>
      </Head>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage and monitor all Health AI users
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => (
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

          {/* User Table */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                All Users
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                View and manage user accounts, subscriptions, and activity
              </p>
            </div>
            <UserTable />
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default UsersPage;
