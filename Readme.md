
# 📝 QuickNotes AI – Smart Note Summarizer

QuickNotes AI is a lightweight, AI-powered web app that lets users paste or upload long notes and receive concise summaries instantly. Designed with speed and simplicity in mind, it's perfect for students, professionals, or anyone who wants to extract key insights without the clutter.

---

## 🚀 Features

- 📄 Paste or type in long notes, meeting transcripts, or paragraphs.
- 🧠 AI summarization using Gemini API (or OpenAI/Hugging Face).
- 📥 Download summary as `.txt` or copy it with one click.
- 🌙 Dark/light mode toggle.
- 🔔 Toast notifications for actions like "Copied!".
- 💾 Saves recent summaries locally (optional).
- 📊 Character count and basic word insights.

---

## 🖼️ Demo

<img width="760" height="667" alt="image" src="https://github.com/user-attachments/assets/dea3f00b-35fc-4691-a09c-1b644f832ec0" />


---

## 🛠️ Built With

- **Frontend:** React + TypeScript + TailwindCSS  
- **AI API:** Gemini (free tier) or OpenAI/Hugging Face  
- **Hosting:** Vercel  
- **Utilities:** Toastify, LocalStorage, FileSaver

---

## 🧪 How to Run Locally

```bash
git clone https://github.com/yourusername/quicknotes-ai.git
cd quicknotes-ai
npm install
npm run dev
```

Make sure to add your API key in a `.env` file:

```env
VITE_GEMINI_API_KEY=your_key_here
```

---

## 📂 Project Structure

```
src/
├── components/      # UI components (Header, Input, Output, etc.)
├── hooks/           # Custom hooks (e.g., localStorage)
├── utils/           # Helper functions (file ops, analysis)
├── App.tsx          # Main app
└── main.tsx         # Entry point
```

---

## 📄 License

MIT License © 2025 [Your Name]

---

## ✨ Credits

Inspired by the need for faster note digestion during lectures and meetings.
