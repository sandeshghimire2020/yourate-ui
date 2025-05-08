import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import apiService from '../services/api';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [featuredCreators, setFeaturedCreators] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const searchInputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const navigate = useNavigate();
  
  // Sample creators for suggestions (we'll use this if API fails)
  const sampleCreators = [
    { id: 'UCX6OQ3DkcsbYNE6H8uQQuVA', title: 'MrBeast' },
    { id: 'UCBJycsmduvYEL83R_U4JriQ', title: 'MKBHD' },
    { id: 'UCXuqSBlHAE6Xw-yeJA0Tunw', title: 'Linus Tech Tips' },
    { id: 'UCiT9RITQ9PW6BhXK0y2jaeg', title: 'New Rockstars' },
    { id: 'UC7_YxT-KID8kRbqZo7MyscQ', title: 'Markiplier' },
    { id: 'UCY1kMZp36IQSyNx_9h4mpCg', title: 'Mark Rober' },
    { id: 'UC0v-tlzsn0QZwJnkiaUSJVQ', title: 'FBE' },
    { id: 'UCJ5v_MCY6GNUBTO8-D3XoAg', title: 'WWE' },
    { id: 'UCJ24N4O0bP7LGLBDvye7oCA', title: 'KallmeKris' },
    { id: 'UCq-Fj5jknLsUf-MWSy4_brA', title: 'T-Series' }
  ];
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target) && 
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to handle search input change with debouncing
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    if (value.trim().length > 1) {
      // Set a new timeout to fetch suggestions after user stops typing
      setTypingTimeout(
        setTimeout(() => {
          fetchSuggestions(value);
        }, 300) // 300ms delay
      );
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  // Function to fetch suggestions
  const fetchSuggestions = async (query) => {
    try {
      const data = await apiService.searchChannels(query, 5);
      if (data && data.items && Array.isArray(data.items)) {
        const formattedSuggestions = data.items.map(item => ({
          id: item.id?.channelId || item.id || '',
          title: item.snippet?.title || 'Unknown Creator',
          thumbnail: item.snippet?.thumbnails?.default?.url
        }));
        setSuggestions(formattedSuggestions);
      } else {
        // If API fails, filter sample creators as fallback
        const filteredSuggestions = sampleCreators
          .filter(creator => 
            creator.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5);
        setSuggestions(filteredSuggestions);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      // If API fails, filter sample creators as fallback
      const filteredSuggestions = sampleCreators
        .filter(creator => 
          creator.title.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filteredSuggestions);
    }
  };
  
  // Function to handle selecting a suggestion
  const handleSelectSuggestion = (channelId, title) => {
    setSearchQuery(title);
    setShowSuggestions(false);
    navigateToProfile(channelId);
  };
  
  // Function to handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setShowResults(true);
    setShowSuggestions(false);
    
    try {
      const data = await apiService.searchChannels(searchQuery);
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
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

  // Featured creators - load from top creators API
  useEffect(() => {
    const fetchTopFeaturedCreators = async () => {
      setLoadingFeatured(true);
      try {
        // Get top creators with at least 1 rating, sort by rating and number of ratings
        const response = await apiService.getTopCreators(10, 1);
        
        if (response && response.creators && response.creators.length > 0) {
          // Sort by rating first, then by number of ratings
          const sortedCreators = [...response.creators].sort((a, b) => {
            if (a.averageRating === b.averageRating) {
              return b.totalRatings - a.totalRatings; // More ratings first when ratings are equal
            }
            return b.averageRating - a.averageRating; // Higher ratings first
          });
          
          // Take the top 3 creators
          const topCreators = sortedCreators.slice(0, 3).map(creator => ({
            id: creator.channelId,
            title: creator.channelTitle,
            description: creator.description || "Popular YouTube creator with great content.",
            thumbnail: creator.profilePicture?.high || 
                      creator.profilePicture?.medium || 
                      creator.profilePicture?.default || 
                      creator.thumbnailUrl || null,
            rating: creator.averageRating || 0,
            ratingCount: creator.totalRatings || 0,
            category: 'Creator'
          }));
          
          setFeaturedCreators(topCreators);
        } else {
          // Fallback to sample creators if API returns nothing
          setFeaturedCreators([
            {
              id: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
              title: 'MrBeast',
              description: 'Known for expensive stunts and philanthropy videos.',
              rating: 4.9,
              ratingCount: 230,
              category: 'Entertainment'
            },
            {
              id: 'UCBJycsmduvYEL83R_U4JriQ',
              title: 'MKBHD',
              description: 'Quality tech videos with a focus on smartphones, cameras, and cutting-edge technology.',
              rating: 4.8,
              ratingCount: 203,
              category: 'Tech'
            },
            {
              id: 'UCXuqSBlHAE6Xw-yeJA0Tunw',
              title: 'Linus Tech Tips',
              description: 'Tech reviews, showcases, and news with a comedic twist.',
              rating: 4.7,
              ratingCount: 156,
              category: 'Tech'
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching top creators:', error);
        // Fallback data if API fails
        setFeaturedCreators([
          {
            id: 'UCX6OQ3DkcsbYNE6H8uQQuVA',
            title: 'MrBeast',
            description: 'Known for expensive stunts and philanthropy videos.',
            rating: 4.9,
            ratingCount: 230,
            category: 'Entertainment'
          },
          {
            id: 'UCBJycsmduvYEL83R_U4JriQ',
            title: 'MKBHD',
            description: 'Quality tech videos with a focus on smartphones, cameras, and cutting-edge technology.',
            rating: 4.8,
            ratingCount: 203,
            category: 'Tech'
          },
          {
            id: 'UCXuqSBlHAE6Xw-yeJA0Tunw',
            title: 'Linus Tech Tips',
            description: 'Tech reviews, showcases, and news with a comedic twist.',
            rating: 4.7,
            ratingCount: 156,
            category: 'Tech'
          }
        ]);
      } finally {
        setLoadingFeatured(false);
      }
    };

    fetchTopFeaturedCreators();
  }, []);

  return (
    <>
      {/* Hero Section with Search */}
      <div className="search-container pt-16 pb-32 mb-8 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Discover & Rate <br className="md:hidden" /> YouTube Creators</h1>
          <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">Find honest reviews or share your experience with your favorite content creators.</p>
          
          <div className="max-w-2xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input 
              type="text" 
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-12 pr-20 py-4 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-700" 
              placeholder="Search for a YouTube creator..."
              ref={searchInputRef}
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition shadow-md"
            >
              Search
            </button>
            {showSuggestions && (
              <div 
                className="absolute left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                ref={suggestionsRef}
              >
                {suggestions.length === 0 ? (
                  <div className="p-4 text-gray-500 text-sm">No suggestions found.</div>
                ) : (
                  suggestions.map((suggestion) => (
                    <div 
                      key={suggestion.id} 
                      className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSelectSuggestion(suggestion.id, suggestion.title)}
                    >
                      {suggestion.thumbnail && (
                        <img 
                          src={suggestion.thumbnail} 
                          alt={suggestion.title} 
                          className="w-10 h-10 rounded-full mr-3"
                        />
                      )}
                      <div className="text-gray-700">{suggestion.title}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select className="bg-white border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                <option>Relevance</option>
                <option>Rating: High to Low</option>
                <option>Rating: Low to High</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Loading skeletons
              [...Array(3)].map((_, i) => (
                <div key={`skeleton-${i}`} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-32 skeleton"></div>
                  <div className="p-6">
                    <div className="h-6 w-2/3 skeleton mb-4 rounded"></div>
                    <div className="h-4 w-24 skeleton mb-6 rounded"></div>
                    <div className="h-4 w-full skeleton mb-2 rounded"></div>
                    <div className="h-4 w-3/4 skeleton mb-4 rounded"></div>
                    <div className="flex justify-between mt-6">
                      <div className="h-4 w-16 skeleton rounded"></div>
                      <div className="h-4 w-24 skeleton rounded"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : searchResults.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500 text-lg">No creators found matching your search.</p>
                <p className="text-gray-400 mt-2">Try a different name or check your spelling.</p>
              </div>
            ) : (
              // Search results
              searchResults.map((creator, index) => {
                const gradientColors = [
                  'from-indigo-500 to-purple-600',
                  'from-blue-500 to-cyan-500',
                  'from-red-500 to-orange-500',
                  'from-green-500 to-emerald-500',
                  'from-pink-500 to-rose-500'
                ];
                
                const randomGradient = gradientColors[index % gradientColors.length];
                
                // Handle any field that might be missing in the API response
                const channelId = creator.id?.channelId || creator.id || '';
                const title = creator.snippet?.title || 'Unknown Creator';
                const description = creator.snippet?.description || 'No description available';
                const thumbnailUrl = creator.snippet?.thumbnails?.default?.url;
                
                return (
                  <div 
                    key={channelId} 
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer card-hover"
                    onClick={() => navigateToProfile(channelId)}
                  >
                    <div className={`h-32 bg-gradient-to-r ${randomGradient} relative`}>
                      <div className="absolute -bottom-10 left-6">
                        <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-lg">
                          <div className="w-full h-full rounded-lg overflow-hidden">
                            {thumbnailUrl ? (
                              <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-12 p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                          <div className="flex items-center mt-1">
                            <div className="rating-display text-sm">{getStarRating(creator.rating || 0)}</div>
                            <span className="text-gray-500 text-sm ml-1">({(creator.rating || 0).toFixed(1)})</span>
                          </div>
                        </div>
                        <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {creator.category || 'Creator'}
                        </span>
                      </div>
                      <p className="text-gray-600 mt-3 text-sm line-clamp-2">{description}</p>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-500">{creator.ratingCount || 0} ratings</span>
                        <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Featured Creators Section */}
      <div className="container mx-auto px-4 py-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Top Rated Creators</h2>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingFeatured ? (
            // Loading skeletons for featured creators
            [...Array(3)].map((_, i) => (
              <div key={`featured-skeleton-${i}`} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="h-32 skeleton"></div>
                <div className="p-6">
                  <div className="h-6 w-2/3 skeleton mb-4 rounded"></div>
                  <div className="h-4 w-24 skeleton mb-6 rounded"></div>
                  <div className="h-4 w-full skeleton mb-2 rounded"></div>
                  <div className="h-4 w-3/4 skeleton mb-4 rounded"></div>
                  <div className="flex justify-between mt-6">
                    <div className="h-4 w-16 skeleton rounded"></div>
                    <div className="h-4 w-24 skeleton rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            featuredCreators.map((creator, index) => {
              // Define gradient colors to cycle through
              const gradientColors = [
                'from-indigo-500 to-purple-600',
                'from-blue-500 to-cyan-500',
                'from-red-500 to-orange-500'
              ];
              
              const gradient = gradientColors[index % gradientColors.length];
              
              return (
                <div
                  key={creator.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition card-hover"
                  onClick={() => navigateToProfile(creator.id)}
                >
                  <div className={`h-32 bg-gradient-to-r ${gradient} relative`}>
                    <div className="absolute -bottom-10 left-6">
                      <div className="w-20 h-20 rounded-xl bg-white p-1 shadow-lg">
                        <div className="w-full h-full rounded-lg flex items-center justify-center bg-gray-200">
                          {creator.thumbnail ? (
                            <img src={creator.thumbnail} alt={creator.title} className="w-full h-full object-cover rounded-lg" />
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
                        <span className="font-medium mr-1">{creator.rating.toFixed(1)}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full">
                      #{index + 1} Top Rated
                    </div>
                  </div>
                  <div className="pt-12 p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{creator.title}</h3>
                        <div className="flex items-center mt-1">
                          <div className="rating-display text-sm">{getStarRating(creator.rating || 0)}</div>
                        </div>
                      </div>
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {creator.category || 'Creator'}
                      </span>
                    </div>
                    <p className="text-gray-600 mt-3 text-sm line-clamp-3">{creator.description}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{creator.ratingCount} ratings</span>
                      <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-indigo-100">Creators</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-indigo-100">Ratings</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">25K+</div>
              <div className="text-indigo-100">Users</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-indigo-100">Categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Ratings */}
      <div className="container mx-auto px-4 py-8 mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Recent Ratings</h2>
          <button className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center transition">
            View all
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 card-hover">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium mr-3">
                A
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Anonymous User</h3>
                <div className="text-xs text-gray-500">2 hours ago</div>
              </div>
              <div className="ml-auto">
                <div className="rating-display text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">This creator consistently delivers high-quality content that's both informative and entertaining. I've learned so much from their tutorials!</p>
            <div className="mt-4 flex items-center">
              <span 
                className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full cursor-pointer"
                onClick={() => navigateToProfile('UCXuqSBlHAE6Xw-yeJA0Tunw')}
              >
                Linus Tech Tips
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 card-hover">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-medium mr-3">
                M
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Anonymous User</h3>
                <div className="text-xs text-gray-500">5 hours ago</div>
              </div>
              <div className="ml-auto">
                <div className="rating-display text-sm">★★★★☆</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Great content overall, but sometimes the videos are too long. Would appreciate more concise explanations.</p>
            <div className="mt-4 flex items-center">
              <span 
                className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full cursor-pointer"
                onClick={() => navigateToProfile('UCBJycsmduvYEL83R_U4JriQ')}
              >
                MKBHD
              </span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 card-hover">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium mr-3">
                R
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Anonymous User</h3>
                <div className="text-xs text-gray-500">1 day ago</div>
              </div>
              <div className="ml-auto">
                <div className="rating-display text-sm">★★★★★</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm">One of my favorite channels! The production quality is amazing and the content is always relevant and up-to-date.</p>
            <div className="mt-4 flex items-center">
              <span 
                className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full cursor-pointer"
                onClick={() => navigateToProfile('UCX6OQ3DkcsbYNE6H8uQQuVA')}
              >
                MrBeast
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;