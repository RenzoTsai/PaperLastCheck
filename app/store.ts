import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ReviewCheckpoint {
  id: string;
  timestamp: number;
  text: string;
  pageNumber: number;
  feedback?: string;
}

export interface RectLike {
  left: number;
  top: number;
  width: number;
  height: number;
}

export interface TypoIssueRecord {
  id: string;
  summary: string;
  originalText: string;
  suggestedText: string;
  explanation?: string;
  severity?: 'minor' | 'major';
  highlightAnnotationId?: string;
  noteAnnotationId?: string;
  pageIndex?: number;
  targetRect?: RectLike;
}

export interface AnonymityIssueRecord {
  id: string;
  summary: string;
  offendingText: string;
  explanation?: string;
  recommendation?: string;
  severity?: 'low' | 'medium' | 'high';
  highlightAnnotationId?: string;
  noteAnnotationId?: string;
  pageIndex?: number;
  targetRect?: RectLike;
}

export interface TermConsistencyIssueRecord {
  id: string;
  summary: string;
  term: string;
  originalText: string;
  suggestedText: string;
  explanation?: string;
  severity?: 'minor' | 'major';
  highlightAnnotationId?: string;
  noteAnnotationId?: string;
  pageIndex?: number;
  targetRect?: RectLike;
}

export type AnnotationType = 'typo' | 'anonymity' | 'consistency' | 'reviewer';

export interface Annotation {
  id: string;
  pageNumber: number;
  rect: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  type: AnnotationType;
  summary: string;
  details: string;
}

export interface SelectionRect {
  pageNumber: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AppState {
  // API Key
  apiKey: string;
  setApiKey: (key: string) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;

  // PDF
  pdfFile: File | null;
  setPdfFile: (file: File | null) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  numPages: number;
  setNumPages: (pages: number) => void;
  extractedText: string;
  setExtractedText: (text: string) => void;

  // Review Mode
  reviewCheckpoints: ReviewCheckpoint[];
  addReviewCheckpoint: (checkpoint: ReviewCheckpoint) => void;
  clearReviewCheckpoints: () => void;

  // Typo issues
  typoIssues: TypoIssueRecord[];
  setTypoIssues: (issues: TypoIssueRecord[]) => void;
  anonymityIssues: AnonymityIssueRecord[];
  setAnonymityIssues: (issues: AnonymityIssueRecord[]) => void;
  termConsistencyIssues: TermConsistencyIssueRecord[];
  setTermConsistencyIssues: (issues: TermConsistencyIssueRecord[]) => void;

  // Annotation overlay
  annotations: Annotation[];
  addAnnotation: (annotation: Annotation) => void;
  clearAnnotations: () => void;

  // Current Operation
  currentOperation: 'idle' | 'typo-check' | 'anonymity-check' | 'consistency-check' | 'reviewer-mode';
  setCurrentOperation: (op: AppState['currentOperation']) => void;

  // Results
  currentResult: string;
  setCurrentResult: (result: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Selected text
  selectedText: string;
  setSelectedText: (text: string) => void;
  selectionRect: SelectionRect | null;
  setSelectionRect: (rect: SelectionRect | null) => void;

  // Viewer instance
  viewerInstance: any;
  setViewerInstance: (instance: any | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
  // API Key
  apiKey: '',
  setApiKey: (key) => set({ apiKey: key }),
  selectedModel: 'models/gemini-2.5-pro-latest',
  setSelectedModel: (model) => set({ selectedModel: model }),

  // PDF
  pdfFile: null,
  setPdfFile: (file) => set({ pdfFile: file }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  numPages: 0,
  setNumPages: (pages) => set({ numPages: pages }),
  extractedText: '',
  setExtractedText: (text) => set({ extractedText: text }),

  // Review Mode
  reviewCheckpoints: [],
  addReviewCheckpoint: (checkpoint) => 
    set((state) => ({ 
      reviewCheckpoints: [...state.reviewCheckpoints, checkpoint] 
    })),
  clearReviewCheckpoints: () => set({ reviewCheckpoints: [] }),

  // Typo issues
  typoIssues: [],
  setTypoIssues: (issues) => set({ typoIssues: issues }),
  anonymityIssues: [],
  setAnonymityIssues: (issues) => set({ anonymityIssues: issues }),
  termConsistencyIssues: [],
  setTermConsistencyIssues: (issues) => set({ termConsistencyIssues: issues }),

  // Annotation overlay
  annotations: [],
  addAnnotation: (annotation) =>
    set((state) => ({
      annotations: [...state.annotations, annotation],
    })),
  clearAnnotations: () => set({ annotations: [] }),

  // Current Operation
  currentOperation: 'idle',
  setCurrentOperation: (op) => set({ currentOperation: op }),

  // Results
  currentResult: '',
  setCurrentResult: (result) => set({ currentResult: result }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Selected text
  selectedText: '',
  setSelectedText: (text) => set({ selectedText: text }),
  selectionRect: null,
  setSelectionRect: (rect) => set({ selectionRect: rect }),

  // Viewer instance
  viewerInstance: null,
  setViewerInstance: (instance) => set({ viewerInstance: instance }),
    }),
    {
      name: 'paperlastcheck-store',
      partialize: (state: AppState) => ({
        apiKey: state.apiKey,
        selectedModel: state.selectedModel,
      }),
    } as any
  )
);
