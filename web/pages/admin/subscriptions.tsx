import React from "react";
import Head from "next/head";
import { TrendingUp, DollarSign, Users, Crown, Calendar } from "lucide-react";
import AdminLayout from "@/components/admin/AdminLayout";
import StatsCard from "@/components/admin/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SubscriptionsPage = () => {
  const subscriptionStats = [
    {
      title: "Total Revenue",
      value: "$24,680",
      change: "+15% from last month",
      changeType: "positive" as const,
      icon: DollarSign,
      description: "Monthly recurring revenue",
    },
    {
      title: "Premium Users",
      value: "1,234",
      change: "+8% from last month",
      changeType: "positive" as const,
      icon: Crown,
      description: "Active premium subscribers",
    },
    {
      title: "Conversion Rate",
      value: "12.5%",
      change: "+2.1% from last month",
      changeType: "positive" as const,
      icon: TrendingUp,
      description: "Free to premium conversion",
    },
    {
      title: "Churn Rate",
      value: "3.2%",
      change: "-0.5% from last month",
      changeType: "positive" as const,
      icon: Users,
      description: "Monthly subscription cancellations",
    },
  ];

  const recentSubscriptions = [
    {
      id: "1",
      user: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      plan: "Premium Monthly",
      amount: "$19.99",
      status: "active",
      date: "2024-03-15",
    },
    {
      id: "2",
      user: "Mike Chen",
      email: "mike.chen@email.com",
      plan: "Premium Annual",
      amount: "$199.99",
      status: "active",
      date: "2024-03-14",
    },
    {
      id: "3",
      user: "Emma Wilson",
      email: "emma.wilson@email.com",
      plan: "Premium Monthly",
      amount: "$19.99",
      status: "cancelled",
      date: "2024-03-13",
    },
    {
      id: "4",
      user: "David Brown",
      email: "david.brown@email.com",
      plan: "Premium Annual",
      amount: "$199.99",
      status: "active",
      date: "2024-03-12",
    },
    {
      id: "5",
      user: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      plan: "Premium Monthly",
      amount: "$19.99",
      status: "pending",
      date: "2024-03-11",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Cancelled</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <>
      <Head>
        <title>Subscription Management - Health AI Admin</title>
      </Head>
      <AdminLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Subscription Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Monitor revenue, subscriptions, and billing analytics
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Calendar className="w-4 h-4 mr-2" />
                Revenue Report
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {subscriptionStats.map((stat, index) => (
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
            {/* Recent Subscriptions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentSubscriptions.map((subscription) => (
                      <TableRow key={subscription.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">
                              {subscription.user}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {subscription.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            <Crown className="w-3 h-3 mr-1" />
                            {subscription.plan}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {subscription.amount}
                        </TableCell>
                        <TableCell>{getStatusBadge(subscription.status)}</TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {new Date(subscription.date).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly Plans
                    </span>
                    <span className="font-medium">$15,680</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Annual Plans
                    </span>
                    <span className="font-medium">$9,000</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total Revenue</span>
                      <span className="font-bold text-lg">$24,680</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Plans */}
          <Card>
            <CardHeader>
              <CardTitle>Subscription Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Free Plan</h3>
                  <p className="text-3xl font-bold mb-2">$0</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    1,613 users
                  </p>
                  <Button variant="outline" className="w-full">
                    Manage
                  </Button>
                </div>
                <div className="text-center p-6 border rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <h3 className="font-semibold text-lg mb-2">Premium Monthly</h3>
                  <p className="text-3xl font-bold mb-2">$19.99</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    834 users
                  </p>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Manage
                  </Button>
                </div>
                <div className="text-center p-6 border rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Premium Annual</h3>
                  <p className="text-3xl font-bold mb-2">$199.99</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    400 users
                  </p>
                  <Button variant="outline" className="w-full">
                    Manage
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    </>
  );
};

export default SubscriptionsPage;
