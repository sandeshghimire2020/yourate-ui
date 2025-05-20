import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">How CreatorRate Works</h1>
          <p className="text-xl text-indigo-100 text-center mt-4 max-w-2xl mx-auto">
            Learn how our platform connects creators with valuable audience feedback
          </p>
        </div>
      </div>
      
      {/* Overview section */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">The CreatorRate Process</h2>
          <p className="text-gray-600 mb-6">
            CreatorRate bridges the gap between content creators and their audiences, providing a structured way for viewers to give feedback and for creators to gain insights that help them improve. Here's how the platform works for everyone involved:
          </p>
          
          <div className="relative">
            {/* Timeline stem */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-indigo-200 hidden md:block"></div>
            
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-16 md:flex-shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold z-10">
                  1
                </div>
              </div>
              <div className="md:ml-8 mt-4 md:mt-0 bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Find a Creator</h3>
                <p className="text-gray-600">
                  Search for your favorite content creators on our platform. We cover creators across multiple platforms like YouTube, TikTok, Twitch, and more.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-16 md:flex-shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold z-10">
                  2
                </div>
              </div>
              <div className="md:ml-8 mt-4 md:mt-0 bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Rate & Review</h3>
                <p className="text-gray-600">
                  Leave a star rating and a detailed review. Our rating system covers aspects like content quality, consistency, audience engagement, originality, and production value.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row mb-8">
              <div className="md:w-16 md:flex-shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold z-10">
                  3
                </div>
              </div>
              <div className="md:ml-8 mt-4 md:mt-0 bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Creators See Feedback</h3>
                <p className="text-gray-600">
                  Verified creators can access their feedback dashboard to see ratings, reviews, and detailed analytics about audience sentiment and suggestions.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row">
              <div className="md:w-16 md:flex-shrink-0 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold z-10">
                  4
                </div>
              </div>
              <div className="md:ml-8 mt-4 md:mt-0 bg-indigo-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Content Improves</h3>
                <p className="text-gray-600">
                  Creators use the insights to refine their content and better serve their audience, creating a positive feedback loop of continuous improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* For Viewers section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">For Viewers</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            As a viewer, CreatorRate gives you a voice beyond likes and comments. Here's how you can make the most of our platform:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Discover Top Creators</h3>
              <p className="text-gray-600">
                Find highly-rated creators in categories you enjoy. Our discovery tools help you find new content you'll love based on community ratings.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Share Your Opinion</h3>
              <p className="text-gray-600">
                Rate creators on multiple aspects of their content and leave detailed reviews explaining what you enjoy and what could be improved.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Build Your Reviewer Profile</h3>
              <p className="text-gray-600">
                Gain reputation as a thoughtful reviewer. Other users can follow your reviews and creators may even feature your feedback.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Join Discussions</h3>
              <p className="text-gray-600">
                Participate in community discussions about creators and content trends. Connect with other viewers who share your interests.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/top-creators" className="inline-block bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
              Explore Top Creators
            </Link>
          </div>
        </div>
        
        {/* For Creators section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-indigo-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">For Creators</h2>
          </div>
          
          <p className="text-gray-600 mb-6">
            As a content creator, CreatorRate offers you valuable insights beyond what platform analytics can tell you. Here's how you can leverage our platform:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Claim Your Profile</h3>
              <p className="text-gray-600">
                Verify your identity and claim your creator profile. This gives you access to your dashboard and allows you to respond to reviews.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Gain Detailed Insights</h3>
              <p className="text-gray-600">
                Access comprehensive analytics about what your audience loves and where they see room for improvement, all categorized by content aspects.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Engage With Feedback</h3>
              <p className="text-gray-600">
                Respond to reviews, thank viewers for constructive feedback, and show your audience you're listening to their thoughts.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Showcase Your Rating</h3>
              <p className="text-gray-600">
                Display your CreatorRate score on your content platforms. High ratings can attract new viewers and build credibility with brands.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/contact" className="inline-block bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 transition">
              Claim Your Creator Profile
            </Link>
          </div>
        </div>
        
        {/* Rating Criteria */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Rating Criteria</h2>
          
          <p className="text-gray-600 mb-8">
            We've developed a comprehensive rating system that evaluates creators across several key dimensions:
          </p>
          
          <div className="space-y-6">
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Content Quality</h3>
              <p className="text-gray-600">
                The overall quality of the material, including accuracy, depth, educational value, and entertainment value.
              </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Consistency</h3>
              <p className="text-gray-600">
                The reliability of upload schedule and consistent quality across videos or streams.
              </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Audience Engagement</h3>
              <p className="text-gray-600">
                How well the creator interacts with their audience, responds to comments, and incorporates feedback.
              </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Originality</h3>
              <p className="text-gray-600">
                The uniqueness of the content, creative approach, and innovative ideas presented.
              </p>
            </div>
            
            <div className="border-l-4 border-indigo-500 pl-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Production Value</h3>
              <p className="text-gray-600">
                The technical aspects of content creation, including video quality, audio clarity, editing, and overall presentation.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is CreatorRate free to use?</h3>
              <p className="text-gray-600">
                Yes, CreatorRate is completely free for viewers to browse, rate, and review creators. We also offer a free basic tier for creators to claim their profiles and access essential insights. Premium features for creators are available through our subscription plans.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How do you prevent fake or malicious reviews?</h3>
              <p className="text-gray-600">
                We have several safeguards in place to maintain review quality. Users must create verified accounts to leave reviews, we use AI to detect suspicious review patterns, and our community moderation team actively monitors for inappropriate content. Creators can also flag reviews that violate our guidelines.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can creators remove negative reviews?</h3>
              <p className="text-gray-600">
                Creators cannot directly remove reviews, as we believe in maintaining transparency and authentic feedback. However, they can report reviews that violate our community guidelines or are clearly malicious. Our moderation team will review these reports and take appropriate action.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Which platforms do you cover?</h3>
              <p className="text-gray-600">
                We currently support creators from YouTube, Twitch, TikTok, Instagram, and podcasting platforms. We're continuously expanding to include more content platforms based on community demand.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How can I suggest a creator to be added to the platform?</h3>
              <p className="text-gray-600">
                If you don't find a creator you want to review in our database, you can suggest them through our "Suggest a Creator" form. After a quick verification process, we'll add them to our platform so you and others can leave reviews.
              </p>
            </div>
          </div>
        </div>
        
        {/* Call to action */}
        <div className="bg-indigo-600 rounded-xl shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Join thousands of viewers and creators who are already using CreatorRate to improve the content creation ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/top-creators" className="bg-white text-indigo-600 font-medium py-3 px-6 rounded-lg hover:bg-indigo-50 transition">
              Browse Top Creators
            </Link>
            <Link to="/contact" className="bg-indigo-500 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-400 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;