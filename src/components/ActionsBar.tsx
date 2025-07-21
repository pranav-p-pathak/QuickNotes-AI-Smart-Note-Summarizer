import React from 'react';
import { FiCopy, FiDownload, FiTrash2, FiBarChart, FiShare2, FiFileText } from 'react-icons/fi';
import classNames from 'classnames';

interface ActionsBarProps {
  summary: string;
  onCopy: () => void;
  onDownload: () => void;
  onDownloadMarkdown?: () => void;
  onClear: () => void;
  originalWordCount: number;
  summaryWordCount: number;
  onRate?: (rating: 'up' | 'down') => void;
}

const ActionsBar: React.FC<ActionsBarProps> = ({
  summary,
  onCopy,
  onDownload,
  onDownloadMarkdown,
  onClear,
  originalWordCount,
  summaryWordCount,
  onRate
}) => {
  const reductionPercentage = originalWordCount > 0 
    ? Math.round(((originalWordCount - summaryWordCount) / originalWordCount) * 100)
    : 0;

  const hasContent = summary.trim().length > 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {hasContent && originalWordCount > 0 && (
              <div className="flex items-center space-x-2 text-sm">
                <FiBarChart className="text-emerald-500" />
                <span className="text-gray-600 dark:text-gray-400">
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">{reductionPercentage}%</span> compression
                </span>
                <span className="text-gray-400 dark:text-gray-500">•</span>
                <span className="text-gray-600 dark:text-gray-400">
                  {originalWordCount.toLocaleString()} → {summaryWordCount.toLocaleString()} words
                </span>
              </div>
            )}
          </div>

          {hasContent && originalWordCount > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Rate this summary:</span>
              <button
                onClick={() => onRate?.('up')}
                className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900 transition-colors duration-200"
                title="Good summary"
              >
                <span className="text-green-600 dark:text-green-400">👍</span>
              </button>
              <button
                onClick={() => onRate?.('down')}
                className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
                title="Poor summary"
              >
                <span className="text-red-600 dark:text-red-400">👎</span>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onCopy}
            disabled={!hasContent}
            className={classNames(
              'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 justify-center',
              {
                'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 hover:scale-105': hasContent,
                'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed': !hasContent
              }
            )}
          >
            <FiCopy className="w-4 h-4" />
            <span>Copy</span>
          </button>

          <button
            onClick={onDownload}
            disabled={!hasContent}
            className={classNames(
              'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 justify-center',
              {
                'bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-300 hover:scale-105': hasContent,
                'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed': !hasContent
              }
            )}
          >
            <FiDownload className="w-4 h-4" />
            <span>.txt</span>
          </button>

          {onDownloadMarkdown && (
            <button
              onClick={onDownloadMarkdown}
              disabled={!hasContent}
              className={classNames(
                'flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 justify-center',
                {
                  'bg-purple-100 hover:bg-purple-200 dark:bg-purple-900 dark:hover:bg-purple-800 text-purple-700 dark:text-purple-300 hover:scale-105': hasContent,
                  'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed': !hasContent
                }
              )}
            >
              <FiFileText className="w-4 h-4" />
              <span>.md</span>
            </button>
          )}

          <button
            onClick={onClear}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-red-100 hover:bg-red-200 dark:bg-red-900 dark:hover:bg-red-800 text-red-700 dark:text-red-300 transition-all duration-200 hover:scale-105 justify-center"
          >
            <FiTrash2 className="w-4 h-4" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionsBar;