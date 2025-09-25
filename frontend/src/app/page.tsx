export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="hero min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold text-gray-900">DineLocal</h1>
            <p className="py-6 text-gray-600">
              Welcome to DineLocal! Your app is now powered by Next.js, Tailwind CSS v4, and modern web technologies.
            </p>

            {/* Custom Buttons (DaisyUI alternative) */}
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
                Primary Button
              </button>
              <button className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors shadow-md">
                Secondary Button
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md">
                Success Button
              </button>
            </div>

            {/* Custom Card Example */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-8 mx-auto max-w-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sample Restaurant</h3>
                  <p className="text-sm text-gray-500">Italian Cuisine</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                Experience the best local dining with fresh ingredients and amazing flavors.
              </p>
              <div className="flex gap-2">
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">4.5★</span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">Open</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">$$</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700 transition-colors">
                Order Now
              </button>
            </div>

            {/* Status Indicators */}
            <div className="flex gap-4 justify-center mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Tailwind CSS v4</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Next.js 15</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm text-gray-600">DaisyUI Pending</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-4xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">DineLocal</h3>
              <p className="text-gray-400 text-sm">
                Connecting you with the best local restaurants and dining experiences.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Restaurants</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Orders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 DineLocal. Built with Next.js and Tailwind CSS v4.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
