import type { DocsContent } from './types';

const ja: DocsContent = {
  layout: {
    brandTag: 'キャンバスエンジン',
    pageContentsLabel: 'このページの内容',
    npmLabel: 'npm パッケージ',
    navGroups: [
      {
        title: 'はじめに',
        items: [
          { label: '概要', to: '/drawui', end: true },
          { label: 'オンラインで試す', to: '/drawui#playground' },
        ],
      },
      {
        title: 'drawui-core',
        items: [
          { label: 'コアエンジン', to: '/drawui/core' },
          { label: '特徴', to: '/drawui/core#features' },
          { label: 'クイックスタート', to: '/drawui/core#quickstart' },
          { label: 'コア API', to: '/drawui/core#api' },
          { label: '画像アップロード', to: '/drawui/core#image' },
          { label: '更新履歴', to: '/drawui/core#changelog' },
        ],
      },
      {
        title: 'drawui-react',
        items: [
          { label: 'React コンポーネント', to: '/drawui/react' },
          { label: 'インストールと使い方', to: '/drawui/react#quickstart' },
          { label: 'CanvasBoard', to: '/drawui/react#props' },
          { label: '画像アップロード', to: '/drawui/react#image' },
          { label: '更新履歴', to: '/drawui/react#changelog' },
        ],
      },
    ],
    anchorsByPath: {
      '/drawui': [
        { label: 'できること', hash: 'features' },
        { label: '2 つのパッケージの関係', hash: 'packages' },
        { label: '機能ギャラリー', hash: 'gallery' },
        { label: 'クイックスタート', hash: 'quickstart' },
        { label: 'ユースケース', hash: 'scenes' },
      ],
      '/drawui/core': [
        { label: 'エンジンの特徴', hash: 'features' },
        { label: 'インストールと初期化', hash: 'quickstart' },
        { label: 'コア API', hash: 'api' },
        { label: '画像アップロード', hash: 'image' },
        { label: '更新履歴', hash: 'changelog' },
      ],
      '/drawui/react': [
        { label: 'コンポーネントの特徴', hash: 'features' },
        { label: 'インストールと使い方', hash: 'quickstart' },
        { label: 'CanvasBoard のプロパティ', hash: 'props' },
        { label: '画像アップロード', hash: 'image' },
        { label: '更新履歴', hash: 'changelog' },
      ],
    },
  },

  playground: {
    title: 'オンラインボード',
    hint: '（図形 {count} 個 · Esc で終了）',
    reset: 'リセット',
    clear: 'クリア',
    closeAria: 'ボードを終了',
    presetNames: {
      flow: 'フローチャート',
      mindmap: 'マインドマップ',
      table: '表',
      uml: 'UML クラス図',
      sticky: '図形ライブラリ',
    },
  },

  common: {
    copy: 'コピー',
    copied: 'コピーしました',
  },

  overview: {
    eyebrow: 'drawui · フレームワーク非依存のキャンバスエンジン',
    heroTitleLines: ['使い心地のよいキャンバスを', 'プロダクトに組み込む'],
    heroLead:
      'drawui-core はネイティブ TypeScript の描画コアを提供し、drawui-react はそれを 1 つの CanvasBoard としてまとめます。図形、接続線、マインドマップ、表、UML、エクスポート、多言語対応まで、すべてすぐに使えます。',
    badges: ['MIT ライセンス', 'Canvas 2D', 'TypeScript'],
    heroActions: {
      startReact: 'drawui-react で始める',
      learnCore: 'コアエンジンを見る',
      openPlayground: 'オンラインボードを開く ↗',
    },
    floatCards: {
      undoTitle: '元に戻す / やり直し',
      undoDesc: '1 回の編集セッション = 1 ステップ',
      dragTitle: 'ドラッグで描画',
      dragDesc: '5px 以上ドラッグするとジェスチャーに合わせて拡大縮小',
    },
    stats: [
      { value: '50+', label: '図形の種類' },
      { value: '4', label: '接続線の方式' },
      { value: '7', label: 'UI 言語' },
      { value: '6', label: 'ページテーマ' },
    ],
    featuresSection: {
      title: 'できること',
      desc: '1 つの図形から 1 本の線まで、エクスポートできるボード文書全体まで。以下の図はすべて drawui の実際のレンダラーが生成したもので、イメージ図ではありません。',
    },
    features: [
      {
        title: '50+ の図形と 4 種類の接続線',
        desc: '基本図形、フローチャート記号、立体図形、ブロック矢印を網羅。直線・折れ線・直角折れ線・曲線の 4 種類の接続線は、両端の図形を自動で避けます。',
      },
      {
        title: 'マインドマップは 4 方向に伸長',
        desc: 'ルートノードは上・下・左・右の 4 方向に伸び、子ノードは親の方向を継承します。ドラッグで階層を変更、同方向内で並び替え、ドロップ位置は破線でプレビューされます。',
      },
      {
        title: '表のインライン編集',
        desc: '8×6 のセレクターで表を挿入。Feishu 風のセル範囲選択、結合 / 分割、行・列の挿入 / 削除に対応し、テキストは自動で折り返され、行の高さは内容に応じて広がります。',
      },
      {
        title: 'UML クラス図',
        desc: 'クラスとインターフェースの図形には属性 / メソッドの区画が組み込まれ、接続線は継承・集約・コンポジション・依存・実現の 5 種類の UML 矢印を表現できます。',
      },
      {
        title: '付箋・アイコン・テンプレート',
        desc: '付箋、113 個の Twemoji、Lucide のラインアイコン、テンプレートライブラリ。テンプレートは選択するとビューポート中央にまとめて挿入され、すぐに使えます。',
      },
      {
        title: 'エクスポートと保存',
        desc: 'PNG / SVG / PDF をワンクリックで書き出し。exportJSON / importJSON で完全なドキュメント（図形 + カメラ + バージョン）を保存し、次回に続きを描けます。',
      },
    ],
    packagesSection: {
      title: '2 つのパッケージの関係',
      desc: '下層がエンジン、上層が React ラッパーです。drawui-react だけをインストールすれば、drawui-core は自動的にインストールされます。',
    },
    packages: {
      coreTag: 'コアエンジン',
      coreDesc:
        'ネイティブ TypeScript で、React に依存しません。canvas を直接操作する場合に使い、Vue、Svelte、Angular、独自フレームワークにも適しています。',
      corePoints: [
        'Editor / Camera / Renderer とユーティリティをすべて個別にインポート可能',
        '図形操作、履歴、ショートカット、クリップボードを完備',
        'renderToCanvas / renderSVGString でホストなしでも描画',
      ],
      reactTag: '推奨エントリー',
      reactDesc:
        'ツールバー、ズーム、スタイルパネル、ミニマップ、コンテキストメニューをすべて組み立て済み。いくつかの props を渡すだけで、すぐ使えるボードが手に入ります。',
      reactPoints: [
        'CanvasBoard / Toolbar / ZoomControl の 3 コンポーネント',
        'themeColor、language、data、onChange、onReady',
        'imageUpload の 2 つの経路で、OSS や自前のバックエンドに接続',
      ],
    },
    gallerySection: {
      title: '機能ギャラリー',
      desc: '上の「オンラインボードを開く」をクリックすると、ブラウザ上ですぐに描いて試せます。',
    },
    gallery: [
      { title: 'フローチャート', desc: '開始 / 判断 / 処理 / 異常分岐' },
      { title: 'マインドマップ', desc: '4 方向へ自由に伸長' },
      { title: '表', desc: '行・列の編集とセル結合' },
      { title: 'UML クラス図', desc: 'クラス、インターフェースと継承関係' },
      { title: '図形ライブラリ', desc: 'よく使うフローチャート記号と幾何図形' },
      { title: '付箋', desc: 'メモに最適。回転とグループ化に対応' },
    ],
    quickstartSection: {
      title: 'クイックスタート',
      desc: '2 つのコマンドでインストール、2 つのコードで動きます。',
    },
    quickstart: {
      installTitle: '1. インストール',
      renderTitle: '2. ボードを描画',
      callout:
        'スタイルは drawui-react/styles.css を別途インポートする必要があります。data を渡さない場合、キャンバスは localStorage を読み書きし、渡した場合は外部データが優先されます。',
    },
    scenesSection: { title: 'ユースケース', desc: 'キャンバスはさまざまな場所で活用できます。' },
    scenes: [
      {
        title: 'SaaS プロダクトへのキャンバス組み込み',
        desc: 'ホワイトボード、ローコード、フロー設計ツールに CanvasBoard をそのまま組み込みます。テーマカラー、言語、初期データはすべて通常の props です。',
        points: [
          '制御 / 非制御のどちらでも可',
          'onChange で図形とカメラを同期',
          'imageUpload で自前のストレージに接続',
        ],
      },
      {
        title: 'ドキュメントとナレッジベース',
        desc: 'ボードをドキュメント内の 1 ブロックとして扱い、図形データはドキュメントと一緒に保存・エクスポートされます。読む人は作者が描いたとおりの見た目を得られます。',
        points: [
          'renderToCanvas でサムネイルを生成',
          'SVG エクスポートはキャンバスと同じ描画系',
          'JSON 保存でセッションをまたいで復元',
        ],
      },
      {
        title: '教育・図例デモ',
        desc: 'プリセット図形でサンプル図をすばやく組み立て、サイトのテーマ切り替えや多言語と組み合わせることで、チュートリアル、ヘルプセンター、デモページに適しています。',
        points: [
          'プリセットの Shape[] をそのまま利用',
          'ライト / ダークテーマと 6 種類のページ背景色',
          'ショートカットとコンテキストメニューを標準装備',
        ],
      },
    ],
    end: {
      title: '最初の一筆を描く準備はできましたか？',
      desc: 'まずオンラインで試してから、core と react のどちらを使うか決めましょう。',
      open: 'オンラインボードを開く',
      react: 'React ドキュメントを見る',
    },
  },

  core: {
    pageTitle: 'フレームワーク非依存のコアキャンバスエンジン',
    pageLead:
      'ネイティブ TypeScript で実装され、Canvas 2D を直接操作します。レンダラーだけを使って画像を生成することも、あらゆるフレームワークに丸ごと組み込んで図形操作、履歴、ショートカット、エクスポートの機能を利用することもできます。',
    badges: ['v0.6.0', 'TypeScript', 'Canvas 2D', 'MIT'],
    split: {
      title: '薄いキャンバスラッパーではなく、完全なエディターコア',
      body: '選択、描画、接続線、編集、元に戻す、エクスポートはすべて Editor が一元的に駆動します。上位の UI はボタンとパネルを配置するだけで、すべての状態は Shape[] と EditorData の形で外部に公開されます。',
      points: [
        '純粋なデータ構造で、永続化・共同編集・サーバー側検証が容易',
        'キャンバス描画と SVG / PNG エクスポートが同じジオメトリ計算を共有',
        'ユーティリティとジオメトリモジュールを必要な分だけインポートでき、React に縛られない',
      ],
    },
    featuresSection: { title: 'エンジンの特徴' },
    features: [
      {
        title: 'フレームワーク非依存',
        desc: 'ネイティブ TypeScript + Canvas 2D で、特定の UI フレームワークに依存しません。Vue、Svelte、Angular、独自フレームワークでもそのまま使えます。',
      },
      {
        title: '充実したツール群',
        desc: '選択、ハンド、図形、直線、矢印、フリーハンド、消しゴム。ドラッグ描画、Shift で等比、Esc でキャンセル。',
      },
      {
        title: '編集機能',
        desc: '元に戻す / やり直し、コピー & ペースト、複製、重ね順の変更、スタイルのコピー、水平 / 垂直反転、ロック、グループ化 / 解除。',
      },
      {
        title: 'スマート接続線',
        desc: '4 点スナップ、辺の自動選択、直交ルーティング、折れ点ハンドル。直線 / 折れ線 / 直角折れ線 / 曲線の 4 種類の接続線。',
      },
      {
        title: '専門的な図形',
        desc: '表、UML クラス図 / インターフェース、マインドマップ、フローチャート記号、立体図形、付箋、アイコン、画像。',
      },
      {
        title: 'テーマと多言語',
        desc: '6 種類のページテーマ、実行時のテーマカラー、7 種類の UI 言語。LANGUAGES をエクスポートできるため、独自の言語切り替えも簡単です。',
      },
      {
        title: 'エクスポートと保存',
        desc: 'PNG / SVG / PDF。キャンバスとエクスポートは同じ描画系を使用。exportJSON / importJSON で完全なドキュメントとカメラ位置を保存します。',
      },
      {
        title: 'ホスト不要のレンダリング',
        desc: 'renderToCanvas / renderSVGString / getContentBounds は、エディターなしでサムネイルやプレビューを生成できます。',
      },
    ],
    quickstartSection: {
      title: 'インストールと初期化',
      desc: 'インストール後に Editor インスタンスを作成し、図形データを渡します。',
    },
    quickstart: {
      optionsTitle: 'コンストラクタオプション',
      tableHead: ['オプション', '型', '説明'],
      tableRows: [
        [
          'theme',
          'Partial<DrawuiTheme>',
          'キャンバスと UI の配色。実行時に setTheme で変更できます',
        ],
        [
          'language',
          "'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR'",
          'UI 言語。デフォルトは zh-CN',
        ],
        ['shapes', 'Shape[]', '初期図形。指定した場合は localStorage から読み込みません'],
        ['persist', 'boolean', 'localStorage 永続化を有効にするか。デフォルトは true'],
        [
          'imageUpload',
          'ImageUploadOption',
          '画像アップロードの経路：設定オブジェクトまたは独自のアップロード関数',
        ],
      ],
    },
    apiSection: {
      title: 'コア API',
      exportsTitle: '主なエクスポート',
      exportsHead: ['エクスポート', '用途'],
      exportsRows: [
        ['Editor', 'エディターインスタンス：図形、選択範囲、カメラ、履歴、エクスポート、永続化'],
        [
          'SelectTool / HandTool / ShapeTool / LineTool / FreehandTool / ArrowTool',
          '単独で使用または差し替え可能なツールクラス',
        ],
        ['Vec / Mat2d / Camera / Renderer', 'ジオメトリ、カメラ、レンダリングの基盤'],
        ['THEME / getTheme / setTheme / subscribeTheme', 'テーマの取得、切り替え、購読'],
        ['LANGUAGES / setLanguage / getLanguage / t', '多言語リスト、切り替え、文言関数'],
        [
          'layoutMindMap / mindMapNodeColor / mindMapNodeSize',
          'マインドマップのレイアウトとノードスタイル',
        ],
        [
          'renderToCanvas / renderSVGString / getContentBounds',
          'ホスト不要の描画とコンテンツのバウンディングボックス',
        ],
        ['Shape / ShapeType / EditorData / ToolType / MindMapNode', '完全な型定義'],
      ],
      methodsTitle: 'よく使うインスタンスメソッド',
      methodsHead: ['メソッド', '説明'],
      methodsRows: [
        [
          'getShapes() / setShapes(shapes)',
          '図形の読み取り、または一括置換。setShapes は履歴に記録されます',
        ],
        ['getData()', '図形 + カメラを取得し、onChange でホストに返すのに使用'],
        ['subscribe(listener)', '変更を購読し、解除関数を返します'],
        ['undo() / redo() / canUndo() / canRedo()', '履歴の制御'],
        ['exportImage(format, opts)', 'PNG / SVG / PDF をエクスポートし、Blob を返します'],
        ['downloadImage(fileName, format, opts)', 'エクスポートしてブラウザのダウンロードを実行'],
        [
          'exportJSON() / importJSON(json)',
          '完全なドキュメント（図形 + カメラ + バージョン）の保存と復元',
        ],
        ['zoomIn() / zoomOut() / resetZoom() / panBy()', 'ビューポートの制御'],
        ['copySelected() / paste() / duplicateSelected()', 'クリップボードと複製'],
        ['groupId / locked 関連メソッド', 'グループ化、ロック、重ね順、反転などの編集操作'],
      ],
    },
    image: {
      title: '画像アップロード',
      desc: '設定しなくてもローカルで一時的に使えます。リロード後も残したい場合は、自前のサーバーや OSS に接続してください。',
      channelA: '経路 A：アップロード URL を設定',
      channelB: '経路 B：独自のアップロード関数',
      callout:
        '関数による経路は設定オブジェクトより優先されます。1 枚あたりの上限はデフォルトで 30 MB で、超過すると image.tooLarge が発生し、実際のリクエストは送信されません。詳細なガイドはパッケージ内の IMAGE_UPLOAD.md を参照してください。',
    },
    changelogSection: {
      title: '更新履歴',
      desc: '直近のバージョンの主な変更点です。完全な記録はパッケージ内の README を参照してください。',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: '接続線の回避 · ハンドルの整理 · 消しゴムのフェード',
        points: [
          '接続線が対象の図形を横切らなくなりました。回避スケルトンを追加し、2 種類の単一バススケルトンでも線が重なる場合にのみ有効化し、両端の図形を貫通しないことを再検証します。',
          '線分ハンドルは折れ線と直角折れ線のみに表示。直線と曲線では描画もヒット判定も行いません。',
          '消しゴムが当たった図形は 200ms かけてフェードアウトしてから削除されます。元に戻す / やり直しは未完了のフェードを中断します。',
        ],
      },
      {
        version: 'v0.5.2',
        date: 'マインドマップの階層昇降 · ドラッグで階層変更',
        points: [
          'ノードの階層を上げる：ノードを levels + 1 代目の祖先の下にぶら下げ、サブツリー全体が一緒に上へ移動します。',
          '別のノードの枠内にドラッグすると子ノードになり、枠の外側 48px 以内にドラッグすると同方向の兄弟になります。自身のサブツリー内にドロップした場合は拒否されます。',
          '構造変更後はルートノードの座標差に応じてマップ中心を逆補正し、階層変更時にルートノードが跳ねなくなります。',
          'UiEvent のドラッグイベントと 4 つのマインドマップ文言キーを追加。',
        ],
      },
      {
        version: 'v0.5.1',
        date: 'マインドマップの 4 方向レイアウト',
        points: [
          'MindMapNode に direction フィールドを追加し、ルートノードは上下左右に伸長でき、子ノードは親の方向を継承します。',
          '接続線は子ノードの方向に応じて 4 方向の辺を選び、同型のベジェ曲線を描画します。',
          'ドラッグは同方向内の並び替えに変更し、ドロップ位置は同じサイズの破線角丸プレースホルダーでプレビューします。',
        ],
      },
      {
        version: 'v0.5.0',
        date: '画像アップロード経路',
        points: [
          '1 枚あたりの上限は 30 MB で、超過すると image.tooLarge を即座に発生させ、リクエストは送信しません。',
          'アップロードのタイムアウトはデフォルト 60s。ImageUploadConfig による設定と ImageUploader 関数の 2 種類の経路をサポートします。',
          'image.tooLarge の文言は 7 言語で同期されています。',
        ],
      },
    ],
    next: {
      title: 'すぐに使えるボードが欲しいですか？',
      desc: 'drawui-react の CanvasBoard なら、ツールバー、ズーム、スタイルパネル、コンテキストメニューがすでに組み立て済みです。',
      link: 'drawui-react を見る →',
    },
  },

  react: {
    pageTitle: 'すぐに使える React ボードコンポーネント',
    pageLead:
      'drawui-core ベースの React ラッパーです。CanvasBoard を 1 つインポートするだけで、完全なキャンバス UI とインタラクションが手に入ります。カスタマイズが必要なときは、onReady でエディターインスタンスを取得できます。',
    badges: ['v0.6.0', 'React 18 / 19', 'TypeScript', 'MIT'],
    heroActions: { openPlayground: 'オンラインボードを開く', npm: 'npm パッケージ' },
    split: {
      title: 'コンポーネントが UI、core がコアを担当',
      body: 'CanvasBoard の内部では、キャンバスのサイズ、ツールバーの配置、ズーム、スタイルパネル、ミニマップ、コンテキストメニューがすでに処理されています。意識するのは 3 つだけです。どんなデータを渡すか、変化したときに誰に通知するか、インスタンスを取得して何を追加したいか。',
      points: [
        'styles.css は別途インポートし、スタイルはグローバルを汚染しない',
        'data の変更はホストが駆動し、内部状態のブラックボックスを避ける',
        'モバイルや狭いコンテナでも使え、パネルは自動で収納される',
      ],
    },
    featuresSection: { title: 'コンポーネントの特徴' },
    features: [
      {
        title: '1 つのコンポーネントが 1 つのボード',
        desc: 'ツールバー、ズームコントロール、スタイルパネル、ミニマップ、ステータスバー、コンテキストメニューを一度に組み立て済み。',
      },
      {
        title: '制御 / 非制御',
        desc: 'data を渡すと外部データで初期化し localStorage を無効化します。渡さない場合はブラウザのローカルストレージを自動で読み書きします。',
      },
      {
        title: 'テーマも言語も props',
        desc: 'themeColor でメインカラーを変更、language で 7 言語を切り替え、theme で 6 種類のページ背景色を指定できます。',
      },
      {
        title: '完全な制御',
        desc: 'onReady で Editor インスタンスを取得すれば、setShapes、undo、zoom、exportJSON などの API を直接呼び出せます。',
      },
      {
        title: '画像アップロード経路',
        desc: 'imageUpload は設定オブジェクトまたはアップロード関数に対応。OSS、STS 直接アップロード、自前のバックエンドも 1 つの prop で接続できます。',
      },
      {
        title: '必要な分だけ分割利用',
        desc: 'Toolbar、ZoomControl は個別にエクスポートされ、独自に UI を組み立てたいときにも 1 つだけ使えます。',
      },
    ],
    quickstartSection: {
      title: 'インストールと使い方',
      desc: 'drawui-core は依存関係として自動的にインストールされるため、個別に指定する必要はありません。',
    },
    quickstart: {
      callout:
        "スタイルは import 'drawui-react/styles.css' を別途インポートする必要があります。data を渡すとキャンバスは localStorage を読み書きしません。渡さない場合はコンポーネント自身が永続化します。",
    },
    props: {
      title: 'CanvasBoard のプロパティ',
      tableHead: ['プロパティ', '型', '説明'],
      tableRows: [
        ['initialTool', 'ToolType', "初期ツール。デフォルトは 'select'"],
        [
          'themeColor',
          'string',
          'テーマのメインカラー（選択状態 / ハンドル / アクセント）。デフォルトは #3b82f6',
        ],
        ['theme', 'PageTheme', "ページテーマ（キャンバス背景 / UI の色調）。デフォルトは 'light'"],
        [
          'onThemeChange',
          '(theme: PageTheme) => void',
          'ページテーマ変更のコールバック。指定しない場合はコンポーネント内部で状態を保持',
        ],
        ['language', 'Language', "UI 言語。デフォルトは 'zh-CN'。7 言語をサポート"],
        ['data', 'Shape[]', '初期図形。渡した場合は localStorage を読み書きしません'],
        ['onChange', '(data: EditorData) => void', '図形またはカメラが変化したときのコールバック'],
        [
          'onReady',
          '(editor: Editor) => void',
          'エディターインスタンスの準備完了。Editor を取得して完全に制御できます',
        ],
        [
          'imageUpload',
          'ImageUploadOption',
          '画像アップロード経路：設定オブジェクトまたは独自のアップロード関数',
        ],
        ['className', 'string', 'ボードのコンテナに付与するクラス名'],
      ],
      exportsTitle: 'エクスポートされるコンポーネント',
      exportsHead: ['コンポーネント', '説明'],
      exportsRows: [
        [
          'CanvasBoard',
          'メインのキャンバス。ツールバー、ズーム、スタイルパネル、マインドマップパネルなどを含む',
        ],
        ['Toolbar', 'ツールバー。単独で使用し、すべてのコールバックを自分で処理可能'],
        ['ZoomControl', 'ズームコントロール。onZoomIn / onZoomOut / onReset'],
      ],
    },
    image: {
      title: '画像アップロード',
      channelA: 'アップロード URL を設定',
      channelB: '独自のアップロード関数',
      callout:
        'imageUpload を渡さない場合はローカルの一時 blob にフォールバックし、リロードすると失われます。長期保存するには自前のアップロード経路を設定してください。',
    },
    changelogSection: {
      title: '更新履歴',
      desc: '完全なバージョン履歴はパッケージ内の README を参照してください。',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: 'core の接続線と消しゴムの体験を継承',
        points: [
          '接続線の回避、線分ハンドルの整理、消しゴムのフェードは drawui-core と同期して反映され、CanvasBoard 側の設定は不要です。',
          'IMAGE_UPLOAD.md の参照先を、インストール後に node_modules/drawui-react/ 配下で確認する旨に変更しました。',
        ],
      },
      {
        version: 'v0.5.2',
        date: 'マインドマップ階層の導線',
        points: [
          'マインドマップを選択しアクティブなノードがある場合、下部のフローティングスタイルバーに 5 つ目の「階層」ボタンが追加され、1 段上げる / 2 段上げる操作が可能です。',
          '任意の図形をドラッグしている間は、上部ツールバー、下部スタイルバー、表のツールバーを非表示にし、離すと元に戻ります。',
          '依存する drawui-core も 0.5.2 に同時にアップグレードしました。',
        ],
      },
      {
        version: 'v0.5.0',
        date: '画像アップロード経路',
        points: [
          'imageUpload は ImageUploadConfig と ImageUploader 関数の 2 種類の経路をサポートします。',
          '1 枚あたりの上限は 30 MB、アップロードのタイムアウトはデフォルト 60s。上限超過の通知文言は 7 言語に対応しています。',
        ],
      },
      {
        version: 'v0.4.2',
        date: 'コンテキストメニューとグループのロック',
        points: [
          'ContextMenu を追加：コピー、ペースト、重ね順、反転、グループ化、ロック、削除。ショートカットと無効状態の表示も完備されています。',
          'コンテナとキャンバスの 2 階層で contextmenu を処理し、ツールバーやスタイルパネル上でもブラウザ標準のメニューが表示されなくなりました。',
          'グループ化するとグループ全体がロックされ、解除後は任意のメンバーをクリックしてグループ全体を選択でき、キャンバスには破線のグループ枠が描画されます。',
        ],
      },
    ],
    next: {
      title: 'まず試してから決める',
      desc: 'オンラインボードにはフロー、マインドマップ、表、UML、図形ライブラリの 5 つのシーンが用意されており、Esc で終了できます。',
      button: 'オンラインで試す →',
    },
  },
};

export default ja;
