import { useState, useEffect } from 'react';
import axios from 'axios';

const Solutions = () => {
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app we fetch from API. Using dummy data to showcase the design since admin solution creation isn't fully built yet.
    const fetchSolutions = async () => {
      try {
        const { data } = await axios.get('/api/solutions');
        if (data.length > 0) {
            setSolutions(data);
        } else {
             setSolutions([
              { _id: '1', title: 'E-Commerce Platform', category: 'Retail', price: 999, description: 'Complete online store with admin panel, payment gateway, and cart.', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80' },
              { _id: '2', title: 'Student Management', category: 'Education', price: 1499, description: 'Manage students, courses, grades, and attendance in one place.', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80' },
              { _id: '3', title: 'Hospital CRM', category: 'Healthcare', price: 2999, description: 'E-channeling, patient records, and doctor scheduling system.', image: 'https://images.unsplash.com/photo-1538108149393-cebb47ac1136?auto=format&fit=crop&w=800&q=80' },
            ]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSolutions();
  }, []);

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Pre-Built <span className="text-primary">Solutions</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Ready-to-deploy software systems to accelerate your business growth.</p>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading solutions...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map(solution => (
            <div key={solution._id} className="bg-dark rounded-2xl border border-gray-800 overflow-hidden hover:border-primary transition-colors group">
              <div className="h-48 overflow-hidden relative">
                <img src={solution.image || `https://via.placeholder.com/800x400?text=${solution.title}`} alt={solution.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-darker/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-gray-700">
                  {solution.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{solution.title}</h3>
                  <span className="text-primary font-bold text-lg">${solution.price}</span>
                </div>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3">{solution.description}</p>
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">Buy Now</button>
                  <button className="flex-1 bg-darker border border-gray-700 text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors">Demo</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Solutions;
