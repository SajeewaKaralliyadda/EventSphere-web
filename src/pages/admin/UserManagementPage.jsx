import { useState, useEffect } from "react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";
import { formatDate } from "../../utils/helpers";
import { USER_ROLES } from "../../utils/constants";

const UserManagementPage = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [userActivity, setUserActivity] = useState([]);

  // Mock users data
  const getMockUsers = () => [
    {
      id: "usr001",
      name: "Kasun Perera",
      email: "kasun.perera@university.ac.lk",
      studentId: "ENG/2021/001",
      role: USER_ROLES.ORGANIZER,
      status: "active",
      faculty: "Engineering",
      joinedDate: "2023-09-01",
      lastLogin: "2024-01-15 10:30:00",
      eventsCreated: 12,
      totalBookings: 0,
      revenueGenerated: 1250000,
    },
    {
      id: "usr002",
      name: "Nimali Fernando",
      email: "nimali.fernando@university.ac.lk",
      studentId: "ART/2021/045",
      role: USER_ROLES.ORGANIZER,
      status: "active",
      faculty: "Arts",
      joinedDate: "2023-09-01",
      lastLogin: "2024-01-15 09:15:00",
      eventsCreated: 8,
      totalBookings: 0,
      revenueGenerated: 890000,
    },
    {
      id: "usr003",
      name: "Amal Silva",
      email: "amal.silva@university.ac.lk",
      studentId: "ENG/2021/089",
      role: USER_ROLES.STUDENT,
      status: "active",
      faculty: "Engineering",
      joinedDate: "2023-10-15",
      lastLogin: "2024-01-15 11:45:00",
      eventsCreated: 0,
      totalBookings: 15,
      totalSpent: 18750,
    },
    {
      id: "usr004",
      name: "Thilini Jayasinghe",
      email: "thilini.j@university.ac.lk",
      studentId: "SCI/2021/112",
      role: USER_ROLES.STUDENT,
      status: "active",
      faculty: "Science",
      joinedDate: "2023-10-20",
      lastLogin: "2024-01-15 08:20:00",
      eventsCreated: 0,
      totalBookings: 22,
      totalSpent: 29500,
    },
    {
      id: "usr005",
      name: "Dhanushka Wickramasinghe",
      email: "dhanushka.w@university.ac.lk",
      studentId: "BUS/2021/156",
      role: USER_ROLES.STUDENT,
      status: "suspended",
      faculty: "Business",
      joinedDate: "2023-11-01",
      lastLogin: "2024-01-10 15:30:00",
      eventsCreated: 0,
      totalBookings: 8,
      totalSpent: 12000,
      suspensionReason: "Multiple booking cancellations and policy violations",
    },
    {
      id: "usr006",
      name: "Sachini Liyanage",
      email: "sachini.l@university.ac.lk",
      studentId: "ENG/2022/034",
      role: USER_ROLES.STUDENT,
      status: "active",
      faculty: "Engineering",
      joinedDate: "2024-01-05",
      lastLogin: "2024-01-15 12:00:00",
      eventsCreated: 0,
      totalBookings: 3,
      totalSpent: 4500,
    },
    {
      id: "usr007",
      name: "Admin User",
      email: "admin@university.ac.lk",
      studentId: "ADMIN/001",
      role: USER_ROLES.ADMIN,
      status: "active",
      faculty: "Administration",
      joinedDate: "2023-08-01",
      lastLogin: "2024-01-15 13:00:00",
      eventsCreated: 0,
      totalBookings: 0,
      eventsApproved: 298,
      eventsRejected: 32,
    },
  ];

  // Mock user activity
  const getMockActivity = (userId) => [
    {
      id: 1,
      action: "login",
      description: "Logged in successfully",
      timestamp: "2024-01-15 10:30:00",
      ipAddress: "192.168.1.100",
    },
    {
      id: 2,
      action: "event_created",
      description: 'Created event "Tech Innovation Summit 2024"',
      timestamp: "2024-01-15 10:35:00",
      ipAddress: "192.168.1.100",
    },
    {
      id: 3,
      action: "booking_made",
      description: 'Booked ticket for "Annual Cultural Night"',
      timestamp: "2024-01-14 15:20:00",
      ipAddress: "192.168.1.105",
    },
    {
      id: 4,
      action: "profile_updated",
      description: "Updated profile information",
      timestamp: "2024-01-13 09:10:00",
      ipAddress: "192.168.1.100",
    },
    {
      id: 5,
      action: "login",
      description: "Logged in successfully",
      timestamp: "2024-01-13 09:00:00",
      ipAddress: "192.168.1.100",
    },
  ];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUsers(getMockUsers());
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterUsers = () => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.studentId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleViewActivity = (user) => {
    setSelectedUser(user);
    setUserActivity(getMockActivity(user.id));
    setShowActivityModal(true);
  };

  const handleChangeRole = async (newRole) => {
    if (
      !confirm(
        `Are you sure you want to change ${selectedUser.name}'s role to ${newRole}?`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, role: newRole } : user
      );

      setUsers(updatedUsers);
      setSelectedUser({ ...selectedUser, role: newRole });
    } catch (error) {
      console.error("Error changing role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    const newStatus = selectedUser.status === "active" ? "suspended" : "active";
    const action = newStatus === "suspended" ? "suspend" : "activate";

    if (
      !confirm(
        `Are you sure you want to ${action} ${selectedUser.name}'s account?`
      )
    ) {
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, status: newStatus } : user
      );

      setUsers(updatedUsers);
      setSelectedUser({ ...selectedUser, status: newStatus });
    } catch (error) {
      console.error("Error toggling status:", error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      [USER_ROLES.STUDENT]: "bg-blue-100 text-blue-800",
      [USER_ROLES.ORGANIZER]: "bg-purple-100 text-purple-800",
      [USER_ROLES.ADMIN]: "bg-red-100 text-red-800",
    };
    return styles[role] || "bg-gray-100 text-gray-800";
  };

  const getStatusBadge = (status) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const filteredUsers = filterUsers();
  const stats = {
    total: users.length,
    students: users.filter((u) => u.role === USER_ROLES.STUDENT).length,
    organizers: users.filter((u) => u.role === USER_ROLES.ORGANIZER).length,
    admins: users.filter((u) => u.role === USER_ROLES.ADMIN).length,
    active: users.filter((u) => u.status === "active").length,
    suspended: users.filter((u) => u.status === "suspended").length,
  };

  if (loading && users.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-gray-600">
          Manage user accounts, roles, and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600">Total Users</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {stats.students}
            </div>
            <div className="text-sm text-gray-600">Students</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              {stats.organizers}
            </div>
            <div className="text-sm text-gray-600">Organizers</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {stats.admins}
            </div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </Card>
        <Card>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {stats.suspended}
            </div>
            <div className="text-sm text-gray-600">Suspended</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name, email, or student ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value={USER_ROLES.STUDENT}>Student</option>
              <option value={USER_ROLES.ORGANIZER}>Organizer</option>
              <option value={USER_ROLES.ADMIN}>Admin</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Faculty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No users found matching your filters
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <span className="text-primary-600 font-semibold">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                          <div className="text-xs text-gray-400">
                            {user.studentId}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getRoleBadge(
                          user.role
                        )}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.faculty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.lastLogin)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleViewUser(user)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleViewActivity(user)}
                      >
                        Activity
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* User Details Modal */}
      <Modal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        title="User Details"
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 bg-primary-100 rounded-full flex items-center justify-center">
                <span className="text-primary-600 font-bold text-2xl">
                  {selectedUser.name.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {selectedUser.name}
                </h3>
                <p className="text-gray-600">{selectedUser.email}</p>
                <p className="text-sm text-gray-500">
                  {selectedUser.studentId}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
              <div>
                <div className="text-sm text-gray-600">Role</div>
                <div className="font-medium text-gray-900">
                  {selectedUser.role}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Status</div>
                <div className="font-medium text-gray-900 capitalize">
                  {selectedUser.status}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Faculty</div>
                <div className="font-medium text-gray-900">
                  {selectedUser.faculty}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Joined Date</div>
                <div className="font-medium text-gray-900">
                  {formatDate(selectedUser.joinedDate)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Last Login</div>
                <div className="font-medium text-gray-900">
                  {formatDate(selectedUser.lastLogin)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600">
                  {selectedUser.role === USER_ROLES.ORGANIZER
                    ? "Events Created"
                    : selectedUser.role === USER_ROLES.ADMIN
                    ? "Events Approved"
                    : "Total Bookings"}
                </div>
                <div className="font-medium text-gray-900">
                  {selectedUser.role === USER_ROLES.ORGANIZER
                    ? selectedUser.eventsCreated
                    : selectedUser.role === USER_ROLES.ADMIN
                    ? selectedUser.eventsApproved
                    : selectedUser.totalBookings}
                </div>
              </div>
            </div>

            {/* Suspension Reason */}
            {selectedUser.status === "suspended" &&
              selectedUser.suspensionReason && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="text-sm font-medium text-red-800 mb-1">
                    Suspension Reason:
                  </div>
                  <div className="text-sm text-red-700">
                    {selectedUser.suspensionReason}
                  </div>
                </div>
              )}

            {/* Role Management */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Change Role
              </label>
              <div className="flex gap-2">
                {Object.values(USER_ROLES).map((role) => (
                  <Button
                    key={role}
                    size="sm"
                    variant={
                      selectedUser.role === role ? "primary" : "secondary"
                    }
                    onClick={() => handleChangeRole(role)}
                    disabled={selectedUser.role === role || loading}
                  >
                    {role}
                  </Button>
                ))}
              </div>
            </div>

            {/* Account Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={handleToggleStatus}
                disabled={loading}
                variant="secondary"
                className={
                  selectedUser.status === "active"
                    ? "text-red-600 hover:bg-red-50"
                    : "text-green-600 hover:bg-green-50"
                }
              >
                {loading
                  ? "Processing..."
                  : selectedUser.status === "active"
                  ? "Suspend Account"
                  : "Activate Account"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setShowUserModal(false);
                  handleViewActivity(selectedUser);
                }}
              >
                View Activity Log
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Activity Modal */}
      <Modal
        isOpen={showActivityModal}
        onClose={() => setShowActivityModal(false)}
        title={`Activity Log: ${selectedUser?.name}`}
      >
        <div className="space-y-3">
          {userActivity.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No activity recorded
            </div>
          ) : (
            userActivity.map((activity) => (
              <div
                key={activity.id}
                className="border-b border-gray-200 pb-3 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {formatDate(activity.timestamp)} • {activity.ipAddress}
                    </div>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-100 text-gray-800">
                    {activity.action.replace("_", " ")}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserManagementPage;
