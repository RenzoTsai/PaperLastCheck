import { GoogleGenerativeAI } from '@google/generative-ai';

export interface TypoIssue {
  id: string;
  summary: string;
  originalText: string;
  suggestedText: string;
  explanation?: string;
  severity?: 'minor' | 'major';
}

export interface TypoAnalysisResponse {
  issues: TypoIssue[];
  meta?: {
    overview?: string;
  };
}

export interface AnonymityIssue {
  id: string;
  summary: string;
  offendingText: string;
  explanation?: string;
  recommendation?: string;
  severity?: 'low' | 'medium' | 'high';
}

export interface AnonymityAnalysisResponse {
  issues: AnonymityIssue[];
  meta?: {
    overview?: string;
  };
}

export interface TermConsistencyIssue {
  id: string;
  summary: string;
  term: string;
  originalText: string;
  suggestedText: string;
  explanation?: string;
  severity?: 'minor' | 'major';
}

export interface TermConsistencyAnalysisResponse {
  issues: TermConsistencyIssue[];
  meta?: {
    overview?: string;
  };
}

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private modelName: string;

  constructor(apiKey: string, model?: string) {
    this.modelName = model || 'models/gemini-2.5-pro-latest';
    if (apiKey) {
      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: this.modelName });
    }
  }

  private parseJsonResponse<T>(raw: string): T {
    const trimmed = raw.trim();
    if (!trimmed) {
      throw new Error('Received empty response from Gemini');
    }

    const firstBrace = trimmed.indexOf('{');
    const lastBrace = trimmed.lastIndexOf('}');

    if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
      throw new Error('Unable to parse JSON payload from Gemini response');
    }

    const candidate = trimmed.slice(firstBrace, lastBrace + 1);

    try {
      return JSON.parse(candidate) as T;
    } catch (error) {
      throw new Error('Gemini returned invalid JSON');
    }
  }

  async checkTypos(text: string): Promise<TypoAnalysisResponse> {
    if (!this.model) throw new Error('API key not set');

    const prompt = `You are an expert academic copy editor. Review the provided manuscript excerpt and return only a JSON object describing spelling, grammar, or reference duplication issues.

Requirements:
- Always return valid JSON matching this TypeScript type:
  {
    "issues": Array<{
      "id": string;
      "summary": string;
      "originalText": string;
      "suggestedText": string;
      "explanation"?: string;
      "severity"?: "minor" | "major";
    }>;
    "meta"?: { "overview"?: string };
  }
- Use stable, slug-like IDs (e.g., "typo-001").
- Copy the exact substring from the manuscript into "originalText". Do not normalize quotes or casing.
- Keep "suggestedText" concise, with the corrected phrase or sentence.
- "summary" should be short (<= 12 words).
- Also flag duplicate references: if the same publication appears multiple times in the references section (even with different numbering/IDs), create an issue describing the duplication. Use the exact text of one offending entry for "originalText", mention the other duplicates in "explanation", and suggest consolidating them in "suggestedText".
- Omit "issues" array if nothing needs attention.

Manuscript excerpt:
"""
${text}
"""`;

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const response = await result.response;
    const payload = response?.text?.() ?? response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return this.parseJsonResponse<TypoAnalysisResponse>(payload);
  }

  async checkAnonymity(text: string): Promise<AnonymityAnalysisResponse> {
    if (!this.model) throw new Error('API key not set');

    const prompt = `You are an expert academic reviewer checking for anonymity issues in a double-blind submission. Examine the manuscript excerpt and return only a JSON object describing potential anonymity leaks.

Requirements:
- Always return valid JSON matching this TypeScript type:
  {
    "issues": Array<{
      "id": string;
      "summary": string;
      "offendingText": string;
      "explanation"?: string;
      "recommendation"?: string;
      "severity"?: "low" | "medium" | "high";
    }>;
    "meta"?: { "overview"?: string };
  }
- Use deterministic IDs such as "anon-001".
- Quote the exact sentence or phrase that breaks anonymity in "offendingText".
- Summaries should be short (<= 12 words).
- If you find no issues, return {"issues": [], "meta": {"overview": "Fully anonymized"}}.

Manuscript excerpt:
"""
${text}
"""`;

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.1,
      },
    });

    const response = await result.response;
    const payload = response?.text?.() ?? response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return this.parseJsonResponse<AnonymityAnalysisResponse>(payload);
  }

  async checkTermConsistency(text: string): Promise<TermConsistencyAnalysisResponse> {
    if (!this.model) throw new Error('API key not set');

    const prompt = `As an academic editor, please analyze the following text for terminology consistency and return only a JSON object.

Requirements:
- Always return valid JSON matching this TypeScript type:
  {
    "issues": Array<{
      "id": string;
      "summary": string;
      "term": string;
      "originalText": string;
      "suggestedText": string;
      "explanation"?: string;
      "severity"?: "minor" | "major";
    }>;
    "meta"?: { "overview"?: string };
  }
- Use stable, slug-like IDs such as "term-001".
- Copy the exact substring that contains the problem into "originalText".
- Keep "suggestedText" concise (<= 25 words) and actionable.
- "summary" should be short (<= 12 words).

Checks to perform:
- Inconsistent use of technical terms (e.g., "machine learning" vs "ML" vs "machine-learning")
- Inconsistent hyphenation
- Inconsistent capitalization of terms
- Inconsistent abbreviations
- Abbreviations or acronyms (e.g., DP1-3, G1-3, XX1-4) that appear before they are defined, or never defined at all
- Numbered shorthand such as "DP1-3" where the implied set does not match the items discussed
- Mixed spelling variants (e.g., US vs UK English)

Text to check:
"""
${text}
"""

Please provide:
1. A list of discovered issues (one JSON entry per issue)
2. Suggested standard term or location to introduce a definition
3. Any extra guidance in "explanation"

Return an empty "issues" array if nothing needs attention.`;

    const result = await this.model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

    const response = await result.response;
    const payload = response?.text?.() ?? response?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return this.parseJsonResponse<TermConsistencyAnalysisResponse>(payload);
  }

  async reviewAsReviewer(
    currentText: string, 
    previousContext?: string, 
    previousFeedback?: string
  ): Promise<string> {
    if (!this.model) throw new Error('API key not set');

    let prompt = `You are an expert academic paper reviewer. `;

    if (previousContext && previousFeedback) {
      prompt += `You have already reviewed the previous sections of this paper. Here's what you've seen so far and your previous feedback:

Previous context:
"""
${previousContext}
"""

Your previous feedback:
"""
${previousFeedback}
"""

Now you are continuing to read the next section:
"""
${currentText}
"""

Based on your understanding so far and this new section, please provide:
1. Your understanding of the flow and coherence with previous sections
2. Any confusing points or unclear transitions
3. Questions you have as a reviewer
4. Suggestions for improvement
5. Your cumulative assessment`;
    } else {
      prompt += `You are starting to review this paper. Here is the beginning section:

"""
${currentText}
"""

Please provide as a reviewer:
1. Your initial understanding of the paper's goal and contribution
2. Clarity of the introduction/current section
3. Any confusing points or questions
4. Suggestions for improvement`;
    }

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }

  async analyzeFullDocument(text: string, checkType: 'comprehensive'): Promise<string> {
    if (!this.model) throw new Error('API key not set');

    const prompt = `As an expert academic paper reviewer, please perform a comprehensive analysis of this paper for submission readiness:

"""
${text}
"""

Please check and report on:
1. **Typos and Grammar**: Any spelling or grammatical errors
2. **Anonymity**: Whether the paper is properly anonymized for double-blind review
3. **Term Consistency**: Consistent use of terminology throughout
4. **Overall Readiness**: Is this paper ready for submission?

Provide a structured report with clear sections for each aspect.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  }
}
