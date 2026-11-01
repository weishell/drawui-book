import type { DocsContent } from './types';

const zhTW: DocsContent = {
  layout: {
    brandTag: '畫板引擎',
    pageContentsLabel: '本頁內容',
    npmLabel: 'npm 套件',
    navGroups: [
      {
        title: '開始',
        items: [
          { label: '概覽', to: '/drawui', end: true },
          { label: '線上體驗', to: '/drawui#playground' },
        ],
      },
      {
        title: 'drawui-core',
        items: [
          { label: '核心引擎', to: '/drawui/core' },
          { label: '特色', to: '/drawui/core#features' },
          { label: '快速上手', to: '/drawui/core#quickstart' },
          { label: '核心 API', to: '/drawui/core#api' },
          { label: '圖片上傳', to: '/drawui/core#image' },
          { label: '更新記錄', to: '/drawui/core#changelog' },
        ],
      },
      {
        title: 'drawui-react',
        items: [
          { label: 'React 元件', to: '/drawui/react' },
          { label: '安裝與用法', to: '/drawui/react#quickstart' },
          { label: 'CanvasBoard', to: '/drawui/react#props' },
          { label: '圖片上傳', to: '/drawui/react#image' },
          { label: '更新記錄', to: '/drawui/react#changelog' },
        ],
      },
    ],
    anchorsByPath: {
      '/drawui': [
        { label: '它能做什麼', hash: 'features' },
        { label: '兩個套件的關係', hash: 'packages' },
        { label: '能力展示', hash: 'gallery' },
        { label: '快速開始', hash: 'quickstart' },
        { label: '適用場景', hash: 'scenes' },
      ],
      '/drawui/core': [
        { label: '引擎特色', hash: 'features' },
        { label: '安裝與初始化', hash: 'quickstart' },
        { label: '核心 API', hash: 'api' },
        { label: '圖片上傳', hash: 'image' },
        { label: '更新記錄', hash: 'changelog' },
      ],
      '/drawui/react': [
        { label: '元件特色', hash: 'features' },
        { label: '安裝與用法', hash: 'quickstart' },
        { label: 'CanvasBoard 屬性', hash: 'props' },
        { label: '圖片上傳', hash: 'image' },
        { label: '更新記錄', hash: 'changelog' },
      ],
    },
  },

  playground: {
    title: '線上畫板',
    hint: '（{count} 個圖形 · 按 Esc 退出）',
    reset: '重設',
    clear: '清空',
    closeAria: '退出畫板',
    presetNames: {
      flow: '流程圖',
      mindmap: '心智圖',
      table: '表格',
      uml: 'UML 類別圖',
      sticky: '圖形庫',
    },
  },

  common: {
    copy: '複製',
    copied: '已複製',
  },

  overview: {
    eyebrow: 'drawui · 框架無關的畫布引擎',
    heroTitleLines: ['把一塊好用的畫布', '裝進你的產品'],
    heroLead:
      'drawui-core 提供原生 TypeScript 的繪圖核心，drawui-react 將它封裝成一個 CanvasBoard。圖形、連線、心智圖、表格、UML、匯出與多語系，全部開箱即用。',
    badges: ['MIT 授權', 'Canvas 2D', 'TypeScript'],
    heroActions: {
      startReact: '用 drawui-react 開始',
      learnCore: '了解核心引擎',
      openPlayground: '開啟線上畫板 ↗',
    },
    floatCards: {
      undoTitle: '復原 / 重做',
      undoDesc: '一個編輯工作階段 = 一步',
      dragTitle: '拖曳即繪製',
      dragDesc: '按住拖過 5px 隨手勢縮放',
    },
    stats: [
      { value: '50+', label: '圖形類型' },
      { value: '4', label: '連線方式' },
      { value: '7', label: '介面語言' },
      { value: '6', label: '頁面主題' },
    ],
    featuresSection: {
      title: '它能做什麼',
      desc: '從一個圖形、一筆開始，到整份可匯出的畫板文件。下面每一張配圖都由 drawui 的真實渲染器產生，不是示意圖。',
    },
    features: [
      {
        title: '50+ 圖形與 4 種連線',
        desc: '基礎圖形、流程圖符號、立體圖形、區塊箭頭一應俱全；直線、折線、直角折線、曲線四種連線會自動避讓兩端圖形。',
      },
      {
        title: '心智圖四方向生長',
        desc: '根節點可向上、下、左、右四個方向生長，子節點繼承父方向；拖曳可換階層、同方向重新排序、置放點以虛線預覽。',
      },
      {
        title: '表格就地編輯',
        desc: '8×6 選擇器插入表格，飛書式框選儲存格，合併 / 分割、插入 / 刪除列欄，文字自動換行、列高隨內容增高。',
      },
      {
        title: 'UML 類別圖',
        desc: '類別與介面圖形內建屬性 / 方法區塊，連線支援繼承、聚合、組合、依賴、實作五種 UML 箭頭語意。',
      },
      {
        title: '便條、圖示與範本',
        desc: '便條紙、113 個 Twemoji 表情、Lucide 線性圖示與範本庫；範本選取後整塊插入檢視區中心，即選即用。',
      },
      {
        title: '匯出與存檔',
        desc: 'PNG / SVG / PDF 一鍵匯出；exportJSON / importJSON 可儲存完整文件（圖形 + 相機 + 版本號），下次接著畫。',
      },
    ],
    packagesSection: {
      title: '兩個套件的關係',
      desc: '中下層是引擎，上層是 React 封裝。只裝 drawui-react 即可，drawui-core 會自動安裝。',
    },
    packages: {
      coreTag: '核心引擎',
      coreDesc:
        '原生 TypeScript，不依賴 React。直接操作 canvas 時使用它，適合 Vue、Svelte、Angular 或自有框架。',
      corePoints: [
        'Editor / Camera / Renderer 與工具類別全部可單獨引用',
        '圖形操作、歷史記錄、快速鍵、剪貼簿一應俱全',
        'renderToCanvas / renderSVGString 無宿主直接輸出圖片',
      ],
      reactTag: '推薦入口',
      reactDesc:
        '把工具列、縮放、樣式面板、小地圖與右鍵選單全部組裝好，傳幾個 props 就能得到一整塊可用畫板。',
      reactPoints: [
        'CanvasBoard / Toolbar / ZoomControl 三個元件',
        'themeColor、language、data、onChange、onReady',
        'imageUpload 兩種通道，可串接 OSS 或自建後端',
      ],
    },
    gallerySection: {
      title: '能力展示',
      desc: '點選上方「開啟線上畫板」，可以直接在瀏覽器裡試著畫一畫。',
    },
    gallery: [
      { title: '流程圖', desc: '開始 / 判斷 / 處理 / 異常分支' },
      { title: '心智圖', desc: '四個方向自由生長' },
      { title: '表格', desc: '列欄編輯與儲存格合併' },
      { title: 'UML 類別圖', desc: '類別、介面與繼承關係' },
      { title: '圖形庫', desc: '常用流程圖與幾何圖形' },
      { title: '便條', desc: '隨手記錄，支援旋轉與群組' },
    ],
    quickstartSection: { title: '快速開始', desc: '兩行指令裝好，兩段程式碼跑起來。' },
    quickstart: {
      installTitle: '1. 安裝',
      renderTitle: '2. 渲染畫板',
      callout:
        '樣式必須單獨引入 drawui-react/styles.css；未傳入 data 時畫布會讀寫 localStorage，傳入後則以外部資料為準。',
    },
    scenesSection: { title: '適用場景', desc: '一塊畫布可以出現在很多地方。' },
    scenes: [
      {
        title: 'SaaS 產品內嵌畫布',
        desc: '在白板、低程式碼、流程設計器中直接掛載 CanvasBoard，主題色、語言、初始資料都是普通 props。',
        points: ['受控 / 非受控均可', 'onChange 同步圖形與相機', 'imageUpload 串接自有儲存'],
      },
      {
        title: '文件與知識庫',
        desc: '把畫板當作文件裡的一個區塊，圖形資料隨文件一起儲存、匯出，讀者看到的就是作者畫出的樣子。',
        points: ['renderToCanvas 產生縮圖', 'SVG 匯出與畫布同源', 'JSON 存檔可跨工作階段還原'],
      },
      {
        title: '教學與圖例示範',
        desc: '用預設圖形快速搭出範例圖，搭配網站主題切換與多語系，適合教學課程、說明中心與示範頁。',
        points: ['預設 Shape[] 即插即用', '明暗主題與 6 種頁面底色', '快速鍵與右鍵選單開箱即可用'],
      },
    ],
    end: {
      title: '準備好畫下第一筆了嗎？',
      desc: '先在線上試一下，再決定用 core 還是 react。',
      open: '開啟線上畫板',
      react: '查看 React 文件',
    },
  },

  core: {
    pageTitle: '框架無關的核心畫布引擎',
    pageLead:
      '以原生 TypeScript 編寫，直接操作 Canvas 2D。你可以只用它的渲染器輸出圖片，也可以將它完整嵌進任何框架，取得圖形操作、歷史記錄、快速鍵與匯出能力。',
    badges: ['v0.6.0', 'TypeScript', 'Canvas 2D', 'MIT'],
    split: {
      title: '不是一層薄薄的畫布，而是一套完整的編輯器核心',
      body: '選取、繪製、連線、編輯、復原、匯出都由 Editor 統一驅動。上層 UI 只負責把按鈕和面板擺好，所有狀態都以 Shape[] 與 EditorData 的形式對外暴露。',
      points: [
        '純資料結構，方便持久化、協同與伺服器端驗證',
        '畫布渲染與 SVG / PNG 匯出共用同一套幾何計算',
        '依需求引入工具類別與幾何模組，不強綁 React',
      ],
    },
    featuresSection: { title: '引擎特色' },
    features: [
      {
        title: '框架無關',
        desc: '原生 TypeScript + Canvas 2D，不綁定任何 UI 框架；Vue、Svelte、Angular 或自研框架都能直接用。',
      },
      {
        title: '完整工具鏈',
        desc: '選取、手掌、圖形、直線、箭頭、手繪、橡皮擦；拖曳繪製、Shift 等比、Esc 取消。',
      },
      {
        title: '編輯能力',
        desc: '復原重做、複製貼上、建立副本、調整圖層順序、複製樣式、水平 / 垂直翻轉、鎖定、群組 / 取消群組。',
      },
      {
        title: '智慧連線',
        desc: '四點吸附、自動選邊、正交繞行、轉折點控點；直線 / 折線 / 直角折線 / 曲線四類連接。',
      },
      {
        title: '專業圖形',
        desc: '表格、UML 類別圖 / 介面、心智圖、流程圖符號、立體圖形、便條、圖示、圖片。',
      },
      {
        title: '主題與多語系',
        desc: '6 種頁面主題、執行階段主題色、7 種介面語言；LANGUAGES 匯出便於自訂語言切換。',
      },
      {
        title: '匯出與存檔',
        desc: 'PNG / SVG / PDF，畫布與匯出同源；exportJSON / importJSON 可儲存完整文件與相機位置。',
      },
      {
        title: '無宿主渲染',
        desc: 'renderToCanvas / renderSVGString / getContentBounds 可在沒有編輯器時產生縮圖與預覽。',
      },
    ],
    quickstartSection: {
      title: '安裝與初始化',
      desc: '安裝後建立 Editor 執行個體，把圖形資料交給它。',
    },
    quickstart: {
      optionsTitle: '建構選項',
      tableHead: ['選項', '型別', '說明'],
      tableRows: [
        ['theme', 'Partial<DrawuiTheme>', '畫布與介面顏色，可在執行階段透過 setTheme 修改'],
        [
          'language',
          "'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR'",
          '介面語言，預設 zh-CN',
        ],
        ['shapes', 'Shape[]', '初始圖形；提供後不再從 localStorage 載入'],
        ['persist', 'boolean', '是否啟用 localStorage 持久化，預設 true'],
        ['imageUpload', 'ImageUploadOption', '圖片上傳通道：設定物件或自訂上傳函式'],
      ],
    },
    apiSection: {
      title: '核心 API',
      exportsTitle: '主要匯出',
      exportsHead: ['匯出', '用途'],
      exportsRows: [
        ['Editor', '編輯器執行個體：圖形、選取範圍、相機、歷史、匯出、持久化'],
        [
          'SelectTool / HandTool / ShapeTool / LineTool / FreehandTool / ArrowTool',
          '可單獨使用或替換的工具類別',
        ],
        ['Vec / Mat2d / Camera / Renderer', '幾何、相機與渲染基礎設施'],
        ['THEME / getTheme / setTheme / subscribeTheme', '主題讀取、切換與訂閱'],
        ['LANGUAGES / setLanguage / getLanguage / t', '多語系清單、切換與文案函式'],
        ['layoutMindMap / mindMapNodeColor / mindMapNodeSize', '心智圖版面配置與節點樣式'],
        ['renderToCanvas / renderSVGString / getContentBounds', '無宿主輸出圖片與內容邊界框'],
        ['Shape / ShapeType / EditorData / ToolType / MindMapNode', '完整型別定義'],
      ],
      methodsTitle: '常用執行個體方法',
      methodsHead: ['方法', '說明'],
      methodsRows: [
        ['getShapes() / setShapes(shapes)', '讀取或整體替換圖形，setShapes 會進入歷史記錄'],
        ['getData()', '取得圖形 + 相機，用於 onChange 回傳給宿主'],
        ['subscribe(listener)', '訂閱變更，傳回取消訂閱函式'],
        ['undo() / redo() / canUndo() / canRedo()', '歷史記錄控制'],
        ['exportImage(format, opts)', '匯出 PNG / SVG / PDF，傳回 Blob'],
        ['downloadImage(fileName, format, opts)', '匯出並觸發瀏覽器下載'],
        ['exportJSON() / importJSON(json)', '完整文件（圖形 + 相機 + 版本）存檔與還原'],
        ['zoomIn() / zoomOut() / resetZoom() / panBy()', '視埠控制'],
        ['copySelected() / paste() / duplicateSelected()', '剪貼簿與副本'],
        ['groupId / locked 相關方法', '群組、鎖定、圖層順序、翻轉等編輯操作'],
      ],
    },
    image: {
      title: '圖片上傳',
      desc: '不設定也可以在本機暫時使用；若要重新整理後不遺失，就串接自有伺服器或 OSS。',
      channelA: '通道 A：設定上傳位址',
      channelB: '通道 B：自訂上傳函式',
      callout:
        '函式通道優先於設定。單張圖片預設上限 30 MB，超過上限會拋出 image.tooLarge，不會真的發出請求；完整指南請見套件內的 IMAGE_UPLOAD.md。',
    },
    changelogSection: {
      title: '更新記錄',
      desc: '最近幾個版本的關鍵變更，完整記錄請見套件內的 README。',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: '連線避讓 · 控點收斂 · 橡皮擦漸隱',
        points: [
          '連線不再橫穿目標圖形：新增繞行骨架，僅在兩種單匯流排骨架仍壓線時啟用，並複驗不穿過兩端圖形。',
          '線段控點只提供給折線與直角折線，直線與曲線不再繪製、也不再命中。',
          '橡皮擦命中後 200ms 淡出再刪除；復原 / 重做會中斷未完成的漸隱。',
        ],
      },
      {
        version: 'v0.5.2',
        date: '心智圖升降階層 · 拖曳換階層',
        points: [
          '節點升階層：把節點掛到第 levels + 1 代祖先之下，子樹整體跟隨上移。',
          '拖到另一節點框內部成為子節點，拖到框外側 48px 內成為同方向兄弟；目標落在自身子樹內會被拒絕。',
          '結構變更後按根節點座標差反向補償導圖中心，換階層時根節點不再跳動。',
          '新增 UiEvent 拖曳事件與 4 條心智圖文案鍵。',
        ],
      },
      {
        version: 'v0.5.1',
        date: '心智圖四方向版面配置',
        points: [
          'MindMapNode 新增 direction 欄位，根節點上下左右都能生長，子節點繼承父方向。',
          '連線按子節點方向取四方向邊緣並繪製同構貝茲曲線。',
          '拖曳改為同方向重新排序，置放點用等大虛線圓角佔位框預覽。',
        ],
      },
      {
        version: 'v0.5.0',
        date: '圖片上傳通道',
        points: [
          '單張圖片體積上限 30 MB，超過上限直接拋出 image.tooLarge，不送出請求。',
          '上傳逾時預設 60s；支援 ImageUploadConfig 設定與 ImageUploader 函式兩種通道。',
          'image.tooLarge 文案在 7 種語言中同步。',
        ],
      },
    ],
    next: {
      title: '想直接拿現成畫板？',
      desc: '用 drawui-react 的 CanvasBoard，工具列、縮放、樣式面板和右鍵選單都已經組裝好。',
      link: '查看 drawui-react →',
    },
  },

  react: {
    pageTitle: '開箱即用的 React 畫板元件',
    pageLead:
      '基於 drawui-core 的 React 封裝。引入一個 CanvasBoard，就能得到完整的畫布介面與互動；需要自訂時，再透過 onReady 取得編輯器執行個體。',
    badges: ['v0.6.0', 'React 18 / 19', 'TypeScript', 'MIT'],
    heroActions: { openPlayground: '開啟線上畫板', npm: 'npm 套件' },
    split: {
      title: '元件負責介面，core 負責核心',
      body: 'CanvasBoard 內部已經處理好畫布尺寸、工具列擺放、縮放、樣式面板、小地圖與右鍵選單。你只需要關心三件事：給它什麼資料、它變更時通知誰、以及取得執行個體後想額外做什麼。',
      points: [
        'styles.css 單獨引入，樣式不污染全域',
        'data 變更時由宿主驅動，避免內部狀態成為黑箱',
        '行動裝置與窄容器可用，面板會自動收納',
      ],
    },
    featuresSection: { title: '元件特色' },
    features: [
      {
        title: '一個元件就是一座畫板',
        desc: '工具列、縮放控制項、樣式面板、小地圖、狀態列、右鍵選單一次組裝完成。',
      },
      {
        title: '受控或非受控',
        desc: '傳入 data 時以外部資料初始化並關閉 localStorage；不傳則自動讀寫瀏覽器本機儲存。',
      },
      {
        title: '主題與語言都是 props',
        desc: 'themeColor 改主色，language 在 7 種語言間切換，theme 提供 6 種頁面底色。',
      },
      {
        title: '完全控制權',
        desc: 'onReady 取得 Editor 執行個體後，setShapes、undo、zoom、exportJSON 等 API 都可以直接呼叫。',
      },
      {
        title: '圖片上傳通道',
        desc: 'imageUpload 支援設定物件或上傳函式，串接 OSS、STS 直傳、自建後端都只需一個 prop。',
      },
      {
        title: '依需求拆用',
        desc: 'Toolbar、ZoomControl 單獨匯出，想自行組裝介面時也能只取其中一塊。',
      },
    ],
    quickstartSection: {
      title: '安裝與用法',
      desc: 'drawui-core 會作為依賴自動安裝，不需要單獨宣告。',
    },
    quickstart: {
      callout:
        "樣式需單獨引入 import 'drawui-react/styles.css'。傳入 data 後，畫布不再讀寫 localStorage；不傳則由元件自行持久化。",
    },
    props: {
      title: 'CanvasBoard 屬性',
      tableHead: ['屬性', '型別', '說明'],
      tableRows: [
        ['initialTool', 'ToolType', "初始工具，預設 'select'"],
        ['themeColor', 'string', '主題主色（選取狀態 / 控點 / 強調色），預設 #3b82f6'],
        ['theme', 'PageTheme', "頁面主題（畫布背景 / UI 色調），預設 'light'"],
        [
          'onThemeChange',
          '(theme: PageTheme) => void',
          '頁面主題變更回呼；未提供時由元件內部自行維持狀態',
        ],
        ['language', 'Language', "介面語言，預設 'zh-CN'；支援 7 種語言"],
        ['data', 'Shape[]', '初始圖形；傳入後不再讀寫 localStorage'],
        ['onChange', '(data: EditorData) => void', '圖形或相機變更時回呼'],
        ['onReady', '(editor: Editor) => void', '編輯器執行個體就緒，可取得 Editor 做完全控制'],
        ['imageUpload', 'ImageUploadOption', '圖片上傳通道：設定物件或自訂上傳函式'],
        ['className', 'string', '附加至畫板容器的類別名稱'],
      ],
      exportsTitle: '匯出元件',
      exportsHead: ['元件', '說明'],
      exportsRows: [
        ['CanvasBoard', '主畫布：含工具列、縮放、樣式面板、心智圖面板等'],
        ['Toolbar', '工具列；可單獨使用並自行接管全部回呼'],
        ['ZoomControl', '縮放控制項；onZoomIn / onZoomOut / onReset'],
      ],
    },
    image: {
      title: '圖片上傳',
      channelA: '設定上傳位址',
      channelB: '自訂上傳函式',
      callout:
        '未傳入 imageUpload 時會退回本機暫存 blob，重新整理即失效；若要長期保存，請設定自有上傳通道。',
    },
    changelogSection: { title: '更新記錄', desc: '完整版本記錄請見套件內的 README。' },
    changelog: [
      {
        version: 'v0.5.3',
        date: '繼承 core 的連線與橡皮擦體驗',
        points: [
          '連線繞行、線段控點收斂、橡皮擦漸隱隨 drawui-core 同步生效，CanvasBoard 無需設定。',
          'IMAGE_UPLOAD.md 入口說明改為安裝後在 node_modules/drawui-react/ 下查看。',
        ],
      },
      {
        version: 'v0.5.2',
        date: '心智圖階層入口',
        points: [
          '選取心智圖且存在作用中節點時，底部懸浮樣式列新增第 5 個「階層」按鈕，含升一階 / 升兩階。',
          '拖曳任意圖形時隱藏頂部工具列、底部樣式列與表格工具列，放開後恢復。',
          '依賴 drawui-core 同步升級至 0.5.2。',
        ],
      },
      {
        version: 'v0.5.0',
        date: '圖片上傳通道',
        points: [
          'imageUpload 支援 ImageUploadConfig 與 ImageUploader 函式兩種通道。',
          '單張圖片上限 30 MB，上傳逾時預設 60s；超過上限提示文案涵蓋 7 種語言。',
        ],
      },
      {
        version: 'v0.4.2',
        date: '右鍵選單與群組鎖定',
        points: [
          '新增 ContextMenu：複製、貼上、圖層順序、翻轉、群組、鎖定、刪除，快速鍵與反灰狀態齊全。',
          '接管容器與畫布兩層 contextmenu，工具列與樣式面板上也不再彈出瀏覽器原生選單。',
          '群組即整組鎖定，解鎖後點任一成員即選取整組，畫布會繪製虛線群組框。',
        ],
      },
    ],
    next: {
      title: '先試一下再決定',
      desc: '線上畫板裡預設了流程、心智圖、表格、UML、圖形庫五套場景，按 Esc 可退出。',
      button: '線上體驗 →',
    },
  },
};

export default zhTW;
