'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useAppStore } from '../store';
import type { AnnotationType } from '../store';

declare global {
  interface Window {
    NutrientViewer?: any;
  }
}

const PDF_WORKER_SRC = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const buildAssetBaseUrl = () => {
  const trimmed = BASE_PATH ? BASE_PATH.replace(/\/$/, '') : '';
  return `${window.location.origin}${trimmed}/nutrient-viewer/`;
};

async function extractPdfText(buffer: ArrayBuffer): Promise<string> {
  const pdfjs = await import('pdfjs-dist/legacy/build/pdf');
  pdfjs.GlobalWorkerOptions.workerSrc = PDF_WORKER_SRC;

  const loadingTask = pdfjs.getDocument({ data: buffer });
  const pdf = await loadingTask.promise;
  let fullText = '';

  try {
    for (let i = 1; i <= pdf.numPages; i += 1) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => (typeof item.str === 'string' ? item.str : ''))
        .join(' ');
      fullText += `${pageText}\n\n`;
      page.cleanup();
    }
  } finally {
    pdf.cleanup();
    loadingTask.destroy();
  }

  return fullText.trim();
}

const annotationPalette: Record<
  AnnotationType,
  { border: string; badge: string; label: string; title: string; background: string }
> = {
  typo: {
    border: 'border-blue-500/70',
    badge: 'bg-blue-500 hover:bg-blue-600',
    label: 'Typos & Grammar',
    title: 'text-blue-600 dark:text-blue-300',
    background: 'bg-blue-500/10',
  },
  anonymity: {
    border: 'border-purple-500/70',
    badge: 'bg-purple-500 hover:bg-purple-600',
    label: 'Anonymity',
    title: 'text-purple-600 dark:text-purple-300',
    background: 'bg-purple-500/10',
  },
  consistency: {
    border: 'border-green-500/70',
    badge: 'bg-green-500 hover:bg-green-600',
    label: 'Terminology',
    title: 'text-green-600 dark:text-green-300',
    background: 'bg-green-500/10',
  },
  reviewer: {
    border: 'border-orange-500/70',
    badge: 'bg-orange-500 hover:bg-orange-600',
    label: 'Reviewer',
    title: 'text-orange-600 dark:text-orange-300',
    background: 'bg-orange-500/10',
  },
};

