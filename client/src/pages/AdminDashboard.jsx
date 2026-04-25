import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const STATUS_COLORS = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  Completed: 'bg-green-500/20 text-green-400 border-green-500/30',
};

const TABS = ['overview', 'solutions', 'users', 'projects'];

const EMPTY_FORM = { title: '', description: '', price: '', category: '', image: '', demoLink: '' };

const AdminDashboard = () => {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Solution form state
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([fetchStats(), fetchUsers(), fetchProjects(), fetchSolutions()]);
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/admin/stats');
      setStats(data);
    } catch { toast.error('Failed to load stats'); }
  };

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('/api/admin/users');
      setUsers(data);
    } catch { toast.error('Failed to load users'); }
  };

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/admin/projects');
      setProjects(data);
    } catch { toast.error('Failed to load projects'); }
  };

  const fetchSolutions = async () => {
    try {
      const { data } = await axios.get('/api/solutions');
      setSolutions(data);
    } catch { toast.error('Failed to load solutions'); }
  };

  /* ── Solution handlers ── */
  const openCreate = () => { setForm(EMPTY_FORM); setEditingId(null); setFormOpen(true); };
  const openEdit = (s) => { setForm({ title: s.title, description: s.description, price: s.price, category: s.category, image: s.image, demoLink: s.demoLink || '' }); setEditingId(s._id); setFormOpen(true); };
  const closeForm = () => { setFormOpen(false); setForm(EMPTY_FORM); setEditingId(null); };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingId) {
        const { data } = await axios.put(`/api/admin/solutions/${editingId}`, form);
        setSolutions(solutions.map(s => s._id === editingId ? data : s));
        toast.success('Solution updated!');
      } else {
        const { data } = await axios.post('/api/admin/solutions', form);
        setSolutions([...solutions, data]);
        toast.success('Solution created!');
      }
      closeForm();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving solution');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteSolution = async (id) => {
    if (!window.confirm('Delete this solution?')) return;
    try {
      await axios.delete(`/api/admin/solutions/${id}`);
      setSolutions(solutions.filter(s => s._id !== id));
      toast.success('Solution deleted');
    } catch { toast.error('Failed to delete'); }
  };

  /* ── User handlers ── */
  const handleDeleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await axios.delete(`/api/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch { toast.error('Failed to delete user'); }
  };

  /* ── Project handlers ── */
  const handleStatusChange = async (projectId, status) => {
    try {
      const { data } = await axios.put(`/api/admin/projects/${projectId}/status`, { status });
      setProjects(projects.map(p => p._id === projectId ? data : p));
      toast.success(`Status → ${status}`);
    } catch { toast.error('Failed to update status'); }
  };

  const StatCard = ({ label, value, color }) => (
    <div className="bg-dark border border-gray-800 rounded-2xl p-6 flex flex-col gap-2">
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
      <div className="flex gap-2 mb-8 border-b border-gray-800 overflow-x-auto">
        {TABS.map(t => (
          <button
            key={t}
            id={`admin-tab-${t}`}
            onClick={() => setTab(t)}
            className={`px-5 py-2 capitalize text-sm font-medium rounded-t-lg transition-colors whitespace-nowrap ${
              tab === t ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t}
            {t === 'solutions' && <span className="ml-2 bg-primary/30 text-primary text-xs px-2 py-0.5 rounded-full">{solutions.length}</span>}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-gray-400 py-10 text-center animate-pulse">Loading...</div>
      ) : (
        <>
          {/* ── Overview ── */}
          {tab === 'overview' && stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <StatCard label="Total Users" value={stats.totalUsers} color="text-white" />
              <StatCard label="Total Projects" value={stats.totalProjects} color="text-blue-400" />
              <StatCard label="Pending" value={stats.pendingProjects} color="text-yellow-400" />
              <StatCard label="In Progress" value={stats.inProgressProjects} color="text-blue-400" />
              <StatCard label="Completed" value={stats.completedProjects} color="text-green-400" />
            </div>
          )}

          {/* ── Solutions ── */}
          {tab === 'solutions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Pre-Built Solutions</h2>
                <button
                  id="admin-add-solution-btn"
                  onClick={openCreate}
                  className="bg-primary hover:bg-blue-600 text-white text-sm font-medium px-5 py-2 rounded-lg transition-colors"
                >
                  + Add Solution
                </button>
              </div>

              {/* Form Modal */}
              {formOpen && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-dark border border-gray-700 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">
                      {editingId ? 'Edit Solution' : 'New Solution'}
                    </h3>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      {[
                        { label: 'Title', key: 'title', type: 'text' },
                        { label: 'Category  (e.g. Retail, Education)', key: 'category', type: 'text' },
                        { label: 'Price ($)', key: 'price', type: 'number' },
                        { label: 'Image URL', key: 'image', type: 'url' },
                        { label: 'Demo Link (optional)', key: 'demoLink', type: 'url' },
                      ].map(({ label, key, type }) => (
                        <div key={key}>
                          <label className="block text-sm text-gray-400 mb-1">{label}</label>
                          <input
                            id={`solution-${key}`}
                            type={type}
                            value={form[key]}
                            onChange={e => setForm({ ...form, [key]: e.target.value })}
                            required={key !== 'demoLink'}
                            className="w-full bg-darker border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-sm"
                          />
                        </div>
                      ))}
                      <div>
                        <label className="block text-sm text-gray-400 mb-1">Description</label>
                        <textarea
                          id="solution-description"
                          value={form.description}
                          onChange={e => setForm({ ...form, description: e.target.value })}
                          required
                          rows={3}
                          className="w-full bg-darker border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary text-sm"
                        />
                      </div>
                      <div className="flex gap-3 pt-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="flex-1 bg-primary hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                          {submitting ? 'Saving…' : editingId ? 'Update' : 'Create'}
                        </button>
                        <button
                          type="button"
                          onClick={closeForm}
                          className="flex-1 bg-darker border border-gray-700 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Solutions Grid */}
              {solutions.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-lg">No solutions yet.</p>
                  <p className="text-sm mt-1">Click "Add Solution" to create the first one.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {solutions.map(s => (
                    <div key={s._id} className="bg-dark border border-gray-800 rounded-2xl overflow-hidden group hover:border-primary transition-colors">
                      <div className="h-40 overflow-hidden relative">
                        <img
                          src={s.image || `https://via.placeholder.com/400x200?text=${s.title}`}
                          alt={s.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 right-3 bg-darker/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs border border-gray-700 text-white">
                          {s.category}
                        </span>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-white">{s.title}</h3>
                          <span className="text-primary font-bold">${s.price}</span>
                        </div>
                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">{s.description}</p>
                        <div className="flex gap-2">
                          <button
                            id={`edit-solution-${s._id}`}
                            onClick={() => openEdit(s)}
                            className="flex-1 bg-primary/20 text-primary text-sm font-medium py-1.5 rounded-lg hover:bg-primary/30 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            id={`delete-solution-${s._id}`}
                            onClick={() => handleDeleteSolution(s._id)}
                            className="flex-1 bg-red-500/10 text-red-400 text-sm font-medium py-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Users ── */}
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
                      <td className="px-6 py-4 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
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

          {/* ── Projects ── */}
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
