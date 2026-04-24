import ProjectRequest from "../models/ProjectRequest.js";

export const getProjects = async (req, res) => {
  try {
    const projects = await ProjectRequest.find({ userId: req.user._id });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const { companyName, problemDescription, budget, deadline, selectedPlan } = req.body;
    const project = new ProjectRequest({
      userId: req.user._id,
      companyName,
      problemDescription,
      budget,
      deadline,
      selectedPlan
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
