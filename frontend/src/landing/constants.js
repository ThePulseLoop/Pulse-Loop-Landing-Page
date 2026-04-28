// Logo & layout
export const LOGO_DEFAULT_SIZE = 22;
export const LOGO_NAV_SIZE = 30;
export const LOGO_FOOTER_SIZE = 20;
export const LOGO_VIEWBOX_W = 400;
export const LOGO_VIEWBOX_H = 333;

// Hero canvas particle network
export const PARTICLE_MAX_NODES = 30;
export const PARTICLE_AREA_PER_NODE = 25000;
export const PARTICLE_LINK_RATIO = 0.22;
export const PARTICLE_YELLOW_PROB = 0.1;

// Animation timings
export const CERT_LINE_STAGGER_MS = 110;
export const HERO_FOCUS_DELAY_MS = 60;
export const NAV_SCROLL_THRESHOLD_PX = 40;
export const IO_THRESHOLD_FEAT = 0.18;
export const IO_THRESHOLD_CERT = 0.3;

// Backend
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || (window.location.hostname === "localhost" ? "http://localhost:3001" : "");
export const API = `${BACKEND_URL}/api`;

// IDs of sections to fade in via IntersectionObserver
export const FADE_IN_IDS = [
  "f1", "f2", "f3", "t1", "t2", "a1", "a2", "social-h", "close-line",
];
