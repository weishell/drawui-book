import type { DocsContent } from './types';

const ko: DocsContent = {
  layout: {
    brandTag: '캔버스 엔진',
    pageContentsLabel: '이 페이지의 내용',
    npmLabel: 'npm 패키지',
    navGroups: [
      {
        title: '시작',
        items: [
          { label: '개요', to: '/drawui', end: true },
          { label: '온라인 체험', to: '/drawui#playground' },
        ],
      },
      {
        title: 'drawui-core',
        items: [
          { label: '핵심 엔진', to: '/drawui/core' },
          { label: '기능', to: '/drawui/core#features' },
          { label: '빠른 시작', to: '/drawui/core#quickstart' },
          { label: '핵심 API', to: '/drawui/core#api' },
          { label: '이미지 업로드', to: '/drawui/core#image' },
          { label: '변경 로그', to: '/drawui/core#changelog' },
        ],
      },
      {
        title: 'drawui-react',
        items: [
          { label: 'React 컴포넌트', to: '/drawui/react' },
          { label: '설치와 사용법', to: '/drawui/react#quickstart' },
          { label: 'CanvasBoard', to: '/drawui/react#props' },
          { label: '이미지 업로드', to: '/drawui/react#image' },
          { label: '변경 로그', to: '/drawui/react#changelog' },
        ],
      },
    ],
    anchorsByPath: {
      '/drawui': [
        { label: '무엇을 할 수 있나요', hash: 'features' },
        { label: '두 패키지의 관계', hash: 'packages' },
        { label: '기능 갤러리', hash: 'gallery' },
        { label: '빠른 시작', hash: 'quickstart' },
        { label: '적용 사례', hash: 'scenes' },
      ],
      '/drawui/core': [
        { label: '엔진 기능', hash: 'features' },
        { label: '설치와 초기화', hash: 'quickstart' },
        { label: '핵심 API', hash: 'api' },
        { label: '이미지 업로드', hash: 'image' },
        { label: '변경 로그', hash: 'changelog' },
      ],
      '/drawui/react': [
        { label: '컴포넌트 기능', hash: 'features' },
        { label: '설치와 사용법', hash: 'quickstart' },
        { label: 'CanvasBoard 속성', hash: 'props' },
        { label: '이미지 업로드', hash: 'image' },
        { label: '변경 로그', hash: 'changelog' },
      ],
    },
  },

  playground: {
    title: '온라인 캔버스',
    hint: '({count}개 도형 · Esc로 나가기)',
    reset: '초기화',
    clear: '지우기',
    closeAria: '캔버스 닫기',
    presetNames: {
      flow: '순서도',
      mindmap: '마인드맵',
      table: '표',
      uml: 'UML 클래스 다이어그램',
      sticky: '도형 라이브러리',
    },
  },

  common: {
    copy: '복사',
    copied: '복사됨',
  },

  overview: {
    eyebrow: 'drawui · 프레임워크 독립 캔버스 엔진',
    heroTitleLines: ['잘 만든 캔버스 한 장을', '제품 안에 넣으세요'],
    heroLead:
      'drawui-core는 네이티브 TypeScript 드로잉 코어를 제공하고, drawui-react가 이를 CanvasBoard로 감쌉니다. 도형, 연결선, 마인드맵, 표, UML, 내보내기와 다국어까지 모두 바로 쓸 수 있습니다.',
    badges: ['MIT 라이선스', 'Canvas 2D', 'TypeScript'],
    heroActions: {
      startReact: 'drawui-react로 시작하기',
      learnCore: '핵심 엔진 알아보기',
      openPlayground: '온라인 캔버스 열기 ↗',
    },
    floatCards: {
      undoTitle: '실행 취소 / 다시 실행',
      undoDesc: '편집 한 번 = 한 단계',
      dragTitle: '끌어서 바로 그리기',
      dragDesc: '5px 이상 끌면 드래그에 맞춰 크기 조절',
    },
    stats: [
      { value: '50+', label: '도형 종류' },
      { value: '4', label: '연결 방식' },
      { value: '7', label: 'UI 언어' },
      { value: '6', label: '페이지 테마' },
    ],
    featuresSection: {
      title: '무엇을 할 수 있나요',
      desc: '도형 하나, 선 하나부터 내보낼 수 있는 완성된 캔버스 문서까지. 아래 이미지는 모두 drawui의 실제 렌더러가 생성한 결과이며, 예시 그림이 아닙니다.',
    },
    features: [
      {
        title: '50+ 도형과 4가지 연결선',
        desc: '기본 도형, 순서도 기호, 입체 도형, 블록 화살표를 모두 갖췄습니다. 직선, 꺾은선, 직각 꺾은선, 곡선 4가지 연결선은 양쪽 도형을 자동으로 피해 그려집니다.',
      },
      {
        title: '마인드맵 4방향 확장',
        desc: '루트 노드는 위, 아래, 왼쪽, 오른쪽 4방향으로 뻗을 수 있고 자식 노드는 부모 방향을 상속합니다. 드래그로 레벨을 바꾸고, 같은 방향에서는 순서를 바꾸며, 드롭 지점은 점선 미리보기로 표시됩니다.',
      },
      {
        title: '표 즉석 편집',
        desc: '8×6 선택기로 표를 삽입하고 Feishu 방식으로 셀을 드래그 선택합니다. 병합 / 분할, 행·열 삽입 / 삭제, 텍스트 자동 줄바꿈, 내용에 따라 늘어나는 행 높이까지 지원합니다.',
      },
      {
        title: 'UML 클래스 다이어그램',
        desc: '클래스와 인터페이스 도형에는 속성 / 메서드 영역이 내장되어 있고, 연결선은 상속, 집합, 조합, 의존, 구현 5가지 UML 화살표 의미를 지원합니다.',
      },
      {
        title: '스티키 노트, 아이콘, 템플릿',
        desc: '스티키 노트, 113개의 Twemoji 이모지, Lucide 라인 아이콘과 템플릿 라이브러리. 템플릿을 고르면 뷰포트 중앙에 통째로 삽입되어 바로 사용할 수 있습니다.',
      },
      {
        title: '내보내기와 보관',
        desc: 'PNG / SVG / PDF를 한 번에 내보냅니다. exportJSON / importJSON으로 전체 문서(도형 + 카메라 + 버전)를 저장하고 다음에 이어서 그릴 수 있습니다.',
      },
    ],
    packagesSection: {
      title: '두 패키지의 관계',
      desc: '중하위 계층은 엔진, 상위 계층은 React 래퍼입니다. drawui-react만 설치하면 drawui-core는 자동으로 설치됩니다.',
    },
    packages: {
      coreTag: '핵심 엔진',
      coreDesc:
        '네이티브 TypeScript로 React에 의존하지 않습니다. canvas를 직접 제어할 때 사용하며, Vue, Svelte, Angular 또는 자체 프레임워크에도 잘 맞습니다.',
      corePoints: [
        'Editor / Camera / Renderer와 유틸 클래스를 모두 개별로 import할 수 있습니다',
        '도형 조작, 히스토리, 단축키, 클립보드까지 모두 제공합니다',
        'renderToCanvas / renderSVGString으로 호스트 없이 바로 이미지를 생성합니다',
      ],
      reactTag: '권장 진입점',
      reactDesc:
        '툴바, 줌, 스타일 패널, 미니맵, 우클릭 메뉴까지 모두 조립되어 있어 props 몇 개만 넘기면 바로 쓸 수 있는 캔버스가 됩니다.',
      reactPoints: [
        'CanvasBoard / Toolbar / ZoomControl 세 가지 컴포넌트',
        'themeColor, language, data, onChange, onReady',
        'imageUpload 두 가지 채널, OSS 또는 자체 백엔드 연동',
      ],
    },
    gallerySection: {
      title: '기능 갤러리',
      desc: '상단의 "온라인 캔버스 열기"를 클릭하면 브라우저에서 바로 그려볼 수 있습니다.',
    },
    gallery: [
      { title: '순서도', desc: '시작 / 판단 / 처리 / 오류 분기' },
      { title: '마인드맵', desc: '4방향 자유 확장' },
      { title: '표', desc: '행·열 편집과 셀 병합' },
      { title: 'UML 클래스 다이어그램', desc: '클래스, 인터페이스와 상속 관계' },
      { title: '도형 라이브러리', desc: '자주 쓰는 순서도와 기하 도형' },
      { title: '스티키 노트', desc: '빠른 메모, 회전과 그룹 지원' },
    ],
    quickstartSection: {
      title: '빠른 시작',
      desc: '명령 두 줄로 설치하고, 코드 두 블록으로 실행합니다.',
    },
    quickstart: {
      installTitle: '1. 설치',
      renderTitle: '2. 캔버스 렌더링',
      callout:
        '스타일은 drawui-react/styles.css를 별도로 import해야 합니다. data를 전달하지 않으면 캔버스가 localStorage를 읽고 쓰며, 전달하면 외부 데이터를 기준으로 동작합니다.',
    },
    scenesSection: { title: '적용 사례', desc: '하나의 캔버스는 여러 곳에 쓰입니다.' },
    scenes: [
      {
        title: 'SaaS 제품에 내장된 캔버스',
        desc: '화이트보드, 로우코드, 워크플로 설계기에 CanvasBoard를 바로 붙일 수 있습니다. 테마 색, 언어, 초기 데이터는 모두 일반적인 props입니다.',
        points: [
          '제어 / 비제어 모두 지원',
          'onChange로 도형과 카메라 동기화',
          'imageUpload로 자체 스토리지 연결',
        ],
      },
      {
        title: '문서와 지식 베이스',
        desc: '캔버스를 문서 안의 한 블록으로 넣고 도형 데이터를 문서와 함께 저장하고 내보냅니다. 독자는 작성자가 그린 그대로 확인할 수 있습니다.',
        points: [
          'renderToCanvas로 썸네일 생성',
          'SVG 내보내기와 캔버스가 동일 소스',
          'JSON 보관으로 세션 간 복원',
        ],
      },
      {
        title: '교육과 다이어그램 시연',
        desc: '프리셋 도형으로 예시 그림을 빠르게 구성하고 사이트 테마 전환과 다국어를 함께 활용합니다. 튜토리얼, 도움말 센터, 데모 페이지에 적합합니다.',
        points: [
          '프리셋 Shape[] 그대로 사용',
          '라이트/다크 테마와 6가지 페이지 배경',
          '단축키와 우클릭 메뉴 기본 제공',
        ],
      },
    ],
    end: {
      title: '첫 번째 선을 그릴 준비되셨나요?',
      desc: '먼저 온라인에서 써 본 뒤 core와 react 중 무엇을 쓸지 결정하세요.',
      open: '온라인 캔버스 열기',
      react: 'React 문서 보기',
    },
  },

  core: {
    pageTitle: '프레임워크 독립 핵심 캔버스 엔진',
    pageLead:
      '네이티브 TypeScript로 작성되어 Canvas 2D를 직접 제어합니다. 렌더러만 떼어 이미지를 만들 수도 있고, 어떤 프레임워크에도 통째로 넣어 도형 조작, 히스토리, 단축키, 내보내기 기능을 모두 얻을 수 있습니다.',
    badges: ['v0.6.0', 'TypeScript', 'Canvas 2D', 'MIT'],
    split: {
      title: '얇은 캔버스 한 겹이 아니라 완성된 에디터 코어',
      body: '선택, 그리기, 연결, 편집, 실행 취소, 내보내기는 모두 Editor가 일괄 처리합니다. 상위 UI는 버튼과 패널을 배치하는 역할만 하며, 모든 상태는 Shape[]와 EditorData 형태로 노출됩니다.',
      points: [
        '순수 데이터 구조로 영속화, 협업, 서버 검증에 유리합니다',
        '캔버스 렌더링과 SVG / PNG 내보내기가 같은 기하 계산을 공유합니다',
        '유틸 클래스와 기하 모듈을 선택적으로 import하며 React에 강제되지 않습니다',
      ],
    },
    featuresSection: { title: '엔진 기능' },
    features: [
      {
        title: '프레임워크 독립',
        desc: '네이티브 TypeScript + Canvas 2D로 어떤 UI 프레임워크에도 종속되지 않습니다. Vue, Svelte, Angular 또는 자체 프레임워크에서 모두 직접 사용할 수 있습니다.',
      },
      {
        title: '완전한 도구 체인',
        desc: '선택, 손 도구, 도형, 직선, 화살표, 자유 곡선, 지우개. 드래그로 그리기, Shift 비율 고정, Esc 취소.',
      },
      {
        title: '편집 기능',
        desc: '실행 취소/다시 실행, 복사/붙여넣기, 복제, 레이어 조정, 스타일 복사, 가로 / 세로 뒤집기, 잠금, 그룹 / 그룹 해제.',
      },
      {
        title: '지능형 연결선',
        desc: '4점 스냅, 자동 변 선택, 직교 우회, 꺾임 핸들. 직선 / 꺾은선 / 직각 꺾은선 / 곡선 4가지 연결.',
      },
      {
        title: '전문 도형',
        desc: '표, UML 클래스 다이어그램 / 인터페이스, 마인드맵, 순서도 기호, 입체 도형, 스티키 노트, 아이콘, 이미지.',
      },
      {
        title: '테마와 다국어',
        desc: '6가지 페이지 테마, 런타임 테마 색, 7가지 UI 언어. LANGUAGES export로 자체 언어 전환을 구현할 수 있습니다.',
      },
      {
        title: '내보내기와 보관',
        desc: 'PNG / SVG / PDF, 캔버스와 내보내기가 동일 소스. exportJSON / importJSON으로 전체 문서와 카메라 위치를 저장합니다.',
      },
      {
        title: '호스트 없는 렌더링',
        desc: 'renderToCanvas / renderSVGString / getContentBounds로 에디터 없이 썸네일과 미리보기를 생성합니다.',
      },
    ],
    quickstartSection: {
      title: '설치와 초기화',
      desc: '설치한 뒤 Editor 인스턴스를 만들고 도형 데이터를 넘깁니다.',
    },
    quickstart: {
      optionsTitle: '생성자 옵션',
      tableHead: ['옵션', '타입', '설명'],
      tableRows: [
        ['theme', 'Partial<DrawuiTheme>', '캔버스와 UI 색상, 런타임에 setTheme로 변경 가능'],
        [
          'language',
          "'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR'",
          'UI 언어, 기본값 zh-CN',
        ],
        ['shapes', 'Shape[]', '초기 도형. 제공하면 localStorage에서 불러오지 않습니다'],
        ['persist', 'boolean', 'localStorage 영속화 사용 여부, 기본값 true'],
        [
          'imageUpload',
          'ImageUploadOption',
          '이미지 업로드 채널: 설정 객체 또는 사용자 정의 업로드 함수',
        ],
      ],
    },
    apiSection: {
      title: '핵심 API',
      exportsTitle: '주요 exports',
      exportsHead: ['Export', '용도'],
      exportsRows: [
        ['Editor', '에디터 인스턴스: 도형, 선택 영역, 카메라, 히스토리, 내보내기, 영속화'],
        [
          'SelectTool / HandTool / ShapeTool / LineTool / FreehandTool / ArrowTool',
          '단독으로 쓰거나 교체할 수 있는 도구 클래스',
        ],
        ['Vec / Mat2d / Camera / Renderer', '기하, 카메라, 렌더링 인프라'],
        ['THEME / getTheme / setTheme / subscribeTheme', '테마 읽기, 전환, 구독'],
        ['LANGUAGES / setLanguage / getLanguage / t', '다국어 목록, 전환, 문구 함수'],
        ['layoutMindMap / mindMapNodeColor / mindMapNodeSize', '마인드맵 레이아웃과 노드 스타일'],
        [
          'renderToCanvas / renderSVGString / getContentBounds',
          '호스트 없는 이미지 생성과 콘텐츠 바운딩 박스',
        ],
        ['Shape / ShapeType / EditorData / ToolType / MindMapNode', '전체 타입 정의'],
      ],
      methodsTitle: '자주 쓰는 인스턴스 메서드',
      methodsHead: ['메서드', '설명'],
      methodsRows: [
        [
          'getShapes() / setShapes(shapes)',
          '도형을 읽거나 전체 교체. setShapes는 히스토리에 기록됩니다',
        ],
        ['getData()', '도형 + 카메라를 가져와 onChange로 호스트에 전달'],
        ['subscribe(listener)', '변경을 구독하고 구독 해제 함수를 반환'],
        ['undo() / redo() / canUndo() / canRedo()', '히스토리 제어'],
        ['exportImage(format, opts)', 'PNG / SVG / PDF 내보내기, Blob 반환'],
        ['downloadImage(fileName, format, opts)', '내보내고 브라우저 다운로드 실행'],
        ['exportJSON() / importJSON(json)', '전체 문서(도형 + 카메라 + 버전) 보관과 복원'],
        ['zoomIn() / zoomOut() / resetZoom() / panBy()', '뷰포트 제어'],
        ['copySelected() / paste() / duplicateSelected()', '클립보드와 복제'],
        ['groupId / locked 관련 메서드', '그룹, 잠금, 레이어, 뒤집기 등 편집 작업'],
      ],
    },
    image: {
      title: '이미지 업로드',
      desc: '설정하지 않아도 로컬에서 임시로 쓸 수 있습니다. 새로고침 후에도 유지하려면 자체 서버나 OSS를 연결하세요.',
      channelA: '채널 A: 업로드 주소 설정',
      channelB: '채널 B: 사용자 정의 업로드 함수',
      callout:
        '함수 채널이 설정 객체보다 우선합니다. 이미지 한 장의 기본 상한은 30 MB이며, 초과하면 image.tooLarge를 던지고 실제 요청을 보내지 않습니다. 자세한 가이드는 패키지 내 IMAGE_UPLOAD.md를 참고하세요.',
    },
    changelogSection: {
      title: '변경 로그',
      desc: '최근 버전의 주요 변경 사항이며, 전체 기록은 패키지 내 README에서 확인할 수 있습니다.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: '연결선 회피 · 핸들 정리 · 지우개 페이드',
        points: [
          '연결선이 대상 도형을 관통하지 않습니다. 우회 스켈레톤을 추가해 두 가지 단일 버스 스켈레톤으로도 겹칠 때만 활성화하며, 양쪽 도형을 관통하지 않는지 다시 검증합니다.',
          '선분 핸들은 꺾은선과 직각 꺾은선에만 제공되며, 직선과 곡선은 그리지도 히트 판정하지도 않습니다.',
          '지우개는 히트 후 200ms 동안 페이드 아웃한 뒤 삭제됩니다. 실행 취소 / 다시 실행은 진행 중인 페이드를 중단합니다.',
        ],
      },
      {
        version: 'v0.5.2',
        date: '마인드맵 레벨 승격/강등 · 드래그로 레벨 변경',
        points: [
          '노드 승격: 노드를 levels + 1대 조상 아래에 붙이고, 서브트리 전체가 함께 올라갑니다.',
          '다른 노드 박스 안에 드롭하면 자식이 되고, 박스 밖 48px 이내에 드롭하면 같은 방향의 형제가 됩니다. 대상이 자기 서브트리 안이면 거부합니다.',
          '구조가 바뀌면 루트 노드 좌표 차이만큼 마인드맵 중앙을 역보정해, 레벨 변경 시 루트가 튀지 않습니다.',
          'UiEvent 드래그 이벤트와 마인드맵 문구 키 4개를 추가했습니다.',
        ],
      },
      {
        version: 'v0.5.1',
        date: '마인드맵 4방향 레이아웃',
        points: [
          'MindMapNode에 direction 필드를 추가해 루트 노드가 상하좌우 어디로든 뻗을 수 있고, 자식 노드는 부모 방향을 상속합니다.',
          '연결선은 자식 노드 방향에 따라 4방향 가장자리를 선택하고 동형 베지어 곡선을 그립니다.',
          '드래그는 같은 방향 재정렬로 바뀌었고, 드롭 지점은 같은 크기의 점선 둥근 사각형으로 미리보기합니다.',
        ],
      },
      {
        version: 'v0.5.0',
        date: '이미지 업로드 채널',
        points: [
          '이미지 한 장의 크기 상한은 30 MB이며, 초과하면 요청을 보내지 않고 image.tooLarge를 던집니다.',
          '업로드 타임아웃 기본값은 60s이며, ImageUploadConfig 설정과 ImageUploader 함수 두 채널을 지원합니다.',
          'image.tooLarge 문구가 7개 언어에 동기화되었습니다.',
        ],
      },
    ],
    next: {
      title: '바로 쓸 수 있는 캔버스가 필요하신가요?',
      desc: 'drawui-react의 CanvasBoard를 쓰면 툴바, 줌, 스타일 패널, 우클릭 메뉴가 이미 조립되어 있습니다.',
      link: 'drawui-react 살펴보기 →',
    },
  },

  react: {
    pageTitle: '바로 쓰는 React 캔버스 컴포넌트',
    pageLead:
      'drawui-core 기반의 React 래퍼입니다. CanvasBoard 하나만 import하면 완성된 캔버스 UI와 상호작용을 얻고, 커스터마이징이 필요하면 onReady로 에디터 인스턴스를 받아 사용합니다.',
    badges: ['v0.6.0', 'React 18 / 19', 'TypeScript', 'MIT'],
    heroActions: { openPlayground: '온라인 캔버스 열기', npm: 'npm 패키지' },
    split: {
      title: '컴포넌트는 UI, core는 코어',
      body: 'CanvasBoard 내부에서 캔버스 크기, 툴바 배치, 줌, 스타일 패널, 미니맵, 우클릭 메뉴를 이미 처리합니다. 신경 쓸 것은 세 가지입니다. 어떤 데이터를 줄지, 변경 시 누구에게 알릴지, 인스턴스를 받은 뒤 무엇을 더 할지.',
      points: [
        'styles.css를 별도로 import해 전역 스타일을 오염시키지 않습니다',
        'data 변경은 호스트가 주도해 내부 상태 블랙박스를 피합니다',
        '모바일과 좁은 컨테이너에서도 쓸 수 있으며 패널이 자동으로 접힙니다',
      ],
    },
    featuresSection: { title: '컴포넌트 기능' },
    features: [
      {
        title: '컴포넌트 하나가 캔버스 하나',
        desc: '툴바, 줌 컨트롤, 스타일 패널, 미니맵, 상태 바, 우클릭 메뉴가 한 번에 조립됩니다.',
      },
      {
        title: '제어 또는 비제어',
        desc: 'data를 전달하면 외부 데이터로 초기화하고 localStorage를 끕니다. 전달하지 않으면 브라우저 로컬 스토리지를 자동으로 읽고 씁니다.',
      },
      {
        title: '테마와 언어도 props',
        desc: 'themeColor로 주 색을 바꾸고, language로 7가지 언어를 전환하며, theme은 6가지 페이지 배경을 제공합니다.',
      },
      {
        title: '완전한 제어권',
        desc: 'onReady로 Editor 인스턴스를 받으면 setShapes, undo, zoom, exportJSON 등의 API를 직접 호출할 수 있습니다.',
      },
      {
        title: '이미지 업로드 채널',
        desc: 'imageUpload는 설정 객체 또는 업로드 함수를 지원하며, OSS, STS 직접 업로드, 자체 백엔드 모두 prop 하나로 연결됩니다.',
      },
      {
        title: '선택적 분리 사용',
        desc: 'Toolbar, ZoomControl을 단독 export해 UI를 직접 조립할 때 필요한 부분만 가져갈 수 있습니다.',
      },
    ],
    quickstartSection: {
      title: '설치와 사용법',
      desc: 'drawui-core는 의존성으로 자동 설치되며 별도 선언이 필요 없습니다.',
    },
    quickstart: {
      callout:
        "스타일은 import 'drawui-react/styles.css'로 별도 import해야 합니다. data를 전달하면 캔버스가 localStorage를 읽고 쓰지 않으며, 전달하지 않으면 컴포넌트가 자체적으로 영속화합니다.",
    },
    props: {
      title: 'CanvasBoard 속성',
      tableHead: ['속성', '타입', '설명'],
      tableRows: [
        ['initialTool', 'ToolType', "초기 도구, 기본값 'select'"],
        ['themeColor', 'string', '테마 주 색(선택 상태 / 핸들 / 강조 색), 기본값 #3b82f6'],
        ['theme', 'PageTheme', "페이지 테마(캔버스 배경 / UI 색조), 기본값 'light'"],
        [
          'onThemeChange',
          '(theme: PageTheme) => void',
          '페이지 테마 변경 콜백. 제공하지 않으면 컴포넌트가 내부에서 상태를 유지합니다',
        ],
        ['language', 'Language', "UI 언어, 기본값 'zh-CN'. 7가지 언어 지원"],
        ['data', 'Shape[]', '초기 도형. 전달하면 localStorage를 읽고 쓰지 않습니다'],
        ['onChange', '(data: EditorData) => void', '도형 또는 카메라 변경 시 콜백'],
        [
          'onReady',
          '(editor: Editor) => void',
          '에디터 인스턴스 준비 완료, Editor를 받아 완전히 제어 가능',
        ],
        [
          'imageUpload',
          'ImageUploadOption',
          '이미지 업로드 채널: 설정 객체 또는 사용자 정의 업로드 함수',
        ],
        ['className', 'string', '캔버스 컨테이너에 추가할 클래스명'],
      ],
      exportsTitle: '내보내는 컴포넌트',
      exportsHead: ['컴포넌트', '설명'],
      exportsRows: [
        ['CanvasBoard', '메인 캔버스: 툴바, 줌, 스타일 패널, 마인드맵 패널 등 포함'],
        ['Toolbar', '툴바. 단독 사용하고 모든 콜백을 직접 처리할 수 있습니다'],
        ['ZoomControl', '줌 컨트롤. onZoomIn / onZoomOut / onReset'],
      ],
    },
    image: {
      title: '이미지 업로드',
      channelA: '업로드 주소 설정',
      channelB: '사용자 정의 업로드 함수',
      callout:
        'imageUpload를 전달하지 않으면 로컬 임시 blob으로 대체되어 새로고침 시 사라집니다. 장기 보관이 필요하면 자체 업로드 채널을 설정하세요.',
    },
    changelogSection: {
      title: '변경 로그',
      desc: '전체 버전 기록은 패키지 내 README에서 확인할 수 있습니다.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: 'core의 연결선과 지우개 경험 상속',
        points: [
          '연결선 우회, 선분 핸들 정리, 지우개 페이드가 drawui-core와 동기화되어 CanvasBoard에서 설정 없이 적용됩니다.',
          'IMAGE_UPLOAD.md 안내를 설치 후 node_modules/drawui-react/에서 확인하는 방식으로 변경했습니다.',
        ],
      },
      {
        version: 'v0.5.2',
        date: '마인드맵 레벨 진입점',
        points: [
          '마인드맵을 선택하고 활성 노드가 있을 때 하단 플로팅 스타일 바에 5번째 "레벨" 버튼이 추가되며, 1단계 / 2단계 승격을 포함합니다.',
          '도형을 드래그할 때 상단 툴바, 하단 스타일 바, 표 툴바를 숨기고 손을 떼면 복원합니다.',
          'drawui-core 의존성을 0.5.2로 동기화했습니다.',
        ],
      },
      {
        version: 'v0.5.0',
        date: '이미지 업로드 채널',
        points: [
          'imageUpload는 ImageUploadConfig와 ImageUploader 함수 두 채널을 지원합니다.',
          '이미지 한 장 상한은 30 MB, 업로드 타임아웃 기본값은 60s이며, 초과 안내 문구가 7개 언어를 지원합니다.',
        ],
      },
      {
        version: 'v0.4.2',
        date: '우클릭 메뉴와 그룹 잠금',
        points: [
          'ContextMenu 추가: 복사, 붙여넣기, 레이어, 뒤집기, 그룹, 잠금, 삭제와 단축키, 비활성 상태까지 갖췄습니다.',
          '컨테이너와 캔버스 두 계층의 contextmenu를 처리하며, 툴바와 스타일 패널에서도 브라우저 기본 메뉴가 뜨지 않습니다.',
          '그룹하면 전체가 잠기고, 잠금 해제 후 어느 멤버를 클릭해도 그룹 전체가 선택되며 캔버스에 점선 그룹 박스를 그립니다.',
        ],
      },
    ],
    next: {
      title: '먼저 써 보고 결정하세요',
      desc: '온라인 캔버스에는 순서도, 마인드맵, 표, UML, 도형 라이브러리 5가지 시나리오가 준비되어 있으며 Esc로 나갈 수 있습니다.',
      button: '온라인 체험 →',
    },
  },
};

export default ko;
