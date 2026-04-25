import User from "../models/User.js";
import Solution from "../models/Solution.js";
import ProjectRequest from "../models/ProjectRequest.js";

// GET /api/admin/stats
export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalProjects = await ProjectRequest.countDocuments();
    const pendingProjects = await ProjectRequest.countDocuments({ status: 'Pending' });
    const inProgressProjects = await ProjectRequest.countDocuments({ status: 'In Progress' });
    const completedProjects = await ProjectRequest.countDocuments({ status: 'Completed' });

    res.json({
      totalUsers,
      totalProjects,
      pendingProjects,
      inProgressProjects,
      completedProjects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/admin/projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await ProjectRequest.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/projects/:id/status
export const updateProjectStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const project = await ProjectRequest.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.status = status;
    const updated = await project.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/admin/solutions
export const createSolution = async (req, res) => {
  try {
    const { title, description, price, category, image, demoLink } = req.body;
    const solution = new Solution({ title, description, price, category, image, demoLink });
    const created = await solution.save();
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/admin/solutions/:id
export const updateSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) return res.status(404).json({ message: 'Solution not found' });
    Object.assign(solution, req.body);
    const updated = await solution.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/admin/solutions/:id
export const deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (!solution) return res.status(404).json({ message: 'Solution not found' });
    await solution.deleteOne();
    res.json({ message: 'Solution deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
