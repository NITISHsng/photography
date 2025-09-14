import React, { useState } from 'react';
import { 
  Package, Search, Filter, Plus, Eye, Edit,
  Camera, Video, Mic, Lightbulb, Settings, MapPin,
  Star, DollarSign, TrendingUp, X, History
} from 'lucide-react';
import Image from "next/image";
export interface EquipmentPartner {
  id: string;
  name: string;
  owner: string;
  phone: string;
  email: string;
  location: string;
  pincode: string;
  status: 'active' | 'inactive' | string;
  rating: number;
  totalEquipment: number;
  categories: string[];
  monthlyRevenue: number;
  joinDate: string;      // could also use Date if you parse it
  lastRental: string;    // could also use Date
  avatar: string;
}
const EquipmentPartner: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<EquipmentPartner | null > (null);

  // Mock equipment partners data
  const equipmentPartners = [
    {
      id: 'EP001',
      name: 'ProGear Rentals',
      owner: 'Amit Patel',
      phone: '+91 98765 43210',
      email: 'amit@progear.com',
      location: 'Mumbai',
      pincode: '400001',
      status: 'active',
      rating: 4.8,
      totalEquipment: 45,
      categories: ['Cameras', 'Lighting', 'Audio'],
      monthlyRevenue: 85000,
      joinDate: '2023-01-15',
      lastRental: '2024-01-18',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 'EP002',
      name: 'CineTech Solutions',
      owner: 'Priya Sharma',
      phone: '+91 98765 43211',
      email: 'priya@cinetech.com',
      location: 'Delhi',
      pincode: '110001',
      status: 'active',
      rating: 4.9,
      totalEquipment: 62,
      categories: ['Cameras', 'Drones', 'Gimbals'],
      monthlyRevenue: 120000,
      joinDate: '2023-02-20',
      lastRental: '2024-01-19',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 'EP003',
      name: 'Studio Equipment Hub',
      owner: 'Rajesh Kumar',
      phone: '+91 98765 43212',
      email: 'rajesh@studiohub.com',
      location: 'Bangalore',
      pincode: '560001',
      status: 'inactive',
      rating: 4.6,
      totalEquipment: 38,
      categories: ['Lighting', 'Audio', 'Accessories'],
      monthlyRevenue: 65000,
      joinDate: '2023-03-10',
      lastRental: '2024-01-10',
      avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      id: 'EP004',
      name: 'Digital Lens Co.',
      owner: 'Sneha Reddy',
      phone: '+91 98765 43213',
      email: 'sneha@digitallens.com',
      location: 'Chennai',
      pincode: '600001',
      status: 'active',
      rating: 4.7,
      totalEquipment: 28,
      categories: ['Cameras', 'Lenses'],
      monthlyRevenue: 75000,
      joinDate: '2023-04-05',
      lastRental: '2024-01-17',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  const equipmentCategories = [
    { id: 'cameras', name: 'Cameras', icon: Camera, count: 156 },
    { id: 'lighting', name: 'Lighting', icon: Lightbulb, count: 89 },
    { id: 'audio', name: 'Audio', icon: Mic, count: 67 },
    { id: 'video', name: 'Video Gear', icon: Video, count: 45 },
    { id: 'accessories', name: 'Accessories', icon: Settings, count: 234 }
  ];

  const filteredPartners = equipmentPartners.filter(partner => {
    const matchesSearch = 
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === '' || partner.categories.some(cat => 
      cat.toLowerCase().includes(categoryFilter.toLowerCase())
    );
    const matchesStatus = statusFilter === '' || partner.status === statusFilter;
    const matchesLocation = locationFilter === '' || partner.location === locationFilter;

    return matchesSearch && matchesCategory && matchesStatus && matchesLocation;
  });

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'cameras': return <Camera className="h-3 w-3" />;
      case 'lighting': return <Lightbulb className="h-3 w-3" />;
      case 'audio': return <Mic className="h-3 w-3" />;
      case 'drones': return <Video className="h-3 w-3" />;
      case 'gimbals': return <Settings className="h-3 w-3" />;
      default: return <Package className="h-3 w-3" />;
    }
  };

  const stats = {
    total: equipmentPartners.length,
    active: equipmentPartners.filter(p => p.status === 'active').length,
    totalEquipment: equipmentPartners.reduce((sum, p) => sum + p.totalEquipment, 0),
    totalRevenue: equipmentPartners.reduce((sum, p) => sum + p.monthlyRevenue, 0)
  };

  // Working action handlers
  const handleAddPartner = () => {
    setShowAddModal(true);
  };

  const handleAddPayment = (partner: EquipmentPartner) => {
    setSelectedPartner(partner);
    setShowPaymentModal(true);
  };

  const handleViewHistory = (partnerId: string) => {
    const partner = equipmentPartners.find(p => p.id === partnerId);
    if (partner) {
      alert(`Payment History for ${partner.name}:\n\nJan 2024: ₹${partner.monthlyRevenue.toLocaleString()}\nDec 2023: ₹${(partner.monthlyRevenue * 0.9).toLocaleString()}\nNov 2023: ₹${(partner.monthlyRevenue * 0.85).toLocaleString()}\nOct 2023: ₹${(partner.monthlyRevenue * 0.8).toLocaleString()}\n\nTotal Revenue: ₹${(partner.monthlyRevenue * 12).toLocaleString()}/year`);
      console.log(`View history for partner: ${partnerId}`, partner);
    }
  };

  const handleSavePartner = () => {
    alert('Equipment partner added successfully!\n\nPartner Details:\n- Name: New Equipment Partner\n- Location: Mumbai\n- Equipment: 25 items\n- Status: Active');
    console.log('Add new equipment partner');
    setShowAddModal(false);
  };

  const handleSavePayment = () => {
    if (selectedPartner) {
      alert(`Payment processed successfully for ${selectedPartner.name}!\n\nPayment Details:\n- Amount: ₹15,000\n- Type: Revenue Share\n- Date: ${new Date().toLocaleDateString()}\n- Description: Monthly equipment rental revenue`);
      console.log(`Add payment for partner: ${selectedPartner.id}`, selectedPartner);
      setShowPaymentModal(false);
      setSelectedPartner(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Equipment Partners
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Manage equipment rental partners and inventory
            </p>
          </div>
          <button 
            onClick={handleAddPartner}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Equipment Partner
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Partners</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{stats.active}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Active Partners</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{stats.totalEquipment}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Equipment</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Monthly Revenue</div>
          </div>
        </div>
      </div>

      {/* Equipment Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Equipment Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {equipmentCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div key={category.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl text-center hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <div className="font-medium text-gray-800 dark:text-white">{category.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{category.count} items</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search partners..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Categories</option>
            <option value="cameras">Cameras</option>
            <option value="lighting">Lighting</option>
            <option value="audio">Audio</option>
            <option value="video">Video Gear</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">All Locations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
          <button className="inline-flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200">
            <Filter className="h-5 w-5 mr-2" />
            More Filters
          </button>
        </div>
      </div>

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPartners.map((partner) => (
          <div key={partner.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300">
            {/* Partner Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                  height={48}
                  width={48}
                  src={partner.avatar}
                  alt={partner.owner}
                  className="w-12 h-12 rounded-full object-cover border-2 border-orange-200 dark:border-orange-700"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{partner.name}</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{partner.owner}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                partner.status === 'active' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {partner.status}
              </span>
            </div>

            {/* Partner Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">ID: {partner.id}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">{partner.rating}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <MapPin className="h-4 w-4" />
                <span>{partner.location} - {partner.pincode}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                <Package className="h-4 w-4" />
                <span>{partner.totalEquipment} equipment items</span>
              </div>
            </div>

            {/* Categories */}
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Categories</div>
              <div className="flex flex-wrap gap-1">
                {partner.categories.map((category, index) => (
                  <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300 text-xs rounded-full">
                    {getCategoryIcon(category)}
                    <span>{category}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Revenue & Performance */}
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-orange-800 dark:text-orange-300">Monthly Revenue</span>
                <div className="flex items-center space-x-1 text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-xs">+8%</span>
                </div>
              </div>
              <div className="text-lg font-bold text-gray-800 dark:text-white">₹{partner.monthlyRevenue.toLocaleString()}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Last rental: {partner.lastRental}</div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>View Details</span>
              </button>
              <button className="flex-1 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </button>
            </div>

            {/* Payment Actions */}
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => handleAddPayment(partner)}
                className="flex-1 bg-green-100 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 text-green-700 dark:text-green-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <DollarSign className="h-4 w-4" />
                <span>Payment</span>
              </button>
              <button 
                onClick={() => handleViewHistory(partner.id)}
                className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-1"
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Joined: {partner.joinDate}</span>
                <span>Equipment: {partner.totalEquipment}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Partner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add Equipment Partner</h3>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <input
                type="text"
                placeholder="Partner Name"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Owner Name"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Location"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <input
                type="text"
                placeholder="Pincode"
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                onClick={handleSavePartner}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-lg transition-all duration-200"
              >
                Add Partner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add Payment</h3>
              <button onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-4">
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-2">Partner: {selectedPartner.name}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">Owner: {selectedPartner.owner}</div>
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
                <option value="revenue-share">Revenue Share</option>
                <option value="bonus">Bonus</option>
                <option value="maintenance">Maintenance</option>
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
                onClick={handleSavePayment}
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

export default EquipmentPartner;