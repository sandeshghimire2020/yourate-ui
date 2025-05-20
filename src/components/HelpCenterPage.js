import React from 'react';
import { Link } from 'react-router-dom';

const HelpCenterPage = () => {
  // FAQ categories
  const categories = [
    {
      id: 'account',
      name: 'Account & Profile',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      id: 'ratings',
      name: 'Ratings & Reviews',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      id: 'creators',
      name: 'Finding Creators',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    },
    {
      id: 'technical',
      name: 'Technical Support',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    }
  ];
  
  // FAQ questions
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "You can create an account by clicking on the 'Sign Up' button in the top right corner of the page. You can sign up using your email address or through your Google or Facebook account.",
      category: "account"
    },
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on the 'Log In' button, then click on 'Forgot Password?' and follow the instructions sent to your email.",
      category: "account"
    },
    {
      question: "Can I change my username?",
      answer: "Yes, you can change your username in your account settings. Go to your profile, click on 'Edit Profile', and update your username in the form.",
      category: "account"
    },
    {
      question: "How do ratings work?",
      answer: "Ratings are on a 5-star scale. You can rate creators based on various aspects like content quality, consistency, authenticity, etc. Your rating will contribute to the creator's overall score.",
      category: "ratings"
    },
    {
      question: "Can I edit or delete my review?",
      answer: "Yes, you can edit or delete your reviews at any time. Go to your profile, find the review you want to modify in your 'My Reviews' section, and click on 'Edit' or 'Delete'.",
      category: "ratings"
    },
    {
      question: "Are my reviews anonymous?",
      answer: "By default, reviews show your username. If you prefer to remain anonymous, you can enable the 'Post Anonymously' option when writing a review.",
      category: "ratings"
    },
    {
      question: "How do I find creators to rate?",
      answer: "You can use the search bar at the top of the homepage to search for creators by name. You can also browse the 'Top Creators' section or check out the 'Recently Rated' section for ideas.",
      category: "creators"
    },
    {
      question: "Can I suggest a creator that's not on the platform?",
      answer: "Yes! If you can't find a creator you want to rate, you can suggest them through the 'Suggest Creator' form. We'll review the suggestion and add them to our database.",
      category: "creators"
    },
    {
      question: "How can I filter creators by category?",
      answer: "On the search results page, you can use the filter options on the left sidebar to narrow down creators by category, content type, subscriber count, and more.",
      category: "creators"
    },
    {
      question: "The website is loading slowly. What should I do?",
      answer: "Try refreshing the page or clearing your browser cache. If the issue persists, check your internet connection or try accessing the site from a different browser.",
      category: "technical"
    },
    {
      question: "I found a bug. How do I report it?",
      answer: "We appreciate your help in improving our platform! You can report bugs through the 'Report a Bug' form in the Help Center or by emailing support@creatorrate.com.",
      category: "technical"
    },
    {
      question: "Is the website mobile-friendly?",
      answer: "Yes, CreatorRate is designed to work on all devices. If you're experiencing display issues on mobile, please let us know through our support channels.",
      category: "technical"
    }
  ];
  
  // State for active category filter
  const [activeCategory, setActiveCategory] = React.useState('all');
  
  // Filter FAQs based on active category
  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">Help Center</h1>
          <p className="text-xl text-indigo-100 text-center mt-4 max-w-2xl mx-auto">
            Find answers to common questions and get support
          </p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 max-w-6xl mb-16">
        {/* Search */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">How can we help you today?</h2>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                className="w-full pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-gray-300 text-gray-700" 
                placeholder="Search for answers..."
              />
            </div>
          </div>
        </div>
        
        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div 
            className={`p-4 rounded-xl shadow-md text-center cursor-pointer ${activeCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-50'}`}
            onClick={() => setActiveCategory('all')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="font-medium">All Topics</span>
          </div>
          
          {categories.map(category => (
            <div 
              key={category.id}
              className={`p-4 rounded-xl shadow-md text-center cursor-pointer ${activeCategory === category.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-indigo-50'}`}
              onClick={() => setActiveCategory(category.id)}
            >
              <div className="mx-auto mb-2">{category.icon}</div>
              <span className="font-medium">{category.name}</span>
            </div>
          ))}
        </div>
        
        {/* FAQs */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No FAQs found for this category. Please try another category.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Contact section */}
        <div className="mt-12 bg-indigo-50 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            If you couldn't find the answer you were looking for, please don't hesitate to reach out to our support team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-3">Send us an email and we'll get back to you within 24 hours.</p>
                <a href="mailto:support@creatorrate.com" className="text-indigo-600 font-medium hover:text-indigo-800">support@creatorrate.com</a>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 flex items-start">
              <div className="bg-indigo-100 p-3 rounded-full mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-3">Chat with our support team in real-time during business hours.</p>
                <button className="text-indigo-600 font-medium hover:text-indigo-800">Start a Chat</button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Link to="/contact" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">
              Contact Us
            </Link>
          </div>
        </div>
        
        {/* Popular creators section */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Popular Creators</h2>
            <Link
              to="/top-creators"
              className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition"
            >
              See all top creators
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Creator card 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src="https://i.pravatar.cc/300?img=1" alt="MrBeast" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center">
                    <span className="font-medium mr-1">4.9</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-12 p-6">
                <h3 className="text-lg font-semibold text-gray-800">MrBeast</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">Known for his expensive stunts and philanthropy videos with high production value.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">230 ratings</span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
            
            {/* Creator card 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
              <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-500 relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src="https://i.pravatar.cc/300?img=2" alt="MKBHD" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center">
                    <span className="font-medium mr-1">4.8</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-12 p-6">
                <h3 className="text-lg font-semibold text-gray-800">MKBHD</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">Quality tech videos with a focus on smartphones, cameras, and cutting-edge technology.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">203 ratings</span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
            
            {/* Creator card 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition">
              <div className="h-32 bg-gradient-to-r from-red-500 to-orange-500 relative">
                <div className="absolute -bottom-10 left-6">
                  <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-lg">
                    <div className="w-full h-full rounded-lg bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img src="https://i.pravatar.cc/300?img=3" alt="Linus Tech Tips" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                  <div className="flex items-center">
                    <span className="font-medium mr-1">4.7</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="pt-12 p-6">
                <h3 className="text-lg font-semibold text-gray-800">Linus Tech Tips</h3>
                <p className="text-gray-600 mt-2 line-clamp-2">Tech reviews, showcases, and news with a comedic twist and educational approach.</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">156 ratings</span>
                  <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;