import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../../components/Shared/LoadingSpinner';
import { 
  Users, 
  Ticket, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  Shield,
  Eye,
  Ban,
  Calendar
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Link } from 'react-router';

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTickets: 0,
    totalRevenue: 0,
    pendingTickets: 0,
    vendors: 0,
    customers: 0
  });

  // Fetch all users
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin/users');
      return data;
    },
  });

  // Fetch all tickets
  const { data: tickets = [], isLoading: ticketsLoading } = useQuery({
    queryKey: ['admin-tickets'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/admin/tickets');
      return data;
    },
  });

  // Calculate statistics
  useEffect(() => {
    const vendors = users.filter(u => u.role === 'vendor').length;
    const customers = users.filter(u => u.role === 'customer' || u.role === 'user').length;
    const pendingTickets = tickets.filter(t => t.verificationStatus === 'pending').length;
    
    // Calculate total revenue (estimate based on approved tickets)
    const totalRevenue = tickets
      .filter(t => t.verificationStatus === 'approved')
      .reduce((sum, t) => sum + ((t.soldCount || 0) * t.price), 0);

    setStats({
      totalUsers: users.length,
      totalTickets: tickets.length,
      totalRevenue,
      pendingTickets,
      vendors,
      customers
    });
  }, [users, tickets]);

  // Platform growth data
  const getPlatformGrowth = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map((month, idx) => ({
      month,
      users: Math.floor(Math.random() * 500) + 200 + (idx * 50),
      tickets: Math.floor(Math.random() * 100) + 50 + (idx * 10),
      revenue: Math.floor(Math.random() * 10000) + 5000 + (idx * 1000)
    }));
  };

  // User roles distribution
  const getUserRoles = () => {
    return [
      { 
        name: 'Customers', 
        value: users.filter(u => u.role === 'customer' || u.role === 'user').length,
        color: '#3b82f6' 
      },
      { 
        name: 'Vendors', 
        value: users.filter(u => u.role === 'vendor').length,
        color: '#10b981' 
      },
      { 
        name: 'Admins', 
        value: users.filter(u => u.role === 'admin').length,
        color: '#8b5cf6' 
      }
    ].filter(item => item.value > 0);
  };

  // Ticket verification status
  const getTicketStatus = () => {
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

  // Transport type distribution
  const getTransportDistribution = () => {
    const types = ['Bus', 'Train', 'Flight', 'Launch'];
    return types.map(type => ({
      type,
      count: tickets.filter(t => t.transportType === type && t.verificationStatus === 'approved').length
    })).filter(item => item.count > 0);
  };

  // Recent activity
  const getRecentActivity = () => {
    const activities = [];
    
    // Recent users
    users.slice(0, 3).forEach(u => {
      activities.push({
        type: 'user',
        action: 'New user registered',
        user: u.name,
        time: new Date(u.created_at).toLocaleString(),
        status: 'success'
      });
    });

    // Recent tickets
    tickets.slice(0, 2).forEach(t => {
      activities.push({
        type: 'ticket',
        action: t.verificationStatus === 'pending' ? 'New ticket pending' : 'Ticket approved',
        user: t.vendorName,
        time: new Date(t.createdAt || Date.now()).toLocaleString(),
        status: t.verificationStatus === 'pending' ? 'warning' : 'success'
      });
    });

    return activities.slice(0, 5);
  };

  if (usersLoading || ticketsLoading) return <LoadingSpinner />;

  const platformGrowth = getPlatformGrowth();
  const userRoles = getUserRoles();
  const ticketStatus = getTicketStatus();
  const transportDistribution = getTransportDistribution();
  const recentActivity = getRecentActivity();

  const getActivityIcon = (type) => {
    const icons = {
      user: <Users size={16} className="text-blue-600" />,
      ticket: <Ticket size={16} className="text-green-600" />,
      booking: <CheckCircle size={16} className="text-purple-600" />,
      alert: <AlertCircle size={16} className="text-amber-600" />
    };
    return icons[type] || <Activity size={16} />;
  };

  const getStatusBadge = (status) => {
    const badges = {
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      error: 'bg-red-100 text-red-700'
    };
    return badges[status] || badges.success;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Shield size={32} />
          <h1 className="text-2xl md:text-3xl font-bold">
            Admin Control Center
          </h1>
        </div>
        <p className="text-purple-100">Complete platform oversight and management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp size={16} />
              +12%
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
          <p className="text-xs text-gray-500 mt-2">{stats.vendors} vendors, {stats.customers} customers</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Ticket className="text-green-600" size={24} />
            </div>
            <div className="text-amber-600 text-sm font-medium">
              {stats.pendingTickets} pending
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Total Tickets</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.totalTickets}</p>
          <p className="text-xs text-gray-500 mt-2">All listings</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp size={16} />
              +18%
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Platform Revenue</h3>
          <p className="text-3xl font-bold text-gray-900">${(stats.totalRevenue / 1000).toFixed(1)}K</p>
          <p className="text-xs text-gray-500 mt-2">Estimated total</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-amber-100 rounded-lg">
              <Activity className="text-amber-600" size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <TrendingUp size={16} />
              Live
            </div>
          </div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Actions</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.pendingTickets}</p>
          <p className="text-xs text-gray-500 mt-2">Needs review</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Growth */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Platform Growth</h2>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Last 6 months</option>
              <option>Last year</option>
              <option>All time</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={platformGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} name="Users" />
              <Area type="monotone" dataKey="tickets" stroke="#10b981" fill="#10b981" fillOpacity={0.3} name="Tickets" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* User Roles Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">User Distribution</h2>
            <Link to="/dashboard/manage-users" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Manage Users
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userRoles}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {userRoles.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ticket Status */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Ticket Verification</h2>
            <Link to="/dashboard/manage-tickets" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              Manage Tickets
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ticketStatus}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {ticketStatus.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.user}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 whitespace-nowrap">{activity.time.split(',')[0]}</p>
                  <span className={`inline-block mt-1 px-2 py-0.5 rounded text-xs ${getStatusBadge(activity.status)}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transport Distribution */}
      {transportDistribution.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Transport Type Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={transportDistribution} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="type" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link 
          to="/dashboard/manage-tickets"
          className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-600 text-white rounded-full">
              <Ticket size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Tickets</h3>
              <p className="text-sm text-gray-600">{stats.pendingTickets} pending approval</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/dashboard/manage-users"
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 text-white rounded-full">
              <Users size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600">{stats.totalUsers} total users</p>
            </div>
          </div>
        </Link>

        <Link 
          to="/dashboard/advertise-tickets"
          className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 hover:shadow-lg transition-all hover:scale-105"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600 text-white rounded-full">
              <TrendingUp size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Advertise Tickets</h3>
              <p className="text-sm text-gray-600">Promote top listings</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;