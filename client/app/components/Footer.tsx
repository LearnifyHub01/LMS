import React from "react";
import Link from "next/link";
import { X, Instagram, LinkedIn, YouTube, Facebook } from "@mui/icons-material";
import FitbitIcon from '@mui/icons-material/Fitbit';
type Props = {};

const Footer: React.FC<Props> = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-900 transition-colors duration-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
          {/* 1st Column - Logo Section (Moved to Left) */}
          <div className="text-left flex flex-col items-start justify-start">
            <Link
              href="/"
              className="inline-block mb-6 transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                <span className="w-12 h-12 bg-indigo-500 dark:bg-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  <FitbitIcon/>
                </span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white hidden sm:inline">
                  LearnifyHub
                </span>
              </div>
            </Link>
          </div>

          {/* 2nd Column - About */}
          <div className="text-left">
            <h4 className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-7">
              About
            </h4>
            <ul className="text-sm transition-all duration-500">
              <li className="mb-6">
                <Link
                  href="/our-story"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  Our Story
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  href="/privacy-policy"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* 3rd Column - Quick Links */}
          <div className="text-left">
            <h4 className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-7">
              Quick Links
            </h4>
            <ul className="text-sm transition-all duration-500">
              <li className="mb-6">
                <Link
                  href="/courses"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  Courses
                </Link>
              </li>
              <li className="mb-6">
                <Link
                  href="/profile"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/courses-dashboard"
                  className="text-gray-600 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                >
                  Courses Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* 4th Column - Contact Us */}
          <div className="text-left">
            <h4 className="text-lg text-gray-900 dark:text-gray-100 font-medium mb-7">
              Contact Us
            </h4>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="mb-4">Email: learnifyhubplatform@gmail.com</p>
              <p className="mb-4">Phone: +1 (123) 456-7890</p>
              <a
                href="mailto:learnifyhubplatform@gmail.com?subject=Query%20About%20Learnify%20LMS&body=Hello%20Learnify%20Team,%0D%0A%0D%0AI%20have%20a%20question%20about%20your%20LMS%20platform.%20Could%20you%20please%20assist%20me%20with%20[insert%20your%20query%20here]?%0D%0A%0D%0AThanks,%0D%0A[Your%20Name]"
                className="inline-block py-2.5 px-5 bg-indigo-500 dark:bg-indigo-600 rounded-full text-xs text-white transition-all duration-500 hover:bg-indigo-600 dark:hover:bg-indigo-700"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="py-7 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-0">
            © LearnifyHub {new Date().getFullYear()}, All rights reserved.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-600 dark:bg-gray-700 flex justify-center items-center hover:bg-black dark:hover:bg-black transition-colors duration-300"
            >
              <X className="text-white" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-600 dark:bg-gray-700 flex justify-center items-center hover:bg-[#316FF6] dark:hover:bg-[#316FF6] transition-colors duration-300"
            >
              <Facebook className="text-white" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-600 dark:bg-gray-700 flex justify-center items-center hover:bg-[#FCAF45] dark:hover:bg-pink-600 transition-colors duration-300"
            >
              <Instagram className="text-white" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-600 dark:bg-gray-700 flex justify-center items-center hover:bg-[#0077B5] dark:hover:bg-[#0077B5] transition-colors duration-300"
            >
              <LinkedIn className="text-white" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-gray-600 dark:bg-gray-700 flex justify-center items-center hover:bg-[#FF0000] dark:hover:bg-[#FF0000] transition-colors duration-300"
            >
              <YouTube className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;