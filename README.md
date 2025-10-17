# Paper Last Check

An AI-powered web application for final paper submission checks, helping researchers ensure their papers are ready for conference submission.

## Features

### 🔍 Quick Checks
- **Typo & Grammar Check**: Detect spelling errors and grammatical mistakes
- **Anonymity Check**: Ensure proper anonymization for double-blind review
- **Term Consistency Check**: Verify consistent use of terminology throughout

### 👁️ Reviewer Mode
Progressive section-by-section review that simulates a conference reviewer's perspective:
- Select text in the PDF to review specific sections
- AI maintains context from previous selections
- Provides cumulative feedback as you progress through the paper
- Helps identify confusing points and unclear transitions

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/PaperLastCheck.git
cd PaperLastCheck
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment to GitHub Pages

### Option 1: Manual Deployment

1. Update `next.config.js` with your repository name if different from "PaperLastCheck"

2. Build and export:
```bash
npm run build
```

3. The static files will be in the `out/` directory

4. Deploy to GitHub Pages:
```bash
# Push the out directory to gh-pages branch
git subtree push --prefix out origin gh-pages
```

### Option 2: Automatic Deployment with GitHub Actions

1. Enable GitHub Pages in your repository settings (Settings → Pages)
2. Set source to "GitHub Actions"
3. Push to main branch - the workflow will automatically deploy

The app will be available at: `https://yourusername.github.io/PaperLastCheck/`

## Usage

1. **Set API Key**: Enter your Gemini API key in the control panel
2. **Upload PDF**: Click "Choose PDF File" to upload your paper
3. **Quick Checks**: 
   - Click any check button to analyze the entire document
   - Or select specific text in the PDF to check only that section
4. **Reviewer Mode**:
   - Select the first section you want reviewed
   - Click "Review Selected Section"
   - Continue selecting subsequent sections
   - The AI will maintain context and provide progressive feedback

## Technology Stack

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Modern styling
- **React PDF**: PDF rendering and text extraction
- **Zustand**: State management
- **Google Gemini AI**: LLM for analysis

## Project Structure

```
PaperLastCheck/
├── app/
│   ├── components/
│   │   ├── PDFViewer.tsx      # PDF display and interaction
│   │   └── ControlPanel.tsx   # Tools and controls
│   ├── utils/
│   │   └── gemini.ts          # Gemini API integration
│   ├── store.ts               # Global state management
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main page
├── public/                    # Static assets
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── package.json              # Dependencies
```

## Features in Detail

### Typo & Grammar Check
Analyzes text for:
- Spelling errors
- Grammatical mistakes
- Punctuation issues
- Provides line-by-line corrections

### Anonymity Check
Verifies compliance with double-blind review by detecting:
- Author names or identifying information
- Self-citations that reveal identity
- Acknowledgments
- Personal repository URLs
- Institutional affiliations

### Term Consistency Check
Ensures consistent terminology:
- Identifies inconsistent technical terms
- Detects hyphenation inconsistencies
- Finds capitalization variations
- Spots mixed spelling variants (US vs UK English)

### Reviewer Mode
Simulates the experience of a paper reviewer:
- Progressive reading with maintained context
- Identifies confusing points
- Questions clarity and flow
- Suggests improvements
- Provides cumulative assessment

## Privacy & Security

- Your API key is stored only in your browser's memory (not persisted)
- PDF files are processed locally in your browser
- Only extracted text is sent to Gemini API for analysis
- No data is stored on any server

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

Built with inspiration from [ArXiv](https://arxiv.org/) and modern paper reading interfaces.

