export const suggestSolution = async (req, res) => {
  try {
    const { problem } = req.body;
    if (!problem) {
      return res.status(400).json({ message: "Please describe your problem" });
    }

    const keywords = {
      'hospital': { title: 'E-Channeling System', category: 'Healthcare' },
      'health': { title: 'E-Channeling System', category: 'Healthcare' },
      'student': { title: 'Student Management System', category: 'Education' },
      'school': { title: 'Student Management System', category: 'Education' },
      'sell': { title: 'E-Commerce Platform', category: 'Retail' },
      'store': { title: 'E-Commerce Platform', category: 'Retail' },
      'food': { title: 'Restaurant Management System', category: 'Hospitality' }
    };

    let suggestion = null;
    let explanation = "Based on your description, we recommend a custom solution.";

    const problemLower = problem.toLowerCase();
    for (const [key, value] of Object.entries(keywords)) {
      if (problemLower.includes(key)) {
        suggestion = value;
        explanation = `Since you mentioned keywords related to ${key}, a ${value.title} would best suit your needs.`;
        break;
      }
    }

    if (!suggestion) {
       suggestion = { title: "Custom Web Application", category: "Custom" };
    }

    res.json({ suggestion, explanation });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
