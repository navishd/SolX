import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      price: '499',
      desc: 'Perfect for small businesses starting their digital journey.',
      features: ['Basic Web Application', 'Up to 5 Pages', 'Contact Form', 'Mobile Responsive', '1 Month Support'],
      highlighted: false
    },
    {
      name: 'Pro',
      price: '1499',
      desc: 'Advanced systems for growing companies with specific needs.',
      features: ['Custom Web Application', 'User Authentication', 'Database Integration', 'Admin Dashboard', 'API Access', '3 Months Support'],
      highlighted: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Full-scale solutions for large organizations.',
      features: ['Complex System Architecture', 'AI Integrations', 'High Availability', 'Custom Security', 'Dedicated Project Manager', '24/7 Premium Support'],
      highlighted: false
    }
  ];

  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent <span className="text-primary">Pricing</span></h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">Choose the plan that fits your business needs. No hidden fees.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
        {plans.map((plan, i) => (
          <div key={i} className={`bg-dark rounded-3xl border ${plan.highlighted ? 'border-primary ring-1 ring-primary relative scale-105 shadow-2xl shadow-primary/20' : 'border-gray-800'} p-8`}>
            {plan.highlighted && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <p className="text-gray-400 text-sm mb-6 h-10">{plan.desc}</p>
            
            <div className="mb-8">
              <span className="text-5xl font-extrabold">{plan.price === 'Custom' ? 'Custom' : `$${plan.price}`}</span>
              {plan.price !== 'Custom' && <span className="text-gray-400">/project</span>}
            </div>
            
            <Link to="/register" className={`block w-full py-3 px-4 rounded-xl text-center font-bold transition-colors mb-8 ${plan.highlighted ? 'bg-primary text-white hover:bg-blue-600' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
              Choose {plan.name}
            </Link>
            
            <div className="space-y-4">
              <p className="font-semibold text-sm">What's included:</p>
              <ul className="space-y-3">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check size={18} className="text-primary shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
