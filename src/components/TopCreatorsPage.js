import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const TopCreatorsPage = () => {
  const navigate = useNavigate();
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter state
  const [minRatings, setMinRatings] = useState(1);
  const [maxResults, setMaxResults] = useState(20);
  
  useEffect(() => {
    fetchTopCreators();
  }, [minRatings, maxResults]);
  
  const fetchTopCreators = async () => {
    setLoading(true);
    try {
      const data = await apiService.getTopCreators(maxResults, minRatings);
      setCreators(data.creators || []);
    } catch (err) {
      console.error('Error fetching top creators:', err);
      setError('Failed to load top creators. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  // Navigate to creator profile
  const navigateToProfile = (channelId) => {
    navigate(`/profile/${channelId}`);
  };
  
  // Format star rating
  const getStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    let stars = '';
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars += '★';
      } else if (i === fullStars + 1 && halfStar) {
        stars += '★';
      } else {
        stars += '☆';
      }
    }
    
    return stars;
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">Top Rated YouTube Creators</h1>
          <p className="text-xl text-indigo-100 text-center mt-4 max-w-2xl mx-auto">
            Discover the most highly-rated content creators across YouTube
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Filter section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filter Creators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Minimum Ratings: {minRatings}
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={minRatings} 
                  onChange={(e) => setMinRatings(parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-12 text-center">{minRatings}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Only show creators with at least this many ratings</p>
            </div>
            
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Max Results: {maxResults}
              </label>
              <div className="flex items-center gap-4">
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  step="10"
                  value={maxResults} 
                  onChange={(e) => setMaxResults(parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600 w-12 text-center">{maxResults}</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Number of creators to display</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            <button 
              onClick={fetchTopCreators}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow-md"
            >
              Apply Filters
            </button>
          </div>
        </div>
        
        {/* Results */}
        {loading ? (
          <div className="flex justify-center my-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="text-center py-24">
            <div className="text-lg text-red-600 mb-4">
              {error}
            </div>
            <button
              onClick={fetchTopCreators}
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow-md"
            >
              Try Again
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {creators.length} Top Creators {minRatings > 1 ? `with ${minRatings}+ ratings` : ''}
              </h2>
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-500">Sort by:</span>
                <select className="bg-white border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                  <option>Highest Rating</option>
                  <option>Most Ratings</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {creators.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 text-lg">No creators found with the selected filters.</p>
                  <p className="text-gray-400 mt-2">Try reducing the minimum ratings.</p>
                </div>
              ) : (
                creators.map((creator, index) => {
                  // Define gradient colors to cycle through
                  const gradientColors = [
                    'from-indigo-500 to-purple-600',
                    'from-blue-500 to-cyan-500',
                    'from-red-500 to-orange-500',
                    'from-green-500 to-emerald-500',
                    'from-pink-500 to-rose-500'
                  ];
                  
                  const randomGradient = gradientColors[index % gradientColors.length];
                  
                  // Get the best available profile picture
                  const profilePic = creator.profilePicture?.high || 
                                    creator.profilePicture?.medium || 
                                    creator.profilePicture?.default || 
                                    creator.thumbnailUrl || 
                                    null;
                  
                  return (
                    <div 
                      key={creator.channelId} 
                      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer card-hover"
                      onClick={() => navigateToProfile(creator.channelId)}
                    >
                      <div className={`h-32 bg-gradient-to-r ${randomGradient} relative`}>
                        <div className="absolute -bottom-10 left-6">
                          <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-lg">
                            <div className="w-full h-full rounded-lg overflow-hidden bg-gray-200 flex items-center justify-center">
                              {profilePic ? (
                                <img src={profilePic} alt={creator.channelTitle} className="w-full h-full object-cover" />
                              ) : (
                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                          <div className="flex items-center">
                            <span className="font-medium mr-1">{creator.averageRating.toFixed(1)}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="pt-12 p-6">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">{creator.channelTitle}</h3>
                            <div className="flex items-center mt-1">
                              <div className="rating-display text-sm">{getStarRating(creator.averageRating || 0)}</div>
                            </div>
                          </div>
                          <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            #{index + 1}
                          </span>
                        </div>
                        {creator.description && (
                          <p className="text-gray-600 mt-3 text-sm line-clamp-3">
                            {creator.description}
                          </p>
                        )}
                        <div className="mt-4 flex justify-between items-center">
                          <span className="text-sm text-gray-500">{creator.totalRatings} ratings</span>
                          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition flex items-center">
                            View Profile
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopCreatorsPage;