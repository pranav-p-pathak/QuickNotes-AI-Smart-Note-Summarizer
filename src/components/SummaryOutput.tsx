import React from 'react';
import { FiCheck, FiEdit3, FiInfo } from 'react-icons/fi';
import { countWords } from '../utils/textAnalysis';

interface SummaryOutputProps {
  summary: string;
  isLoading: boolean;
  originalWordCount: number;
  summaryStyle: 'professional' | 'bullet';
  onStyleChange: (style: 'professional' | 'bullet') => void;
  onEdit?: (newSummary: string) => void;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ 
  summary, 
  isLoading, 
  originalWordCount,
  summaryStyle,
  onStyleChange,
  onEdit 
}) => {
  const summaryWordCount = countWords(summary);
  const compressionPercentage = originalWordCount > 0 && summaryWordCount > 0
    ? Math.round(((originalWordCount - summaryWordCount) / originalWordCount) * 100)
    : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full mr-3">
            <FiCheck className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            📝 AI Summary
          </h2>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Summary Style Toggle */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500 dark:text-gray-400">Style:</span>
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onStyleChange('professional')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${
                  summaryStyle === 'professional'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📄 Professional
              </button>
              <button
                onClick={() => onStyleChange('bullet')}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${
                  summaryStyle === 'bullet'
                    ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                • Bullet Points
              </button>
            </div>
          </div>
          
          {summary && onEdit && (
            <button
              onClick={() => onEdit(summary)}
              className="flex items-center space-x-1 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
            >
              <FiEdit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          )}
        </div>
      </div>

      {summary && (
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <span>Summary Length: {summaryWordCount.toLocaleString()} words</span>
            {compressionPercentage > 0 && (
              <span className="flex items-center space-x-1">
                <span>↘️ Reduced by</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  {compressionPercentage}%
                </span>
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1 text-xs text-gray-400 dark:text-gray-500">
            <FiInfo className="w-3 h-3" />
            <span>AI-generated</span>
          </div>
        </div>
      )}

      <div className="relative">
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <div className="relative">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500 mx-auto mb-4"></div>
                <div className="absolute inset-0 rounded-full h-12 w-12 border-t-2 border-emerald-500 animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Analyzing your notes...</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">This may take a few seconds</p>
            </div>
          </div>
        ) : summary ? (
          <div className="bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-700 dark:to-gray-600 rounded-xl p-5 min-h-32 max-h-96 overflow-y-auto border border-gray-200 dark:border-gray-600">
            <div className="prose dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed font-serif text-base">
                {summary}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiCheck className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                Your AI summary will appear here
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                Add some notes and click "Summarize" to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryOutput;