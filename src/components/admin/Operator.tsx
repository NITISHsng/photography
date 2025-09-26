// import React, { useState } from 'react';
// import { 
//   UserCheck, Search, Filter, Plus, Eye, Edit, 
//   Shield, Clock, MapPin, Phone, Mail, 
//   Star, TrendingUp, X, DollarSign, History
// } from 'lucide-react';

// const Operator: React.FC = () => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [statusFilter, setStatusFilter] = useState('');
//   const [roleFilter, setRoleFilter] = useState('');
//   const [locationFilter, setLocationFilter] = useState('');
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [selectedOperator, setSelectedOperator] = useState<any>(null);

//   // Mock operators data with enhanced information
//   const operators = [
//     {
//       id: 'OP001',
//       name: 'Vikram Singh',
//       role: 'Senior Operator',
//       email: 'vikram@capturevision.com',
//       phone: '+91 98765 43210',
//       location: 'Mumbai',
//       pincode: '400001',
//       status: 'active',
//       rating: 4.8,
//       joinDate: '2023-01-15',
//       lastLogin: '2024-01-19 14:30',
//       permissions: ['bookings', 'team', 'equipment'],
//       tasksCompleted: 156,
//       efficiency: 94,
//       totalPayment: 285000,
//       avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
//       address: '123 Business District, Mumbai',
//       emergencyContact: '+91 98765 43299',
//       department: 'Operations',
//       workingHours: '9 AM - 6 PM',
//       skills: ['Team Management', 'Project Coordination', 'Client Relations', 'Quality Control']
//     },
//     {
//       id: 'OP002',
//       name: 'Anita Sharma',
//       role: 'Booking Operator',
//       email: 'anita@capturevision.com',
//       phone: '+91 98765 43211',
//       location: 'Delhi',
//       pincode: '110001',
//       status: 'active',
//       rating: 4.9,
//       joinDate: '2023-02-20',
//       lastLogin: '2024-01-19 16:45',
//       permissions: ['bookings', 'clients'],
//       tasksCompleted: 203,
//       efficiency: 97,
//       totalPayment: 195000,
//       avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
//       address: '456 Central Delhi, Delhi',
//       emergencyContact: '+91 98765 43288',
//       department: 'Customer Service',
//       workingHours: '8 AM - 5 PM',
//       skills: ['Customer Service', 'Booking Management', 'Communication', 'Problem Solving']
//     },
//     {
//       id: 'OP003',
//       name: 'Rahul Patel',
//       role: 'Equipment Operator',
//       email: 'rahul@capturevision.com',
//       phone: '+91 98765 43212',
//       location: 'Bangalore',
//       pincode: '560001',
//       status: 'inactive',
//       rating: 4.6,
//       joinDate: '2023-03-10',
//       lastLogin: '2024-01-15 10:20',
//       permissions: ['equipment', 'inventory'],
//       tasksCompleted: 89,
//       efficiency: 88,
//       totalPayment: 165000,
//       avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
//       address: '789 Tech Park, Bangalore',
//       emergencyContact: '+91 98765 43277',
//       department: 'Equipment Management',
//       workingHours: '10 AM - 7 PM',
//       skills: ['Equipment Handling', 'Inventory Management', 'Technical Support', 'Maintenance']
//     },
//     {
//       id: 'OP004',
//       name: 'Meera Reddy',
//       role: 'Team Coordinator',
//       email: 'meera@capturevision.com',
//       phone: '+91 98765 43213',
//       location: 'Chennai',
//       pincode: '600001',
//       status: 'active',
//       rating: 4.7,
//       joinDate: '2023-04-05',
//       lastLogin: '2024-01-19 12:15',
//       permissions: ['team', 'scheduling'],
//       tasksCompleted: 134,
//       efficiency: 91,
//       totalPayment: 225000,
//       avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
//       address: '321 Marina Beach Road, Chennai',
//       emergencyContact: '+91 98765 43266',
//       department: 'Human Resources',
//       workingHours: '9 AM - 6 PM',
//       skills: ['Team Coordination', 'Scheduling', 'HR Management', 'Performance Tracking']
//     }
//   ];

//   const permissionsList = [
//     { id: 'bookings', name: 'Bookings Management', color: 'blue' },
//     { id: 'team', name: 'Team Management', color: 'purple' },
//     { id: 'equipment', name: 'Equipment Management', color: 'orange' },
//     { id: 'clients', name: 'Client Management', color: 'green' },
//     { id: 'inventory', name: 'Inventory Control', color: 'red' },
//     { id: 'scheduling', name: 'Scheduling', color: 'pink' }
//   ];

