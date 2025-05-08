import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const ProfilePage = () => {
  const { channelId } = useParams();
  const navigate = useNavigate();
  
  const [channel, setChannel] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorType, setErrorType] = useState(null); // 'not-found' or 'server-error'
  
  // Form state
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ratingsPerPage] = useState(10);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPrevPage, setHasPrevPage] = useState(false);
  const [loadingMoreRatings, setLoadingMoreRatings] = useState(false);
  
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Format dates
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
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
  
  // Toggle description visibility
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  
  // Format description with character limit
  const formatDescription = (description, limit = 280) => {
    if (!description) return 'No description available';
    
    if (description.length <= limit || showFullDescription) {
      return description;
    }
    
    return description.substring(0, limit) + '...';
  };
  
  // Load channel data
  useEffect(() => {
    const fetchChannelProfile = async () => {
      setLoading(true);
      setError(null);
      setErrorType(null);
      
      try {
        // Fetch profile data
        const profileData = await apiService.getChannelProfile(channelId);
        console.log("Profile data received:", profileData); // Debug log
        
        // Check if we got valid channel data
        if (!profileData) {
          setErrorType('not-found');
          setError('Channel not found. The YouTube channel ID may be invalid or the channel doesn\'t exist.');
          setLoading(false);
          return;
        }
        
        // Extract channel info with better null checking and fallbacks
        const channelInfo = profileData.channelInfo || profileData.items?.[0] || profileData;
        
        // Check if we have a valid channel response
        if (!channelInfo || (!channelInfo.id && !channelInfo.snippet)) {
          console.error('Invalid channel data structure:', channelInfo);
          setErrorType('not-found');
          setError('Channel data is incomplete or in an unexpected format.');
          setLoading(false);
          return;
        }
        
        // Extract snippet and statistics with safe access
        const snippet = channelInfo.snippet || {};
        const statistics = channelInfo.statistics || {};
        
        // Handle both possible ratings structures in the API response
        let averageRating = 0;
        let totalRatings = 0;
        
        if (profileData.ratings) {
          // If ratings are provided in the expected format
          averageRating = profileData.ratings.averageRating || 0;
          totalRatings = profileData.ratings.totalRatings || 0;
        } else if (typeof profileData.averageRating !== 'undefined') {
          // If ratings are at the top level
          averageRating = profileData.averageRating;
          totalRatings = profileData.totalRatings || 0;
        }
        
        // Extract channel info from the profile response with safer structure access
        setChannel({
          id: channelId,
          title: snippet.title || 'Unknown Channel',
          description: snippet.description || 'No description available',
          publishedAt: snippet.publishedAt || null,
          thumbnail: snippet.thumbnails?.high?.url || 
                    snippet.thumbnails?.medium?.url || 
                    snippet.thumbnails?.default?.url || 
                    null,
          rating: averageRating,
          ratingCount: totalRatings,
          category: snippet.country || 'Creator',
          
          // Add other relevant stats if available
          subscriberCount: statistics.subscriberCount || 'Not available',
          videoCount: statistics.videoCount || 'Not available',
          viewCount: statistics.viewCount || 'Not available'
        });
        
        // Load initial ratings
        fetchRatingsPage(1);
      } catch (err) {
        console.error('Error fetching channel data:', err);
        
        // Enhanced error handling for channel not found
        if (err.response) {
          if (err.response.status === 404) {
            setErrorType('not-found');
            setError('Channel not found. The YouTube channel ID may be invalid or the channel doesn\'t exist.');
          } else {
            setErrorType('server-error');
            setError(`Failed to load channel data: ${err.message || 'Unknown error'}`);
          }
        } else if (err.request) {
          setErrorType('server-error');
          setError('Network error. Please check your connection and try again.');
        } else {
          setErrorType('server-error');
          setError('Failed to load channel data. Please try again later.');
        }
        
        setLoading(false);
      }
    };
    
    fetchChannelProfile();
  }, [channelId]);
  
  // Fetch ratings with pagination
  const fetchRatingsPage = async (page) => {
    setLoadingMoreRatings(true);
    
    try {
      const pageSize = ratingsPerPage;
      const offset = (page - 1) * pageSize;
      
      // Get ratings with pagination params
      const ratingsResponse = await apiService.getChannelRatings(channelId, pageSize, offset);
      
      let ratingsData = [];
      let totalItems = 0;
      
      // Handle response from updated API which could be in various formats
      if (Array.isArray(ratingsResponse)) {
        ratingsData = ratingsResponse;
        totalItems = ratingsResponse.length > 0 ? 
          Math.max(ratingsResponse.length + offset, channel?.ratingCount || 0) : 
          channel?.ratingCount || 0;
      } else if (ratingsResponse && Array.isArray(ratingsResponse.comments)) {
        // If the response has a comments array
        ratingsData = ratingsResponse.comments;
        totalItems = ratingsResponse.totalRatings || ratingsData.length;
      } else {
        // Handle any other format the API might return
        ratingsData = Object.values(ratingsResponse || {});
        totalItems = ratingsData.length;
      }
      
      setRatings(ratingsData);
      
      // Update pagination state
      const calculatedTotalPages = Math.ceil(totalItems / pageSize) || 1;
      setTotalPages(calculatedTotalPages);
      setCurrentPage(page);
      setHasNextPage(page < calculatedTotalPages);
      setHasPrevPage(page > 1);
    } catch (err) {
      console.error('Error fetching ratings:', err);
      // Don't set the main error state, just handle failed ratings load
      setRatings([]);
    } finally {
      setLoadingMoreRatings(false);
      setLoading(false);
    }
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      fetchRatingsPage(newPage);
    }
  };
  
  // Handle rating submission
  const handleSubmitRating = async (e) => {
    e.preventDefault();
    
    // Validate rating input
    if (userRating === 0) {
      alert('Please select a rating');
      return;
    }
    
    if (!comment.trim()) {
      alert('Please provide a comment');
      return;
    }
    
    // Validate email with a simple regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      alert('Please provide a valid email address');
      return;
    }
    
    setSubmitting(true);
    setSubmitSuccess(false); // Reset success state
    
    try {
      // Extract thumbnail and profile picture information from channel data
      const thumbnailUrl = channel?.thumbnail || '';
      const description = channel?.description || '';
      
      // Create profile picture object from channel data
      const profilePicture = {
        default: channel?.thumbnail || '',
        medium: channel?.thumbnail || '', // Use the same thumbnail if specific sizes aren't available
        high: channel?.thumbnail || ''
      };
      
      // Create the complete rating data object with the new fields
      const ratingData = {
        channelId,
        channelTitle: channel?.title || '',
        rating: userRating,
        comment: comment,
        email: email,
        thumbnailUrl,
        description,
        profilePicture
      };
      
      console.log('Submitting rating with data:', ratingData);
      const result = await apiService.submitRating(ratingData);
      console.log('Rating submission result:', result);
      
      // Show success message
      setSubmitSuccess(true);
      
      // Reset form
      setUserRating(0);
      setComment('');
      setEmail('');
      
      // Refresh ratings (first page) to show the new rating
      fetchRatingsPage(1);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting rating:', err);
      
      // Show appropriate error message based on the error
      let errorMessage = 'Failed to submit your rating. Please try again later.';
      
      if (err.response) {
        // The request was made and the server responded with an error status
        if (err.response.status === 400) {
          errorMessage = 'Invalid rating data. Please check your inputs and try again.';
        } else if (err.response.status === 429) {
          errorMessage = 'Too many rating submissions. Please try again later.';
        } else if (err.response.status === 403) {
          errorMessage = 'You\'ve already rated this channel recently. Please try again later.';
        } else if (err.response.status >= 500) {
          errorMessage = 'Server error. Our team has been notified. Please try again later.';
        }
        console.error('Server response:', err.response.data);
      } else if (err.request) {
        // The request was made but no response was received (network error)
        errorMessage = 'Network error. Please check your internet connection and try again.';
        
        // Automatically retry submission after a delay (optional)
        /*
        setTimeout(() => {
          if (confirm('Connection issue detected. Would you like to try submitting again?')) {
            handleSubmitRating(e);
          }
        }, 2000);
        */
      } else if (err.message && err.message.includes('timeout')) {
        errorMessage = 'Request timed out. The server might be experiencing high traffic. Please try again later.';
      } else if (err.message && err.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      // Display error message in a more user-friendly way
      alert(errorMessage);
      
      // Store form data temporarily in case user wants to retry
      // Could be enhanced with localStorage for persistence across page refreshes
      const savedFormData = {
        rating: userRating,
        comment: comment,
        email: email
      };
      console.log('Saved form data for potential retry:', savedFormData);
    } finally {
      setSubmitting(false);
    }
  };
  
  // Handle star rating click
  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };
  
  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }
  
  // Render error state
  if (error && errorType === 'not-found') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Channel Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find a YouTube channel with the ID: <code className="bg-gray-100 px-2 py-1 rounded">{channelId}</code></p>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm">This might be because:</p>
            <ul className="text-sm text-gray-500 list-disc pl-5 text-left">
              <li>The channel ID is incorrect</li>
              <li>The channel no longer exists on YouTube</li>
              <li>There might be a temporary issue with YouTube's API</li>
            </ul>
          </div>
          <div className="mt-8 space-y-3">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              Go to Home Page
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (error && errorType === 'server-error') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full">
          <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">Something Went Wrong</h1>
          <p className="text-gray-600 mb-6">We're having trouble loading this channel's data.</p>
          <div className="mt-8 space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition shadow-md"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition"
            >
              Go to Home Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Search
        </button>
      </div>

      {/* Creator Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0 p-6 flex items-center justify-center">
                <div className="w-32 h-32 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden shadow-md">
                  {channel?.thumbnail ? (
                    <img 
                      src={channel.thumbnail} 
                      alt={channel.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
                    </svg>
                  )}
                </div>
              </div>
              <div className="p-6 md:p-8 md:flex-1">
                <div className="flex flex-wrap items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{channel?.title}</h1>
                    <div className="flex items-center mb-4">
                      <div className="rating-display text-xl mr-2">{getStarRating(channel?.rating || 0)}</div>
                      <span className="text-gray-700 font-medium">({(channel?.rating || 0).toFixed(1)})</span>
                      <span className="text-gray-500 text-sm ml-2">({channel?.ratingCount || 0} ratings)</span>
                    </div>
                  </div>
                  <a 
                    href={`https://youtube.com/channel/${channelId}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition shadow-md mt-2 md:mt-0"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                    Visit Channel
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {channel?.publishedAt && (
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                      Published: {formatDate(channel.publishedAt)}
                    </span>
                  )}
                  <span className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">
                    {channel?.category || 'Creator'}
                  </span>
                </div>
                <div className="description-container">
                  <p className="text-gray-600">{formatDescription(channel?.description)}</p>
                  
                  {channel?.description && channel.description.length > 280 && (
                    <button 
                      onClick={toggleDescription} 
                      className="text-indigo-600 hover:text-indigo-800 text-sm font-medium mt-2 flex items-center transition"
                    >
                      {showFullDescription ? 'Show less' : 'Read more'}
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-4 w-4 ml-1 transition-transform ${showFullDescription ? 'rotate-180' : ''}`}
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rating Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Rate This Creator</h2>
                  {submitSuccess ? (
                    <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-4">
                      Your rating has been submitted successfully!
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitRating} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Rating</label>
                        <div className="rating-stars flex flex-row-reverse justify-end">
                          {[5, 4, 3, 2, 1].map((rating) => (
                            <React.Fragment key={rating}>
                              <input 
                                type="radio" 
                                id={`star${rating}`} 
                                name="rating" 
                                value={rating}
                                checked={userRating === rating}
                                onChange={() => handleRatingClick(rating)}
                              />
                              <label 
                                htmlFor={`star${rating}`} 
                                onClick={() => handleRatingClick(rating)}
                              >
                                ★
                              </label>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                        <textarea 
                          id="comment" 
                          rows="4" 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                          placeholder="Share your experience with this creator..."
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Gmail (for verification only)</label>
                        <input 
                          type="email" 
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" 
                          placeholder="your.email@gmail.com"
                        />
                        <p className="text-xs text-gray-500 mt-1">Your email is only used to prevent duplicate ratings and will not be displayed publicly.</p>
                      </div>
                      <div>
                        <button 
                          type="submit" 
                          disabled={submitting}
                          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center justify-center"
                        >
                          {submitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Submitting...
                            </>
                          ) : 'Submit Rating'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>

            {/* Ratings List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">User Ratings</h2>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">Filter:</span>
                      <select className="bg-white border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500">
                        <option>All Ratings</option>
                        <option>5 Stars</option>
                        <option>4 Stars</option>
                        <option>3 Stars</option>
                        <option>2 Stars</option>
                        <option>1 Star</option>
                      </select>
                    </div>
                  </div>
                  
                  {loadingMoreRatings ? (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                  ) : (
                    <div className="space-y-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                      {ratings.length > 0 ? (
                        ratings.map((rating, index) => (
                          <div key={index} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="rating-display text-lg">
                                  {rating && rating.rating !== undefined ? getStarRating(rating.rating) : '☆☆☆☆☆'}
                                </div>
                                <p className="text-gray-700 mt-2">
                                  {rating && rating.comment ? rating.comment : 'No comment provided'}
                                </p>
                              </div>
                              <span className="text-sm text-gray-500">
                                {rating && rating.createdAt ? formatDate(rating.createdAt) : 'Recent'}
                              </span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No ratings yet. Be the first to rate this creator!</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* Pagination - Show only if we have multiple pages */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center">
                      <nav className="flex items-center space-x-1">
                        <button 
                          onClick={() => handlePageChange(currentPage - 1)} 
                          disabled={!hasPrevPage}
                          className={`px-3 py-1 rounded-md ${!hasPrevPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {/* Generate page buttons */}
                        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                          // Logic to show pages around current page
                          let pageNum;
                          if (totalPages <= 5) {
                            // Less than 5 pages, show all
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            // Near the start
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            // Near the end
                            pageNum = totalPages - 4 + i;
                          } else {
                            // In the middle
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button 
                              key={i} 
                              onClick={() => handlePageChange(pageNum)}
                              className={`px-3 py-1 rounded-md ${pageNum === currentPage ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                        
                        {/* Show ellipsis if many pages */}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <span className="px-3 py-1 text-gray-500">...</span>
                        )}
                        
                        {/* Show last page if far away */}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                          <button 
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-1 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
                          >
                            {totalPages}
                          </button>
                        )}
                        
                        <button 
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={!hasNextPage}
                          className={`px-3 py-1 rounded-md ${!hasNextPage ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white border border-gray-300 text-gray-500 hover:bg-gray-50'}`}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10l-3.293-3.293a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;