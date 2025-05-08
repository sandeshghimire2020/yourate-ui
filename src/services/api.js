import axios from 'axios';

// Use environment variable with fallback for development
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://x22ulkpal2.execute-api.us-east-1.amazonaws.com/v1';

// Configure axios with timeout and retry logic
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json',
    'Origin': window.location.origin,
    'Access-Control-Request-Method': 'POST',
    'Access-Control-Request-Headers': 'Content-Type'
  },
  withCredentials: false // Important for CORS requests
});

// Add request/response interceptors for debugging
axiosInstance.interceptors.request.use(request => {
  console.log('API Request:', request);
  return request;
});

// Add specific CORS handling interceptor
axiosInstance.interceptors.response.use(
  response => {
    console.log('API Response:', response);
    return response;
  },
  error => {
    console.error('API Error:', error.response || error);
    
    // Specifically handle CORS errors
    if (error.response && error.response.status === 403) {
      console.error('Possible CORS issue detected');
      
      // If it looks like a CORS issue, provide a clear error
      if (error.config && error.config.method === 'options') {
        const corsError = new Error('Cross-Origin Request Blocked: The server does not allow cross-origin requests from this origin.');
        corsError.isCorsError = true;
        corsError.originalError = error;
        return Promise.reject(corsError);
      }
    }
    
    return Promise.reject(error);
  }
);

/**
 * Retry a failed axios request with exponential backoff
 * @param {Function} apiCall - The API call function to retry
 * @param {Number} retries - Maximum number of retries
 * @param {Number} delay - Initial delay in milliseconds
 * @returns {Promise} - Result of the API call
 */
const retryRequest = async (apiCall, retries = 3, delay = 1000) => {
  try {
    return await apiCall();
  } catch (error) {
    // Only retry on network errors or 5xx server errors
    const isNetworkError = !error.response;
    const isServerError = error.response && error.response.status >= 500;
    
    if ((isNetworkError || isServerError) && retries > 0) {
      console.log(`Retrying request, ${retries} retries left. Waiting ${delay}ms...`);
      
      // Wait for the specified delay
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Retry with one fewer retry and increased delay (exponential backoff)
      return retryRequest(apiCall, retries - 1, delay * 2);
    }
    
    // If we're out of retries or it's not a retryable error, rethrow
    if (isNetworkError) {
      // Enhance the error message for network errors
      const networkError = new Error('Network error. Please check your connection and try again.');
      networkError.isNetworkError = true;
      networkError.originalError = error;
      throw networkError;
    }
    
    throw error;
  }
};

