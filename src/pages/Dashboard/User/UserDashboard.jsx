import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { 
  Ticket, 
  Calendar, 
  Clock, 
  TrendingUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  MapPin,
  DollarSign,
  Bus,
  Train,
  Plane
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router';

const UserDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingTrips: 0,
    completedTrips: 0,
    totalSpent: 0
  });

  // Fetch user bookings
  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/user/bookings');
      return data;
    },
  });

  // Calculate statistics
  
useEffect(() => {
  if (bookings.length > 0) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); 
    
   
    const isConfirmed = (b) => 
      b.status === 'paid' || 
      b.status === 'accepted' || 
      b.bookingStatus === 'confirmed';
    
    const upcoming = bookings.filter(b => {
      const departureDate = new Date(b.departureDate);
      departureDate.setHours(0, 0, 0, 0);
      return isConfirmed(b) && departureDate >= today;
    }).length;
    
    const completed = bookings.filter(b => {
      const departureDate = new Date(b.departureDate);
      departureDate.setHours(0, 0, 0, 0);
      return isConfirmed(b) && departureDate < today;
    }).length;
    
    const totalSpent = bookings
      .filter(b => isConfirmed(b))
      .reduce((sum, b) => sum + (b.totalPrice || b.price || b.amount || 0), 0);

    setStats({
      totalBookings: bookings.length,
      upcomingTrips: upcoming,
      completedTrips: completed,
      totalSpent: totalSpent
    });
  }
}, [bookings]);

  // Monthly spending data
  
const getMonthlySpending = () => {
  const now = new Date();
  const last6Months = [];
  
  const isConfirmed = (b) => 
    b.status === 'paid' || 
    b.status === 'accepted' || 
    b.bookingStatus === 'confirmed';
  
  // Generate last 6 months with year
  for (let i = 5; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    last6Months.push({
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      year: date.getFullYear(),
      monthIndex: date.getMonth()
    });
  }
  
  return last6Months.map(({ month, year, monthIndex }) => {
    const amount = bookings
      .filter(b => {
        const bookingDate = new Date(b.createdAt || b.bookingDate);
        return bookingDate.getMonth() === monthIndex && 
               bookingDate.getFullYear() === year &&
               isConfirmed(b);
      })
      .reduce((sum, b) => sum + (b.totalPrice || b.price || b.amount || 0), 0);
    
    return { month, amount };
  });
};

  // Booking status distribution
 
  const getStatusData = () => {
  const statuses = {
    Confirmed: { color: '#10b981' },
    Pending: { color: '#f59e0b' },
    Cancelled: { color: '#ef4444' }
  };

  return Object.entries(statuses).map(([name, config]) => ({
    name,
    value: bookings.filter(b => {
      if (name === "Confirmed") return b.status === "paid" || b.status === "accepted" || b.bookingStatus === "confirmed";
      if (name === "Pending") return b.status === "pending";
      if (name === "Cancelled") return b.status === "rejected" || b.bookingStatus === "cancelled";
      return false;
    }).length,
    color: config.color
  }));
};


  // Transport type distribution
  const getTransportData = () => {
    const types = ['Bus', 'Train', 'Flight', 'Launch'];
    return types.map(type => ({
      type,
      count: bookings.filter(b => b.transportType === type).length
    })).filter(item => item.count > 0);
  };

  const getStatusBadge = (status) => {
    const badges = {
      paid: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Confirmed' },
      accepted: { color: 'bg-green-100 text-green-700', icon: CheckCircle, text: 'Confirmed' },
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

  const getTransportIcon = (type) => {
    const icons = {
      Bus: Bus,
      Train: Train,
      Flight: Plane,
      Launch: Bus
    };
    const Icon = icons[type] || Bus;
    return <Icon size={18} />;
  };

  if (isLoading) return <LoadingSpinner />;

  const monthlySpending = getMonthlySpending();
  const statusData = getStatusData();
  const transportData = getTransportData();
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-xl p-6 text-white shadow-lg">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">
          Welcome back, {user?.displayName || user?.name || 'Traveler'}! 👋
        </h1>
        <p className="text-green-100">Track your bookings and plan your next journey</p>
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
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Bookings</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Calendar className="text-green-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Upcoming Trips</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.upcomingTrips}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <CheckCircle className="text-purple-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Completed Trips</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.completedTrips}</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <DollarSign className="text-amber-600" size={24} />
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Spent</h3>
          <p className="text-3xl font-bold text-gray-900">${stats.totalSpent.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Spending Chart */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Spending</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlySpending}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Booking Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transport Types Overview */}
      {transportData.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Travel by Transport Type</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transportData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Recent Bookings Table */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Bookings</h2>
          <Link 
            to="/dashboard/my-bookings"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            View All
          </Link>
        </div>
        
        {recentBookings.length === 0 ? (
          <div className="p-12 text-center">
            <Ticket className="mx-auto text-gray-300 mb-4" size={48} />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Bookings Yet</h3>
            <p className="text-gray-500 mb-4">Start exploring tickets and book your first trip!</p>
            <Link 
              to="/tickets"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Ticket size={18} />
              Browse Tickets
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
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getTransportIcon(booking.transportType)}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {booking.ticketTitle}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-gray-400" />
                        {booking.from} → {booking.to}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(booking.departureDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock size={12} />
                        {booking.departureTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {booking.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${booking.totalPrice?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(booking.status)}
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
          to="/tickets"
          className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600 text-white rounded-full">
              <Ticket size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Browse Tickets</h3>
              <p className="text-sm text-gray-600">Find your next journey</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/dashboard/my-bookings"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-full">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">My Bookings</h3>
              <p className="text-sm text-gray-600">View all your trips</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/dashboard/transaction-history"
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 text-white rounded-full">
              <DollarSign size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Transactions</h3>
              <p className="text-sm text-gray-600">Payment history</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UserDashboard;