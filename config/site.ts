// Site Configuration - UPDATE THESE VALUES FOR NEW GAMES
export const SITE_URL = 'https://plantsvsbrainrots.cc';
export const SITE_NAME = 'Plants vs Brainrots';

// Game-specific Configuration - Main featured game details
export const GAME_CONFIG = {
  // Basic game info
  title: 'Plants vs Brainrots Unblocked | Codes • Wiki • Tier List (2025)',
  description:
    'Play Plants vs Brainrots online and on Roblox. Get the latest codes, wiki tips and tier list to grow strong plants and defend your garden from brainrots.',
  category: 'Tower Defense',
  tags:
    'plants vs brainrots, roblox game, tower defense, garden defense, brainrot zombies, roblox codes, game wiki, tier list, free online game',

  // Featured game content (HTML-friendly text for the featured game description)
  featuredContent: {
    main:
      'Plants vs Brainrots is a free Roblox tower-defense style game where you plant powerful units in your garden to stop waves of goofy brainrots. Redeem working codes, follow the wiki-style guides and use the tier list to choose the strongest plants and upgrades for every wave.',

    gameplay: {
      title: 'How to Play Plants vs Brainrots',
      content:
        'Start by buying a seed and planting it in your garden. Each plant has unique stats and abilities that automatically attack incoming brainrots. Earn coins and gems by defeating waves, then unlock stronger plants, upgrade your garden and experiment with different line-ups. Use our up-to-date codes, wiki tips and tier list to create the best brainrot-busting strategy for every map and event.'
    },

    controls: {
      title: 'Basic Controls & Tips',
      items: [
        'Mouse / Tap: Navigate menus, buy seeds and place plants in your garden',
        'Drag & Drop: Position plants on valid tiles to maximise range and damage',
        'Keyboard (Roblox default): Move your character, jump and explore the map',
        'Use in-game menus: Redeem Plants vs Brainrots codes, upgrade plants and manage your inventory',
        'Follow on-screen event icons: Join limited-time EVENTS UPDATE content for bonus rewards'
      ]
    },

    features: {
      title: 'Key Features of Plants vs Brainrots',
      content:
        'Collect and upgrade dozens of plants with different attack styles, ranges and special effects. Clear endless waves of silly brainrots, unlock new areas of your garden and take part in seasonal EVENTS UPDATE challenges. Our wiki-style pages include a detailed tier list, code list and farming tips so you always know which plants to prioritise and how to progress faster without spending Robux.'
    },

    replayability: {
      title: 'Why Players Love Plants vs Brainrots',
      content:
        'Regular events, new plants, balance updates and fresh codes keep Plants vs Brainrots feeling active and replayable. You can test new team compositions, grind better setups for late-game waves and compete with friends to see who can build the strongest garden. With our constantly updated codes, wiki and tier list, this Roblox defense game always has something new to try.'
    }
  },

  // SEO Configuration
  keywords:
    'Plants vs Brainrots, Plants vs Brainrots codes, Plants vs Brainrots wiki, Plants vs Brainrots tier list, Roblox Plants vs Brainrots, Roblox tower defense game, garden defense game, Roblox codes 2024, free Roblox strategy games',

  // Images (used for Open Graph / Twitter cards)
  ogImage: 'https://plantsvsbrainrots.cc/favicon.png',
  twitterImage: 'https://plantsvsbrainrots.cc/favicon.png',

  // Game iframe settings
  iframe: {
    // Optional: main game source URL for the embed player
    src: 'https://crossy-road.io/plants-vs-brainrots.embed',
    allow:
      'autoplay; fullscreen; camera; focus-without-user-activation *; monetization; gamepad; keyboard-map *; xr-spatial-tracking; clipboard-write; web-share; accelerometer; magnetometer; gyroscope; display-capture',
    sandbox:
      'allow-forms allow-modals allow-orientation-lock allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-scripts allow-same-origin allow-downloads'
  },

  // Rating configuration
  rating: {
    value: 4.2,
    count: 500,
    max: 5
  }
};

// Site Configuration
export const SITE_CONFIG = {
  // Basic info
  name: SITE_NAME,
  url: SITE_URL,
  description: GAME_CONFIG.description,
  keywords: GAME_CONFIG.keywords,

  // Contact information
  contact: {
    email: 'support@plantsvsbrainrots.cc',
    social: {
      twitter: '@plantsvsbrainrots',
      facebook: 'plantsvsbrainrots'
    }
  },

  // Legal page contacts
  legal: {
    privacyEmail: 'privacy@plantsvsbrainrots.cc',
    termsEmail: 'legal@plantsvsbrainrots.cc'
  },

  // UI Configuration
  ui: {
    // Header logo
    logo: {
      src: 'https://plantsvsbrainrots.cc/favicon.png',
      alt: SITE_NAME,
      maxHeight: '30px'
    },

    // Game player settings
    gamePlayer: {
      featuredImage: 'https://plantsvsbrainrots.cc/favicon.png',
      fullscreenEnabled: true,
      // Height settings for mobile and desktop
      mobileHeight: '400px',
      desktopHeight: '600px',
      minHeight: '520px'
    }
  }
};

// Constants for related games display
export const MAX_RELATED_GAMES = 16; // 4 rows × 8 columns
export const MAX_404_RECOMMENDED_GAMES = 32; // 4 rows × 8 columns

// Default values for fallbacks
export const DEFAULT_DESCRIPTION = GAME_CONFIG.description;
export const DEFAULT_KEYWORDS = GAME_CONFIG.keywords;
export const DEFAULT_OG_IMAGE = GAME_CONFIG.ogImage;