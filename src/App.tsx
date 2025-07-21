import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Header from './components/Header';
import NoteInput from './components/NoteInput';
import SummaryOutput from './components/SummaryOutput';
import ActionsBar from './components/ActionsBar';
import Footer from './components/Footer';
import useLocalStorage from './hooks/useLocalStorage';
import { countWords, countCharacters, generateSummary } from './utils/textAnalysis';
import { downloadAsTextFile, downloadAsMarkdownFile, copyToClipboard } from './utils/fileOperations';

function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [summaryStyle, setSummaryStyle] = useLocalStorage<'professional' | 'bullet'>('summaryStyle', 'professional');
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const charCount = countCharacters(inputText);
  const wordCount = countWords(inputText);
  const summaryWordCount = countWords(summary);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSummarize = async (style?: 'professional' | 'bullet') => {
    const selectedStyle = style || summaryStyle;
    
    if (!inputText.trim()) {
      toast.error('Please enter some text to summarize');
      return;
    }

    if (inputText.trim().length < 20) {
      toast.error('Please enter at least 20 characters for meaningful summarization');
      return;
    }

    setIsLoading(true);
    
    try {
      const summary = await generateSummary(inputText, selectedStyle);
      setSummary(summary);
      
      toast.success(`${selectedStyle === 'professional' ? 'Professional' : 'Bullet point'} summary generated successfully!`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to generate summary. Please try again.';
      toast.error(errorMessage);
      console.error('Summarization error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!summary.trim()) {
      toast.error('No summary to copy');
      return;
    }

    const success = await copyToClipboard(summary);
    if (success) {
      toast.success('Summary copied to clipboard!');
    } else {
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleDownload = () => {
    if (!summary.trim()) {
      toast.error('No summary to download');
      return;
    }

    try {
      const timestamp = new Date().toISOString().split('T')[0];
      downloadAsTextFile(summary, `summary-${timestamp}.txt`);
      toast.success('Summary downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download file');
      console.error('Download error:', error);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!summary.trim()) {
      toast.error('No summary to download');
      return;
    }

    try {
      const timestamp = new Date().toISOString().split('T')[0];
      downloadAsMarkdownFile(summary, `summary-${timestamp}.md`);
      toast.success('Markdown file downloaded successfully!');
    } catch (error) {
      toast.error('Failed to download markdown file');
      console.error('Download error:', error);
    }
  };

  const handleEditSummary = (newSummary: string) => {
    // For now, just show a toast. In a full implementation, you might open a modal or inline editor
    toast('Edit functionality coming soon!', { icon: '✏️' });
  };

  const handleRateSummary = (rating: 'up' | 'down') => {
    const message = rating === 'up' ? 'Thanks for the positive feedback!' : 'Thanks for the feedback. We\'ll work on improving!';
    toast.success(message);
    // In a full implementation, you might send this to analytics or a feedback system
  };

  const handleStyleChange = (newStyle: 'professional' | 'bullet') => {
    setSummaryStyle(newStyle);
    // If there's existing content and user changes style, offer to regenerate
    if (summary && inputText.trim()) {
      toast('Style changed! Click "Generate Summary" to apply the new format.', { 
        icon: '🎨',
        duration: 4000 
      });
    }
  };

  const handleClear = () => {
    setInputText('');
    setSummary('');
    toast.success('Content cleared');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-200">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <NoteInput
              inputText={inputText}
              setInputText={setInputText}
              onSummarize={handleSummarize}
              isLoading={isLoading}
              charCount={charCount}
              wordCount={wordCount}
              summaryStyle={summaryStyle}
            />
          </div>
          
          <div className="space-y-6">
            <SummaryOutput
              summary={summary}
              isLoading={isLoading}
              originalWordCount={wordCount}
              summaryStyle={summaryStyle}
              onStyleChange={handleStyleChange}
              onEdit={handleEditSummary}
            />
            
            <ActionsBar
              summary={summary}
              onCopy={handleCopy}
              onDownload={handleDownload}
              onDownloadMarkdown={handleDownloadMarkdown}
              onClear={handleClear}
              originalWordCount={wordCount}
              summaryWordCount={summaryWordCount}
              onRate={handleRateSummary}
            />
          </div>
        </div>
      </main>
      
      <Footer />
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: darkMode ? '#374151' : '#ffffff',
            color: darkMode ? '#f3f4f6' : '#111827',
            border: darkMode ? '1px solid #4b5563' : '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  );
}

export default App;