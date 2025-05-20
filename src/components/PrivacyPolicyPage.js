import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 mb-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white text-center">Privacy Policy</h1>
          <p className="text-xl text-indigo-100 text-center mt-4 max-w-2xl mx-auto">
            Last updated: May 15, 2023
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl mb-16">
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            CreatorRate ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
          </p>
          <p className="text-gray-600">
            This privacy policy applies to all information collected through our website, as well as any related services, sales, marketing, or events.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Information You Disclose to Us</h3>
            <p className="text-gray-600 mb-4">
              We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
            </p>
            <p className="text-gray-600">
              The personal information that we collect depends on the context of your interactions with us and the website, the choices you make, and the products and features you use. The personal information we collect may include the following:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600">
              <li>Names</li>
              <li>Email addresses</li>
              <li>Usernames</li>
              <li>Passwords</li>
              <li>Profile information</li>
              <li>Content of reviews and ratings</li>
              <li>Social media handles</li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Information Automatically Collected</h3>
            <p className="text-gray-600 mb-4">
              We automatically collect certain information when you visit, use, or navigate the website. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our website, and other technical information.
            </p>
            <p className="text-gray-600">
              This information is primarily needed to maintain the security and operation of our website, and for our internal analytics and reporting purposes.
            </p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 mb-4">
            We use your information for a variety of business purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600">
            <li>To facilitate account creation and authentication and otherwise manage user accounts</li>
            <li>To provide you with the requested services</li>
            <li>To send you marketing and promotional communications</li>
            <li>To respond to user inquiries/offer support to users</li>
            <li>To improve our website and services</li>
            <li>To protect our services from malicious users</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Will Your Information Be Shared With Anyone?</h2>
          <p className="text-gray-600 mb-4">
            We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
          </p>
          <p className="text-gray-600">
            We may process or share your data based on the following legal basis:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-600">
            <li><span className="font-semibold">Consent:</span> We may process your data if you have given us specific consent to use your personal information for a specific purpose.</li>
            <li><span className="font-semibold">Legitimate Interests:</span> We may process your data when it is reasonably necessary to achieve our legitimate business interests.</li>
            <li><span className="font-semibold">Performance of a Contract:</span> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.</li>
            <li><span className="font-semibold">Legal Obligations:</span> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena.</li>
            <li><span className="font-semibold">Vital Interests:</span> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.</li>
          </ul>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Privacy Rights</h2>
          <p className="text-gray-600 mb-4">
            In some regions, such as the European Economic Area (EEA) and United Kingdom (UK), you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
          </p>
          <p className="text-gray-600 mb-4">
            In some regions (like the EEA and UK), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability.
          </p>
          <p className="text-gray-600">
            If you wish to be informed what personal information we hold about you and if you want it to be removed from our systems, please contact us.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Do We Use Cookies and Other Tracking Technologies?</h2>
          <p className="text-gray-600 mb-4">
            We may use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">How Can You Contact Us About This Policy?</h2>
          <p className="text-gray-600 mb-4">
            If you have questions or comments about this policy, you may email us at privacy@creatorrate.com or by post to:
          </p>
          <div className="p-4 bg-gray-50 rounded-lg text-gray-700">
            <p>CreatorRate</p>
            <p>123 Rating Street</p>
            <p>San Francisco, CA 94105</p>
            <p>United States</p>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-xl p-6 text-center">
          <p className="text-indigo-700">
            If you have any questions or concerns about our privacy policy, please <a href="/contact" className="font-medium underline">contact us</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;