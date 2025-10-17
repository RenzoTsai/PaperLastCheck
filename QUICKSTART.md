# Quick Start Guide

## 🚀 Get Started in 3 Steps

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 14
- React 18
- React PDF for PDF rendering
- Google Generative AI SDK for Gemini
- Tailwind CSS for styling
- Zustand for state management

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Use the Application

1. **Get Gemini API Key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey) and get your free API key
2. **Enter API Key**: Input your key in the control panel on the right
3. **Upload PDF**: Click "Choose PDF File" and select your paper
4. **Start Checking**: Use any of the available tools!

## 📚 Features Overview

### Quick Checks

**Typo & Grammar Check** (Blue Button)
- Detects spelling errors
- Identifies grammatical mistakes
- Provides line-by-line corrections
- Works on selected text or entire document

**Anonymity Check** (Purple Button)
- Ensures double-blind review compliance
- Detects author names and affiliations
- Finds self-citations that reveal identity
- Checks for personal URLs and acknowledgments

**Term Consistency Check** (Green Button)
- Finds inconsistent terminology
- Detects hyphenation variations
- Identifies capitalization inconsistencies
- Spots US vs UK English mixing

### Reviewer Mode (Orange Section)

This is the **star feature** for progressive paper review:

1. **Select First Section**: Highlight the introduction or first section in the PDF
2. **Click "Review Selected Section"**: AI reviews as a conference reviewer
3. **Continue Section by Section**: Select next section → review → repeat
4. **Cumulative Context**: Each review builds on previous sections
5. **Get Feedback**: Receive reviewer perspective, questions, and suggestions

**Why Progressive Review?**
- Mimics how real reviewers read papers
- Maintains reading context
- Identifies flow and transition issues
- More accurate than full-document analysis
- Helps catch confusion points early

## 🎯 Usage Tips

### For Best Results

1. **Review Mode Strategy**:
   - Start with abstract/introduction
   - Review one section at a time
   - Don't skip sections (context is important!)
   - Save each checkpoint's feedback

2. **Quick Checks**:
   - Run on full document first for overview
   - Then select specific sections for detailed analysis
   - Fix issues iteratively

3. **API Key Management**:
   - Your key is only stored in browser memory
   - Re-enter after closing the browser
   - Never share your API key

### Keyboard Shortcuts

- **Ctrl/Cmd + Click**: Select text in PDF
- **Scroll**: Navigate through PDF
- **Zoom buttons**: Adjust PDF size

## 🔧 Development

### Project Structure

```
PaperLastCheck/
├── app/
│   ├── components/
│   │   ├── PDFViewer.tsx       # PDF display with selection
│   │   ├── ControlPanel.tsx    # Tools and controls
│   │   └── WelcomeModal.tsx    # First-time user guide
│   ├── utils/
│   │   └── gemini.ts           # Gemini API service
│   ├── store.ts                # Global state (Zustand)
│   ├── globals.css             # Tailwind styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main application page
├── public/                     # Static assets
├── .github/workflows/
│   └── deploy.yml              # Auto-deployment config
└── Configuration files...
```

### Available Scripts

```bash
npm run dev        # Development server (http://localhost:3000)
npm run build      # Production build
npm run start      # Start production server
npm run export     # Build and export static files
```

### Customization

**Change Colors**: Edit `tailwind.config.ts`
```typescript
colors: {
  primary: { ... } // Modify theme colors
}
```

**Modify AI Prompts**: Edit `app/utils/gemini.ts`
```typescript
// Customize prompts for different check types
async checkTypos(text: string): Promise<string> {
  const prompt = `Your custom prompt...`;
  // ...
}
```

**Adjust Layout**: Edit `app/page.tsx`
```tsx
// Change panel widths
<div className="w-96"> // Control panel width
```

## 🚀 Deployment

### Deploy to GitHub Pages

1. **Push to GitHub**:
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Wait 2-5 minutes

3. **Access**:
```
https://YOUR_USERNAME.github.io/PaperLastCheck/
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed instructions.

## 🐛 Troubleshooting

### PDF Not Displaying
- Check console for errors
- Ensure PDF is valid and not corrupted
- Try a different PDF

### API Errors
- Verify API key is correct
- Check internet connection
- Ensure Gemini API quota is not exceeded

### Slow Performance
- Large PDFs take time to process
- Try smaller sections in Reviewer Mode
- Check network speed

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

## 📝 Example Workflow

### Typical Paper Check Session

1. **Upload PDF**: Load your paper (e.g., "MyPaper_v3.pdf")

2. **Initial Checks**:
   - Run Anonymity Check → Fix any issues
   - Run Term Consistency Check → Note terminology
   - Run Typo Check on abstract → Fix typos

3. **Progressive Review**:
   - Select abstract → Review → Note feedback
   - Select introduction → Review → Address questions
   - Select related work → Review → Check flow
   - Continue through methodology, results, etc.

4. **Final Pass**:
   - Run full Typo Check
   - Review all checkpoints
   - Address all reviewer feedback

5. **Ready to Submit!** ✅

## 🤝 Contributing

Found a bug? Have a feature idea?

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - Feel free to use and modify!

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Google Gemini AI](https://ai.google.dev/)
- [React PDF](https://react-pdf.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Happy Paper Checking! 📄✨**

Need help? Check the [README.md](README.md) or [DEPLOYMENT.md](DEPLOYMENT.md) for more information.

