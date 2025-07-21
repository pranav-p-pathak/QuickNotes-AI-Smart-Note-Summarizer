import React from 'react';
import { FiHeart, FiGithub, FiExternalLink } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <span>Made with</span>
            <FiHeart className="w-4 h-4 text-red-500 animate-pulse" />
            <span>using AI & modern web tech</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <FiGithub className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200"
            >
              <FiExternalLink className="w-4 h-4" />
              <span>Portfolio</span>
            </a>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>QuickNotes AI - Intelligent note summarization powered by modern AI</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;