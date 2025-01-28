import { MetaFunction } from "@remix-run/node";
import { motion } from "framer-motion";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Privacy Policy - Make It Jake's" },
    { name: "description", content: "Transform your SWE resume into Jake's elegant LaTeX template with just one click. No LaTeX knowledge required." },
  ];
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Privacy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-slate-600 hover:text-slate-900 transition-colors"
        >
          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="ml-2">Go Back</span>
        </Link>
      </div>
      
      <motion.div 
        className="max-w-4xl mx-auto py-8 md:py-12"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item}>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            Privacy Policy
          </h1>
          <p className="text-center text-slate-600 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            We believe privacy policies should be clear, honest, and actually readable. Here's ours.
          </p>
        </motion.div>

        <motion.div variants={item} className="bg-blue-50/70 rounded-2xl shadow-md p-8 md:p-10 mb-16 hover:shadow-lg transition-all duration-300 border border-blue-100">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Key Points</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-lg text-slate-700">We process your uploaded resumes through either Fireworks's Llama API, Anthropic's API, or Gemini's API to transform them into Jake's elegant LaTeX template.</span>
            </li>
            <li className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg text-slate-700">Uploaded resumes are temporarily cached and deleted permanently within one hour.</span>
            </li>
            <li className="flex items-start gap-4">
              <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-lg text-slate-700">We prioritize your privacy and never sell, rent, or store your data beyond what is necessary.</span>
            </li>
          </ul>
        </motion.div>

        <motion.div 
          className="space-y-12 md:space-y-16"
          variants={container}
        >
          <motion.section variants={item} className="bg-white rounded-2xl shadow-md p-8 md:p-10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Introduction</h2>
            </div>
            <div className="prose prose-slate lg:prose-lg">
              <p className="text-slate-700 leading-relaxed">
                Welcome to Make It Jake's ("we," "our," or "us"). We value your privacy and are committed to protecting your personal information. 
                This Privacy Policy explains how we collect, use, and protect the information you provide when using our service at{" "}
                <a href="https://resumes.one" className="text-blue-600 hover:text-blue-800 no-underline border-b-2 border-blue-200 hover:border-blue-600 transition-colors">
                  resumes.one
                </a>.
              </p>
            </div>
          </motion.section>

          <motion.section variants={item} className="bg-white rounded-2xl shadow-md p-8 md:p-10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Information We Collect</h2>
            </div>
            <div className="prose prose-slate lg:prose-lg">
              <p className="text-slate-700 leading-relaxed">When you use our service to transform your resume into Jake's elegant LaTeX template, we collect:</p>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-slate-700">Resume Content: The resume files you upload to our service</span>
                </li>
              </ul>
              <p className="text-slate-700 leading-relaxed mt-4">
                We do not collect or store any other personal information unless explicitly provided by you for purposes such as contacting customer support.
              </p>
            </div>
          </motion.section>

          <motion.section variants={item} className="bg-white rounded-2xl shadow-md p-8 md:p-10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">How We Use Your Information</h2>
            </div>
            <div className="prose prose-slate lg:prose-lg">
              <p className="text-slate-700 leading-relaxed">The primary use of your uploaded resume content is to transform it into Jake's LaTeX template. Specifically:</p>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-slate-700">Your resume is processed through either Fireworks's Llama API, Anthropic's API, or Gemini's API to perform the transformation</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span className="text-slate-700">The transformed file is made available for download by you</span>
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={item} className="bg-white rounded-2xl shadow-md p-8 md:p-10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Data Retention and Deletion</h2>
            </div>
            <div className="prose prose-slate lg:prose-lg">
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">Uploaded resumes are cached temporarily and never stored for more than one hour</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">After one hour, all uploaded resumes are permanently deleted from our servers</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-slate-700">No backups or copies of your resume are stored beyond this period</span>
                </li>
              </ul>
            </div>
          </motion.section>

          <motion.section variants={item} className="bg-white rounded-2xl shadow-md p-8 md:p-10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-blue-100 rounded-lg p-3">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Security Measures</h2>
            </div>
            <div className="prose prose-slate lg:prose-lg">
              <p className="text-slate-700 leading-relaxed">We implement industry-standard security measures to protect your data, including:</p>
              <ul className="space-y-4 mt-4">
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="text-slate-700">Encrypted transmission of uploaded resumes</span>
                </li>
                <li className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="text-slate-700">Secure deletion processes to ensure resumes are erased after one hour</span>
                </li>
              </ul>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>
    </div>
  );
} 