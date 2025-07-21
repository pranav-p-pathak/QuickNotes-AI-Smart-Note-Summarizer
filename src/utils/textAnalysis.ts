export const countWords = (text: string): number => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

export const countCharacters = (text: string): number => {
  return text.length;
};

export const generateSummary = async (text: string, style: 'professional' | 'bullet' = 'professional'): Promise<string> => {
  if (!text.trim()) return '';
  
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error('Gemini API key not found. Please check your environment variables.');
  }
  
  const wordCount = countWords(text);
  const isLongText = wordCount > 500;
  
  // Style-specific prompts
  const professionalPrompt = `You are a professional assistant specializing in creating clear, concise summaries. 

Write a professional summary of the following text. Include all important details and deadlines. Use paragraphs grouped by topic and highlight any action items clearly.

Guidelines:
- Start with a bold heading summarizing the main topic
- Focus on key points, main ideas, and important facts
- Remove filler words and redundant information
- Retain action items, decisions, and critical details
- Use a professional and readable tone
- Keep the summary under ${isLongText ? '300' : '200'} words
- Use clear paragraphs for readability

Text to summarize:
${text}`;

  const bulletPrompt = `You are a professional assistant specializing in creating clear, concise summaries.

Summarize the following text in concise bullet points. Focus on key facts, decisions, deadlines, and action items. Omit filler and group related info.

Guidelines:
- Use bullet points for easy scanning
- Focus on key points, decisions, and action items
- Remove filler words and redundant information
- Group related information together
- Keep each bullet point concise and clear
- Keep the summary under ${isLongText ? '300' : '200'} words
- Use clear, scannable formatting

Text to summarize:
${text}`;

  const prompt = style === 'professional' ? professionalPrompt : bulletPrompt;

  const payload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.3,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: isLongText ? 1536 : 1024,
    }
  };
  
  // Retry logic for handling temporary API issues
  const maxRetries = 3;
  const baseDelay = 1000; // 1 second
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {
          return data.candidates[0].content.parts[0].text;
        } else {
          throw new Error('Unexpected API response format');
        }
      }
      
      // Handle specific error codes
      const errorText = await res.text();
      console.warn(`⚠️ Gemini API failed (attempt ${attempt}/${maxRetries}):`, errorText);
      
      if (res.status === 503) {
        if (attempt === maxRetries) {
          throw new Error('Gemini API is temporarily unavailable. Please try again in a few minutes.');
        }
        // Wait before retrying for 503 errors
        await new Promise(resolve => setTimeout(resolve, baseDelay * attempt));
        continue;
      } else if (res.status === 429) {
        if (attempt === maxRetries) {
          throw new Error('API rate limit exceeded. Please wait a moment and try again.');
        }
        // Wait longer for rate limit errors
        await new Promise(resolve => setTimeout(resolve, baseDelay * attempt * 2));
        continue;
      } else if (res.status === 401 || res.status === 403) {
        throw new Error('Invalid API key. Please check your Gemini API key configuration.');
      } else {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
      }
      
    } catch (err) {
      console.error(`❌ Gemini API error (attempt ${attempt}/${maxRetries}):`, err);
      
      if (attempt === maxRetries) {
        if (err instanceof Error) {
          throw err;
        } else {
          throw new Error('Failed to generate summary: Network error or API unavailable');
        }
      }
      
      // Wait before retrying for network errors
      await new Promise(resolve => setTimeout(resolve, baseDelay * attempt));
    }
  }
}