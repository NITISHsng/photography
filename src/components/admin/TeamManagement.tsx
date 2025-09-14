import React, { useState } from 'react';
import { 
  Search, Filter, UserPlus, Star, MapPin, Phone, 
  Calendar,  Edit, Plus, Eye, User,
  Camera,  Edit3, Package, TrendingUp, Clock, X
} from 'lucide-react';
import Image from 'next/image';
import { TeamMember } from '@/contexts/fromType';
const TeamManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [idFilter, setIdFilter] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedPincode, setSelectedPincode] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember |null >(null);

  // Mock team members data
  const teamMembers = [
    {
      id: 'TM001',
      name: 'Rajesh Kumar',
      role: 'Senior Cameraman',
      rating: 4.9,
      status: 'active',
      area: 'Mumbai',
      pincode: '400001',
      phone: '+91 98765 43210',
      email: 'rajesh@AsanCapture.com',
      joinDate: '2023-01-15',
      skills: ['Wedding Photography', 'Event Videography', 'Drone Operation'],
      totalEarnings: 245000,
      nextTask: 'Sharma Wedding',
      taskDate: '2024-01-20',
      taskRole: 'Lead Cameraman',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 'TM002',
      name: 'Priya Sharma',
      role: 'Video Editor',
      rating: 4.8,
      status: 'active',
      area: 'Delhi',
      pincode: '110001',
      phone: '+91 98765 43211',
      email: 'priya@AsanCapture.com',
      joinDate: '2023-02-20',
      skills: ['Premiere Pro', 'After Effects', 'Color Grading'],
      totalEarnings: 180000,
      nextTask: 'Corporate Video',
      taskDate: '2024-01-22',
      taskRole: 'Lead Editor',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 'TM003',
      name: 'Amit Patel',
      role: 'Equipment Partner',
      rating: 4.7,
      status: 'inactive',
      area: 'Bangalore',
      pincode: '560001',
      phone: '+91 98765 43212',
      email: 'amit@AsanCapture.com',
      joinDate: '2023-03-10',
      skills: ['Camera Maintenance', 'Lighting Setup', 'Audio Equipment'],
      totalEarnings: 320000,
      nextTask: 'Equipment Check',
      taskDate: '2024-01-25',
      taskRole: 'Equipment Manager',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 'TM004',
      name: 'Sneha Reddy',
      role: 'Cameraman',
      rating: 4.6,
      status: 'active',
      area: 'Chennai',
      pincode: '600001',
      phone: '+91 98765 43213',
      email: 'sneha@AsanCapture.com',
      joinDate: '2023-04-05',
      skills: ['Portrait Photography', 'Event Coverage', 'Live Streaming'],
      totalEarnings: 150000,
      nextTask: 'Birthday Party',
      taskDate: '2024-01-24',
      taskRole: 'Cameraman',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 'TM005',
      name: 'Vikram Singh',
      role: 'Senior Editor',
      rating: 4.9,
      status: 'active',
      area: 'Pune',
      pincode: '411001',
      phone: '+91 98765 43214',
      email: 'vikram@AsanCapture.com',
      joinDate: '2023-01-30',
      skills: ['Final Cut Pro', 'Motion Graphics', 'Sound Design'],
      totalEarnings: 280000,
      nextTask: 'Music Video Edit',
      taskDate: '2024-01-26',
      taskRole: 'Lead Editor',
      avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm);
    
    const matchesId = member.id.toLowerCase().includes(idFilter.toLowerCase());
    const matchesArea = selectedArea === '' || member.area === selectedArea;
    const matchesPincode = selectedPincode === '' || member.pincode === selectedPincode;
    const matchesRole = selectedRole === '' || member.role.includes(selectedRole);

    return matchesSearch && matchesId && matchesArea && matchesPincode && matchesRole;
  });

  const getRoleIcon = (role: string) => {
    if (role.includes('Cameraman')) return <Camera className="h-4 w-4" />;
    if (role.includes('Editor')) return <Edit3 className="h-4 w-4" />;
    if (role.includes('Equipment')) return <Package className="h-4 w-4" />;
    return <User className="h-4 w-4" />;
  };

  const openAddModal = () => {
    setShowAddModal(true);
  };

  // const openPaymentModal = (member: TeamMember) => {
  //   setSelectedMember(member);
  //   setShowPaymentModal(true);
  // };

  const handleEditMember = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      alert(`Opening edit form for member: ${member.name} (${memberId})`);
      console.log(`Edit member: ${memberId}`, member);
    }
  };

  const handleViewHistory = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      alert(`Viewing payment history for: ${member.name}\n\nPayment History:\n- Jan 2024: ₹45,000\n- Dec 2023: ₹38,000\n- Nov 2023: ₹42,000\n- Oct 2023: ₹35,000\n\nTotal Earnings: ${member.totalEarnings.toLocaleString()}`);
      console.log(`View history for member: ${memberId}`, member);
    }
  };

  const handleAssignTask = (memberId: string) => {
    const member = teamMembers.find(m => m.id === memberId);
    if (member) {
      alert(`Opening task assignment for: ${member.name}\n\nCurrent Task: ${member.nextTask}\nDate: ${member.taskDate}\nRole: ${member.taskRole}`);
      console.log(`Assign task to member: ${memberId}`, member);
    }
  };

  const handleAddPayment = () => {
    if (selectedMember) {
      alert(`Payment added successfully for ${selectedMember.name}!\n\nPayment Details:\n- Amount: ₹25,000\n- Type: Project Payment\n- Date: ${new Date().toLocaleDateString()}\n- Description: Wedding videography project`);
      console.log(`Add payment for: ${selectedMember.id}`, selectedMember);
      setShowPaymentModal(false);
      setSelectedMember(null);
    }
  };

  const handleAddMember = () => {
    alert('New team member added successfully!\n\nMember Details:\n- Name: New Member\n- Role: Cameraman\n- Location: Mumbai\n- Status: Active\n- ID: TM006');
    console.log('Add new team member');
    setShowAddModal(false);
  };

  const stats = {
    total: teamMembers.length,
    active: teamMembers.filter(m => m.status === 'active').length,
    cameramen: teamMembers.filter(m => m.role.includes('Cameraman')).length,
    editors: teamMembers.filter(m => m.role.includes('Editor')).length,
    equipment: teamMembers.filter(m => m.role.includes('Equipment')).length
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Team Management
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage team members, tasks, and payments
            </p>
          </div>
          <button 
            onClick={openAddModal}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Team Member
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Members</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.cameramen}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Cameramen</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.editors}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Editors</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-pink-600">{stats.equipment}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Equipment</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search team members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <input
            type="text"
            placeholder="Filter by ID..."
            value={idFilter}
            onChange={(e) => setIdFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
          <select
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Areas</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
          </select>
          <select
            value={selectedPincode}
            onChange={(e) => setSelectedPincode(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Pincodes</option>
            <option value="400001">400001</option>
            <option value="110001">110001</option>
            <option value="560001">560001</option>
            <option value="600001">600001</option>
            <option value="411001">411001</option>
          </select>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Roles</option>
            <option value="Cameraman">Cameraman</option>
            <option value="Editor">Editor</option>
            <option value="Equipment">Equipment Partner</option>
          </select>
          <button className="inline-flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200">
            <Filter className="h-5 w-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div key={member.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            {/* Member Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                  height={48}
                  width={48}         
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-200 dark:border-purple-700"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{member.name}</h3>
                  <div className="flex items-center space-x-1 text-purple-600 dark:text-purple-400">
                    {getRoleIcon(member.role)}
                    <span className="text-sm font-medium">{member.role}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                member.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {member.status}
              </span>
            </div>

            {/* Member Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">ID: {member.id}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{member.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{member.area} - {member.pincode}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4" />
                <span>{member.phone}</span>
              </div>
            </div>

            {/* Next Task */}
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-4">
              <div className="flex items-center space-x-2 mb-1">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-800 dark:text-purple-300">Next Task</span>
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">{member.nextTask}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{member.taskDate} • {member.taskRole}</div>
            </div>

            {/* Skills - Remove "Skills" word, only display skills */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {member.skills.slice(0, 3).map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Earnings */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Total Earnings</div>
                <div className="text-lg font-bold text-green-600">₹{member.totalEarnings.toLocaleString()}</div>
              </div>
              <div className="flex items-center space-x-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">+12%</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button 
                // onClick={() => openPaymentModal(member)}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Payment</span>
              </button>
              <button 
                onClick={() => handleEditMember(member.id)}
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            </div>

            {/* Additional Actions */}
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => handleViewHistory(member.id)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Eye className="h-4 w-4" />
                <span>View History</span>
              </button>
              <button 
                onClick={() => handleAssignTask(member.id)}
                className="flex-1 bg-blue-100 dark:bg-blue-900/20 hover:bg-blue-200 dark:hover:bg-blue-900/30 text-blue-700 dark:text-blue-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <Calendar className="h-4 w-4" />
                <span>Assign Task</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Team Member</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Full Name"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <select className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">Select Role</option>
                <option value="cameraman">Cameraman</option>
                <option value="editor">Video Editor</option>
                <option value="equipment">Equipment Partner</option>
              </select>
              <input
                type="text"
                placeholder="Area/City"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Pincode"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddMember}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200"
              >
                Add Member
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Member: {selectedMember.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">ID: {selectedMember.id}</div>
            </div>
            <div className="space-y-4 mb-6">
              <input
                type="number"
                placeholder="Amount (₹)"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Description"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="">Payment Type</option>
                <option value="salary">Salary</option>
                <option value="bonus">Bonus</option>
                <option value="project">Project Payment</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddPayment}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200"
              >
                Add Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagement;