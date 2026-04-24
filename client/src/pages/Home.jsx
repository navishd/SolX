import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-darker text-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary blur-[100px] rounded-full" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-8"
          >
            We Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Smart Web Solutions</span><br />
            For Your Business Problems
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            From custom web applications to pre-built systems and AI-powered recommendations, we provide the tools you need to scale your business.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link to="/register" className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-blue-600 transition-colors">
              Get Started
            </Link>
            <Link to="/solutions" className="px-8 py-4 rounded-full bg-gray-800 text-white font-semibold hover:bg-gray-700 transition-colors border border-gray-700">
              Explore Solutions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-400">Everything you need to digitalize your operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Custom Systems", desc: "Tailor-made software built exactly for your unique business needs." },
              { title: "Automation", desc: "Automate repetitive tasks and save hundreds of hours every month." },
              { title: "Web Apps", desc: "Modern, fast, and scalable web applications for your users." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="bg-darker p-8 rounded-2xl border border-gray-800 hover:border-primary transition-colors"
              >
                <div className="w-12 h-12 bg-gray-800 rounded-lg mb-6 flex items-center justify-center text-primary font-bold text-xl">
                  {i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How it Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8">
             <div className="flex-1">
                <div className="text-4xl font-bold text-gray-700 mb-4">01</div>
                <h3 className="text-xl font-semibold mb-2">Tell us your problem</h3>
                <p className="text-gray-400">Use our AI suggest or submit a custom project request.</p>
             </div>
             <div className="hidden md:block w-16 h-0.5 bg-gray-800"></div>
             <div className="flex-1">
                <div className="text-4xl font-bold text-gray-700 mb-4">02</div>
                <h3 className="text-xl font-semibold mb-2">Get a solution</h3>
                <p className="text-gray-400">We analyze your request and provide the best approach.</p>
             </div>
             <div className="hidden md:block w-16 h-0.5 bg-gray-800"></div>
             <div className="flex-1">
                <div className="text-4xl font-bold text-gray-700 mb-4">03</div>
                <h3 className="text-xl font-semibold mb-2">We build it</h3>
                <p className="text-gray-400">Our experts build, deploy, and maintain your system.</p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
