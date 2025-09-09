import React, { useState } from 'react';
import { 
  BarChart3, TrendingUp, TrendingDown, DollarSign, Users, 
  Calendar, Target, Award, Clock, Filter, Download
} from 'lucide-react';

const Analysis: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('month');
  const [chartType, setChartType] = useState('revenue');

  // Mock analytics data
  const analytics = {
    revenue: {
      total: 2450000,
      growth: 15.3,
      monthly: [180000, 220000, 195000, 245000, 280000, 320000]
    },
    bookings: {
      total: 156,
      growth: 8.7,
      monthly: [12, 18, 15, 22, 25, 28]
    },
    teamPerformance: {
      avgRating: 4.7,
      growth: 2.1,
      topPerformers: [
        { name: 'Rajesh Kumar', rating: 4.9, projects: 23 },
        { name: 'Vikram Singh', rating: 4.9, projects: 18 },
        { name: 'Priya Sharma', rating: 4.8, projects: 21 }
      ]
    },
    clientSatisfaction: {
      score: 94,
      growth: 3.2,
      breakdown: {
        excellent: 68,
        good: 26,
        average: 5,
        poor: 1
      }
    }
  };

  const serviceBreakdown = [
    { service: 'Complete Event', revenue: 980000, bookings: 45, avgValue: 21778 },
    { service: 'Cameraman', revenue: 720000, bookings: 68, avgValue: 10588 },
    { service: 'Equipment Rental', revenue: 450000, bookings: 32, avgValue: 14063 },
    { service: 'Video Editing', revenue: 300000, bookings: 25, avgValue: 12000 }
  ];

  const monthlyTrends = [
    { month: 'Jan', revenue: 180000, bookings: 12, satisfaction: 92 },
    { month: 'Feb', revenue: 220000, bookings: 18, satisfaction: 91 },
    { month: 'Mar', revenue: 195000, bookings: 15, satisfaction: 93 },
    { month: 'Apr', revenue: 245000, bookings: 22, satisfaction: 94 },
    { month: 'May', revenue: 280000, bookings: 25, satisfaction: 95 },
    { month: 'Jun', revenue: 320000, bookings: 28, satisfaction: 94 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Business Analysis
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Comprehensive insights into business performance and trends
            </p>
          </div>
          <div className="flex space-x-2">
            {['week', 'month', 'quarter', 'year'].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  timeFilter === filter
                    ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{analytics.revenue.growth}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            ₹{(analytics.revenue.total / 100000).toFixed(1)}L
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Total Revenue</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{analytics.bookings.growth}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {analytics.bookings.total}
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Total Bookings</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{analytics.teamPerformance.growth}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {analytics.teamPerformance.avgRating}
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Avg Team Rating</div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center">
              <Target className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+{analytics.clientSatisfaction.growth}%</span>
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            {analytics.clientSatisfaction.score}%
          </div>
          <div className="text-gray-600 dark:text-gray-300 text-sm">Client Satisfaction</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Revenue Trend Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Revenue Trend</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
          <div className="h-64 flex items-end justify-between space-x-2">
            {monthlyTrends.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg mb-2"
                  style={{ height: `${(data.revenue / 320000) * 200}px` }}
                ></div>
                <div className="text-xs text-gray-600 dark:text-gray-300">{data.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Service Performance</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="space-y-4">
            {serviceBreakdown.map((service, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-800 dark:text-white">{service.service}</span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">₹{(service.revenue / 100000).toFixed(1)}L</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
                    style={{ width: `${(service.revenue / 980000) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
                  <span>{service.bookings} bookings</span>
                  <span>Avg: ₹{service.avgValue.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers & Client Satisfaction */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Performers */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Top Performers</h3>
          <div className="space-y-4">
            {analytics.teamPerformance.topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-600'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">{performer.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">{performer.projects} projects</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 dark:text-white">{performer.rating}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-300">rating</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Satisfaction Breakdown */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Client Satisfaction</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Excellent</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${analytics.clientSatisfaction.breakdown.excellent}%` }}></div>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">{analytics.clientSatisfaction.breakdown.excellent}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Good</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${analytics.clientSatisfaction.breakdown.good}%` }}></div>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">{analytics.clientSatisfaction.breakdown.good}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Average</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-yellow-600 h-2 rounded-full" style={{ width: `${analytics.clientSatisfaction.breakdown.average}%` }}></div>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">{analytics.clientSatisfaction.breakdown.average}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Poor</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div className="bg-red-600 h-2 rounded-full" style={{ width: `${analytics.clientSatisfaction.breakdown.poor}%` }}></div>
                </div>
                <span className="text-sm font-medium text-gray-800 dark:text-white">{analytics.clientSatisfaction.breakdown.poor}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;