//   const filteredOperators = operators.filter(operator => {
//     const matchesSearch = 
//       operator.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       operator.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       operator.id.toLowerCase().includes(searchTerm.toLowerCase());
    
//     const matchesStatus = statusFilter === '' || operator.status === statusFilter;
//     const matchesRole = roleFilter === '' || operator.role.toLowerCase().includes(roleFilter.toLowerCase());
//     const matchesLocation = locationFilter === '' || operator.location === locationFilter;

//     return matchesSearch && matchesStatus && matchesRole && matchesLocation;
//   });

//   const getPermissionColor = (permission: string) => {
//     const perm = permissionsList.find(p => p.id === permission);
//     return perm ? perm.color : 'gray';
//   };

//   const getPermissionName = (permission: string) => {
//     const perm = permissionsList.find(p => p.id === permission);
//     return perm ? perm.name : permission;
//   };

//   const stats = {
//     total: operators.length,
//     active: operators.filter(o => o.status === 'active').length,
//     avgEfficiency: Math.round(operators.reduce((sum, o) => sum + o.efficiency, 0) / operators.length),
//     totalTasks: operators.reduce((sum, o) => sum + o.tasksCompleted, 0)
//   };

//   // Working action handlers
//   const handleAddOperator = () => {
//     setShowAddModal(true);
//   };

//   const handleAddPayment = (operator: any) => {
//     setSelectedOperator(operator);
//     setShowPaymentModal(true);
//   };

//   const handleViewHistory = (operatorId: string) => {
//     const operator = operators.find(o => o.id === operatorId);
//     if (operator) {
//       alert(`Payment History for ${operator.name}:\n\nJan 2024: ₹${(operator.totalPayment * 0.1).toLocaleString()}\nDec 2023: ₹${(operator.totalPayment * 0.09).toLocaleString()}\nNov 2023: ₹${(operator.totalPayment * 0.08).toLocaleString()}\nOct 2023: ₹${(operator.totalPayment * 0.07).toLocaleString()}\n\nTotal Payments: ₹${operator.totalPayment.toLocaleString()}`);
//       console.log(`View history for operator: ${operatorId}`, operator);
//     }
//   };

//   const handleSaveOperator = () => {
//     alert('New operator added successfully!\n\nOperator Details:\n- Name: New Operator\n- Role: Booking Operator\n- Location: Mumbai\n- Status: Active\n- ID: OP005');
//     console.log('Add new operator');
//     setShowAddModal(false);
//   };

//   const handleSavePayment = () => {
//     if (selectedOperator) {
//       alert(`Payment processed successfully for ${selectedOperator.name}!\n\nPayment Details:\n- Amount: ₹18,000\n- Type: Monthly Salary\n- Date: ${new Date().toLocaleDateString()}\n- Description: Monthly operator salary`);
//       console.log(`Add payment for operator: ${selectedOperator.id}`, selectedOperator);
//       setShowPaymentModal(false);
//       setSelectedOperator(null);
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
//         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
//               Operator Management
//             </h2>
//             <p className="text-gray-600 dark:text-gray-300">
//               Manage system operators and their permissions
//             </p>
//           </div>
//           <button 
//             onClick={handleAddOperator}
//             className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
//           >
//             <Plus className="h-5 w-5 mr-2" />
//             Add Operator
//           </button>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-indigo-600">{stats.total}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-300">Total Operators</div>
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-green-600">{stats.active}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-300">Active Operators</div>
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-blue-600">{stats.avgEfficiency}%</div>
//             <div className="text-sm text-gray-600 dark:text-gray-300">Avg Efficiency</div>
//           </div>
//         </div>
//         <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
//           <div className="text-center">
//             <div className="text-2xl font-bold text-purple-600">{stats.totalTasks}</div>
//             <div className="text-sm text-gray-600 dark:text-gray-300">Tasks Completed</div>
//           </div>
//         </div>
//       </div>

