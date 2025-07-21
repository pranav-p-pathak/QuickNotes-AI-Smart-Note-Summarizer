import React, { useRef } from 'react';
import { FiUpload, FiFileText } from 'react-icons/fi';
import { Brain } from 'lucide-react';
import classNames from 'classnames';

interface NoteInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSummarize: (style?: 'professional' | 'bullet') => void;
  isLoading: boolean;
  charCount: number;
  wordCount: number;
  summaryStyle: 'professional' | 'bullet';
}

const NoteInput: React.FC<NoteInputProps> = ({
  inputText,
  setInputText,
  onSummarize,
  isLoading,
  charCount,
  wordCount,
  summaryStyle
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInputText(content);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files[0] && files[0].type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setInputText(content);
      };
      reader.readAsText(files[0]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <FiFileText className="mr-2 text-indigo-500" />
          Your Notes
        </h2>
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
        >
          <FiUpload className="w-4 h-4" />
          <span className="hidden sm:inline">Upload .txt</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      {charCount < 50 && charCount > 0 && (
        <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-700 dark:text-yellow-300">
            💡 Try entering a longer note (at least 50 characters) for better summarization results.
          </p>
        </div>
      )}

      {charCount > 5000 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            📄 Large text detected. The AI will focus on the most important sections for summarization.
          </p>
        </div>
      )}

      <div
        className="relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your notes or meeting transcript here... You can also drag and drop a .txt file!"
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors duration-200"
        />
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {charCount.toLocaleString()} characters • {wordCount.toLocaleString()} words
        </div>
        
        <button
          onClick={onSummarize}
          disabled={!inputText.trim() || isLoading}
          className={classNames(
            'px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2',
            {
              'bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105': !isLoading && inputText.trim(),
              'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed': !inputText.trim() || isLoading
            }
          )}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Generating {summaryStyle === 'professional' ? 'Professional' : 'Bullet'} Summary...</span>
            </>
          ) : (
            <>
              <Brain className="w-4 h-4" />
              <span>Generate {summaryStyle === 'professional' ? 'Professional' : 'Bullet'} Summary</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default NoteInput;