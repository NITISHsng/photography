import React, { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Shield,
  Clock,
  MapPin,
  Phone,
  Mail,
  Star,
  TrendingUp,
  X,
  ShieldUser,
  ShieldCheck,
  History,
  Delete,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";
import { permissionsList } from "@/contexts/fromData";
import { useAppContext } from "@/contexts/AppContext";
import { Staff, PaymentDetails } from "@/contexts/fromType";
import { generateMemberClientId } from "@/contexts/fromData";
export interface AppContextType {
  staffs: Staff[];
}

const Operator: React.FC = () => {
  const { staffs } = useAppContext() as unknown as AppContextType;

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStaff, setselectedStaff] = useState<Staff>();


  const filteredOperators = staffs.filter((operator) => {
    const matchesSearch =
      operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      operator.email.toLowerCase().includes(searchTerm.toLowerCase());
    //  ||
    // operator.staffId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" || operator.status === statusFilter;
    const matchesRole =
      roleFilter === "" ||
      operator.role.toLowerCase().includes(roleFilter.toLowerCase());
    const matchesLocation =
      locationFilter === "" || operator.location === locationFilter;

    return matchesSearch && matchesStatus && matchesRole && matchesLocation;
  });

  // const getPermissionColor = (permission: string) => {
  //   const perm = permissionsList.find((p) => p.id === permission);
  //   return perm ? perm.color : "gray";
  // };

  // const getPermissionName = (permission: string) => {
  //   const perm = permissionsList.find((p) => p.id === permission);
  //   return perm ? perm.name : permission;
  // };

  const stats = {
    total: staffs.length,
    active: staffs.filter((o) => o.status === "active").length,
  };

  // Working action handlers
  const handleAddOperator = () => {
    setShowAddModal(true);
  };

  const handleAddPayment = (operator: Staff) => {
    setselectedStaff(operator);
    setShowPaymentModal(true);
  };

  const [showpaymentHistory, setShowpaymentHistory] = useState(false);
  const handleViewHistory = (operator: Staff) => {
    setselectedStaff(operator);
    setShowpaymentHistory(true);
  };

  // Edit operator handler
  const handleEditOperator = (operator: Staff) => {
    // setselectedStaff({...operator});
    setselectedStaff(operator);
    setShowEditModal(true);
  };

  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    paymentId: "",
    paymentType: "",
    description: "",
    type: "salary",
    createAt: new Date(),
  });

  const handleChangePayment = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setPaymentDetails((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const [staffData, setStaffData] = useState<Staff>({
    staffId: "",
    name: "",
    role: "",
    email: "",
    phone: "",
    location: "",
    pincode: "",
    status: "active",
    rating: 0,
    joinDate: new Date().toISOString(),
    lastLogin: "",
    permissions: [],
    tasksCompleted: 0,
    efficiency: 0,
    avatar: "",
    address: "",
    emergencyContact: "",
    department: "",
    workingHours: "",
    skills: [],
    password: "password",
    paymentHistory: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox") {
      setStaffData((prev) => ({
        ...prev,
        permissions: checked
          ? [...prev.permissions, value]
          : prev.permissions.filter((perm) => perm !== value),
      }));
    } else {
      setStaffData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle changes in edit form
  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    if (type === "checkbox" && selectedStaff) {
      setselectedStaff({
        ...selectedStaff,
        permissions: checked
          ? [...selectedStaff.permissions, value]
          : selectedStaff.permissions.filter((perm) => perm !== value),
      });
    } else if (selectedStaff) {
      setselectedStaff({
        ...selectedStaff,
        [name]: value,
      });
    }
  };

  const handeleAddStaff = async () => {
    if (staffData.role === "admin") {
      staffData.staffId = generateMemberClientId(staffData.name, "admin");
    } else if (staffData.role === "operator") {
      staffData.staffId = generateMemberClientId(staffData.name, "operator");
    } else {
      return;
    }

    try {
      const res = await fetch("/api/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(staffData),
      });

      if (!res.ok) throw new Error("Failed to add staff");
      // setLoading(false);
      // const result = await res.json();
      // setSaveSuccessfully(true);
      toast.success("Operator Create Successfully!");
      // setTimeout(() => setSaveSuccessfully(false), 5000);

      // setShowAddForm(false);
      // setStaffForm(initialStaff);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add operator");
    }
    setShowAddModal(false);
  };

  // Handle update operator

  const callRoute = async () => {
    try {
      const res = await fetch("/api/staff", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedStaff), // Send the updated staff data
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error saving payment:", data.error);
        return;
      }
      toast.success("Payment Added");
      setShowPaymentModal(false);
      console.log("Payment saved:", data);
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const handleUpdateOperator = async () => {
    callRoute();
  };

  const handleSavePayment = () => {
    if (selectedStaff) {
      const completePayment: PaymentDetails = {
        ...paymentDetails,
        staffId: selectedStaff.staffId,
        createdAt: new Date(),
      };
      selectedStaff.paymentHistory.push(completePayment);
    }
    callRoute();
  };

    const deleteOperator = async(staffId:string) => {
      try {
      const res = await fetch("/api/staff", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({staffId}), 
      });
      const data = await res.json();
      if (!res.ok) {
        console.error("Error saving payment:", data.error);
        return;
      }
      toast.success("Delete Successfully");
    } catch (err) {
      console.error("Request failed:", err);
    }
  };


  function getTotalAmount(allPayments: PaymentDetails[] = []): number {
    return allPayments.reduce((sum, payment) => sum + payment.amount, 0);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Operator Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage system operators and their permissions
            </p>
          </div>
          <button
            onClick={handleAddOperator}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Operator
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">
              {stats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Total Operators
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {stats.active}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Active Operators
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {/* {stats.avgEfficiency}% */}
              commin soon
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Avg Efficiency
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {/* {stats.totalTasks} */}
              comming soon
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Tasks Completed
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Overview */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Permission Categories
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {permissionsList.map((permission) => (
            <div
              key={permission.id}
              className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl text-center"
            >
              <div
                className={`w-8 h-8 bg-${permission.color}-500 rounded-full flex items-center justify-center mx-auto mb-2`}
              >
                <Shield className="h-4 w-4 text-white" />
              </div>
              <div className="text-xs font-medium text-gray-800 dark:text-white">
                {permission.name}
              </div>
            </div>
          ))}
        </div>
      </div>

{/* Filters */}
<div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    {/* Search */}
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      <input
        type="text"
        placeholder="Search operators..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>

    {/* Status */}
    <select
      value={statusFilter}
      onChange={(e) => setStatusFilter(e.target.value)}
      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    >
      <option value="">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>

    {/* Role */}
    <select
      value={roleFilter}
      onChange={(e) => setRoleFilter(e.target.value)}
      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    >
      <option value="">All Roles</option>
      <option value="admin">Admin</option>
      <option value="operator">Operator</option>
      <option value="senior">Senior Operator</option>
      <option value="booking">Booking Operator</option>
      <option value="equipment">Equipment Operator</option>
      <option value="coordinator">Team Coordinator</option>
    </select>

    {/* Location as input */}
    <input
      type="text"
      placeholder="Enter location..."
      value={locationFilter}
      onChange={(e) => setLocationFilter(e.target.value)}
      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
    />

    {/* Clear Filters */}
    <button
      onClick={() => {
        setSearchTerm("");
        setStatusFilter("");
        setRoleFilter("");
        setLocationFilter("");
      }}
      className="inline-flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200"
    >
      <Filter className="h-5 w-5 mr-2" />
      Clear Filters
    </button>
  </div>
</div>


      {/* Operators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredOperators.map((operator, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300"
          >
            {/* Operator Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {/* <img
                  src={operator.avatar}
                  alt={operator.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-700"
                /> */}

                {operator.role === "admin" ? (
                  <ShieldUser className="h-8 w-8 text-blue-400" />
                ) : (
                  <ShieldCheck className="h-8 w-8 text-blue-800" />
                )}
                <div>
                  <h3 className="text-sm font-medium">
                    {operator.name
                      ? operator.name.charAt(0).toUpperCase() +
                        operator.name.slice(1).toLowerCase()
                      : ""}
                  </h3>
                  <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400">
                    {/* <UserCheck className="h-4 w-4" /> */}
                    <span className="text-sm font-medium">
                      {operator.role
                        ? operator.role.charAt(0).toUpperCase() +
                          operator.role.slice(1).toLowerCase()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  operator.status === "active"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                {operator.status}
              </span>
            </div>

            {/* Operator Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  ID:{" "}
                  {operator.role === "admin"
                    ? operator.staffId
                    : operator.staffId}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {operator.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>
                  {operator.location} - {operator.pincode}
                </span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4" />
                <span className="truncate">{operator.email}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4" />
                <span>{operator.phone}</span>
              </div>
            </div>

            {/* Total Payment */}
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-green-800 dark:text-green-300">
                  Total Payment
                </span>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+5%</span>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">
                {getTotalAmount(operator.paymentHistory)}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                All time earnings
              </div>
            </div>
            {/* Permissions */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Permissions
              </div>
              {/* <div className="flex flex-wrap gap-1">
                {operator.permissions.map((permission, index) => (
                  <span key={index} className={`px-2 py-1 bg-${getPermissionColor(permission)}-100 dark:bg-${getPermissionColor(permission)}-900/20 text-${getPermissionColor(permission)}-800 dark:text-${getPermissionColor(permission)}-300 text-xs rounded-full`}>
                    {getPermissionName(permission)}
                  </span>
                ))}
              </div> */}
            </div>

            {/* Performance Metrics */}
            <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 mb-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="text-sm text-indigo-800 dark:text-indigo-300">
                    Tasks Completed
                  </div>
                  <div className="text-base lg:text-lg font-bold text-gray-800 dark:text-white">
                    {operator.tasksCompleted}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-indigo-800 dark:text-indigo-300">
                    Efficiency
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="text-base lg:text-lg font-bold text-gray-800 dark:text-white">
                      {operator.efficiency}%
                    </div>
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Last Activity */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4" />
                <span>Last login: {operator.lastLogin}</span>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
              <button
                onClick={() => handleAddPayment(operator)}
                className="flex-1 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                {/* <DollarSign className="h-4 w-4" /> */}
                <span>Add Payment</span>
              </button>
              <button
                onClick={() => handleViewHistory(operator)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </button>
            </div>
            {/* Actions */}
            <div className="flex flex-col my-3 sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={() => handleEditOperator(operator)}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
              <button
              onClick={() => deleteOperator(operator.staffId)}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
                <Delete className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              {/* <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Joined: {operator.joinDate}</span>
                <span>Permissions: {operator.permissions.length}</span>
              </div> */}
            </div>
          </div>
        ))}
      </div>

      {/* Add Operator Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Add New Staff
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={staffData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={staffData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={staffData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Role *
                </label>
                <select
                  name="role"
                  value={staffData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select Role</option>
                  <option value="admin">admin</option>
                  <option value="operator">Operator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location *
                </label>
                <input
                  type="text"
                  name="location"
                  value={staffData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={staffData.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={staffData.department}
                  onChange={handleChange}
                  placeholder="Enter department"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Working Hours
                </label>
                <input
                  type="text"
                  name="workingHours"
                  value={staffData.workingHours}
                  onChange={handleChange}
                  placeholder="e.g., 9 AM - 6 PM"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={staffData.address}
                  onChange={handleChange}
                  placeholder="Enter full address"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Emergency Contact
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={staffData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Emergency contact number"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Permissions *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {permissionsList.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={permission.id}
                        checked={staffData.permissions.includes(
                          permission.id
                        )}
                        onChange={handleChange}
                        className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300 font-medium">
                        {permission.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handeleAddStaff}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
              >
                Add Staff
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedStaff && (
        <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Add Payment
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Staff Info */}
            <div className="mb-4">
              <div className="text-sm flex justify-between text-gray-600 dark:text-gray-300 mb-2">
                <span>Staff: {selectedStaff.name}</span>
                {/* </div> */}
                {/* <div className="text-sm text-gray-600 dark:text-gray-300 mb-4"> */}
                <span>ID: {selectedStaff.staffId}</span>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4 mb-6">
              <input
                type="number"
                name="amount"
                value={paymentDetails.amount}
                onChange={handleChangePayment}
                placeholder="Amount (₹)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              <input
                type="text"
                name="paymentId"
                value={paymentDetails.paymentId}
                onChange={handleChangePayment}
                placeholder="Transaction ID"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                name="description"
                value={paymentDetails.description}
                onChange={handleChangePayment}
                placeholder="Description"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />

              {/* Payment Category (salary/bonus/etc.) */}
              <select
                name="type"
                value={paymentDetails.type}
                onChange={handleChangePayment}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Category</option>
                <option value="salary">Monthly Salary</option>
                <option value="bonus">Performance Bonus</option>
                <option value="overtime">Overtime Payment</option>
                <option value="allowance">Allowance</option>
              </select>

              {/* Payment Method (e.g., Cash/Bank/UPI) */}
              <select
                name="paymentType"
                value={paymentDetails.paymentType}
                onChange={handleChangePayment}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select Payment Method</option>
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="upi">UPI</option>
                <option value="cheque">Cheque</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSavePayment()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200"
              >
                Add Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {showpaymentHistory && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                Payment History
              </h3>
              <button
                onClick={() => setShowpaymentHistory(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {selectedStaff?.paymentHistory?.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                  No payments recorded yet.
                </p>
              ) : (
                <div className="space-y-4">
                  {selectedStaff?.paymentHistory.map((payment, index) => (
                    <div
                      key={payment.paymentId || index}
                      className="p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold text-green-600 dark:text-green-400">
                          ₹{payment.amount}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(payment.createdAt).toLocaleDateString()}{" "}
                          {new Date(payment.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                        <span className="capitalize">{payment.paymentId}</span>
                        <span className="italic">{payment.paymentType}</span>
                      </div>

                      {payment.description && (
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {payment.description}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total */}
            <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
              <div className="text-lg font-bold text-gray-800 dark:text-white flex justify-between">
                <span>Total Amount:</span>
                <span className="text-green-600 dark:text-green-400">
                  ₹{getTotalAmount(selectedStaff?.paymentHistory || [])}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Operator Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-lg max-h-[90vh] flex flex-col">
            <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {/* Edit Operator - {selectedStaff.name} */}
                  </h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Form Content */}
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={selectedStaff?.name}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={selectedStaff?.email}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={selectedStaff?.phone}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Role
                      </label>
                      <select
                        name="role"
                        value={selectedStaff?.role}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="admin">Admin</option>
                        <option value="operator">Operator</option>
                        <option value="senior">Senior Operator</option>
                        <option value="booking">Booking Operator</option>
                        <option value="equipment">Equipment Operator</option>
                        <option value="coordinator">Team Coordinator</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={selectedStaff?.location}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        name="status"
                        value={selectedStaff?.status}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Address
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={selectedStaff?.address}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Pincode
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        value={selectedStaff?.pincode}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Permissions
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {permissionsList.map((permission) => (
                        <div key={permission.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`edit-${permission.id}`}
                            name="permissions"
                            value={permission.id}
                            checked={selectedStaff?.permissions.includes(
                              permission.id
                            )}
                            onChange={handleEditChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <label
                            htmlFor={`edit-${permission.id}`}
                            className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                          >
                            {permission.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with buttons */}
                <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-end space-x-3">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpdateOperator}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <Save className="h-4 w-4 inline mr-1" />
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operator;
