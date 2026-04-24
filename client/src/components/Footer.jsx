const Footer = () => {
  return (
    <footer className="bg-darker border-t border-gray-800 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-white font-bold text-2xl tracking-tighter">Sol<span className="text-primary">X</span></span>
            <p className="mt-4 text-sm">We Build Smart Web Solutions for Your Business Problems. Future-proof your company today.</p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Custom Web Apps</a></li>
              <li><a href="#" className="hover:text-white">E-Commerce</a></li>
              <li><a href="#" className="hover:text-white">Management Systems</a></li>
              <li><a href="#" className="hover:text-white">AI Integrations</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          &copy; {new Date().getFullYear()} SolX. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
