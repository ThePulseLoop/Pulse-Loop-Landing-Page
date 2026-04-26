import { useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  API,
  CERT_LINE_STAGGER_MS,
  FADE_IN_IDS,
  IO_THRESHOLD_CERT,
  IO_THRESHOLD_FEAT,
  NAV_SCROLL_THRESHOLD_PX,
  PARTICLE_AREA_PER_NODE,
  PARTICLE_LINK_RATIO,
  PARTICLE_MAX_NODES,
  PARTICLE_YELLOW_PROB,
} from "./constants";

// ── Canvas helpers (pure, complexity ≤ 6 each) ────────────────

function buildParticles(width, height) {
  const count = Math.min(
    PARTICLE_MAX_NODES,
    Math.floor((width * height) / PARTICLE_AREA_PER_NODE)
  );
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.2,
    vy: (Math.random() - 0.5) * 0.2,
    r: 1.5 + Math.random() * 2.5,
    phase: Math.random() * Math.PI * 2,
    sp: 0.008 + Math.random() * 0.012,
    yellow: Math.random() < PARTICLE_YELLOW_PROB,
  }));
}

function getThemePalette() {
  const isLight = document.documentElement.getAttribute("data-theme") === "light";
  return {
    isLight,
    greenRGB: isLight ? "0,162,108" : "46,232,160",
    yellowRGB: isLight ? "163,166,0" : "231,236,12",
    lineAlphaMul: isLight ? 0.18 : 0.1,
    fillAlphaMul: isLight ? 0.85 : 0.75,
    nodeGlowAlpha: isLight ? 0.18 : 0.2,
  };
}

function drawLink(ctx, a, b, linkRadius, greenRGB, lineAlphaMul) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance >= linkRadius) return;
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.strokeStyle = `rgba(${greenRGB},${(1 - distance / linkRadius) * lineAlphaMul})`;
  ctx.lineWidth = 0.6;
  ctx.stroke();
}

function drawAllLinks(ctx, nodes, linkRadius, palette) {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      drawLink(ctx, nodes[i], nodes[j], linkRadius, palette.greenRGB, palette.lineAlphaMul);
    }
  }
}

function bounceOnEdge(node, width, height) {
  node.x += node.vx;
  node.y += node.vy;
  if (node.x < 0 || node.x > width) node.vx *= -1;
  if (node.y < 0 || node.y > height) node.vy *= -1;
}

function drawNode(ctx, node, palette) {
  node.phase += node.sp;
  const radius = node.r + Math.sin(node.phase) * 1.2;
  const colorRGB = node.yellow ? palette.yellowRGB : palette.greenRGB;
  const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, radius * 5);
  grad.addColorStop(0, `rgba(${colorRGB},${palette.nodeGlowAlpha})`);
  grad.addColorStop(1, `rgba(${colorRGB},0)`);
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius * 5, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${colorRGB},${palette.fillAlphaMul})`;
  ctx.fill();
}

function drawAllNodes(ctx, nodes, width, height, palette) {
  for (const node of nodes) {
    drawNode(ctx, node, palette);
    bounceOnEdge(node, width, height);
  }
}

// ── Hooks ────────────────────────────────────────────────────

// Force light theme on the document root.
export function useForceLightTheme() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);
}

// Toggles ".scrolled" on the nav element when the page is scrolled past a threshold.
export function useNavScrollState(navRef) {
  useEffect(() => {
    const onScroll = () => {
      const node = navRef.current;
      if (!node) return;
      node.classList.toggle("scrolled", window.scrollY > NAV_SCROLL_THRESHOLD_PX);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [navRef]);
}

// Animated particle network drawn on the supplied canvas ref.
export function useHeroCanvas(canvasRef) {
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return undefined;
    const ctx = cv.getContext("2d");
    let width = 0;
    let height = 0;
    let nodes = [];
    let raf = 0;

    const resize = () => {
      width = cv.width = cv.offsetWidth;
      height = cv.height = cv.offsetHeight;
      nodes = buildParticles(width, height);
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      const palette = getThemePalette();
      drawAllLinks(ctx, nodes, width * PARTICLE_LINK_RATIO, palette);
      drawAllNodes(ctx, nodes, width, height, palette);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("resize", resize);
    resize();
    cv.classList.add("ready");
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}

// Adds .visible class to elements with the given ids when they enter the viewport.
export function useFadeInOnScroll(ids = FADE_IN_IDS) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: IO_THRESHOLD_FEAT }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
}

// Reveals the methodology certificate's lines one-by-one when the card enters the viewport.
export function useCertReveal(certCardRef) {
  useEffect(() => {
    const node = certCardRef.current;
    if (!node) return undefined;
    const certIO = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        document.querySelectorAll(".cert2-line").forEach((line, idx) => {
          setTimeout(() => line.classList.add("on"), idx * CERT_LINE_STAGGER_MS);
        });
        certIO.disconnect();
      },
      { threshold: IO_THRESHOLD_CERT }
    );
    certIO.observe(node);
    return () => certIO.disconnect();
  }, [certCardRef]);
}

// Submits an email to the waitlist endpoint and surfaces the right toast.
export async function submitWaitlist(email, source) {
  try {
    const res = await axios.post(`${API}/waitlist`, { email, source });
    if (res.data?.status === "duplicate") {
      toast("Already on the list", {
        description:
          "Your email has already been submitted, we will get back to you soon.",
      });
      return "duplicate";
    }
    toast("Thank you for joining the waiting list!", {
      description: "We will get back to you soon.",
    });
    return "joined";
  } catch (err) {
    const detail = err?.response?.data?.detail;
    toast.error("Could not submit", {
      description: detail || "Something went wrong. Please try again.",
    });
    return "error";
  }
}

// Helpers for in-page smooth scrolls used by the nav and footer.
export function scrollToId(id) {
  return () => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
}

export function scrollToFinal() {
  document.getElementById("final")?.scrollIntoView({ behavior: "smooth" });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