export default function PDFViewer() {
  const {
    pdfFile,
    currentPage,
    setCurrentPage,
    numPages,
    setNumPages,
    setExtractedText,
    selectedText,
    setSelectedText,
    annotations,
    selectionRect,
    setSelectionRect,
    setViewerInstance,
  } = useAppStore();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const instanceRef = useRef<any | null>(null);
  const [activeAnnotationId, setActiveAnnotationId] = useState<string | null>(null);
  const [isViewerLoading, setIsViewerLoading] = useState(false);
  const [viewerError, setViewerError] = useState<string | null>(null);

  const hasPdf = useMemo(() => Boolean(pdfFile), [pdfFile]);

  useEffect(() => {
    if (!pdfFile) {
      setNumPages(0);
      setCurrentPage(1);
      setSelectedText('');
      setSelectionRect(null);
      setExtractedText('');
    }
  }, [pdfFile, setCurrentPage, setExtractedText, setNumPages, setSelectedText, setSelectionRect]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return undefined;

    let cancelled = false;

    const detachInstance = () => {
      if (instanceRef.current) {
        try {
          window.NutrientViewer?.unload(container);
        } catch (error) {
          console.warn('Failed to unload Nutrient viewer', error);
        }
        instanceRef.current = null;
        setViewerInstance(null);
      }
    };

    const loadViewer = async () => {
      if (!pdfFile) {
        detachInstance();
        return;
      }

      if (!window.NutrientViewer) {
        setViewerError('Nutrient viewer script not loaded.');
        return;
      }

      setIsViewerLoading(true);
      setViewerError(null);
      setSelectedText('');
      setSelectionRect(null);

      try {
        const originalBuffer = await pdfFile.arrayBuffer();
        const bufferForExtraction = originalBuffer.slice(0);
        const bufferForViewer = originalBuffer.slice(0);
        const [extracted] = await Promise.all([extractPdfText(bufferForExtraction)]);

        if (cancelled) return;

        setExtractedText(extracted);

        detachInstance();

        const baseUrl = buildAssetBaseUrl();
        const theme =
          window.matchMedia?.('(prefers-color-scheme: dark)').matches &&
          window.NutrientViewer?.Theme?.DARK
            ? window.NutrientViewer.Theme.DARK
            : window.NutrientViewer?.Theme?.LIGHT ?? 'LIGHT';

        const instance = await window.NutrientViewer.load({
          container,
          document: bufferForViewer,
          baseUrl,
          theme,
        });

        if (!instance || cancelled) {
          if (instance) {
            window.NutrientViewer.unload(container);
          }
          return;
        }

        instanceRef.current = instance;
        setViewerInstance(instance);
        setNumPages(instance.totalPageCount ?? 0);
        setCurrentPage((instance.viewState?.currentPageIndex ?? 0) + 1);

        const handlePageIndexChange = (pageIndex: number) => {
          setCurrentPage(pageIndex + 1);
        };

        const handleTextSelectionChange = async (selection: any) => {
          if (!selection) {
            setSelectedText('');
            setSelectionRect(null);
            return;
          }

          try {
            const [text, rect] = await Promise.all([
              selection.getText(),
              selection.getBoundingClientRect(),
            ]);

            const trimmed = text?.trim() ?? '';
            setSelectedText(trimmed);

            if (typeof selection.startPageIndex === 'number') {
              setCurrentPage(selection.startPageIndex + 1);
            }

            if (rect && containerRef.current) {
              const containerBounds = containerRef.current.getBoundingClientRect();
              if (containerBounds.width > 0 && containerBounds.height > 0) {
                setSelectionRect({
                  pageNumber:
                    typeof selection.startPageIndex === 'number'
                      ? selection.startPageIndex + 1
                      : currentPage,
                  x: (rect.left - containerBounds.left) / containerBounds.width,
                  y: (rect.top - containerBounds.top) / containerBounds.height,
                  width: rect.width / containerBounds.width,
                  height: rect.height / containerBounds.height,
                });
              } else {
                setSelectionRect(null);
              }
            } else {
              setSelectionRect(null);
            }
          } catch (error) {
            console.warn('Failed to process text selection', error);
          }
        };

        instance.addEventListener('viewState.currentPageIndex.change', handlePageIndexChange);
        instance.addEventListener('textSelection.change', handleTextSelectionChange);

        return () => {
          instance.removeEventListener('viewState.currentPageIndex.change', handlePageIndexChange);
          instance.removeEventListener('textSelection.change', handleTextSelectionChange);
        };
      } catch (error) {
        console.error('Failed to load Nutrient viewer', error);
        setViewerError(error instanceof Error ? error.message : 'Failed to load viewer');
        detachInstance();
      } finally {
        if (!cancelled) {
          setIsViewerLoading(false);
        }
      }
    };

    const dispose = loadViewer();

    return () => {
      cancelled = true;
      dispose?.then((cleanup) => cleanup?.()).catch((cleanupError) => {
        if (cleanupError) {
          console.warn('Cleanup failed', cleanupError);
        }
      });
      detachInstance();
    };
  }, [pdfFile, setCurrentPage, setExtractedText, setNumPages, setSelectedText, setSelectionRect]);

  const renderAnnotations = () =>
    annotations
      .filter((annotation) => annotation.pageNumber === currentPage)
      .map((annotation) => {
        const palette = annotationPalette[annotation.type];
        return (
          <div
            key={annotation.id}
            className="absolute pointer-events-none"
            style={{
              left: `${annotation.rect.x * 100}%`,
              top: `${annotation.rect.y * 100}%`,
              width: `${annotation.rect.width * 100}%`,
              height: `${annotation.rect.height * 100}%`,
            }}
          >
            <div
              className={`absolute inset-0 border-2 ${palette.border} rounded pointer-events-none`}
            />
            <div
              className={`absolute top-full mt-1 text-[10px] font-semibold px-2 py-0.5 rounded ${palette.background} text-gray-800 dark:text-gray-200 pointer-events-none`}
            >
              {palette.label}
            </div>
            <button
              type="button"
              onClick={() =>
                setActiveAnnotationId((current) =>
                  current === annotation.id ? null : annotation.id,
                )
              }
              className={`absolute -top-2 -right-2 px-2 py-1 text-xs text-white rounded shadow pointer-events-auto ${palette.badge}`}
            >
              View
            </button>

            {activeAnnotationId === annotation.id && (
              <div className="absolute left-full top-0 ml-3 w-64 max-h-64 overflow-auto rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-3 text-xs shadow-lg pointer-events-auto">
                <p className={`font-semibold mb-1 ${palette.title}`}>{annotation.summary}</p>
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
                  {annotation.details}
                </p>
                <button
                  onClick={() => setActiveAnnotationId(null)}
                  className="mt-3 w-full rounded bg-gray-100 dark:bg-gray-700 px-2 py-1 text-xs text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        );
      });

  const selectionOverlay =
    selectionRect && selectionRect.pageNumber === currentPage ? (
      <div
        className="absolute border border-primary-500/60 bg-primary-500/10 rounded pointer-events-none"
        style={{
          left: `${selectionRect.x * 100}%`,
          top: `${selectionRect.y * 100}%`,
          width: `${selectionRect.width * 100}%`,
          height: `${selectionRect.height * 100}%`,
        }}
      />
    ) : null;

  if (!hasPdf) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No PDF Loaded
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Upload a PDF from the control panel to begin
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            Page {currentPage} of {Math.max(numPages, 1)}
          </p>
          {viewerError && (
            <p className="text-xs text-red-600 dark:text-red-400 mt-1">Viewer error: {viewerError}</p>
          )}
        </div>
        {isViewerLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-500" />
            Loading PDF…
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        <div ref={containerRef} className="h-full w-full relative overflow-hidden">
          {selectionOverlay}
          {renderAnnotations()}
        </div>
      </div>

      {selectedText && (
        <div className="bg-primary-50 dark:bg-primary-900 border-t border-primary-200 dark:border-primary-700 px-4 py-2">
          <p className="text-xs text-primary-700 dark:text-primary-300">
            <span className="font-semibold">Selected text:</span>{' '}
            {selectedText.substring(0, 120)}
            {selectedText.length > 120 ? '…' : ''}
          </p>
        </div>
      )}
    </div>
  );
}
