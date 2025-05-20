import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">About CreatorRate</h1>
          <p className="text-xl text-indigo-100 text-center mt-4 max-w-2xl mx-auto">
            Empowering viewers to share their feedback and help creators improve
          </p>
        </div>
      </div>
      
      {/* Mission section */}
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At CreatorRate, we believe in the power of honest feedback to drive positive change in the creator economy. Our mission is to build a platform where viewers can provide constructive ratings and reviews for content creators, helping them improve their content while giving audiences a voice.
          </p>
          <p className="text-gray-600">
            We're committed to fostering a community of respect, transparency, and growth for both creators and their audiences. By bridging the gap between viewers and creators, we aim to elevate the overall quality of content across digital platforms.
          </p>
        </div>
        
        {/* Story section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-4">
            CreatorRate was born from a simple observation: while content creators receive likes, views, and subscribers, they often lack actionable, structured feedback that could help them improve. As passionate content consumers ourselves, we saw an opportunity to create a platform dedicated to thoughtful ratings and reviews.
          </p>
          <p className="text-gray-600 mb-4">
            Founded in 2023, we started with a small team of developers and content enthusiasts who were determined to build a tool that would benefit the entire creator ecosystem. What began as a simple rating system has evolved into a comprehensive platform designed to empower both creators and viewers.
          </p>
          <p className="text-gray-600">
            Today, CreatorRate continues to grow, guided by our core values of authenticity, constructive feedback, and community support. We're constantly evolving based on user feedback, striving to create the most valuable platform possible for everyone involved in the content creation journey.
          </p>
        </div>
        
        {/* Values section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Authenticity</h3>
              <p className="text-gray-600">
                We believe in genuine, honest feedback. We encourage our users to be authentic in their reviews and ratings, fostering a culture of trust and transparency.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Constructive Feedback</h3>
              <p className="text-gray-600">
                We prioritize constructive criticism over negativity. Our platform is designed to help creators grow, not to tear them down.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">
                We're building more than just a platform—we're building a community where creators and viewers can connect, share insights, and grow together.
              </p>
            </div>
            
            <div className="bg-indigo-50 p-6 rounded-lg">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy & Safety</h3>
              <p className="text-gray-600">
                We take data privacy and user safety seriously. Our platform is designed with robust protections to ensure a secure environment for all users.
              </p>
            </div>
          </div>
        </div>
        
        {/* Team section */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 mb-6">
            We're a diverse team of developers, designers, content creators, and digital marketing specialists who are passionate about improving the creator economy. Together, we bring a wealth of experience and a shared commitment to our mission.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                <img src="https://via.placeholder.com/150" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Alex Morgan</h3>
              <p className="text-gray-600">Co-Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                <img src="https://via.placeholder.com/150" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Jordan Chen</h3>
              <p className="text-gray-600">Co-Founder & CTO</p>
            </div>
            
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
                <img src="https://via.placeholder.com/150" alt="Team member" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Taylor Kim</h3>
              <p className="text-gray-600">Head of Product</p>
            </div>
          </div>
        </div>
        
        {/* Join us section */}
        <div className="bg-indigo-600 rounded-xl shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Join the CreatorRate Community</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Whether you're a content creator looking for valuable feedback or a viewer wanting to help shape the future of content creation, we invite you to be part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/how-it-works" className="bg-white text-indigo-600 font-medium py-3 px-6 rounded-lg hover:bg-indigo-50 transition">
              Learn How It Works
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

export default AboutPage;