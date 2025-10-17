

/**
 * This class should be used to create custom Immutable Record. It will overwrite the default
 * `Immutable#equals()` method to include the class name. if we don't do this, two different classes
 * with the same default value set will be treated as equal.
 * @example
 *   // With regular `Immutable.Record`
 *   class A extends Record({ foo: 'bar' }) {}
 *   class B extends Record({ foo: 'bar' }) {}
 *   const a = new A()
 *   const b = new B()
 *   is(a, b) // true
 *
 *   // With `InheritableImmutableRecord`
 *   class A extends InheritableImmutableRecord {
 *     static defaultValues = { foo: 'bar' }
 *   }
 *   mergeImmutableRecordDefaults(A)
 *   class B extends InheritableImmutableRecord {
 *     static defaultValues = { foo: 'bar' }
 *   }
 *   mergeImmutableRecordDefaults(B)
 *   const a = new A()
 *   const b = new B()
 *   is(a, b) // false
 */
declare class __dangerousImmutableRecordFactory<TProps extends Record<string, unknown>> {
  has(key: unknown): boolean;
  get<K extends keyof TProps>(key: K): TProps[K];
  set<K extends keyof TProps>(key: K, value: TProps[K]): this;
  delete<K extends keyof TProps>(key: K): this;
  clear(): this;
  update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this;
  merge(...collections: Array<Partial<TProps>>): this;
  mergeWith(merger: (previous?: unknown, next?: unknown, key?: string) => unknown, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  mergeDeepWith(merger: (previous?: unknown, next?: unknown, key?: string) => unknown, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  setIn(keyPath: Iterable<unknown>, value: unknown): this;
  deleteIn(keyPath: Iterable<unknown>): this;
  removeIn(keyPath: Iterable<unknown>): this;
  updateIn(keyPath: Iterable<unknown>, notSetValue: unknown, updater: (value: unknown) => unknown): this;
  updateIn(keyPath: Iterable<unknown>, updater: (value: unknown) => unknown): this;
  mergeIn(keyPath: Iterable<unknown>, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  mergeDeepIn(keyPath: Iterable<unknown>, ...collections: Array<Partial<TProps> | Iterable<[string, unknown]>>): this;
  withMutations(mutator: (mutable: this) => unknown): this;
  asMutable(): this;
  asImmutable(): this;
  getIn(keyPath: Iterable<unknown>, notSetValue?: unknown): unknown;
  toJS(): TProps;
  toJSON(): TProps;
  equals(other: unknown): boolean;
  toSeq(): Seq.Keyed<string, unknown>;}

/**
 * @classdesc
 * Base action type from which all Actions inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record}.
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Base action type from which all Actions inherit.
 * @class Action
 * @noconstructor
 * @extends Immutable.Record
 */
export declare abstract class Action extends InheritableImmutableRecord<ActionCtorProps> {
  /**
   * Actions can be chained by adding them to this immutable List.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<Action>} subActions
   * @memberof NutrientViewer.Actions.Action
   */
  subActions?: Immutable.List<Action> | null | undefined;
  protected constructor(args?: ActionCtorProps);}

declare type ActionCreators = typeof textComparisonActionCreators;

declare type ActionCtorProps = {
  subActions?: Immutable.List<Action> | null;};

declare type ActionFlags = 'includeExclude' | 'includeNoValueFields' | 'exportFormat' | 'getMethod' | 'submitCoordinated' | 'xfdf' | 'includeAppendSaves' | 'includeAnnotations' | 'submitPDF' | 'canonicalFormat' | 'excludeNonUserAnnotations' | 'excludeFKey' | 'embedForm';

declare type ActionJSON = {
  type: 'uri';
  uri: string;
  subactions?: Array<ActionJSON>;} |
{
  type: 'goTo';
  pageIndex: number;
  subactions?: Array<ActionJSON>;} |
{
  type: 'goToEmbedded';
  newWindow: boolean;
  relativePath: string;
  targetType: 'parent' | 'child';
  subactions?: Array<ActionJSON>;} |
{
  type: 'goToRemote';
  relativePath: string;
  namedDestination: string;
  subactions?: Array<ActionJSON>;} |
{
  type: 'hide';
  hide: boolean;
  annotationReferences: Array<AnnotationReference>;
  subactions?: Array<ActionJSON>;} |
{
  type: 'resetForm';
  fields: Array<AnnotationReference> | null;
  flags: string | null;
  subactions?: Array<ActionJSON>;} |
{
  type: 'submitForm';
  uri: string;
  fields: Array<string> | null;
  flags: Array<ActionFlags> | null;
  subactions?: Array<ActionJSON>;} |
{
  type: 'launch';
  filePath: string;
  subactions?: Array<ActionJSON>;} |
{
  type: 'named';
  action: string;
  subactions?: Array<ActionJSON>;} |
{
  type: 'javaScript';
  script: string;
  subactions?: Array<ActionJSON>;};

declare type ActionTriggerEventType = 'onPointerEnter' | 'onPointerLeave' | 'onPointerDown' | 'onPointerUp' | 'onPageOpen' | 'onPageClose' | 'onPageVisible' | 'onPageHidden';

/**
 * This object determines the operation to be performed on the document.
 *
 * Available operations:
 *
 * - `{ type: "addPage", afterPageIndex: number, ...AddPageConfiguration }`
 *
 * Adds a blank page after the specified page index using the provided configuration.
 *
 * ```js
 * type AddPageConfiguration = {
 * backgroundColor: NutrientViewer.Color,
 * pageWidth: number,
 * pageHeight: number,
 * rotateBy: 0 | 90 | 180 | 270,
 * insets?: NutrientViewer.Geometry.Inset
 * }
 * ```
 *
 * - `{ type: "addPage", beforePageIndex: number, ...AddPageConfiguration }`
 *
 * Adds a blank page before the specified page index using the provided configuration.
 *
 * - `{ type: "keepPages", pageIndexes: Array<number> }`
 *
 * Removes all pages from the document except for the pages specified in the
 * `pageIndexes` array.
 *
 * - `{ type: "duplicatePages", pageIndexes: Array<number> }`
 *
 * Duplicates the pages specified in the `pageIndexes` array. Each new page will
 * be inserted after the original page.
 *
 * - `{ type: "movePages", pageIndexes: Array<number>, afterPageIndex: number }`
 *
 * Moves the pages specified in the `pageIndexes` array after the page specified.
 *
 * - `{ type: "movePages", pageIndexes: Array<number>, beforePageIndex: number }`
 *
 * Moves the pages specified in the `pageIndexes` array before the page specified.
 *
 * - `{ type: "rotatePages", pageIndexes: Array<number>, rotateBy: 0 | 90 | 180 | 270 }`
 *
 * Rotates the pages specified in the `pageIndexes` array by the amount of degrees set
 * in `rotateBy`.
 *
 * - `{ type: "removePages", pageIndexes: Array<number> }`
 *
 * Removes the pages specified in the `pageIndexes` array.
 *
 * - `{ type: "importDocument", afterPageIndex: number, treatImportedDocumentAsOnePage: boolean, document: Blob | File }`
 *
 * Imports the provided document after the specified page index. `treatImportedDocumentAsOnePage`
 * determines whether it will be treated as a single page for other document operations
 * (e.g. a rotation) provided during the same call. After these operations
 * are applied, the imported pages will behave like regular pages in the document.
 *
 * Flattening and importing a document where `treatImportedDocumentAsOnePage` in the same operations
 * batch is not supported and will raise an error.
 *
 * Importing the same document more than once in the same operations block is not allowed with the UI
 * in order to prevent possible user mistakes, but can be done programmatically.
 *
 * - `{ type: "importDocument", beforePageIndex: number, treatImportedDocumentAsOnePage: boolean, document: Blob | File }`
 *
 * Imports the provided document before the specified page index.
 *
 * - `{ type: "importDocument", beforePageIndex: number, importedPageIndexes?: ImportPageIndex, treatImportedDocumentAsOnePage: boolean, document: Blob | File }`
 *
 * ```js
 * type Range = [min, max]; // 'min' and 'max' are inclusive.
 * type ImportPageIndex = Array<number | Range>;
 * ```
 *
 * Imports the specified page indexes from the provided document before the specified page index.
 *
 * - `{ type: "applyInstantJson", instantJson: Object }`
 *
 * Applies the given Instant JSON object specified in the `instantJson` property.
 * To learn about Instant JSON please refer to
 * {@link https://www.nutrient.io/guides/web/importing-exporting/instant-json/|this guide article}.
 *
 * - `{ type: "applyXfdf", xfdf: string, ignorePageRotation?: boolean, richTextEnabled?: boolean }`
 *
 * Applies the given XFDF string specified in the `xfdf` property.
 * To learn about XFDF please refer to
 * {@link https://www.nutrient.io/guides/web/current/importing-exporting/xfdf-support/|this guide article}.
 *
 * - `{ type: "flattenAnnotations", pageIndexes?: Array<number>, annotationIds?: Array<string>, noteAnnotationOpacity?: number, noteAnnotationBackgroundColor?: NutrientViewer.Color }`
 *
 * Flattens the annotations of the specified pages, or of all pages if none is specified.
 *
 * Flattening and importing a document where `treatImportedDocumentAsOnePage` in the same operations
 * batch is not supported and will raise an error.
 *
 * - `{ type: "setPageLabel", pageIndexes?: Array<number>, pageLabel?: string }`
 *
 * Sets the page label of a given page index.
 *
 * - `{ type: "performOcr", pageIndexes?: Array<number> | "all", language: string }`
 *
 * ***Server only***
 *
 * If the OCR component is present in the license, performs OCR on the pages given with the language requested. See {@link https://www.nutrient.io/guides/server/current/ocr/language-support/} for supported languages.
 *
 * Server only.
 *
 * ```js
 * instance.applyOperations([{
 * type: "performOcr",
 * pageIndexes: "all",
 * language: "en"
 * }]);
 * ```
 *
 * - `{ type: "applyRedactions" }`
 *
 * If the Redaction component is present in the license, applies any redaction annotations, redacting the page content and removing the annotations.
 *
 * This operation doesn't have any option and it doesn't matter when it is executed - the redactions will always be applied when exporting the document at the end.
 *
 * - `{ type: "updateMetadata", metadata: { title?: string, author?: string } }`
 *
 * Updates metadata on the destination document.
 *
 * - `{ type: "cropPages", pageIndexes?: Array<number>, cropBox: Rect }`
 *
 * Crops the pages of PDF document. If the `pageIndexes` property is undefined,
 * the cropping operation is applied to all pages.
 *
 * ```js
 * instance.applyOperations([{
 * type: "cropPages",
 * pageIndexes: [1, 2],
 * cropBox: new NutrientViewer.Geometry.Rect({
 * top: 100,
 * left: 100,
 * width: 100,
 * height: 100
 * })
 * }]);
 * ```
 *
 * - `{ type: "addPageMargins", pageIndexes?: Array<number>, margins: Inset }`
 *
 * Adds margins to the pages of the document. If the `pageIndexes` property is undefined,
 * the new margins are applied to all pages. Negative numbers will shrink the page.
 *
 * Content and annotations will be repositioned back to the original location on the page,
 * and other boxes (crop, bleed, trim, art) will be adjusted to encompass the same area.
 *
 * ```js
 * instance.applyOperations([{
 * type: "addPageMargins",
 * pageIndexes: [1, 2],
 * margins: new NutrientViewer.Geometry.Inset({
 * top: 100,
 * left: 100,
 * right: 100,
 * bottom: 100
 * })
 * }]);
 * ```
 * @public
 * @memberof NutrientViewer
 * @interface DocumentOperation
 * @summary Operation to be performed on the document.
 * @seealso NutrientViewer.Instance#applyOperations NutrientViewer.Configuration#instantJSON
 * @seealso NutrientViewer.Configuration#XFDF
 * @example
 * // Rotate page 0 90 degrees clockwise
 * instance.applyOperations({
 *   type: "rotatePages",
 *   pageIndexes: [0],
 *   rotateBy: 90
 * });
 */
declare type AddPageConfiguration = {
  backgroundColor: Color;
  pageWidth: number;
  pageHeight: number;
  rotateBy: Rotation;
  insets?: Rect;};

/**
 * Payload for sending changes to AI services
 * @public
 */
declare interface AIADocumentChangePayload {
  id: string;
  type: string;
  text: string;
  contextBefore: string;
  contextAfter: string;
  page: number;}

/**
 * Base response item from AI services representing a single document change.
 * Contains the essential information about a text modification detected during comparison.
 * @public
 * @memberof NutrientViewer
 * @interface AIADocumentChangeResponseItem
 * @property {string} id - Unique identifier for this change, used for tracking and correlation
 * @property {string} type - Type of change operation (e.g., "insertion", "deletion", "modification")
 * @property {string} text - The actual text content that was changed
 * @property {number} page - Zero-based page number where this change occurred
 * @property {?string} contextBefore - Text content appearing before the change for context.
 * @property {?string} contextAfter - Text content appearing after the change for context.
 * @example
 * // Typical structure of a change item
 * {
 *   id: "change-456",
 *   type: "deletion",
 *   text: "old contract terms",
 *   page: 1,
 *   contextBefore: "The following ",
 *   contextAfter: " are no longer valid"
 * }
 */
declare interface AIADocumentChangeResponseItem {
  id: string;
  type: string;
  text: string;
  page: number;
  contextBefore?: string;
  contextAfter?: string;}

/**
 * Response from AI analysis service containing a high-level summary and categorization
 * of document changes. This is returned when using `NutrientViewer.AIComparisonOperationType.ANALYZE`.
 * @public
 * @memberof NutrientViewer
 * @interface AIADocumentChangesAnalysisResponse
 * @property {string} summary - AI-generated natural language summary describing the overall
 *   nature and scope of changes between the compared documents
 * @property {string[]} categories - Array of AI-detected change categories representing
 *   the types of modifications (e.g., "Formatting", "Content Addition", "Legal Changes", "Rewording")
 * @property {NutrientViewer.DocumentComparisonResult} changes - The underlying standard
 *   document comparison result containing detailed text hunks and change operations
 * @example
 * // After running an ANALYZE operation
 * if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *   console.log(`Summary: ${result.summary}`);
 *   // Example: "The document has undergone significant legal revisions with updated terminology and new clauses."
 *
 *   console.log(`Categories: ${result.categories.join(', ')}`);
 *   // Example: ["Legal Changes", "Terminology Updates", "Content Addition"]
 *
 *   // Access detailed changes
 *   console.log(`Total changes: ${result.changes.changes.size}`);
 * }
 */
declare interface AIADocumentChangesAnalysisResponse {
  summary: string;
  categories: string[];
  changes: DocumentComparisonResult;}

/**
 * Response from AI tagging service containing categorized change information.
 * This is returned when using `NutrientViewer.AIComparisonOperationType.TAG`.
 * @public
 * @memberof NutrientViewer
 * @interface AIADocumentChangesTaggingResponse
 * @property {NutrientViewer.AIADocumentChangeTaggingItem[]} references - Array where each
 *   item corresponds to a specific change and includes category tags assigned by the AI service.
 *   Each reference contains the change details plus an array of category strings that classify
 *   the type of modification (e.g., ["Legal", "Formatting"] for a legal change with formatting updates).
 * @example
 * // After running a TAG operation
 * if (NutrientViewer.isAIDocumentTaggingResult(result)) {
 *   result.references.forEach((ref, index) => {
 *     console.log(`Change ${index + 1}: ${ref.text}`);
 *     console.log(`Categories: ${ref.tag.join(', ')}`);
 *     console.log(`Page: ${ref.page}`);
 *   });
 * }
 */
declare interface AIADocumentChangesTaggingResponse {
  references: AIADocumentChangeTaggingItem[];}

/**
 * Individual change item with AI-assigned category tags from the tagging service.
 * Extends the base response item with categorization information.
 * @public
 * @memberof NutrientViewer
 * @interface AIADocumentChangeTaggingItem
 * @extends AIADocumentChangeResponseItem
 * @property {string[]} tag - Array of category strings assigned by AI to classify this change.
 * @example
 * // Typical structure of a tagged change
 * {
 *   id: "change-123",
 *   type: "insertion",
 *   text: "confidential information",
 *   page: 2,
 *   contextBefore: "regarding the ",
 *   contextAfter: " shall not be disclosed",
 *   tag: ["Legal", "Confidentiality"]
 * }
 */
declare interface AIADocumentChangeTaggingItem extends AIADocumentChangeResponseItem {
  tag: string[];}

/**
 * Configuration for the AI Assistant.
 * @example
 * {
 *     sessionId: 'session-id',
 *     jwt: 'xxx.xxx.xxx'
 *     backendUrl: 'https://localhost:4000',
 * }
 * @public
 * @memberof NutrientViewer
 * @typedef {object} AIAssistantConfiguration@typedef {object} AIAssistantConfiguration
 * @property {string}  sessionId - The session to reopen, or an ID for the new session to create. This ID should be unique for each session and should use alphanumeric characters only.
 * @property {string}  jwt - The JWT token to authenticate the user.
 * @property {string}  backendUrl - The URL that hosts AI Assistant service. e.g. 'https://localhost:4000'.
 * @property {?string} userId - An optional user ID for the current user. This ID should be unique for each user and should use alphanumeric characters only.
 */
declare type AIAssistantConfiguration = {
  sessionId: string;
  jwt: string;
  backendUrl: string;
  userId?: string;};

declare function AIAssistantMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {};} &

T;

/**
 * Data structure for AI comparison results
 * @public
 * @memberof NutrientViewer
 * @property {string} summary - AI-generated summary of document changes
 * @property {string[]} categories - Array of AI-detected change categories
 * @property {DocumentComparisonResult} changes - Standard document comparison result
 * @property {IAIComparisonPhase} phase - Current phase of the AI comparison process
 * @property {AIComparisonError | null} error - Error information if comparison failed
 * @property {AIADocumentChangeTaggingItem[]} [taggedChanges] - Changes tagged with categories (optional)
 * @property {AIADocumentChangePayload[]} [transformedChanges] - Transformed changes for AI processing (optional)
 * @property {List<AIEnhancedTextComparisonChange>} [aiEnhancedChanges] - Enhanced changes with AI properties (optional)
 */
declare interface AIComparisonData {
  summary: string;
  categories: string[];
  changes: DocumentComparisonResult;
  phase: IAIComparisonPhase;
  error: AIComparisonError | null;
  taggedChanges?: AIADocumentChangeTaggingItem[];
  transformedChanges?: AIADocumentChangePayload[];
  aiEnhancedChanges?: List<AIEnhancedTextComparisonChange>;}

/**
 * Error information for AI comparison
 * @public
 * @memberof NutrientViewer
 * @property {string} phase - The phase where the error occurred ('ANALYSIS' | 'TAGGING')
 * @property {string} message - Human-readable error message
 * @property {unknown} [details] - Additional error details (optional)
 */
declare interface AIComparisonError {
  phase: 'ANALYSIS' | 'TAGGING';
  message: string;
  details?: unknown;}

/**
 * Describes types of AI operations for document comparison.
 * These operations can be used with ComparisonOperationType.AI.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.AIComparisonOperationType} ANALYZE Analyze and summarize differences between documents.
 * @property {NutrientViewer.AIComparisonOperationType} TAG Tag changes with specified categories.
 */
declare const AIComparisonOperationType: {
  readonly ANALYZE: "analyze";
  readonly TAG: "tag";};


/**
 * Phases of the AI comparison process
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.AIComparisonPhase} IDLE Initial state before comparison starts
 * @property {NutrientViewer.AIComparisonPhase} LOADING Loading documents or initializing
 * @property {NutrientViewer.AIComparisonPhase} ANALYZING AI is analyzing document differences
 * @property {NutrientViewer.AIComparisonPhase} TAGGING AI is tagging changes with categories
 * @property {NutrientViewer.AIComparisonPhase} COMPLETED Comparison process completed successfully
 * @property {NutrientViewer.AIComparisonPhase} ERROR Error occurred during comparison
 */
declare const AIComparisonPhase: {
  readonly IDLE: "IDLE";
  readonly LOADING: "LOADING";
  readonly ANALYZING: "ANALYZING";
  readonly TAGGING: "TAGGING";
  readonly COMPLETED: "COMPLETED";
  readonly ERROR: "ERROR";};

/**
 * Result returned by AI-powered document comparison operations. This union type represents
 * the response from {@link NutrientViewer.Instance#compareDocuments} when using
 * {@link NutrientViewer.ComparisonOperationType}.AI.
 *
 * The result type depends on the AI operation performed:
 *
 * - **Analysis Operation** (`NutrientViewer.AIComparisonOperationType.ANALYZE`):
 * Returns {@link NutrientViewer.AIADocumentChangesAnalysisResponse} containing:
 * - `summary`: AI-generated summary describing the overall nature of changes
 * - `categories`: Array of AI-detected change types (e.g., "Formatting", "Content Addition")
 * - `changes`: Standard {@link NutrientViewer.DocumentComparisonResult} with detailed differences
 *
 * - **Tagging Operation** (`NutrientViewer.AIComparisonOperationType.TAG`):
 * Returns {@link NutrientViewer.AIADocumentChangesTaggingResponse} containing:
 * - `references`: Array where each item corresponds to a change with assigned category tags
 * - `changes`: Standard {@link NutrientViewer.DocumentComparisonResult} with detailed differences
 *
 * Use the provided type guards to determine which specific result type you received:
 * - {@link NutrientViewer.isAIDocumentAnalysisResult} - Check for analysis results
 * - {@link NutrientViewer.isAIDocumentTaggingResult} - Check for tagging results
 * - {@link NutrientViewer.isAIDocumentComparisonResult} - Check for any AI result
 * @example
 * const analyzeOperation = new NutrientViewer.ComparisonOperation(
 *   NutrientViewer.ComparisonOperationType.AI,
 *   { operationType: NutrientViewer.AIComparisonOperationType.ANALYZE }
 * );
 *
 * instance.compareDocuments(documents, analyzeOperation)
 *   .then((result) => {
 *     if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *       console.log('Summary:', result.summary);
 *       console.log('Categories:', result.categories);
 *     }
 *   });
 * @typedef {NutrientViewer.AIADocumentChangesAnalysisResponse | NutrientViewer.AIADocumentChangesTaggingResponse} AIDocumentComparisonResult
 * @public
 * @memberof NutrientViewer
 * @see {@link NutrientViewer.Instance#compareDocuments}
 * @see {@link NutrientViewer.AIComparisonOperationType}
 * @see {@link NutrientViewer.AIADocumentChangesAnalysisResponse}
 * @see {@link NutrientViewer.AIADocumentChangesTaggingResponse}
 * @see {@link NutrientViewer.isAIDocumentAnalysisResult}
 * @see {@link NutrientViewer.isAIDocumentTaggingResult}
 */
declare type AIDocumentComparisonResult = AIADocumentChangesAnalysisResponse | AIADocumentChangesTaggingResponse;

/**
 * Enhanced TextComparisonChange with AI-related properties
 * @public
 */
declare interface AIEnhancedTextComparisonChange extends TextComparisonChange {
  aiId?: string;
  categories?: string[];
  aiProcessed?: boolean;}

/**
 * Specifies the alignment of an UI element relative to its parent container.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.Alignment} START
 * @property {NutrientViewer.Alignment} END
 */
declare const Alignment: {
  readonly START: "START";
  readonly END: "END";};


/**
 * @public
 * @callback OnPressCallback
 * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
 * @param {NutrientViewer.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
 * @param {string} id The tool item id.
 * @memberof NutrientViewer.TextComparisonInnerToolbarItem
 */
declare const allowedTextComparisonInnerToolbarItem: string[];

/**
 * @public
 * @callback OnPressCallback
 * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
 * @param {NutrientViewer.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
 * @param {string} id The tool item id.
 * @memberof NutrientViewer.TextComparisonToolbarItem
 */
declare const allowedTextComparisonToolbarItem: string[];

declare const allowedToolbarTypes: ("text" | "search" | "link" | "ellipse" | "image" | "line" | "polygon" | "polyline" | "spacer" | "note" | "comment" | "zoom-in" | "zoom-out" | "callout" | "arrow" | "highlighter" | "undo" | "redo" | "custom" | "pager" | "pan" | "debug" | "signature" | "print" | "ink" | "document-editor" | "rectangle" | "stamp" | "cloudy-rectangle" | "dashed-rectangle" | "cloudy-ellipse" | "dashed-ellipse" | "cloudy-polygon" | "dashed-polygon" | "text-highlighter" | "distance" | "perimeter" | "ellipse-area" | "rectangle-area" | "polygon-area" | "layout-config" | "marquee-zoom" | "responsive-group" | "redact-text-highlighter" | "redact-rectangle" | "document-comparison" | "measure" | "form-creator" | "content-editor" | "ai-assistant" | "pager-expanded" | "sidebar-thumbnails" | "sidebar-document-outline" | "sidebar-annotations" | "sidebar-bookmarks" | "sidebar-signatures" | "sidebar-attachments" | "sidebar-layers" | "multi-annotations-selection" | "zoom-mode" | "linearized-download-indicator" | "annotate" | "ink-eraser" | "document-crop" | "export-pdf")[];

/**
 * @classdesc
 * Base annotation type from which all annotations inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record}.
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Base annotation type from which all annotations inherit.
 * @class Annotation
 * @noconstructor
 * @extends Immutable.Record
 * @seealso NutrientViewer.Instance#getSelectedAnnotation NutrientViewer.Instance#setSelectedAnnotation
 * @seealso NutrientViewer.Instance#setEditableAnnotationTypes NutrientViewer.Instance#setIsEditableAnnotation
 * @seealso NutrientViewer.Instance#createAnnotation NutrientViewer.Instance#deleteAnnotation
 * @seealso NutrientViewer.Instance#getAnnotations NutrientViewer.Instance#ensureAnnotationSaved
 * @seealso NutrientViewer.Instance#hasUnsavedAnnotations NutrientViewer.Instance#saveAnnotations
 * @seealso NutrientViewer.Instance#setAnnotationCreatorName NutrientViewer.Instance#updateAnnotation
 * @seealso NutrientViewer.Configuration#editableAnnotationTypes NutrientViewer.Configuration#isEditableAnnotation
 * @seealso NutrientViewer.Instance~AnnotationsLoadEvent NutrientViewer.Instance~AnnotationsChangeEvent
 * @seealso NutrientViewer.Instance~AnnotationsCreateEvent NutrientViewer.Instance~AnnotationsUpdateEvent
 * @seealso NutrientViewer.Instance~AnnotationsDeleteEvent NutrientViewer.Instance~AnnotationsPressEvent
 * @seealso NutrientViewer.Instance~AnnotationsWillSaveEvent NutrientViewer.Instance~AnnotationsDidSaveEvent
 * @seealso NutrientViewer.Instance~AnnotationsFocusEvent NutrientViewer.Instance~AnnotationsBlurEvent
 * @seealso NutrientViewer.Instance~AnnotationsWillChangeEvent NutrientViewer.Instance~AnnotationSelectionChangeEvent
 */
export declare class Annotation<T extends AnnotationProperties = AnnotationProperties> extends InheritableImmutableRecord<T> {
  /**
   * A unique identifier to describe the annotation. When an annotation is created in the UI, the
   * viewer has to generate a unique ID.
   *
   * When changes are saved to the underlying annotation provider, we call
   * {@link NutrientViewer.Instance#ensureAnnotationSaved} to make sure the annotation has been persisted
   * from the provider.
   * @public
   * @instance
   * @member {string} id
   * @memberof NutrientViewer.Annotations.Annotation
   */
  id: ID;
  /**
   * An optional field that may be used to identify the annotation.
   *
   * By default, we'll set that to the same value as the automatically generated
   * {@link NutrientViewer.Annotations.Annotation#id}.
   * @public
   * @instance
   * @member {?string} name
   * @memberof NutrientViewer.Annotations.Annotation
   */
  name: null | string;
  /**
   * An optional annotation subject, representing a short description of
   * the subject being addressed by the annotation. This property has no effect
   * on the annotation rendering.
   * @public
   * @instance
   * @member {?string} subject
   * @memberof NutrientViewer.Annotations.Annotation
   */
  subject: null | string;
  /**
   * When the annotation is extracted directly from a PDF file, the `pdfObjectId` refers to the
   * identifier that was used in the PDF document.
   *
   * This ID is optional since newly created annotations using the SYNCProvider annotation provider
   * won't have a `pdfObjectId` assigned.
   * @public
   * @instance
   * @member {?number} pdfObjectId
   * @memberof NutrientViewer.Annotations.Annotation
   * @default null
   */
  pdfObjectId: null | number;
  /**
   * The page index on which the annotation is placed. It's important to notice that an annotation
   * can only ever be on one page. If you create for example an ink annotation with lines on two
   * pages, two annotation records will be created.
   *
   * `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`.
   * @public
   * @instance
   * @member {number} pageIndex
   * @memberof NutrientViewer.Annotations.Annotation
   */
  pageIndex: number;
  /**
   * Position of this annotation on the page. It's necessary that this spans all visible points of
   * the annotation, otherwise hit testing and other features may not work.
   * @public
   * @instance
   * @member {NutrientViewer.Geometry.Rect} boundingBox
   * @memberof NutrientViewer.Annotations.Annotation
   */
  boundingBox: Rect;
  /**
   * A transparency value that is applied to the complete annotation. The value is capped between 0
   * and 1 inclusive.
   * @public
   * @instance
   * @member {number} opacity
   * @memberof NutrientViewer.Annotations.Annotation
   * @default 1
   */
  opacity: number;
  /**
   * An optional note that can be set on any annotation.
   *
   * This value is displayed in the Nutrient Web SDK UI for all annotations except
   * {@link NutrientViewer.Annotations.NoteAnnotation|NoteAnnotation}, {@link NutrientViewer.Annotations.TextAnnotation|TextAnnotation}, {@link NutrientViewer.Annotations.WidgetAnnotation|WidgetAnnotation} and {@link NutrientViewer.Annotations.CommentMarkerAnnotation|CommentMarkerAnnotation}.
   * @public
   * @instance
   * @member {?string} note
   * @memberof NutrientViewer.Annotations.Annotation
   */
  note: null | string;
  /**
   * The name of the creator of the annotation. This is a general purpose string which can easily be
   * spoofed and might not reflect the actual creator of the annotation.
   * @public
   * @instance
   * @member {?string} creatorName
   * @memberof NutrientViewer.Annotations.Annotation
   */
  creatorName: null | string;
  /**
   * The date of the annotation creation.
   * @public
   * @instance
   * @member {Date} createdAt
   * @memberof NutrientViewer.Annotations.Annotation
   */
  createdAt: Date;
  /**
   * The date of last annotation update.
   * @public
   * @instance
   * @member {Date} updatedAt
   * @memberof NutrientViewer.Annotations.Annotation
   */
  updatedAt: Date;
  /**
   * The annotation flag that prevents the annotation from being rendered in the UI.
   *
   * The annotation may still be part of the printed page, depending of the value of the
   * {@link NutrientViewer.Annotations.Annotation#noPrint} flag.
   * @public
   * @instance
   * @member {boolean} noView
   * @memberof NutrientViewer.Annotations.Annotation
   * @default false
   */
  noView: boolean;
  /**
   * The annotation flag that prevents the annotation from being printed.
   * @public
   * @instance
   * @member {boolean} noPrint
   * @memberof NutrientViewer.Annotations.Annotation
   * @default false
   */
  noPrint: boolean;
  /**
   * The annotation flag that prevents the annotation from being modified.
   * @public
   * @instance
   * @member {boolean} locked
   * @memberof NutrientViewer.Annotations.Annotation
   * @default false
   */
  locked: boolean;
  /**
   * The annotation flag that prevents the annotation content from being modified.
   * @public
   * @instance
   * @member {boolean} lockedContents
   * @memberof NutrientViewer.Annotations.Annotation
   * @default false
   */
  lockedContents: boolean;
  /**
   * The annotation flag that makes the annotation read only.
   * @public
   * @instance
   * @member {boolean} readOnly
   * @memberof NutrientViewer.Annotations.Annotation
   * @default false
   */
  readOnly: boolean;
  /**
   * If set, do not display or print the annotation or allow it to interact with the user.
   * @public
   * @instance
   * @member {boolean} hidden
   * @memberof NutrientViewer.Annotations.Annotation
   * @default false
   */
  hidden: boolean;
  /**
   * Annotations can store additional user-specified data.
   *
   * NutrientViewer will not use or evaluate `customData` in the UI directly.
   * You have full control over this property. For new annotations, this defaults to null.
   *
   * customData will be stored as JSON through `JSON.serialize()` and `JSON.parse()`, and
   * so must be a plain JSON-serializable object.
   * @example <caption>Adding a new {@link NutrientViewer.Annotations.EllipseAnnotation} with custom data attached:</caption>
   * const annotation = new NutrientViewer.Annotations.EllipseAnnotation({
   *   pageIndex: 0,
   *   boundingBox: new NutrientViewer.Geometry.Rect({
   *     top: 10,
   *     left: 10,
   *     width: 100,
   *     height: 100
   *   }),
   *   customData: {
   *     circleId: "my-circle"
   *   }
   * });
   * @public
   * @instance
   * @member {?object} customData
   * @memberof NutrientViewer.Annotations.Annotation
   */
  customData: null | Record<string, unknown>;
  noZoom: boolean;
  noRotate: boolean;
  additionalActions: AnnotationAdditionalActionsType | null;
  rotation: number;
  /**
   * The blend mode defines how the color of the annotation will be applied to its background.
   * @public
   * @member {NutrientViewer.BlendMode} blendMode
   * @memberof NutrientViewer.Annotations.Annotation
   * @instance
   * @default "normal"
   */
  blendMode: IBlendMode;
  isCommentThreadRoot: boolean;
  isAnonymous: boolean;
  /**
   * This property is used to define the permission scope for this annotation.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @instance
   * @member {string} group
   * @memberof NutrientViewer.Annotations.Annotation
   */
  group?: string | null;
  /**
   * This property defines whether this annotation can be edited or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} isEditable
   * @memberof NutrientViewer.Annotations.Annotation
   */
  isEditable?: boolean;
  /**
   * This property defines whether this annotation can be deleted or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} isDeletable
   * @memberof NutrientViewer.Annotations.Annotation
   */
  isDeletable?: boolean;
  /**
   * This property defines whether the user has permission to edit the group of this annotation.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} canSetGroup
   * @memberof NutrientViewer.Annotations.Annotation
   */
  canSetGroup?: boolean;
  canReply?: boolean;
  APStreamCache?: {
    cache: string;} |
  {
    attach: string;};

  action: Action | null;
  static defaultValues: IObject;
  constructor(record?: Partial<T>);}

declare type AnnotationAdditionalActionsType = {
  onPointerEnter?: Action;
  onPointerLeave?: Action;
  onPointerDown?: Action;
  onPointerUp?: Action;
  onPageOpen?: Action;
  onPageClose?: Action;
  onPageVisible?: Action;
  onPageHidden?: Action;};

declare type AnnotationBackendJSON<K extends BaseAnnotationJSON = AnnotationJSONUnion, R extends string = never> = { [P in
keyof K]?: NonNullable<K[P]> } &
{ [P in
Intersection<keyof K, BackendRequiredKeys | R>]-?: Exclude<NonNullable<K[P]>, undefined> };

declare type AnnotationJSONToAnnotation<T extends {
  type: keyof AnnotationSerializerTypeMap;}> =
AnnotationSerializerTypeMap[GetTypeFromAnnotationJSON<T>]['annotation'];

export declare type AnnotationJSONUnion = TextMarkupAnnotationJSON | TextAnnotationJSON | WidgetAnnotationJSON | RedactionAnnotationJSON | StampAnnotationJSON | NoteAnnotationJSON | LinkAnnotationJSON | InkAnnotationJSON | RectangleAnnotationJSON | PolylineAnnotationJSON | PolygonAnnotationJSON | LineAnnotationJSON | EllipseAnnotationJSON | ImageAnnotationJSON | UnknownAnnotationJSON | MediaAnnotationJSON | CommentMarkerAnnotationJSON;

/**
 * Represents an annotation note. Used as a note annotation when hovering over note icon or when
 * the note icon is selected. This annotation is not persisted in the document nor returned by the public API.
 */
declare class AnnotationNote<T extends AnnotationNoteProps = AnnotationNoteProps> extends NoteAnnotation<T> {
  /**
   * Root annotation this note belongs to.
   */
  parentAnnotation?: AnnotationsUnion;
  /**
   * Calculated position of this note on the page in PDF coordinates.
   */
  position: Point;
  notePosition?: Point;
  static defaultValues: IObject;}

/**
 * This event will be emitted whenever an annotation note is hovered.
 * @public
 * @example <caption>Register a AnnotationNoteHoverEvent handler and prevent the default annotation note UI from showing.</caption>
 * instance.addEventListener("annotationNote.press", (event) => {
 *   event.preventDefault();
 * });
 * @memberof NutrientViewer
 * @interface AnnotationNoteHoverEvent
 */
declare type AnnotationNoteHoverEvent = {
  /**
   * Call this method to opt-out from showing the default annotation note UI.
   * @public
   * @instance
   * @member {Function} preventDefault
   * @memberof NutrientViewer.AnnotationNoteHoverEvent
   */
  preventDefault: () => boolean;
  /**
   * Annotation note for which the icon has been hovered.
   * @public
   * @instance
   * @member {?NutrientViewer.AnnotationNote | null} annotationNote
   * @memberof NutrientViewer.AnnotationNoteHoverEvent
   */
  annotationNote?: AnnotationNote | null;};


/**
 * This event will be emitted whenever an annotation note is selected by pressing its associated icon.
 * @public
 * @example <caption>Register a AnnotationNotePressEvent handler and prevent the default annotation note UI from showing.</caption>
 * instance.addEventListener("annotationNote.press", (event) => {
 *   event.preventDefault();
 * });
 * @memberof NutrientViewer
 * @interface AnnotationNotePressEvent
 */
/**
 * Call this method to opt-out from showing the default annotation note UI.
 * @public
 * @instance
 * @member {Function} preventDefault
 * @memberof NutrientViewer.AnnotationNotePressEvent
 */
/**
 * Annotation note for which the icon has been pressed.
 * @public
 * @instance
 * @member {?NutrientViewer.AnnotationNote | null} annotationNote
 * @memberof NutrientViewer.AnnotationNotePressEvent
 */
declare type AnnotationNotePressEvent = {
  preventDefault: () => boolean;
  annotationNote?: AnnotationNote | null;};


declare interface AnnotationNoteProps extends INoteAnnotation {
  parentAnnotation: AnnotationsUnion | null;
  position: Point;
  notePosition?: Point;}

declare function AnnotationPermissionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest editableAnnotationTypes. This value changes whenever
     * {@link NutrientViewer.Instance.setEditableAnnotationTypes} is called.
     *
     * Mutating this object will have no effect.
     * @public
     * @readonly
     * @instance
     * @member {NutrientViewer.Immutable.Set.<NutrientViewer.Annotation>} editableAnnotationTypes
     * @memberof NutrientViewer.Instance
     */
    readonly editableAnnotationTypes: Set_2<Class<AnnotationsUnion>>;
    /**
     * This method is used to update the editable annotation types.
     *
     * When one of the supplied {@link NutrientViewer.Annotations.Annotation} is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     * @example <caption>Only allow editing ink annotations</caption>
     * instance.setEditableAnnotationTypes([NutrientViewer.Annotations.InkAnnotation]);
     * instance.editableAnnotationTypes === [NutrientViewer.Annotations.InkAnnotation]; // => true
     * @public
     * @instance
     * @function setEditableAnnotationTypes
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied array is not valid.
     * @param {Array<AnnotationsUnion>} editableAnnotationTypes
     */
    setEditableAnnotationTypes(editableAnnotationTypes: Class<AnnotationsUnion>[]): void;
    /**
     * This method is used to update the isEditableAnnotation callback
     *
     * When the supplied callback is invalid it will throw a {@link NutrientViewer.Error} that contains a
     * detailed error message.
     * @example <caption>Only allow editing annotations from a specific creator name</caption>
     * instance.setIsEditableAnnotation((annotation) => annotation.creatorName === "Alice");
     * @public
     * @instance
     * @function setIsEditableAnnotation
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied array is not valid.
     * @param {NutrientViewer.IsEditableAnnotationCallback} isEditableAnnotationCallback
     */
    setIsEditableAnnotation(isEditableAnnotationCallback: IsEditableAnnotationCallback): void;};} &

T;

/**
 * Describes and persists the properties of an annotation preset.
 *
 * Annotation presets are sets of property-value pairs for annotations that can be applied as default
 * annotations settings for toolbar items. When an annotation toolbar setting is changed by the user,
 * the annotation preset associated with the toolbar item that triggered the annotation toolbar is updated.
 * If the associated annotation preset doesn't exist, it's created with the settings that have changed.
 *
 * For properties not included in an annotation preset, the default values used when creating
 * an annotation are those of the annotation type.
 * @example <caption>Creating an annotation preset and adding it to the available annotation presets</caption>
 * const myAnnotationPresets = instance.annotationPresets
 * myAnnotationPresets['my-annotation-preset'] = {
 *  strokeWidth: 2,
 * }
 * instance.setAnnotationPresets(myAnnotationPresets);
 * @public
 * @summary Annotation preset properties.
 * @interface AnnotationPreset
 * @memberof NutrientViewer
 * @seealso NutrientViewer.Configuration#annotationPresets
 * @seealso NutrientViewer.Instance#setAnnotationPresets
 * @seealso NutrientViewer.Instance~AnnotationPresetsUpdateEvent
 */
declare type AnnotationPreset = Record<string, unknown>;

declare type AnnotationPreset_2 = AnnotationPreset;

declare type AnnotationPresetFunction = (currentState: Record<AnnotationPresetID, AnnotationPreset>) => Record<AnnotationPresetID, AnnotationPreset>;

declare type AnnotationPresetID = string;

declare type AnnotationPresetID_2 = AnnotationPresetID;

declare function AnnotationPresetsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest annotation presets. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link NutrientViewer.Instance.setAnnotationPresets} is called.
     *
     * Mutating this object will have no effect.
     * @public
     * @readonly
     * @instance
     * @member {Object.<string, NutrientViewer.AnnotationPreset>} annotationPresets
     * @memberof NutrientViewer.Instance
     */
    readonly annotationPresets: {
      [key: string]: AnnotationPreset;};

    /**
     * Get the current active annotation preset ID
     * @public
     * @readonly
     * @instance
     * @member {?string} currentAnnotationPreset
     * @memberof NutrientViewer.Instance
     */
    readonly currentAnnotationPreset: string | null | undefined;
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setAnnotationPresets|setAnnotationPresets()}
     * method to do atomic updates to the current annotation presets.
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setAnnotationPresets(presets => {
     *   presets.custom = {
     *     strokeWidth: 10,
     *   };
     *   return presets;
     * });
     * @public
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~AnnotationPresetsSetter
     * @param {Object<string, NutrientViewer.AnnotationPreset>} currentAnnotationPresets
     * @returns {Object<string, NutrientViewer.AnnotationPreset>} The new annotation presets.
     */
    /**
     * This method is used to update the annotation presets.
     *
     * It makes it possible to add new {@link NutrientViewer.AnnotationPreset|annotation presets} and edit or remove existing ones.
     *
     * When you pass in an `object` with keyed {@link NutrientViewer.AnnotationPreset}, the current annotation presets
     * will be immediately updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * {string: <NutrientViewer.AnnotationPreset>} `object` as argument. You can use this to modify the object based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentAnnotationPresets`
     * can't change in between.
     * See: {@link NutrientViewer.Instance~AnnotationPresetsSetter|AnnotationPresetsSetter}
     *
     * When one of the supplied {@link NutrientViewer.AnnotationPreset} is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * Since `annotationPresets` is a regular JavaScript `object`, it can be manipulated using standard `Object`
     * methods.
     * @example <caption>The new changes will be applied immediately</caption>
     * instance.setAnnotationPresets(newAnnotationPresets);
     * instance.annotationPresets === newAnnotationPresets; // => true
     * @example <caption>Adding an annotation preset for an ellipse annotation variant.</caption>
     * const myAnnotationPreset = {
     *   dashedEllipse: {
     *     strokeDashArray: [3, 3],
     *   }
     * }
     * instance.setAnnotationPresets(annotationPresets => ({ ...annotationPresets, myAnnotationPreset })
     * @public
     * @instance
     * @function setAnnotationPresets
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied annotation preset `object` is not valid.
     * @param {Object.<string, NutrientViewer.AnnotationPreset>|NutrientViewer.Instance~AnnotationPresetsSetter} stateOrFunction Either a
         *   new AnnotationPresets `object` which would overwrite the existing one, or a callback that will get
         *   invoked with the current annotation presets and is expected to return the new annotation presets `object`.
         */
    setAnnotationPresets(stateOrFunction: Record<AnnotationPresetID, AnnotationPreset> | AnnotationPresetFunction): void;
    /**
     * This method is used to set the current active annotation preset.
     *
     * It makes it possible to specify what annotation preset should be used when new annotations
     * are created in the UI by passing the annotation preset key string as argument.
     *
     * The current annotation preset is set when the toolbar annotation buttons are used to create
     * annotations. This method allows to set the current annotation preset programmatically, as well
     * as resetting it by passing `null` as argument.
     *
     * When the supplied key does not correspond with an existing {@link NutrientViewer.AnnotationPreset},
     * this method will throw an {@link NutrientViewer.Error} that contains a detailed error message.
     * @example <caption>The new changes will be applied immediately</caption>
     * instance.setCurrentAnnotationPreset("ink");
     * instance.currentAnnotationPreset === "ink"; // => true
     * @example <caption>Setting an annotation preset for a closed arrow line annotation.</caption>
     * instance.setAnnotationPresets(annotationPresets => {
     *   return {
     *     ...annotationPresets,
     *     line: {
     *       ...annotationPresets.line,
     *       lineCaps: {
     *         end: "closedArrow"
     *       }
     *     }
     *   }
     * });
     * instance.setCurrentAnnotationPreset("line");
     * instance.setViewState(viewState =>
     *   viewState.set("interactionMode", NutrientViewer.InteractionMode.SHAPE_LINE),
     * );
     * @public
     * @instance
     * @function setCurrentAnnotationPreset
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied annotation preset key does not exist.
     * @param {?string} AnnotationPresetID Annotation preset name.
     */
    setCurrentAnnotationPreset(annotationPresetID?: string | null): void;};} &

T;

/**
 * This event will be emitted whenever the current preset is about to be updated with new property values
 * set by the user in the annotation toolbar.
 * @public
 * @example <caption>Register a AnnotationPresetsUpdateEvent handler and prevent the current preset from being
 * updated.</caption>
 * instance.addEventListener("annotationPresets.update", (event) => {
 *   event.preventDefault();
 * });
 * @memberof NutrientViewer
 * @interface AnnotationPresetsUpdateEvent
 */
declare type AnnotationPresetsUpdateEvent = {
  /**
   * Call this method to opt-out from updating the current preset.
   * @public
   * @instance
   * @member {Function} preventDefault
   * @memberof NutrientViewer.AnnotationPresetsUpdateEvent
   */
  preventDefault: () => boolean;
  /**
   * Current active preset ID.
   * @public
   * @instance
   * @member {string} currentPreset
   * @memberof NutrientViewer.AnnotationPresetsUpdateEvent
   */
  currentPreset: AnnotationPresetID_2;
  /**
   * Properties and values of the current active preset.
   * @public
   * @instance
   * @member {NutrientViewer.AnnotationPreset} currentPresetProperties
   * @memberof NutrientViewer.AnnotationPresetsUpdateEvent
   */
  currentPresetProperties: AnnotationPreset_2;
  /**
   * Properties and values to be merged with the ones in the current active preset.
   * @public
   * @instance
   * @member {NutrientViewer.AnnotationPreset} newPresetProperties
   * @memberof NutrientViewer.AnnotationPresetsUpdateEvent
   */
  newPresetProperties: AnnotationPreset_2;};


declare type AnnotationProperties = {
  id: string | null;
  name: string | null;
  subject: string | null;
  pdfObjectId: number | null;
  pageIndex: number | null;
  boundingBox: Rect | null;
  opacity: number | null;
  note: string | null;
  creatorName: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  customData: Record<string, unknown> | null;
  noView: boolean | null;
  noPrint: boolean | null;
  locked: boolean | null;
  lockedContents: boolean | null;
  readOnly: boolean | null;
  hidden: boolean | null;
  group: string | null | undefined;
  isEditable: boolean | undefined;
  isDeletable: boolean | undefined;
  canSetGroup: boolean | undefined;
  canReply: boolean | undefined;
  rotation: number;
  additionalActions: AnnotationAdditionalActionsType | null;
  noZoom: boolean;
  noRotate: boolean;
  isCommentThreadRoot: boolean;
  isAnonymous: boolean;
  APStreamCache: {
    cache: string;} |
  {
    attach: string;} |
  undefined;
  blendMode: IBlendMode;
  action: Action | null;
  [key: string]: unknown;};

declare type AnnotationReference = {
  fieldName: string;} |
{
  pdfObjectId: number;};

/**
 * This callback is called whenever an annotation is about to be resized. You can use it to control resize behavior.
 * @public
 * @callback AnnotationResizeStartCallback@callback AnnotationResizeStartCallback
 * @memberof NutrientViewer
 * @param {NutrientViewer.AnnotationsResizeEvent} event The event containing information regarding the resizing of the annotation
 * @returns {AnnotationResizeStartCallbackConfiguration|undefined} The configuration of the resize behavior or undefined for default behavior.
 */
declare type AnnotationResizeStartCallback = (event: AnnotationsResizeEvent) => AnnotationResizeStartCallbackConfiguration | undefined;

/**
 * The configuration of the resizing behavior of the annotations
 * @public
 * @typedef AnnotationResizeStartCallbackConfiguration@typedef AnnotationResizeStartCallbackConfiguration
 * @property {?boolean} maintainAspectRatio - set to `true` to keep aspect ratio while resizing.
 * @property {?number} minWidth - minimum width of the annotation while resizing.
 * @property {?number} maxWidth - maximum width of the annotation while resizing.
 * @property {?number} minHeight - minimum height of the annotation while resizing.
 * @property {?number} maxHeight - maximum height of the annotation while resizing.
 */
declare type AnnotationResizeStartCallbackConfiguration = {
  maintainAspectRatio?: boolean;
  minWidth?: number | undefined;
  minHeight?: number | undefined;
  maxWidth?: number | undefined;
  maxHeight?: number | undefined;};


declare type AnnotationsBackendJSONUnion = { [K in
keyof AnnotationSerializerTypeMap]: AnnotationSerializerTypeMap[K]['jsonForBackend'] }[
keyof AnnotationSerializerTypeMap];

/**
 * This event is emitted whenever an annotation loses focus. Deselecting an annotation
 * with the pointer also blurs it.
 *
 * When an annotation is deselected by pressing the `Escape` key, successive `annotations.blur`
 * and `annotations.focus` events will be dispatched for the same annotation.
 *
 * Use this event to add custom behavior like announcing the annotation value to screen readers.
 * @example <caption>Log widget annotation new value</caption>
 * instance.addEventListener("annotations.blur", (event) => {
 *  instance.getFormFields().then(formFields => {
 *    const formField = formFields.find(formField => formField.name === event.annotation.formFieldName);
 *    console.log(formField);
 *  });
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsBlurEvent
 */
declare type AnnotationsBlurEvent = {
  /**
   * The annotation that was focused.
   *
   * Remember that annotations are `Immutable.map`.
   * @public
   * @instance
   * @member {AnnotationsUnion} annotation
   * @memberof NutrientViewer.AnnotationsBlurEvent
   */
  annotation: AnnotationsUnion;
  /**
   * The browser event `FocusEvent` which caused the `annotations.blur` event to dispatch.
   * Its `type` property is set to `blur`.
   * @public
   * @instance
   * @member {Event} nativeEvent
   * @memberof NutrientViewer.AnnotationsBlurEvent
   */
  nativeEvent: FocusEvent;};

/**
 * This event is emitted whenever an annotation is copied
 * @example <caption>Get current copied annotation</caption>
 * instance.addEventListener("annotations.copy", (event) => {
 *   const copiedAnnotation = event.annotation;
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsCopyEvent
 */
declare type AnnotationsCopyEvent = {
  /**
   * The annotation that was copied.
   * @public
   * @instance
   * @member {AnnotationsUnion} annotation
   * @memberof NutrientViewer.AnnotationsCopyEvent
   */
  annotation: AnnotationsUnion;};

/**
 * This event is emitted whenever an annotation is cut.
 * @example <caption>Get current cut annotation</caption>
 * instance.addEventListener("annotations.cut", (event) => {
 *   const cutAnnotation = event.annotation;
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsCutEvent
 */
declare type AnnotationsCutEvent = {
  /**
   * The annotation that was cut.
   * @public
   * @instance
   * @member {AnnotationsUnion} annotation
   * @memberof NutrientViewer.AnnotationsCutEvent
   */
  annotation: AnnotationsUnion;};

/**
 * This event is emitted whenever an annotation is duplicated. You can
 * do this by pressing `Cmd/Ctrl+D` on the keyboard.
 * @example <caption>Get current duplicate annotation</caption>
 * instance.addEventListener("annotations.duplicate", (event) => {
 *   const duplicatedAnnotations = event.annotations;
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsDuplicateEvent
 */
declare type AnnotationsDuplicateEvent = {
  /**
   * The annotation that was duplicated.
   * @public
   * @instance
   * @member {Array<AnnotationsUnion>} annotations
   * @memberof NutrientViewer.AnnotationsDuplicateEvent
   */
  annotations: AnnotationsUnion[];
  /**
   * The newly created form field for the duplicated widget annotation.
   * @public
   * @instance
   * @member {Array<NutrientViewer.FormFields.FormField>} formFields
   * @memberof NutrientViewer.AnnotationsDuplicateEvent
   */
  formFields?: FormField[];
  /**
   * The original annotation that was duplicated.
   * @public
   * @instance
   * @member {Array<AnnotationsUnion>} originalAnnotations
   * @memberof NutrientViewer.AnnotationsDuplicateEvent
   */
  originalAnnotations: AnnotationsUnion[];
  /**
   * The form field of the widget annotation that was duplicated.
   * @public
   * @instance
   * @member {Map<string, NutrientViewer.FormFields.FormField>} originalFormField
   * @memberof NutrientViewer.AnnotationsDuplicateEvent
   */
  originalFormFields?: Map_2<string, FormField>;};

declare function AnnotationSelectionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

    /**
     * If multiple annotations are selected, this function will return the set of selected annotations.
     * @public
     * @readonly
     * @instance
     * @returns {?NutrientViewer.Immutable.List.<AnnotationsUnion>} annotation
     * @function getSelectedAnnotations
     * @memberof NutrientViewer.Instance
     */
    getSelectedAnnotations(): List<AnnotationsUnion> | null;















    /**
     * Selects annotations in the user interface. If `annotationOrAnnotationId` is empty, the
     * current selection will be cleared instead.
     * @public
     * @readonly
     * @instance
     * @param {?NutrientViewer.Immutable.List<(AnnotationsUnion | string)>} annotationsOrAnnotationsIds The annotations
     *   model or annotations IDs you want to set as selected. If `null` is used, the current selection
     *   will be cleared instead.
     * @function setSelectedAnnotations
     * @memberof NutrientViewer.Instance
     */
    setSelectedAnnotations(annotationsOrAnnotationsIds?: List<Annotation | ID> | null): void;
    /**
     * Group annotations in the user interface.
     * @public
     * @readonly
     * @instance
     * @param {?NutrientViewer.Immutable.List.<(NutrientViewer.Annotations.Annotation | string)>} annotationsOrAnnotationsId The annotations
     *   model or annotations IDs you want to be grouped. Annotations selected for grouping must be on the same page.
     *   Annotations that are already grouped will be removed from the previous group and added to the new one.
     * @function groupAnnotations
     * @memberof NutrientViewer.Instance
     */
    groupAnnotations(annotationsOrAnnotationsId?: List<Annotation | ID>): void;
    /**
     * This function will return all annotations groups, if there are any annotations groups.
     * @public
     * @readonly
     * @instance
     * @returns {?NutrientViewer.Immutable.Map.<string, Record<string, NutrientViewer.Immutable.Set.<ID>>>} annotations groups
     * @function getAnnotationsGroups
     * @memberof NutrientViewer.Instance
     */
    getAnnotationsGroups(): Map_2<string, {
      groupKey: string;
      annotationsIds: Set_2<string>;}> |
    null;
    /**
     * If there are any annotations groups, this function will return all annotations groups.
     * deleteAnnotationsGroup
     * @public
     * @readonly
     * @instance
     * @param {string} annotationGroupKey The annotation group key.
     * @function deleteAnnotationsGroup
     * @memberof NutrientViewer.Instance
     */
    deleteAnnotationsGroup(annotationGroupId: string | null | undefined): void;
    /**
     * Selects an annotation in the user interface and enters edit mode. If `annotationOrAnnotationId` is empty, the
     * current selection will be cleared instead.
     *
     * This method works with {@link NutrientViewer.Annotations.TextAnnotation} and {@link NutrientViewer.Annotations.NoteAnnotation}.
     * When called with other annotation types that don't have any text it will simply select the annotation.
     * @public
     * @readonly
     * @instance
     * @param {?(AnnotationsUnion | string)} annotationOrAnnotationId The annotation
     *   model or annotation ID you want to set as selected. If `null` is used, the current selection
     *   will be cleared instead.
     * @param {?boolean} autoSelectText Whether the text should be automatically selected.
     * @function setEditingAnnotation
     * @memberof NutrientViewer.Instance
     */
    setEditingAnnotation(annotationOrAnnotationId?: (AnnotationsUnion | ID) | null, autoSelectText?: boolean | null): void;};} &

T;

declare class AnnotationSerializer {
  static VERSION: number;
  annotation: AnnotationsUnion;
  constructor(annotation: AnnotationsUnion);
  toJSON(): Omit<BaseAnnotationJSON, 'type'>;
  static fromJSON(id: ID | null, json: IAnnotationJSON, options?: ICollaboratorPermissionsOptions): {
    group?: string | null | undefined;
    canSetGroup?: boolean | undefined;
    isEditable?: boolean | undefined;
    isDeletable?: boolean | undefined;
    blendMode?: IBlendMode | undefined;
    id: string | null;
    name: string | null;
    subject: string | null;
    pdfObjectId: number | null;
    pageIndex: number;
    opacity: number;
    boundingBox: Rect;
    noPrint: boolean;
    noZoom: boolean;
    noRotate: boolean;
    noView: boolean;
    hidden: boolean;
    locked: boolean;
    lockedContents: boolean;
    readOnly: boolean;
    action: Action | null | undefined;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    creatorName: string | null;
    customData: Record<string, unknown> | null;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;};

  static blendModeObjectForAnnotation(json: IAnnotationJSON): {
    blendMode: IBlendMode;} |
  null;
  serializeFlags(): ("noView" | "noPrint" | "locked" | "lockedContents" | "readOnly" | "hidden" | "noZoom" | "noRotate")[] | null;}

declare type AnnotationSerializerTypeMap = {
  'pspdfkit/ink': {
    serializer: InkAnnotationSerializer;
    annotation: InkAnnotation;
    json: InkAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<InkAnnotationJSON>;};

  'pspdfkit/shape/line': {
    serializer: LineAnnotationSerializer;
    annotation: LineAnnotation;
    json: LineAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<LineAnnotationJSON>;};

  'pspdfkit/shape/rectangle': {
    serializer: RectangleAnnotationSerializer;
    annotation: RectangleAnnotation;
    json: RectangleAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<RectangleAnnotationJSON>;};

  'pspdfkit/shape/ellipse': {
    serializer: EllipseAnnotationSerializer;
    annotation: EllipseAnnotation;
    json: EllipseAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<EllipseAnnotationJSON>;};

  'pspdfkit/shape/polygon': {
    serializer: PolygonAnnotationSerializer;
    annotation: PolygonAnnotation;
    json: PolygonAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<PolygonAnnotationJSON>;};

  'pspdfkit/shape/polyline': {
    serializer: PolylineAnnotationSerializer;
    annotation: PolylineAnnotation;
    json: PolylineAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<PolylineAnnotationJSON>;};

  'pspdfkit/link': {
    serializer: LinkAnnotationSerializer;
    annotation: LinkAnnotation;
    json: LinkAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<LinkAnnotationJSON>;};

  'pspdfkit/markup/highlight': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: HighlightAnnotation;
    json: TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;};

  'pspdfkit/markup/squiggly': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: SquiggleAnnotation;
    json: TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;};

  'pspdfkit/markup/strikeout': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: StrikeOutAnnotation;
    json: TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;};

  'pspdfkit/markup/underline': {
    serializer: TextMarkupAnnotationSerializer;
    annotation: UnderlineAnnotation;
    json: TextMarkupAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<TextMarkupAnnotationJSON>;};

  'pspdfkit/markup/redaction': {
    serializer: RedactionAnnotationSerializer;
    annotation: RedactionAnnotation;
    json: RedactionAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<RedactionAnnotationJSON>;};

  'pspdfkit/text': {
    serializer: TextAnnotationSerializer;
    annotation: TextAnnotation;
    json: TextAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<TextAnnotationJSON>;};

  'pspdfkit/note': {
    serializer: NoteAnnotationSerializer;
    annotation: NoteAnnotation;
    json: NoteAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<NoteAnnotationJSON>;};

  'pspdfkit/image': {
    serializer: ImageAnnotationSerializer;
    annotation: ImageAnnotation;
    json: ImageAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<ImageAnnotationJSON>;};

  'pspdfkit/stamp': {
    serializer: StampAnnotationSerializer;
    annotation: StampAnnotation;
    json: StampAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<StampAnnotationJSON, 'color'>;};

  'pspdfkit/widget': {
    serializer: WidgetAnnotationSerializer;
    annotation: WidgetAnnotation;
    json: WidgetAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<WidgetAnnotationJSON>;};

  'pspdfkit/comment-marker': {
    serializer: CommentMarkerAnnotationSerializer;
    annotation: CommentMarkerAnnotation;
    json: CommentMarkerAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<CommentMarkerAnnotationJSON>;};

  'pspdfkit/unknown': {
    serializer: UnknownAnnotationSerializer;
    annotation: UnknownAnnotation;
    json: UnknownAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<UnknownAnnotationJSON>;};

  'pspdfkit/media': {
    serializer: MediaAnnotationSerializer;
    annotation: MediaAnnotation;
    json: MediaAnnotationJSON;
    jsonForBackend: AnnotationBackendJSON<MediaAnnotationJSON>;};};

/**
 * This event is emitted whenever an annotation is focused. Selecting an annotation also focuses it.
 *
 * When an annotation is deselected by pressing the `Escape` key, successive `annotations.blur`
 * and `annotations.focus` events will be dispatched for the same annotation.
 *
 * Use this event to add custom behavior like announcing the annotation value to screen readers.
 * @example <caption>Log text annotation value</caption>
 * instance.addEventListener("annotations.focus", (event) => {
 *   if (event.annotation instanceof NutrientViewer.Annotations.TextAnnotation) {
 *     console.log(event.annotation.text);
 *   }
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsFocusEvent
 */
declare type AnnotationsFocusEvent = {
  /**
   * The annotation that was focused.
   *
   * Remember that annotations are `Immutable.map`.
   * @public
   * @instance
   * @member {AnnotationsUnion} annotation
   * @memberof NutrientViewer.AnnotationsFocusEvent
   */
  annotation: AnnotationsUnion;
  /**
   * The browser event `FocusEvent` which caused the `annotations.focus` event to dispatch.
   * Its `type` property is set to `focus`.
   * @public
   * @instance
   * @member {Event} nativeEvent
   * @memberof NutrientViewer.AnnotationsFocusEvent
   */
  nativeEvent: FocusEvent;};

declare function AnnotationsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations} for the given
     * `pageIndex`.
     *
     * The list contains an immutable snapshot of the currently available annotations in the UI for
     * the page. This means, that the returned list could include *invalid* annotations. Think for
     * example of the following workflow:
     *
     * 1. The user creates a new text annotation on a page.
     * 2. Now, the users double clicks the annotation and removes the text. The annotation is now
     * invalid since it does not have any text. But since the annotation is not yet deselected,
     * we will keep it visible.
     * 3. Next, the user updates the color of the text by using the annotation toolbar. The
     * annotation will still be invalid although a change occurred.
     * 4. At the end, the user decides to type more text and deselects the annotation again. The
     * annotation is now valid.
     *
     * When you want to keep a reference to the latest annotations, you can listen for
     * {@link NutrientViewer.Instance~AnnotationsChangeEvent},
     * {@link NutrientViewer.Instance~AnnotationsWillSaveEvent}, or
     * {@link NutrientViewer.Instance~AnnotationsDidSaveEvent} to update your reference.
     *
     * If annotations for this page have not been loaded yet, the promise will resolve only after
     * we have received all annotations.
     * @public
     * @example
     * instance.getAnnotations(0).then(function (annotations) {
     *   annotations.forEach(annotation => {
     *     console.log(annotation.pageIndex);
     *   });
     *
     *   // Filter annotations by type
     *   annotations.filter(annotation => {
     *     return annotation instanceof NutrientViewer.Annotations.InkAnnotation;
     *   })
     *
     *   // Filter annotations at a specific point
     *   const pointInFirstPage = new NutrientViewer.Geometry.Point({ x: 20, y: 30 });
     *   const annotationsAtPointInPage = annotationsOnFirstPage.filter(annotation => {
     *     return annotation.boundingBox.isPointInside(pointInFirstPage);
     *   });
     *
     *   // Get the number of currently loaded annotations
     *   const totalAnnotations = annotations.size;
     * })
     * @readonly
     * @instance
     * @function getAnnotations
     * @param {number} pageIndex The page index for the annotations you want.
     *   `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`
     * @returns {Promise.<NutrientViewer.Immutable.List.<AnnotationsUnion>>} Resolves to
     *   annotations for the given page.
     * @memberof NutrientViewer.Instance
     */
    getAnnotations(pageIndex: number): Promise<List<AnnotationsUnion>>;
    /**
     * Creates a new attachment and returns a Promise that resolves to the created attachments ID.
     * @public
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.createAttachment(blob).then(function(attachmentId) {
     *     console.log(attachmentId);
     *   });
     * })
     * @readonly
     * @instance
     * @function createAttachment
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the file can not be read.
     * @param {Blob} blob The attachment data as a Blob object.
     * @returns {Promise.<string>} A promise that resolves to the
     *   attachment ID.
     */
    createAttachment(blob: Blob): Promise<string>;
    /**
     * Fetches an attachment or an embedded file based on its ID.
     * @public
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.getAttachment("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad").then(function(image) {
     *     console.log(image);
     *   });
     * })
     * @instance
     * @function getAttachment
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the file can not be read.
     * @param {string} attachmentId The ID of the attachments or embedded files that should be fetched.
     * @returns {Promise.<?Blob>} A promise that resolves to the attachment data.
     */
    getAttachment(attachmentId: string): Promise<Blob>;
    /**
     * Takes a {@link NutrientViewer.Annotations.TextAnnotation} and returns a new
     * {@link NutrientViewer.Annotations.TextAnnotation} where the bounding box is adjusted to fit the
     * annotation and inside the page.
     *
     * This is using the same calculations as the text annotation editor interface.
     * @public
     * @example
     * textAnnotation = instance.calculateFittingTextAnnotationBoundingBox(textAnnotation);
     * @readonly
     * @instance
     * @memberof NutrientViewer.Instance
     * @function calculateFittingTextAnnotationBoundingBox
     * @param {NutrientViewer.Annotations.TextAnnotation} annotation The text annotation that needs it's
     *   bounding box adjusted.
     * @returns {NutrientViewer.Annotations.TextAnnotation} The text annotation that has it's bounding box
     *   adjusted.
     */
    calculateFittingTextAnnotationBoundingBox(annotation: TextAnnotation): TextAnnotation;
    /**
     * Returns a list containing the information of all the embedded files in the PDF.
     *
     * If you want to get the content of a particular embedded file, you can use {@link NutrientViewer.Instance#getAttachment}
     *
     * ```js
     * const embeddedFiles = await instance.getEmbeddedFiles()
     *
     * const fileContent = await instance.getAttachment(embeddedFiles.get(0).attachmentId)
     * ```
     * @public
     * @example
     * const embeddedFilesInfo = await instance.getEmbeddedFiles();
     * @readonly
     * @instance
     * @memberof NutrientViewer.Instance
     * @function getEmbeddedFiles
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.EmbeddedFile>>} List of embedded files in the document with their individual information.
     */
    getEmbeddedFiles(): Promise<List<EmbeddedFile>>;
    /**
     * This method is used to update the setOnAnnotationResizeStart callback
     *
     * When the supplied callback is invalid it will throw a {@link NutrientViewer.Error} that contains a
     * detailed error message.
     * @public
     * @instance
     * @function setOnAnnotationResizeStart
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.AnnotationResizeStartCallback} setOnAnnotationResizeStartCallback
     */
    setOnAnnotationResizeStart(setOnAnnotationResizeStartCallback: AnnotationResizeStartCallback): void;
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations} for the given
     * form field or annotation.
     *
     * The list contains an immutable snapshot of the currently overlapping annotations for
     * the argument.
     *
     * If annotations for this page have not been loaded yet, the promise will resolve only after
     * we have received all annotations.
     * @public
     * @example get signature overlapping a signature form field
     *
     * // The name of the field you want to check.
     * const formFieldName = "signature";
     *
     * // First get all `FormFields` in the `Document`.
     * const formFields = await instance.getFormFields();
     *
     * // Get a signature form with the specific name you want.
     * const field = formFields.find(
     *  (formField) =>
     *   formField.name === formFieldName && formField instanceof NutrientViewer.FormFields.SignatureFormField
     *  );
     *
     * // Check if the signature form field has been signed
     * await instance.getOverlappingAnnotations(field);
     * // It will result in a list of annotations that overlaps the given signature form field.
     * // If no annotation overlaps the form field, the list will be empty.
     * @example get annotations overlapping an ink annotation
     *
     * const annotations = instance.getAnnotations(0);
     * const inkAnnotation = annotations.find(
     *  (annotation) =>
     *   annotation instanceof NutrientViewer.Annotation.InkAnnotation
     * );
     * await instance.getOverlappingAnnotations(inkAnnotation);
     * // It will result in a list of annotations that overlaps the given signature form field.
     * // If no annotation overlaps the form field, the list will be empty.
     * @readonly
     * @instance
     * @function getOverlappingAnnotations
     * @param {AnnotationsUnion | FormField} annotationOrFormField the annotation or the form field that needs to be checked for overlapping annotations.
     * @returns {Promise.<NutrientViewer.Immutable.List.<AnnotationsUnion>>} Resolves to
     *   a list of the annotations that overlap the given argument.
     * @memberof NutrientViewer.Instance
     */
    getOverlappingAnnotations(annotationOrFormField: AnnotationsUnion | FormField): Promise<List<AnnotationsUnion>>;};} &

T;

/**
 * This event is emitted whenever an annotation is pasted.
 * @example <caption>Get current pasted annotation</caption>
 * instance.addEventListener("annotations.paste", (event) => {
 *   const pastedAnnotations = event.annotations;
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsPasteEvent
 */
/**
 * The annotation that was pasted.
 * @public
 * @instance
 * @member {Array<AnnotationsUnion>} annotations
 * @memberof NutrientViewer.AnnotationsPasteEvent
 */
/**
 * The formField generated for the pasted annotation.
 * @public
 * @instance
 * @member {Array<NutrientViewer.FormFields.FormField>} formFields
 * @memberof NutrientViewer.AnnotationsPasteEvent
 */
/**
 * The original annotation that was cut or copied.
 * @public
 * @instance
 * @member {Array<AnnotationsUnion>} originalAnnotations
 * @memberof NutrientViewer.AnnotationsPasteEvent
 */
/**
 * The form field associated with the original widget annotation that was cut or copied.
 * @public
 * @instance
 * @member {Map<string, NutrientViewer.FormFields.FormField>} originalFormFields
 * @memberof NutrientViewer.AnnotationsPasteEvent
 */
declare type AnnotationsPasteEvent = AnnotationsDuplicateEvent & {
  /**
   * The action that was taken on the original annotation.
   * This can be `CUT` or `COPY`.
   * @public
   * @instance
   * @member {"COPY" | "CUT"} previousAction
   * @memberof NutrientViewer.AnnotationsPasteEvent
   */
  previousAction: 'COPY' | 'CUT';};


/**
 * This event is emitted whenever an annotation is either clicked
 * or touched (on devices with touch capabilities) as well as when an already selected
 * annotation receives a click or touch event.
 *
 * Use this event to add custom behavior or prevent default ones from happening on press.
 *
 * Please note that this event will not be fired for annotations which are not
 * editable. If you still want to detect clicks for such annotations, for
 * example, to show a focus ring when clicked, you can use custom renderers to
 * made a clickable area above each annotation. This method is described fully
 * in our [Knowledge Base](www.nutrient.io/guides/web/current/knowledge-base/show-focus-ring-read-only).
 * @example <caption>Prevent click and touch events on selected annotations</caption>
 * instance.addEventListener("annotations.press", (event) => {
 *   if (event.selected) {
 *     event.preventDefault();
 *   }
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsPressEvent
 */
declare type AnnotationsPressEvent = {
  /**
   * The annotation that was pressed.
   * Remember that annotations are `Immutable.map`.
   * @public
   * @instance
   * @member {AnnotationsUnion} annotation
   * @memberof NutrientViewer.AnnotationsPressEvent
   */
  annotation: AnnotationsUnion;
  /**
   * The browser event which caused the press event to dispatch. This is either a MouseEvent,
   * TouchEvent, or a PointerEvent.
   * @public
   * @instance
   * @member {Event} nativeEvent
   * @memberof NutrientViewer.AnnotationsPressEvent
   */
  nativeEvent: Event;
  /**
   * When invoked, the `preventDefault` method prevents the default press
   * actions associated with the annotation to occur.
   * @public
   * @instance
   * @member {Function} preventDefault
   * @memberof NutrientViewer.AnnotationsPressEvent
   */
  preventDefault?: () => void;
  /**
   * Tells whether the pressed annotation is selected or not.
   * @public
   * @instance
   * @member {boolean} selected
   * @memberof NutrientViewer.AnnotationsPressEvent
   */
  selected: boolean;};

/**
 * This event is emitted whenever an annotation is about to be resized.
 *
 * You can use this event to add custom resize behavior for individual annotations.
 * @example <caption>Log text annotation value</caption>
 * instance.setOnAnnotationResizeStart((event) => {
 *   if (event.annotation instanceof NutrientViewer.Annotations.TextAnnotation) {
 *     return {
 *         maintainAspectRatio: true
 *     }
 *   }
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsResizeEvent
 */
declare type AnnotationsResizeEvent = {
  /**
   * The annotation that is resizing.
   *
   * Remember that annotations are `Immutable.map`.
   * @public
   * @instance
   * @member {NutrientViewer.Annotations} annotation
   * @memberof NutrientViewer.AnnotationsResizeEvent
   */
  annotation: AnnotationsUnion;
  /**
   * This boolean represents if the user is holding the shift key.
   * @public
   * @instance
   * @member {boolean} isShiftPressed
   * @memberof NutrientViewer.AnnotationsResizeEvent
   */
  isShiftPressed: boolean;
  /**
   * This holds the name of the anchor the user is using the resize the annotation.
   * @public
   * @instance
   * @member {NutrientViewer.ResizeAnchor} resizeAnchor
   * @memberof NutrientViewer.AnnotationsResizeEvent
   */
  resizeAnchor: ResizeAnchor;};

declare type AnnotationsSidebarOptions = {
  includeContent: Array<AnnotationsUnionClass | Class<Comment_2>>;};

/**
 * This event is emitted whenever an annotation is either dragged
 * or resized.
 * @example <caption>Get current bounding box of an transforming annotation</caption>
 * instance.addEventListener("annotations.transform", (event) => {
 *   const boundingBox = event.annotation.boundingBox;
 * });
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsTransformEvent
 */
declare type AnnotationsTransformEvent = {
  /**
   * The annotation that is being transformed.
   * @public
   * @instance
   * @member {AnnotationsUnion} annotation
   * @memberof NutrientViewer.AnnotationsTransformEvent
   */
  annotation: AnnotationsUnion;};

export declare type AnnotationsUnion = { [K in
keyof AnnotationSerializerTypeMap]: AnnotationSerializerTypeMap[K]['annotation'] }[
keyof AnnotationSerializerTypeMap];

declare type AnnotationsUnionClass = { [K in
keyof AnnotationSerializerTypeMap]: Class<AnnotationSerializerTypeMap[K]['annotation']> }[
keyof AnnotationSerializerTypeMap];

/**
 * Indicates the reason why {@link NutrientViewer.AnnotationsWillChangeEvent} was
 * emitted.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @enum
 */
export declare enum AnnotationsWillChangeReason {
  /**
   * The user starts drawing an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  DRAW_START = "DRAW_START",
  /**
   * The user stops drawing an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  DRAW_END = "DRAW_END",
  /**
   * The user starts typing text into an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  TEXT_EDIT_START = "TEXT_EDIT_START",
  /**
   * The user stops typing text into an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  TEXT_EDIT_END = "TEXT_EDIT_END",
  /**
   * The user starts choosing an item from the picker presented.
   *
   * Used for image annotations, stamp annotations and ink signature annotations.
   *
   * Note that the annotation included in this event will not have any matching
   * field values (including ID) compared to the annotation in a
   * {@link NutrientViewer.AnnotationsWillChangeReason.SELECT_END} event. This is
   * because the actual annotation hasn't been created yet. As a result, this
   * annotation is used only to identify the type of annotation being selected.
   * The only exception to this is the `inkSignature` field in a
   * {@link NutrientViewer.Annotations.InkAnnotation}, which is set to `true` to
   * distiguish it from a regular ink annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  SELECT_START = "SELECT_START",
  /**
   * The user stops choosing an item from the picker presented.
   *
   * Used for image annotations, stamp annotations and ink signature
   * annotations.
   *
   * Note= An empty {@link NutrientViewer.AnnotationsWillChangeEvent#annotations}
   * list indicates that the selection was cancelled.
   *
   * Note that this will not be fired when cancelling the system dialog for
   * selecting an image, because there is no way to detect when this occurs.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  SELECT_END = "SELECT_END",
  /**
   * The user starts moving an annotation around.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  MOVE_START = "MOVE_START",
  /**
   * The user stops moving an annotation around.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  MOVE_END = "MOVE_END",
  /**
   * The user starts resizing an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  RESIZE_START = "RESIZE_START",
  /**
   * The user stops resizing an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  RESIZE_END = "RESIZE_END",
  /**
   * The user starts rotating an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  ROTATE_START = "ROTATE_START",
  /**
   * The user stops rotating an annotation.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  ROTATE_END = "ROTATE_END",
  /**
   * The user initiates the delete process. This
   * will be emitted when the deletion confirmation
   * dialog appears.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  DELETE_START = "DELETE_START",
  /**
   * The user ends the delete process. This
   * will be emitted when the user confirms
   * or cancels the intention to delete an
   * annotation.
   *
   * An empty {@link NutrientViewer.AnnotationsWillChangeEvent#annotations}
   * list indicates that the deletion was cancelled.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  DELETE_END = "DELETE_END",
  /**
   * The value of one of the properties of the
   * annotation is changed by the user. e.g. the
   * color or the stroke width.
   * @type {NutrientViewer.AnnotationsWillChangeReason}
   * @public
   */
  PROPERTY_CHANGE = "PROPERTY_CHANGE",}

declare function AnnotationTabOrderMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * *** Standalone only ***
     *
     * This method is used to retrieve the tab order of annotations in a given page.
     *
     * The tab order will be returned as an array of annotation IDs.
     *
     * In the case of widget annotations associated to a radio form field, all the widgets
     * associated to the same form field are rendered next to the first one found
     * in the provided `Array` of annotation IDs.
     * @example <caption>Get the tab order of annotations in page 0</caption>
     * instance.getPageTabOrder(0);
     * @public
     * @instance
     * @function getPageTabOrder
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied page index is not a number.
     * @param {number} pageIndex
     * @returns {Promise.<Array.<string>>} A promise that resolves to an ordered array of annotation IDs.
     */
    getPageTabOrder(pageIndex: number): Promise<string[]>;
    /**
     * *** Standalone only ***
     *
     * This method is used to set the tab order of annotations in a given page.
     *
     * The tab order should be provided as an array of annotation IDs.
     *
     * In the case of widget annotations associated to a radio form field, all the widgets
     * associated to the same form field will be rendered next to the first one found
     * in the provided `Array` of annotation IDs.
     * @example <caption>Set the tab order of annotations in page 0</caption>
     * instance.setPageTabOrder(0, ["annotation-id-1", "annotation-id-2"]);
     * @example <caption>Set the tab order of annotations in page 0, with a radio form field</caption>
     * // 'radio-widget-id-2' will be rendered next to 'radio-widget-id-1', and navigated accordingly
     * instance.setPageTabOrder(0, ["radio-widget-id-1", "annotation-id-1", "annotation-id-2", "radio-widget-id-2"]);
     * @public
     * @instance
     * @function setPageTabOrder
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error}
     * @param {number} pageIndex
     * @param {NutrientViewer.Instance~TabOrderUpdater} annotationIdsSortCallback A callback that will get
         * invoked with the annotations in the current tab order, and is expected to return the
         * annotation IDs in the new tab order.
         */
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setViewState|setViewState()}
     * method to do atomic updates to the current view state.
     * @public
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * // Sort page 0 annotations by their top position
     * instance.setPageTabOrder(
     *   0,
     *   currentTabOrderedAnnotations => currentTabOrderedAnnotations
     *     .sort((a, b) => a.boundingBox.top - b.boundingBox.top)
     *     .map(annotation => annotation.id)
     * );
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~TabOrderUpdater
     * @param {Array.<NutrientViewer.AnnotationsUnion>} tabOrderedAnnotations Annotations ordered by the current tab order.
     * @returns {Array.<string>} Annotations IDs ordered following the new tab order.
     */
    /**
     * This method is used to modify the current tab order of annotations.
     *
     * Using this method, it is possible to specify the order in which annotations are
     * navigated when using the keyboard.
     *
     * The method accepts a page index as first argument, and a callback as second. This callback will
     * be called with an array of annotations in the page sorted by their current tab order.
     *
     * The callback should return an array of those annotations `id`s following the new tab order.
     * @example <caption>Sort page 1 annotations by their left position</caption>
     * instance.setPageTabOrder(
     *   1,
     *   currentTabOrderedAnnotations => currentTabOrderedAnnotations
     *     .sort((a, b) => a.boundingBox.left - b.boundingBox.left)
     *     .map(annotation => annotation.id)
     * );
     * @public
     * @instance
     * @function setPageTabOrder
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied tab order is not valid.
     * @param {NutrientViewer.Instance~TabOrderUpdater} annotationIdsSortCallback A callback that will get
         *   invoked with the annotations in the current tab order, and is expected to return the
         *   annotation IDs in the new tab order.
         */
    setPageTabOrder(pageIndex: number, annotationIdsSortCallback: (tabOrderedAnnotations: AnnotationsUnion[]) => ID[]): Promise<void>;};} &

T;

declare type AnnotationToolbarColorPresetConfig = {
  presets: ColorPreset[];
  showColorPicker?: boolean;};

declare type AnnotationToolbarColorPresetsCallback = (options: {
  propertyName: BuiltInColorProperty;
  defaultAnnotationToolbarColorPresets: ColorPreset[];}) =>
AnnotationToolbarColorPresetConfig | undefined;

export declare type AnnotationToolbarItem = (Omit<Shared, 'node'> & {
  type: IAnnotationToolbarType;}) |
(Omit<Shared, 'icon'> & {
  id: string;
  type: 'custom';
  icon?: string | Node;
  node?: Node;});

/**
 * The additional options that are passed to `NutrientViewer.AnnotationToolbarItemsCallback`.
 * @public
 * @typedef {object} AnnotationToolbarItemsCallbackOptions@typedef {object} AnnotationToolbarItemsCallbackOptions
 * @property {NutrientViewer.AnnotationToolbarItem[]} defaultAnnotationToolbarItems - The list of default items that are shown for this particular annotation.
 * @property {boolean} hasDesktopLayout - Whether the screen is in desktop layout.
 */
/**
 * This callback can be run on individual annotation toolbars to modify their toolbar items.
 *
 * For more information, see {@link NutrientViewer.Configuration#annotationToolbarItems}
 * @public
 * @callback AnnotationToolbarItemsCallback@callback AnnotationToolbarItemsCallback
 * @memberof NutrientViewer
 * @param {AnnotationsUnion | null} annotation The annotation that is going to be created or is currently selected. In case
 * the annotation is not yet created, `pageIndex` is `null`. In case of items for annotation toolbars used in interaction modes
 * like {@link NutrientViewer.InteractionMode.INK_ERASER}, `annotation` is `null`.
 * @param {AnnotationToolbarItemsCallbackOptions} options The {@link AnnotationToolbarItemsCallbackOptions} that can be helpful in implementing custom toolbar.
 */
declare type AnnotationToolbarItemsCallback = (annotation: AnnotationsUnion | null, options: {
  defaultAnnotationToolbarItems: BuiltInAnnotationToolbarItem[];
  hasDesktopLayout: boolean;}) =>
AnnotationToolbarItem[];

/**
 * This callback is called whenever an annotation gets selected and can be used to
 * define and return an array of {@link NutrientViewer.ToolItem} that will be rendered in a tooltip
 * for the given annotation.
 *
 * If the callback returns an empty array then NutrientViewer won't show any tooltip for the selected annotation.
 * @public
 * @callback AnnotationTooltipCallback@callback AnnotationTooltipCallback
 * @memberof NutrientViewer
 * @param {Annotation} annotation The selected annotation.
 * @example <caption>Register a AnnotationTooltipCallback handler to show a tooltip for text annotations only.</caption>
 * NutrientViewer.load({
 *   annotationTooltipCallback: function(annotation) {
 *     if (annotation instanceof NutrientViewer.Annotations.TextAnnotation) {
 *       var toolItem = {
 *         type: 'custom',
 *         title: 'tooltip item for text annotations',
 *         id: 'item-text-tooltip-annotation',
 *         className: 'TooltipItem-Text',
 *         onPress: function () {
 *           console.log(annotation)
 *         }
 *       }
 *       return [toolItem]
 *     } else {
 *       return []
 *     }
 *   }
 *   // ...
 * });
 */
declare type AnnotationTooltipCallback = (annotation: AnnotationsUnion) => Array<ToolItem>;







declare const AnonymousCommentMode: {
  /**
   * Does not display anonymous comment toggle button in the UI.
   */
  readonly DISABLED: "disabled";
  /**
   * Displays anonymous comment toggle button in the comment thread editor.
   * It can be toggled on or off by the user. Initially the toggle is off.
   */
  readonly INITIAL_OFF: "initialOff";
  /**
   * Displays anonymous comment toggle button in the comment thread editor.
   * It can be toggled on or off by the user. Initially the toggle is on.
   */
  readonly INITIAL_ON: "initialOn";};


declare type Args<T = any> = T extends (...args: infer A) => any ? A : never;

declare type AttachmentsSidebarOptions = {
  disablePreview: boolean;};

/**
 * When working with annotations and form field values, there are multiple options when the data can
 * get saved. The AutoSaveMode controls this behavior.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.AutoSaveMode} IMMEDIATE Saves immediately whenever an attribute of the annotation changed, or whenever a form field
 * value got updated.
 * @property {NutrientViewer.AutoSaveMode} INTELLIGENT Saves annotations automatically, when the user finishes editing an annotation. For form fields,
 * this behaves like {@link NutrientViewer.AutoSaveMode.IMMEDIATE}.
 * @property {NutrientViewer.AutoSaveMode} DISABLED Never saves annotations or form field values automatically. Annotations and form field values
 * can still be saved via {@link NutrientViewer.Instance#save} or
 * {@link NutrientViewer.Instance#saveFormFieldValues}
 *
 * In this mode, document signatures validation information will not be automatically updated
 * if the document is modified, until changes are saved.
 */
declare const AutoSaveMode: {
  readonly IMMEDIATE: "IMMEDIATE";
  readonly INTELLIGENT: "INTELLIGENT";
  readonly DISABLED: "DISABLED";};


declare class AvailableFace extends AvailableFace_base {}

declare const AvailableFace_base: Record_2.Factory<{
  family: string;
  variants: Set_2<FaceVariant>;}>;

/**
 * Available font face for content editing font matching.
 * Each font face represents a specific combination of family and style.
 * @public
 * @interface AvailableFontFace
 * @memberof NutrientViewer
 */
declare interface AvailableFontFace {
  /** The font family name (e.g., "Arial", "Times New Roman") */
  family: string;
  /** Whether this font face is bold */
  bold: boolean;
  /** Whether this font face is italic */
  italic: boolean;}


declare type BackendRequiredKeys = 'id' | 'v' | 'pageIndex' | 'type' | 'bbox';

declare type BaseAnnotationJSON = {
  v: number;
  type?: 'pspdfkit/ink' | 'pspdfkit/shape/line' | 'pspdfkit/shape/rectangle' | 'pspdfkit/shape/ellipse' | 'pspdfkit/shape/polygon' | 'pspdfkit/shape/polyline' | 'pspdfkit/link' | 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction' | 'pspdfkit/stamp' | 'pspdfkit/text' | 'pspdfkit/note' | 'pspdfkit/image' | 'pspdfkit/media' | 'pspdfkit/widget' | 'pspdfkit/comment-marker' | 'pspdfkit/unknown';
  name?: string | null;
  id: string;
  subject?: string | null;
  pdfObjectId?: number | null;
  pageIndex: number;
  bbox: IRectJSON;
  opacity?: number;
  flags?: ('noPrint' | 'noZoom' | 'noRotate' | 'noView' | 'hidden' | 'locked' | 'lockedContents' | 'readOnly')[] | null;
  action?: ActionJSON | null;
  note?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  creatorName?: string | null;
  customData?: Record<string, unknown> | null;
  isCommentThreadRoot?: boolean;
  isAnonymous?: boolean;
  APStreamCache?: {
    cache: string;} |
  {
    attach: string;};

  blendMode?: IBlendMode | null;} &
ICollaboratorPermissionsOptions;

declare type BaseFormFieldJSON = {
  v: 1;
  pdfObjectId?: number | null;
  annotationIds: Array<string>;
  name: string;
  label: string;
  flags?: FormFieldFlags;
  id: string;
  additionalActions?: SerializedAdditionalActionsType;
  group?: IGroup;
  permissions?: IPermissions;};

declare class BaseMixin {}

declare type BaseTextMarkupAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  rects: [number, number, number, number][];};

declare abstract class BaseTextMarkupSerializer extends AnnotationSerializer {
  annotation: RedactionAnnotation | TextMarkupAnnotation;
  constructor(annotation: RedactionAnnotation | TextMarkupAnnotation);
  toJSON(): BaseTextMarkupAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<BaseTextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
    rects: List<Rect>;
    group?: string | null | undefined;
    canSetGroup?: boolean | undefined;
    isEditable?: boolean | undefined;
    isDeletable?: boolean | undefined;
    blendMode?: IBlendMode | undefined;
    id: string | null;
    name: string | null;
    subject: string | null;
    pdfObjectId: number | null;
    pageIndex: number;
    opacity: number;
    boundingBox: Rect;
    noPrint: boolean;
    noZoom: boolean;
    noRotate: boolean;
    noView: boolean;
    hidden: boolean;
    locked: boolean;
    lockedContents: boolean;
    readOnly: boolean;
    action: Action | null | undefined;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    creatorName: string | null;
    customData: Record<string, unknown> | null;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;};}

/**
 * Describes the properties of a Document Editor Footer Item.
 *
 * Check out [our guides](www.nutrient.io/guides/web/customizing-the-interface/customizing-the-document-editor-toolbar-and-footer/)
 * for more examples.
 * @public
 * @memberof NutrientViewer
 * @interface DocumentEditorFooterItem
 * @seealso NutrientViewer.Instance#setDocumentEditorFooterItems NutrientViewer.Configuration#documentEditorFooterItems
 */
declare type BasicDocumentEditorFooterItem = {
  /**
   * ***required***
   *
   * The type of a document editor footer item.
   *
   * It can either be `custom` for user defined items or one from the {@link NutrientViewer.defaultDocumentEditorFooterItems}.
   *
   * Note: It is ***not*** possible to override this option for built-in toolbar items.
   * @example
   * // In your JavaScript
   * const documentEditorFooterItems = NutrientViewer.defaultDocumentEditorFooterItems
   * documentEditorFooterItems.push({ type: 'custom', ... })
   * NutrientViewer.load({
   *  ...otherOptions,
   *  documentEditorFooterItems
   * });
   * @public
   * @instance
   * @member {string} type
   * @memberof NutrientViewer.DocumentEditorFooterItem
   */
  type: BuiltInDocumentEditorFooterItem | 'custom';
  /**
   * `custom` tool items have to define a DOM node which NutrientViewer will render.
   *
   * In this case the tool item is rendered inside of a container div. The `className` which you pass is set to this container div and not to the node that you passed.
   *
   * The `onPress` event is registered and fires any time the item is clicked.
   * @public
   * @instance
   * @member {?Node} node
   * @memberof NutrientViewer.DocumentEditorFooterItem
   */
  node?: Node;
  /**
   * Useful to set a custom CSS class name on the item.
   *
   * For {@link NutrientViewer.defaultDocumentEditorFooterItems|default document editor footer items} the `className` is appended to the default
   * item ones.
   * @public
   * @instance
   * @member {?string} className
   * @memberof NutrientViewer.DocumentEditorFooterItem
   */
  className?: string;
  /**
   * Unique identifier for the item.
   *
   * This is useful to identify items whose `type` is `custom`.
   * @example
   * // In your JavaScript
   * const documentEditorFooterItems = NutrientViewer.defaultDocumentEditorFooterItems
   * documentEditorFooterItems.push({ type: 'custom', id: 'my-button', ... })
   * NutrientViewer.load({
   *  ...otherOptions,
   *  documentEditorFooterItems
   * });
   *
   * Note: It is ***not*** possible to override this option for built-in document editor footer items.
   * @public
   * @instance
   * @member {?string} id
   * @memberof NutrientViewer.DocumentEditorFooterItem
   */
  id?: string;
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
   * @public
   * @member {?NutrientViewer.DocumentEditorFooterItem.OnPressCallback} onPress
   * @memberof NutrientViewer.DocumentEditorFooterItem
   */
  /**
   * @public
   * @callback OnPressCallback@callback OnPressCallback
   * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
   * @param {NutrientViewer.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
   * @param {string} id The tool item id.
   * @memberof NutrientViewer.DocumentEditorFooterItem
   */
  onPress?: (e: MouseEvent, documentEditorUIHandler?: DocumentEditorUIHandler, id?: string) => void;};


/**
 * Represents one of the available blend modes for highlight and ink annotations.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.BlendMode} normal
 * @property {NutrientViewer.BlendMode} multiply
 * @property {NutrientViewer.BlendMode} screen
 * @property {NutrientViewer.BlendMode} overlay
 * @property {NutrientViewer.BlendMode} darken
 * @property {NutrientViewer.BlendMode} lighten
 * @property {NutrientViewer.BlendMode} colorDodge
 * @property {NutrientViewer.BlendMode} colorBurn
 * @property {NutrientViewer.BlendMode} hardLight
 * @property {NutrientViewer.BlendMode} softLight
 * @property {NutrientViewer.BlendMode} difference
 * @property {NutrientViewer.BlendMode} exclusion
 */
declare const BlendMode: {
  readonly normal: "normal";
  readonly multiply: "multiply";
  readonly screen: "screen";
  readonly overlay: "overlay";
  readonly darken: "darken";
  readonly lighten: "lighten";
  readonly colorDodge: "colorDodge";
  readonly colorBurn: "colorBurn";
  readonly hardLight: "hardLight";
  readonly softLight: "softLight";
  readonly difference: "difference";
  readonly exclusion: "exclusion";};


/**
 * @classdesc
 * This record is used to persist the information for a bookmark.
 *
 * A bookmark is an object that registers a PDF action, usually triggered to go to a page.
 * @example <caption>Creating a bookmark for the 3rd page of a document.</caption>
 * const bookmark = new NutrientViewer.Bookmark({
 *   name: 'test bookmark',
 *   action: new NutrientViewer.Actions.GoToAction({ pageIndex: 3 })
 * });
 *
 * instance.create(bookmark);
 * @public
 * @memberof NutrientViewer
 * @summary Bookmark element.
 * @class Bookmark
 * @noconstructor
 * @extends Immutable.Record
 * @seealso NutrientViewer.Instance#create NutrientViewer.Instance#delete
 * @seealso NutrientViewer.Instance#ensureChangesSaved NutrientViewer.Instance#getBookmarks
 * @seealso NutrientViewer.Instance#hasUnsavedChanges NutrientViewer.Instance#save
 * @seealso NutrientViewer.Instance#update NutrientViewer.Instance~BookmarksChangeEvent
 * @seealso NutrientViewer.Instance~BookmarksWillSaveEvent NutrientViewer.Instance~BookmarksDidSaveEvent
 * @seealso NutrientViewer.Instance~BookmarksLoadEvent NutrientViewer.Instance~BookmarksCreateEvent
 * @seealso NutrientViewer.Instance~BookmarksUpdateEvent NutrientViewer.Instance~BookmarksDeleteEvent
 */
export declare class Bookmark extends Bookmark_base {
  id: ID_2;
  action: Action;
  /**
   * Bookmark serializer. Converts a bookmark to InstantJSON compliant objects.
   * @public
   * @function toSerializableObject
   * @memberof NutrientViewer.Bookmark
   * @param {NutrientViewer.Bookmark}
   * @returns {object}
   */
  static toSerializableObject: typeof toJSON;
  /**
   * Bookmark deserializer. Converts a bookmark object to a {@link NutrientViewer.Bookmark}.
   * @public
   * @function fromSerializableObject
   * @memberof NutrientViewer.Bookmark
   * @param {object}
   * @returns {NutrientViewer.Bookmark}
   */
  static fromSerializableObject: (bookmark: BookmarkJSON) => Bookmark;}

declare const Bookmark_base: Immutable.Record.Factory<BookmarkProps>;

declare type BookmarkJSON = {
  v: 1;
  type: 'pspdfkit/bookmark';
  id: string;
  name: string | null;
  sortKey: number | null;
  action: ActionJSON;
  pdfBookmarkId: string | null;};

declare type BookmarkProps = {
  /**
   * A unique identifier to describe the bookmark. When a bookmark is created in the UI, the
   * viewer has to generate a unique ID.
   *
   * When changes are saved to the underlying bookmark provider, we call
   * {@link NutrientViewer.Instance#ensureBookmarkSaved} to make sure the annotation has been persisted
   * from the provider.
   * @public
   * @instance
   * @member {string} id
   * @memberof NutrientViewer.Bookmark
   */
  id: ID_2 | null;
  /**
   * When the bookmark is extracted directly from a PDF file, the `pdfBookmarkId` refers to the
   * identifier that was used in the PDF document.
   *
   * This ID is optional since newly created bookmarks using the SYNCProvider annotation provider
   * won't have a `pdfBookmarkId` assigned.
   * @public
   * @instance
   * @member {?string} pdfBookmarkId
   * @memberof NutrientViewer.Bookmark
   * @default null
   */
  pdfBookmarkId: ID_2 | null;
  /**
   * *optional*
   *
   * An optional name to associate to the bookmark.
   * @public
   * @instance
   * @member {?string} name
   * @memberof NutrientViewer.Bookmark
   * @default null
   */
  name: string | null;
  /**
   * The action that will be triggered when the bookmark is either clicked or tapped.
   *
   * Please refer to {@link NutrientViewer.Actions} for an in-depth look at PDF actions.
   * @public
   * @instance
   * @member {NutrientViewer.Actions.Action} action
   * @memberof NutrientViewer.Bookmark
   */
  action: Action | null;};

declare function BookmarksMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Bookmark} for the current document.
     *
     * The list contains an immutable snapshot of the currently available bookmarks in the UI for
     * the page.
     *
     * When you want to keep a reference to the latest bookmarks, you can listen for
     * {@link NutrientViewer.Instance~BookmarksChangeEvent},
     * {@link NutrientViewer.Instance~BookmarksWillSaveEvent}, or
     * {@link NutrientViewer.Instance~BookmarksDidSaveEvent} to update your reference.
     * @public
     * @example
     * instance.getBookmarks().then(function (bookmarks) {
     *   bookmarks.forEach(bookmark => {
     *     console.log(bookmark.name);
     *   });
     *
     *   // Get the number of currently loaded bookmarks
     *   const totalBookmarks = bookmarks.size;
     * })
     * @readonly
     * @instance
     * @function getBookmarks
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.Bookmark>>} Resolves to
     *   bookmarks for the given page.
     * @memberof NutrientViewer.Instance
     */
    getBookmarks(): Promise<List<Bookmark>>;};} &

T;

/**
 * Represents one of the available border styles for the widget annotations.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.BorderStyle} solid
 * @property {NutrientViewer.BorderStyle} dashed
 * @property {NutrientViewer.BorderStyle} beveled
 * @property {NutrientViewer.BorderStyle} inset
 * @property {NutrientViewer.BorderStyle} underline
 */
declare const BorderStyle: {
  readonly solid: "solid";
  readonly dashed: "dashed";
  readonly beveled: "beveled";
  readonly inset: "inset";
  readonly underline: "underline";};


/**
 * Performs processing via Nutrient Backend {@link https://www.nutrient.io/api/reference/public/#tag/Build-API|Build API}.
 *
 * * Document Engine (requires Document Engine >= 1.6.0)
 * * {@link https://www.nutrient.io/api/|DWS}
 *
 * In you are running in standalone mode, the resulting `ArrayBuffer` can be converted to PDF with {@link NutrientViewer.convertToPDF()} (if it's not already PDF)
 * and then loaded with {@link NutrientViewer.load()}.
 * @example
 * NutrientViewer.build(
 *  // Authorize request.
 *  { jwt: authPayload.jwt },
 *  // Instructions for the processing request.
 *  {
 *    parts: [
 *      // Use first input as the first part of the final document.
 *      { file: "document" },
 *      // Use a sample DOCX document served from URL as the second part of the final document.
 *      {
 *        file: {
 *          url: "https://www.nutrient.io/api/downloads/samples/docx/document.docx",
 *        },
 *      },
 *    ],
 *  },
 *  // Inputs required by the request. These will be uploaded with the request. The remote file served from URL does not need to be uploaded.
 *  [{ name: "document", content: document }]
 *);
 * @public
 * @function build
 * @memberof NutrientViewer
 * @param {NutrientViewer.ProcessingAuthPayload} authPayload Information needed to authenticate processing request with Nutrient backend.
 * @param {NutrientViewer.BuildInstructions} instructions Build API instructions that describe the processing operation.
 * @param {NutrientViewer.BuildInput[]} inputs An array of all inputs required for the processing operation.
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an `ArrayBuffer` with the processing result.
 *                                  In case of an error, rejects with a {@link NutrientViewer.Error} with detailed error message.
 * @since Document Engine 1.6.0
 */
declare function build(authPayload: ProcessingAuthPayload, instructions: BuildInstructions, inputs?: BuildInput[]): Promise<ArrayBuffer>;

/**
 * Represents a processing input referenced by {@link NutrientViewer.BuildInstructions} that needs to be uploaded with the processing request.
 * @public
 * @property {string} name - Name of the input, used to reference the input in {@link NutrientViewer.BuildInstructions}
 * @property {ArrayBuffer | Blob} content - Content of the input that will be uploaded to the backend for processing.
 * @interface BuildInput
 * @memberof NutrientViewer
 */
export declare type BuildInput = {
  name: string;
  content: ArrayBuffer | Blob;};


/**
 * The description of the processing operation performed via Build API.
 *
 * For a full reference of the Build API instructions, see the
 * {@link https://www.nutrient.io/api/reference/public/#tag/Build-API/Instructions-Schema|Instructions Schema}.
 * @public
 * @interface BuildInstructions
 * @memberof NutrientViewer
 */
export declare type BuildInstructions = {
  [key: string]: any;};


declare type BuiltInAnnotationToolbarItem = {
  type: IAnnotationToolbarType;};

/**
 * This callback allows users to customize the colors that will be displayed in our color dropdown picker, and to add a custom color picker UI to it.
 * @public
 * @memberof NutrientViewer
 * @callback AnnotationToolbarColorPresetsCallback@callback AnnotationToolbarColorPresetsCallback
 * @seealso NutrientViewer.Configuration#AnnotationToolbarColorPresetsCallback
 * @param {object} options
 * @param {BuiltInColorProperty} options.propertyName The annotation property for which we need to render a customized array of colors in the color dropdown.
 * The built-in color properties are:
 *
 * -'color'
 * -'stroke-color'
 * -'fill-color'
 * -'background-color'
 * -'font-color'
 * -'outline-color
 *
 * Different annotations have different color properties, but all of them are listed above. If you pass a color property that it's not supported, you will get an error.
 * @param {ColorPreset[]} options.defaultItems array of default colors
 * @returns {NutrientViewer.AnnotationToolbarColorPresetConfig} the configuration of the customized color picker
 * @example <caption>Customize different color dropdowns.</caption>
 * NutrientViewer.load({
 *  annotationToolbarColorPresets: function ({ propertyName }) {
 *    if (propertyName === "font-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *      };
 *    }
 *
 *    if (propertyName === "stroke-color") {
 *      return {
 *        presets: [
 *          {
 *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
 *            localization: {
 *              id: "brightRed",
 *              defaultMessage: "Bright Red",
 *            },
 *          },
 *          {
 *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
 *            localization: {
 *              id: "deepBlue",
 *              defaultMessage: "deepBlue",
 *            },
 *          },
 *        ],
 *        showColorPicker: false,
 *      };
 *    }
 *  },
 *  //...
 *});
 */
/**
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationToolbarColorPresetConfig
 * @property {ColorPreset[]} presets - the array of colors to be displayed in a customized color picker dropdown
 * @property {?boolean} colorPicker - Defines whether you want to render the custom color picker UI. The default value is `true`, meaning that by default we render the custom color picker in the color dropdown.
 */
declare type BuiltInColorProperty = 'color' | 'stroke-color' | 'fill-color' | 'background-color' | 'font-color' | 'outline-color' | 'border-color';

declare type BuiltInDocumentEditorFooterItem = 'cancel' | 'spacer' | 'save-as' | 'save' | 'selected-pages' | 'loading-indicator';

declare type BuiltInDocumentEditorToolbarItem = 'add' | 'remove' | 'duplicate' | 'rotate-left' | 'rotate-right' | 'move' | 'move-left' | 'move-right' | 'import-document' | 'extract-pages' | 'spacer' | 'undo' | 'redo' | 'select-all' | 'select-none' | 'zoom-out' | 'zoom-in';

/**
 * This callback can be run on specific text selection to modify its inline toolbar items.
 * @public
 * @memberof NutrientViewer
 * @callback InlineTextSelectionToolbarItemsCallback
 * @param {NutrientViewer.TextSelection} selection The text that is currently selected.
 */
declare const builtInItems: readonly ["highlight", "strikeout", "underline", "squiggle", "redact-text-highlighter", "comment", "ai-assistant"];

/**
 * @classdesc
 * A button that can be pressed.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary A clickable button.
 * @class ButtonFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.FormField
 */
export declare class ButtonFormField extends FormField {
  /**
   * The label for the button widget annotation.
   * @public
   * @instance
   * @member {string} buttonLabel
   * @memberof NutrientViewer.FormFields.ButtonFormField
   */
  buttonLabel: string | null;
  static defaultValues: IObject;}

declare type ButtonFormFieldJSON = BaseFormFieldJSON & {
  type: 'pspdfkit/form-field/button';
  buttonLabel: string | null;};

declare class Callout extends InheritableImmutableRecord<ICallout> {
  start: Point | null;
  knee: Point | null;
  end: Point | null;
  cap: ILineCap | null;
  innerRectInset: Inset | null;
  static defaultValues: ICallout;}

/**
 * The different possible validation states of the certificate chain.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @enum
 */
declare const CertificateChainValidationStatus: {
  /**
   * The certificate chain validates correctly.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly ok: "ok";
  /**
   * The certificate chain contains a self-signed certificate.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly ok_but_self_signed: "ok_but_self_signed";
  /**
   * Revocation check network error. Either due to invalid server URL or network timeout.
   * The certificate is valid with a warning.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly ok_but_could_not_check_revocation: "ok_but_could_not_check_revocation";
  /**
   * The certificate chain contains a certificate that has been classified as "untrusted".
   *
   * The certificate date is correct, but the identity is unknown because it has not been
   * included in the list of trusted certificates and none of its parents are trusted
   * certificates.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly untrusted: "untrusted";
  /**
   * The certificate used to sign the document has expired now.
   * Note that the certificate may be valid at the time the document was signed,
   * which is not checked.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly expired: "expired";
  /**
   * The certificate used to sign the document is not valid yet.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly not_yet_valid: "not_yet_valid";
  /**
   * The certificate is not valid.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly invalid: "invalid";
  /**
   * The certificate has been revoked.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly revoked: "revoked";
  /**
   * Could not fetch the contents of the signature.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
  /**
   * An unknown problem happened when the certificate trust chain was validated.
   *
   * Between the possible reasons for this could be that the signature is malformed,
   * the certificate chain is too long and other unknown conditions.
   * @public
   * @type {NutrientViewer.CertificateChainValidationStatus}
   */
  readonly general_validation_problem: "general_validation_problem";};


declare type CertificateChainValidationStatusType = (typeof CertificateChainValidationStatus)[keyof typeof CertificateChainValidationStatus];

/**
 * An union of supported types of changes.
 */
declare type Change = AnnotationsUnion | Bookmark | FormField | FormFieldValue | Comment_2;

declare function ChangesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * With {@link NutrientViewer.AutoSaveMode} it's possible to define when local changes get saved, but
     * it's also possible to define the point to save changes yourself.
     *
     * By choosing {@link NutrientViewer.AutoSaveMode.DISABLED}, nothing gets saved automatically, but
     * by calling `save`, it's possible to manually trigger save. This can be useful when you want
     * to have full control when new changes get saved to your backend.
     * @example
     * NutrientViewer.load(configuration).then(async (instance) => {
     *   const annotation = new NutrientViewer.Annotations.InkAnnotation({
     *     pageIndex: 0,
     *     lines: NutrientViewer.Immutable.List([
     *       NutrientViewer.Immutable.List([
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 0,   y: 0  }),
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 100, y: 100}),
     *       ])
     *     ])
     *   });
     *
     *  await instance.create(annotation);
     *
     *  await instance.save(); // Now the annotation gets saved.
     * })
     * @public
     * @readonly
     * @instance
     * @function save
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<void>} Promise that resolves once all changes are saved on remote server
     *          (in case of server-based backend) or in local backend (in case of standalone).
     *          If changes could not be saved, rejects with {@link NutrientViewer.SaveError}.
     */
    save(): Promise<void>;
    /**
     * Returns `true` if any local changes are not yet saved. This can be used in combination with
     * {@link NutrientViewer.Configuration.autoSaveMode} to implement fine grained save controls.
     *
     * Whenever changes are saved (for example, when calling {@link NutrientViewer.Instance#save}),
     * the method will return `false` again.
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.hasUnsavedChanges(); // => false
     * });
     * @public
     * @readonly
     * @instance
     * @function hasUnsavedChanges
     * @memberof NutrientViewer.Instance
     * @returns {boolean} Whether unsaved changes are present or not.
     */
    hasUnsavedChanges(): boolean;




















































    /**
     * Creates new changes and assigns them IDs.
     * If you need to ensure that changes are persisted by the backend, please refer to:
     * {@link NutrientViewer.Instance#ensureChangesSaved}.
     *
     * This method returns a promise that will resolve to an array of records with the local IDs set.
     *
     * New changes will be made visible in the UI instantly.
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   const annotation = new NutrientViewer.Annotations.InkAnnotation({
     *     pageIndex: 0,
     *     lines: NutrientViewer.Immutable.List([
     *       NutrientViewer.Immutable.List([
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 0,   y: 0  }),
     *         new NutrientViewer.Geometry.DrawingPoint({ x: 100, y: 100}),
     *       ])
     *     ])
     *   });
     *   instance.create(annotation).then(function(createdAnnotations) {
     *     console.log(createdAnnotations);
     *   });
     * })
     * @public
     * @readonly
     * @instance
     * @function create
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.Change | Array<NutrientViewer.Change> | List<NutrientViewer.Change>} changes A single change or a list/array of changes that should be created.
     * @returns {Promise.<Array<NutrientViewer.Change>>} A promise that resolves to an array of created changes or an error if some changes could not be created.
     */
    create(changes: Change | Array<Change> | List<Change>): Promise<Array<Change>>;
    /**
     * Updates object and changes its contents.
     *
     * If you need to ensure that changes are persisted by the backend, please refer to:
     * {@link NutrientViewer.Instance#ensureChangesSaved}.
     *
     * New changes will be made visible in the UI instantly.
     * @example
     * const instance = await NutrientViewer.load(configuration);
     * // Get all annotations on the first page
     * const annotations = instance.getAnnotations(0);
     * // Grab the first one
     * const annotation = annotations.first();
     *
     * const editedAnnotation = annotation.set("noPrint", true);
     * const updatedAnnotation = await instance.update(editedAnnotation);
     *
     * editedAnnotation === updatedAnnotation; // => true
     * @public
     * @readonly
     * @instance
     * @function update
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.Change | Array<NutrientViewer.Change> | List<NutrientViewer.Change>} changes A single change or list/array of changes that should be updated.
     * @returns {Promise.<Array<NutrientViewer.Change>>} A promise that resolves to an array of changes or an error if some changes could not be updated.
     */
    update(changes: Change | Array<Change> | List<Change>): Promise<Array<Change>>;
    /**
     * Deletes a change. This can be called with a change ID.
     *
     * If you need to ensure that changes are persisted by the backend, please refer to:
     * {@link NutrientViewer.Instance#ensureChangesSaved}.
     *
     * Deleted changes will be made visible in the UI instantly.
     *
     * If the deleted change is a `NutrientViewer.Annotations.WidgetAnnotation`
     * (which can only be deleted if the Form Creator component is present in
     * the license, and the backend is using a Form Creator capable provider),
     * and the associated `NutrientViewer.FormField` only includes that annotation in
     * its `annotationIds` list, the form field will also be deleted.
     *
     * If there are more widget annotations remaining in the `annotationIds` list,
     * as could be the case for radio buttons, for example, the form field's
     * `annotationIds` property will be updated by removing the deleted
     * annotation's `id` from it.
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.delete(1).then(function() {
     *     console.log("Object with ID 1 deleted.");
     *   });
     * });
     * @public
     * @readonly
     * @instance
     * @function delete
     * @memberof NutrientViewer.Instance
     * @param {string | Array<string> | List<string>} changeIds A single id or a list/array of ids of changes that should be deleted.
     * @returns {Promise.<Array<NutrientViewer.Change>>} A promise that resolves to an array of deleted changes or an error if some changes could not be deleted.
     */
    delete(changeIds: InstantID_2 | Change | Array<InstantID_2 | Change> | List<InstantID_2 | Change>): Promise<Array<Change>>;
    /**
     * Ensures that changes have been saved to the backend and returns the current persisted state of
     * these changes.
     *
     * This method returns a promise that will resolve to an array of {@link NutrientViewer.Change|Change}.
     * @example
     * NutrientViewer.load(configuration).then(function(instance) {
     *   instance.create(newAnnotation)
     *     .then(instance.ensureChangesSaved)
     *     .then(function() {
     *       console.log('Annotation persisted by annotation provider');
     *     });
     * });
     * @public
     * @readonly
     * @instance
     * @function ensureChangesSaved
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.Change | Array<NutrientViewer.Change> | List<NutrientViewer.Change>} changes A single change or a list/array of changes to ensure saved.
     * @returns {Promise.<Array<NutrientViewer.Change>>} A promise that resolves to an array of changes or an error if some changes could not be saved.
     */
    ensureChangesSaved(changes: Change | Array<Change> | List<Change>): Promise<Array<Change>>;};} &

T;

/**
 * @classdesc
 * A check box that can either be checked or unchecked. One check box form field can also be
 * associated to multiple single check box widgets. In this case, `option` contains the value of the
 * associated {@link NutrientViewer.FormOption}
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary A check box or a group of many check boxes.
 * @class CheckBoxFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.FormField
 */
export declare class CheckBoxFormField extends FormField {
  /**
   * An immutable list of all selected form option values. If no options are defined, a checked
   * check box will have `values: List(["Yes"]);`.
   *
   * If the list is empty, no check box is checked.
   *
   * In order to modify it, {@link NutrientViewer.Instance.setFormFieldValues|instance.setFormFieldValues()} should be used.
   * @public
   * @instance
   * @member {Immutable.List.<string>} values
   * @readonly
   * @memberof NutrientViewer.FormFields.CheckBoxFormField
   */
  values: List<string>;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   * @public
   * @instance
   * @member {Immutable.List.<string>} defaultValues
   * @memberof NutrientViewer.FormFields.CheckBoxFormField
   */
  defaultValues: List<string>;
  /**
   * A list of {@link NutrientViewer.FormOption}s. This is necessary for multiple check boxes in a group.
   *
   * See {@link NutrientViewer.FormOption} for more information.
   * @public
   * @instance
   * @member {Immutable.List.<NutrientViewer.FormOption>} options
   * @memberof NutrientViewer.FormFields.CheckBoxFormField
   */
  options: List<FormOption>;
  /**
   * Radio buttons and checkboxes can have multiple widgets with the same form value associated, but can be
   * selected independently. `optionIndexes` contains the value indexes that should be actually set.
   *
   * If set, the `value` field doesn't get used, and the widget found at the corresponding indexes in the form field's
   * `annotationIds` property are checked.
   *
   * If set on fields other than radio buttons or checkboxes, setting the form value will fail.
   * @public
   * @optional
   * @instance
   * @member {?NutrientViewer.Immutable.List.<number>} optionIndexes
   * @memberof NutrientViewer.FormFields.CheckBoxFormField
   */
  optionIndexes?: List<number>;
  static defaultValues: IObject;}

declare type CheckBoxFormFieldJSON = BaseFormFieldJSON & {
  type: 'pspdfkit/form-field/checkbox';
  options: Array<FormOptionJSON>;
  defaultValues: Array<string>;};

/**
 * @classdesc
 *
 * Base form field type for all form fields that allow multiple choices:
 *
 * - {@link NutrientViewer.FormFields.ComboBoxFormField}
 * - {@link NutrientViewer.FormFields.ListBoxFormField}
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary Base form field for all fields allowing multiple choices.
 * @class ChoiceFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.FormField
 */
export declare class ChoiceFormField extends FormField {
  /**
   * A list of {@link NutrientViewer.FormOption}s. This is necessary for multiple check boxes in a group.
   *
   * See {@link NutrientViewer.FormOption} for more information.
   * @public
   * @instance
   * @member {Immutable.List.<NutrientViewer.FormOption>} options
   * @memberof NutrientViewer.FormFields.ChoiceFormField
   */
  options: List<FormOption>;
  /**
   * An immutable list of all selected form option values. If no options are defined, a checked
   * check box will have `values: List(["Yes"]);`.
   *
   * If the list is empty, no check box is checked.
   *
   * In order to modify it, {@link NutrientViewer.Instance.setFormFieldValues|instance.setFormFieldValues()} should be used.
   * @public
   * @instance
   * @member {Immutable.List.<string>} values
   * @readonly
   * @memberof NutrientViewer.FormFields.ChoiceFormField
   */
  values: List<string>;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   * @public
   * @instance
   * @member {Immutable.List.<string>} defaultValues
   * @memberof NutrientViewer.FormFields.ChoiceFormField
   */
  defaultValues: List<string>;
  /**
   * If true, more than one of the field’s option items may be selected simultaneously. Otherwise,
   * no more than one item at a time may be selected.
   * @public
   * @instance
   * @member {boolean} multiSelect
   * @memberof NutrientViewer.FormFields.ChoiceFormField
   * @default false
   */
  multiSelect: boolean;
  /**
   * If true, the new value is committed as soon as a selection is made, without requiring the user
   * to exit the field. Otherwise, the new value is not committed until the user exits the field.
   *
   * Please note that {@link NutrientViewer.Instance#getFormFieldValues} will not return
   * the latest value for this field until the user leaves this field by default. If you
   * want this value to update on every change then set this to true.
   * @public
   * @instance
   * @member {boolean} commitOnChange
   * @memberof NutrientViewer.FormFields.ChoiceFormField
   * @default false
   */
  commitOnChange: boolean;
  static defaultValues: IObject;}

declare type ChoiceFormFieldJSON = BaseFormFieldJSON & {
  type: 'pspdfkit/form-field/listbox' | 'pspdfkit/form-field/combobox';
  options: Array<FormOptionJSON>;
  multiSelect: boolean;
  commitOnChange: boolean;
  defaultValues: Array<string>;};

declare type Class<T> = new (...args: any[]) => T;

declare function CollaborationPermissionsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * This method is used to update the group that will be used by default in all the
     * newly created form-fields, comments and annotations. If you don't have permission to
     * change the group, you will get error when you try to add an annotation, comment or form-field.
     *
     * This method is no-op if Collaboration Permissions is not enabled.
     * @public
     * @instance
     * @function setGroup
     * @memberof NutrientViewer.Instance
     * @param {string} group The new group that you want to use for all the newly created form-fields, comments and annotations.
     */
    setGroup(group: string): void;
    /**
     * This method can be used to change the default group back to original after it was changed to
     * something else using `instance.setGroup`.
     *
     * This method is no-op if Collaboration Permissions is not enabled.
     * @public
     * @instance
     * @function resetGroup
     * @memberof NutrientViewer.Instance
     */
    resetGroup(): void;};} &

T;

/**
 * Creates a Collection.
 *
 * The type of Collection created is based on the input.
 *
 *   * If an `Collection`, that same `Collection`.
 *   * If an Array-like, an `Collection.Indexed`.
 *   * If an Object with an Iterator defined, an `Collection.Indexed`.
 *   * If an Object, an `Collection.Keyed`.
 *
 * This methods forces the conversion of Objects and Strings to Collections.
 * If you want to ensure that a Collection of one item is returned, use
 * `Seq.of`.
 *
 * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
 * which is usually not what you want. You should turn your Iterator Object into
 * an iterable object by defining a Symbol.iterator (or @@iterator) method which
 * returns `this`.
 *
 * Note: `Collection` is a conversion function and not a class, and does not
 * use the `new` keyword during construction.
 */
declare function Collection<I extends Collection<any, any>>(collection: I): I;

declare function Collection<T>(collection: Iterable<T>): Collection.Indexed<T>;

declare function Collection<V>(obj: {[key: string]: V;}): Collection.Keyed<string, V>;

/**
 * The `Collection` is a set of (key, value) entries which can be iterated, and
 * is the base class for all collections in `immutable`, allowing them to
 * make use of all the Collection methods (such as `map` and `filter`).
 *
 * Note: A collection is always iterated in the same order, however that order
 * may not always be well defined, as is the case for the `Map` and `Set`.
 *
 * Collection is the abstract base class for concrete data structures. It
 * cannot be constructed directly.
 *
 * Implementations should extend one of the subclasses, `Collection.Keyed`,
 * `Collection.Indexed`, or `Collection.Set`.
 */
declare namespace Collection {

  /**
   * @deprecated use `const { isKeyed } = require('immutable')`
   */
  function isKeyed(maybeKeyed: any): maybeKeyed is Collection.Keyed<any, any>;

  /**
   * @deprecated use `const { isIndexed } = require('immutable')`
   */
  function isIndexed(maybeIndexed: any): maybeIndexed is Collection.Indexed<any>;

  /**
   * @deprecated use `const { isAssociative } = require('immutable')`
   */
  function isAssociative(maybeAssociative: any): maybeAssociative is Collection.Keyed<any, any> | Collection.Indexed<any>;

  /**
   * @deprecated use `const { isOrdered } = require('immutable')`
   */
  function isOrdered(maybeOrdered: any): boolean;


  /**
   * Keyed Collections have discrete keys tied to each value.
   *
   * When iterating `Collection.Keyed`, each iteration will yield a `[K, V]`
   * tuple, in other words, `Collection#entries` is the default iterator for
   * Keyed Collections.
   */
  namespace Keyed {}

  /**
   * Creates a Collection.Keyed
   *
   * Similar to `Collection()`, however it expects collection-likes of [K, V]
   * tuples if not constructed from a Collection.Keyed or JS Object.
   *
   * Note: `Collection.Keyed` is a conversion function and not a class, and
   * does not use the `new` keyword during construction.
   */
  function Keyed<K, V>(collection: Iterable<[K, V]>): Collection.Keyed<K, V>;
  function Keyed<V>(obj: {[key: string]: V;}): Collection.Keyed<string, V>;

  interface Keyed<K, V> extends Collection<K, V> {
    /**
     * Deeply converts this Keyed collection to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJS(): Object;

    /**
     * Shallowly converts this Keyed collection to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJSON(): {[key: string]: V;};

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<[K, V]>;

    /**
     * Returns Seq.Keyed.
     * @override
     */
    toSeq(): Seq.Keyed<K, V>;


    // Sequence functions

    /**
     * Returns a new Collection.Keyed of the same type where the keys and values
     * have been flipped.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 'z', b: 'y' }).flip()
     * // Map { "z": "a", "y": "b" }
     * ```
     */
    flip(): Collection.Keyed<V, K>;

    /**
     * Returns a new Collection with other collections concatenated to this one.
     */
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Collection.Keyed<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C;}>): Collection.Keyed<K | string, V | C>;

    /**
     * Returns a new Collection.Keyed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Collection } = require('immutable')
     * Collection.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
     * // Seq { "a": 10, "b": 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: V, key: K, iter: this) => M,
    context?: any)
    : Collection.Keyed<K, M>;

    /**
     * Returns a new Collection.Keyed of the same type with keys passed through
     * a `mapper` function.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2 }).mapKeys(x => x.toUpperCase())
     * // Map { "A": 1, "B": 2 }
     * ```
     *
     * Note: `mapKeys()` always returns a new instance, even if it produced
     * the same key at every step.
     */
    mapKeys<M>(
    mapper: (key: K, value: V, iter: this) => M,
    context?: any)
    : Collection.Keyed<M, V>;

    /**
     * Returns a new Collection.Keyed of the same type with entries
     * ([key, value] tuples) passed through a `mapper` function.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { Map } = require('immutable')
     * Map({ a: 1, b: 2 })
     *   .mapEntries(([ k, v ]) => [ k.toUpperCase(), v * 2 ])
     * // Map { "A": 2, "B": 4 }
     * ```
     *
     * Note: `mapEntries()` always returns a new instance, even if it produced
     * the same entry at every step.
     */
    mapEntries<KM, VM>(
    mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
    context?: any)
    : Collection.Keyed<KM, VM>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
    mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
    context?: any)
    : Collection.Keyed<KM, VM>;

    /**
     * Returns a new Collection with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
    predicate: (value: V, key: K, iter: this) => value is F,
    context?: any)
    : Collection.Keyed<K, F>;
    filter(
    predicate: (value: V, key: K, iter: this) => any,
    context?: any)
    : this;

    [Symbol.iterator](): IterableIterator<[K, V]>;}



  /**
   * Indexed Collections have incrementing numeric keys. They exhibit
   * slightly different behavior than `Collection.Keyed` for some methods in order
   * to better mirror the behavior of JavaScript's `Array`, and add methods
   * which do not make sense on non-indexed Collections such as `indexOf`.
   *
   * Unlike JavaScript arrays, `Collection.Indexed`s are always dense. "Unset"
   * indices and `undefined` indices are indistinguishable, and all indices from
   * 0 to `size` are visited when iterated.
   *
   * All Collection.Indexed methods return re-indexed Collections. In other words,
   * indices always start at 0 and increment until size. If you wish to
   * preserve indices, using them as keys, convert to a Collection.Keyed by
   * calling `toKeyedSeq`.
   */
  namespace Indexed {}

  /**
   * Creates a new Collection.Indexed.
   *
   * Note: `Collection.Indexed` is a conversion function and not a class, and
   * does not use the `new` keyword during construction.
   */
  function Indexed<T>(collection: Iterable<T>): Collection.Indexed<T>;

  interface Indexed<T> extends Collection<number, T> {
    /**
     * Deeply converts this Indexed collection to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Indexed collection to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    // Reading values

    /**
     * Returns the value associated with the provided index, or notSetValue if
     * the index is beyond the bounds of the Collection.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * Collection. `s.get(-1)` gets the last item in the Collection.
     */
    get<NSV>(index: number, notSetValue: NSV): T | NSV;
    get(index: number): T | undefined;


    // Conversion to Seq

    /**
     * Returns Seq.Indexed.
     * @override
     */
    toSeq(): Seq.Indexed<T>;

    /**
     * If this is a collection of [key, value] entry tuples, it will return a
     * Seq.Keyed of those entries.
     */
    fromEntrySeq(): Seq.Keyed<any, any>;


    // Combination

    /**
     * Returns a Collection of the same type with `separator` between each item
     * in this Collection.
     */
    interpose(separator: T): this;

    /**
     * Returns a Collection of the same type with the provided `collections`
     * interleaved into this collection.
     *
     * The resulting Collection includes the first item from each, then the
     * second from each, etc.
     *
     * <!-- runkit:activate
     *      { "preamble": "require('immutable')"}
     * -->
     * ```js
     * const { List } = require('immutable')
     * List([ 1, 2, 3 ]).interleave(List([ 'A', 'B', 'C' ]))
     * // List [ 1, "A", 2, "B", 3, "C"" ]
     * ```
     *
     * The shortest Collection stops interleave.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable')" }
     * -->
     * ```js
     * List([ 1, 2, 3 ]).interleave(
     *   List([ 'A', 'B' ]),
     *   List([ 'X', 'Y', 'Z' ])
     * )
     * // List [ 1, "A", "X", 2, "B", "Y"" ]
     * ```
     *
     * Since `interleave()` re-indexes values, it produces a complete copy,
     * which has `O(N)` complexity.
     *
     * Note: `interleave` *cannot* be used in `withMutations`.
     */
    interleave(...collections: Array<Collection<any, T>>): this;

    /**
     * Splice returns a new indexed Collection by replacing a region of this
     * Collection with new values. If values are not provided, it only skips the
     * region to be removed.
     *
     * `index` may be a negative number, which indexes back from the end of the
     * Collection. `s.splice(-2)` splices after the second to last item.
     *
     * <!-- runkit:activate -->
     * ```js
     * const { List } = require('immutable')
     * List([ 'a', 'b', 'c', 'd' ]).splice(1, 2, 'q', 'r', 's')
     * // List [ "a", "q", "r", "s", "d" ]
     * ```
     *
     * Since `splice()` re-indexes values, it produces a complete copy, which
     * has `O(N)` complexity.
     *
     * Note: `splice` *cannot* be used in `withMutations`.
     */
    splice(
    index: number,
    removeNum: number,
    ...values: Array<T>)
    : this;

    /**
     * Returns a Collection of the same type "zipped" with the provided
     * collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable')" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): Collection.Indexed<[T, U]>;
    zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T, U, V]>;
    zip(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

    /**
     * Returns a Collection "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = List([ 1, 2 ]);
     * const b = List([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     */
    zipAll<U>(other: Collection<any, U>): Collection.Indexed<[T, U]>;
    zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Collection.Indexed<[T, U, V]>;
    zipAll(...collections: Array<Collection<any, any>>): Collection.Indexed<any>;

    /**
     * Returns a Collection of the same type "zipped" with the provided
     * collections by using a custom `zipper` function.
     *
     * <!-- runkit:activate
     *      { "preamble": "const { List } = require('immutable')" }
     * -->
     * ```js
     * const a = List([ 1, 2, 3 ]);
     * const b = List([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // List [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
    zipper: (value: T, otherValue: U) => Z,
    otherCollection: Collection<any, U>)
    : Collection.Indexed<Z>;
    zipWith<U, V, Z>(
    zipper: (value: T, otherValue: U, thirdValue: V) => Z,
    otherCollection: Collection<any, U>,
    thirdCollection: Collection<any, V>)
    : Collection.Indexed<Z>;
    zipWith<Z>(
    zipper: (...any: Array<any>) => Z,
    ...collections: Array<Collection<any, any>>)
    : Collection.Indexed<Z>;


    // Search for value

    /**
     * Returns the first index at which a given value can be found in the
     * Collection, or -1 if it is not present.
     */
    indexOf(searchValue: T): number;

    /**
     * Returns the last index at which a given value can be found in the
     * Collection, or -1 if it is not present.
     */
    lastIndexOf(searchValue: T): number;

    /**
     * Returns the first index in the Collection where a value satisfies the
     * provided predicate function. Otherwise -1 is returned.
     */
    findIndex(
    predicate: (value: T, index: number, iter: this) => boolean,
    context?: any)
    : number;

    /**
     * Returns the last index in the Collection where a value satisfies the
     * provided predicate function. Otherwise -1 is returned.
     */
    findLastIndex(
    predicate: (value: T, index: number, iter: this) => boolean,
    context?: any)
    : number;

    // Sequence algorithms

    /**
     * Returns a new Collection with other collections concatenated to this one.
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Collection.Indexed<T | C>;

    /**
     * Returns a new Collection.Indexed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Collection } = require('immutable')
     * Collection.Indexed([1,2]).map(x => 10 * x)
     * // Seq [ 1, 2 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: number, iter: this) => M,
    context?: any)
    : Collection.Indexed<M>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: number, iter: this) => Iterable<M>,
    context?: any)
    : Collection.Indexed<M>;

    /**
     * Returns a new Collection with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, index: number, iter: this) => value is F,
    context?: any)
    : Collection.Indexed<F>;
    filter(
    predicate: (value: T, index: number, iter: this) => any,
    context?: any)
    : this;

    [Symbol.iterator](): IterableIterator<T>;}



  /**
   * Set Collections only represent values. They have no associated keys or
   * indices. Duplicate values are possible in the lazy `Seq.Set`s, however
   * the concrete `Set` Collection does not allow duplicate values.
   *
   * Collection methods on Collection.Set such as `map` and `forEach` will provide
   * the value as both the first and second arguments to the provided function.
   *
   * ```js
   * const { Collection } = require('immutable')
   * const seq = Collection.Set([ 'A', 'B', 'C' ])
   * // Seq { "A", "B", "C" }
   * seq.forEach((v, k) =>
   *  assert.equal(v, k)
   * )
   * ```
   */
  namespace Set {}

  /**
   * Similar to `Collection()`, but always returns a Collection.Set.
   *
   * Note: `Collection.Set` is a factory function and not a class, and does
   * not use the `new` keyword during construction.
   */
  function Set<T>(collection: Iterable<T>): Collection.Set<T>;

  interface Set<T> extends Collection<T, T> {
    /**
     * Deeply converts this Set collection to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Set collection to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    /**
     * Returns Seq.Set.
     * @override
     */
    toSeq(): Seq.Set<T>;

    // Sequence algorithms

    /**
     * Returns a new Collection with other collections concatenated to this one.
     */
    concat<U>(...collections: Array<Iterable<U>>): Collection.Set<T | U>;

    /**
     * Returns a new Collection.Set with values passed through a
     * `mapper` function.
     *
     * ```
     * Collection.Set([ 1, 2 ]).map(x => 10 * x)
     * // Seq { 1, 2 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: T, iter: this) => M,
    context?: any)
    : Collection.Set<M>;

    /**
     * Flat-maps the Collection, returning a Collection of the same type.
     *
     * Similar to `collection.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: T, iter: this) => Iterable<M>,
    context?: any)
    : Collection.Set<M>;

    /**
     * Returns a new Collection with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, key: T, iter: this) => value is F,
    context?: any)
    : Collection.Set<F>;
    filter(
    predicate: (value: T, key: T, iter: this) => any,
    context?: any)
    : this;

    [Symbol.iterator](): IterableIterator<T>;}}




declare interface Collection<K, V> extends ValueObject {

  // Value equality

  /**
   * True if this and the other Collection have value equality, as defined
   * by `Immutable.is()`.
   *
   * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
   * allow for chained expressions.
   */
  equals(other: any): boolean;

  /**
   * Computes and returns the hashed identity for this Collection.
   *
   * The `hashCode` of a Collection is used to determine potential equality,
   * and is used when adding this to a `Set` or as a key in a `Map`, enabling
   * lookup via a different instance.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Set,  List } = require('immutable')" }
   * -->
   * ```js
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 1, 2, 3 ]);
   * assert.notStrictEqual(a, b); // different instances
   * const set = Set([ a ]);
   * assert.equal(set.has(b), true);
   * ```
   *
   * If two values have the same `hashCode`, they are [not guaranteed
   * to be equal][Hash Collision]. If two values have different `hashCode`s,
   * they must not be equal.
   *
   * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
   */
  hashCode(): number;


  // Reading values

  /**
   * Returns the value associated with the provided key, or notSetValue if
   * the Collection does not contain this key.
   *
   * Note: it is possible a key may be associated with an `undefined` value,
   * so if `notSetValue` is not provided and this method returns `undefined`,
   * that does not guarantee the key was not found.
   */
  get<NSV>(key: K, notSetValue: NSV): V | NSV;
  get(key: K): V | undefined;

  /**
   * True if a key exists within this `Collection`, using `Immutable.is`
   * to determine equality
   */
  has(key: K): boolean;

  /**
   * True if a value exists within this `Collection`, using `Immutable.is`
   * to determine equality
   * @alias contains
   */
  includes(value: V): boolean;
  contains(value: V): boolean;

  /**
   * In case the `Collection` is not empty returns the first element of the
   * `Collection`.
   * In case the `Collection` is empty returns the optional default
   * value if provided, if no default value is provided returns undefined.
   */
  first<NSV>(notSetValue?: NSV): V | NSV;

  /**
   * In case the `Collection` is not empty returns the last element of the
   * `Collection`.
   * In case the `Collection` is empty returns the optional default
   * value if provided, if no default value is provided returns undefined.
   */
  last<NSV>(notSetValue?: NSV): V | NSV;

  // Reading deep values

  /**
   * Returns the value found by following a path of keys or indices through
   * nested Collections.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * const deepData = Map({ x: List([ Map({ y: 123 }) ]) });
   * deepData.getIn(['x', 0, 'y']) // 123
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and getIn() can access those values as well:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * const deepData = Map({ x: [ { y: 123 } ] });
   * deepData.getIn(['x', 0, 'y']) // 123
   * ```
   */
  getIn(searchKeyPath: Iterable<any>, notSetValue?: any): any;

  /**
   * True if the result of following a path of keys or indices through nested
   * Collections results in a set value.
   */
  hasIn(searchKeyPath: Iterable<any>): boolean;

  // Persistent changes

  /**
   * This can be very useful as a way to "chain" a normal function into a
   * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
   *
   * For example, to sum a Seq after mapping and filtering:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Seq } = require('immutable')
   *
   * function sum(collection) {
   *   return collection.reduce((sum, x) => sum + x, 0)
   * }
   *
   * Seq([ 1, 2, 3 ])
   *   .map(x => x + 1)
   *   .filter(x => x % 2 === 0)
   *   .update(sum)
   * // 6
   * ```
   */
  update<R>(updater: (value: this) => R): R;


  // Conversion to JavaScript types

  /**
   * Deeply converts this Collection to equivalent native JavaScript Array or Object.
   *
   * `Collection.Indexed`, and `Collection.Set` become `Array`, while
   * `Collection.Keyed` become `Object`, converting keys to Strings.
   */
  toJS(): Array<any> | {[key: string]: any;};

  /**
   * Shallowly converts this Collection to equivalent native JavaScript Array or Object.
   *
   * `Collection.Indexed`, and `Collection.Set` become `Array`, while
   * `Collection.Keyed` become `Object`, converting keys to Strings.
   */
  toJSON(): Array<V> | {[key: string]: V;};

  /**
   * Shallowly converts this collection to an Array.
   *
   * `Collection.Indexed`, and `Collection.Set` produce an Array of values.
   * `Collection.Keyed` produce an Array of [key, value] tuples.
   */
  toArray(): Array<V> | Array<[K, V]>;

  /**
   * Shallowly converts this Collection to an Object.
   *
   * Converts keys to Strings.
   */
  toObject(): {[key: string]: V;};


  // Conversion to Collections

  /**
   * Converts this Collection to a Map, Throws if keys are not hashable.
   *
   * Note: This is equivalent to `Map(this.toKeyedSeq())`, but provided
   * for convenience and to allow for chained expressions.
   */
  toMap(): Map_2<K, V>;

  /**
   * Converts this Collection to a Map, maintaining the order of iteration.
   *
   * Note: This is equivalent to `OrderedMap(this.toKeyedSeq())`, but
   * provided for convenience and to allow for chained expressions.
   */
  toOrderedMap(): OrderedMap<K, V>;

  /**
   * Converts this Collection to a Set, discarding keys. Throws if values
   * are not hashable.
   *
   * Note: This is equivalent to `Set(this)`, but provided to allow for
   * chained expressions.
   */
  toSet(): Set_2<V>;

  /**
   * Converts this Collection to a Set, maintaining the order of iteration and
   * discarding keys.
   *
   * Note: This is equivalent to `OrderedSet(this.valueSeq())`, but provided
   * for convenience and to allow for chained expressions.
   */
  toOrderedSet(): OrderedSet<V>;

  /**
   * Converts this Collection to a List, discarding keys.
   *
   * This is similar to `List(collection)`, but provided to allow for chained
   * expressions. However, when called on `Map` or other keyed collections,
   * `collection.toList()` discards the keys and creates a list of only the
   * values, whereas `List(collection)` creates a list of entry tuples.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * var myMap = Map({ a: 'Apple', b: 'Banana' })
   * List(myMap) // List [ [ "a", "Apple" ], [ "b", "Banana" ] ]
   * myMap.toList() // List [ "Apple", "Banana" ]
   * ```
   */
  toList(): List<V>;

  /**
   * Converts this Collection to a Stack, discarding keys. Throws if values
   * are not hashable.
   *
   * Note: This is equivalent to `Stack(this)`, but provided to allow for
   * chained expressions.
   */
  toStack(): Stack<V>;


  // Conversion to Seq

  /**
   * Converts this Collection to a Seq of the same kind (indexed,
   * keyed, or set).
   */
  toSeq(): Seq<K, V>;

  /**
   * Returns a Seq.Keyed from this Collection where indices are treated as keys.
   *
   * This is useful if you want to operate on an
   * Collection.Indexed and preserve the [index, value] pairs.
   *
   * The returned Seq will have identical iteration order as
   * this Collection.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Seq } = require('immutable')
   * const indexedSeq = Seq([ 'A', 'B', 'C' ])
   * // Seq [ "A", "B", "C" ]
   * indexedSeq.filter(v => v === 'B')
   * // Seq [ "B" ]
   * const keyedSeq = indexedSeq.toKeyedSeq()
   * // Seq { 0: "A", 1: "B", 2: "C" }
   * keyedSeq.filter(v => v === 'B')
   * // Seq { 1: "B" }
   * ```
   */
  toKeyedSeq(): Seq.Keyed<K, V>;

  /**
   * Returns an Seq.Indexed of the values of this Collection, discarding keys.
   */
  toIndexedSeq(): Seq.Indexed<V>;

  /**
   * Returns a Seq.Set of the values of this Collection, discarding keys.
   */
  toSetSeq(): Seq.Set<V>;


  // Iterators

  /**
   * An iterator of this `Collection`'s keys.
   *
   * Note: this will return an ES6 iterator which does not support
   * Immutable.js sequence algorithms. Use `keySeq` instead, if this is
   * what you want.
   */
  keys(): IterableIterator<K>;

  /**
   * An iterator of this `Collection`'s values.
   *
   * Note: this will return an ES6 iterator which does not support
   * Immutable.js sequence algorithms. Use `valueSeq` instead, if this is
   * what you want.
   */
  values(): IterableIterator<V>;

  /**
   * An iterator of this `Collection`'s entries as `[ key, value ]` tuples.
   *
   * Note: this will return an ES6 iterator which does not support
   * Immutable.js sequence algorithms. Use `entrySeq` instead, if this is
   * what you want.
   */
  entries(): IterableIterator<[K, V]>;


  // Collections (Seq)

  /**
   * Returns a new Seq.Indexed of the keys of this Collection,
   * discarding values.
   */
  keySeq(): Seq.Indexed<K>;

  /**
   * Returns an Seq.Indexed of the values of this Collection, discarding keys.
   */
  valueSeq(): Seq.Indexed<V>;

  /**
   * Returns a new Seq.Indexed of [key, value] tuples.
   */
  entrySeq(): Seq.Indexed<[K, V]>;


  // Sequence algorithms

  /**
   * Returns a new Collection of the same type with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Collection } = require('immutable')
   * Collection({ a: 1, b: 2 }).map(x => 10 * x)
   * // Seq { "a": 10, "b": 20 }
   * ```
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Collection<K, M>;

  /**
   * Note: used only for sets, which return Collection<M, M> but are otherwise
   * identical to normal `map()`.
   *
   * @ignore
   */
  map<M>(...args: never[]): any;

  /**
   * Returns a new Collection of the same type with only the entries for which
   * the `predicate` function returns true.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ a: 1, b: 2, c: 3, d: 4}).filter(x => x % 2 === 0)
   * // Map { "b": 2, "d": 4 }
   * ```
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : Collection<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type with only the entries for which
   * the `predicate` function returns false.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ a: 1, b: 2, c: 3, d: 4}).filterNot(x => x % 2 === 0)
   * // Map { "a": 1, "c": 3 }
   * ```
   *
   * Note: `filterNot()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filterNot(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type in reverse order.
   */
  reverse(): this;

  /**
   * Returns a new Collection of the same type which includes the same entries,
   * stably sorted by using a `comparator`.
   *
   * If a `comparator` is not provided, a default comparator uses `<` and `>`.
   *
   * `comparator(valueA, valueB)`:
   *
   *   * Returns `0` if the elements should not be swapped.
   *   * Returns `-1` (or any negative number) if `valueA` comes before `valueB`
   *   * Returns `1` (or any positive number) if `valueA` comes after `valueB`
   *   * Is pure, i.e. it must always return the same value for the same pair
   *     of values.
   *
   * When sorting collections which have no defined order, their ordered
   * equivalents will be returned. e.g. `map.sort()` returns OrderedMap.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ "c": 3, "a": 1, "b": 2 }).sort((a, b) => {
   *   if (a < b) { return -1; }
   *   if (a > b) { return 1; }
   *   if (a === b) { return 0; }
   * });
   * // OrderedMap { "a": 1, "b": 2, "c": 3 }
   * ```
   *
   * Note: `sort()` Always returns a new instance, even if the original was
   * already sorted.
   *
   * Note: This is always an eager operation.
   */
  sort(comparator?: (valueA: V, valueB: V) => number): this;

  /**
   * Like `sort`, but also accepts a `comparatorValueMapper` which allows for
   * sorting by more sophisticated means:
   *
   *     hitters.sortBy(hitter => hitter.avgHits)
   *
   * Note: `sortBy()` Always returns a new instance, even if the original was
   * already sorted.
   *
   * Note: This is always an eager operation.
   */
  sortBy<C>(
  comparatorValueMapper: (value: V, key: K, iter: this) => C,
  comparator?: (valueA: C, valueB: C) => number)
  : this;

  /**
   * Returns a `Collection.Keyed` of `Collection.Keyeds`, grouped by the return
   * value of the `grouper` function.
   *
   * Note: This is always an eager operation.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List, Map } = require('immutable')
   * const listOfMaps = List([
   *   Map({ v: 0 }),
   *   Map({ v: 1 }),
   *   Map({ v: 1 }),
   *   Map({ v: 0 }),
   *   Map({ v: 2 })
   * ])
   * const groupsOfMaps = listOfMaps.groupBy(x => x.get('v'))
   * // Map {
   * //   0: List [ Map{ "v": 0 }, Map { "v": 0 } ],
   * //   1: List [ Map{ "v": 1 }, Map { "v": 1 } ],
   * //   2: List [ Map{ "v": 2 } ],
   * // }
   * ```
   */
  groupBy<G>(
  grouper: (value: V, key: K, iter: this) => G,
  context?: any)
  : /*Map*/Seq.Keyed<G, /*this*/Collection<K, V>>;


  // Side effects

  /**
   * The `sideEffect` is executed for every entry in the Collection.
   *
   * Unlike `Array#forEach`, if any call of `sideEffect` returns
   * `false`, the iteration will stop. Returns the number of entries iterated
   * (including the last iteration which returned false).
   */
  forEach(
  sideEffect: (value: V, key: K, iter: this) => any,
  context?: any)
  : number;


  // Creating subsets

  /**
   * Returns a new Collection of the same type representing a portion of this
   * Collection from start up to but not including end.
   *
   * If begin is negative, it is offset from the end of the Collection. e.g.
   * `slice(-2)` returns a Collection of the last two entries. If it is not
   * provided the new Collection will begin at the beginning of this Collection.
   *
   * If end is negative, it is offset from the end of the Collection. e.g.
   * `slice(0, -1)` returns a Collection of everything but the last entry. If
   * it is not provided, the new Collection will continue through the end of
   * this Collection.
   *
   * If the requested slice is equivalent to the current Collection, then it
   * will return itself.
   */
  slice(begin?: number, end?: number): this;

  /**
   * Returns a new Collection of the same type containing all entries except
   * the first.
   */
  rest(): this;

  /**
   * Returns a new Collection of the same type containing all entries except
   * the last.
   */
  butLast(): this;

  /**
   * Returns a new Collection of the same type which excludes the first `amount`
   * entries from this Collection.
   */
  skip(amount: number): this;

  /**
   * Returns a new Collection of the same type which excludes the last `amount`
   * entries from this Collection.
   */
  skipLast(amount: number): this;

  /**
   * Returns a new Collection of the same type which includes entries starting
   * from when `predicate` first returns false.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .skipWhile(x => x.match(/g/))
   * // List [ "cat", "hat", "god"" ]
   * ```
   */
  skipWhile(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type which includes entries starting
   * from when `predicate` first returns true.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .skipUntil(x => x.match(/hat/))
   * // List [ "hat", "god"" ]
   * ```
   */
  skipUntil(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type which includes the first `amount`
   * entries from this Collection.
   */
  take(amount: number): this;

  /**
   * Returns a new Collection of the same type which includes the last `amount`
   * entries from this Collection.
   */
  takeLast(amount: number): this;

  /**
   * Returns a new Collection of the same type which includes entries from this
   * Collection as long as the `predicate` returns true.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .takeWhile(x => x.match(/o/))
   * // List [ "dog", "frog" ]
   * ```
   */
  takeWhile(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;

  /**
   * Returns a new Collection of the same type which includes entries from this
   * Collection as long as the `predicate` returns false.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * List([ 'dog', 'frog', 'cat', 'hat', 'god' ])
   *   .takeUntil(x => x.match(/at/))
   * // List [ "dog", "frog" ]
   * ```
   */
  takeUntil(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : this;


  // Combination

  /**
   * Returns a new Collection of the same type with other values and
   * collection-like concatenated to this one.
   *
   * For Seqs, all entries will be present in the resulting Seq, even if they
   * have the same key.
   */
  concat(...valuesOrCollections: Array<any>): Collection<any, any>;

  /**
   * Flattens nested Collections.
   *
   * Will deeply flatten the Collection by default, returning a Collection of the
   * same type, but a `depth` can be provided in the form of a number or
   * boolean (where true means to shallowly flatten one level). A depth of 0
   * (or shallow: false) will deeply flatten.
   *
   * Flattens only others Collection, not Arrays or Objects.
   *
   * Note: `flatten(true)` operates on Collection<any, Collection<K, V>> and
   * returns Collection<K, V>
   */
  flatten(depth?: number): Collection<any, any>;
  flatten(shallow?: boolean): Collection<any, any>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: V, key: K, iter: this) => Iterable<M>,
  context?: any)
  : Collection<K, M>;

  /**
   * Flat-maps the Collection, returning a Collection of the same type.
   *
   * Similar to `collection.map(...).flatten(true)`.
   * Used for Dictionaries only.
   */
  flatMap<KM, VM>(
  mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
  context?: any)
  : Collection<KM, VM>;

  // Reducing a value

  /**
   * Reduces the Collection to a value by calling the `reducer` for every entry
   * in the Collection and passing along the reduced value.
   *
   * If `initialReduction` is not provided, the first item in the
   * Collection will be used.
   *
   * @see `Array#reduce`.
   */
  reduce<R>(
  reducer: (reduction: R, value: V, key: K, iter: this) => R,
  initialReduction: R,
  context?: any)
  : R;
  reduce<R>(
  reducer: (reduction: V | R, value: V, key: K, iter: this) => R)
  : R;

  /**
   * Reduces the Collection in reverse (from the right side).
   *
   * Note: Similar to this.reverse().reduce(), and provided for parity
   * with `Array#reduceRight`.
   */
  reduceRight<R>(
  reducer: (reduction: R, value: V, key: K, iter: this) => R,
  initialReduction: R,
  context?: any)
  : R;
  reduceRight<R>(
  reducer: (reduction: V | R, value: V, key: K, iter: this) => R)
  : R;

  /**
   * True if `predicate` returns true for all entries in the Collection.
   */
  every(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : boolean;

  /**
   * True if `predicate` returns true for any entry in the Collection.
   */
  some(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : boolean;

  /**
   * Joins values together as a string, inserting a separator between each.
   * The default separator is `","`.
   */
  join(separator?: string): string;

  /**
   * Returns true if this Collection includes no values.
   *
   * For some lazy `Seq`, `isEmpty` might need to iterate to determine
   * emptiness. At most one iteration will occur.
   */
  isEmpty(): boolean;

  /**
   * Returns the size of this Collection.
   *
   * Regardless of if this Collection can describe its size lazily (some Seqs
   * cannot), this method will always return the correct size. E.g. it
   * evaluates a lazy `Seq` if necessary.
   *
   * If `predicate` is provided, then this returns the count of entries in the
   * Collection for which the `predicate` returns true.
   */
  count(): number;
  count(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : number;

  /**
   * Returns a `Seq.Keyed` of counts, grouped by the return value of
   * the `grouper` function.
   *
   * Note: This is not a lazy operation.
   */
  countBy<G>(
  grouper: (value: V, key: K, iter: this) => G,
  context?: any)
  : Map_2<G, number>;


  // Search for value

  /**
   * Returns the first value for which the `predicate` returns true.
   */
  find(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : V | undefined;

  /**
   * Returns the last value for which the `predicate` returns true.
   *
   * Note: `predicate` will be called for each entry in reverse.
   */
  findLast(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : V | undefined;

  /**
   * Returns the first [key, value] entry for which the `predicate` returns true.
   */
  findEntry(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : [K, V] | undefined;

  /**
   * Returns the last [key, value] entry for which the `predicate`
   * returns true.
   *
   * Note: `predicate` will be called for each entry in reverse.
   */
  findLastEntry(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any,
  notSetValue?: V)
  : [K, V] | undefined;

  /**
   * Returns the key for which the `predicate` returns true.
   */
  findKey(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : K | undefined;

  /**
   * Returns the last key for which the `predicate` returns true.
   *
   * Note: `predicate` will be called for each entry in reverse.
   */
  findLastKey(
  predicate: (value: V, key: K, iter: this) => boolean,
  context?: any)
  : K | undefined;

  /**
   * Returns the key associated with the search value, or undefined.
   */
  keyOf(searchValue: V): K | undefined;

  /**
   * Returns the last key associated with the search value, or undefined.
   */
  lastKeyOf(searchValue: V): K | undefined;

  /**
   * Returns the maximum value in this collection. If any values are
   * comparatively equivalent, the first one found will be returned.
   *
   * The `comparator` is used in the same way as `Collection#sort`. If it is not
   * provided, the default comparator is `>`.
   *
   * When two values are considered equivalent, the first encountered will be
   * returned. Otherwise, `max` will operate independent of the order of input
   * as long as the comparator is commutative. The default comparator `>` is
   * commutative *only* when types do not differ.
   *
   * If `comparator` returns 0 and either value is NaN, undefined, or null,
   * that value will be returned.
   */
  max(comparator?: (valueA: V, valueB: V) => number): V | undefined;

  /**
   * Like `max`, but also accepts a `comparatorValueMapper` which allows for
   * comparing by more sophisticated means:
   *
   *     hitters.maxBy(hitter => hitter.avgHits);
   *
   */
  maxBy<C>(
  comparatorValueMapper: (value: V, key: K, iter: this) => C,
  comparator?: (valueA: C, valueB: C) => number)
  : V | undefined;

  /**
   * Returns the minimum value in this collection. If any values are
   * comparatively equivalent, the first one found will be returned.
   *
   * The `comparator` is used in the same way as `Collection#sort`. If it is not
   * provided, the default comparator is `<`.
   *
   * When two values are considered equivalent, the first encountered will be
   * returned. Otherwise, `min` will operate independent of the order of input
   * as long as the comparator is commutative. The default comparator `<` is
   * commutative *only* when types do not differ.
   *
   * If `comparator` returns 0 and either value is NaN, undefined, or null,
   * that value will be returned.
   */
  min(comparator?: (valueA: V, valueB: V) => number): V | undefined;

  /**
   * Like `min`, but also accepts a `comparatorValueMapper` which allows for
   * comparing by more sophisticated means:
   *
   *     hitters.minBy(hitter => hitter.avgHits);
   *
   */
  minBy<C>(
  comparatorValueMapper: (value: V, key: K, iter: this) => C,
  comparator?: (valueA: C, valueB: C) => number)
  : V | undefined;


  // Comparison

  /**
   * True if `iter` includes every value in this Collection.
   */
  isSubset(iter: Iterable<V>): boolean;

  /**
   * True if this Collection includes every value in `iter`.
   */
  isSuperset(iter: Iterable<V>): boolean;}


/**
 * @classdesc
 * Color objects are used in annotations for defining colors. We're using an rgb representation
 * internally with the `r`, `g`, `b` values clipped between `0` and `255` inclusive, and a `transparent`
 * flag that can be used to indicate that the color is transparent, in which case the provided `r`, `g`,
 * and `b` values are ignored and set to `0` in the instantiated `Color`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `color.set("r", 255)`.
 *
 * However, in order to obtain a transparent color the static `TRANSPARENT` value should be used instead.
 *
 * The difference between using `Color.TRANSPARENT` and `null` as values for annotation color properties
 * may depend on the context; if the annotation is being created or updated:
 * - If an annotation with a non-transparent color value is updated to have a color value of `Color.TRANSPARENT`,
 * the color value will be updated and be transparent.
 * - But if that same annotation is updated to have a color value of `null`, the color change will not be saved
 * to the document, although it may appear as transparent in the viewer.
 *
 * To avoid inconsistencies, it is recommended to always use `Color.TRANSPARENT` instead of `null` when updating
 * annotations.
 * @example <caption>Create and update a color</caption>
 * var color = new NutrientViewer.Color({ r: 245, g: 0, b: 0 });
 * color = color.set("r", 255);
 * color.r; // => 255
 * @public
 * @memberof NutrientViewer
 * @summary A simple RGB color value.
 * @class Color
 * @param {object} args An object used to initialize the color. If `r`, `g` or `b` is omitted, `0`
 *        will be used instead.
 * @default { r: 0, g: 0, b: 0, transparent: false }
 * @extends Immutable.Record
 */
export declare class Color extends Color_base {
  /**
   * Simple black (CSS: `rgb(0, 0, 0)`)
   * @public
   * @member {NutrientViewer.Color} BLACK
   * @memberof NutrientViewer.Color
   */
  static BLACK: Color;
  /**
   * Grey (CSS: `rgb(128, 128, 128)`)
   * @public
   * @member {NutrientViewer.Color} GREY
   * @memberof NutrientViewer.Color
   */
  static GREY: Color;
  /**
   * Simple white (CSS: `rgb(255, 255, 255)`)
   * @public
   * @member {NutrientViewer.Color} WHITE
   * @memberof NutrientViewer.Color
   */
  static WHITE: Color;
  /**
   * Blue (CSS: `rgb(36, 131, 199)`)
   * @public
   * @member {NutrientViewer.Color} BLUE
   * @memberof NutrientViewer.Color
   */
  static DARK_BLUE: Color;
  /**
   * Red (CSS: `rgb(248, 36, 0)`)
   * @public
   * @member {NutrientViewer.Color} RED
   * @memberof NutrientViewer.Color
   */
  static RED: Color;
  /**
   * Purple (CSS: `rgb(255, 0, 255)`)
   * @public
   * @member {NutrientViewer.Color} PURPLE
   * @memberof NutrientViewer.Color
   */
  static PURPLE: Color;
  /**
   * Pink (CSS: `rgb(255, 114, 147)`)
   * @public
   * @member {NutrientViewer.Color} PINK
   * @memberof NutrientViewer.Color
   */
  static PINK: Color;
  /**
   * Green (CSS: `rgb(110, 176, 0)`)
   * @public
   * @member {NutrientViewer.Color} GREEN
   * @memberof NutrientViewer.Color
   */
  static GREEN: Color;
  /**
   * Orange (CSS: `rgb(243, 149, 0)`)
   * @public
   * @member {NutrientViewer.Color} ORANGE
   * @memberof NutrientViewer.Color
   */
  static ORANGE: Color;
  /**
   * Yellow (CSS: `rgb(255, 255, 0)`)
   * @public
   * @member {NutrientViewer.Color} YELLOW
   * @memberof NutrientViewer.Color
   */
  static YELLOW: Color;
  /**
   * Light blue (CSS: `rgb(141, 184, 255)`)
   * @public
   * @member {NutrientViewer.Color} LIGHT_BLUE
   * @memberof NutrientViewer.Color
   */
  static LIGHT_BLUE: Color;
  /**
   * Light red (CSS: `rgb(247, 141, 138)`)
   * @public
   * @member {NutrientViewer.Color} LIGHT_RED
   * @memberof NutrientViewer.Color
   */
  static LIGHT_RED: Color;
  /**
   * Light green (CSS: `rgb(162, 250, 123)`)
   * @public
   * @member {NutrientViewer.Color} LIGHT_GREEN
   * @memberof NutrientViewer.Color
   */
  static LIGHT_GREEN: Color;
  /**
   * Light yellow (CSS: `rgb(252, 238, 124)`)
   * @public
   * @member {NutrientViewer.Color} LIGHT_YELLOW
   * @memberof NutrientViewer.Color
   */
  static LIGHT_YELLOW: Color;
  /**
   * Blue (CSS: `rgb(34, 147, 251)`)
   * @public
   * @member {NutrientViewer.Color} BLUE
   * @memberof NutrientViewer.Color
   */
  static BLUE: Color;
  /**
   * Light orange (CSS: `rgb(255, 139, 94)`)
   * @public
   * @member {NutrientViewer.Color} LIGHT_ORANGE
   * @memberof NutrientViewer.Color
   */
  static LIGHT_ORANGE: Color;
  /**
   * Light grey (CSS: `rgb(192, 192, 192)`)
   * @public
   * @member {NutrientViewer.Color} LIGHT_GREY
   * @memberof NutrientViewer.Color
   */
  static LIGHT_GREY: Color;
  /**
   * Dark grey (CSS: `rgb(64, 64, 64)`)
   * @public
   * @member {NutrientViewer.Color} DARK_GREY
   * @memberof NutrientViewer.Color
   */
  static DARK_GREY: Color;
  /**
   * Mauve (CSS: `rgb(245, 135, 255)`)
   * @public
   * @member {NutrientViewer.Color} MAUVE
   * @memberof NutrientViewer.Color
   */
  static MAUVE: Color;
  /**
   * Transparent (CSS: `transparent`)
   * @public
   * @member {NutrientViewer.Color} TRANSPARENT
   * @memberof NutrientViewer.Color
   */
  static TRANSPARENT: Color;
  /**
   * Converts a hex color value to a Color instance.
   * @public
   * @function fromHex
   * @memberof NutrientViewer.Color
   * @param {string} hexColor The hex color value to convert.
   * @returns {NutrientViewer.Color} A Color instance.
   */
  static fromHex: (hexColor: string) => Color;
  constructor(args: {
    r?: number;
    g?: number;
    b?: number;
    transparent?: boolean;});

  /**
   * Returns a lighter version of the current Color.
   * @example
   * const color = NutrientViewer.Color.RED.lighter(50);
   * @public
   * @instance
   * @function lighter
   * @memberof NutrientViewer.Color
   * @param {number} percent The percentage of lightness between 0 and 100.
   * @returns {Color} A Color with the new values.
   */
  lighter(percent: number): Color;
  /**
   * Returns a darker version of the current Color.
   * @example
   * const color = NutrientViewer.Color.RED.darker(50);
   * @public
   * @instance
   * @function darker
   * @memberof NutrientViewer.Color
   * @param {number} percent The percentage of lightness between 0 and 100.
   * @returns {Color} A Color with the new values.
   */
  darker(percent: number): Color;
  /**
   * Returns true if the provided color or object and the current Color have the same RGB values.
   * @example
   * const color = NutrientViewer.Color.RED.equals({ r: 248, g: 36, b: 0 });
   * @public
   * @instance
   * @function equals
   * @memberof NutrientViewer.Color
   * @param {Color | { r: number, g: number, b: number }} color Color instance or RGB object.
   * @returns {boolean} True if equal, false otherwise.
   */
  equals(color: Color | {
    r: number;
    g: number;
    b: number;
    transparent: boolean;})
  : boolean;
  /**
   * Modifies the saturation of the Color and returns a new one.
   * @example
   * const color = NutrientViewer.Color.RED.saturate(50);
   * @public
   * @instance
   * @function saturate
   * @memberof NutrientViewer.Color
   * @param {number} percent The percentage of saturation between 0 and 100.
   * @returns {Color} A Color with the new values.
   */
  saturate(percent: number): Color;
  sRGBToRGBComponent(RGBComponent: number): number;
  relativeLuminance(): number;
  contrastRatio(color: Color): number;
  /**
   * Converts the color to a CSS value (e.g. `rgb(255, 0, 0)`).
   * @example
   * NutrientViewer.Color.RED.toCSSValue(); // => 'rgb(248, 36, 0)'
   * @public
   * @instance
   * @function toCSSValue
   * @memberof NutrientViewer.Color
   * @returns {string} A CSS color value in `rgb` format.
   */
  toCSSValue(): string;
  /**
   * Converts the color to a Hex value (e.g. `#000000`).
   * @example
   * NutrientViewer.Color.RED.toHex(); // => '#f82400'
   * @public
   * @instance
   * @function toHex
   * @memberof NutrientViewer.Color
   * @returns {string} A CSS color value in `hex` format.
   */
  toHex(): string;}


declare const Color_base: Record_2.Factory<{
  /**
   * The red value of the color.
   * @public
   * @instance
   * @member {number} r
   * @memberof NutrientViewer.Color
   * @default 0
   */
  r: number;
  /**
   * The green value of the color.
   * @public
   * @instance
   * @member {number} g
   * @memberof NutrientViewer.Color
   * @default 0
   */
  g: number;
  /**
   * The blue value of the color.
   * @public
   * @instance
   * @member {number} b
   * @memberof NutrientViewer.Color
   * @default 0
   */
  b: number;
  /**
   * Transparency of the color.
   * @public
   * @instance
   * @member {boolean} transparent
   * @memberof NutrientViewer.Color
   * @default false
   */
  transparent: boolean;}>;


declare type ColorPreset = {
  color: Color | null;
  localization: {
    id: string;
    defaultMessage?: string;
    description?: string;};};



/**
 * @classdesc
 *
 * A combo box is a drop down box with the option to add custom entries
 * (see {@link NutrientViewer.FormFields.ComboBoxFormField#edit}).
 *
 * Please note that {@link NutrientViewer.Instance#getFormFieldValues} will not return
 * the latest value for this field until the user leaves this field by default. If you
 * want this value to update on every change then set the {@link NutrientViewer.FormFields.ChoiceFormField#commitOnChange}) to
 * true.
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary A drop down box with the option to add custom entries.
 * @class ComboBoxFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.FormField
 */
export declare class ComboBoxFormField extends ChoiceFormField {
  /**
   * If true, the combo box includes an editable text box as well as a drop-down list. Otherwise, it
   * includes only a drop-down list.
   * @public
   * @instance
   * @member {boolean} edit
   * @memberof NutrientViewer.FormFields.ComboBoxFormField
   * @default false
   */
  edit: boolean;
  /**
   * If true, text entered in the field is not spell-checked.
   * @public
   * @instance
   * @member {boolean} doNotSpellCheck
   * @memberof NutrientViewer.FormFields.ComboBoxFormField
   * @default false
   */
  doNotSpellCheck: boolean;
  static defaultValues: IObject;}

declare type ComboBoxFormFieldJSON = ChoiceFormFieldJSON & {
  type: 'pspdfkit/form-field/combobox';
  edit: boolean;} &
DoNotSpellCheckPropertyPair;

/**
 * @classdesc
 * A text comment made by the user that stems from an existing root annotation.
 * @public
 * @memberof NutrientViewer
 * @summary Comment element.
 * @class Comment
 * @noconstructor
 * @extends Immutable.Record
 */
declare class Comment_2 extends Comment_base {
  /**
   * Comment serializer. Converts a comment to a InstantJSON compliant object.
   * @public
   * @function toSerializableObject
   * @memberof NutrientViewer.Comment
   * @param {NutrientViewer.Comment}
   * @returns {object}
   */
  static toSerializableObject: (comment: Comment_2) => CommentJSON;
  /**
   * Comment deserializer. Converts a comment object to a {@link NutrientViewer.Comment}.
   * @public
   * @function fromSerializableObject
   * @memberof NutrientViewer.Comment
   * @param {object}
   * @returns {NutrientViewer.Comment}
   */
  static fromSerializableObject: (comment: CommentJSON) => Comment_2;
  /**
   * A method that returns a set of user IDs that are mentioned in the comment.
   * @example
   * const ids = comment.getMentionedUserIds()
   * @public
   * @instance
   * @function getMentionedUserIds
   * @returns {Immutable.Set<string>} A immutable set of user IDs that are mentioned in the comment.
   * @memberof NutrientViewer.Comment
   */
  getMentionedUserIds(): Immutable.Set<string>;}
export { Comment_2 as Comment };

declare const Comment_base: Immutable.Record.Factory<CommentProps>;

/**
 * A specific comment display mode that will always be applied when the visible part of the document contains comments.
 *
 * In mobile devices, comments are always displayed in a drawer a the bottom of the viewport
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.CommentDisplay} FITTING Comments are displayed in a dialog or floating depending on the available viewport space.
 * @property {NutrientViewer.CommentDisplay} POPOVER Comments are displayed in a popover dialog next to their reference annotation marker.
 * @property {NutrientViewer.CommentDisplay} FLOATING Comments are displayed floating next to the page side, at the same height as their reference annotation marker, except when `ViewState#zoom` is set to `ZoomeMode#FIT_TO_WIDTH`, in which case they are displayed in a popover dialog instead.
 */
export declare const CommentDisplay: {
  readonly FITTING: "FITTING";
  readonly POPOVER: "POPOVER";
  readonly FLOATING: "FLOATING";};


declare type CommentJSON = {
  id?: string | null;
  type: 'pspdfkit/comment';
  v: 2;
  rootId: string | number | null;
  pageIndex: number | null;
  pdfObjectId?: number | null;
  creatorName?: string | null;
  name?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  text: {
    value: string | null;
    format: 'xhtml' | 'plain';};

  customData?: {
    [key: string]: unknown;} |
  null;
  isAnonymous?: boolean | null;} &
ICollaboratorPermissionsOptions;

/**
 * @classdesc
 * Annotation specific to NutrientViewer that defines a general root annotation type
 * for comments to originate from, which can be placed at an arbitrary location
 * in the document.
 *
 * See our
 * {@link https://www.nutrient.io/guides/web/current/comments/introduction-to-instant-comments/|Instant Comments guide article}.
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Root annotation used for comments.
 * @class CommentMarkerAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 */
export declare class CommentMarkerAnnotation extends Annotation {
  static readableName: string;}


declare type CommentMarkerAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/comment-marker';};

declare class CommentMarkerAnnotationSerializer extends AnnotationSerializer {
  annotation: CommentMarkerAnnotation;
  constructor(annotation: CommentMarkerAnnotation);
  toJSON(): CommentMarkerAnnotationJSON;
  static fromJSON(id: InstantID | null, json: Omit<CommentMarkerAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): CommentMarkerAnnotation;}

declare type CommentParams = {
  /**
   * Unique ID for the comment.
   */
  id: string;};


declare function CommentPermissionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * This method is used to update the isEditableComment callback
     *
     * When the supplied callback is invalid it will throw a {@link NutrientViewer.Error} that contains a
     * detailed error message.
     *
     * To learn more check
     * {@link https://www.nutrient.io/guides/web/current/comments/introduction-to-instant-comments/#comment-permissions|this guide article}.
     * @example <caption>Only allow editing comments from a specific creator name</caption>
     * instance.setIsEditableComment((comment) => comment.creatorName === myCurrentUser.name);
     * @public
     * @instance
     * @function setIsEditableComment
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied array is not valid.
     * @param {NutrientViewer.IsEditableCommentCallback} isEditableCommentCallback
     */
    setIsEditableComment(isEditableCommentCallback: IsEditableCommentCallback): void;};} &

T;

declare type CommentProps = {
  /**
   * A unique identifier for the comment. When comment is created in the UI, the
   * viewer has to generate a unique ID.
   * @public
   * @instance
   * @member {InstantID} id
   * @memberof NutrientViewer.Comment
   */
  id: InstantID | null;
  /**
   * The ID of the annotation that this comment stems from. In Nutrient Web SDK,
   * this should be either a {@link NutrientViewer.Annotations.MarkupAnnotation} or
   * a {@link NutrientViewer.Annotations.CommentMarkerAnnotation}.
   * @public
   * @instance
   * @member {InstantID} rootId
   * @memberof NutrientViewer.Comment
   */
  rootId: InstantID | null;
  /**
   * The page index that this comment resides at.
   * @public
   * @instance
   * @member {number} pageIndex
   * @memberof NutrientViewer.Comment
   */
  pageIndex: null | number;
  /**
   * If this comment is from the original PDF, then this ID is from that PDF
   * note annotation that defined the comment.
   * @public
   * @instance
   * @member {number} pdfObjectId
   * @memberof NutrientViewer.Comment
   */
  pdfObjectId: number | null;
  /**
   * The name of the person who created the comment.
   * @public
   * @instance
   * @member {string} creatorName
   * @memberof NutrientViewer.Comment
   */
  creatorName: string | null;
  /**
   * The time when the comment was created.
   * @public
   * @instance
   * @member {Date} createdAt
   * @memberof NutrientViewer.Comment
   */
  createdAt: Date;
  /**
   * The time when the comment was last updated.
   * @public
   * @instance
   * @member {Date} updatedAt
   * @memberof NutrientViewer.Comment
   */
  updatedAt: Date;
  /**
   * The text of the comment in xhtml/plain text format.
   *
   * In case of XHTML, we support the following tags:
   * - `<b>`: Bold
   * - `<i>`: Italic
   * - `<span>`: Font color, background color and underline using the `style` attribute (e.g. `<span style="color: red; background-color: blue; text-decoration: underline">Hello</span>`)
   * - `p`: Paragraph. You can use this to add a newline between paragraphs.
   * - `a`: Link. You can use this to add a link to the comment. The `href` attribute is required.
   * @public
   * @instance
   * @member {Text} text
   * @memberof NutrientViewer.Comment
   */
  text: {
    format: 'plain' | 'xhtml';
    value: string | null;};

  /**
   * Arbitrary JSON-serializable data the user can attach to the comment.
   * @public
   * @instance
   * @member {object} customData
   * @memberof NutrientViewer.Comment
   */
  customData: Record<string, unknown> | null;
  /**
   * This property is used to define the permission scope for a particular comment.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @instance
   * @member {string} group
   * @memberof NutrientViewer.Comment
   */
  group?: string | null;
  /**
   * This property defines whether this comment can be edited or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} isEditable
   * @memberof NutrientViewer.Comment
   */
  isEditable?: boolean;
  /**
   * This property defines whether this comment can be deleted or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} isDeletable
   * @memberof NutrientViewer.Comment
   */
  isDeletable?: boolean;
  /**
   * This property defines whether the user has permission to edit the group of this comment.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} canSetGroup
   * @memberof NutrientViewer.Comment
   */
  canSetGroup?: boolean;








  isAnonymous?: boolean | null;};

/**
 * This event is emitted when the list of users mentioned in a comment changes or a new
 * comment is created with mentions. The `modifications` property contains a list of
 * modifications that were applied to the comment. Each modification contains the user ID
 * and the action that was performed.
 *
 * The event is *only emitted for the user that created or updated the comment* either via the
 * UI or the API. If you want to listen for changes to comments made by other users, you can
 * use the `comments.create`, `comments.change` and `comments.delete` event. You get the affected
 * comment in the event payload and can check the mentioned users using {@link NutrientViewer.Comment.getMentionedUserIds} method.
 * @public
 * @example <caption>Listen for changes to the changes in the list of mentioned users in a comment</caption>
 * instance.addEventListener("comments.mention", (event) => {
 *  const { comment, modifications } = event;
 *  modifications.forEach((modification) => {
 *    const { userId, action } = modification;
 *    if (action === "ADDED") {
 *      console.log(`User ${userId} was mentioned in comment ${comment.id}`);
 *    } else {
 *      console.log(`User ${userId} was unmentioned in comment ${comment.id}`);
 *    }
 *  });
 * });
 * @memberof NutrientViewer
 * @interface CommentsMentionEvent
 * @see {@link NutrientViewer.Comment.getMentionedUserIds}
 */
declare type CommentsMentionEvent = {
  /**
   * The comment that was updated.
   * @public
   * @instance
   * @member {NutrientViewer.Comment} comment
   * @memberof NutrientViewer.CommentsMentionEvent
   */
  comment: Comment_2;
  /**
   * A list of modifications that were applied to the comment.
   * @public
   * @instance
   * @member {Immutable.List<{ userId: string, action: 'ADDED' | 'REMOVED' }>} modifications
   * @memberof NutrientViewer.CommentsMentionEvent
   */
  modifications: Immutable.List<{
    userId: string;
    action: 'ADDED' | 'REMOVED';}>;};

declare function CommentsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Comment} for the current document.
     *
     * The list contains an immutable snapshot of the currently available comments in the UI.
     *
     * When you want to keep a reference to the latest comments, you can listen for
     * {@link NutrientViewer.Instance~CommentsChangeEvent}.
     * @public
     * @example
     * instance.getComments().then(function (comments) {
     *   comments.forEach(comment => {
     *     console.log(comment.text);
     *   });
     *
     *   // Get the number of currently loaded comments
     *   const totalComments = comments.size;
     * })
     * @readonly
     * @instance
     * @function getComments
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.Comment>>} Resolves to comments.
     * @memberof NutrientViewer.Instance
     */
    getComments(): Promise<List<Comment_2>>;
    /**
     * ***Server only***
     *
     * Set a list of users that can be mentioned in comments.
     * @example
     * instance.setMentionableUsers([
     *   { id: "1", name: "John Doe", displayName: "John", avatar: "https://example.com/avatar.png" },
     *   { id: "2", name: "Jane Doe", displayName: "Jane", avatar: "https://example.com/avatar.png" },
     *   { id: "3", name: "John Smith", displayName: "John", avatar: "https://example.com/avatar.png" },
     * ]);
     * @public
     * @instance
     * @function setMentionableUsers
     * @param mentionableUsers {MentionableUser[]} An array of {@link NutrientViewer.MentionableUser} objects.
     * @memberof NutrientViewer.Instance
     */
    setMentionableUsers(mentionableUsers: MentionableUser[]): void;
    /**
     * ***Server only***
     * Set the maximum number of suggestions that will be shown when mentioning a user.
     * @example
     * instance.setMaxMentionSuggestions(5);
     * @public
     * @instance
     * @function setMaxMentionSuggestions
     * @param maxMentionSuggestions {number} The maximum number of suggestions that will be shown when mentioning a user.
     * @memberof NutrientViewer.Instance
     */
    setMaxMentionSuggestions(maxMentionSuggestions: number): void;
    /**
     * You can programmatically modify the properties of the comment just before it is created.
     * @public
     * @example
     * instance.setOnCommentCreationStart((comment) => {
     *   return comment.set('text', { format: 'xhtml', value: '<p>This comment has a default value</p>' });
     * });
     * @instance
     * @function setOnCommentCreationStart
     * @param {NutrientViewer.OnCommentCreationStartCallback} callback The callback to set the values of created form fields programmatically.
     * @returns {void}
     * @memberof NutrientViewer.Instance
     */
    setOnCommentCreationStart(callback: OnCommentCreationStartCallback): void;};} &

T;

declare type CommentThreadParams = {
  /**
   * ID for the comment thread.
   */
  id: string;};


/**
 * Slots for partial customization of the comment thread.
 */
declare type CommentThreadUI = {
  /**
   * Use this to render a custom UI in the header (top area) of the UI.
   */
  header?: UIFactory<CommentThreadParams>;
  /**
   * Use this to render a custom UI in the footer (bottom area) of the UI.
   */
  footer?: UIFactory<CommentThreadParams>;
  /**
   * Use this to customize the editor area.
   */
  editor?: UIFactory<CommentThreadParams>;
  /**
   * Use this to customize each comment fully or provide slots for partial customization.
   */
  comment?: CommentUIConfig;};


declare type CommentThreadUIConfig = CommentThreadUIFactory | CommentThreadUI;

/**
 * UI function for full customization of CommentThread.
 */
declare type CommentThreadUIFactory = UIFactory<CommentThreadParams>;

declare type CommentUI = {
  /**
   * Use this to render a custom UI in the header (top area) of the UI.
   */
  header?: UIFactory<CommentParams>;
  /**
   * Use this to render a custom UI in the footer (bottom area) of the UI
   */
  footer?: UIFactory<CommentParams>;
  /**
   * Use this to customize the body of the comment.
   */
  body?: UIFactory<CommentParams>;};


declare type CommentUIConfig = CommentUIFactory | CommentUI;

/**
 * UI function for full customization of Comment.
 */
declare type CommentUIFactory = UIFactory<CommentParams>;

/**
 * Represents a pair of documents to be compared.
 * @public
 * @memberof NutrientViewer
 * @typedef {object} ComparisonDocuments@typedef {object} ComparisonDocuments
 * @property {NutrientViewer.DocumentDescriptor} originalDocument - The original document.
 * @property {NutrientViewer.DocumentDescriptor} changedDocument - The changed document.
 */
declare type ComparisonDocuments = {
  originalDocument: DocumentDescriptor;
  changedDocument: DocumentDescriptor;};

declare class ComparisonOperation extends ComparisonOperation_base {
  constructor(type: IComparisonOperationType, options?: ITextComparisonOperationOptions | IAIComparisonOperationOptions);
  /**
   * Returns true if this operation is a text comparison
   */
  isTextComparison(): boolean;
  /**
   * Returns true if this operation is an AI comparison
   */
  isAIComparison(): boolean;
  /**
   * Returns the AI operation type, if this is an AI comparison
   */
  getAIOperationType(): IAIComparisonOperationType | undefined;}

declare const ComparisonOperation_base: Record_2.Factory<IComparisonOperation>;

/**
 * Describes types for document comparison operation.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ComparisonOperationType} TEXT Compare the text of documents.
 * @property {NutrientViewer.ComparisonOperationType} AI Compare documents using AI-powered analysis.
 */
declare const ComparisonOperationType: {
  readonly TEXT: "text";
  readonly AI: "ai";};


/**
 * Describes the result of a text comparison.
 * @public
 * @memberof NutrientViewer
 * @interface ComparisonResult
 * @property {'text'} type - The type of comparison result. Only "text" is supported for now.
 * @property {NutrientViewer.Hunk[]} hunks - The hunks of changes within the comparison result.
 */
declare type ComparisonResult = {
  type: 'text';
  hunks: Hunk[];};

export declare type Configuration = ServerConfiguration | StandaloneConfiguration;

/**
 * Represents one of the available conformance types for PDF/A documents.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.Conformance} PDFA_1A
 * @property {NutrientViewer.Conformance} PDFA_1B
 * @property {NutrientViewer.Conformance} PDFA_2A
 * @property {NutrientViewer.Conformance} PDFA_2U
 * @property {NutrientViewer.Conformance} PDFA_2B
 * @property {NutrientViewer.Conformance} PDFA_3A
 * @property {NutrientViewer.Conformance} PDFA_3U
 * @property {NutrientViewer.Conformance} PDFA_3B
 * @property {NutrientViewer.Conformance} PDFA_4
 * @property {NutrientViewer.Conformance} PDFA_4E
 * @property {NutrientViewer.Conformance} PDFA_4F
 */
export declare const Conformance: {
  readonly PDFA_1A: "pdfa-1a";
  readonly PDFA_1B: "pdfa-1b";
  readonly PDFA_2A: "pdfa-2a";
  readonly PDFA_2U: "pdfa-2u";
  readonly PDFA_2B: "pdfa-2b";
  readonly PDFA_3A: "pdfa-3a";
  readonly PDFA_3U: "pdfa-3u";
  readonly PDFA_3B: "pdfa-3b";
  readonly PDFA_4: "pdfa-4";
  readonly PDFA_4E: "pdfa-4e";
  readonly PDFA_4F: "pdfa-4f";};


/**
 * @classdesc
 * A mounted document instance.
 *
 * You can generate an instance by using {@link NutrientViewer.load}.
 * @noconstructor
 * @public
 * @class Instance
 * @memberof NutrientViewer
 * @summary A mounted document instance.
 */
declare type Constructor<T = object> = new (...args: any[]) => T;

export declare type ContentEditing = {
  TextBlock: TextBlock_2;
  UpdatedTextBlock: UpdatedTextBlock;
  Session: Session;
  AvailableFace: AvailableFace;
  ContentEditingFontMatcher: ContentEditingFontMatcher;
  FontInfo: FontInfo;
  FontMatchResult: FontMatchResult;};

/**
 * Callback to evaluate or override a font match during content editing.
 *
 * This callback is invoked when the system has determined a best-match font for text
 * during content editing operations. It allows developers to provide custom font
 * matching logic or override the system's choice.
 *
 * The callback receives the system's proposed font match, metadata about the
 * original font from the PDF, the current font size, and a list of all available
 * fonts that can be used. It can return a different font reference to override
 * the match, or `undefined` to accept the system's choice.
 * @public
 * @callback ContentEditingFontMatcher@callback ContentEditingFontMatcher
 * @param {string} match - The font name selected by the system as the best match.
 * @param {NutrientViewer.FontInfo} fontInfo - Font metadata from the PDF including current size.
 * @param {NutrientViewer.AvailableFace[]} availableFonts - Array of all fonts available for use in content editing.
 * @returns {NutrientViewer.FontMatchResult | undefined} A font and size to override the match, or `undefined` to accept the system match.
 * @example <caption>Simple font matching using available fonts</caption>
 * NutrientViewer.load({
 *   contentEditingFontMatcher: (match, fontInfo, availableFonts) => {
 *     // For Helvetica, try to find Arial or use the first available font
 *     if (fontInfo.name?.includes("Helvetica")) {
 *       const arialFont = availableFonts.find(font => font.family === "Arial" && !font.bold && !font.italic);
 *       if (arialFont) {
 *         return { font: arialFont, size: fontInfo.fontSize };
 *       }
 *       // Fallback to first available font
 *       if (availableFonts.length > 0) {
 *         return { font: availableFonts[0], size: fontInfo.fontSize };
 *       }
 *     }
 *     return undefined; // Accept system match
 *   }
 * });
 * @memberof NutrientViewer
 */
declare type ContentEditingFontMatcher = (match: string, fontInfo: FontInfo, availableFonts: AvailableFontFace[]) => FontMatchResult | undefined;

declare function ContentEditorMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

    /**
     * Creates and returns a new content editing session.
     *
     * If called in a Server-backed instance,
     * we will download the document and WASM in the background automatically.
     *
     * Using this method requires a license that includes the Content Editor component.
     * @public
     * @instance
     * @function beginContentEditingSession
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error}  If a session (either UI or API) is already in progress.
     * @returns {Promise.<NutrientViewer.ContentEditing.Session>} A promise that resolves to a {@link NutrientViewer.ContentEditing.Session} object.
     */
    beginContentEditingSession(): Promise<Session>;};} &

T;

/**
 * Converts a document to the specified supported conversion format.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of the converted document, or rejecting with a {@link NutrientViewer.Error}.
 *
 * It requires a {@link NutrientViewer.Configuration|configuration object}. If the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 * @example
 * NutrientViewer.convertToOffice({
 *   document: "/article.pdf",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * },
 * NutrientViewer.OfficeDocumentFormat.docx
 * ).then((arrayBuffer) => {
 *   console.log("Successfully converted document", arrayBuffer);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @public
 * @function convertToOffice
 * @memberof NutrientViewer
 * @param {NutrientViewer.Configuration} configuration A configuration Object.
 * @param {NutrientViewer.OfficeDocumentFormat} format Format to export the document to.
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an ArrayBuffer of the converted file
 */
declare function convertToOffice(configuration: StandaloneConfiguration, format: IDocumentOfficeFormat): Promise<ArrayBuffer>;

/**
 * Converts a file to a PDF.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of a PDF, or rejecting with a {@link NutrientViewer.Error}.
 *
 * The resulting `ArrayBuffer` can be directly loaded with {@link NutrientViewer.load()}.
 *
 * It requires a {@link NutrientViewer.Configuration|configuration object}. If the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 * @example
 * NutrientViewer.convertToPDF({
 *   document: "/sales-report.docx",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * }).then((arrayBuffer) => {
 *   console.log("Successfully converted document", arrayBuffer);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @public
 * @function convertToPDF
 * @memberof NutrientViewer
 * @param {NutrientViewer.Configuration} configuration A configuration Object
 * @param {?NutrientViewer.Conformance | null} conformance A conformance level of the output PDF
 * @param {?NutrientViewer.OfficeConversionSettings} officeConversionSettings Settings specific to office conversion
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an ArrayBuffer of a file converted to PDF
 */
declare function convertToPDF(configuration: StandaloneConfiguration, conformance?: IConformance | null, officeConversionSettings?: OfficeConversionSettings): Promise<ArrayBuffer>;

/**
 * This event is emitted when the user **starts** changing the dimensions of the crop area on the document.
 * See {@link NutrientViewer.Instance~CropAreaChangeStartEvent}
 * @public
 * @memberof NutrientViewer
 * @interface CropAreaChangeStartEvent
 */
declare type CropAreaChangeStartEvent = {
  cropBox: Rect;
  pageIndex: number;};

/**
 * This event is emitted when the dimensions or position of the CropBox is changed.
 * See {@link NutrientViewer.Instance~CropAreaChangeStopEvent}
 * @public
 * @memberof NutrientViewer
 * @interface CropAreaChangeStopEvent
 */
declare type CropAreaChangeStopEvent = {
  cropBox: Rect;
  pageIndex: number;};

/**
 * This record is used to persist the information for a Custom Overlay Item.
 *
 * Custom Overlay Items are user defined DOM `Node`s that are rendered in a page at a given position.
 * @example <caption>Creating an image and rendering it as Custom Overlay Item</caption>
 * let img = document.createElement("img");
 * img.src = "https://example.com/logo.png";
 *
 * const item = new NutrientViewer.CustomOverlayItem({
 *   id: "logo-item",
 *   node: img,
 *   pageIndex: 0,
 *   position: new NutrientViewer.Geometry.Point({ x: 100, y: 100 }),
 *   onAppear() {
 *     console.log('rendered!');
 *   }
 * });
 *
 * instance.setCustomOverlayItem(item);
 * @public
 * @memberof NutrientViewer
 * @summary Custom Item to render in a page.
 * @class CustomOverlayItem
 * @extends Immutable.Record
 * @seealso NutrientViewer.Instance#setCustomOverlayItem
 * @seealso NutrientViewer.Configuration
 */
export declare class CustomOverlayItem extends CustomOverlayItem_base {
  disableAutoZoom: boolean;
  id: CustomOverlayItemID;
  node: Node;
  noRotate: boolean;
  pageIndex: number;
  position: Point;
  onAppear?: ((...args: Args) => void) | null;
  onDisappear?: ((...args: Args) => void) | null;
  constructor(args: ICustomOverlayItem);}

declare const CustomOverlayItem_base: Record_2.Factory<ICustomOverlayItem>;

declare type CustomOverlayItemID = string;

declare function CustomOverlayItemsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * This method is used to set a new {@link NutrientViewer.CustomOverlayItem} or update an existing one.
     * @example <caption>Add a text node to the first page.</caption>
     * let item = new NutrientViewer.CustomOverlayItem({
     *  id: "1",
     *  node: document.createTextNode("Hello from Nutrient Web SDK."),
     *  pageIndex: 0,
     *  position: new NutrientViewer.Geometry.Point({ x: 100, y: 200 }),
     * });
     * instance.setCustomOverlayItem(item);
     * @example <caption>Update a text node.</caption>
     * item = item.set("node", document.createTextNode("Hello again my friend!!!"));
     * instance.setCustomOverlayItem(item);
     * @public
     * @instance
     * @function setCustomOverlayItem
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.CustomOverlayItem} item The item to create or update.
     */
    setCustomOverlayItem(item: CustomOverlayItem): void;
    /**
     * This method is used to remove an existing {@link NutrientViewer.CustomOverlayItem}.
     * @example <caption>Create and then remove a text node.</caption>
     * const id = "1";
     * const item = new NutrientViewer.CustomOverlayItem({
     *  id: id,
     *  node: document.createTextNode("Hello from Nutrient Web SDK."),
     *  pageIndex: 0,
     *  position: new NutrientViewer.Geometry.Point({ x: 100, y: 200 }),
     * });
     * instance.setCustomOverlayItem(item);
     *
     * instance.removeCustomOverlayItem(id);
     * @public
     * @instance
     * @function removeCustomOverlayItem
     * @memberof NutrientViewer.Instance
     * @param {string} id The `id` of the item to remove.
     */
    removeCustomOverlayItem(id: CustomOverlayItemID): void;};} &

T;

/**
 * This object can include functions to be called when specific entities, like annotations,
 * are being rendered in the viewport, and return additional or replacement DOM content for
 * the entity instance.
 *
 * Currently only annotation's rendering can be customized using the `Annotation` key.
 *
 * If the callback returns null, the instance will be rendered normally.
 * @public
 * @memberof NutrientViewer
 * @interface CustomRenderers
 * @summary Keyed list of callbacks called when entities are rendered.
 * @example
 * NutrientViewer.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => ({
 *       node: document.createElement("div").appendChild(document.createTextNode("Custom rendered!")),
 *       append: true,
 *     })
 *   }
 * });
 * @seealso NutrientViewer.Configuration.customRenderers NutrientViewer.Instance#setCustomRenderers
 */
/**
 * Annotations custom renderer callback.
 * @public
 * @instance
 * @member {NutrientViewer.CustomRenderers.AnnotationCustomRendererCallback} Annotation
 * @memberof NutrientViewer.CustomRenderers
 */
/**
 * This user defined function receives the {@link AnnotationsUnion} to be rendered as argument.
 *
 * It must return a {@link NutrientViewer.RendererConfiguration} object or null.
 * @public
 * @callback AnnotationCustomRendererCallback@callback AnnotationCustomRendererCallback
 * @param {object} payload - Annotation data
 * @param {AnnotationsUnion} payload.annotation - Annotation to be rendered
 * @returns {NutrientViewer.RendererConfiguration}
 * @memberof NutrientViewer.CustomRenderers
 */
/**
 * This object defines the properties of a custom annotation renderer.
 *
 * It's returned from a {@link NutrientViewer.CustomRenderers.AnnotationCustomRendererCallback} function.
 *
 * Note that when `append=false` (which is the default value for the property), the default appearance
 * of the annotation is not rendered, including the pointer event listeners.
 *
 * This means that, if you want you custom content to select the annotation when clicked,
 * you'll have to add some logic to support it.
 *
 * You can add an event listener to your node in your custom renderer code,
 * and also supply a callback to the `onDisappear` property to remove the listener:
 *
 * ```js
 * NutrientViewer.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => {
 *       function selectAnnotation(event) {
 *         event.stopImmediatePropagation();
 *         instance.setSelectedAnnotation(annotation.id);
 *       }
 *       const node = document.createElement("div").appendChild(document.createTextNode("Custom rendered!"));
 *       node.addEventListener("pointerdown", selectAnnotation, {
 *         capture: true
 *       });
 *       return {
 *         node,
 *         append: false,
 *         onDisappear: () => {
 *           node.removeEventListener("pointerdown", selectAnnotation, {
 *             capture: true
 *           });
 *         }
 *       };
 *     }
 *   }
 * });
 * ```
 *
 * The `onDisappear` callback function will be run whenever the returned node reference changes,
 * and when the custom rendered component unmounts (is removed from the DOM). With this in mind,
 * and in order to save the browser some unnecessary work, you could rewrite the previous example
 * as follows:
 *
 * ```js
 * let node
 * NutrientViewer.load({
 *   customRenderers: {
 *     Annotation: ({ annotation }) => {
 *       function selectAnnotation(event) {
 *         event.stopImmediatePropagation();
 *         instance.setSelectedAnnotation(annotation.id);
 *       }
 *       if (!node) {
 *         node = document.createElement("div").appendChild(document.createTextNode("Custom rendered!"));
 *         node.addEventListener("pointerdown", selectAnnotation, {
 *           capture: true
 *         });
 *       }
 *       return {
 *         node,
 *         append: false,
 *         onDisappear: () => {
 *           node.removeEventListener("pointerdown", selectAnnotation, {
 *             capture: true
 *           });
 *         }
 *       };
 *     }
 *   }
 * });
 * ```
 *
 * In this example the `onDisappear()` reference changes on every call, but since the `node` reference
 * doesn't change, `onDisappear()` will only be called when the component unmounts.
 *
 * Note that the component does not only unmount when the page it's included is scrolled some pages out,
 * but also, for example, when the annotation it's associated with is selected in the UI, in which case
 * the component is unmounted and mounted again.
 * @public
 * @interface RendererConfiguration
 * @property {Node} node - DOM node to be rendered.
 * @property {?boolean} append=false - Whether the DOM node should be appended after the annotation, or replace it.
 * @property {?boolean} noZoom=false - Whether to automatically zoom the DOM node as the current {@link NutrientViewer.ViewState#zoomLevel} changes.
 * @property {?Function} onDisappear - Callback to be called whenever the custom DOM node is unmounted.
 * @memberof NutrientViewer
 */
declare type CustomRenderers = {
  Annotation?: (arg0: {
    annotation: AnnotationsUnion;}) =>
  RendererConfiguration | null | undefined;
  CommentAvatar?: (arg0: {
    comment: Comment_2;}) =>
  RendererConfiguration | null | undefined;};

declare type CustomUI = Partial<Record<IUIElement, CustomUIElementConfiguration>>;

declare type CustomUIElementConfiguration = CustomUISidebarConfiguration;

declare type CustomUISidebarConfiguration = Partial<{ [K in
ISidebarMode]: Renderer }>;

/**
 * Defining this callback allows you to customize how dates are rendered as part
 * of the NutrientViewer UI.
 * @public
 * @callback DateTimeStringCallback@callback DateTimeStringCallback
 * @memberof NutrientViewer
 * @param {object} args Arguments passed to the callback.
 * @param {Date} args.date The date to be formatted.
 * @param {NutrientViewer.UIDateTimeElement} args.element The NutrientViewer UI element on which the date is going to be rendered.
 * @param {AnnotationsUnion | NutrientViewer.Comment} args.object The annotation or comment that contains the date that is being rendered.
 * @example
 * NutrientViewer.load({
 *   dateTimeString: ({ dateTime, element }) => {
 *     if(element === NutrientViewer.UIDateTimeElement.ANNOTATIONS_SIDEBAR) {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "short",
 *         timeStyle: "short",
 *       }).format(dateTime);
 *     } else {
 *       return new Intl.DateTimeFormat("en-US", {
 *         dateStyle: "full",
 *         timeStyle: "long",
 *       }).format(dateTime);
 *     }
 *   }
 *   // ...
 * });
 */
declare type DateTimeStringCallback = (args: {
  dateTime: Date;
  element: IUIDateTimeElement;
  object: AnnotationsUnion | Comment_2;}) =>
string;

/**
 * Describes the configuration used to populate a document template.
 * @public
 * @memberof NutrientViewer.TemplateDataToPopulateDocument
 * @interface Config
 * @property {NutrientViewer.TemplateDataToPopulateDocument.DelimiterSettings} delimiter The delimiter settings used in data parsing.
 */
declare type DelimiterConfig = {
  delimiter: DelimiterSettings;};


/**
 * Describes the delimiter settings config used in data parsing.
 * @public
 * @memberof NutrientViewer.TemplateDataToPopulateDocument
 * @interface DelimiterSettings
 * @property {string} start The start delimiter for data parsing.
 * @property {string} end The end delimiter for data parsing.
 */
declare type DelimiterSettings = {
  start: string;
  end: string;};


declare function DigitalSignaturesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Gets the digital signatures validation information for all the signatures present
     * in the current document. See {@link NutrientViewer.SignaturesInfo}.
     * @example <caption>Retrieve signatures information</caption>
     *
     * instance.getSignaturesInfo()
     *   .then(signaturesInfo => {
     *     console.log(signaturesInfo.status)
     *     if(signaturesInfo.signatures) {
     *       const invalidSignatures = signaturesInfo.signatures
     *         .filter(signature => signature.signatureValidationStatus !== NutrientViewer.SignatureValidationStatus.valid);
     *       console.log(invalidSignatures);
     *     }
     * });
     *
     * Additional information can be found in
     * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#digital-signatures-validation|this guide article}.
     * @public
     * @function getSignaturesInfo
     * @instance
     * @returns {Promise.<NutrientViewer.SignaturesInfo>} Promise that resolves with a {@link NutrientViewer.SignaturesInfo}.
     * @memberof NutrientViewer.Instance
     */
    getSignaturesInfo(): Promise<SignaturesInfo>;
    /**
     * Digitally signs the document. On Standalone it can make sign the document  with the certificates and private key
     * provided by the user in {@link NutrientViewer.SignaturePreparationData}, or use the signing service optionally provided
     * in the callback argument.
     *
     * On Server, you can optionally specify additional data to be passed to the signing service.
     *
     * Check the related {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web|guide article}.
     * @example <caption>Sign document with CMS signature (Standalone)</caption>
     * instance.signDocument(null, function({ hash, fileContents }) {
     *   return new Promise(function(resolve, reject) {
     *     const PKCS7Container = getPKCS7Container(hash, fileContents);
     *     if (PKCS7Container != null) {
     *       return resolve(PKCS7Container)
     *     }
     *     reject(new Error("Could not retrieve the PKCS7 container."))
     *   })
     * }).then(function() {
     *   console.log("Document signed!");
     * })
     * @example <caption>Sign document (Server)</caption>
     * instance.signDocument(null, { signingToken: "My security token" })
     *   .then(function() {
     *     console.log("Document signed!");
     *   })
     * @public
     * @function signDocument
     * @instance
     * @param {?NutrientViewer.SignaturePreparationData} signaturePreparationData - Properties to prepare the signature with.
     * @param {?(NutrientViewer.TwoStepSignatureCallback|NutrientViewer.SigningServiceData)} twoStepSignatureCallbackOrSigningServiceData - Either
     * a callback to be executed when the document is ready for signing (Standalone only) or optional data to be passed to the
     * signing service.
     * @returns {Promise.<void>} Promise that resolves when the document is signed.
     * @memberof NutrientViewer.Instance
     */
    signDocument(signaturePreparationData: SignatureCreationData | null, twoStepSignatureCallbackOrSigningServiceData?: TwoStepSignatureCallback | SigningServiceData): Promise<void>;
    /**
     * ***Standalone only***
     *
     * Adds LTV (Long Term Validation) information to an existing signature.
     * See {@link NutrientViewer.SignaturesInfo}.
     * @example <caption>Add LTV information to an existing signature</caption>
     *
     * instance.setSignaturesLTV(certificates)
     *   .then(signaturesInfo => {
     *     console.log(signaturesInfo.status)
     *     if(signaturesInfo.signatures) {
     *       const invalidSignatures = signaturesInfo.signatures
     *         .filter(signature => !signature.ltv);
     *       console.log(invalidSignatures);
     *     }
     * });
     *
     * Additional information can be found in
     * {@link https://www.nutrient.io/guides/web/signatures/digital-signatures/signature-lifecycle/sign-a-pdf-document/|this guide article}.
     * @public
     * @function setSignaturesLTV
     * @instance
     * @param {?(ArrayBuffer[]|string[])} certificates - Certificates used to sign the document.
     * @returns {Promise.<NutrientViewer.SignaturesInfo>} Promise that resolves with a {@link NutrientViewer.SignaturesInfo}.
     * @memberof NutrientViewer.Instance
     */
    setSignaturesLTV(certificates?: ArrayBuffer[] | string[]): Promise<SignaturesInfo>;};} &









T;

declare type Dispatch<A> = (value: A) => void;

/**
 * Defines specific configuration options related to the document comparison feature. Passed when calling {@link NutrientViewer.Instance#setDocumentComparisonMode}.
 * @public
 * @memberof NutrientViewer
 * @interface DocumentComparisonConfiguration
 * @summary Object containing configuration options for document comparison.
 * @callback@callback
 * @example
 * instance.setDocumentComparisonMode({
 *   documentA: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_OPEN_DOCUMENT
 *   },
 *   documentB: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_FILE_DIALOG
 *   },
 *   autoCompare: false
 * });
 */
declare type DocumentComparisonConfiguration = {
  /**
   * Settings for the base document used for document comparison.
   * @public
   * @instance
   * @member {NutrientViewer.DocumentComparisonSource} documentA
   * @memberof NutrientViewer.DocumentComparisonConfiguration
   */
  documentA: DocumentComparisonSource;
  /**
   * Settings for the second document used for document comparison.
   * @public
   * @instance
   * @member {NutrientViewer.DocumentComparisonSource} documentB
   * @memberof NutrientViewer.DocumentComparisonConfiguration
   */
  documentB: DocumentComparisonSource;
  /**
   * ***optional***
   *
   * Stroke colors to be used for the base and second documents strokes when overlaid for document comparison.
   *
   * Defaults to:
   *
   * ```js
   * {
   * documentA: new NutrientViewer.Color({ r: 245, g: 40, b: 27 }),
   * documentB: new NutrientViewer.Color({ r: 49, g: 193, b: 255 })
   * }
   * ```
   * @public
   * @instance
   * @member {?NutrientViewer.DocumentComparisonStrokeColors} strokeColors
   * @memberof NutrientViewer.DocumentComparisonConfiguration
   * @default { documentA: new NutrientViewer.Color({ r: 245, g: 40, b: 27 }), documentB: new NutrientViewer.Color({ r: 49, g: 193, b: 255 }) }
   */
  strokeColors?: DocumentComparisonStrokeColors;
  /**
   * ***optional***
   *
   * {@link NutrientViewer.BlendMode|Blend mode} to be used for overlaying the two source documents when performing document comparison.
   *
   * Defaults to `"darken"`.
   * @public
   * @instance
   * @member {?NutrientViewer.BlendMode} blendMode
   * @memberof NutrientViewer.DocumentComparisonConfiguration
   * @default "darken"
   */
  blendMode?: IBlendMode;
  /**
   * Set to `true` to perform automatic comparison without manual alignment of both documents. Set to `false` to manually align them.
   * @public
   * @instance
   * @member {boolean} autoCompare
   * @memberof NutrientViewer.DocumentComparisonConfiguration
   */
  autoCompare: boolean;};

declare function DocumentComparisonMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * ***Standalone only***
     *
     * Enables or disables the document comparison UI.
     *
     * When a {@link NutrientViewer.DocumentComparisonConfiguration} object is passed, the document comparison UI is
     * mounted and initialized with the provided settings.
     *
     * When `null` is passed, the document comparison UI is hidden if it was being shown.
     * @example <caption>Initialize and show the document comparison UI</caption>
     * instance.setDocumentComparisonMode({
     *   documentA: {
     *     source: fetch("old-document.pdf").then(res => res.arrayBuffer())
     *   },
     *   documentB: {
     *     source: fetch("old-document.pdf").then(res => res.arrayBuffer())
     *   },
     *   autoCompare: true
     * });
     * @public
     * @function setDocumentComparisonMode
     * @instance
     * @param {NutrientViewer.DocumentComparisonConfiguration | null} documentComparisonConfiguration Initial document comparison configuration.
     * @returns {Promise.<void>}
     * @memberof NutrientViewer.Instance
     */
    setDocumentComparisonMode(documentComparisonConfiguration: DocumentComparisonConfiguration | null): Promise<void>;};} &

T;

/**
 * Object containing the result of a document comparison operation.
 * @public
 * @memberof NutrientViewer
 * @interface DocumentComparisonResult
 * @property {NutrientViewer.PageComparisonResult[]} documentComparisonResults - The comparison results for each page.
 */
declare type DocumentComparisonResult = {
  documentComparisonResults: PageComparisonResult[];} |
null;

/**
 * Specifies the data and settings for documents used for document comparison.
 * @public
 * @memberof NutrientViewer
 * @interface DocumentComparisonSource
 * @summary Object containing data and settings for documents used for document comparison.
 * @example
 * instance.setDocumenComparisonMode({
 *   documentA: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_OPEN_DOCUMENT,
 *     pageIndex: 0,
 *     strokeColor: NutrientViewer.Color.RED
 *   },
 *   documentB: {
 *     source: NutrientViewer.DocumentComparisonSource.USE_FILE_DIALOG,
 *     pageIndex: 0,
 *     strokeColor: NutrientViewer.Color.BLUE
 *   },
 *   autoCompare: false
 * });
 */
declare type DocumentComparisonSource = {
  /**
   * Data for one of the source documents used for document comparison.
   * @public
   * @instance
   * @member {NutrientViewer.DocumentComparisonSourceType | string | ArrayBuffer | Promise<string | ArrayBuffer>} source
   * @memberof NutrientViewer.DocumentComparisonSource
   */
  source: IDocumentComparisonSourceType | string | ArrayBuffer | Promise<string | ArrayBuffer>;
  /**
   * ***optional***
   *
   * Page index of the source document to be used for document comparison.
   *
   * Defaults to page `0`.
   * @public
   * @instance
   * @member {?number} pageIndex
   * @memberof NutrientViewer.DocumentComparisonSource
   * @default 0
   */
  pageIndex?: number;};

/**
 * Represents one of the available document sources to be used
 * in document comparison.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.DocumentComparisonSourceType} USE_OPEN_DOCUMENT - use the currently open document as source.
 * @property {NutrientViewer.DocumentComparisonSourceType} USE_FILE_DIALOG - show the file dialog for the user to choose the source document from the local file system.
 */
declare const DocumentComparisonSourceType: {
  readonly USE_OPEN_DOCUMENT: "USE_OPEN_DOCUMENT";
  readonly USE_FILE_DIALOG: "USE_FILE_DIALOG";};


/**
 * ***optional***
 * Specifies the stroke colors used for overlaid strokes of the base and second documents documents used in document comparison.
 * @public
 * @memberof NutrientViewer
 * @interface DocumentComparisonStrokeColors
 * @summary Object containing the stroke colors used for overlaid strokes of the base and second documents documents used in document comparison.
 * @example
 * instance.setDocumentComparisonMode({
 *   documentA: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_OPEN_DOCUMENT,
 *     pageIndex: 0
 *   },
 *   documentB: {
 *     source: NutrientViewer.DocumentComparisonSourceType.USE_FILE_DIALOG,
 *     pageIndex: 0
 *   },
 *   strokeColors: {
 *     documentA: NutrientViewer.Color.RED,
 *     documentB: NutrientViewer.Color.BLUE
 *   },
 *   autoCompare: false
 * });
 */
declare type DocumentComparisonStrokeColors = {
  /**
   * ***optional***
   *
   * Stroke color for the base document used for document comparison.
   * @public
   * @instance
   * @member {NutrientViewer.Color} documentA
   * @memberof NutrientViewer.DocumentComparisonStrokeColors
   * @default new NutrientViewer.Color({ r: 245, g: 40, b: 27 })
   */
  documentA?: Color;
  /**
   * Stroke color for the second document used for document comparison.
   * @public
   * @instance
   * @member {NutrientViewer.Color} documentB
   * @memberof NutrientViewer.DocumentComparisonStrokeColors
   * @default new NutrientViewer.Color({ r: 49, g: 193, b: 255 })
   */
  documentB?: Color;};

/**
 * This event will be emitted whenever the document comparison UI is shown.
 *
 * The event listener will receive the {@link NutrientViewer.DocumentComparisonConfiguration|document comparison configuration object} with which
 * {@link NutrientViewer.Instance.setDocumentComparisonMode} has been called.
 * @public
 * @memberof NutrientViewer
 * @interface DocumentComparisonUIStartEvent
 */
declare type DocumentComparisonUIStartEvent = DocumentComparisonConfiguration;

declare class DocumentDescriptor extends DocumentDescriptor_base {
  constructor(documentDescriptorOptions: IDocumentDescriptor);}


declare const DocumentDescriptor_base: Record_2.Factory<IDocumentDescriptor>;

/**
 * Describes the properties of a Document Editor Toolbar Item.
 *
 * Check out [our guides](www.nutrient.io/guides/web/customizing-the-interface/customizing-the-document-editor-toolbar-and-footer/)
 * for more examples.
 * @public
 * @memberof NutrientViewer
 * @interface DocumentEditorToolbarItem
 * @extends NutrientViewer.ToolItem
 * @seealso NutrientViewer.Instance#setDocumentEditorToolbarItems NutrientViewer.Configuration#documentEditorToolbarItems
 */
/**
 * ***required***
 *
 * The type of a document editor toolbar item.
 *
 * It can either be `custom` for user defined items or one from the {@link NutrientViewer.defaultDocumentEditorToolbarItems}.
 *
 * Note: It is ***not*** possible to override this option for built-in toolbar items.
 * @example
 * // In your JavaScript
 * const documentEditorToolbarItems = NutrientViewer.defaultDocumentEditorToolbarItems
 * documentEditorToolbarItems.push({ type: 'custom', ... })
 * NutrientViewer.load({
 *  ...otherOptions,
 *  documentEditorToolbarItems
 * });
 * @public
 * @instance
 * @member {string} type
 * @memberof NutrientViewer.DocumentEditorToolbarItem
 */
/**
 * Unique identifier for the item.
 *
 * This is useful to identify items whose `type` is `custom`.
 * @example
 * // In your JavaScript
 * const documentEditorToolbarItems = NutrientViewer.defaultDocumentEditorToolbarItems
 * documentEditorToolbarItems.push({ type: 'custom', id: 'my-button', ... })
 * NutrientViewer.load({
 *  ...otherOptions,
 *  documentEditorToolbarItems
 * });
 *
 * Note: It is ***not*** possible to override this option for built-in document editor toolbar items.
 * @public
 * @instance
 * @member {?string} id
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Useful to set a custom CSS class name on the item.
 *
 * For {@link NutrientViewer.defaultDocumentEditorToolbarItems|default document editor toolbar items} the `className` is appended to the default
 * item ones.
 * @public
 * @instance
 * @member {?string} className
 * @memberof NutrientViewer.DocumentEditorToolbarItem
 */
/**
 * Icon for the item.
 *
 * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
 * This property can override the {@link NutrientViewer.defaultDocumentEditorToolbarItems|default items}' ones.
 * @public
 * @instance
 * @member {?string} icon
 * @memberof NutrientViewer.DocumentEditorToolbarItem
 */
/**
 * Whether a custom item is selected or not.
 *
 * The selected status of {@link NutrientViewer.defaultDocumentEditorToolbarItems|default items} cannot be altered.
 *
 * Note: It is ***not*** possible to override this option for built-in document editor toolbar items.
 * @public
 * @instance
 * @member {?boolean} selected
 * @memberof NutrientViewer.DocumentEditorToolbarItem
 */
/**
 * Whether the item is disabled or not.
 *
 * The property can be used to force a {@link NutrientViewer.defaultDocumentEditorToolbarItems|default item} to be
 * disabled by setting it to `true`.
 * @public
 * @instance
 * @member {?boolean} disabled
 * @memberof NutrientViewer.DocumentEditorToolbarItem
 */
/**
 * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
 * first argument, a document editor UI handler object as the second, and the `id` of the tool item as the third.
 * @public
 * @instance
 * @member {?NutrientViewer.DocumentEditorToolbarItem.OnPressCallback} onPress
 * @memberof NutrientViewer.DocumentEditorToolbarItem
 */
/**
 * @public
 * @callback OnPressCallback@callback OnPressCallback
 * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter while the item has focus.
 * @param {NutrientViewer.DocumentEditorUIHandler} documentEditorUIHandler An instance object to set and retrieve different state properties of the document editor UI.
 * @param {string} id The tool item id.
 * @memberof NutrientViewer.DocumentEditorToolbarItem
 */
declare type DocumentEditorBuiltinToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & {
  type: BuiltInDocumentEditorToolbarItem;
  onPress?: (e: Event) => void;};


export declare type DocumentEditorFooterItem = Omit<BasicDocumentEditorFooterItem, 'type' | 'onPress'> & ({
  type: BuiltInDocumentEditorFooterItem;
  onPress?: (e: Event) => void;} |
{
  type: 'custom';
  onPress?: (e: Event, documentEditorUIHandler: DocumentEditorUIHandler, id?: string) => void;});


declare function DocumentEditorMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest document editor footer items. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link NutrientViewer.Instance.setDocumentEditorFooterItems} is called.
     *
     * Mutating this array will have no effect.
     * @public
     * @readonly
     * @instance
     * @member {Array.<NutrientViewer.DocumentEditorFooterItem>} documentEditorFooterItems
     * @memberof NutrientViewer.Instance
     */
    readonly documentEditorFooterItems: any[];
    /**
     * Returns a deep copy of the latest document editor toolbar items. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link NutrientViewer.Instance.setDocumentEditorToolbarItems} is called.
     *
     * Mutating this array will have no effect.
     * @public
     * @readonly
     * @instance
     * @member {Array.<NutrientViewer.DocumentEditorToolbarItem>} documentEditorToolbarItems
     * @memberof NutrientViewer.Instance
     */
    readonly documentEditorToolbarItems: any[];
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setDocumentEditorFooterItems|setDocumentEditorFooterItems()}
     * method to do atomic updates to the document editor footer items.
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setDocumentEditorFooterItems(items => {
     *   const button = instance.contentDocument.createElement('div');
     *   button.innerText = "Custom Save"
     *   items.push({
     *     type: "custom",
     *     node: button,
     *     onPress(){
     *       alert("save");
     *     }
     *   });
     *   return items;
     * });
     * @public
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~DocumentEditorFooterItemsSetter
     * @param {Array.<NutrientViewer.DocumentEditorFooterItem>} currentDocumentEditorFooterItems
     * @returns {Array.<NutrientViewer.DocumentEditorFooterItem>} The new document editor footer items.
     */
    /**
     * This method is used to update the document editor footer of the PDF editor.
     * It makes it possible to add new {@link NutrientViewer.DocumentEditorFooterItem|items} and edit or remove existing ones.
     *
     * When you pass in an `array` of {@link NutrientViewer.DocumentEditorFooterItem}, the current items will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * `array` of {@link NutrientViewer.DocumentEditorFooterItem} as argument. You can use this to modify the list based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentDocumentEditorFooterItems`
     * can't change in between.
     * See: {@link NutrientViewer.Instance~DocumentEditorFooterItemsSetter|DocumentEditorFooterItemsSetter}
     *
     * When one of the supplied {@link NutrientViewer.DocumentEditorFooterItem} is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * Since `items` is a regular JavaScript `Array` of object literals it can be manipulated using
     * standard array methods like `forEach`, `map`, `reduce`, `splice` and so on.
     * Additionally you can use any 3rd party library for array manipulation like {@link https://lodash.com|lodash}
     * or {@link http://anguscroll.com/just|just}.
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setDocumentEditorFooterItems(items => items.reverse());
     * @example <caption>The new changes will be applied immediately</caption>
     * instance.setDocumentEditorFooterItems(newItems);
     * instance.documentEditorFooterItems === newItems; // => true
     * @example <caption>Changing a property of a custom button</caption>
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   onPress() {
     *     alert("test");
     *   },
     * };
     * @public
     * @instance
     * @function setDocumentEditorFooterItems
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} will throw an error when the supplied items array is not valid. This will also throw an error if you don not have document editor license.
     * @param {Array.<NutrientViewer.DocumentEditorFooterItem>|NutrientViewer.Instance~DocumentEditorFooterItemsSetter} documentEditorFooterItemsOrFunction Either a
         *   new `array` of DocumentEditorFooterItem which would overwrite the existing one, or a callback that will get
         *   invoked with the current footer items and is expected to return the new `array` of items.
         */
    setDocumentEditorFooterItems(documentEditorFooterItemsOrFunction: DocumentEditorFooterItem[] | SetDocumentEditorFooterFunction): void;
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setDocumentEditorToolbarItems|setDocumentEditorToolbarItems()}
     * method to do atomic updates to the document editor toolbar items.
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setDocumentEditorToolbarItems(items => {
     *   const button = instance.contentDocument.createElement('div');
     *   button.innerText = "Do something"
     *   items.push({
     *     type: "custom",
     *     node: button,
     *     onPress(){
     *       alert("Do Something");
     *     }
     *   });
     *   return items;
     * });
     * @public
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~DocumentEditorToolbarItemsSetter
     * @param {Array.<NutrientViewer.DocumentEditorToolbarItem>} currentDocumentEditorToolbarItems
     * @returns {Array.<NutrientViewer.DocumentEditorToolbarItem>} The new document editor toolbar items.
     */
    /**
     * This method is used to update the document editor toolbar of the PDF editor.
     * It makes it possible to add new {@link NutrientViewer.DocumentEditorToolbarItem|items} and edit or remove existing ones.
     *
     * When you pass in an `array` of {@link NutrientViewer.DocumentEditorToolbarItem}, the current items will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * `array` of {@link NutrientViewer.DocumentEditorToolbarItem} as argument. You can use this to modify the list based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentDocumentEditorToolbarItems`
     * can't change in between.
     * See: {@link NutrientViewer.Instance~DocumentEditorToolbarItemsSetter|DocumentEditorToolbarItemsSetter}
     *
     * When one of the supplied {@link NutrientViewer.DocumentEditorToolbarItem} is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * Since `items` is a regular JavaScript `Array` of object literals it can be manipulated using
     * standard array methods like `forEach`, `map`, `reduce`, `splice` and so on.
     * Additionally you can use any 3rd party library for array manipulation like {@link https://lodash.com|lodash}
     * or {@link http://anguscroll.com/just|just}.
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setDocumentEditorToolbarItems(items => items.reverse());
     * @example <caption>The new changes will be applied immediately</caption>
     * instance.setDocumentEditorToolbarItems(newItems);
     * instance.documentEditorToolbarItems === newItems; // => true
     * @example <caption>Changing a property of a custom button</caption>
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   onPress() {
     *     alert("test");
     *   },
     * };
     * @public
     * @instance
     * @function setDocumentEditorToolbarItems
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} will throw an error when the supplied items array is not valid. This will also throw an error if you don not have document editor license.
     * @param {Array.<NutrientViewer.DocumentEditorToolbarItem>|NutrientViewer.Instance~DocumentEditorToolbarItemsSetter} documentEditorToolbarItemsOrFunction Either a
         *   new `array` of DocumentEditorToolbarItem which would overwrite the existing one, or a callback that will get
         *   invoked with the current toolbar items and is expected to return the new `array` of items.
         */
    setDocumentEditorToolbarItems(documentEditorToolbarItemsOrFunction: DocumentEditorToolbarItem[] | SetDocumentEditorToolbarFunction): void;};} &

T;

export declare type DocumentEditorToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & (DocumentEditorBuiltinToolbarItem | {
  type: 'custom';
  onPress?: (e: Event, documentEditorUIHandler: DocumentEditorUIHandler, id?: string) => void;});


/**
 *
 * @public
 * @summary An object that allows you to configure the Document Editor UI.
 * @memberof NutrientViewer
 * @typedef {object} documentEditorUIConfig@typedef {object} documentEditorUIConfig
 * @property {number} thumbnailMinSize The minimum size of the thumbnail
 * @property {number} thumbnailMaxSize  The maximum size of the thumbnail
 * @property {number} thumbnailDefaultSize  The default size of the thumbnail
 * @example
 *
 * const myDocumentEditorUIConfig =  {
 *       thumbnailDefaultSize: 500,
 *       thumbnailMinSize: 100,
 *       thumbnailMaxSize: 600,
 *     }
 *
 * NutrientViewer.load(
 *  //...
 *  documentEditorConfig: myDocumentEditorUIConfig,
 * )
 */
declare type documentEditorUIConfig = {
  thumbnailMinSize: number;
  thumbnailMaxSize: number;
  thumbnailDefaultSize: number;};


/**
 * An object provided the Nutrient Web SDK to custom items in the document editor toolbar and footer. This object contains methods that can be
 * invoked to retrieve and modify the current stack of document operations to be applied to the open document.
 * @public
 * @interface DocumentEditorUIHandler
 * @param {NutrientViewer.DocumentEditorUIHandler.SetOperationsCallback} setOperations Hook function to modify the current stack of document operations to be applied to the open document.
 * @param {NutrientViewer.DocumentEditorUIHandler.GetSelectedPageIndexesCallback} getSelectedPageIndexes Returns the page indexes of the currently selected pages; can be used to set the scope of a new document operation, for example.
 * @memberof NutrientViewer
 */
/**
 * Callback function to modify the current stack of document operations to be applied to the open document.
 * This function is invoked with the current stack of document operations as the first argument, and must return the new stack of document operations.
 * The new stack of document operations can be the same as the current one, or a new one.
 * @public
 * @callback SetOperationsCallback@callback SetOperationsCallback
 * @param {NutrientViewer.Immutable.List.<NutrientViewer.DocumentOperation|NutrientViewer.Immutable.List.<NutrientViewer.DocumentOperation>>} callback Callback that receives the current operations committed and returns a new list of operations.
 * @param {?boolean} clearPagesSelection Whether to clear the current selection of pages after returning the new operations or not.
 * @returns {NutrientViewer.Immutable.List.<NutrientViewer.DocumentOperation|NutrientViewer.Immutable.List.<NutrientViewer.DocumentOperation>>} The new stack of document operations.
 * @memberof NutrientViewer.DocumentEditorUIHandler
 */
/**
 * Retrieve the page indexes of the currently selected pages. This function can be used to set the scope of a new document operation, for example.
 * @public
 * @callback GetSelectedPageIndexesCallback@callback GetSelectedPageIndexesCallback
 * @returns {?Array<number>} The page indexes of the currently selected pages.
 * @memberof NutrientViewer.DocumentEditorUIHandler
 */
declare type DocumentEditorUIHandler = {
  setOperations: (callback: (stagedDocumentOperations: List<DocumentOperation | List<DocumentOperation>>) => List<DocumentOperation | List<DocumentOperation>>, clearPagesSelection?: boolean) => void | Promise<void>;
  getSelectedPageIndexes: () => number[];};


/**
 * The different signature validation states the document can be in.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @enum
 */
declare const DocumentIntegrityStatus: {
  /**
   * The part of the document covered by the signature has not been modified.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly ok: "ok";
  /**
   * The part of the document covered by the signature has been modified.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly tampered_document: "tampered_document";
  /**
   * The signature /Contents couldn't be parsed.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
  /**
   * The signature /ByteRange couldn't be parsed.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly failed_to_retrieve_byterange: "failed_to_retrieve_byterange";
  /**
   * The digest of the document couldn't be calculated.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly failed_to_compute_digest: "failed_to_compute_digest";
  /**
   * The signing certificate from the signature contents couldn't be extracted.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly failed_retrieve_signing_certificate: "failed_retrieve_signing_certificate";
  /**
   * The public key from the signature contents couldn't be extracted.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly failed_retrieve_public_key: "failed_retrieve_public_key";
  /**
   * The encryption padding from the signature contents couldn't be extracted.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly failed_encryption_padding: "failed_encryption_padding";
  /**
   * The digital signature contains a timestamp that is not valid or the timestamped data was tampered with.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly tampered_or_invalid_timestamp: "tampered_or_invalid_timestamp";
  /**
   * An unspecific error.
   * @public
   * @type {NutrientViewer.DocumentIntegrityStatus}
   */
  readonly general_failure: "general_failure";};


declare type DocumentIntegrityStatusType = (typeof DocumentIntegrityStatus)[keyof typeof DocumentIntegrityStatus];

declare type DocumentMarkupMode = 'noMarkup' | 'original' | 'simpleMarkup' | 'allMarkup';

declare type DocumentMetadata = {
  title?: string;
  author?: string;};

declare type DocumentOperation = (AddPageConfiguration & {
  type: 'addPage';
  afterPageIndex: number;}) |
(AddPageConfiguration & {
  type: 'addPage';
  beforePageIndex: number;}) |
{
  type: 'cropPages';
  pageIndexes?: Array<number>;
  cropBox: Rect;} |
{
  type: 'addPageMargins';
  pageIndexes?: Array<number>;
  margins: Inset;} |
NonSerializableDocumentOperationsCommon | NonSerializableDocumentOperations;

declare function DocumentOperationsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Applies operations to the current document. If multiple operations are provided,
     * each operation is performed on the resulting document from the previous operation. This API works only if you have the document editor component in your license.
     * @example <caption>Apply 90 degrees rotation to page 0</caption>
     * instance
     *   .applyOperations([
     *     {
     *       type: "rotatePages",
     *       pageIndexes: [0],
     *       rotateBy: 90
     *     }
     *   ]);
     * @public
     * @function applyOperations
     * @instance
     * @param {Array<NutrientViewer.DocumentOperation>} operations Operations to be performed on the document.
     * @returns {Promise.<void>} Promise that resolves with an array of results.
     * @memberof NutrientViewer.Instance
     */
    applyOperations(operations: Array<DocumentOperation>): Promise<unknown>;
    /**
     * Exports the PDF contents after applying operations on the current document, which is not modified.
     * If multiple operations are provided, each operation is performed on the resulting document from the previous operation.
     * Returns an `ArrayBuffer` that can be used to download the PDF.
     * @example <caption>Export the modified PDF content</caption>
     * const operations = [
     *   {
     *     type: "rotatePages",
     *     pageIndexes: [0],
     *     rotateBy: 90
     *   }
     * ];
     * instance.exportPDFWithOperations(operations).then(function (buffer) {
     *   buffer; // => ArrayBuffer
     * });
     * @example <caption>Download the modified PDF by using an `&lt;a&gt;` tag</caption>
     * const operations = [
     *   {
     *     type: "rotatePages",
     *     pageIndexes: [0],
     *     rotateBy: 90
     *   }
     * ];
     * instance.exportPDFWithOperations(operations).then(function(buffer) {
     *   const supportsDownloadAttribute = HTMLAnchorElement.prototype.hasOwnProperty(
     *     "download"
     *   );
     *   const blob = new Blob([buffer], { type: "application/pdf" });
     *   if (navigator.msSaveOrOpenBlob) {
     *     navigator.msSaveOrOpenBlob(blob, "download.pdf");
     *   } else if (!supportsDownloadAttribute) {
     *     const reader = new FileReader();
     *     reader.onloadend = function() {
     *       const dataUrl = reader.result;
     *       downloadPdf(dataUrl);
     *     };
     *     reader.readAsDataURL(blob);
     *   } else {
     *     const objectUrl = window.URL.createObjectURL(blob);
     *     downloadPdf(objectUrl);
     *     window.URL.revokeObjectURL(objectUrl);
     *   }
     * });
     * function downloadPdf(blob) {
     *   const a = document.createElement("a");
     *   a.href = blob;
     *   a.style.display = "none";
     *   a.download = "download.pdf";
     *   a.setAttribute("download", "download.pdf");
     *   document.body.appendChild(a);
     *   a.click();
     *   document.body.removeChild(a);
     * }
     * @public
     * @instance
     * @function exportPDFWithOperations
     * @memberof NutrientViewer.Instance
     * @param {Array<NutrientViewer.DocumentOperation>} operations Operations to be performed on the document.
     * @returns {Promise.<ArrayBuffer>} Promise that resolves with the binary contents of the modified PDF.
     */
    exportPDFWithOperations(operations: Array<DocumentOperation>): Promise<ArrayBuffer>;};} &

T;

/**
 * This record is used to persist the document permission flags
 */
declare const DocumentPermissionsEnum: {
  /**
   * Add or modify text annotations and interactive form fields. If `fillForms` is also set, the
   * user can fill existing forms (including digital signatures).
   */
  readonly annotationsAndForms: "annotationsAndForms";
  /**
   * Assemble the document, that is, insert, rotate, or delete pages, or create bookmarks or
   * thumbnail images.
   */
  readonly assemble: "assemble";
  /**
   * Copy or extract text and graphics from the document.
   */
  readonly extract: "extract";
  /**
   * Extract text and graphics in support of accessibility to users with disabilities).
   */
  readonly extractAccessibility: "extractAccessibility";
  /**
   * Fill existing forms (including digital signatures).
   */
  readonly fillForms: "fillForms";
  /**
   * Modify the contents of the document with operations other than `assemble`.
   */
  readonly modification: "modification";
  /**
   * Print the document to a representation from which a faithful digital copy of the PDF content
   * could be generated. When this flag is set to true the print resolution will be 300 dpi and 150
   * dpi otherwise.
   */
  readonly printHighQuality: "printHighQuality";
  /**
   * Print the document. Limited to degraded quality if `printHighQuality` is not also set.
   */
  readonly printing: "printing";};


declare function DocumentTextComparisonMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Compares documents based on the operation provided. It supports both standard text comparison and AI-powered analysis and tagging.
     * @example <caption>Compare two documents</caption>
     * const operation = new NutrientViewer.ComparisonOperation("text", { numberOfContextWords: 2 });
     *
     * const originalDocument = new NutrientViewer.DocumentDescriptor({ filePath: "path/to/original.pdf", pageIndexes: [0]});
     * const changedDocument = new NutrientViewer.DocumentDescriptor({ filePath: "path/to/changed.pdf", pageIndexes: [0]});
     *
     * const comparisonDocuments = { originalDocument, changedDocument };
     *
     * instance.compareDocuments(operation, comparisonDocuments)
     *   .then((comparisonResults) => {
     *     console.log(comparisonResults);
     *   });
     * @example <caption>AI-powered analysis</caption>
     * const aiOperation = new NutrientViewer.ComparisonOperation(
     *   NutrientViewer.ComparisonOperationType.AI,
     *   { operationType: NutrientViewer.AIComparisonOperationType.ANALYZE }
     * );
     *
     * instance.compareDocuments(comparisonDocuments, aiOperation)
     *   .then((result) => {
     *     // For AI operations, check the result type
     *     if (NutrientViewer.isAIDocumentComparisonResult(result)) {
     *       console.log('AI Summary:', result.summary);
     *       console.log('Categories:', result.categories);
     *     }
     *   });
     * @example <caption>AI-powered tagging with categories</caption>
     * const tagOperation = new NutrientViewer.ComparisonOperation(
     *   NutrientViewer.ComparisonOperationType.AI,
     *   {
     *     operationType: NutrientViewer.AIComparisonOperationType.TAG,
     *     categories: ["Legal", "Financial"]
     *   }
     * );
     *
     * instance.compareDocuments(comparisonDocuments, tagOperation)
     *  .then((result) => {
     *    // For AI operations, check the result type
     *    if (NutrientViewer.isAIDocumentComparisonResult(result)) {
     *      console.log('Tagged References:', result.references);
     *      // result.changes contains the original DocumentComparisonResult
     *    }
     *  });
     * @public
     * @function compareDocuments
     * @instance
     * @param {ComparisonDocuments} comparisonDocuments - Descriptors of the original and changed documents.
     * @param {NutrientViewer.ComparisonOperation} operation - The comparison operation to be applied (either standard text or AI).
     * @returns {Promise<NutrientViewer.DocumentComparisonResult | NutrientViewer.AIDocumentComparisonResult>} - A promise that resolves to the result of the comparison. The type depends on the operation: `DocumentComparisonResult` for text comparison, `AIDocumentComparisonResult` for AI operations.
     * @memberof NutrientViewer.Instance
     */
    compareDocuments(comparisonDocuments: ComparisonDocuments, operation: ComparisonOperation): Promise<DocumentComparisonResult | AIDocumentComparisonResult>;};} &

T;

/**
 * The different possible validation states of the document. Based on the validation
 * of the digital signatures it contains.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @enum
 */
declare const DocumentValidationStatus: {
  /**
   * All of the signatures of the document are valid, that is, it should be shown with a green
   * checkmark or similar in the UI.
   * @public
   * @type {NutrientViewer.DocumentValidationStatus}
   */
  valid: string;
  /**
   * All of the signatures of the document are valid with concerns, that is, it should be shown with
   * a yellow warning or similar in the UI.
   * @public
   * @type {NutrientViewer.DocumentValidationStatus}
   */
  warning: string;
  /**
   * At least one signature of the document is invalid, that is, it should be shown with
   * a red cross of similar in the UI.
   * @public
   * @type {NutrientViewer.DocumentValidationStatus}
   */
  error: string;
  /**
   * The document does not contain digital signatures.
   * @public
   * @type {NutrientViewer.DocumentValidationStatus}
   */
  not_signed: string;};


declare type DocumentValidationStatusType = keyof typeof DocumentValidationStatus;

declare type DoNotSpellCheckPropertyPair = XOR<Record<'doNotSpellCheck', boolean>, Record<'doNotSpellcheck', boolean>>;

declare type dotNetObject = {
  invokeMethodAsync(methodName: string, ...args: any): Promise<any>;};

/**
 * @classdesc
 * An extension of the {@link NutrientViewer.Geometry.Point} that can also store an `intensity` value.
 * This is used for example inside an ink annotation, where the intensity is the pressure that was
 * exerted by the touch device.
 * @example <caption>Create and update a point</caption>
 * const point = new NutrientViewer.Geometry.DrawingPoint({
 *   x: 20,
 *   y: 30,
 *   intensity: 0.3
 * });
 * point.intensity; // => 0.3
 * @public
 * @memberof NutrientViewer.Geometry
 * @summary A 3D vector that describes a point in space and an intensity value.
 * @class DrawingPoint
 * @param {object} args An object used to initialize the Point. If `x` or `y` is omitted, `0` will
 *        be used instead. If `intensity` is omitted, `0.5` will be used (the neutral intensity
 *        value).
 * @default { x: 0, y: 0, intensity: 0.5 }
 * @extends NutrientViewer.Geometry.Point
 */
export declare class DrawingPoint extends Point {
  /**
   * The `intensity` is used to describe the pressure of a point inside an ink annotation. It is
   * capped between 0 and 1 inclusive.
   *
   * If the touch input does not allow to measure the pressure, a value of `0.5` should be used.
   * @public
   * @instance
   * @member {number} intensity
   * @memberof NutrientViewer.Geometry.DrawingPoint
   * @default 0.5
   */
  intensity: number;
  static defaultValues: IObject;
  constructor(options?: IDrawingPoint);}

/**
 * Represents one of the available signing methods for adding
 * new electronic signatures using the UI.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ElectronicSignatureCreationMode} DRAW - UI in which users draw a signature.
 * @property {NutrientViewer.ElectronicSignatureCreationMode} IMAGE - UI in which users pick or drag an image to use that as the signature.
 * @property {NutrientViewer.ElectronicSignatureCreationMode} TYPE - UI in which users can type a text and generate an image signature from it.
 */
declare const ElectronicSignatureCreationMode: {
  readonly DRAW: "DRAW";
  readonly IMAGE: "IMAGE";
  readonly TYPE: "TYPE";};


/**
 * @public
 * @callback ElectronicSignatureDefaultTextCallback@callback ElectronicSignatureDefaultTextCallback
 * @memberof NutrientViewer
 * @summary Callback that returns the default text for the Type Electronic Signature UI.
 * @returns {string | null} The default text for the Type Electronic Signature UI.
 */
declare type ElectronicSignatureDefaultTextCallback = () => string | undefined | void;

/**
 * Defines specific configuration options related to the electronic signatures feature.
 * @public
 * @memberof NutrientViewer
 * @interface ElectronicSignaturesConfiguration
 * @summary Object containing configuration options for electronic signatures
 * @example
 * NutrientViewer.load({
 *   electronicSignatures: {
 *     creationModes: [NutrientViewer.ElectronicSignatureCreationMode.IMAGE],
 *     fonts: [new NutrientViewer.Font("mycustomfont")]
 *   }
 * });
 */
declare type ElectronicSignaturesConfiguration = {
  /**
   * Array of tabs that should be offered to users on the
   * electronic signatures modal.
   * @public
   * @instance
   * @member {Array<NutrientViewer.ElectronicSignatureCreationMode>} creationModes
   * @memberof NutrientViewer.ElectronicSignaturesConfiguration
   */
  creationModes?: Readonly<IElectronicSignatureCreationMode[]>;
  /**
   * Array of {@link NutrientViewer.Font} fonts that users can choose from
   * when typing text for adding a new electronic signature.
   *
   * You can specify any additional font to use on a custom style sheet
   * set via {@link NutrientViewer.Configuration#styleSheets} via `@font-face`
   * CSS at-rule.
   *
   * When specifying the `name` of each `NutrientViewer.Font` record make sure
   * that it matches the one specified on the style sheet.
   * @public
   * @instance
   * @member {Array<NutrientViewer.Font>} fonts
   * @memberof NutrientViewer.ElectronicSignaturesConfiguration
   */
  fonts?: Readonly<Font[]>;
  /**
   * Optionally set an initial default text for the Type Electronic Signature UI.
   *
   * The default placeholder will be shown if the callback does not return a non-empty string,
   * or is not set to a non-empty string.
   * @example <caption>Setting a default text for the Type Electronic Signature UI</caption>
   *  NutrientViewer.load({
   *   electronicSignatures: {
   *    setDefaultTypeText: () => "My default text"
   *  }
   * });
   * @public
   * @optional
   * @instance
   * @member {?(NutrientViewer.ElectronicSignatureDefaultTextCallback | string)} setDefaultTypeText
   * @memberof NutrientViewer.ElectronicSignaturesConfiguration
   */
  setDefaultTypeText?: ElectronicSignatureDefaultTextCallback | string;
  /**
   * Optionally set color presets to be used in the Electronic Signatures dialog.
   * @example <caption>Setting custom color presets for the Type Electronic Signature UI</caption>
   *  NutrientViewer.load({
   *   electronicSignatures: {
   *     colorPresets: [
   *       {
   *         color: Color.RED,
   *         localization: {
   *           id: 'red',
   *           defaultMessage: 'Red',
   *           description: 'Red color',
   *         },
   *       },
   *       {
   *         color: Color.ORANGE,
   *         localization: {
   *           id: 'orange',
   *           defaultMessage: 'Orange',
   *           description: 'Orange color',
   *         },
   *       },
   *       {
   *         color: Color.YELLOW,
   *         localization: {
   *           id: 'yellow',
   *           defaultMessage: 'Yellow',
   *           description: 'Yellow color',
   *         },
   *       },
   *     ],
   *   }
   * });
   * @public
   * @optional
   * @instance
   * @member {?Array<NutrientViewer.ColorPreset>} colorPresets
   * @memberof NutrientViewer.ElectronicSignaturesConfiguration
   */
  colorPresets?: Readonly<ColorPreset[]>;};

/**
 * @classdesc
 * Ellipse annotations are used to draw ellipses on a page.
 *
 * Ellipse annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of ellipse annotations while
 * annotations behind the ellipse annotation are still selectable.
 *
 * Right now, ellipse annotations are implemented using SVG images. This behavior is subject to
 * change.
 *
 * <center>
 *   <img title="Example of an ellipse annotation" src="img/annotations/shape_ellipse_annotation.png" width="388" height="266" class="shadow">
 * </center>
 * @example <caption>Create an ellipse annotation</caption>
 * const annotation = new NutrientViewer.Annotations.EllipseAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 10,
 *     top: 10,
 *     width: 100,
 *     height: 100,
 *   }),
 *   cloudyBorderIntensity: 2,
 *   cloudyBorderInset: new NutrientViewer.Geometry.Inset({
 *     left: 9,
 *     top: 9,
 *     right: 9,
 *     bottom: 9,
 *   })
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display an ellipse on a page.
 * @class EllipseAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.ShapeAnnotation
 */
export declare class EllipseAnnotation<T extends IEllipseAnnotation = IEllipseAnnotation> extends ShapeAnnotation<T> {
  /**
   * Intensity of the cloudy border.
   *
   * If not present or 0, the annotation will use a normal border.
   * @public
   * @instance
   * @member {?number} cloudyBorderIntensity
   * @memberof NutrientViewer.Annotations.EllipseAnnotation
   * @default null Normal border.
   */
  cloudyBorderIntensity: null | number;
  /**
   * Cloudy border inset.
   *
   * For ellipse annotations with a cloudy border, it contains the values for the distances from
   * the bounding box to bounding box wrapped by the inner, where the content fits.
   *
   * Visual representation of the property:
   *
   * <center>
   * <img title="Example of a cloudy ellipse annotation" src="img/annotations/ellipse_inset.png" width="600" height="405" class="shadow">
   * </center>
   * @public
   * @instance
   * @member {?NutrientViewer.Geometry.Inset} cloudyBorderInset
   * @memberof NutrientViewer.Annotations.EllipseAnnotation
   */
  cloudyBorderInset: null | Inset;













  measurementBBox: null | Rect;
  static defaultValues: IObject;
  static readableName: string;
  constructor(options?: Partial<T>);}

export declare type EllipseAnnotationJSON = ShapeAnnotationJSON & {
  type: 'pspdfkit/shape/ellipse';
  cloudyBorderIntensity: number | null;
  cloudyBorderInset: InsetJSON | null;
  measurementBBox: IRectJSON | null;};

declare class EllipseAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: EllipseAnnotation;
  toJSON(): EllipseAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<EllipseAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): EllipseAnnotation;}

/**
 * @classdesc
 * This record is used to persist the information for an embedded file.
 * @public
 * @memberof NutrientViewer
 * @summary Embedded File.
 * @class EmbeddedFile
 * @noconstructor
 * @extends Immutable.Record
 * @seealso NutrientViewer.Instance#getEmbeddedFiles
 * @seealso NutrientViewer.Instance#getAttachment
 */
declare class EmbeddedFile extends EmbeddedFile_base {}

declare const EmbeddedFile_base: Immutable.Record.Factory<IEmbeddedFile>;

/**
 * This call back defines which text annotations should be treated as rich text annotation.
 * By default, all the text annotations are treated as plain text annotations, which means that
 * when you edit them, you will see the plain text editor. You can change this behavior by
 * returning `true` for the text annotations that you want to be treated as rich text annotations.
 *
 * For more information, see {@link NutrientViewer.Configuration#enableRichText}.
 * @public
 * @callback EnableRichTextCallback@callback EnableRichTextCallback
 * @memberof NutrientViewer
 * @param {TextAnnotation} textAnnotation
 * @example <caption>Only treat newly created annotations as rich text annotations</caption>
 * NutrientViewer.load({
 *   enableRichText: annotation => annotation.pageIndex === null
 *   // ...
 * });
 */
declare type EnableRichTextCallback = (annotation: TextAnnotation) => boolean;

declare class EventEmitter {
  listeners: Record<string, EventListener_2[]>;
  events: Array<string>;
  /**
   * Creates a new EventEmitter that only accepts the events defined in `events`. If this is an
   * empty array, it accepts all event names.
   */
  constructor(events?: Array<string>);
  /**
   * Register a new event listener for the `event` event
   * @param {string} event - The event you want to listen to
   * @param {Function} listener - The callback that should be triggered on each `event`
   */
  on(event: string, listener: EventListener_2): void;
  /**
   * Unregisters an event listener for the `event` event
   * @param {string} event - The event you want to listen to
   * @param {Function} listener - The callback that should be triggered on each `event`
   */
  off(event: string, listener: EventListener_2): void;
  /**
   * Emits an event
   * @param {string} event - The event you want to trigger
   * @param {...*} args - The parameters that will get forwarded to the callbacks
   */
  emit(event: string, ...args: Args): void;
  supportsEvent(event: string): boolean;
  isListening(events: Array<keyof EventMap>): boolean;}

declare type EventListener_2 = (...args: any) => any;

declare interface EventMap extends ViewStateEventMap {
  'annotationPresets.update': (event: AnnotationPresetsUpdateEvent) => void;
  'annotations.blur': (event: AnnotationsBlurEvent) => void;
  'annotations.change': () => void;
  'annotations.create': (annotations: List<AnnotationsUnion>) => void;
  'annotations.delete': (annotations: List<AnnotationsUnion>) => void;
  'annotations.didSave': () => void;
  'annotations.focus': (event: AnnotationsFocusEvent) => void;
  'annotations.load': (annotations: List<AnnotationsUnion>) => void;
  'annotations.press': (event: AnnotationsPressEvent) => void;
  'annotations.update': (annotations: List<AnnotationsUnion>) => void;
  'annotations.willChange': (event: {
    reason: AnnotationsWillChangeReason;
    annotations: List<AnnotationsUnion>;}) =>
  void;
  'annotations.willSave': () => void;
  'annotationSelection.change': (annotations: List<AnnotationsUnion>) => void;
  'annotations.transform': (event: AnnotationsTransformEvent) => void;
  'annotations.copy': (event: AnnotationsCopyEvent) => void;
  'annotations.cut': (event: AnnotationsCutEvent) => void;
  'annotations.paste': (event: AnnotationsPasteEvent) => void;
  'annotations.duplicate': (event: AnnotationsDuplicateEvent) => void;
  'bookmarks.change': () => void;
  'bookmarks.create': (bookmarks: List<Bookmark>) => void;
  'bookmarks.update': (bookmarks: List<Bookmark>) => void;
  'bookmarks.delete': (bookmarks: List<Bookmark>) => void;
  'bookmarks.load': (bookmarks: List<Bookmark>) => void;
  'bookmarks.didSave': () => void;
  'bookmarks.willSave': () => void;
  'comments.change': () => void;
  'comments.create': (comments: List<Comment_2>) => void;
  'comments.delete': (comments: List<Comment_2>) => void;
  'comments.update': (comments: List<Comment_2>) => void;
  'comments.load': () => void;
  'comments.willSave': () => void;
  'comments.didSave': () => void;
  'instant.connectedClients.change': (clients: Map_2<string, InstantClient>) => void;
  'document.change': (operations: DocumentOperation[]) => void;
  'document.saveStateChange': (event: SaveStateChangeEvent) => void;
  'formFieldValues.update': (formFields: List<FormField>) => void;
  'formFieldValues.willSave': () => void;
  'formFieldValues.didSave': (res: {
    response: Response;
    error: Error;}) =>
  void;
  'forms.willSubmit': (event: {
    preventDefault: () => void;}) =>
  void;
  'forms.didSubmit': (event: {
    preventDefault: () => void;}) =>
  void;
  'formFields.change': () => void;
  'formFields.create': (formFields: List<FormField>) => void;
  'formFields.delete': (formFields: List<FormField>) => void;
  'formFields.didSave': () => void;
  'formFields.load': (formFields: List<FormField>) => void;
  'formFields.update': (formFields: List<FormField>) => void;
  'formFields.willSave': () => void;
  'search.stateChange': (searchState: SearchState) => void;
  'search.termChange': (event: SearchTermChangeEvent) => void;
  'storedSignatures.change': () => void;
  'storedSignatures.create': (signature: Signature) => void;
  'storedSignatures.delete': (signature: Signature) => void;
  'storedSignatures.update': (signatures: List<Signature>) => void;
  'textLine.press': (event: TextLinePressEvent) => void;
  'textSelection.change': (selection: TextSelection | null) => void;
  'history.change': (event: HistoryEvent<'undo' | 'redo'>) => void;
  'history.willChange': (event: {
    type: 'create' | 'update' | 'delete';
    annotation: Annotation;
    preventDefault: () => void;}) =>
  void;
  'history.clear': () => void;
  'history.redo': (event: HistoryEvent<'redo'>) => void;
  'history.undo': (event: HistoryEvent<'undo'>) => void;
  'page.press': (event: PagePressEvent) => void;
  'inkSignatures.create': (signature: Signature) => void;
  'inkSignatures.delete': (signature: Signature) => void;
  'inkSignatures.update': (signatures: Signature[]) => void;
  'inkSignatures.change': () => void;
  'cropArea.changeStart': (opts: CropAreaChangeStartEvent) => void;
  'cropArea.changeStop': (opts: CropAreaChangeStopEvent) => void;
  'documentComparisonUI.start': (opts: DocumentComparisonUIStartEvent) => void;
  'documentComparisonUI.end': () => void;
  'annotationNote.press': (event: AnnotationNotePressEvent) => void;
  'annotationNote.hover': (event: AnnotationNoteHoverEvent) => void;
  'comments.mention': (event: CommentsMentionEvent) => void;}

declare type ExportOfficeFlags = {
  format: IDocumentOfficeFormat;};

declare type ExportPDFFlags = {
  flatten?: boolean;
  incremental?: boolean;
  includeComments?: boolean;
  saveForPrinting?: boolean;
  excludeAnnotations?: boolean;
  permissions?: {
    userPassword: string;
    ownerPassword: string;
    documentPermissions: Array<IDocumentPermissions>;};

  outputFormat?: boolean | PDFAFlags;
  optimize?: boolean | OptimizationFlags;
  flattenElectronicSignatures?: boolean;
  officeConversionSettings?: OfficeConversionSettings;};

declare class FaceVariant extends FaceVariant_base {}

declare const FaceVariant_base: Record_2.Factory<{
  bold: boolean;
  italic: boolean;}>;

export declare class Font extends Font_base {
  constructor(args: {
    name: string;
    callback?: FontCallback;});}



declare const Font_base: Record_2.Factory<IFont>;

/**
 * On Standalone, this callback receives the name of a font to retrieve as an argument
 * and you can return from it a `Promise` that resolves to a `Blob` with the font data to
 * use.
 *
 * See {@link https://www.nutrient.io/guides/web/current/features/custom-fonts/|this guide}
 * to learn more.
 * @public
 * @callback FontCallback@callback FontCallback
 * @param {string} fontName The `name` specified on the same {@link NutrientViewer.Font} constructor.
 * @example <caption>Create a custom font for retrieving "Arial.ttf"</caption>
 * new NutrientViewer.Font({
 *   name: "Arial.ttf",
 *   callback: name => fetch(`https://example.com/${name}`).then(r => r.blob());
 * })
 */
declare type FontCallback = (arg0: string) => Promise<Blob>;

/**
 * Font information extracted from PDF during content editing.
 * @public
 * @interface FontInfo
 * @memberof NutrientViewer
 */
declare interface FontInfo {
  /** The font name as declared in the PDF (e.g., "Helvetica-BoldOblique"). Rarely we can't find any name information. */
  name: string | null;
  /** The current font size being used. If matching is called during text selection, this may be null. */
  fontSize: number | null;}


/**
 * Font selection result for content editing font matching.
 * @public
 * @interface FontMatchResult
 * @memberof NutrientViewer
 */
declare interface FontMatchResult {
  /** The specific font face to use from the available fonts array */
  font: AvailableFontFace;
  /** The font size to use. If not specified, the size reported by the PDF will be used. */
  size: number | null | undefined;}


declare type FontSize = 'auto' | number;

/**
 * Describes the fonts that you would like to substitute in a document and the fonts you would like to use for that substitution
 *
 * Patterns are matched using the following rules:
 * - `*` matches multiple characters.
 * - `?` matches a single character.
 *
 * **Ordering matters** - As names could match multiple patterns, it's important to note that the order of the patterns matters.
 * **Case-insensitive** - Both the pattern and the target name are case-insensitive.
 * @public
 * @summary An array of fonts to be substituted and the fonts to substitute them with
 * @memberof NutrientViewer
 * @typedef {object} FontSubstitution@typedef {object} FontSubstitution
 * @property {string} pattern The font you would like to be substituted
 * @property {string} target  The font you would like to substitute the "from" font with
 * @example <caption>Substitute all Noto fonts found in the document with AwesomeFont</caption>
 *
 * const myFontsSubstitutions = [{
 *  pattern: "Noto*",
 *  target: "AwesomeFont"
 * }]
 *
 * NutrientViewer.load(
 *  //...
 *  fontSubstitutions: myFontsSubstitutions,
 * )
 */
declare type FontSubstitution = {
  pattern: string;
  target: string;};


/**
 * @classdesc
 * Form field type from which all form fields inherit. You can not instantiate from this type.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record}.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 *
 * Please see our {@link https://www.nutrient.io/guides/web/current/forms/introduction-to-forms/|forms guide
 * article} to learn more about form fields and for examples on how to create them.
 * @example <caption>Creating a form field.</caption>
 * const widget = new NutrientViewer.Annotations.WidgetAnnotation({
 *    // Generate unique ID so it can be referenced in form field before the widget is created.
 *    id: NutrientViewer.generateInstantId(),
 *    pageIndex: 0,
 *    formFieldName: 'form-field',
 *    boundingBox: new NutrientViewer.Geometry.Rect({
 *       left: 50,
 *       top: 50,
 *       width: 50,
 *       height: 50,
 *    }),
 * }),
 * const formField = new NutrientViewer.FormFields.TextFormField({
 *    name: 'form-field',
 *    annotationIds: new NutrientViewer.Immutable.List([widget.id]),
 * })
 * instance.create([widget, formField]);
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary Base form field type from which all form fields inherit.
 * @class FormField
 * @noconstructor
 * @extends Immutable.Record
 * @seealso NutrientViewer.Instance#create NutrientViewer.Instance#delete
 * @seealso NutrientViewer.Instance#ensureChangesSaved NutrientViewer.Instance#getFormFields
 * @seealso NutrientViewer.Instance#hasUnsavedChanges NutrientViewer.Instance#save
 * @seealso NutrientViewer.Instance#update
 * @seealso NutrientViewer.Configuration#disableForms NutrientViewer.Instance~FormFieldsLoadEvent
 * @seealso NutrientViewer.Instance~FormFieldsChangeEvent NutrientViewer.Instance~FormFieldsCreateEvent
 * @seealso NutrientViewer.Instance~FormFieldsUpdateEvent NutrientViewer.Instance~FormFieldsDeleteEvent
 * @seealso NutrientViewer.Instance~FormFieldsWillSaveEvent NutrientViewer.Instance~FormFieldsDidSaveEvent
 * @seealso NutrientViewer.Instance~FormWillSubmitEvent NutrientViewer.Instance~FormDidSubmitEvent
 */
export declare class FormField extends FormField_base {
  /**
   * A unique identifier to describe the form field record. When a form field is created in the UI, the
   * viewer has to generate a unique ID.
   *
   * When changes are saved to the underlying form field provider, we call
   * {@link NutrientViewer.Instance#ensureFormFieldSaved} to make sure the form field has been persisted
   * from the provider.
   * @public
   * @instance
   * @member {string} id
   * @memberof NutrientViewer.FormFields.FormField
   */
  id: ID;
  /**
   * Unique name of the form field (often referred to as fully qualified name). This name is used
   * to link {@link NutrientViewer.Annotations.WidgetAnnotation} and is also used as an identifier for
   * form field values.
   * @public
   * @instance
   * @member {string} name
   * @memberof NutrientViewer.FormFields.FormField
   */
  name: FormFieldName;
  /**
   * The object ID of the form field object in the PDF.
   * @public
   * @instance
   * @member {number} pdfObjectId
   * @memberof NutrientViewer.FormFields.FormField
   */
  pdfObjectId: number;
  /**
   * Holds an immutable list of {@link NutrientViewer.Annotations.WidgetAnnotation#id}s.
   * @public
   * @instance
   * @member {Immutable.List.<string>} annotationIds
   * @memberof NutrientViewer.FormFields.FormField
   */
  annotationIds: List<string>;
  /**
   * Used to identify the form field in the UI or for accessibility.
   * @public
   * @instance
   * @member {string} label
   * @memberof NutrientViewer.FormFields.FormField
   */
  label: string;
  /**
   * Read only form fields can not be filled out (similar to disabled HTML input elements).
   * @public
   * @instance
   * @member {boolean} readOnly
   * @memberof NutrientViewer.FormFields.FormField
   * @default false
   */
  readOnly: boolean;
  /**
   * Required form fields must be filled out in order to submit the form.
   *
   * {@link NutrientViewer.FormFields.TextFormField}, {@link NutrientViewer.FormFields.ComboBoxFormField} and
   * {@link NutrientViewer.FormFields.ListBoxFormField} with this flag set will be rendered with
   * the [`PSPDFKit-Annotation-Widget-Required`]{@link https://www.nutrient.io/api/web/css-Widget-Annotation.html#.PSPDFKit-Annotation-Widget-Required} public CSS class and the HTML `required` attribute set.
   * @public
   * @instance
   * @member {boolean} required
   * @memberof NutrientViewer.FormFields.FormField
   * @default false
   */
  required: boolean;
  /**
   * Form fields with the `noExport` flag won't appear in the serialized payload of a form
   * submission.
   * @public
   * @instance
   * @member {boolean} noExport
   * @memberof NutrientViewer.FormFields.FormField
   * @default false
   */
  noExport: boolean;
  /**
   * Optional actions to execute when an event is triggered.
   * @public
   * @instance
   * @member {?NutrientViewer.FormFieldAdditionalActions} additionalActions
   * @memberof NutrientViewer.FormFields.FormField
   * @default null
   */
  additionalActions: any;
  /**
   * This property is used to define the permission scope for this form-field, it's corresponding widget-annotations and form field values. If you change the `group` of a form field, the corresponding widget annotations and form field values will inherit it.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @instance
   * @member {string} group
   * @memberof NutrientViewer.FormFields.FormField
   */
  group?: string | null;
  /**
   * This property defines whether this form-field can be edited or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} isEditable
   * @memberof NutrientViewer.FormFields.FormField
   */
  isEditable?: boolean;
  /**
   * This property defines whether this form-field can be filled or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} isFillable
   * @memberof NutrientViewer.FormFields.FormField
   */
  isFillable?: boolean;
  /**
   * This property defines whether this form field can be deleted or not.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} isDeletable
   * @memberof NutrientViewer.FormFields.FormField
   */
  isDeletable?: boolean;
  /**
   * This property defines whether the user has permission to edit the group of this form field.
   * The value of this field depends on the set of collaboration permissions defined in the JWT token.
   *
   * It is only available when collaboration permissions is enabled on Server-Backed deployments.
   * @public
   * @readonly
   * @instance
   * @member {boolean} canSetGroup
   * @memberof NutrientViewer.FormFields.FormField
   */
  canSetGroup?: boolean;
  static defaultValues: IObject;
  constructor(args?: IFormField);}

declare const FormField_base: Immutable.Record.Factory<IFormField>;

declare type FormFieldAdditionalActionsType = {
  onChange?: Action;
  onCalculate?: Action;};

declare type FormFieldEventTriggerType = keyof FormFieldAdditionalActionsType;

declare type FormFieldFlags = Array<'readOnly' | 'required' | 'noExport'>;

declare type FormFieldInputAdditionalActionsType = FormFieldAdditionalActionsType & {
  onInput?: Action;
  onFormat?: Action;};

declare type FormFieldInputEventTriggerType = keyof FormFieldInputAdditionalActionsType;

declare type FormFieldJSON = ListBoxFormFieldJSON | ComboBoxFormFieldJSON | RadioButtonFormFieldJSON | CheckBoxFormFieldJSON | TextFormFieldJSON | ButtonFormFieldJSON | SignatureFormFieldJSON;

declare type FormFieldName = string;

/**
 * @classdesc
 * Record representing a form field value.
 *
 * To retrieve a list of all form field values, use {@link NutrientViewer.Instance#getFormFieldValues}.
 *
 * Please see our {@link https://www.nutrient.io/guides/web/current/forms/introduction-to-forms/|forms guide
 * article} to learn more about forms and for examples on how to set form field values.
 * @example <caption>Setting a form field value.</caption>
 * const formFieldValue = new NutrientViewer.FormFieldValue({
 *   name: 'Form field name',
 *   value: 'Form field value'
 * });
 * instance.update(formFieldValue);
 * @public
 * @memberof NutrientViewer
 * @summary Type representing a single form field value.
 * @class FormFieldValue
 * @extends Immutable.Record
 * @seealso NutrientViewer.Instance#update
 * @seealso NutrientViewer.Instance#setFormFieldValues
 * @seealso NutrientViewer.Instance#getFormFieldValues
 */
export declare class FormFieldValue extends FormFieldValue_base {
  /**
   * Unique name of the form field (often referred to as fully qualified name). This name is used
   * to link form field value to a {@link NutrientViewer.FormFields.FormField}.
   * @public
   * @instance
   * @member {string} name
   * @memberof NutrientViewer.FormFieldValue
   */
  name: string;
  /**
   * The value of the form field.
   * @public
   * @instance
   * @member {string} value
   * @memberof NutrientViewer.FormFieldValue
   */
  value: string | Immutable.List<string> | null;
  /**
   * Radio buttons and checkboxes can have multiple widgets with the same form value associated, but can be
   * selected independently. `optionIndexes` contains the value indexes that should be actually set.
   *
   * If set, the `value` field doesn't get used, and the widget found at the corresponding indexes in the form field's
   * `annotationIds` property are checked.
   *
   * If set on fields other than radio buttons or checkboxes, setting the form value will fail.
   * @public
   * @optional
   * @instance
   * @member {?NutrientViewer.Immutable.List.<number>} optionIndexes
   * @memberof NutrientViewer.FormFieldValue
   */
  optionIndexes?: Immutable.List<number>;










  isFitting?: boolean;
  static defaultValues: IObject;
  constructor(args?: IObject);}

declare const FormFieldValue_base: Immutable.Record.Factory<{
  name?: string | undefined;
  value?: string | number | Immutable.List<string> | null | undefined;
  optionIndexes?: Immutable.List<number> | undefined;
  isFitting?: boolean | undefined;}>;

/**
 * @classdesc
 * A form option is used to identify all possible options for the following form field types:
 *
 * - {@link NutrientViewer.FormFields.CheckBoxFormField}
 * - {@link NutrientViewer.FormFields.ListBoxFormField}
 * - {@link NutrientViewer.FormFields.RadioButtonFormField}
 * - {@link NutrientViewer.FormFields.ComboBoxFormField}
 *
 * The index of the {@link NutrientViewer.Annotations.WidgetAnnotation#id} in the
 * {@link NutrientViewer.FormFields.FormField#annotationIds} property is used to find the option
 * for this widget annotation (the index is the same):
 *
 * ```
 * const index = formField.annotationIds.findIndex(id => id === annotation.id);
 * const option = formField.options.get(index);
 * console.log(option.value);
 * ```
 * @public
 * @memberof NutrientViewer
 * @summary Form field options
 * @class FormOption
 * @param {object} args An object of the members.
 * @extends Immutable.Record
 */
export declare class FormOption extends FormOption_base {}


declare const FormOption_base: Record_2.Factory<{
  label: string;
  value: string;}>;


declare type FormOptionJSON = {
  label: string;
  value: string;};

declare type FormsConfiguration = {
  export?: FormsConfigurationExport;};


/**
 * Defines specific configuration options related to forms.
 * @public
 * @memberof NutrientViewer
 * @interface FormsConfiguration
 * @summary Object containing configuration options for forms
 * @example
 * NutrientViewer.load({
 *   formsConfiguration: {
 *     export: { disableComboBoxArrow: true }
 *   }
 * });
 */
/**
 * Defines configuration options regarding settings when exporting/saving a PDF.
 * @public
 * @memberof NutrientViewer
 * @interface FormsConfigurationExport
 * @summary Object containing configuration options for exporting/saving a PDF with forms.
 * @example
 * NutrientViewer.load({
 *   formsConfiguration: {
 *     export: { disableComboBoxArrow: true }
 *   }
 * });
 */
/**
 * When true, disables writing the arrow button into the saved PDF.
 * @public
 * @instance
 * @member {?boolean} [disableComboBoxArrow]
 * @memberof NutrientViewer.FormsConfigurationExport
 * @default false
 */
declare type FormsConfigurationExport = {
  disableComboBoxArrow?: boolean;};


declare function FormsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a {@link NutrientViewer.Immutable.List} of all {@link NutrientViewer.FormFields} for this
     * document.
     * @public
     * @example
     * instance.getFormFields().then(formFields => {
     *   formFields.forEach(formField => {
     *     console.log(formField.name);
     *   });
     *
     *   // Filter form fields by type
     *   formFields.filter(formField => (
     *     formField instanceof NutrientViewer.FormFields.TextFormField
     *   ));
     *
     *   // Get the total number of form fields
     *   const totalFormFields = formFields.size;
     * })
     * @readonly
     * @instance
     * @function getFormFields
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.FormFields.FormField>>} Resolves to a
     *   list of all form fields.
     * @memberof NutrientViewer.Instance
     */
    getFormFields(): Promise<List<FormField>>;
    /**
     * Returns a simplified object that contains all form fields currently loaded and maps to their values. This
     * object can be used to serialize form field values.
     *
     * Values can be of type `null`, `string`, or `Array.<string>`.
     *
     * This method does not check if all the form fields have been loaded. If you want to make sure that
     * the all the document's form field values are retrieved, you have to make sure that the form fields
     * have been retrieved first.
     * @public
     * @example
     * await instance.getFormFields()
     * const formFieldValues = instance.getFormFieldValues();
     * console.log(formFieldValues); // => { textField: 'Text Value', checkBoxField: ['A', 'B'], buttonField: null }
     * @instance
     * @readonly
     * @function getFormFieldValues
     * @returns {object} A simplified object that contains all form field
     *   values.
     * @memberof NutrientViewer.Instance
     */
    getFormFieldValues(): Record<string, null | string | Array<string>>;
    /**
     * Updates the values of form fields. It's possible to update multiple form fields at once.
     *
     * The object must use the {@link NutrientViewer.FormFields.FormField#name} as a key and the
     * values must be of type `null`, `string`, or `Array.<string>`. A `null` value will reset
     * the form field to either `null`, or its default value if available.
     *
     * This method returns a Promise that resolves when all the form fields have been updated, so
     * it should be awaited whenever you need to get or modify form fields immediately to ensure the form field
     * value is synchronized.
     * @public
     * @example
     * instance.setFormFieldValues({
     *   textField: "New Value",
     *   checkBoxField: ["B", "C"],
     * });
     * @instance
     * @readonly
     * @function setFormFieldValues
     * @param {object} formFieldValues An object that contains the form field names that should be updated as
     *   keys and their value as values.
     * @returns {Promise.<void>} Resolves when the values have been set.
     * @memberof NutrientViewer.Instance
     */
    setFormFieldValues(formFieldValues: Record<string, null | string | Array<string>>): Promise<void>;
    /**
     * You can programmatically modify the properties of the widget annotation and the associated form field just
     * before it is created via the form creator UI.
     * @public
     * @example
     * instance.setOnWidgetAnnotationCreationStart((annotation, formField) => {
     *   return { annotation: annotation.set('opacity', 0.7) };
     * });
     * @instance
     * @function setOnWidgetAnnotationCreationStart
     * @param {NutrientViewer.OnWidgetAnnotationCreationStartCallback} callback The callback to set the values of created form fields programmatically.
     * @returns {void}
     * @memberof NutrientViewer.Instance
     */
    setOnWidgetAnnotationCreationStart(callback: OnWidgetAnnotationCreationStartCallback): void;};} &

T;

/**
 * Deeply converts plain JS objects and arrays to Immutable Maps and Lists.
 *
 * If a `reviver` is optionally provided, it will be called with every
 * collection as a Seq (beginning with the most nested collections
 * and proceeding to the top-level collection itself), along with the key
 * referring to each collection and the parent JS object provided as `this`.
 * For the top level, object, the key will be `""`. This `reviver` is expected
 * to return a new Immutable Collection, allowing for custom conversions from
 * deep JS objects. Finally, a `path` is provided which is the sequence of
 * keys to this value from the starting value.
 *
 * `reviver` acts similarly to the [same parameter in `JSON.parse`][1].
 *
 * If `reviver` is not provided, the default behavior will convert Objects
 * into Maps and Arrays into Lists like so:
 *
 * <!-- runkit:activate -->
 * ```js
 * const { fromJS, isKeyed } = require('immutable')
 * function (key, value) {
 *   return isKeyed(value) ? value.toMap() : value.toList()
 * }
 * ```
 *
 * `fromJS` is conservative in its conversion. It will only convert
 * arrays which pass `Array.isArray` to Lists, and only raw objects (no custom
 * prototype) to Map.
 *
 * Accordingly, this example converts native JS data to OrderedMap and List:
 *
 * <!-- runkit:activate -->
 * ```js
 * const { fromJS, isKeyed } = require('immutable')
 * fromJS({ a: {b: [10, 20, 30]}, c: 40}, function (key, value, path) {
 *   console.log(key, value, path)
 *   return isKeyed(value) ? value.toOrderedMap() : value.toList()
 * })
 *
 * > "b", [ 10, 20, 30 ], [ "a", "b" ]
 * > "a", {b: [10, 20, 30]}, [ "a" ]
 * > "", {a: {b: [10, 20, 30]}, c: 40}, []
 * ```
 *
 * Keep in mind, when using JS objects to construct Immutable Maps, that
 * JavaScript Object properties are always strings, even if written in a
 * quote-less shorthand, while Immutable Maps accept keys of any type.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map } = require('immutable')
 * let obj = { 1: "one" };
 * Object.keys(obj); // [ "1" ]
 * assert.equal(obj["1"], obj[1]); // "one" === "one"
 *
 * let map = Map(obj);
 * assert.notEqual(map.get("1"), map.get(1)); // "one" !== undefined
 * ```
 *
 * Property access for JavaScript Objects first converts the key to a string,
 * but since Immutable Map keys can be of any type the argument to `get()` is
 * not altered.
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Example.3A_Using_the_reviver_parameter
 *      "Using the reviver parameter"
 */
declare function fromJS(
jsValue: any,
reviver?: (
key: string | number,
sequence: Collection.Keyed<string, any> | Collection.Indexed<any>,
path?: Array<string | number>) =>
any)
: any;

declare function generateInstantId(): InstantID;

/**
 * Returns the value within the provided collection associated with the
 * provided key, or notSetValue if the key is not defined in the collection.
 *
 * A functional alternative to `collection.get(key)` which will also work on
 * plain Objects and Arrays as an alternative for `collection[key]`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { get } = require('immutable')
 * get([ 'dog', 'frog', 'cat' ], 2) // 'frog'
 * get({ x: 123, y: 456 }, 'x') // 123
 * get({ x: 123, y: 456 }, 'z', 'ifNotSet') // 'ifNotSet'
 * ```
 */
declare function get<K, V>(collection: Collection<K, V>, key: K): V | undefined;

declare function get<K, V, NSV>(collection: Collection<K, V>, key: K, notSetValue: NSV): V | NSV;

declare function get<TProps extends Object, K extends keyof TProps>(record: Record_2<TProps>, key: K, notSetValue: any): TProps[K];

declare function get<V>(collection: Array<V>, key: number): V | undefined;

declare function get<V, NSV>(collection: Array<V>, key: number, notSetValue: NSV): V | NSV;

declare function get<C extends Object, K extends keyof C>(object: C, key: K, notSetValue: any): C[K];

declare function get<V>(collection: {[key: string]: V;}, key: string): V | undefined;

declare function get<V, NSV>(collection: {[key: string]: V;}, key: string, notSetValue: NSV): V | NSV;

/**
 * Returns the value at the provided key path starting at the provided
 * collection, or notSetValue if the key path is not defined.
 *
 * A functional alternative to `collection.getIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { getIn } = require('immutable')
 * getIn({ x: { y: { z: 123 }}}, ['x', 'y', 'z']) // 123
 * getIn({ x: { y: { z: 123 }}}, ['x', 'q', 'p'], 'ifNotSet') // 'ifNotSet'
 * ```
 */
declare function getIn(collection: any, keyPath: Iterable<any>, notSetValue: any): any;

declare type GetTypeFromAnnotationJSON<T extends {
  type: keyof AnnotationSerializerTypeMap;}> =
T extends {
  type: infer U;} ?
U : never;

/**
 * @classdesc
 * PDF action to go to a destination (page) in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("pageIndex", 2);`.
 *
 * A GoToAction can define a different `pageIndex` in the same document. When clicking on it, we
 * will update the scroll position to make the page visible. We will not update the zoom level in
 * that case.
 * @example <caption>Create a new GoToAction</caption>
 * const action = new NutrientViewer.Actions.GoToAction({ pageIndex: 10 });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Go to a destination (page) in the current document.
 * @class GoToAction
 * @param {object} args An object with the `pageIndex` key used to initialize the action.
 * @extends NutrientViewer.Actions.Action
 */
export declare class GoToAction extends Action {
  /**
   * The page index of the page that should be made visible when triggering this action.
   *
   * `pageIndex` is zero-based and has a maximum value of `totalPageCount - 1`.
   * @public
   * @instance
   * @member {number} pageIndex
   * @memberof NutrientViewer.Actions.GoToAction
   */
  pageIndex: number;
  static defaultValues: IObject;
  constructor(args?: IGoToAction);}

/**
 * @classdesc
 * PDF action to go to an embedded file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example:
 * `action.set("relativePath", "/other_document.pdf");`.
 * @example <caption>Create a new GoToEmbeddedAction</caption>
 * const action = new NutrientViewer.Actions.GoToEmbeddedAction({
 *   relativePath: "/other_document.pdf"
 * });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Go to an embedded file.
 * @class GoToEmbeddedAction
 * @param {object} args
 * @extends NutrientViewer.Actions.Action
 */
export declare class GoToEmbeddedAction extends Action {
  /**
   * Should the file be opened in a new window?
   * @public
   * @instance
   * @member {boolean} newWindow
   * @memberof NutrientViewer.Actions.GoToEmbeddedAction
   */
  newWindow: boolean;
  /**
   * The relative path to the embedded file.
   * @public
   * @instance
   * @member {string} relativePath
   * @memberof NutrientViewer.Actions.GoToEmbeddedAction
   */
  relativePath: string;
  /**
   * The target type. Can either be `parent` or `child`.
   * @public
   * @instance
   * @member {string} targetType
   * @memberof NutrientViewer.Actions.GoToEmbeddedAction
   */
  targetType: 'parent' | 'child';
  static defaultValues: IObject;
  constructor(args?: IGoToEmbeddedAction);}

/**
 * @classdesc
 * PDF action to go to a different (remote) file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example:
 * `action.set("relativePath", "/other_document.pdf");`.
 * @example <caption>Create a new GoToRemoteAction</caption>
 * const action = new NutrientViewer.Actions.GoToRemoteAction({
 *   relativePath: "/other_document.pdf"
 * });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Go to a different (remote) file.
 * @class GoToRemoteAction
 * @param {object} args
 * @extends NutrientViewer.Actions.Action
 */
export declare class GoToRemoteAction extends Action {
  /**
   * The relative path of the file to open.
   * @public
   * @instance
   * @member {string} relativePath
   * @memberof NutrientViewer.Actions.GoToRemoteAction
   */
  relativePath: string;
  /**
   * A named destination.
   * @public
   * @instance
   * @member {string} namedDestination
   * @memberof NutrientViewer.Actions.GoToRemoteAction
   */
  namedDestination: string;
  static defaultValues: IObject;
  constructor(args?: IGoToRemoteAction);}

/**
 * Returns true if the key is defined in the provided collection.
 *
 * A functional alternative to `collection.has(key)` which will also work with
 * plain Objects and Arrays as an alternative for
 * `collection.hasOwnProperty(key)`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { has } = require('immutable')
 * has([ 'dog', 'frog', 'cat' ], 2) // true
 * has([ 'dog', 'frog', 'cat' ], 5) // false
 * has({ x: 123, y: 456 }, 'x') // true
 * has({ x: 123, y: 456 }, 'z') // false
 * ```
 */
declare function has(collection: Object, key: any): boolean;

/**
 * The `hash()` function is an important part of how Immutable determines if
 * two values are equivalent and is used to determine how to store those
 * values. Provided with any value, `hash()` will return a 31-bit integer.
 *
 * When designing Objects which may be equal, it's important that when a
 * `.equals()` method returns true, that both values `.hashCode()` method
 * return the same value. `hash()` may be used to produce those values.
 *
 * For non-Immutable Objects that do not provide a `.hashCode()` functions
 * (including plain Objects, plain Arrays, Date objects, etc), a unique hash
 * value will be created for each *instance*. That is, the create hash
 * represents referential equality, and not value equality for Objects. This
 * ensures that if that Object is mutated over time that its hash code will
 * remain consistent, allowing Objects to be used as keys and values in
 * Immutable.js collections.
 *
 * Note that `hash()` attempts to balance between speed and avoiding
 * collisions, however it makes no attempt to produce secure hashes.
 *
 * *New in Version 4.0*
 */
declare function hash(value: any): number;

/**
 * Returns true if the key path is defined in the provided collection.
 *
 * A functional alternative to `collection.hasIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { hasIn } = require('immutable')
 * hasIn({ x: { y: { z: 123 }}}, ['x', 'y', 'z']) // true
 * hasIn({ x: { y: { z: 123 }}}, ['x', 'q', 'p']) // false
 * ```
 */
declare function hasIn(collection: any, keyPath: Iterable<any>): boolean;

/**
 * @classdesc
 * PDF action to hide an annotation or form field.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("hide", true);`.
 *
 * When clicking on an annotation with a `HideAction`, the annotations specified in its
 * `annotationReferences` property will be hidden.
 * @example <caption>Create a new HideAction</caption>
 * const action = new NutrientViewer.Actions.HideAction({ hide: true });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Hide an annotation or form field.
 * @class HideAction
 * @param {object} args
 * @extends NutrientViewer.Actions.Action
 */
export declare class HideAction extends Action {
  /**
   * If `true`, the action will hide the annotation, otherwise it will show it.
   * @public
   * @instance
   * @member {boolean} hide
   * @memberof NutrientViewer.Actions.HideAction
   */
  hide: boolean;
  /**
   * A list of references to annotations, either via the `pdfObjectId` or a form field name.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<{fieldName: string} | {pdfObjectId: number}>} annotationReferences
   * @memberof NutrientViewer.Actions.HideAction
   */
  annotationReferences: List<AnnotationReference>;
  static defaultValues: IObject;
  constructor(args?: IHideAction);}

/**
 * @classdesc
 * A highlight markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a highlight annotation</caption>
 * var rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * var annotation = new NutrientViewer.Annotations.HighlightAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Highlight markup annotation.
 * @class HighlightAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.MarkupAnnotation
 */
/**
 * The color of the highlight annotation.
 * @public
 * @member {NutrientViewer.Color} color
 * @memberof NutrientViewer.Annotations.HighlightAnnotation
 * @instance
 * @default Color.LIGHT_YELLOW
 * @override
 */
export declare class HighlightAnnotation<T extends IHighlightAnnotation = IHighlightAnnotation> extends TextMarkupAnnotation<T> {
  /**
   * The blend mode defines how the color of the annotation will be applied to its background.
   * @public
   * @member {NutrientViewer.BlendMode} blendMode
   * @memberof NutrientViewer.Annotations.HighlightAnnotation
   * @instance
   * @default "multiply"
   * @override
   */
  blendMode: IBlendMode;
  static className: string;
  static readableName: string;
  static defaultValues: IObject;}

export declare class HighlightState extends HighlightState_base {}

declare const HighlightState_base: Record_2.Factory<IHighlightState>;

declare type Hints = {
  glyphs: Array<number | string>;};

declare interface HistoryEvent<T> {
  action: T;
  before: AnnotationsUnion;
  after: AnnotationsUnion;}

declare function HistoryMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * History API.
     *
     * The History API includes methods to undo and redo annotation operations: creation,
     * updates and deletions may be reverted and restored by means of this API.
     *
     * The implementation does not fully revert an annotation to its previous state:
     * - The `updatedAt` field will have changed to the current time.
     * - If an annotation deletion is undone, the restored annotation will have a different `id`
     * than the original.
     * - If an annotation deletion is undone, the restored annotation will appear at the front,
     * regardless of its original stacking position.
     * - Annotation changes that only affect the `updatedAt` property are not tracked, and the updated
     * annotation is considered identical to the previous one in this case.
     * - Newly created empty text annotations are not recorded in the history. This ensures that
     * accidental creation of such annotations, followed by pressing escape or clicking outside,
     * will not persist in the undo and redo history.
     *
     * The feature only accounts for annotations modified locally, wether using the API or the
     * toolbar Undo and Redo buttons. If an annotation is modified externally, by another Instant client,
     * for example, undoing will not revert the annotation state to the one just before the external change,
     * but to the previous to that one: external annotation operations are not undone, but
     * overridden.
     *
     * Annotation operations performed while the History API is disabled can also be considered external
     * for that effect. This is also the case for annotation operations that result from Instant Comments
     * changes, like deleting the last comment of a comment thread, which results on the comment marker
     * being deleted, and which cannot therefore be undone.
     *
     * However, comment markers directly deleted with the API may be restored with its former comments.
     *
     * {@link NutrientViewer.AnnotationPresets|Annotation presets} are not restored by undo and redo operations.
     * @public
     * @summary History namespace.
     * @namespace NutrientViewer.Instance.history
     */
    history: {
      /**
       * When called, the last local annotation operation will be reverted. The outcome
       * will vary depending on the type of that operation:
       *
       * - Annotation creation: the annotation will be deleted.
       * - Annotation modification: the previous state of the annotation will be reverted.
       * - Annotation deletion: the annotation will be restored.
       *
       * Note that if a deleted annotation is restored by calling this function, it will
       * reappear in front of any other annotations, even if that was not its original stacking order.
       *
       * Returns `true` if the operation has been undone successfully, `false` if there are no
       * undoable operations available or the History API is disabled.
       * @example
       * await instance.create(new NutrientViewer.Annotations.RectangleAnnotation({
       *   pageIndex: 0,
       *   boundingBox: new NutrientViewer.Geometry.Rect({
       *     left: 200,
       *     top: 150,
       *     width: 250,
       *     height: 75
       *   })
       * }));
       * console.log("Annotation created!");
       * await instance.history.undo();
       * console.log("Annotation creation undone: annotation deleted!");
       * @example
       * // Undo all previous actions
       * while (await instance.history.undo()) {}
       * @public
       * @instance
       * @function undo
       * @memberof NutrientViewer.Instance.history
       * @returns {Promise.<boolean>} The result of the undo operation.
       */
      undo: () => boolean;
      /**
       * When called, the last undone annotation operation will be performed again.
       *
       * Note that if an annotation deletion has been undone, and then redone by calling this function, it will
       * reappear in front of any other annotations, even if that was not its original stacking order.
       *
       * Returns `true` if the operation has been redone successfully, `false` if there are no
       * redoable operations available or the History API is disabled.
       * @example
       * await instance.create(new NutrientViewer.Annotations.RectangleAnnotation({
       *   pageIndex: 0,
       *   boundingBox: new NutrientViewer.Geometry.Rect({
       *     left: 200,
       *     top: 150,
       *     width: 250,
       *     height: 75
       *   })
       * }));
       * console.log("Annotation created!");
       * await instance.delete();
       * console.log("Annotation deleted!");
       * await instance.history.undo();
       * console.log("Annotation creation undone: annotation deleted!");
       * await instance.history.redo();
       * console.log("Annotation creation redone: annotation created!");
       * @public
       * @instance
       * @function redo
       * @memberof NutrientViewer.Instance.history
       * @returns {Promise.<boolean>} The result of the redo operation.
       */
      redo: () => boolean;
      /**
       * Returns `true` if it's possible to undo a previous operation, `false` otherwise,
       * also if the History API is disabled.
       * @public
       * @instance
       * @function canUndo
       * @memberof NutrientViewer.Instance.history
       * @returns {boolean} Wether it's possible to undo a previous operation.
       */
      canUndo: () => any;
      /**
       * Returns `true` if it's possible to redo a previously undone operation, `false` otherwise,
       * also if the History API is disabled.
       * @public
       * @instance
       * @function canRedo
       * @memberof NutrientViewer.Instance.history
       * @returns {boolean} Wether it's possible to redo a previously undone operation.
       */
      canRedo: () => any;
      /**
       * Removes all undoable and redoable operations available.
       * @public
       * @instance
       * @function clear
       * @memberof NutrientViewer.Instance.history
       * @returns {} Clear undo and redo history.
       */
      clear: () => void;
      /**
       * Enables the History API, making undoing and redoing possible. If there were previous undoable or
       * redoable operations, they will be now available.
       * @public
       * @instance
       * @function enable
       * @memberof NutrientViewer.Instance.history
       * @returns {} Enable tracking undo and redo history.
       */
      enable: () => void;
      /**
       * Disables the History API: attempting to undo or redo previous operations with the API or the UI
       * will not be possible, but the previous undoable and redoable operations will be preserved, and
       * available if the History API is enabled again with {@link NutrientViewer.Instance.history.enable}.
       * @public
       * @instance
       * @function disable
       * @memberof NutrientViewer.Instance.history
       * @returns {} Disable tracking undo and redo history.
       */
      disable: () => void;};};} &

T;

/**
 * Describes a hunk of changes within a document comparison.
 * @public
 * @memberof NutrientViewer
 * @interface Hunk
 * @property {NutrientViewer.Range} originalRange - The range in the original document.
 * @property {NutrientViewer.Range} changedRange - The range in the changed document.
 * @property {NutrientViewer.Operation[]} operations - The operations within the hunk.
 */
declare type Hunk = {
  originalRange: Range_3;
  changedRange: Range_3;
  operations: Operation[];};

declare function I18nMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Sets the locale for the application. When setting a locale that doesn't exist it tries to
     * fall back to the parent locale when available. For example `en-US` falls back to `en`.
     *
     * See {@link NutrientViewer.I18n.locales} to get a list of all the available locales.
     * @public
     * @instance
     * @function setLocale
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the locale does not exist.
     * @param {string} locale The locale to set the app to. It must be one of {@link NutrientViewer.I18n.locales}.
     * @returns {Promise} void Returns a promise that resolves once the locale is set.
     */
    setLocale(locale: string): Promise<void>;
    /**
     * Returns the current locale for the application.
     * @public
     * @readonly
     * @instance
     * @member {string} locale
     * @memberof NutrientViewer.Instance
     */
    readonly locale: string;};} &

T;

declare interface IAIComparisonOperationOptions extends IComparisonOperationOptions {
  operationType: IAIComparisonOperationType;
  categories?: string[];}

declare type IAIComparisonOperationType = (typeof AIComparisonOperationType)[keyof typeof AIComparisonOperationType];

declare type IAIComparisonPhase = (typeof AIComparisonPhase)[keyof typeof AIComparisonPhase];

declare type IAlignment = (typeof Alignment)[keyof typeof Alignment];

declare type IAnnotationJSON = Omit<BaseAnnotationJSON, 'id' | 'group' | 'permissions'>;

declare type IAnnotationToolbarType = 'stroke-color' | 'fill-color' | 'background-color' | 'opacity' | 'line-width' | 'blend-mode' | 'spacer' | 'delete' | 'annotation-note' | 'border-color' | 'border-width' | 'border-style' | 'color' | 'linecaps-dasharray' | 'line-style' | 'font' | 'overlay-text' | 'outline-color' | 'apply-redactions' | 'measurementType' | 'measurementScale' | 'back' | 'crop-current' | 'crop-all' | 'close';

/**
 * boolean is maintained for backward compatibility, string values should be preferred.
 */
declare type IAnonymousCommentMode = boolean | (typeof AnonymousCommentMode)[keyof typeof AnonymousCommentMode];

declare type IAutoSaveMode = (typeof AutoSaveMode)[keyof typeof AutoSaveMode];

declare type IBlendMode = (typeof BlendMode)[keyof typeof BlendMode];

declare type IBorderStyle = (typeof BorderStyle)[keyof typeof BorderStyle];

/**
 * Properties of the arrow line attached to a callout (text) annotation.
 * @public
 * @summary Callout arrow line properties.
 * @member {object} Callout
 * @memberof NutrientViewer
 * @property {?NutrientViewer.Geometry.Point} start - Starting point of the arrow line.
 * @property {?NutrientViewer.Geometry.Point} knee - Knee point of the arrow line.
 * @property {?NutrientViewer.Geometry.Point} end - Ending point of the arrow line.
 * @property {?NutrientViewer.LineCap} cap - The line cap style.
 * @property {?NutrientViewer.Geometry.Inset} innerRectInset - The inner rectangle inset.
 */
declare type ICallout = {
  start: Point | null;
  knee: Point | null;
  end: Point | null;
  cap: ILineCap | null;
  innerRectInset: Inset | null;};

declare type ICollaboratorPermissionsOptions = {
  group?: IGroup;
  permissions?: IPermissions;};

declare type ICommentDisplay = (typeof CommentDisplay)[keyof typeof CommentDisplay];

declare interface IComparisonOperation {
  type: IComparisonOperationType;
  options?: IComparisonOperationOptions;}

/**
 * @classdesc
 * ComparisonOperation is a class that provides methods to describe a comparison operation.
 * It encapsulates the type and optional settings for the comparison.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `scale.set("options", { numberOfContextWords: 4 })`
 * @example <caption>Create a new text comparison operation</caption>
 * const operation = new ComparisonOperation(NutrientViewer.ComparisonOperationType.TEXT, { numberOfContextWords: 2 });
 * @example <caption>Create a new AI comparison operation</caption>
 * const aiOperation = new ComparisonOperation(
 *   NutrientViewer.ComparisonOperationType.AI,
 *   { operationType: NutrientViewer.AIComparisonOperationType.ANALYZE, model: 'gpt4o' }
 * );
 * @public
 * @memberof NutrientViewer
 * @class ComparisonOperation
 * @summary The descriptor for a comparison operation.
 * @extends Immutable.Record
 * @default { type: NutrientViewer.ComparisonOperationType.TEXT, options: { numberOfContextWords: 0 } }
 */
declare interface IComparisonOperationOptions {
  [key: string]: any;}

declare type IComparisonOperationType = (typeof ComparisonOperationType)[keyof typeof ComparisonOperationType];

declare type IConformance = (typeof Conformance)[keyof typeof Conformance];

declare interface ICustomOverlayItem {
  disableAutoZoom?: boolean;
  id: CustomOverlayItemID | null;
  node: Node | null;
  noRotate?: boolean;
  pageIndex: number;
  position: Point;
  onAppear?: null | ((...args: Args) => void);
  onDisappear?: null | ((...args: Args) => void);}

declare type ID = string;

declare type ID_2 = string;

declare type IDocumentComparisonSourceType = (typeof DocumentComparisonSourceType)[keyof typeof DocumentComparisonSourceType];

/**
 * @classdesc
 * DocumentDescriptor is a class that provides methods to describe a document for comparison.
 * It encapsulates the file path, optional password, and page indexes for the document.
 * @example <caption>Create a new DocumentDescriptor</caption>
 * const doc = new DocumentDescriptor({ filePath: "path/to/document.pdf", pageIndexes: [0, 1] });
 * @public
 * @memberof NutrientViewer
 * @summary The descriptor for a document to be compared.
 * @extends Immutable.Record
 * @class DocumentDescriptor
 */
declare interface IDocumentDescriptor {
  filePath?: string | ArrayBuffer;
  password?: string;
  pageIndexes: Array<number | [number, number]>;
  jwt?: string;}


declare type IDocumentOfficeFormat = (typeof OfficeDocumentFormat)[keyof typeof OfficeDocumentFormat];

declare type IDocumentPermissions = (typeof DocumentPermissionsEnum)[keyof typeof DocumentPermissionsEnum];

declare interface IDrawingPoint extends PointCtorProps {
  intensity?: number;}

declare type IElectronicSignatureCreationMode = (typeof ElectronicSignatureCreationMode)[keyof typeof ElectronicSignatureCreationMode];

declare interface IEllipseAnnotation extends IShapeAnnotation {
  cloudyBorderIntensity?: number | null;
  cloudyBorderInset?: Inset | null;}

declare interface IEmbeddedFile {
  id: ID;
  attachmentId: string;
  description: null | string;
  fileName: null | string;
  fileSize: null | number;
  updatedAt: null | Date;}

/**
 * @classdesc
 * This record is used to persist information related to custom fonts on Standalone deployments.
 * Custom fonts need to be specified during the instance load and correctly fetched.
 * They will be used while rendering the document contents and exporting its annotations.
 * @example <caption>Create a new Font object</caption>
 * const fetcher = name =>
 *   fetch(`https://example.com/${name}`).then(r => {
 *     if (r.status === 200) {
 *       return r.blob();
 *     } else {
 *       throw new Error();
 *     }
 *   });
 *
 * const customFonts = ["arial.ttf", "helvetica.ttf", "tahoma.ttf"]
 *   .map(font => new NutrientViewer.Font({ name: font, callback: fetcher }));
 *
 * NutrientViewer.load({
 *   customFonts,
 *   regular options...
 * }).then(instance => {});
 * @public
 * @memberof NutrientViewer
 * @summary An object used to load a new font.
 * @class Font
 * @extends Immutable.Record
 * @param {object} args An object used to load a new font.
 */
declare interface IFont {
  name: string | null;
  callback: FontCallback | null;}


declare interface IFormField {
  id?: ID;
  pdfObjectId?: number | null;
  annotationIds?: List<string>;
  name?: FormFieldName;
  label?: string;
  readOnly?: boolean;
  required?: boolean;
  noExport?: boolean;
  additionalActions?: any;
  group?: string | null;
  isEditable?: boolean;
  isFillable?: boolean;
  isDeletable?: boolean;
  canSetGroup?: boolean;
  [key: string]: any;}

declare type IFunction<T = void> = (...args: any[]) => T;

declare interface IGoToAction extends ActionCtorProps {
  pageIndex?: number;}

declare interface IGoToEmbeddedAction extends ActionCtorProps {
  newWindow?: boolean;
  relativePath?: string;
  targetType?: 'parent' | 'child';}

declare interface IGoToRemoteAction extends ActionCtorProps {
  relativePath?: string;
  namedDestination?: string;}

declare type IGroup = string | null | undefined;

declare interface IHideAction extends ActionCtorProps {
  hide?: boolean;
  annotationReferences?: List<AnnotationReference>;}

declare interface IHighlightAnnotation extends ITextMarkupAnnotation {
  color: Color;
  blendMode: IBlendMode | 'multiply';}

declare interface IHighlightState {
  pageIndex: number;
  rectsOnPage: List<Rect>;}

declare interface IImageAnnotation extends AnnotationProperties {
  description: string | null;
  fileName: string | null;
  contentType: string | null;
  imageAttachmentId: string | null;
  isSignature: boolean;
  xfdfAppearanceStream: string | null;
  xfdfAppearanceStreamOriginalPageRotation: number | null;}

declare interface IInkAnnotation extends AnnotationProperties {
  lines: List<List<DrawingPoint>>;
  lineWidth: number | null;
  strokeColor: Color | null;
  backgroundColor: Color | null;
  isDrawnNaturally: boolean;
  isSignature: boolean;}

declare type IInkEraserMode = (typeof InkEraserMode)[keyof typeof InkEraserMode];

declare interface IInset {
  left: number;
  top: number;
  right: number;
  bottom: number;}


declare type IInteractionMode = (typeof InteractionMode)[keyof typeof InteractionMode];

declare interface IJavaScriptAction extends ActionCtorProps {
  script?: string;}

declare interface ILaunchAction extends ActionCtorProps {
  filePath?: string;}

declare type ILayoutMode = (typeof LayoutMode)[keyof typeof LayoutMode];

declare interface ILineAnnotation extends IShapeAnnotation {
  startPoint: Point | null;
  endPoint: Point | null;
  lineCaps: LineCapsType | null;
  /** @deprecated Use `startPoint` and `endPoint` instead. */
  points: List<Point> | null;}

declare type ILineCap = (typeof LineCap)[keyof typeof LineCap];

declare interface ILinkAnnotation extends AnnotationProperties {
  action: Action | null;
  borderColor: Color | null;
  borderStyle: IBorderStyle | null;
  borderWidth: number | null;}

/**
 * @classdesc
 * Image annotations are images that are added to a PDF document.
 *
 * It is also possible to import the first page of a PDF by setting the
 * appropriate
 * [`contentType`]{@link NutrientViewer.Annotations.ImageAnnotation#contentType},
 * however the imported PDF won't include the annotations unless they are flattened in
 * advance.
 * @example <caption>Create an image annotation</caption>
 * const request = await fetch("https://example.com/image.jpg");
 * const blob = await request.blob();
 * const imageAttachmentId = await instance.createAttachment(blob);
 * const annotation = new NutrientViewer.Annotations.ImageAnnotation({
 *   pageIndex: 0,
 *   contentType: "image/jpeg",
 *   imageAttachmentId,
 *   description: "Example Image Annotation",
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 10,
 *     top: 20,
 *     width: 150,
 *     height: 150,
 *   }),
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display an image annotation, which represent an images in a PDF file.
 * @class ImageAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 * @seealso NutrientViewer.Instance#createAttachment NutrientViewer.Instance#getAttachment
 */
export declare class ImageAnnotation<T extends IImageAnnotation = IImageAnnotation> extends Annotation<T> {
  /**
   * A description of the image content.
   * @public
   * @instance
   * @member {?string} description
   * @memberof NutrientViewer.Annotations.ImageAnnotation
   */
  description: null | string;
  /**
   * The file name of the attached file.
   * @public
   * @instance
   * @member {?string} fileName
   * @memberof NutrientViewer.Annotations.ImageAnnotation
   */
  fileName: null | string;
  /**
   * The content type of the connected attachment binary data.
   *
   * We currently support:
   * - `image/jpeg`
   * - `image/png`
   * - `application/pdf`
   * @public
   * @instance
   * @member {string} contentType
   * @memberof NutrientViewer.Annotations.ImageAnnotation
   */
  contentType: string;
  /**
   * The attachment identifier of the image. It holds the image data as binary.
   * @public
   * @instance
   * @member {string} imageAttachmentId
   * @memberof NutrientViewer.Annotations.ImageAnnotation
   */
  imageAttachmentId: string;
  /**
   * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
   * annotation with a rotation value of `0` will make it appear in the same direction as the UI
   * appears, when no {@link NutrientViewer.ViewState#pagesRotation} is set.
   *
   * Can either be 0°, 90°, 180°, or 270°. Multiple or negative values are normalized to this
   * interval.
   * @public
   * @instance
   * @member {number} rotation
   * @memberof NutrientViewer.Annotations.ImageAnnotation
   * @default 0
   */
  rotation: number;
  /**
   * When an image annotation is created via the signature UI, this flag is set to true.
   * @public
   * @instance
   * @member {boolean} isSignature
   * @memberof NutrientViewer.Annotations.ImageAnnotation
   * @default false
   */
  isSignature: boolean;
  xfdfAppearanceStream: null | string;
  xfdfAppearanceStreamOriginalPageRotation: null | number;
  static defaultValues: IObject;
  static readableName: string;}

export declare type ImageAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/image';
  description?: string | null;
  fileName?: string | null;
  contentType: string;
  imageAttachmentId: string;
  rotation: number;
  isSignature?: boolean;
  xfdfAppearanceStream?: string;
  xfdfAppearanceStreamOriginalPageRotation?: number;};

declare class ImageAnnotationSerializer extends AnnotationSerializer {
  annotation: ImageAnnotation;
  constructor(annotation: ImageAnnotation);
  toJSON(): ImageAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<ImageAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): ImageAnnotation;}

declare interface IMauiBridge {
  initialize(webEventDispatcher: dotNetObject): void;
  addAdvanceAccessScript(path: string): Promise<void>;
  loadDocumentFromPath(path: string, viewerConfigurationJson: string): Promise<void>;
  loadDocumentFromBase64String(fileContentAsBase64String: string, viewerConfigurationJson: string): Promise<void>;
  loadDocumentFromBuffer(documentBuffer: Uint8Array, viewerConfigurationJson: string): Promise<void>;
  setMainToolbarItems(toolbarItems: string): void;
  setAnnotationToolbarItems(annotationType: string, toolbarItems: string): void;
  setViewState(propertyName: keyof IViewState, value: object): void;
  exportDocument(configurationJSON: string): Promise<Uint8Array>;
  unload(): void;
  applyRedactions(): void;
  createAnnotation(annotationJson: string): Promise<string>;
  deleteAnnotations(annotationIdsJson: string): void;
  flattenAnnotations(pageIndices: number[]): Promise<void>;
  getAnnotations(pageIndex: number): Promise<string>;
  setSelectedAnnotations(annotationIdsJson: string): void;
  updateAnnotation(annotationJson: string): void;
  subscribeToEvent(event: string): void;
  unsubscribeFromEvent(event: string): void;
  showDocumentLoadingIndicator(): void;
  showGenericProcessingIndicator(): void;
  hideGenericProcessingIndicator(): void;}

declare type IMeasurementPrecision = (typeof MeasurementPrecision)[keyof typeof MeasurementPrecision];

declare interface IMeasurementScale {
  unitFrom: IMeasurementScaleUnitFrom;
  unitTo: IMeasurementScaleUnitTo;
  fromValue: number;
  toValue: number;}

declare type IMeasurementScaleUnitFrom = (typeof MeasurementScaleUnitFrom)[keyof typeof MeasurementScaleUnitFrom];

declare type IMeasurementScaleUnitTo = (typeof MeasurementScaleUnitTo)[keyof typeof MeasurementScaleUnitTo];

declare interface IMediaAnnotation extends AnnotationProperties {
  description: null | string;
  fileName: null | string;
  contentType: string | null;
  mediaAttachmentId: string | null;}

declare namespace Immutable {
  export {
  List,
  Map_2 as Map,
  OrderedMap,
  Set_2 as Set,
  OrderedSet,
  Stack,
  Range_2 as Range,
  Repeat,
  Record_2 as Record,
  Seq,
  Collection,
  fromJS,
  is,
  hash,
  isImmutable,
  isCollection,
  isKeyed,
  isIndexed,
  isAssociative,
  isOrdered,
  isValueObject,
  isSeq,
  isList,
  isMap,
  isOrderedMap,
  isStack,
  isSet,
  isOrderedSet,
  isRecord,
  get,
  has,
  remove,
  set,
  update,
  getIn,
  hasIn,
  removeIn,
  setIn,
  updateIn,
  merge,
  mergeWith,
  mergeDeep,
  mergeDeepWith,
  RecordOf,
  ValueObject };}



declare type IModificationType = (typeof ModificationType)[keyof typeof ModificationType];

declare type ImportPageIndex = Array<number | Range_4>;

declare interface INamedAction extends ActionCtorProps {
  action?: string;}

declare const InheritableImmutableRecord: new <T extends Record<string, unknown>>(values?: Partial<T> | Iterable<[string, unknown]> | undefined) => __dangerousImmutableRecordFactory<T>;

/**
 * The blend mode defines how the color of the annotation will be applied to its background.
 * @public
 * @instance
 * @member {NutrientViewer.BlendMode} blendMode
 * @memberof NutrientViewer.Annotations.InkAnnotation
 * @default "normal"
 */
/**
 * @classdesc
 * Ink annotations are used for free hand drawings on a page. They can contain multiple segments
 * (see the definition of `lines` below). Points within the same segment are connected to a line.
 *
 * Ink annotations are only selectable around their visible lines. This means that you can create a
 * page full of line annotations while annotations behind the ink annotation are still selectable.
 *
 * Right now, ink annotations are implemented using SVG images. This behavior is object to change.
 *
 * <center>
 *   <img title="Example of an ink annotation" src="img/annotations/ink_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create an ink annotation that displays a cross</caption>
 * const annotation = new NutrientViewer.Annotations.InkAnnotation({
 *   pageIndex: 0,
 *   lines: NutrientViewer.Immutable.List([
 *     NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 5,  y: 5 }),
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 95, y: 95}),
 *     ]),
 *     NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 95, y: 5 }),
 *       new NutrientViewer.Geometry.DrawingPoint({ x: 5,  y: 95}),
 *     ])
 *   ]),
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 0,
 *     top: 0,
 *     width: 100,
 *     height: 100,
 *   }),
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display free hand drawings on a page.
 * @class InkAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 * @seealso NutrientViewer.Instance#getInkSignatures NutrientViewer.Instance#setInkSignatures
 * @seealso NutrientViewer.Configuration#populateInkSignatures
 * @seealso NutrientViewer.Instance~InkSignatureCreateEvent NutrientViewer.Instance~InkSignatureChangeEvent
 * @seealso NutrientViewer.Instance~InkSignatureUpdateEvent NutrientViewer.Instance~InkSignatureDeleteEvent
 */
export declare class InkAnnotation<T extends IInkAnnotation = IInkAnnotation> extends Annotation<T> {
  /**
   * A list of line segments. Every segment consists again of a list of points with additional
   * intensity information.
   *
   * The two nested lists are required since one ink annotation can consist of multiple lines.
   * Within one segment, points will be connected using lines or curves.
   *
   * We use {@link NutrientViewer.Geometry.DrawingPoint} for an additional intensity value (usually
   * the pressure of a pointer device) that is used to reconstruct the naturally drawn image. If a
   * device without intensity is used, the default intensity of `0.5` will be used.
   *
   * If no lines are present, the annotation will not be visible.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<NutrientViewer.Immutable.List.<NutrientViewer.Geometry.DrawingPoint>>} lines
   * @memberof NutrientViewer.Annotations.InkAnnotation
   * @default NutrientViewer.Immutable.List() Empty list
   */
  lines: List<List<DrawingPoint>>;
  /**
   * The width of the lines in page size pixels. Per default, we use values between 1 and 40 in
   * the UI.
   *
   * The line width will scale when you zoom in.
   * @public
   * @instance
   * @member {number} lineWidth
   * @memberof NutrientViewer.Annotations.InkAnnotation
   * @default 5
   */
  lineWidth: number;
  /**
   * A {@link NutrientViewer.Color} for the visible line
   * @public
   * @instance
   * @member {NutrientViewer.Color} strokeColor
   * @memberof NutrientViewer.Annotations.InkAnnotation
   * @default Color.BLUE
   */
  strokeColor: Color | null;
  /**
   * Optional background color that will fill the complete bounding box.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} backgroundColor
   * @memberof NutrientViewer.Annotations.InkAnnotation
   * @default null
   */
  backgroundColor: Color | null;
  /**
   * NutrientViewer's Natural Drawing mode. This value will currently not effect rendering on NutrientViewer
   * for Web.
   * @public
   * @instance
   * @member {boolean} isDrawnNaturally
   * @memberof NutrientViewer.Annotations.InkAnnotation
   * @default false
   */
  isDrawnNaturally: boolean;
  /**
   * When an ink annotation is created via the signature UI, this flag is set to true.
   * @public
   * @instance
   * @member {boolean} isSignature
   * @memberof NutrientViewer.Annotations.InkAnnotation
   * @default false
   */
  isSignature: boolean;
  static defaultValues: IObject;
  static readableName: string;}

export declare type InkAnnotationJSON = BaseAnnotationJSON & {
  type: 'pspdfkit/ink';
  lines: {
    points: [number, number][][];
    intensities: number[][];};

  lineWidth: number;
  strokeColor: string | null;
  backgroundColor: string | null;
  isDrawnNaturally: boolean;
  isSignature: boolean;};

declare class InkAnnotationSerializer extends AnnotationSerializer {
  annotation: InkAnnotation;
  constructor(annotation: InkAnnotation);
  toJSON(): InkAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<InkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): InkAnnotation;
  _linesToJSON(): {
    points: [number, number][][];
    intensities: number[][];};

  static _JSONToLines(linesJSON: {
    points: Array<Array<[number, number]>>;
    intensities: Array<Array<number>>;})
  : List<List<DrawingPoint>>;}












declare const InkEraserMode: {
  readonly POINT: "POINT";
  readonly STROKE: "STROKE";};


declare type InlineTextSelectionToolbarItem = Omit<ToolItem, 'type'> & {
  type: InlineToolbarType | 'custom';};

declare type InlineTextSelectionToolbarItemsCallback = (options: {
  defaultItems: InlineTextSelectionToolbarItem[];
  hasDesktopLayout: boolean;},
selection: TextSelection_2) => InlineTextSelectionToolbarItem[];

declare type InlineToolbarType = (typeof builtInItems)[number];

declare interface INoteAnnotation extends AnnotationProperties {
  text: {
    format: 'plain';
    value: string;};

  icon: string | INoteIcon;
  color: Color;}

declare type INoteIcon = (typeof NoteIcon)[keyof typeof NoteIcon];

/**
 * @classdesc
 * An inset describes a rectangle by enumerating the distance from each side to the corresponding
 * side of a reference rectangle. Therefore it does not hold coordinates, nor dimensions, only
 * relative values for `left`, `top`, `right` and `bottom`. Provided values are defined in same units
 * used by the page, point units. Point units are only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `inset.set("right", 15)`.
 * @example <caption>Create and update an inset</caption>
 * const inset = new NutrientViewer.Geometry.Inset({
 *   left: 5,
 *   top: 15,
 *   right: 10,
 *   bottom: 5
 * });
 * inset = inset.set("bottom", 7);
 * rect.bottom; // => 7
 * @public
 * @memberof NutrientViewer.Geometry
 * @summary A relative rectangle inset in 2D space.
 * @class Inset
 * @param {object} args An object used to initialize the Point. If `left`, `top`, `right` or `bottom`
 *        is omitted, `0` will be used instead.
 * @default { left: 0, top: 0, right: 0, bottom: 0 }
 * @extends Immutable.Record
 */
export declare class Inset extends Inset_base {
  /**
   * Returns a new Rect by adding the provided inset values to the provided Rect.
   * @example
   * const rect = NutrientViewer.Geometry.Inset.applyToRect(
   *   rectangleAnnotation.cloudyBorderInset,
   *   rectangleAnnotation.boundingBox
   * );
   * @public
   * @function applyToRect
   * @memberof NutrientViewer.Geometry.Inset
   * @param {Inset} inset An Inset instance.
   * @param {Rect} rect A Rect instance.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  static applyToRect(inset: Inset, rect: Rect): Rect;
  static fromRect(rect: Rect): Inset;
  /**
   * Returns a new inset using the provided vale for all properties.
   * @example
   * const inset = NutrientViewer.Geometry.Inset.fromValue(10);
   * // inset ->
   * // {
   * //    left: 10,
   * //    top: 10,
   * //    right: 10,
   * //    bottom: 10,
   * // }
   * @public
   * @function fromValue
   * @memberof NutrientViewer.Geometry.Inset
   * @param {number} insetValue An inset value to be applied to all the properties.
   * @returns {NutrientViewer.Geometry.Inset} A new `Inset`.
   */
  static fromValue(insetValue: number): Inset;
  /**
   * Applies a transformation to the inset. We will transform
   * each of the corners represented by the inset and then
   * find the max and min values to generate the resulting
   * inset.
   */
  apply(matrix: TransformationMatrix): Inset;
  /**
   * Returns a new inset with the provided scale applied to all properties.
   * @param {number} scale The scale to apply to the inset.
   */
  setScale(scale: number): Inset;}


declare const Inset_base: Record_2.Factory<IInset>;

declare type InsetJSON = [left: number, top: number, right: number, bottom: number];

export declare class Instance extends Instance_base {
  constructor(config: any);}


declare const Instance_base: Constructor<InstanceInterface>;

declare interface InstanceInterface extends BaseMixin, InstanceType<ReturnType<typeof AnnotationSelectionMixin>>, InstanceType<ReturnType<typeof AnnotationPermissionMixin>>, InstanceType<ReturnType<typeof ViewStateMixin>>, InstanceType<ReturnType<typeof ToolbarItemsMixin>>, InstanceType<ReturnType<typeof TextSelectionMixin>>, InstanceType<ReturnType<typeof StampAnnotationTemplatesMixin>>, InstanceType<ReturnType<typeof SignaturesMixin>>, InstanceType<ReturnType<typeof SearchMixin>>, InstanceType<ReturnType<typeof RenderPageMixin>>, InstanceType<ReturnType<typeof RedactionsMixin>>, InstanceType<ReturnType<typeof PrivateAPIMixin>>, InstanceType<ReturnType<typeof I18nMixin>>, InstanceType<ReturnType<typeof HistoryMixin>>, InstanceType<ReturnType<typeof FormsMixin>>, InstanceType<ReturnType<typeof DocumentTextComparisonMixin>>, InstanceType<ReturnType<typeof DocumentOperationsMixin>>, InstanceType<ReturnType<typeof DocumentEditorMixin>>, InstanceType<ReturnType<typeof DocumentComparisonMixin>>, InstanceType<ReturnType<typeof DigitalSignaturesMixin>>, InstanceType<ReturnType<typeof CustomOverlayItemsMixin>>, InstanceType<ReturnType<typeof ContentEditorMixin>>, InstanceType<ReturnType<typeof CommentsMixin>>, InstanceType<ReturnType<typeof CommentPermissionMixin>>, InstanceType<ReturnType<typeof CollaborationPermissionsMixin>>, InstanceType<ReturnType<typeof ChangesMixin>>, InstanceType<ReturnType<typeof BookmarksMixin>>, InstanceType<ReturnType<typeof AnnotationTabOrderMixin>>, InstanceType<ReturnType<typeof AnnotationPresetsMixin>>, InstanceType<ReturnType<typeof AIAssistantMixin>>, InstanceType<ReturnType<typeof MiscellaneousMixin>>, InstanceType<ReturnType<typeof AnnotationsMixin>> {}


declare type Instant = {
  public: boolean;};

export declare class InstantClient {
  clientId: string;
  userId: string | null | undefined;}


declare type InstantID = string;

declare type InstantID_2 = InstantID;

declare type InstantJSON = SerializedJSON & {
  format: 'https://pspdfkit.com/instant-json/v1';
  pdfId?: {
    permanent: string;
    changing: string;};};

/**
 * Controls the current interaction mode in the viewer.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.InteractionMode} TEXT_HIGHLIGHTER When this mode is activated, the creation of new highlight annotations will
 * be enabled and the text will be highlighted as it's selected.
 * @property {NutrientViewer.InteractionMode} INK When this mode is activated, the creation of new ink annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {NutrientViewer.InteractionMode} INK_SIGNATURE Deprecated: When this mode is activated, the creation of new ink signatures will be enabled. This
 * this shows a dialog where it is possible to select an existing ink signature or create a new one
 * and store it.
 *
 * This interaction mode is deprecated and it will act just like `SIGNATURE`.
 * @property {NutrientViewer.InteractionMode} SIGNATURE When this mode is activated, the creation of new signatures will be enabled. This
 * shows a dialog where it is possible to select an existing signature or create a new
 * one and potentially save it.
 * @property {NutrientViewer.InteractionMode} STAMP_PICKER When this mode is activated, the stamp annotation templates picker modal UI will
 * be shown. Once a template is selected, the new annotation is configured and created\
 * in the document.
 * @property {NutrientViewer.InteractionMode} STAMP_CUSTOM When this mode is activated, the custom stamp annotation template editor modal UI will
 * be shown. Once a the custom template is edited, the new custom stamp annotation
 * will be created in the document.
 * @property {NutrientViewer.InteractionMode} SHAPE_LINE When this mode is activated, the creation of new line annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {NutrientViewer.InteractionMode} SHAPE_RECTANGLE When this mode is activated, the creation of new rectangle annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {NutrientViewer.InteractionMode} SHAPE_ELLIPSE When this mode is activated, the creation of new ellipse annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {NutrientViewer.InteractionMode} SHAPE_POLYGON When this mode is activated, the creation of new polygon annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {NutrientViewer.InteractionMode} SHAPE_POLYLINE When this mode is activated, the creation of new polyline annotations will be enabled. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it. If
 * properties (e.g. color) or the page index changes, a new annotation is created.
 * @property {NutrientViewer.InteractionMode} INK_ERASER When this mode is activated, removing of current ink annotation points will be enabled. This
 * transforms the page to a canvas where the cursor can remove ink annotation points by hand,
 * as well as choose the cursor width.
 * @property {NutrientViewer.InteractionMode} NOTE When this mode is activated, the creation of new note annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {NutrientViewer.InteractionMode} COMMENT_MARKER When this mode is activated, the creation of new comment marker annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {NutrientViewer.InteractionMode} TEXT When this mode is activated, the creation of new text annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {NutrientViewer.InteractionMode} CALLOUT When this mode is activated, the creation of new callout annotations will be enabled. This
 * transforms the page to a clickable area where the annotation will be created at the position
 * of the click.
 * @property {NutrientViewer.InteractionMode} PAN This enables the pan tool to allow the user to navigate on a desktop browser using mouse
 * dragging. This will disable text selection.
 *
 * On a touch device, this will have no effect since panning is already the default technique for
 * scrolling on websites.
 * @property {NutrientViewer.InteractionMode} SEARCH Enables the search mode and focuses the search input field.
 * @property {NutrientViewer.InteractionMode} DOCUMENT_EDITOR This shows the document editor modal.
 * @property {NutrientViewer.InteractionMode} MARQUEE_ZOOM  This enables the Marquee Zoom tool. When enabled, you can draw a rectangle
 * on the screen which is zoomed into and scrolled to, once the pointer is
 * released.
 * @property {NutrientViewer.InteractionMode} REDACT_TEXT_HIGHLIGHTER When this mode is activated, the creation of new redaction annotations will
 * be enabled by highlighting regions of text and the text will be marked for
 * redaction as it's selected.
 * @property {NutrientViewer.InteractionMode} REDACT_SHAPE_RECTANGLE When this mode is activated, the creation of new redaction annotations will be enabled by
 * drawing rectangles on the pages. This transforms the page to a drawable canvas and annotations
 * are created while drawing on it.
 * @property {NutrientViewer.InteractionMode} DOCUMENT_CROP When this mode is activated, the creation of cropping area selection is enabled.
 * @property {NutrientViewer.InteractionMode} BUTTON_WIDGET When this mode is activated, the creation of button widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} TEXT_WIDGET When this mode is activated, the creation of text widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} RADIO_BUTTON_WIDGET When this mode is activated, the creation of radio button widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} CHECKBOX_WIDGET When this mode is activated, the creation of checkbox widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} COMBO_BOX_WIDGET When this mode is activated, the creation of combo box widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} LIST_BOX_WIDGET When this mode is activated, the creation of list box widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} SIGNATURE_WIDGET When this mode is activated, the creation of signature widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} DATE_WIDGET When this mode is activated, the creation of date widget annotations is enabled.
 * @property {NutrientViewer.InteractionMode} FORM_CREATOR When this mode is activated, you will be able to edit and create widget annotations.
 * @property {NutrientViewer.InteractionMode} LINK When this mode is activated, you will be able to create link annotations.
 * @property {NutrientViewer.InteractionMode} DISTANCE When this mode is activated, you will be able to create distance annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {NutrientViewer.InteractionMode} PERIMETER When this mode is activated, you will be able to create perimeter annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {NutrientViewer.InteractionMode} RECTANGLE_AREA When this mode is activated, you will be able to create Rectangle Area annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {NutrientViewer.InteractionMode} ELLIPSE_AREA When this mode is activated, you will be able to create Ellipse Area annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {NutrientViewer.InteractionMode} POLYGON_AREA When this mode is activated, you will be able to create Polygon Area annotations. This
 * transforms the page to a drawable canvas and an annotation is created while drawing on it.
 * @property {NutrientViewer.InteractionMode} CONTENT_EDITOR Available only in Standalone mode with the content editor license: when this mode is activated, you will be able to edit the page contents.
 * @property {NutrientViewer.InteractionMode} MULTI_ANNOTATIONS_SELECTION When this mode is activated, multiple annotations can be selected with the UI.
 * @property {NutrientViewer.InteractionMode} MEASUREMENT Available only with the measurement license: when this mode is activated, the measurement annotations mode will be activated.
 * @property {NutrientViewer.InteractionMode} MEASUREMENT_SETTINGS Available only with the measurement license: when this mode is activated, the measurement settings mode will be activated.
 */
declare const InteractionMode: {
  readonly TEXT_HIGHLIGHTER: "TEXT_HIGHLIGHTER";
  readonly INK: "INK";
  readonly INK_SIGNATURE: "INK_SIGNATURE";
  readonly SIGNATURE: "SIGNATURE";
  readonly STAMP_PICKER: "STAMP_PICKER";
  readonly STAMP_CUSTOM: "STAMP_CUSTOM";
  readonly SHAPE_LINE: "SHAPE_LINE";
  readonly SHAPE_RECTANGLE: "SHAPE_RECTANGLE";
  readonly SHAPE_ELLIPSE: "SHAPE_ELLIPSE";
  readonly SHAPE_POLYGON: "SHAPE_POLYGON";
  readonly SHAPE_POLYLINE: "SHAPE_POLYLINE";
  readonly INK_ERASER: "INK_ERASER";
  readonly NOTE: "NOTE";
  readonly COMMENT_MARKER: "COMMENT_MARKER";
  readonly TEXT: "TEXT";
  readonly CALLOUT: "CALLOUT";
  readonly PAN: "PAN";
  readonly SEARCH: "SEARCH";
  readonly DOCUMENT_EDITOR: "DOCUMENT_EDITOR";
  readonly MARQUEE_ZOOM: "MARQUEE_ZOOM";
  readonly REDACT_TEXT_HIGHLIGHTER: "REDACT_TEXT_HIGHLIGHTER";
  readonly REDACT_SHAPE_RECTANGLE: "REDACT_SHAPE_RECTANGLE";
  readonly DOCUMENT_CROP: "DOCUMENT_CROP";
  readonly BUTTON_WIDGET: "BUTTON_WIDGET";
  readonly TEXT_WIDGET: "TEXT_WIDGET";
  readonly RADIO_BUTTON_WIDGET: "RADIO_BUTTON_WIDGET";
  readonly CHECKBOX_WIDGET: "CHECKBOX_WIDGET";
  readonly COMBO_BOX_WIDGET: "COMBO_BOX_WIDGET";
  readonly LIST_BOX_WIDGET: "LIST_BOX_WIDGET";
  readonly SIGNATURE_WIDGET: "SIGNATURE_WIDGET";
  readonly DATE_WIDGET: "DATE_WIDGET";
  readonly FORM_CREATOR: "FORM_CREATOR";
  readonly LINK: "LINK";
  readonly DISTANCE: "DISTANCE";
  readonly PERIMETER: "PERIMETER";
  readonly RECTANGLE_AREA: "RECTANGLE_AREA";
  readonly ELLIPSE_AREA: "ELLIPSE_AREA";
  readonly POLYGON_AREA: "POLYGON_AREA";
  readonly CONTENT_EDITOR: "CONTENT_EDITOR";
  readonly MULTI_ANNOTATIONS_SELECTION: "MULTI_ANNOTATIONS_SELECTION";
  readonly MEASUREMENT: "MEASUREMENT";
  readonly MEASUREMENT_SETTINGS: "MEASUREMENT_SETTINGS";
  readonly ATTACHMENT_PREVIEW: "ATTACHMENT_PREVIEW";};


export declare type Interfaces = Record<string, string>;

declare type Intersection<T, U> = T extends U ? T : never;

declare type IObject = Record<string, any>;

declare type IPermissions = {
  edit: boolean;
  delete: boolean;
  setGroup: boolean;
  fill?: boolean;
  reply?: boolean;};


declare interface IPolygonAnnotation extends IShapeAnnotation {
  points: List<Point> | null;
  cloudyBorderIntensity: number | null;}

declare interface IPolyLineAnnotation extends IShapeAnnotation {
  points: List<Point> | null;
  lineCaps: LineCapsType | null;}

declare type IPrintMode = (typeof PrintMode)[keyof typeof PrintMode];

declare type IPrintQuality = (typeof PrintQuality)[keyof typeof PrintQuality];

declare type IProcessorEngine = (typeof ProcessorEngine)[keyof typeof ProcessorEngine];

declare type IProductId = (typeof ProductId)[keyof typeof ProductId];

declare interface IRect {
  left?: number;
  top?: number;
  width?: number;
  height?: number;}

declare interface IRectangleAnnotation extends IShapeAnnotation {
  cloudyBorderIntensity?: number | null;
  cloudyBorderInset?: Inset | null;}

declare type IRectJSON = [left: number, top: number, width: number, height: number];

declare interface IRedactionAnnotation extends ITextMarkupAnnotation {
  color: Color;
  fillColor: null | Color;
  overlayText: null | string;
  repeatOverlayText: null | boolean;
  outlineColor: null | Color;}

declare interface IResetFormAction extends ActionCtorProps {
  fields?: List<string> | null | undefined;
  includeExclude?: boolean;}

/**
 * Value equality check with semantics similar to `Object.is`, but treats
 * Immutable `Collection`s as values, equal if the second `Collection` includes
 * equivalent values.
 *
 * It's used throughout Immutable when checking for equality, including `Map`
 * key equality and `Set` membership.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map, is } = require('immutable')
 * const map1 = Map({ a: 1, b: 1, c: 1 })
 * const map2 = Map({ a: 1, b: 1, c: 1 })
 * assert.equal(map1 !== map2, true)
 * assert.equal(Object.is(map1, map2), false)
 * assert.equal(is(map1, map2), true)
 * ```
 *
 * `is()` compares primitive types like strings and numbers, Immutable.js
 * collections like `Map` and `List`, but also any custom object which
 * implements `ValueObject` by providing `equals()` and `hashCode()` methods.
 *
 * Note: Unlike `Object.is`, `Immutable.is` assumes `0` and `-0` are the same
 * value, matching the behavior of ES6 Map key equality.
 */
declare function is(first: any, second: any): boolean;

/**
 * Type guard to determine if a result is an AIDocumentAnalysisResult
 * This helper checks if the result comes from an "analyze" operation (AIADocumentChangesAnalysisResponse).
 * @public
 * @memberof NutrientViewer
 * @param {NutrientViewer.DocumentComparisonResult | NutrientViewer.AIDocumentComparisonResult} result - The result to check
 * @returns {boolean} True if the result is an AI document analysis result
 * @example
 * if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *   console.log('AI Summary:', result.summary);
 *   console.log('Categories:', result.categories);
 * }
 */
declare function isAIDocumentAnalysisResult(result: DocumentComparisonResult | AIDocumentComparisonResult): result is AIADocumentChangesAnalysisResponse;

/**
 * Type guard to determine if a result is an AIDocumentComparisonResult
 * This helper checks if the result comes from any AI-powered comparison operation
 * (either "analyze" or "tag" operation types).
 * @public
 * @memberof NutrientViewer
 * @param {NutrientViewer.DocumentComparisonResult | NutrientViewer.AIDocumentComparisonResult} result - The result to check
 * @returns {boolean} True if the result is an AI document comparison result
 * @example
 * if (NutrientViewer.isAIDocumentComparisonResult(result)) {
 *   // Result is from AI comparison - could be analysis or tagging
 *   if (NutrientViewer.isAIDocumentAnalysisResult(result)) {
 *     console.log('AI Analysis Result:', result.summary);
 *   } else if (NutrientViewer.isAIDocumentTaggingResult(result)) {
 *     console.log('AI Tagging Result:', result.references);
 *   }
 * }
 */
declare function isAIDocumentComparisonResult(result: DocumentComparisonResult | AIDocumentComparisonResult): result is AIDocumentComparisonResult;

/**
 * Type guard to determine if a result is an AIDocumentTaggingResult
 * Checks if the result is from a "tag" operation (AIADocumentChangesTaggingResponse).
 * @public
 * @memberof NutrientViewer
 * @param {NutrientViewer.DocumentComparisonResult | NutrientViewer.AIDocumentComparisonResult} result - The result to check
 * @returns {boolean} True if the result is an AI document tagging result
 * @example
 * if (NutrientViewer.isAIDocumentTaggingResult(result)) {
 *   console.log('Tagged references:', result.references);
 * }
 */
declare function isAIDocumentTaggingResult(result: unknown): result is AIADocumentChangesTaggingResponse;

/**
 * True if `maybeAssociative` is either a Keyed or Indexed Collection.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isAssociative, Map, List, Stack, Set } = require('immutable');
 * isAssociative([]); // false
 * isAssociative({}); // false
 * isAssociative(Map()); // true
 * isAssociative(List()); // true
 * isAssociative(Stack()); // true
 * isAssociative(Set()); // false
 * ```
 */
declare function isAssociative(maybeAssociative: any): maybeAssociative is Collection.Keyed<any, any> | Collection.Indexed<any>;

/**
 * True if `maybeCollection` is a Collection, or any of its subclasses.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isCollection, Map, List, Stack } = require('immutable');
 * isCollection([]); // false
 * isCollection({}); // false
 * isCollection(Map()); // true
 * isCollection(List()); // true
 * isCollection(Stack()); // true
 * ```
 */
declare function isCollection(maybeCollection: any): maybeCollection is Collection<any, any>;

declare type IScrollMode = (typeof ScrollMode)[keyof typeof ScrollMode];

declare type ISearchPattern = (typeof SearchPattern)[keyof typeof SearchPattern];

declare type ISearchType = (typeof SearchType)[keyof typeof SearchType];

/**
 * This callback defines which annotations are read-only. This callback will receive the Annotation
 * a user wants to modify and by returning `true` or `false` you can define if the annotation should
 * be read-only (`false`) or modifiable (`true`).
 *
 * For more information, see {@link NutrientViewer.Configuration#isEditableAnnotation}.
 * @public
 * @callback IsEditableAnnotationCallback@callback IsEditableAnnotationCallback
 * @memberof NutrientViewer
 * @param {AnnotationsUnion} annotation
 * @example <caption>Only allow the modification of annotations from the same author</caption>
 * NutrientViewer.load({
 *   isEditableAnnotation: function(annotation) {
 *     return annotation.creatorName === myCurrentUser.name;
 *   },
 * });
 */
declare type IsEditableAnnotationCallback = (annotation: AnnotationsUnion) => boolean;

/**
 * This callback can be run on individual comments to detect whether the comment
 * can be edited based on its returned boolean.
 *
 * For more information, see {@link NutrientViewer.Configuration#isEditableComment}
 * @public
 * @callback IsEditableCommentCallback@callback IsEditableCommentCallback
 * @memberof NutrientViewer
 * @param {Comment} comment
 * @example <caption>Only allow the modification of comment from the same author.</caption>
 * NutrientViewer.load({
 *   isEditableComment: function(comment) {
 *     return comment.creatorName === myCurrentUser.name;
 *   },
 * });
 */
declare type IsEditableCommentCallback = (comment: Comment_2) => boolean;

declare interface IShapeAnnotation extends AnnotationProperties {
  strokeDashArray: [number, number] | null;
  strokeWidth: number | null;
  strokeColor: Color | null;
  fillColor: Color | null;
  measurementScale: MeasurementScale | null;
  measurementPrecision: IMeasurementPrecision | null;}

declare type IShowSignatureValidationStatusMode = (typeof ShowSignatureValidationStatusMode)[keyof typeof ShowSignatureValidationStatusMode];

declare type ISidebarMode = (typeof SidebarMode)[keyof typeof SidebarMode] | (string & {});

declare type ISidebarPlacement = (typeof SidebarPlacement)[keyof typeof SidebarPlacement];

declare type ISignatureAppearanceMode = (typeof SignatureAppearanceMode)[keyof typeof SignatureAppearanceMode];

declare type ISignatureSaveMode = (typeof SignatureSaveMode)[keyof typeof SignatureSaveMode];

/**
 * True if `maybeImmutable` is an Immutable Collection or Record.
 *
 * Note: Still returns true even if the collections is within a `withMutations()`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isImmutable, Map, List, Stack } = require('immutable');
 * isImmutable([]); // false
 * isImmutable({}); // false
 * isImmutable(Map()); // true
 * isImmutable(List()); // true
 * isImmutable(Stack()); // true
 * isImmutable(Map().asMutable()); // true
 * ```
 */
declare function isImmutable(maybeImmutable: any): maybeImmutable is Collection<any, any>;

/**
 * True if `maybeIndexed` is a Collection.Indexed, or any of its subclasses.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isIndexed, Map, List, Stack, Set } = require('immutable');
 * isIndexed([]); // false
 * isIndexed({}); // false
 * isIndexed(Map()); // false
 * isIndexed(List()); // true
 * isIndexed(Stack()); // true
 * isIndexed(Set()); // false
 * ```
 */
declare function isIndexed(maybeIndexed: any): maybeIndexed is Collection.Indexed<any>;

declare interface ISize {
  width: number;
  height: number;}


/**
 * True if `maybeKeyed` is a Collection.Keyed, or any of its subclasses.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isKeyed, Map, List, Stack } = require('immutable');
 * isKeyed([]); // false
 * isKeyed({}); // false
 * isKeyed(Map()); // true
 * isKeyed(List()); // false
 * isKeyed(Stack()); // false
 * ```
 */
declare function isKeyed(maybeKeyed: any): maybeKeyed is Collection.Keyed<any, any>;

/**
 * True if `maybeList` is a List.
 */
declare function isList(maybeList: any): maybeList is List<any>;

/**
 * True if `maybeMap` is a Map.
 *
 * Also true for OrderedMaps.
 */
declare function isMap(maybeMap: any): maybeMap is Map_2<any, any>;

/**
 * True if `maybeOrdered` is a Collection where iteration order is well
 * defined. True for Collection.Indexed as well as OrderedMap and OrderedSet.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { isOrdered, Map, OrderedMap, List, Set } = require('immutable');
 * isOrdered([]); // false
 * isOrdered({}); // false
 * isOrdered(Map()); // false
 * isOrdered(OrderedMap()); // true
 * isOrdered(List()); // true
 * isOrdered(Set()); // false
 * ```
 */
declare function isOrdered(maybeOrdered: any): boolean;

/**
 * True if `maybeOrderedMap` is an OrderedMap.
 */
declare function isOrderedMap(maybeOrderedMap: any): maybeOrderedMap is OrderedMap<any, any>;

/**
 * True if `maybeOrderedSet` is an OrderedSet.
 */
declare function isOrderedSet(maybeOrderedSet: any): maybeOrderedSet is OrderedSet<any>;

declare interface ISquiggleAnnotation extends ITextMarkupAnnotation {
  color: Color;}

/**
 * True if `maybeRecord` is a Record.
 */
declare function isRecord(maybeRecord: any): maybeRecord is Record_2<any>;

/**
 * True if `maybeSeq` is a Seq.
 */
declare function isSeq(maybeSeq: any): maybeSeq is Seq.Indexed<any> | Seq.Keyed<any, any> | Seq.Set<any>;

/**
 * True if `maybeSet` is a Set.
 *
 * Also true for OrderedSets.
 */
declare function isSet(maybeSet: any): maybeSet is Set_2<any>;

/**
 * True if `maybeStack` is a Stack.
 */
declare function isStack(maybeStack: any): maybeStack is Stack<any>;

declare interface IStampAnnotation extends AnnotationProperties {
  stampType: string | StampKind | null;
  title: string | null;
  subtitle: string | null;
  color: Color | null;
  xfdfAppearanceStream: string | null;
  xfdfAppearanceStreamOriginalPageRotation: number | null;}

declare interface IStrikeOutAnnotation extends ITextMarkupAnnotation {
  color: Color;}

declare interface ISubmitFormAction extends ActionCtorProps {
  uri?: string;
  fields?: List<string>;
  includeExclude?: boolean;
  includeNoValueFields?: boolean;
  exportFormat?: boolean;
  getMethod?: boolean;
  submitCoordinated?: boolean;
  xfdf?: boolean;
  includeAppendSaves?: boolean;
  includeAnnotations?: boolean;
  submitPDF?: boolean;
  canonicalFormat?: boolean;
  excludeNonUserAnnotations?: boolean;
  excludeFKey?: boolean;
  embedForm?: boolean;}

/**
 * True if `maybeValue` is a JavaScript Object which has *both* `equals()`
 * and `hashCode()` methods.
 *
 * Any two instances of *value objects* can be compared for value equality with
 * `Immutable.is()` and can be used as keys in a `Map` or members in a `Set`.
 */
declare function isValueObject(maybeValue: any): maybeValue is ValueObject;

declare type ItemCustomRenderer = (itemRendererProps: ItemRendererProps) => void;

declare type ItemRendererProps = {
  itemContainerNode: Node;
  item: any;};

declare interface ITextAnnotation extends AnnotationProperties {
  text: {
    format: 'plain' | 'xhtml';
    value: string | null;};

  fontColor: Color | null;
  backgroundColor: Color | null;
  font: string;
  fontSize: number | null;
  isBold: boolean | null;
  isItalic: boolean | null;
  isUnderline: boolean | null;
  horizontalAlign: 'left' | 'center' | 'right';
  verticalAlign: 'top' | 'center' | 'bottom';
  callout: Callout | null;
  borderStyle: IBorderStyle | null;
  borderWidth: number | null;
  borderColor: Color | null;
  isFitting: boolean;
  lineHeightFactor: number | null;}


declare interface ITextComparisonOperationOptions extends IComparisonOperationOptions {
  numberOfContextWords?: number;
  wordLevel?: boolean;}

declare interface ITextLine {
  id: number | null;
  pageIndex: number | null;
  boundingBox: Rect;
  contents: string;
  hints: Hints | null;}

declare interface ITextMarkupAnnotation extends AnnotationProperties {
  rects: List<Rect>;
  color: Color;
  blendMode: IBlendMode;}

declare interface ITextRange {
  startNode: Text | null;
  startOffset: number | null;
  endNode: Text | null;
  endOffset: number | null;}


declare interface ITextSelection {
  startNestedContentBlockId: string | null;
  startTextLineId: number | null;
  startPageIndex: number | null;
  startNode: Text | null;
  startOffset: number | null;
  endNestedContentBlockId: string | null;
  endTextLineId: number | null;
  endPageIndex: number | null;
  endNode: Text | null;
  endOffset: number | null;
  getText: (() => Promise<string>) | null;
  getSelectedTextLines: (() => Promise<List<TextLine>>) | null;
  getBoundingClientRect: (() => Promise<Rect | null>) | null;
  getSelectedRectsPerPage: (() => Promise<List<{
    pageIndex: number;
    rects: List<Rect>;}>>) |
  null;}


declare interface ITextSelection_2 {
  textRange: TextRange | null;
  startTextLineId: number | null;
  endTextLineId: number | null;
  startNestedContentBlockId: string | null;
  endNestedContentBlockId: string | null;
  startPageIndex: number | null;
  endPageIndex: number | null;}


declare type ITheme = (typeof Theme)[keyof typeof Theme];

declare type IToolbarPlacement = (typeof ToolbarPlacement)[keyof typeof ToolbarPlacement];

declare type IUIDateTimeElement = (typeof UIDateTimeElement)[keyof typeof UIDateTimeElement];

declare type IUIElement = (typeof UIElement)[keyof typeof UIElement];

declare interface IUnderlineAnnotation extends ITextMarkupAnnotation {
  color: Color;}

declare interface IURIAction extends ActionCtorProps {
  uri?: string;}

declare interface IViewState {
  allowPrinting: boolean;
  allowExport: boolean;
  currentPageIndex: number;
  instance: Instance | null;
  interactionMode: IInteractionMode | null;
  keepFirstSpreadAsSinglePage: boolean;
  layoutMode: ILayoutMode;
  pageSpacing: number;
  pagesRotation: Rotation;
  readOnly: boolean;
  scrollMode: IScrollMode;
  showAnnotations: boolean;
  showComments: boolean;
  showAnnotationNotes: boolean;
  showToolbar: boolean;
  enableAnnotationToolbar: boolean;
  sidebarMode: ISidebarMode | null | undefined;
  sidebarOptions: SidebarOptions<AnnotationsSidebarOptions> | SidebarOptions<LayersSidebarOptions> | SidebarOptions<AttachmentsSidebarOptions> | IObject;
  sidebarPlacement: ISidebarPlacement;
  spreadSpacing: number;
  viewportPadding: ViewportPadding;
  zoom: ZoomConfiguration | IZoomMode | number;
  commentDisplay: ICommentDisplay;
  zoomStep: number;
  formDesignMode: boolean;
  showSignatureValidationStatus: IShowSignatureValidationStatusMode;
  previewRedactionMode: boolean;
  canScrollWhileDrawing: boolean;
  keepSelectedTool: boolean;
  resolvedLayoutMode: ILayoutMode;
  sidebarWidth: number;
  disablePointSnapping: boolean;
  forceRenderWidgetsInAnnotationsOrder: boolean;
  prerenderedPageSpreads: number | null;
  showAIAssistant: boolean;}

declare type IWheelZoomMode = (typeof WheelZoomMode)[keyof typeof WheelZoomMode];

declare interface IWidgetAnnotation extends AnnotationProperties {
  formFieldName: string | null;
  borderColor: Color | null;
  borderStyle: IBorderStyle | null;
  borderDashArray: number[] | null;
  borderWidth: number | null;
  backgroundColor: Color | null;
  fontSize: FontSize | null;
  font: string | null;
  fontColor: Color | null;
  isBold: boolean | null;
  isItalic: boolean | null;
  horizontalAlign: 'left' | 'center' | 'right' | null;
  verticalAlign: 'top' | 'center' | 'bottom' | null;
  additionalActions: WidgetAnnotationAdditionalActionsType | null;
  rotation: number;
  lineHeightFactor: number | null;
  buttonIconUpdatedAt: number | null;}

declare type IZoomMode = (typeof ZoomMode)[keyof typeof ZoomMode];

/**
 * This object contains configuration options for zooming. It allows granular control over the viewer zooming behavior.
 * @public
 * @typedef {object} ZoomConfiguration
 * @memberof NutrientViewer
 * @summary Object containing setup for zooming.
 * @example
 * deafult config:
 * NutrientViewer.load({
 *   zoom: {
 *     zoomMode: NutrientViewer.ZoomMode.AUTO,
 *     wheelZoomMode: NutrientViewer.WheelZoomMode.WITH_CTRL,
 *     options: {
 *       enableKeyboardZoom: true,
 *       enableGestureZoom: true,
 *     },
 *   },
 * });
 * @example
 * The following example sets the zoom mode to FIT_TO_WIDTH, the scroll zoom mode to DISABLED, and disables the keyboard zooming.
 * NutrientViewer.load({
 *   zoom: {
 *     zoomMode: NutrientViewer.ZoomMode.FIT_TO_WIDTH,
 *     wheelZoomMode: NutrientViewer.WheelZoomMode.DISABLED,
 *     options: {
 *       enableKeyboardZoom: false,
 *     },
 *   },
 * });
 * @property {NutrientViewer.ZoomMode | undefined} zoomMode {@link NutrientViewer.ZoomMode} - Defines the zoom mode to use.
 * @property {NutrientViewer.WheelZoomMode | undefined} wheelZoomMode {@link NutrientViewer.WheelZoomMode} - Defines the scroll zoom mode to use.
 * @property {NutrientViewer.ZoomOptions | undefined} options - The zoom options to use.
 * @property {boolean | undefined} options.enableKeyboardZoom - Controls whether keyboard shortcuts for zooming (e.g., Ctrl/Cmd +/-) are enabled. Defaults to true.
 * @property {boolean | undefined} options.enableGestureZoom - Controls whether pinch-to-zoom and other touch/trackpad zoom gestures are enabled. Defaults to true.
 */
declare type IZoomOptions = {
  /** Enable zooming via keyboard shortcuts (Ctrl/Cmd + [+-]). Defaults to true */
  enableKeyboardZoom?: boolean;
  /** Enable zooming via touch gestures. Defaults to true */
  enableGestureZoom?: boolean;};

/**
 * @classdesc
 * PDF action to run arbitrary JavaScript.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("script", "alert(...)");`.
 * @example <caption>Create a new JavaScriptAction</caption>
 * const action = new NutrientViewer.Actions.JavaScriptAction({
 *   script: "alert(...)"
 * });
 * @example <caption>Create a button to import a image using a JavaScriptAction</caption>
 * const widget = new NutrientViewer.Annotations.WidgetAnnotation({
 *   id: NutrientViewer.generateInstantId(),
 *   pageIndex: 0,
 *   formFieldName: "buttonIcon",
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 100,
 *     top: 200,
 *     width: 100,
 *     height: 100
 *   }),
 *   action: new NutrientViewer.Actions.JavaScriptAction({
 *     script: "event.target.buttonImportIcon()"
 *   }),
 *   borderWidth: 0
 * });
 * const formField = new NutrientViewer.FormFields.ButtonFormField({
 *   name: "buttonIcon",
 *   annotationIds: NutrientViewer.Immutable.List([widget.id])
 * });
 * await instance.create([widget, formField]);
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Run arbitrary JavaScript.
 * @class JavaScriptAction
 * @param {object} args
 * @extends NutrientViewer.Actions.Action
 */
export declare class JavaScriptAction extends Action {
  /**
   * The JavaScript to run.
   * @public
   * @instance
   * @member {string} script
   * @memberof NutrientViewer.Actions.JavaScriptAction
   */
  script: string;
  static defaultValues: IObject;
  constructor(args?: IJavaScriptAction);}

/**
 * @classdesc
 * PDF action to launch a file. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("filePath", 2);`.
 * @example <caption>Create a new LaunchAction</caption>
 * const action = new NutrientViewer.Actions.LaunchAction({ filePath: "./some/file.mp4" });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Launch a file.
 * @class LaunchAction
 * @param {object} args
 * @extends NutrientViewer.Actions.Action
 */
export declare class LaunchAction extends Action {
  /**
   * The file path to launch.
   * @public
   * @instance
   * @member {string} filePath
   * @memberof NutrientViewer.Actions.LaunchAction
   */
  filePath: string;
  static defaultValues: IObject;
  constructor(args?: ILaunchAction);}

declare type LayersSidebarOptions = {
  lockedLayers: number[];
  iconsAlignment: IAlignment;};

/**
 * Describes how the pages will be laid out in the document view.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.LayoutMode} SINGLE Pages will always be displayed in the single page mode.
 *
 * This is the default mode.
 * @property {NutrientViewer.LayoutMode} DOUBLE Pages will always be displayed in groups of two.
 * @property {NutrientViewer.LayoutMode} AUTO Automatically sets the layout mode to {@link NutrientViewer.LayoutMode.SINGLE} or
 * {@link NutrientViewer.LayoutMode.DOUBLE} depending on the available space.
 *
 * Specifically {@link NutrientViewer.LayoutMode.DOUBLE} is chosen when the NutrientViewer container is in
 * landscape mode and its size is greater than 992px.
 *
 * This mode is a perfect fit for tablets in particular since it will automatically update the
 * layout mode then device orientation changes.
 *
 * When the dimensions of the viewport change (i.e. the browser window is resized), the view will
 * be restored to make the current page visible.
 */
declare const LayoutMode: {
  readonly SINGLE: "SINGLE";
  readonly DOUBLE: "DOUBLE";
  readonly AUTO: "AUTO";};


/**
 * @classdesc
 * Line annotations are used to draw straight lines on a page.
 *
 * Line annotations are only selectable around their visible line. This means that you can create a
 * page full of line annotations while annotations behind the line annotation are still selectable.
 *
 * Right now, line annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a line annotation" src="img/annotations/shape_line_annotation.png" width="379" height="155" class="shadow">
 * </center>
 * @example <caption>Create a line annotation</caption>
 * const annotation = new NutrientViewer.Annotations.LineAnnotation({
 *   pageIndex: 0,
 *   startPoint: new NutrientViewer.Geometry.Point({ x: 95, y: 95}),
 *   endPoint: new NutrientViewer.Geometry.Point({ x: 195, y: 195}),
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 90,
 *     top: 90,
 *     width: 200,
 *     height: 200,
 *   }),
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display a straight line on a page.
 * @class LineAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.ShapeAnnotation
 */
export declare class LineAnnotation<T extends ILineAnnotation = ILineAnnotation> extends ShapeAnnotation<T> {
  /**
   * A point tuple with x and y coordinates of the line starting point.
   *
   * If no starting point is provided, the annotation will not be visible.
   * @public
   * @instance
   * @member {NutrientViewer.Geometry.Point} startPoint
   * @memberof NutrientViewer.Annotations.LineAnnotation
   */
  startPoint: Point;
  /**
   * A point tuple with x and y coordinates of the line ending point.
   *
   * If no ending point is provided, the annotation will not be visible.
   * @public
   * @instance
   * @member {NutrientViewer.Geometry.Point} endPoint
   * @memberof NutrientViewer.Annotations.LineAnnotation
   */
  endPoint: Point;
  /**
   * An object with start and / or end entries for line caps.
   *
   * Line caps can have one of these values: "square", "circle", "diamond", "openArrow", "closedArrow",
   * "butt", "reverseOpenArrow", "reverseClosedArrow" or "slash".
   *
   * If the fillColor field is provided, its value is used as fill color for the line cap interior.
   * @public
   * @instance
   * @member {?LineCapsType} lineCaps
   * @memberof NutrientViewer.Annotations.LineAnnotation
   */
  lineCaps: LineCapsType | null;
  /** @deprecated Use `startPoint` and `endPoint` instead. */
  points: List<Point> | null;
  static defaultValues: IObject;
  static readableName: string;}

export declare type LineAnnotationJSON = ShapeAnnotationJSON & {
  type: 'pspdfkit/shape/line';
  startPoint: [number, number];
  endPoint: [number, number];
  lineCaps?: LineCapsType | null;
  lines?: {
    points: [number, number][][];
    intensities: number[][];};};

declare class LineAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: LineAnnotation;
  toJSON(): LineAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<LineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LineAnnotation;}

/**
 * Represents one of the available line caps for the line and polyline annotations.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.LineCap} square square line cap
 * @property {NutrientViewer.LineCap} circle circle line cap
 * @property {NutrientViewer.LineCap} diamond diamond line cap
 * @property {NutrientViewer.LineCap} openArrow open arrow line cap
 * @property {NutrientViewer.LineCap} closedArrow closed arrow line cap
 * @property {NutrientViewer.LineCap} butt butt line cap
 * @property {NutrientViewer.LineCap} reverseOpenArrow reverse open arrow line cap
 * @property {NutrientViewer.LineCap} reverseClosedArrow reverse closed arrow line cap
 * @property {NutrientViewer.LineCap} slash slash line cap
 */
declare const LineCap: {
  readonly square: "square";
  readonly circle: "circle";
  readonly diamond: "diamond";
  readonly openArrow: "openArrow";
  readonly closedArrow: "closedArrow";
  readonly butt: "butt";
  readonly reverseOpenArrow: "reverseOpenArrow";
  readonly reverseClosedArrow: "reverseClosedArrow";
  readonly slash: "slash";};


declare type LineCapsType = {
  start?: ILineCap | null;
  end?: ILineCap | null;};


/**
 * @classdesc
 * A link can be used to trigger an action when clicked. They will not be drawn on the page but the
 * bounding box will be used for hit testing.
 *
 * Link annotations are generated for example, when the PDF document contains a reference to another
 * page or an URL.
 *
 * Every link annotation must have an `action` property.
 *
 * <center>
 *   <div class="shadow" style="width: 445px; height: 84px; position: relative">
 *      <img title="Example of a link annotation" src="img/annotations/link_annotation.png" width="445">
 *      <a href="www.nutrient.io" style="position: absolute; top: 23px; left: 253px; width: 174px; height: 34px"></a>
 *   </div>
 * </center>
 */
export declare class LinkAnnotation<T extends ILinkAnnotation = ILinkAnnotation> extends Annotation<T> {
  /**
   * _The border on the image above is only for visual guidance and will not be rendered in the
   * viewer._
   * @example <caption>Create a link with a go to action</caption>
   * var action = new NutrientViewer.Actions.GoToAction({ pageIndex: 10 });
   * var annotation = new NutrientViewer.Annotations.LinkAnnotation({
   *   pageIndex: 0,
   *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
   *   action: action,
   *   borderColor: new NutrientViewer.Color({ r: 245, g: 0, b: 0 })
   *   borderStyle: NutrientViewer.BorderStyle.solid
   *   borderWidth: 5
   * });
   * @public
   * @memberof NutrientViewer.Annotations
   * @summary Triggers an action when clicked.
   * @class LinkAnnotation
   * @param {object} args An object of the members.
   * @extends NutrientViewer.Annotations.Annotation
   */
  action: Action;
  /**
   * Optional border color that will be drawn at the border of the bounding box.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} borderColor
   * @memberof NutrientViewer.Annotations.LinkAnnotation
   * @default null
   */
  borderColor: null | Color;
  /**
   * Optional border style used for the border of the bounding box. Valid options
   * are:
   *
   * - `solid`
   * - `dashed`
   * - `beveled`
   * - `inset`
   * - `underline`
   * @public
   * @instance
   * @member {?string} borderStyle
   * @memberof NutrientViewer.Annotations.LinkAnnotation
   * @default null
   */
  borderStyle: null | IBorderStyle;
  /**
   * Optional border width in PDF pixels, that will be used for the border of the
   * bounding box.
   * @public
   * @instance
   * @member {?number} borderWidth
   * @memberof NutrientViewer.Annotations.LinkAnnotation
   * @default 0
   */
  borderWidth: null | number;
  static readableName: string;
  static defaultValues: IObject;}

declare type LinkAnnotationJSON = BaseAnnotationJSON & {
  type: 'pspdfkit/link';
  borderColor?: string | null;
  borderWidth?: number | null;
  borderStyle?: IBorderStyle | null;};

declare class LinkAnnotationSerializer extends AnnotationSerializer {
  annotation: LinkAnnotation;
  constructor(annotation: LinkAnnotation);
  toJSON(): LinkAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<LinkAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): LinkAnnotation;}

/**
 * Create a new immutable List containing the values of the provided
 * collection-like.
 *
 * Note: `List` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { List, Set } = require('immutable')
 *
 * const emptyList = List()
 * // List []
 *
 * const plainArray = [ 1, 2, 3, 4 ]
 * const listFromPlainArray = List(plainArray)
 * // List [ 1, 2, 3, 4 ]
 *
 * const plainSet = Set([ 1, 2, 3, 4 ])
 * const listFromPlainSet = List(plainSet)
 * // List [ 1, 2, 3, 4 ]
 *
 * const arrayIterator = plainArray[Symbol.iterator]()
 * const listFromCollectionArray = List(arrayIterator)
 * // List [ 1, 2, 3, 4 ]
 *
 * listFromPlainArray.equals(listFromCollectionArray) // true
 * listFromPlainSet.equals(listFromCollectionArray) // true
 * listFromPlainSet.equals(listFromPlainArray) // true
 * ```
 */
export declare function List(): List<any>;

export declare function List<T>(): List<T>;

export declare function List<T>(collection: Iterable<T>): List<T>;

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Immutable data encourages pure functions (data-in, data-out) and lends itself
 * to much simpler application development and enabling techniques from
 * functional programming such as lazy evaluation.
 *
 * While designed to bring these powerful functional concepts to JavaScript, it
 * presents an Object-Oriented API familiar to Javascript engineers and closely
 * mirroring that of Array, Map, and Set. It is easy and efficient to convert to
 * and from plain Javascript types.
 *
 * ## How to read these docs
 *
 * In order to better explain what kinds of values the Immutable.js API expects
 * and produces, this documentation is presented in a statically typed dialect of
 * JavaScript (like [Flow][] or [TypeScript][]). You *don't need* to use these
 * type checking tools in order to use Immutable.js, however becoming familiar
 * with their syntax will help you get a deeper understanding of this API.
 *
 * **A few examples and how to read them.**
 *
 * All methods describe the kinds of data they accept and the kinds of data
 * they return. For example a function which accepts two numbers and returns
 * a number would look like this:
 *
 * ```js
 * sum(first: number, second: number): number
 * ```
 *
 * Sometimes, methods can accept different kinds of data or return different
 * kinds of data, and this is described with a *type variable*, which is
 * typically in all-caps. For example, a function which always returns the same
 * kind of data it was provided would look like this:
 *
 * ```js
 * identity<T>(value: T): T
 * ```
 *
 * Type variables are defined with classes and referred to in methods. For
 * example, a class that holds onto a value for you might look like this:
 *
 * ```js
 * class Box<T> {
 *   constructor(value: T)
 *   getValue(): T
 * }
 * ```
 *
 * In order to manipulate Immutable data, methods that we're used to affecting
 * a Collection instead return a new Collection of the same type. The type
 * `this` refers to the same kind of class. For example, a List which returns
 * new Lists when you `push` a value onto it might look like:
 *
 * ```js
 * class List<T> {
 *   push(value: T): this
 * }
 * ```
 *
 * Many methods in Immutable.js accept values which implement the JavaScript
 * [Iterable][] protocol, and might appear like `Iterable<string>` for something
 * which represents sequence of strings. Typically in JavaScript we use plain
 * Arrays (`[]`) when an Iterable is expected, but also all of the Immutable.js
 * collections are iterable themselves!
 *
 * For example, to get a value deep within a structure of data, we might use
 * `getIn` which expects an `Iterable` path:
 *
 * ```
 * getIn(path: Iterable<string | number>): any
 * ```
 *
 * To use this method, we could pass an array: `data.getIn([ "key", 2 ])`.
 *
 *
 * Note: All examples are presented in the modern [ES2015][] version of
 * JavaScript. Use tools like Babel to support older browsers.
 *
 * For example:
 *
 * ```js
 * // ES2015
 * const mappedFoo = foo.map(x => x * x);
 * // ES5
 * var mappedFoo = foo.map(function (x) { return x * x; });
 * ```
 *
 * [ES2015]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/New_in_JavaScript/ECMAScript_6_support_in_Mozilla
 * [TypeScript]: http://www.typescriptlang.org/
 * [Flow]: https://flowtype.org/
 * [Iterable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols
 */



/**
 * Lists are ordered indexed dense collections, much like a JavaScript
 * Array.
 *
 * Lists are immutable and fully persistent with O(log32 N) gets and sets,
 * and O(1) push and pop.
 *
 * Lists implement Deque, with efficient addition and removal from both the
 * end (`push`, `pop`) and beginning (`unshift`, `shift`).
 *
 * Unlike a JavaScript Array, there is no distinction between an
 * "unset" index and an index set to `undefined`. `List#forEach` visits all
 * indices from 0 to size, regardless of whether they were explicitly defined.
 */
export declare namespace List {

  /**
   * True if the provided value is a List
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable');
   * List.isList([]); // false
   * List.isList(List()); // true
   * ```
   */
  export function isList(maybeList: any): maybeList is List<any>;

  /**
   * Creates a new List containing `values`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable');
   * List.of(1, 2, 3, 4)
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Note: Values are not altered or converted in any way.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable');
   * List.of({x:1}, 2, [3], 4)
   * // List [ { x: 1 }, 2, [ 3 ], 4 ]
   * ```
   */
  export function of<T>(...values: Array<T>): List<T>;}


export declare interface List<T> extends Collection.Indexed<T> {

  /**
   * The number of items in this List.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Returns a new List which includes `value` at `index`. If `index` already
   * exists in this List, it will be replaced.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.set(-1, "value")` sets the last item in the List.
   *
   * If `index` larger than `size`, the returned List's `size` will be large
   * enough to include the `index`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const originalList = List([ 0 ]);
   * // List [ 0 ]
   * originalList.set(1, 1);
   * // List [ 0, 1 ]
   * originalList.set(0, 'overwritten');
   * // List [ "overwritten" ]
   * originalList.set(2, 2);
   * // List [ 0, undefined, 2 ]
   *
   * List().set(50000, 'value').size;
   * // 50001
   * ```
   *
   * Note: `set` can be used in `withMutations`.
   */
  set(index: number, value: T): List<T>;

  /**
   * Returns a new List which excludes this `index` and with a size 1 less
   * than this List. Values at indices above `index` are shifted down by 1 to
   * fill the position.
   *
   * This is synonymous with `list.splice(index, 1)`.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.delete(-1)` deletes the last item in the List.
   *
   * Note: `delete` cannot be safely used in IE8
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 0, 1, 2, 3, 4 ]).delete(0);
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Since `delete()` re-indexes values, it produces a complete copy, which
   * has `O(N)` complexity.
   *
   * Note: `delete` *cannot* be used in `withMutations`.
   *
   * @alias remove
   */
  delete(index: number): List<T>;
  remove(index: number): List<T>;

  /**
   * Returns a new List with `value` at `index` with a size 1 more than this
   * List. Values at indices above `index` are shifted over by 1.
   *
   * This is synonymous with `list.splice(index, 0, value)`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 0, 1, 2, 3, 4 ]).insert(6, 5)
   * // List [ 0, 1, 2, 3, 4, 5 ]
   * ```
   *
   * Since `insert()` re-indexes values, it produces a complete copy, which
   * has `O(N)` complexity.
   *
   * Note: `insert` *cannot* be used in `withMutations`.
   */
  insert(index: number, value: T): List<T>;

  /**
   * Returns a new List with 0 size and no values in constant time.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 1, 2, 3, 4 ]).clear()
   * // List []
   * ```
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): List<T>;

  /**
   * Returns a new List with the provided `values` appended, starting at this
   * List's `size`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 1, 2, 3, 4 ]).push(5)
   * // List [ 1, 2, 3, 4, 5 ]
   * ```
   *
   * Note: `push` can be used in `withMutations`.
   */
  push(...values: Array<T>): List<T>;

  /**
   * Returns a new List with a size ones less than this List, excluding
   * the last index in this List.
   *
   * Note: this differs from `Array#pop` because it returns a new
   * List rather than the removed value. Use `last()` to get the last value
   * in this List.
   *
   * ```js
   * List([ 1, 2, 3, 4 ]).pop()
   * // List[ 1, 2, 3 ]
   * ```
   *
   * Note: `pop` can be used in `withMutations`.
   */
  pop(): List<T>;

  /**
   * Returns a new List with the provided `values` prepended, shifting other
   * values ahead to higher indices.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 2, 3, 4]).unshift(1);
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Note: `unshift` can be used in `withMutations`.
   */
  unshift(...values: Array<T>): List<T>;

  /**
   * Returns a new List with a size ones less than this List, excluding
   * the first index in this List, shifting all other values to a lower index.
   *
   * Note: this differs from `Array#shift` because it returns a new
   * List rather than the removed value. Use `first()` to get the first
   * value in this List.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 0, 1, 2, 3, 4 ]).shift();
   * // List [ 1, 2, 3, 4 ]
   * ```
   *
   * Note: `shift` can be used in `withMutations`.
   */
  shift(): List<T>;

  /**
   * Returns a new List with an updated value at `index` with the return
   * value of calling `updater` with the existing value, or `notSetValue` if
   * `index` was not set. If called with a single argument, `updater` is
   * called with the List itself.
   *
   * `index` may be a negative number, which indexes back from the end of the
   * List. `v.update(-1)` updates the last item in the List.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const list = List([ 'a', 'b', 'c' ])
   * const result = list.update(2, val => val.toUpperCase())
   * // List [ "a", "b", "C" ]
   * ```
   *
   * This can be very useful as a way to "chain" a normal function into a
   * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
   *
   * For example, to sum a List after mapping and filtering:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * function sum(collection) {
   *   return collection.reduce((sum, x) => sum + x, 0)
   * }
   *
   * List([ 1, 2, 3 ])
   *   .map(x => x + 1)
   *   .filter(x => x % 2 === 0)
   *   .update(sum)
   * // 6
   * ```
   *
   * Note: `update(index)` can be used in `withMutations`.
   *
   * @see `Map#update`
   */
  update(index: number, notSetValue: T, updater: (value: T) => T): this;
  update(index: number, updater: (value: T) => T): this;
  update<R>(updater: (value: this) => R): R;

  /**
   * Returns a new List with size `size`. If `size` is less than this
   * List's size, the new List will exclude values at the higher indices.
   * If `size` is greater than this List's size, the new List will have
   * undefined values for the newly available indices.
   *
   * When building a new List and the final size is known up front, `setSize`
   * used in conjunction with `withMutations` may result in the more
   * performant construction.
   */
  setSize(size: number): List<T>;


  // Deep persistent changes

  /**
   * Returns a new List having set `value` at this `keyPath`. If any keys in
   * `keyPath` do not exist, a new immutable Map will be created at that key.
   *
   * Index numbers are used as keys to determine the path to follow in
   * the List.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, List([ 3, 4 ])])
   * list.setIn([3, 0], 999);
   * // List [ 0, 1, 2, List [ 999, 4 ] ]
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and setIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, { plain: 'object' }])
   * list.setIn([3, 'plain'], 'value');
   * // List([ 0, 1, 2, { plain: 'value' }])
   * ```
   *
   * Note: `setIn` can be used in `withMutations`.
   */
  setIn(keyPath: Iterable<any>, value: any): this;

  /**
   * Returns a new List having removed the value at this `keyPath`. If any
   * keys in `keyPath` do not exist, no change will occur.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, List([ 3, 4 ])])
   * list.deleteIn([3, 0]);
   * // List [ 0, 1, 2, List [ 4 ] ]
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and removeIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List } = require('immutable')
   * const list = List([ 0, 1, 2, { plain: 'object' }])
   * list.removeIn([3, 'plain']);
   * // List([ 0, 1, 2, {}])
   * ```
   *
   * Note: `deleteIn` *cannot* be safely used in `withMutations`.
   *
   * @alias removeIn
   */
  deleteIn(keyPath: Iterable<any>): this;
  removeIn(keyPath: Iterable<any>): this;

  /**
   * Note: `updateIn` can be used in `withMutations`.
   *
   * @see `Map#updateIn`
   */
  updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
  updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

  /**
   * Note: `mergeIn` can be used in `withMutations`.
   *
   * @see `Map#mergeIn`
   */
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  /**
   * Note: `mergeDeepIn` can be used in `withMutations`.
   *
   * @see `Map#mergeDeepIn`
   */
  mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  // Transient changes

  /**
   * Note: Not all methods can be safely used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * allows being used in `withMutations`.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * An alternative API for withMutations()
   *
   * Note: Not all methods can be safely used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * allows being used in `withMutations`.
   *
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new List with other values or collections concatenated to this one.
   *
   * Note: `concat` can be used in `withMutations`.
   *
   * @alias merge
   */
  concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): List<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): List<T | C>;

  /**
   * Returns a new List with values passed through a
   * `mapper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * List([ 1, 2 ]).map(x => 10 * x)
   * // List [ 10, 20 ]
   * ```
   */
  map<M>(
  mapper: (value: T, key: number, iter: this) => M,
  context?: any)
  : List<M>;

  /**
   * Flat-maps the List, returning a new List.
   *
   * Similar to `list.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: number, iter: this) => Iterable<M>,
  context?: any)
  : List<M>;

  /**
   * Returns a new List with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, index: number, iter: this) => value is F,
  context?: any)
  : List<F>;
  filter(
  predicate: (value: T, index: number, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns a List "zipped" with the provided collection.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 4, 5, 6 ]);
   * const c = a.zip(b); // List [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: Collection<any, U>): List<[T, U]>;
  zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): List<[T, U, V]>;
  zip(...collections: Array<Collection<any, any>>): List<any>;

  /**
   * Returns a List "zipped" with the provided collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const a = List([ 1, 2 ]);
   * const b = List([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // List [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   *
   * Note: Since zipAll will return a collection as large as the largest
   * input, some results may contain undefined values. TypeScript cannot
   * account for these without cases (as of v2.5).
   */
  zipAll<U>(other: Collection<any, U>): List<[T, U]>;
  zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): List<[T, U, V]>;
  zipAll(...collections: Array<Collection<any, any>>): List<any>;

  /**
   * Returns a List "zipped" with the provided collections by using a
   * custom `zipper` function.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { List } = require('immutable');" }
   * -->
   * ```js
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 4, 5, 6 ]);
   * const c = a.zipWith((a, b) => a + b, b);
   * // List [ 5, 7, 9 ]
   * ```
   */
  zipWith<U, Z>(
  zipper: (value: T, otherValue: U) => Z,
  otherCollection: Collection<any, U>)
  : List<Z>;
  zipWith<U, V, Z>(
  zipper: (value: T, otherValue: U, thirdValue: V) => Z,
  otherCollection: Collection<any, U>,
  thirdCollection: Collection<any, V>)
  : List<Z>;
  zipWith<Z>(
  zipper: (...any: Array<any>) => Z,
  ...collections: Array<Collection<any, any>>)
  : List<Z>;}


/**
 * @classdesc
 *
 * A list box where multiple values can be selected.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 *
 * Please note that {@link NutrientViewer.Instance#getFormFieldValues} will not return
 * the latest value for this field until the user leaves this field by default. If you
 * want this value to update on every change then set the {@link NutrientViewer.FormFields.ChoiceFormField#commitOnChange}) to
 * true.
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary A list box where multiple values can be selected.
 * @class ListBoxFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.ChoiceFormField
 */
export declare class ListBoxFormField extends ChoiceFormField {
  additionalActions: FormFieldInputAdditionalActionsType | null | undefined;}


declare type ListBoxFormFieldJSON = ChoiceFormFieldJSON & {
  type: 'pspdfkit/form-field/listbox';};

/**
 * Creates a new NutrientViewer instance.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to a new {@link NutrientViewer.Instance}, or rejecting with a {@link NutrientViewer.Error}.
 *
 * It requires a {@link NutrientViewer.Configuration|configuration object}. When the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 * @example <caption>Load Nutrient Web SDK Server</caption>
 * NutrientViewer.load({
 *   authPayload: { jwt: "xxx.xxx.xxx" },
 *   container: ".foo",
 *   documentId: "85203",
 *   instant: true,
 * }).then((instance) => {
 *   console.log("Successfully mounted NutrientViewer", instance);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @example <caption>Load Nutrient Web SDK Standalone</caption>
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 *   licenseKey: "YOUR_LICENSE_KEY",
 * }).then((instance) => {
 *   console.log("Successfully mounted NutrientViewer", instance);
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @public
 * @function load
 * @memberof NutrientViewer
 * @param {NutrientViewer.Configuration} configuration A configuration Object
 * @returns {Promise.<NutrientViewer.Instance,NutrientViewer.Error>} Promise that resolves in an {@link NutrientViewer.Instance}
 */
declare function load(configuration: Configuration): Promise<Instance>;

/**
 * Loads and initializes the Text Comparison UI for comparing two documents.
 *
 * This method creates a complete text comparison interface with side-by-side document views,
 * highlighting differences between documents, and providing navigation through changes.
 * Optionally supports AI-powered analysis for categorizing and summarizing differences.
 * @param {NutrientViewer.TextComparisonConfiguration} configuration - Configuration object containing document sources, UI options, and comparison settings
 * @returns {Promise<NutrientViewer.TextComparisonInstance>} Promise that resolves to a TextComparisonInstance for programmatic control
 * @example
 *
 * const textComparisonInstance = await NutrientViewer.loadTextComparison({
 *   container: '.text-comparison-container',
 *   documentA: 'path/to/document-a.pdf',
 *   documentB: 'path/to/document-b.pdf',
 *   comparisonSidebarConfig: {
 *     diffColors: {
 *       insertionColor: new NutrientViewer.Color({ r: 0, g: 255, b: 0 }),
 *       deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 })
 *     },
 *     openByDefault: true
 *   }
 * });
 * @public
 * @memberof NutrientViewer
 */
declare function loadTextComparison(configuration: TextComparisonConfiguration_2): Promise<TextComparisonInstance>;

/**
 * Creates a new Immutable Map.
 *
 * Created with the same key value pairs as the provided Collection.Keyed or
 * JavaScript Object or expects a Collection of [K, V] tuple entries.
 *
 * Note: `Map` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map } = require('immutable')
 * Map({ key: "value" })
 * Map([ [ "key", "value" ] ])
 * ```
 *
 * Keep in mind, when using JS objects to construct Immutable Maps, that
 * JavaScript Object properties are always strings, even if written in a
 * quote-less shorthand, while Immutable Maps accept keys of any type.
 *
 * <!-- runkit:activate
 *      { "preamble": "const { Map } = require('immutable');" }
 * -->
 * ```js
 * let obj = { 1: "one" }
 * Object.keys(obj) // [ "1" ]
 * assert.equal(obj["1"], obj[1]) // "one" === "one"
 *
 * let map = Map(obj)
 * assert.notEqual(map.get("1"), map.get(1)) // "one" !== undefined
 * ```
 *
 * Property access for JavaScript Objects first converts the key to a string,
 * but since Immutable Map keys can be of any type the argument to `get()` is
 * not altered.
 */
declare function Map_2<K, V>(collection: Iterable<[K, V]>): Map_2<K, V>;

declare function Map_2<T>(collection: Iterable<Iterable<T>>): Map_2<T, T>;

declare function Map_2<V>(obj: {[key: string]: V;}): Map_2<string, V>;

declare function Map_2<K, V>(): Map_2<K, V>;

declare function Map_2(): Map_2<any, any>;

/**
 * Immutable Map is an unordered Collection.Keyed of (key, value) pairs with
 * `O(log32 N)` gets and `O(log32 N)` persistent sets.
 *
 * Iteration order of a Map is undefined, however is stable. Multiple
 * iterations of the same Map will iterate in the same order.
 *
 * Map's keys can be of any type, and use `Immutable.is` to determine key
 * equality. This allows the use of any value (including NaN) as a key.
 *
 * Because `Immutable.is` returns equality based on value semantics, and
 * Immutable collections are treated as values, any Immutable collection may
 * be used as a key.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map, List } = require('immutable');
 * Map().set(List([ 1 ]), 'listofone').get(List([ 1 ]));
 * // 'listofone'
 * ```
 *
 * Any JavaScript object may be used as a key, however strict identity is used
 * to evaluate key equality. Two similar looking objects will represent two
 * different keys.
 *
 * Implemented by a hash-array mapped trie.
 */
declare namespace Map_2 {

  /**
   * True if the provided value is a Map
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map.isMap({}) // false
   * Map.isMap(Map()) // true
   * ```
   */
  function isMap(maybeMap: any): maybeMap is Map_2<any, any>;

  /**
   * Creates a new Map from alternating keys and values
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map.of(
   *   'key', 'value',
   *   'numerical value', 3,
   *    0, 'numerical key'
   * )
   * // Map { 0: "numerical key", "key": "value", "numerical value": 3 }
   * ```
   *
   * @deprecated Use Map([ [ 'k', 'v' ] ]) or Map({ k: 'v' })
   */
  function of(...keyValues: Array<any>): Map_2<any, any>;}


declare interface Map_2<K, V> extends Collection.Keyed<K, V> {

  /**
   * The number of entries in this Map.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Returns a new Map also containing the new key, value pair. If an equivalent
   * key already exists in this Map, it will be replaced.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map()
   * const newerMap = originalMap.set('key', 'value')
   * const newestMap = newerMap.set('key', 'newer value')
   *
   * originalMap
   * // Map {}
   * newerMap
   * // Map { "key": "value" }
   * newestMap
   * // Map { "key": "newer value" }
   * ```
   *
   * Note: `set` can be used in `withMutations`.
   */
  set(key: K, value: V): this;

  /**
   * Returns a new Map which excludes this `key`.
   *
   * Note: `delete` cannot be safely used in IE8, but is provided to mirror
   * the ES6 collection API.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map({
   *   key: 'value',
   *   otherKey: 'other value'
   * })
   * // Map { "key": "value", "otherKey": "other value" }
   * originalMap.delete('otherKey')
   * // Map { "key": "value" }
   * ```
   *
   * Note: `delete` can be used in `withMutations`.
   *
   * @alias remove
   */
  delete(key: K): this;
  remove(key: K): this;

  /**
   * Returns a new Map which excludes the provided `keys`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const names = Map({ a: "Aaron", b: "Barry", c: "Connor" })
   * names.deleteAll([ 'a', 'c' ])
   * // Map { "b": "Barry" }
   * ```
   *
   * Note: `deleteAll` can be used in `withMutations`.
   *
   * @alias removeAll
   */
  deleteAll(keys: Iterable<K>): this;
  removeAll(keys: Iterable<K>): this;

  /**
   * Returns a new Map containing no keys or values.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * Map({ key: 'value' }).clear()
   * // Map {}
   * ```
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): this;

  /**
   * Returns a new Map having updated the value at this `key` with the return
   * value of calling `updater` with the existing value.
   *
   * Similar to: `map.set(key, updater(map.get(key)))`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const aMap = Map({ key: 'value' })
   * const newMap = aMap.update('key', value => value + value)
   * // Map { "key": "valuevalue" }
   * ```
   *
   * This is most commonly used to call methods on collections within a
   * structure of data. For example, in order to `.push()` onto a nested `List`,
   * `update` and `push` can be used together:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map, List } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ nestedList: List([ 1, 2, 3 ]) })
   * const newMap = aMap.update('nestedList', list => list.push(4))
   * // Map { "nestedList": List [ 1, 2, 3, 4 ] }
   * ```
   *
   * When a `notSetValue` is provided, it is provided to the `updater`
   * function when the value at the key does not exist in the Map.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ key: 'value' })
   * const newMap = aMap.update('noKey', 'no value', value => value + value)
   * // Map { "key": "value", "noKey": "no valueno value" }
   * ```
   *
   * However, if the `updater` function returns the same value it was called
   * with, then no change will occur. This is still true if `notSetValue`
   * is provided.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ apples: 10 })
   * const newMap = aMap.update('oranges', 0, val => val)
   * // Map { "apples": 10 }
   * assert.strictEqual(newMap, map);
   * ```
   *
   * For code using ES2015 or later, using `notSetValue` is discourged in
   * favor of function parameter default values. This helps to avoid any
   * potential confusion with identify functions as described above.
   *
   * The previous example behaves differently when written with default values:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ apples: 10 })
   * const newMap = aMap.update('oranges', (val = 0) => val)
   * // Map { "apples": 10, "oranges": 0 }
   * ```
   *
   * If no key is provided, then the `updater` function return value is
   * returned as well.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * const aMap = Map({ key: 'value' })
   * const result = aMap.update(aMap => aMap.get('key'))
   * // "value"
   * ```
   *
   * This can be very useful as a way to "chain" a normal function into a
   * sequence of methods. RxJS calls this "let" and lodash calls it "thru".
   *
   * For example, to sum the values in a Map
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable');" }
   * -->
   * ```js
   * function sum(collection) {
   *   return collection.reduce((sum, x) => sum + x, 0)
   * }
   *
   * Map({ x: 1, y: 2, z: 3 })
   *   .map(x => x + 1)
   *   .filter(x => x % 2 === 0)
   *   .update(sum)
   * // 6
   * ```
   *
   * Note: `update(key)` can be used in `withMutations`.
   */
  update(key: K, notSetValue: V, updater: (value: V) => V): this;
  update(key: K, updater: (value: V) => V): this;
  update<R>(updater: (value: this) => R): R;

  /**
   * Returns a new Map resulting from merging the provided Collections
   * (or JS objects) into this Map. In other words, this takes each entry of
   * each collection and sets it on this Map.
   *
   * Note: Values provided to `merge` are shallowly converted before being
   * merged. No nested values are altered.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: 10, b: 20, c: 30 })
   * const two = Map({ b: 40, a: 50, d: 60 })
   * one.merge(two) // Map { "a": 50, "b": 40, "c": 30, "d": 60 }
   * two.merge(one) // Map { "b": 20, "a": 10, "d": 60, "c": 30 }
   * ```
   *
   * Note: `merge` can be used in `withMutations`.
   *
   * @alias concat
   */
  merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map_2<K | KC, V | VC>;
  merge<C>(...collections: Array<{[key: string]: C;}>): Map_2<K | string, V | C>;
  concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Map_2<K | KC, V | VC>;
  concat<C>(...collections: Array<{[key: string]: C;}>): Map_2<K | string, V | C>;

  /**
   * Like `merge()`, `mergeWith()` returns a new Map resulting from merging
   * the provided Collections (or JS objects) into this Map, but uses the
   * `merger` function for dealing with conflicts.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: 10, b: 20, c: 30 })
   * const two = Map({ b: 40, a: 50, d: 60 })
   * one.mergeWith((oldVal, newVal) => oldVal / newVal, two)
   * // { "a": 0.2, "b": 0.5, "c": 30, "d": 60 }
   * two.mergeWith((oldVal, newVal) => oldVal / newVal, one)
   * // { "b": 2, "a": 5, "d": 60, "c": 30 }
   * ```
   *
   * Note: `mergeWith` can be used in `withMutations`.
   */
  mergeWith(
  merger: (oldVal: V, newVal: V, key: K) => V,
  ...collections: Array<Iterable<[K, V]> | {[key: string]: V;}>)
  : this;

  /**
   * Like `merge()`, but when two Collections conflict, it merges them as well,
   * recursing deeply through the nested data.
   *
   * Note: Values provided to `merge` are shallowly converted before being
   * merged. No nested values are altered unless they will also be merged at
   * a deeper level.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
   * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
   * one.mergeDeep(two)
   * // Map {
   * //   "a": Map { "x": 2, "y": 10 },
   * //   "b": Map { "x": 20, "y": 5 },
   * //   "c": Map { "z": 3 }
   * // }
   * ```
   *
   * Note: `mergeDeep` can be used in `withMutations`.
   */
  mergeDeep(...collections: Array<Iterable<[K, V]> | {[key: string]: V;}>): this;

  /**
   * Like `mergeDeep()`, but when two non-Collections conflict, it uses the
   * `merger` function to determine the resulting value.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const one = Map({ a: Map({ x: 10, y: 10 }), b: Map({ x: 20, y: 50 }) })
   * const two = Map({ a: Map({ x: 2 }), b: Map({ y: 5 }), c: Map({ z: 3 }) })
   * one.mergeDeepWith((oldVal, newVal) => oldVal / newVal, two)
   * // Map {
   * //   "a": Map { "x": 5, "y": 10 },
   * //   "b": Map { "x": 20, "y": 10 },
   * //   "c": Map { "z": 3 }
   * // }
   * ```
     * Note: `mergeDeepWith` can be used in `withMutations`.
   */

  mergeDeepWith(
  merger: (oldVal: any, newVal: any, key: any) => any,
  ...collections: Array<Iterable<[K, V]> | {[key: string]: V;}>)
  : this;


  // Deep persistent changes

  /**
   * Returns a new Map having set `value` at this `keyPath`. If any keys in
   * `keyPath` do not exist, a new immutable Map will be created at that key.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map({
   *   subObject: Map({
   *     subKey: 'subvalue',
   *     subSubObject: Map({
   *       subSubKey: 'subSubValue'
   *     })
   *   })
   * })
   *
   * const newMap = originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
   * // Map {
   * //   "subObject": Map {
   * //     "subKey": "ha ha!",
   * //     "subSubObject": Map { "subSubKey": "subSubValue" }
   * //   }
   * // }
   *
   * const newerMap = originalMap.setIn(
   *   ['subObject', 'subSubObject', 'subSubKey'],
   *   'ha ha ha!'
   * )
   * // Map {
   * //   "subObject": Map {
   * //     "subKey": "subvalue",
   * //     "subSubObject": Map { "subSubKey": "ha ha ha!" }
   * //   }
   * // }
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and setIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const originalMap = Map({
   *   subObject: {
   *     subKey: 'subvalue',
   *     subSubObject: {
   *       subSubKey: 'subSubValue'
   *     }
   *   }
   * })
   *
   * originalMap.setIn(['subObject', 'subKey'], 'ha ha!')
   * // Map {
   * //   "subObject": {
   * //     subKey: "ha ha!",
   * //     subSubObject: { subSubKey: "subSubValue" }
   * //   }
   * // }
   * ```
   *
   * If any key in the path exists but cannot be updated (such as a primitive
   * like number or a custom Object like Date), an error will be thrown.
   *
   * Note: `setIn` can be used in `withMutations`.
   */
  setIn(keyPath: Iterable<any>, value: any): this;

  /**
   * Returns a new Map having removed the value at this `keyPath`. If any keys
   * in `keyPath` do not exist, no change will occur.
   *
   * Note: `deleteIn` can be used in `withMutations`.
   *
   * @alias removeIn
   */
  deleteIn(keyPath: Iterable<any>): this;
  removeIn(keyPath: Iterable<any>): this;

  /**
   * Returns a new Map having applied the `updater` to the entry found at the
   * keyPath.
   *
   * This is most commonly used to call methods on collections nested within a
   * structure of data. For example, in order to `.push()` onto a nested `List`,
   * `updateIn` and `push` can be used together:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map, List } = require('immutable')
   * const map = Map({ inMap: Map({ inList: List([ 1, 2, 3 ]) }) })
   * const newMap = map.updateIn(['inMap', 'inList'], list => list.push(4))
   * // Map { "inMap": Map { "inList": List [ 1, 2, 3, 4 ] } }
   * ```
   *
   * If any keys in `keyPath` do not exist, new Immutable `Map`s will
   * be created at those keys. If the `keyPath` does not already contain a
   * value, the `updater` function will be called with `notSetValue`, if
   * provided, otherwise `undefined`.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
   * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
   * // Map { "a": Map { "b": Map { "c": 20 } } }
   * ```
   *
   * If the `updater` function returns the same value it was called with, then
   * no change will occur. This is still true if `notSetValue` is provided.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
   * const newMap = map.updateIn(['a', 'b', 'x'], 100, val => val)
   * // Map { "a": Map { "b": Map { "c": 10 } } }
   * assert.strictEqual(newMap, aMap)
   * ```
   *
   * For code using ES2015 or later, using `notSetValue` is discourged in
   * favor of function parameter default values. This helps to avoid any
   * potential confusion with identify functions as described above.
   *
   * The previous example behaves differently when written with default values:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: Map({ b: Map({ c: 10 }) }) })
   * const newMap = map.updateIn(['a', 'b', 'x'], (val = 100) => val)
   * // Map { "a": Map { "b": Map { "c": 10, "x": 100 } } }
   * ```
   *
   * Plain JavaScript Object or Arrays may be nested within an Immutable.js
   * Collection, and updateIn() can update those values as well, treating them
   * immutably by creating new copies of those values with the changes applied.
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Map } = require('immutable')" }
   * -->
   * ```js
   * const map = Map({ a: { b: { c: 10 } } })
   * const newMap = map.updateIn(['a', 'b', 'c'], val => val * 2)
   * // Map { "a": { b: { c: 20 } } }
   * ```
   *
   * If any key in the path exists but cannot be updated (such as a primitive
   * like number or a custom Object like Date), an error will be thrown.
   *
   * Note: `updateIn` can be used in `withMutations`.
   */
  updateIn(keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): this;
  updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;

  /**
   * A combination of `updateIn` and `merge`, returning a new Map, but
   * performing the merge at a point arrived at by following the keyPath.
   * In other words, these two lines are equivalent:
   *
   * ```js
   * map.updateIn(['a', 'b', 'c'], abc => abc.merge(y))
   * map.mergeIn(['a', 'b', 'c'], y)
   * ```
   *
   * Note: `mergeIn` can be used in `withMutations`.
   */
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  /**
   * A combination of `updateIn` and `mergeDeep`, returning a new Map, but
   * performing the deep merge at a point arrived at by following the keyPath.
   * In other words, these two lines are equivalent:
   *
   * ```js
   * map.updateIn(['a', 'b', 'c'], abc => abc.mergeDeep(y))
   * map.mergeDeepIn(['a', 'b', 'c'], y)
   * ```
   *
   * Note: `mergeDeepIn` can be used in `withMutations`.
   */
  mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  // Transient changes

  /**
   * Every time you call one of the above functions, a new immutable Map is
   * created. If a pure function calls a number of these to produce a final
   * return value, then a penalty on performance and memory has been paid by
   * creating all of the intermediate immutable Maps.
   *
   * If you need to apply a series of mutations to produce a new immutable
   * Map, `withMutations()` creates a temporary mutable copy of the Map which
   * can apply mutations in a highly performant manner. In fact, this is
   * exactly how complex mutations like `merge` are done.
   *
   * As an example, this results in the creation of 2, not 4, new Maps:
   *
   * <!-- runkit:activate -->
   * ```js
   * const { Map } = require('immutable')
   * const map1 = Map()
   * const map2 = map1.withMutations(map => {
   *   map.set('a', 1).set('b', 2).set('c', 3)
   * })
   * assert.equal(map1.size, 0)
   * assert.equal(map2.size, 3)
   * ```
   *
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Read the documentation for each method to see if it
   * is safe to use in `withMutations`.
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * Another way to avoid creation of intermediate Immutable maps is to create
   * a mutable copy of this collection. Mutable copies *always* return `this`,
   * and thus shouldn't be used for equality. Your function should never return
   * a mutable copy of a collection, only use it internally to create a new
   * collection.
   *
   * If possible, use `withMutations` to work with temporary mutable copies as
   * it provides an easier to use API and considers many common optimizations.
   *
   * Note: if the collection is already mutable, `asMutable` returns itself.
   *
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Read the documentation for each method to see if it
   * is safe to use in `withMutations`.
   *
   * @see `Map#asImmutable`
   */
  asMutable(): this;

  /**
   * Returns true if this is a mutable copy (see `asMutable()`) and mutative
   * alterations have been applied.
   *
   * @see `Map#asMutable`
   */
  wasAltered(): boolean;

  /**
   * The yin to `asMutable`'s yang. Because it applies to mutable collections,
   * this operation is *mutable* and may return itself (though may not
   * return itself, i.e. if the result is an empty collection). Once
   * performed, the original mutable copy must no longer be mutated since it
   * may be the immutable result.
   *
   * If possible, use `withMutations` to work with temporary mutable copies as
   * it provides an easier to use API and considers many common optimizations.
   *
   * @see `Map#asMutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new Map with values passed through a
   * `mapper` function.
   *
   *     Map({ a: 1, b: 2 }).map(x => 10 * x)
   *     // Map { a: 10, b: 20 }
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Map_2<K, M>;

  /**
   * @see Collection.Keyed.mapKeys
   */
  mapKeys<M>(
  mapper: (key: K, value: V, iter: this) => M,
  context?: any)
  : Map_2<M, V>;

  /**
   * @see Collection.Keyed.mapEntries
   */
  mapEntries<KM, VM>(
  mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
  context?: any)
  : Map_2<KM, VM>;

  /**
   * Flat-maps the Map, returning a new Map.
   *
   * Similar to `data.map(...).flatten(true)`.
   */
  flatMap<KM, VM>(
  mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
  context?: any)
  : Map_2<KM, VM>;

  /**
   * Returns a new Map with only the entries for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : Map_2<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;

  /**
   * @see Collection.Keyed.flip
   */
  flip(): Map_2<V, K>;}


declare const MauiBridgeInstance: IMauiBridge;

declare type max = number;

/**
 * Precision values for length of measurement annotations.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.MeasurementPrecision} WHOLE
 * @property {NutrientViewer.MeasurementPrecision} ONE
 * @property {NutrientViewer.MeasurementPrecision} TWO
 * @property {NutrientViewer.MeasurementPrecision} THREE
 * @property {NutrientViewer.MeasurementPrecision} FOUR
 * @property {NutrientViewer.MeasurementPrecision} HALVES
 * @property {NutrientViewer.MeasurementPrecision} QUARTERS
 * @property {NutrientViewer.MeasurementPrecision} EIGHTHS
 * @property {NutrientViewer.MeasurementPrecision} SIXTEENTHS
 */
declare const MeasurementPrecision: {
  readonly WHOLE: "whole";
  readonly ONE: "oneDp";
  readonly TWO: "twoDp";
  readonly THREE: "threeDp";
  readonly FOUR: "fourDp";
  readonly HALVES: "1/2";
  readonly QUARTERS: "1/4";
  readonly EIGHTHS: "1/8";
  readonly SIXTEENTHS: "1/16";};


/**
 * @classdesc
 * MeasurementScale is a class that represents the scale of measurement annotations.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `scale.set("fromValue", 15)`
 * @example <caption>Create and update a scale</caption>
 * const scale = new NutrientViewer.MeasurementScale({
 *   unitFrom: NutrientViewer.MeasurementScaleUnitFrom.Millimeters,
 *   unitTo: NutrientViewer.MeasurementScaleUnitTo.Inches,
 *   fromValue: 1,
 *   toValue: 10
 * });
 * const newScale = scale.set("fromValue", 2);
 * newScale.fromValue // => 2
 * @public
 * @memberof NutrientViewer
 * @summary The scale value of a measurement annotation.
 * @class MeasurementScale
 * @noconstructor
 * @extends Immutable.Record
 */
declare class MeasurementScale extends MeasurementScale_base {}

declare const MeasurementScale_base: Record_2.Factory<IMeasurementScale>;

declare type MeasurementScaleJSON = {
  unitFrom: IMeasurementScaleUnitFrom;
  unitTo: IMeasurementScaleUnitTo;
  from: number;
  to: number;};

/**
 * Represents one of the units from which you can scale from for measurement annotations.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.MeasurementScaleUnitFrom} INCHES
 * @property {NutrientViewer.MeasurementScaleUnitFrom} MILLIMETERS
 * @property {NutrientViewer.MeasurementScaleUnitFrom} CENTIMETERS
 * @property {NutrientViewer.MeasurementScaleUnitFrom} POINTS
 */
declare const MeasurementScaleUnitFrom: {
  readonly INCHES: "in";
  readonly MILLIMETERS: "mm";
  readonly CENTIMETERS: "cm";
  readonly POINTS: "pt";};


/**
 * Represents one of the units to which you can scale from for measurement annotations.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.MeasurementScaleUnitTo} INCHES
 * @property {NutrientViewer.MeasurementScaleUnitTo} MILLIMETERS
 * @property {NutrientViewer.MeasurementScaleUnitTo} CENTIMETERS
 * @property {NutrientViewer.MeasurementScaleUnitTo} POINTS
 * @property {NutrientViewer.MeasurementScaleUnitTo} FEET
 * @property {NutrientViewer.MeasurementScaleUnitTo} METERS
 * @property {NutrientViewer.MeasurementScaleUnitTo} YARDS
 * @property {NutrientViewer.MeasurementScaleUnitTo} KILOMETERS
 * @property {NutrientViewer.MeasurementScaleUnitTo} MILES
 */
declare const MeasurementScaleUnitTo: {
  readonly INCHES: "in";
  readonly MILLIMETERS: "mm";
  readonly CENTIMETERS: "cm";
  readonly POINTS: "pt";
  readonly FEET: "ft";
  readonly METERS: "m";
  readonly YARDS: "yd";
  readonly KILOMETERS: "km";
  readonly MILES: "mi";};


/**
 * Nutrient Web SDK allows you to pass a customized configuration for measurements annotation scale and precision through the following callback
 * @public
 * @memberof NutrientViewer
 * @callback MeasurementValueConfigurationCallback@callback MeasurementValueConfigurationCallback
 * @typedef {object} MeasurementValueConfiguration@typedef {object} MeasurementValueConfiguration
 * @property {string} name - Your custom configuration name. It has to be unique.
 * @property {IMeasurementScale} scale - The custom scale passed in the configuration, it represent the scale used in the document
 * @seealso NutrientViewer.MeasurementScale
 * @property {IMeasurementPrecision} precision - Precision values for the length of measurement annotations
 * @seealso NutrientViewer#.MeasurementPrecision
 * @property {?boolean} selected - Whether a custom scale is selected or not.
 * @example <caption>Configure a custom scale and pass it to our viewer</caption>
 *
 * const customScales = [
 *   {
 *     scale: {
 *       unitFrom: NutrientViewer.MeasurementScaleUnitFrom.CENTIMETERS,
 *       unitTo: NutrientViewer.MeasurementScaleUnitTo.METERS,
 *       fromValue: 1,
 *       toValue: 2
 *     },
 *     precision: NutrientViewer.MeasurementPrecision.FOUR,
 *     selected: true
 *   }
 * ];
 *
 * NutrientViewer.load({
 *   // Other options.
 *   measurementValueConfiguration: (documentScales) => {
 *     return [...customScales, ...documentScales];
 *   }
 * });
 */
declare type MeasurementValueConfiguration = {
  name?: string;
  scale: IMeasurementScale;
  precision: IMeasurementPrecision;
  selected?: boolean;};

declare type MeasurementValueConfigurationCallback = (configuration: MeasurementValueConfiguration[]) => MeasurementValueConfiguration[];

/**
 * @classdesc
 * Media Annotations specifies a region of a page upon which media clips may be played.
 *
 * With the Nutrient Web SDK you can display and delete Media Annotations, meanwhile creating them is not supported.
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display a media file in a document.
 * @class MediaAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 */
declare class MediaAnnotation<T extends IMediaAnnotation = IMediaAnnotation> extends Annotation<T> {
  /**
   * A description of the media content.
   * @public
   * @instance
   * @member {?string} description
   * @memberof NutrientViewer.Annotations.MediaAnnotation
   */
  description: null | string;
  /**
   * The file name of the attached file.
   * @public
   * @instance
   * @member {?string} fileName
   * @memberof NutrientViewer.Annotations.MediaAnnotation
   */
  fileName: null | string;
  /**
   * The content type of the connected attachment data. We expect it to be a MIME type (mp4, video, etc..).
   * @public
   * @instance
   * @member {string} contentType
   * @memberof NutrientViewer.Annotations.MediaAnnotation
   */
  contentType: string | null;
  /**
   * The attachment identifier of the media. It holds the media data as binary.
   * @public
   * @instance
   * @member {string} mediaAttachmentId
   * @memberof NutrientViewer.Annotations.MediaAnnotation
   */
  mediaAttachmentId: string | null;
  static defaultValues: IObject;
  static readableName: string;}

declare type MediaAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/media';
  description: string | null;
  fileName: string | null;
  contentType: string | null;
  mediaAttachmentId: string | null;};

declare class MediaAnnotationSerializer extends AnnotationSerializer {
  annotation: MediaAnnotation;
  constructor(annotation: MediaAnnotation);
  toJSON(): MediaAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<MediaAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): MediaAnnotation;}

/**
 * @public
 * @typedef {object} MentionableUser@typedef {object} MentionableUser
 * @property {string} id - The unique ID of the user.
 * @property {string} name - The name of the user.
 * @property {string} [avatarUrl] - The URL of the user's avatar.
 * @property {string} displayName - The display name of the user.
 * @property {string} [description] - The description of the user. This is shown in the mention list. If you want to show the email, you can pass it here.
 */
export declare type MentionableUser = {
  id: string;
  name: string;
  avatarUrl?: string;
  displayName: string;
  description?: string;};

/**
 * Returns a copy of the collection with the remaining collections merged in.
 *
 * A functional alternative to `collection.merge()` which will also work with
 * plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { merge } = require('immutable')
 * const original = { x: 123, y: 456 }
 * merge(original, { y: 789, z: 'abc' }) // { x: 123, y: 789, z: 'abc' }
 * console.log(original) // { x: 123, y: 456 }
 * ```
 */
declare function merge<C>(
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

/**
 * Returns a copy of the collection with the remaining collections merged in
 * deeply (recursively).
 *
 * A functional alternative to `collection.mergeDeep()` which will also work
 * with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { mergeDeep } = require('immutable')
 * const original = { x: { y: 123 }}
 * mergeDeep(original, { x: { z: 456 }}) // { x: { y: 123, z: 456 }}
 * console.log(original) // { x: { y: 123 }}
 * ```
 */
declare function mergeDeep<C>(
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

/**
 * Returns a copy of the collection with the remaining collections merged in
 * deeply (recursively), calling the `merger` function whenever an existing
 * value is encountered.
 *
 * A functional alternative to `collection.mergeDeepWith()` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { mergeDeepWith } = require('immutable')
 * const original = { x: { y: 123 }}
 * mergeDeepWith(
 *   (oldVal, newVal) => oldVal + newVal,
 *   original,
 *   { x: { y: 456 }}
 * ) // { x: { y: 579 }}
 * console.log(original) // { x: { y: 123 }}
 * ```
 */
declare function mergeDeepWith<C>(
merger: (oldVal: any, newVal: any, key: any) => any,
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

/**
 * Returns a copy of the collection with the remaining collections merged in,
 * calling the `merger` function whenever an existing value is encountered.
 *
 * A functional alternative to `collection.mergeWith()` which will also work
 * with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { mergeWith } = require('immutable')
 * const original = { x: 123, y: 456 }
 * mergeWith(
 *   (oldVal, newVal) => oldVal + newVal,
 *   original,
 *   { y: 789, z: 'abc' }
 * ) // { x: 123, y: 1245, z: 'abc' }
 * console.log(original) // { x: 123, y: 456 }
 * ```
 */
declare function mergeWith<C>(
merger: (oldVal: any, newVal: any, key: any) => any,
collection: C,
...collections: Array<Iterable<any> | Iterable<[any, any]> | {[key: string]: any;}>)
: C;

declare type min = number;

declare function MiscellaneousMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * **NOTE** This method is only available with Nutrient Instant.
     *
     * Use this method to obtain an up-to-date list of the current connected instance clients.
     *
     * The return value is an {@link https://facebook.github.io/immutable-js/docs/#/Map|Immutable.Map},
     * which can be used like the regular ES2015 Map.
     *
     * The {@link NutrientViewer.Instance~ConnectedClientsChangeEvent} will be triggered, whenever
     * a new client will connect to the document, or a current client will disconnect. The event
     * will always include the full up-to-date list of the currently connected clients (the same
     * that would be returned when you call this method).
     * @example <caption>Find out how many total clients are currently connected</caption>
     * instance.connectedClients.count();
     * @example <caption>Find out how many distinct users are currently connected</caption>
     * instance.connectedClients.groupBy(c => c.userId).count();
     * @example <caption>Find out how many anonymous clients are currently connected</caption>
     * instance.connectedClients.filter(c => !c.userId).count();
     * @public
     * @readonly
     * @instance
     * @server
     * @member {Immutable.Map.<string, NutrientViewer.InstantClient>} connectedClients
     * @memberof NutrientViewer.Instance
     */
    readonly connectedClients: Map_2<string, InstantClient>;
    /**
     * Enable actions like cut, copy, paste and duplicate for annotations using keyboard shortcuts `Cmd/Ctrl+X`, `Cmd/Ctrl+C`, `Cmd/Ctrl+V` and `Cmd/Ctrl+D` respectively.
     * @public
     * @instance
     * @function toggleClipboardActions
     * @memberof NutrientViewer.Instance
     * @param {boolean} enabled Whether to enable/disable the clipboard actions.
     */
    toggleClipboardActions(enabled: boolean): void;
    /**
     * Allows the user to toggle the snapping behavior while creation of measurement annotations. The snapping points are the points are a combination of endpoints, midpoints and intersections.
     * @public
     * @instance
     * @function setMeasurementSnapping
     * @memberof NutrientViewer.Instance
     * @param {boolean} enabled Whether to enable/disable snapping behaviour for creation of measurement annotations.
     */
    setMeasurementSnapping(enabled: boolean): void;
    /**
     * Set the precision value of all the newly created measurement annotations.
     * @example
     * instance.setMeasurementPrecision(NutrientViewer.MeasurementPrecision.THREE);
     * @public
     * @instance
     * @function setMeasurementPrecision
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.MeasurementPrecision} precision Precision value
     */
    setMeasurementPrecision(precision: IMeasurementPrecision): void;
    /**
     * Set the default value of scale for all newly created measurement annotations.
     * @example
     * instance.setMeasurementScale(new NutrientViewer.MeasurementScale({
     *   unitFrom: NutrientViewer.MeasurementScaleUnitFrom.CENTIMETERS,
     *   unitTo: NutrientViewer.MeasurementScaleUnitTo.INCHES,
     *   fromValue: 1,
     *   toValue: 2,
     * }));
     * @public
     * @instance
     * @function setMeasurementScale
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.MeasurementScale} scale Scale value
     */
    setMeasurementScale(scale: MeasurementScale): void;
    setMeasurementValueConfiguration(configurationCallback: MeasurementValueConfigurationCallback): void;
    /**
     * Given a list of rects and their page index, extracts the text intersecting them. This can be
     * useful to get the text that overlaps a focused annotation to give more context to screen reader users.
     *
     * Warning: The computed text might be partial as we just look behind the absolute coordinates of
     * a rect to see what text it is intersecting.
     * @example <caption>Get the text of all ink annotations on the first page:</caption>
     * const annotations = await instance.getAnnotations(0);
     * const inkAnnotationsRects = annotations.filter(
     *   annotation => annotation instanceof NutrientViewer.Annotations.InkAnnotation
     * ).map(annotation => annotation.boundingBox);
     * const text = await instance.getTextFromRects(0, inkAnnotationsRects);
     * console.log(text);
     * @public
     * @instance
     * @function getTextFromRects
     * @memberof NutrientViewer.Instance
     * @param {number} pageIndex the page index where the rects are located
     * @param {NutrientViewer.Immutable.List.<NutrientViewer.Geometry.Rect>} rects An immutable list of rects
     * @returns {Promise.<string>} The text that intersect the rects.
     */
    getTextFromRects(pageIndex: number, rects: List<Rect>): Promise<string>;
    /**
     * Extracts the text behind a {@link NutrientViewer.Annotations.MarkupAnnotation}. This can be
     * useful to get the highlighted text.
     *
     * Warning: This is only an approximation. Highlighted text might not always 100% represent the
     * text, as we just look behind the absolute coordinates to see what text is beneath. PDF
     * highlight annotations are not markers in the content itself.
     * @example <caption>Get the text of all text markup annotations on the first page:</caption>
     * const annotations = await instance.getAnnotations(0);
     * const markupAnnotations = annotations.filter(
     *   annotation => annotation instanceof NutrientViewer.Annotations.MarkupAnnotation
     * );
     * const text = await Promise.all(
     *   markupAnnotations.map(instance.getMarkupAnnotationText)
     * );
     * console.log(text);
     * @public
     * @instance
     * @function getMarkupAnnotationText
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.Annotations.MarkupAnnotation} annotation The text markup annotation you
     *   want to extract the text behind.
     * @returns {Promise.<string>} The text behind the annotation.
     */
    getMarkupAnnotationText(annotation: TextMarkupAnnotationsUnion): Promise<string>;
    /**
     * Load all {@link NutrientViewer.TextLine}s for the specified `pageIndex`. If there is no page
     * at the given index, the list will be empty.
     * @public
     * @instance
     * @function textLinesForPageIndex
     * @memberof NutrientViewer.Instance
     * @param {number} pageIndex The index of the page you want to extract text from.
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.TextLine>>} A promise that resolves the text
     *   lines of the given page.
     */
    textLinesForPageIndex(pageIndex: number): Promise<List<TextLine>>;
    /**
     * Returns the current {@link NutrientViewer.DocumentPermissions} of the document.
     * @public
     * @instance
     * @function getDocumentPermissions
     * @memberof NutrientViewer.Instance
     * @example
     * const permissions = await instance.getDocumentPermissions();
     * @returns {Promise.<Object<string, boolean>>} A Promise resolving to an object containing the {@link NutrientViewer.DocumentPermissions|document permissions} keys along with their status (`true` or `false`).
     */
    getDocumentPermissions(): Promise<Record<IDocumentPermissions, boolean>>;
    /**
     * The current zoom level. This will be either the number set in the current
     * {@link NutrientViewer.ViewState} or calculated using the {@link NutrientViewer.ZoomMode}.
     * @public
     * @readonly
     * @instance
     * @member {number} currentZoomLevel
     * @memberof NutrientViewer.Instance
     */
    readonly currentZoomLevel: number;
    /**
     * The current annotation creator name. This is set using {@link NutrientViewer.Instance#setAnnotationCreatorName|`instance.setAnnotationCreatorName()`}.
     * @public
     * @readonly
     * @instance
     * @member {string | null} annotationCreatorName
     * @memberof NutrientViewer.Instance
     */
    readonly annotationCreatorName: string | null;
    /**
     * The maximum zoom level. This value depends on the current viewport and page dimensions.
     * Defaults to `10` but can be bigger so that the `FIT_TO_WIDTH` and `FIT_TO_VIEWPORT`
     * {@link NutrientViewer.ZoomMode}s always fit.
     * @public
     * @readonly
     * @instance
     * @member {number} maximumZoomLevel
     * @memberof NutrientViewer.Instance
     */
    readonly maximumZoomLevel: number;
    /**
     * The minimum zoom level. This value depends on the current viewport and page dimensions.
     * Defaults to `0.5` but can be bigger so that the `FIT_TO_WIDTH` and `FIT_TO_VIEWPORT`
     * {@link NutrientViewer.ZoomMode}s always fit.
     * @public
     * @readonly
     * @instance
     * @member {number} minimumZoomLevel
     * @memberof NutrientViewer.Instance
     */
    readonly minimumZoomLevel: number;
    /**
     * @public
     * @readonly
     * @instance
     * @member {number} zoomStep
     * @memberof NutrientViewer.Instance
     */
    readonly zoomStep: number;
    /**
     * Whether to disable snapping to points when creating annotations
     * for measurement tools
     * @example
     * instance.setViewState(viewState => viewState.set('disablePointSnapping', true))
     * @public
     * @readonly
     * @instance
     * @member {boolean} disablePointSnapping
     * @memberof NutrientViewer.Instance
     */
    readonly disablePointSnapping: boolean;
    /**
     * This method is used to register event listeners for one of the following events:
     *
     * - {@link NutrientViewer.Instance~ViewStateChangeEvent|`viewState.change`}
     * - {@link NutrientViewer.Instance~ViewStateCurrentPageIndexChangeEvent|`viewState.currentPageIndex.change`}
     * - {@link NutrientViewer.Instance~ViewStateZoomChangeEvent|`viewState.zoom.change`}
     * - {@link NutrientViewer.Instance~AnnotationPresetsUpdateEvent|`annotationPresets.update`}
     * - {@link NutrientViewer.Instance~AnnotationsLoadEvent|`annotations.load`}
     * - {@link NutrientViewer.Instance~AnnotationsChangeEvent|`annotations.change`}
     * - {@link NutrientViewer.Instance~AnnotationsCreateEvent|`annotations.create`}
     * - {@link NutrientViewer.Instance~AnnotationsTransformEvent|`annotations.transform`}
     * - {@link NutrientViewer.Instance~AnnotationsUpdateEvent|`annotations.update`}
     * - {@link NutrientViewer.Instance~AnnotationsDeleteEvent|`annotations.delete`}
     * - {@link NutrientViewer.Instance~AnnotationsPressEvent|`annotations.press`}
     * - {@link NutrientViewer.Instance~AnnotationsWillSaveEvent|`annotations.willSave`}
     * - {@link NutrientViewer.Instance~AnnotationsDidSaveEvent|`annotations.didSave`}
     * - {@link NutrientViewer.Instance~AnnotationsFocusEvent|`annotations.focus`}
     * - {@link NutrientViewer.Instance~AnnotationsBlurEvent|`annotations.blur`}
     * - {@link NutrientViewer.Instance~AnnotationsWillChangeEvent|`annotations.willChange`}
     * - {@link NutrientViewer.Instance~BookmarksChangeEvent|`bookmarks.change`}
     * - {@link NutrientViewer.Instance~BookmarksWillSaveEvent|`bookmarks.willSave`}
     * - {@link NutrientViewer.Instance~BookmarksDidSaveEvent|`bookmarks.didSave`}
     * - {@link NutrientViewer.Instance~BookmarksLoadEvent|`bookmarks.load`}
     * - {@link NutrientViewer.Instance~BookmarksCreateEvent|`bookmarks.create`}
     * - {@link NutrientViewer.Instance~BookmarksUpdateEvent|`bookmarks.update`}
     * - {@link NutrientViewer.Instance~BookmarksDeleteEvent|`bookmarks.delete`}
     * - {@link NutrientViewer.Instance~CommentsChangeEvent|`comments.change`}
     * - {@link NutrientViewer.Instance~CommentsWillSaveEvent|`comments.willSave`}
     * - {@link NutrientViewer.Instance~CommentsDidSaveEvent|`comments.didSave`}
     * - {@link NutrientViewer.Instance~CommentsLoadEvent|`comments.load`}
     * - {@link NutrientViewer.Instance~CommentsCreateEvent|`comments.create`}
     * - {@link NutrientViewer.Instance~CommentsUpdateEvent|`comments.update`}
     * - {@link NutrientViewer.Instance~CommentsDeleteEvent|`comments.delete`}
     * - {@link NutrientViewer.Instance~DocumentChangeEvent|`document.change`}
     * - {@link NutrientViewer.Instance~SaveStateChangeEvent|`document.saveStateChange`}
     * - {@link NutrientViewer.Instance~FormFieldValuesUpdateEvent|`formFieldValues.update`}
     * - {@link NutrientViewer.Instance~FormFieldValuesWillSaveEvent|`formFieldValues.willSave`}
     * - {@link NutrientViewer.Instance~FormFieldValuesDidSaveEvent|`formFieldValues.didSave`}
     * - {@link NutrientViewer.Instance~FormFieldsLoadEvent|`formFields.load`}
     * - {@link NutrientViewer.Instance~FormFieldsChangeEvent|`formFields.change`}
     * - {@link NutrientViewer.Instance~FormFieldsCreateEvent|`formFields.create`}
     * - {@link NutrientViewer.Instance~FormFieldsUpdateEvent|`formFields.update`}
     * - {@link NutrientViewer.Instance~FormFieldsDeleteEvent|`formFields.delete`}
     * - {@link NutrientViewer.Instance~FormFieldsWillSaveEvent|`formFields.willSave`}
     * - {@link NutrientViewer.Instance~FormFieldsDidSaveEvent|`formFields.didSave`}
     * - {@link NutrientViewer.Instance~FormWillSubmitEvent|`forms.willSubmit`}
     * - {@link NutrientViewer.Instance~FormDidSubmitEvent|`forms.didSubmit`}
     * - {@link NutrientViewer.Instance~InkSignatureCreateEvent|`inkSignatures.create`}
     * - {@link NutrientViewer.Instance~InkSignatureUpdateEvent|`inkSignatures.update`}
     * - {@link NutrientViewer.Instance~InkSignatureDeleteEvent|`inkSignatures.delete`}
     * - {@link NutrientViewer.Instance~InkSignatureChangeEvent|`inkSignatures.change`}
     * - {@link NutrientViewer.Instance~StoredSignatureCreateEvent|`storedSignatures.create`}
     * - {@link NutrientViewer.Instance~StoredSignatureUpdateEvent|`storedSignatures.update`}
     * - {@link NutrientViewer.Instance~StoredSignatureDeleteEvent|`storedSignatures.delete`}
     * - {@link NutrientViewer.Instance~StoredSignatureChangeEvent|`storedSignatures.change`}
     * - {@link NutrientViewer.Instance~ConnectedClientsChangeEvent|`instant.connectedClients.change`}
     * - {@link NutrientViewer.Instance~TextSelectionChangeEvent|`textSelection.change`}
     * - {@link NutrientViewer.Instance~AnnotationSelectionChangeEvent|`annotationSelection.change`}
     * - {@link NutrientViewer.Instance~PagePressEvent|`page.press`}
     * - {@link NutrientViewer.Instance~TextLinePressEvent|`textLine.press`}
     * - {@link NutrientViewer.Instance~SearchStateChangeEvent|`search.stateChange`}
     * - {@link NutrientViewer.Instance~SearchTermChangeEvent|`search.termChange`}
     * - {@link NutrientViewer.Instance~HistoryUndoEvent|`history.undo`}
     * - {@link NutrientViewer.Instance~HistoryRedoEvent|`history.redo`}
     * - {@link NutrientViewer.Instance~HistoryChangeEvent|`history.change`}
     * - {@link NutrientViewer.Instance~HistoryWillChangeEvent|`history.willChange`}
     * - {@link NutrientViewer.Instance~HistoryClearEvent|`history.clear`}
     * - {@link NutrientViewer.Instance~CropAreaChangeStartEvent|`cropArea.changeStart`}
     * - {@link NutrientViewer.Instance~CropAreaChangeStopEvent|`cropArea.changeStop`}
     * - {@link NutrientViewer.Instance~DocumentComparisonUIStartEvent|`documentComparisonUI.start`}
     * - {@link NutrientViewer.Instance~DocumentComparisonUIEndEvent|`documentComparisonUI.end`}
     *
     * The behavior of this method is influenced by the DOM API. It requires an action and a
     * listener. Removing the listener will need the same reference to the listener function. The
     * `action` name is always starting with a lowercase letter, for example: `viewState.change` for
     * {@link NutrientViewer.Instance~ViewStateChangeEvent}
     *
     * You can add multiple listeners of the same event types as you would expect. Event listeners
     * can be removed by calling {@link NutrientViewer.Instance#removeEventListener}.
     *
     * When the supplied `event` is not in the above list, this method will throw a
     * {@link NutrientViewer.Error}.
     * @example <caption>Adding a listener for the {@link NutrientViewer.Instance~ViewStateChangeEvent|view state changed event}</caption>
     * instance.addEventListener("viewState.change", (viewState) => {
     *   console.log(viewState.toJS());
     * });
     * @example <caption>Adding an unknown event will raise an error.</caption>
     * try {
     *   instance.addEventListener("doesnotexist", () => {});
     * } catch (error) {
     *   (error instanceof NutrientViewer.Error); // => true
     * }
     * @public
     * @instance
     * @function addEventListener
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied event is not valid.
     * @param {string} action The action you want to add an event listener to. See the above list
     *   for possible event types.
     * @param {Function} listener A listener function.
     */
    addEventListener<K extends keyof EventMap>(action: K, listener: EventMap[K]): void;
    /**
     * This method can be used to remove an event listener registered via
     * {@link NutrientViewer.Instance#addEventListener}.
     *
     * It requires the same reference to the function that was used when registering the function
     * (equality will be verified the same way as it is in the DOM API).
     * @example <caption>Proper approach - Use the same reference for registering and removing</caption>
     * const callback = someFunction.bind(this)
     * instance.addEventListener("viewState.zoom.change", callback);
     * instance.removeEventListener("viewState.zoom.change", callback);
     * @example <caption>Wrong approach - Creates two different functions</caption>
     * instance.addEventListener("viewState.zoom.change", someFunction.bind(this));
     * // This will not work because `Function#bind()` will create a new function!
     * instance.removeEventListener("viewState.zoom.change", someFunction.bind(this));
     * @public
     * @instance
     * @function removeEventListener
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied event is not valid.
     * @param {string} action The action you want to add an event listener to. See the list
     *   on {@link NutrientViewer.Instance#addEventListener} for possible event types.
     * @param {Function} listener A listener function.
     */
    removeEventListener<K_1 extends keyof EventMap>(action: K_1, listener: EventMap[K_1]): void;
    /**
     * Brings the rect (in PDF page coordinates) into the viewport. This function will not change
     * the zoom level.
     *
     * This can be used to scroll to specific annotations or search results.
     * @example <caption>Jump to the ink annotation</caption>
     * instance.jumpToRect(inkAnnotation.pageIndex, inkAnnotation.boundingBox);
     * @public
     * @instance
     * @function jumpToRect
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments is not valid.
     * @param {number} pageIndex The index of the page you want to have information about. If none
     *   is provided, the first page (pageIndex `0`) will be used.
     * @param {NutrientViewer.Geometry.Rect} rect The rect in PDF page coordinates that you want to jump
     *   to.
     */
    jumpToRect(pageIndex: number, rect: Rect): void;
    /**
     * Brings the rect (in PDF page coordinates) into the viewport. This
     * function will also change the zoom level so that the rect is visible
     * completely in the best way possible.
     * @example <caption>Jump and zoom to the ink annotation</caption>
     * instance.jumpAndZoomToRect(inkAnnotation.pageIndex, inkAnnotation.boundingBox);
     * @public
     * @instance
     * @function jumpAndZoomToRect
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments
     * are not valid.
     * @param {number} pageIndex The index of the page you want to have
     *   information about. If none is provided, the first page (pageIndex `0`)
     *   will be used.
     * @param {NutrientViewer.Geometry.Rect} rect The rect in PDF page coordinates
     *   that you want to jump to.
     */
    jumpAndZoomToRect(pageIndex: number, rect: Rect): void;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * client space inside the content frame to the PDF page space.
     *
     * The content client space is relative to the NutrientViewer mounting container and the same
     * coordinates that you receive by DOM APIs like `Element.getBoundingClientRect()` or
     * `MouseEvent.clientX`, etc. that originate within the Nutrient Web SDK's iframe.
     *
     * Use this transform when you receive events inside the content frame.
     * @public
     * @instance
     * @function transformContentClientToPageSpace
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments is not valid.
     * @param {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} rectOrPoint The rectangle or point
     *   that needs to be transformed
     * @param {number} pageIndex The index of the page you want to have information about. If none
     *   is provided, the first page (pageIndex `0`) will be used.
     * @returns {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} The transformed point or
     *   rectangle.
     */
    transformContentClientToPageSpace<T extends Rect | Point>(rectOrPoint: T, pageIndex: number): T;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * PDF page space to the client space inside the content frame.
     *
     * The content client space is relative to the NutrientViewer mounting container and the same
     * coordinates that you receive by DOM APIs like `Element.getBoundingClientRect()` or
     * `MouseEvent.clientX`, etc. that originate within the Nutrient Web SDK's iframe.
     *
     * Use this transform when you want to position elements inside the NutrientViewer content frame.
     * @public
     * @instance
     * @function transformContentPageToClientSpace
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments is not valid.
     * @param {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} rectOrPoint The rectangle or point
     *   that needs to be transformed
     * @param {number} pageIndex The index of the page you want to have information about. If none
     *   is provided, the first page (pageIndex `0`) will be used.
     * @returns {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} The transformed point or
     *   rectangle.
     */
    transformContentPageToClientSpace<T_1 extends Rect | Point>(rectOrPoint: T_1, pageIndex: number): T_1;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * client space inside the main frame to the PDF page space.
     *
     * The client space is relative to your HTML viewport and the same coordinates that you receive
     * by DOM APIs like `Element.getBoundingClientRect()` or `MouseEvent.clientX`, etc.
     *
     * Use this transform when you receive events inside the main frame (The `document` of your
     * application).
     *
     * Note: If you apply a CSS scale transformation to the mounting node of Nutrient Web SDK, this
     * calculation will not work. In this case make sure to manually scale afterwards.
     * @public
     * @instance
     * @function transformClientToPageSpace
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments is not valid.
     * @param {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} rectOrPoint The rectangle or point
     *   that needs to be transformed
     * @param {number} pageIndex The index of the page you want to have information about. If none
     *   is provided, the first page (pageIndex `0`) will be used.
     * @returns {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} The transformed point or
     *   rectangle.
     */
    transformClientToPageSpace<T_2 extends Rect | Point>(rectOrPoint: T_2, pageIndex: number): T_2;
    /**
     * Transforms a {@link NutrientViewer.Geometry.Point} or a {@link NutrientViewer.Geometry.Rect} from the
     * PDF page space to the client space inside the main frame.
     *
     * The client space is relative to your HTML viewport and the same coordinates that you receive
     * by DOM APIs like `Element.getBoundingClientRect()` or `MouseEvent.clientX`, etc.
     *
     * Use this transform when you want to position elements inside the main frame.
     *
     * Note: If you apply a CSS scale transformation to the mounting node of Nutrient Web SDK, this
     * calculation will not work. In this case make sure to manually scale afterwards.
     * @public
     * @instance
     * @function transformPageToClientSpace
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments is not valid.
     * @param {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} rectOrPoint The rectangle or point
     *   that needs to be transformed
     * @param {number} pageIndex The index of the page you want to have information about. If none
     *   is provided, the first page (pageIndex `0`) will be used.
     * @returns {NutrientViewer.Geometry.Rect | NutrientViewer.Geometry.Point} The transformed point or
     *   rectangle.
     */
    transformPageToClientSpace<T_3 extends Rect | Point>(rectOrPoint: T_3, pageIndex: number): T_3;
    /**
     * Transforms a raw PDF bounding rect from the PDF page space to NutrientViewer's page space.
     *
     * Use this transform when you want to manage entities using their raw, original coordinates
     * and dimensions according to the PDF spec (e.g. from a XFDF file).
     * @public
     * @instance
     * @function transformRawToPageSpace
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments is not valid.
     * @param {NutrientViewer.Geometry.Inset | Array<number>} insetOrRawInset The inset to be transformed
     * @param {number} pageIndex The index of the page you want to have information about.
     * @returns {NutrientViewer.Geometry.Rect} The resulting transformed rectangle.
     */
    transformRawToPageSpace(rawInset: InsetJSON | Inset, pageIndex: number): Rect;
    /**
     * Transforms a NutrientViewer page space bounding box to a raw PDF bounding rect.
     *
     * A raw PDF bounding rect is an array of inset values: `[left, bottom, right, top]`,
     * in PDF page space units (as opposted to NutrientViewer page units) where the `top` and `bottom`
     * coordinates are actually relative to the distance to the bottom of the page.
     *
     * Use this transform when you want to manage document entities with external tools.
     * @public
     * @instance
     * @function transformPageToRawSpace
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied arguments is not valid.
     * @param {NutrientViewer.Geometry.Rect} rect The rectangle to be transformed
     * @param {number} pageIndex The index of the page you want to have information about.
     * @returns {NutrientViewer.Geometry.Inset} The resulting transformed rectangle as inset coordinates.
     */
    transformPageToRawSpace(rect: Rect, pageIndex: number): Inset;
    /**
     * Exports the document converted to the specified output format as an `ArrayBuffer`. This can be used to download the resulting file.
     *
     * An `options` object should be passed to the method with a `format` property
     * set to one of the supported conversion output formats: {@link NutrientViewer.OfficeDocumentFormat}.
     * @example <caption>Download as DOCX</caption>
     * instance.exportOffice({ format: NutrientViewer.OfficeDocumentFormat.docx })
     *   .then(function (buffer) {
     *     const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
     *     const objectUrl = window.URL.createObjectURL(blob);
     *     downloadPdf(objectUrl);
     *     window.URL.revokeObjectURL(objectUrl);
     *   });
     *
     * function downloadPdf(blob) {
     *   const a = document.createElement("a");
     *   a.href = blob;
     *   a.style.display = "none";
     *   a.download = "download.docx";
     *   a.setAttribute("download", "download.docx");
     *   document.body.append(a);
     *   a.click();
     *   a.remove();
     * }
     * @public
     * @instance
     * @function exportOffice
     * @memberof NutrientViewer.Instance
     * @param {object} options Export options object:
     * @param {object.format} format one of {@link NutrientViewer.OfficeDocumentFormat} values.
     * @returns {Promise.<ArrayBuffer>} The binary contents of the PDF.
     */
    exportOffice(options: ExportOfficeFlags): Promise<ArrayBuffer>;
    /**
     * Exports the PDF contents as an `ArrayBuffer`. This can be used to download the PDF.
     *
     * An `options` object can be passed to the method with the following flags:
     * - `flatten`, which will visually embed annotations and form fields in the document and
     * remove them from the document's data.
     * - `incremental`, which will force the document to be incrementally saved if `true`.
     * - `excludeAnnotations`, which will exclude annotations from the exported document.
     * - `saveForPrinting`, which will exclude annotations that have the `noPrint` flag set to `true` from the exported document (Standalone only);
     * - `includeComments`, which will include comments in the exported document (Server-Backed only).
     * - `permissions`, which protects the PDF with a password.
     * - `outputFormat`, which allows you to export a PDF in PDF/A format.
     * - `optimize`, which allows optimization of the document to be exported (Server-Backed only).
     *
     * If the document is digitally signed and the license includes the Digital Signatures component,
     * the method will export the document incrementally saved by default, so as not to corrupt signed
     * data. Otherwise, it will be exported as fully saved by default.
     *
     * It's not possible to use `flatten` and `incremental` both set to `true` at the same time,
     * as flattening is a destructive operation that will necessarily modify the provided document.
     *
     * Please see {@link https://www.nutrient.io/guides/web/current/features/document-processing/|this guide article} for more information and examples.
     * @example <caption>Export the PDF content</caption>
     * instance.exportPDF().then(function (buffer) {
     *   buffer; // => ArrayBuffer
     * });
     * @example <caption>Export the PDF with password and permissions</caption>
     * instance.exportPDF({
     *    permissions: {
     *      userPassword: "123",
     *      ownerPassword: "123",
     *      documentPermissions: [NutrientViewer.DocumentPermissions.annotationsAndForms]
     *    }
     * }).then(function (buffer) {
     *   buffer; // => ArrayBuffer
     * });
     * @example <caption>Download the PDF by using an `&lt;a&gt;` tag</caption>
     * instance.exportPDF().then(function(buffer) {
     *   const supportsDownloadAttribute = HTMLAnchorElement.prototype.hasOwnProperty(
     *     "download"
     *   );
     *   const blob = new Blob([buffer], { type: "application/pdf" });
     *   if (navigator.msSaveOrOpenBlob) {
     *     navigator.msSaveOrOpenBlob(blob, "download.pdf");
     *   } else if (!supportsDownloadAttribute) {
     *     const reader = new FileReader();
     *     reader.onloadend = function() {
     *       const dataUrl = reader.result;
     *       downloadPdf(dataUrl);
     *     };
     *     reader.readAsDataURL(blob);
     *   } else {
     *     const objectUrl = window.URL.createObjectURL(blob);
     *     downloadPdf(objectUrl);
     *     window.URL.revokeObjectURL(objectUrl);
     *   }
     * });
     * function downloadPdf(blob) {
     *   const a = document.createElement("a");
     *   a.href = blob;
     *   a.style.display = "none";
     *   a.download = "download.pdf";
     *   a.setAttribute("download", "download.pdf");
     *   document.body.appendChild(a);
     *   a.click();
     *   document.body.removeChild(a);
     * }
     * @public
     * @instance
     * @function exportPDF
     * @memberof NutrientViewer.Instance
     * @param {object} flags Export options object:
     * * `flatten` `{boolean}` Default: `false`. Whether the document annotations should be converted to PDF content and therefore not editable in the future.
     * * `incremental` `{boolean}` Default: `false`, or `true` if the document is digitally signed and the license includes the Digital Signatures component. Whether the document should be exported using "full" or "incremental" saving (Standalone only).
     * * `excludeAnnotations` `{boolean}` Default: `false`. Whether the document annotations should be exported.
     * * `saveForPrinting` only supported in Standalone setups. `{boolean}` Default: `false`.
     * * `includeComments` only supported in Server-Backed setups. `{boolean}` Default: `true`.
     * * `flattenElectronicSignatures` `{boolean}` Default: value of `flatten`. Allows flattening Electronic Signatures and removing their associated form fields so they are visible in other viewers that otherwise would hide them.
     * * `permissions` `{Object}`. Contain the `userPassword` and `ownerPassword` to encrypt the PDF along with the `documentPermissions`.
     *  `permissions.userPassword` `{string}`. The user password to encrypt the PDF.
     *  `permissions.ownerPassword` `{string}`. The owner password to encrypt the PDF.
     *  `permissions.documentPermissions`  {{@link NutrientViewer.DocumentPermissions|DocumentPermissions}} . An Array that specifies what users can do with the output PDF.
     * * `outputFormat` `boolean | {conformance?: {@link NutrientViewer.Conformance|Conformance}, vectorization?: boolean, rasterization?: boolean}`
     * Defaults to `false`. If set to `true`, a default set of options will be applied to the exported document:
     *```
     * {
     *   conformance: NutrientViewer.Conformance.PDFA_2B,
     *   vectorization: true,
     *   rasterization: true,
     * }
     *```
     *
     * Instead of a boolean value you can pass your own object ith custom values for the properties above.
     *
     * Parameters `vectorization` and `rasterization` are only supported in Document Engine mode.
     *
     * * `optimize`: only supported in Document Engine mode
     *
     * ```
     * `boolean |
     * {
     *   documentFormat?: 'pdf' | 'pdfa',
     *   grayscaleText: boolean,
     *   grayscaleGraphics: boolean,
     *   grayscaleFormFields: boolean,
     *   grayscaleAnnotations: boolean,
     *   grayscaleImages: boolean,
     *   disableImages: boolean,
     *   mrcCompression: boolean,
     *   imageOptimizationQuality: 1 | 2 | 3 | 4,
     *   linearize: boolean,
     * }
     * ```
     *
     * Defaults to `false`. If set to `true` the exported document will have a default set of options:
     *
     *```
     * {
     *   documentFormat: 'pdf',
     *   grayscaleText: false,
     *   grayscaleGraphics: false,
     *   grayscaleFormFields: false,
     *   grayscaleAnnotations: false,
     *   grayscaleImages: false,
     *   disableImages: false,
     *   mrcCompression: false,
     *   imageOptimizationQuality: 2,
     *   linearize: false,
     * }
     *```
     *
     * Otherwise, you can pass the above options object customised with your own values
     * instead of a boolean value.
     * @returns {Promise.<ArrayBuffer>} The binary contents of the PDF.
     */
    exportPDF(flags?: ExportPDFFlags): Promise<ArrayBuffer>;
    /**
     * [XFDF](https://en.wikipedia.org/wiki/Portable_Document_Format#XML_Forms_Data_Format_(XFDF)) can be
     * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be
     * used to store annotation and form field value changes on your server and conveniently
     * instantiate the viewer with the same content at a later time.
     *
     * Instead of storing the updated PDF, this serialization only contains a diff that is applied
     * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
     * potentially large PDF all the time.
     *
     * This method is used to export the current annotations as XFDF. Use
     * {@link NutrientViewer.Configuration#XFDF} to load it.
     *
     * For Server-Backed setups, only [saved](www.nutrient.io/guides/web/current/annotations/annotation-saving-mechanism/)
     * annotations will be exported.
     * @example
     * instance.exportXFDF().then(function (xmlString) {
     *   // Persist it to a server
     *   fetch("https://example.com/annotations", {
     *     "Content-Type": "application/vnd.adobe.xfdf",
     *     method: "POST",
     *     body: xmlString
     *   }).then(...);
     * });
     * @public
     * @instance
     * @function exportXFDF
     * @memberof NutrientViewer.Instance
     * @param {boolean} ignorePageRotation Optional flag to ignore page rotation when exporting XFDF, by default false.
     * This means that the exported XFDF will contain the annotations in the same orientation as the page and if you
     * import this XFDF using {@link NutrientViewer.Configuration#XFDFIgnorePageRotation} the annotations will be imported in the same orientation
     * no matter the page rotation.
     * @returns {Promise.<string>} XFDF as a plain text.
     */
    exportXFDF(ignorePageRotation?: boolean): Promise<string>;
    /**
     * Print the document programmatically.
     * @public
     * @instance
     * @function print
     * @memberof NutrientViewer.Instance
     * @param {object} options Print options object:
     * * `mode` `{@link NutrientViewer.PrintMode}` Optional print mode. See {@link NutrientViewer.PrintMode}.
     * * `excludeAnnotations` `{boolean}` Default: `false` Whether to exclude annotations from the printout.
     * @throws {NutrientViewer.Error} This method will throw when printing is disabled, currently in
     *   process or when an invalid {@link NutrientViewer.PrintMode} was supplied.
     */
    print(options?: IPrintMode | {
      mode?: IPrintMode;
      excludeAnnotations?: boolean;})
    : void;
    /**
     * Sets the annotation creator name.
     * Each created annotation will have the creators name set in the author property.
     * @public
     * @instance
     * @function setAnnotationCreatorName
     * @memberof NutrientViewer.Instance
     * @param {?string} annotationCreatorName
     */
    setAnnotationCreatorName(annotationCreatorName?: string | null): void;
    /**
     * Sets the current custom renderers.
     * When this function is called with a new {@link NutrientViewer.CustomRenderers} object,
     * all visible custom rendered annotations are immediately updated.
     * @public
     * @instance
     * @function setCustomRenderers
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.CustomRenderers} customRenderers
     */
    setCustomRenderers(customRenderers: CustomRenderers): void;
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setCustomUIConfiguration|setCustomUIConfiguration()}
     * method to do atomic updates to the current custom UI configuration and currently rendered UI elements.
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~CustomUIConfigurationSetter
     * @param {NutrientViewer.CustomUIConfiguration} currentCustomUIConfiguration
     * @returns {NutrientViewer.CustomUIConfiguration} The new custom UI configuration.
     */
    /**
     * Sets the current custom UI configuration.
     * When this function is called with a new {@link NutrientViewer.CustomUI} object,
     * all visible sidebars are immediately updated.
     * @public
     * @instance
     * @function setCustomUIConfiguration
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.CustomUIConfiguration | NutrientViewer.Instance~CustomUIConfigurationSetter} customUIConfigurationOrCustomUIConfigurationSetter
         */
    setCustomUIConfiguration(customUIConfigurationOrCustomUIConfigurationSetter: ((customUI: CustomUI | null) => CustomUI) | Partial<Record<"Sidebar", Partial<{
      [x: string & {}]: Renderer;
      CUSTOM: Renderer;
      ANNOTATIONS: Renderer;
      BOOKMARKS: Renderer;
      DOCUMENT_OUTLINE: Renderer;
      THUMBNAILS: Renderer;
      SIGNATURES: Renderer;
      LAYERS: Renderer;
      ATTACHMENTS: Renderer;}>>>)
    : void;
    /**
     * You can use this callback to set/modify the toolbar items present in the inline toolbar
     * after the document has loaded.
     *
     * The callback will receive the
     * default items of the inline toolbar and the text that is currently selected {@link NutrientViewer.TextSelection}
     *
     * You can do the following modifications using this API:
     *
     * - Add new items.
     * - Remove existing items.
     * - Change the order of the items.
     * - Customise each item eg change the `icon` of the a default toolbar item.
     *
     * You can also use the `hasDesktopLayout` flag provided to the callback to determine if the current UI is being rendered on
     * mobile or desktop. Based on that, you can implement different designs for Desktop and Mobile.
     *
     * This callback gets called every time the inline toolbar is mounted.
     * @example <caption>Add a custom button and a custom node to the toolbar.</caption>
     * instance.setInlineTextSelectionToolbarItems(({ defaultItems, hasDesktopLayout }, selection) => {
     *  console.log(selection)
     *  if (hasDesktopLayout) {
     *    const node = document.createElement("div");
     *    node.innerText = "Custom Item";
     *      return [
     *        ...defaultItems,
     *        {
     *          type: "custom",
     *          id: "custom-1",
     *          node: node,
     *          className: "Custom-Node",
     *          onPress: () => alert("Custom node pressed!"),
     *        },
     *        {
     *          type: "custom",
     *          id: "custom-2",
     *          title: "custom-button-2",
     *          onPress: () => alert("Custom item pressed!"),
     *        },
     *      ];
     *     }
     *    return defaultItems
     *   });
     * @public
     * @instance
     * @function NutrientViewer.Instance~setInlineTextSelectionToolbarItems
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.InlineTextSelectionToolbarItemsCallback} inlineTextSelectionToolbarItemsCallback
     */
    setInlineTextSelectionToolbarItems(inlineTextSelectionToolbarItemsCallback: InlineTextSelectionToolbarItemsCallback): void;
    /**
     * Aborts the current print job.
     * @public
     * @instance
     * @function abortPrint
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} This method will throw when printing is disabled or no printing is
     *   currently being processed.
     */
    abortPrint(): void;
    /**
     * Returns the document outline (table of content).
     * @public
     * @instance
     * @function getDocumentOutline
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.OutlineElement>>} A promise that resolves to
     * a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.OutlineElement}
     */
    getDocumentOutline(): Promise<List<OutlineElement>>;
    /**
     * ***Standalone only***
     *
     * Sets the document outline (table of content).
     * @public
     * @instance
     * @function setDocumentOutline
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.Immutable.List.<NutrientViewer.OutlineElement>} outline The outline to set.
     * @returns {Promise.<void>} A promise that resolves when the outline has been set.
     */
    setDocumentOutline(outline: List<OutlineElement>): Promise<void>;













    /**
     * Returns a list of {@link NutrientViewer.Layers|OCG layers} present in the document.
     * @public
     * @instance
     * @function getLayers
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<Array.<NutrientViewer.Layer>>} A promise that resolves to
     * an `Array` of {@link NutrientViewer.Layer}
     */
    getLayers(): Promise<OCGLayers>;
    /**
     * Returns the {@link NutrientViewer.PageInfo|PageInfo} for the specified page index.
     * If there is no page at the given index, returns `null`.
     * @example
     * // Get information about the first page
     * const info = instance.pageInfoForIndex(0);
     * if (info) {
     *   console.log(info.width, info.height);
     * }
     * @public
     * @instance
     * @function pageInfoForIndex
     * @memberof NutrientViewer.Instance
     * @param {number} pageIndex The index of the page you want to have information about
     * @returns {?NutrientViewer.PageInfo} The {@link NutrientViewer.PageInfo|PageInfo} or `null`.
     */
    pageInfoForIndex(pageIndex: number): PageInfo | null;
    /**
     * The total number of pages in the current document.
     * @example
     * // Log the total number of pages
     * console.log(instance.totalPageCount);
     * @public
     * @readonly
     * @instance
     * @member {number} totalPageCount
     * @memberof NutrientViewer.Instance
     */
    readonly totalPageCount: number;














    /**
     * Access the shadow root object of the Nutrient Web SDK's viewer. This can be used to quickly
     * interact with elements (using our public CSS API) inside the viewer.
     *
     * When the iframe fallback is set, this property provides access the `document` object of
     * the Nutrient Web SDK's viewer frame instead.
     * @example
     * instance.contentDocument.addEventListener("mouseup", handleMouseUp);
     * @public
     * @readonly
     * @instance
     * @member {Document | ShadowRoot} contentDocument
     * @memberof NutrientViewer.Instance
     */
    readonly contentDocument: Document | ShadowRoot;
    /**
     * Access the `window` object of the Nutrient Web SDK's viewer frame. This can be used to quickly
     * interact with elements (using our public CSS API) inside the viewer.
     * @example
     * instance.contentWindow.location;
     * @public
     * @readonly
     * @instance
     * @member {window} contentWindow
     * @memberof NutrientViewer.Instance
     */
    readonly contentWindow: Window;
    /**
     * Sets the OCG visibility state.
     *
     * This method takes an {@link NutrientViewer.LayersVisibilityState} object as an argument, which contains
     * a `visibleLayerIds` `Array` that contains the list of layers identified by their `ocgId`, and
     * makes them visible, hiding any other layers not included in the `Array`.
     * @example
     * instance.setLayersVisibilityState({
     *   visibleLayerIds: [1, 2, 3]
     * })
     * @public
     * @instance
     * @function setLayersVisibilityState
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.LayersVisibilityState} layersVisibilityState The OCG visibility state to set.
     * @returns {Promise.<void>} A promise that resolves when the OCG visibility state has been set.
     */
    setLayersVisibilityState(layersVisibilityState: OCGLayersVisibilityState): Promise<void>;
    /**
     * Returns the current OCG layers visibility state.
     *
     * OCG layers are groups of content in the document, that can be shown or hidden independently.
     *
     * This method returns the current visibility state of the layers in the document as an object
     * with a `visibleLayerIds` `Array` that contains the list of layers identified by their `ocgId`
     * number, which are currently visible.
     * @example
     * instance.getLayersVisibilityState().then(function (layersVisibilityState) {
     *  console.log(layersVisibilityState); // => { visibleLayerIds: [1, 2, 3] }
     * });
     * @public
     * @instance
     * @function getLayersVisibilityState
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<NutrientViewer.LayersVisibilityState>} A promise that resolves to
     * a {@link NutrientViewer.LayersVisibilityState}
     */
    getLayersVisibilityState(): Promise<OCGLayersVisibilityState>;
    /**
     * [Instant JSON](https://www.nutrient.io/guides/web/importing-exporting/instant-json/) can be
     * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be
     * used to store annotation and form field value changes on your server and conveniently
     * instantiate the viewer with the same content at a later time.
     *
     * Instead of storing the updated PDF, this serialization only contains a diff that is applied
     * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
     * potentially large PDF all the time.
     *
     * This method is used to export the current annotations as Instant JSON. Use
     * {@link NutrientViewer.Configuration#instantJSON} to load it.
     *
     * `annotations` will follow the [Instant Annotation JSON format specification](www.nutrient.io/guides/server/current/api/json-format/).
     * `formFieldValues` will follow the [Instant Form Field Value JSON format specification](www.nutrient.io/guides/server/current/api/json-format/).
     *
     * Optionally a `version` argument can be provided to specify the Instant JSON version to use for exported annotations.
     *
     * For Server-Backed setups, only [saved](www.nutrient.io/guides/web/current/annotations/annotation-saving-mechanism/)
     * annotations will be exported.
     * @example
     * instance.exportInstantJSON().then(function (instantJSON) {
     *   // Persist it to a server
     *   fetch("https://example.com/annotations", {
     *     "Content-Type": "application/json",
     *     method: "POST",
     *     body: JSON.stringify(instantJSON)
     *   }).then(...);
     * });
     * @public
     * @instance
     * @function exportInstantJSON
     * @param {number} version Optional Instant JSON version for annotations.
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<object>} Instant JSON as a plain JavaScript object.
     */
    exportInstantJSON(version?: number): Promise<InstantJSON>;};} &




T;











declare const ModificationType: {
  readonly CREATED: "CREATED";
  readonly UPDATED: "UPDATED";
  readonly DELETED: "DELETED";};


declare interface MutableRefObject<T> {
  current: T;}

/**
 * @classdesc
 * PDF action to trigger a named action. This action is not implemented yet.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("action", "nextPage");`.
 * @example <caption>Create a new NamedAction</caption>
 * var action = new NutrientViewer.Actions.NamedAction({ action: "nextPage" });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Trigger a named action.
 * @class NamedAction
 * @param {object} args
 * @extends NutrientViewer.Actions.Action
 */
export declare class NamedAction extends Action {
  /**
   * The name of the action. This includes but is not limited to the following actions:
   *
   * - `nextPage`
   * - `prevPage`
   * - `firstPage`
   * - `lastPage`
   * - `goBack`
   * - `goForward`
   * - `goToPage`
   * - `find`
   * - `print`
   * - `outline`
   * - `search`
   * - `brightness`
   * - `zoomIn`
   * - `zoomOut`
   * - `saveAs`
   * - `info`
   * @public
   * @instance
   * @member {string} action
   * @memberof NutrientViewer.Actions.NamedAction
   */
  action: string;
  static defaultValues: IObject;
  constructor(args?: INamedAction);}

declare type NonSerializableDocumentOperations = {
  type: 'applyInstantJson';
  instantJson: Record<string, unknown>;
  dataFilePath?: OperationAttachment;} |
{
  type: 'applyXfdf';
  xfdf: string;
  ignorePageRotation?: boolean;
  dataFilePath?: OperationAttachment;
  richTextEnabled?: boolean;} |
{
  type: 'flattenAnnotations';
  pageIndexes?: Array<number>;
  annotationIds?: string[];
  noteAnnotationBackgroundColor?: Color;
  noteAnnotationOpacity?: number;};

declare type NonSerializableDocumentOperationsCommon = {
  type: 'removePages';
  pageIndexes: Array<number>;} |
{
  type: 'duplicatePages';
  pageIndexes: Array<number>;} |
{
  type: 'movePages';
  pageIndexes: Array<number>;
  afterPageIndex: number;} |
{
  type: 'movePages';
  pageIndexes: Array<number>;
  beforePageIndex: number;} |
{
  type: 'rotatePages';
  pageIndexes: Array<number>;
  rotateBy: Rotation;} |
{
  type: 'keepPages';
  pageIndexes: Array<number>;} |
{
  type: 'importDocument';
  afterPageIndex: number;
  treatImportedDocumentAsOnePage?: boolean;
  document: OperationAttachment;
  importedPageIndexes?: ImportPageIndex;} |
{
  type: 'importDocument';
  beforePageIndex: number;
  treatImportedDocumentAsOnePage?: boolean;
  document: OperationAttachment;
  importedPageIndexes?: ImportPageIndex;} |
{
  type: 'setPageLabel';
  pageIndexes?: Array<number>;
  pageLabel?: string;} |
{
  type: 'performOcr';
  pageIndexes?: Array<number> | 'all';
  language: string;} |
{
  type: 'applyRedactions';} |
{
  type: 'updateMetadata';
  metadata: DocumentMetadata;};

/**
 * @classdesc
 * Note annotations are "sticky notes" attached to a point in the PDF document.
 * They are represented as markers and each of them as an icon associated to it.
 * Its text content is revealed on selection.
 *
 * <center>
 *   <img title="Example of a note annotation" src="img/annotations/note_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create a note annotation</caption>
 * const annotation = new NutrientViewer.Annotations.NoteAnnotation({
 *   pageIndex: 0,
 *   text: { format: "plain", value : "Remember the milk" },
 *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary A text note that will be rendered inside the bounding box.
 * @class NoteAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 * @seealso NutrientViewer.Instance#setEditingAnnotation
 */
export declare class NoteAnnotation<T extends INoteAnnotation = INoteAnnotation> extends Annotation<T> {
  /**
   * The note contents in plain text formats.
   * We don't support rich text formatting in the text field.
   * @public
   * @instance
   * @member {Text} text
   * @memberof NutrientViewer.Annotations.NoteAnnotation
   * @default ""
   */
  text: {
    format: 'plain';
    value: string;};

  /**
   * The icon to represent the collapsed annotation in the document.
   * @public
   * @instance
   * @member {NutrientViewer.NoteIcon} icon
   * @memberof NutrientViewer.Annotations.NoteAnnotation
   * @default {@link NutrientViewer.NoteIcon|NutrientViewer.NoteIcon.COMMENT}
   */
  icon: INoteIcon;
  /**
   * Background color that will fill the complete bounding box.
   * @public
   * @instance
   * @member {NutrientViewer.Color} color
   * @memberof NutrientViewer.Annotations.NoteAnnotation
   * @default new Color({ r: 255, g: 216, b: 63 }) - yellow
   */
  color: Color;
  static isEditable: boolean;
  static readableName: string;
  static defaultValues: IObject;}

export declare type NoteAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/note';
  text?: {
    format: 'plain';
    value: string;};

  icon?: string;
  color?: string;};

declare class NoteAnnotationSerializer extends AnnotationSerializer {
  annotation: NoteAnnotation;
  constructor(annotation: NoteAnnotation);
  toJSON(): NoteAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<NoteAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): NoteAnnotation;}

/**
 * Available icons for Note Annotations.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.NoteIcon} COMMENT
 * @property {NutrientViewer.NoteIcon} RIGHT_POINTER
 * @property {NutrientViewer.NoteIcon} RIGHT_ARROW
 * @property {NutrientViewer.NoteIcon} CHECK
 * @property {NutrientViewer.NoteIcon} CIRCLE
 * @property {NutrientViewer.NoteIcon} CROSS
 * @property {NutrientViewer.NoteIcon} INSERT
 * @property {NutrientViewer.NoteIcon} NEW_PARAGRAPH
 * @property {NutrientViewer.NoteIcon} NOTE
 * @property {NutrientViewer.NoteIcon} PARAGRAPH
 * @property {NutrientViewer.NoteIcon} HELP
 * @property {NutrientViewer.NoteIcon} STAR
 * @property {NutrientViewer.NoteIcon} KEY
 */
declare const NoteIcon: {
  readonly COMMENT: "COMMENT";
  readonly RIGHT_POINTER: "RIGHT_POINTER";
  readonly RIGHT_ARROW: "RIGHT_ARROW";
  readonly CHECK: "CHECK";
  readonly CIRCLE: "CIRCLE";
  readonly CROSS: "CROSS";
  readonly INSERT: "INSERT";
  readonly NEW_PARAGRAPH: "NEW_PARAGRAPH";
  readonly NOTE: "NOTE";
  readonly PARAGRAPH: "PARAGRAPH";
  readonly HELP: "HELP";
  readonly STAR: "STAR";
  readonly KEY: "KEY";};


/**
 * The main NutrientViewer namespace is exported in the global `NutrientViewer`.
 * @public
 * @namespace NutrientViewer
 */
declare const NutrientViewer: {
  UI: Record<string, any>;
  Maui: {
    MauiBridge: typeof MauiBridgeInstance;} |
  undefined;
  /**
   * This namespaces exposes classes from the [Immutable.js](https://immutable-js.github.io/immutable-js/).
   * Since all of our state objects are implemented as [Immutable.Record](https://immutable-js.github.io/immutable-js/docs/#/Record),
   * we also assume that the props are immutable.
   *
   * To do this, we export the required classes directly from Immutable.js
   * @public
   * @summary Exports from Immutable.js
   * @namespace NutrientViewer.Immutable
   */
  Immutable: {
    List: typeof List;
    Set: typeof Set_2;};

  /**
   * Returns the framework version (e.g. "2019.4.0").
   * @public
   * @readonly
   */
  version: string;
  /**
   * Geometry helper classes that are based on [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
   *
   * We use the classes here when we deal with points, rects, sizes and insets within our annotation classes.
   * @public
   * @summary Geometry helper classes.
   * @namespace NutrientViewer.Geometry
   */
  Geometry: {
    Point: typeof Point;
    DrawingPoint: typeof DrawingPoint;
    Rect: typeof Rect;
    Size: typeof Size;
    Inset: typeof Inset;};

  /**
   * Actions define what happens when you click an annotation (for example a `LinkAnnotation`). All
   * classes are based on [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
   *
   * Only {@link NutrientViewer.Annotations.LinkAnnotation|LinkAnnotation} and
   * {@link NutrientViewer.Annotations.WidgetAnnotation|WidgetAnnotation} can have
   * associated actions set through the `action` property.
   * @public
   * @summary PDF action types.
   * @namespace NutrientViewer.Actions
   */
  Actions: {
    Action: typeof Action;
    GoToAction: typeof GoToAction;
    GoToEmbeddedAction: typeof GoToEmbeddedAction;
    GoToRemoteAction: typeof GoToRemoteAction;
    HideAction: typeof HideAction;
    JavaScriptAction: typeof JavaScriptAction;
    LaunchAction: typeof LaunchAction;
    NamedAction: typeof NamedAction;
    ResetFormAction: typeof ResetFormAction;
    SubmitFormAction: typeof SubmitFormAction;
    URIAction: typeof URIAction;};

  /**
   * Annotation API (with all available annotation types). All
   * classes are based on [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
   * @public
   * @summary PDF annotation types.
   * @namespace NutrientViewer.Annotations
   */
  Annotations: {
    Annotation: typeof Annotation;
    CommentMarkerAnnotation: typeof CommentMarkerAnnotation;
    HighlightAnnotation: typeof HighlightAnnotation;
    InkAnnotation: typeof InkAnnotation;
    ShapeAnnotation: typeof ShapeAnnotation;
    LineAnnotation: typeof LineAnnotation;
    RectangleAnnotation: typeof RectangleAnnotation;
    EllipseAnnotation: typeof EllipseAnnotation;
    PolygonAnnotation: typeof PolygonAnnotation;
    PolylineAnnotation: typeof PolylineAnnotation;
    LinkAnnotation: typeof LinkAnnotation;
    NoteAnnotation: typeof NoteAnnotation;
    MarkupAnnotation: typeof TextMarkupAnnotation;
    RedactionAnnotation: typeof RedactionAnnotation;
    SquiggleAnnotation: typeof SquiggleAnnotation;
    StampAnnotation: typeof StampAnnotation;
    StrikeOutAnnotation: typeof StrikeOutAnnotation;
    TextAnnotation: typeof TextAnnotation;
    UnderlineAnnotation: typeof UnderlineAnnotation;
    ImageAnnotation: typeof ImageAnnotation;
    UnknownAnnotation: typeof UnknownAnnotation;
    WidgetAnnotation: typeof WidgetAnnotation;
    MediaAnnotation: typeof MediaAnnotation;
    /**
     * Annotation serializer. Converts one of the supported {@link NutrientViewer.Annotations} to InstantJSON compliant objects.
     * @public
     * @function toSerializableObject
     * @memberof NutrientViewer.Annotations
     * @param {AnnotationsUnion}
     * @returns {object}
     */
    toSerializableObject: typeof serializeAnnotation;
    /**
     * Annotation deserializer. Converts an annotation object to a {@link AnnotationsUnion}.
     * @public
     * @function fromSerializableObject
     * @memberof NutrientViewer.Annotations
     * @param {object} annotation Serialized Annotation
     * @returns {AnnotationsUnion}
     */
    fromSerializableObject: <K extends AnnotationJSONUnion | AnnotationsBackendJSONUnion>(annotation: K) => AnnotationJSONToAnnotation<K>;
    /**
     * Annotation free rotate helper. Rotates a {@link AnnotationsUnion} by the provided angle in degrees,
     * counter-clockwise. It only works with free rotatable annotations, such as {@link NutrientViewer.Annotations.TextAnnotation},
     * {@link NutrientViewer.Annotations.ImageAnnotation} and {@link NutrientViewer.Annotations.StampAnnotation}.
     *
     * In order to rotate an annotation it's not enough to just change the rotation property. The annotation's
     * bounding box need to be resized and repositioned as well so as to fit the rotated content inside.
     *
     * This helper facilitates this task by updating both the rotation property and the bounding box.
     * @example <caption>Rotate a text annotation to 110 degrees.</caption>
     * const annotation = new NutrientViewer.Annotations.TextAnnotation({
     *   text: `This is a test text for rotating
     * an annotation to 110 degrees.`,
     *   boundingBox: new NutrientViewer.Geometry.Rect({
     *     x: 300,
     *     y: 300,
     *     width: 246,
     *     height: 44
     *   }),
     *   fontSize: 18,
     *   font: "Helvetica"
     * });
     * const rotatedAnnotation = NutrientViewer.Annotations.rotate(
     *   annotation,
     *   110
     * );
     * instance.create(rotatedAnnotation.set('pageIndex', 0));
     *
     * There is an edge case where the original annotation is already rotated by a multiple of 45 degrees. In this case
     * it's not possible to figure out the dimensions of the content, which will default to a square that fits in the bounding box.
     * In order to use the correct content dimensions, you can optionally provide a {@link NutrientViewer.Geometry.Size} object
     * that specifies the content's width and height, which should fit in the annotation's bounding box when using the
     * annotation rotation.
     *
     * For cases when the original annotation is rotated by any other angle, the content dimensions are calculated automatically,
     * but you can still provide this object if the annotation's bounding box does not correctly bound the content, so as to obtain
     * an annotation with a correctly bounding box as a result.
     * @example <caption>Rotate a 45 degree rotated annotation to 60 degrees.</caption>
     * const rotated45Annotation = new NutrientViewer.Annotations.TextAnnotation({
     *   text: `This is a test text for a 45
     * degree rotated text annotation.`,
     *   rotation: 45,
     *   boundingBox: new NutrientViewer.Geometry.Rect({
     *     x: 300,
     *     y: 300,
     *     width: 348,
     *     height: 348
     *   }),
     *   fontSize: 18,
     *   font: "Helvetica"
     * });
     * const rotated60Annotation = NutrientViewer.Annotations.rotate(
     *   rotated45Annotation,
     *   60,
     *   new NutrientViewer.Geometry.Size({ width: 246, height: 44 })
     * );
     * instance.create(rotated60Annotation.set('pageIndex', 0));
     *
     * This helper does not check if the resulting rotated annotation overflows the page limits.
     * @public
     * @function rotate
     * @memberof NutrientViewer.Annotations
     * @param {NutrientViewer.Annotations.TextAnnotation | NutrientViewer.Annotations.ImageAnnotation | NutrientViewer.Annotations.StampAnnotation}
     * @param {number} rotation Rotation angle in degrees
     * @param {?NutrientViewer.Geometry.Size} contentSize Size of the annotation's content for annotations rotated a in multiple of 45 degrees.
     * @returns {NutrientViewer.Annotations.TextAnnotation | NutrientViewer.Annotations.ImageAnnotation | NutrientViewer.Annotations.StampAnnotation}
     */
    rotate: (annotation: RotatableAnnotation, rotation: number, contentSize?: Size) => RotatableAnnotation;};

  /**
   * Annotation Presets API.
   * @public
   * @summary annotation presets namespace.
   * @namespace NutrientViewer.AnnotationPresets
   */
  AnnotationPresets: {
    /**
     * Annotation preset serializer. Converts a {@link NutrientViewer.AnnotationPreset} to an object.
     * @public
     * @function toSerializableObject
     * @memberof NutrientViewer.AnnotationPresets
     * @param {NutrientViewer.AnnotationPreset} preset Annotation preset to serialize.
     * @returns {object}
     */
    toSerializableObject: typeof serializePreset;
    /**
     * Annotation preset deserializer. Converts an annotation preset object to a {@link NutrientViewer.AnnotationPreset}.
     * @public
     * @function fromSerializableObject
     * @memberof NutrientViewer.AnnotationPresets
     * @param {object} - Serialized annotation preset to rebuild.
     * @returns {NutrientViewer.AnnotationPreset}
     */
    fromSerializableObject: typeof unserializePreset;};

  Comment: typeof Comment_2;
  Bookmark: typeof Bookmark;
  CustomOverlayItem: typeof CustomOverlayItem;
  OutlineElement: typeof OutlineElement;
  /**
   * Form fields API (with all available types). All classes are based on
   * [Immutable.Record](https://facebook.github.io/immutable-js/docs/#/Record).
   *
   * Form fields may only be created or modified if the Form Creator component
   * is included in the license.
   * @public
   * @summary PDF form field types.
   * @namespace NutrientViewer.FormFields
   */
  FormFields: {
    FormField: typeof FormField;
    ButtonFormField: typeof ButtonFormField;
    CheckBoxFormField: typeof CheckBoxFormField;
    ChoiceFormField: typeof ChoiceFormField;
    ComboBoxFormField: typeof ComboBoxFormField;
    ListBoxFormField: typeof ListBoxFormField;
    RadioButtonFormField: typeof RadioButtonFormField;
    TextFormField: typeof TextFormField;
    SignatureFormField: typeof SignatureFormField;
    /**
     * Form field serializer. Converts one of the supported {@link NutrientViewer.FormFields} to InstantJSON compliant objects.
     * @public
     * @function toSerializableObject
     * @memberof NutrientViewer.FormFields
     * @param {NutrientViewer.FormFields.FormField}
     * @returns {object}
     */
    toSerializableObject: typeof serializeFormField;
    /**
     * FormField deserializer. Converts a form field InstantJSON object to a {@link NutrientViewer.FormFields.FormField}.
     * @public
     * @function fromSerializableObject
     * @memberof NutrientViewer.FormFields
     * @param {object} formField Serialized FormField
     * @returns {NutrientViewer.FormFields.FormField}
     */
    fromSerializableObject: (formField: FormFieldJSON) => FormField;};

  FormFieldValue: typeof FormFieldValue;
  FormOption: typeof FormOption;
  Callout: typeof Callout;
  Color: typeof Color;
  Instance: typeof Instance;
  preloadWorker: typeof preloadWorker;
  load: typeof load;
  unload: typeof unload;
  loadTextComparison: typeof loadTextComparison;
  convertToOffice: typeof convertToOffice;
  convertToPDF: typeof convertToPDF;
  populateDocumentTemplate: typeof populateDocumentTemplate;
  build: typeof build;
  Error: any;
  SaveError: typeof PSPDFKitSaveError;
  ViewState: typeof ViewState;
  PageInfo: typeof PageInfo;
  TextLine: typeof TextLine;
  InstantClient: typeof InstantClient;
  TextSelection: typeof TextSelection;
  SearchResult: typeof SearchResult;
  SearchState: typeof SearchState;
  HighlightState: typeof HighlightState;
  AutoSaveMode: {
    readonly IMMEDIATE: "IMMEDIATE";
    readonly INTELLIGENT: "INTELLIGENT";
    readonly DISABLED: "DISABLED";};

  SignatureSaveMode: {
    readonly ALWAYS: "ALWAYS";
    readonly NEVER: "NEVER";
    readonly USING_UI: "USING_UI";};

  LayoutMode: {
    readonly SINGLE: "SINGLE";
    readonly DOUBLE: "DOUBLE";
    readonly AUTO: "AUTO";};

  PrintMode: {
    readonly DOM: "DOM";
    readonly EXPORT_PDF: "EXPORT_PDF";};

  PrintQuality: {
    readonly LOW: "LOW";
    readonly MEDIUM: "MEDIUM";
    readonly HIGH: "HIGH";};

  ScrollMode: {
    readonly CONTINUOUS: "CONTINUOUS";
    readonly PER_SPREAD: "PER_SPREAD";
    readonly DISABLED: "DISABLED";};

  ZoomMode: {
    readonly AUTO: "AUTO";
    readonly FIT_TO_WIDTH: "FIT_TO_WIDTH";
    readonly FIT_TO_VIEWPORT: "FIT_TO_VIEWPORT";
    readonly CUSTOM: "CUSTOM";};

  CommentDisplay: {
    readonly FITTING: "FITTING";
    readonly POPOVER: "POPOVER";
    readonly FLOATING: "FLOATING";};

  InteractionMode: {
    readonly TEXT_HIGHLIGHTER: "TEXT_HIGHLIGHTER";
    readonly INK: "INK";
    readonly INK_SIGNATURE: "INK_SIGNATURE";
    readonly SIGNATURE: "SIGNATURE";
    readonly STAMP_PICKER: "STAMP_PICKER";
    readonly STAMP_CUSTOM: "STAMP_CUSTOM";
    readonly SHAPE_LINE: "SHAPE_LINE";
    readonly SHAPE_RECTANGLE: "SHAPE_RECTANGLE";
    readonly SHAPE_ELLIPSE: "SHAPE_ELLIPSE";
    readonly SHAPE_POLYGON: "SHAPE_POLYGON";
    readonly SHAPE_POLYLINE: "SHAPE_POLYLINE";
    readonly INK_ERASER: "INK_ERASER";
    readonly NOTE: "NOTE";
    readonly COMMENT_MARKER: "COMMENT_MARKER";
    readonly TEXT: "TEXT";
    readonly CALLOUT: "CALLOUT";
    readonly PAN: "PAN";
    readonly SEARCH: "SEARCH";
    readonly DOCUMENT_EDITOR: "DOCUMENT_EDITOR";
    readonly MARQUEE_ZOOM: "MARQUEE_ZOOM";
    readonly REDACT_TEXT_HIGHLIGHTER: "REDACT_TEXT_HIGHLIGHTER";
    readonly REDACT_SHAPE_RECTANGLE: "REDACT_SHAPE_RECTANGLE";
    readonly DOCUMENT_CROP: "DOCUMENT_CROP";
    readonly BUTTON_WIDGET: "BUTTON_WIDGET";
    readonly TEXT_WIDGET: "TEXT_WIDGET";
    readonly RADIO_BUTTON_WIDGET: "RADIO_BUTTON_WIDGET";
    readonly CHECKBOX_WIDGET: "CHECKBOX_WIDGET";
    readonly COMBO_BOX_WIDGET: "COMBO_BOX_WIDGET";
    readonly LIST_BOX_WIDGET: "LIST_BOX_WIDGET";
    readonly SIGNATURE_WIDGET: "SIGNATURE_WIDGET";
    readonly DATE_WIDGET: "DATE_WIDGET";
    readonly FORM_CREATOR: "FORM_CREATOR";
    readonly LINK: "LINK";
    readonly DISTANCE: "DISTANCE";
    readonly PERIMETER: "PERIMETER";
    readonly RECTANGLE_AREA: "RECTANGLE_AREA";
    readonly ELLIPSE_AREA: "ELLIPSE_AREA";
    readonly POLYGON_AREA: "POLYGON_AREA";
    readonly CONTENT_EDITOR: "CONTENT_EDITOR";
    readonly MULTI_ANNOTATIONS_SELECTION: "MULTI_ANNOTATIONS_SELECTION";
    readonly MEASUREMENT: "MEASUREMENT";
    readonly MEASUREMENT_SETTINGS: "MEASUREMENT_SETTINGS";
    readonly ATTACHMENT_PREVIEW: "ATTACHMENT_PREVIEW";};

  unstable_InkEraserMode: {
    readonly POINT: "POINT";
    readonly STROKE: "STROKE";};

  SidebarMode: {
    readonly ANNOTATIONS: "ANNOTATIONS";
    readonly BOOKMARKS: "BOOKMARKS";
    readonly DOCUMENT_OUTLINE: "DOCUMENT_OUTLINE";
    readonly THUMBNAILS: "THUMBNAILS";
    readonly SIGNATURES: "SIGNATURES";
    readonly LAYERS: "LAYERS";
    readonly ATTACHMENTS: "ATTACHMENTS";
    readonly CUSTOM: "CUSTOM";};

  UIElement: {
    readonly Sidebar: "Sidebar";};

  Alignment: {
    readonly START: "START";
    readonly END: "END";};

  BlendMode: {
    readonly normal: "normal";
    readonly multiply: "multiply";
    readonly screen: "screen";
    readonly overlay: "overlay";
    readonly darken: "darken";
    readonly lighten: "lighten";
    readonly colorDodge: "colorDodge";
    readonly colorBurn: "colorBurn";
    readonly hardLight: "hardLight";
    readonly softLight: "softLight";
    readonly difference: "difference";
    readonly exclusion: "exclusion";};

  BorderStyle: {
    readonly solid: "solid";
    readonly dashed: "dashed";
    readonly beveled: "beveled";
    readonly inset: "inset";
    readonly underline: "underline";};

  LineCap: {
    readonly square: "square";
    readonly circle: "circle";
    readonly diamond: "diamond";
    readonly openArrow: "openArrow";
    readonly closedArrow: "closedArrow";
    readonly butt: "butt";
    readonly reverseOpenArrow: "reverseOpenArrow";
    readonly reverseClosedArrow: "reverseClosedArrow";
    readonly slash: "slash";};

  SidebarPlacement: {
    readonly START: "START";
    readonly END: "END";};

  SignatureAppearanceMode: {
    readonly signatureOnly: "signatureOnly";
    readonly signatureAndDescription: "signatureAndDescription";
    readonly descriptionOnly: "descriptionOnly";};

  ShowSignatureValidationStatusMode: {
    readonly IF_SIGNED: "IF_SIGNED";
    readonly HAS_WARNINGS: "HAS_WARNINGS";
    readonly HAS_ERRORS: "HAS_ERRORS";
    readonly NEVER: "NEVER";};

  NoteIcon: {
    readonly COMMENT: "COMMENT";
    readonly RIGHT_POINTER: "RIGHT_POINTER";
    readonly RIGHT_ARROW: "RIGHT_ARROW";
    readonly CHECK: "CHECK";
    readonly CIRCLE: "CIRCLE";
    readonly CROSS: "CROSS";
    readonly INSERT: "INSERT";
    readonly NEW_PARAGRAPH: "NEW_PARAGRAPH";
    readonly NOTE: "NOTE";
    readonly PARAGRAPH: "PARAGRAPH";
    readonly HELP: "HELP";
    readonly STAR: "STAR";
    readonly KEY: "KEY";};

  Theme: {
    readonly LIGHT: "LIGHT";
    readonly DARK: "DARK";
    readonly AUTO: "AUTO";
    readonly HIGH_CONTRAST_LIGHT: "HIGH_CONTRAST_LIGHT";
    readonly HIGH_CONTRAST_DARK: "HIGH_CONTRAST_DARK";};

  ToolbarPlacement: {
    readonly TOP: "TOP";
    readonly BOTTOM: "BOTTOM";};

  ElectronicSignatureCreationMode: {
    readonly DRAW: "DRAW";
    readonly IMAGE: "IMAGE";
    readonly TYPE: "TYPE";};

  I18n: {
    readonly locales: string[];
    readonly messages: Record<string, Record<string, string>>;
    readonly preloadLocalizationData: (locale: string, options?: {
      baseUrl?: string | undefined;}) =>
    Promise<void>;};

  baseUrl: string | undefined;
  DocumentIntegrityStatus: {
    readonly ok: "ok";
    readonly tampered_document: "tampered_document";
    readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
    readonly failed_to_retrieve_byterange: "failed_to_retrieve_byterange";
    readonly failed_to_compute_digest: "failed_to_compute_digest";
    readonly failed_retrieve_signing_certificate: "failed_retrieve_signing_certificate";
    readonly failed_retrieve_public_key: "failed_retrieve_public_key";
    readonly failed_encryption_padding: "failed_encryption_padding";
    readonly tampered_or_invalid_timestamp: "tampered_or_invalid_timestamp";
    readonly general_failure: "general_failure";};

  SignatureValidationStatus: {
    readonly valid: "valid";
    readonly warning: "warning";
    readonly error: "error";};

  SignatureType: {
    CMS: string;
    CAdES: string;};

  SignatureContainerType: {
    raw: string;
    pkcs7: string;};

  PAdESLevel: {
    readonly b_b: "b-b";
    readonly b_t: "b-t";
    readonly b_lt: "b-lt";};

  CertificateChainValidationStatus: {
    readonly ok: "ok";
    readonly ok_but_self_signed: "ok_but_self_signed";
    readonly ok_but_could_not_check_revocation: "ok_but_could_not_check_revocation";
    readonly untrusted: "untrusted";
    readonly expired: "expired";
    readonly not_yet_valid: "not_yet_valid";
    readonly invalid: "invalid";
    readonly revoked: "revoked";
    readonly failed_to_retrieve_signature_contents: "failed_to_retrieve_signature_contents";
    readonly general_validation_problem: "general_validation_problem";};

  DocumentValidationStatus: {
    valid: string;
    warning: string;
    error: string;
    not_signed: string;};

  AnnotationsWillChangeReason: typeof AnnotationsWillChangeReason;
  DocumentComparisonSourceType: {
    readonly USE_OPEN_DOCUMENT: "USE_OPEN_DOCUMENT";
    readonly USE_FILE_DIALOG: "USE_FILE_DIALOG";};

  MeasurementScaleUnitFrom: {
    readonly INCHES: "in";
    readonly MILLIMETERS: "mm";
    readonly CENTIMETERS: "cm";
    readonly POINTS: "pt";};

  MeasurementScaleUnitTo: {
    readonly INCHES: "in";
    readonly MILLIMETERS: "mm";
    readonly CENTIMETERS: "cm";
    readonly POINTS: "pt";
    readonly FEET: "ft";
    readonly METERS: "m";
    readonly YARDS: "yd";
    readonly KILOMETERS: "km";
    readonly MILES: "mi";};

  MeasurementPrecision: {
    readonly WHOLE: "whole";
    readonly ONE: "oneDp";
    readonly TWO: "twoDp";
    readonly THREE: "threeDp";
    readonly FOUR: "fourDp";
    readonly HALVES: "1/2";
    readonly QUARTERS: "1/4";
    readonly EIGHTHS: "1/8";
    readonly SIXTEENTHS: "1/16";};

  MeasurementScale: typeof MeasurementScale;
  ProductId: {
    SharePoint: string;
    Salesforce: string;
    Maui_Android: string;
    Maui_iOS: string;
    Maui_MacCatalyst: string;
    Maui_Windows: string;
    FlutterForWeb: string;
    Electron: string;};

  ProcessorEngine: {
    smallerSize: string;
    fasterProcessing: string;};

  Conformance: {
    readonly PDFA_1A: "pdfa-1a";
    readonly PDFA_1B: "pdfa-1b";
    readonly PDFA_2A: "pdfa-2a";
    readonly PDFA_2U: "pdfa-2u";
    readonly PDFA_2B: "pdfa-2b";
    readonly PDFA_3A: "pdfa-3a";
    readonly PDFA_3U: "pdfa-3u";
    readonly PDFA_3B: "pdfa-3b";
    readonly PDFA_4: "pdfa-4";
    readonly PDFA_4E: "pdfa-4e";
    readonly PDFA_4F: "pdfa-4f";};

  DocumentPermissions: {
    readonly annotationsAndForms: "annotationsAndForms";
    readonly assemble: "assemble";
    readonly extract: "extract";
    readonly extractAccessibility: "extractAccessibility";
    readonly fillForms: "fillForms";
    readonly modification: "modification";
    readonly printHighQuality: "printHighQuality";
    readonly printing: "printing";};

  ComparisonOperation: typeof ComparisonOperation;
  DocumentDescriptor: typeof DocumentDescriptor;
  ComparisonOperationType: {
    readonly TEXT: "text";
    readonly AI: "ai";};

  OfficeDocumentFormat: {
    docx: string;
    xlsx: string;
    pptx: string;};

  WheelZoomMode: {
    readonly WITH_CTRL: "WITH_CTRL";
    readonly ALWAYS: "ALWAYS";
    readonly DISABLED: "DISABLED";};

  AIComparisonOperationType: {
    readonly ANALYZE: "analyze";
    readonly TAG: "tag";};

  AIComparisonPhase: {
    readonly IDLE: "IDLE";
    readonly LOADING: "LOADING";
    readonly ANALYZING: "ANALYZING";
    readonly TAGGING: "TAGGING";
    readonly COMPLETED: "COMPLETED";
    readonly ERROR: "ERROR";};

  isAIDocumentAnalysisResult: typeof isAIDocumentAnalysisResult;
  isAIDocumentTaggingResult: typeof isAIDocumentTaggingResult;
  isAIDocumentComparisonResult: typeof isAIDocumentComparisonResult;
  /**
   * Merges the properties extracted from the location.hash into the {@link NutrientViewer.ViewState}.
   *
   * Properties will be extracted following the [PDF Open Parameters spec](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf).
   *
   * Currently, we only support the `page` parameter.
   * @public
   * @function viewStateFromOpenParameters
   * @memberof NutrientViewer
   * @param {NutrientViewer.ViewState}
   * @returns {NutrientViewer.ViewState}
   */
  viewStateFromOpenParameters: typeof viewStateFromOpenParameters;
  readonly defaultElectronicSignatureColorPresets: ColorPreset[];
  readonly defaultToolbarItems: readonly [{
    readonly type: "sidebar-thumbnails";},
  {
    readonly type: "sidebar-document-outline";},
  {
    readonly type: "sidebar-annotations";},
  {
    readonly type: "sidebar-bookmarks";},
  {
    readonly type: "sidebar-signatures";},
  {
    readonly type: "sidebar-attachments";},
  {
    readonly type: "sidebar-layers";},
  {
    readonly type: "pager";},
  {
    readonly type: "multi-annotations-selection";},
  {
    readonly type: "pan";},
  {
    readonly type: "zoom-out";},
  {
    readonly type: "zoom-in";},
  {
    readonly type: "zoom-mode";},
  {
    readonly type: "linearized-download-indicator";},
  {
    readonly type: "spacer";},
  {
    readonly type: "annotate";},
  {
    readonly type: "ink";},
  {
    readonly type: "highlighter";},
  {
    readonly type: "text-highlighter";},
  {
    readonly type: "ink-eraser";},
  {
    readonly type: "signature";},
  {
    readonly type: "image";},
  {
    readonly type: "stamp";},
  {
    readonly type: "note";},
  {
    readonly type: "text";},
  {
    readonly type: "callout";},
  {
    readonly type: "line";},
  {
    readonly type: "link";},
  {
    readonly type: "arrow";},
  {
    readonly type: "rectangle";},
  {
    readonly type: "ellipse";},
  {
    readonly type: "polygon";},
  {
    readonly type: "cloudy-polygon";},
  {
    readonly type: "polyline";},
  {
    readonly type: "print";},
  {
    readonly type: "document-editor";},
  {
    readonly type: "document-crop";},
  {
    readonly type: "search";},
  {
    readonly type: "export-pdf";},
  {
    readonly type: "debug";}];

  readonly defaultDocumentEditorFooterItems: {
    type: BuiltInDocumentEditorFooterItem;}[];

  readonly defaultDocumentEditorToolbarItems: {
    type: BuiltInDocumentEditorToolbarItem;}[];

  readonly defaultTextComparisonToolbarItems: {
    type: string;}[];

  readonly defaultTextComparisonInnerToolbarItems: {
    type: string;}[];

  readonly defaultAnnotationPresets: {
    [key: string]: Record<string, unknown>;};

  readonly defaultStampAnnotationTemplates: StampAnnotation<IStampAnnotation>[];
  readonly defaultAnnotationsSidebarContent: readonly [typeof EllipseAnnotation, typeof HighlightAnnotation, typeof ImageAnnotation, typeof InkAnnotation, typeof LineAnnotation, typeof NoteAnnotation, typeof PolygonAnnotation, typeof PolylineAnnotation, typeof RectangleAnnotation, typeof SquiggleAnnotation, typeof StampAnnotation, typeof StrikeOutAnnotation, typeof TextAnnotation, typeof UnderlineAnnotation, typeof WidgetAnnotation];
  defaultEditableAnnotationTypes: readonly (typeof TextAnnotation | typeof WidgetAnnotation | typeof CommentMarkerAnnotation)[];
  defaultElectronicSignatureCreationModes: readonly ("DRAW" | "IMAGE" | "TYPE")[];
  defaultSigningFonts: readonly Font[];
  Options: {
    MIN_TEXT_ANNOTATION_SIZE: number;
    MIN_INK_ANNOTATION_SIZE: number;
    MIN_SHAPE_ANNOTATION_SIZE: number;
    MIN_IMAGE_ANNOTATION_SIZE: number;
    MIN_STAMP_ANNOTATION_SIZE: number;
    MIN_WIDGET_ANNOTATION_SIZE: number;
    ENABLE_INK_SMOOTH_LINES: boolean;
    INK_EPSILON_RANGE_OPTIMIZATION: number;
    SIGNATURE_SAVE_MODE: ISignatureSaveMode;
    INITIAL_DESKTOP_SIDEBAR_WIDTH: number;
    IGNORE_DOCUMENT_PERMISSIONS: boolean;
    SELECTION_OUTLINE_PADDING: (viewportSize: Size) => number;
    RESIZE_ANCHOR_RADIUS: (viewportSize: Size) => number;
    SELECTION_STROKE_WIDTH: number;
    TEXT_ANNOTATION_AUTOFIT_TEXT_ON_EXPORT: boolean;
    TEXT_ANNOTATION_AUTOFIT_BOUNDING_BOX_ON_EDIT: boolean;
    TEXT_ANNOTATION_AUTOFIT_ON_BOTTOM_KNOB_RESIZE: boolean;
    DISABLE_KEYBOARD_SHORTCUTS: boolean;
    DEFAULT_INK_ERASER_CURSOR_WIDTH: number;
    COLOR_PRESETS: ColorPreset[];
    LINE_CAP_PRESETS: string[];
    LINE_WIDTH_PRESETS: number[] | null | undefined;
    HIGHLIGHT_COLOR_PRESETS: ColorPreset[];
    TEXT_MARKUP_COLOR_PRESETS: ColorPreset[];
    NOTE_COLOR_PRESETS: ColorPreset[];
    PDF_JAVASCRIPT: boolean;
    BREAKPOINT_MD_TOOLBAR: number;
    BREAKPOINT_SM_TOOLBAR: number;
    ANNOTATION_TOOLBAR_RESPONSIVE_BREAKPOINT: number;};

  SearchPattern: {
    readonly CREDIT_CARD_NUMBER: "credit_card_number";
    readonly DATE: "date";
    readonly TIME: "time";
    readonly EMAIL_ADDRESS: "email_address";
    readonly INTERNATIONAL_PHONE_NUMBER: "international_phone_number";
    readonly IP_V4: "ipv4";
    readonly IP_V6: "ipv6";
    readonly MAC_ADDRESS: "mac_address";
    readonly NORTH_AMERICAN_PHONE_NUMBER: "north_american_phone_number";
    readonly SOCIAL_SECURITY_NUMBER: "social_security_number";
    readonly URL: "url";
    readonly US_ZIP_CODE: "us_zip_code";
    readonly VIN: "vin";};

  SearchType: {
    readonly TEXT: "text";
    readonly PRESET: "preset";
    readonly REGEX: "regex";};

  UIDateTimeElement: {
    readonly COMMENT_THREAD: "COMMENT_THREAD";
    readonly ANNOTATIONS_SIDEBAR: "ANNOTATIONS_SIDEBAR";};

  /**
   * Generates a new unique ID usable as an ID of annotation, formField, bookmark or comment.
   * @public
   * @function generateInstantId
   * @memberof NutrientViewer
   * @returns {string} A unique identifier.
   */
  generateInstantId: typeof generateInstantId;
  Font: typeof Font;};
export default NutrientViewer;

declare type OCG = OCGLayer | OCGCollection;

declare type OCGCollection = {
  name?: string;
  ocgId?: number;
  layers: OCGLayer[];};


declare type OCGLayer = {
  name: string;
  ocgId: number;
  radioGroup?: number;};


declare type OCGLayers = OCG[];

/**
 * Represents an Optional Content Group (OCG) layer in a document.
 *
 * While all layer properties are optional, we can identify two types of layers depending of
 * the presence of the `layers` property: if it is present, the layer is a collection of layers.
 * If the `layers` property is not present, the layer is a single layer.
 *
 * The `ocgId` property is a unique ID for the layer. It is used to identify the layer in the
 * `{@link Instance#setLayersVisibilityState}` and `{@link Instance#getLayersVisibilityState}` methods.
 * If the property is not present, the layer cannot be identified and its visibility state cannot
 * be modified.
 *
 * The `radioGroup` property is the ID of the radio group this layer belongs to. When two or more
 * layers belong to the same radio group, only one of them can be visible at a time. If the property
 * is not present, the layer does not belong to any radio group.
 *
 * The `name` property is the name of the layer. It is used to identify the layer in the UI.
 * @interface Layer
 * @memberof NutrientViewer
 * @property {?string} name The name of the layer.
 * @property {?number} ocgId The unique ID of the layer.
 * @property {?number} radioGroup The ID of the radio group this layer belongs to.
 * @property {?Array.<NutrientViewer.Layer>} layers The layers of the collection.
 */
















declare type OCGLayersVisibilityState = {
  visibleLayerIds: number[];};


/**
 * Represents an OCSP (Online Certificate Status Protocol) response.
 * @public
 * @interface OcspResponse
 * @memberof NutrientViewer
 */
declare type OcspResponse = {
  /**
   * The serial number of the certificate whose revocation status was checked.
   * @public
   * @instance
   * @member {string} serialNumber
   * @memberof NutrientViewer.OcspResponse
   */
  serialNumber: string;
  /**
   * The OCSP response body as an `ArrayBuffer` (DER-encoded structure), as defined in [RFC6960]{@link https://www.rfc-editor.org/info/rfc6960}.
   * @public
   * @instance
   * @member {ArrayBuffer} body
   * @memberof NutrientViewer.OcspResponse
   */
  body: ArrayBuffer;};


/**
 * *** Standalone Only ***
 *
 * Options for exporting the document to PDF from an office format.
 *
 * Some properties are only used when exporting specific Office formats, such as XLSX or DOCX.
 * @example
 * ```
 * const officeDocument = await fetch('example.xlsx').then(response => response.arrayBuffer())
 * NutrientViewer.convertToPDF(file, null, {
 *   splitExcelSheetsIntoPages: true,
 *   spreadsheetMaximumContentHeightPerSheet: 1000,
 *   spreadsheetMaximumContentWidthPerSheet: 50,
 * })
 * ```
 * @example
 * ```
 * const officeDocument = await fetch('example.docx').then(response => response.arrayBuffer())
 * NutrientViewer.convertToPDF(file, null, {
 *   documentMarkupMode: 'original',
 * })
 * ```
 * @public
 * @memberof NutrientViewer
 * @member  {object} OfficeConversionSettings {Object}
 * @property {?boolean} splitExcelSheetsIntoPages - If true, each sheet in the Excel document will be exported as a separate page in the PDF.
 * @property {?number} spreadsheetMaximumContentHeightPerSheet - The maximum height of the content in a single sheet. If the content exceeds this height, it will be split into multiple pages.
 * @property {?number} spreadsheetMaximumContentWidthPerSheet - The maximum width of the content in a single sheet. If the content exceeds this width, it will be split into multiple pages.
 * @property {?string} documentMarkupMode - Defines how revision changes in the original DOCX document should be handled during conversion.
 * - 'noMarkup': Revisions are not shown in the resulting PDF.
 * - 'original': Revisions are shown as they would appear in the original DOCX document.
 * - 'simpleMarkup': Revisions are shown with simple indicators (e.g., strikethrough for deletions, underline for additions).
 * - 'allMarkup': All revision details are shown, including comments and tracked changes.
 * @default { splitExcelSheetsIntoPages: false, documentMarkupMode: 'noMarkup' }
 */
export declare type OfficeConversionSettings = {
  splitExcelSheetsIntoPages?: boolean;
  spreadsheetMaximumContentHeightPerSheet?: number;
  spreadsheetMaximumContentWidthPerSheet?: number;
  documentMarkupMode?: DocumentMarkupMode;};

/**
 * Document conversion output formats.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.OfficeDocumentFormat} docx DOCX document format.
 * @property {NutrientViewer.OfficeDocumentFormat} xlsx XLSX document format.
 * @property {NutrientViewer.OfficeDocumentFormat} pptx PPTX document format.
 */
declare const OfficeDocumentFormat: {
  docx: string;
  xlsx: string;
  pptx: string;};


/**
 * You can programmatically modify the properties of the comment just before it is created.
 * @public
 * @callback OnCommentCreationStartCallback@callback OnCommentCreationStartCallback
 * @memberof NutrientViewer
 * @param {Comment} comment
 * @example <caption>Set default text of a Comment</caption>
 * NutrientViewer.load({
 *   onCommentCreationStart: comment => comment.set('text', { format: 'xhtml', value: '<p>This comment has a default value</p>' })
 *   // ...
 * });
 */
declare type OnCommentCreationStartCallback = (comment: Comment_2) => Comment_2;

/**
 * By default, all the URLs on which the user clicks explicitly open as expected but the URLs which open due to a result of JavaScript action are not opened due to security reasons.
 * You can override this behaviour using this callback. If this callback returns `true`, the URL will open.
 *
 * For more information, see {@link NutrientViewer.Configuration#onOpenURI}.
 * @public
 * @callback OnOpenUriCallback@callback OnOpenUriCallback
 * @memberof NutrientViewer
 * @param {string} url
 * @param {boolean} isUserInitiated Tells you whether the URL is being opened because of user's interaction or not.
 * @example <caption>Render rectangle annotations using their AP stream</caption>
 * NutrientViewer.load({
 *   onOpenURI: (url, isUserInitiated) => {
 *     if (url.startsWith('https://abc.com') && isUserInitiated) {
 *       return true
 *     }
 *
 *     return false;
 *   }
 *   // ...
 * });
 */
declare type OnOpenUriCallback = (uri: string, isUserInitiated: boolean) => boolean;

/**
 * You can programmatically modify the properties of the widget annotation and the associated form field just
 * before it is created via the form creator UI.
 * @public
 * @callback OnWidgetAnnotationCreationStartCallback@callback OnWidgetAnnotationCreationStartCallback
 * @memberof NutrientViewer
 * @param {NutrientViewer.Annotations.WidgetAnnotation} widgetAnnotation The widget annotation that is about to be created.
 * @param {NutrientViewer.FormFields.FormField} formField The original form field that is associated with the widget annotation.
 * @example <caption>Set the opacity of all widget annotations.</caption>
 * NutrientViewer.load({
 *   onWidgetAnnotationCreationStart: (annotation, formField) => {
 *     return { annotation: annotation.set('opacity', 0.7) };
 *   }
 *   // ...
 * });
 */
declare type OnWidgetAnnotationCreationStartCallback = (annotation: WidgetAnnotation, formField: FormField) => {
  annotation?: WidgetAnnotation;
  formField?: FormField;};

/**
 * Describes an operation within a text comparison.
 * @public
 * @memberof NutrientViewer
 * @interface Operation
 * @property {'insert' | 'delete' | 'equal'} type - The type of operation.
 * @property {string} text - The text involved in the operation.
 * @property {Array<NutrientViewer.TextBlock>} originalTextBlocks - The text blocks from the original document.
 * @property {Array<NutrientViewer.TextBlock>} changedTextBlocks - The text blocks from the changed document.
 */
declare type Operation = {
  type: 'insert' | 'delete' | 'equal';
  text: string;
  originalTextBlocks: TextBlock[];
  changedTextBlocks: TextBlock[];};

declare type OperationAttachment = string | File | Blob;

declare type OptimizationFlags = {
  documentFormat?: 'pdf' | 'pdfa';
  grayscaleText?: boolean;
  grayscaleGraphics?: boolean;
  grayscaleFormFields?: boolean;
  grayscaleAnnotations?: boolean;
  grayscaleImages?: boolean;
  disableImages?: boolean;
  mrcCompression?: boolean;
  imageOptimizationQuality?: 1 | 2 | 3 | 4;
  linearize?: boolean;};

/**
 * Creates a new Immutable OrderedMap.
 *
 * Created with the same key value pairs as the provided Collection.Keyed or
 * JavaScript Object or expects a Collection of [K, V] tuple entries.
 *
 * The iteration order of key-value pairs provided to this constructor will
 * be preserved in the OrderedMap.
 *
 *     let newOrderedMap = OrderedMap({key: "value"})
 *     let newOrderedMap = OrderedMap([["key", "value"]])
 *
 * Note: `OrderedMap` is a factory function and not a class, and does not use
 * the `new` keyword during construction.
 */
declare function OrderedMap<K, V>(collection: Iterable<[K, V]>): OrderedMap<K, V>;

declare function OrderedMap<T>(collection: Iterable<Iterable<T>>): OrderedMap<T, T>;

declare function OrderedMap<V>(obj: {[key: string]: V;}): OrderedMap<string, V>;

declare function OrderedMap<K, V>(): OrderedMap<K, V>;

declare function OrderedMap(): OrderedMap<any, any>;

/**
 * A type of Map that has the additional guarantee that the iteration order of
 * entries will be the order in which they were set().
 *
 * The iteration behavior of OrderedMap is the same as native ES6 Map and
 * JavaScript Object.
 *
 * Note that `OrderedMap` are more expensive than non-ordered `Map` and may
 * consume more memory. `OrderedMap#set` is amortized O(log32 N), but not
 * stable.
 */

declare namespace OrderedMap {

  /**
   * True if the provided value is an OrderedMap.
   */
  function isOrderedMap(maybeOrderedMap: any): maybeOrderedMap is OrderedMap<any, any>;}


declare interface OrderedMap<K, V> extends Map_2<K, V> {

  /**
   * The number of entries in this OrderedMap.
   */
  readonly size: number;

  /**
   * Returns a new OrderedMap also containing the new key, value pair. If an
   * equivalent key already exists in this OrderedMap, it will be replaced
   * while maintaining the existing order.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { OrderedMap } = require('immutable')
   * const originalMap = OrderedMap({a:1, b:1, c:1})
   * const updatedMap = originalMap.set('b', 2)
   *
   * originalMap
   * // OrderedMap {a: 1, b: 1, c: 1}
   * updatedMap
   * // OrderedMap {a: 1, b: 2, c: 1}
   * ```
   *
   * Note: `set` can be used in `withMutations`.
   */
  set(key: K, value: V): this;

  /**
   * Returns a new OrderedMap resulting from merging the provided Collections
   * (or JS objects) into this OrderedMap. In other words, this takes each
   * entry of each collection and sets it on this OrderedMap.
   *
   * Note: Values provided to `merge` are shallowly converted before being
   * merged. No nested values are altered.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { OrderedMap } = require('immutable')
   * const one = OrderedMap({ a: 10, b: 20, c: 30 })
   * const two = OrderedMap({ b: 40, a: 50, d: 60 })
   * one.merge(two) // OrderedMap { "a": 50, "b": 40, "c": 30, "d": 60 }
   * two.merge(one) // OrderedMap { "b": 20, "a": 10, "d": 60, "c": 30 }
   * ```
   *
   * Note: `merge` can be used in `withMutations`.
   *
   * @alias concat
   */
  merge<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
  merge<C>(...collections: Array<{[key: string]: C;}>): OrderedMap<K | string, V | C>;
  concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): OrderedMap<K | KC, V | VC>;
  concat<C>(...collections: Array<{[key: string]: C;}>): OrderedMap<K | string, V | C>;

  // Sequence algorithms

  /**
   * Returns a new OrderedMap with values passed through a
   * `mapper` function.
   *
   *     OrderedMap({ a: 1, b: 2 }).map(x => 10 * x)
   *     // OrderedMap { "a": 10, "b": 20 }
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : OrderedMap<K, M>;

  /**
   * @see Collection.Keyed.mapKeys
   */
  mapKeys<M>(
  mapper: (key: K, value: V, iter: this) => M,
  context?: any)
  : OrderedMap<M, V>;

  /**
   * @see Collection.Keyed.mapEntries
   */
  mapEntries<KM, VM>(
  mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
  context?: any)
  : OrderedMap<KM, VM>;

  /**
   * Flat-maps the OrderedMap, returning a new OrderedMap.
   *
   * Similar to `data.map(...).flatten(true)`.
   */
  flatMap<KM, VM>(
  mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
  context?: any)
  : OrderedMap<KM, VM>;

  /**
   * Returns a new OrderedMap with only the entries for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : OrderedMap<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;

  /**
   * @see Collection.Keyed.flip
   */
  flip(): OrderedMap<V, K>;}


/**
 * Create a new immutable OrderedSet containing the values of the provided
 * collection-like.
 *
 * Note: `OrderedSet` is a factory function and not a class, and does not use
 * the `new` keyword during construction.
 */
declare function OrderedSet(): OrderedSet<any>;

declare function OrderedSet<T>(): OrderedSet<T>;

declare function OrderedSet<T>(collection: Iterable<T>): OrderedSet<T>;

/**
 * A type of Set that has the additional guarantee that the iteration order of
 * values will be the order in which they were `add`ed.
 *
 * The iteration behavior of OrderedSet is the same as native ES6 Set.
 *
 * Note that `OrderedSet` are more expensive than non-ordered `Set` and may
 * consume more memory. `OrderedSet#add` is amortized O(log32 N), but not
 * stable.
 */
declare namespace OrderedSet {

  /**
   * True if the provided value is an OrderedSet.
   */
  function isOrderedSet(maybeOrderedSet: any): boolean;

  /**
   * Creates a new OrderedSet containing `values`.
   */
  function of<T>(...values: Array<T>): OrderedSet<T>;

  /**
   * `OrderedSet.fromKeys()` creates a new immutable OrderedSet containing
   * the keys from this Collection or JavaScript Object.
   */
  function fromKeys<T>(iter: Collection<T, any>): OrderedSet<T>;
  function fromKeys(obj: {[key: string]: any;}): OrderedSet<string>;}


declare interface OrderedSet<T> extends Set_2<T> {

  /**
   * The number of items in this OrderedSet.
   */
  readonly size: number;

  /**
   * Returns an OrderedSet including any value from `collections` that does
   * not already exist in this OrderedSet.
   *
   * Note: `union` can be used in `withMutations`.
   * @alias merge
   * @alias concat
   */
  union<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;
  concat<C>(...collections: Array<Iterable<C>>): OrderedSet<T | C>;

  // Sequence algorithms

  /**
   * Returns a new Set with values passed through a
   * `mapper` function.
   *
   *     OrderedSet([ 1, 2 ]).map(x => 10 * x)
   *     // OrderedSet [10, 20]
   */
  map<M>(
  mapper: (value: T, key: T, iter: this) => M,
  context?: any)
  : OrderedSet<M>;

  /**
   * Flat-maps the OrderedSet, returning a new OrderedSet.
   *
   * Similar to `set.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: T, iter: this) => Iterable<M>,
  context?: any)
  : OrderedSet<M>;

  /**
   * Returns a new OrderedSet with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, key: T, iter: this) => value is F,
  context?: any)
  : OrderedSet<F>;
  filter(
  predicate: (value: T, key: T, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns an OrderedSet of the same type "zipped" with the provided
   * collections.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * ```js
   * const a = OrderedSet([ 1, 2, 3 ])
   * const b = OrderedSet([ 4, 5, 6 ])
   * const c = a.zip(b)
   * // OrderedSet [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: Collection<any, U>): OrderedSet<[T, U]>;
  zip<U, V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T, U, V]>;
  zip(...collections: Array<Collection<any, any>>): OrderedSet<any>;

  /**
   * Returns a OrderedSet of the same type "zipped" with the provided
   * collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * ```js
   * const a = OrderedSet([ 1, 2 ]);
   * const b = OrderedSet([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // OrderedSet [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   *
   * Note: Since zipAll will return a collection as large as the largest
   * input, some results may contain undefined values. TypeScript cannot
   * account for these without cases (as of v2.5).
   */
  zipAll<U>(other: Collection<any, U>): OrderedSet<[T, U]>;
  zipAll<U, V>(other1: Collection<any, U>, other2: Collection<any, V>): OrderedSet<[T, U, V]>;
  zipAll(...collections: Array<Collection<any, any>>): OrderedSet<any>;

  /**
   * Returns an OrderedSet of the same type "zipped" with the provided
   * collections by using a custom `zipper` function.
   *
   * @see Seq.Indexed.zipWith
   */
  zipWith<U, Z>(
  zipper: (value: T, otherValue: U) => Z,
  otherCollection: Collection<any, U>)
  : OrderedSet<Z>;
  zipWith<U, V, Z>(
  zipper: (value: T, otherValue: U, thirdValue: V) => Z,
  otherCollection: Collection<any, U>,
  thirdCollection: Collection<any, V>)
  : OrderedSet<Z>;
  zipWith<Z>(
  zipper: (...any: Array<any>) => Z,
  ...collections: Array<Collection<any, any>>)
  : OrderedSet<Z>;}



/**
 * This record is used to represent document outline elements.
 * These allow the user to navigate interactively from one part of the document to another.
 *
 * Outline elements can be nested in a tree-like structure where elements are collapsible/expandable
 * to hide/reveal their subtrees.
 * @public
 * @memberof NutrientViewer
 * @summary Element in the document outline tree.
 * @class OutlineElement
 * @extends Immutable.Record
 */
/**
 * Each outline element can have nested outline elements.
 * The visibility of which is controlled by {@link NutrientViewer.OutlineElement.isExpanded}.
 * @public
 * @instance
 * @member {NutrientViewer.Immutable.List.<NutrientViewer.OutlineElement>} children
 * @memberof NutrientViewer.OutlineElement
 * @seealso NutrientViewer.Instance#getDocumentOutline
 */
/**
 * The outline element title, must be human readable.
 * @public
 * @instance
 * @member {string} title
 * @memberof NutrientViewer.OutlineElement
 */
/**
 * The text color of the outline element title.
 * When this value is `null` the color is the Nutrient Web SDK's UI's default color
 * which can be configured via NutrientViewer's public CSS API.
 * @public
 * @instance
 * @member {?NutrientViewer.Color} color
 * @memberof NutrientViewer.OutlineElement
 * @default null
 */
/**
 * Whether the outline element title is bold.
 * @public
 * @instance
 * @member {boolean} isBold
 * @memberof NutrientViewer.OutlineElement
 * @default false
 */
/**
 * Whether the outline element title is italic.
 * @public
 * @instance
 * @member {boolean} isItalic
 * @memberof NutrientViewer.OutlineElement
 * @default false
 */
/**
 * Whether the outline element is expanded and shows its child elements.
 * @public
 * @instance
 * @member {boolean} isExpanded
 * @memberof NutrientViewer.OutlineElement
 * @default false
 */
/**
 * The action that will be triggered when the outline element is either clicked or tapped.
 *
 * Please refer to {@link NutrientViewer.Actions} for an in-depth look at PDF actions.
 * @public
 * @instance
 * @member {NutrientViewer.Actions.Action} action
 * @memberof NutrientViewer.OutlineElement
 */
export declare class OutlineElement extends OutlineElement_base {}


declare const OutlineElement_base: Record_2.Factory<OutlineElementProps>;

declare type OutlineElementProps = {
  children: List<OutlineElement>;
  title: string;
  color: Color | null;
  isBold: boolean;
  isItalic: boolean;
  isExpanded: boolean;
  action: Action | null;};


/**
 * The different PAdES levels.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @enum
 */
declare const PAdESLevel: {
  /**
   * B-B
   * @public
   * @type {NutrientViewer.PAdESLevel}
   */
  readonly b_b: "b-b";
  /**
   * B-T
   * @public
   * @type {NutrientViewer.PAdESLevel}
   */
  readonly b_t: "b-t";
  /**
   * B-LT
   * @public
   * @type {NutrientViewer.PAdESLevel}
   */
  readonly b_lt: "b-lt";};


declare type PAdESLevelType = (typeof PAdESLevel)[keyof typeof PAdESLevel];

/**
 * Describes the result of a page comparison.
 * @public
 * @memberof NutrientViewer
 * @interface PageComparisonResult
 * @property {number} [originalPageIndex] - The index of the original page.
 * @property {number} [changedPageIndex] - The index of the changed page.
 * @property {NutrientViewer.ComparisonResult[]} comparisonResults - The comparison results for the page.
 */
declare type PageComparisonResult = {
  originalPageIndex?: number;
  changedPageIndex?: number;
  comparisonResults: ComparisonResult[];};

export declare class PageInfo {
  index: number;
  label: string;
  height: number;
  width: number;
  rotation: number;
  rawPdfBoxes: RawPdfBoxes;}

/**
 * This event will be emitted whenever a click on a page occurs that is not handled by any
 * occluding page element (annotation, form, etc.).
 * @public
 * @example <caption>Register a PagePressEvent and get the point in PDF page coordinates.</caption>
 * instance.addEventListener("page.press", (event) => {
 *   console.log(event.point);
 * });
 * @memberof NutrientViewer
 * @interface PagePressEvent
 */
declare type PagePressEvent = {
  /**
   * The index of the page that was pressed.
   * @public
   * @instance
   * @member {number} pageIndex
   * @memberof NutrientViewer.PagePressEvent
   */
  pageIndex: number;
  /**
   * The point where the press event was detected in PDF page space coordinates.
   * @public
   * @instance
   * @member {NutrientViewer.Geometry.Point} point
   * @memberof NutrientViewer.PagePressEvent
   */
  point: Point;
  /**
   * The browser event which caused the press event to dispatch. Either a MouseEvent, TouchEvent, or
   * a PointerEvent.
   * @public
   * @instance
   * @member {Event} nativeEvent
   * @memberof NutrientViewer.PagePressEvent
   */
  nativeEvent: Event;};


declare type PDFAFlags = {
  conformance?: IConformance;
  vectorization?: boolean;
  rasterization?: boolean;};

/**
 * @classdesc
 * A point describes a 2D vector in space consisting of an `x` and `y` coordinate.
 * Provided values are defined in same units used by the page, point units. Point units are only
 * equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `point.set("x", 20)`.
 * @example <caption>Create and update a point</caption>
 * const point = new NutrientViewer.Geometry.Point({ x: 20, y: 30 });
 * point = point.set("y", 20);
 * point.y; // => 20
 * @public
 * @memberof NutrientViewer.Geometry
 * @summary A 2D vector that describes a point in space.
 * @class Point
 * @param {object} args An object used to initialize the Point. If `x` or `y` is omitted, `0` will
 *        be used instead.
 * @default { x: 0, y: 0 }
 * @extends Immutable.Record
 */
export declare class Point extends Point_base {
  /**
   * The `x` coordinate of the point.
   * @public
   * @instance
   * @member {number} x
   * @memberof NutrientViewer.Geometry.Point
   * @default 0
   */
  x: number;
  /**
   * The `y` coordinate of the point.
   * @public
   * @instance
   * @member {number} y
   * @memberof NutrientViewer.Geometry.Point
   * @default 0
   */
  y: number;
  static defaultValues: IObject;
  constructor(options?: PointCtorProps);
  /**
   * Scales `x` and `y` by the given `sx` and `sy` factor. If only `sx` is set and `sy` not defined,
   * it will scale `x` and `y` by `sx`.
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.scale(2); // => Point {x: 20, y: 20}
   * @public
   * @instance
   * @function scale
   * @memberof NutrientViewer.Geometry.Point
   * @param {number} sx Scale value for the `x` coordinate. If `sy` is not set, this scale will also
   *        be applied to `y`.
   * @param {?number} sy If empty, it will scale `y` with `sx` as well.
   * @returns {NutrientViewer.Geometry.Point} A new `Point`.
   */
  scale(sx: number, sy?: number): this;
  /**
   * Translate all values of the point by a given `Point`.
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.translate(new NutrientViewer.Geometry.Point({ x: 5, y: -5 })); // => Point {x: 15, y: 5}
   * @public
   * @instance
   * @function translate
   * @memberof NutrientViewer.Geometry.Point
   * @param {NutrientViewer.Geometry.Point} point A point that describes the translation distance.
   * @returns {NutrientViewer.Geometry.Point} A new `Point`.
   */
  translate({ x: tx, y: ty }: {
    x: number;
    y: number;})
  : this;
  /**
   * Translate the `x` value by a given number.
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.translateX(5); // => Point {x: 15, y: 10}
   * @public
   * @instance
   * @function translateX
   * @memberof NutrientViewer.Geometry.Point
   * @param {number} tx A number to translate the `x` value.
   * @returns {NutrientViewer.Geometry.Point} A new `Point`.
   */
  translateX(tx: number): this;
  /**
   * Translate the `y` value by a given number.
   * @example
   * const point = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * point.translateY(5); // => Point {x: 10, y: 15}
   * @public
   * @instance
   * @function translateY
   * @memberof NutrientViewer.Geometry.Point
   * @param {number} ty A number to translate the `y` value.
   * @returns {NutrientViewer.Geometry.Point} A new `Point`.
   */
  translateY(ty: number): this;
  /**
   * Calculates the euclidean distance to another point.
   * @example
   * var point1 = new NutrientViewer.Geometry.Point({ x: 10, y: 10 });
   * var point2 = new NutrientViewer.Geometry.Point({ x: 20, y: 10 });
   * point1.distance(point2); // => 10
   * @public
   * @instance
   * @function distance
   * @memberof NutrientViewer.Geometry.Point
   * @param {NutrientViewer.Geometry.Point} other The other point to calculate the distance with.
   * @returns {number} The distance between the two points.
   */
  distance(other: this): number;
  /**
   * Rotates the point at the origin [0, 0].
   */
  rotate(deg: number): this;
  /**
   * Applies a transformation to the point by multiplying the point like
   * a 2D vector to the matrix.
   */
  apply(matrix: TransformationMatrix): this;}

declare const Point_base: Record_2.Factory<PointCtorProps>;

declare interface PointCtorProps {
  x?: number;
  y?: number;
  [k: string]: unknown;}

/**
 * @classdesc
 * Polygon annotations are used to hand draw polygons on a page. They can contain any number of sides
 * defined by the polygon vertices.
 *
 * Polygon annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of polygon annotations while annotations
 * behind the polygon annotation are still selectable.
 *
 * Right now, polygon annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a polygon annotation" src="img/annotations/shape_polygon_annotation.png" width="375" height="311" class="shadow">
 * </center>
 * @example <caption>Create a polygon annotation that displays a triangle</caption>
 * const annotation = new NutrientViewer.Annotations.PolygonAnnotation({
 *   pageIndex: 0,
 *   points: NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.Point({ x: 25,  y: 25 }),
 *       new NutrientViewer.Geometry.Point({ x: 35,  y: 30 }),
 *       new NutrientViewer.Geometry.Point({ x: 30,  y: 55 }),
 *   ]),
 *   strokeWidth: 10,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 20,
 *     top: 20,
 *     width: 20,
 *     height: 40,
 *   }),
 *   cloudyBorderIntensity: 2
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display a polygon on a page.
 * @class PolygonAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.ShapeAnnotation
 */
export declare class PolygonAnnotation<T extends IPolygonAnnotation = IPolygonAnnotation> extends ShapeAnnotation<T> {
  /**
   * A list of points.
   *
   * If no points are present, the annotation will not be visible.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<NutrientViewer.Geometry.Point>} points
   * @memberof NutrientViewer.Annotations.PolygonAnnotation
   * @default NutrientViewer.Immutable.List() Empty list
   */
  points: List<Point>;
  /**
   * Intensity of the cloudy border.
   *
   * If not present or 0, the annotation will use a normal border.
   * @public
   * @instance
   * @member {?number} cloudyBorderIntensity
   * @memberof NutrientViewer.Annotations.PolygonAnnotation
   * @default null Normal border.
   */
  cloudyBorderIntensity: null | number;
  static defaultValues: IObject;
  static readableName: string;}

export declare type PolygonAnnotationJSON = ShapeAnnotationJSON & {
  type: 'pspdfkit/shape/polygon';
  points: [number, number][];
  cloudyBorderIntensity: number | null;
  lines?: {
    points: [number, number][][];
    intensities: number[][];};};

declare class PolygonAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: PolygonAnnotation;
  toJSON(): PolygonAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<PolygonAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: IObject): PolygonAnnotation;}

/**
 * @classdesc
 * Polyline annotations are used to hand draw polylines on a page. They can contain any number of sides
 * defined by the polyline vertices.
 *
 * Polyline annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of polyline annotations while annotations
 * behind the polyline annotation are still selectable.
 *
 * Right now, polyline annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a polyline annotation" src="img/annotations/shape_polyline_annotation.png" width="375" height="301" class="shadow">
 * </center>
 * @example <caption>Create a polyline annotation that displays a triangle</caption>
 * var annotation = new NutrientViewer.Annotations.PolylineAnnotation({
 *   pageIndex: 0,
 *   points: NutrientViewer.Immutable.List([
 *       new NutrientViewer.Geometry.Point({ x: 25,  y: 25 }),
 *       new NutrientViewer.Geometry.Point({ x: 35,  y: 30 }),
 *       new NutrientViewer.Geometry.Point({ x: 30,  y: 55 }),
 *   ]),
 *   strokeWidth: 10,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 20,
 *     top: 20,
 *     width: 20,
 *     height: 40,
 *   }),
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display a polyline on a page.
 * @class PolylineAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.ShapeAnnotation
 */
export declare class PolylineAnnotation<T extends IPolyLineAnnotation = IPolyLineAnnotation> extends ShapeAnnotation<T> {
  /**
   * A list of points.
   *
   * If no points are present, the annotation will not be visible.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<NutrientViewer.Geometry.Point>} points
   * @memberof NutrientViewer.Annotations.PolylineAnnotation
   * @default NutrientViewer.Immutable.List() Empty list
   */
  points: List<Point>;
  /**
   * An object with start and / or end entries for line caps.
   *
   * Line caps can have one of these values: "square", "circle", "diamond", "openArrow", "closedArrow",
   * "butt", "reverseOpenArrow", "reverseClosedArrow" or "slash".
   *
   * If the fillColor field is provided, its value is used as fill color for the line cap interior.
   * @public
   * @instance
   * @member {?LineCaps} lineCaps
   * @memberof NutrientViewer.Annotations.PolylineAnnotation
   */
  lineCaps: null | LineCapsType;
  static defaultValues: IObject;
  static readableName: string;}

export declare type PolylineAnnotationJSON = ShapeAnnotationJSON & {
  type: 'pspdfkit/shape/polyline';
  points: [number, number][];
  lineCaps?: LineCapsType | null;
  lines?: {
    points: [number, number][][];
    intensities: number[][];};};

declare class PolylineAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: PolylineAnnotation;
  toJSON(): PolylineAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<PolylineAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): PolylineAnnotation;}

/**
 * This is used to Populate the document template (Docx format) with corresponding data.
 *
 * Returns a {@link https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 * resolving to an `ArrayBuffer` of a Docx, or rejecting with a {@link NutrientViewer.Error}.
 *
 * The resulting `ArrayBuffer` can be converted to PDF with {@link NutrientViewer.convertToPDF()}.
 * and finally loaded with {@link NutrientViewer.load()}.
 *
 * It requires a {@link NutrientViewer.Configuration|configuration object} and config object with
 * data {@link NutrientViewer.TemplateDataToPopulateDocument} which contains the data to be populated in document
 * and delimiter marker to know placeholder of the data. If the configuration is
 * invalid, the promise will be rejected with a {@link NutrientViewer.Error}.
 * @example
 * NutrientViewer.populateDocumentTemplate(
 * {
 *   document: '/sales-report.docx',
 *   licenseKey: 'YOUR_LICENSE_KEY',
 * },
 * {
 *   config: {
 *     delimiter: {
 *       start: '{{',
 *       end: '}}',
 *     },
 *   },
 *   model: {
 *     products: [
 *       {
 *         title: 'Duk',
 *         name: 'DukSoftware',
 *         reference: 'DS0',
 *       },
 *       {
 *         title: 'Tingerloo',
 *         name: 'Tingerlee',
 *         reference: 'T00',
 *       },
 *     ],
 *   },
 * },
 * )
 * .then(arrayBuffer => {
 *   console.log('Successfully populated the template Document with data', arrayBuffer)
 * })
 * .catch(error => {
 *   console.error(error.message)
 * })
 * The `delimiter` object sets the pair of delimiters that encloses a template marker
 * i.e. placeholder marker that need to be substituted with the data.
 *
 * The `model` object associates a template marker with the corresponding substitution in the final, produced document.
 *
 * === Supported Template Features ===
 * Placeholders let users substitute a marker with some text and Loops generate repetitions
 * of a given pattern.
 *
 * The syntax for loops is `#` for the opening tag, and `/` for the closing one in the docs.
 *
 * For instance if the document contains:
 *
 * ```
 * {#ITEMS} {name} {price} {/ITEMS}
 * ```
 *
 * Here, `ITEMS` is the name of the loop template marker, and `name` and `price` are regular placeholder
 * template markers over which the SDK iterates replacing the `name` placeholder with corresponding `name` value
 * in `model`, and similarly the `price` placeholder is replaced by the corresponding `price` value in `model`.
 *
 * ```
 * {
 *   model: {
 *     items: [
 *       {
 *         name: "A",
 *         price: 10
 *       },
 *       {
 *         name: "B",
 *         price: 15
 *       }
 *     ]
 *   }
 * }
 * ```
 * @public
 * @function populateDocumentTemplate
 * @memberof NutrientViewer
 * @param {NutrientViewer.Configuration} configuration A configuration Object
 * @param {NutrientViewer.TemplateDataToPopulateDocument} templateData A template data object
 * @returns {Promise.<ArrayBuffer>} Promise that resolves to an ArrayBuffer of a file converted to PDF
 */
declare function populateDocumentTemplate(configuration: StandaloneConfiguration, templateData: TemplateDataToPopulateDocument): Promise<ArrayBuffer>;

/**
 * ***Standalone only***
 *
 * Preloads the standalone WASM worker.
 *
 * In cases where you don't want to load a PDF right away, the first invocation
 * of {@link NutrientViewer.load} after allowing this function to resolve will be
 * significantly faster.
 *
 * If {@link NutrientViewer.load} is called while this function has not yet resolved,
 * then {@link NutrientViewer.load} will simply reuse the request from this function
 * without adding any overhead.
 * @example
 * // Fetches worker asynchronously
 * NutrientViewer.preloadWorker(configuration);
 * document.querySelector("#open-pdf-button").addEventListener(async () => {
 *   await NutrientViewer.load({ ...configuration, document: "my-doc.pdf" });
 * });
 * @public
 * @function preloadWorker
 * @memberof NutrientViewer
 * @param {NutrientViewer.Configuration} configuration A configuration Object
 * @returns {Promise.<void>} Promise that resolves when preloading is complete
 */
declare function preloadWorker(configuration: StandaloneConfiguration): Promise<void>;

/**
 * Describes mode used to print a PDF document.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.PrintMode} DOM This method will render all pages of the PDF document in advance before it sends the results to
 * the printer. This works in all major browsers and will not give your users access to the source
 * PDF file. However, this method is CPU-bound and memory usage scales with PDF size.
 *
 * Because of its reliability and cross browsers support this method is the default.
 *
 * Some caveats when using this method:
 *
 *  - To achieve cross-browser support, we render the resulting images into the main window. We
 *    try to hide already existing HTML by applying `display: none !important`. If the printed
 *    page still contains other HTML elements, make sure to apply an appropriate print stylesheet
 *    to your web app.
 *  - This method will produce incorrect results, when pages of the document have different sizes.
 *    Unfortunately, there's no way to work around this issue since it's a CSS limitation.
 * @property {NutrientViewer.PrintMode} EXPORT_PDF This method is built to be resource efficient and to avoid having to render all pages in
 * advance, which might balloon memory usage to multi-GB on PDFs with 100+ pages.
 *
 * It supports all common browsers, however some fall back to opening the PDF file in a new tab,
 * which might give your users unwanted access to the source files.
 *
 * Google Chrome and Microsoft Internet Explorer provide the APIs required to use the native
 * renderer, as a fallback on other browser we generate and open a PDF in a new tab. This allows
 * users to print the PDF in a native PDF reader which can, as opposed to browser-built
 * implementations, talk directly to the connected printer.
 *
 * When using this print mode, we can not call the {@link NutrientViewer.RenderPageCallback} when
 * printing pages.
 *
 * Note: If the PDF is password-protected, we always fall back to opening the PDF in a new tab.
 */
declare const PrintMode: {
  readonly DOM: "DOM";
  readonly EXPORT_PDF: "EXPORT_PDF";};


/**
 * Describes Quality used to print a PDF document.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.PrintQuality} LOW Low will print the PDF in original quality.
 * @property {NutrientViewer.PrintQuality} MEDIUM Medium quality printing (150 dpi).
 * @property {NutrientViewer.PrintQuality} HIGH High quality printing (300 dpi).
 *
 * Note: With increase in the PDF print Quality speed of printing will decrease.
 */
declare const PrintQuality: {
  readonly LOW: "LOW";
  readonly MEDIUM: "MEDIUM";
  readonly HIGH: "HIGH";};


declare function PrivateAPIMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {};} &

T;

/**
 * Contains information needed to authenticate processing request with Nutrient backend (Document Engine or DWS API).
 *
 * **DWS API**
 *
 * JSON Web Token (JWT) are used to authorize with the DWS API. See DWS's
 * {@link https://www.nutrient.io/api/documentation/developer-guides/authentication/|guides}
 * for more details about the JWT authorization.
 *
 * Auth token can be generated via DWS API. For example, you can generate a token that can only access
 * the `document_Editor_api` operation from the `example.com` origin and expires in 1 hour, without having access to other
 * operations or origins:
 *
 * ```sh
 * curl -X POST https://api.nutrient.io/tokens \
 *  -H 'Authorization: Bearer pdf_live_<rest_of_your_api_key>' \
 *  -H "Content-Type: application/json" \
 *  -d '{
 *    "allowedOperations": [
 *      "document_editor_api",
 *    ],
 *    "allowedOrigins": [
 *      "example.com"
 *    ],
 *    "expirationTime": 3600
 *  }'
 * ```
 *
 * **Document Engine**
 *
 * JSON Web Token (JWT) are used to authorize with the Document Engine. See Document Engine's
 * {@link https://www.nutrient.io/api/reference/document-engine/upstream/#tag/JWT-authorization|API Reference}
 * for more details about the JWT authorization.
 * @public
 * @property {string} jwt - Authorization token needed to authorize the processing request with the backend.
 * @property {string} serverUrl - Base server URL to use as the Build API endpoint (`<server_url>/api/build`).
 *                                Optional, since it's possible to encode it in the auth token, DWS API does that by default.
 * @interface ProcessingAuthPayload
 * @memberof NutrientViewer
 */
export declare type ProcessingAuthPayload = {
  jwt: string;
  serverUrl?: string;};


/**
 * ***optional, Standalone only***
 *
 * Document processing can be a time-consuming task, especially when working with large documents. In order to improve the user experience
 * it is possible to choose between two different processor engines with different optimizations applied: either one with a
 * smaller bundle size (the default), but slower overall performance, or one with a larger bundle size, but faster processing time.
 *
 * Either case it's recommended to enable asset compression on your Server to improve loading time.
 *
 * Processor Engine Comparison:
 *
 * | Preference                  | Bundle Size | Document Processing | Recommended Use               |
 * |-----------------------------|-------------|---------------------|-------------------------------|
 * | smallerSize                 | Smaller     | Slower              | Prioritize compact app size   |
 * | fasterProcessing            | Larger      | Faster              | Quick document processing     |
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ProcessorEngine} smallerSize A smaller processor engine will be used for processing (default).
 * @property {NutrientViewer.ProcessorEngine} fasterProcessing A faster processor engine will be used for processing.
 */
declare const ProcessorEngine: {
  smallerSize: string;
  fasterProcessing: string;};


/**
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ProductId} SharePoint Enables using the SDK in a SharePoint environment. When used, the document should be loaded from a SharePoint site.
 * @property {NutrientViewer.ProductId} Salesforce Enables using the SDK in a Salesforce environment. When used, the SDK should be loaded from a Salesforce site.
 */
declare const ProductId: {
  SharePoint: string;
  Salesforce: string;
  Maui_Android: string;
  Maui_iOS: string;
  Maui_MacCatalyst: string;
  Maui_Windows: string;
  FlutterForWeb: string;
  Electron: string;};


/**
 * @classdesc
 * A save error indicates a problem with saving. It is a subclass of {@link NutrientViewer.Error}
 * that behaves like a regular JavaScript error.
 * @example
 * try {
 *   await instance.save();
 * } catch (error) {
 *   (error instanceof NutrientViewer.SaveError); // => true
 *   error.message; // Useful error message
 *   error.reason; // Array of errors for changes that could not be saved.
 * }
 * @public
 * @memberof NutrientViewer
 * @class SaveError
 * @extends NutrientViewer.Error
 * @summary NutrientViewer related error related to saving.
 */
/**
 * Save error reason. Contains detailed error information for each change that could not be saved.
 * @public
 * @instance
 * @memberof NutrientViewer.SaveError
 * @member {Array<NutrientViewer.SaveError~ErrorReason>} reason
 */
/**
 * Reason for the error that occurred when saving a certain modification.
 * @public
 * @instance
 * @memberof NutrientViewer.SaveError
 * @typedef {object} NutrientViewer.SaveError@typedef {object} NutrientViewer.SaveError~ErrorReason
 * @property {Error} error Reason of the save failure.
 * @property {NutrientViewer.Change} object Object that was being saved.
 * @property {NutrientViewer.ModificationType} modificationType Type of modification that was being saved.
 */
declare function PSPDFKitSaveError(messageOrError: string | Error, reason: Array<SaveErrorReason>): Error;

declare namespace PSPDFKitSaveError {
  var prototype: any;}

declare const PublicTextSelection_base: Record_2.Factory<ITextSelection>;

/**
 * @classdesc
 *
 * A group of radio buttons. Similar to {@link NutrientViewer.FormFields.CheckBoxFormField}, but there can
 * only be one value set at the same time.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary A group of radio buttons.
 * @class RadioButtonFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.FormField
 */
export declare class RadioButtonFormField extends FormField {
  /**
   * If true, exactly one radio button must be selected at all times. Clicking the currently selected
   * button has no effect. Otherwise, clicking the selected button deselects it, leaving no button
   * selected.
   * @public
   * @instance
   * @member {boolean} noToggleToOff
   * @memberof NutrientViewer.FormFields.RadioButtonFormField
   * @default false
   */
  noToggleToOff: boolean;
  /**
   * If true, a group of radio buttons within a radio button field that use the same value for the on
   * state will turn on and off in unions: If one is checked, they are all checked (the same behavior
   * as HTML radio buttons). Otherwise, only the checked radio button will be marked checked.
   * @public
   * @instance
   * @member {boolean} radiosInUnison
   * @memberof NutrientViewer.FormFields.RadioButtonFormField
   * @default true
   */
  radiosInUnison: boolean;
  /**
   * The selected form option value. In order to modify it, {@link NutrientViewer.Instance.setFormFieldValues|instance.setFormFieldValues()} should be used.
   * @public
   * @instance
   * @member {string} value
   * @readonly
   * @memberof NutrientViewer.FormFields.RadioButtonFormField
   */
  value: string;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   * @public
   * @instance
   * @member {string} defaultValue
   * @memberof NutrientViewer.FormFields.RadioButtonFormField
   */
  defaultValue: string;
  /**
   * A list of {@link NutrientViewer.FormOption}s. This is necessary to map the multiple radio button
   * options to their values.
   *
   * See {@link NutrientViewer.FormOption} for more information.
   * @public
   * @instance
   * @member {Immutable.List.<NutrientViewer.FormOption>} options
   * @memberof NutrientViewer.FormFields.RadioButtonFormField
   */
  options: List<FormOption>;
  /**
   * Radio buttons and checkboxes can have multiple widgets with the same form value associated, but can be
   * selected independently. `optionIndexes` contains the value indexes that should be actually set.
   *
   * If set, the `value` field doesn't get used, and the widget found at the corresponding indexes in the form field's
   * `annotationIds` property are checked.
   *
   * If set on fields other than radio buttons or checkboxes, setting the form value will fail.
   * @public
   * @optional
   * @instance
   * @member {?NutrientViewer.Immutable.List.<number>} optionIndexes
   * @memberof NutrientViewer.FormFields.RadioButtonFormField
   */
  optionIndexes?: List<number>;
  static defaultValues: IObject;}

declare type RadioButtonFormFieldJSON = BaseFormFieldJSON & {
  type: 'pspdfkit/form-field/radio';
  options: Array<FormOptionJSON>;
  noToggleToOff: boolean;
  radiosInUnison: boolean;
  defaultValue: string;};

/**
 * Returns a Seq.Indexed of numbers from `start` (inclusive) to `end`
 * (exclusive), by `step`, where `start` defaults to 0, `step` to 1, and `end` to
 * infinity. When `start` is equal to `end`, returns empty range.
 *
 * Note: `Range` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * ```js
 * const { Range } = require('immutable')
 * Range() // [ 0, 1, 2, 3, ... ]
 * Range(10) // [ 10, 11, 12, 13, ... ]
 * Range(10, 15) // [ 10, 11, 12, 13, 14 ]
 * Range(10, 30, 5) // [ 10, 15, 20, 25 ]
 * Range(30, 10, 5) // [ 30, 25, 20, 15 ]
 * Range(30, 30, 5) // []
 * ```
 */
declare function Range_2(start?: number, end?: number, step?: number): Seq.Indexed<number>;

/**
 * Describes a range within a document.
 * @public
 * @memberof NutrientViewer
 * @interface Range
 * @property {number} position - The starting position of the range.
 * @property {number} length - The length of the range.
 */
declare type Range_3 = {
  position: number;
  length: number;};

declare type Range_4 = [min, max];

declare type RawPdfBoxes = {
  bleedBox: null | IRectJSON;
  cropBox: null | IRectJSON;
  mediaBox: null | IRectJSON;
  trimBox: null | IRectJSON;};

/**
 * Unlike other types in Immutable.js, the `Record()` function creates a new
 * Record Factory, which is a function that creates Record instances.
 *
 * See above for examples of using `Record()`.
 *
 * Note: `Record` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Record_2<TProps extends Object>(defaultValues: TProps, name?: string): Record_2.Factory<TProps>;

/**
 * A record is similar to a JS object, but enforces a specific set of allowed
 * string keys, and has default values.
 *
 * The `Record()` function produces new Record Factories, which when called
 * create Record instances.
 *
 * ```js
 * const { Record } = require('immutable')
 * const ABRecord = Record({ a: 1, b: 2 })
 * const myRecord = ABRecord({ b: 3 })
 * ```
 *
 * Records always have a value for the keys they define. `remove`ing a key
 * from a record simply resets it to the default value for that key.
 *
 * ```js
 * myRecord.size // 2
 * myRecord.get('a') // 1
 * myRecord.get('b') // 3
 * const myRecordWithoutB = myRecord.remove('b')
 * myRecordWithoutB.get('b') // 2
 * myRecordWithoutB.size // 2
 * ```
 *
 * Values provided to the constructor not found in the Record type will
 * be ignored. For example, in this case, ABRecord is provided a key "x" even
 * though only "a" and "b" have been defined. The value for "x" will be
 * ignored for this record.
 *
 * ```js
 * const myRecord = ABRecord({ b: 3, x: 10 })
 * myRecord.get('x') // undefined
 * ```
 *
 * Because Records have a known set of string keys, property get access works
 * as expected, however property sets will throw an Error.
 *
 * Note: IE8 does not support property access. Only use `get()` when
 * supporting IE8.
 *
 * ```js
 * myRecord.b // 3
 * myRecord.b = 5 // throws Error
 * ```
 *
 * Record Types can be extended as well, allowing for custom methods on your
 * Record. This is not a common pattern in functional environments, but is in
 * many JS programs.
 *
 * However Record Types are more restricted than typical JavaScript classes.
 * They do not use a class constructor, which also means they cannot use
 * class properties (since those are technically part of a constructor).
 *
 * While Record Types can be syntactically created with the JavaScript `class`
 * form, the resulting Record function is actually a factory function, not a
 * class constructor. Even though Record Types are not classes, JavaScript
 * currently requires the use of `new` when creating new Record instances if
 * they are defined as a `class`.
 *
 * ```
 * class ABRecord extends Record({ a: 1, b: 2 }) {
 *   getAB() {
 *     return this.a + this.b;
 *   }
 * }
 *
 * var myRecord = new ABRecord({b: 3})
 * myRecord.getAB() // 4
 * ```
 *
 *
 * **Flow Typing Records:**
 *
 * Immutable.js exports two Flow types designed to make it easier to use
 * Records with flow typed code, `RecordOf<TProps>` and `RecordFactory<TProps>`.
 *
 * When defining a new kind of Record factory function, use a flow type that
 * describes the values the record contains along with `RecordFactory<TProps>`.
 * To type instances of the Record (which the factory function returns),
 * use `RecordOf<TProps>`.
 *
 * Typically, new Record definitions will export both the Record factory
 * function as well as the Record instance type for use in other code.
 *
 * ```js
 * import type { RecordFactory, RecordOf } from 'immutable';
 *
 * // Use RecordFactory<TProps> for defining new Record factory functions.
 * type Point3DProps = { x: number, y: number, z: number };
 * const defaultValues: Point3DProps = { x: 0, y: 0, z: 0 };
 * const makePoint3D: RecordFactory<Point3DProps> = Record(defaultValues);
 * export makePoint3D;
 *
 * // Use RecordOf<T> for defining new instances of that Record.
 * export type Point3D = RecordOf<Point3DProps>;
 * const some3DPoint: Point3D = makePoint3D({ x: 10, y: 20, z: 30 });
 * ```
 *
 * **Flow Typing Record Subclasses:**
 *
 * Records can be subclassed as a means to add additional methods to Record
 * instances. This is generally discouraged in favor of a more functional API,
 * since Subclasses have some minor overhead. However the ability to create
 * a rich API on Record types can be quite valuable.
 *
 * When using Flow to type Subclasses, do not use `RecordFactory<TProps>`,
 * instead apply the props type when subclassing:
 *
 * ```js
 * type PersonProps = {name: string, age: number};
 * const defaultValues: PersonProps = {name: 'Aristotle', age: 2400};
 * const PersonRecord = Record(defaultValues);
 * class Person extends PersonRecord<PersonProps> {
 *   getName(): string {
 *     return this.get('name')
 *   }
 *
 *   setName(name: string): this {
 *     return this.set('name', name);
 *   }
 * }
 * ```
 *
 * **Choosing Records vs plain JavaScript objects**
 *
 * Records offer a persistently immutable alternative to plain JavaScript
 * objects, however they're not required to be used within Immutable.js
 * collections. In fact, the deep-access and deep-updating functions
 * like `getIn()` and `setIn()` work with plain JavaScript Objects as well.
 *
 * Deciding to use Records or Objects in your application should be informed
 * by the tradeoffs and relative benefits of each:
 *
 * - *Runtime immutability*: plain JS objects may be carefully treated as
 *   immutable, however Record instances will *throw* if attempted to be
 *   mutated directly. Records provide this additional guarantee, however at
 *   some marginal runtime cost. While JS objects are mutable by nature, the
 *   use of type-checking tools like [Flow](https://medium.com/@gcanti/immutability-with-flow-faa050a1aef4)
 *   can help gain confidence in code written to favor immutability.
 *
 * - *Value equality*: Records use value equality when compared with `is()`
 *   or `record.equals()`. That is, two Records with the same keys and values
 *   are equal. Plain objects use *reference equality*. Two objects with the
 *   same keys and values are not equal since they are different objects.
 *   This is important to consider when using objects as keys in a `Map` or
 *   values in a `Set`, which use equality when retrieving values.
 *
 * - *API methods*: Records have a full featured API, with methods like
 *   `.getIn()`, and `.equals()`. These can make working with these values
 *   easier, but comes at the cost of not allowing keys with those names.
 *
 * - *Default values*: Records provide default values for every key, which
 *   can be useful when constructing Records with often unchanging values.
 *   However default values can make using Flow and TypeScript more laborious.
 *
 * - *Serialization*: Records use a custom internal representation to
 *   efficiently store and update their values. Converting to and from this
 *   form isn't free. If converting Records to plain objects is common,
 *   consider sticking with plain objects to begin with.
 */
declare namespace Record_2 {

  /**
   * True if `maybeRecord` is an instance of a Record.
   */
  function isRecord(maybeRecord: any): maybeRecord is Record_2<any>;

  /**
   * Records allow passing a second parameter to supply a descriptive name
   * that appears when converting a Record to a string or in any error
   * messages. A descriptive name for any record can be accessed by using this
   * method. If one was not provided, the string "Record" is returned.
   *
   * ```js
   * const { Record } = require('immutable')
   * const Person = Record({
   *   name: null
   * }, 'Person')
   *
   * var me = Person({ name: 'My Name' })
   * me.toString() // "Person { "name": "My Name" }"
   * Record.getDescriptiveName(me) // "Person"
   * ```
   */
  function getDescriptiveName(record: Record_2<any>): string;

  /**
   * A Record.Factory is created by the `Record()` function. Record instances
   * are created by passing it some of the accepted values for that Record
   * type:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Record } = require('immutable')" }
   * -->
   * ```js
   * // makePerson is a Record Factory function
   * const makePerson = Record({ name: null, favoriteColor: 'unknown' });
   *
   * // alan is a Record instance
   * const alan = makePerson({ name: 'Alan' });
   * ```
   *
   * Note that Record Factories return `Record<TProps> & Readonly<TProps>`,
   * this allows use of both the Record instance API, and direct property
   * access on the resulting instances:
   *
   * <!-- runkit:activate
   *      { "preamble": "const { Record } = require('immutable');const makePerson = Record({ name: null, favoriteColor: 'unknown' });const alan = makePerson({ name: 'Alan' });" }
   * -->
   * ```js
   * // Use the Record API
   * console.log('Record API: ' + alan.get('name'))
   *
   * // Or direct property access (Readonly)
   * console.log('property access: ' + alan.name)
   * ```
   *
   * **Flow Typing Records:**
   *
   * Use the `RecordFactory<TProps>` Flow type to get high quality type checking of
   * Records:
   *
   * ```js
   * import type { RecordFactory, RecordOf } from 'immutable';
   *
   * // Use RecordFactory<TProps> for defining new Record factory functions.
   * type PersonProps = { name: ?string, favoriteColor: string };
   * const makePerson: RecordFactory<PersonProps> = Record({ name: null, favoriteColor: 'unknown' });
   *
   * // Use RecordOf<T> for defining new instances of that Record.
   * type Person = RecordOf<PersonProps>;
   * const alan: Person = makePerson({ name: 'Alan' });
   * ```
   */
  namespace Factory {}

  interface Factory<TProps extends Object> {
    (values?: Partial<TProps> | Iterable<[string, any]>): Record_2<TProps> & Readonly<TProps>;
    new (values?: Partial<TProps> | Iterable<[string, any]>): Record_2<TProps> & Readonly<TProps>;}


  function Factory<TProps extends Object>(values?: Partial<TProps> | Iterable<[string, any]>): Record_2<TProps> & Readonly<TProps>;}


declare interface Record_2<TProps extends Object> {

  // Reading values

  has(key: string): key is keyof TProps & string;

  /**
   * Returns the value associated with the provided key, which may be the
   * default value defined when creating the Record factory function.
   *
   * If the requested key is not defined by this Record type, then
   * notSetValue will be returned if provided. Note that this scenario would
   * produce an error when using Flow or TypeScript.
   */
  get<K extends keyof TProps>(key: K, notSetValue?: any): TProps[K];
  get<T>(key: string, notSetValue: T): T;

  // Reading deep values

  hasIn(keyPath: Iterable<any>): boolean;
  getIn(keyPath: Iterable<any>): any;

  // Value equality

  equals(other: any): boolean;
  hashCode(): number;

  // Persistent changes

  set<K extends keyof TProps>(key: K, value: TProps[K]): this;
  update<K extends keyof TProps>(key: K, updater: (value: TProps[K]) => TProps[K]): this;
  merge(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;
  mergeDeep(...collections: Array<Partial<TProps> | Iterable<[string, any]>>): this;

  mergeWith(
  merger: (oldVal: any, newVal: any, key: keyof TProps) => any,
  ...collections: Array<Partial<TProps> | Iterable<[string, any]>>)
  : this;
  mergeDeepWith(
  merger: (oldVal: any, newVal: any, key: any) => any,
  ...collections: Array<Partial<TProps> | Iterable<[string, any]>>)
  : this;

  /**
   * Returns a new instance of this Record type with the value for the
   * specific key set to its default value.
   *
   * @alias remove
   */
  delete<K extends keyof TProps>(key: K): this;
  remove<K extends keyof TProps>(key: K): this;

  /**
   * Returns a new instance of this Record type with all values set
   * to their default values.
   */
  clear(): this;

  // Deep persistent changes

  setIn(keyPath: Iterable<any>, value: any): this;
  updateIn(keyPath: Iterable<any>, updater: (value: any) => any): this;
  mergeIn(keyPath: Iterable<any>, ...collections: Array<any>): this;
  mergeDeepIn(keyPath: Iterable<any>, ...collections: Array<any>): this;

  /**
   * @alias removeIn
   */
  deleteIn(keyPath: Iterable<any>): this;
  removeIn(keyPath: Iterable<any>): this;

  // Conversion to JavaScript types

  /**
   * Deeply converts this Record to equivalent native JavaScript Object.
   *
   * Note: This method may not be overridden. Objects with custom
   * serialization to plain JS may override toJSON() instead.
   */
  toJS(): { [K in keyof TProps]: any };

  /**
   * Shallowly converts this Record to equivalent native JavaScript Object.
   */
  toJSON(): TProps;

  /**
   * Shallowly converts this Record to equivalent JavaScript Object.
   */
  toObject(): TProps;

  // Transient changes

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Only `set` may be used mutatively.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  toSeq(): Seq.Keyed<keyof TProps, TProps[keyof TProps]>;

  [Symbol.iterator](): IterableIterator<[keyof TProps, TProps[keyof TProps]]>;}


/**
 * RecordOf<T> is used in TypeScript to define interfaces expecting an
 * instance of record with type T.
 *
 * This is equivalent to an instance of a record created by a Record Factory.
 */
declare type RecordOf<TProps extends Object> = Record_2<TProps> &
Readonly<TProps>;

/**
 * @classdesc
 * A rect describes a rectangle in 2D space. It consists of a location (`left` and `top`) and
 * dimensions (`width` and `height`). Provided values are defined in same units used by the page,
 * point units. Point units are only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `rect.set("left", 20)`.
 * @example <caption>Create and update a rect</caption>
 * const rect = new NutrientViewer.Geometry.Rect({
 *   left: 10,
 *   top: 20,
 *   width: 30,
 *   height: 40
 * });
 * rect = rect.set("left", 20);
 * rect.left; // => 20
 * @public
 * @memberof NutrientViewer.Geometry
 * @summary A rectangle in 2D space.
 * @class Rect
 * @param {object} args An object used to initialize the Point. If `left`, `top`, `width` or `height`
 *        is omitted, `0` will be used instead.
 * @default { left: 0, top: 0, width: 0, height: 0 }
 * @extends Immutable.Record
 */
export declare class Rect extends Rect_base {
  /**
   * The `left` distance of the rect. This is equivalent to `x` of a
   * {@link NutrientViewer.Geometry.Point}.
   * @public
   * @instance
   * @member {number} left
   * @memberof NutrientViewer.Geometry.Rect
   * @default 0
   */
  left: number;
  /**
   * The `top` distance of the rect. This is equivalent to `y` of a
   * {@link NutrientViewer.Geometry.Point}.
   * @public
   * @instance
   * @member {number} top
   * @memberof NutrientViewer.Geometry.Rect
   * @default 0
   */
  top: number;
  /**
   * The `width` of the rect. This is equivalent to `width` of a {@link NutrientViewer.Geometry.Size}.
   * @public
   * @instance
   * @member {number} width
   * @memberof NutrientViewer.Geometry.Rect
   * @default 0
   */
  width: number;
  /**
   * The `height` of the rect. This is equivalent to `height` of a {@link NutrientViewer.Geometry.Size}.
   * @public
   * @instance
   * @member {number} height
   * @memberof NutrientViewer.Geometry.Rect
   * @default 0
   */
  height: number;
  static defaultValues: IObject;
  constructor(options?: IRect);
  /**
   * Computes the right point in the rect by adding `left` and `width`.
   * @public
   * @readonly
   * @instance
   * @member {number} right
   * @memberof NutrientViewer.Geometry.Rect
   */
  get right(): number;
  /**
   * Computes the bottom point in the rect by adding `top` and `height`.
   * @public
   * @readonly
   * @instance
   * @member {number} bottom
   * @memberof NutrientViewer.Geometry.Rect
   */
  get bottom(): number;
  /**
   * Creates a new rect from a DOM ClientRect.
   * @example
   * const rect = NutrientViewer.Geometry.Rect.fromClientRect(
   *   element.getBoundingClientRect()
   * );
   * @public
   * @function fromClientRect
   * @memberof NutrientViewer.Geometry.Rect
   * @param {ClientRect} rect A DOM ClientRect.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  static fromClientRect({ top, left, width, height }: ClientRect): Rect;
  /**
   * Creates a new rect from four points.
   * @example
   * const rect = NutrientViewer.Geometry.Rect.fromPoints(
   *  new NutrientViewer.Geometry.Point({ x: 10, y: 10 }),
   *  new NutrientViewer.Geometry.Point({ x: 20, y: 10 }),
   *  new NutrientViewer.Geometry.Point({ x: 20, y: 20 }),
   *  new NutrientViewer.Geometry.Point({ x: 10, y: 20 })
   *  );
   *  @public
   *  @function fromPoints
   *  @memberof NutrientViewer.Geometry.Rect
   *  @param {Array<NutrientViewer.Geometry.Point>} points An array of four points.
   *  @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  static fromPoints(...points: Point[]): Rect;
  /**
   * Expand the rect to include the list of points.
   * @example
   * const rect = NutrientViewer.Geometry.Rect({
   *   left: 10,
   *   top: 10,
   *   width: 10,
   *   height: 10
   * })
   *
   * const newRect = rect.expandToIncludePoints(new NutrientViewer.Geometry.Point({ x: 30, y: 30 }));
   * // => Rect {left: 10, top: 10, width: 30, height: 30}
   * @public
   * @function expandToIncludePoints
   * @memberof NutrientViewer.Geometry.Rect
   * @param {NutrientViewer.Geometry.Point} point A point.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  expandToIncludePoints(...points: Point[]): Rect;
  static areRectsCloserThan(a: Rect, b: Rect, distance: number): boolean;
  static areVerticallyAligned(a: Rect, b: Rect, thresholdDistance: number): boolean;
  /**
   * Creates a rect that surrounds all rects in the supplied {@link NutrientViewer.Immutable.List}.
   *
   * This can be used to calculate the bounding box of a list of rects.
   * @example
   * const rects = NutrientViewer.Immutable.List([
   *   new NutrientViewer.Geometry.Rect({ left: 14, top: 50, width: 50, height: 50 }),
   *   new NutrientViewer.Geometry.Rect({ left: 70, top: 20, width: 98, height: 99 }),
   *   new NutrientViewer.Geometry.Rect({ left: 14, top: 13, width: 15, height: 16 })
   * ]);
   *
   * const unionRect = NutrientViewer.Geometry.Rect.union(rects); // => Rect {left: 14, top: 13, width: 154, height: 106}
   * @public
   * @function union
   * @memberof NutrientViewer.Geometry.Rect
   * @param {NutrientViewer.Immutable.List.<NutrientViewer.Geometry.Rect>} rects An immutable list of rects.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  static union(rects: List<Rect>): Rect;
  static getCenteredRect(inner: Size, outer: Size): Rect;
  static fromInset(inset: Inset): Rect;
  /**
   * Translates the location of the rect by a point.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10 });
   * rect.translate(new NutrientViewer.Geometry.Point({ x: 5, y: -5})); // => Rect {left: 15, top: 5, width: 0, height: 0}
   * @public
   * @instance
   * @function translate
   * @memberof NutrientViewer.Geometry.Rect
   * @param {NutrientViewer.Geometry.Point} point A point that describes the translation distance.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  translate({ x: tx, y: ty }: Point): Rect;
  /**
   * Translates the horizontal location of the rect by a number.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10 });
   * rect.translateX(5); // => Rect {left: 15, top: 10, width: 0, height: 0}
   * @public
   * @instance
   * @function translateX
   * @memberof NutrientViewer.Geometry.Rect
   * @param {number} tx A number to translate the `left` value.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  translateX(tx: number): Rect;
  /**
   * Translates the vertical location of the rect by a number.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10 });
   * point.translateY(5); // => Rect {left: 10, top: 15, width: 0, height: 0}
   * @public
   * @instance
   * @function translateY
   * @memberof NutrientViewer.Geometry.Rect
   * @param {number} ty A number to translate the `top` value.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  translateY(ty: number): Rect;
  /**
   * Scales all values by the given `sx` and `sy` factor. If only `sx` is set and `sy` not defined,
   * it will scale the values by `sx`.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.scale(2); // => Rect {left: 20, top: 20, width: 20, height: 20}
   * @public
   * @instance
   * @function scale
   * @memberof NutrientViewer.Geometry.Rect
   * @param {number} sx Scale value for the `left` and `width` value. If `sy` is not set, this scale
   *        will also be applied to `top` and `height`.
   * @param {?number} sy Scale value for the `top` an `height` value.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  scale(sx: number, sy?: number): Rect;
  /**
   * Grows the rect by `growth` on every side but keeps the center of the Rect at the same position.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.grow(5); // => Rect {left: 5, top: 5, width: 20, height: 20}
   * @public
   * @instance
   * @function grow
   * @memberof NutrientViewer.Geometry.Rect
   * @param {number} growth The growth factor. It will be applied on every side, so the new `width`
   *        and `height` will increase by two times this factor.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect`.
   */
  grow(growth: number): Rect;
  /**
   * Returns the {@link NutrientViewer.Geometry.Point} that is the upper-left corner of this rect.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.getLocation(); // => Point {left: 10, top: 10}
   * @public
   * @instance
   * @function getLocation
   * @memberof NutrientViewer.Geometry.Rect
   * @returns {NutrientViewer.Geometry.Point} A point that is on the upper-left corner of this rect.
   */
  getLocation(): Point;
  /**
   * Returns the {@link NutrientViewer.Geometry.Size} of the rect.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.getSize(); // => Size {width: 10, height: 10}
   * @public
   * @instance
   * @function getSize
   * @memberof NutrientViewer.Geometry.Rect
   * @returns {NutrientViewer.Geometry.Size} The size of the rect.
   */
  getSize(): Size;
  /**
   * Returns the {@link NutrientViewer.Geometry.Point} that is the center of this rect.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.getCenter(); // => Point {left: 15, top: 15}
   * @public
   * @instance
   * @function getLocation
   * @memberof NutrientViewer.Geometry.Rect
   * @returns {NutrientViewer.Geometry.Point} A point that is on the center of this rect.
   */
  getCenter(): Point;
  /**
   * Updates the location of the rect by modifying `left` and `top`.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * var nextLocation = new NutrientViewer.Geometry.Point({ x: 20, y: 30 });
   *
   * rect.setLocation(nextLocation); // => Rect {left: 20, top: 30, width: 10, height: 10}
   * @public
   * @instance
   * @function setLocation
   * @memberof NutrientViewer.Geometry.Rect
   * @param {NutrientViewer.Geometry.Point} location The new location for the rect.
   * @returns {NutrientViewer.Geometry.Rect} A new `Rect` with `left` and `top` updated.
   */
  setLocation(location: Point): Rect;
  /**
   * Rounds all coordinates to whole numbers. The resulting `Rect` will always overlap the source
   * `Rect`.
   *
   * The location (`left` and `top`) will be rounded to a number which is smaller than or equal
   * to the current value.
   *
   * The size (`width` and `height`) will be rounded to a number which is greater than or equal to
   * the current value.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10.5, top: 15.5, width: 20.5, height: 25.5 });
   * rect.roundOverlap(); // => Rect {left: 10, top: 15, width: 21, height: 26}
   * @public
   * @instance
   * @function round
   * @memberof NutrientViewer.Geometry.Rect
   * @returns {NutrientViewer.Geometry.Rect} A new `rect`.
   */
  roundOverlap(): Rect;
  /**
   * Rounds all coordinates to whole numbers. This implementation uses `Math.round` for all
   * coordinates. The resulting `Rect` might no longer overlap the source `Rect`.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10.5, top: 15.5, width: 20.5, height: 25.5 });
   * rect.round(); // => Rect {left: 11, top: 16, width: 21, height: 26}
   * @public
   * @instance
   * @function round
   * @memberof NutrientViewer.Geometry.Rect
   * @returns {NutrientViewer.Geometry.Rect} A new `rect`.
   */
  round(): Rect;
  /**
   * Test if a point is within the rect. This can be used for hit testing.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   * rect.isPointInside(new NutrientViewer.Geometry.Point({ x: 15, y: 15 })); // => true
   * rect.isPointInside(new NutrientViewer.Geometry.Point({ x: 25, y: 25 })); // => false
   * @public
   * @instance
   * @function isPointInside
   * @memberof NutrientViewer.Geometry.Rect
   * @param {NutrientViewer.Geometry.Point} point The point that should be tested.
   * @returns {boolean} `true` if the point is inside, `false` otherwise.
   */
  isPointInside(point: Point): boolean;
  /**
   * Test if a rect is completely inside this rect.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   *
   * const insideRect = new NutrientViewer.Geometry.Rect({ left: 12, top: 12, width: 5, height: 5 });
   * const overlappingRect = new NutrientViewer.Geometry.Rect({ left: 5, top: 5, width: 10, height: 10 });
   * const outsideRect = new NutrientViewer.Geometry.Rect({ left: 0, top: 0, width: 5, height: 5 });
   *
   * rect.isRectInside(insideRect); // => true
   * rect.isRectInside(overlappingRect); // => false
   * rect.isRectInside(outsideRect); // => false
   * @public
   * @instance
   * @function isRectInside
   * @memberof NutrientViewer.Geometry.Rect
   * @param {NutrientViewer.Geometry.Rect} rect The rect that should be tested.
   * @returns {boolean} `true` if the rect is inside, `false` otherwise.
   */
  isRectInside(other: Rect): boolean;
  /**
   * Test if the union area of two rects is greater than zero.
   * @example
   * const rect = new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 10, height: 10 });
   *
   * const insideRect = new NutrientViewer.Geometry.Rect({ left: 12, top: 12, width: 5, height: 5 });
   * const overlappingRect = new NutrientViewer.Geometry.Rect({ left: 5, top: 5, width: 10, height: 10 });
   * const outsideRect = new NutrientViewer.Geometry.Rect({ left: 0, top: 0, width: 5, height: 5 });
   *
   * rect.isRectOverlapping(insideRect); // => true
   * rect.isRectOverlapping(overlappingRect); // => true
   * rect.isRectOverlapping(outsideRect); // => false
   * @public
   * @instance
   * @function isRectOverlapping
   * @memberof NutrientViewer.Geometry.Rect
   * @param {NutrientViewer.Geometry.Rect} rect The rect that should be tested.
   * @returns {boolean} `true` if the rect is overlapping, `false` otherwise.
   */
  isRectOverlapping(other: Rect): boolean;
  /**
   * Normalizes the Rect. In case of either a negative width or a negative height, the position will
   * be updated so that the location is again the top, left point of the rectangle.
   */
  normalize(): Rect;
  /**
   * Applies a transformation to the rect. We will translate [top, left] like a 2D
   * vector but only apply the scaling to the dimension [width, height]
   */
  apply(matrix: TransformationMatrix): Rect;}

declare const Rect_base: Record_2.Factory<IRect>;

/**
 * @classdesc
 * Rectangle annotations are used to draw rectangles on a page.
 *
 * Rectangle annotations with transparent fill color are only selectable around their visible lines.
 * This means that you can create a page full of rectangle annotations while annotations
 * behind the rectangle annotation are still selectable.
 *
 * Right now, rectangle annotations are implemented using SVG images. This behavior is subject to change.
 *
 * <center>
 *   <img title="Example of a rectangle annotation" src="img/annotations/shape_rectangle_annotation.png" width="411" height="295" class="shadow">
 * </center>
 * @example <caption>Create a rectangle annotation</caption>
 * const annotation = new NutrientViewer.Annotations.RectangleAnnotation({
 *   pageIndex: 0,
 *   boundingBox: new NutrientViewer.Geometry.Rect({
 *     left: 10,
 *     top: 10,
 *     width: 100,
 *     height: 100,
 *   }),
 *   cloudyBorderIntensity: 2,
 *   cloudyBorderInset: new NutrientViewer.Geometry.Inset({
 *     left: 9,
 *     top: 9,
 *     right: 9,
 *     bottom: 9,
 *   })
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display a rectangle on a page.
 * @class RectangleAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.ShapeAnnotation
 */
export declare class RectangleAnnotation<T extends IRectangleAnnotation = IRectangleAnnotation> extends ShapeAnnotation<T> {
  /**
   * Intensity of the cloudy border.
   *
   * If not present or 0, the annotation will use a normal border.
   * @public
   * @instance
   * @member {?number} cloudyBorderIntensity
   * @memberof NutrientViewer.Annotations.RectangleAnnotation
   * @default null Normal border.
   */
  cloudyBorderIntensity: null | number;
  /**
   * Cloudy border inset.
   *
   * For rectangle annotations with a cloudy border, it contains the values for the distances from
   * the bounding box to bounding box wrapped by the inner, where the content fits.
   *
   * Visual representation of the property:
   *
   * <center>
   * <img title="Example of a cloudy rectangle annotation" src="img/annotations/rectangle_inset.png" width="600" height="405" class="shadow">
   * </center>
   * @public
   * @instance
   * @member {NutrientViewer.Geometry.Inset} cloudyBorderInset
   * @memberof NutrientViewer.Annotations.RectangleAnnotation
   */
  cloudyBorderInset: null | Inset;













  measurementBBox: null | Rect;
  static defaultValues: IObject;
  static readableName: string;
  constructor(options?: Partial<T>);}

export declare type RectangleAnnotationJSON = ShapeAnnotationJSON & {
  type: 'pspdfkit/shape/rectangle';
  cloudyBorderIntensity: number | null;
  cloudyBorderInset?: InsetJSON | null;
  measurementBBox: IRectJSON | null;};

declare class RectangleAnnotationSerializer extends ShapeAnnotationSerializer {
  annotation: RectangleAnnotation;
  toJSON(): RectangleAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<RectangleAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RectangleAnnotation;}

/**
 * @classdesc
 * Redaction annotations are used to mark regions of content or text of the
 * document to eventually redact (i.e. remove the content from the document
 * in an irreversible way).
 *
 * You can customize how a redaction annotation looks in its marked state,
 * which is when the redaction hasn't been applied yet, and the redacted
 * state, that is the final appearance that the redacted region will have.
 *
 * The `fillColor`, `overlayText`, `color` and `repeatOverlayText` influence
 * the redacted appearance, while `outlineColor` influences the marked
 * appearance.
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Mark a region for redaction.
 * @class RedactionAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.MarkupAnnotation
 */
export declare class RedactionAnnotation<T extends IRedactionAnnotation = IRedactionAnnotation> extends TextMarkupAnnotation<T> {
  /**
   * Background color of the redacted area.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} fillColor
   * @memberof NutrientViewer.Annotations.RedactionAnnotation
   * @default NutrientViewer.Color.BLACK
   */
  fillColor: null | Color;
  /**
   * Text to be displayed at the specified region
   * when a redaction has been applied.
   * @public
   * @instance
   * @member {?string} overlayText
   * @memberof NutrientViewer.Annotations.RedactionAnnotation
   */
  overlayText: null | string;
  /**
   * Whether the overlay text should be repeated
   * to fill the entire redaction area or just
   * be drawn once.
   *
   * It has no effect if there is no overlay text
   * specified.
   * @public
   * @instance
   * @member {?boolean} repeatOverlayText
   * @memberof NutrientViewer.Annotations.RedactionAnnotation
   * @default false
   */
  repeatOverlayText: null | boolean;
  /**
   * Color used for the redaction's border in its
   * marked state.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} outlineColor
   * @memberof NutrientViewer.Annotations.RedactionAnnotation
   * @default NutrientViewer.Color.RED
   */
  outlineColor: null | Color;
  /**
   * Color of the overlay text.
   *
   * It has no effect if there is no overlay text
   * specified.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} color
   * @memberof NutrientViewer.Annotations.RedactionAnnotation
   * @default NutrientViewer.Color.RED
   */
  color: Color;
  static readableName: string;
  static defaultValues: IObject;}

export declare type RedactionAnnotationJSON = BaseTextMarkupAnnotationJSON & {
  type: 'pspdfkit/markup/redaction';
  fillColor?: string | null;
  outlineColor?: string | null;
  overlayText?: string | null;
  repeatOverlayText?: boolean | null;
  rotation?: number;
  color?: string | null;};

/**
 *
 *Redaction Annotation presets are sets of property-value pairs for annotations that can be applied as default
 *annotations settings for Redaction Annotations. When a property of a Redaction Annotation is changed by the user,
 *the annotation preset of the redaction annotations gets updated. This means that all the Redaction annotations
 *created after this action will use that preset unless a different preset is specified.
 *
 *For properties not included in the annotation preset, the default values of those properties are used.
 * @example <caption>Creating an annotation preset and adding it to the available annotation presets</caption>
 * const myAnnotationPresets = instance.annotationPresets
 * myAnnotationPresets['redaction'] = {
 *  color: NutrientViewer.Color.BLACK,
 * }
 * instance.setAnnotationPresets(myAnnotationPresets);
 * @public
 * @summary Annotation Preset for Redaction Annotations
 * @interface RedactionAnnotationPreset
 * @memberof NutrientViewer
 */
declare type RedactionAnnotationPreset = {
  /**
   * Background color of the redacted area.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} fillColor
   * @memberof NutrientViewer.RedactionAnnotationPreset
   * @default NutrientViewer.Color.BLACK
   */
  fillColor?: Color;
  /**
   * Text to be displayed at the specified region
   * when a redaction has been applied.
   * @public
   * @instance
   * @member {?string} overlayText
   * @memberof NutrientViewer.RedactionAnnotationPreset
   */
  overlayText?: string;
  /**
   * Whether the overlay text should be repeated
   * to fill the entire redaction area or just
   * be drawn once.
   *
   * It has no effect if there is no overlay text
   * specified.
   * @public
   * @instance
   * @member {?boolean} repeatOverlayText
   * @memberof NutrientViewer.RedactionAnnotationPreset
   * @default false
   */
  repeatOverlayText?: boolean;
  /**
   * Color of the overlay text.
   *
   * It has no effect if there is no overlay text
   * specified.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} color
   * @memberof NutrientViewer.RedactionAnnotationPreset
   * @default NutrientViewer.Color.RED
   */
  color?: Color;
  /**
   * Color used for the redaction's border in its
   * marked state.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} outlineColor
   * @memberof NutrientViewer.RedactionAnnotationPreset
   * @default NutrientViewer.Color.RED
   */
  outlineColor?: Color;
  /**
   * Name of the creator
   * @public
   * @instance
   * @member {?string} creatorName
   * @memberof NutrientViewer.RedactionAnnotationPreset
   */
  creatorName?: string;};


declare class RedactionAnnotationSerializer extends BaseTextMarkupSerializer {
  annotation: RedactionAnnotation;
  constructor(annotation: RedactionAnnotation);
  toJSON(): RedactionAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<RedactionAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): RedactionAnnotation;}

declare function RedactionsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Searches in the PDF document and creates a redaction annotation for each search result. You can search for a text, regex or use one of the patterns we provide. See
     * {@link NutrientViewer.SearchPattern} for the list of all the patterns we support.
     *
     * Regex syntax:
     * - Standalone: JavaScript (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions}).
     * - Server: {@link http://userguide.icu-project.org/strings/regexp|ICU regular expression}, a derivative of Perl regular expressions.
     *
     * Notice that matches included when using one of the {@link NutrientViewer.SearchPattern} options might overfit the criteria (i.e. include false positive results). This might happen since
     * we strive for including all positive results and avoid data loss. Make sure to review the matches found.
     *
     * Note for multiline regular expressions that document text lines end with CRLF (`\r\n`).
     *
     * Regular expressions that follow the JavaScript syntax are matched in a similar way to the `RegExp.prototype.exec()` method (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec}), but ignoring capturing groups, that is, this function only returns full string matches.
     * @example <caption>Search and add redactions</caption>
     * instance.createRedactionsBySearch(NutrientViewer.SearchPattern.CREDIT_CARD_NUMBER, {
     *   searchType: NutrientViewer.SearchType.PRESET,
     *   searchInAnnotations: true,
     *  annotationPreset: {
     *     overlayText: 'Redacted'
     *   }
     * }).then(function(ids) {
     *   console.log("The following annotations have been added:", ids);
     *
     *   return instance.applyRedactions();
     * });
     *
     * // We can add an "annotations.create" event listener and add custom logic based on the
     * // information for each of the newly created redaction annotations
     *
     * const {RedactionAnnotation} = NutrientViewer.Annotations
     * instance.addEventListener("annotations.create", annotations => {
     *   const redactions = annotations.filter(annot => annot instanceof RedactionAnnotation)
     *   if (redactions.size > 0) {
     *     console.log("Redactions: ", redactions.toJS())
     *   }
     * });
     * @public
     * @function createRedactionsBySearch
     * @param {string | NutrientViewer.SearchPattern} term The text, regex or pattern you want to search for.
     * @param {object} options Search options object:
     * * `searchType` {NutrientViewer.SearchType} Redactions Search Type. Default is `NutrientViewer.SearchType.TEXT`
     * * `searchInAnnotations` {boolean} set to `false` if you don't want to search in annotations. Default is `true`
     * * `caseSensitive` {boolean} Whether the search will be case-sensitive or not. Default is `false` if `searchType` is `NutrientViewer.SearchType.TEXT` and `true` for other types of searches.
     * * `annotationPreset` {NutrientViewer.RedactionAnnotationPreset} Redaction annotation preset
     * * `startPageIndex` {number} The page number to start the search from. Default is `0`
     * * `pageRange` {number} Starting from the `start` page, the number of pages to search. Default is to the end of the document.
     * @instance
     * @returns {Promise.<NutrientViewer.Immutable.List.<string>>} Promise that resolves when the redaction annotations have been created. Returns a list of new Redaction Annotation IDs.
     * @memberof NutrientViewer.Instance
     */
    createRedactionsBySearch(term: string | ISearchPattern, options?: {
      searchType?: ISearchType;
      searchInAnnotations?: boolean;
      caseSensitive?: boolean;
      annotationPreset?: RedactionAnnotationPreset;
      startPageIndex?: number;
      pageRange?: number;})
    : Promise<List<string>>;
    /**
     * Applies redactions to the current document. This will overwrite the document,
     * removing content irreversibly.
     *
     * In the process of redacting the content, all the redaction annotations will
     * be removed. Any annotation that is either partially or completely covered
     * by a redaction annotation will be deleted.
     * @example <caption>Applies redactions</caption>
     * instance.applyRedactions().then(function() {
     *   console.log("The document has been redacted.");
     * });
     * @public
     * @function applyRedactions
     * @instance
     * @returns {Promise.<void>} Promise that resolves when the redactions has been applied.
     * @memberof NutrientViewer.Instance
     */
    applyRedactions(): Promise<void>;};} &

T;

/**
 * Returns a copy of the collection with the value at key removed.
 *
 * A functional alternative to `collection.remove(key)` which will also work
 * with plain Objects and Arrays as an alternative for
 * `delete collectionCopy[key]`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { remove } = require('immutable')
 * const originalArray = [ 'dog', 'frog', 'cat' ]
 * remove(originalArray, 1) // [ 'dog', 'cat' ]
 * console.log(originalArray) // [ 'dog', 'frog', 'cat' ]
 * const originalObject = { x: 123, y: 456 }
 * remove(originalObject, 'x') // { y: 456 }
 * console.log(originalObject) // { x: 123, y: 456 }
 * ```
 */
declare function remove<K, C extends Collection<K, any>>(collection: C, key: K): C;

declare function remove<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps>(collection: C, key: K): C;

declare function remove<C extends Array<any>>(collection: C, key: number): C;

declare function remove<C, K extends keyof C>(collection: C, key: K): C;

declare function remove<C extends {[key: string]: any;}, K extends keyof C>(collection: C, key: K): C;

/**
 * Returns a copy of the collection with the value at the key path removed.
 *
 * A functional alternative to `collection.removeIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { removeIn } = require('immutable')
 * const original = { x: { y: { z: 123 }}}
 * removeIn(original, ['x', 'y', 'z']) // { x: { y: {}}}
 * console.log(original) // { x: { y: { z: 123 }}}
 * ```
 */
declare function removeIn<C>(collection: C, keyPath: Iterable<any>): C;

declare type Renderer = (rendererProps: RendererProps) => UIRendererConfiguration;

declare type RendererConfiguration = {
  node: Node;
  append?: boolean | null;
  noZoom?: boolean | null;
  onDisappear?: ((arg0: Node | null) => void) | null;};

/**
 * This object can contain callback functions ("renderers") used to customize the appearance of different built-in UI elements.
 *
 * The UI element to which the callback corresponds is determined by its key or keys. For example, a callback function
 * used to customize the annotations sidebar should be located under `NutrientViewer.Configuration.customUI[NutrientViewer.UIElement.Sidebar][NutrientViewer.SidebarMode.ANNOTATIONS]`.
 *
 * Currently only the Sidebar Element can be customized, using the `NutrientViewer.UIElement.Sidebar` key.
 * @public
 * @memberof NutrientViewer
 * @interface CustomUIConfiguration
 * @summary Configuration settings for customized rendering of built-in UI elements.
 * @example
 *
 * //Fully customized sidebar
 *
 * NutrientViewer.load({
 *   customUI: {
 *     [NutrientViewer.UIElement.Sidebar]: {
 *       [NutrientViewer.SidebarMode.CUSTOM]({ containerNode }) {
 *         // React Portals can be used as well.
 *         // Or Vue portals, or any other framework API that allows appending components
 *         // to arbitrary DOM nodes.
 *         // Using vanilla JS, you can just append a node to parentNode.
 *         const div = document.createElement("div");
 *         div.append("My custom sidebar");
 *         containerNode.appendChild(div);
 *
 *         return {
 *           // By returning the same node that was provided, we opt-out of having the node
 *           // appended. If we return a different node, it will be appended to the provided node.
 *           node: containerNode,
 *         };
 *       }
 *     }
 *   }
 * });
 *
 * //Partially customized sidebar
 *
 * NutrientViewer.load({
 *   customUI: {
 *     [NutrientViewer.UIElement.Sidebar]: {
 *       [NutrientViewer.SidebarMode.ANNOTATIONS]({ containerNode }) {
 *         containerNode.style.padding = "0.5rem";
 *
 *         if (!containerNode.querySelector(".MyCustomSidebarComponentHeader")) {
 *           const header = document.createElement("div");
 *           header.classList.add("MyCustomSidebarComponentHeader");
 *           containerNode.prepend(header);
 *         }
 *
 *         return {
 *           node: containerNode,
 *           onRenderItem({ itemContainerNode, item: annotation }) {
 *             const footerAuthor = itemContainerNode.querySelector(".PSPDFKit-Sidebar-Annotations-Footer span");
 *             // Change the format of the footer text by prefixing it with "Creator: " and removing the date
 *             footerAuthor.textContent = `Creator: ${annotation.creatorName}`;
 *
 *             // Add aria label to the annotation icon
 *             const annotationIcon = itemContainerNode.querySelector(".PSPDFKit-Icon");
 *             annotationIcon.setAttribute("aria-label", `Icon for an annotation created by ${annotation.creatorName}.`);
 *           }
 *         };
 *       }
 *     }
 *   }
 * });
 * @seealso NutrientViewer.Configuration#customUI NutrientViewer.Instance#setCustomUIConfiguration
 */
/**
 * Sidebar custom UI configuration.
 * @public
 * @instance
 * @member {NutrientViewer.CustomUIConfiguration.Sidebar} sidebarCustomUIConfiguration
 * @property {?NutrientViewer.CustomUIRendererCallback} ANNOTATIONS - Custom UI renderer callback for the annotations sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} THUMBNAILS - Custom UI renderer callback for the thumbnails sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} BOOKMARKS - Custom UI renderer callback for the bookmarks sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} DOCUMENT_OUTLINE - Custom UI renderer callback for the document outline sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} SIGNATURES - Custom UI renderer callback for the signatures sidebar.
 * @property {?NutrientViewer.CustomUIRendererCallback} CUSTOM - Custom UI renderer callback for the custom sidebar.
 * @memberof NutrientViewer.CustomUIConfiguration
 */
/**
 * This user defined function receives the element's container DOM node and the data it renders as argument. It's
 * called whenever the element is mounted, each time the data is modified, and whenever {@link NutrientViewer.Instance#setCustomUIConfiguration} is called.
 *
 * It must return a {@link NutrientViewer.CustomUIRendererConfiguration} object.
 * @public
 * @callback CustomUIRendererCallback@callback CustomUIRendererCallback
 * @param {object} payload - UI element data
 * @param {Node} payload.containerNode - Container DOM element.
 * @param {NutrientViewer.Immutable.List.<any> | null} payload.items - Data rendered by the element.
 * @returns {NutrientViewer.CustomUIRendererConfiguration}
 * @memberof NutrientViewer
 */
/**
 * This object is returned by customer's {@link NutrientViewer.CustomUIRendererCallback} functions to enhance the default appearance of a UI element.
 *
 * Its main, fundamental property is `node`, which is the DOM node that will be appended to the container node.
 *
 * Optionally it can contain an `onRenderItem` event handler, which is called for each item in the list.
 * @public
 * @interface CustomUIRendererConfiguration
 * @property {Node} node - DOM node to be appended to the container, if different from `containerNode`.
 * @property {?NutrientViewer.CustomUIItemRendererCallback} onRenderItem - Callback to be called whenever an item is rendered.
 * @memberof NutrientViewer
 */
/**
 * This user defined function receives the item element's container DOM node and the item data it renders as argument. It's called whenever the item element because of the container element updates.
 * @public
 * @callback CustomUIItemRendererCallback@callback CustomUIItemRendererCallback
 * @param {object} payload - UI element data
 * @param {Node} payload.itemContainerNode - Container DOM element.
 * @param {any} payload.item - Item data rendered by the element.
 * @memberof NutrientViewer
 */
declare type RendererProps = {
  containerNode: Node;
  items?: List<any> | null;};

/**
 * This callback is called whenever a page is rendered or printed (only for
 * {@link NutrientViewer.PrintMode}.DOM). You can use it to render watermarks on the page.
 *
 * Make sure that the rendering commands are as efficient as possible as they might be invoked
 * multiple times per page (once per tile).
 *
 * For more information, see {@link NutrientViewer.Configuration#renderPageCallback}.
 * @public
 * @callback RenderPageCallback@callback RenderPageCallback
 * @memberof NutrientViewer
 * @param {CanvasRenderingContext2D} canvas A 2D `<canvas/>` rendering context.
 * @param {number} pageIndex The current page index, starting with `0` for the first page.
 * @param {NutrientViewer.Geometry.Size} size The size of the page that you're drawing at. The canvas is
 *                                      already scaled accordingly.
 * @example <caption>Register a RenderPageCallback handler at configuration time.</caption>
 * NutrientViewer.load({
 *   renderPageCallback: function(ctx, pageIndex, pageSize) {
 *     ctx.beginPath();
 *     ctx.moveTo(0, 0);
 *     ctx.lineTo(pageSize.width, pageSize.height);
 *     ctx.stroke();
 *
 *     ctx.font = "30px Comic Sans MS";
 *     ctx.fillStyle = "red";
 *     ctx.textAlign = "center";
 *     ctx.fillText(
 *       `This is page ${pageIndex + 1}`,
 *       pageSize.width / 2,
 *       pageSize.height / 2
 *     );
 *   }
 *   // ...
 * });
 */
declare type RenderPageCallback = (context: CanvasRenderingContext2D, pageIndex: number, pageSize: Size) => unknown;

declare function RenderPageMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Provided a `dimension` and `pageIndex` renders a page of a document and returns the
     * result as `ArrayBuffer`. This can be used as thumbnail.
     *
     * You can specify a width or height (but not both at the same time) as the first `dimension`
     * argument, each accepts a value in the interval `(0; 5000]`. The other dimension will be
     * calculated based on the aspect ratio of the document.
     *
     * This method can be used to provide thumbnail images for your document list. You can use it
     * in a `<canvas>` tag. The following example will load the cover of the loaded document with a
     * width of `400px`. We set the width of the `<canvas>` tag to `200px`, so the image will be
     * sharp on high DPI screens.
     * @example
     * const pageWidth = instance.pageInfoForIndex(0).width;
     * const pageHeight = instance.pageInfoForIndex(0).height;
     *
     * const width = 400;
     * const height = Math.round(width * pageHeight / pageWidth);
     *
     * instance.renderPageAsArrayBuffer({ width }, 0).then(function(buffer) {
     *   const canvas = document.createElement('canvas');
     *   canvas.width = width;
     *   canvas.height = height;
     *
     *   canvas.style.transformOrigin = "0 0";
     *   canvas.style.transform = "scale(0.5)";
     *
     *   const imageView = new Uint8Array(buffer);
     *   const ctx = canvas.getContext("2d");
     *   const imageData = ctx.createImageData(width, height);
     *   imageData.data.set(imageView);
     *   ctx.putImageData(imageData, 0, 0);
     *
     *   document.body.appendChild(canvas);
     * });
     * @public
     * @instance
     * @standalone
     * @function renderPageAsArrayBuffer
     * @param dimension The size of the resulting image. Only accepts either `width` or
     * `height`, but not both. The other dimension will be calculated accordingly.
     * @param {number} dimension.width The width of the resulting image.
     * @param {number} dimension.height The height of the resulting image.
     * @param {number} pageIndex The index of the page you want to have information about.
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<ArrayBuffer>} The raw image as bitmap.
     */
    renderPageAsArrayBuffer(dimension: {
      width: number;} |
    {
      height: number;},
    pageIndex: number): Promise<ArrayBuffer>;
    /**
     * Generates a URL to an image for the first page of a document or the page of the
     * provided `pageIndex`. This can be used as thumbnail.
     *
     * You can specify a width or height (but not both at the same time) as the first `dimension`
     * argument, each accepts a value in the interval `(0; 5000]`. The other dimension will be
     * calculated based on the aspect ratio of the document.
     *
     * This endpoint can be used to provide thumbnail images for your document list. You can use it
     * as a `src` for an `img` tag. The following example will load the cover of the loaded document with a
     * width of `400px`.
     *
     * The returned URL is a Blob URL.
     *
     * In order to prevent memory leaks, it's recommended to revoke the returned object URL once the image
     * is no longer needed, as in the example.
     * @example
     * let objectURL
     * instance.renderPageAsImageURL({ width: 400 }, 0).then(function(src) {
     *   const image = document.createElement('img');
     *   image.src = src;
     *   objectURL = src;
     *   document.body.appendChild(image);
     * });
     * // Once the image is no longer needed, we revoke the URL so that the associated
     * // Blob is released.
     * function callWhenTheImageIsNoLongerNeeded() {
     *   // Is it an object URL?
     *   if (objectURL.split("://")[0] === "blob") {
     *     URL.revokeObjectURL(objectURL);
     *   }
     * }
     * @public
     * @instance
     * @function renderPageAsImageURL
     * @param dimension The size of the resulting image. Only accepts either `width` or
     * `height`, but not both. The other dimension will be calculated accordingly.
     * @param {number} dimension.width The width of the resulting image.
     * @param {number} dimension.height The height of the resulting image.
     * @param {number} pageIndex The index of the page you want to have information about.
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<string>} The image url.
     */
    renderPageAsImageURL(dimension: {
      width: number;} |
    {
      height: number;},
    pageIndex: number): Promise<string>;};} &

T;

/**
 * Returns a Seq.Indexed of `value` repeated `times` times. When `times` is
 * not defined, returns an infinite `Seq` of `value`.
 *
 * Note: `Repeat` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 *
 * ```js
 * const { Repeat } = require('immutable')
 * Repeat('foo') // [ 'foo', 'foo', 'foo', ... ]
 * Repeat('bar', 4) // [ 'bar', 'bar', 'bar', 'bar' ]
 * ```
 */
declare function Repeat<T>(value: T, times?: number): Seq.Indexed<T>;

/**
 * @classdesc
 * PDF action to reset form fields in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("includeExclude", false);`.
 *
 * A ResetFormAction defines which form fields should be reset, when clicked on it. By default all
 * form fields will be reset to their default value. The `includeExclude` field defines if the
 * fields specified by `fields`, which are a {@link NutrientViewer.Immutable.List} of form field names,
 * should reset all form fields excluding the defined fields or just the defined fields. When
 * `includeExclude` is set to `true`, all form fields except the fields defined in `fields` will be
 * reset. If `includeExclude` is set to false, which is the default value for this field, only the
 * form fields defined in `fields` will be reset.
 * @example <caption>Create a new ResetFormAction</caption>
 * const action = new NutrientViewer.Actions.ResetFormAction({
 *   fields: List(["exampleField"])
 * });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Reset form fields in the current document.
 * @class ResetFormAction
 * @param {object} args An object with the keys `fields` and `includeExclude` used to initialize the action.
 * @extends NutrientViewer.Actions.Action
 */
export declare class ResetFormAction extends Action {
  /**
   * A List identifying which fields to reset or which to exclude from resetting, depending on the
   * setting of the includeExclude flag. Each element of the array shall be a text string
   * representing the fully qualified name of a field. If this entry is omitted, the includeExclude
   * flag shall be ignored; all fields in the document’s interactive form are reset.
   * @public
   * @instance
   * @member {?Immutable.List.<string>} fields
   * @memberof NutrientViewer.Actions.ResetFormAction
   * @default null
   */
  fields: List<string> | null | undefined;
  /**
   * If false, the fields list specifies which fields to reset.
   * If true, the fields list indicates which fields to exclude from resetting. That is, all fields
   * in the document’s interactive form shall be reset except those listed in the fields list.
   * @public
   * @instance
   * @member {boolean} includeExclude
   * @memberof NutrientViewer.Actions.ResetFormAction
   * @default false
   */
  includeExclude: boolean;
  static defaultValues: IObject;
  constructor(args?: IResetFormAction);}

declare type ResizeAnchor = 'TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_RIGHT' | 'BOTTOM_LEFT';

declare type RotatableAnnotation = TextAnnotation | StampAnnotation;

declare type Rotation = 0 | 90 | 180 | 270;

/**
 * Reason for the error that occurred when saving a certain modification.
 */
declare type SaveErrorReason = {
  error: any;
  object: any;
  modificationType: IModificationType;};

/**
 * This event is emitted when document save state changes.
 * See {@link NutrientViewer.Instance~SaveStateChangeEvent}
 * @public
 * @memberof NutrientViewer
 * @interface SaveStateChangeEvent
 */
declare type SaveStateChangeEvent = {
  /**
   * Indicates whether there are any local changes.
   * @public
   * @instance
   * @member {boolean} hasUnsavedChanges
   * @memberof NutrientViewer.SaveStateChangeEvent
   */
  hasUnsavedChanges: boolean;};


/**
 * Describes mode of page scrolling in the document view - either continuous, per spread
 * (paginated) or disabled (changing pages through the UI is disabled).
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ScrollMode} CONTINUOUS Render all pages as a list and allow smooth scrolling.
 *
 * This is the default mode.
 * @property {NutrientViewer.ScrollMode} PER_SPREAD Makes scrolling only possible within a spread. Whenever this mode is activated, or pages are
 * changed when this mode is active, the zoom mode will be reset to
 * {@link NutrientViewer.ZoomMode.FIT_TO_VIEWPORT}.
 * @property {NutrientViewer.ScrollMode} DISABLED Makes scrolling only possible within a spread and doesn't allow changing pages.
 * Whenever this mode is activated the zoom mode will be reset to
 * {@link NutrientViewer.ZoomMode.FIT_TO_VIEWPORT}.
 */
declare const ScrollMode: {
  readonly CONTINUOUS: "CONTINUOUS";
  readonly PER_SPREAD: "PER_SPREAD";
  readonly DISABLED: "DISABLED";};


declare function SearchMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Queries the PDF backend for all search results of a given term. Search is case-insensitive and
     * accented letters are ignored. The minimum query length for the term query to be performed can
     * be retrieved from {@link NutrientViewer.Instance#minQueryLength}.
     *
     * Shorter queries will throw an error.
     * @example <caption>Search for all occurrences of `foo`</caption>
     * instance.search("foo").then(results => {
     *   console.log(results.size);
     * });
     * @example <caption>Search within a page range.</caption>
     * instance.search("foo", { startPageIndex: 1, endPageIndex: 4 }).then(results => {
     *   console.log(results.size);
     * });
     * @example <caption>Search for a regex.</caption>
     * instance.search("Q[a-z]+ck\\sC.*[tT]", { searchType: NutrientViewer.SearchType.REGEX }).then(results => {
     *   console.log(results.size);
     * });
     * @example <caption>Search for all date patterns on the pages.</caption>
     * instance.search(NutrientViewer.SearchPattern.DATE, { searchType: NutrientViewer.SearchType.PATTERN }).then(results => {
     *   console.log(results.size);
     * });
     * @example <caption>Search for a regex in a case-insensitive way.</caption>
     * instance.search("he[a-z]+", { searchType: NutrientViewer.SearchType.REGEX, caseSensitive: false }).then(results => {
     *   console.log(results.size);
     * });
     * @public
     * @instance
     * @function search
     * @param {string} term The search term.
     * @param options Optional parameters used for search operation.
     * @param {number} options.startPageIndex The page index to start searching from. `options.endPageIndex` must be provided if this parameter is given.
     * @param {number} options.endPageIndex The last page index to search (inclusive). `options.startPageIndex` must be provided if this parameter is given.
     * @param {NutrientViewer.SearchType} options.searchType The search type which describes whether the query is a text, pattern or regex. Default is `NutrientViewer.SearchType.TEXT`.
     * @param {boolean} options.searchInAnnotations Whether you want to search in annotations. Default is `false`.
     * @param {boolean} options.caseSensitive Whether you want the search to be case-sensitive. Default is `false` if `searchType` is `NutrientViewer.SearchType.TEXT` and `true` for other types of searches.
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.SearchResult>>} Resolves to an immutable
     *   list of search results.
     * @memberof NutrientViewer.Instance
     */
    search(term: ISearchPattern | string, options?: {
      startPageIndex?: number;
      endPageIndex?: number;
      searchType?: ISearchType;
      searchInAnnotations?: boolean;
      caseSensitive?: boolean;})
    : Promise<List<SearchResult>>;
    /**
     * Returns the latest search state. This value changes whenever the user interacts with
     * NutrientViewer or whenever {@link NutrientViewer.Instance.setSearchState} is called.
     *
     * The search state can be used to finely control the current search UI.
     * @public
     * @readonly
     * @instance
     * @member {NutrientViewer.SearchState} searchState
     * @memberof NutrientViewer.Instance
     */
    readonly searchState: SearchState;
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setSearchState|setSearchState()}
     * method to do atomic updates to the current search state.
     * @public
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setSearchState(state => state.set("isFocused", true));
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~SearchStateUpdater
     * @param {NutrientViewer.SearchState} currentSearchState
     * @returns {NutrientViewer.SearchState} The new search state.
     */
    /**
     * This method is used to update the UI search state of the PDF editor.
     *
     * When you pass in a {@link NutrientViewer.SearchState}, the current state will be immediately
     * overwritten. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * {@link NutrientViewer.SearchState} as a property. You can use this to change state based on the
     * current value. This type of update is guaranteed to be atomic - the value of `currentState`
     * can't change in between.
     * See: {@link NutrientViewer.Instance~SearchStateUpdater|SearchStateUpdater}
     *
     * When the supplied {@link NutrientViewer.SearchState} is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * {@link NutrientViewer.SearchState#minSearchQueryLength} is a readonly property and cannot be changed.
     * If the provided {@link NutrientViewer.SearchState} object includes a modified `minSearchQueryLength`
     * property, a warning will be shown and only changes to other properties will be applied.
     * @example <caption>Update values for the immutable search state object</caption>
     * const state = instance.SearchState;
     * const newState = state.set("isLoading", true);
     * instance.setSearchState(newState);
     * @public
     * @instance
     * @function setSearchState
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied state is not valid.
     * @param {NutrientViewer.SearchState|NutrientViewer.Instance~SearchStateUpdater} SearchStateOrFunction Either a
         *   new SearchState which would overwrite the existing one, or a callback that will get
         *   invoked with the current search state and is expected to return the new state.
         */
    setSearchState(stateOrFunction: SearchState | SetSearchStateFunction): void;
    /**
     * Open the search box, fill in the search term, and start loading the search requests.
     *
     * This will set the {@link NutrientViewer.ViewState#interactionMode} to
     * {@link NutrientViewer.InteractionMode}.SEARCH so that the search box is visible.
     * @example <caption>Start a search for the term `foo` in the UI</caption>
     * instance.startUISearch("foo");
     * @public
     * @instance
     * @function startUISearch
     * @memberof NutrientViewer.Instance
     * @param {string} term The search term.
     */
    startUISearch(term: string): void;};} &

T;

/**
 * Allows you to perform a search by a built-in pattern that matches common strings.
 *
 * Note that by design, some of these patterns might overfit the criteria (i.e. include false positive results). This might happen since we strive for
 * including all positive results and avoid data loss. Make sure to review the matches found.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.SearchPattern} CREDIT_CARD_NUMBER Catches credit card numbers with a number beginning with 1-6, and must be 13 to 19 digits long. Spaces and - are allowed anywhere in the number.
 * @property {NutrientViewer.SearchPattern} DATE Matches date formats such as mm/dd/yyyy, mm/dd/yy, dd/mm/yyyy, and dd/mm/yy.
 * It will reject any days/months greater than 31 and will match if a
 * leading zero is or is not used for a single digit day or month.
 * The delimiter can either be `-`, `.` or `/`.
 * @property {NutrientViewer.SearchPattern} TIME Matches time formats such as 00:00:00, 00:00, 00:00 PM. 12 and 24 hour formats are allowed.
 * Seconds and 12 hour AM/PM denotation are both optional.
 * @property {NutrientViewer.SearchPattern} EMAIL_ADDRESS Matches an email address with the format of xyz@xyz.xyz where xyz can be any alpha numeric character or a .
 * For more information on the pattern please see http://emailregex.com/.
 * @property {NutrientViewer.SearchPattern} INTERNATIONAL_PHONE_NUMBER Matches International style phone numbers with a prefix of + or 00, containing between 7 - 15 digits with spaces or - occurring anywhere within the number.
 * @property {NutrientViewer.SearchPattern} IP_V4 Matches an IPV4 address limited to number ranges of 0-255 with an optional mask.
 * @property {NutrientViewer.SearchPattern} IP_V6 Matches full and compressed IPv6 addresses as defined in RFC 2373.
 * @property {NutrientViewer.SearchPattern} MAC_ADDRESS Matches a MAC address with delimiters of either `-` or `:`
 * @property {NutrientViewer.SearchPattern} NORTH_AMERICAN_PHONE_NUMBER Matches a NANP (https://en.wikipedia.org/wiki/North_American_Numbering_Plan) style phone number. In general this will match US, Canadian and various other Caribbean countries.
 * The pattern will also match an optional international prefix of `+1`.
 * @property {NutrientViewer.SearchPattern} SOCIAL_SECURITY_NUMBER Matches a US social security number (SSN). The format of the number should be either XXX-XX-XXXX or XXXXXXXXX with X denoting [0-9].
 * We expect the number to have word boundaries on either side, or to be the start/end of the string.
 * @property {NutrientViewer.SearchPattern} URL Matches a URL with a prefix of http|https|www with an optional subdomain.
 * @property {NutrientViewer.SearchPattern} US_ZIP_CODE Matches a USA style Zip Code. The format expected is 00000 or 00000-0000, where the delimiter can either be `-` or `/`.
 * @property {NutrientViewer.SearchPattern} VIN Matches US and ISO 3779 standard VINs.
 * The format expects 17 characters with the last 5 characters being numeric. `I`,`O`,`Q`,`_` characters are not allowed in upper or lower case.
 */
declare const SearchPattern: {
  readonly CREDIT_CARD_NUMBER: "credit_card_number";
  readonly DATE: "date";
  readonly TIME: "time";
  readonly EMAIL_ADDRESS: "email_address";
  readonly INTERNATIONAL_PHONE_NUMBER: "international_phone_number";
  readonly IP_V4: "ipv4";
  readonly IP_V6: "ipv6";
  readonly MAC_ADDRESS: "mac_address";
  readonly NORTH_AMERICAN_PHONE_NUMBER: "north_american_phone_number";
  readonly SOCIAL_SECURITY_NUMBER: "social_security_number";
  readonly URL: "url";
  readonly US_ZIP_CODE: "us_zip_code";
  readonly VIN: "vin";};


/**
 * @classdesc
 * A match when searching the PDF.
 *
 * You can retrieve search results by using {@link NutrientViewer.Instance#search}
 * @public
 * @memberof NutrientViewer
 * @summary A match when searching the PDF.
 * @class SearchResult
 * @noconstructor
 * @extends Immutable.Record
 */
export declare class SearchResult extends SearchResult_base {}


declare const SearchResult_base: Record_2.Factory<SearchResultProps>;

declare type SearchResultProps = {
  /**
   * The page where the result was found.
   * @public
   * @instance
   * @member {number} pageIndex
   * @memberof NutrientViewer.SearchResult
   */
  pageIndex: number | null;
  /**
   * The text surrounding the search term that can be used to list a preview.
   * @public
   * @instance
   * @member {string} previewText
   * @memberof NutrientViewer.SearchResult
   */
  previewText: string;
  /**
   * Location of the search term in the preview text.
   * @public
   * @instance
   * @member {number} locationInPreview
   * @memberof NutrientViewer.SearchResult
   */
  locationInPreview: number | null;
  /**
   * Length of the search term in the preview text.
   * @public
   * @instance
   * @member {number} lengthInPreview
   * @memberof NutrientViewer.SearchResult
   */
  lengthInPreview: number | null;
  /**
   * All rects on the page that should be used to highlight the text.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<NutrientViewer.Geometry.Rect>} rectsOnPage
   * @memberof NutrientViewer.SearchResult
   */
  rectsOnPage: List<Rect>;
  /**
   * Boolean to indicate whether the matching search result is part of an annotation.
   * @public
   * @instance
   * @member {boolean} isAnnotations
   * @memberof NutrientViewer.SearchResult
   */
  isAnnotation: boolean | null;
  /**
   * The bounding box of the annotation in which the result was found. This property is only available when the result is an annotation.
   * @public
   * @instance
   * @member {NutrientViewer.Geometry.Rect} annotationRect
   * @memberof NutrientViewer.SearchResult
   */
  annotationRect?: Rect | null;};


export declare class SearchState extends SearchState_base {}


declare const SearchState_base: Record_2.Factory<SearchStateProps>;

/**
 * @classdesc
 * The current state of the search indicators inside the web view.
 *
 * You can update the search state using {@link NutrientViewer.Instance#setSearchState}.
 * @public
 * @memberof NutrientViewer
 * @summary Current search UI state.
 * @class SearchState
 * @noconstructor
 * @extends Immutable.Record
 */
declare type SearchStateProps = {
  /**
   * Indicates that the search input has focus.
   * @public
   * @instance
   * @member {boolean} isFocused
   * @memberof NutrientViewer.SearchState
   */
  isFocused: boolean;
  /**
   * Indicates that we're currently loading search requests.
   * @public
   * @instance
   * @member {boolean} isLoading
   * @memberof NutrientViewer.SearchState
   */
  isLoading: boolean;
  /**
   * The current search term. Changing this term will not start a search. Please use
   * {@link NutrientViewer.Instance#startUISearch} for that purpose.
   * @public
   * @instance
   * @member {string} term
   * @memberof NutrientViewer.SearchState
   */
  term: string;
  /**
   * The currently focused result. -1 if no item is focused yet.
   * @public
   * @instance
   * @member {number} focusedResultIndex
   * @memberof NutrientViewer.SearchState
   * @default -1
   */
  focusedResultIndex: number;
  /**
   * The latest search results. These will be rendered as highlights in the page view.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<NutrientViewer.SearchResult>} results
   * @memberof NutrientViewer.SearchState
   */
  results: List<SearchResult>;
  /**
   * Current minimum search query length. When using the UI or the API function
   * {@link NutrientViewer.Instance#search}, any query shorter than this number will not be performed.
   *
   * In Server mode, this value is retrieved from the server at load time.
   *
   * The default value is `1` (not configurable) in Standalone mode,
   * and `3` in Server mode (configurable in the server).
   * @public
   * @instance
   * @readonly
   * @member {number} minSearchQueryLength
   * @memberof NutrientViewer.SearchState
   */
  minSearchQueryLength: number;};


/**
 * This event will fire whenever the customer types in a new search term in the search UI. It can
 * be used to plug the default search into your own search UI.
 * @example <caption>Implement your custom search backend</caption>
 * instance.addEventListener("search.termChange", async (event) => {
 *   // Opt-out from the default implementation.
 *   event.preventDefault();
 *
 *   // We clear the search state, when the search term was removed.
 *   if (term.length == 0) {
 *     instance.setSearchState(searchState => searchState.set("term", ""));
 *   }
 *
 *   // Manually update the UI. If `SearchState#term` is not updated, the update will
 *   // be ignored.
 *   instance.setSearchState(searchState =>
 *     searchState
 *       .set("term", event.term)
 *       .set("isLoading", true)
 *   );
 *
 *   // Make sure to cancel all outstanding requests so that the loading state won't be
 *   // overwritten by an outdated search response (e.g. When the user types "foo" we
 *   // want to cancel all requests for "f" and "fo" while the user types - otherwise
 *   // incoming responses for "f" will clear the loading state of "foo"). This should
 *   // make `myCustomSearch` no longer resolve its promise.
 *   cancelSearchRequest();
 *
 *   // Implement your custom search logic that returns SearchResult objects. This can use
 *   // `Instance#search()` internally.
 *   const results = await myCustomSearch(term);
 *
 *   // Apply the new search results. For an actual use case, you probably want to update
 *   // `SearchState#focusedResultIndex` as well.
 *   instance.setSearchState(searchState =>
 *     searchState
 *       .set("isLoading", false)
 *       .set("results", results)
 *   );
 * });
 * @public
 * @memberof NutrientViewer
 * @interface SearchTermChangeEvent
 */
declare type SearchTermChangeEvent = {
  /**
   * The updated search term.
   * @public
   * @instance
   * @member {string} term
   * @memberof NutrientViewer.SearchTermChangeEvent
   */
  term: string;
  /**
   * Call this method to opt-out from the default search logic.
   * @public
   * @instance
   * @member {Function} preventDefault
   * @memberof NutrientViewer.SearchTermChangeEvent
   */
  preventDefault: () => void;};


/**
 * Defines the search type used for text search operations or when creating redaction annotations based on text search.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.SearchType} TEXT This is the default search type. This is used when you want to search for strings/text.
 * @property {NutrientViewer.SearchType} PRESET The search type when you want to use the patterns provided by us. see {@link NutrientViewer.SearchPattern} for the list of all the patterns.
 * @property {NutrientViewer.SearchType} REGEX The search type when you want to search using regex.
 * Regex syntax:
 * - Standalone: JavaScript (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions}).
 * - Server: {@link http://userguide.icu-project.org/strings/regexp|ICU regular expression}, a derivative of Perl regular expressions.
 * Regular expressions that follow the JavaScript syntax are matched in a similar way to the `RegExp.prototype.exec()` method (see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec}), but ignoring capturing groups, that is, the function only returns full string matches.
 */
declare const SearchType: {
  readonly TEXT: "text";
  readonly PRESET: "preset";
  readonly REGEX: "regex";};


/**
 * Creates a Seq.
 *
 * Returns a particular kind of `Seq` based on the input.
 *
 *   * If a `Seq`, that same `Seq`.
 *   * If an `Collection`, a `Seq` of the same kind (Keyed, Indexed, or Set).
 *   * If an Array-like, an `Seq.Indexed`.
 *   * If an Iterable Object, an `Seq.Indexed`.
 *   * If an Object, a `Seq.Keyed`.
 *
 * Note: An Iterator itself will be treated as an object, becoming a `Seq.Keyed`,
 * which is usually not what you want. You should turn your Iterator Object into
 * an iterable object by defining a Symbol.iterator (or @@iterator) method which
 * returns `this`.
 *
 * Note: `Seq` is a conversion function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Seq<S extends Seq<any, any>>(seq: S): S;

declare function Seq<K, V>(collection: Collection.Keyed<K, V>): Seq.Keyed<K, V>;

declare function Seq<T>(collection: Collection.Indexed<T>): Seq.Indexed<T>;

declare function Seq<T>(collection: Collection.Set<T>): Seq.Set<T>;

declare function Seq<T>(collection: Iterable<T>): Seq.Indexed<T>;

declare function Seq<V>(obj: {[key: string]: V;}): Seq.Keyed<string, V>;

declare function Seq(): Seq<any, any>;

/**
 * `Seq` describes a lazy operation, allowing them to efficiently chain
 * use of all the higher-order collection methods (such as `map` and `filter`)
 * by not creating intermediate collections.
 *
 * **Seq is immutable** — Once a Seq is created, it cannot be
 * changed, appended to, rearranged or otherwise modified. Instead, any
 * mutative method called on a `Seq` will return a new `Seq`.
 *
 * **Seq is lazy** — `Seq` does as little work as necessary to respond to any
 * method call. Values are often created during iteration, including implicit
 * iteration when reducing or converting to a concrete data structure such as
 * a `List` or JavaScript `Array`.
 *
 * For example, the following performs no work, because the resulting
 * `Seq`'s values are never iterated:
 *
 * ```js
 * const { Seq } = require('immutable')
 * const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
 *   .filter(x => x % 2 !== 0)
 *   .map(x => x * x)
 * ```
 *
 * Once the `Seq` is used, it performs only the work necessary. In this
 * example, no intermediate arrays are ever created, filter is called three
 * times, and map is only called once:
 *
 * ```js
 * oddSquares.get(1); // 9
 * ```
 *
 * Any collection can be converted to a lazy Seq with `Seq()`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Map } = require('immutable')
 * const map = Map({ a: 1, b: 2, c: 3 }
 * const lazySeq = Seq(map)
 * ```
 *
 * `Seq` allows for the efficient chaining of operations, allowing for the
 * expression of logic that can otherwise be very tedious:
 *
 * ```js
 * lazySeq
 *   .flip()
 *   .map(key => key.toUpperCase())
 *   .flip()
 * // Seq { A: 1, B: 1, C: 1 }
 * ```
 *
 * As well as expressing logic that would otherwise seem memory or time
 * limited, for example `Range` is a special kind of Lazy sequence.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { Range } = require('immutable')
 * Range(1, Infinity)
 *   .skip(1000)
 *   .map(n => -n)
 *   .filter(n => n % 2 === 0)
 *   .take(2)
 *   .reduce((r, n) => r * n, 1)
 * // 1006008
 * ```
 *
 * Seq is often used to provide a rich collection API to JavaScript Object.
 *
 * ```js
 * Seq({ x: 0, y: 1, z: 2 }).map(v => v * 2).toObject();
 * // { x: 0, y: 2, z: 4 }
 * ```
 */

declare namespace Seq {
  /**
   * True if `maybeSeq` is a Seq, it is not backed by a concrete
   * structure such as Map, List, or Set.
   */
  function isSeq(maybeSeq: any): maybeSeq is Seq.Indexed<any> | Seq.Keyed<any, any> | Seq.Set<any>;


  /**
   * `Seq` which represents key-value pairs.
   */
  namespace Keyed {}

  /**
   * Always returns a Seq.Keyed, if input is not keyed, expects an
   * collection of [K, V] tuples.
   *
   * Note: `Seq.Keyed` is a conversion function and not a class, and does not
   * use the `new` keyword during construction.
   */
  function Keyed<K, V>(collection: Iterable<[K, V]>): Seq.Keyed<K, V>;
  function Keyed<V>(obj: {[key: string]: V;}): Seq.Keyed<string, V>;
  function Keyed<K, V>(): Seq.Keyed<K, V>;
  function Keyed(): Seq.Keyed<any, any>;

  interface Keyed<K, V> extends Seq<K, V>, Collection.Keyed<K, V> {
    /**
     * Deeply converts this Keyed Seq to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJS(): Object;

    /**
     * Shallowly converts this Keyed Seq to equivalent native JavaScript Object.
     *
     * Converts keys to Strings.
     */
    toJSON(): {[key: string]: V;};

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<[K, V]>;

    /**
     * Returns itself
     */
    toSeq(): this;

    /**
     * Returns a new Seq with other collections concatenated to this one.
     *
     * All entries will be present in the resulting Seq, even if they
     * have the same key.
     */
    concat<KC, VC>(...collections: Array<Iterable<[KC, VC]>>): Seq.Keyed<K | KC, V | VC>;
    concat<C>(...collections: Array<{[key: string]: C;}>): Seq.Keyed<K | string, V | C>;

    /**
     * Returns a new Seq.Keyed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq.Keyed({ a: 1, b: 2 }).map(x => 10 * x)
     * // Seq { "a": 10, "b": 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: V, key: K, iter: this) => M,
    context?: any)
    : Seq.Keyed<K, M>;

    /**
     * @see Collection.Keyed.mapKeys
     */
    mapKeys<M>(
    mapper: (key: K, value: V, iter: this) => M,
    context?: any)
    : Seq.Keyed<M, V>;

    /**
     * @see Collection.Keyed.mapEntries
     */
    mapEntries<KM, VM>(
    mapper: (entry: [K, V], index: number, iter: this) => [KM, VM],
    context?: any)
    : Seq.Keyed<KM, VM>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<KM, VM>(
    mapper: (value: V, key: K, iter: this) => Iterable<[KM, VM]>,
    context?: any)
    : Seq.Keyed<KM, VM>;

    /**
     * Returns a new Seq with only the entries for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends V>(
    predicate: (value: V, key: K, iter: this) => value is F,
    context?: any)
    : Seq.Keyed<K, F>;
    filter(
    predicate: (value: V, key: K, iter: this) => any,
    context?: any)
    : this;

    /**
     * @see Collection.Keyed.flip
     */
    flip(): Seq.Keyed<V, K>;}



  /**
   * `Seq` which represents an ordered indexed list of values.
   */
  namespace Indexed {

    /**
     * Provides an Seq.Indexed of the values provided.
     */
    function of<T>(...values: Array<T>): Seq.Indexed<T>;}


  /**
   * Always returns Seq.Indexed, discarding associated keys and
   * supplying incrementing indices.
   *
   * Note: `Seq.Indexed` is a conversion function and not a class, and does
   * not use the `new` keyword during construction.
   */
  function Indexed(): Seq.Indexed<any>;
  function Indexed<T>(): Seq.Indexed<T>;
  function Indexed<T>(collection: Iterable<T>): Seq.Indexed<T>;

  interface Indexed<T> extends Seq<number, T>, Collection.Indexed<T> {
    /**
     * Deeply converts this Indexed Seq to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Indexed Seq to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    /**
     * Returns itself
     */
    toSeq(): this;

    /**
     * Returns a new Seq with other collections concatenated to this one.
     */
    concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Seq.Indexed<T | C>;

    /**
     * Returns a new Seq.Indexed with values passed through a
     * `mapper` function.
     *
     * ```js
     * const { Seq } = require('immutable')
     * Seq.Indexed([ 1, 2 ]).map(x => 10 * x)
     * // Seq [ 10, 20 ]
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: number, iter: this) => M,
    context?: any)
    : Seq.Indexed<M>;

    /**
     * Flat-maps the Seq, returning a a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: number, iter: this) => Iterable<M>,
    context?: any)
    : Seq.Indexed<M>;

    /**
     * Returns a new Seq with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, index: number, iter: this) => value is F,
    context?: any)
    : Seq.Indexed<F>;
    filter(
    predicate: (value: T, index: number, iter: this) => any,
    context?: any)
    : this;

    /**
     * Returns a Seq "zipped" with the provided collections.
     *
     * Like `zipWith`, but using the default `zipper`: creating an `Array`.
     *
     * ```js
     * const a = Seq([ 1, 2, 3 ]);
     * const b = Seq([ 4, 5, 6 ]);
     * const c = a.zip(b); // Seq [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
     * ```
     */
    zip<U>(other: Collection<any, U>): Seq.Indexed<[T, U]>;
    zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T, U, V]>;
    zip(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

    /**
     * Returns a Seq "zipped" with the provided collections.
     *
     * Unlike `zip`, `zipAll` continues zipping until the longest collection is
     * exhausted. Missing values from shorter collections are filled with `undefined`.
     *
     * ```js
     * const a = Seq([ 1, 2 ]);
     * const b = Seq([ 3, 4, 5 ]);
     * const c = a.zipAll(b); // Seq [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
     * ```
     */
    zipAll<U>(other: Collection<any, U>): Seq.Indexed<[T, U]>;
    zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Seq.Indexed<[T, U, V]>;
    zipAll(...collections: Array<Collection<any, any>>): Seq.Indexed<any>;

    /**
     * Returns a Seq "zipped" with the provided collections by using a
     * custom `zipper` function.
     *
     * ```js
     * const a = Seq([ 1, 2, 3 ]);
     * const b = Seq([ 4, 5, 6 ]);
     * const c = a.zipWith((a, b) => a + b, b);
     * // Seq [ 5, 7, 9 ]
     * ```
     */
    zipWith<U, Z>(
    zipper: (value: T, otherValue: U) => Z,
    otherCollection: Collection<any, U>)
    : Seq.Indexed<Z>;
    zipWith<U, V, Z>(
    zipper: (value: T, otherValue: U, thirdValue: V) => Z,
    otherCollection: Collection<any, U>,
    thirdCollection: Collection<any, V>)
    : Seq.Indexed<Z>;
    zipWith<Z>(
    zipper: (...any: Array<any>) => Z,
    ...collections: Array<Collection<any, any>>)
    : Seq.Indexed<Z>;}



  /**
   * `Seq` which represents a set of values.
   *
   * Because `Seq` are often lazy, `Seq.Set` does not provide the same guarantee
   * of value uniqueness as the concrete `Set`.
   */
  namespace Set {

    /**
     * Returns a Seq.Set of the provided values
     */
    function of<T>(...values: Array<T>): Seq.Set<T>;}


  /**
   * Always returns a Seq.Set, discarding associated indices or keys.
   *
   * Note: `Seq.Set` is a conversion function and not a class, and does not
   * use the `new` keyword during construction.
   */
  function Set(): Seq.Set<any>;
  function Set<T>(): Seq.Set<T>;
  function Set<T>(collection: Iterable<T>): Seq.Set<T>;

  interface Set<T> extends Seq<T, T>, Collection.Set<T> {
    /**
     * Deeply converts this Set Seq to equivalent native JavaScript Array.
     */
    toJS(): Array<any>;

    /**
     * Shallowly converts this Set Seq to equivalent native JavaScript Array.
     */
    toJSON(): Array<T>;

    /**
     * Shallowly converts this collection to an Array.
     */
    toArray(): Array<T>;

    /**
     * Returns itself
     */
    toSeq(): this;

    /**
     * Returns a new Seq with other collections concatenated to this one.
     *
     * All entries will be present in the resulting Seq, even if they
     * are duplicates.
     */
    concat<U>(...collections: Array<Iterable<U>>): Seq.Set<T | U>;

    /**
     * Returns a new Seq.Set with values passed through a
     * `mapper` function.
     *
     * ```js
     * Seq.Set([ 1, 2 ]).map(x => 10 * x)
     * // Seq { 10, 20 }
     * ```
     *
     * Note: `map()` always returns a new instance, even if it produced the
     * same value at every step.
     */
    map<M>(
    mapper: (value: T, key: T, iter: this) => M,
    context?: any)
    : Seq.Set<M>;

    /**
     * Flat-maps the Seq, returning a Seq of the same type.
     *
     * Similar to `seq.map(...).flatten(true)`.
     */
    flatMap<M>(
    mapper: (value: T, key: T, iter: this) => Iterable<M>,
    context?: any)
    : Seq.Set<M>;

    /**
     * Returns a new Seq with only the values for which the `predicate`
     * function returns true.
     *
     * Note: `filter()` always returns a new instance, even if it results in
     * not filtering out any values.
     */
    filter<F extends T>(
    predicate: (value: T, key: T, iter: this) => value is F,
    context?: any)
    : Seq.Set<F>;
    filter(
    predicate: (value: T, key: T, iter: this) => any,
    context?: any)
    : this;}}




declare interface Seq<K, V> extends Collection<K, V> {

  /**
   * Some Seqs can describe their size lazily. When this is the case,
   * size will be an integer. Otherwise it will be undefined.
   *
   * For example, Seqs returned from `map()` or `reverse()`
   * preserve the size of the original `Seq` while `filter()` does not.
   *
   * Note: `Range`, `Repeat` and `Seq`s made from `Array`s and `Object`s will
   * always have a size.
   */
  readonly size: number | undefined;


  // Force evaluation

  /**
   * Because Sequences are lazy and designed to be chained together, they do
   * not cache their results. For example, this map function is called a total
   * of 6 times, as each `join` iterates the Seq of three values.
   *
   *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x)
   *     squares.join() + squares.join()
   *
   * If you know a `Seq` will be used multiple times, it may be more
   * efficient to first cache it in memory. Here, the map function is called
   * only 3 times.
   *
   *     var squares = Seq([ 1, 2, 3 ]).map(x => x * x).cacheResult()
   *     squares.join() + squares.join()
   *
   * Use this method judiciously, as it must fully evaluate a Seq which can be
   * a burden on memory and possibly performance.
   *
   * Note: after calling `cacheResult`, a Seq will always have a `size`.
   */
  cacheResult(): this;

  // Sequence algorithms

  /**
   * Returns a new Seq with values passed through a
   * `mapper` function.
   *
   * ```js
   * const { Seq } = require('immutable')
   * Seq([ 1, 2 ]).map(x => 10 * x)
   * // Seq [ 10, 20 ]
   * ```
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Seq<K, M>;

  /**
   * Returns a new Seq with values passed through a
   * `mapper` function.
   *
   * ```js
   * const { Seq } = require('immutable')
   * Seq([ 1, 2 ]).map(x => 10 * x)
   * // Seq [ 10, 20 ]
   * ```
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   * Note: used only for sets.
   */
  map<M>(
  mapper: (value: V, key: K, iter: this) => M,
  context?: any)
  : Seq<M, M>;

  /**
   * Flat-maps the Seq, returning a Seq of the same type.
   *
   * Similar to `seq.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: V, key: K, iter: this) => Iterable<M>,
  context?: any)
  : Seq<K, M>;

  /**
   * Flat-maps the Seq, returning a Seq of the same type.
   *
   * Similar to `seq.map(...).flatten(true)`.
   * Note: Used only for sets.
   */
  flatMap<M>(
  mapper: (value: V, key: K, iter: this) => Iterable<M>,
  context?: any)
  : Seq<M, M>;

  /**
   * Returns a new Seq with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends V>(
  predicate: (value: V, key: K, iter: this) => value is F,
  context?: any)
  : Seq<K, F>;
  filter(
  predicate: (value: V, key: K, iter: this) => any,
  context?: any)
  : this;}


declare function serializeAnnotation(annotation: InkAnnotation): AnnotationBackendJSON<InkAnnotationJSON>;

declare function serializeAnnotation(annotation: LineAnnotation): AnnotationBackendJSON<LineAnnotationJSON>;

declare function serializeAnnotation(annotation: RectangleAnnotation): AnnotationBackendJSON<RectangleAnnotationJSON>;

declare function serializeAnnotation(annotation: EllipseAnnotation): AnnotationBackendJSON<EllipseAnnotationJSON>;

declare function serializeAnnotation(annotation: PolygonAnnotation): AnnotationBackendJSON<PolygonAnnotationJSON>;

declare function serializeAnnotation(annotation: PolylineAnnotation): AnnotationBackendJSON<PolylineAnnotationJSON>;

declare function serializeAnnotation(annotation: TextAnnotation): AnnotationBackendJSON<TextAnnotationJSON>;

declare function serializeAnnotation(annotation: NoteAnnotation): AnnotationBackendJSON<NoteAnnotationJSON>;

declare function serializeAnnotation(annotation: StampAnnotation): AnnotationBackendJSON<StampAnnotationJSON, 'color'>;

declare function serializeAnnotation(annotation: ImageAnnotation): AnnotationBackendJSON<ImageAnnotationJSON>;

declare function serializeAnnotation(annotation: MediaAnnotation): AnnotationBackendJSON<MediaAnnotationJSON>;

declare function serializeAnnotation(annotation: LinkAnnotation): AnnotationBackendJSON<LinkAnnotationJSON>;

declare function serializeAnnotation(annotation: WidgetAnnotation): AnnotationBackendJSON<WidgetAnnotationJSON>;

declare function serializeAnnotation(annotation: TextMarkupAnnotation): AnnotationBackendJSON<TextMarkupAnnotationJSON>;

declare function serializeAnnotation(annotation: RedactionAnnotation): AnnotationBackendJSON<RedactionAnnotationJSON>;

declare function serializeAnnotation(annotation: CommentMarkerAnnotation): AnnotationBackendJSON<CommentMarkerAnnotationJSON>;

declare function serializeAnnotation(annotation: UnknownAnnotation): AnnotationBackendJSON<UnknownAnnotationJSON>;

declare function serializeAnnotation(annotation: AnnotationsUnion): AnnotationsBackendJSONUnion;

declare type SerializedAdditionalActionsType = { [key in
ActionTriggerEventType | FormFieldEventTriggerType | FormFieldInputEventTriggerType | WidgetActionTriggerEventType as string]?: {
  type: string;
  [key: string]: unknown;} };

declare type SerializedJSON = {
  skippedPdfObjectIds?: number[];
  annotations?: AnnotationJSONUnion[];
  formFields?: FormFieldJSON[];
  skippedPdfFormFieldIds?: number[];
  formFieldValues?: Record<string, any>[];
  comments?: Record<string, any>[];
  skippedComments?: number[];
  attachments?: Record<string, {
    binary: string;
    contentType: string;}>;

  skippedPdfBookmarkIds?: string[];
  bookmarks?: BookmarkJSON[];};

declare function serializeFormField(formField: FormField): FormFieldJSON;

/**
 * `serializePreset` serializes annotation properties without doing any validation.
 * Unknown properties are serialized without any transformation. Invalid (`null`)
 * values are removed.
 * Used by Native to serialize annotation presets.
 *
 * https://github.com/PSPDFKit/PSPDFKit-Web/issues/2229
 */
declare function serializePreset(preset: AnnotationPreset): Record<string, any>;

declare type ServerAuthPayloadConfiguration = {
  /**
   * ***required, Server only***
   *
   * The `authPayload` is the configuration for the JSON Web Token.
   *
   * Please refer to {@link https://www.nutrient.io/guides/document-engine/viewer/client-authentication/|this guide article} for information how to create valid JWTs.
   * @example
   * NutrientViewer.load({ authPayload: { jwt: 'xxx.xxx.xxx' }, ... });
   * @public
   * @server
   * @instance
   * @member {object} authPayload
   * @memberof NutrientViewer.Configuration
   */
  authPayload: {
    jwt: string;};};

export declare type ServerConfiguration = SharedConfiguration & {
  /**
   * ***required, Server only***
   *
   * Nutrient Instant is a real-time collaboration platform that enables your users to annotate documents
   * using NutrientViewer across iOS, Android and their browser simultaneously. Annotations synchronized
   * using Nutrient Instant are pushed in real-time to every connected device.
   *
   * All document editing features, such as text annotations, ink drawing or text highlighting, are instantly saved and propagated across all connected devices.
   *
   * When this flag is set to `true`, different parts of the API will also be enabled, for example:
   * {@link NutrientViewer.Instance#connectedInstantClients}.
   *
   * This value does not have a default. You either need to define `instant: true` or
   * `instant: false` in your NutrientViewer configuration.
   * @example
   * NutrientViewer.load({ instant: true, ... });
   * @public
   * @server
   * @instance
   * @member {boolean} instant
   * @memberof NutrientViewer.Configuration
   */
  instant: Instant[keyof Instant];




















  anonymousComments?: IAnonymousCommentMode;
  /**
   * ***optional, Server only***
   *
   * A list of users that can be mentioned in comments.
   * @example
   * NutrientViewer.load({ mentionableUsers: [
   *   { id: "1", name: "John Doe", displayName: "John", avatar: "https://example.com/avatar.png", description: "john.doe@gmail.com" },
   *   { id: "2", name: "Jane Doe", displayName: "Jane", avatar: "https://example.com/avatar.png", description: "jane.doe@gmail.com" },
   *   { id: "3", name: "John Smith", displayName: "John", avatar: "https://example.com/avatar.png", description: "john.smith@gmail.com" },
   * ] });
   * @public
   * @instance
   * @member {Array<MentionableUser>} mentionableUsers
   * @memberof NutrientViewer.Configuration
   */
  mentionableUsers?: Array<MentionableUser>;
  /**
   * ***optional, Server only***
   *
   * The maximum number of users that will be shown in the suggestion dropdown
   * when mentioning a user in a comment.
   * @example
   * NutrientViewer.load({ maxMentionSuggestions: 5 });
   * @public
   * @instance
   * @member {number} maxMentionSuggestions
   * @memberof NutrientViewer.Configuration
   * @default 5
   */
  maxMentionSuggestions?: number;
  /**
   * ***required, Server only***
   *
   * The document ID for the document that should be displayed. You can create a document via the
   * Nutrient Document Engine API.
   *
   * Please refer to the Server API documentation for a guide on how to create valid documents.
   * @example
   * NutrientViewer.load({ documentId: '85203', ... });
   * @public
   * @server
   * @instance
   * @member {string} documentId
   * @memberof NutrientViewer.Configuration
   */
  documentId?: string;} &
(ServerAuthPayloadConfiguration | ServerSessionAuthConfiguration);

declare type ServerSessionAuthConfiguration = {
  /**
   * ***Server only***
   *
   * The `session` token used to authenticate Web Viewer session with DWS Viewer API or Document Engine.
   * @example
   * NutrientViewer.load({ session: 'xxx.xxx.xxx' });
   * @public
   * @server
   * @instance
   * @member {string} session
   * @memberof NutrientViewer.Configuration
   */
  session: string;};

/**
 * *Server only*
 *
 * Contains information to be optionally passed along to the signing service when
 * {@link `NutrientViewer.Instance.signDocument()`} is called in server mode, so it can be used
 * for identification, security or any other purpose.
 *
 * To learn more about how to set up the signing service check
 * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#setting-up-digital-signatures-on-the-server|this guide article}.
 *
 * This is the property that can be included in the object:
 * @example <caption>Passing a string for the signing service when signing (Server)</caption>
 * instance.signDocument(null, {
 *   signingToken: "My security token"
 * })
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @property {string} signingToken - Token to be passed by the backend to the signing service.
 * @summary Data for the digital signing service.
 * @interface ServerSigningServiceData
 * @memberof NutrientViewer
 */
declare type ServerSigningServiceData = {
  signingToken: string;};


/**
 * This describes the content editor session returned by {@link NutrientViewer.Instance#beginContentEditingSession}.
 *
 * It is independent of the content editor UI session, which is used to display the content editor UI. At one time, only one content editing session can be active, either this session or a UI session. Starting the UI session will deactivate this session.
 * Also, if the contents of an opened document are modified while this session is active, the session will be deactivated.
 *
 * Using this requires a license that includes the Content Editor component.
 * @public
 * @memberof NutrientViewer.ContentEditing
 * @interface Session
 */
/**
 * Completes the current editing session and saves all changes. Document will reload.
 * @returns A promise that resolves when the changes have been successfully saved.
 * @public
 * @function commit
 * @memberof NutrientViewer.ContentEditing.Session
 * @instance
 */
/**
 * Completes the current editing session without persisting any changes.
 * @returns A promise that resolves when the session is successfully discarded.
 * @public
 * @function discard
 * @memberof NutrientViewer.ContentEditing.Session
 * @instance
 */
/**
 * Retrieves all text blocks for a specific page.
 * @param {number} pageIndex - The index of the page to retrieve text blocks for.
 * @returns {Promise.<NutrientViewer.ContentEditing.TextBlock[]>} A promise that resolves with an array of TextBlocks for the given page.
 * @public
 * @function getTextBlocks
 * @memberof NutrientViewer.ContentEditing.Session
 * @throws {NutrientViewer.Error} If the page index is out of bounds.
 * @instance
 */
/**
 * Indicates whether the session is currently active.
 * @public
 * @instance
 * @member {boolean} active
 * @memberof NutrientViewer.ContentEditing.Session
 */
/**
 * Updates an array of text blocks with partial data.
 *
 * If a text block for the corresponding page wasn't previously loaded via `getTextBlocks`,
 * it will be loaded in the background automatically.
 * @param {NutrientViewer.ContentEditing.UpdatedTextBlock[]} textBlocks - Array of UpdatedTextBlock objects to update.
 *  Each object must be identified through its ID. Other fields are optional and will be updated in the document if not null.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @public
 * @function updateTextBlocks
 * @memberof NutrientViewer.ContentEditing.Session
 * @throws {NutrientViewer.Error} If the ID of any text block is missing or doesn't exist.
 * @instance
 */
declare type Session = {
  commit: () => Promise<void>;
  discard: () => Promise<void>;
  getTextBlocks: (pageIndex: number) => Promise<TextBlock_2[]>;
  updateTextBlocks: (textBlocks: UpdatedTextBlock[]) => Promise<void>;
  active: boolean;};


/**
 * Returns a copy of the collection with the value at key set to the provided
 * value.
 *
 * A functional alternative to `collection.set(key, value)` which will also
 * work with plain Objects and Arrays as an alternative for
 * `collectionCopy[key] = value`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { set } = require('immutable')
 * const originalArray = [ 'dog', 'frog', 'cat' ]
 * set(originalArray, 1, 'cow') // [ 'dog', 'cow', 'cat' ]
 * console.log(originalArray) // [ 'dog', 'frog', 'cat' ]
 * const originalObject = { x: 123, y: 456 }
 * set(originalObject, 'x', 789) // { x: 789, y: 456 }
 * console.log(originalObject) // { x: 123, y: 456 }
 * ```
 */
declare function set<K, V, C extends Collection<K, V>>(collection: C, key: K, value: V): C;

declare function set<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps>(record: C, key: K, value: TProps[K]): C;

declare function set<V, C extends Array<V>>(collection: C, key: number, value: V): C;

declare function set<C, K extends keyof C>(object: C, key: K, value: C[K]): C;

declare function set<V, C extends {[key: string]: V;}>(collection: C, key: string, value: V): C;

/**
 * Create a new immutable Set containing the values of the provided
 * collection-like.
 *
 * Note: `Set` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Set_2(): Set_2<any>;

declare function Set_2<T>(): Set_2<T>;

declare function Set_2<T>(collection: Iterable<T>): Set_2<T>;

/**
 * A Collection of unique values with `O(log32 N)` adds and has.
 *
 * When iterating a Set, the entries will be (value, value) pairs. Iteration
 * order of a Set is undefined, however is stable. Multiple iterations of the
 * same Set will iterate in the same order.
 *
 * Set values, like Map keys, may be of any type. Equality is determined using
 * `Immutable.is`, enabling Sets to uniquely include other Immutable
 * collections, custom value types, and NaN.
 */
declare namespace Set_2 {

  /**
   * True if the provided value is a Set
   */
  function isSet(maybeSet: any): maybeSet is Set_2<any>;

  /**
   * Creates a new Set containing `values`.
   */
  function of<T>(...values: Array<T>): Set_2<T>;

  /**
   * `Set.fromKeys()` creates a new immutable Set containing the keys from
   * this Collection or JavaScript Object.
   */
  function fromKeys<T>(iter: Collection<T, any>): Set_2<T>;
  function fromKeys(obj: {[key: string]: any;}): Set_2<string>;

  /**
   * `Set.intersect()` creates a new immutable Set that is the intersection of
   * a collection of other sets.
   *
   * ```js
   * const { Set } = require('immutable')
   * const intersected = Set.intersect([
   *   Set([ 'a', 'b', 'c' ])
   *   Set([ 'c', 'a', 't' ])
   * ])
   * // Set [ "a", "c"" ]
   * ```
   */
  function intersect<T>(sets: Iterable<Iterable<T>>): Set_2<T>;

  /**
   * `Set.union()` creates a new immutable Set that is the union of a
   * collection of other sets.
   *
   * ```js
   * const { Set } = require('immutable')
   * const unioned = Set.union([
   *   Set([ 'a', 'b', 'c' ])
   *   Set([ 'c', 'a', 't' ])
   * ])
   * // Set [ "a", "b", "c", "t"" ]
   * ```
   */
  function union<T>(sets: Iterable<Iterable<T>>): Set_2<T>;}


declare interface Set_2<T> extends Collection.Set<T> {

  /**
   * The number of items in this Set.
   */
  readonly size: number;

  // Persistent changes

  /**
   * Returns a new Set which also includes this value.
   *
   * Note: `add` can be used in `withMutations`.
   */
  add(value: T): this;

  /**
   * Returns a new Set which excludes this value.
   *
   * Note: `delete` can be used in `withMutations`.
   *
   * Note: `delete` **cannot** be safely used in IE8, use `remove` if
   * supporting old browsers.
   *
   * @alias remove
   */
  delete(value: T): this;
  remove(value: T): this;

  /**
   * Returns a new Set containing no values.
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): this;

  /**
   * Returns a Set including any value from `collections` that does not already
   * exist in this Set.
   *
   * Note: `union` can be used in `withMutations`.
   * @alias merge
   * @alias concat
   */
  union<C>(...collections: Array<Iterable<C>>): Set_2<T | C>;
  merge<C>(...collections: Array<Iterable<C>>): Set_2<T | C>;
  concat<C>(...collections: Array<Iterable<C>>): Set_2<T | C>;

  /**
   * Returns a Set which has removed any values not also contained
   * within `collections`.
   *
   * Note: `intersect` can be used in `withMutations`.
   */
  intersect(...collections: Array<Iterable<T>>): this;

  /**
   * Returns a Set excluding any values contained within `collections`.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { OrderedSet } = require('immutable')
   * OrderedSet([ 1, 2, 3 ]).subtract([1, 3])
   * // OrderedSet [2]
   * ```
   *
   * Note: `subtract` can be used in `withMutations`.
   */
  subtract(...collections: Array<Iterable<T>>): this;


  // Transient changes

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new Set with values passed through a
   * `mapper` function.
   *
   *     Set([1,2]).map(x => 10 * x)
   *     // Set [10,20]
   */
  map<M>(
  mapper: (value: T, key: T, iter: this) => M,
  context?: any)
  : Set_2<M>;

  /**
   * Flat-maps the Set, returning a new Set.
   *
   * Similar to `set.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: T, iter: this) => Iterable<M>,
  context?: any)
  : Set_2<M>;

  /**
   * Returns a new Set with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, key: T, iter: this) => value is F,
  context?: any)
  : Set_2<F>;
  filter(
  predicate: (value: T, key: T, iter: this) => any,
  context?: any)
  : this;}

export { Set_2 as Set };

declare type SetDocumentEditorFooterFunction = (currentState: DocumentEditorFooterItem[]) => DocumentEditorFooterItem[];

declare type SetDocumentEditorToolbarFunction = (currentState: DocumentEditorToolbarItem[]) => DocumentEditorToolbarItem[];

/**
 * Returns a copy of the collection with the value at the key path set to the
 * provided value.
 *
 * A functional alternative to `collection.setIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { setIn } = require('immutable')
 * const original = { x: { y: { z: 123 }}}
 * setIn(original, ['x', 'y', 'z'], 456) // { x: { y: { z: 456 }}}
 * console.log(original) // { x: { y: { z: 123 }}}
 * ```
 */
declare function setIn<C>(collection: C, keyPath: Iterable<any>, value: any): C;

declare type SetSearchStateFunction = (currentState: SearchState) => SearchState;

declare type SetStampAnnotationTemplatesFunction = (currentState: Array<StampAnnotation | ImageAnnotation>) => Array<StampAnnotation | ImageAnnotation>;

declare type SetToolbarFunction = (currentState: ToolbarItem_2[]) => ToolbarItem_2[];

declare type SetToolbarItemsFunction = (currentState: TextComparisonToolbarItem[]) => TextComparisonToolbarItem[];

/**
 * A method the returns the measurement value and label of the annotation.
 * @public
 * @instance
 * @function getMeasurementDetails
 * @returns {object}
 * @memberof NutrientViewer.Annotations.ShapeAnnotation
 * @example
 * const { value, label } = annotation.getMeasurementDetails();
 *
 * console.log(value, label);
 */
/**
 * @classdesc
 * Base annotation type from which all shape annotations inherit. You can not directly instantiate
 * from this type.
 *
 * Shape annotations are used to draw different shapes on a page: lines, rectangles, ellipses,
 * polylines and polygons.
 *
 * Shapes which have start and ending points such as lines and polylines can have optional line
 * start and line ending markers which can be filled with an optional fill color.
 *
 * Shapes which define a closed area such as rectangles, ellipses and polygons, can have an optional
 * fill color for the enclosed area.
 *
 * Shapes lines can be solid or dashed with a dash pattern chosen from a predefined list.
 *
 * Shape annotations without a fill color or with transparent fill color are only selectable
 * around their visible lines or colored areas. This means that you can create a page full of
 * these annotations while annotations behind them are still selectable.
 *
 * Right now, shape annotations are implemented using SVG images. This behavior is subject to change.
 *
 * For interacting with a shape annotation, please look at the subtypes:
 *
 * - {@link NutrientViewer.Annotations.LineAnnotation}
 * - {@link NutrientViewer.Annotations.RectangleAnnotation}
 * - {@link NutrientViewer.Annotations.EllipseAnnotation}
 * - {@link NutrientViewer.Annotations.PolylineAnnotation}
 * - {@link NutrientViewer.Annotations.PolygonAnnotation}
 * @example <caption>Create a shape annotation (line) that displays a line</caption>
 * const annotation = new NutrientViewer.Annotations.LineAnnotation({
 *   pageIndex: 0,
 *   startPoint: new NutrientViewer.Geometry.Point({ x: 95, y: 5 }),
 *   endPoint: new NutrientViewer.Geometry.Point({ x: 5,  y: 95}),
 *   strokeWidth: 4
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Base annotation type for all shape annotations.
 * @class ShapeAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 */
export declare abstract class ShapeAnnotation<T extends IShapeAnnotation = IShapeAnnotation> extends Annotation<T> {
  /**
   * Optional dash pattern used to draw the shape lines for dashed line style.
   * @public
   * @instance
   * @member {?Array<number>} strokeDashArray
   * @memberof NutrientViewer.Annotations.ShapeAnnotation
   */
  strokeDashArray: null | [number, number];
  /**
   * The width of the line in page size pixels. By default, we use values between 1 and 40 in
   * the UI.
   *
   * The stroke width will scale when you zoom in.
   * @public
   * @instance
   * @member {number} strokeWidth
   * @memberof NutrientViewer.Annotations.ShapeAnnotation
   * @default 5
   */
  strokeWidth: number;
  /**
   * A {@link NutrientViewer.Color} for the shape lines
   * @public
   * @instance
   * @member {?NutrientViewer.Color} strokeColor
   * @memberof NutrientViewer.Annotations.ShapeAnnotation
   * @default Color.BLUE
   */
  strokeColor: null | Color;
  /**
   * A {@link NutrientViewer.Color} to fill the interior of closed shapes (ellipses, rectangles and polygons)
   * or start and / or end line caps of open shapes (lines and polylines).
   * @public
   * @instance
   * @member {?NutrientViewer.Color} fillColor
   * @memberof NutrientViewer.Annotations.ShapeAnnotation
   * @default null
   */
  fillColor: null | Color;
  /**
   * The {@link NutrientViewer.MeasurementPrecision} used to set the precision for the annotation.
   * @public
   * @instance
   * @member {NutrientViewer.MeasurementPrecision} measurementPrecision
   * @memberof NutrientViewer.Annotations.ShapeAnnotation
   * @default NutrientViewer.MeasurementPrecision.TWO
   */
  measurementPrecision: null | IMeasurementPrecision;
  /**
   * The {@link NutrientViewer.MeasurementScale} used to set the scale for the annotation.
   * @public
   * @instance
   * @member {NutrientViewer.MeasurementScale} measurementScale
   * @memberof NutrientViewer.Annotations.ShapeAnnotation
   */
  measurementScale: null | MeasurementScale;
  static readableName: string;
  static defaultValues: IObject;
  /**
   * A method that tels whether the annotation is a measurement annotation.
   * @public
   * @instance
   * @function isMeasurement
   * @returns {boolean}
   * @memberof NutrientViewer.Annotations.ShapeAnnotation
   */
  isMeasurement(): boolean;
  getMeasurementDetails: () => {
    value: number;
    label: string;};}

declare type ShapeAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  strokeWidth: number;
  strokeColor: string | null;
  fillColor: string | null;
  strokeDashArray?: [number, number] | null;
  measurementPrecision?: IMeasurementPrecision | null;
  measurementScale?: MeasurementScaleJSON | null;
  lineWidth?: number | null;};

declare abstract class ShapeAnnotationSerializer extends AnnotationSerializer {
  annotation: ShapeAnnotationsUnion;
  toJSON(): ShapeAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<ShapeAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): {
    strokeWidth: number | null;
    strokeColor: Color | null;
    fillColor: Color | null;
    strokeDashArray: [number, number] | null | undefined;
    measurementPrecision: IMeasurementPrecision | null | undefined;
    measurementScale: MeasurementScale | null;
    group?: string | null | undefined;
    canSetGroup?: boolean | undefined;
    isEditable?: boolean | undefined;
    isDeletable?: boolean | undefined;
    blendMode?: IBlendMode | undefined;
    id: string | null;
    name: string | null;
    subject: string | null;
    pdfObjectId: number | null;
    pageIndex: number;
    opacity: number;
    boundingBox: Rect;
    noPrint: boolean;
    noZoom: boolean;
    noRotate: boolean;
    noView: boolean;
    hidden: boolean;
    locked: boolean;
    lockedContents: boolean;
    readOnly: boolean;
    action: Action | null | undefined;
    note: string | null;
    createdAt: Date;
    updatedAt: Date;
    creatorName: string | null;
    customData: Record<string, unknown> | null;
    isCommentThreadRoot: boolean;
    isAnonymous: boolean;};

  _pointsToJSON(): Array<[number, number]>;
  static _JSONToPoints(pointsJSON: Array<[number, number]>): List<Point>;
  static _JSONLinesToPoints(linesJSON: {
    points: Array<Array<[number, number]>>;
    intensities: Array<Array<number>>;})
  : List<Point>;}

export declare type ShapeAnnotationsUnion = PolylineAnnotation | PolygonAnnotation | LineAnnotation | RectangleAnnotation | EllipseAnnotation;

declare type Shared = Omit<ToolItem, 'selected' | 'type'> & {
  onPress?: (nativeEvent: MouseEvent, id?: string | undefined) => void;
  iconClassName?: string;
  onIconPress?: (nativeEvent: MouseEvent, id?: string) => void;};

/**
 * This describes the properties of a {@link NutrientViewer.load} configuration.
 * @public
 * @memberof NutrientViewer
 * @interface Configuration
 */
declare type SharedConfiguration = {
  /**
   * ***required***
   *
   * Selector or element where Nutrient Web SDK will be mounted.
   *
   * The element must have a `width` and `height` that's greater than zero. Nutrient Web SDK adapts to the dimensions
   * of this element. This way, applying responsive rules will work as expected.
   *
   * The element can be styled using relative values as you would expect it to (CSS media queries
   * are encouraged).
   * @example
   * // In your HTML
   * <div class="foo"></div>
   *
   * // In your JavaScript
   * NutrientViewer.load({ container: '.foo', ... });
   * // or
   * const element = document.getElementsByClassName('foo')[0]
   * NutrientViewer.load({ container: element, ... });
   * @public
   * @instance
   * @member {string|HTMLElement} container
   * @memberof NutrientViewer.Configuration
   */
  container: string | HTMLElement;
  /**
   * *optional*
   *
   * This property allows you to set an initial viewing state for the NutrientViewer instance.
   *
   * This can be used to customize behavior before the application mounts (e.g Scroll to a specific
   * page or use the SINGLE_PAGE mode)
   *
   * It will default to a view state with its default properties (see {@link NutrientViewer.ViewState}).
   *
   * If the initial view state is invalid (for example, when you define a page index that does not
   * exist), the method will fall back to the default value for the invalid property. This means when
   * you set the initial `currentPageIndex` to 5 but the document only has three pages, NutrientViewer will
   * start on the first page but will still apply other rules defined in this initial view state.
   * @example
   * const initialViewState = new NutrientViewer.ViewState({ currentPageIndex: 2 });
   * NutrientViewer.load({ initialViewState: initialViewState, ... });
   * @public
   * @instance
   * @member {?NutrientViewer.ViewState} initialViewState
   * @memberof NutrientViewer.Configuration
   * @default Default {@link NutrientViewer.ViewState}
   */
  initialViewState?: ViewState;
  /**
   * *optional*
   *
   * This allows you to overwrite the auto-detected URL for all NutrientViewer assets. This setting is
   * necessary when you load Nutrient Web SDK JavaScript from a different URL.
   *
   * If your assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   * @example
   * NutrientViewer.load({ baseUrl: 'https://public-server.pspdfkit.com/' });
   * @instance
   * @public
   * @member {?string} baseUrl
   * @memberof NutrientViewer.Configuration
   * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
   */
  baseUrl?: string;
  /**
   * *optional*
   *
   * This allows you to overwrite the auto-detected Nutrient Document Engine URL. This setting is necessary
   * when your Nutrient Document Engine is located under a different URL.
   * @example
   * NutrientViewer.load({ serverUrl: 'https://public-server.pspdfkit.com/' })
   * @instance
   * @public
   * @member {?string} serverUrl
   * @memberof NutrientViewer.Configuration
   * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
   */
  serverUrl?: string;
  /**
   * *optional*
   *
   * This property allows you to change the size of the tiles used to render the document, in pixels. The bigger the tile, the fewer requests is made, but each tile will take longer to render.
   *
   * This is useful for situations where you want to reduce the number of requests made to the server.
   *
   * By default, the tile size is set to 512px in Nutrient Document Engine (server-backed) deployment, and 1536px in Standalone deployment.
   * @example
   * NutrientViewer.load({
   *   tileSize: 1024
   * })
   * @public
   * @instance
   * @member {?number} tileSize
   * @memberof NutrientViewer.Configuration
   * @default 512 in Nutrient Document Engine (server-backed), 1536 in Standalone
   */
  tileSize?: number;
  /**
   * *optional*
   *
   * This will load your custom CSS as a `<link rel="stylesheet">` inside the NutrientViewer component. This
   * is necessary to isolate styling of the viewer from the outside application and avoid external
   * stylesheets overwriting important viewer attributes.
   *
   * An array is allowed to load multiple stylesheets. The order in the array will also be the
   * order in which the stylesheets get loaded.
   *
   * The array will be copied by us on start up time, which means that you can not mutate it
   * after the viewer has started.
   *
   * More information on how to style Nutrient Web SDK can be found in our guides.
   * @example
   * NutrientViewer.load({
   *   styleSheets: [
   *     'https://example.com/my-stylesheet.css',
   *     'https://example.com/other-stylesheet.css'
   *   ]
   * })
   * @public
   * @instance
   * @member {?Array.<string>} styleSheets
   * @memberof NutrientViewer.Configuration
   * @default []
   */
  styleSheets?: Array<string>;
  /**
   * *optional*
   *
   * This property allows you to set an initial list of toolbar items for the NutrientViewer instance.
   * This can be used to customize the main toolbar before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultToolbarItems}.
   * @example
   * const toolbarItems = NutrientViewer.defaultToolbarItems;
   * toolbarItems.reverse();
   * NutrientViewer.load({ toolbarItems: toolbarItems, ... });
   * @public
   * @instance
   * @member {?Array.<NutrientViewer.ToolbarItem>} toolbarItems
   * @memberof NutrientViewer.Configuration
   * @default Default {@link NutrientViewer.defaultToolbarItems}
   */
  toolbarItems?: Array<ToolbarItem>;
  /**
   * *optional*
   *
   * This property allows you to change a default list of annotation presets for the NutrientViewer instance.
   * This can be used to customize the main toolbar buttons' behaviour before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultAnnotationPresets}.
   * @example
   * const annotationPresets = NutrientViewer.defaultAnnotationPresets
   * annotationPresets.mypreset = {
   *   strokeWidth: 10,
   * };
   * NutrientViewer.load({ annotationPresets, ... });
   * @public
   * @instance
   * @member {?object} annotationPresets
   * @memberof NutrientViewer.Configuration
   * @default Default {@link NutrientViewer.defaultAnnotationPresets}
   */
  annotationPresets?: Record<AnnotationPresetID, AnnotationPreset>;
  /**
   * *optional*
   *
   * This property allows you to set an initial list of stamp and image annotation templates for the NutrientViewer instance.
   * This can be used to customize the list of available stamp and image annotation templates that will be available in the stamps picker UI before the application mounts.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultStampAnnotationTemplates}.
   * @example
   * const stampAnnotationTemplates = NutrientViewer.defaultStampAnnotationTemplates
   * const stampAnnotationTemplates.push(new NutrientViewer.Annotations.StampAnnotation({
   *   stampType: "Custom",
   *   title: "My custom text",
   *   boundingBox: new NutrientViewer.Geometry.Rect({
   *     left: 0,
   *     top: 0,
   *     width: 300,
   *     height: 100
   *   })
   * }));
   * NutrientViewer.load({ stampAnnotationTemplates, ... });
   * @public
   * @instance
   * @member {Array<NutrientViewer.Annotations.StampAnnotation | NutrientViewer.Annotations.ImageAnnotation>} stampAnnotationTemplates
   * @memberof NutrientViewer.Configuration
   * @default Default {@link NutrientViewer.defaultStampAnnotationTemplates}
   */
  stampAnnotationTemplates?: Array<StampAnnotation | ImageAnnotation>;
  /**
   * *optional*
   *
   * This property allows you to set the auto save mode, which controls when annotations or form field
   * values get saved.
   *
   * When using `instant: true`, the default auto save mode is IMMEDIATE, otherwise it's
   * INTELLIGENT.
   * @example
   * NutrientViewer.load({ autoSaveMode: NutrientViewer.AutoSaveMode.INTELLIGENT })
   * @public
   * @instance
   * @member {?NutrientViewer.AutoSaveMode} autoSaveMode
   * @memberof NutrientViewer.Configuration
   */
  autoSaveMode?: IAutoSaveMode;
  /**
   * *optional*
   *
   * This property allows you to disable high quality printing, which will print the document in a higher
   * resolution (300dpi) than the default (150dpi). When not explicitly set, high quality printing is disabled
   * for iOS and Android devices on standalone deployments to improve performances.
   * @example
   * NutrientViewer.load({ disableHighQualityPrinting: true })
   * @default false
   * @public
   * @instance
   * @member {?boolean} disableHighQualityPrinting
   * @memberof NutrientViewer.Configuration
   */
  disableHighQualityPrinting?: boolean;
  /**
   * *optional*
   *
   * This property allows you to set the {@link NutrientViewer.PrintMode} to use.
   * @example
   * NutrientViewer.load({ printMode: NutrientViewer.PrintMode.DOM })
   * @public
   * @instance
   * @member {?NutrientViewer.PrintMode} printMode
   * @default NutrientViewer.PrintMode.DOM
   * @memberof NutrientViewer.Configuration
   * deprecated
   */
  printMode?: IPrintMode;
  /**
   * *optional*
   *
   * Allows to set different printing options like mode and printing quality.
   * @public
   * @instance
   * @member {?object} printOptions
   * @property {NutrientViewer.PrintMode} mode {@link NutrientViewer.PrintMode} mode to use for printing.
   * @property {NutrientViewer.PrintQuality} quality {@link NutrientViewer.PrintQuality} The option to control the quality of the printing.
   * @memberof NutrientViewer.Configuration
   * @default { mode: NutrientViewer.PrintMode.DOM, quality: NutrientViewer.PrintQuality.HIGH }
   */
  printOptions?: {
    mode?: IPrintMode;
    quality?: IPrintQuality;};

  /**
   * *optional*
   *
   * When this property is set to true, text in the document can not be highlighted.
   * @example
   * NutrientViewer.load({ disableTextSelection: true })
   * @public
   * @instance
   * @member {?boolean} disableTextSelection
   * @memberof NutrientViewer.Configuration
   */
  disableTextSelection?: boolean;
  /**
   * *optional*
   *
   * This property is used to force the disabling of form rendering and parsing, even if your license
   * would permit it.
   * @example
   * NutrientViewer.load({ disableForms: true })
   * @public
   * @instance
   * @member {?boolean} disableForms
   * @default false
   * @memberof NutrientViewer.Configuration
   */
  disableForms?: boolean;
  /**
   * Loads Nutrient Web SDK in Headless mode i.e. without a UI.
   * Some UI-specific APIs, like the Toolbars API, are not available in this mode
   * and, when used, will throw an error.
   * @example
   * NutrientViewer.load({
   *   headless: true,
   *   // ...
   * });
   * @public
   * @instance
   * @member {?boolean} headless
   * @memberof NutrientViewer.Configuration
   */
  headless?: boolean;
  /**
   * The initial `locale` (language) for the application.
   * All the available locales are defined in {@link NutrientViewer.I18n.locales}.
   * When a locale is not provided Nutrient Web SDK tries to autodetect the locale using `window.navigator.language`.
   * If the detected locale is not supported then the `en` locale is used instead.
   * @example
   * NutrientViewer.load({
   *   locale: 'de',
   *   // ...
   * });
   * @public
   * @instance
   * @member {?string} locale
   * @memberof NutrientViewer.Configuration
   */
  locale?: string;
  /**
   * *optional*
   *
   * Loads Ink Signatures when the UI displays them for the first time.
   *
   * Ink Signatures are special Ink Annotations whose `pageIndex` and `boundingBox` are defined at creation time.
   * They can be converted to serializable objects with {@link NutrientViewer.Annotations.toSerializableObject} and stored as JSON using their InstantJSON format.
   * Serialized JSON annotations can be deserialized with `JSON.parse` and then converted to annotations with {@link NutrientViewer.Annotations.fromSerializableObject}.
   * @example <caption>Populate Ink Signatures on demand.</caption>
   * NutrientViewer.load({
   *   populateInkSignatures: () => {
   *    return fetch('/signatures')
   *       .then(r => r.json())
   *       .then(a => (
   *           NutrientViewer.Immutable.List(
   *             a.map(NutrientViewer.Annotations.fromSerializableObject))
   *           )
   *        );
   *   },
   *   // ...
   * });
   * @public
   * @instance
   * @default () => Promise.resolve(NutrientViewer.Immutable.List())
   * @member {?Function} populateInkSignatures
   * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.Annotations.InkAnnotation>>} A Promise that resolves to a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations.InkAnnotation InkAnnotation} that describe signatures.
   * @memberof NutrientViewer.Configuration
   * @deprecated
   */
  populateInkSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
  /**
   * *optional*
   *
   * Loads signatures when the UI displays them for the first time.
   *
   * Signatures can be added as special Ink Annotations or Image Annotations whose `pageIndex` and `boundingBox` are defined at creation time.
   * They can be converted to serializable objects with {@link NutrientViewer.Annotations.toSerializableObject} and stored as JSON using their InstantJSON format.
   * Serialized JSON annotations can be deserialized with `JSON.parse` and then converted to annotations with {@link NutrientViewer.Annotations.fromSerializableObject}.
   * @example <caption>Populate Signatures on demand.</caption>
   * NutrientViewer.load({
   *   populateStoredSignatures: () => {
   *    return fetch('/signatures')
   *       .then(r => r.json())
   *       .then(a => (
   *           NutrientViewer.Immutable.List(
   *             a.map(NutrientViewer.Annotations.fromSerializableObject))
   *           )
   *        );
   *   },
   *   // ...
   * });
   * @public
   * @instance
   * @default () => Promise.resolve(NutrientViewer.Immutable.List())
   * @member {?Function} populateStoredSignatures
   * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.Annotations.InkAnnotation | NutrientViewer.Annotations.ImageAnnotation>>} A Promise that resolves to a {@link NutrientViewer.Immutable.List} of {@link NutrientViewer.Annotations.InkAnnotation InkAnnotation} or {@link NutrientViewer.Annotations.ImageAnnotation ImageAnnotation} that describe signatures.
   * @memberof NutrientViewer.Configuration
   */
  populateStoredSignatures?: () => Promise<List<InkAnnotation | ImageAnnotation>>;
  /**
   * *optional*
   *
   * List of signature form fields names that are not allowed to store Ink Signatures.
   *
   * When a signature form field name is on this list, any new ink signature for this field that is created via the UI won't be stored.
   * @example <caption>.</caption>
   * NutrientViewer.load({
   *   formFieldsNotSavingSignatures: ['signatureField1'],
   *   // ...
   * });
   * @public
   * @instance
   * @default []
   * @member {?Array.<string>} formFieldsNotSavingSignatures
   * @memberof NutrientViewer.Configuration
   */
  formFieldsNotSavingSignatures?: Array<string>;
  /**
   * *optional*
   *
   * If set, it will try to unlock the PDF with the provided password when loading it. PDFs which do
   * not require a password won't open if this property is set.
   * @example
   * NutrientViewer.load({
   *   password: 'secr3t',
   *   // ...
   * });
   * @public
   * @instance
   * @member {?string} password
   * @memberof NutrientViewer.Configuration
   */
  password?: string;
  /**
   * *optional*
   *
   * By default, Nutrient Web SDK will initialize using [PDF Open Parameters](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf)
   * that are supported by our viewer. This option can be used if you want to opt-out from this
   * behavior.
   *
   * Setting a custom {@link NutrientViewer.ViewState} will overwrite these defaults. You can use
   * {@link NutrientViewer#viewStateFromOpenParameters} to manually extract those values.
   *
   * Currently, we only support the `page` parameter.
   * @example
   * NutrientViewer.load({
   *   disableOpenParameters: true,
   * });
   * @public
   * @instance
   * @member {?boolean} disableOpenParameters
   * @memberof NutrientViewer.Configuration
   */
  disableOpenParameters?: boolean;
  /**
   * *optional*
   *
   * Defines how often the password modal is presented after a wrong password has been entered. By
   * default, there won't be a limit for a regular Nutrient Web SDK installation.
   *
   * When running in the headless mode, this option is ignored as we don't have an interface where
   * we could request a password (This is the same as setting `maxPasswordRetries` to `0`).
   * @example
   * NutrientViewer.load({
   *   maxPasswordRetries: 3,
   *   // ...
   * });
   * @public
   * @instance
   * @member {?number} maxPasswordRetries
   * @memberof NutrientViewer.Configuration
   */
  maxPasswordRetries?: number;
  /**
   * *optional*
   *
   * When you're using a ServiceWorker, set this flag to `true` to be able to use Nutrient Web SDK
   * offline. Due to a browser bug, loading CSS files would bypass service workers and we therefore
   * load all CSS files via XHR and embed the content. Instead of loading files like SVGs by using
   * `url` in your CSS, please add them as base64, otherwise these requests would bypass the service
   * worker as well.
   * @example
   * NutrientViewer.load({
   *   enableServiceWorkerSupport: true,
   *   // ...
   * });
   * @public
   * @instance
   * @member {?boolean} enableServiceWorkerSupport
   * @memberof NutrientViewer.Configuration
   */
  enableServiceWorkerSupport?: boolean;
  /**
   * *optional*
   *
   * When copying of text is disabled, it's still possible to select text but copying either using the
   * shortcut or a context menu will have no effect.
   *
   * This is implemented internally by listening to the `copy` event and prevent the default
   * implementation.
   *
   * Please note that preventing text copying only provides limited security since the text will still
   * be transmitted to the client.
   * @example
   * NutrientViewer.load({
   *   preventTextCopy: true,
   *   // ...
   * });
   * @public
   * @instance
   * @member {?boolean} preventTextCopy
   * @memberof NutrientViewer.Configuration
   */
  preventTextCopy?: boolean;
  /**
   * *optional*
   *
   * This callback is called whenever a page is rendered or printed (only for
   * {@link NutrientViewer.PrintMode}.DOM). You can use it to render watermarks on the page.
   * @example
   * NutrientViewer.load({
   *   renderPageCallback: function(ctx, pageIndex, pageSize) {
   *     ctx.beginPath();
   *     ctx.moveTo(0, 0);
   *     ctx.lineTo(pageSize.width, pageSize.height);
   *     ctx.stroke();
   *
   *     ctx.font = "30px Comic Sans MS";
   *     ctx.fillStyle = "red";
   *     ctx.textAlign = "center";
   *     ctx.fillText(
   *       `This is page ${pageIndex + 1}`,
   *       pageSize.width / 2,
   *       pageSize.height / 2
   *     );
   *   }
   *   // ...
   * });
   * @instance
   * @public
   * @member {?NutrientViewer.RenderPageCallback} renderPageCallback The render page callback.
   * @memberof NutrientViewer.Configuration
   */
  renderPageCallback?: RenderPageCallback;
  /**
   * *optional*
   *
   * This callback is called whenever an annotation gets selected and can be used to
   * define and return an array of {@link NutrientViewer.ToolItem} that will be rendered in a tooltip
   * for the given annotation.
   *
   * If the callback returns an empty array then NutrientViewer won't show any tooltip for the selected annotation.
   * @public
   * @member {?NutrientViewer.AnnotationTooltipCallback} annotationTooltipCallback The callback called when an annotation is selected.
   * @memberof NutrientViewer.Configuration
   * @example
   * NutrientViewer.load({
   *   annotationTooltipCallback: function(annotation) {
   *     if (annotation instanceof NutrientViewer.Annotations.TextAnnotation) {
   *       var toolItem = {
   *         type: 'custom',
   *         title: 'tooltip item for text annotations',
   *         id: 'item-text-tooltip-annotation',
   *         className: 'TooltipItem-Text',
   *         onPress: function () {
   *           console.log(annotation)
   *         }
   *       }
   *       return [toolItem]
   *     } else {
   *       return []
   *     }
   *   }
   *   // ...
   * });
   */
  annotationTooltipCallback?: AnnotationTooltipCallback;
  /**
   * *optional*
   *
   * This property defines all annotation types that a user is able to modify. If it's not set, the
   * user is allowed to select, create, edit or delete every annotation type. By allowing only certain
   * annotation types for modification, you can be sure that there is no annotation type that gets
   * introduced in the future that your user is then able to modify.
   * @example <caption>Allow only the modification of ink annotations</caption>
   * NutrientViewer.load({
   *   editableAnnotationTypes: [NutrientViewer.Annotations.InkAnnotation],
   *   // ...
   * });
   * @public
   * @instance
   * @member {Array<AnnotationsUnion>} editableAnnotationTypes
   * @memberof NutrientViewer.Configuration
   */
  editableAnnotationTypes?: Array<Class<AnnotationsUnion>>;
  /**
   * *optional*
   *
   * By implementing this callback you have a fine grained control over which annotations are read-only.
   * This callback will receive the Annotation a user wants to modify and by returning `true` or
   * `false` you can define if the annotation should be read-only (`false`) or modifiable (`true`).
   *
   * This API will not disable ToolbarButtons for you, but will not allow the user to create
   * a new Annotation with the UI.
   * @example <caption>Only allow the modification of annotations from the same author</caption>
   * NutrientViewer.load({
   *   isEditableAnnotation: function(annotation) {
   *     return annotation.creatorName === myCurrentUser.name;
   *   },
   * });
   * @example <caption>Do not allow changing the value of a specific form field</caption>
   * NutrientViewer.load({
   *   isEditableAnnotation: function(annotation) {
   *     // Check if the annotation is associated with a specific form field
   *     if (
   *       annotation instanceof NutrientViewer.Annotations.WidgetAnnotation &&
   *       annotation.formFieldName === "MyFormField"
   *     ) {
   *       // If it is, disallow editing it
   *       return false;
   *     }
   *     // Otherwise, allow editing
   *     return true;
   *   },
   * });
   * @public
   * @instance
   * @member {?NutrientViewer.IsEditableAnnotationCallback} isEditableAnnotation
   * @memberof NutrientViewer.Configuration
   */
  isEditableAnnotation?: IsEditableAnnotationCallback;
  /**
   * *optional*
   * Allows to modify the default behavior when annotations are resized using the selection corner
   * handles by returning an object. This provides more control over whether annotations should keep their aspect ratio when resized, for example.
   * @example <caption>Unlock aspect ratio for the top left resize anchor</caption>
   * NutrientViewer.load({
   *   onAnnotationResizeStart: event => {
   *     return {
   *       maintainAspectRatio: event.resizeAnchor === 'TOP_LEFT',
   *     }
   *   }
   * });
   * @public
   * @instance
   * @member {NutrientViewer.AnnotationResizeStartCallback} onAnnotationResizeStart This callback is called whenever an annotation is about to be resized.
   * @param NutrientViewer.AnnotationResizeEvent
   * @returns NutrientViewer.AnnotationResizeStartCallbackConfiguration
   * @memberof NutrientViewer.Configuration
   */
  onAnnotationResizeStart?: AnnotationResizeStartCallback;
  /**
   * *optional*
   *
   * This object can include functions to be called when specific entities, like annotations,
   * are being rendered in the viewport, and return additional or replacement DOM content for
   * the entity instance.
   *
   * Currently only annotation's rendering can be customized using the `Annotation` key.
   *
   * If the callback returns null, the instance will be rendered normally.
   * @public
   * @member {?NutrientViewer.CustomRenderers} customRenderers Keyed list of callbacks called when entities are rendered.
   * @memberof NutrientViewer.Configuration
   * @example
   * NutrientViewer.load({
   *   customRenderers: {
   *     Annotation: ({ annotation }) => ({
   *       node: document.createElement('div').appendChild(document.createTextNode('Custom rendered!')),
   *       append: true,
   *     })
   *   }
   *   // ...
   * });
   */
  customRenderers?: CustomRenderers;
  /**
   * *optional*
   * Object with callback methods to be called when different elements of the UI are being rendered. Can return DOM content to be appended to them, as well as callback functions to individually process different parts of the element (items) as they're rendered.
   *
   * UI elements currently supported: sidebars.
   * @example
   * //Fully customized sidebar
   *
   * NutrientViewer.load({
   *   customUI: {
   *     [NutrientViewer.UIElement.Sidebar]: {
   *       [NutrientViewer.SidebarMode.CUSTOM]({ containerNode }) {
   *         // React portals can be used as well.
   *         // Or Vue portals, or any other framework API that allows appending components
   *         // to arbitrary DOM nodes.
   *         // Using vanilla JS, you can just append a node to parentNode.
   *         const div = document.createElement("div");
   *         div.append("My custom sidebar");
   *         containerNode.appendChild(div);
   *
   *         return {
   *           // By returning the same node that was provided, we opt-out of having the node
   *           // appended. If we return a different node, it will be appended to the provided node.
   *           node: containerNode,
   *         };
   *       }
   *     }
   *   }
   * });
   *
   * //Partially customized sidebar
   *
   * NutrientViewer.load({
   *   customUI: {
   *     [NutrientViewer.UIElement.Sidebar]: {
   *       [NutrientViewer.SidebarMode.ANNOTATIONS]({ containerNode }) {
   *         containerNode.style.padding = "0.5rem";
   *
   *         if (!containerNode.querySelector(".MyCustomSidebarComponentHeader")) {
   *           const header = document.createElement("div");
   *           header.classList.add("MyCustomSidebarComponentHeader");
   *           containerNode.prepend(header);
   *         }
   *
   *         return {
   *           node: containerNode,
   *           onRenderItem({ itemContainerNode, item: annotation }) {
   *             const footerAuthor = itemContainerNode.querySelector(".PSPDFKit-Sidebar-Annotations-Footer span");
   *             // Change the format of the footer text by prefixing it with "Creator: " and removing the date
   *             footerAuthor.textContent = `Creator: ${annotation.creatorName}`;
   *
   *             // Add aria label to the annotation icon
   *             const annotationIcon = itemContainerNode.querySelector(".PSPDFKit-Icon");
   *             annotationIcon.setAttribute("aria-label", `Icon for an annotation created by ${annotation.creatorName}.`);
   *           }
   *         };
   *       }
   *     }
   *   }
   * });
   * @public
   * @member {NutrientViewer.CustomUIConfiguration} customUI Custom UI Configuration.
   * @memberof NutrientViewer.Configuration
   */
  customUI?: CustomUI;
  /**
   * @typedef BUITheme
   * @see {@link https://www.nutrient.io/baseline-ui/?path=/docs/theming--docs#theme-object-structure | BUI Theme documentation}
   */
  /**
   * *optional*
   *
   * This property allows you to set theme to use for the UI. See {@link NutrientViewer.Theme}
   *
   * Note: You can customize the appearance of the UI using our public
   * CSS classes. Please refer to
   * {@link https://www.nutrient.io/guides/web/customizing-the-interface/css-customization/|this guide article}
   * for information on how to customize the appearance.
   * @example
   * NutrientViewer.load({ theme: NutrientViewer.Theme.DARK })
   * @public
   * @instance
   * @member {?(NutrientViewer.Theme | BUITheme)} theme
   * @default NutrientViewer.Theme.LIGHT
   * @memberof NutrientViewer.Configuration
   */
  theme?: ITheme | typeof themeContract;
  /**
   * *optional*
   *
   * This property allows you to configure where the toolbar is placed. If nothing
   * is configured, it will default to the top.
   * @example
   * NutrientViewer.load({ toolbarPlacement: NutrientViewer.ToolbarPlacement.TOP })
   * @public
   * @instance
   * @member {?NutrientViewer.ToolbarPlacement} toolbarPlacement
   * @default NutrientViewer.ToolbarPlacement.TOP
   * @memberof NutrientViewer.Configuration
   */
  toolbarPlacement?: IToolbarPlacement;
  /**
   * *optional*
   *
   * This property allows you to configure the minimum zoom level. The smallest
   * zoom level at a given time will be calculated based on the page proportions
   * and this option. This is not necessarily a hard limit. For example, in order
   * to zoom out to show the entire page, the actual minimum zoom may be lower.
   *
   * When omitted, the default is 0.5.
   * @example
   * NutrientViewer.load({ minDefaultZoomLevel: 0.1 })
   * @public
   * @instance
   * @member {?number} minDefaultZoomLevel
   * @default 0.5
   * @memberof NutrientViewer.Configuration
   */
  minDefaultZoomLevel?: number;
  /**
   * *optional*
   *
   * This property allows you to configure the maximum zoom level. The largest
   * zoom level at a given time will be calculated based on the page proportions
   * and this option. This is not necessarily a hard limit. For example, in order
   * to satisfy the 'fit to width' and 'fit to page' zoom modes, the actual
   * maximum zoom may be higher.
   *
   * When omitted, the default is 10.
   * @example
   * NutrientViewer.load({ maxDefaultZoomLevel: 20 })
   * @public
   * @instance
   * @member {?number} maxDefaultZoomLevel
   * @default 10
   * @memberof NutrientViewer.Configuration
   */
  maxDefaultZoomLevel?: number;
  /**
   * *optional*
   *
   * By implementing this callback you have a fine grained control over which comments are read-only.
   * This callback will receive the Comment a user wants to modify and by returning `true` or
   * `false` you can define if the comment should be read-only (`false`) or modifiable (`true`).
   *
   * To learn more check
   * {@link https://www.nutrient.io/guides/web/comments/introduction-to-instant-comments/#comment-permissions|this guide article}.
   * @example <caption>Only allow the modification of comment from the same author.</caption>
   * NutrientViewer.load({
   *   isEditableComment: function(comment) {
   *     return comment.creatorName === myCurrentUser.name;
   *   },
   * });
   * @public
   * @instance
   * @member {?NutrientViewer.IsEditableCommentCallback} isEditableComment
   * @memberof NutrientViewer.Configuration
   */
  isEditableComment?: IsEditableCommentCallback;
  /**
   * This property allows you to restrict the movement of annotations to the page boundary. This is set to `true` by default.
   * If you want to disable this, you can set it to `false`.
   * @public
   * @instance
   * @member {boolean} restrictAnnotationToPageBounds
   * @memberof NutrientViewer.Configuration
   * @default true
   */
  restrictAnnotationToPageBounds?: boolean;
  /**
   * *optional*
   *
   * Defines specific configuration options related to the electronic signatures feature.
   *
   * The `creationModes` key accepts an array of {@link NutrientViewer.ElectronicSignatureCreationMode} values that
   * define which signature creation modes and in which order will be offered as part of the Electronic Signatures
   * UI. It defaults to {@link NutrientViewer.defaultElectronicSignatureCreationModes}.
   *
   * The `fonts` key accepts an array of {@link NutrientViewer.Font} instances that specify the name of fonts to be used as part
   * of the 'Type' signing tab. It defaults to {@link NutrientViewer.defaultSigningFonts}.
   *
   * You can specify a subset of our built-in signing fonts or specify entirely custom ones.
   *
   * For using custom fonts, you need to load a custom style sheet (via {@link NutrientViewer.Configuration#styleSheets})
   * in which you can either specify `@font-face` rules for the custom font or `@import` other style sheets containing the fonts loading rules.
   *
   * As an example of the latter, if we would wish to use the Cookie font from Google Fonts you could use the
   * following style sheet:
   *
   * ```css
   * &#64;import url('https://fonts.googleapis.com/css2?family=Cookie&display=swap');
   * ```
   *
   * And then pass an `new NutrientViewer.Font({ name: 'Cookie' })` as part of the `fonts` array of
   * `NutrientViewer.Configuration#electronicSignatures`.
   * @public
   * @member {?NutrientViewer.ElectronicSignaturesConfiguration} electronicSignatures Options that allow you to customize the Electronic Signatures UI
   * @memberof NutrientViewer.Configuration
   * @example
   * NutrientViewer.load({
   *   electronicSignatures: {
   *     creationModes: [NutrientViewer.ElectronicSignatureCreationMode.IMAGE],
   *     fonts: [new NutrientViewer.Font("Cookie")]
   *   }
   * });
   */
  electronicSignatures?: ElectronicSignaturesConfiguration;
  /**
   * *optional*
   *
   * This property allows you to set an initial list of document editor footer items for the NutrientViewer instance.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultDocumentEditorFooterItems}.
   * @example
   * const footerItems = NutrientViewer.defaultDocumentEditorFooterItems;
   * footerItems.reverse();
   * NutrientViewer.load({ documentEditorFooterItems: footerItems, ... });
   * @public
   * @instance
   * @member {?Array.<NutrientViewer.DocumentEditorFooterItem>} documentEditorFooterItems
   * @memberof NutrientViewer.Configuration
   * @throws {NutrientViewer.Error} will throw an error when the supplied items array is not valid. This will also throw an error if your license does not include the Document Editor feature.
   * @default Default {@link NutrientViewer.defaultDocumentEditorFooterItems}
   */
  documentEditorFooterItems?: DocumentEditorFooterItem[];
  /**
   * *optional*
   *
   * This property allows you to set an initial list of document editor toolbar items for the NutrientViewer instance.
   *
   * When omitted, it will default to {@link NutrientViewer.defaultDocumentEditorToolbarItems}.
   * @example
   * const toolbarItems = NutrientViewer.defaultDocumentEditorToolbarItems;
   * toolbarItems.reverse();
   * NutrientViewer.load({ documentEditorToolbarItems: toolbarItems, ... });
   * @public
   * @instance
   * @member {?Array.<NutrientViewer.DocumentEditorToolbarItem>} documentEditorToolbarItems
   * @memberof NutrientViewer.Configuration
   * @throws {NutrientViewer.Error} will throw an error when the supplied items array is not valid. This will also throw an error if your license does not include the Document Editor feature.
   * @default Default {@link NutrientViewer.defaultDocumentEditorToolbarItems}
   */
  documentEditorToolbarItems?: DocumentEditorToolbarItem[];
  /**
   * *optional*
   *
   * Enable actions history for annotations. Disabled by default, when enabled it allows to undo and redo annotation actions consecutively
   * by calling {@link NutrientViewer.Instance.history.undo} or {@link NutrientViewer.Instance.history.redo}, or using the undo and redo UI buttons, which can be
   * optionally enabled:
   *
   * Actions history tracking can be enabled and disabled at any moment by calling {@link NutrientViewer.Instance.history.enable} or {@link NutrientViewer.Instance.history.disable}.
   * @example
   * NutrientViewer.load({
   *   enableHistory: true,
   *   toolbarItems: NutrientViewer.defaultToolbarItems.reduce((acc, item) => {
   *     if (item.type === "spacer") {
   *       return acc.concat([item, { type: "undo" }, { type: "redo" }]);
   *     }
   *     return acc.concat([item]);
   *   }, [])
   * });
   * @public
   * @instance
   * @member {boolean} enableHistory
   * @memberof NutrientViewer.Configuration
   * @default false
   */
  enableHistory?: boolean;
  /**
   * *optional*
   *
   * By default, all the URLs on which the user clicks explicitly open as expected but the URLs which open due to a result of JavaScript action are not opened due to security reasons.
   * You can override this behaviour using this callback. If this callback returns `true`, the URL will open.
   * @example
   * NutrientViewer.load({
   *   onOpenURI: (url, isUserInitiated) => {
   *     if (url.startsWith('https://abc.com') && isUserInitiated) {
   *       return true
   *     }
   *
   *     return false;
   *   }
   *   // ...
   * });
   * @public
   * @instance
   * @member {NutrientViewer.OnOpenUriCallback} onOpenURI
   * @memberof NutrientViewer.Configuration
   * @default undefined
   */
  onOpenURI?: OnOpenUriCallback;
  /**
   * *optional*
   *
   * Allows you to customize how to format dates displayed in the UI.
   *
   * When a date is about to be rendered in specific UI elements, this function is called so the date can be formatted as desired instead of
   * using the default date formatter.
   *
   * UI elements with customizable dates currently include the annotations sidebar, and comment threads.
   *
   * This function is called for each date to be formatted, and receives the corresponding `Date` object, the UI element to which it belongs
   * (either the annotations sidebar or a comment thread) and the {@link AnnotationsUnion} or {@link NutrientViewer.Comment} instance
   * to which it is associated.
   * @example
   * NutrientViewer.load({
   *   dateTimeString: ({ dateTime, element }) => {
   *     if(element === NutrientViewer.UIDateTimeElement.ANNOTATIONS_SIDEBAR) {
   *       return new Intl.DateTimeFormat("en-US", {
   *         dateStyle: "short",
   *         timeStyle: "short",
   *       }).format(dateTime);
   *     } else {
   *       return new Intl.DateTimeFormat("en-US", {
   *         dateStyle: "full",
   *         timeStyle: "long",
   *       }).format(dateTime);
   *     }
   *   }
   *   // ...
   * });
   * @public
   * @instance
   * @member {NutrientViewer.DateTimeStringCallback} dateTimeString
   * @memberof NutrientViewer.Configuration
   */
  dateTimeString?: DateTimeStringCallback;
  /**
   * *optional*
   *
   * You can customize the color dropdown of individual annotation properties using this callback.
   * This callback receives the property name associated with the color dropdown and the array of default colors used by NutrientViewer.
   *
   * With this API you can:
   * - render a customised color pallet in each and all color dropdowns
   * - control if the custom color picker UI should be rendered in the color dropdowns
   * @example <caption>Customize different color dropdowns.</caption>
   * NutrientViewer.load({
   *  annotationToolbarColorPresets: function ({ propertyName }) {
   *    if (propertyName === "font-color") {
   *      return {
   *        presets: [
   *          {
   *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
   *            localization: {
   *              id: "brightRed",
   *              defaultMessage: "Bright Red",
   *            },
   *          },
   *          {
   *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
   *            localization: {
   *              id: "deepBlue",
   *              defaultMessage: "deepBlue",
   *            },
   *          },
   *        ],
   *      };
   *    }
   *
   *    if (propertyName === "stroke-color") {
   *      return {
   *        presets: [
   *          {
   *            color: new NutrientViewer.Color({ r: 0, g: 0, b: 0 }),
   *            localization: {
   *              id: "brightRed",
   *              defaultMessage: "Bright Red",
   *            },
   *          },
   *          {
   *            color: new NutrientViewer.Color({ r: 100, g: 100, b: 180 }),
   *            localization: {
   *              id: "deepBlue",
   *              defaultMessage: "deepBlue",
   *            },
   *          },
   *        ],
   *        showColorPicker: false,
   *      };
   *    }
   *  },
   *  //...
   *});
   * @public
   * @memberof NutrientViewer.Configuration
   * @member  {?NutrientViewer.AnnotationToolbarColorPresetsCallback} annotationToolbarColorPresets
   */
  annotationToolbarColorPresets?: AnnotationToolbarColorPresetsCallback;
  /**
   * *optional*
   *
   * You can customise the items inside the annotation toolbars by using this callback. The callback will receive the
   * annotation which is being created or selected and based on it, you can have different annotation
   * toolbars for different annotations.
   *
   * You can do the following modifications using this API:
   *
   * - Add new annotation toolbar items
   * - Remove existing annotation toolbar items
   * - Change the order of the existing annotation toolbar items
   * - Modify selected properties of the annotation toolbar items
   *
   * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
   * mobile or desktop layout mode, which depends on the current viewport width. Based on that,
   * you can implement different designs for Desktop and Mobile.
   *
   * This callback gets called every time the annotation toolbar is mounted.
   * @example <caption>Add a new annotation toolbar item</caption>
   * NutrientViewer.load({
   *   annotationToolbarItems: (annotation, { defaultAnnotationToolbarItems, hasDesktopLayout }) => {
   *     const node = document.createElement('node')
   *     node.innerText = "Custom Item"
   *
   *     const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>`
   *
   *     return [{
   *       id: "custom",
   *       type: "custom",
   *       node: node,
   *       icon: icon,
   *       className: 'Custom-Node',
   *       onPress: () => alert("Custom item pressed!")
   *     }, ...defaultAnnotationToolbarItems];
   *   }
   * });
   * @public
   * @instance
   * @member {?NutrientViewer.AnnotationToolbarItemsCallback} annotationToolbarItems
   * @memberof NutrientViewer.Configuration
   */
  annotationToolbarItems?: AnnotationToolbarItemsCallback;
  /**
   * *optional*
   *
   * Enable actions like cut, copy, paste and duplicate for annotations using keyboard shortcuts `Cmd/Ctrl+X`, `Cmd/Ctrl+C`, `Cmd/Ctrl+V` and `Cmd/Ctrl+D` respectively.
   * @example
   * NutrientViewer.load({
   *   enableClipboardActions: true,
   * });
   * @public
   * @instance
   * @member {boolean} enableClipboardActions
   * @memberof NutrientViewer.Configuration
   * @default false
   */
  enableClipboardActions?: boolean;



















  renderPagePreview?: boolean;













  unstable_inkEraserMode?: IInkEraserMode;
  /**
   *
   **optional*
   *
   *You can programmatically modify the properties of the widget annotation and the associated form field just
   *before it is created via the Form Creator UI.
   * @public
   * @instance
   * @member {NutrientViewer.OnWidgetAnnotationCreationStartCallback} onCreateWidgetAnnotationStart
   * @memberof NutrientViewer.Configuration
   * @example <caption>Set the opacity of all widget annotations.</caption>
   * NutrientViewer.load({
   *   onWidgetAnnotationCreationStart: (annotation, formField) => {
   *     return { annotation: annotation.set('opacity', 0.7) };
   *   }
   *   // ...
   * });
   * @default undefined
   */
  onWidgetAnnotationCreationStart?: OnWidgetAnnotationCreationStartCallback;
  /**
   * *optional*
   *
   * You can customize the items inside the inline text selection toolbar that is rendered every time some text is selected on the document.
   * The callback will receive the
   * default items of the inline toolbar and the text that is currently selected {@link NutrientViewer.TextSelection}
   *
   * You can do the following modifications using this API:
   *
   * - Add new toolbar items
   * - Remove existing  toolbar items
   * - Change the order of the existing annotation toolbar items
   * - Customise each item eg change the `icon` of the a default toolbar item.
   *
   * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
   * mobile or desktop layout mode, which depends on the current viewport width. Based on that,
   * you can implement different designs for Desktop and Mobile.
   *
   * This callback gets called every time the inline text selection toolbar is mounted.
   * @example <caption>Add a custom button and a custom node to the toolbar in desktop layout.</caption>
   * NutrientViewer.load({
   * inlineTextSelectionToolbarItems: ({ defaultItems, hasDesktopLayout }, selection) => {
   *  console.log(selection)
   *  if (hasDesktopLayout) {
   *    const node = document.createElement("div");
   *    node.innerText = "Custom Item";
   *      return [
   *        ...defaultItems,
   *        {
   *          type: "custom",
   *          id: "custom-1",
   *          node: node,
   *          className: "Custom-Node",
   *          onPress: () => alert("Custom node pressed!"),
   *        },
   *        {
   *          type: "custom",
   *          id: "custom-2",
   *          title: "custom-button-2",
   *          onPress: () => alert("Custom item pressed!"),
   *        },
   *      ];
   *     }
   *  return defaultItems
   *   },
   * })
   * @public
   * @instance
   * @member {?NutrientViewer.InlineTextSelectionToolbarItemsCallback} inlineTextSelectionToolbarItems
   * @memberof NutrientViewer.Configuration
   */
  inlineTextSelectionToolbarItems?: InlineTextSelectionToolbarItemsCallback;
  /**
   * *optional*
   *
   * Allows the user to toggle the snapping behavior while creation of measurement annotations. The snapping points are the points are a combination of endpoints, midpoints and intersections.
   * @example
   * NutrientViewer.load({ measurementSnapping: false });
   * @instance
   * @public
   * @member {?boolean} measurementSnapping Whether to enable/disable snapping behaviour for creation of measurement annotations.
   * @memberof NutrientViewer.Configuration
   * @default false
   */
  measurementSnapping?: boolean;
  /**
   * Set the precision value of all the newly created measurement annotations.
   * @example
   * NutrientViewer.load({ measurementPrecision: NutrientViewer.MeasurementPrecision.THREE });
   * @public
   * @instance
   * @member {NutrientViewer.MeasurementPrecision} measurementPrecision The precision value.
   * @memberof NutrientViewer.Configuration
   * @default NutrientViewer.MeasurementPrecision.TWO
   */
  measurementPrecision?: IMeasurementPrecision;
  /**
   * Set the default value of scale for all newly created measurement annotations.
   * @example
   * NutrientViewer.load(new NutrientViewer.MeasurementScale({
   *   unitFrom: NutrientViewer.MeasurementScaleUnitFrom.CENTIMETERS,
   *   unitTo: NutrientViewer.MeasurementScaleUnitTo.INCHES,
   *   fromValue: 1,
   *   toValue: 2,
   * }));
   * @public
   * @instance
   * @member {NutrientViewer.MeasurementScale} measurementScale The default value of scale.
   * @memberof NutrientViewer.Configuration
   * @default 1 inch = 1 inch
   */
  measurementScale?: MeasurementScale;
  measurementValueConfiguration?: MeasurementValueConfigurationCallback;
  /**
   * This call back defines which text annotations should be treated as rich text annotation.
   * By default, all the text annotations are treated as plain text annotations, which means that
   * when you edit them, you will see the plain text editor. You can change this behavior by
   * returning `true` for the text annotations that you want to be treated as rich text annotations.
   * @example
   * NutrientViewer.load({ enableRichText: annotation => true });
   * @public
   * @instance
   * @member {NutrientViewer.EnableRichTextCallback} enableRichText
   * @memberof NutrientViewer.Configuration
   */
  enableRichText?: EnableRichTextCallback;
  /**
   * *optional*
   *
   * Disable multi selection for annotations. Disabled by default, when enabled it doesn't allow multiple selection of annotations
   * by calling {@link NutrientViewer.Instance.setSelectedAnnotations}, or using the multiple annotations selection UI button.
   * @example
   * NutrientViewer.load({
   *   disableMultiSelection: true,
   * });
   * @public
   * @instance
   * @member {boolean} disableMultiSelection
   * @memberof NutrientViewer.Configuration
   * @default false
   */
  disableMultiSelection?: boolean;
  /**
   * *optional*
   *
   * Threshold in pixels determines when the active anchor should automatically close
   * and snap to the origin anchor, effectively closing the shape.
   * @example
   * NutrientViewer.load({
   *   autoCloseThreshold: 50,
   * });
   * @public
   * @instance
   * @member {number} autoCloseThreshold
   * @memberof NutrientViewer.Configuration
   * @default 4px
   */
  autoCloseThreshold?: number;
  /** @deprecated */
  useIframe?: boolean;
  /**
   *
   *Allows specifying fonts that you would like to substitute in a document and the fonts you would like to use for that substitution.
   *
   *Patterns are matched using the following rules:
   *- `*` matches multiple characters.
   *- `?` matches a single character.
   *
   ***Ordering matters** - As names could match multiple patterns, it's important to note that the order of the patterns matters.
   *
   ***Case-insensitive** - Both the pattern and the target name are case-insensitive.
   * @example <caption>Substitute all Noto fonts found in the document with Awesome font</caption>
   * NutrientViewer.load({
   *   fontSubstitutions: [
   *     {
   *       pattern: "Noto*",
   *       target: "AwesomeFont"
   *     }
   *   ]
   * });
   * @public
   * @instance
   * @member {FontSubstitution[]} fontSubstitutions
   * @memberof NutrientViewer.Configuration
   */
  fontSubstitutions?: FontSubstitution[];
  /**
   * *optional*
   *
   * You can programmatically modify the properties of the comment just before it is created.
   * @example
   * NutrientViewer.load({ onCommentCreationStart: comment => comment.set('text', { format: 'xhtml', value: '<p>Default text</p>' }) });
   * @public
   * @instance
   * @member {NutrientViewer.OnCommentCreationStartCallback} onCommentCreationStart
   * @memberof NutrientViewer.Configuration
   */
  onCommentCreationStart?: OnCommentCreationStartCallback;
  documentEditorConfiguration?: documentEditorUIConfig;
  /**
   * In-place UI customization API for the supported components using slots.
   * Refer to {@link https://www.nutrient.io/guides/web/user-interface/ui-customization/introduction/|this guide} to get started.
   *
   * Can be used to:
   * - fully replace the default component UI with a custom one
   * - insert a custom UI at a predefined slot in an existing component
   * - replace an existing slot in a component with your own custom UI
   *
   * See the list of supported slots {@link https://www.nutrient.io/guides/web/user-interface/ui-customization/supported-slots/|here}.
   * @example
   * NutrientViewer.load({
   *   ui: {
   *     commentThread: {
   *       header: (instance, id) => {
   *         const header = document.createElement('div');
   *         header.innerText = 'Custom Comment Thread Header';
   *
   *         return {
   *           render: (params) => header,
   *           onMount: (id) => {
   *             console.log(`Comment thread header mounted`);
   *           },
   *           onUnmount: (id) => {
   *             console.log(`Comment thread header unmounted`);
   *           }
   *         };
   *       }
   *     }
   *   }
   * });
   * @public
   * @member {?NutrientViewer.UI} ui
   * @memberof NutrientViewer.Configuration
   */
  ui?: UI;
  /**
   * ***Server only***
   *
   * This configuration describes a connection with AI Assistant service which provides AI capabilities directly in the viewer.
   * @example
   * NutrientViewer.load({
   *   aiAssistant: {
   *     sessionId: 'session-id',
   *     jwt: 'xxx.xxx.xxx'
   *     backendUrl: 'https://localhost:4000',
   *   },
   *   // ...
   * });
   * @public
   * @server
   * @instance
   * @member {?AIAssistantConfiguration} aiAssistant
   * @memberof NutrientViewer.Configuration
   */
  aiAssistant?: AIAssistantConfiguration;
  /**
   * ***Optional***
   *
   * When `disableWebAssemblyStreaming` is set to `true`, we force disable WebAssembly streaming
   * instantiation. More info about this optimization can be found at:
   * {@link https://www.nutrient.io/blog/2018/optimize-webassembly-startup-performance/#streaming-instantiation-combining-download-and-instantiation-2dc410}
   * @example
   * NutrientViewer.load({
   *   disableWebAssemblyStreaming: true,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?boolean} disableWebAssemblyStreaming
   * @memberof NutrientViewer.Configuration
   */
  disableWebAssemblyStreaming?: boolean;
  /**
   * *optional*
   *
   * Overrides the allocable maximum memory when using Nutrient Web SDK Standalone. Only set this if
   * you know that your users have web browsers with enough memory available.
   *
   * This can improve rendering of documents with large images.
   * @example
   * NutrientViewer.load({
   *   overrideMemoryLimit: 4096, // 4 GB
   *   // ...
   * });
   * @instance
   * @standalone
   * @public
   * @member {?number} overrideMemoryLimit The new total memory limit in megabytes.
   * @memberof NutrientViewer.Configuration
   */
  overrideMemoryLimit?: number;
  /**
   * *optional*
   *
   * This allows you to overwrite the auto-detected URL for the Core worker NutrientViewer assets in Standalone mode.
   * This setting may be necessary when you integrate Nutrient Web SDK in an environment that limits
   * the size of the static assets, like Salesforce.
   *
   * If your Core assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   *
   * This must end with a trailing slash, and the Core assets (`nutrient-viewer-[hash].wasm.js`
   * and `nutrient-[hash].wasm`) must be located in a `nutrient-viewer-lib` subfolder accessible
   * from the `baseCoreUrl`.
   * @example
   * NutrientViewer.load({ baseCoreUrl: 'https://public-server.pspdfkit.com/pspdfkit-core/' });
   * @instance
   * @public
   * @member {?string} baseCoreUrl
   * @memberof NutrientViewer.Configuration
   * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
   * from the currently executed `&lt;script&gt;` tag.
   */
  baseCoreUrl?: string;
  unifiedCommentsSupport?: boolean;
  preservePDFAccessibility?: boolean;
  /**
   * *optional*
   *
   * Callback function to handle font matching during content editing operations.
   *
   * This callback is invoked when the system detects a font mismatch during content editing
   * and allows you to provide custom font substitution logic. The callback receives the
   * system's proposed font match and metadata about the original font from the PDF.
   *
   * If the callback returns a font reference, it overrides the system's choice. If it returns
   * `undefined`, the system's original match is used.
   * @example
   * NutrientViewer.load({
   *   contentEditingFontMatcher: (match, fontInfo, availableFonts) => {
   *     console.log('System matched:', match);
   *     console.log('Original font:', fontInfo.name, 'at', fontInfo.fontSize + 'px');
   *     console.log('Available fonts:', availableFonts.map(f => f.family));
   *
   *     // For Helvetica fonts, try to find a suitable substitute
   *     if (fontInfo.name?.includes("Helvetica")) {
   *       // Look for Arial first, then any sans-serif font
   *       const preferredFonts = ["Arial", "Roboto", "Open Sans", "Lato"];
   *
   *       for (const preferred of preferredFonts) {
   *         const font = availableFonts.find(f => f.family.includes(preferred));
   *         if (font) {
   *           return { font, size: fontInfo.fontSize };
   *         }
   *       }
   *
   *       // Fallback to first available font
   *       if (availableFonts.length > 0) {
   *         return { font: availableFonts[0], size: fontInfo.fontSize };
   *       }
   *     }
   *     return undefined; // Accept system match
   *   }
   * });
   * @public
   * @instance
   * @member {?NutrientViewer.ContentEditingFontMatcher} contentEditingFontMatcher
   * @memberof NutrientViewer.Configuration
   */
  contentEditingFontMatcher?: ContentEditingFontMatcher;};

declare type SharedTextComparisonConfiguration = {
  container: string | HTMLElement;
  baseUrl?: string;
  baseCoreUrl?: string;
  serverUrl?: string;
  licenseKey?: string;
  toolbarItems?: Array<TextComparisonToolbarItem>;
  styleSheets?: Array<string>;
  theme?: ITheme;
  locale?: string;
  innerToolbarItems?: Array<TextComparisonInnerToolbarItem>;
  comparisonSidebarConfig?: TextComparisonSidebarConfiguration;};

/**
 * Controls when the digital signature validation UI should be shown.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ShowSignatureValidationStatusMode} IF_SIGNED Show the digital signature validation UI if digital signatures
 * are found on the current document.
 * @property {NutrientViewer.ShowSignatureValidationStatusMode} HAS_WARNINGS Only show the digital signature validation UI if digital signatures
 * with problems or invalid ones are found, and also if the document has been modified since the moment it's been signed.
 * @property {NutrientViewer.ShowSignatureValidationStatusMode} HAS_ERRORS Only show the digital signature validation UI if invalid signatures are found.
 * @property {NutrientViewer.ShowSignatureValidationStatusMode} NEVER Never show the digital signature validation UI.
 */
declare const ShowSignatureValidationStatusMode: {
  readonly IF_SIGNED: "IF_SIGNED";
  readonly HAS_WARNINGS: "HAS_WARNINGS";
  readonly HAS_ERRORS: "HAS_ERRORS";
  readonly NEVER: "NEVER";};


/**
 * Controls the current sidebar mode in the viewer.
 * It can also be a custom string corresponding to a custom sidebar id.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.SidebarMode} ANNOTATIONS Annotations sidebar.
 * @property {NutrientViewer.SidebarMode} BOOKMARKS Bookmarks.
 * @property {NutrientViewer.SidebarMode} DOCUMENT_OUTLINE Document Outline (table of contents).
 * @property {NutrientViewer.SidebarMode} THUMBNAILS Thumbnails preview.
 * @property {NutrientViewer.SidebarMode} SIGNATURES List of Signatures.
 * @property {NutrientViewer.SidebarMode} LAYERS List of OCG layers in the document.
 * @property {NutrientViewer.SidebarMode} ATTACHMENTS List of embedded files in the document.
 * @property {NutrientViewer.SidebarMode} CUSTOM Custom preview.
 */
declare const SidebarMode: {
  readonly ANNOTATIONS: "ANNOTATIONS";
  readonly BOOKMARKS: "BOOKMARKS";
  readonly DOCUMENT_OUTLINE: "DOCUMENT_OUTLINE";
  readonly THUMBNAILS: "THUMBNAILS";
  readonly SIGNATURES: "SIGNATURES";
  readonly LAYERS: "LAYERS";
  readonly ATTACHMENTS: "ATTACHMENTS";
  readonly CUSTOM: "CUSTOM";};


/**
 * This object includes different options that specific to some of the available sidebar modes.
 *
 * The annotations sidebar and the OCGs Sidebar can be customized.
 * For example, in the annotations sidebar one can define the record types
 * to show in the annotation sidebar, as well as expanding it by optionally
 * rendering comments in that sidebar. Meanwhile, In the Ocgs sidebar one
 * can define which ocgs should not have their visibility toggled via the UI.
 */
/**
 * The annotations sidebar options allows to specify options available for the annotations sidebar.
 * Currently, you can define a `includeContent` array in which you
 * can provide a list of annotation classes to be accepted as part of
 * the annotations sidebar, or also whether to include {@link NutrientViewer.Comment}
 * instances or not. By default, the value of `includeContent` is {@link NutrientViewer.defaultAnnotationsSidebarContent}.
 * @public
 * @memberof NutrientViewer
 * @interface AnnotationsSidebarOptions
 * @property {Array<NutrientViewer.AnnotationsUnionClass | Class<NutrientViewer.Comment>>} includeContent - Array of annotation classes to be accepted as part of the annotations sidebar
 * @summary Options available to the annotations sidebar
 * @example <caption>Customizing the annotations sidebar to include only {@link NutrientViewer.ImageAnnotation} instances</caption>
 * NutrientViewer.load({
 *   initialViewState: new NutrientViewer.ViewState({
 *     sidebarOptions: {
 *       [NutrientViewer.SidebarMode.ANNOTATIONS]: {
 *         includeContent: [NutrientViewer.Annotations.ImageAnnotation]
 *       }
 *     }
 *   })
 * });
 * @default NutrientViewer.defaultAnnotationsSidebarContent
 * @seealso NutrientViewer.ViewState#sidebarOptions
 */
/**
 * The layers sidebar options allow to specify options available for the Layers sidebar.
 *
 * Here you can define Currently, you can define a `lockedLayers` array in which you
 * can provide an array of `id`s for the layers for which visibility should not be modifieable
 * using the sidebar.
 * @public
 * @memberof NutrientViewer
 * @interface LayersSidebarOptions
 * @property {Array<number>} lockedLayers - Array of ocg.ocgId present in the document
 * @property {NutrientViewer.Alignment} iconsAlignment - Alignment relative to the parent container
 * @summary Keyed list of options that apply to the layers sidebar.
 * @example <caption>Customizing the layers sidebar to align icons to the right</caption>
 * NutrientViewer.load({
 *   initialViewState: new NutrientViewer.ViewState({
 *     sidebarOptions: {
 *       [NutrientViewer.SidebarMode.LAYERS]: {
 *         LockedLayers: [],
 *         iconsAlignment: NutrientViewer.Alignment.START
 *       }
 *     }
 *   })
 * });
 * @seealso NutrientViewer.ViewState#sidebarOptions
 */
/**
 * The attachments sidebar options allow to specify options available for the Attachments sidebar.
 * @public
 * @memberof NutrientViewer
 * @interface AttachmentsSidebarOptions
 * @property {boolean} disablePreview - If true, the preview of the attachment will be disabled and attachments can only be downloaded.
 * @summary Keyed list of options that apply to the attachments sidebar.
 * @example <caption>Disabling preview of attachments.</caption>
 * NutrientViewer.load({
 *   initialViewState: new NutrientViewer.ViewState({
 *     sidebarOptions: {
 *       [NutrientViewer.SidebarMode.ATTACHMENTS]: {
 *         disablePreview: true
 *       }
 *     }
 *   })
 * });
 * @seealso NutrientViewer.ViewState#sidebarOptions
 */
declare type SidebarOptions<T> = T extends AnnotationsSidebarOptions ? {
  [SidebarMode.ANNOTATIONS]: AnnotationsSidebarOptions;} :
T extends LayersSidebarOptions ? {
  [SidebarMode.LAYERS]: LayersSidebarOptions;} :
T extends AttachmentsSidebarOptions ? {
  [SidebarMode.ATTACHMENTS]: AttachmentsSidebarOptions;} :
never;

declare type SidebarParams = {
  /**
   * ID for the sidebar.
   */
  id: string;};


/**
 * Controls the sidebar placement.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.SidebarPlacement} START The sidebar is shown before the content in the reading direction. For any LTR languages this
 * will be the left side, for RTL languages this will be the right side.
 * @property {NutrientViewer.SidebarPlacement} END The sidebar is shown after the content in the reading direction. For any LTR languages this
 * will be the right side, for RTL languages this will be the left side.
 */
declare const SidebarPlacement: {
  readonly START: "START";
  readonly END: "END";};


declare type SidebarUI = Record<string, UIFactory<SidebarParams>>;

declare type Signature = InkAnnotation | ImageAnnotation;

declare type SignatureAppearance = {
  mode?: ISignatureAppearanceMode;
  showSigner?: boolean;
  showSignDate?: boolean;
  showReason?: boolean;
  showLocation?: boolean;
  showWatermark?: boolean;
  showDateTimezone?: boolean;
  watermarkImage?: Blob | File;
  graphicImage?: Blob | File;};

/**
 * Specifies the signature appearance mode: whether graphics, description, or both are included in it.
 * See https://www.nutrient.io/guides/web/signatures/digital-signatures/signature-lifecycle/configure-digital-signature-appearance/ for a detailed discussion of the signature modes.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.SignatureAppearanceMode} signatureOnly Only the graphic is included in the signature appearance.
 * @property {NutrientViewer.SignatureAppearanceMode} signatureAndDescription Both the graphic and description are included in the signature appearance.
 * @property {NutrientViewer.SignatureAppearanceMode} descriptionOnly Only the description is included in the signature appearance.
 */
declare const SignatureAppearanceMode: {
  readonly signatureOnly: "signatureOnly";
  readonly signatureAndDescription: "signatureAndDescription";
  readonly descriptionOnly: "descriptionOnly";};


/**
 * Represents the result of a signing process that returns a PKCS#7 (CMS) signature.
 * @public
 * @interface SignatureCallbackResponsePkcs7
 * @memberof NutrientViewer
 */
declare type SignatureCallbackResponsePkcs7 = {
  /**
   * The DER-encoded PKCS#7 signature as an `ArrayBuffer`.
   * @public
   * @instance
   * @member {ArrayBuffer} pkcs7
   * @memberof NutrientViewer.SignatureCallbackResponsePkcs7
   */
  pkcs7: ArrayBuffer;
  /**
   * Optional array of OCSP responses. Required if the signature needs to be LTV enabled.
   * @public
   * @instance
   * @member {?NutrientViewer.OcspResponse[]} ocspResponses
   * @memberof NutrientViewer.SignatureCallbackResponsePkcs7
   */
  ocspResponses?: OcspResponse[];};


/**
 * Represents the result of a signing process that returns a raw, (for instance, PKCS#1) signature.
 * @public
 * @interface SignatureCallbackResponseRaw
 * @memberof NutrientViewer
 */
declare type SignatureCallbackResponseRaw = {
  /**
   * The certificate chain to include in the digital signature.
   * It can be a list of DER-encoded (represented as an `ArrayBuffer`) or PEM-encoded certificates.
   * @public
   * @instance
   * @member {ArrayBuffer[] | string[]} certificates
   * @memberof NutrientViewer.SignatureCallbackResponseRaw
   */
  certificates: ArrayBuffer[] | string[];
  /**
   * The raw (for example, PKCS#1) signature as an ArrayBuffer.
   * @public
   * @instance
   * @member {ArrayBuffer} signedData
   * @memberof NutrientViewer.SignatureCallbackResponseRaw
   */
  signedData: ArrayBuffer;
  /**
   * Optional timestamp token, DER-encoded. The format should be as
   * specified by [RFC3161]{@link https://www.rfc-editor.org/info/rfc3161}. If no timestamp response is provided, the signing
   * process will fallback to the optional `signingData.timestamp` field of
   * `NutrientViewer.SignaturePreparationData`.
   * @public
   * @instance
   * @member {?ArrayBuffer} timestampResponse
   * @memberof NutrientViewer.SignatureCallbackResponseRaw
   */
  timestampResponse?: ArrayBuffer;
  /**
   * Optional array of OCSP responses. Required if the signature needs to be LTV enabled.
   * @public
   * @instance
   * @member {?NutrientViewer.OcspResponse[]} ocspResponses
   * @memberof NutrientViewer.SignatureCallbackResponseRaw
   */
  ocspResponses?: OcspResponse[];};


/**
 * Contains information to be used for preparing a document to be signed digitally.
 *
 * This object can be passed optionally to {@link `NutrientViewer.Instance.signDocument()`}
 * with specific parameters for the preparation of the digital signature.
 *
 * `formFieldName` and `position` cannot be set at the same time, or an error will be thrown.
 *
 * This is the property that can be included in the object:
 * @example <caption>Setting the digital signature container reserved size when signing (Server)</caption>
 * instance.signDocument({
 *   placeholderSize: 65536 // Specify a container with a 64 KB size
 * })
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @summary Digital signing preparation data.
 * @property {?number} placeholderSize - Size (bytes) to be reserved for the digital signature container. The default is 32 KB (32768 bytes).
 * @property {?boolean} flatten - Whether the document should be flatten before digitally signing it. The default is `false`. Note that flattening a document may remove previous digital signatures.
 * @property {?NutrientViewer.SignatureMetadata} signatureMetadata  - Signature Meta Data for the digitally signing it.
 * @property {?string} formFieldName - Name of the existing signature form field to apply the signature to.
 * @property {?NutrientViewer.SignaturePosition} position - Page index and bounding box of the signature.
 * @property {?NutrientViewer.SignatureAppearance} appearance - Appearance options for the digital signature.
 * @property {?NutrientViewer.SigningData} signingData  - Certificates, private key and signature type to sign the document with.
 * @interface SignaturePreparationData
 * @memberof NutrientViewer
 */
/**
 * This object can be provided optionally as part of the {@link NutrientViewer.SignaturePreparationData|`NutrientViewer.SignaturePreparationData`}
 * passed as first argument when calling {@link NutrientViewer.Instance#signDocument|`instance.signDocument()`} and contains
 * the certificates, private key and signature type for the SDK to use for signing the document using the Web Crypto API.
 *
 * `certificates` must be an `Array` of `ArrayBuffer` (DER-encoded) or `string` (PEM-encoded) containing X.509 certificates.
 *
 * The SDK can sign the document using the {@link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto|Web SubtleCrypto API}
 * as long as the certificate chain and private key are provided here.
 *
 * `privatekey` must be a `string` that contains the private key to sign (PEM-encoded). If `privateKey` is not included, {@link NutrientViewer.TwoStepSignatureCallback|`NutrientViewer.TwoStepSignatureCallback`} needs to be passed
 * as second argument for the `instance.signDocument()` call to perform the signing.
 *
 * If `certificates` is not provided, only `NutrientViewer.SignatureType.CMS` can be created.
 *
 * If `signatureType` is not provided, `NutrientViewer.SignatureType.CAdES` will be used by default as long as `certificates` is provided,
 * and will default to `NutrientViewer.SignatureType.CMS` otherwise.
 *
 * If `timestamp` is provided, the `signatureType` must be `NutrientViewer.SignatureType.CAdES`.
 * @public
 * @memberof NutrientViewer
 * @member {object} SigningData
 * @property {?(ArrayBuffer[] | string[])} certificates - Certificates used to sign the document.
 * @property {?NutrientViewer.SignatureType} signatureType - Signature type.
 * @property {?string} privateKey - Private key used to sign the document.
 * @property {?NutrientViewer.SignatureContainerType} signatureContainer - Signature container type. Can be `NutrientViewer.SignatureContainerType.raw` or `NutrientViewer.SignatureContainerType.pkcs7`.
 * @property {?NutrientViewer.PAdESLevel} padesLevel - PAdES level to use when creating the signature (Document Engine only). This parameter is ignored when the signatureType is `cms`. Defaults to `b-lt`.
 * @property {?object} timestamp - Timestamping authority information (Standalone only).
 * @property {string} timestamp.url - URL of the timestamp server.
 * @property {?string} timestamp.username - Username for the timestamp server.
 * @property {?string} timestamp.password - Password for the timestamp server.
 * @property {?boolean} ltv - Flag to enable LTV (Long Term Validation) for the signature (Standalone only).
 */
declare type SignatureContainerType = 'raw' | 'pkcs7';

declare type SignatureCreationData = SignaturePreparationData & {
  signatureMetadata?: SignatureMetadata;} &
{
  signingData?: SigningData;};

/**
 * @classdesc
 * A field that contains an ink signature.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary A field that contains an ink signature.
 * @class SignatureFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.FormField
 * @seealso NutrientViewer.Configuration#formFieldsNotSavingSignatures
 */
export declare class SignatureFormField extends FormField {}


declare type SignatureFormFieldJSON = BaseFormFieldJSON & {
  type: 'pspdfkit/form-field/signature';};

/**
 * Describes and persists the properties of a digital signature.
 * @public
 * @property {string} type="pspdfkit/signature-info"
 * @property {?NutrientViewer.SignatureType} signatureType - Type of the signature: CMS, CAdES or Document Timestamp.
 * @property {?string} signerName - Signer's name.
 * @property {?string} creationDate - Date of the signature.
 * @property {?string} signatureReason - Purpose of the signature.
 * @property {?string} signatureLocation - Location where the signature has taken place.
 * @property {NutrientViewer.DocumentIntegrityStatus} documentIntegrityStatus - The different signature validation states the document can be in.
 * @property {NutrientViewer.CertificateChainValidationStatus} certificateChainValidationStatus - The different possible validation states of the certificate chain.
 * @property {NutrientViewer.SignatureValidationStatus} signatureValidationStatus - The different possible validation states of the signature.
 * @property {boolean} isTrusted - The signing certificate has been explicitly marked as trusted by the certificate store.
 * @property {boolean} isSelfSigned - The signing certificate is self-signed.
 * @property {boolean} isExpired - The signing certificate is expired.
 * @property {boolean} documentModifiedSinceSignature - The document has been modified since this signature has been added to it. Depending on the uncovered changes, the signature may be "valid with modifications", or "invalid".
 * @property {string} signatureFormFQN - The fully qualified name of the signature form field.
 * @property {?NutrientViewer.PAdESLevel} PAdESSignatureLevel - The PAdES level of the signature.
 * @property {?string} validFrom - The date from which the signature is valid.
 * @property {?string} validUntil - The date until which the signature is valid.
 * @property {?object} timestampInfo - Information about the timestamp of the signature.
 * @property {?string} timestampInfo.signerName - The name of the authority that issued a timestamp.
 * @property {?string} timestampInfo.type="NutrientViewer/timestamp-info"
 * @property {boolean} ltv - Whether the signature is LTV enabled.
 * @property {?Array<NutrientViewer.SigningCertificate>} signingCertificateChain - Signing certificate chain information.
 * @summary Information from an individual signature.
 * @interface SignatureInfo
 * @memberof NutrientViewer
 */
declare type SignatureInfo = {
  type: 'pspdfkit/signature-info';
  signatureType?: SignatureTypeType | null | undefined;
  signerName: string | null | undefined;
  creationDate: Date | null | undefined;
  signatureReason: string | null | undefined;
  signatureLocation: string | null | undefined;
  documentIntegrityStatus: DocumentIntegrityStatusType;
  certificateChainValidationStatus: CertificateChainValidationStatusType;
  signatureValidationStatus: SignatureValidationStatusType;
  isTrusted: boolean;
  isSelfSigned: boolean;
  isExpired: boolean;
  documentModifiedSinceSignature: boolean;
  signatureFormFQN: string;
  PAdESSignatureLevel?: PAdESLevelType | null;
  validFrom: string | null | undefined;
  validUntil: string | null | undefined;
  timestampInfo: {
    type: 'pspdfkit/timestamp-info';
    signerName: string | null | undefined;};

  ltv: boolean;
  signingCertificateChain?: SigningCertificate[];};


/**
 * Contains metadata information to be included in a Digital Signature.
 *
 * This object can be passed optionally to {@link NutrientViewer.Instance#signDocument|`NutrientViewer.Instance.signDocument()`}
 * as part of {@link NutrientViewer.SignaturePreparationData|`NutrientViewer.SignaturePreparationData`}.
 * @example <caption>Specifying the signer name, signature reason and location for a Digital Signature (Standalone)</caption>
 * instance.signDocument(
 *   {
 *     signatureMetadata: {
 *       signerName: "John Doe",
 *       signatureReason: "Testing",
 *       signatureLocation: "San Francisco"
 *     }
 *   }, getPKCS7Container)
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @summary Digital Signature Metadata.
 * @property {?string} signerName The name of the entity that signed the document.
 * @property {?string} signatureReason The motivation for signing the document.
 * @property {?string} signatureLocation The place where the document was signed.
 * @summary Digital signing preparation data.
 * @interface SignatureMetadata
 * @memberof NutrientViewer
 */
declare type SignatureMetadata = {
  signerName?: string;
  signatureReason?: string;
  signatureLocation?: string;};


/**
 * @public
 * @property {number} pageIndex Index of the page for the digital signature.
 * @property {NutrientViewer.Geometry.Rect} boundingBox Coordinates and dimensions of the digital signature.
 * @summary Page, coordinates and dimensions of a digital signature.
 * @interface SignaturePosition
 * @memberof NutrientViewer
 */
declare type SignaturePosition = {
  pageIndex: number;
  boundingBox: Rect;};


declare type SignaturePreparationData = {
  placeholderSize?: number;
  flatten?: boolean;
  formFieldName?: string;
  position?: SignaturePosition;
  appearance?: SignatureAppearance;};

/**
 * Selects the save mode for ink signatures.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.SignatureSaveMode} ALWAYS Always store new ink signatures.
 * @property {NutrientViewer.SignatureSaveMode} NEVER Never store new ink signatures.
 * @property {NutrientViewer.SignatureSaveMode} USING_UI Store new ink signatures if the option is selected in the UI.
 */
declare const SignatureSaveMode: {
  readonly ALWAYS: "ALWAYS";
  readonly NEVER: "NEVER";
  readonly USING_UI: "USING_UI";};


/**
 * Describes and persists the overall validation status of the document, based on the
 * digital signatures it contains.
 *
 * The information contained in the digital signatures included in a document
 * can be extracted using {@link NutrientViewer.Instance#getSignaturesInfo()}, which resolves with
 * a `NutrientViewer.SignaturesInfo` object. This object represent the overall validation status
 * of the document. For getting information about each individual signature from the document,
 * an array of {@link NutrientViewer.SignatureInfo} is included under the `signatures` property.
 *
 * To learn more about digital signatures validation check
 * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#digital-signatures-validation|this guide article}.
 * @example <caption>Getting digital signatures data from a document</caption>
 * instance.getSignaturesInfo()
 *   .then(function (signaturesInfo) {
 *      console.log(signaturesInfo)
 *   });
 * @public
 * @property {NutrientViewer.DocumentValidationStatus} status - The different possible validation states of the document.
 * @property {Array<NutrientViewer.SignatureInfo>} signatures - Array with the properties of each digital signature.
 * @property {boolean} documentModifiedSinceSignature - The document has been modified since the last signature was added to it.
 * @summary Digital signatures validation information.
 * @interface SignaturesInfo
 * @memberof NutrientViewer
 * @seealso NutrientViewer.Instance#getSignaturesInfo NutrientViewer.ViewState#showSignatureValidationStatus
 * @seealso NutrientViewer.Configuration#trustedCAsCallback
 */
declare type SignaturesInfo = {
  status: DocumentValidationStatusType;
  checkedAt: Date;
  signatures?: Array<SignatureInfo>;
  documentModifiedSinceSignature?: boolean;};


declare function SignaturesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a copy of the available stored signatures.
     * Signatures are ink and image annotations and therefore can be converted to JavaScript objects with {@link NutrientViewer.Annotations.toSerializableObject}.
     *
     * When the application doesn't have signatures in store this method will invoke {@link NutrientViewer.Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations.
     * @example <caption>Retrieve the signatures and convert them to JSON</caption>
     * instance
     *   .getInkSignatures()
     *   .then(signatures => signatures.map(NutrientViewer.Annotations.toSerializableObject).toJS());
     * @public
     * @function getInkSignatures
     * @instance
     * @deprecated
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.Annotations.InkAnnotation | NutrientViewer.Annotations.ImageAnnotation>>} Promise that resolves with an Immutable list of signatures
     * @memberof NutrientViewer.Instance
     */
    getInkSignatures(): Promise<List<InkAnnotation | ImageAnnotation>>;
    /**
     * Returns a copy of the available stored signatures.
     * Signatures are ink and image annotations and therefore can be converted to JavaScript objects with {@link NutrientViewer.Annotations.toSerializableObject}.
     *
     * When the application doesn't have signatures in store this method will invoke {@link NutrientViewer.Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations.
     * @example <caption>Retrieve the signatures and convert them to JSON</caption>
     * instance
     *   .getStoredSignatures()
     *   .then(signatures => signatures.map(NutrientViewer.Annotations.toSerializableObject).toJS());
     * @public
     * @function getStoredSignatures
     * @instance
     * @returns {Promise.<NutrientViewer.Immutable.List.<NutrientViewer.Annotations.InkAnnotation | NutrientViewer.Annotations.ImageAnnotation>>} Promise that resolves with an Immutable list of signatures
     * @memberof NutrientViewer.Instance
     */
    getStoredSignatures(): Promise<List<InkAnnotation | ImageAnnotation>>;
    /**
     * This method is used to update the signatures list.
     * It makes it possible to add new signatures and edit or remove existing ones.
     *
     * Ink Signatures are Ink Annotations whose `pageIndex` and `boundingBox` is calculated at creation time.
     * When selected via UI such annotations are used as template to create new {@link NutrientViewer.Annotations.InkAnnotation}s and {@link NutrientViewer.Annotations.ImageAnnotation}s.
     *
     * When you pass in a {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation}, the current list of signatures will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be invoked with the current {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation} as argument.
     * You can use this to modify the list based on its current value.
     * This type of update is guaranteed to be atomic - the value of `getStoredSignatures()` can't change in between.
     * See: {@link NutrientViewer.Instance~StoredSignaturesSetter|StoredSignaturesSetter}
     *
     * When the application doesn't have signatures in store this method will invoke {@link NutrientViewer.Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations and it will pass it to your function.
     *
     * When the list is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     * @example <caption>Fetch and set a list of signatures</caption>
     * const signatures = fetch("/signatures")
     *   .then(r => r.json())
     *   .then(a => (
     *       new NutrientViewer.Immutable.List(
     *          a.map(NutrientViewer.Annotations.fromSerializableObject)
     *       )
     *     )
     *   );
     * signatures.then(signatures => { instance.setInkSignatures(signatures) });
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setInkSignatures(signatures => signatures.reverse());
     * @example <caption>Add a Ink Signature to the existing list</caption>
     * const signature = new NutrientViewer.Annotations.InkAnnotation({ lines: ..., boundingBox: ... });
     *
     * instance.setInkSignatures(signatures => signatures.push(signature));
     * @example <caption>Remove the first Ink Signature from the list</caption>
     * instance.setInkSignatures(signatures => signatures.shift());
     * @public
     * @instance
     * @function setInkSignatures
     * @memberof NutrientViewer.Instance
     * @deprecated
     * @throws {NutrientViewer.Error} Will throw an error when the supplied items `array` is not valid.
     * @param {Array.<NutrientViewer.ToolbarItem>|NutrientViewer.Instance~StoredSignaturesSetter} StoredSignaturesOrFunction Either a
         *   new `array` of signatures which would overwrite the existing one, or a callback that will get
         *   invoked with the current toolbar items and is expected to return the new `array` of items.
         */
    setInkSignatures(stateOrFunction: List<ImageAnnotation<IImageAnnotation> | InkAnnotation<IInkAnnotation>> | ((annotations: List<InkAnnotation | ImageAnnotation>) => List<InkAnnotation | ImageAnnotation>)): Promise<void>;
    /**
     * This method is used to update the stored signatures list.
     * It makes it possible to add new signatures and edit or remove existing ones.
     *
     * Signatures are either ink or image annotations whose `pageIndex` and `boundingBox` is calculated at creation time.
     * When selected via UI such annotations are used as template to create new {@link NutrientViewer.Annotations.InkAnnotation}s and {@link NutrientViewer.Annotations.ImageAnnotation}s.
     *
     * When you pass in a {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation}, the current list
     * of signatures will be immediately updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be invoked with the current {@link NutrientViewer.Immutable.List List} of {@link NutrientViewer.Annotations.InkAnnotation} and {@link NutrientViewer.Annotations.ImageAnnotation}
     * as argument.
     * You can use this to modify the list based on its current value.
     * This type of update is guaranteed to be atomic - the value of `getStoredSignatures()` can't change in between.
     * See: {@link NutrientViewer.Instance~StoredSignaturesSetter|StoredSignaturesSetter}
     *
     * When the application doesn't have signatures in store this method will invoke {@link NutrientViewer.Configuration#populateStoredSignatures}
     * to retrieve the initial list of annotations and it will pass it to your function.
     *
     * When the list is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     * @example <caption>Fetch and set a list of signatures</caption>
     * const signatures = fetch("/signatures")
     *   .then(r => r.json())
     *   .then(a => (
     *       new NutrientViewer.Immutable.List(
     *          a.map(NutrientViewer.Annotations.fromSerializableObject)
     *       )
     *     )
     *   );
     * signatures.then(signatures => { instance.setStoredSignatures(signatures) });
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setStoredSignatures(signatures => signatures.reverse());
     * @example <caption>Add a Signature to the existing list</caption>
     * const signature = new NutrientViewer.Annotations.InkAnnotation({ lines: ..., boundingBox: ... });
     *
     * instance.setStoredSignatures(signatures => signatures.push(signature));
     * @example <caption>Remove the first Signature from the list</caption>
     * instance.setStoredSignatures(signatures => signatures.shift());
     * @public
     * @instance
     * @function setStoredSignatures
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied items `array` is not valid.
     * @param {Array.<NutrientViewer.ToolbarItem>|NutrientViewer.Instance~StoredSignaturesSetter} StoredSignaturesOrFunction Either
         *   a new `array` of signatures which would overwrite the existing one, or a callback that will get
         *   invoked with the current toolbar items and is expected to return the new `array` of items.
         */
    setStoredSignatures(stateOrFunction: List<ImageAnnotation<IImageAnnotation> | InkAnnotation<IInkAnnotation>> | ((annotations: List<InkAnnotation | ImageAnnotation>) => List<InkAnnotation | ImageAnnotation>)): Promise<void>;};} &

T;

/**
 * The different types of digital signatures.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @enum
 */
declare const SignatureType: {
  /**
   * CMS
   * @public
   * @type {NutrientViewer.SignatureType}
   */
  CMS: string;
  /**
   * CAdES
   * @public
   * @type {NutrientViewer.SignatureType}
   */
  CAdES: string;};


declare type SignatureTypeType = (typeof SignatureType)[keyof typeof SignatureType];

/**
 * The different possible validation states of the signature.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @enum
 */
declare const SignatureValidationStatus: {
  /**
   * The overall status of the signature is valid, that is, it should be shown with a green checkmark
   * or similar in the UI.
   * @public
   * @type {NutrientViewer.SignatureValidationStatus}
   */
  readonly valid: "valid";
  /**
   * The overall status of the signature is valid with concerns, that is, it should be shown with
   * a yellow warning or similar in the UI.
   * @public
   * @type {NutrientViewer.SignatureValidationStatus}
   */
  readonly warning: "warning";
  /**
   * The overall status of the signature is that it is invalid, that is, it should be shown with
   * a red cross of similar in the UI.
   * @public
   * @type {NutrientViewer.SignatureValidationStatus}
   */
  readonly error: "error";};


declare type SignatureValidationStatusType = (typeof SignatureValidationStatus)[keyof typeof SignatureValidationStatus];

/**
 * Represents a digital certificate used for signing documents.
 * @public
 * @interface SigningCertificate
 * @memberof NutrientViewer
 * @summary Information about the signing certificate.
 */
declare type SigningCertificate = {
  type: 'pspdfkit/certificate';
  isCACertificate: boolean;
  isSelfSigned: boolean;
  issuerCommonName: string;
  serialNumberHex: string;
  subjectCommonName: string;
  validFrom: string;
  validUntil: string;};


declare type SigningData = {
  certificates?: ArrayBuffer[] | string[];
  signatureType: SignatureTypeType;
  signatureContainer?: SignatureContainerType;
  privateKey?: string;
  timestamp?: TimestampType;
  ltv?: boolean;
  padesLevel?: PAdESLevelType;};

/**
 * Contains information to be optionally passed along to the backend signing service when
 * {@link `NutrientViewer.Instance.signDocument()`} is called, so it can be used
 * for identification, security or any other purpose.
 * @public
 * @summary Data for the digital signing service.
 * @typedef {NutrientViewer.ServerSigningServiceData | NutrientViewer.StandaloneSigningServiceData} SigningServiceData
 * @memberof NutrientViewer
 */
declare type SigningServiceData = ServerSigningServiceData | StandaloneSigningServiceData;

/**
 * @classdesc
 * A size is a 2D vector that describes the size of an element. It has the values `width` and
 * `height`. Provided values are defined in same units used by the page, point units. Point units are
 * only equal to pixels when zoom value is `1`.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `size.set("width", 20)`.
 * @example <caption>Create and update a size</caption>
 * const size = new NutrientViewer.Geometry.Size({ width: 200, height: 100 });
 * size = size.set("height", 200);
 * size.height; // => 200
 * @public
 * @memberof NutrientViewer.Geometry
 * @summary A 2D vector that describes the size of an element.
 * @class Size
 * @param {object} args An object used to initialize the size. If `width` or `height` is omitted,
 *        `0` will be used instead.
 * @default { width: 0, height: 0 }
 * @extends Immutable.Record
 */
export declare class Size extends Size_base {
  /**
   * Scales the width and height by a given `factor`.
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20, height: 30 });
   * size.scale(2); // => Size {width: 40, height: 60}
   * @public
   * @instance
   * @function scale
   * @memberof NutrientViewer.Geometry.Size
   * @param {number} factor The scale factor.
   * @returns {NutrientViewer.Geometry.Size} A new `Size`.
   */
  scale(factor: number): Size;
  /**
   * Returns a new size with `width` and `height` rounded to a number which is greater than or equal
   * to the current value.
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20.5, height: 30.1 });
   * size.ceil(); // => Size {width: 21, height: 31}
   * @public
   * @instance
   * @function ceil
   * @memberof NutrientViewer.Geometry.Size
   * @returns {NutrientViewer.Geometry.Size} A new `Size`.
   */
  ceil(): Size;
  /**
   * Returns a new size with `width` and `height` rounded to a number which is smaller than or equal
   * to the current value.
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20.5, height: 30.1 });
   * size.floor(); // => Size {width: 20, height: 30}
   * @public
   * @instance
   * @function floor
   * @memberof NutrientViewer.Geometry.Size
   * @returns {NutrientViewer.Geometry.Size} A new `Size`.
   */
  floor(): Size;
  /**
   * Returns a new size with the `width` set to the current `height` value and the `height`
   * set to the current `width` value.
   * @example
   * var size = new NutrientViewer.Geometry.Size({ width: 20.5, height: 30.1 });
   * size.swapDimensions(); // => Size {width: 30.1, height: 20.5}
   * @public
   * @instance
   * @function swapDimensions
   * @memberof NutrientViewer.Geometry.Size
   * @returns {NutrientViewer.Geometry.Size} A new `Size`.
   */
  swapDimensions(): Size;
  /**
   * Applies a transformation to the point by scaling to the dimension [width, height]
   */
  apply(matrix: TransformationMatrix): Size;}


declare const Size_base: Record_2.Factory<ISize>;

declare type Slot<Params> = {
  /**
   * The render function is called whenever any `params` change that may affect the UI and expects a DOM element to be returned.
   *
   * This may be called any number of times.
   * You should treat this as a pure function and always return a DOM element based on the current `params`.
   */
  render?: (params: Params) => HTMLElement | null;
  /**
   * Invoked once, when the component is mounted to the DOM.
   * Use it for setup tasks such as attaching event listeners, firing analytics events, etc.
   */
  onMount?: (id: string) => void;
  /**
   * Invoked once, when the component is unmounted from the DOM.
   * Use it for cleanup tasks such as removing event listeners, etc.
   */
  onUnmount?: (id: string) => void;};

/**
 * @classdesc
 * A squiggle markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a squiggle annotation</caption>
 * const rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new NutrientViewer.Annotations.SquiggleAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Squiggle markup annotation.
 * @class SquiggleAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.MarkupAnnotation
 */
export declare class SquiggleAnnotation<T extends ISquiggleAnnotation = ISquiggleAnnotation> extends TextMarkupAnnotation<T> {
  static className: string;
  static readableName: string;
  static defaultValues: IObject;}

/**
 * Create a new immutable Stack containing the values of the provided
 * collection-like.
 *
 * The iteration order of the provided collection is preserved in the
 * resulting `Stack`.
 *
 * Note: `Stack` is a factory function and not a class, and does not use the
 * `new` keyword during construction.
 */
declare function Stack(): Stack<any>;

declare function Stack<T>(): Stack<T>;

declare function Stack<T>(collection: Iterable<T>): Stack<T>;

/**
 * Stacks are indexed collections which support very efficient O(1) addition
 * and removal from the front using `unshift(v)` and `shift()`.
 *
 * For familiarity, Stack also provides `push(v)`, `pop()`, and `peek()`, but
 * be aware that they also operate on the front of the list, unlike List or
 * a JavaScript Array.
 *
 * Note: `reverse()` or any inherent reverse traversal (`reduceRight`,
 * `lastIndexOf`, etc.) is not efficient with a Stack.
 *
 * Stack is implemented with a Single-Linked List.
 */
declare namespace Stack {

  /**
   * True if the provided value is a Stack
   */
  function isStack(maybeStack: any): maybeStack is Stack<any>;

  /**
   * Creates a new Stack containing `values`.
   */
  function of<T>(...values: Array<T>): Stack<T>;}


declare interface Stack<T> extends Collection.Indexed<T> {

  /**
   * The number of items in this Stack.
   */
  readonly size: number;

  // Reading values

  /**
   * Alias for `Stack.first()`.
   */
  peek(): T | undefined;


  // Persistent changes

  /**
   * Returns a new Stack with 0 size and no values.
   *
   * Note: `clear` can be used in `withMutations`.
   */
  clear(): Stack<T>;

  /**
   * Returns a new Stack with the provided `values` prepended, shifting other
   * values ahead to higher indices.
   *
   * This is very efficient for Stack.
   *
   * Note: `unshift` can be used in `withMutations`.
   */
  unshift(...values: Array<T>): Stack<T>;

  /**
   * Like `Stack#unshift`, but accepts a collection rather than varargs.
   *
   * Note: `unshiftAll` can be used in `withMutations`.
   */
  unshiftAll(iter: Iterable<T>): Stack<T>;

  /**
   * Returns a new Stack with a size ones less than this Stack, excluding
   * the first item in this Stack, shifting all other values to a lower index.
   *
   * Note: this differs from `Array#shift` because it returns a new
   * Stack rather than the removed value. Use `first()` or `peek()` to get the
   * first value in this Stack.
   *
   * Note: `shift` can be used in `withMutations`.
   */
  shift(): Stack<T>;

  /**
   * Alias for `Stack#unshift` and is not equivalent to `List#push`.
   */
  push(...values: Array<T>): Stack<T>;

  /**
   * Alias for `Stack#unshiftAll`.
   */
  pushAll(iter: Iterable<T>): Stack<T>;

  /**
   * Alias for `Stack#shift` and is not equivalent to `List#pop`.
   */
  pop(): Stack<T>;


  // Transient changes

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#withMutations`
   */
  withMutations(mutator: (mutable: this) => any): this;

  /**
   * Note: Not all methods can be used on a mutable collection or within
   * `withMutations`! Check the documentation for each method to see if it
   * mentions being safe to use in `withMutations`.
   *
   * @see `Map#asMutable`
   */
  asMutable(): this;

  /**
   * @see `Map#wasAltered`
   */
  wasAltered(): boolean;

  /**
   * @see `Map#asImmutable`
   */
  asImmutable(): this;

  // Sequence algorithms

  /**
   * Returns a new Stack with other collections concatenated to this one.
   */
  concat<C>(...valuesOrCollections: Array<Iterable<C> | C>): Stack<T | C>;

  /**
   * Returns a new Stack with values passed through a
   * `mapper` function.
   *
   *     Stack([ 1, 2 ]).map(x => 10 * x)
   *     // Stack [ 10, 20 ]
   *
   * Note: `map()` always returns a new instance, even if it produced the same
   * value at every step.
   */
  map<M>(
  mapper: (value: T, key: number, iter: this) => M,
  context?: any)
  : Stack<M>;

  /**
   * Flat-maps the Stack, returning a new Stack.
   *
   * Similar to `stack.map(...).flatten(true)`.
   */
  flatMap<M>(
  mapper: (value: T, key: number, iter: this) => Iterable<M>,
  context?: any)
  : Stack<M>;

  /**
   * Returns a new Set with only the values for which the `predicate`
   * function returns true.
   *
   * Note: `filter()` always returns a new instance, even if it results in
   * not filtering out any values.
   */
  filter<F extends T>(
  predicate: (value: T, index: number, iter: this) => value is F,
  context?: any)
  : Set_2<F>;
  filter(
  predicate: (value: T, index: number, iter: this) => any,
  context?: any)
  : this;

  /**
   * Returns a Stack "zipped" with the provided collections.
   *
   * Like `zipWith`, but using the default `zipper`: creating an `Array`.
   *
   * ```js
   * const a = Stack([ 1, 2, 3 ]);
   * const b = Stack([ 4, 5, 6 ]);
   * const c = a.zip(b); // Stack [ [ 1, 4 ], [ 2, 5 ], [ 3, 6 ] ]
   * ```
   */
  zip<U>(other: Collection<any, U>): Stack<[T, U]>;
  zip<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Stack<[T, U, V]>;
  zip(...collections: Array<Collection<any, any>>): Stack<any>;

  /**
   * Returns a Stack "zipped" with the provided collections.
   *
   * Unlike `zip`, `zipAll` continues zipping until the longest collection is
   * exhausted. Missing values from shorter collections are filled with `undefined`.
   *
   * ```js
   * const a = Stack([ 1, 2 ]);
   * const b = Stack([ 3, 4, 5 ]);
   * const c = a.zipAll(b); // Stack [ [ 1, 3 ], [ 2, 4 ], [ undefined, 5 ] ]
   * ```
   *
   * Note: Since zipAll will return a collection as large as the largest
   * input, some results may contain undefined values. TypeScript cannot
   * account for these without cases (as of v2.5).
   */
  zipAll<U>(other: Collection<any, U>): Stack<[T, U]>;
  zipAll<U, V>(other: Collection<any, U>, other2: Collection<any, V>): Stack<[T, U, V]>;
  zipAll(...collections: Array<Collection<any, any>>): Stack<any>;

  /**
   * Returns a Stack "zipped" with the provided collections by using a
   * custom `zipper` function.
   *
   * ```js
   * const a = Stack([ 1, 2, 3 ]);
   * const b = Stack([ 4, 5, 6 ]);
   * const c = a.zipWith((a, b) => a + b, b);
   * // Stack [ 5, 7, 9 ]
   * ```
   */
  zipWith<U, Z>(
  zipper: (value: T, otherValue: U) => Z,
  otherCollection: Collection<any, U>)
  : Stack<Z>;
  zipWith<U, V, Z>(
  zipper: (value: T, otherValue: U, thirdValue: V) => Z,
  otherCollection: Collection<any, U>,
  thirdCollection: Collection<any, V>)
  : Stack<Z>;
  zipWith<Z>(
  zipper: (...any: Array<any>) => Z,
  ...collections: Array<Collection<any, any>>)
  : Stack<Z>;}


/**
 * @classdesc
 * The Nutrient Web SDK supports stamp annotations and comes with some out-of-the-box stamp annotations
 * available.
 * @example <caption>Create a stamp annotation</caption>
 * var annotation = new NutrientViewer.Annotations.StampAnnotation({
 *   pageIndex: 0,
 *   stampType: 'Custom'
 *   title: 'Example Stamp',
 *   subtitle: 'Example Stamp Annotation',
 *   color: new Color({ r: 0, g: 51, b: 79 }),
 *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 150, height: 40 }),
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Display a stamp annotation, which represent a predefined or customized stamp in a PDF file.
 * @class StampAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 * @seealso NutrientViewer.Instance#setStampAnnotationTemplates NutrientViewer.defaultStampAnnotationTemplates
 * @seealso  NutrientViewer.Configuration#stampAnnotationTemplates
 */
/**
 * One of the predefined stamp types. Can be any of:
 * - `Approved`
 * - `NotApproved`
 * - `Draft`
 * - `Final`
 * - `Completed`
 * - `Confidential`
 * - `ForPublicRelease`
 * - `NotForPublicRelease`
 * - `ForComment`
 * - `Void`
 * - `PreliminaryResults`
 * - `InformationOnly`
 * - `Rejected`
 * - `Accepted`
 * - `InitialHere`
 * - `SignHere`
 * - `Witness`
 * - `AsIs`
 * - `Departmental`
 * - `Experimental`
 * - `Expired`
 * - `Sold`
 * - `TopSecret`
 * - `Revised`
 * - `RejectedWithText`
 * - `Custom`
 * @public
 * @instance
 * @member {string} stampType
 * @memberof NutrientViewer.Annotations.StampAnnotation
 * @default "Custom"
 */
/**
 * The main text of a custom stamp annotation.
 * @public
 * @instance
 * @member {?string} title
 * @memberof NutrientViewer.Annotations.StampAnnotation
 */
/**
 * The sub text of a custom stamp annotation.
 * @public
 * @instance
 * @member {?string} subtitle
 * @memberof NutrientViewer.Annotations.StampAnnotation
 */
/**
 * The color of a stamp annotation.
 * @public
 * @instance
 * @member {?NutrientViewer.Color} color
 * @memberof NutrientViewer.Annotations.StampAnnotation
 */
/**
 * When set, the annotation will not scale up in the page when it's zoomed in.
 * The flag doesn't have an effect when the page is zoomed out to a zoom level less than `1`.
 * @public
 * @instance
 * @member {?boolean} noZoom
 * @memberof NutrientViewer.Annotations.StampAnnotation
 * @default false
 */
/**
 * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
 * annotation with a rotation value of `0` will make it appear in the same direction as the UI
 * appears, when no {@link NutrientViewer.ViewState#pagesRotation} is set.
 *
 * Stamp annotations support free rotation using integers between 0° and 359°. Negative values or values
 * above 359 are normalized to this interval. Attempting to use non-integer values will result in
 * an error.
 * @public
 * @instance
 * @member {number} rotation
 * @memberof NutrientViewer.Annotations.StampAnnotation
 * @default 0
 */
export declare class StampAnnotation<T extends IStampAnnotation = IStampAnnotation> extends Annotation<T> {
  stampType: StampKind;
  title: null | string;
  subtitle: null | string;
  color: null | Color;
  xfdfAppearanceStream: null | string;
  xfdfAppearanceStreamOriginalPageRotation: null | number;
  static defaultValues: IObject;
  static readableName: string;}

export declare type StampAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/stamp';
  stampType: StampKind;
  title: string | null;
  color?: string | null;
  subTitle?: string | null;
  subtitle: string | null;
  rotation: number | null;
  xfdfAppearanceStream?: string;
  xfdfAppearanceStreamOriginalPageRotation?: number;
  kind?: StampKind;};

declare class StampAnnotationSerializer extends AnnotationSerializer {
  annotation: StampAnnotation;
  constructor(annotation: StampAnnotation);
  toJSON(): StampAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<StampAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): StampAnnotation;}

declare function StampAnnotationTemplatesMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest stamp and image annotation templates. This value changes
     * whenever {@link NutrientViewer.Instance#setStampAnnotationTemplates} is called.
     *
     * Mutating this array will have no effect.
     * @public
     * @readonly
     * @instance
     * @member {Array.<NutrientViewer.Annotations.StampAnnotation | NutrientViewer.Annotations.ImageAnnotation>} stampAnnotationTemplates
     * @memberof NutrientViewer.Instance
     */
    readonly stampAnnotationTemplates: (ImageAnnotation<IImageAnnotation> | StampAnnotation<IStampAnnotation>)[];
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setStampAnnotationTemplates|setStampAnnotationTemplates()}
     * method to do atomic updates to the current stamp annotation templates.
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setStampAnnotationTemplates(stamps => {
     *   stamps.pop(); // removes the last template of the stamps array
     *   return stamps;
     * });
     * @public
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~StampAnnotationTemplatesSetter
     * @param {Array.<NutrientViewer.Annotations.StampAnnotation | NutrientViewer.Annotations.ImageAnnotation>} currentStampAnnotationTemplates
     * @returns {Array.<NutrientViewer.Annotations.StampAnnotation | NutrientViewer.Annotations.ImageAnnotation>} The new stamp and image annotation templates.
     */
    /**
     * This method is used to update the stamp annotation templates.
     *
     * It makes it possible to add new {@link NutrientViewer.stampAnnotationTemplates|stamp and image annotation templates}
     * and edit or remove existing ones.
     *
     * When you pass in an `array` with {@link NutrientViewer.Annotations.StampAnnotation}, the current
     * templates will be immediately updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * Array<NutrientViewer.Annotations.StampAnnotation | NutrientViewer.Annotations.ImageAnnotation> `Array` as argument.
     * You can use this to modify the array based on its current value. This type of update is guaranteed
     * to be atomic - the value of `currentStampAnnotationTemplates` can't change in between.
     * See: {@link NutrientViewer.Instance~StampAnnotationTemplatesSetter|StampAnnotationTemplatesSetter}
     *
     * When one of the supplied {@link NutrientViewer.Annotations.StampAnnotation} or
     * {@link NutrientViewer.Annotations.ImageAnnotation} is invalid, this method will throw a
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * Since `stampAnnotationTemplates` is a regular JavaScript `Array`, it can be manipulated
     * using standard `Array` methods.
     * @example <caption>The new changes will be applied immediately</caption>
     * instance.setStampAnnotationTemplates(newStampAnnotationTemplates);
     * instance.stampAnnotationTemplates === newStampAnnotationTemplates; // => true
     * @example <caption>Adding a stamp annotation template.</caption>
     * const myStampAnnotationTemplate = new NutrientViewer.Annotations.StampAnnotation({
     *   stampType: "Custom",
     *   title: "My custom template title",
     *   subtitle: "Custom subtitle",
     *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 0, top: 0, width: 192, height: 64 })
     * });
     * instance.setStampAnnotationTemplates(stampAnnotationTemplates => [ ...stampAnnotationTemplates, myStampAnnotationTemplate ]);
     * @public
     * @instance
     * @function setStampAnnotationTemplates
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied stamp annotation template `array` is not valid.
     * @param {Array.<NutrientViewer.Annotations.StampAnnotation | NutrientViewer.Annotations.ImageAnnotation>|NutrientViewer.Instance~StampAnnotationTemplatesSetter} stateOrFunction
         * Either a new StampAnnotationTemplates `Array` which would overwrite the existing one, or a callback that
         * will get invoked with the current stamp and image annotation templates and is expected to return
         * the new stamp annotation stamps `Array`.
         */
    setStampAnnotationTemplates(stateOrFunction: Array<StampAnnotation | ImageAnnotation> | SetStampAnnotationTemplatesFunction): void;};} &

T;

declare type StampKind = 'Approved' | 'NotApproved' | 'Draft' | 'Final' | 'Completed' | 'Confidential' | 'ForPublicRelease' | 'NotForPublicRelease' | 'ForComment' | 'Void' | 'PreliminaryResults' | 'InformationOnly' | 'Rejected' | 'Accepted' | 'InitialHere' | 'SignHere' | 'Witness' | 'AsIs' | 'Departmental' | 'Experimental' | 'Expired' | 'Sold' | 'TopSecret' | 'Revised' | 'RejectedWithText' | 'Custom';

export declare type StandaloneConfiguration = SharedConfiguration & {
  /**
   * ***required, Standalone only***
   *
   * The URL to a supported document or its content as `ArrayBuffer`.
   *
   * NutrientViewer supports the following type of documents:
   *
   * - PDF
   * - Image
   *
   * Note that all the formats except for PDF require a dedicated license.
   * Please contact sales to find out more about this.
   *
   * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
   * @example <caption>Load a PDF document from an URI</caption>
   * NutrientViewer.load({ document: 'https://example.com/document.pdf', ... });
   * @example <caption>Load a document from an ArrayBuffer</caption>
   * NutrientViewer.load({ document: arrayBuffer, ... });
   * @public
   * @standalone
   * @instance
   * @member {string|ArrayBuffer} document
   * @memberof NutrientViewer.Configuration
   */
  document: string | ArrayBuffer;
  /**
   * *optional, Standalone only*
   *
   * This allows you to overwrite the auto-detected URL for the processor engine worker NutrientViewer assets in Standalone mode.
   * This setting may be necessary when you integrate Nutrient Web SDK in an environment that limits
   * the size of the static assets, like Salesforce.
   *
   * If these assets are served from a different origin, you have to include proper CORS headers:
   * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
   *
   * This must end with a trailing slash, and the assets in the `/nutrient-viewer-lib/gdpicture-[hash]/` folder must be directly located
   * in the folder pointed to by `baseProcessorEngineUrl`.
   * @example
   * NutrientViewer.load({ baseProcessorEngineUrl: 'https://public-cdn.example.com/pspdfkit-processor-engine/' });
   * @instance
   * @public
   * @member {?string} baseProcessorEngineUrl
   * @memberof NutrientViewer.Configuration
   * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
   * from the currently executed `&lt;script&gt;` tag.
   */
  baseProcessorEngineUrl?: string;
  /**
   * ***Standalone only***
   *
   * Nutrient Web SDK license key from https://my.nutrient.io/.
   *
   * If not provided, the instance will run in trial mode for a limited time and then request the user to visit
   * {@link https://www.nutrient.io/try/} to request a trial license.
   * @example <caption>Activate with a license key</caption>
   * NutrientViewer.load({ licenseKey: "YOUR_LICENSE_KEY_GOES_HERE", ... });
   * @public
   * @standalone
   * @instance
   * @member {?string} licenseKey
   * @memberof NutrientViewer.Configuration
   */
  licenseKey?: string;
  /**
   * ***Standalone only***
   *
   * [Instant JSON](https://www.nutrient.io/guides/web/importing-exporting/instant-json/) can be
   * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be used
   * to store annotation changes on your server and conveniently instantiate the viewer with the same
   * content at a later time.
   *
   * Instead of storing the updated PDF, this serialization only contains a diff that is applied
   * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
   * potentially large PDF all the time.
   *
   * You can export this format from a standalone instance by using
   * {@link NutrientViewer.Instance#exportInstantJSON}.
   *
   * `annotations` will follow the [Instant Annotation JSON format specification](https://www.nutrient.io/guides/web/json/schema/annotations/).
   * @example
   * NutrientViewer.load({
   *   instantJSON: {
   *     format: 'https://pspdfkit.com/instant-json/v1',
   *     skippedPdfObjectIds: [1],
   *     annotations: [
   *       { id:  1, pdfObjectId: 1, type: 'pspdfkit/text', content: 'Hello World', ...},
   *       { id: -1, type: 'pspdfkit/text', content: 'Hello Universe', ...},
   *     ],
   *   },
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?object} instantJSON
   * @memberof NutrientViewer.Configuration
   */
  instantJSON?: InstantJSON;
  /**
   * ***Standalone only***
   *
   * [XFDF](https://en.wikipedia.org/wiki/Portable_Document_Format#XML_Forms_Data_Format_(XFDF)) can be
   * used to instantiate a viewer with a diff that is applied to the raw PDF. This format can be used
   * to store annotation and form fields changes on your server and conveniently instantiate the viewer with the same
   * content at a later time.
   *
   * Instead of storing the updated PDF, this serialization only contains a diff that is applied
   * on top of the existing PDF and thus allows you to cache the PDF and avoid transferring a
   * potentially large PDF all the time.
   *
   * You can export this format from a standalone instance by using
   * {@link NutrientViewer.Instance#exportXFDF}.
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?string} XFDF
   * @memberof NutrientViewer.Configuration
   */
  XFDF?: string;
  /**
   * ***Standalone only***
   *
   * Whether the annotations embedded in the PDF document should be kept instead of replaced importing XFDF.
   *
   * The default import behavior will replace all annotations.
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   XFDFKeepCurrentAnnotations: true,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?boolean} XFDFKeepCurrentAnnotations
   * @memberof NutrientViewer.Configuration
   * @default false
   */
  XFDFKeepCurrentAnnotations?: boolean;
  /**
   * ***Standalone only***
   *
   * Whether the imported XFDF should ignore the page rotation.
   *
   * The default import behavior will take the page rotation into account.
   *
   * This is useful when you have PDF pages that look the same, but have different underlying page rotations.
   * Use in connection with {@link NutrientViewer.Instance#exportXFDF} ignorePageRotation parameter.
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   XFDFIgnorePageRotation: true,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?boolean} XFDFIgnorePageRotation
   * @memberof NutrientViewer.Configuration
   * @default false
   */
  XFDFIgnorePageRotation?: boolean;
  /**
   * ***Standalone only***
   *
   * Whether the imported XFDF should have rich text annotations or not.
   *
   * The default import behavior will convert rich text annotations to plain text annotations.
   * If set to `true`, rich text annotations will be supported and plain text annotations
   * will be converted to rich text annotations.
   * @example
   * NutrientViewer.load({
   *   XFDF: xfdfString,
   *   XFDFRichTextEnabled: true,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?boolean} XFDFRichTextEnabled
   * @memberof NutrientViewer.Configuration
   * @default false
   */
  XFDFRichTextEnabled?: boolean;
  disableIndexedDBCaching?: boolean;
  /**
   * ***Standalone only***
   *
   * By default, only links that are represented as valid link annotations in the PDF will be enabled.
   * When `enableAutomaticLinkExtraction` is set to `true`, the text of the PDF will be scanned and
   * links will automatically be created.
   *
   * To enable automatic link extraction on a Nutrient Document Engine (server-backed) deployment, check out:
   * {@link https://www.nutrient.io/guides/web/pspdfkit-server/configuration/overview/}
   * @example
   * NutrientViewer.load({
   *   enableAutomaticLinkExtraction: true,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?boolean} enableAutomaticLinkExtraction
   * @memberof NutrientViewer.Configuration
   */
  enableAutomaticLinkExtraction?: boolean;
  /**
   * ***Standalone only***
   *
   * Nutrient Web SDK uses an object pool to keep disposed instances in memory for fast reuse.
   * Since this process can be memory inefficient, by default we only keep one instance in memory.
   *
   * With this configuration option you can tune in the number of instances to keep in memory,
   * or disable object pooling by setting this parameter to 0.
   *
   * More about this feature: https://www.nutrient.io/blog/2018/optimize-webassembly-startup-performance/#object-pooling-caching-instances-d548cb
   * @example
   * NutrientViewer.load({
   *   standaloneInstancesPoolSize: 2,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @default 1
   * @member {?number} standaloneInstancesPoolSize
   * @memberof NutrientViewer.Configuration
   */
  standaloneInstancesPoolSize?: number;
  /**
   * ***required, Standalone only***
   *
   * By implementing this callback you have a fine grained control over which
   * certificates are going to be used for digital signatures validation.
   *
   * The callback must return an `Array` of `ArrayBuffer` (DER) or `string` (PEM)
   * containing X.509 certificates.
   *
   * See
   * {@link https://www.nutrient.io/guides/web/digital-signatures/create-custom-certificate-sets/#standalone-deployment|this guide article}
   * to learn more.
   * @example <caption>Fetch and use custom set of certificates (Standalone)</caption>
   * NutrientViewer.load({
   *   trustedCAsCallback: function() {
   *     return new Promise((resolve, reject) => {
   *        fetch("/your-certificate.cer")
   *         .then(res => res.arrayBuffer())
   *         .then(cert => resolve([cert]))
   *         .catch(reject)
   *     });
   *   },
   *   // ...
   * })
   * @public
   * @standalone
   * @instance
   * @member {?NutrientViewer.TrustedCAsCallback} trustedCAsCallback
   * @memberof NutrientViewer.Configuration
   */
  trustedCAsCallback?: TrustedCAsCallback;
  /**
   * ***optional, Standalone only***
   *
   * This property allows you to provide custom fonts you want to use when loading a Standalone
   * instance.
   *
   * From the `callback` defined on each {@link NutrientViewer.Font} instance you can return a promise
   * that resolves to a `Blob` of the font you want to use. You are free to fetch it in whatever
   * way you want, and optimize its loading by retrieving it from a cache using the
   * {@link https://developer.mozilla.org/en-US/docs/Web/API/Cache|Cache API}, get it
   * from {@link https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API|IndexedDB}, etc.
   *
   *
   * See
   * {@link https://www.nutrient.io/guides/web/features/custom-fonts/|this guide article}
   * to learn more.
   * @example <caption>Fetch and use a custom set of fonts (Standalone)</caption>
   * const fetcher = name =>
   *   fetch(`https://example.com/${name}`).then(r => {
   *     if (r.status === 200) {
   *       return r.blob();
   *     } else {
   *       throw new Error();
   *     }
   *   });
   *
   * const customFonts = ["arial.ttf", "helvetica.ttf", "tahoma.ttf"]
   *    .map(font => new NutrientViewer.Font({ name: font, callback: fetcher }));
   *
   * NutrientViewer.load({
   *   customFonts,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {?Array<NutrientViewer.Font>} customFonts
   * @memberof NutrientViewer.Configuration
   */
  customFonts?: Array<Font>;
  /**
   * *optional*
   *
   * When integrating NutrientViewer for Electron with context isolation enabled, this
   * property needs to be set for the SDK to work. It will be ignored in any other case.
   *
   * The value of this property needs to match the provided license key's bundle ID.
   * @example
   * NutrientViewer.load({ electronAppName: "my-electron-app" })
   * @public
   * @instance
   * @member {?string} electronAppName
   * @memberof NutrientViewer.Configuration
   * @deprecated Use {@link NutrientViewer.Configuration#appName|`Configuration.appName`} and {@link NutrientViewer.Configuration#productId|`Configuration.productId`} instead.
   */
  electronAppName?: string;
  /**
   * *optional*
   *
   * When integrating NutrientViewer for Electron with context isolation enabled, this
   * property needs to be set for the SDK to work. It will be ignored in any other case.
   *
   * The value of this property needs to match the provided license key's bundle ID.
   * @example
   * NutrientViewer.load({ appName: "my-electron-app" })
   * @public
   * @instance
   * @member {?string} appName
   * @memberof NutrientViewer.Configuration
   */
  appName?: string;














  isSharePoint?: boolean;














  isSalesforce?: boolean;
  /**
   * ***optional, Standalone only***
   *
   * Allows specifying the environment in which the SDK is running.
   * @example
   * NutrientViewer.load({ productId: NutrientViewer.ProductId.SharePoint });
   * @public
   * @instance
   * @member {NutrientViewer.ProductId} productId
   * @memberof NutrientViewer.Configuration
   */
  productId?: IProductId;
  /**
   * ***optional, Standalone only***
   *
   * Document processing can be a time-consuming task, especially when working with large documents. In order to improve the user experience
   * it is possible to choose between two different processor engines with different optimizations applied: either one with a
   * smaller bundle size (the default), but slower overall performance, or one with a larger bundle size, but faster processing time.
   *
   * Either case it's recommended to enable asset compression on your Server to improve loading time.
   * @example
   * NutrientViewer.load({ processorEngine: NutrientViewer.ProcessorEngine.fasterProcessing });
   * @public
   * @instance
   * @member {NutrientViewer.ProcessorEngine} processorEngine
   * @memberof NutrientViewer.Configuration
   * @default NutrientViewer.ProcessorEngine.fasterProcessing
   */
  processorEngine?: IProcessorEngine;
  /**
   * ***optional, Standalone only***
   *
   * This property allows you to provide a URL to JSON file with fonts available for downloading, associated
   * with specific ranges of characters and font variations.
   *
   * The downloadable font files need to be in the same scope as the JSON file.
   *
   * The JSON file needs to be in the following format:
   *
   * ```js
   * type FontName = {
   * // The full name of the font.
   * fullName: string;
   * // The next four properties are from the `name` table in the font.
   * // See https://learn.microsoft.com/en-us/typography/opentype/spec/name#name-ids
   * // Name ID 1: Font Family name
   * family?: string;
   * // Name ID 2: Font Subfamily name
   * subfamily?: string;
   * // Name ID 16: Typographic Family name
   * typographicFamily?: string;
   * // Name ID 17: Typographic Subfamily name
   * typographicSubfamily?: staring;
   * }
   *
   * // Represents a font that can be downloaded.
   * // filePath + faceIndex should be unique.
   * type Font = {
   * name: FontName;
   * // Path to the font file.
   * filePath: string;
   * // If the font file is a collection, this specifies the face index.
   * faceIndex?: int;
   * // A list of all code points supported by the font.
   * // This can either be a range ([number, number]) or a single codepoint.
   * codePoints: [[number, number] | number];
   * // The unicode ranges from the OS/2 table: https://learn.microsoft.com/en-us/typography/opentype/spec/os2#ur
   * unicodeRanges?: [4 numbers];
   * // A sha1 of the font file. For collections, this is a SHA of the whole file, not a single font.
   * sha1: string;
   * // Specifies true if the font is allowed to be embedded, false otherwise.
   * // Should only be used to make a decision to download the font, proper licensing handling should be done with the downloaded font.
   * allowedToEmbed: boolean;
   * // The boldness of the font. See https://learn.microsoft.com/en-us/typography/opentype/spec/os2#wtc
   * weight?: number;
   * }
   *
   * type DynamicFonts = {
   * availableFonts: [Font];
   * v: 1;
   * }
   * ```
   * @example <caption>Provide a list of downloadable font files (Standalone)</caption>
   * NutrientViewer.load({
   *   dynamicFonts: "https://example.com/assets/fonts.json",
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @member {string} dynamicFonts
   * @memberof NutrientViewer.Configuration
   */
  dynamicFonts?: string;
  /**
   * ***Standalone only***
   *
   * By default, we load the required Web Workers inline. That means that the Web Workers are loaded as a
   * blob URL, which allows us to load a Worker from other domains. However, this might interfere with strict CSP policies like `worker-src: 'self'`.
   * In that case, you can disable the inline loading of the Web Workers by setting this option to `false`.
   *
   * **Note**: This option is currently not supported in Salesforce environment.
   * @example
   * NutrientViewer.load({
   *   inlineWorkers: false,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @default true
   * @member {?boolean} inlineWorkers
   * @memberof NutrientViewer.Configuration
   */
  inlineWorkers?: boolean;
  /**
   * ***Standalone only***
   *
   * Allows configuring some behavior around forms in the viewer.
   * @example
   * NutrientViewer.load({
   *   formsConfiguration: { ... },
   * });
   * @public
   * @standalone
   * @instance
   * @default undefined
   * @member {?FormsConfiguration} formsConfiguration
   * @memberof NutrientViewer.Configuration
   */
  formsConfiguration?: FormsConfiguration;
  /**
   * ***Standalone only***
   *
   * Enables or disables loading of linearized PDFs.
   * When enabled, the SDK takes advantage of linearized (also known as "fast web view") PDFs,
   * allowing portions of the document to be displayed while it's still being downloaded.
   * If enabled, the PDF viewer will render the document progressively, starting with the first pages,
   * while the rest of the file is downloaded in the background. The user interface will be in read-only
   * mode during the download.
   *
   * A indicator is displayed in the toolbar showing that the document is being downloaded.
   *
   * **Note**: Linearized loading requires the server to support byte-range requests and the PDF document to be linearized.
   * @example
   * NutrientViewer.load({
   *   allowLinearizedLoading: true,
   *   // ...
   * });
   * @public
   * @standalone
   * @instance
   * @default false
   * @member {?boolean} allowLinearizedLoading
   * @memberof NutrientViewer.Configuration
   */
  allowLinearizedLoading?: boolean;
  isTextComparison?: boolean;
  textComparisonSharedState?: TextComparisonSharedState;
  officeConversionSettings?: OfficeConversionSettings;};

/**
 * *Standalone only*
 *
 * Contains information needed for signing with Nutrient backend in standalone mode. Supports the following backends:
 *
 * * Document Engine (requires Document Engine >= 1.6.0)
 * * {@link https://www.nutrient.io/api/|DWS}
 *
 * The document loaded in your instance will not be transferred over the network, instead document hash and
 * signature properties will be prepared locally and passed to the backend to perform the signing via certificate,
 * finally digital signature is embedded into the document locally.
 *
 * Uses JSON Web Token (JWT) to authorize with the NutrientViewer backend. See Document Engine's
 * {@link https://www.nutrient.io/api/reference/document-engine/upstream/#tag/JWT-authorization|API Reference}
 * for more details about the JWT authorization.
 * @example <caption>Signing document in Web standalone via NutrientViewer backend</caption>
 * instance.signDocument(null, {
 *   jwt: "<auth_token>"
 * })
 *   .then(function () {
 *     console.log("The document has been signed!");
 *   });
 * @public
 * @property {string} jwt - Authentication token needed to authenticate the signing request with the backend.
 * @property {string} serverUrl - Base server URL to use as the signing backend.
 *                                The `<server_url>/api/sign_hash` is used as the signing endpoint
 *                                and `<server_url>/api/get_certificates` is used to retrieve the certificates.
 * @property {string} signingToken - Optional signing token to be passed by the backend to the signing service. Valid only when signing via Document Engine.
 * @summary Data for the hash signing process.
 * @interface StandaloneSigningServiceData
 * @memberof NutrientViewer
 * @since Document Engine 1.6.0
 */
declare type StandaloneSigningServiceData = {
  jwt: string;
  serverUrl?: string;
  signingToken?: string;};


declare type StandaloneTextComparisonConfiguration = SharedTextComparisonConfiguration & {
  documentA: string | ArrayBuffer;
  documentB: string | ArrayBuffer;
  ai?: boolean;
  wordLevel?: boolean;};

/**
 * @classdesc
 * A strike out markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a strike out annotation</caption>
 * const rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new NutrientViewer.Annotations.StrikeOutAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Strike out markup annotation.
 * @class StrikeOutAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.MarkupAnnotation
 */
export declare class StrikeOutAnnotation<T extends IStrikeOutAnnotation = IStrikeOutAnnotation> extends TextMarkupAnnotation<T> {
  static className: string;
  static readableName: string;
  static defaultValues: IObject;}

/**
 * @classdesc
 * PDF action to submit form fields in the current document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("uri", "www.nutrient.io");`.
 *
 * A SubmitFormAction defines which form fields should be submitted, when clicked on it. The form
 * field names and their values will get submitted to the provided URI defined by the `uri`
 * field. By default all form fields will be submitted. The `includeExclude` field defines if the
 * fields specified by `fields`, which are a {@link NutrientViewer.Immutable.List} of form field names,
 * should submit all form fields excluding the defined fields or just the defined fields. When
 * `includeExclude` is set to `true`, all form fields except the fields defined in `fields` will be
 * submitted. If `includeExclude` is set to false, which is the default value for this field, only
 * the form fields defined in `fields` will be submitted.
 * @example <caption>Create a new SubmitFormAction</caption>
 * const action = new NutrientViewer.Actions.SubmitFormAction({
 *   uri: "www.nutrient.io"
 * });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Submit form field names and values of the current document.
 * @class SubmitFormAction
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Actions.Action
 */
export declare class SubmitFormAction extends Action {
  /**
   * The uniform resource identifier (web link) defining where the form should be submitted to, when
   * this action got triggered.
   * @public
   * @instance
   * @member {string} uri
   * @memberof NutrientViewer.Actions.SubmitFormAction
   */
  uri: string;
  /**
   * A List identifying which fields to submit or which to exclude from submitting, depending on the
   * setting of the includeExclude flag. Each element of the array shall be a text string
   * representing the fully qualified name of a field. If this entry is omitted, the includeExclude
   * flag shall be ignored; all fields in the document’s interactive form are submitted.
   * @public
   * @instance
   * @member {?Immutable.List.<string>} fields
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default null
   */
  fields: List<string> | null | undefined;
  /**
   * If false, the fields list specifies which fields to submit.
   * If true, the fields list indicates which fields to exclude from submitting. That is, all fields
   * in the document’s interactive form shall be submitted except those listed in the fields list.
   * @public
   * @instance
   * @member {boolean} includeExclude
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  includeExclude: boolean;
  /**
   * This option is not supported yet.
   * If true, all fields designated by the Fields array and the IncludeExclude flag shall be
   * submitted, regardless of whether they have a value. For fields without a value, only the field
   * name shall be transmitted. If false, fields without a value shall not be submitted.
   * @public
   * @instance
   * @member {boolean} includeNoValueFields
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default true
   */
  includeNoValueFields: boolean;
  /**
   * Meaningful only if the `submitPDF` and `xfdf` flags are false. If set, field names and values shall
   * be submitted in HTML Form format. If false, they shall be submitted in Forms Data Format (FDF)
   * @public
   * @instance
   * @member {boolean} exportFormat
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default true
   */
  exportFormat: boolean;
  /**
   * If true, field names and values shall be submitted using an HTTP GET request. If false, they
   * shall be submitted using a POST request. This flag is meaningful only when the exportFormat
   * flag is set. If exportFormat is false, this flag shall also be false.
   * @public
   * @instance
   * @member {boolean} getMethod
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  getMethod: boolean;
  /**
   * This option is not supported yet.
   * If true, the coordinates of the mouse click that caused the submit-form action shall be
   * transmitted as part of the form data. The coordinate values are relative to the upper-left
   * corner of the field’s widget annotation rectangle. They shall be represented in the data in the
   * format name.x=xval&name.y=yval where name is the field’s name.
   * @public
   * @instance
   * @member {boolean} submitCoordinated
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  submitCoordinated: boolean;
  /**
   * This option is not supported yet.
   * Shall be used only if the SubmitPDF flags are false. If true, field names and values shall be
   * submitted as XFDF.
   * @public
   * @instance
   * @member {boolean} xfdf
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  xfdf: boolean;
  /**
   * This option is not supported yet.
   * Shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If true, the submitted FDF file shall include the
   * contents of all incremental updates to the underlying PDF document, as contained in the
   * Differences entry in the FDF dictionary. If false, the incremental updates shall not be
   * included.
   * @public
   * @instance
   * @member {boolean} includeAppendSaves
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  includeAppendSaves: boolean;
  /**
   * This option is not supported yet.
   * shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If set, the submitted FDF file shall include
   * all markup annotations in the underlying PDF document. If false, markup annotations
   * shall not be included.
   * @public
   * @instance
   * @member {boolean} includeAnnotations
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  includeAnnotations: boolean;
  /**
   * If true, the document shall be submitted as PDF, using the MIME content type application/pdf.
   * @public
   * @instance
   * @member {boolean} submitPDF
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  submitPDF: boolean;
  /**
   * This option is not supported yet.
   * If true, any submitted field values representing dates shall be converted to the standard
   * format.
   * @public
   * @instance
   * @member {boolean} canonicalFormat
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  canonicalFormat: boolean;
  /**
   * This option is not supported yet.
   * shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false) and the IncludeAnnotations flag is true. If true, it
   * shall include only those markup annotations those T entry matches the name of the current user,
   * as determined by the remote server to which the form is being submitted.
   * @public
   * @instance
   * @member {boolean} excludeNonUserAnnotations
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  excludeNonUserAnnotations: boolean;
  /**
   * This option is not supported yet.
   * Shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If true, the submitted FDF shall exclude the F
   * entry.
   * @public
   * @instance
   * @member {boolean} excludeFKey
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  excludeFKey: boolean;
  /**
   * This option is not supported yet.
   * shall be used only when the form is being submitted in Forms Data Format (that is, when both
   * the XFDF and ExportFormat flags are false). If true, the F entry of the submitted FDF shall be a
   * file specification containing an embedded file stream representing the PDF file from which the
   * FDF is being submitted.
   * @public
   * @instance
   * @member {boolean} embedForm
   * @memberof NutrientViewer.Actions.SubmitFormAction
   * @default false
   */
  embedForm: boolean;
  static defaultValues: IObject;
  constructor(args?: ISubmitFormAction);}

declare type TargetType = string | HTMLElement | Instance | null;

/**
 * Describes the data format used to populate a document template.
 * @public
 * @memberof NutrientViewer
 * @interface TemplateDataToPopulateDocument
 * @property {NutrientViewer.TemplateDataToPopulateDocument.Config} config The configuration used to populate the document template.
 * @property {Array<Record<string, unknown>>} model The data used to populate the document template.
 */
export declare type TemplateDataToPopulateDocument = {
  config: DelimiterConfig;
  model: Array<Record<string, unknown>>;};


/**
 * @classdesc
 * A free form text that will be rendered inside the bounding box. It has no open or closed state -
 * instead of being displayed in a pop-up window, the text is always visible.
 *
 * Fonts are client specific and determined during runtime. If a font is not found, we will
 * automatically fall back to a sans serif font.
 *
 * <center>
 *   <img title="Example of a text annotation" src="img/annotations/text_annotation.png" width="350" class="shadow">
 * </center>
 * @example <caption>Create a text annotation</caption>
 * const annotation = new NutrientViewer.Annotations.TextAnnotation({
 *   pageIndex: 0,
 *   text: { format: "plain", value : "Welcome to\nNutrientViewer" },
 *   font: "Helvetica",
 *   isBold: true,
 *   horizontalAlign: "center",
 *   boundingBox: new NutrientViewer.Geometry.Rect({ left: 10, top: 20, width: 30, height: 40 }),
 *   fontColor: NutrientViewer.Color.RED
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Free form text that will be rendered inside the bounding box.
 * @class TextAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 * @seealso NutrientViewer.Instance#calculateFittingTextAnnotationBoundingBox NutrientViewer.Instance#setEditingAnnotation
 */
/**
 * @public
 * @typedef {object} Text@typedef {object} Text
 * @property {string} format The format of the text. Either `plain` or `xhtml`.
 * @property {string} value The text value.
 */
/**
 * The counter-clockwise rotation value in degrees relative to the rotated PDF page. Inserting an
 * annotation with a rotation value of `0` will make it appear in the same direction as the UI
 * appears, when no {@link NutrientViewer.ViewState#pagesRotation} is set.
 *
 * Text annotations support free rotation using integers between 0° and 359°. Negative values or values
 * above 359 are normalized to this interval. Attempting to use non-integer values will result in
 * an error.
 * @public
 * @instance
 * @member {number} rotation
 * @memberof NutrientViewer.Annotations.TextAnnotation
 * @default 0
 */
/**
 * When set, the annotation will not scale up in the page when it's zoomed in.
 * The flag doesn't have an effect when the page is zoomed out to a zoom level less than `1`.
 * The flag is not currently supported when the `callout` property is set.
 * @public
 * @instance
 * @member {?boolean} noZoom
 * @memberof NutrientViewer.Annotations.TextAnnotation
 * @default false
 */
export declare class TextAnnotation<T extends ITextAnnotation = ITextAnnotation> extends Annotation<T> {
  /**
   * The visible contents in plain text/xhtml formats.
   *
   * We use a simple newline delimiter `\n` for multi
   * line texts in case of plain text. A trailing newline (e.g. `foobar\n`) will result in an additional line.
   *
   * In case of XHTML, we support the following tags:
   * - `<b>`: Bold
   * - `<i>`: Italic
   * - `<span>`: Font color, background color and underline using the `style` attribute (e.g. `<span style="color: red; background-color: blue; text-decoration: underline">Hello</span>`)
   * - `p`: Paragraph. You can use this to add a newline between paragraphs.
   * @example <caption>Get the text value of a text annotation</caption>
   * const { value, format } = annotation.text;
   * @public
   * @instance
   * @member {Text} text
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default { format: "plain", value: "" }
   */
  text: {
    format: 'plain' | 'xhtml';
    value: string;};

  /**
   * A {@link NutrientViewer.Color} for the visible glyphs, or `null` for transparent color.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} fontColor
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default Color.BLACK
   */
  fontColor: null | Color;
  /**
   * Optional background color that will fill the complete bounding box.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} backgroundColor
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default null
   */
  backgroundColor: null | Color;
  /**
   * The name of the font family that should be used.
   *
   * Fonts are client specific and determined during runtime. If a font is not found, we will
   * automatically fall back to 'sans-serif'.
   *
   * We test the following list at runtime. The first available font will be used as the default
   * for all new text annotations: Helvetica, Arial, Calibri, Century Gothic, Consolas, Courier,
   * Dejavu Sans, Dejavu Serif, Georgia, Gill Sans, Impact, Lucida Sans, Myriad Pro, Open Sans,
   * Palatino, Tahoma, Times New Roman, Trebuchet, Verdana, Zapfino, Comic Sans.
   * @public
   * @instance
   * @member {string} font
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default "Helvetica"
   */
  font: string;
  /**
   * The font size in page size pixels. Per default, we use values between 10 and 192 inclusive
   * in the UI.
   *
   * The text will scale when you zoom in.
   * @public
   * @instance
   * @member {number} fontSize
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default 18
   */
  fontSize: number;
  /**
   * If `true`, the font will be **bold** if the font family supports this.
   * @public
   * @instance
   * @member {boolean} isBold
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default false
   */
  isBold: boolean;
  /**
   * If `true`, the font will be _italic_ if the font family supports this.
   * @public
   * @instance
   * @member {boolean} isItalic
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default false
   */
  isItalic: boolean;
  isUnderline: boolean;
  /**
   * The horizontal alignment of the text inside the bounding box. Can be either one of:
   *
   * - `left`
   * - `center`
   * - `right`
   *
   * This is equal to the CSS `text-align` property.
   * @public
   * @instance
   * @member {"left" | "center" | "right"} horizontalAlign
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default "left"
   */
  horizontalAlign: 'left' | 'center' | 'right';
  /**
   * The vertical alignment of the text inside the bounding box. Can be either one of:
   *
   * - `top`
   * - `center`
   * - `bottom`
   * @public
   * @instance
   * @member {"top" | "center" | "bottom"} verticalAlign
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default "top"
   */
  verticalAlign: 'top' | 'center' | 'bottom';
  /**
   * When the annotation is modified through Nutrient Web SDK, we will set this flag whenever the
   * whole text fits the bounds of the annotation without overflowing.
   * @public
   * @instance
   * @member {boolean} isFitting
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default false
   * {@link NutrientViewer.Instance#calculateFittingTextAnnotationBoundingBox}
   */
  isFitting: boolean;
  /**
   * The callout that is attached to the annotation.
   * @public
   * @instance
   * @member {?NutrientViewer.Callout} callout
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default null
   */
  callout: null | Callout;
  borderStyle: null | IBorderStyle;
  borderWidth: null | number;
  /**
   * Optional border color that will be used for the text border and the line for text annotations
   * of type callout. It will be not be rendered if the `callout` property is not set.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} borderColor
   * @memberof NutrientViewer.Annotations.TextAnnotation
   * @default null
   */
  borderColor: Color | null;
  static defaultValues: IObject;
  static readonly isEditable = true;
  static readonly readableName = "Text";
  static readonly fontSizePresets: readonly number[];}


export declare type TextAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/text';
  text: {
    format: 'xhtml' | 'plain';
    value: string;};

  fontColor?: string | null;
  backgroundColor?: string | null;
  font?: string | null;
  rotation?: number | null;
  fontSize?: number | null;
  fontStyle?: string[] | null;
  horizontalAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'center' | 'bottom';
  callout?: {
    start: [number, number];
    knee?: [number, number] | null;
    end: [number, number];
    cap?: ILineCap | null;
    innerRectInset?: InsetJSON | null;} |
  null;
  borderStyle?: IBorderStyle | null;
  borderWidth?: number | null;
  borderColor?: string | null;
  isFitting?: boolean;
  lineHeightFactor?: number | null;};

declare class TextAnnotationSerializer extends AnnotationSerializer {
  annotation: TextAnnotation;
  constructor(annotation: TextAnnotation);
  toJSON(): TextAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<TextAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextAnnotation;
  _calloutToJSON(): {
    start: [number, number];
    knee: [number, number] | null;
    end: [number, number];
    cap: ILineCap | null;
    innerRectInset: InsetJSON | null;} |
  null;
  static _JSONToCallout(calloutJSON: TextAnnotationJSON['callout']): Callout | null | undefined;}

/**
 * Describes a block of text within a document.
 * @public
 * @memberof NutrientViewer
 * @interface TextBlock
 * @property {NutrientViewer.Range} range - The range of the text block.
 * @property {number[][]} rects - The rectangular coordinates of the text block.
 */
declare type TextBlock = {
  range: Range_3;
  rect: [number, number, number, number];};

/**
 * Describes the properties of a text block detected on a page.
 *
 * Contains the text, the bounding box in PDF coordinates, and the anchor point.
 * @public
 * @memberof NutrientViewer.ContentEditing
 * @interface TextBlock
 * @seealso NutrientViewer.ContentEditing.Session#getTextBlocks
 */
/**
 * Unique identifier for the text block.
 * @public
 * @instance
 * @member {string} id
 * @memberof NutrientViewer.ContentEditing.TextBlock
 */
/**
 * The text content of the text block.
 *
 * If a text block contains multiple lines, the text will be a single string with new line characters.
 * @public
 * @instance
 * @member {string} text
 * @memberof NutrientViewer.ContentEditing.TextBlock
 */
/**
 * The current bounding box of the text block, in PDF coordinates.
 * @public
 * @instance
 * @member {object} boundingBox
 * @property {number} top - The top coordinate of the bounding box.
 * @property {number} left - The left coordinate of the bounding box.
 * @property {number} width - The width of the bounding box.
 * @property {number} height - The height of the bounding box.
 * @memberof NutrientViewer.ContentEditing.TextBlock
 */
/**
 * The anchor point of the text block.
 * @public
 * @instance
 * @member {object} anchor
 * @property {number} x - The x coordinate of the anchor point.
 * @property {number} y - The y coordinate of the anchor point.
 * @memberof NutrientViewer.ContentEditing.TextBlock
 */
/**
 * The maximum width of the text block.
 * @public
 * @instance
 * @member {number} maxWidth
 * @memberof NutrientViewer.ContentEditing.TextBlock
 */
declare type TextBlock_2 = {
  id: string;
  text: string;
  boundingBox: {
    top: number;
    left: number;
    width: number;
    height: number;};

  anchor: {
    x: number;
    y: number;};

  maxWidth: number;};


declare type TextComparisonAction = ReturnType<ActionCreators[keyof ActionCreators]>;

declare const textComparisonActionCreators: {
  setInstances: (payload: {
    instanceA: Instance;
    instanceB: Instance;
    aiComparisonData?: AIComparisonData | null;}) =>
  {
    type: "SET_INSTANCES";
    payload: {
      instanceA: Instance;
      instanceB: Instance;
      aiComparisonData?: AIComparisonData | null | undefined;};};


  setToolbarItems: (payload: List<ToolbarItem_2>) => {
    type: "SET_TOOLBAR_ITEMS";
    payload: List<ToolbarItem>;};

  setInnerToolbarItems: (payload: List<TextComparisonInnerToolbarItem>) => {
    type: "SET_INNER_TOOLBAR_ITEMS";
    payload: List<TextComparisonInnerToolbarItem>;};

  setComparisonSidebarConfig: (payload: TextComparisonSidebarConfiguration) => {
    type: "SET_COMPARISON_SIDEBAR_CONFIG";
    payload: TextComparisonSidebarConfiguration;};

  setScrollLock: (payload: boolean) => {
    type: "SET_SCROLL_LOCK";
    payload: boolean;};

  setComparisonVisibility: (payload: boolean) => {
    type: "SET_COMPARISON_VISIBILITY";
    payload: boolean;};

  setTextComparisonChanges: (payload: List<TextComparisonChange>) => {
    type: "SET_TEXT_COMPARISON_CHANGES";
    payload: List<TextComparisonChange>;};

  setCurrentChangeIndex: (payload: number) => {
    type: "SET_CURRENT_CHANGE_INDEX";
    payload: number;};

  setAIComparisonData: (payload: AIComparisonData | null) => {
    type: "SET_AI_COMPARISON_DATA";
    payload: AIComparisonData | null;};

  updateAIComparisonPhase: (phase: IAIComparisonPhase) => {
    type: "UPDATE_AI_COMPARISON_PHASE";
    payload: IAIComparisonPhase;};

  setAIComparisonError: (error: AIComparisonError | null) => {
    type: "SET_AI_COMPARISON_ERROR";
    payload: AIComparisonError | null;};

  toggleSummaryPanel: (payload: boolean) => {
    type: "TOGGLE_SUMMARY_PANEL";
    payload: boolean;};

  setActiveFilters: (payload: Set<string>) => {
    type: "SET_ACTIVE_FILTERS";
    payload: Set<string>;};

  setFilteredChanges: (payload: AIADocumentChangeTaggingItem[] | null) => {
    type: "SET_FILTERED_CHANGES";
    payload: AIADocumentChangeTaggingItem[] | null;};

  setDisplayChanges: (payload: List<TextComparisonChange>) => {
    type: "SET_DISPLAY_CHANGES";
    payload: List<TextComparisonChange>;};

  setHasActiveFilters: (payload: boolean) => {
    type: "SET_HAS_ACTIVE_FILTERS";
    payload: boolean;};};

declare interface TextComparisonChange {
  insertionAnnotations: List<HighlightAnnotation>;
  deletionAnnotations: List<HighlightAnnotation>;
  pages: Set_2<number>;
  insertedText: string;
  deletedText: string;
  insertionCount: number;
  deletionCount: number;
  operationType: TextComparisonOperationTypes;}

export declare const TextComparisonConfiguration: {};

declare type TextComparisonConfiguration_2 = StandaloneTextComparisonConfiguration;

/**
 * This describes the properties of a {@link NutrientViewer.loadTextComparison} configuration.
 * @public
 * @memberof NutrientViewer
 * @interface TextComparisonConfiguration
 */
/**
 * ***required***
 *
 * Selector or element where Text Comparison UI for Web will be mounted.
 *
 * The element must have a `width` and `height` that's greater than zero. Text Comparison UI for Web adapts to the dimensions
 * of this element. This way, applying responsive rules will work as expected.
 *
 * The element can be styled using relative values as you would expect it to (CSS media queries
 * are encouraged).
 * @example
 * // In your HTML
 * <div class="foo"></div>
 *
 * // In your JavaScript
 * NutrientViewer.loadTextComparison({ container: '.foo', documentA: ..., documentB: ..., ... });
 * // or
 * const element = document.getElementsByClassName('foo')[0]
 * NutrientViewer.loadTextComparison({  container: element, documentA: ..., documentB: ..., ... });
 * @public
 * @instance
 * @member {string|HTMLElement} container
 * @memberof NutrientViewer.TextComparisonConfiguration
 */
/**
 * ***required, Standalone only***
 *
 * The URL for the base document or its content as `ArrayBuffer` used for comparison.
 *
 * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
 * @example <caption>Load a PDF document from an URI</caption>
 * NutrientViewer.loadTextComparison({ documentA: 'https://example.com/document.pdf', ... });
 * @example <caption>Load a document from an ArrayBuffer</caption>
 * NutrientViewer.loadTextComparison({ documentA: arrayBuffer, ... });
 * @public
 * @standalone
 * @instance
 * @member {string|ArrayBuffer} documentA
 * @memberof NutrientViewer.TextComparisonConfiguration
 */
/**
 * ***required, Standalone only***
 *
 * The URL for the second document or its content as `ArrayBuffer` used for comparison.
 *
 * When providing a URL keep in mind that Cross-Origin Resource Sharing (CORS) apply.
 * @example <caption>Load a PDF document from an URI</caption>
 * NutrientViewer.loadTextComparison({ documentB: 'https://example.com/document.pdf', ... });
 * @example <caption>Load a document from an ArrayBuffer</caption>
 * NutrientViewer.loadTextComparison({ documentB: arrayBuffer, ... });
 * @public
 * @standalone
 * @instance
 * @member {string|ArrayBuffer} documentB
 * @memberof NutrientViewer.TextComparisonConfiguration
 */
/**
 * ***Standalone only***
 *
 * Nutrient Web SDK license key from https://my.nutrient.io/.
 *
 * If not provided, the Text Comparison UI will run in trial mode for a limited time and then request the user to visit
 * {@link https://www.nutrient.io/try/} to request a trial license.
 * @example <caption>Activate with a license key</caption>
 * NutrientViewer.loadTextComparison({ licenseKey: "YOUR_LICENSE_KEY_GOES_HERE", ... });
 * @public
 * @standalone
 * @instance
 * @member {?string} licenseKey
 * @memberof NutrientViewer.TextComparisonConfiguration
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected URL for all NutrientViewer assets. This setting is
 * necessary when you load Text Comparison UI for Web JavaScript from a different URL.
 *
 * If your assets are served from a different origin, you have to include proper CORS headers:
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
 * @example
 * NutrientViewer.loadTextComparison({ baseUrl: 'https://public-server.pspdfkit.com/' });
 * @instance
 * @public
 * @member {?string} baseUrl
 * @memberof NutrientViewer.TextComparisonConfiguration
 * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected URL for the Core worker Text Comparison UI assets in Standalone mode.
 * This setting may be necessary when you integrate TextComparison UI for Web JavaScript in an environment that limits
 * the size of the static assets, like Salesforce.
 *
 * If your Core assets are served from a different origin, you have to include proper CORS headers:
 * {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS}
 *
 * and `nutrient-viewer-[hash].wasm`) must be located in a `nutrient-viewer-lib` subfolder accessible
 * from the `baseCoreUrl`.
 * @example
 * NutrientViewer.loadTextComparison({ baseCoreUrl: 'https://public-server.pspdfkit.com/pspdfkit-core/' });
 * @instance
 * @public
 * @member {?string} baseCoreUrl
 * @memberof NutrientViewer.TextComparisonConfiguration
 * @default Auto-detected it will use the same value as `baseUrl` if set, or the auto-detected value
 * from the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This allows you to overwrite the auto-detected Text Comparison UI Document Engine URL. This setting is necessary
 * when your Text Comparison UI Document Engine is located under a different URL.
 * @example
 * NutrientViewer.loadTextComparison({ serverUrl: 'https://public-server.pspdfkit.com/' })
 * @instance
 * @public
 * @member {?string} serverUrl
 * @memberof NutrientViewer.TextComparisonConfiguration
 * @default Auto-detected based on the currently executed `&lt;script&gt;` tag.
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of main toolbar items for the Text Comparison UI.
 * This can be used to customize the main toolbar before the application mounts.
 *
 * When omitted, it will default to {@link NutrientViewer.defaultTextComparisonToolbarItems}.
 * @example
 * const toolbarItems = NutrientViewer.defaultTextComparisonToolbarItems;
 * toolbarItems.reverse();
 * NutrientViewer.loadTextComparison({ toolbarItems, ... });
 * @public
 * @instance
 * @member {?Array.<NutrientViewer.TextComparisonToolbarItem>} toolbarItems
 * @memberof NutrientViewer.TextComparisonConfiguration
 * @default Default {@link NutrientViewer.defaultTextComparisonToolbarItems}
 */
/**
 * *optional*
 *
 * This property allows you to set an initial list of inner toolbar items for instanceA (left) and instanceB (right) for the Text Comparison UI.
 * This can be used to customize the inner toolbar before the application mounts.
 *
 * When omitted, it will default to {@link NutrientViewer.defaultTextComparisonInnerToolbarItems}.
 * @example
 * const innerToolbarItems = NutrientViewer.defaultTextComparisonInnerToolbarItems;
 * innerToolbarItems.reverse();
 * NutrientViewer.loadTextComparison({ innerToolbarItems: toolbarItems, ... });
 * @public
 * @instance
 * @member {?Array.<NutrientViewer.TextComparisonInnerToolbarItem>} innerToolbarItems
 * @memberof NutrientViewer.TextComparisonConfiguration
 * @default Default {@link NutrientViewer.defaultTextComparisonInnerToolbarItems}
 */
/**
 * *optional*
 *
 * This will load your custom CSS as a `<link rel="stylesheet">` inside the Text Comparison UI. This
 * is necessary to isolate styling of the primary toolbar, comparison sidebar from the outside application and avoid external
 * stylesheets overwriting important viewer attributes.
 *
 * An array is allowed to load multiple stylesheets. The order in the array will also be the
 * order in which the stylesheets get loaded.
 *
 * The array will be copied by us on start up time, which means that you can not mutate it
 * after the viewer has started.
 *
 * More information on how to style Nutrient Web SDK can be found in our guides.
 * @example
 * NutrientViewer.loadTextComparison({
 *   styleSheets: [
 *     'https://example.com/my-stylesheet.css',
 *     'https://example.com/other-stylesheet.css'
 *   ]
 * })
 * @public
 * @instance
 * @member {?Array.<string>} styleSheets
 * @memberof NutrientViewer.TextComparisonConfiguration
 * @default []
 */
/**
 * *optional*
 *
 * This property allows you to set theme to use for the UI. See {@link NutrientViewer.Theme}
 *
 * Note: Themes are not supported in IE and setting this option won't have any effect: IE users
 * will get the default light theme. You can customize the appearance of the UI using our public
 * CSS classes. Please refer to
 * {@link https://www.nutrient.io/guides/web/customizing-the-interface/css-customization/|this guide article}
 * for information on how to customize the appearance.
 * @example
 * NutrientViewer.loadTextComparison({ theme: NutrientViewer.Theme.DARK })
 * @public
 * @instance
 * @member {?NutrientViewer.Theme} theme
 * @default NutrientViewer.Theme.DARK
 * @memberof NutrientViewer.TextComparisonConfiguration
 */
/**
 * The initial `locale` (language) for the application.
 * All the available locales are defined in {@link NutrientViewer.I18n.locales}.
 * When a locale is not provided Text Comparison UI for Web tries to autodetect the locale using `window.navigator.language`.
 * If the detected locale is not supported then the `en` locale is used instead.
 * @example
 * NutrientViewer.loadTextComparison({
 *   locale: 'de',
 *   // ...
 * });
 * @public
 * @instance
 * @member {?string} locale
 * @memberof NutrientViewer.TextComparisonConfiguration
 */
/**
 * *optional*
 *
 * Configuration for the comparison sidebar, including color customization for highlighting differences
 * and whether the sidebar opens by default.
 * @example
 *
 * NutrientViewer.loadTextComparison({
 *   // ... other configuration
 *   comparisonSidebarConfig: {
 *     diffColors: {
 *       insertionColor: new NutrientViewer.Color({ r: 0, g: 255, b: 0 }),
 *       deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 })
 *     },
 *     openByDefault: true
 *   }
 * });
 * @public
 * @instance
 * @member {?NutrientViewer.TextComparisonSidebarConfiguration} comparisonSidebarConfig
 * @memberof NutrientViewer.TextComparisonConfiguration
 */
/**
 * Configuration for customizing the colors used to highlight differences in text comparison.
 * @example
 *
 * const diffColors = {
 *   insertionColor: new NutrientViewer.Color({ r: 0, g: 128, b: 0 }),
 *   insertionBackgroundColor: new NutrientViewer.Color({ r: 200, g: 255, b: 200 }),
 *   deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 }),
 *   deletionBackgroundColor: new NutrientViewer.Color({ r: 255, g: 200, b: 200 }),
 *   disabledColor: new NutrientViewer.Color({ r: 150, g: 150, b: 150 }),
 *   disabledBackgroundColor: new NutrientViewer.Color({ r: 240, g: 240, b: 240 })
 * };
 * @public
 * @interface TextComparisonDiffColors
 * @memberof NutrientViewer
 */
declare interface TextComparisonDiffColors {
  /** Text color for insertions */
  insertionColor?: Color;
  /** Background color for insertions */
  insertionBackgroundColor?: Color;
  /** Text color for deletions */
  deletionColor?: Color;
  /** Background color for deletions */
  deletionBackgroundColor?: Color;
  /** Text color for disabled annotations */
  disabledColor?: Color;
  /** Background color for disabled annotations */
  disabledBackgroundColor?: Color;}

declare interface TextComparisonEventsMap {
  'textComparison.scrollLock': (scrollLockFlag: boolean) => void;
  'textComparison.comparisonSidebarVisibilityChange': (scrollLockFlag: boolean) => void;
  'textComparison.selectionChange': (newSelectedIndex: number) => void;}


declare type TextComparisonInnerToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & {
  type: TextComparisonInnerToolbarItemType;
  mediaQueries?: string[];
  responsiveGroup?: string;
  dropdownGroup?: string;};


declare type TextComparisonInnerToolbarItemType = ToolItemType | (typeof allowedTextComparisonInnerToolbarItem)[number];

/**
 * @classdesc
 * A mounted text comparison instance.
 *
 * You can generate an instance for text comparison by using {@link NutrientViewer.loadTextComparison}.
 * @noconstructor
 * @public
 * @class TextComparisonInstance
 * @memberof NutrientViewer
 * @summary A mounted text comparison instance.
 */
export declare class TextComparisonInstance {
  getScrollLock: () => boolean;
  getComparisonVisibility: () => boolean;
  getCurrentChangeIndex: () => number;
  getToolbarItems: () => TextComparisonToolbarItem[];
  getInnerToolbarItems: () => TextComparisonInnerToolbarItem[];
  getChanges: () => TextComparisonChange[];
  addEventListener: <K extends keyof TextComparisonEventsMap>(action: K, listener: TextComparisonEventsMap[K]) => void;
  removeEventListener: <K extends keyof TextComparisonEventsMap>(action: K, listener: TextComparisonEventsMap[K]) => void;
  unload: () => void;
  setComparisonSidebarConfig: (comparisonSidebarConfig: TextComparisonSidebarConfiguration) => Promise<void>;
  setScrollLock: (flag: boolean) => void;
  setComparisonVisibility: (flag: boolean) => void;
  setCurrentChangeIndex: (changeIndex: number) => void;
  setToolbarItems: (toolbarItemsCallback: TextComparisonToolbarItem[] | SetToolbarItemsFunction) => void;
  setInnerToolbarItems: (toolbarItemsCallback: TextComparisonInnerToolbarItem[] | SetToolbarItemsFunction) => void;
  jumpToChange: (changeIndex: number) => number;
  goToPreviousChange: () => number;
  goToNextChange: () => number;
  constructor(params: TextComparisonInstanceConstructor);}

declare type TextComparisonInstanceConstructor = TextComparisonSharedProps & {
  instanceA: Instance;
  instanceB: Instance;
  unmount: () => void;};

declare const enum TextComparisonOperationTypes {
  inserted = "Inserted",
  deleted = "Deleted",
  replaced = "Replaced",}

declare type TextComparisonSharedProps = {
  dispatch: Dispatch<TextComparisonAction>;
  stateRef: MutableRefObject<TextComparisonState>;};

declare type TextComparisonSharedState = {
  dispatch: Dispatch<TextComparisonAction>;
  getTextComparisonState: () => TextComparisonState;};

/**
 * Configuration options for the text comparison sidebar.
 * @example
 *
 * const sidebarConfig = {
 *   diffColors: {
 *     insertionColor: new NutrientViewer.Color({ r: 0, g: 255, b: 0 }),
 *     deletionColor: new NutrientViewer.Color({ r: 255, g: 0, b: 0 })
 *   },
 *   openByDefault: true
 * };
 *
 * NutrientViewer.loadTextComparison({
 *   // ... other configuration
 *   comparisonSidebarConfig: sidebarConfig
 * });
 * ```
 *
 * @public
 * @typedef TextComparisonSidebarConfiguration
 * @memberof NutrientViewer
 * @property {NutrientViewer.TextComparisonDiffColors} [diffColors] - Color configuration for highlighting differences
 * @property {boolean} [openByDefault=true] - Whether the comparison sidebar opens automatically when the comparison loads
 */
declare type TextComparisonSidebarConfiguration = {
  /** Color configuration for highlighting differences */
  diffColors?: TextComparisonDiffColors;
  /** Whether the comparison sidebar opens automatically when the comparison loads */
  openByDefault?: boolean;};

declare interface TextComparisonState {
  instanceA: Instance | null;
  instanceB: Instance | null;
  textComparisonChanges: List<TextComparisonChange>;
  isScrollLockEnabled: boolean;
  isComparisonVisible: boolean;
  eventEmitter: EventEmitter;
  frameWindow: Window;
  instancesLoaded: boolean;
  currentChangeIndex: number;
  lastSelectedChangeIndex: number;
  ui: any;
  toolbarItems: List<TextComparisonToolbarItem>;
  innerToolbarItems: List<TextComparisonInnerToolbarItem>;
  comparisonSidebarConfig: TextComparisonSidebarConfiguration | null;
  mainShadowRoot: ShadowRoot | Document;
  container: HTMLElement;
  rootElement: HTMLElement;
  aiComparisonData?: AIComparisonData | null;
  isSummaryPanelOpen: boolean;
  activeFilters: Set<string>;
  filteredChanges: AIADocumentChangeTaggingItem[] | null;
  displayChanges: List<TextComparisonChange>;
  hasActiveFilters: boolean;}

declare type TextComparisonToolbarItem = Omit<ToolItem, 'type' | 'onPress'> & {
  type: TextComparisonToolbarItemType;
  mediaQueries?: string[];
  responsiveGroup?: string;
  dropdownGroup?: string;};


declare type TextComparisonToolbarItemType = ToolItemType | (typeof allowedTextComparisonToolbarItem)[number];

/**
 * @classdesc
 *
 * A text input element, that can either span a single or multiple lines.
 *
 * To retrieve a list of all form fields, use {@link NutrientViewer.Instance#getFormFields}.
 * @public
 * @memberof NutrientViewer.FormFields
 * @summary A text input element, that can either span a single or multiple lines.
 * @class TextFormField
 * @noconstructor
 * @extends NutrientViewer.FormFields.FormField
 */
export declare class TextFormField extends FormField {
  /**
   * The current value of the form field. In order to modify it, {@link NutrientViewer.Instance.setFormFieldValues|instance.setFormFieldValues()} should be used.
   * @public
   * @instance
   * @member {string} value
   * @readonly
   * @memberof NutrientViewer.FormFields.TextFormField
   */
  value: string;
  /**
   * Similar to the `value` property. The default values are only used when a form needs to be reset.
   * @public
   * @instance
   * @member {string} defaultValue
   * @memberof NutrientViewer.FormFields.TextFormField
   */
  defaultValue: string;
  /**
   * If true, the field is intended for entering a secure password that should not be echoed visibly
   * to the screen. Characters typed from the keyboard should instead be echoed in some unreadable
   * form, such as asterisks or bullet characters.
   *
   * This is currently only support for single line text inputs.
   * @public
   * @instance
   * @member {boolean} password
   * @memberof NutrientViewer.FormFields.TextFormField
   * @default false
   */
  password: boolean;
  /**
   * The maximum length of the field’s text, in characters. If none is set, the size is not limited.
   * @public
   * @instance
   * @member {?number} maxLength
   * @memberof NutrientViewer.FormFields.TextFormField
   * @default null
   */
  maxLength?: number | null;
  /**
   * If true, text entered in the field is not spell-checked.
   * @public
   * @instance
   * @member {boolean} doNotSpellCheck
   * @memberof NutrientViewer.FormFields.TextFormField
   * @default false
   */
  doNotSpellCheck: boolean;
  /**
   * If true, the field does not scroll (horizontally for single-line fields, vertically for
   * multiple-line fields) to accommodate more text than fits within its annotation’s rectangle. Once
   * the field is full, no further text is accepted.
   * @public
   * @instance
   * @member {boolean} doNotScroll
   * @memberof NutrientViewer.FormFields.TextFormField
   * @default false
   */
  doNotScroll: boolean;
  /**
   * If true, the field can contain multiple lines of text. Otherwise, the field’s text is restricted
   * to a single line.
   * @public
   * @instance
   * @member {boolean} multiLine
   * @memberof NutrientViewer.FormFields.TextFormField
   * @default false
   */
  multiLine: boolean;
  /**
   * If true, every character will have an input element on their own which is evenly distributed
   * inside the bounding box of the widget annotation. When this is set, the form field must have a
   * maxLength.
   * @public
   * @instance
   * @member {boolean} comb
   * @memberof NutrientViewer.FormFields.TextFormField
   * @default false
   */
  comb: boolean;
  additionalActions: FormFieldInputAdditionalActionsType | null | undefined;
  static defaultValues: IObject;}

declare type TextFormFieldJSON = BaseFormFieldJSON & {
  type: 'pspdfkit/form-field/text';
  password: boolean;
  maxLength?: number | null;
  doNotScroll: boolean;
  multiLine: boolean;
  defaultValue: string;
  comb: boolean;} &
DoNotSpellCheckPropertyPair;

/**
 * @classdesc
 * A line of text displayed at a specific bounding box in the PDF file.
 *
 * You can retrieve text lines using {@link NutrientViewer.Instance#textLinesForPageIndex}.
 * @public
 * @memberof NutrientViewer
 * @summary A line of text in the PDF file.
 * @class TextLine
 * @noconstructor
 * @extends Immutable.Record
 */
export declare class TextLine extends TextLine_base {}

declare const TextLine_base: Record_2.Factory<ITextLine>;

/**
 * This event will be emitted whenever a click on a text line occurs that is not handled by any
 * occluding page element (annotation, form, etc.).
 * @public
 * @example <caption>Register a TextLinePressEvent and get the point in PDF page coordinates.</caption>
 * instance.addEventListener("textLine.press", (event) => {
 *   console.log(event.point);
 * });
 * @memberof NutrientViewer
 * @interface TextLinePressEvent
 */
declare type TextLinePressEvent = {
  /**
   * The text line that was clicked.
   * @public
   * @instance
   * @member {NutrientViewer.TextLine} textLine
   * @memberof NutrientViewer.TextLinePressEvent
   */
  textLine: TextLine;
  /**
   * The point where the press event was detected in PDF page space coordinates.
   * @public
   * @instance
   * @member {NutrientViewer.Geometry.Point} point
   * @memberof NutrientViewer.TextLinePressEvent
   */
  point: Point;
  /**
   * The browser event which caused the press event to dispatch. This is either a MouseEvent,
   * TouchEvent, or a PointerEvent.
   * @public
   * @instance
   * @member {Event} nativeEvent
   * @memberof NutrientViewer.TextLinePressEvent
   */
  nativeEvent: Event;};


/**
 * @classdesc
 * Base annotation type from which all markup annotations inherit. You can not directly instantiate
 * from this type.
 *
 * A markup annotation in the UI will be created from the positions of the currently selected text
 * but will be persisted with a list of rectangles as per PDF spec.
 *
 * The `boundingBox` should be set to the {@link NutrientViewer.Geometry.Rect.union union} of all `rects`.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 *
 * For interacting with a markup annotation, please look at the subtypes:
 *
 * - {@link NutrientViewer.Annotations.HighlightAnnotation}
 * - {@link NutrientViewer.Annotations.SquiggleAnnotation}
 * - {@link NutrientViewer.Annotations.StrikeOutAnnotation}
 * - {@link NutrientViewer.Annotations.UnderlineAnnotation}
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Base annotation type for all markup annotations.
 * @class MarkupAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 * @seealso NutrientViewer.Instance#getMarkupAnnotationText
 * @seealso NutrientViewer.Configuration#disableTextSelection
 */
export declare class TextMarkupAnnotation<T extends ITextMarkupAnnotation = ITextMarkupAnnotation> extends Annotation<T> {
  /**
   * A list of rects where the annotation is drawn. This is necessary to display a markup annotation
   * on multiple lines.
   *
   * The `boundingBox` should be set to the {@link NutrientViewer.Geometry.Rect.union union} of this list.
   * @public
   * @instance
   * @member {NutrientViewer.Immutable.List.<NutrientViewer.Geometry.Rect>} rects
   * @memberof NutrientViewer.Annotations.MarkupAnnotation
   * @default NutrientViewer.Immutable.List() Empty list
   */
  rects: List<Rect>;
  /**
   * A {@link NutrientViewer.Color} for the markup.
   * @public
   * @instance
   * @member {NutrientViewer.Color} color
   * @memberof NutrientViewer.Annotations.MarkupAnnotation
   * @default Color.BLACK
   */
  color: Color;
  /**
   * The blend mode defines how the color of the annotation will be applied to its background.
   * @public
   * @instance
   * @member {NutrientViewer.BlendMode} blendMode
   * @memberof NutrientViewer.Annotations.TextMarkupAnnotation
   * @default "normal"
   */
  blendMode: IBlendMode;
  static defaultValues: IObject;
  static readableName: string;}

export declare type TextMarkupAnnotationJSON = BaseTextMarkupAnnotationJSON & {
  type: 'pspdfkit/markup/highlight' | 'pspdfkit/markup/squiggly' | 'pspdfkit/markup/strikeout' | 'pspdfkit/markup/underline' | 'pspdfkit/markup/redaction';
  color: string | null;};

declare class TextMarkupAnnotationSerializer extends BaseTextMarkupSerializer {
  annotation: TextMarkupAnnotationsUnion;
  constructor(annotation: TextMarkupAnnotationsUnion);
  toJSON(): TextMarkupAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<TextMarkupAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): TextMarkupAnnotationsUnion;
  typeForAnnotation(): "pspdfkit/markup/highlight" | "pspdfkit/markup/squiggly" | "pspdfkit/markup/strikeout" | "pspdfkit/markup/underline" | "pspdfkit/markup/redaction";}

export declare type TextMarkupAnnotationsUnion = HighlightAnnotation | UnderlineAnnotation | StrikeOutAnnotation | SquiggleAnnotation | RedactionAnnotation;

declare class TextRange extends TextRange_base {
  startNode: Text;
  startOffset: number;
  endNode: Text;
  endOffset: number;
  /**
   * Extracts the start and end text line IDs. This requires the `startNode` and `endNode` to have
   * our custom selectable class and their parents must have the `data-textline-id` field.
   *
   * If the selection DOM nodes have been removed from the DOM tree, this method will return null.
   */
  startAndEndIds(): {
    startTextLineId: number;
    endTextLineId: number;
    startNestedContentBlockId: string;
    endNestedContentBlockId: string;
    startPageIndex: number;
    endPageIndex: number;} |
  null;}


declare const TextRange_base: Record_2.Factory<ITextRange>;

/**
 * @classdesc
 * Information about the currently selected text in the PDF. You can listen for changes using the
 * {@link NutrientViewer.Instance~TextSelectionChangeEvent}.
 *
 * <h5>Example</h5>
 * <p class="code-caption">Read the currently selected text of an Instance</p>
 *
 * <pre class="prettyprint">
 * const textSelection = instance.getTextSelection();
 * textSelection.getText().then(text => console.log(text));
 * </pre>
 *
 * <p class="code-caption">Register a TextSelectionChangeEvent</p>
 *
 * <pre class="prettyprint">
 * instance.addEventListener("textSelection.change", (textSelection) => {
 *   if (textSelection) {
 *     console.log("text is selected");
 *   } else {
 *     console.log("no text is selected");
 *   }
 * });
 * </pre>
 * @public
 * @memberof NutrientViewer
 * @summary The current text selection.
 * @class TextSelection
 * @noconstructor
 * @extends Immutable.Record
 */
export declare class TextSelection extends PublicTextSelection_base {
  startTextLineId: number;
  startNestedContentBlockId: string;
  startPageIndex: number;
  startNode: Text;
  startOffset: number;
  endTextLineId: number;
  endNestedContentBlockId: string;
  endPageIndex: number;
  endNode: Text;
  endOffset: number;
  getText: () => Promise<string>;
  getSelectedTextLines: () => Promise<List<TextLine>>;
  getBoundingClientRect: () => Promise<Rect | null>;
  getSelectedRectsPerPage: () => Promise<List<{
    pageIndex: number;
    rects: List<Rect>;}>>;}



declare class TextSelection_2 extends TextSelection_base {}


declare const TextSelection_base: Record_2.Factory<ITextSelection_2>;

declare function TextSelectionMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Gets the current text selection in the document, if any.
     * @example <caption>Get the text selection as a string</caption>
     * const currentSelection = instance.getTextSelection();
     * if (currentSelection != null) {
     *   const text = await currentSelection.getText();
     *   alert(`Selection: '${text}'`);
     * }
     * @public
     * @instance
     * @function getTextSelection
     * @memberof NutrientViewer.Instance
     * @returns {Promise.<?NutrientViewer.TextSelection>} A promise that resolves to the
     * current text selection, or `null` if no text is selected.
     */
    getTextSelection(): TextSelection | null;};} &

T;

/**
 * Describes theme to use.
 *
 * Note: You can customize the appearance of the UI using our public
 * CSS classes. Please refer to
 * {@link https://www.nutrient.io/guides/web/customizing-the-interface/css-customization/|this guide article}
 * for information on how to customize the appearance.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.Theme} LIGHT Light mode. This is the default theme.
 * @property {NutrientViewer.Theme} DARK Dark mode.
 * @property {NutrientViewer.Theme} AUTO Uses {@link NutrientViewer.Theme.LIGHT} or {@link NutrientViewer.Theme.DARK} based on the user preferences or `prefers-color-scheme` media query.
 * @property {NutrientViewer.Theme} HIGH_CONTRAST_LIGHT High contrast light mode which is AAA compliant.
 * @property {NutrientViewer.Theme} HIGH_CONTRAST_DARK High contrast dark mode which is AAA compliant.
 */
declare const Theme: {
  readonly LIGHT: "LIGHT";
  readonly DARK: "DARK";
  readonly AUTO: "AUTO";
  readonly HIGH_CONTRAST_LIGHT: "HIGH_CONTRAST_LIGHT";
  readonly HIGH_CONTRAST_DARK: "HIGH_CONTRAST_DARK";};


declare const themeContract: {
  elevation: {
    low: string;
    medium: string;};

  opacity: {
    none: string;
    low: string;
    medium: string;
    high: string;};

  rounded: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    full: string;};

  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    "2xl": string;
    "3xl": string;
    "4xl": string;
    "5xl": string;
    "6xl": string;
    "7xl": string;
    "8xl": string;
    "9xl": string;};

  color: {
    support: {
      error: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;};

      success: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;};

      warning: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;};

      info: {
        subtler: string;
        subtle: string;
        medium: string;
        strong: string;};};


    focused: {
      default: string;
      inset: string;};

    background: {
      primary: {
        subtle: string;
        medium: string;
        strong: string;};

      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;};

      inverse: {
        subtle: string;
        medium: string;
        strong: string;};

      secondary: {
        subtle: string;
        medium: string;
        strong: string;};

      overlay: {
        subtle: string;
        medium: string;
        interactive: string;};

      positive: {
        subtle: string;
        medium: string;
        strong: string;
        interactive: {
          enabled: string;};};};



    text: {
      primary: string;
      secondary: string;
      helper: string;
      placeholder: string;
      inverse: string;
      oninteractive: string;
      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;};};


    icon: {
      primary: string;
      secondary: string;
      inverse: string;
      oninteractive: string;
      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;};};


    border: {
      subtle: string;
      medium: string;
      strong: string;
      inverse: string;
      interactive: {
        enabled: string;
        hovered: string;
        active: string;
        visited: string;
        disabled: string;};

      positive: {
        interactive: {
          enabled: string;};

        subtle: string;
        medium: string;
        strong: string;};};};



  typography: {
    heading: {
      h6: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      h5: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      h4: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      h3: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      h2: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      h1: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};};



    label: {
      sm: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      md: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      lg: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};};



    body: {
      sm: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      md: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};


      lg: {
        regular: {
          font: string;
          letterSpacing: string;};

        medium: {
          font: string;
          letterSpacing: string;};

        semibold: {
          font: string;
          letterSpacing: string;};};};};};






declare type TimestampType = {
  url: string;
  username?: string;
  password?: string;};

declare function toJSON(bookmark: Bookmark): BookmarkJSON;

export declare type ToolbarItem = Omit<ToolItem, 'type'> & {
  type: ToolbarItemType;
  mediaQueries?: string[];
  responsiveGroup?: string;
  dropdownGroup?: string;
  preset?: AnnotationPresetID;
  onKeyPress?: (...args: Args) => void;};

declare type ToolbarItem_2 = ToolbarItem;

declare function ToolbarItemsMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {
    /**
     * Returns a deep copy of the latest toolbar items. This value changes whenever the user
     * interacts with NutrientViewer or whenever {@link NutrientViewer.Instance.setToolbarItems} is called.
     *
     * Mutating this array will have no effect.
     * @public
     * @readonly
     * @instance
     * @member {Array.<NutrientViewer.ToolbarItem>} toolbarItems
     * @memberof NutrientViewer.Instance
     */
    readonly toolbarItems: any[];
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setToolbarItems|setToolbarItems()}
     * method to do atomic updates to the current toolbar items.
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setToolbarItems(items => {
     *   items.push({
     *     type: "custom",
     *     title: "My Custom Button",
     *     onPress(){
     *       alert("hello");
     *     }
     *   });
     *   return items;
     * });
     * @public
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~ToolbarItemsSetter
     * @param {Array.<NutrientViewer.ToolbarItem>} currentToolbarItems
     * @returns {Array.<NutrientViewer.ToolbarItem>} The new toolbar items.
     */
    /**
     * This method is used to update the main toolbar items of the PDF editor.
     * It makes it possible to add new {@link NutrientViewer.ToolbarItem|items} and edit or remove existing ones.
     *
     * When you pass in an `array` of {@link NutrientViewer.ToolbarItem}, the current items will be immediately
     * updated. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * `array` of {@link NutrientViewer.ToolbarItem} as argument. You can use this to modify the list based on its
     * current value. This type of update is guaranteed to be atomic - the value of `currentToolbarItems`
     * can't change in between.
     * See: {@link NutrientViewer.Instance~ToolbarItemsSetter|ToolbarItemsSetter}
     *
     * When one of the supplied {@link NutrientViewer.ToolbarItem} is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     *
     * Since `items` is a regular JavaScript `Array` of object literals it can be manipulated using
     * standard array methods like `forEach`, `map`, `reduce`, `splice` and so on.
     * Additionally you can use any 3rd party library for array manipulation like {@link https://lodash.com|lodash}
     * or {@link http://anguscroll.com/just|just}.
     * @example <caption>Reverse the order of the toolbar items</caption>
     * const items = instance.toolbarItems;
     * items.reverse();
     * instance.setToolbarItems(newState);
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setToolbarItems(items => items.reverse());
     * @example <caption>The new changes will be applied immediately</caption>
     * instance.setToolbarItems(newItems);
     * instance.toolbarItems === newItems; // => true
     * @example <caption>Adding a button that's always visible on the right hand side of the `zoom-in` button.</caption>
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   title: "Test Button",
     *   icon: "https://example.com/icon.jpg",
     *   onPress() {
     *     alert("test");
     *   }
     *   // mediaQueries is not defined so it will always be shown
     * };
     * instance.setToolbarItems(items => {
     *   items.forEach((item, index) => {
     *     if (item.name === "spacer") {
     *       items.splice(index + 1, 0,  myButton);
     *     }
     *   });
     *   return items;
     * });
     * @example <caption>Changing a property of a custom button</caption>
     * const myButton = {
     *   type: "custom",
     *   id: "my-button",
     *   title: "Test Button",
     *   icon: "https://example.com/icon.jpg",
     *   disabled: true,
     *   onPress() {
     *     alert("test");
     *   },
     * };
     *
     * NutrientViewer.load({
     *   toolbarItems: [...NutrientViewer.defaultToolbarItems, myButton],
     *   // ...
     * }).then(instance => {
     *   instance.setToolbarItems(items =>
     *     items.map(item => {
     *       if (item.id === "my-button") {
     *         item.disabled = false;
     *       }
     *       return item;
     *     })
     *   );
     * });
     * @public
     * @instance
     * @function setToolbarItems
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied items `array` is not valid.
     * @param {Array.<NutrientViewer.ToolbarItem>|NutrientViewer.Instance~ToolbarItemsSetter} toolbarItemsOrFunction Either a
         *   new `array` of ToolbarItems which would overwrite the existing one, or a callback that will get
         *   invoked with the current toolbar items and is expected to return the new `array` of items.
         */
    setToolbarItems(toolbarItemsOrFunction: ToolbarItem_2[] | SetToolbarFunction): void;
    /**
     * You can use this callback to set/modify the toolbar items present in the annotation toolbar
     * after the document has loaded.
     *
     * The callback will receive the
     * annotation which is being created or selected and based on it, you can have different annotation
     * toolbars for different annotations.
     *
     * You can do the following modifications using this API:
     *
     * - Add new annotation toolbar items
     * - Remove existing annotation toolbar items
     * - Change the order of the existing annotation toolbar items
     * - Modify selected properties of the annotation toolbar items
     *
     * You can also use the `hasDesktopLayout` to determine if the current UI is being rendered on
     * mobile or desktop. Based on that, you can implement different designs for Desktop and Mobile.
     *
     * This callback gets called every time the annotation toolbar is mounted.
     * @example <caption>Add a new annotation toolbar item</caption>
     * instance.setAnnotationToolbarItems((annotation, { defaultAnnotationToolbarItems, hasDesktopLayout }) => {
     *     const node = document.createElement('node')
     *     node.innerText = "Custom Item"
     *
     *     const icon = `<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>`
     *
     *     return [{
     *       id: "custom",
     *       type: "custom",
     *       node: node,
     *       icon: icon,
     *       className: 'Custom-Node',
     *       onPress: () => alert("Custom item pressed!")
     *     }, ...defaultAnnotationToolbarItems];
     *   });
     * @public
     * @instance
     * @function setAnnotationToolbarItems
     * @memberof NutrientViewer.Instance
     * @param {NutrientViewer.AnnotationToolbarItemsCallback} annotationToolbarItemsCallback
     */
    setAnnotationToolbarItems(annotationToolbarItemsCallback: AnnotationToolbarItemsCallback): void;};} &

T;

/**
 * Describes the properties of a Toolbar Item.
 *
 * Check out [our guides](www.nutrient.io/guides/web/current/customizing-the-interface/configure-the-toolbar/)
 * for more examples.
 * @public
 * @memberof NutrientViewer
 * @interface ToolbarItem
 * @extends NutrientViewer.ToolItem
 * @seealso NutrientViewer.Instance#setToolbarItems
 * @seealso NutrientViewer.Configuration#toolbarItems
 * @seealso NutrientViewer.Configuration#toolbarPlacement
 */
/**
 * **required**
 *
 * The type of a toolbar item.
 *
 * It can either be `custom` for user defined items, `responsive-group` to combine items on smaller
 * screens, or one from the {@link NutrientViewer.defaultToolbarItems}.
 *
 * **Special types:**
 *
 * - `responsive-group` (and `annotate` as a predefined responsive group): These types can be
 * referenced by other toolbar items via the {@link NutrientViewer.ToolbarItem#responsiveGroup}
 * property. When the media query of the group matches, all referenced toolbar items will be
 * hidden and the group's icon will be shown instead. When it is clicked, it will expand into
 * the referenced toolbar items.
 *
 * **Note:** It is **not** possible to override this option for built-in toolbar items.
 * @example
 * // In your JavaScript
 * const toolbarItems = NutrientViewer.defaultToolbarItems
 * toolbarItems.push({ type: 'custom', ... })
 * NutrientViewer.load({
 *   ...otherOptions,
 *   toolbarItems
 * });
 * @public
 * @instance
 * @member {string} type
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Unique identifier for the item.
 *
 * This is useful to identify items whose `type` is `custom` or `responsive-group`.
 * @example
 * // In your JavaScript
 * const toolbarItems = NutrientViewer.defaultToolbarItems
 * toolbarItems.push({ type: 'custom', id: 'my-button', ... })
 * NutrientViewer.load({
 *   ...otherOptions,
 *   toolbarItems
 * });
 *
 * Note: It is **not** possible to override this option for built-in toolbar items.
 * @public
 * @instance
 * @override
 * @member {?string} id
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Useful to set a custom CSS class name on the item.
 *
 * For {@link NutrientViewer.defaultToolbarItems|default items} the `className` is appended to the default
 * item ones.
 * @public
 * @instance
 * @member {?string} className
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Icon for the item.
 *
 * Should either be a URL, a base64 encoded image or the HTML for an inline SVG.
 * This property can override the {@link NutrientViewer.defaultToolbarItems|default items}' ones.
 * @public
 * @instance
 * @member {?string} icon
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * An array of valid [media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)
 * which are used to determine the visibility of an item.
 *
 * Internally media queries are managed using the [Window.matchMedia() API](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).
 *
 * As per the [W3C Spec](https://www.w3.org/TR/css3-mediaqueries/#syntax) in many cases media
 * queries require parenthesis for example `min-width: 480px` won't work whereas
 * `(min-width: 480px)` will.
 * @public
 * @instance
 * @example <caption>Overwrite the default media query for the zoom-in default button.</caption>
 * const toolbarItems = NutrientViewer.defaultToolbarItems;
 * const index = toolbarItems.findIndex(item => item.type === "zoom-in");
 * toolbarItems[index]["mediaQueries"] = ["(min-width: 1000px)"];
 * instance.setToolbarItems(toolbarItems);
 * @member {?Array.<string>} mediaQueries
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Whether a custom item is selected or not.
 *
 * The selected status of {@link NutrientViewer.defaultToolbarItems|default items} cannot be altered.
 *
 * Note: It is **not** possible to override this option for built-in toolbar items.
 * @public
 * @instance
 * @member {?boolean} selected
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Whether the item is disabled or not.
 *
 * The property can be used to force a {@link NutrientViewer.defaultToolbarItems|default item} to be
 * disabled by setting it to `true`.
 * @public
 * @instance
 * @member {?boolean} disabled
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Can be used to link multiple toolbar items to the same
 * {@link NutrientViewer.ToolbarItem#type|responsive-group}. Those items will be hidden when the
 * responsive group icon is displayed and can be seen when we click (i.e. open) the group.
 *
 * Whenever a toolbar item is active and it's responsive group is shown, the responsive group is
 * open so the active state can be seen.
 *
 * Note: It is **not** possible to override this option for built-in toolbar items.
 * @example
 * const toolbarItems = [
 *   {
 *     type: "responsive-group",
 *     id: "my-group",
 *     mediaQueries: ["max-width..."],
 *     icon: "https://example.com/icon.png",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-one",
 *     responsiveGroup: "my-group",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-two",
 *     responsiveGroup: "my-group",
 *   },
 * ];
 * @public
 * @instance
 * @member {?string} responsiveGroup
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Can be used to group multiple toolbar buttons in the same
 * {@link NutrientViewer.ToolbarItem#dropdownGroup}. Only one of the buttons will be visible,
 * with a dropdown arrow to hint the user about the dropdown group.
 * When the user clicks on the arrow, the rest of the buttons will be shown vertically piled.
 *
 * The toolbar buttons that belong to a dropdown group will preserve all the properties
 * of individual toolbar buttons.
 *
 * In order to decide which toolbar item is visible, the following criteria is used:
 * - If a button is globally selected, it's rendered on top.
 * - Otherwise, the last globally selected button of the list is rendered on top.
 * - If none of those has been selected before, the first button on the dropdown group is rendered on top.
 *
 * Note: It is **not** possible to override this option for built-in toolbar items.
 * @example
 * const toolbarItems = [
 *   {
 *     type: "responsive-group",
 *     id: "my-group",
 *     mediaQueries: ["(min-width: 980px)"],
 *     icon: "https://example.com/icon.png",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-one",
 *     responsiveGroup: "my-group",
 *     dropdownGroup: "my-dropdown-group",
 *   },
 *   {
 *     type: "custom",
 *     id: "my-button-two",
 *     dropdownGroup: "my-dropdown-group",
 *   },
 * ];
 * @public
 * @instance
 * @member {?string} dropdownGroup
 * @memberof NutrientViewer.ToolbarItem
 */
/**
 * Annotation preset for annotations. It will be passed to the `onPress` event handler in the third argument.
 * @public
 * @instance
 * @member {?string} preset
 * @memberof NutrientViewer.ToolbarItem
 */
declare type ToolbarItemType = ToolItemType | (typeof allowedToolbarTypes)[number];

/**
 * Configure where the toolbar is placed.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ToolbarPlacement} TOP The default value. The toolbar will be placed at the top of the viewport.
 * @property {NutrientViewer.ToolbarPlacement} BOTTOM The toolbar will be placed at the bottom of the viewport.
 */
declare const ToolbarPlacement: {
  readonly TOP: "TOP";
  readonly BOTTOM: "BOTTOM";};


/**
 * Describes the properties of a Tool Item.
 *
 * Tool items are standalone tools that can be used in different part of NutrientViewer's UI
 * such as annotation tooltips.
 * @public
 * @memberof NutrientViewer
 * @interface ToolItem
 * @seealso NutrientViewer.Configuration.annotationTooltipCallback
 */
declare type ToolItem = {
  /**
   * ***required***
   *
   * The type of a tool item.
   *
   * At the moment the only supported type is `custom`.
   * @example
   * // In your JavaScript
   * const item = { type: 'custom', ... }
   * @public
   * @instance
   * @member {string} type
   * @memberof NutrientViewer.ToolItem
   */
  type: ToolItemType;
  /**
   * Optionally `custom` tool items can define a DOM node.
   * NutrientViewer renders this node instead of a standard tool button.
   *
   * In this case the tool item is rendered inside of a container
   * which gets the `title` and `className` attributes set.
   *
   * The `icon` property is ignored.
   * The `selected` and `disabled` are used just to toggle the
   * PSPDFKit-Tool-Node-active and PSPDFKit-Tool-Node-disabled
   * class names but making the node effectively selected or disabled is up to
   * the implementation of the item.
   *
   * The `onPress` event is registered and fires any time the item is either clicked
   * or selected with keyboard (if part of a `dropdownGroup`).
   * @public
   * @instance
   * @member {?Node} node
   * @memberof NutrientViewer.ToolItem
   */
  node?: Node;
  /**
   * Unique identifier for the item.
   *
   * This is useful to identify items whose `type` is `custom`.
   * @example
   * // In your JavaScript
   * const item = { type: 'custom', id: 'my-button', ... }
   * @public
   * @instance
   * @member {?string} id
   * @memberof NutrientViewer.ToolItem
   */
  id?: string;
  /**
   * Title for the tool items.
   *
   * It is shown on hover or when the item doesn't have an icon.
   * @public
   * @instance
   * @member {?string} title
   * @memberof NutrientViewer.ToolItem
   */
  title?: string;
  /**
   * Useful to set a custom CSS class name on the item.
   * @public
   * @instance
   * @member {?string} className
   * @memberof NutrientViewer.ToolItem
   */
  className?: string;
  /**
   * Icon for the item.
   *
   * The icon should either be an URL, a base64 encoded image or the HTML for an inline SVG.
   * @public
   * @instance
   * @member {?string} icon
   * @memberof NutrientViewer.ToolItem
   */
  icon?: string;
  /**
   * Callback to invoke when the item is clicked or tapped (on touch devices). It gets the `event` as
   * first argument, the `id` of the tool item as the second.
   * @public
   * @instance
   * @member {?Function} onPress
   * @param {MouseEvent|KeyboardEvent} event The event that is fired on press. `onPress` is also fired when pressing enter.
   * @param {string} id The tool item id.
   * @param {?string} preset The preset name.
   * @memberof NutrientViewer.ToolItem
   */
  onPress?: IFunction;
  /**
   * Whether a custom item is selected or not.
   * @public
   * @instance
   * @member {?boolean} selected
   * @memberof NutrientViewer.ToolItem
   */
  selected?: boolean;
  /**
   * Whether the item is disabled or not.
   * @public
   * @instance
   * @member {?boolean} disabled
   * @memberof NutrientViewer.ToolItem
   */
  disabled?: boolean;};

declare type ToolItemType = 'custom';

/**
 * Matrix for affine 2D transformations.
 *
 * Layout:
 *
 *             // The values represent:
 *   | a c e | // - (a,b) the x base vector
 *   | b d f | // - (c,d) the y base vector
 *   | 0 0 1 | // - (e,f) the origin
 *             // of the resulting coordinate system.
 *
 * The third row is always [0 0 1], thus we don't store the values.
 */
declare class TransformationMatrix extends TransformationMatrix_base {
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
  static defaultValues: IObject;
  static IDENTITY: TransformationMatrix;
  /**
   * Applies a translation to the matrix
   *
   *          | 1 0 tx |
   * M' = M * | 0 1 ty |
   *          | 0 0  1 |
   */
  translate({ x: tx, y: ty }: {
    x: number;
    y: number;})
  : TransformationMatrix;
  translateX(tx: number): TransformationMatrix;
  translateY(ty: number): TransformationMatrix;
  /**
   * Applies a scaling to the matrix. If only sx is set and sy is undefined,
   * we will scale x and y by sx.
   *
   * A scale of `1` does not modify a dimension.
   *
   *          | sx  0  0 |
   * M' = M * |  0 sy  0 |
   *          |  0  0  1 |
   */
  scale(sx: number, sy?: number): TransformationMatrix;
  /**
   * Multiplies current matrix values with a new transformation matrix.
   *
   * The transformation will be applied on the left side of the multiplication,
   * so that they are applied in the order `transform()` is called.
   *
   * | a' c' e' |   | a2 c2 e2 |   | a c e |
   * | b' d' f' | = | b2 d2 f2 | * | b d f |
   * | 0  0  1  |   | 0  0  1  |   | 0 0 1 |
   */
  transform(a2: number, b2: number, c2: number, d2: number, e2: number, f2: number): TransformationMatrix;
  /**
   * Rotates the matrix by `deg` degrees in the xy-plane clockwise about the origin of the
   * Cartesian coordinate system.
   */
  rotate(degCW: number): TransformationMatrix;
  /**
   * Rotates the matrix by `rad` radian in the xy-plane clockwise about the origin of the
   * Cartesian coordinate system.
   */
  rotateRad(a: number): TransformationMatrix;
  /**
   * Calculates the inverse matrix. This requires the determinant to be != 0, which is
   * always granted since the matrix can only hold affine transformations (all affine
   * transformations are easily invertible).
   *
   * We exploit the fact that the matrix is affine to speed things up.
   */
  inverse(): TransformationMatrix;
  /**
   * Returns the matrix's values as a CSS transform string.
   */
  toCssValue(): string;
  /**
   * Multiplies the point with the matrix to apply the transformation.
   * Transforming a "point" means also applying any translation from the matrix.
   *
   * | x'|   | a c e |   | x |
   * | y'| = | b d f | * | y |
   * | 1 |   | 0 0 1 |   | 1 |
   */
  applyToPoint([x, y]: [number, number]): [number, number];
  /**
   * Multiplies the vector with the matrix to apply the transformation.
   * Transforming a "vector" does ignore the translation of the matrix.
   *
   * | x'|   | a c e |   | x |
   * | y'| = | b d f | * | y |
   * | 0 |   | 0 0 1 |   | 0 |
   */
  applyToVector([x, y]: [number, number]): [number, number];}

declare const TransformationMatrix_base: Record_2.Factory<{
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;}>;

/**
 * On Standalone, by implementing this callback you have a fine grained control over
 * which certificates are going to be used for digital signatures validation.
 *
 * For more information, see {@link NutrientViewer.Configuration#trustedCAsCallback}
 * @public
 * @callback TrustedCAsCallback@callback TrustedCAsCallback
 * @memberof NutrientViewer
 * @example <caption>Fetch and use custom set of certificates (Standalone)</caption>
 * @returns {Promise.<Array<ArrayBuffer | string>>} The CA certificates in DER (`ArrayBuffer`) or PEM (`string`) format.
 * NutrientViewer.load({
 *   trustedCAsCallback: function() {
 *     return new Promise((resolve, reject) => {
 *        fetch("/your-certificate.cer")
 *         .then(res => res.arrayBuffer())
 *         .then(cert => resolve([cert]))
 *         .catch(reject)
 *     });
 *   },
 *   // ...
 * });
 */
declare type TrustedCAsCallback = () => Promise<Array<ArrayBuffer | string>>;

/**
 * This callback is called when a document has been prepared for digitally signing by calling
 * {@link NutrientViewer.Instance#signDocument|`instance.signDocument()`}. It receives the current document hash, file contents and data to be signed
 * as arguments, and must return a `Promise` object that resolves to any of these types:
 * - An `ArrayBuffer` that contains either the signed data or a PKCS7 container that includes it.
 * - A `SignatureCallbackResponsePkcs7` that is structured type for when the signature device or service creates signatures
 * in the PKCS#7 format.
 * - A `SignatureCallbackResponseRaw` that is structured type for when the signature device or service creates signatures
 * in the raw (for instance, PKCS#1.5) format.
 * If the returned `Promise` object rejects, the document will not be signed.
 *
 * The provided file contents or the data to be signed can be used as input for the Web Crypto API, or for a
 * signing service of your choice to be signed (hashed and encrypted). The file contents hash is
 * also provided so it can be used it to verify the validity of the contents.
 *
 * See
 * {@link https://www.nutrient.io/guides/web/current/digital-signatures/digital-signatures-on-web/#setting-up-digital-signatures-on-standalone|this guide article}
 * for more information on how to digitally sign a document on Standalone.
 * @public
 * @callback TwoStepSignatureCallback@callback TwoStepSignatureCallback
 * @memberof NutrientViewer
 * @param {object} signaturePreparedData - Signature prepared data.
 * @param {string} signaturePreparedData.hash - Hash of the current document.
 * @param {?ArrayBuffer} signaturePreparedData.fileContents - Content of the file to be signed. Provided only for CMS signatures.
 * @param {ArrayBuffer} signaturePreparedData.dataToBeSigned - Data to be signed for CAdES signatures.
 * @returns {Promise<ArrayBuffer | NutrientViewer.SignatureCallbackResponsePkcs7 | NutrientViewer.SignatureCallbackResponseRaw>} A promise that resolves to any of these:
 *  - An `ArrayBuffer` that contains the signed data in the PKCS#1.5 or PKCS#7 format.
 *  - A `SignatureCallbackResponsePkcs7`, for when the signature device or service creates signatures in the PKCS#7 format.
 *  - A `SignatureCallbackResponseRaw`, for when the signature device or service creates signatures in the raw (for instance, PKCS#1.5) format.
 * The `ArrayBuffer` return type is deprecated. It's recommended to return either a `SignatureCallbackResponsePkcs7` or `SignatureCallbackResponseRaw`, depending on the signature format.
 * @example <caption>Sign document (Standalone)</caption>
 * instance.signDocument(null, function({ hash, fileContents }) {
 *   return new Promise(function(resolve, reject) {
 *     const PKCS7Container = getPKCS7Container(hash, fileContents);
 *     if (PKCS7Container != null) {
 *       return resolve(PKCS7Container)
 *     }
 *     reject(new Error("Could not retrieve the PKCS7 container."))
 *   })
 * }).then(function() {
 *   console.log("Document signed!");
 * })
 */
declare type TwoStepSignatureCallback = (arg0: {
  hash: string;
  fileContents: ArrayBuffer | null;
  dataToBeSigned: ArrayBuffer;}) =>
Promise<ArrayBuffer | SignatureCallbackResponsePkcs7 | SignatureCallbackResponseRaw>;

declare interface UI {
  /**
   * Replace the entire comment thread component UI with a custom implementation by passing a function.
   * Or customize it partly by passing an object configuration.
   *
   * The UI customization function is invoked when the SDK is ready to render a comment thread.
   */
  commentThread?: CommentThreadUIConfig;
  /**
   * UI Customization for custom sidebars.
   * Use this to render a custom sidebar by passing a function.
   */
  sidebar?: SidebarUI;}


/**
 * Indicates which UI element certain JavaScript `Date` instance will be rendered in.
 * Used as part of {@link NutrientViewer.Configuration#dateTimeString}.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.UIDateTimeElement} COMMENT_THREAD Comment thread.
 * @property {NutrientViewer.UIDateTimeElement} ANNOTATIONS_SIDEBAR Annotations sidebar.
 */
declare const UIDateTimeElement: {
  readonly COMMENT_THREAD: "COMMENT_THREAD";
  readonly ANNOTATIONS_SIDEBAR: "ANNOTATIONS_SIDEBAR";};


/**
 * Customizable user interface element.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.UIElement} Sidebar Sidebar element
 */
declare const UIElement: {
  readonly Sidebar: "Sidebar";};


/**
 * A factory function that creates a UI customization slot.
 * It can receive instance and an id, returning a slot object with lifecycle methods.
 */
declare type UIFactory<Params> = (instance: Instance | null, id: string) => Slot<Params>;

declare type UIRendererConfiguration = {
  node: Node;
  onRenderItem?: ItemCustomRenderer;};

/**
 * @classdesc
 * An underline markup annotation. Please refer to {@link NutrientViewer.Annotations.MarkupAnnotation} for
 * more information.
 *
 * <center>
 *   <img title="Example of all markup annotation types" src="img/annotations/markup_annotations.png" width="450" class="shadow">
 * </center>
 * @example <caption>Create a underline annotation</caption>
 * const rects = NutrientViewer.Immutable.List([
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 10, width: 200, height: 10 }),
 *   new NutrientViewer.Geometry.Rect({ left: 10, top: 25, width: 200, height: 10 })
 * ]);
 * const annotation = new NutrientViewer.Annotations.UnderlineAnnotation({
 *   pageIndex: 0,
 *   rects: rects,
 *   boundingBox: NutrientViewer.Geometry.Rect.union(rects)
 * });
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Underline markup annotation.
 * @class UnderlineAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.MarkupAnnotation
 */
export declare class UnderlineAnnotation<T extends IUnderlineAnnotation = IUnderlineAnnotation> extends TextMarkupAnnotation<T> {
  static className: string;
  static readableName: string;
  static defaultValues: IObject;}

/**
 * @classdesc
 * Unknown or unsupported annotation. This can happen when we extract annotations from a PDF
 * document that are not supported on Nutrient Web SDK yet.
 *
 * Previously unsupported annotations can change to a new annotation type in a future release. More
 * detail in the appropriate change log entry.
 *
 * Nutrient Web SDK will attempt to render these annotations, but they cannot be modified, only deleted.
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Unknown or unsupported annotation type.
 * @class UnknownAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 */
export declare class UnknownAnnotation extends Annotation {}


export declare type UnknownAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/unknown';};

/**
 * Unknown annotations are used when we discover an annotation type during deserializing that we
 * don't know. It may have its type set to "pspdfkit/unknown" when provided by Core.
 */
declare class UnknownAnnotationSerializer extends AnnotationSerializer {
  annotation: UnknownAnnotation;
  constructor(annotation: UnknownAnnotation);
  toJSON(): UnknownAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<UnknownAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): UnknownAnnotation;}

/**
 * Unloads an existing NutrientViewer instance.
 *
 * It requires an `target` parameter that is a CSS selector, an HTMLElement or
 * the reference to a {@link NutrientViewer.Instance} returned by {@link NutrientViewer.load}.
 * @example <caption>Unload Nutrient Web SDK using an instance</caption>
 * let instance = null;
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * }).then((i) => {
 *   instance = i
 * })
 * .then(() => {
 *   // Unload the given instance
 *   NutrientViewer.unload(instance)
 * }).catch((error) => {
 *   console.error(error.message);
 * })
 * @example <caption>Unload Nutrient Web SDK using a CSS selector</caption>
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * })
 * .then(() => {
 *   // Unload the given instance
 *   NutrientViewer.unload(".foo")
 * })
 * @example <caption>Unload Nutrient Web SDK using an HTMLElement</caption>
 * NutrientViewer.load({
 *   document: "/sales-report.pdf",
 *   container: ".foo",
 * })
 * .then(() => {
 *   // Unload the given instance
 *   NutrientViewer.unload(document.querySelector(".foo"))
 * })
 * @public
 * @function unload
 * @memberof NutrientViewer
 * @param {HTMLElement | string | NutrientViewer.Instance} target A target to unload
 * @returns {boolean} When true, an instance of Nutrient Web SDK was unmounted.
 * @throws {NutrientViewer.Error} Will throw an error when the `target` is invalid but
 *   will work when it does not have a mounted Nutrient Web SDK instance.
 */
declare function unload(target: TargetType): boolean;

/**
 * `unserializePreset` unserializes annotation properties without doing any validation.
 * Unknown properties are unserialized without any transformation. Invalid (`null`)
 * values are removed.
 * Used by Native to unserialize annotation presets.
 *
 * https://github.com/PSPDFKit/PSPDFKit-Web/issues/2229
 */
declare function unserializePreset(presetJSON: Record<string, any>): AnnotationPreset;

/**
 * Returns a copy of the collection with the value at key set to the result of
 * providing the existing value to the updating function.
 *
 * A functional alternative to `collection.update(key, fn)` which will also
 * work with plain Objects and Arrays as an alternative for
 * `collectionCopy[key] = fn(collection[key])`.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { update } = require('immutable')
 * const originalArray = [ 'dog', 'frog', 'cat' ]
 * update(originalArray, 1, val => val.toUpperCase()) // [ 'dog', 'FROG', 'cat' ]
 * console.log(originalArray) // [ 'dog', 'frog', 'cat' ]
 * const originalObject = { x: 123, y: 456 }
 * update(originalObject, 'x', val => val * 6) // { x: 738, y: 456 }
 * console.log(originalObject) // { x: 123, y: 456 }
 * ```
 */
declare function update<K, V, C extends Collection<K, V>>(collection: C, key: K, updater: (value: V) => V): C;

declare function update<K, V, C extends Collection<K, V>, NSV>(collection: C, key: K, notSetValue: NSV, updater: (value: V | NSV) => V): C;

declare function update<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps>(record: C, key: K, updater: (value: TProps[K]) => TProps[K]): C;

declare function update<TProps extends Object, C extends Record_2<TProps>, K extends keyof TProps, NSV>(record: C, key: K, notSetValue: NSV, updater: (value: TProps[K] | NSV) => TProps[K]): C;

declare function update<V>(collection: Array<V>, key: number, updater: (value: V) => V): Array<V>;

declare function update<V, NSV>(collection: Array<V>, key: number, notSetValue: NSV, updater: (value: V | NSV) => V): Array<V>;

declare function update<C, K extends keyof C>(object: C, key: K, updater: (value: C[K]) => C[K]): C;

declare function update<C, K extends keyof C, NSV>(object: C, key: K, notSetValue: NSV, updater: (value: C[K] | NSV) => C[K]): C;

declare function update<V, C extends {[key: string]: V;}, K extends keyof C>(collection: C, key: K, updater: (value: V) => V): {[key: string]: V;};

declare function update<V, C extends {[key: string]: V;}, K extends keyof C, NSV>(collection: C, key: K, notSetValue: NSV, updater: (value: V | NSV) => V): {[key: string]: V;};

/**
 * Describes the properties used to update a text block.
 *
 * This is a partial text block that contains the id of the text block and the new text.
 * It is used to update the text block in the document.
 * @public
 * @memberof NutrientViewer.ContentEditing
 * @interface UpdatedTextBlock
 * @seealso NutrientViewer.ContentEditing.Session#updateTextBlocks
 */
/**
 * ***required***
 *
 * Unique identifier for the text block.
 * @public
 * @instance
 * @member {string} id
 * @memberof NutrientViewer.ContentEditing.UpdatedTextBlock
 */
/**
 * The new text content of the text block.
 * @public
 * @instance
 * @member {?string} text
 * @memberof NutrientViewer.ContentEditing.UpdatedTextBlock
 */
/**
 * The anchor point of the text block.
 * @public
 * @instance
 * @member {?object} anchor
 * @property {?number} x - The x coordinate of the anchor point.
 * @property {?number} y - The y coordinate of the anchor point.
 * @memberof NutrientViewer.ContentEditing.UpdatedTextBlock
 */
/**
 * The maximum width of the text block.
 * @public
 * @instance
 * @member {?number} maxWidth
 * @memberof NutrientViewer.ContentEditing.UpdatedTextBlock
 */
declare type UpdatedTextBlock = {
  id: string;
  text?: string;
  anchor?: {
    x?: number;
    y?: number;};

  maxWidth?: number;};


/**
 * Returns a copy of the collection with the value at key path set to the
 * result of providing the existing value to the updating function.
 *
 * A functional alternative to `collection.updateIn(keypath)` which will also
 * work with plain Objects and Arrays.
 *
 * <!-- runkit:activate -->
 * ```js
 * const { updateIn } = require('immutable')
 * const original = { x: { y: { z: 123 }}}
 * updateIn(original, ['x', 'y', 'z'], val => val * 6) // { x: { y: { z: 738 }}}
 * console.log(original) // { x: { y: { z: 123 }}}
 * ```
 */
declare function updateIn<C>(collection: C, keyPath: Iterable<any>, updater: (value: any) => any): C;

declare function updateIn<C>(collection: C, keyPath: Iterable<any>, notSetValue: any, updater: (value: any) => any): C;

/**
 * @classdesc
 * PDF action resolve a uniform resource identifier (web link).
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `action.set("uri", "www.nutrient.io");`.
 *
 * A URI action contains an URI. When executing this annotation, we use `window.open` to create a
 * new browser tab. We also clear the opener as a security measurement to avoid the target page to
 * have access to your PDF state.
 *
 * ```js
 * const newWindow = window.open(action.uri, "_blank");
 * newWindow.opener = null;
 * ```
 *
 * Learn more about the security problems when using `_blank` in [this article from JitBit](https://www.jitbit.com/alexblog/256-targetblank---the-most-underestimated-vulnerability-ever/).
 *
 * Please refer to the individual browser documentations for a lists of supported URI protocols. The
 * most used protocols (`http`, `https` and `mailto`) are supported in all [supported browsers](www.nutrient.io/guides/web/current/pspdfkit-for-web/browser-support/).
 * @example <caption>Create a new URIAction</caption>
 * const action = new NutrientViewer.Actions.URIAction({ uri: "www.nutrient.io" });
 * @public
 * @memberof NutrientViewer.Actions
 * @summary Resolve a uniform resource identifier (web link).
 * @class URIAction
 * @param {object} args An object with the `uri` key used to initialize the action.
 * @extends NutrientViewer.Actions.Action
 */
export declare class URIAction extends Action {
  /**
   * The uniform resource identifier (web link) that should be resolved when triggering this action.
   * @public
   * @instance
   * @member {string} uri
   * @memberof NutrientViewer.Actions.URIAction
   */
  uri: string;
  static defaultValues: IObject;
  constructor(args?: IURIAction);}

/**
 * The interface to fulfill to qualify as a Value Object.
 */
declare interface ValueObject {
  /**
   * True if this and the other Collection have value equality, as defined
   * by `Immutable.is()`.
   *
   * Note: This is equivalent to `Immutable.is(this, other)`, but provided to
   * allow for chained expressions.
   */
  equals(other: any): boolean;

  /**
   * Computes and returns the hashed identity for this Collection.
   *
   * The `hashCode` of a Collection is used to determine potential equality,
   * and is used when adding this to a `Set` or as a key in a `Map`, enabling
   * lookup via a different instance.
   *
   * <!-- runkit:activate -->
   * ```js
   * const { List, Set } = require('immutable');
   * const a = List([ 1, 2, 3 ]);
   * const b = List([ 1, 2, 3 ]);
   * assert.notStrictEqual(a, b); // different instances
   * const set = Set([ a ]);
   * assert.equal(set.has(b), true);
   * ```
   *
   * Note: hashCode() MUST return a Uint32 number. The easiest way to
   * guarantee this is to return `myHash | 0` from a custom implementation.
   *
   * If two values have the same `hashCode`, they are [not guaranteed
   * to be equal][Hash Collision]. If two values have different `hashCode`s,
   * they must not be equal.
   *
   * Note: `hashCode()` is not guaranteed to always be called before
   * `equals()`. Most but not all Immutable.js collections use hash codes to
   * organize their internal data structures, while all Immutable.js
   * collections use equality during lookups.
   *
   * [Hash Collision]: http://en.wikipedia.org/wiki/Collision_(computer_science)
   */
  hashCode(): number;}


/**
 * The ViewportPadding object represents the padding
 * that should be applied to the viewport with
 * {@link NutrientViewer.ViewState#viewportPadding}.
 *
 * Horizontal and Vertical padding defaults to zero.
 */
declare class ViewportPadding extends ViewportPadding_base {}


declare const ViewportPadding_base: Record_2.Factory<{
  horizontal: number;
  vertical: number;}>;


/**
 * The `ViewState` holds information about the current UI representation of a specific document.
 *
 * It is an {@link https://facebook.github.io/immutable-js/docs/#/Record|Immutable.Record} and thus
 * can be updated using `set(key, value)`, for example: `viewState.set("showToolbar", false)`.
 *
 * An initial `ViewState` can be set in {@link NutrientViewer.Configuration}.
 *
 * Because the `ViewState` is an immutable data type, you must use {@link NutrientViewer.Instance#setViewState}
 * on the {@link NutrientViewer.Instance} to update it.
 *
 * To be notified when NutrientViewer updates the `ViewState`, you can use the dedicated
 * {@link NutrientViewer.Instance~ViewStateChangeEvent}.
 *
 * The following examples show you how to update the `ViewState` and how to get notified about
 * `ViewState` changes:
 * @example <caption>Adding a listener for the {@link NutrientViewer.Instance~ViewStateChangeEvent| view state changed event}</caption>
 * instance.addEventListener("viewState.change", (viewState) => {
 *   console.log(viewState.toJS());
 * });
 * @example <caption>Update values for the immutable state object using {@link NutrientViewer.Instance#setViewState}</caption>
 *
 * const state = instance.viewState;
 * const newState = state.set("currentPageIndex", 2);
 * instance.setViewState(newState);
 * @public
 * @class ViewState
 * @memberof NutrientViewer
 * @extends Immutable.Record
 * @summary The current UI state of a document instance.
 * @seealso NutrientViewer.Configuration#initialViewState
 * @seealso NutrientViewer.Instance#setViewState
 * @seealso NutrientViewer.Instance~ViewStateChangeEvent
 * @seealso NutrientViewer.Instance~ViewStateCurrentPageIndexChangeEvent
 * @seealso NutrientViewer.Instance~ViewStateZoomChangeEvent
 */
export declare class ViewState extends ViewState_base {
  zoomIn(): ViewState;
  zoomOut(): ViewState;
  rotateLeft(): ViewState;
  rotateRight(): ViewState;
  goToNextPage(): ViewState;
  goToPreviousPage(): ViewState;}

declare const ViewState_base: Record_2.Factory<IViewState>;

declare interface ViewStateEventMap {
  'viewState.change': (viewState: ViewState, previousViewState: ViewState) => void;
  'viewState.currentPageIndex.change': (pageIndex: number) => void;
  'viewState.zoom.change': (zoom: number) => void;}

/**
 * This function will try to generate a ViewState based on the PDF Open Parameters spec.
 * @see https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/PDFOpenParameters.pdf
 */
declare function viewStateFromOpenParameters(viewState: ViewState, hash?: string | null | undefined): ViewState;

declare function ViewStateMixin<T extends Class<BaseMixin>>(Base: T): {
  new (...args: any[]): {

    /**
     * Returns the latest view state. This value changes whenever the user interacts with
     * NutrientViewer or whenever {@link NutrientViewer.Instance.setViewState} is called.
     *
     * When you want to keep a reference to the latest view state, you should always listen on the
     * {@link NutrientViewer.Instance~ViewStateChangeEvent} to update your reference.
     * @public
     * @readonly
     * @instance
     * @member {NutrientViewer.ViewState} viewState
     * @memberof NutrientViewer.Instance
     */
    readonly viewState: ViewState;
    /**
     * This callback can be used in the {@link NutrientViewer.Instance#setViewState|setViewState()}
     * method to do atomic updates to the current view state.
     * @public
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setViewState(state => state.set("currentPageIndex", 2));
     * @callback NutrientViewer.Instance@callback NutrientViewer.Instance~ViewStateUpdater
     * @param {NutrientViewer.ViewState} currentViewState
     * @returns {NutrientViewer.ViewState} The new view state.
     */
    /**
     * This method is used to update the UI state of the PDF editor.
     *
     * When you pass in a {@link NutrientViewer.ViewState}, the current state will be immediately
     * overwritten. Calling this method is also idempotent.
     *
     * If you pass in a function, it will be immediately invoked and will receive the current
     * {@link NutrientViewer.ViewState} as a property. You can use this to change state based on the
     * current value. This type of update is guaranteed to be atomic - the value of `currentState`
     * can't change in between.
     * See: {@link NutrientViewer.Instance~ViewStateUpdater|ViewStateUpdater}
     *
     * Be aware that this behavior is different from a React component's `setState`, because
     * it will not be deferred but initially applied. If you want to, you can always add deferring
     * behavior yourself. The approach we choose (immediate applying) makes it possible to control
     * exactly when the changes are flushed, which will allow fine control to work with other
     * frameworks (e.g. runloop-based frameworks like Ember).
     *
     * Whenever this method is called (and actually changes the view state), the instance
     * will trigger an {@link NutrientViewer.Instance~ViewStateChangeEvent}. However, if you use this
     * method to change properties of the view state at once (e.g. zooming and currentPageIndex at
     * the same time), the {@link NutrientViewer.Instance~ViewStateChangeEvent} will only be triggered
     * once. The {@link NutrientViewer.Instance~ViewStateChangeEvent} will be triggered synchronously,
     * that means that the code will be called before this function exits. This is true for both
     * passing in the state directly and passing in an update function.
     *
     * When the supplied {@link NutrientViewer.ViewState} is invalid, this method will throw an
     * {@link NutrientViewer.Error} that contains a detailed error message.
     * @example <caption>Update values for the immutable state object</caption>
     * const state = instance.viewState;
     * const newState = state.set("currentPageIndex", 2);
     * instance.setViewState(newState);
     * @example <caption>Use ES2015 arrow functions and the update callback to reduce boilerplate</caption>
     * instance.setViewState(state => state.set("currentPageIndex", 2));
     * @example <caption>The state will be applied immediately</caption>
     * instance.setViewState(newState);
     * instance.viewState === newState; // => true
     * @example <caption>When the state is invalid, it will throw a {@link NutrientViewer.Error}</caption>
     * try {
     *   // Non existing page index
     *   instance.setViewState(state => state.set("currentPageIndex", 2000));
     * } catch (error) {
     *   error.message; // => "The currentPageIndex set on the new ViewState is out of bounds.
     *                  //     The index is expected to be in the range from 0 to 5 (inclusive)"
     * }
     * @public
     * @instance
     * @function setViewState
     * @memberof NutrientViewer.Instance
     * @throws {NutrientViewer.Error} Will throw an error when the supplied state is not valid.
     * @param {NutrientViewer.ViewState|NutrientViewer.Instance~ViewStateUpdater} stateOrFunction Either a
         *   new ViewState which would overwrite the existing one, or a callback that will get
         *   invoked with the current view state and is expected to return the new state.
         */
    setViewState(stateOrFunction: ViewState | ((currentState: ViewState) => ViewState)): void;};} &

T;

/**
 * A specific zoom configuration that will always be applied whenever the viewport is resized.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.WheelZoomMode} DEFAULT The viewer zooms when scroll wheel + Ctrl key is pressed.
 * @property {NutrientViewer.WheelZoomMode} ALWAYS The viewer will always zoom when scrolling using the mouse wheel
 * @property {NutrientViewer.WheelZoomMode} DISABLED Zooming via scroll wheel is disabled completely, irregardless of which key is pressed
 */
declare const WheelZoomMode: {
  /**
   * Default behavior: Zoom when Ctrl + scroll wheel
   */
  readonly WITH_CTRL: "WITH_CTRL";
  /**
   * Always zoom on scroll wheel, no Ctrl key press needed
   */
  readonly ALWAYS: "ALWAYS";
  /**
   * Zooming via scroll wheel is disabled completely,
   * irregardless of which key is pressed
   */
  readonly DISABLED: "DISABLED";};


declare type WidgetActionTriggerEventType = Omit<ActionTriggerEventType, 'onPageOpen'> | 'onFocus' | 'onBlur';

/**
 * Actions to execute when any of the events is triggered.
 * @public
 * @extends NutrientViewer.AnnotationAdditionalActions
 * @memberof NutrientViewer
 * @interface WidgetAnnotationAdditionalActions
 */
/**
 * Execute an action when the widget is focused.
 *
 * The name of this event in the PDF spec is `Fo`.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.JavaScriptAction} onFocus
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Execute an action when the widget loses focus.
 *
 * The name of this event in the PDF spec is `Bl`.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.JavaScriptAction} onBlur
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the user changes the value of the field.
 *
 * The name of this event in the PDF spec is `V`.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.JavaScriptAction} onChange
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the user types a key-stroke into a text field or combo box
 * or modifies the selection in a scrollable list box.
 *
 * The name of this event in the PDF spec is `K`.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.JavaScriptAction} onInput
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed before the field is formatted to display its current value.
 *
 * The name of this event in the PDF spec is `F`.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.JavaScriptAction} onFormat
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer is pressed.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.Action} onPointerDown
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer is released.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.Action} onPointerUp
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer hovers the field.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.Action} onPointerEnter
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * Action to be performed when the pointer leaves the field area.
 * @public
 * @instance
 * @member {?NutrientViewer.Actions.Action} onPointerLeave
 * @memberof NutrientViewer.WidgetAnnotationAdditionalActions
 */
/**
 * This property is used to define the permission scope for this widget annotation.
 * If you want to change the `group`, you should update the `group` property of the corresponding form field.
 *
 * It is only available when collaboration permissions is enabled on Server-Backed deployments.
 * @public
 * @readonly
 * @instance
 * @member {string} group
 * @memberof NutrientViewer.Annotations.WidgetAnnotation
 */
/**
 * @classdesc
 * Widget annotations are part of PDF forms and used to position form elements,
 * linked to {@link NutrientViewer.FormFields.FormField}s, on a page. To know how a
 * widget is rendered also depends on the linked form field. Widget annotations
 * may only be created or modified if the Form Creator component is present in
 * the license.
 * @public
 * @memberof NutrientViewer.Annotations
 * @summary Draw form elements, linked to
 * {@link NutrientViewer.FormFields.FormField}s, on a page.
 * @class WidgetAnnotation
 * @param {object} args An object of the members.
 * @extends NutrientViewer.Annotations.Annotation
 */
export declare class WidgetAnnotation<T extends IWidgetAnnotation = IWidgetAnnotation> extends Annotation<T> {
  /**
   * The {@link NutrientViewer.FormFields.FormField#name} of the linked form field.
   * Based on the type of the field, a different element will be rendered
   * @public
   * @instance
   * @member {string} formFieldName
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   */
  formFieldName: string;
  /**
   * Optional border color that will be drawn at the border of the bounding box.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} borderColor
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  borderColor: null | Color;
  /**
   * Optional border style used for the border of the bounding box. Valid options
   * are:
   *
   * - `solid`
   * - `dashed`
   * - `beveled`
   * - `inset`
   * - `underline`
   * @public
   * @instance
   * @member {?string} borderStyle
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  borderStyle: null | IBorderStyle;
  /**
   * Optional dash pattern used to draw the border for dashed border style.
   * @public
   * @instance
   * @member {?Array<number>} borderDashArray
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   */
  borderDashArray: null | number[];
  /**
   * Optional border width in PDF pixels, that will be used for the border of the
   * bounding box.
   * @public
   * @instance
   * @member {?number} borderWidth
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  borderWidth: null | number;
  /**
   * Optional background color that will fill the bounding box.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} backgroundColor
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  backgroundColor: null | Color;
  /**
   * Optional font size in page size pixels.
   * @public
   * @instance
   * @member {number} fontSize
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  fontSize: null | FontSize;
  /**
   * The name of the font family that should be used.
   *
   * Fonts are client specific and determined during runtime. If a font is not found, we will
   * automatically fall back to 'sans-serif'.
   *
   * We test the following list at runtime. The first available font will be used as the default
   * for all new widget annotations: Helvetica, Arial, Calibri, Century Gothic, Consolas, Courier,
   * Dejavu Sans, Dejavu Serif, Georgia, Gill Sans, Impact, Lucida Sans, Myriad Pro, Open Sans,
   * Palatino, Tahoma, Times New Roman, Trebuchet, Verdana, Zapfino, Comic Sans.
   *
   * If the browser does not natively support the font, it's still possible to support it by
   * providing the required font data using {@link NutrientViewer.Configuration#styleSheets|a custom stylesheet}.
   * @public
   * @instance
   * @member {?string} font
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  font: null | string;
  /**
   * Optional font color.
   * @public
   * @instance
   * @member {?NutrientViewer.Color} fontColor
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  fontColor: null | Color;
  /**
   * If `true`, the font will be **bold** if the font family supports this.
   * @public
   * @instance
   * @member {boolean} isBold
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default false
   */
  isBold: boolean;
  /**
   * If `true`, the font will be _italic_ if the font family supports this.
   * @public
   * @instance
   * @member {boolean} isItalic
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default false
   */
  isItalic: boolean;
  /**
   * Optional horizontal text alignment.
   * @public
   * @instance
   * @member {?'left' | 'center' | 'right'} horizontalAlign
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default left
   */
  horizontalAlign: 'left' | 'center' | 'right' | null;
  /**
   * Optional vertical text alignment.
   * @public
   * @instance
   * @member {?'top' | 'center' | 'bottom'} verticalAlign
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  verticalAlign: 'top' | 'center' | 'bottom' | null;
  /**
   * Optional actions to execute when an event is triggered.
   * @example <caption>Adding an {@link NutrientViewer.Actions.JavaScriptAction} when the annotation is focused:</caption>
   * const widget = new NutrientViewer.Annotations.WidgetAnnotation({
   *   id: NutrientViewer.generateInstantId(),
   *   pageIndex: 0,
   *   formFieldName: "MyFormField",
   *   boundingBox: new NutrientViewer.Geometry.Rect({
   *     left: 100,
   *     top: 75,
   *     width: 200,
   *     height: 80
   *   }),
   *   additionalActions: {
   *     onFocus: new NutrientViewer.Actions.JavaScriptAction({
   *       script: "alert('onFocus')"
   *     })
   *   }
   * });
   *
   * const form = new NutrientViewer.FormFields.TextFormField({
   *     name: "MyFormField",
   *     annotationIds: new NutrientViewer.Immutable.List([annotation.id]),
   *     value: "Text shown in the form field"
   * });
   *
   * instance.create([widget, form])
   * @public
   * @instance
   * @member {?NutrientViewer.WidgetAnnotationAdditionalActions} additionalActions
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default null
   */
  additionalActions: null | WidgetAnnotationAdditionalActionsType;
  /**
   * The counter-clockwise rotation value in degree relative to the rotated PDF page. Inserting an
   * annotation with a rotation value of `0` will make it appear in the same direction as the UI
   * appears, when no {@link NutrientViewer.ViewState#pagesRotation} is set.
   *
   * Can either be 0°, 90°, 180°, or 270°. Multiple or negative values are normalized to this
   * interval.
   *
   * Note: Due to browser constraints, the rotation property is currently reset once the edit mode
   * is enabled via the user interface.
   * @public
   * @instance
   * @member {number} rotation
   * @memberof NutrientViewer.Annotations.WidgetAnnotation
   * @default 0
   */
  rotation: number;










  lineHeightFactor: null | number;
  action: null | Action;










  buttonIconUpdatedAt: null | number;
  static defaultValues: IObject;
  static readableName: string;}

declare type WidgetAnnotationAdditionalActionsType = {
  onFocus?: JavaScriptAction;
  onBlur?: JavaScriptAction;
  onChange?: JavaScriptAction;
  onFormat?: JavaScriptAction;
  onInput?: JavaScriptAction;
  onPointerDown?: Action;
  onPointerUp?: Action;
  onPointerEnter?: Action;
  onPointerLeave?: Action;};

export declare type WidgetAnnotationJSON = Omit<BaseAnnotationJSON, 'type'> & {
  type: 'pspdfkit/widget';
  formFieldName: string;
  borderColor?: string | null;
  borderStyle?: IBorderStyle | null;
  borderDashArray?: number[] | null;
  borderWidth?: number | null;
  font?: string | null;
  fontSize?: 'auto' | number | null;
  fontColor?: string | null;
  backgroundColor?: string | null;
  horizontalAlign?: 'left' | 'center' | 'right' | null;
  verticalAlign?: 'top' | 'center' | 'bottom' | null;
  fontStyle?: string[] | null | undefined;
  rotation?: number;
  additionalActions?: SerializedAdditionalActionsType | null;
  lineHeightFactor?: number | null;};

declare class WidgetAnnotationSerializer extends AnnotationSerializer {
  annotation: WidgetAnnotation;
  constructor(annotation: WidgetAnnotation);
  toJSON(): WidgetAnnotationJSON;
  static fromJSON(id: ID | null, json: Omit<WidgetAnnotationJSON, 'id' | 'group' | 'permissions'>, options?: ICollaboratorPermissionsOptions): WidgetAnnotation;}

declare type Without<T, U> = { [P in
Exclude<keyof T, keyof U>]?: never };


declare type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

declare type ZoomConfiguration = {
  zoomMode?: IZoomMode | number;
  wheelZoomMode?: IWheelZoomMode;
  options?: IZoomOptions;};

/**
 * A specific zoom mode that will always be applied whenever the viewport is resized.
 * @public
 * @readonly
 * @memberof NutrientViewer
 * @property {NutrientViewer.ZoomMode} AUTO Generates a zoomLevel that will automatically align the page
 *   for the best viewing experience.
 * @property {NutrientViewer.ZoomMode} FIT_TO_WIDTH Uses a zoomLevel that will fit the width of the broadest
 *   page into the viewport. The height might overflow.
 * @property {NutrientViewer.ZoomMode} FIT_TO_VIEWPORT Uses a zoomLevel that will fit the current page into the
 *   viewport completely.
 */
declare const ZoomMode: {
  readonly AUTO: "AUTO";
  readonly FIT_TO_WIDTH: "FIT_TO_WIDTH";
  readonly FIT_TO_VIEWPORT: "FIT_TO_VIEWPORT";



  readonly CUSTOM: "CUSTOM";};


export {};