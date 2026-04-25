import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/admin/stats');
      setStats(data);
    } catch {
      toast.error('Failed to load stats');
    }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users');
      setUsers(data);
    } catch {
      toast.error('Failed to load users');
    }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/admin/projects');
      setProjects(data);
    } catch {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const handleStatusChange = async (projectId, status) => {
    try {
      const { data } = await axios.put(`/api/admin/projects/${projectId}/status`, { status });
      setProjects(projects.map(p => p._id === projectId ? data : p));
      toast.success(`Status updated to ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const StatCard = ({ label, value, color }) => (
    <div className={`bg-dark border border-gray-800 rounded-2xl p-6 flex flex-col gap-2`}>
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-4xl font-bold ${color}`}>{value ?? '—'}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome back, {user?.name}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-800">
        {['overview', 'users', 'projects'].map(t => (
          <button
            key={t}
            id={`admin-tab-${t}`}
            onClick={() => setTab(t)}
            className={`px-5 py-2 capitalize text-sm font-medium rounded-t-lg transition-colors ${
              tab === t
                ? 'bg-primary text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-400 py-10 text-center">Loading...</div>
      ) : (
        <>
          {/* Overview */}
          {tab === 'overview' && stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard label="Total Users" value={stats.totalUsers} color="text-white" />
              <StatCard label="Total Projects" value={stats.totalProjects} color="text-blue-400" />
              <StatCard label="Pending" value={stats.pendingProjects} color="text-yellow-400" />
              <StatCard label="In Progress" value={stats.inProgressProjects} color="text-blue-400" />
              <StatCard label="Completed" value={stats.completedProjects} color="text-green-400" />
            </div>
          )}

          {/* Users */}
          {tab === 'users' && (
            <div className="bg-dark border border-gray-800 rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-darker text-gray-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-3 text-left">Name</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Joined</th>
                    <th className="px-6 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {users.length === 0 ? (
                    <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No users found.</td></tr>
                  ) : users.map(u => (
                    <tr key={u._id} className="hover:bg-darker/50 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{u.name}</td>
                      <td className="px-6 py-4 text-gray-400">{u.email}</td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          id={`delete-user-${u._id}`}
                          onClick={() => handleDeleteUser(u._id)}
                          className="text-red-500 hover:text-red-400 text-xs font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Projects */}
          {tab === 'projects' && (
            <div className="space-y-4">
              {projects.length === 0 ? (
                <p className="text-gray-500 text-center py-10">No projects submitted yet.</p>
              ) : projects.map(project => (
                <div key={project._id} className="bg-dark border border-gray-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-lg truncate">{project.companyName}</h3>
                    <p className="text-gray-400 text-sm truncate">{project.problemDescription}</p>
                    <div className="mt-2 text-xs text-gray-500 flex flex-wrap gap-3">
                      <span>Plan: <span className="text-gray-300">{project.selectedPlan}</span></span>
                      <span>Budget: <span className="text-gray-300">${project.budget}</span></span>
                      <span>By: <span className="text-gray-300">{project.userId?.name ?? 'Unknown'}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLORS[project.status]}`}>
                      {project.status}
                    </span>
                    <select
                      id={`status-select-${project._id}`}
                      value={project.status}
                      onChange={e => handleStatusChange(project._id, e.target.value)}
                      className="bg-darker border border-gray-700 text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-primary"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