//       {/* Permissions Overview */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
//         <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Permission Categories</h3>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
//           {permissionsList.map((permission) => (
//             <div key={permission.id} className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl text-center">
//               <div className={`w-8 h-8 bg-${permission.color}-500 rounded-full flex items-center justify-center mx-auto mb-2`}>
//                 <Shield className="h-4 w-4 text-white" />
//               </div>
//               <div className="text-xs font-medium text-gray-800 dark:text-white">{permission.name}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Filters */}
//       <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search operators..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//             />
//           </div>
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//           >
//             <option value="">All Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//           <select
//             value={roleFilter}
//             onChange={(e) => setRoleFilter(e.target.value)}
//             className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//           >
//             <option value="">All Roles</option>
//             <option value="senior">Senior Operator</option>
//             <option value="booking">Booking Operator</option>
//             <option value="equipment">Equipment Operator</option>
//             <option value="coordinator">Team Coordinator</option>
//           </select>
//           <select
//             value={locationFilter}
//             onChange={(e) => setLocationFilter(e.target.value)}
//             className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//           >
//             <option value="">All Locations</option>
//             <option value="Mumbai">Mumbai</option>
//             <option value="Delhi">Delhi</option>
//             <option value="Bangalore">Bangalore</option>
//             <option value="Chennai">Chennai</option>
//           </select>
//           <button className="inline-flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200">
//             <Filter className="h-5 w-5 mr-2" />
//             More Filters
//           </button>
//         </div>
//       </div>

//       {/* Operators Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
//         {filteredOperators.map((operator) => (
//           <div key={operator.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
//             {/* Operator Header */}
//             <div className="flex items-start justify-between mb-4">
//               <div className="flex items-center space-x-3">
//                 <img
//                   src={operator.avatar}
//                   alt={operator.name}
//                   className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200 dark:border-indigo-700"
//                 />
//                 <div>
//                   <h3 className="font-bold text-lg text-gray-800 dark:text-white">{operator.name}</h3>
//                   <div className="flex items-center space-x-1 text-indigo-600 dark:text-indigo-400">
//                     <UserCheck className="h-4 w-4" />
//                     <span className="text-sm font-medium">{operator.role}</span>
//                   </div>
//                 </div>
//               </div>
//               <span className={`px-3 py-1 rounded-full text-xs font-medium ${
//                 operator.status === 'active' 
//                   ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
//                   : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
//               }`}>
//                 {operator.status}
//               </span>
//             </div>

//             {/* Operator Details */}
//             <div className="space-y-3 mb-4">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-600 dark:text-gray-300">ID: {operator.id}</span>
//                 <div className="flex items-center space-x-1">
//                   <Star className="h-4 w-4 text-yellow-400 fill-current" />
//                   <span className="text-sm font-medium text-gray-800 dark:text-white">{operator.rating}</span>
//                 </div>
//               </div>

//               <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//                 <MapPin className="h-4 w-4" />
//                 <span>{operator.location} - {operator.pincode}</span>
//               </div>

//               <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//                 <Mail className="h-4 w-4" />
//                 <span className="truncate">{operator.email}</span>
//               </div>

//               <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//                 <Phone className="h-4 w-4" />
//                 <span>{operator.phone}</span>
//               </div>
//             </div>

//             {/* Total Payment */}
//             <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-4">
//               <div className="flex items-center justify-between mb-1">
//                 <span className="text-sm font-medium text-green-800 dark:text-green-300">Total Payment</span>
//                 <div className="flex items-center space-x-1 text-green-600">
//                   <TrendingUp className="h-3 w-3" />
//                   <span className="text-xs">+5%</span>
//                 </div>
//               </div>
//               <div className="text-lg font-bold text-gray-800 dark:text-white">₹{operator.totalPayment.toLocaleString()}</div>
//               <div className="text-xs text-gray-500 dark:text-gray-400">All time earnings</div>
//             </div>

//             {/* Permissions */}
//             <div className="mb-4">
//               <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions</div>
//               <div className="flex flex-wrap gap-1">
//                 {operator.permissions.map((permission, index) => (
//                   <span key={index} className={`px-2 py-1 bg-${getPermissionColor(permission)}-100 dark:bg-${getPermissionColor(permission)}-900/20 text-${getPermissionColor(permission)}-800 dark:text-${getPermissionColor(permission)}-300 text-xs rounded-full`}>
//                     {getPermissionName(permission)}
//                   </span>
//                 ))}
//               </div>
//             </div>

//             {/* Performance Metrics */}
//             <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-3 mb-4">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div>
//                   <div className="text-sm text-indigo-800 dark:text-indigo-300">Tasks Completed</div>
//                   <div className="text-base lg:text-lg font-bold text-gray-800 dark:text-white">{operator.tasksCompleted}</div>
//                 </div>
//                 <div>
//                   <div className="text-sm text-indigo-800 dark:text-indigo-300">Efficiency</div>
//                   <div className="flex items-center space-x-1">
//                     <div className="text-base lg:text-lg font-bold text-gray-800 dark:text-white">{operator.efficiency}%</div>
//                     <TrendingUp className="h-3 w-3 text-green-500" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Last Activity */}
//             <div className="mb-4">
//               <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//                 <Clock className="h-4 w-4" />
//                 <span>Last login: {operator.lastLogin}</span>
//               </div>
//             </div>

