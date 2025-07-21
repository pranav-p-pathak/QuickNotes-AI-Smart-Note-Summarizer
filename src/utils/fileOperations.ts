import { saveAs } from 'file-saver';

export const downloadAsTextFile = (content: string, filename: string = 'summary.txt') => {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, filename);
};

export const downloadAsMarkdownFile = (content: string, filename: string = 'summary.md') => {
  // Format content as markdown
  const markdownContent = `# AI Summary

Generated on: ${new Date().toLocaleDateString()}

---

${content}

---

*This summary was generated using AI technology.*
`;
  
  const blob = new Blob([markdownContent], { type: 'text/markdown;charset=utf-8' });
  saveAs(blob, filename);
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
};