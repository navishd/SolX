import Solution from "../models/Solution.js";

export const getSolutions = async (req, res) => {
  try {
    const solutions = await Solution.find({});
    res.json(solutions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSolutionById = async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.id);
    if (solution) {
      res.json(solution);
    } else {
      res.status(404).json({ message: "Solution not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
