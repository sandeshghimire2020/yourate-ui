import React from 'react';
import { Link } from 'react-router-dom';

const CookiePolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">Cookie Policy</h1>
          <p className="text-xl text-indigo-100 text-center mt-4 max-w-2xl mx-auto">
            Last updated: May 15, 2023
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Cookie Policy</h2>
          <p className="text-gray-600 mb-4">
            This Cookie Policy explains what cookies are and how we use them, the types of cookies we use (i.e., the information we collect using cookies and how that information is used), and how to manage the cookie settings.
          </p>
          <p className="text-gray-600">
            This Cookie Policy should be read together with our Privacy Policy, which explains how we use personal information generally.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">What Are Cookies?</h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files that are stored on your computer or mobile device when you visit a website. They're widely used to make websites work or work more efficiently, as well as to provide information to the website owners.
          </p>
          <p className="text-gray-600 mb-4">
            Cookies allow a website to recognize your device and remember if you've been to the website before. Cookies can be used for a variety of tasks, like remembering your preferences, enabling login, and helping a site understand your browsing habits.
          </p>
          <p className="text-gray-600">
            Cookies set by the website owner (in this case, CreatorRate) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (such as advertising, interactive content, and analytics).
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Types of Cookies We Use</h2>
          <p className="text-gray-600 mb-4">
            We use different types of cookies for different reasons:
          </p>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Essential Cookies</h3>
            <p className="text-gray-600">
              These cookies are essential for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website. The website cannot function properly without these cookies.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Functionality Cookies</h3>
            <p className="text-gray-600">
              These cookies allow the website to remember choices you make (such as your username, language, or the region you're in) and provide enhanced, more personal features. The information these cookies collect may be anonymized, and they cannot track your browsing activity on other websites.
            </p>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance Cookies</h3>
            <p className="text-gray-600">
              These cookies collect information about how you use a website, like which pages you visited and which links you clicked on. None of this information can be used to identify you. Their sole purpose is to improve website functions. This includes cookies from third-party analytics services, as long as the cookies are for the exclusive use of the owner of the website visited.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Targeting/Advertising Cookies</h3>
            <p className="text-gray-600">
              These cookies are used to track your browsing habits to enable us to show advertising which is more likely to be of interest to you. They are set by us or our advertising partners and remember that you have visited a website. They may be used by us and our advertising partners to build a profile of your interests and show you relevant advertisements on other websites.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookie Duration</h2>
          <p className="text-gray-600 mb-4">
            Cookies can remain on your computer or mobile device for different periods of time. Some cookies are 'session cookies', which means they only exist when your browser is open and are automatically deleted when you close your browser. Other cookies are 'persistent cookies', meaning they survive after your browser is closed and can be used by websites to recognize your computer when you re-open your browser later.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Manage Cookies</h2>
          <p className="text-gray-600 mb-4">
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The methods for doing so vary from browser to browser, and from version to version, so the best thing to do is to look at the help menu in your browser.
          </p>
          
          <p className="text-gray-600 mb-4">
            Below are links to instructions on how to manage cookies in some popular browsers:
          </p>
          
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800">Microsoft Edge</a></li>
          </ul>
          
          <p className="text-gray-600 mt-4">
            Please note that if you choose to refuse cookies, you may not be able to use the full functionality of our website.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Cookies</h2>
          <p className="text-gray-600 mb-4">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics of the website, deliver advertisements on and through the website, and so on.
          </p>
          <p className="text-gray-600">
            The third-party services we use, which may set cookies when you use our website, include Google Analytics, Google Ads, Facebook Pixel, and other advertising and analytics partners. These services help us understand how users interact with our website and help us improve it, as well as to provide personalized advertisements.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Cookie Policy</h2>
          <p className="text-gray-600 mb-4">
            We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
          </p>
          <p className="text-gray-600">
            The date at the top of this Cookie Policy indicates when it was last updated.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            If you have any questions about our use of cookies or this Cookie Policy, please contact us at:
          </p>
          
          <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
            <p>Email: privacy@creatorrate.com</p>
            <p>Postal Address: CreatorRate, 123 Rating Street, San Francisco, CA 94105, United States</p>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-xl p-6 text-center">
          <p className="text-indigo-700">
            For more information about our privacy practices, please review our <Link to="/privacy-policy" className="font-medium underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;