import User from "../models/User.js";
import ProjectRequest from "../models/ProjectRequest.js";
import Solution from "../models/Solution.js";

// Users
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User removed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Projects
export const getAdminProjects = async (req, res) => {
  try {
    const projects = await ProjectRequest.find({}).populate("userId", "name email");
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const project = await ProjectRequest.findById(req.params.id);
    if (project) {
      project.status = req.body.status || project.status;
      const updatedProject = await project.save();
      res.json(updatedProject);
    } else {
      res.status(404).json({ message: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Solutions
export const createSolution = async (req, res) => {
  try {
    const solution = new Solution(req.body);
    const createdSolution = await solution.save();
    res.status(201).json(createdSolution);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (solution) {
      Object.assign(solution, req.body);
      const updatedSolution = await solution.save();
      res.json(updatedSolution);
    } else {
      res.status(404).json({ message: "Solution not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteSolution = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (solution) {
      await solution.deleteOne();
      res.json({ message: "Solution removed" });
    } else {
      res.status(404).json({ message: "Solution not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