const apiService = {
  // Search for YouTube channels
  searchChannels: async (query, maxResults = 5) => {
    try {
      const apiCall = () => axiosInstance.get(`/search`, {
        params: { q: query, maxResults }
      });
      
      const response = await retryRequest(apiCall);
      return response.data;
    } catch (error) {
      console.error('Error searching channels:', error);
      throw error;
    }
  },

  // Submit a rating for a channel
  /**
   * Submit a new rating for a YouTube channel
   * @param {Object} ratingData - Rating data including channelId, rating, comment, email
   * @returns {Promise<Object>} - API response
   */
  submitRating: async (ratingData) => {
    try {
      if (!ratingData) {
        throw new Error('Rating data is required');
      }
      
      // Validate required fields
      if (!ratingData.channelId) {
        throw new Error('Channel ID is required');
      }
      
      if (!ratingData.rating || isNaN(Number(ratingData.rating)) || Number(ratingData.rating) < 1 || Number(ratingData.rating) > 5) {
        throw new Error('Valid rating (1-5) is required');
      }
      
      if (!ratingData.email) {
        throw new Error('Email is required for verification');
      }
      
      // Format data for the API with new fields
      const formattedData = {
        channelId: ratingData.channelId,
        channelTitle: ratingData.channelTitle || '',
        rating: Number(ratingData.rating),
        comment: ratingData.comment || '',
        email: ratingData.email || '',
        thumbnailUrl: ratingData.thumbnailUrl || '',
        description: ratingData.description || '',
        profilePicture: ratingData.profilePicture || {
          default: '',
          medium: '',
          high: ''
        }
      };
      
      console.log('Submitting rating with formatted data:', formattedData);
      
      // Send request directly using fetch API with no-cors mode
      // This is an alternative approach when axios encounters CORS issues
      try {
        const response = await fetch(`${API_BASE_URL}/ratings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formattedData)
        });
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        return await response.json();
      } catch (fetchError) {
        console.error('Fetch attempt failed, trying axios as fallback:', fetchError);
        
        // Fallback to axios if fetch fails
        const response = await axios({
          method: 'post',
          url: `${API_BASE_URL}/ratings`,
          data: formattedData,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        return response.data;
      }
    } catch (error) {
      // Enhanced error handling for network issues
      console.error('Error submitting rating:', error);
      
      // Check if it's already a handled network error
      if (error.isNetworkError || error.isCorsError) {
        throw error;
      }
      
      // Specific handling for CORS errors
      if (error.response && error.response.status === 403) {
        const message = 'Unable to submit rating due to cross-origin restrictions. Please try again later or contact support.';
        console.error(message);
        const corsError = new Error(message);
        corsError.isCorsError = true;
        corsError.originalError = error;
        throw corsError;
      }
      
      if (error.response) {
        // The request was made and the server responded with an error
        console.error('Server response:', error.response.data);
        console.error('Status code:', error.response.status);
        error.additionalInfo = {
          status: error.response.status,
          data: error.response.data
        };
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        const networkError = new Error('Network error. Unable to connect to the server. Please check your connection and try again.');
        networkError.isNetworkError = true;
        networkError.originalError = error;
        throw networkError;
      }
      
      throw error;
    }
  },

  // Get ratings for a specific channel
  getChannelRatings: async (channelId, pageSize = 10, offset = 0) => {
    try {
      // Try getting ratings directly from ratings endpoint first
      try {
        const apiCall = () => axiosInstance.get(`/ratings`, {
          params: { 
            channelId, 
            limit: pageSize,
            offset: offset
          }
        });
        
        const response = await retryRequest(apiCall);
        
        // If the response has items property, return that
        if (response.data && Array.isArray(response.data.items)) {
          return response.data.items;
        }
        
        // If the response is an array directly, return that
        if (Array.isArray(response.data)) {
          return response.data;
        }
        
        // Return comments if available
        return response.data.comments || [];
      } catch (ratingsError) {
        // Fallback to profile endpoint if ratings endpoint fails
        console.log('Falling back to profile endpoint for ratings');
        const profileApiCall = () => axiosInstance.get(`/profile`, {
          params: { 
            channelId, 
            limit: pageSize,
            offset: offset
          }
        });
        
        const profileResponse = await retryRequest(profileApiCall);
        
        // Extract comments from the profile response
        return profileResponse.data.ratings?.comments || 
               (profileResponse.data.ratings && Array.isArray(profileResponse.data.ratings) ? profileResponse.data.ratings : []);
      }
    } catch (error) {
      console.error('Error getting channel ratings:', error);
      throw error;
    }
  },

  // Get channel profile with ratings
  getChannelProfile: async (channelId, limit = 3) => {
    try {
      const apiCall = () => axiosInstance.get(`/profile`, {
        params: { channelId, limit }
      });
      
      const response = await retryRequest(apiCall);
      
      // Add robust debug logging to check response structure
      console.log('Raw profile response:', response);
      console.log('Profile response structure:', JSON.stringify(response.data, null, 2));
      
      // Handle multiple possible response structures
      const responseData = response.data;
      
      // Case 1: If the channel info is directly in the response without nesting
      if (responseData.id && responseData.snippet && !responseData.channelInfo) {
        return {
          channelInfo: responseData,
          ratings: responseData.ratings || {
            averageRating: responseData.averageRating || 0,
            totalRatings: responseData.totalRatings || 0,
            comments: responseData.comments || []
          }
        };
      }
      
      // Case 2: If the API returns data in a different format than expected
      if (!responseData.channelInfo && responseData.items && responseData.items.length > 0) {
        // If the API returns YouTube API format with items array
        return {
          channelInfo: responseData.items[0],
          ratings: responseData.ratings || {
            averageRating: responseData.averageRating || 0,
            totalRatings: responseData.totalRatings || 0,
            comments: responseData.comments || []
          }
        };
      }
      
      // Case 3: Return the data as is if it's already in the expected format
      return responseData;
    } catch (error) {
      console.error('Error getting channel profile:', error);
      
      // Enhance error logging to capture more details
      if (error.response) {
        console.error('Error response status:', error.response.status);
        console.error('Error response data:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      }
      
      throw error;
    }
  },

  // Get top creators based on ratings
  getTopCreators: async (limit = 10, minRatings = 1) => {
    try {
      const apiCall = () => axiosInstance.get('/top-creators', {
        params: { limit, minRatings }
      });
      
      const response = await retryRequest(apiCall);
      console.log('Top creators response:', response.data);
      
      return {
        creators: response.data.creators || [],
        total: response.data.total || 0,
        count: response.data.count || 0,
        minRatings: response.data.minRatings || minRatings
      };
    } catch (error) {
      console.error('Error fetching top creators:', error);
      throw error;
    }
  }
};

export default apiService;