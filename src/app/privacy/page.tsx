import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Crochet911',
  description: 'Learn how Crochet911 protects your privacy and handles your personal data. Our comprehensive privacy policy explains data collection, usage, and your rights.',
  robots: {
    index: true,
    follow: true,
  },
}

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="text-4xl font-bold text-slate-900">
              Crochet911
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-lg max-w-none">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 font-medium mb-2">
              At Crochet911, we are committed to protecting your privacy and ensuring the security of your personal information.
            </p>
            <p className="text-blue-700">
              This Privacy Policy explains how we collect, use, and safeguard your data when you use our crochet patterns directory.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Information You Provide</h3>
            <ul className="list-disc pl-6 mb-6 text-slate-700">
              <li>Contact information when you reach out to us</li>
              <li>Newsletter subscription email addresses</li>
              <li>Comments and feedback you provide</li>
              <li>User account information if you create an account</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-800 mb-3">Information Collected Automatically</h3>
            <ul className="list-disc pl-6 mb-6 text-slate-700">
              <li>Website usage data and analytics</li>
              <li>IP address and browser information</li>
              <li>Pages visited and time spent on our site</li>
              <li>Search queries and pattern preferences</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 text-slate-700">
              <li>Provide and improve our crochet pattern directory services</li>
              <li>Send newsletters and updates about new patterns</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Analyze website usage to enhance user experience</li>
              <li>Ensure website security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Information Sharing</h2>
            <p className="text-slate-700 mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:
            </p>
            <ul className="list-disc pl-6 text-slate-700">
              <li>With service providers who help us operate our website</li>
              <li>When required by law or to protect our rights</li>
              <li>In connection with a business transfer or merger</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies and Tracking</h2>
            <p className="text-slate-700 mb-4">
              We use cookies and similar technologies to enhance your browsing experience and analyze website traffic. You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-slate-700">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-700">
              <li>Access and update your personal information</li>
              <li>Delete your account and associated data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
              <li>File a complaint with relevant authorities</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-700">
              If you have questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg mt-4">
              <p className="text-slate-700">
                Email: privacy@crochet911.com<br />
                Address: [Your Address]
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-slate-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200">
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}