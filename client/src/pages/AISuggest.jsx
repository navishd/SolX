import { useState } from 'react';
import axios from 'axios';
import { Bot, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AISuggest = () => {
  const [problem, setProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/api/ai/suggest', { problem });
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Bot size={32} />
        </div>
        <h1 className="text-4xl font-bold mb-4">AI Solution Suggestion</h1>
        <p className="text-xl text-gray-400">Describe your business problem, and our AI will recommend the perfect system for you.</p>
      </div>

      <div className="bg-dark p-2 md:p-8 rounded-3xl border border-gray-800 shadow-2xl">
        <form onSubmit={handleSubmit} className="mb-8 p-4">
          <label className="block text-sm font-medium text-gray-300 mb-3">Describe your problem in detail:</label>
          <div className="relative">
            <textarea 
              rows="4"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              placeholder="e.g., We have a clinic with 5 doctors and patients are always waiting in long queues. We need a way to manage appointments better..."
              className="w-full bg-darker border border-gray-700 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary placeholder-gray-600 resize-none"
              required
            ></textarea>
          </div>
          <div className="mt-4 flex justify-end">
            <button 
              type="submit" 
              disabled={loading || !problem}
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : (
                <>Get Suggestion <Sparkles size={18} /></>
              )}
            </button>
          </div>
        </form>

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 md:p-8 bg-darker rounded-2xl border border-primary/30 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full"></div>
            
            <h3 className="text-sm font-bold text-primary tracking-wider uppercase mb-2">Recommended Solution</h3>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">{result.suggestion.title}</h2>
            
            <div className="inline-block px-3 py-1 bg-gray-800 rounded-md text-xs font-medium text-gray-300 mb-6">
              Category: {result.suggestion.category}
            </div>
            
            <div className="bg-dark p-5 rounded-xl border border-gray-800 mb-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2"><Bot size={18} className="text-primary"/> Why this fits:</h4>
              <p className="text-gray-400">{result.explanation}</p>
            </div>
            
            <button className="flex items-center gap-2 text-primary hover:text-blue-400 font-medium transition-colors">
              View details for this solution <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AISuggest;
