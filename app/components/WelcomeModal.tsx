'use client';

import { useState, useEffect } from 'react';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    if (!hasSeenWelcome) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to Paper Last Check! 📄
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>
              An AI-powered tool to help you perform final checks on your academic paper before submission.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                🚀 Quick Start
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Enter your Gemini API key (get one from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline">Google AI Studio</a>)</li>
                <li>Upload your paper PDF</li>
                <li>Use the tools in the right panel to check your paper</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                Available Features:
              </h3>
              
              <div className="space-y-2">
                <div className="flex gap-3">
                  <span className="text-blue-500 text-xl">✓</span>
                  <div>
                    <p className="font-medium">Typo & Grammar Check</p>
                    <p className="text-sm">Detect spelling and grammatical errors</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-purple-500 text-xl">✓</span>
                  <div>
                    <p className="font-medium">Anonymity Check</p>
                    <p className="text-sm">Ensure proper double-blind review compliance</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <div>
                    <p className="font-medium">Term Consistency Check</p>
                    <p className="text-sm">Verify consistent terminology usage</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <span className="text-orange-500 text-xl">★</span>
                  <div>
                    <p className="font-medium">Reviewer Mode</p>
                    <p className="text-sm">Progressive section-by-section review from a reviewer's perspective</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900 rounded-lg p-4">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                💡 How Reviewer Mode Works
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Select the first section of your paper in the PDF viewer</li>
                <li>Click "Review Selected Section"</li>
                <li>Continue selecting subsequent sections</li>
                <li>The AI maintains context and provides cumulative feedback</li>
              </ol>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                🔒 Privacy Note
              </h3>
              <p className="text-sm">
                Your API key is stored only in browser memory. PDFs are processed locally. 
                Only extracted text is sent to Gemini API for analysis. No data is stored on our servers.
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

