import React, { useState } from "react";
import { Search, MoreHorizontal, Eye, Edit, Trash2, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  name: string;
  email: string;
  subscription: "free" | "premium";
  status: "active" | "inactive" | "suspended";
  joinDate: string;
  lastActive: string;
}

const UserTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock user data
  const users: User[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      subscription: "premium",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2 hours ago",
    },
    {
      id: "2",
      name: "Mike Chen",
      email: "mike.chen@email.com",
      subscription: "free",
      status: "active",
      joinDate: "2024-02-20",
      lastActive: "1 day ago",
    },
    {
      id: "3",
      name: "Emma Wilson",
      email: "emma.wilson@email.com",
      subscription: "premium",
      status: "active",
      joinDate: "2024-01-08",
      lastActive: "30 minutes ago",
    },
    {
      id: "4",
      name: "David Brown",
      email: "david.brown@email.com",
      subscription: "free",
      status: "inactive",
      joinDate: "2024-03-05",
      lastActive: "1 week ago",
    },
    {
      id: "5",
      name: "Lisa Garcia",
      email: "lisa.garcia@email.com",
      subscription: "premium",
      status: "active",
      joinDate: "2024-02-12",
      lastActive: "5 minutes ago",
    },
    {
      id: "6",
      name: "John Smith",
      email: "john.smith@email.com",
      subscription: "free",
      status: "suspended",
      joinDate: "2024-03-20",
      lastActive: "3 days ago",
    },
    {
      id: "7",
      name: "Anna Martinez",
      email: "anna.martinez@email.com",
      subscription: "premium",
      status: "active",
      joinDate: "2024-01-25",
      lastActive: "1 hour ago",
    },
    {
      id: "8",
      name: "Tom Anderson",
      email: "tom.anderson@email.com",
      subscription: "free",
      status: "active",
      joinDate: "2024-03-10",
      lastActive: "4 hours ago",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>;
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300">Inactive</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Suspended</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getSubscriptionBadge = (subscription: User["subscription"]) => {
    return subscription === "premium" ? (
      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
        <Crown className="w-3 h-3 mr-1" />
        Premium
      </Badge>
    ) : (
      <Badge variant="outline">Free</Badge>
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Add User
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getSubscriptionBadge(user.subscription)}</TableCell>
                <TableCell>{getStatusBadge(user.status)}</TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {new Date(user.joinDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-gray-600 dark:text-gray-400">
                  {user.lastActive}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit User
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredUsers.length} of {users.length} users
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
