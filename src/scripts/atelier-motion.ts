import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export function initAtelierMotion() {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mm = gsap.matchMedia();

  document.querySelectorAll<HTMLElement>("[data-hero-line]").forEach((line) => {
    const reveal = () => {
      line.style.animation = "none";
      line.style.transform = "none";
    };
    line.addEventListener("animationend", reveal, { once: true });
    window.setTimeout(reveal, 2000);
  });

  if (!reduce) {
    const cue = document.querySelector("[data-scroll-cue]");
    if (cue) {
      gsap.fromTo(
        cue,
        { scaleY: 0 },
        { scaleY: 1, duration: 1.2, ease: "power3.out", delay: 0.9, transformOrigin: "top center" },
      );
    }
  }

  mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    const lookbook = document.querySelector<HTMLElement>("[data-lookbook]");
    const track = document.querySelector<HTMLElement>("[data-lookbook-track]");
    const bar = document.querySelector<HTMLElement>("[data-lookbook-bar]");
    const folio = document.querySelector<HTMLElement>("[data-lookbook-folio]");
    const panels = gsap.utils.toArray<HTMLElement>("[data-lookbook-panel]");
    if (!lookbook || !track || panels.length === 0) return;

    const articles = gsap.utils.toArray<HTMLElement>("[data-lookbook-track] > article");
    const sizePlates = () => {
      const width = lookbook.offsetWidth;
      articles.forEach((article) => {
        article.style.width = `${width}px`;
      });
    };

    const applyPlate = (progress: number) => {
      const last = Math.max(panels.length - 1, 1);
      const active = Math.round(progress * last);
      if (folio) {
        folio.textContent = `${String(active + 1).padStart(2, "0")} / ${String(panels.length).padStart(2, "0")}`;
      }
      panels.forEach((panel, index) => {
        const point = index / last;
        const dist = Math.abs(progress - point);
        const closeness = Math.max(0, 1 - dist * 1.2);
        panel.style.setProperty("--plate-scale", String(0.88 + closeness * 0.12));
        panel.style.setProperty("--plate-dim", String(0.42 + closeness * 0.58));
      });
    };

    sizePlates();
    applyPlate(0);
    ScrollTrigger.addEventListener("refreshInit", sizePlates);

    const tween = gsap.to(track, {
      x: () => -(track.scrollWidth - lookbook.offsetWidth),
      ease: "none",
      scrollTrigger: {
        trigger: lookbook,
        pin: true,
        pinSpacing: true,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        end: () => `+=${Math.max(track.scrollWidth - lookbook.offsetWidth, 900)}`,
        onUpdate: (self) => {
          if (bar) bar.style.transform = `scaleX(${self.progress})`;
          applyPlate(self.progress);
        },
      },
    });

    return () => {
      ScrollTrigger.removeEventListener("refreshInit", sizePlates);
      tween.scrollTrigger?.kill();
      tween.kill();
      gsap.set(track, { clearProps: "transform,x" });
      articles.forEach((article) => article.style.removeProperty("width"));
      panels.forEach((panel) => {
        panel.style.removeProperty("--plate-scale");
        panel.style.removeProperty("--plate-dim");
      });
      if (bar) bar.style.transform = "";
      if (folio) {
        folio.textContent = `01 / ${String(panels.length).padStart(2, "0")}`;
      }
    };
  });

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const triggers: ScrollTrigger[] = [];
    const tweens: gsap.core.Tween[] = [];

    document.querySelectorAll<HTMLElement>("[data-hero-frame]").forEach((frame) => {
      const hero = frame.closest<HTMLElement>("[data-hero]") ?? frame.parentElement;
      if (!hero) return;
      const tween = gsap.fromTo(
        frame,
        { clipPath: "inset(0% 0% 0% 0%)" },
        {
          clipPath: "inset(12% 8% 0% 8%)",
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            scrub: 0.55,
            start: "top top",
            end: "bottom top",
          },
        },
      );
      tweens.push(tween);
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    document.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
      const parent = el.parentElement;
      if (!parent) return;
      const tween = gsap.fromTo(
        el,
        { yPercent: -11, scale: 1.12 },
        {
          yPercent: 9,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            scrub: true,
            start: "top bottom",
            end: "bottom top",
          },
        },
      );
      tweens.push(tween);
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    const fill = document.querySelector<HTMLElement>("[data-process-fill]");
    const process = document.querySelector<HTMLElement>("[data-process]");
    if (fill && process) {
      const tween = gsap.fromTo(
        fill,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top center",
          scrollTrigger: {
            trigger: process,
            scrub: 0.45,
            start: "top 50%",
            end: "bottom 30%",
          },
        },
      );
      tweens.push(tween);
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    const pageProgress = document.querySelector<HTMLElement>("[data-page-progress]");
    if (pageProgress) {
      const tween = gsap.fromTo(
        pageProgress,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left center",
          scrollTrigger: { scrub: 0.3, start: "top top", end: "bottom bottom" },
        },
      );
      tweens.push(tween);
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    }

    document.querySelectorAll<HTMLElement>("[data-process-step]").forEach((step) => {
      const tween = gsap.fromTo(
        step,
        { y: 36 },
        {
          y: 0,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: step,
            start: "top 88%",
            end: "top 58%",
            scrub: 0.5,
          },
        },
      );
      tweens.push(tween);
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    const ticker = document.querySelector<HTMLElement>("[data-ticker]");
    if (ticker) {
      tweens.push(
        gsap.to(ticker, {
          xPercent: -50,
          duration: 42,
          ease: "none",
          repeat: -1,
        }),
      );
    }

    document.querySelectorAll<HTMLElement>("[data-chapter]").forEach((section) => {
      const id = section.dataset.chapter;
      if (!id) return;
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (!self.isActive) return;
          document.querySelectorAll("[data-chapter-link]").forEach((link) => {
            link.classList.toggle("is-current", link.getAttribute("data-chapter-link") === id);
          });
        },
      });
      triggers.push(trigger);
    });

    document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
      const raw = el.dataset.count ?? el.textContent ?? "";
      const numeric = Number.parseFloat(raw.replace(/[^\d.]/g, ""));
      if (!Number.isFinite(numeric) || !/^[\d+\-−]/.test(raw)) return;
      const prefix = raw.startsWith("+") ? "+" : raw.startsWith("−") || raw.startsWith("-") ? "−" : "";
      const suffix = raw.replace(/^[+\-−\d.]+/, "");
      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: numeric,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true },
        onUpdate: () => {
          const rounded = numeric % 1 === 0 ? Math.round(obj.val) : obj.val.toFixed(1);
          el.textContent = `${prefix}${rounded}${suffix}`;
        },
      });
      tweens.push(tween);
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
      tweens.forEach((t) => t.kill());
      if (ticker) gsap.set(ticker, { clearProps: "transform" });
    };
  });

  const refresh = () => ScrollTrigger.refresh();
  window.addEventListener("load", refresh);
  void document.fonts?.ready.then(refresh);
}
