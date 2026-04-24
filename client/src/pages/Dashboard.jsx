import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [companyName, setCompanyName] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('Starter');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get('/api/projects');
      setProjects(data);
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/projects', {
        companyName, problemDescription, budget, deadline, selectedPlan
      });
      setProjects([...projects, data]);
      toast.success('Project request submitted successfully!');
      // Reset form
      setCompanyName('');
      setProblemDescription('');
      setBudget('');
      setDeadline('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting project');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-dark p-6 rounded-2xl border border-gray-800">
            <h2 className="text-xl font-bold mb-4">Your Projects</h2>
            {loading ? (
              <p>Loading projects...</p>
            ) : projects.length === 0 ? (
              <p className="text-gray-400">You haven't submitted any projects yet.</p>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project._id} className="bg-darker p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-lg">{project.companyName}</h3>
                      <p className="text-sm text-gray-400 truncate max-w-md">{project.problemDescription}</p>
                      <div className="mt-2 text-xs text-gray-500">Plan: {project.selectedPlan} | Budget: ${project.budget}</div>
                    </div>
                    <div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        project.status === 'In Progress' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-green-500/20 text-green-500'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-dark p-6 rounded-2xl border border-gray-800 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Request a Solution</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Company Name</label>
                <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)}
                  className="w-full bg-darker border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Problem Description</label>
                <textarea required value={problemDescription} onChange={e => setProblemDescription(e.target.value)} rows="3"
                  className="w-full bg-darker border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Budget ($)</label>
                  <input type="number" required value={budget} onChange={e => setBudget(e.target.value)}
                    className="w-full bg-darker border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Deadline</label>
                  <input type="date" required value={deadline} onChange={e => setDeadline(e.target.value)}
                    className="w-full bg-darker border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Plan</label>
                <select value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)}
                  className="w-full bg-darker border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary">
                  <option value="Starter">Starter</option>
                  <option value="Pro">Pro</option>
                  <option value="Enterprise">Enterprise</option>
                </select>
              </div>
              <button type="submit" className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors mt-4">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
