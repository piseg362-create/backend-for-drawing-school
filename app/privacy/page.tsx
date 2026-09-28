import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Vedayana Technology',
  description: 'Privacy Policy for the Drawing School App platform by Vedayana Technology Private Limited.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <p className="text-gray-600 mb-8 pb-6 border-b border-gray-200">
          <strong>Effective Date:</strong> September 28, 2026
        </p>
        
        <div className="text-gray-700 space-y-6 text-base sm:text-lg leading-relaxed">
          <p>
            This Privacy Policy explains how Vedayana Technology Private Limited (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, and shares information in connection with the Drawing School App platform, including our desktop application and associated services (collectively, the &quot;Services&quot;).
          </p>

          <p>
            This Privacy Policy applies to information we collect when you use our Services or otherwise interact with us. By using the Services, you agree to the collection and use of information in accordance with this Privacy Policy.
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">1. Information We Collect</h2>
          <p>We may collect the following types of information when you use our Services:</p>
          
          <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">Information You Provide to Us</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Business or school name, address, contact details, and administrator/staff account information.</li>
            <li><strong>Student Data:</strong> Student names, mobile numbers, addresses, and enrollment details.</li>
            <li><strong>Instructor Data:</strong> Information about instructors associated with the school.</li>
            <li><strong>Operational Data:</strong> Vehicle information, course/package details, payment information, attendance, and training records.</li>
            <li><strong>Communications:</strong> When you contact us for support or other inquiries, we collect the information you provide in those communications.</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">WhatsApp-Related Information</h3>
          <p>When you connect your WhatsApp Business Account to our Services, we may process:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>WhatsApp phone numbers and messaging information.</li>
            <li>WhatsApp message status information (such as sent, delivered, read, and failed statuses).</li>
            <li>Information required to provide WhatsApp messaging through Meta&apos;s WhatsApp Cloud API.</li>
          </ul>

          <h3 className="text-xl font-medium text-gray-900 mt-6 mb-3">Automatically Collected Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Technical Data:</strong> Technical information required for authentication, security, licensing, and core application functionality.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">2. How We Use Information</h2>
          <p>We use the information we collect for the following purposes:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide, operate, maintain, and improve the Services.</li>
            <li>To facilitate account creation and authentication.</li>
            <li>To process transactions and manage course, payment, and enrollment information.</li>
            <li>To enable communication features, including sending WhatsApp messages on your behalf as instructed.</li>
            <li>To monitor usage, identify bugs, and provide technical support.</li>
            <li>To enforce our terms, policies, and legal agreements.</li>
            <li>To protect the security and integrity of our Services.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">3. WhatsApp and Meta Data Processing</h2>
          <p>Our Services integrate with Meta&apos;s WhatsApp Business Platform / WhatsApp Cloud API to enable you to send messages to your students and customers.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Your Account:</strong> You connect your own WhatsApp Business Account and phone number to the Services.</li>
            <li><strong>Messaging on Your Behalf:</strong> The platform sends WhatsApp messages on your behalf strictly according to your instructions.</li>
            <li><strong>Meta Services:</strong> Because messages are routed through WhatsApp, message data is processed through Meta&apos;s services. Your use of WhatsApp messaging is subject to Meta&apos;s and WhatsApp&apos;s terms and privacy policies.</li>
            <li><strong>Ownership:</strong> We do not claim ownership of your WhatsApp data or the messages you send through our Services.</li>
            <li><strong>Your Responsibilities:</strong> You are solely responsible for obtaining all appropriate and legally required consents from your users, customers, or students before sending them messages. You must comply with all applicable laws, WhatsApp&apos;s Business Terms of Service, Meta&apos;s policies, and any privacy requirements when messaging your users.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">4. How Information is Shared</h2>
          <p>We may share information in the following circumstances:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>With Service Providers:</strong> We may share information with third-party vendors, service providers, contractors, or agents who perform services for us or on our behalf.</li>
            <li><strong>Through Meta/WhatsApp Integration:</strong> Information required to send WhatsApp messages is shared with Meta as part of the WhatsApp Cloud API integration.</li>
            <li><strong>For Legal Reasons:</strong> We may disclose information if we believe it is necessary to comply with a legal obligation, a valid request from law enforcement, or to protect our rights, property, or safety, or that of our users or others.</li>
            <li><strong>Business Transfers:</strong> In connection with a merger, sale of company assets, financing, or acquisition of all or a portion of our business, information may be transferred.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">5. Data Storage and Security</h2>
          <p>We implement reasonable technical and organizational measures designed to protect the information we collect from unauthorized access, disclosure, alteration, and destruction. However, no electronic transmission or storage system is entirely secure, and we cannot guarantee absolute security of your information.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">6. Data Retention</h2>
          <p>We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, to provide the Services, and to comply with our legal obligations, resolve disputes, and enforce our agreements.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">7. User/Customer Rights</h2>
          <p>Depending on your location and applicable privacy laws, you may have the right to access, correct, or request deletion of your personal information. If you have an account with us, you may be able to update certain account information directly within the application. To exercise any other privacy rights, please contact us using the information provided below.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">8. Account and Data Deletion Requests</h2>
          <p>You have the right to request the deletion of your account and the personal data associated with it.</p>
          <p className="mt-4 font-medium text-gray-900">To request data deletion:</p>
          <ol className="list-decimal pl-6 space-y-2 mt-2 mb-4">
            <li>Contact us at <strong>vedayanatechnolgy@gmail.com</strong> with the subject line &quot;Data Deletion Request.&quot;</li>
            <li>Provide your account details and specify whether you are requesting the deletion of specific data or your entire account.</li>
          </ol>
          <p>We will process your request in accordance with applicable laws. Please note that we may need to retain certain information for recordkeeping purposes, to complete any transactions that you began prior to requesting deletion, or to comply with legal obligations. If you request deletion of student data or other third-party data you have inputted into the platform, we will assist you in deleting that data from our systems.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">9. Third-Party Services</h2>
          <p>The Services may contain links to or integrations with third-party websites or services (such as Meta/WhatsApp). This Privacy Policy does not apply to the practices of third parties. We encourage you to review the privacy policies of any third-party services you interact with.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">10. Cookies and Similar Technologies</h2>
          <p>If our Services include web-based components, we may use cookies and similar tracking technologies to track activity, store certain information, and improve our Services. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent, but some features of the Services may not function properly without them.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">11. Children&apos;s Privacy</h2>
          <p>Our Services are intended for use by driving/drawing schools and businesses, not directly by children. We do not knowingly collect personal information directly from children under the applicable age of consent. Any student data, including that of minors, must be collected by you (the school/business) with appropriate parental or guardian consent before being processed through our Services. If we become aware that we have inadvertently collected personal data directly from a child without verified consent, we will take steps to delete that information.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">12. International Data Processing</h2>
          <p>We may process and store your information on servers located outside of your state, province, country, or other governmental jurisdiction. Privacy laws in those locations may differ from those in your jurisdiction. By using our Services, you consent to the transfer and processing of your information as described in this Privacy Policy.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">13. Changes to This Privacy Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Effective Date&quot; at the top. We may also provide notice through the Services or by email. Your continued use of the Services after the effective date of the revised Privacy Policy constitutes your acceptance of the changes.</p>

          <h2 className="text-2xl font-semibold text-gray-900 mt-10 mb-4">14. Contact Information</h2>
          <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg mt-6">
            <p className="font-semibold text-gray-900 text-lg mb-2">Vedayana Technology Private Limited</p>
            <p className="mb-1"><strong>Email:</strong> <a href="mailto:vedayanatechnolgy@gmail.com" className="text-blue-600 hover:text-blue-800 hover:underline">vedayanatechnolgy@gmail.com</a></p>
            <p><strong>Website:</strong> <a href="/" className="text-blue-600 hover:text-blue-800 hover:underline">/</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
