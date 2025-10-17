'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import type { MouseEvent as ReactMouseEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const remarkGfmPlugin = remarkGfm as unknown as any;
import {
  useAppStore,
  TypoIssueRecord,
  AnonymityIssueRecord,
  TermConsistencyIssueRecord,
} from '../store';
import {
  GeminiService,
  TypoAnalysisResponse,
  TypoIssue,
  AnonymityAnalysisResponse,
  AnonymityIssue,
  TermConsistencyAnalysisResponse,
} from '../utils/gemini';

const buildSummary = (text: string) => {
  const clean = text.trim();
  if (!clean) return 'No feedback';

  const firstLine = clean.split('\n').find((line) => line.trim().length > 0) ?? clean;
  const sentenceEnd = firstLine.indexOf('. ');
  const summary =
    sentenceEnd > 0 ? firstLine.slice(0, sentenceEnd + 1) : firstLine;

  return summary.length > 100 ? `${summary.slice(0, 97)}...` : summary;
};

export default function ControlPanel() {
  const {
    apiKey,
    setApiKey,
    pdfFile,
    selectedModel,
    setSelectedModel,
    setPdfFile,
    currentOperation,
    setCurrentOperation,
    currentResult,
    setCurrentResult,
    isLoading,
    setIsLoading,
    extractedText,
    selectedText,
    reviewCheckpoints,
    addReviewCheckpoint,
    clearReviewCheckpoints,
    currentPage,
    addAnnotation,
    selectionRect,
    clearAnnotations,
    viewerInstance,
    typoIssues,
    setTypoIssues,
    anonymityIssues,
    setAnonymityIssues,
    termConsistencyIssues,
    setTermConsistencyIssues,
  } = useAppStore();

  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const [tempApiKey, setTempApiKey] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fallbackModels = [
    { value: 'models/gemini-2.5-pro-latest', label: 'Gemini 2.5 Pro (default)' },
    { value: 'models/gemini-2.0-flash-exp', label: 'Gemini 2.0 Flash Experimental' },
    { value: 'models/gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro' },
    { value: 'models/gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash' },
  ];
  const [modelOptions, setModelOptions] = useState(fallbackModels);
  const [isModelListLoading, setIsModelListLoading] = useState(false);
  const [modelListError, setModelListError] = useState<string | null>(null);
  const [showSettingsPanel, setShowSettingsPanel] = useState(true);
  const [hasAutoCollapsedSettings, setHasAutoCollapsedSettings] = useState(false);
  const [resultsHeight, setResultsHeight] = useState(360);
  const [isResizingResults, setIsResizingResults] = useState(false);
  const resizeMetaRef = useRef({ startY: 0, startHeight: 360 });

  useEffect(() => {
    const controller = new AbortController();

    const loadModels = async () => {
      if (!apiKey) {
        setModelOptions(fallbackModels);
        setModelListError('API key required to list models');
        setIsModelListLoading(false);
        return;
      }

      setIsModelListLoading(true);
      setModelListError(null);

      try {
        const url = new URL('https://generativelanguage.googleapis.com/v1beta/models');
        url.searchParams.set('key', apiKey);

        const response = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          const message = `Request failed with status ${response.status}`;
          throw new Error(message);
        }

        const data = await response.json();
        const models = Array.isArray(data?.models) ? data.models : [];

        const filtered = models
          .filter((model: any) => typeof model?.name === 'string' && model.name.startsWith('models/'))
          .map((model: any) => ({
            value: model.name,
            label: model.displayName || model.name.replace('models/', ''),
          }));

        if (filtered.length > 0) {
          setModelOptions(filtered);
        } else {
          setModelOptions(fallbackModels);
          setModelListError('No models returned. Showing defaults.');
        }
      } catch (error) {
        if (controller.signal.aborted) return;
        setModelListError(error instanceof Error ? error.message : 'Unable to fetch model list');
        setModelOptions(fallbackModels);
      } finally {
        if (!controller.signal.aborted) {
          setIsModelListLoading(false);
        }
      }
    };

    loadModels();
    return () => controller.abort();
  }, [apiKey]);

  const hasAnyResults = useMemo(
    () =>
      typoIssues.length > 0 ||
      anonymityIssues.length > 0 ||
      termConsistencyIssues.length > 0 ||
      (!!currentResult && !isLoading),
    [typoIssues, anonymityIssues, termConsistencyIssues, currentResult, isLoading]
  );

  useEffect(() => {
    if (!hasAutoCollapsedSettings && hasAnyResults && !isLoading) {
      setShowSettingsPanel(false);
      setHasAutoCollapsedSettings(true);
    }
  }, [hasAnyResults, hasAutoCollapsedSettings, isLoading]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isResizingResults) return;
      const delta = resizeMetaRef.current.startY - event.clientY;
      const nextHeight = Math.min(Math.max(resizeMetaRef.current.startHeight + delta, 220), 720);
      setResultsHeight(nextHeight);
    };

    const stopResizing = () => setIsResizingResults(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', stopResizing);
    window.addEventListener('mouseleave', stopResizing);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', stopResizing);
      window.removeEventListener('mouseleave', stopResizing);
    };
  }, [isResizingResults]);

  const startResultsResize = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    resizeMetaRef.current = { startY: event.clientY, startHeight: resultsHeight };
    setIsResizingResults(true);
  };

  const currentModelLabel = useMemo(() => {
    const match = modelOptions.find((option) => option.value === selectedModel);
    if (match) return match.label;
    const trimmed = selectedModel.replace(/^models\//, '');
    return trimmed;
  }, [modelOptions, selectedModel]);

  const handleApiKeySubmit = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey.trim());
      setShowApiKeyInput(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
      clearReviewCheckpoints();
      setCurrentResult('');
      clearAnnotations();
      setTypoIssues([]);
      setAnonymityIssues([]);
      setTermConsistencyIssues([]);
    }
  };

  const executeCheck = async (checkType: 'typo' | 'anonymity' | 'consistency') => {
    if (!apiKey) {
      setCurrentResult('Please set your API key first');
      return;
    }

    if (!extractedText) {
      setCurrentResult('Please upload a PDF first');
      return;
    }

    const textToCheck = selectedText || extractedText;
    
    if (!textToCheck) {
      setCurrentResult('No text available to check');
      return;
    }

    setIsLoading(true);
    setCurrentResult('');
    
    const operationMap = {
      typo: 'typo-check' as const,
      anonymity: 'anonymity-check' as const,
      consistency: 'consistency-check' as const,
    };
    
    setCurrentOperation(operationMap[checkType]);

    try {
      const gemini = new GeminiService(apiKey, selectedModel);

      switch (checkType) {
        case 'typo': {
          const analysis = await gemini.checkTypos(textToCheck);
          await handleTypoAnalysis(analysis);
          break;
        }
        case 'anonymity': {
          const analysis = await gemini.checkAnonymity(textToCheck);
          await handleAnonymityAnalysis(analysis);
          break;
        }
        case 'consistency': {
          const analysis = await gemini.checkTermConsistency(textToCheck);
          await handleTermConsistencyAnalysis(analysis);
          break;
        }
      }
    } catch (error) {
      setCurrentResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setCurrentOperation('idle');
    }
  };

  const handleReviewerModeClick = async () => {
    if (!apiKey) {
      setCurrentResult('Please set your API key first');
      return;
    }

    if (!selectedText) {
      setCurrentResult('Please select text in the PDF to review');
      return;
    }

    setIsLoading(true);
    setCurrentResult('');
    setCurrentOperation('reviewer-mode');

    try {
      const gemini = new GeminiService(apiKey, selectedModel);
      
      // Get previous context and feedback
      let previousContext = '';
      let previousFeedback = '';
      
      if (reviewCheckpoints.length > 0) {
        const lastCheckpoint = reviewCheckpoints[reviewCheckpoints.length - 1];
        previousContext = reviewCheckpoints.map(cp => cp.text).join('\n\n');
        previousFeedback = reviewCheckpoints
          .filter(cp => cp.feedback)
          .map(cp => cp.feedback)
          .join('\n\n');
      }

      const feedback = await gemini.reviewAsReviewer(
        selectedText,
        previousContext || undefined,
        previousFeedback || undefined
      );

      // Add checkpoint
      const checkpoint = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        text: selectedText,
        pageNumber: currentPage,
        feedback: feedback,
      };

      addReviewCheckpoint(checkpoint);
      setCurrentResult(feedback);

      if (selectionRect && selectionRect.pageNumber === currentPage) {
        addAnnotation({
          id: `${Date.now()}`,
          pageNumber: currentPage,
          rect: { ...selectionRect },
          type: 'reviewer',
          summary: buildSummary(feedback),
          details: feedback,
        });
      }

      if (viewerInstance && window.NutrientViewer) {
        try {
          const selection = viewerInstance.getTextSelection
            ? viewerInstance.getTextSelection()
            : null;

          if (selection) {
            const rectGroups = await selection.getSelectedRectsPerPage();
            let primaryGroup: any = null;
            if (rectGroups && typeof rectGroups.forEach === 'function') {
              rectGroups.forEach((entry: any) => {
                if (!primaryGroup && entry && entry.rects && entry.rects.size > 0) {
                  primaryGroup = entry;
                }
              });
            }

            if (primaryGroup) {
              const rects = primaryGroup.rects;
              const boundingBox = window.NutrientViewer.Geometry.Rect.union(rects);
              const noteWidth = 36;
              const noteHeight = 36;
              const gap = 10;
              const noteLeft = boundingBox.left + boundingBox.width + gap;

              const noteRect = new window.NutrientViewer.Geometry.Rect({
                left: noteLeft,
                top: Math.max(boundingBox.top - noteHeight - 4, 0),
                width: noteWidth,
                height: noteHeight,
              });

              const note = new window.NutrientViewer.Annotations.NoteAnnotation({
                pageIndex: primaryGroup.pageIndex ?? currentPage - 1 ?? 0,
                boundingBox: noteRect,
                text: {
                  format: 'plain',
                  value: feedback,
                },
                customData: {
                  type: 'reviewer-feedback',
                  createdAt: Date.now(),
                },
              });

              await viewerInstance.create(note);
            }
          }
        } catch (error) {
          console.warn('Failed to attach reviewer note', error);
        }
      }
    } catch (error) {
      setCurrentResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setCurrentOperation('idle');
    }
  };

  const buildSearchTerms = (input: string, minLength: number) => {
    const terms = new Set<string>();
    const normalized = input.replace(/\s+/g, ' ').trim();

    if (normalized) {
      terms.add(normalized);
    }

    if (normalized.length > 120) {
      terms.add(normalized.slice(0, 120));
    }

    const withoutQuotes = normalized.replace(/[“”"']/g, '');
    if (withoutQuotes && withoutQuotes !== normalized) {
      terms.add(withoutQuotes);
    }

    const withoutTrailingPunctuation = normalized.replace(/[.,;:!?…]+$/, '').trim();
    if (withoutTrailingPunctuation && withoutTrailingPunctuation !== normalized) {
      terms.add(withoutTrailingPunctuation);
    }

    if (normalized.length < minLength && normalized.includes(' ')) {
      const words = normalized.split(' ');
      let aggregate = '';
      for (const word of words) {
        if (!word) continue;
        aggregate = aggregate ? `${aggregate} ${word}` : word;
        if (aggregate.length >= minLength) {
          terms.add(aggregate);
          break;
        }
      }
    }

    return Array.from(terms).filter(Boolean);
  };

  const createHighlightAndComment = async (options: {
    pageIndex: number;
    rects: any;
    issueId: string;
    highlightColor: any;
    commentLines: string[];
    customData: Record<string, unknown>;
  }) => {
    const { pageIndex, rects, issueId, highlightColor, commentLines, customData } = options;

    if (!viewerInstance || !window.NutrientViewer) {
      throw new Error('Viewer not ready');
    }

    const boundingBox = window.NutrientViewer.Geometry.Rect.union(rects);
    const targetRect = {
      left: boundingBox.left,
      top: boundingBox.top,
      width: boundingBox.width,
      height: boundingBox.height,
    };

    const highlight = new window.NutrientViewer.Annotations.HighlightAnnotation({
      pageIndex,
      rects,
      boundingBox,
      color: highlightColor,
      customData: {
        ...customData,
        issueId,
      },
    });

    const createdHighlight = await viewerInstance.create(highlight);
    const highlightAnnotation = Array.isArray(createdHighlight) ? createdHighlight[0] : undefined;

    let commentAnnotationId: string | undefined;
    const sanitizedCommentLines = commentLines.filter((line) => Boolean(line?.trim()));

    if (sanitizedCommentLines.length > 0) {
      const noteAnchorHeight = 28;
      const commentTop = Math.max(boundingBox.top - noteAnchorHeight - 4, 0);
      const noteBoundingBox = new window.NutrientViewer.Geometry.Rect({
        left: boundingBox.left,
        top: commentTop,
        width: noteAnchorHeight,
        height: noteAnchorHeight,
      });

      const note = new window.NutrientViewer.Annotations.NoteAnnotation({
        pageIndex,
        boundingBox: noteBoundingBox,
        text: {
          format: 'plain',
          value: sanitizedCommentLines.join('\n'),
        },
        customData: {
          ...customData,
          issueId,
        },
      });

      const createdNote = await viewerInstance.create(note);
      const noteAnnotation = Array.isArray(createdNote) ? createdNote[0] : undefined;
      commentAnnotationId = noteAnnotation?.id;
    }

    return {
      highlightId: highlightAnnotation?.id,
      commentId: commentAnnotationId,
      boundingBox: targetRect,
    };
  };

  const clearExistingTypoAnnotations = async () => {
    if (viewerInstance && typoIssues.length) {
      const idsToDelete = typoIssues
        .flatMap((issue) => [issue.highlightAnnotationId, issue.noteAnnotationId])
        .filter((id): id is string => Boolean(id));

      if (idsToDelete.length > 0) {
        try {
          await viewerInstance.delete(idsToDelete);
        } catch (error) {
          console.warn('Failed to remove previous typo annotations', error);
        }
      }
    }

    setTypoIssues([]);
  };

  const clearExistingAnonymityAnnotations = async () => {
    if (viewerInstance && anonymityIssues.length) {
      const idsToDelete = anonymityIssues
        .flatMap((issue) => [issue.highlightAnnotationId, issue.noteAnnotationId])
        .filter((id): id is string => Boolean(id));

      if (idsToDelete.length > 0) {
        try {
          await viewerInstance.delete(idsToDelete);
        } catch (error) {
          console.warn('Failed to remove previous anonymity annotations', error);
        }
      }
    }

    setAnonymityIssues([]);
  };

  const clearExistingTermAnnotations = async () => {
    if (viewerInstance && termConsistencyIssues.length) {
      const idsToDelete = termConsistencyIssues
        .flatMap((issue) => [issue.highlightAnnotationId, issue.noteAnnotationId])
        .filter((id): id is string => Boolean(id));

      if (idsToDelete.length > 0) {
        try {
          await viewerInstance.delete(idsToDelete);
        } catch (error) {
          console.warn('Failed to remove previous terminology annotations', error);
        }
      }
    }

    setTermConsistencyIssues([]);
  };

  const handleIssueJump = (
    issue: TypoIssueRecord | AnonymityIssueRecord | TermConsistencyIssueRecord
  ) => {
    if (!viewerInstance || !window.NutrientViewer) return;

    if (typeof issue.pageIndex === 'number') {
      if (issue.targetRect) {
        const rect = new window.NutrientViewer.Geometry.Rect(issue.targetRect);
        viewerInstance.jumpToRect(issue.pageIndex, rect);
      } else {
        viewerInstance.setViewState((state: any) => state.set('currentPageIndex', issue.pageIndex));
      }
    }

    if (issue.highlightAnnotationId) {
      try {
        viewerInstance.setSelectedAnnotations([issue.highlightAnnotationId]);
      } catch (error) {
        console.warn('Failed to select annotation', error);
      }
    }
  };

  const handleTypoAnalysis = async (analysis: TypoAnalysisResponse) => {
    const hasIssues = Array.isArray(analysis?.issues) && analysis.issues.length > 0;

    if (!hasIssues) {
      await clearExistingTypoAnnotations();
      const overview =
        analysis?.meta?.overview ?? 'No typos or grammatical issues detected in the current selection.';
      setCurrentResult(overview);
      return;
    }

    if (!viewerInstance || !window.NutrientViewer) {
      setCurrentResult(
        'Detected potential typos, but the PDF viewer is not ready to apply annotations. Please try again after the document finishes loading.'
      );
      return;
    }

    await clearExistingTypoAnnotations();

    const resolvedIssues: TypoIssueRecord[] = [];
    const unmatched: TypoIssue[] = [];

    const minQueryLength = viewerInstance.minQueryLength ?? 1;

    for (const issue of analysis.issues) {
      const searchTerms = buildSearchTerms(issue.originalText, minQueryLength);
      let annotationCreated = false;

      for (const term of searchTerms) {
        if (!term) continue;

        let results;
        try {
          results = await viewerInstance.search(term, { caseSensitive: false });
        } catch (error) {
          console.warn('Search failed for term', term, error);
          continue;
        }

        const bestResult =
          results && typeof results.first === 'function' ? results.first() : null;

        if (!bestResult || !bestResult.rectsOnPage || bestResult.rectsOnPage.size === 0) {
          continue;
        }

        try {
          const rects = bestResult.rectsOnPage;
          const { highlightId, commentId, boundingBox } = await createHighlightAndComment({
            pageIndex: bestResult.pageIndex ?? 0,
            rects,
            issueId: issue.id,
            highlightColor: new window.NutrientViewer.Color({ r: 255, g: 214, b: 102 }),
            commentLines: [
              `Fix: ${issue.suggestedText}`,
              issue.explanation ? `Why: ${issue.explanation}` : `Summary: ${issue.summary}`,
            ],
            customData: {
              type: 'typo',
              summary: issue.summary,
              suggestion: issue.suggestedText,
            },
          });

          resolvedIssues.push({
            id: issue.id,
            summary: issue.summary,
            originalText: issue.originalText,
            suggestedText: issue.suggestedText,
            explanation: issue.explanation,
            severity: issue.severity,
            highlightAnnotationId: highlightId,
            noteAnnotationId: commentId,
            pageIndex: bestResult.pageIndex ?? undefined,
            targetRect: boundingBox,
          });

          annotationCreated = true;
          break;
        } catch (error) {
          console.warn('Failed to create typo annotations', error);
        }
      }

      if (!annotationCreated) {
        unmatched.push(issue);
      }
    }

    setTypoIssues(resolvedIssues);

    const lines: string[] = [];
    const annotatedCount = resolvedIssues.length;
    const totalDetected = analysis.issues.length;

    const overview =
      analysis.meta?.overview ??
      `Detected ${totalDetected} potential issue${totalDetected === 1 ? '' : 's'}. Annotated ${annotatedCount} directly on the PDF.`;
    lines.push(overview);

    if (annotatedCount > 0) {
      lines.push('');
      resolvedIssues.forEach((issue, index) => {
        const pageLabel =
          typeof issue.pageIndex === 'number' ? `Page ${issue.pageIndex + 1}` : 'Page ?';
        lines.push(
          `${index + 1}. ${pageLabel}: "${issue.originalText}" → "${issue.suggestedText}" (${issue.summary})`
        );
      });
    }

    if (unmatched.length > 0) {
      lines.push('');
      lines.push(
        `${unmatched.length} issue${unmatched.length === 1 ? '' : 's'} could not be located automatically:`
      );
      unmatched.forEach((issue) => {
        lines.push(`- ${issue.summary}: "${issue.originalText}"`);
      });
    }

    setCurrentResult(lines.join('\n').trim());
  };

  const handleAnonymityAnalysis = async (analysis: AnonymityAnalysisResponse) => {
    const hasIssues = Array.isArray(analysis?.issues) && analysis.issues.length > 0;

    if (!hasIssues) {
      await clearExistingAnonymityAnnotations();
      const overview =
        analysis?.meta?.overview ?? 'No anonymity risks detected in the current selection.';
      setCurrentResult(overview);
      return;
    }

    if (!viewerInstance || !window.NutrientViewer) {
      setCurrentResult(
        'Detected potential anonymity issues, but the PDF viewer is not ready to apply annotations. Please try again after the document finishes loading.'
      );
      return;
    }

    await clearExistingAnonymityAnnotations();

    const resolvedIssues: AnonymityIssueRecord[] = [];
    const unmatched: AnonymityIssue[] = [];

    const minQueryLength = viewerInstance.minQueryLength ?? 1;

    for (const issue of analysis.issues) {
      const searchTerms = buildSearchTerms(issue.offendingText, minQueryLength);
      let annotationCreated = false;

      for (const term of searchTerms) {
        if (!term) continue;

        let results;
        try {
          results = await viewerInstance.search(term, { caseSensitive: false });
        } catch (error) {
          console.warn('Search failed for term', term, error);
          continue;
        }

        const bestResult =
          results && typeof results.first === 'function' ? results.first() : null;

        if (!bestResult || !bestResult.rectsOnPage || bestResult.rectsOnPage.size === 0) {
          continue;
        }

        try {
          const rects = bestResult.rectsOnPage;
          const { highlightId, commentId, boundingBox } = await createHighlightAndComment({
            pageIndex: bestResult.pageIndex ?? 0,
            rects,
            issueId: issue.id,
            highlightColor: new window.NutrientViewer.Color({ r: 248, g: 113, b: 113 }),
            commentLines: [
              `Issue: ${issue.summary}`,
              issue.recommendation ? `Fix: ${issue.recommendation}` : '',
              issue.explanation ? `Why: ${issue.explanation}` : '',
            ],
            customData: {
              type: 'anonymity',
              summary: issue.summary,
              recommendation: issue.recommendation,
              severity: issue.severity,
            },
          });

          resolvedIssues.push({
            id: issue.id,
            summary: issue.summary,
            offendingText: issue.offendingText,
            explanation: issue.explanation,
            recommendation: issue.recommendation,
            severity: issue.severity,
            highlightAnnotationId: highlightId,
            noteAnnotationId: commentId,
            pageIndex: bestResult.pageIndex ?? undefined,
            targetRect: boundingBox,
          });

          annotationCreated = true;
          break;
        } catch (error) {
          console.warn('Failed to create anonymity annotations', error);
        }
      }

      if (!annotationCreated) {
        unmatched.push(issue);
      }
    }

    setAnonymityIssues(resolvedIssues);

    const lines: string[] = [];
    const annotatedCount = resolvedIssues.length;
    const totalDetected = analysis.issues.length;

    const overview =
      analysis.meta?.overview ??
      `Detected ${totalDetected} anonymity concern${totalDetected === 1 ? '' : 's'}. Annotated ${annotatedCount} on the PDF.`;
    lines.push(overview);

    if (annotatedCount > 0) {
      lines.push('');
      resolvedIssues.forEach((issue, index) => {
        const pageLabel =
          typeof issue.pageIndex === 'number' ? `Page ${issue.pageIndex + 1}` : 'Page ?';
        const recommendationPart = issue.recommendation ? ` → ${issue.recommendation}` : '';
        lines.push(
          `${index + 1}. ${pageLabel}: "${issue.offendingText}" (${issue.summary}${recommendationPart})`
        );
      });
    }

    if (unmatched.length > 0) {
      lines.push('');
      lines.push(
        `${unmatched.length} issue${unmatched.length === 1 ? '' : 's'} could not be located automatically:`
      );
      unmatched.forEach((issue) => {
        lines.push(`- ${issue.summary}: "${issue.offendingText}"`);
      });
    }

    setCurrentResult(lines.join('\n').trim());
  };

  const handleTermConsistencyAnalysis = async (analysis: TermConsistencyAnalysisResponse) => {
    await clearExistingTermAnnotations();

    const hasIssues = Array.isArray(analysis?.issues) && analysis.issues.length > 0;

    if (!hasIssues) {
      const overview =
        analysis?.meta?.overview ?? 'No terminology inconsistencies detected in the current selection.';
      setCurrentResult(overview);
      return;
    }

    if (!viewerInstance || !window.NutrientViewer) {
      setCurrentResult(
        'Detected terminology issues, but the PDF viewer is not ready to apply annotations. Please try again after the document finishes loading.'
      );
      return;
    }

    const minQueryLength = viewerInstance.minQueryLength ?? 1;
    const resolvedIssues: TermConsistencyIssueRecord[] = [];
    const unmatched: TermConsistencyIssueRecord[] = [];

    for (const rawIssue of analysis.issues) {
      const issue = rawIssue as TermConsistencyIssueRecord;
      const searchTerms = buildSearchTerms(issue.originalText || issue.term, minQueryLength);
      let annotationCreated = false;

      for (const term of searchTerms) {
        if (!term) continue;

        let results;
        try {
          results = await viewerInstance.search(term, { caseSensitive: false });
        } catch (error) {
          console.warn('Term consistency search failed', error);
          continue;
        }

        const bestResult =
          results && typeof results.first === 'function' ? results.first() : null;

        if (!bestResult || !bestResult.rectsOnPage || bestResult.rectsOnPage.size === 0) {
          continue;
        }

        try {
          const rects = bestResult.rectsOnPage;
          const { highlightId, commentId, boundingBox } = await createHighlightAndComment({
            pageIndex: bestResult.pageIndex ?? 0,
            rects,
            issueId: issue.id,
            highlightColor: new window.NutrientViewer.Color({ r: 56, g: 189, b: 248 }),
            commentLines: [
              issue.summary,
              issue.suggestedText ? `Suggestion: ${issue.suggestedText}` : '',
              issue.explanation ? `Why: ${issue.explanation}` : '',
            ],
            customData: {
              type: 'term-consistency',
              term: issue.term,
            },
          });

          resolvedIssues.push({
            ...issue,
            highlightAnnotationId: highlightId,
            noteAnnotationId: commentId,
            pageIndex: bestResult.pageIndex ?? undefined,
            targetRect: boundingBox,
          });

          annotationCreated = true;
          break;
        } catch (error) {
          console.warn('Failed to create term consistency annotations', error);
        }
      }

      if (!annotationCreated) {
        unmatched.push(issue);
      }
    }

    setTermConsistencyIssues(resolvedIssues);

    const lines: string[] = [];
    const annotatedCount = resolvedIssues.length;
    const totalDetected = analysis.issues.length;

    const overview =
      analysis.meta?.overview ??
      `Detected ${totalDetected} terminology issue${totalDetected === 1 ? '' : 's'}. Annotated ${annotatedCount} on the PDF.`;
    lines.push(overview);

    if (annotatedCount > 0) {
      lines.push('');
      resolvedIssues.forEach((issue, index) => {
        const pageLabel =
          typeof issue.pageIndex === 'number' ? `Page ${issue.pageIndex + 1}` : 'Page ?';
        lines.push(`${index + 1}. ${pageLabel}: ${issue.summary}`);
      });
    }

    if (unmatched.length > 0) {
      lines.push('');
      lines.push(
        `${unmatched.length} issue${unmatched.length === 1 ? '' : 's'} could not be located automatically:`
      );
      unmatched.forEach((issue) => {
        lines.push(`- ${issue.summary}: ${issue.term}`);
      });
    }

    setCurrentResult(lines.join('\n').trim());
  };
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Paper Check Tools
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          AI-powered paper review assistant
        </p>
      </div>

      <div className="flex-1 overflow-auto px-4 py-3">
        <div className="space-y-2">
          <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">Settings</p>
                {!showSettingsPanel && (
                  <p className="text-xs text-slate-400">
                    {apiKey ? 'Key saved locally' : 'Key required'} · {currentModelLabel}
                  </p>
                )}
              </div>
              <button
                onClick={() => setShowSettingsPanel((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-slate-600/60 bg-slate-800/40 px-3 py-1 text-xs font-medium text-primary-200 transition hover:border-primary-400 hover:text-primary-100"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {showSettingsPanel ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5a3.75 3.75 0 003.75-3.75m-7.5 3.75A3.75 3.75 0 019 15.75m6.75-3A3.75 3.75 0 0019.5 9m-7.5 3.75A3.75 3.75 0 018.25 9m6.75-3A3.75 3.75 0 0018.75 2.25m-7.5 3A3.75 3.75 0 007.5 2.25"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223c4.59-5.274 11.45-5.274 16.04 0a1.124 1.124 0 010 1.554c-4.59 5.274-11.45 5.274-16.04 0a1.124 1.124 0 010-1.554z"
                    />
                  )}
                </svg>
                <span>{showSettingsPanel ? 'Hide' : 'Show'}</span>
              </button>
            </div>

            {showSettingsPanel && (
              <>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-100">API Key</span>
                      {apiKey ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-[2px] text-[11px] font-medium text-emerald-300">
                          <span className="text-xs">●</span> Saved locally
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium text-amber-400">Not configured</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">
                      {apiKey
                        ? 'Your key stays in this browser only. Update it anytime.'
                        : 'Add a Gemini API key to unlock AI-powered checks.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                    className="rounded-full border border-slate-600/60 bg-slate-800/40 px-3 py-1 text-xs font-medium text-primary-300 transition hover:border-primary-400 hover:text-primary-200"
                  >
                    {showApiKeyInput ? 'Close' : apiKey ? 'Change key' : 'Add key'}
                  </button>
                </div>

                {showApiKeyInput && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        placeholder="Enter your Gemini API Key"
                        value={tempApiKey}
                        onChange={(e) => setTempApiKey(e.target.value)}
                        className="w-full rounded-xl border border-slate-700/60 bg-slate-800/60 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-primary-400 focus:outline-none"
                      />
                      <button
                        onClick={handleApiKeySubmit}
                        className="rounded-xl bg-primary-500 px-3 py-2 text-sm font-medium text-white hover:bg-primary-400"
                      >
                        Save
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      Get your key from{' '}
                      <a
                        href="https://makersuite.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-400 hover:underline"
                      >
                        Google AI Studio
                      </a>
                    </p>
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.32em] text-slate-400">
                    Model
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/60 bg-slate-800/70 px-3 py-2 text-sm text-slate-100 focus:border-primary-400 focus:outline-none"
                  >
                    {modelOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>
                      {isModelListLoading
                        ? 'Loading models…'
                        : modelListError
                        ? `Using defaults (${modelListError})`
                        : 'Models auto-loaded from Google AI API'}
                    </span>
                    <a
                      href="https://ai.google.dev/api/models"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:underline"
                    >
                      API reference
                    </a>
                  </div>
                </div>
              </>
            )}
          </section>

          <section className="rounded-2xl border border-slate-700/60 bg-slate-900/60 p-4 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">Workflow</p>
                <h3 className="text-sm font-semibold text-slate-100">Paper review</h3>
              </div>
              {pdfFile && (
                <span className="max-w-[170px] truncate rounded-full bg-slate-800/70 px-3 py-1 text-[11px] text-slate-300">
                  {pdfFile.name}
                </span>
              )}
            </div>

            <div className="mt-3 grid gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-2 text-sm font-medium text-slate-100 transition hover:border-primary-400 hover:text-primary-200"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {pdfFile ? 'Replace PDF' : 'Upload PDF'}
              </button>

              <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 px-3 py-3">
                <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  <span>Quick checks</span>
                  <span className="text-[11px] text-slate-500">
                    {selectedText ? 'Selection' : 'Entire PDF'}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => executeCheck('typo')}
                    disabled={isLoading}
                    className="group flex flex-1 min-w-[140px] items-center justify-between gap-2 rounded-lg border border-blue-500/30 bg-blue-500/10 px-3 py-2 text-xs font-medium text-blue-100 transition hover:border-blue-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500/20 text-blue-100">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <span className="truncate">Typos & Grammar</span>
                    </span>
                    <span className="text-xs text-blue-200 group-hover:translate-x-0.5 transition">›</span>
                  </button>

                  <button
                    onClick={() => executeCheck('anonymity')}
                    disabled={isLoading}
                    className="group flex flex-1 min-w-[140px] items-center justify-between gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs font-medium text-purple-100 transition hover:border-purple-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/20 text-purple-100">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </span>
                      <span className="truncate">Anonymity sweep</span>
                    </span>
                    <span className="text-xs text-purple-200 group-hover:translate-x-0.5 transition">›</span>
                  </button>

                  <button
                    onClick={() => executeCheck('consistency')}
                    disabled={isLoading}
                    className="group flex flex-1 min-w-[140px] items-center justify-between gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-100 transition hover:border-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="flex min-w-0 flex-1 items-center gap-2">
                      <span className="inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-100">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      <span className="truncate">Term consistency</span>
                    </span>
                    <span className="text-xs text-emerald-200 group-hover:translate-x-0.5 transition">›</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-rose-700/40 bg-gradient-to-br from-rose-900/70 via-amber-900/60 to-rose-900/40 p-4 shadow-sm">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-200/80">Reviewer mode</p>
                <p className="text-xs text-amber-100/80">
                  Build a reviewer narrative by feeding sections sequentially. Highlight text in the PDF, then run a pass to capture questions and concerns.
                </p>
              </div>
              {reviewCheckpoints.length > 0 && (
                <button
                  onClick={clearReviewCheckpoints}
                  className="rounded-full border border-amber-400/40 px-3 py-1 text-[11px] font-medium text-amber-100 hover:border-amber-300/70"
                >
                  Clear history
                </button>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-amber-100/80">
              <span>{reviewCheckpoints.length} checkpoints saved</span>
              <span>{selectedText ? 'Selection ready' : 'Select text to enable'}</span>
            </div>

            <button
              onClick={handleReviewerModeClick}
              disabled={isLoading || !selectedText}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500/90 px-3 py-2 text-sm font-semibold text-amber-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Launch reviewer pass
            </button>
          </section>
        </div>
      </div>

      {/* Results Section */}
      {(() => {
        const hasTypoIssues = typoIssues.length > 0;
        const hasAnonymityIssues = anonymityIssues.length > 0;
        const hasTermIssues = termConsistencyIssues.length > 0;
        const shouldShowResults =
          isLoading || currentResult || hasTypoIssues || hasAnonymityIssues || hasTermIssues;

        if (!shouldShowResults) return null;

        return (
          <div className="border-t border-gray-200 dark:border-gray-700 bg-slate-900/60 px-4 pt-2 pb-4 rounded-2xl">
            <div
              className={`mx-auto mb-3 h-1.5 w-24 cursor-row-resize rounded-full bg-white/60 transition ${
                isResizingResults ? 'opacity-100' : 'opacity-80 hover:opacity-100'
              }`}
              onMouseDown={startResultsResize}
              role="separator"
              aria-orientation="horizontal"
              aria-label="Resize results"
            />
            <div
              className="flex max-h-full flex-col gap-3 overflow-hidden"
              style={{ height: resultsHeight }}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  {isLoading ? 'Analyzing...' : 'Results'}
                </h3>
                {(hasTypoIssues || hasAnonymityIssues || hasTermIssues) && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Click an item to jump in the PDF
                  </span>
                )}
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
                </div>
              ) : (
                <>
                  {currentResult && (
                    <div className="rounded-xl border border-slate-700/70 bg-slate-800/60 px-3 py-3 max-h-[32vh] overflow-auto">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400 mb-2">
                      Key takeaway
                    </p>
                    <ReactMarkdown
                      remarkPlugins={[remarkGfmPlugin]}
                      components={{
                        p: ({ node, ...props }) => (
                          <p className="text-sm leading-relaxed text-slate-100" {...props} />
                        ),
                        ul: ({ node, ...props }) => (
                          <ul className="ml-4 list-disc space-y-1 text-sm leading-relaxed text-slate-100" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                          <ol className="ml-4 list-decimal space-y-1 text-sm leading-relaxed text-slate-100" {...props} />
                        ),
                        li: ({ node, ...props }) => <li {...props} />,
                        h1: ({ node, ...props }) => (
                          <h3 className="text-sm font-semibold text-slate-100 mt-3" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                          <h4 className="text-sm font-semibold text-slate-100 mt-3" {...props} />
                        ),
                        code: ({ inline, ...props }: any) => (
                          <code
                            className={`rounded bg-slate-900/80 px-1 py-[1px] text-[11px] font-mono text-primary-200 ${inline ? '' : 'block'}`}
                            {...props}
                          />
                        ),
                        table: ({ node, ...props }) => (
                          <div className="overflow-auto">
                            <table className="min-w-full text-left text-xs text-slate-200" {...props} />
                          </div>
                        ),
                      }}
                      className="space-y-2 text-sm text-slate-100"
                    >
                      {currentResult}
                    </ReactMarkdown>
                  </div>
                )}

                {(hasTypoIssues || hasAnonymityIssues || hasTermIssues) && (
                  <div className="flex-1 overflow-auto space-y-4">
                    {hasTypoIssues && (
                      <div>
                        <p className="text-xs font-semibold text-blue-600 dark:text-blue-300 uppercase tracking-wide mb-2">
                          Typos ({typoIssues.length})
                        </p>
                        <div className="space-y-2">
                          {typoIssues.map((issue) => (
                            <button
                              key={`typo-${issue.id}`}
                              onClick={() => handleIssueJump(issue)}
                              className="w-full text-left rounded-md border border-blue-200 dark:border-blue-800 bg-white/60 dark:bg-blue-900/30 px-3 py-2 transition hover:bg-blue-50 dark:hover:bg-blue-900/50"
                            >
                              <div className="flex items-center justify-between gap-3 text-sm text-blue-900 dark:text-blue-100">
                                <span className="font-medium">
                                  Page {issue.pageIndex !== undefined ? issue.pageIndex + 1 : '?'}
                                </span>
                                <span className="text-xs italic text-blue-700 dark:text-blue-200">
                                  {issue.summary}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 max-h-10 overflow-hidden">
                                “{issue.originalText}”
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {hasAnonymityIssues && (
                      <div>
                        <p className="text-xs font-semibold text-red-600 dark:text-red-300 uppercase tracking-wide mb-2">
                          Anonymity Concerns ({anonymityIssues.length})
                        </p>
                        <div className="space-y-2">
                          {anonymityIssues.map((issue) => (
                            <button
                              key={`anonymity-${issue.id}`}
                              onClick={() => handleIssueJump(issue)}
                              className="w-full text-left rounded-md border border-red-200 dark:border-red-800 bg-white/60 dark:bg-red-900/30 px-3 py-2 transition hover:bg-red-50 dark:hover:bg-red-900/50"
                            >
                              <div className="flex items-center justify-between gap-3 text-sm text-red-900 dark:text-red-100">
                                <span className="font-medium">
                                  Page {issue.pageIndex !== undefined ? issue.pageIndex + 1 : '?'}
                                </span>
                                <span className="text-xs italic text-red-700 dark:text-red-200">
                                  {issue.summary}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 max-h-10 overflow-hidden">
                                “{issue.offendingText}”
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {hasTermIssues && (
                      <div>
                        <p className="text-xs font-semibold text-cyan-500 uppercase tracking-wide mb-2">
                          Terminology Issues ({termConsistencyIssues.length})
                        </p>
                        <div className="space-y-2">
                          {termConsistencyIssues.map((issue) => (
                            <button
                              key={`term-${issue.id}`}
                              onClick={() => handleIssueJump(issue)}
                              className="w-full text-left rounded-md border border-cyan-300/40 dark:border-cyan-700/60 bg-white/60 dark:bg-cyan-900/20 px-3 py-2 transition hover:bg-cyan-50 dark:hover:bg-cyan-900/40"
                            >
                              <div className="flex items-center justify-between gap-3 text-sm text-cyan-900 dark:text-cyan-100">
                                <span className="font-medium">{issue.term || 'Term'}</span>
                                <span className="text-xs italic text-cyan-700 dark:text-cyan-200">
                                  {issue.summary}
                                </span>
                              </div>
                              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300 max-h-10 overflow-hidden">
                                “{issue.originalText}”
                              </p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
