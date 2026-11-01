import type { DocsContent } from './types';

const en: DocsContent = {
  layout: {
    brandTag: 'Canvas Engine',
    pageContentsLabel: 'On this page',
    npmLabel: 'npm packages',
    navGroups: [
      {
        title: 'Getting Started',
        items: [
          { label: 'Overview', to: '/drawui', end: true },
          { label: 'Live Demo', to: '/drawui#playground' },
        ],
      },
      {
        title: 'drawui-core',
        items: [
          { label: 'Core Engine', to: '/drawui/core' },
          { label: 'Features', to: '/drawui/core#features' },
          { label: 'Quick Start', to: '/drawui/core#quickstart' },
          { label: 'Core API', to: '/drawui/core#api' },
          { label: 'Image Upload', to: '/drawui/core#image' },
          { label: 'Changelog', to: '/drawui/core#changelog' },
        ],
      },
      {
        title: 'drawui-react',
        items: [
          { label: 'React Components', to: '/drawui/react' },
          { label: 'Install & Usage', to: '/drawui/react#quickstart' },
          { label: 'CanvasBoard', to: '/drawui/react#props' },
          { label: 'Image Upload', to: '/drawui/react#image' },
          { label: 'Changelog', to: '/drawui/react#changelog' },
        ],
      },
    ],
    anchorsByPath: {
      '/drawui': [
        { label: 'What it can do', hash: 'features' },
        { label: 'How the two packages relate', hash: 'packages' },
        { label: 'Capability gallery', hash: 'gallery' },
        { label: 'Quick start', hash: 'quickstart' },
        { label: 'Use cases', hash: 'scenes' },
      ],
      '/drawui/core': [
        { label: 'Engine features', hash: 'features' },
        { label: 'Install and initialize', hash: 'quickstart' },
        { label: 'Core API', hash: 'api' },
        { label: 'Image upload', hash: 'image' },
        { label: 'Changelog', hash: 'changelog' },
      ],
      '/drawui/react': [
        { label: 'Component features', hash: 'features' },
        { label: 'Install and usage', hash: 'quickstart' },
        { label: 'CanvasBoard props', hash: 'props' },
        { label: 'Image upload', hash: 'image' },
        { label: 'Changelog', hash: 'changelog' },
      ],
    },
  },

  playground: {
    title: 'Live Canvas',
    hint: '({count} shapes · Press Esc to exit)',
    reset: 'Reset',
    clear: 'Clear',
    closeAria: 'Exit canvas',
    presetNames: {
      flow: 'Flowchart',
      mindmap: 'Mind Map',
      table: 'Table',
      uml: 'UML Class Diagram',
      sticky: 'Shape Library',
    },
  },

  common: {
    copy: 'Copy',
    copied: 'Copied',
  },

  overview: {
    eyebrow: 'drawui · framework-agnostic canvas engine',
    heroTitleLines: ['Drop a great canvas', 'into your product'],
    heroLead:
      'drawui-core provides a drawing kernel written in native TypeScript, and drawui-react wraps it into a single CanvasBoard. Shapes, connectors, mind maps, tables, UML, export and i18n all work out of the box.',
    badges: ['MIT License', 'Canvas 2D', 'TypeScript'],
    heroActions: {
      startReact: 'Start with drawui-react',
      learnCore: 'Explore the core engine',
      openPlayground: 'Open live canvas ↗',
    },
    floatCards: {
      undoTitle: 'Undo / Redo',
      undoDesc: 'One editing session = one step',
      dragTitle: 'Drag to draw',
      dragDesc: 'Drag past 5px to scale with the gesture',
    },
    stats: [
      { value: '50+', label: 'Shape types' },
      { value: '4', label: 'Connector types' },
      { value: '7', label: 'UI languages' },
      { value: '6', label: 'Page themes' },
    ],
    featuresSection: {
      title: 'What it can do',
      desc: 'From a single shape to a whole exportable canvas document. Every image below is produced by the real drawui renderer, not a mockup.',
    },
    features: [
      {
        title: '50+ shapes and 4 connector types',
        desc: 'Basic shapes, flowchart symbols, 3D shapes and block arrows are all included; straight, polyline, orthogonal and curved connectors automatically avoid the shapes at both ends.',
      },
      {
        title: 'Mind maps grow in four directions',
        desc: 'The root node can grow up, down, left and right, and child nodes inherit the parent direction; drag to change hierarchy, reorder within the same direction, and preview the drop with a dashed outline.',
      },
      {
        title: 'Edit tables in place',
        desc: 'Insert a table with the 8×6 picker, select cells the way you do in Feishu, merge / split, insert / delete rows and columns; text wraps automatically and rows grow with the content.',
      },
      {
        title: 'UML class diagrams',
        desc: 'Class and interface shapes come with attribute / method compartments, and connectors support five UML arrow semantics: inheritance, aggregation, composition, dependency and realization.',
      },
      {
        title: 'Sticky notes, icons and templates',
        desc: 'Sticky notes, 113 Twemoji emojis, Lucide line icons and a template library; a selected template is inserted as a whole at the center of the viewport, ready to use.',
      },
      {
        title: 'Export and archive',
        desc: 'Export PNG / SVG / PDF in one click; exportJSON / importJSON save the full document (shapes + camera + version) so you can pick up where you left off.',
      },
    ],
    packagesSection: {
      title: 'How the two packages relate',
      desc: 'The lower layer is the engine, the upper layer is the React wrapper. Install drawui-react only — drawui-core is installed automatically.',
    },
    packages: {
      coreTag: 'Core Engine',
      coreDesc:
        'Native TypeScript with no React dependency. Use it when you work with the canvas directly; a good fit for Vue, Svelte, Angular or your own framework.',
      corePoints: [
        'Editor / Camera / Renderer and all utility classes can be imported separately',
        'Shape operations, history, keyboard shortcuts and clipboard are all included',
        'renderToCanvas / renderSVGString produce images without a host',
      ],
      reactTag: 'Recommended entry',
      reactDesc:
        'Toolbar, zoom, style panel, minimap and context menu are all assembled for you — pass a few props and you get a fully usable canvas.',
      reactPoints: [
        'Three components: CanvasBoard / Toolbar / ZoomControl',
        'themeColor, language, data, onChange, onReady',
        'imageUpload with two channels, wired to OSS or your own backend',
      ],
    },
    gallerySection: {
      title: 'Capability gallery',
      desc: 'Click "Open live canvas" above to try drawing directly in the browser.',
    },
    gallery: [
      { title: 'Flowchart', desc: 'Start / decision / process / error branch' },
      { title: 'Mind Map', desc: 'Grows freely in four directions' },
      { title: 'Table', desc: 'Row and column editing with cell merging' },
      { title: 'UML Class Diagram', desc: 'Classes, interfaces and inheritance' },
      { title: 'Shape Library', desc: 'Common flowchart and geometric shapes' },
      { title: 'Sticky Notes', desc: 'Quick notes with rotation and grouping' },
    ],
    quickstartSection: {
      title: 'Quick Start',
      desc: 'Two commands to install, two code blocks to run.',
    },
    quickstart: {
      installTitle: '1. Install',
      renderTitle: '2. Render the canvas',
      callout:
        'Styles must be imported separately from drawui-react/styles.css; without data the canvas reads and writes localStorage, and with data the external data is authoritative.',
    },
    scenesSection: { title: 'Use Cases', desc: 'One canvas can show up in many places.' },
    scenes: [
      {
        title: 'Canvas inside SaaS products',
        desc: 'Mount CanvasBoard directly in whiteboards, low-code builders and flow designers; theme color, language and initial data are plain props.',
        points: [
          'Controlled or uncontrolled',
          'onChange syncs shapes and camera',
          'imageUpload connects to your own storage',
        ],
      },
      {
        title: 'Docs and knowledge bases',
        desc: 'Treat the canvas as a block inside a document; shape data is saved and exported along with the document, so readers see exactly what the author drew.',
        points: [
          'renderToCanvas for thumbnails',
          'SVG export shares the canvas geometry',
          'JSON archives restore across sessions',
        ],
      },
      {
        title: 'Teaching and diagram demos',
        desc: 'Build example diagrams quickly from preset shapes; together with site theme switching and i18n, it fits tutorials, help centers and demo pages.',
        points: [
          'Preset Shape[] plugs in directly',
          'Light and dark themes with 6 page backgrounds',
          'Shortcuts and the context menu work out of the box',
        ],
      },
    ],
    end: {
      title: 'Ready to draw your first stroke?',
      desc: 'Try it online first, then decide between core and react.',
      open: 'Open live canvas',
      react: 'Read the React docs',
    },
  },

  core: {
    pageTitle: 'A framework-agnostic core canvas engine',
    pageLead:
      'Written in native TypeScript and driving Canvas 2D directly. You can use only its renderer to produce images, or embed the whole engine in any framework to get shape operations, history, keyboard shortcuts and export.',
    badges: ['v0.6.0', 'TypeScript', 'Canvas 2D', 'MIT'],
    split: {
      title: 'Not a thin canvas wrapper, but a complete editor kernel',
      body: 'Selection, drawing, connecting, editing, undo and export are all driven by Editor. The upper UI only places the buttons and panels, and all state is exposed as Shape[] and EditorData.',
      points: [
        'Pure data structures, easy to persist, collaborate on and validate on the server',
        'Canvas rendering and SVG / PNG export share the same geometry',
        'Import utility and geometry modules on demand, with no React lock-in',
      ],
    },
    featuresSection: { title: 'Engine Features' },
    features: [
      {
        title: 'Framework-agnostic',
        desc: 'Native TypeScript + Canvas 2D with no UI framework lock-in; works directly with Vue, Svelte, Angular or an in-house framework.',
      },
      {
        title: 'Complete toolchain',
        desc: 'Select, hand, shape, line, arrow, freehand, eraser; drag to draw, Shift to keep proportions, Esc to cancel.',
      },
      {
        title: 'Editing capabilities',
        desc: 'Undo / redo, copy / paste, duplicate, layer order, copy style, flip horizontally / vertically, lock, group / ungroup.',
      },
      {
        title: 'Smart connectors',
        desc: 'Four-point snapping, automatic edge selection, orthogonal routing, bend handles; straight / polyline / orthogonal / curved connectors.',
      },
      {
        title: 'Professional shapes',
        desc: 'Tables, UML classes / interfaces, mind maps, flowchart symbols, 3D shapes, sticky notes, icons and images.',
      },
      {
        title: 'Themes and i18n',
        desc: '6 page themes, runtime theme color, 7 UI languages; the LANGUAGES export makes building your own language switcher easy.',
      },
      {
        title: 'Export and archive',
        desc: 'PNG / SVG / PDF, with canvas and export sharing the same source; exportJSON / importJSON save the full document and camera position.',
      },
      {
        title: 'Host-free rendering',
        desc: 'renderToCanvas / renderSVGString / getContentBounds generate thumbnails and previews without an editor.',
      },
    ],
    quickstartSection: {
      title: 'Install and Initialize',
      desc: 'Create an Editor instance after installing, then hand it the shape data.',
    },
    quickstart: {
      optionsTitle: 'Constructor options',
      tableHead: ['Option', 'Type', 'Description'],
      tableRows: [
        [
          'theme',
          'Partial<DrawuiTheme>',
          'Canvas and UI colors; changeable at runtime via setTheme',
        ],
        [
          'language',
          "'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR'",
          'UI language, defaults to zh-CN',
        ],
        ['shapes', 'Shape[]', 'Initial shapes; once provided, nothing is loaded from localStorage'],
        ['persist', 'boolean', 'Whether localStorage persistence is enabled, defaults to true'],
        [
          'imageUpload',
          'ImageUploadOption',
          'Image upload channel: a config object or a custom upload function',
        ],
      ],
    },
    apiSection: {
      title: 'Core API',
      exportsTitle: 'Main exports',
      exportsHead: ['Export', 'Purpose'],
      exportsRows: [
        ['Editor', 'Editor instance: shapes, selection, camera, history, export, persistence'],
        [
          'SelectTool / HandTool / ShapeTool / LineTool / FreehandTool / ArrowTool',
          'Tool classes that can be used or replaced standalone',
        ],
        ['Vec / Mat2d / Camera / Renderer', 'Geometry, camera and rendering infrastructure'],
        ['THEME / getTheme / setTheme / subscribeTheme', 'Read, switch and subscribe to themes'],
        ['LANGUAGES / setLanguage / getLanguage / t', 'Language list, switching and copy lookup'],
        ['layoutMindMap / mindMapNodeColor / mindMapNodeSize', 'Mind map layout and node styling'],
        [
          'renderToCanvas / renderSVGString / getContentBounds',
          'Host-free rendering and content bounding box',
        ],
        ['Shape / ShapeType / EditorData / ToolType / MindMapNode', 'Complete type definitions'],
      ],
      methodsTitle: 'Common instance methods',
      methodsHead: ['Method', 'Description'],
      methodsRows: [
        [
          'getShapes() / setShapes(shapes)',
          'Read or replace all shapes; setShapes is recorded in history',
        ],
        ['getData()', 'Get shapes + camera, for passing back to the host via onChange'],
        ['subscribe(listener)', 'Subscribe to changes; returns an unsubscribe function'],
        ['undo() / redo() / canUndo() / canRedo()', 'History control'],
        ['exportImage(format, opts)', 'Export PNG / SVG / PDF and return a Blob'],
        ['downloadImage(fileName, format, opts)', 'Export and trigger a browser download'],
        [
          'exportJSON() / importJSON(json)',
          'Archive and restore the full document (shapes + camera + version)',
        ],
        ['zoomIn() / zoomOut() / resetZoom() / panBy()', 'Viewport control'],
        ['copySelected() / paste() / duplicateSelected()', 'Clipboard and duplicates'],
        ['groupId / locked methods', 'Grouping, locking, layering and flipping operations'],
      ],
    },
    image: {
      title: 'Image Upload',
      desc: 'Works locally without any configuration; to keep images after a refresh, connect your own server or OSS.',
      channelA: 'Channel A: configure an upload endpoint',
      channelB: 'Channel B: custom upload function',
      callout:
        'The function channel takes priority over the config. A single image is capped at 30 MB by default; when exceeded it throws image.tooLarge without sending the request. See IMAGE_UPLOAD.md in the package for the full guide.',
    },
    changelogSection: {
      title: 'Changelog',
      desc: 'Key changes in recent versions; the README in the package has the full record.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: 'Connector routing · handle cleanup · eraser fade-out',
        points: [
          'Connectors no longer cut through target shapes: a new detour skeleton is used only when the two single-bus skeletons still overlap, and it re-checks that neither end shape is crossed.',
          'Segment handles are only offered for polyline and orthogonal connectors; straight and curved connectors no longer draw or hit them.',
          'Erased shapes fade out over 200ms before removal; undo / redo interrupts any unfinished fade.',
        ],
      },
      {
        version: 'v0.5.2',
        date: 'Mind map level promotion · drag to change level',
        points: [
          'Promote a node: attach it under the levels + 1 ancestor, and the whole subtree moves up with it.',
          'Drop inside another node box to become its child; drop within 48px outside the box to become a sibling in the same direction; dropping inside its own subtree is rejected.',
          'After a structural change, the map center is compensated by the root node offset, so the root no longer jumps when changing levels.',
          'New UiEvent drag events and 4 mind map copy keys.',
        ],
      },
      {
        version: 'v0.5.1',
        date: 'Mind map four-direction layout',
        points: [
          'MindMapNode gains a direction field; the root can grow up, down, left and right, and child nodes inherit the parent direction.',
          'Connectors pick the edge that matches the child direction and draw Bézier curves of the same shape in all four directions.',
          'Dragging now reorders within the same direction, with an equal-size dashed rounded placeholder previewing the drop.',
        ],
      },
      {
        version: 'v0.5.0',
        date: 'Image upload channel',
        points: [
          'A single image is capped at 30 MB; exceeding it throws image.tooLarge immediately without sending a request.',
          'Upload timeout defaults to 60s; both the ImageUploadConfig config and the ImageUploader function channel are supported.',
          'The image.tooLarge copy is localized in all 7 languages.',
        ],
      },
    ],
    next: {
      title: 'Want a ready-made canvas?',
      desc: 'Use CanvasBoard from drawui-react — the toolbar, zoom, style panel and context menu are already assembled.',
      link: 'View drawui-react →',
    },
  },

  react: {
    pageTitle: 'A ready-to-use React canvas component',
    pageLead:
      'A React wrapper built on drawui-core. Import one CanvasBoard and you get the complete canvas UI and interactions; when you need customization, grab the editor instance through onReady.',
    badges: ['v0.6.0', 'React 18 / 19', 'TypeScript', 'MIT'],
    heroActions: { openPlayground: 'Open live canvas', npm: 'npm packages' },
    split: {
      title: 'The component owns the UI, core owns the kernel',
      body: 'CanvasBoard already takes care of canvas sizing, toolbar placement, zoom, style panel, minimap and context menu. You only need to care about three things: what data to give it, who to notify when it changes, and what extra work to do once you have the instance.',
      points: [
        'styles.css is imported separately, so styles do not leak globally',
        'data changes are driven by the host, avoiding a black-box internal state',
        'Works on mobile and in narrow containers; panels collapse automatically',
      ],
    },
    featuresSection: { title: 'Component Features' },
    features: [
      {
        title: 'One component is a whole canvas',
        desc: 'Toolbar, zoom control, style panel, minimap, status bar and context menu are assembled in one go.',
      },
      {
        title: 'Controlled or uncontrolled',
        desc: 'Pass data to initialize from external data and turn off localStorage; omit it and the component reads and writes browser storage automatically.',
      },
      {
        title: 'Theme and language are props',
        desc: 'themeColor changes the primary color, language switches between 7 languages, and theme provides 6 page backgrounds.',
      },
      {
        title: 'Full control',
        desc: 'With the Editor instance from onReady, APIs such as setShapes, undo, zoom and exportJSON can all be called directly.',
      },
      {
        title: 'Image upload channel',
        desc: 'imageUpload accepts a config object or an upload function; OSS, STS direct upload and your own backend all need just one prop.',
      },
      {
        title: 'Use only what you need',
        desc: 'Toolbar and ZoomControl are exported separately, so you can take just one piece when building your own UI.',
      },
    ],
    quickstartSection: {
      title: 'Install & Usage',
      desc: 'drawui-core is installed automatically as a dependency; no separate declaration needed.',
    },
    quickstart: {
      callout:
        "Styles must be imported separately: import 'drawui-react/styles.css'. Once data is passed, the canvas no longer reads or writes localStorage; without it the component persists by itself.",
    },
    props: {
      title: 'CanvasBoard Props',
      tableHead: ['Prop', 'Type', 'Description'],
      tableRows: [
        ['initialTool', 'ToolType', "Initial tool, defaults to 'select'"],
        [
          'themeColor',
          'string',
          'Primary theme color (selection / handles / accents), defaults to #3b82f6',
        ],
        ['theme', 'PageTheme', "Page theme (canvas background / UI tone), defaults to 'light'"],
        [
          'onThemeChange',
          '(theme: PageTheme) => void',
          'Page theme change callback; the component keeps its own state when omitted',
        ],
        ['language', 'Language', "UI language, defaults to 'zh-CN'; 7 languages supported"],
        [
          'data',
          'Shape[]',
          'Initial shapes; once passed, localStorage is neither read nor written',
        ],
        ['onChange', '(data: EditorData) => void', 'Called when shapes or the camera change'],
        [
          'onReady',
          '(editor: Editor) => void',
          'The editor instance is ready; use Editor for full control',
        ],
        [
          'imageUpload',
          'ImageUploadOption',
          'Image upload channel: a config object or a custom upload function',
        ],
        ['className', 'string', 'Class name added to the canvas container'],
      ],
      exportsTitle: 'Exported components',
      exportsHead: ['Component', 'Description'],
      exportsRows: [
        [
          'CanvasBoard',
          'Main canvas: includes toolbar, zoom, style panel, mind map panel and more',
        ],
        ['Toolbar', 'Toolbar; usable standalone with all callbacks handled by you'],
        ['ZoomControl', 'Zoom control; onZoomIn / onZoomOut / onReset'],
      ],
    },
    image: {
      title: 'Image Upload',
      channelA: 'Configure an upload endpoint',
      channelB: 'Custom upload function',
      callout:
        'Without imageUpload the component falls back to temporary local blobs that disappear on refresh; configure your own upload channel for long-term storage.',
    },
    changelogSection: {
      title: 'Changelog',
      desc: 'See the README in the package for the full version history.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: 'Inherits the connector and eraser experience from core',
        points: [
          'Connector routing, segment handle cleanup and eraser fade-out take effect with drawui-core automatically, with no CanvasBoard configuration.',
          'The IMAGE_UPLOAD.md entry now tells you to look under node_modules/drawui-react/ after installation.',
        ],
      },
      {
        version: 'v0.5.2',
        date: 'Mind map level entry point',
        points: [
          'When a mind map is selected and an active node exists, the floating bottom style bar gains a fifth Level button, with promote one level / promote two levels.',
          'Dragging any shape hides the top toolbar, bottom style bar and table toolbar, restoring them on release.',
          'The drawui-core dependency is bumped to 0.5.2 in sync.',
        ],
      },
      {
        version: 'v0.5.0',
        date: 'Image upload channel',
        points: [
          'imageUpload supports both the ImageUploadConfig and ImageUploader function channels.',
          'A single image is capped at 30 MB, upload timeout defaults to 60s, and the over-limit message covers 7 languages.',
        ],
      },
      {
        version: 'v0.4.2',
        date: 'Context menu and group locking',
        points: [
          'New ContextMenu: copy, paste, layer, flip, group, lock, delete, with full shortcuts and disabled states.',
          'It takes over contextmenu at both the container and canvas levels, and no browser native menu pops up on the toolbar or style panel either.',
          'Grouping locks the whole group; after unlocking, clicking any member selects the group and the canvas draws a dashed group frame.',
        ],
      },
    ],
    next: {
      title: 'Try it before you decide',
      desc: 'The live canvas ships with five presets — flow, mind map, table, UML and shape library; press Esc to exit.',
      button: 'Try it live →',
    },
  },
};

export default en;
