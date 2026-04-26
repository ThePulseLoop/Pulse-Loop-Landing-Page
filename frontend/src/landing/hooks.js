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
    if (!cv) return;
    const cx = cv.getContext("2d");
    let W = 0;
    let H = 0;
    let nodes = [];
    let raf = 0;

    const buildNodes = () => {
      const N = Math.min(
        PARTICLE_MAX_NODES,
        Math.floor((W * H) / PARTICLE_AREA_PER_NODE)
      );
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: 1.5 + Math.random() * 2.5,
        phase: Math.random() * Math.PI * 2,
        sp: 0.008 + Math.random() * 0.012,
        yellow: Math.random() < PARTICLE_YELLOW_PROB,
      }));
    };

    const resize = () => {
      W = cv.width = cv.offsetWidth;
      H = cv.height = cv.offsetHeight;
      buildNodes();
    };

    const drawLinks = (linkRadius, greenRGB, lineAlphaMul) => {
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkRadius) {
            cx.beginPath();
            cx.moveTo(a.x, a.y);
            cx.lineTo(b.x, b.y);
            cx.strokeStyle = `rgba(${greenRGB},${(1 - d / linkRadius) * lineAlphaMul})`;
            cx.lineWidth = 0.6;
            cx.stroke();
          }
        }
      }
    };

    const drawNodes = (greenRGB, yellowRGB, isLight, fillAlphaMul) => {
      for (const n of nodes) {
        n.phase += n.sp;
        const r = n.r + Math.sin(n.phase) * 1.2;
        const col = n.yellow ? yellowRGB : greenRGB;
        const grad = cx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
        grad.addColorStop(0, `rgba(${col},${isLight ? 0.18 : 0.2})`);
        grad.addColorStop(1, `rgba(${col},0)`);
        cx.beginPath();
        cx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
        cx.fillStyle = grad;
        cx.fill();
        cx.beginPath();
        cx.arc(n.x, n.y, r, 0, Math.PI * 2);
        cx.fillStyle = `rgba(${col},${fillAlphaMul})`;
        cx.fill();
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      }
    };

    const tick = () => {
      cx.clearRect(0, 0, W, H);
      const isLight = document.documentElement.getAttribute("data-theme") === "light";
      const greenRGB = isLight ? "0,162,108" : "46,232,160";
      const yellowRGB = isLight ? "163,166,0" : "231,236,12";
      const lineAlphaMul = isLight ? 0.18 : 0.1;
      const fillAlphaMul = isLight ? 0.85 : 0.75;
      drawLinks(W * PARTICLE_LINK_RATIO, greenRGB, lineAlphaMul);
      drawNodes(greenRGB, yellowRGB, isLight, fillAlphaMul);
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