//             {/* Actions */}
//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
//               <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
//                 <Eye className="h-4 w-4" />
//                 <span>View Details</span>
//               </button>
//               <button className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
//                 <Edit className="h-4 w-4" />
//                 <span>Edit</span>
//               </button>
//             </div>

//             {/* Payment Actions */}
//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-2">
//               <button 
//                 onClick={() => handleAddPayment(operator)}
//                 className="flex-1 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
//               >
//                 <DollarSign className="h-4 w-4" />
//                 <span>Add Payment</span>
//               </button>
//               <button 
//                 onClick={() => handleViewHistory(operator.id)}
//                 className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
//               >
//                 <History className="h-4 w-4" />
//                 <span>History</span>
//               </button>
//             </div>

//             {/* Additional Info */}
//             <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
//               <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
//                 <span>Joined: {operator.joinDate}</span>
//                 <span>Permissions: {operator.permissions.length}</span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Add Operator Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Operator</h3>
//               <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mb-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name *</label>
//                 <input
//                   type="text"
//                   placeholder="Enter full name"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
//                 <input
//                   type="email"
//                   placeholder="Enter email address"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number *</label>
//                 <input
//                   type="tel"
//                   placeholder="Enter phone number"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Role *</label>
//                 <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
//                   <option value="">Select Role</option>
//                   <option value="senior">Senior Operator</option>
//                   <option value="booking">Booking Operator</option>
//                   <option value="equipment">Equipment Operator</option>
//                   <option value="coordinator">Team Coordinator</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Location *</label>
//                 <input
//                   type="text"
//                   placeholder="Enter location"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pincode *</label>
//                 <input
//                   type="text"
//                   placeholder="Enter pincode"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Department</label>
//                 <input
//                   type="text"
//                   placeholder="Enter department"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Working Hours</label>
//                 <input
//                   type="text"
//                   placeholder="e.g., 9 AM - 6 PM"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
//                 <input
//                   type="text"
//                   placeholder="Enter full address"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Emergency Contact</label>
//                 <input
//                   type="tel"
//                   placeholder="Emergency contact number"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Initial Salary</label>
//                 <input
//                   type="number"
//                   placeholder="Enter monthly salary"
//                   className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//                 />
//               </div>
//             </div>

//             <div className="mb-6">
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Permissions *</label>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
//                 {permissionsList.map((permission) => (
//                   <label key={permission.id} className="flex items-center space-x-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
//                     />
//                     <span className="text-gray-700 dark:text-gray-300 font-medium">{permission.name}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>
            
//             <div className="flex space-x-4">
//               <button 
//                 onClick={() => setShowAddModal(false)}
//                 className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleSaveOperator}
//                 className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg transition-all duration-200"
//               >
//                 Add Operator
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Payment Modal */}
//       {showPaymentModal && selectedOperator && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add Payment</h3>
//               <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
//                 <X className="h-6 w-6" />
//               </button>
//             </div>
//             <div className="mb-4">
//               <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Operator: {selectedOperator.name}</div>
//               <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">ID: {selectedOperator.id}</div>
//             </div>
//             <div className="space-y-4 mb-6">
//               <input
//                 type="number"
//                 placeholder="Amount (₹)"
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               />
//               <input
//                 type="text"
//                 placeholder="Description"
//                 className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
//               />
//               <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
//                 <option value="">Payment Type</option>
//                 <option value="salary">Monthly Salary</option>
//                 <option value="bonus">Performance Bonus</option>
//                 <option value="overtime">Overtime Payment</option>
//                 <option value="allowance">Allowance</option>
//               </select>
//             </div>
//             <div className="flex space-x-4">
//               <button 
//                 onClick={() => setShowPaymentModal(false)}
//                 className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
//               >
//                 Cancel
//               </button>
//               <button 
//                 onClick={handleSavePayment}
//                 className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200"
//               >
//                 Add Payment
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Operator; 



// // import React from 'react';
// // import { UserCheck } from 'lucide-react';


// // const Operator: React.FC = () => {
// //   return (
// //     <div className="space-y-6">
// //       <div className="flex items-center justify-between">
// //         <div className="flex items-center space-x-3">
// //           <div className="p-2 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
// //             <UserCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
// //           </div>
// //           <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Operator Management</h2>
// //         </div>
// //       </div>
      

// //     </div>
// //   )
// // }

// // export default Operator 

"use client"

import React from 'react'

const Operator = () => {
  return (
    <div>Operator</div>
  )
}

export default Operator