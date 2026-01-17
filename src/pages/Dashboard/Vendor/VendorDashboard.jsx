import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { 
  Ticket, 
  DollarSign, 
  TrendingUp,
  Clock,
  Eye,
  Edit,
  Plus,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Link } from 'react-router';

const VendorDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalTickets: 0,
    pendingBookings: 0,
    totalRevenue: 0,
    ticketsSold: 0
  });

  // Fetch vendor tickets
  const { data: tickets = [], isLoading: ticketsLoading } = useQuery({
    queryKey: ['vendor-tickets'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/vendor/tickets');
      return data;
    },
  });

  // Fetch vendor bookings
  const { data: bookings = [], isLoading: bookingsLoading } = useQuery({
    queryKey: ['vendor-bookings'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/vendor/bookings');
      return data;
    },
  });

  // Fetch revenue stats
  const { data: revenueData, isLoading: revenueLoading } = useQuery({
    queryKey: ['vendor-revenue'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/vendor/revenue');
      return data;
    },
  });

  // Calculate statistics
  useEffect(() => {
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;
    const totalRevenue = revenueData?.totalRevenue || 0;
    const ticketsSold = revenueData?.totalTicketsSold || 0;

    setStats({
      totalTickets: tickets.length,
      pendingBookings,
      totalRevenue,
      ticketsSold
    });
  }, [tickets, bookings, revenueData]);

  // Revenue trend (last 6 months)
  const getRevenueTrend = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, idx) => ({
      month,
      revenue: Math.floor(Math.random() * 5000) + 2000, // Replace with actual data
      bookings: Math.floor(Math.random() * 50) + 20
    }));
  };

  // Ticket verification status
  const getVerificationData = () => {
    return [
      { 
        name: 'Approved', 
        value: tickets.filter(t => t.verificationStatus === 'approved').length,
        color: '#10b981'
      },
      { 
        name: 'Pending', 
        value: tickets.filter(t => t.verificationStatus === 'pending').length,
        color: '#f59e0b'
      },
      { 
        name: 'Rejected', 
        value: tickets.filter(t => t.verificationStatus === 'rejected').length,
        color: '#ef4444'
      }
    ].filter(item => item.value > 0);
  };

  // Top performing tickets
  const getTopTickets = () => {
    return tickets
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 5)
      .map(ticket => ({
        name: ticket.title.length > 20 ? ticket.title.substring(0, 20) + '...' : ticket.title,
        sold: ticket.soldCount || 0,
        revenue: (ticket.soldCount || 0) * ticket.price
      }));
  };

  const getStatusBadge = (status) => {
    const badges = {
      approved: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Approved' },
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock, text: 'Pending' },
      rejected: { color: 'bg-red-100 text-red-700', icon: XCircle, text: 'Rejected' }
    };
    
    const badge = badges[status] || badges.pending;
    const Icon = badge.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
        <Icon size={14} />
        {badge.text}
      </span>
    );
  };

  if (ticketsLoading || bookingsLoading || revenueLoading) return <LoadingSpinner />;

  const revenueTrend = getRevenueTrend();
  const verificationData = getVerificationData();
  const topTickets = getTopTickets();
  const recentTickets = tickets.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Vendor Dashboard 📊
        </h1>
        <p className="text-green-100">Manage your tickets and track performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Ticket className="text-blue-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Tickets</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalTickets}</p>
          <p className="text-xs text-gray-500 mt-2">
            {tickets.filter(t => t.verificationStatus === 'approved').length} approved
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="text-green-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
          <p className="text-xs text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Users className="text-purple-600" size={24} />
            </div>
            <TrendingUp className="text-green-500" size={20} />
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Tickets Sold</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.ticketsSold}</p>
          <p className="text-xs text-gray-500 mt-2">Total units sold</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <AlertCircle className="text-amber-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Bookings</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingBookings}</p>
          <p className="text-xs text-amber-600 mt-2">Needs your action</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <Link to="/dashboard/revenue-overview" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View Details
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Ticket Verification Status */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ticket Status</h2>
            <Link to="/dashboard/my-tickets" className="text-sm text-green-600 hover:text-green-700 font-medium">
              View All
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={verificationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {verificationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Performing Tickets */}
      {topTickets.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Performing Tickets</h2>
            <span className="text-sm text-gray-500">By sales</span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topTickets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sold" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Units Sold" />
              <Bar dataKey="revenue" fill="#10b981" radius={[8, 8, 0, 0]} name="Revenue ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Tickets Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Your Recent Tickets</h2>
          <Link 
            to="/dashboard/add-ticket"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus size={18} />
            Add Ticket
          </Link>
        </div>
        
        {recentTickets.length === 0 ? (
          <div className="p-12 text-center">
            <Ticket className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Tickets Yet</h3>
            <p className="text-gray-500 mb-4">Start by adding your first ticket!</p>
            <Link 
              to="/dashboard/add-ticket"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} />
              Add Your First Ticket
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTickets.map((ticket) => (
                  <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                      <div className="text-xs text-gray-500">{ticket.transportType}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {ticket.from} → {ticket.to}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        ${ticket.price}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {ticket.quantity}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(ticket.verificationStatus)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Edit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/dashboard/add-ticket"
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600 text-white rounded-full">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Add Ticket</h3>
              <p className="text-sm text-gray-600">Create new listing</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/dashboard/requested-bookings"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-full">
              <Clock size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Booking Requests</h3>
              <p className="text-sm text-gray-600">{stats.pendingBookings} pending</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/dashboard/revenue-overview"
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 text-white rounded-full">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Revenue Stats</h3>
              <p className="text-sm text-gray-600">Detailed analytics</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default VendorDashboard;