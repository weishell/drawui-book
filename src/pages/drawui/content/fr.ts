import type { DocsContent } from './types';

const fr: DocsContent = {
  layout: {
    brandTag: 'Moteur de canevas',
    pageContentsLabel: 'Sur cette page',
    npmLabel: 'Paquet npm',
    navGroups: [
      {
        title: 'Démarrage',
        items: [
          { label: 'Aperçu', to: '/drawui', end: true },
          { label: 'Démo en ligne', to: '/drawui#playground' },
        ],
      },
      {
        title: 'drawui-core',
        items: [
          { label: 'Moteur principal', to: '/drawui/core' },
          { label: 'Fonctionnalités', to: '/drawui/core#features' },
          { label: 'Démarrage rapide', to: '/drawui/core#quickstart' },
          { label: 'API principale', to: '/drawui/core#api' },
          { label: "Import d'images", to: '/drawui/core#image' },
          { label: 'Journal des modifications', to: '/drawui/core#changelog' },
        ],
      },
      {
        title: 'drawui-react',
        items: [
          { label: 'Composant React', to: '/drawui/react' },
          { label: 'Installation et utilisation', to: '/drawui/react#quickstart' },
          { label: 'CanvasBoard', to: '/drawui/react#props' },
          { label: "Import d'images", to: '/drawui/react#image' },
          { label: 'Journal des modifications', to: '/drawui/react#changelog' },
        ],
      },
    ],
    anchorsByPath: {
      '/drawui': [
        { label: "Ce qu'il peut faire", hash: 'features' },
        { label: 'Relation entre les deux paquets', hash: 'packages' },
        { label: 'Galerie de fonctionnalités', hash: 'gallery' },
        { label: 'Démarrage rapide', hash: 'quickstart' },
        { label: "Cas d'usage", hash: 'scenes' },
      ],
      '/drawui/core': [
        { label: 'Fonctionnalités du moteur', hash: 'features' },
        { label: 'Installation et initialisation', hash: 'quickstart' },
        { label: 'API principale', hash: 'api' },
        { label: "Import d'images", hash: 'image' },
        { label: 'Journal des modifications', hash: 'changelog' },
      ],
      '/drawui/react': [
        { label: 'Fonctionnalités du composant', hash: 'features' },
        { label: 'Installation et utilisation', hash: 'quickstart' },
        { label: 'Propriétés de CanvasBoard', hash: 'props' },
        { label: "Import d'images", hash: 'image' },
        { label: 'Journal des modifications', hash: 'changelog' },
      ],
    },
  },

  playground: {
    title: 'Tableau blanc en ligne',
    hint: '({count} formes · Esc pour quitter)',
    reset: 'Réinitialiser',
    clear: 'Tout effacer',
    closeAria: 'Quitter le tableau',
    presetNames: {
      flow: 'Diagramme de flux',
      mindmap: 'Carte mentale',
      table: 'Tableau',
      uml: 'Diagramme de classes UML',
      sticky: 'Bibliothèque de formes',
    },
  },

  common: {
    copy: 'Copier',
    copied: 'Copié',
  },

  overview: {
    eyebrow: 'drawui · moteur de canevas indépendant du framework',
    heroTitleLines: ['Un canevas agréable à utiliser', 'intégré dans votre produit'],
    heroLead:
      "drawui-core fournit un noyau de dessin en TypeScript natif, et drawui-react l'encapsule dans un CanvasBoard. Formes, connecteurs, cartes mentales, tableaux, UML, export et multilingue : tout est prêt à l'emploi.",
    badges: ['Licence MIT', 'Canvas 2D', 'TypeScript'],
    heroActions: {
      startReact: 'Démarrer avec drawui-react',
      learnCore: 'Découvrir le moteur principal',
      openPlayground: 'Ouvrir le tableau en ligne ↗',
    },
    floatCards: {
      undoTitle: 'Annuler / Rétablir',
      undoDesc: 'Une session de modification = une étape',
      dragTitle: 'Glisser pour dessiner',
      dragDesc: "Maintenir et glisser au-delà de 5 px, mise à l'échelle selon le geste",
    },
    stats: [
      { value: '50+', label: 'Types de formes' },
      { value: '4', label: 'Styles de connecteurs' },
      { value: '7', label: "Langues de l'interface" },
      { value: '6', label: 'Thèmes de page' },
    ],
    featuresSection: {
      title: "Ce qu'il peut faire",
      desc: "D'une forme à un trait, jusqu'au document de tableau complet et exportable. Chaque illustration ci-dessous est produite par le vrai moteur de rendu de drawui, ce ne sont pas des schémas.",
    },
    features: [
      {
        title: '50+ formes et 4 types de connecteurs',
        desc: 'Formes de base, symboles de diagramme de flux, volumes et flèches en bloc : tout est là ; les connecteurs droit, polyligne, orthogonal et courbe évitent automatiquement les formes aux deux extrémités.',
      },
      {
        title: 'Carte mentale à croissance dans quatre directions',
        desc: "Le nœud racine peut se développer vers le haut, le bas, la gauche et la droite ; les enfants héritent de la direction du parent. Glisser pour changer de niveau, réordonner dans la même direction, aperçu en pointillés à l'emplacement cible.",
      },
      {
        title: 'Édition de tableau sur place',
        desc: "Sélecteur 8×6 pour insérer un tableau, sélection de cellules à la façon de Feishu, fusion / division, insertion / suppression de lignes et de colonnes, retour à la ligne automatique et hauteur de ligne qui s'adapte au contenu.",
      },
      {
        title: 'Diagrammes de classes UML',
        desc: "Les formes de classe et d'interface intègrent des zones attributs / méthodes ; les connecteurs couvrent les cinq sémantiques UML : héritage, agrégation, composition, dépendance et réalisation.",
      },
      {
        title: 'Notes autocollantes, icônes et modèles',
        desc: "Papier autocollant, 113 emojis Twemoji, icônes linéaires Lucide et bibliothèque de modèles ; un modèle sélectionné s'insère en bloc au centre de la vue, prêt à l'emploi.",
      },
      {
        title: 'Export et archivage',
        desc: 'Export en un clic en PNG / SVG / PDF ; exportJSON / importJSON enregistrent le document complet (formes + caméra + version) pour reprendre le dessin plus tard.',
      },
    ],
    packagesSection: {
      title: 'Relation entre les deux paquets',
      desc: "La couche inférieure est le moteur, la couche supérieure l'encapsulation React. Installez seulement drawui-react : drawui-core sera installé automatiquement.",
    },
    packages: {
      coreTag: 'Moteur principal',
      coreDesc:
        'TypeScript natif, sans dépendance à React. Utilisez-le pour manipuler directement le canvas, avec Vue, Svelte, Angular ou un framework maison.',
      corePoints: [
        'Editor / Camera / Renderer et les utilitaires sont tous importables séparément',
        'Manipulation de formes, historique, raccourcis clavier et presse-papiers inclus',
        'renderToCanvas / renderSVGString génèrent des images sans hôte',
      ],
      reactTag: "Point d'entrée recommandé",
      reactDesc:
        "Barre d'outils, zoom, panneau de styles, mini-carte et menu contextuel sont déjà assemblés : quelques props suffisent pour obtenir un tableau utilisable.",
      reactPoints: [
        'Trois composants : CanvasBoard / Toolbar / ZoomControl',
        'themeColor, language, data, onChange, onReady',
        'Deux voies pour imageUpload : OSS ou backend maison',
      ],
    },
    gallerySection: {
      title: 'Galerie de fonctionnalités',
      desc: 'Cliquez sur « Ouvrir le tableau en ligne » ci-dessus pour essayer directement dans le navigateur.',
    },
    gallery: [
      { title: 'Diagramme de flux', desc: "Début / condition / traitement / branche d'exception" },
      { title: 'Carte mentale', desc: 'Croissance libre dans quatre directions' },
      { title: 'Tableau', desc: 'Édition des lignes et colonnes, fusion de cellules' },
      { title: 'Diagramme de classes UML', desc: "Classes, interfaces et relations d'héritage" },
      {
        title: 'Bibliothèque de formes',
        desc: 'Diagrammes de flux et formes géométriques courantes',
      },
      {
        title: 'Notes autocollantes',
        desc: 'Prendre des notes à la volée, rotation et groupement',
      },
    ],
    quickstartSection: {
      title: 'Démarrage rapide',
      desc: 'Deux commandes pour installer, deux extraits de code pour démarrer.',
    },
    quickstart: {
      installTitle: '1. Installation',
      renderTitle: '2. Rendu du tableau',
      callout:
        'Les styles doivent être importés séparément via drawui-react/styles.css ; sans data, le canevas lit et écrit dans localStorage, avec data, les données externes font référence.',
    },
    scenesSection: {
      title: "Cas d'usage",
      desc: 'Un canevas peut apparaître à bien des endroits.',
    },
    scenes: [
      {
        title: 'Canevas intégré à un produit SaaS',
        desc: 'Montez CanvasBoard directement dans un tableau blanc, un outil low-code ou un éditeur de processus ; couleur de thème, langue et données initiales sont de simples props.',
        points: [
          'Contrôlé ou non contrôlé',
          'onChange synchronise formes et caméra',
          'imageUpload branché sur votre stockage',
        ],
      },
      {
        title: 'Documentation et base de connaissances',
        desc: "Utilisez le tableau comme un bloc dans un document : les données de formes sont enregistrées et exportées avec le document, et le lecteur voit exactement ce que l'auteur a dessiné.",
        points: [
          'renderToCanvas génère des miniatures',
          'Export SVG issu du même rendu que le canevas',
          'Archivage JSON restaurable entre sessions',
        ],
      },
      {
        title: 'Enseignement et démonstrations',
        desc: "Composez rapidement des exemples avec les formes prédéfinies ; combiné au changement de thème du site et au multilingue, idéal pour tutoriels, centres d'aide et pages de démonstration.",
        points: [
          "Shape[] prédéfinis prêts à l'emploi",
          'Thèmes clair / sombre et 6 couleurs de fond de page',
          'Raccourcis clavier et menu contextuel disponibles',
        ],
      },
    ],
    end: {
      title: 'Prêt à tracer votre premier trait ?',
      desc: 'Essayez en ligne, puis choisissez core ou react.',
      open: 'Ouvrir le tableau en ligne',
      react: 'Voir la documentation React',
    },
  },

  core: {
    pageTitle: 'Moteur de canevas indépendant du framework',
    pageLead:
      "Écrit en TypeScript natif, il manipule directement Canvas 2D. Vous pouvez n'utiliser que son moteur de rendu pour produire des images, ou l'intégrer entièrement dans n'importe quel framework pour bénéficier de la manipulation de formes, de l'historique, des raccourcis et de l'export.",
    badges: ['v0.6.0', 'TypeScript', 'Canvas 2D', 'MIT'],
    split: {
      title: "Pas une simple couche canvas, mais un noyau d'éditeur complet",
      body: "Sélection, dessin, connexion, édition, annulation et export sont tous pilotés par Editor. L'interface supérieure se contente de placer boutons et panneaux ; tout l'état est exposé sous forme de Shape[] et d'EditorData.",
      points: [
        'Structures de données pures, faciles à persister, à synchroniser et à valider côté serveur',
        'Le rendu du canevas et les exports SVG / PNG partagent les mêmes calculs géométriques',
        'Utilitaires et modules géométriques importables à la demande, sans dépendance à React',
      ],
    },
    featuresSection: { title: 'Fonctionnalités du moteur' },
    features: [
      {
        title: 'Indépendant du framework',
        desc: 'TypeScript natif + Canvas 2D, sans lien avec un framework UI ; compatible avec Vue, Svelte, Angular ou un framework maison.',
      },
      {
        title: "Chaîne d'outils complète",
        desc: 'Sélection, main, formes, ligne, flèche, dessin à main levée, gomme ; dessin par glisser, Shift pour les proportions, Esc pour annuler.',
      },
      {
        title: "Capacités d'édition",
        desc: 'Annuler / rétablir, copier / coller, dupliquer, gestion des niveaux, copier le style, retournement horizontal / vertical, verrouillage, groupement / dégroupement.',
      },
      {
        title: 'Connecteurs intelligents',
        desc: 'Accrochage sur quatre points, choix automatique du côté, contournement orthogonal, poignées de coude ; quatre types de connexion : droit, polyligne, orthogonal, courbe.',
      },
      {
        title: 'Formes professionnelles',
        desc: 'Tableaux, classes / interfaces UML, cartes mentales, symboles de diagramme de flux, volumes, notes, icônes, images.',
      },
      {
        title: 'Thèmes et multilingue',
        desc: "6 thèmes de page, couleur de thème à l'exécution, 7 langues d'interface ; l'export LANGUAGES facilite votre propre sélecteur de langue.",
      },
      {
        title: 'Export et archivage',
        desc: 'PNG / SVG / PDF, avec un rendu identique au canevas ; exportJSON / importJSON enregistrent le document complet et la position de la caméra.',
      },
      {
        title: 'Rendu sans hôte',
        desc: 'renderToCanvas / renderSVGString / getContentBounds génèrent miniatures et aperçus sans éditeur.',
      },
    ],
    quickstartSection: {
      title: 'Installation et initialisation',
      desc: "Après l'installation, créez une instance d'Editor et transmettez-lui les données de formes.",
    },
    quickstart: {
      optionsTitle: 'Options du constructeur',
      tableHead: ['Option', 'Type', 'Description'],
      tableRows: [
        [
          'theme',
          'Partial<DrawuiTheme>',
          "Couleurs du canevas et de l'interface, modifiables à l'exécution via setTheme",
        ],
        [
          'language',
          "'zh-CN' | 'zh-TW' | 'en-US' | 'ja-JP' | 'ko-KR' | 'de-DE' | 'fr-FR'",
          "Langue de l'interface, zh-CN par défaut",
        ],
        [
          'shapes',
          'Shape[]',
          'Formes initiales ; si fournies, plus aucun chargement depuis localStorage',
        ],
        ['persist', 'boolean', 'Activer la persistance localStorage, true par défaut'],
        [
          'imageUpload',
          'ImageUploadOption',
          "Voie d'envoi d'images : objet de configuration ou fonction personnalisée",
        ],
      ],
    },
    apiSection: {
      title: 'API principale',
      exportsTitle: 'Exports principaux',
      exportsHead: ['Export', 'Utilisation'],
      exportsRows: [
        [
          'Editor',
          "Instance de l'éditeur : formes, sélection, caméra, historique, export, persistance",
        ],
        [
          'SelectTool / HandTool / ShapeTool / LineTool / FreehandTool / ArrowTool',
          'Classes d’outils utilisables ou remplaçables séparément',
        ],
        ['Vec / Mat2d / Camera / Renderer', 'Géométrie, caméra et infrastructure de rendu'],
        [
          'THEME / getTheme / setTheme / subscribeTheme',
          'Lecture, changement et abonnement aux thèmes',
        ],
        [
          'LANGUAGES / setLanguage / getLanguage / t',
          'Liste des langues, changement et fonction de traduction',
        ],
        [
          'layoutMindMap / mindMapNodeColor / mindMapNodeSize',
          'Disposition et style des nœuds de carte mentale',
        ],
        [
          'renderToCanvas / renderSVGString / getContentBounds',
          'Rendu sans hôte et boîte englobante du contenu',
        ],
        [
          'Shape / ShapeType / EditorData / ToolType / MindMapNode',
          'Définitions de types complètes',
        ],
      ],
      methodsTitle: "Méthodes d'instance courantes",
      methodsHead: ['Méthode', 'Description'],
      methodsRows: [
        [
          'getShapes() / setShapes(shapes)',
          "Lire ou remplacer l'ensemble des formes ; setShapes entre dans l'historique",
        ],
        ['getData()', "Obtenir formes + caméra, à renvoyer à l'hôte via onChange"],
        ['subscribe(listener)', "S'abonner aux changements, renvoie une fonction de désabonnement"],
        ['undo() / redo() / canUndo() / canRedo()', "Contrôle de l'historique"],
        ['exportImage(format, opts)', 'Exporter en PNG / SVG / PDF, renvoie un Blob'],
        [
          'downloadImage(fileName, format, opts)',
          'Exporter et déclencher le téléchargement dans le navigateur',
        ],
        [
          'exportJSON() / importJSON(json)',
          'Archiver et restaurer le document complet (formes + caméra + version)',
        ],
        ['zoomIn() / zoomOut() / resetZoom() / panBy()', 'Contrôle de la vue'],
        ['copySelected() / paste() / duplicateSelected()', 'Presse-papiers et duplication'],
        [
          'Méthodes liées à groupId / locked',
          "Groupement, verrouillage, niveaux, retournement et autres opérations d'édition",
        ],
      ],
    },
    image: {
      title: "Import d'images",
      desc: 'Fonctionne localement sans configuration ; pour éviter de perdre les images au rafraîchissement, connectez votre propre serveur ou un OSS.',
      channelA: "Voie A : configurer l'URL d'envoi",
      channelB: "Voie B : fonction d'envoi personnalisée",
      callout:
        'La voie fonction est prioritaire sur la configuration. Une image est limitée à 30 MB par défaut ; au-delà, image.tooLarge est levée sans envoyer de requête. Le guide complet se trouve dans IMAGE_UPLOAD.md, dans le paquet.',
    },
    changelogSection: {
      title: 'Journal des modifications',
      desc: 'Changements clés des dernières versions ; le journal complet est dans le README du paquet.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: 'Évitement des connecteurs · Poignées resserrées · Fondu de la gomme',
        points: [
          "Les connecteurs ne traversent plus la forme cible : un squelette de contournement a été ajouté, activé uniquement lorsque les deux squelettes à bus unique mordent encore, avec vérification qu'aucune extrémité n'est traversée.",
          'Les poignées de segment ne sont proposées que pour les polylignes et les lignes orthogonales ; les lignes droites et les courbes ne sont plus dessinées ni ciblées.',
          "La gomme s'efface en 200 ms après avoir touché une forme, puis la supprime ; annuler / rétablir interrompt le fondu en cours.",
        ],
      },
      {
        version: 'v0.5.2',
        date: 'Montée et descente de niveau dans la carte mentale · Changement de niveau par glisser',
        points: [
          "Montée de niveau : le nœud est rattaché sous l'ancêtre de niveau levels + 1, et le sous-arbre suit le déplacement.",
          "Déposer dans le cadre d'un autre nœud en fait un enfant ; déposer à moins de 48 px à l'extérieur du cadre en fait un frère de même direction ; une cible située dans son propre sous-arbre est refusée.",
          "Après un changement de structure, la différence de coordonnées du nœud racine compense le centre de la carte : le nœud racine ne saute plus lors d'un changement de niveau.",
          'Nouvel événement de glisser UiEvent et 4 clés de traduction pour la carte mentale.',
        ],
      },
      {
        version: 'v0.5.1',
        date: 'Disposition de la carte mentale dans quatre directions',
        points: [
          'MindMapNode gagne un champ direction : la racine peut croître vers le haut, le bas, la gauche et la droite, et les enfants héritent de la direction du parent.',
          "Les connecteurs prennent le bord correspondant à la direction de l'enfant et dessinent une courbe de Bézier isomorphe.",
          "Le glisser devient un réordonnancement dans la même direction, avec un aperçu sous forme de cadre arrondi en pointillés de taille égale à l'emplacement cible.",
        ],
      },
      {
        version: 'v0.5.0',
        date: "Voies d'envoi d'images",
        points: [
          'Une image est limitée à 30 MB ; au-delà, image.tooLarge est levée directement sans envoyer de requête.',
          "Délai d'envoi de 60s par défaut ; deux voies disponibles : configuration ImageUploadConfig ou fonction ImageUploader.",
          'Le texte image.tooLarge est synchronisé dans les 7 langues.',
        ],
      },
    ],
    next: {
      title: "Besoin d'un tableau prêt à l'emploi ?",
      desc: "Avec CanvasBoard de drawui-react, la barre d'outils, le zoom, le panneau de styles et le menu contextuel sont déjà assemblés.",
      link: 'Voir drawui-react →',
    },
  },

  react: {
    pageTitle: "Composant React de tableau blanc prêt à l'emploi",
    pageLead:
      "Encapsulation React basée sur drawui-core. Un seul CanvasBoard suffit pour obtenir une interface et des interactions de canevas complètes ; pour personnaliser, récupérez l'instance de l'éditeur via onReady.",
    badges: ['v0.6.0', 'React 18 / 19', 'TypeScript', 'MIT'],
    heroActions: { openPlayground: 'Ouvrir le tableau en ligne', npm: 'Paquet npm' },
    split: {
      title: "Le composant gère l'interface, core gère le noyau",
      body: "CanvasBoard prend déjà en charge la taille du canevas, le placement de la barre d'outils, le zoom, le panneau de styles, la mini-carte et le menu contextuel. Trois choses seulement vous concernent : quelles données lui donner, qui prévenir lorsqu'elles changent, et ce que vous voulez faire de plus avec l'instance.",
      points: [
        'styles.css importé séparément, sans pollution globale',
        "Les changements de data sont pilotés par l'hôte, pas de boîte noire interne",
        'Fonctionne sur mobile et dans les conteneurs étroits, les panneaux se replient automatiquement',
      ],
    },
    featuresSection: { title: 'Fonctionnalités du composant' },
    features: [
      {
        title: 'Un composant, un tableau',
        desc: "Barre d'outils, contrôle de zoom, panneau de styles, mini-carte, barre d'état et menu contextuel assemblés en une fois.",
      },
      {
        title: 'Contrôlé ou non contrôlé',
        desc: 'Passez data pour initialiser avec des données externes et désactiver localStorage ; sans data, le composant lit et écrit automatiquement le stockage local du navigateur.',
      },
      {
        title: 'Thème et langue sont des props',
        desc: 'themeColor change la couleur principale, language bascule entre 7 langues, theme propose 6 couleurs de fond de page.',
      },
      {
        title: 'Contrôle total',
        desc: "Après onReady, vous obtenez l'instance Editor et pouvez appeler directement setShapes, undo, zoom, exportJSON et d'autres API.",
      },
      {
        title: "Voie d'envoi d'images",
        desc: "imageUpload accepte un objet de configuration ou une fonction d'envoi ; OSS, envoi direct STS ou backend maison, tout tient dans une prop.",
      },
      {
        title: 'Utilisation à la carte',
        desc: "Toolbar et ZoomControl sont exportés séparément : vous pouvez n'en reprendre qu'un seul pour composer votre propre interface.",
      },
    ],
    quickstartSection: {
      title: 'Installation et utilisation',
      desc: 'drawui-core est installé automatiquement comme dépendance, sans déclaration séparée.',
    },
    quickstart: {
      callout:
        "Les styles doivent être importés séparément : import 'drawui-react/styles.css'. Une fois data fourni, le canevas ne touche plus à localStorage ; sinon, la persistance est gérée par le composant.",
    },
    props: {
      title: 'Propriétés de CanvasBoard',
      tableHead: ['Propriété', 'Type', 'Description'],
      tableRows: [
        ['initialTool', 'ToolType', "Outil initial, 'select' par défaut"],
        [
          'themeColor',
          'string',
          'Couleur principale du thème (sélection / poignées / accent), #3b82f6 par défaut',
        ],
        [
          'theme',
          'PageTheme',
          "Thème de page (fond du canevas / teinte de l'interface), 'light' par défaut",
        ],
        [
          'onThemeChange',
          '(theme: PageTheme) => void',
          'Rappel de changement de thème de page ; sans lui, le composant garde son état interne',
        ],
        [
          'language',
          'Language',
          "Langue de l'interface, 'zh-CN' par défaut ; 7 langues disponibles",
        ],
        [
          'data',
          'Shape[]',
          'Formes initiales ; une fois fournies, plus de lecture ni écriture localStorage',
        ],
        [
          'onChange',
          '(data: EditorData) => void',
          'Rappel lorsque les formes ou la caméra changent',
        ],
        [
          'onReady',
          '(editor: Editor) => void',
          "Instance de l'éditeur prête, permet un contrôle total via Editor",
        ],
        [
          'imageUpload',
          'ImageUploadOption',
          "Voie d'envoi d'images : objet de configuration ou fonction personnalisée",
        ],
        ['className', 'string', 'Classe CSS ajoutée au conteneur du tableau'],
      ],
      exportsTitle: 'Composants exportés',
      exportsHead: ['Composant', 'Description'],
      exportsRows: [
        [
          'CanvasBoard',
          "Canevas principal : barre d'outils, zoom, panneau de styles, panneau de carte mentale, etc.",
        ],
        ['Toolbar', 'Barre d’outils ; utilisable seule en reprenant tous les rappels'],
        ['ZoomControl', 'Contrôle de zoom ; onZoomIn / onZoomOut / onReset'],
      ],
    },
    image: {
      title: "Import d'images",
      channelA: "Configurer l'URL d'envoi",
      channelB: "Fonction d'envoi personnalisée",
      callout:
        "Sans imageUpload, un blob local temporaire est utilisé et disparaît au rafraîchissement ; pour un stockage durable, configurez votre propre voie d'envoi.",
    },
    changelogSection: {
      title: 'Journal des modifications',
      desc: 'Journal complet des versions dans le README du paquet.',
    },
    changelog: [
      {
        version: 'v0.5.3',
        date: "Hérite de l'expérience des connecteurs et de la gomme de core",
        points: [
          'Le contournement des connecteurs, le resserrement des poignées de segment et le fondu de la gomme prennent effet avec drawui-core, sans configuration de CanvasBoard.',
          "L'entrée IMAGE_UPLOAD.md indique désormais de consulter node_modules/drawui-react/ après installation.",
        ],
      },
      {
        version: 'v0.5.2',
        date: 'Entrée de niveaux pour la carte mentale',
        points: [
          "Lorsqu'une carte mentale est sélectionnée et qu'un nœud actif existe, la barre de style flottante du bas affiche un 5e bouton « Niveau », avec montée d'un niveau / de deux niveaux.",
          "Lors du glisser de n'importe quelle forme, la barre supérieure, la barre de style du bas et la barre d'outils de tableau sont masquées, puis restaurées au relâchement.",
          'drawui-core passe en 0.5.2 en synchronisation.',
        ],
      },
      {
        version: 'v0.5.0',
        date: "Voies d'envoi d'images",
        points: [
          'imageUpload accepte deux voies : ImageUploadConfig et fonction ImageUploader.',
          "Une image est limitée à 30 MB, délai d'envoi de 60s par défaut ; les messages de dépassement couvrent 7 langues.",
        ],
      },
      {
        version: 'v0.4.2',
        date: 'Menu contextuel et verrouillage de groupe',
        points: [
          'Nouveau ContextMenu : copier, coller, niveaux, retournement, groupement, verrouillage, suppression, avec raccourcis et états grisés.',
          "Il prend en charge contextmenu au niveau du conteneur et du canevas ; la barre d'outils et le panneau de styles ne montrent plus le menu natif du navigateur.",
          'Grouper verrouille tout le groupe ; après déverrouillage, cliquez sur un membre pour sélectionner le groupe, et le canevas dessine un cadre pointillé autour du groupe.',
        ],
      },
    ],
    next: {
      title: 'Essayez avant de choisir',
      desc: 'Le tableau en ligne propose cinq scènes prêtes : flux, carte mentale, tableau, UML et bibliothèque de formes ; Esc permet de quitter.',
      button: 'Démo en ligne →',
    },
  },
};

export default fr;
