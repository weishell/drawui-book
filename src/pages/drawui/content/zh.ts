import type { DocsContent } from './types';

const zh: DocsContent = {
  layout: {
    brandTag: '画板引擎',
    pageContentsLabel: '本页内容',
    npmLabel: 'npm 包',
    navGroups: [
      {
        title: '开始',
        items: [
          { label: '概览', to: '/drawui', end: true },
          { label: '在线体验', to: '/drawui#playground' },
        ],
      },
      {
        title: 'drawui-core',
        items: [
          { label: '核心引擎', to: '/drawui/core' },
          { label: '特性', to: '/drawui/core#features' },
          { label: '快速上手', to: '/drawui/core#quickstart' },
          { label: '核心 API', to: '/drawui/core#api' },
          { label: '图片上传', to: '/drawui/core#image' },
          { label: '更新日志', to: '/drawui/core#changelog' },
        ],
      },
      {
        title: 'drawui-react',
        items: [
          { label: 'React 组件', to: '/drawui/react' },
          { label: '安装与用法', to: '/drawui/react#quickstart' },
          { label: 'CanvasBoard', to: '/drawui/react#props' },
          { label: '图片上传', to: '/drawui/react#image' },
          { label: '更新日志', to: '/drawui/react#changelog' },
        ],
      },
    ],
    anchorsByPath: {
      '/drawui': [
        { label: '它能做什么', hash: 'features' },
        { label: '两个包的关系', hash: 'packages' },
        { label: '能力画廊', hash: 'gallery' },
        { label: '快速开始', hash: 'quickstart' },
        { label: '适用场景', hash: 'scenes' },
      ],
      '/drawui/core': [
        { label: '引擎特性', hash: 'features' },
        { label: '安装与初始化', hash: 'quickstart' },
        { label: '核心 API', hash: 'api' },
        { label: '图片上传', hash: 'image' },
        { label: '更新日志', hash: 'changelog' },
      ],
      '/drawui/react': [
        { label: '组件特性', hash: 'features' },
        { label: '安装与用法', hash: 'quickstart' },
        { label: 'CanvasBoard 属性', hash: 'props' },
        { label: '图片上传', hash: 'image' },
        { label: '更新日志', hash: 'changelog' },
      ],
    },
  },

  playground: {
    title: '在线画板',
    hint: '（{count} 个图形 · 按 Esc 退出）',
    reset: '重置',
    clear: '清空',
    closeAria: '退出画板',
    presetNames: {
      flow: '流程图',
      mindmap: '思维导图',
      table: '表格',
      uml: 'UML 类图',
      sticky: '图形库',
    },
  },

  common: {
    copy: '复制',
    copied: '已复制',
  },

  overview: {
    eyebrow: 'drawui · 框架无关的画布引擎',
    heroTitleLines: ['把一块好用的画布', '装进你的产品'],
    heroLead:
      'drawui-core 提供原生 TypeScript 的绘图内核，drawui-react 把它封装成一个 CanvasBoard。图形、连线、思维导图、表格、UML、导出与多语言，全部开箱即用。',
    badges: ['MIT 协议', 'Canvas 2D', 'TypeScript'],
    heroActions: {
      startReact: '用 drawui-react 开始',
      learnCore: '了解核心引擎',
      openPlayground: '打开在线画板 ↗',
    },
    floatCards: {
      undoTitle: '撤销 / 重做',
      undoDesc: '一个编辑会话 = 一步',
      dragTitle: '拖拽即绘制',
      dragDesc: '按住拖过 5px 随手势缩放',
    },
    stats: [
      { value: '50+', label: '图形类型' },
      { value: '4', label: '连线方式' },
      { value: '7', label: '界面语言' },
      { value: '6', label: '页面主题' },
    ],
    featuresSection: {
      title: '它能做什么',
      desc: '从一图形一笔，到整份可导出的画板文档。下面每一张配图都由 drawui 的真实渲染器生成，不是示意图。',
    },
    features: [
      {
        title: '50+ 图形与 4 种连线',
        desc: '基础图形、流程图符号、立体图形、块箭头一应俱全；直线、折线、直角折线、曲线四种连线自动避让两端图形。',
      },
      {
        title: '思维导图四方向生长',
        desc: '根节点可向上、下、左、右四个方向生长，子节点继承父方向；拖拽换层级、同方向重排序、落点虚线预览。',
      },
      {
        title: '表格就地编辑',
        desc: '8×6 选择器插入表格，飞书式框选单元格，合并 / 拆分、插入 / 删除行列，文字自动换行、行高随内容增高。',
      },
      {
        title: 'UML 类图',
        desc: '类与接口图形内置属性 / 方法分区，连线支持继承、聚合、组合、依赖、实现五种 UML 箭头语义。',
      },
      {
        title: '便签、图标与模板',
        desc: '便签纸、113 个 Twemoji 表情、Lucide 线性图标与模板库；模板选中后整块插入视口中心，即选即用。',
      },
      {
        title: '导出与存档',
        desc: 'PNG / SVG / PDF 一键导出；exportJSON / importJSON 保存完整文档（图形 + 相机 + 版本号），下次接着画。',
      },
    ],
    packagesSection: {
      title: '两个包的关系',
      desc: '中下层是引擎，上层是 React 封装。只装 drawui-react 即可，drawui-core 会自动安装。',
    },
    packages: {
      coreTag: '核心引擎',
      coreDesc:
        '原生 TypeScript，不依赖 React。直接操作 canvas 时用它，适合 Vue、Svelte、Angular 或自有框架。',
      corePoints: [
        'Editor / Camera / Renderer 与工具类全部可单独引用',
        '图形操作、历史记录、快捷键、剪贴板一应俱全',
        'renderToCanvas / renderSVGString 无宿主直接出图',
      ],
      reactTag: '推荐入口',
      reactDesc:
        '把工具栏、缩放、样式面板、小地图与右键菜单全部组装好，传几个 props 就能得到一整块可用画板。',
      reactPoints: [
        'CanvasBoard / Toolbar / ZoomControl 三个组件',
        'themeColor、language、data、onChange、onReady',
        'imageUpload 两种通道，接 OSS 或自建后端',
      ],
    },
    gallerySection: {
      title: '能力画廊',
      desc: '点击上方「打开在线画板」，可以直接在浏览器里试着画一画。',
    },
    gallery: [
      { title: '流程图', desc: '开始 / 判断 / 处理 / 异常分支' },
      { title: '思维导图', desc: '四个方向自由生长' },
      { title: '表格', desc: '行列编辑与单元格合并' },
      { title: 'UML 类图', desc: '类、接口与继承关系' },
      { title: '图形库', desc: '常用流程图与几何图形' },
      { title: '便签', desc: '随手记录，支持旋转与分组' },
    ],
    quickstartSection: { title: '快速开始', desc: '两行命令装好，两段代码跑起来。' },
    quickstart: {
      installTitle: '1. 安装',
      renderTitle: '2. 渲染画板',
      callout:
        '样式必须单独引入 drawui-react/styles.css；不传 data 时画布会读写 localStorage，传入后则以外部数据为准。',
    },
    scenesSection: { title: '适用场景', desc: '一块画布可以出现在很多地方。' },
    scenes: [
      {
        title: 'SaaS 产品内嵌画布',
        desc: '在白板、低代码、流程设计器里直接挂载 CanvasBoard，主题色、语言、初始数据都是普通 props。',
        points: ['受控 / 非受控均可', 'onChange 同步图形与相机', 'imageUpload 接入自有存储'],
      },
      {
        title: '文档与知识库',
        desc: '把画板作为文档里的一个块，图形数据随文档一起保存、导出，读者看到的就是作者画出的样子。',
        points: ['renderToCanvas 生成缩略图', 'SVG 导出与画布同源', 'JSON 存档跨会话恢复'],
      },
      {
        title: '教学与图例演示',
        desc: '用预置图形快速搭出示例图，配合站点主题切换与多语言，适合教程、帮助中心与演示页。',
        points: ['预置 Shape[] 即插即用', '明暗主题与 6 种页面底色', '快捷键与右键菜单开箱可用'],
      },
    ],
    end: {
      title: '准备好画第一笔了吗？',
      desc: '先在线试一下，再决定用 core 还是 react。',
      open: '打开在线画板',
      react: '查看 React 文档',
    },
  },

  core: {
    pageTitle: '框架无关的核心画布引擎',
    pageLead:
      '原生 TypeScript 编写，直接操作 Canvas 2D。你可以只用它的渲染器出图，也可以把它完整嵌进任何框架，拿到图形操作、历史记录、快捷键与导出能力。',
    badges: ['v0.6.0', 'TypeScript', 'Canvas 2D', 'MIT'],
    split: {
      title: '不是一层薄薄的画布，而是一套完整的编辑器内核',
      body: '选择、绘制、连线、编辑、撤销、导出都由 Editor 统一驱动。上层 UI 只负责把按钮和面板摆好，所有状态都以 Shape[] 与 EditorData 的形式对外暴露。',
      points: [
        '纯数据结构，方便持久化、协同与服务端校验',
        '画布渲染与 SVG / PNG 导出共用同一套几何计算',
        '按需引入工具类与几何模块，不强绑 React',
      ],
    },
    featuresSection: { title: '引擎特性' },
    features: [
      {
        title: '框架无关',
        desc: '原生 TypeScript + Canvas 2D，不绑定任何 UI 框架；Vue、Svelte、Angular 或自研框架都能直接用。',
      },
      {
        title: '完整工具链',
        desc: '选择、手型、图形、直线、箭头、手绘、橡皮擦；拖拽绘制、Shift 等比、Esc 取消。',
      },
      {
        title: '编辑能力',
        desc: '撤销重做、复制粘贴、创建副本、层级调整、复制样式、水平 / 垂直翻转、锁定、成组 / 解组。',
      },
      {
        title: '智能连线',
        desc: '四点吸附、自动选边、正交绕行、折点手柄；直线 / 折线 / 直角折线 / 曲线四类连接。',
      },
      {
        title: '专业图形',
        desc: '表格、UML 类图 / 接口、思维导图、流程图符号、立体图形、便签、图标、图片。',
      },
      {
        title: '主题与多语言',
        desc: '6 种页面主题、运行时主题色、7 种界面语言；LANGUAGES 导出便于自建语言切换。',
      },
      {
        title: '导出与存档',
        desc: 'PNG / SVG / PDF，画布与导出同源；exportJSON / importJSON 保存完整文档与相机位置。',
      },
      {
        title: '无宿主渲染',
        desc: 'renderToCanvas / renderSVGString / getContentBounds 可在没有编辑器时生成缩略图与预览。',
      },
    ],
    quickstartSection: {
      title: '安装与初始化',
      desc: '安装后创建 Editor 实例，把图形数据交给它。',
    },
    quickstart: {
      optionsTitle: '构造选项',
      tableHead: ['选项', '类型', '说明'],
      tableRows: [
        ['theme', 'Partial<DrawuiTheme>', '画布与界面颜色，可在运行时通过 setTheme 修改'],
        [
          'language',
          "'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR'",
          '界面语言，默认 zh-CN',
        ],
        ['shapes', 'Shape[]', '初始图形；提供后不再从 localStorage 加载'],
        ['persist', 'boolean', '是否启用 localStorage 持久化，默认 true'],
        ['imageUpload', 'ImageUploadOption', '图片上传通道：配置对象或自定义上传函数'],
      ],
    },
    apiSection: {
      title: '核心 API',
      exportsTitle: '主要导出',
      exportsHead: ['导出', '用途'],
      exportsRows: [
        ['Editor', '编辑器实例：图形、选区、相机、历史、导出、持久化'],
        [
          'SelectTool / HandTool / ShapeTool / LineTool / FreehandTool / ArrowTool',
          '可单独使用或替换的工具类',
        ],
        ['Vec / Mat2d / Camera / Renderer', '几何、相机与渲染基础设施'],
        ['THEME / getTheme / setTheme / subscribeTheme', '主题读取、切换与订阅'],
        ['LANGUAGES / setLanguage / getLanguage / t', '多语言清单、切换与文案函数'],
        ['layoutMindMap / mindMapNodeColor / mindMapNodeSize', '思维导图布局与节点样式'],
        ['renderToCanvas / renderSVGString / getContentBounds', '无宿主出图与内容包围盒'],
        ['Shape / ShapeType / EditorData / ToolType / MindMapNode', '完整类型定义'],
      ],
      methodsTitle: '常用实例方法',
      methodsHead: ['方法', '说明'],
      methodsRows: [
        ['getShapes() / setShapes(shapes)', '读取或整体替换图形，setShapes 会进入历史记录'],
        ['getData()', '拿到图形 + 相机，用于 onChange 回传给宿主'],
        ['subscribe(listener)', '订阅变化，返回取消订阅函数'],
        ['undo() / redo() / canUndo() / canRedo()', '历史记录控制'],
        ['exportImage(format, opts)', '导出 PNG / SVG / PDF，返回 Blob'],
        ['downloadImage(fileName, format, opts)', '导出并触发浏览器下载'],
        ['exportJSON() / importJSON(json)', '完整文档（图形 + 相机 + 版本）存档与恢复'],
        ['zoomIn() / zoomOut() / resetZoom() / panBy()', '视口控制'],
        ['copySelected() / paste() / duplicateSelected()', '剪贴板与副本'],
        ['groupId / locked 相关方法', '成组、锁定、层级、翻转等编辑操作'],
      ],
    },
    image: {
      title: '图片上传',
      desc: '不配置也可以本地临时用；要刷新不丢，就接自有服务器或 OSS。',
      channelA: '通道 A：配置上传地址',
      channelB: '通道 B：自定义上传函数',
      callout:
        '函数通道优先级高于配置。单张图片默认上限 30 MB，超限抛出 image.tooLarge，不会真的发起请求；完整指南见包内 IMAGE_UPLOAD.md。',
    },
    changelogSection: {
      title: '更新日志',
      desc: '最近几个版本的关键变化，完整记录见包内 README。',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: '连线避让 · 手柄收敛 · 橡皮擦渐隐',
        points: [
          '连线不再横穿目标图形：新增绕行骨架，仅在两种单总线骨架仍压线时启用，并复验不穿两端图形。',
          '线段手柄只给折线与直角折线，直线与曲线不再绘制、也不再命中。',
          '橡皮擦命中后 200ms 淡出再删除；撤销 / 重做会中断未完成的渐隐。',
        ],
      },
      {
        version: 'v0.5.2',
        date: '思维导图升降层级 · 拖拽换层级',
        points: [
          '节点升层级：把节点挂到第 levels + 1 代祖先之下，子树整体跟随上移。',
          '拖到另一节点框内部成为子节点，拖到框外侧 48px 内成为同方向兄弟；目标落在自身子树内会被拒绝。',
          '结构变化后按根节点坐标差反向补偿导图中心，换层级时根节点不再跳动。',
          '新增 UiEvent 拖拽事件与 4 条思维导图文案键。',
        ],
      },
      {
        version: 'v0.5.1',
        date: '思维导图四方向布局',
        points: [
          'MindMapNode 新增 direction 字段，根节点上下左右都能生长，子节点继承父方向。',
          '连线按子节点方向取四方向边缘并绘制同构贝塞尔曲线。',
          '拖拽改为同方向重排序，落点用等大虚线圆角占位框预览。',
        ],
      },
      {
        version: 'v0.5.0',
        date: '图片上传通道',
        points: [
          '单张图片体积上限 30 MB，超限直接抛出 image.tooLarge，不发送请求。',
          '上传超时默认 60s；支持 ImageUploadConfig 配置与 ImageUploader 函数两种通道。',
          'image.tooLarge 文案在 7 种语言中同步。',
        ],
      },
    ],
    next: {
      title: '想直接拿现成画板？',
      desc: '用 drawui-react 的 CanvasBoard，工具栏、缩放、样式面板和右键菜单都已经组装好。',
      link: '查看 drawui-react →',
    },
  },

  react: {
    pageTitle: '开箱即用的 React 画板组件',
    pageLead:
      '基于 drawui-core 的 React 封装。引入一个 CanvasBoard，就能得到完整的画布界面与交互；需要定制时，再通过 onReady 拿到编辑器实例。',
    badges: ['v0.6.0', 'React 18 / 19', 'TypeScript', 'MIT'],
    heroActions: { openPlayground: '打开在线画板', npm: 'npm 包' },
    split: {
      title: '组件负责界面，core 负责内核',
      body: 'CanvasBoard 内部已经处理好了画布尺寸、工具栏摆放、缩放、样式面板、小地图与右键菜单。你只需要关心三件事：给它什么数据、它变化时通知谁、以及拿到实例后想额外做什么。',
      points: [
        'styles.css 单独引入，样式不污染全局',
        'data 变更时由宿主驱动，避免内部状态黑盒',
        '移动端与窄容器可用，面板会自动收纳',
      ],
    },
    featuresSection: { title: '组件特性' },
    features: [
      {
        title: '一块组件就是一块画板',
        desc: '工具栏、缩放控件、样式面板、小地图、状态栏、右键菜单一次组装完毕。',
      },
      {
        title: '受控或非受控',
        desc: '传入 data 以外部数据初始化并关闭 localStorage；不传则自动读写浏览器本地存储。',
      },
      {
        title: '主题与语言都是 props',
        desc: 'themeColor 改主色，language 在 7 种语言间切换，theme 提供 6 种页面底色。',
      },
      {
        title: '完全控制权',
        desc: 'onReady 拿到 Editor 实例后，setShapes、undo、zoom、exportJSON 等 API 都可以直接调用。',
      },
      {
        title: '图片上传通道',
        desc: 'imageUpload 支持配置对象或上传函数，接 OSS、STS 直传、自建后端都只需一个 prop。',
      },
      {
        title: '按需拆用',
        desc: 'Toolbar、ZoomControl 单独导出，想自己组装界面时也能只取其中一块。',
      },
    ],
    quickstartSection: {
      title: '安装与用法',
      desc: 'drawui-core 会作为依赖自动安装，不需要单独声明。',
    },
    quickstart: {
      callout:
        "样式需单独引入 import 'drawui-react/styles.css'。传入 data 后，画布不再读写 localStorage；不传则由组件自行持久化。",
    },
    props: {
      title: 'CanvasBoard 属性',
      tableHead: ['属性', '类型', '说明'],
      tableRows: [
        ['initialTool', 'ToolType', "初始工具，默认 'select'"],
        ['themeColor', 'string', '主题主色（选中态 / 手柄 / 强调色），默认 #3b82f6'],
        ['theme', 'PageTheme', "页面主题（画布背景 / UI 色调），默认 'light'"],
        [
          'onThemeChange',
          '(theme: PageTheme) => void',
          '页面主题变化回调；未提供时组件内部自持状态',
        ],
        ['language', 'Language', "界面语言，默认 'zh-CN'；支持 7 种语言"],
        ['data', 'Shape[]', '初始图形；传入后不再读写 localStorage'],
        ['onChange', '(data: EditorData) => void', '图形或相机变化时回调'],
        ['onReady', '(editor: Editor) => void', '编辑器实例就绪，可拿到 Editor 做完全控制'],
        ['imageUpload', 'ImageUploadOption', '图片上传通道：配置对象或自定义上传函数'],
        ['className', 'string', '附加到画板容器上的类名'],
      ],
      exportsTitle: '导出组件',
      exportsHead: ['组件', '说明'],
      exportsRows: [
        ['CanvasBoard', '主画布：含工具栏、缩放、样式面板、思维导图面板等'],
        ['Toolbar', '工具栏；可单独使用并自行接管全部回调'],
        ['ZoomControl', '缩放控件；onZoomIn / onZoomOut / onReset'],
      ],
    },
    image: {
      title: '图片上传',
      channelA: '配置上传地址',
      channelB: '自定义上传函数',
      callout: '不传 imageUpload 时会退回本地临时 blob，刷新即失效；要长期保存请配置自有上传通道。',
    },
    changelogSection: { title: '更新日志', desc: '完整版本记录见包内 README。' },
    changelog: [
      {
        version: 'v0.5.3',
        date: '继承 core 的连线与橡皮擦体验',
        points: [
          '连线绕行、线段手柄收敛、橡皮擦渐隐随 drawui-core 同步生效，CanvasBoard 无需配置。',
          'IMAGE_UPLOAD.md 入口说明改为安装后在 node_modules/drawui-react/ 下查看。',
        ],
      },
      {
        version: 'v0.5.2',
        date: '思维导图层级入口',
        points: [
          '选中思维导图且存在活动节点时，底部悬浮样式条新增第 5 个「层级」按钮，含升一级 / 升两级。',
          '拖拽任意图形时隐藏顶部工具栏、底部样式条与表格工具条，松手恢复。',
          '依赖 drawui-core 同步升级到 0.5.2。',
        ],
      },
      {
        version: 'v0.5.0',
        date: '图片上传通道',
        points: [
          'imageUpload 支持 ImageUploadConfig 与 ImageUploader 函数两种通道。',
          '单张图片上限 30 MB，上传超时默认 60s；超限提示文案覆盖 7 种语言。',
        ],
      },
      {
        version: 'v0.4.2',
        date: '右键菜单与分组锁定',
        points: [
          '新增 ContextMenu：复制、粘贴、层级、翻转、成组、锁定、删除，快捷键与置灰状态齐全。',
          '接管容器与画布两层 contextmenu，工具栏与样式面板上也不再弹出浏览器原生菜单。',
          '成组即整组锁定，解锁后点任一成员选中整组，画布绘制虚线组框。',
        ],
      },
    ],
    next: {
      title: '先试一下再决定',
      desc: '在线画板里预置了流程、思维导图、表格、UML、图形库五套场景，按 Esc 可退出。',
      button: '在线体验 →',
    },
  },
};

export default zh;
