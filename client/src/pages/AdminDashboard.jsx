import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'projects') {
        const { data } = await axios.get('/api/admin/projects');
        setProjects(data);
      } else if (activeTab === 'users') {
        const { data } = await axios.get('/api/admin/users');
        setUsers(data);
      }
    } catch (error) {
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (id, status) => {
    try {
      await axios.put(`/api/admin/projects/${id}`, { status });
      setProjects(projects.map(p => p._id === id ? { ...p, status } : p));
      toast.success('Status updated');
    } catch (error) {
      toast.error('Error updating status');
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/api/admin/users/${id}`);
        setUsers(users.filter(u => u._id !== id));
        toast.success('User deleted');
      } catch (error) {
        toast.error('Error deleting user');
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row gap-8">
      <div className="w-full md:w-64 bg-dark p-4 rounded-2xl border border-gray-800 self-start">
        <h2 className="text-xl font-bold mb-6 px-2 text-primary">Admin Panel</h2>
        <nav className="space-y-2">
          <button onClick={() => setActiveTab('projects')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'projects' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}>Project Requests</button>
          <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'users' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}>Manage Users</button>
          <button onClick={() => setActiveTab('solutions')} className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${activeTab === 'solutions' ? 'bg-primary text-white' : 'text-gray-400 hover:bg-gray-800'}`}>Manage Solutions</button>
        </nav>
      </div>

      <div className="flex-1 bg-dark p-6 rounded-2xl border border-gray-800">
        <h2 className="text-2xl font-bold mb-6 capitalize">{activeTab} Management</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            {activeTab === 'projects' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">User</th>
                    <th className="py-3 px-4">Plan</th>
                    <th className="py-3 px-4">Budget</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map(project => (
                    <tr key={project._id} className="border-b border-gray-800 hover:bg-darker transition-colors">
                      <td className="py-3 px-4 font-medium">{project.companyName}</td>
                      <td className="py-3 px-4 text-sm">{project.userId?.email}</td>
                      <td className="py-3 px-4 text-sm">{project.selectedPlan}</td>
                      <td className="py-3 px-4 text-sm">${project.budget}</td>
                      <td className="py-3 px-4">
                        <select 
                          value={project.status} 
                          onChange={(e) => updateProjectStatus(project._id, e.target.value)}
                          className={`bg-darker border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none ${
                            project.status === 'Pending' ? 'text-yellow-500' :
                            project.status === 'In Progress' ? 'text-blue-500' : 'text-green-500'
                          }`}
                        >
                          <option value="Pending" className="text-white">Pending</option>
                          <option value="In Progress" className="text-white">In Progress</option>
                          <option value="Completed" className="text-white">Completed</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-sm"><button className="text-primary hover:underline">View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'users' && (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-700 text-gray-400">
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-b border-gray-800 hover:bg-darker transition-colors">
                      <td className="py-3 px-4">{u.name}</td>
                      <td className="py-3 px-4 text-sm">{u.email}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-gray-800'}`}>{u.role}</span>
                      </td>
                      <td className="py-3 px-4">
                        <button onClick={() => deleteUser(u._id)} className="text-red-500 hover:text-red-400 text-sm">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {activeTab === 'solutions' && (
               <div className="text-center py-10 text-gray-400">
                  <p>Solution management interface coming soon.</p>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-blue-600">Add New Solution</button>
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
