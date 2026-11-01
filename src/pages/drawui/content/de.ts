import type { DocsContent } from './types';

const de: DocsContent = {
  layout: {
    brandTag: 'Canvas-Engine',
    pageContentsLabel: 'Auf dieser Seite',
    npmLabel: 'npm-Pakete',
    navGroups: [
      {
        title: 'Erste Schritte',
        items: [
          { label: 'Übersicht', to: '/drawui', end: true },
          { label: 'Live-Demo', to: '/drawui#playground' },
        ],
      },
      {
        title: 'drawui-core',
        items: [
          { label: 'Core Engine', to: '/drawui/core' },
          { label: 'Features', to: '/drawui/core#features' },
          { label: 'Schnellstart', to: '/drawui/core#quickstart' },
          { label: 'Core API', to: '/drawui/core#api' },
          { label: 'Bild-Upload', to: '/drawui/core#image' },
          { label: 'Changelog', to: '/drawui/core#changelog' },
        ],
      },
      {
        title: 'drawui-react',
        items: [
          { label: 'React-Komponenten', to: '/drawui/react' },
          { label: 'Installation und Verwendung', to: '/drawui/react#quickstart' },
          { label: 'CanvasBoard', to: '/drawui/react#props' },
          { label: 'Bild-Upload', to: '/drawui/react#image' },
          { label: 'Changelog', to: '/drawui/react#changelog' },
        ],
      },
    ],
    anchorsByPath: {
      '/drawui': [
        { label: 'Was es kann', hash: 'features' },
        { label: 'Zusammenspiel der beiden Pakete', hash: 'packages' },
        { label: 'Funktionsgalerie', hash: 'gallery' },
        { label: 'Schnellstart', hash: 'quickstart' },
        { label: 'Einsatzszenarien', hash: 'scenes' },
      ],
      '/drawui/core': [
        { label: 'Engine-Features', hash: 'features' },
        { label: 'Installation und Initialisierung', hash: 'quickstart' },
        { label: 'Core API', hash: 'api' },
        { label: 'Bild-Upload', hash: 'image' },
        { label: 'Changelog', hash: 'changelog' },
      ],
      '/drawui/react': [
        { label: 'Komponenten-Features', hash: 'features' },
        { label: 'Installation und Verwendung', hash: 'quickstart' },
        { label: 'CanvasBoard-Props', hash: 'props' },
        { label: 'Bild-Upload', hash: 'image' },
        { label: 'Changelog', hash: 'changelog' },
      ],
    },
  },

  playground: {
    title: 'Live-Canvas',
    hint: '({count} Formen · Esc zum Beenden)',
    reset: 'Zurücksetzen',
    clear: 'Leeren',
    closeAria: 'Canvas beenden',
    presetNames: {
      flow: 'Flussdiagramm',
      mindmap: 'Mindmap',
      table: 'Tabelle',
      uml: 'UML-Klassendiagramm',
      sticky: 'Formenbibliothek',
    },
  },

  common: {
    copy: 'Kopieren',
    copied: 'Kopiert',
  },

  overview: {
    eyebrow: 'drawui · Framework-unabhängige Canvas-Engine',
    heroTitleLines: ['Ein starkes Canvas', 'für dein Produkt'],
    heroLead:
      'drawui-core liefert einen Zeichenkern in nativem TypeScript, drawui-react verpackt ihn in ein einzelnes CanvasBoard. Formen, Verbindungen, Mindmaps, Tabellen, UML, Export und Mehrsprachigkeit funktionieren sofort.',
    badges: ['MIT-Lizenz', 'Canvas 2D', 'TypeScript'],
    heroActions: {
      startReact: 'Mit drawui-react starten',
      learnCore: 'Core Engine entdecken',
      openPlayground: 'Live-Canvas öffnen ↗',
    },
    floatCards: {
      undoTitle: 'Rückgängig / Wiederholen',
      undoDesc: 'Eine Bearbeitungssitzung = ein Schritt',
      dragTitle: 'Ziehen zeichnet',
      dragDesc: 'Ab 5px Ziehen mit der Geste skalieren',
    },
    stats: [
      { value: '50+', label: 'Formtypen' },
      { value: '4', label: 'Verbindungstypen' },
      { value: '7', label: 'UI-Sprachen' },
      { value: '6', label: 'Seitenthemes' },
    ],
    featuresSection: {
      title: 'Was es kann',
      desc: 'Von einer einzelnen Form bis zum vollständigen, exportierbaren Canvas-Dokument. Jede Abbildung unten stammt vom echten drawui-Renderer, nicht aus einem Mockup.',
    },
    features: [
      {
        title: '50+ Formen und 4 Verbindungstypen',
        desc: 'Grundformen, Flussdiagramm-Symbole, 3D-Formen und Blockpfeile sind alle enthalten; gerade, Polygon-, orthogonale und Kurven-Verbindungen weichen den Formen an beiden Enden automatisch aus.',
      },
      {
        title: 'Mindmaps wachsen in vier Richtungen',
        desc: 'Der Wurzelknoten kann nach oben, unten, links und rechts wachsen, Kindknoten erben die Richtung des Elternknotens; Ziehen ändert die Ebene, Neuordnen innerhalb derselben Richtung, gestrichelte Vorschau am Zielpunkt.',
      },
      {
        title: 'Tabellen direkt bearbeiten',
        desc: 'Tabelle mit dem 8×6-Auswahlraster einfügen, Zellen wie in Feishu per Rahmen auswählen, Zusammenführen / Teilen, Zeilen und Spalten einfügen / löschen; Text bricht automatisch um, die Zeilenhöhe wächst mit dem Inhalt.',
      },
      {
        title: 'UML-Klassendiagramme',
        desc: 'Klassen- und Interface-Formen enthalten Bereiche für Attribute / Methoden, Verbindungen unterstützen fünf UML-Pfeilsemantiken: Vererbung, Aggregation, Komposition, Abhängigkeit und Realisierung.',
      },
      {
        title: 'Notizzettel, Icons und Vorlagen',
        desc: 'Haftnotizen, 113 Twemoji-Emojis, Lucide-Linienicons und eine Vorlagenbibliothek; eine ausgewählte Vorlage wird als Ganzes in die Mitte des Viewports eingefügt und ist sofort einsatzbereit.',
      },
      {
        title: 'Export und Archiv',
        desc: 'PNG / SVG / PDF mit einem Klick exportieren; exportJSON / importJSON speichern das vollständige Dokument (Formen + Camera + Versionsnummer), damit du später weiterzeichnen kannst.',
      },
    ],
    packagesSection: {
      title: 'Zusammenspiel der beiden Pakete',
      desc: 'Die untere Ebene ist die Engine, die obere der React-Wrapper. Installiere nur drawui-react – drawui-core wird automatisch mitinstalliert.',
    },
    packages: {
      coreTag: 'Core Engine',
      coreDesc:
        'Natives TypeScript ohne React-Abhängigkeit. Verwende es, wenn du direkt auf dem Canvas arbeitest; passend für Vue, Svelte, Angular oder ein eigenes Framework.',
      corePoints: [
        'Editor / Camera / Renderer und alle Utility-Klassen lassen sich einzeln importieren',
        'Formoperationen, History, Tastenkürzel und Zwischenablage sind vollständig enthalten',
        'renderToCanvas / renderSVGString erzeugen Bilder ohne Host',
      ],
      reactTag: 'Empfohlener Einstieg',
      reactDesc:
        'Toolbar, Zoom, Stilpanel, Minimap und Kontextmenü sind bereits zusammengesetzt – ein paar Props genügen für ein voll einsatzfähiges Canvas.',
      reactPoints: [
        'Drei Komponenten: CanvasBoard / Toolbar / ZoomControl',
        'themeColor, language, data, onChange, onReady',
        'imageUpload mit zwei Kanälen, angebunden an OSS oder ein eigenes Backend',
      ],
    },
    gallerySection: {
      title: 'Funktionsgalerie',
      desc: 'Klicke oben auf „Live-Canvas öffnen“, um direkt im Browser zu zeichnen.',
    },
    gallery: [
      { title: 'Flussdiagramm', desc: 'Start / Entscheidung / Prozess / Fehlerzweig' },
      { title: 'Mindmap', desc: 'Wächst frei in vier Richtungen' },
      { title: 'Tabelle', desc: 'Zeilen- und Spaltenbearbeitung mit Zellzusammenführung' },
      { title: 'UML-Klassendiagramm', desc: 'Klassen, Interfaces und Vererbung' },
      { title: 'Formenbibliothek', desc: 'Gängige Flussdiagramm- und geometrische Formen' },
      { title: 'Notizzettel', desc: 'Kurz notiert, mit Rotation und Gruppierung' },
    ],
    quickstartSection: {
      title: 'Schnellstart',
      desc: 'Zwei Befehle zum Installieren, zwei Codeblöcke zum Starten.',
    },
    quickstart: {
      installTitle: '1. Installieren',
      renderTitle: '2. Canvas rendern',
      callout:
        'Styles müssen separat über drawui-react/styles.css eingebunden werden; ohne data liest und schreibt das Canvas localStorage, mit data gelten die externen Daten.',
    },
    scenesSection: {
      title: 'Einsatzszenarien',
      desc: 'Ein Canvas kann an vielen Stellen erscheinen.',
    },
    scenes: [
      {
        title: 'Canvas in SaaS-Produkten',
        desc: 'CanvasBoard direkt in Whiteboards, Low-Code-Buildern und Prozessdesignern einbinden; Theme-Farbe, Sprache und Startdaten sind normale Props.',
        points: [
          'Kontrolliert oder unkontrolliert',
          'onChange synchronisiert Formen und Camera',
          'imageUpload an eigenen Speicher anbinden',
        ],
      },
      {
        title: 'Dokumentation und Wissensdatenbanken',
        desc: 'Das Canvas als Block in einem Dokument; Formdaten werden mit dem Dokument gespeichert und exportiert, Leser sehen genau das, was der Autor gezeichnet hat.',
        points: [
          'renderToCanvas erzeugt Thumbnails',
          'SVG-Export teilt dieselbe Geometrie wie das Canvas',
          'JSON-Archive über Sitzungen hinweg wiederherstellen',
        ],
      },
      {
        title: 'Lehre und Diagramm-Demos',
        desc: 'Beispieldiagramme schnell aus vordefinierten Formen bauen; zusammen mit Theme-Umschaltung und Mehrsprachigkeit passt es zu Tutorials, Help-Centern und Demoseiten.',
        points: [
          'Vordefinierte Shape[] direkt einsetzbar',
          'Helles und dunkles Theme mit 6 Seitenhintergründen',
          'Tastenkürzel und Kontextmenü sofort nutzbar',
        ],
      },
    ],
    end: {
      title: 'Bereit für den ersten Strich?',
      desc: 'Probiere es zuerst online aus und entscheide dann zwischen core und react.',
      open: 'Live-Canvas öffnen',
      react: 'React-Dokumentation ansehen',
    },
  },

  core: {
    pageTitle: 'Eine framework-unabhängige Canvas-Engine als Kern',
    pageLead:
      'In nativem TypeScript geschrieben und steuert Canvas 2D direkt. Du kannst nur den Renderer zum Erzeugen von Bildern nutzen oder die gesamte Engine in jedes Framework einbetten und erhältst Formoperationen, History, Tastenkürzel und Export.',
    badges: ['v0.6.0', 'TypeScript', 'Canvas 2D', 'MIT'],
    split: {
      title: 'Kein dünner Canvas-Wrapper, sondern ein vollständiger Editor-Kern',
      body: 'Auswahl, Zeichnen, Verbinden, Bearbeiten, Rückgängig und Export werden alle vom Editor gesteuert. Die UI darüber platziert nur Buttons und Panels; der gesamte Zustand wird als Shape[] und EditorData nach außen gegeben.',
      points: [
        'Reine Datenstrukturen, einfach zu persistieren, zu kollaborieren und serverseitig zu validieren',
        'Canvas-Rendering und SVG- / PNG-Export nutzen dieselbe Geometrieberechnung',
        'Utility- und Geometriemodule bei Bedarf importieren, ohne React-Bindung',
      ],
    },
    featuresSection: { title: 'Engine-Features' },
    features: [
      {
        title: 'Framework-unabhängig',
        desc: 'Natives TypeScript + Canvas 2D ohne Bindung an ein UI-Framework; Vue, Svelte, Angular oder ein eigenes Framework funktionieren direkt.',
      },
      {
        title: 'Vollständige Toolchain',
        desc: 'Auswahl, Hand, Form, Linie, Pfeil, Freihand, Radierer; Ziehen zum Zeichnen, Shift für Proportionen, Esc zum Abbrechen.',
      },
      {
        title: 'Bearbeitungsfunktionen',
        desc: 'Rückgängig / Wiederholen, Kopieren / Einfügen, Duplizieren, Ebenenreihenfolge, Stil kopieren, horizontal / vertikal spiegeln, Sperren, Gruppieren / Gruppierung aufheben.',
      },
      {
        title: 'Intelligente Verbindungen',
        desc: 'Snapping an vier Punkten, automatische Kantenwahl, orthogonales Routing, Griffe an Knickpunkten; gerade / Polygon- / orthogonale / Kurven-Verbindungen.',
      },
      {
        title: 'Professionelle Formen',
        desc: 'Tabellen, UML-Klassen / Interfaces, Mindmaps, Flussdiagramm-Symbole, 3D-Formen, Notizzettel, Icons und Bilder.',
      },
      {
        title: 'Themes und Mehrsprachigkeit',
        desc: '6 Seitenthemes, Theme-Farbe zur Laufzeit, 7 UI-Sprachen; der LANGUAGES-Export erleichtert einen eigenen Sprachumschalter.',
      },
      {
        title: 'Export und Archiv',
        desc: 'PNG / SVG / PDF, Canvas und Export aus derselben Quelle; exportJSON / importJSON speichern das vollständige Dokument und die Camera-Position.',
      },
      {
        title: 'Rendering ohne Host',
        desc: 'renderToCanvas / renderSVGString / getContentBounds erzeugen Thumbnails und Vorschauen ohne Editor.',
      },
    ],
    quickstartSection: {
      title: 'Installation und Initialisierung',
      desc: 'Nach der Installation eine Editor-Instanz erzeugen und ihr die Formdaten übergeben.',
    },
    quickstart: {
      optionsTitle: 'Konstruktoroptionen',
      tableHead: ['Option', 'Typ', 'Beschreibung'],
      tableRows: [
        [
          'theme',
          'Partial<DrawuiTheme>',
          'Canvas- und UI-Farben, zur Laufzeit über setTheme änderbar',
        ],
        [
          'language',
          "'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR'",
          'UI-Sprache, Standard zh-CN',
        ],
        [
          'shapes',
          'Shape[]',
          'Initiale Formen; sobald angegeben, wird nicht mehr aus localStorage geladen',
        ],
        ['persist', 'boolean', 'Ob localStorage-Persistenz aktiviert ist, Standard true'],
        [
          'imageUpload',
          'ImageUploadOption',
          'Bild-Upload-Kanal: Konfigurationsobjekt oder eigene Upload-Funktion',
        ],
      ],
    },
    apiSection: {
      title: 'Core API',
      exportsTitle: 'Wichtige Exporte',
      exportsHead: ['Export', 'Zweck'],
      exportsRows: [
        ['Editor', 'Editor-Instanz: Formen, Auswahl, Camera, History, Export, Persistenz'],
        [
          'SelectTool / HandTool / ShapeTool / LineTool / FreehandTool / ArrowTool',
          'Tool-Klassen, die einzeln verwendet oder ersetzt werden können',
        ],
        ['Vec / Mat2d / Camera / Renderer', 'Geometrie-, Camera- und Rendering-Infrastruktur'],
        ['THEME / getTheme / setTheme / subscribeTheme', 'Themes lesen, wechseln und abonnieren'],
        [
          'LANGUAGES / setLanguage / getLanguage / t',
          'Sprachliste, Umschalten und Textnachschlagen',
        ],
        ['layoutMindMap / mindMapNodeColor / mindMapNodeSize', 'Mindmap-Layout und Knoten-Styling'],
        [
          'renderToCanvas / renderSVGString / getContentBounds',
          'Rendering ohne Host und Bounding-Box des Inhalts',
        ],
        ['Shape / ShapeType / EditorData / ToolType / MindMapNode', 'Vollständige Typdefinitionen'],
      ],
      methodsTitle: 'Häufige Instanzmethoden',
      methodsHead: ['Methode', 'Beschreibung'],
      methodsRows: [
        [
          'getShapes() / setShapes(shapes)',
          'Alle Formen lesen oder ersetzen; setShapes wird in der History aufgezeichnet',
        ],
        ['getData()', 'Formen + Camera holen, um sie dem Host über onChange zurückzugeben'],
        ['subscribe(listener)', 'Änderungen abonnieren; gibt eine Funktion zum Abmelden zurück'],
        ['undo() / redo() / canUndo() / canRedo()', 'History-Steuerung'],
        ['exportImage(format, opts)', 'PNG / SVG / PDF exportieren und ein Blob zurückgeben'],
        [
          'downloadImage(fileName, format, opts)',
          'Exportieren und einen Browser-Download auslösen',
        ],
        [
          'exportJSON() / importJSON(json)',
          'Vollständiges Dokument (Formen + Camera + Version) archivieren und wiederherstellen',
        ],
        ['zoomIn() / zoomOut() / resetZoom() / panBy()', 'Viewport-Steuerung'],
        ['copySelected() / paste() / duplicateSelected()', 'Zwischenablage und Duplikate'],
        [
          'groupId / locked bezogene Methoden',
          'Gruppieren, Sperren, Ebenen, Spiegeln und weitere Bearbeitungen',
        ],
      ],
    },
    image: {
      title: 'Bild-Upload',
      desc: 'Ohne Konfiguration funktioniert es lokal temporär; damit Bilder einen Refresh überleben, eigenen Server oder OSS anbinden.',
      channelA: 'Kanal A: Upload-Adresse konfigurieren',
      channelB: 'Kanal B: eigene Upload-Funktion',
      callout:
        'Der Funktionskanal hat Vorrang vor der Konfiguration. Ein einzelnes Bild ist standardmäßig auf 30 MB begrenzt; bei Überschreitung wird image.tooLarge geworfen, ohne die Anfrage zu senden. Die vollständige Anleitung steht in IMAGE_UPLOAD.md im Paket.',
    },
    changelogSection: {
      title: 'Changelog',
      desc: 'Wichtige Änderungen der letzten Versionen; die vollständige Historie steht im README des Pakets.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: 'Verbindungs-Routing · reduzierte Griffe · Radierer-Fade-out',
        points: [
          'Verbindungen durchqueren Zielformen nicht mehr: Ein neues Umweg-Skelett greift nur, wenn die beiden Single-Bus-Skelette noch überlappen, und prüft erneut, dass keine der beiden Endformen gekreuzt wird.',
          'Segmentgriffe gibt es nur noch für Polygon- und orthogonale Verbindungen; gerade und Kurven-Verbindungen zeichnen und treffen sie nicht mehr.',
          'Vom Radierer getroffene Formen blenden 200ms lang aus, bevor sie entfernt werden; Rückgängig / Wiederholen bricht ein unfertiges Ausblenden ab.',
        ],
      },
      {
        version: 'v0.5.2',
        date: 'Mindmap-Ebenen anheben · Ziehen ändert die Ebene',
        points: [
          'Knoten anheben: Der Knoten wird unter dem Vorfahren der Ebene levels + 1 eingehängt, der gesamte Teilbaum wandert mit nach oben.',
          'Ablegen im Feld eines anderen Knotens macht ihn zum Kindknoten; bis 48px außerhalb des Feldes wird er zum Geschwister in derselben Richtung; Ablegen im eigenen Teilbaum wird abgelehnt.',
          'Nach einer Strukturänderung wird das Kartenzentrum um die Wurzelknoten-Verschiebung kompensiert, sodass die Wurzel beim Ebenenwechsel nicht springt.',
          'Neue UiEvent-Drag-Events und 4 Mindmap-Textschlüssel.',
        ],
      },
      {
        version: 'v0.5.1',
        date: 'Mindmap-Layout in vier Richtungen',
        points: [
          'MindMapNode erhält ein direction-Feld; die Wurzel kann nach oben, unten, links und rechts wachsen, Kindknoten erben die Elternrichtung.',
          'Verbindungen wählen die zur Kindrichtung passende Kante und zeichnen gleichförmige Bézier-Kurven.',
          'Ziehen sortiert jetzt innerhalb derselben Richtung neu; ein gleich großer gestrichelter Platzhalter zeigt das Ziel.',
        ],
      },
      {
        version: 'v0.5.0',
        date: 'Bild-Upload-Kanal',
        points: [
          'Ein einzelnes Bild ist auf 30 MB begrenzt; bei Überschreitung wird sofort image.tooLarge geworfen, ohne eine Anfrage zu senden.',
          'Upload-Timeout standardmäßig 60s; sowohl die ImageUploadConfig als auch der ImageUploader-Funktionskanal werden unterstützt.',
          'Der Text für image.tooLarge ist in allen 7 Sprachen lokalisiert.',
        ],
      },
    ],
    next: {
      title: 'Lieber sofort ein fertiges Canvas?',
      desc: 'Nutze CanvasBoard aus drawui-react – Toolbar, Zoom, Stilpanel und Kontextmenü sind bereits zusammengesetzt.',
      link: 'drawui-react ansehen →',
    },
  },

  react: {
    pageTitle: 'Eine einsatzbereite React-Canvas-Komponente',
    pageLead:
      'Ein React-Wrapper auf Basis von drawui-core. Ein CanvasBoard genügt für die vollständige Canvas-Oberfläche samt Interaktionen; für Anpassungen holst du dir die Editor-Instanz über onReady.',
    badges: ['v0.6.0', 'React 18 / 19', 'TypeScript', 'MIT'],
    heroActions: { openPlayground: 'Live-Canvas öffnen', npm: 'npm-Pakete' },
    split: {
      title: 'Die Komponente liefert die Oberfläche, core den Kern',
      body: 'CanvasBoard kümmert sich bereits um Canvas-Größe, Platzierung der Toolbar, Zoom, Stilpanel, Minimap und Kontextmenü. Du musst nur drei Dinge beachten: welche Daten du übergibst, wer bei Änderungen benachrichtigt wird und was du mit der Instanz zusätzlich tun willst.',
      points: [
        'styles.css separat einbinden, Styles beeinflussen das globale CSS nicht',
        'data-Änderungen werden vom Host gesteuert, kein Blackbox-interner Zustand',
        'Mobil und in schmalen Containern nutzbar, Panels klappen automatisch ein',
      ],
    },
    featuresSection: { title: 'Komponenten-Features' },
    features: [
      {
        title: 'Eine Komponente ist ein ganzes Canvas',
        desc: 'Toolbar, Zoom-Steuerung, Stilpanel, Minimap, Statusleiste und Kontextmenü sind in einem Schritt zusammengesetzt.',
      },
      {
        title: 'Kontrolliert oder unkontrolliert',
        desc: 'Mit data wird aus externen Daten initialisiert und localStorage deaktiviert; ohne data liest und schreibt die Komponente automatisch den Browserspeicher.',
      },
      {
        title: 'Theme und Sprache sind Props',
        desc: 'themeColor ändert die Primärfarbe, language wechselt zwischen 7 Sprachen, theme bietet 6 Seitenhintergründe.',
      },
      {
        title: 'Volle Kontrolle',
        desc: 'Mit der Editor-Instanz aus onReady lassen sich APIs wie setShapes, undo, zoom und exportJSON direkt aufrufen.',
      },
      {
        title: 'Bild-Upload-Kanal',
        desc: 'imageUpload akzeptiert ein Konfigurationsobjekt oder eine Upload-Funktion; OSS, STS-Direktupload und ein eigenes Backend brauchen nur eine Prop.',
      },
      {
        title: 'Nur nehmen, was du brauchst',
        desc: 'Toolbar und ZoomControl werden separat exportiert, sodass du für eine eigene UI nur ein Teil verwenden kannst.',
      },
    ],
    quickstartSection: {
      title: 'Installation und Verwendung',
      desc: 'drawui-core wird als Abhängigkeit automatisch installiert, keine separate Deklaration nötig.',
    },
    quickstart: {
      callout:
        "Styles müssen separat eingebunden werden: import 'drawui-react/styles.css'. Sobald data übergeben wird, liest und schreibt das Canvas kein localStorage mehr; ohne data persistiert die Komponente selbst.",
    },
    props: {
      title: 'CanvasBoard-Props',
      tableHead: ['Prop', 'Typ', 'Beschreibung'],
      tableRows: [
        ['initialTool', 'ToolType', "Startwerkzeug, Standard 'select'"],
        [
          'themeColor',
          'string',
          'Primärfarbe des Themes (Auswahl / Griffe / Akzente), Standard #3b82f6',
        ],
        ['theme', 'PageTheme', "Seitentheme (Canvas-Hintergrund / UI-Ton), Standard 'light'"],
        [
          'onThemeChange',
          '(theme: PageTheme) => void',
          'Callback bei Theme-Wechsel; ohne Angabe hält die Komponente den Zustand selbst',
        ],
        ['language', 'Language', "UI-Sprache, Standard 'zh-CN'; 7 Sprachen werden unterstützt"],
        [
          'data',
          'Shape[]',
          'Initiale Formen; sobald übergeben, wird localStorage nicht mehr gelesen oder geschrieben',
        ],
        [
          'onChange',
          '(data: EditorData) => void',
          'Wird aufgerufen, wenn sich Formen oder Camera ändern',
        ],
        [
          'onReady',
          '(editor: Editor) => void',
          'Editor-Instanz ist bereit; mit Editor volle Kontrolle',
        ],
        [
          'imageUpload',
          'ImageUploadOption',
          'Bild-Upload-Kanal: Konfigurationsobjekt oder eigene Upload-Funktion',
        ],
        ['className', 'string', 'Klassenname für den Canvas-Container'],
      ],
      exportsTitle: 'Exportierte Komponenten',
      exportsHead: ['Komponente', 'Beschreibung'],
      exportsRows: [
        ['CanvasBoard', 'Haupt-Canvas: mit Toolbar, Zoom, Stilpanel, Mindmap-Panel und mehr'],
        ['Toolbar', 'Toolbar; auch eigenständig nutzbar, alle Callbacks übernimmst du selbst'],
        ['ZoomControl', 'Zoom-Steuerung; onZoomIn / onZoomOut / onReset'],
      ],
    },
    image: {
      title: 'Bild-Upload',
      channelA: 'Upload-Adresse konfigurieren',
      channelB: 'Eigene Upload-Funktion',
      callout:
        'Ohne imageUpload fällt die Komponente auf temporäre lokale Blobs zurück, die nach einem Refresh verschwinden; für dauerhafte Speicherung einen eigenen Upload-Kanal konfigurieren.',
    },
    changelogSection: {
      title: 'Changelog',
      desc: 'Die vollständige Versionshistorie steht im README des Pakets.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: 'Übernimmt Verbindungs- und Radierer-Verhalten aus core',
        points: [
          'Verbindungs-Routing, reduzierte Segmentgriffe und Radierer-Fade-out greifen automatisch mit drawui-core, ohne CanvasBoard-Konfiguration.',
          'Der IMAGE_UPLOAD.md-Hinweis verweist jetzt auf node_modules/drawui-react/ nach der Installation.',
        ],
      },
      {
        version: 'v0.5.2',
        date: 'Einstieg für Mindmap-Ebenen',
        points: [
          'Bei ausgewählter Mindmap mit aktivem Knoten erhält die schwebende Stilleiste unten einen fünften Button „Ebene“ mit eine Ebene / zwei Ebenen anheben.',
          'Beim Ziehen einer beliebigen Form werden obere Toolbar, untere Stilleiste und Tabellenleiste ausgeblendet und beim Loslassen wiederhergestellt.',
          'Die drawui-core-Abhängigkeit wird synchron auf 0.5.2 angehoben.',
        ],
      },
      {
        version: 'v0.5.0',
        date: 'Bild-Upload-Kanal',
        points: [
          'imageUpload unterstützt sowohl ImageUploadConfig als auch den ImageUploader-Funktionskanal.',
          'Ein Bild ist auf 30 MB begrenzt, Upload-Timeout standardmäßig 60s, der Hinweis bei Überschreitung deckt 7 Sprachen ab.',
        ],
      },
      {
        version: 'v0.4.2',
        date: 'Kontextmenü und Gruppen-Sperre',
        points: [
          'Neues ContextMenu: Kopieren, Einfügen, Ebene, Spiegeln, Gruppieren, Sperren, Löschen, mit vollständigen Tastenkürzeln und deaktivierten Zuständen.',
          'Übernimmt contextmenu auf Container- und Canvas-Ebene; auch auf Toolbar und Stilpanel erscheint kein natives Browsermenü mehr.',
          'Gruppieren sperrt die ganze Gruppe; nach dem Entsperren wählt ein Klick auf ein Mitglied die Gruppe, und das Canvas zeichnet einen gestrichelten Gruppenrahmen.',
        ],
      },
    ],
    next: {
      title: 'Erst ausprobieren, dann entscheiden',
      desc: 'Das Live-Canvas enthält fünf Presets – Flussdiagramm, Mindmap, Tabelle, UML und Formenbibliothek; Esc beendet den Modus.',
      button: 'Live testen →',
    },
  },
};

export default de;
