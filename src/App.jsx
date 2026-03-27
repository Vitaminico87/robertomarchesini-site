import { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ============================================================================
// ASSET CONFIGURATION
// ============================================================================
const ASSET_BASE = "https://robertomarchesini.com/assets/chapter1";
const ASSETS = {
  pratoFirstFrame: `${ASSET_BASE}/prato_first_frame.png`,
  pratoFull: `${ASSET_BASE}/pratofull.mp4`,
  discoverCrtCloseup: `${ASSET_BASE}/discover_crt_closeup.png`,
  libraryLoop: `${ASSET_BASE}/loopbiblioteca.mp4`,
  libraryFull: `${ASSET_BASE}/fullbiblioteca.mp4`,
};

// ============================================================================
// LANGUAGE STRINGS
// ============================================================================
const LANG = {
  it: {
    status: { listening: "Aphex Twin — Windowlicker", watching: "Il Petroliere", rating: 5, imdb: "https://www.imdb.com/title/tt0469494/" },
    statusLabel: { listening: "ascoltando", watching: "ultimo film" },
    hero: "Creatività, strategia e AI per brand che vogliono distinguersi davvero.",
    whatido: "Cosa faccio",
    services: [
      { title: "Create", desc: "Direzione creativa, identità visiva, contenuti. Do al tuo brand una voce chiara, un linguaggio coerente e un'estetica che non sembri presa in prestito." },
      { title: "Grow", desc: "Campagne paid, strategia di crescita, crescita del pubblico. Non inseguo metriche decorative: costruisco attenzione, risposta e risultati leggibili nei dati." },
      { title: "Evolve", desc: "AI nei flussi di lavoro, processi più rapidi, nuovi formati. Uso l'AI per aumentare qualità, velocità e possibilità creative — non per produrre contenuti generici più in fretta." },
      { title: "Teach", desc: "Workshop, onboarding, consulenza operativa. Aiuto team e professionisti a usare l'AI nel processo creativo con metodo, criterio e autonomia." },
    ],
    howLabel: "Come lavoro",
    method: [
      { title: "Sperimentare, non sfruttare", desc: "Mi interessa l'AI quando aumenta possibilità e qualità. Non quando serve a produrre di più abbassando il livello." },
      { title: "Standard alto, pipeline intelligenti", desc: "Produco visual, motion e contenuti con uno standard alto e un processo più leggero, rapido e controllato." },
      { title: "Decisioni basate sui dati", desc: "La creatività non vive fuori dalla realtà. Ogni scelta importante passa da analisi, test e lettura dei dati." },
    ],
    trashBtn: "Cestina", trashHover: "Fallo.",
    contactBtn: "Parliamo", contactHover: "Vediamo se ha senso.",
    hintDefault: "Questa pagina spiega il lavoro. Il resto è il motivo per cui lo faccio.",
    hintTrash: "Questa è la superficie. Sotto c'è una storia.",
    finally: "Finalmente.", realStory: "I servizi spiegano cosa faccio. Il resto spiega come ci sono arrivato.",
    backBtn: "← Torna alla pagina noiosa", or: "o",
    footerPiva: "P.IVA 10893121003", footerPrivacy: "Privacy Policy", init: "Inizializzazione",
    ghostPhases: {
      early: ["Elegante. Anche troppo.", "Il bello non basta."],
      mid: ["Sì ok, ma chi sei davvero?", "Quanta cura per non dire niente.", "Manca qualcosa, no?"],
      late: ["Tutto perfetto. Troppo perfetto.", "Il portfolio vero non è ancora iniziato.", "C'è una parte che qui non si vede.", "Provaci a cestinarlo.", "Non lo faresti mai.", "Quel bottone non serve a niente."]
    },
    // Chapter 1 strings
    ch1: {
      kicker: "Capitolo 1 · Origine",
      meadowIntro: "Ero un bambino isola. I libri erano oceani, e io ci annegavo volentieri.",
      discoverCopy: "Quel giorno, in biblioteca, c'era qualcosa che non avevo mai visto.",
      revealCopy: "Prima li trovavo nei libri. Poi ho scoperto che potevo entrarci.",
      stayBtn: "Resta nell'erba",
      toLibraryBtn: "Riportalo in biblioteca",
      approachBtn: "Avvicinati",
      backOffBtn: "Smetti di giocarci",
      continueBtn: "Continua",
      stayFeedback: "Sarei potuto restare lì.",
      profileTitle: "Profilo emerso",
      profileIdle: "Si aggiorna mentre il percorso prende forma.",
      profileCap: "Origine",
      profileHeadline: "Vede prima di riempire",
      profileSubcap: "traduzione operativa",
      profileBody: "osservazione, immaginazione strutturata",
      crossingKicker: "Attraversamento",
      crossingCopy: "Trova il varco.",
      crossingSubcopy: "Frecce / WASD o trascina.",
      crossingComplete: "Il sistema si apre.",
      backToSurface: "← Torna in superficie",
    }
  },
  en: {
    status: { listening: "Aphex Twin — Windowlicker", watching: "There Will Be Blood", rating: 5, imdb: "https://www.imdb.com/title/tt0469494/" },
    statusLabel: { listening: "listening to", watching: "last watched" },
    hero: "Creativity, strategy, and AI for brands that want to stand out for real.",
    whatido: "What I do",
    services: [
      { title: "Create", desc: "Creative direction, visual identity, content. I give your brand a clear voice, a coherent language, and an aesthetic that doesn't look borrowed." },
      { title: "Grow", desc: "Paid campaigns, growth strategy, audience growth. I don't chase decorative metrics — I build attention, response, and results you can read in the data." },
      { title: "Evolve", desc: "AI in your workflows, faster processes, new formats. I use AI to increase quality, speed, and creative possibilities — not to produce generic content faster." },
      { title: "Teach", desc: "Workshops, onboarding, hands-on consulting. I help teams and professionals use AI in the creative process with method, judgement, and autonomy." },
    ],
    howLabel: "How I work",
    method: [
      { title: "Experiment, don't exploit", desc: "I care about AI when it increases possibilities and quality. Not when it's used to produce more while lowering the standard." },
      { title: "High standard, smart pipelines", desc: "I produce visuals, motion, and content at a high standard with a lighter, faster, more controlled process." },
      { title: "Data-backed decisions", desc: "Creativity doesn't live outside reality. Every important choice goes through analysis, testing, and reading the data." },
    ],
    trashBtn: "Trash this", trashHover: "Do it.",
    contactBtn: "Let's talk", contactHover: "Let's see if it makes sense.",
    hintDefault: "This page explains the work. The rest is why I do it.",
    hintTrash: "This is the surface. There's a story underneath.",
    finally: "Finally.", realStory: "The services explain what I do. The rest explains how I got here.",
    backBtn: "← Back to the boring page", or: "or",
    footerPiva: "VAT IT10893121003", footerPrivacy: "Privacy Policy", init: "Initializing",
    ghostPhases: {
      early: ["Slick. Maybe too slick.", "Pretty isn't enough."],
      mid: ["Yeah but who are you, really?", "So much polish to say so little.", "Something's missing, no?"],
      late: ["All perfect. Too perfect.", "The real portfolio hasn't started yet.", "There's a part you can't see here.", "Go ahead, trash it.", "You wouldn't dare.", "That button does nothing."]
    },
    ch1: {
      kicker: "Chapter 1 · Origin",
      meadowIntro: "I was an island child. Books were oceans, and I drowned in them willingly.",
      discoverCopy: "That day, in the library, there was something I had never seen before.",
      revealCopy: "First I found them in books. Then I discovered I could enter them.",
      stayBtn: "Stay in the grass",
      toLibraryBtn: "Take him back to the library",
      approachBtn: "Get closer",
      backOffBtn: "Stop playing with it",
      continueBtn: "Continue",
      stayFeedback: "I could have stayed there.",
      profileTitle: "Emerging profile",
      profileIdle: "Updates as the path takes shape.",
      profileCap: "Origin",
      profileHeadline: "Sees before filling",
      profileSubcap: "operational translation",
      profileBody: "observation, structured imagination",
      crossingKicker: "Crossing",
      crossingCopy: "Find the gap.",
      crossingSubcopy: "Arrows / WASD or drag.",
      crossingComplete: "The system opens.",
      backToSurface: "← Back to surface",
    }
  },
};

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================
function GlitchText({ text, active }) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    const chars = "!@#$%^&*_+-=[]{}|<>?/~ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let f = 0;
    const iv = setInterval(() => {
      if (f >= 10) { clearInterval(iv); setDisplay(text); return; }
      setDisplay(text.split("").map(c => c === " " ? " " : Math.random() > .5 ? chars[Math.floor(Math.random() * chars.length)] : c).join(""));
      f++;
    }, 45);
    return () => clearInterval(iv);
  }, [active, text]);
  return <span>{display}</span>;
}

function useScrollReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ children, delay = 0 }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.6s ${delay}s ease-out, transform 0.6s ${delay}s ease-out`,
    }}>{children}</div>
  );
}

// ============================================================================
// GHOST LAYER (Stage-based system)
// ============================================================================
function GhostLayer({ ghostPhases, active, scrollProgress }) {
  const [current, setCurrent] = useState(null);
  const [animPhase, setAnimPhase] = useState("idle");
  const [shownIndices, setShownIndices] = useState({ early: 0, mid: 0, late: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const timers = useRef([]);
  const scrollRef = useRef(scrollProgress);
  const isRunning = useRef(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => { scrollRef.current = scrollProgress; }, [scrollProgress]);

  const getStage = (progress) => {
    if (progress < 0.25) return "early";
    if (progress < 0.60) return "mid";
    return "late";
  };

  const getStageConfig = (mobile) => ({
    early: { opacity: mobile ? 0.7 : 0.55, duration: mobile ? 3000 : 2500, yRange: mobile ? [55, 65] : [45, 55] },
    mid: { opacity: mobile ? 0.75 : 0.6, duration: mobile ? 3200 : 2800, yRange: mobile ? [60, 70] : [55, 68] },
    late: { opacity: mobile ? 0.8 : 0.65, duration: mobile ? 3500 : 3000, yRange: mobile ? [65, 78] : [65, 80] }
  });

  useEffect(() => {
    return () => { timers.current.forEach(clearTimeout); isRunning.current = false; };
  }, []);

  useEffect(() => {
    if (!active || animPhase !== "idle" || isRunning.current) return;
    isRunning.current = true;
    const baseDelay = isMobile ? 2500 : 1800;
    const randomDelay = isMobile ? 1500 : 1200;
    const delay = baseDelay + Math.random() * randomDelay;
    
    const t1 = setTimeout(() => {
      const currentStage = getStage(scrollRef.current);
      const phrases = ghostPhases[currentStage];
      const stageConfig = getStageConfig(isMobile);
      const config = stageConfig[currentStage];
      
      if (!phrases || phrases.length === 0) { isRunning.current = false; return; }

      const idx = shownIndices[currentStage] % phrases.length;
      const text = phrases[idx];
      const side = isMobile ? "center" : (idx % 2 === 0 ? "right" : "left");
      const [yMin, yMax] = config.yRange;
      const yPct = yMin + Math.random() * (yMax - yMin);
      
      setCurrent({ text, side, yPct, key: Date.now(), opacity: config.opacity, stage: currentStage, isMobile });
      setAnimPhase("show");
      setShownIndices(prev => ({ ...prev, [currentStage]: prev[currentStage] + 1 }));
      
      const t2 = setTimeout(() => {
        setAnimPhase("fade");
        const t3 = setTimeout(() => { setCurrent(null); setAnimPhase("idle"); isRunning.current = false; }, 800);
        timers.current.push(t3);
      }, config.duration);
      timers.current.push(t2);
    }, delay);
    timers.current.push(t1);
  }, [active, animPhase, ghostPhases, isMobile]);

  if (!current) return null;
  const show = animPhase === "show";
  const fade = animPhase === "fade";
  const isLate = current.stage === "late";
  const mobile = current.isMobile;
  const finalOpacity = fade ? 0 : show ? current.opacity : 0;
  const posStyle = mobile 
    ? { left: "50%", transform: fade ? "translateX(-50%) translateY(-14px)" : show ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(6px)" }
    : current.side === "left" ? { left: "4%" } : { right: "4%" };

  return (
    <div key={current.key} className={`ghost-phrase ${mobile ? 'ghost-mobile' : ''}`} style={{
      position: "fixed", top: current.yPct + "%", ...posStyle, zIndex: 100, pointerEvents: "none",
      opacity: finalOpacity,
      transform: mobile ? posStyle.transform : (fade ? "translateY(-14px)" : show ? "translateY(0)" : "translateY(6px)"),
      transition: fade ? "all 1s ease-out" : "all 0.35s ease-out",
      filter: fade ? "blur(2px)" : "none",
      fontFamily: "'Playfair Display',serif", fontStyle: "italic", 
      fontSize: mobile ? 15 : (isLate ? 16 : 15),
      color: mobile ? "#aaa" : (isLate ? "#999" : "#888"),
      letterSpacing: isLate ? 0.4 : 0.3,
      whiteSpace: "normal", maxWidth: mobile ? "90vw" : "min(320px, 80vw)",
      textAlign: "center", padding: mobile ? "10px 18px" : "0 1rem",
      background: mobile ? "rgba(5,5,5,0.9)" : "transparent",
      borderRadius: mobile ? "4px" : "0",
    }}>
      {current.text}
    </div>
  );
}

// ============================================================================
// CHAPTER 1 COMPONENTS
// ============================================================================
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function Ch1ChoiceButton({ children, subtle = false, disabled = false, onClick }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}
      className={`ch1-choice ${subtle ? 'ch1-choice-subtle' : ''}`}>
      {children}
    </button>
  );
}

function Ch1ProfilePanel({ unlocked, T }) {
  return (
    <div className="ch1-profile">
      <div className="ch1-profile-title">{T.profileTitle}</div>
      {!unlocked ? (
        <div className="ch1-profile-idle">{T.profileIdle}</div>
      ) : (
        <div className="ch1-profile-card">
          <div className="ch1-profile-cap">{T.profileCap}</div>
          <div className="ch1-profile-headline">{T.profileHeadline}</div>
          <div className="ch1-profile-subcap">{T.profileSubcap}</div>
          <div className="ch1-profile-body">{T.profileBody}</div>
        </div>
      )}
    </div>
  );
}

function Ch1CrossingField({ onComplete, T }) {
  const frameRef = useRef(null);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const keysRef = useRef(new Set());
  const [cursor, setCursor] = useState({ x: 44, y: 190 });
  const [completed, setCompleted] = useState(false);
  const [passed, setPassed] = useState([false, false, false]);

  const gates = useMemo(() => [
    { x: 170, gapY: 88, gapH: 62 },
    { x: 320, gapY: 156, gapH: 54 },
    { x: 480, gapY: 108, gapH: 46 },
  ], []);

  const frame = { width: 640, height: 480 };
  const cursorSize = 12;
  const speed = 145;

  const resolvePosition = useCallback((nextX, nextY) => {
    let x = clamp(nextX, 18, frame.width - 18 - cursorSize);
    let y = clamp(nextY, 18, frame.height - 18 - cursorSize);
    for (let i = 0; i < gates.length; i += 1) {
      const gate = gates[i];
      const barrierWidth = 16;
      const cursorBox = { left: x, right: x + cursorSize, top: y, bottom: y + cursorSize };
      const barrierBox = { left: gate.x, right: gate.x + barrierWidth, top: 26, bottom: frame.height - 26 };
      const collidesHorizontally = cursorBox.right > barrierBox.left && cursorBox.left < barrierBox.right;
      const inGap = cursorBox.top > gate.gapY && cursorBox.bottom < gate.gapY + gate.gapH;
      if (collidesHorizontally && !inGap) {
        if (cursor.x + cursorSize <= barrierBox.left) x = barrierBox.left - cursorSize - 3;
        else if (cursor.x >= barrierBox.right) x = barrierBox.right + 3;
      }
    }
    return { x, y };
  }, [cursor.x, cursorSize, frame.height, frame.width, gates]);

  useEffect(() => {
    const onKeyDown = (e) => {
      const valid = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'];
      if (!valid.includes(e.key)) return;
      e.preventDefault();
      keysRef.current.add(e.key.toLowerCase());
    };
    const onKeyUp = (e) => keysRef.current.delete(e.key.toLowerCase());
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => { window.removeEventListener('keydown', onKeyDown); window.removeEventListener('keyup', onKeyUp); };
  }, []);

  useEffect(() => {
    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      if (!completed) {
        let dx = 0, dy = 0;
        const keys = keysRef.current;
        if (keys.has('arrowleft') || keys.has('a')) dx -= 1;
        if (keys.has('arrowright') || keys.has('d')) dx += 1;
        if (keys.has('arrowup') || keys.has('w')) dy -= 1;
        if (keys.has('arrowdown') || keys.has('s')) dy += 1;
        if (dx !== 0 || dy !== 0) {
          const length = Math.hypot(dx, dy) || 1;
          const next = resolvePosition(cursor.x + (dx / length) * speed * dt, cursor.y + (dy / length) * speed * dt);
          setCursor(next);
        }
      }
      rafRef.current = window.requestAnimationFrame(tick);
    };
    rafRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafRef.current);
  }, [completed, cursor.x, cursor.y, resolvePosition]);

  useEffect(() => {
    const nextPassed = gates.map((gate) => cursor.x + cursorSize > gate.x + 16);
    if (JSON.stringify(nextPassed) !== JSON.stringify(passed)) setPassed(nextPassed);
    if (!completed && nextPassed.every(Boolean)) {
      setCompleted(true);
      window.setTimeout(() => onComplete?.(), 900);
    }
  }, [completed, cursor.x, cursorSize, gates, onComplete, passed]);

  const handlePointerMove = useCallback((e) => {
    if (!frameRef.current || completed || (e.buttons !== 1 && e.pointerType !== 'touch')) return;
    const rect = frameRef.current.getBoundingClientRect();
    const scaleX = frame.width / rect.width;
    const scaleY = frame.height / rect.height;
    const targetX = (e.clientX - rect.left) * scaleX - cursorSize / 2;
    const targetY = (e.clientY - rect.top) * scaleY - cursorSize / 2;
    setCursor(resolvePosition(targetX, targetY));
  }, [completed, cursorSize, frame.height, frame.width, resolvePosition]);

  const handlePointerDown = useCallback((e) => {
    if (!frameRef.current || completed) return;
    const rect = frameRef.current.getBoundingClientRect();
    const scaleX = frame.width / rect.width;
    const scaleY = frame.height / rect.height;
    const targetX = (e.clientX - rect.left) * scaleX - cursorSize / 2;
    const targetY = (e.clientY - rect.top) * scaleY - cursorSize / 2;
    setCursor(resolvePosition(targetX, targetY));
  }, [completed, cursorSize, frame.height, frame.width, resolvePosition]);

  return (
    <div className="ch1-crossing-wrap">
      <div className="ch1-crossing-kicker">{T.crossingKicker}</div>
      <div ref={frameRef} className="ch1-crossing-frame" onPointerDown={handlePointerDown} onPointerMove={handlePointerMove}>
        <div className="ch1-crossing-noise" />
        {gates.map((gate, index) => (
          <div key={gate.x}>
            <div className={`ch1-gate ${passed[index] ? 'is-passed' : ''}`} style={{ left: `${gate.x / frame.width * 100}%` }}>
              <div className="ch1-gate-top" style={{ height: `${gate.gapY / frame.height * 100}%` }} />
              <div className="ch1-gate-bottom" style={{ top: `${(gate.gapY + gate.gapH) / frame.height * 100}%`, height: `${(frame.height - 26 - (gate.gapY + gate.gapH)) / frame.height * 100}%` }} />
            </div>
            <div className="ch1-gate-mark" style={{ left: `${gate.x / frame.width * 100}%` }} />
          </div>
        ))}
        <div className={`ch1-cursor ${completed ? 'is-done' : ''}`} style={{ left: `${cursor.x / frame.width * 100}%`, top: `${cursor.y / frame.height * 100}%` }} />
        <div className="ch1-crossing-copy">
          <div>{T.crossingCopy}</div>
          <div className="ch1-crossing-subcopy">{T.crossingSubcopy}</div>
        </div>
        {completed && (
          <div className="ch1-crossing-complete">
            <div className="ch1-crossing-complete-line">{T.crossingComplete}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function ChapterOne({ T, onBack, onRequestChapterTwo }) {
  const meadowVideoRef = useRef(null);
  const libraryLoopRef = useRef(null);
  const libraryFullRef = useRef(null);
  const discoverDelayRef = useRef(null);
  const revealTimeoutRef = useRef(null);
  const hideRevealTimeoutRef = useRef(null);

  const [scene, setScene] = useState('meadow');
  const [showMeadowFeedback, setShowMeadowFeedback] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [activated, setActivated] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [hideReveal, setHideReveal] = useState(false);
  const [profileUnlocked, setProfileUnlocked] = useState(false);
  const [showCrossing, setShowCrossing] = useState(false);
  const [crossingDone, setCrossingDone] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  // Unlock audio on first user interaction
  const unlockAudio = useCallback(() => {
    if (!audioUnlocked) setAudioUnlocked(true);
  }, [audioUnlocked]);

  const syncVideoAudio = useCallback((video, { loop = false, visible = true, muted = true } = {}) => {
    if (!video) return;
    video.loop = loop;
    video.muted = muted;
    video.playsInline = true;
    video.preload = 'auto';
    video.style.display = visible ? 'block' : 'none';
    if (visible) { const p = video.play(); if (p?.catch) p.catch(() => {}); }
    else video.pause();
  }, []);

  useEffect(() => {
    const meadow = meadowVideoRef.current;
    if (meadow) syncVideoAudio(meadow, { loop: true, visible: scene === 'meadow' });
  }, [scene, syncVideoAudio]);

  useEffect(() => {
    const loopVideo = libraryLoopRef.current;
    const fullVideo = libraryFullRef.current;
    if (!loopVideo || !fullVideo) return;
    if (scene === 'library') {
      if (!activated) {
        syncVideoAudio(loopVideo, { loop: true, visible: true, muted: !audioUnlocked });
        fullVideo.pause(); fullVideo.currentTime = 0; fullVideo.style.display = 'none';
      } else {
        loopVideo.pause(); loopVideo.style.display = 'none';
        syncVideoAudio(fullVideo, { loop: false, visible: true, muted: !audioUnlocked });
      }
    } else {
      loopVideo.pause(); fullVideo.pause();
      loopVideo.style.display = 'none'; fullVideo.style.display = 'none';
    }
  }, [activated, scene, syncVideoAudio, audioUnlocked]);

  useEffect(() => {
    if (scene !== 'discover') { setShowApproach(false); if (discoverDelayRef.current) clearTimeout(discoverDelayRef.current); return; }
    discoverDelayRef.current = setTimeout(() => setShowApproach(true), 1050);
    return () => { if (discoverDelayRef.current) clearTimeout(discoverDelayRef.current); };
  }, [scene]);

  useEffect(() => {
    const fullVideo = libraryFullRef.current;
    if (!fullVideo) return;
    const onEnded = () => { setShowCrossing(true); setScene('crossing'); };
    fullVideo.addEventListener('ended', onEnded);
    return () => fullVideo.removeEventListener('ended', onEnded);
  }, []);

  useEffect(() => {
    return () => {
      if (discoverDelayRef.current) clearTimeout(discoverDelayRef.current);
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
      if (hideRevealTimeoutRef.current) clearTimeout(hideRevealTimeoutRef.current);
    };
  }, []);

  const handleStay = useCallback(() => {
    unlockAudio();
    setShowMeadowFeedback(true);
    setTimeout(() => setShowMeadowFeedback(false), 2000);
  }, [unlockAudio]);

  const handleToDiscover = useCallback(() => { unlockAudio(); setScene('discover'); }, [unlockAudio]);
  const handleApproach = useCallback(() => { unlockAudio(); setScene('library'); }, [unlockAudio]);
  
  const handleBackOff = useCallback(() => {
    if (activated) return;
    unlockAudio();
    setShowReveal(false);
    setScene('discover');
  }, [activated, unlockAudio]);

  const handleContinue = useCallback(() => {
    if (activated) return;
    unlockAudio();
    setActivated(true);
    setShowReveal(true);
    revealTimeoutRef.current = setTimeout(() => {
      setProfileUnlocked(true);
      const fullVideo = libraryFullRef.current;
      if (fullVideo) fullVideo.currentTime = 0;
    }, 450);
    // Nascondi la frase dopo 1.5s quando il video full è partito
    hideRevealTimeoutRef.current = setTimeout(() => {
      setHideReveal(true);
    }, 1500);
  }, [activated, unlockAudio]);

  const handleCrossingComplete = useCallback(() => {
    setCrossingDone(true);
    onRequestChapterTwo?.();
  }, [onRequestChapterTwo]);

  const showMeadowControls = scene === 'meadow';
  const showDiscoverControls = scene === 'discover';
  const showLibraryControls = scene === 'library' && !activated;

  return (
    <div className="ch1-root">
      <div className="ch1-wrap">
        <div className="ch1-top">
          <div className="ch1-kicker">{T.kicker}</div>
          <button className="ch1-back-btn" onClick={onBack}>{T.backToSurface}</button>
        </div>

        {!showCrossing ? (
          <>
            <div className="ch1-stage">
              <div className="ch1-scan" />

              <section className={`ch1-scene ${scene === 'meadow' ? 'active' : ''}`}>
                <img className="ch1-fill" src={ASSETS.pratoFirstFrame} alt="" />
                <video ref={meadowVideoRef} className="ch1-fill ch1-grass-loop" src={ASSETS.pratoFull} autoPlay loop muted playsInline preload="auto" />
                <div className="ch1-meadow-shade" />
                <div className="ch1-line-block">
                  <div className="ch1-line">{T.meadowIntro}</div>
                </div>
                <div className={`ch1-stay-feedback ${showMeadowFeedback ? 'show' : ''}`}>
                  {T.stayFeedback}
                </div>
              </section>

              <section className={`ch1-scene ${scene === 'discover' ? 'active' : ''}`}>
                <img className="ch1-fill" src={ASSETS.discoverCrtCloseup} alt="" />
                <div className="ch1-discover-overlay" />
                <div className="ch1-line-block">
                  <div className="ch1-line">{T.discoverCopy}</div>
                </div>
              </section>

              <section className={`ch1-scene ${scene === 'library' ? 'active' : ''}`}>
                <video ref={libraryLoopRef} className="ch1-fill" src={ASSETS.libraryLoop} autoPlay loop muted playsInline preload="auto" />
                <video ref={libraryFullRef} className="ch1-fill" src={ASSETS.libraryFull} muted playsInline preload="auto" style={{ display: 'none' }} />
                <div className="ch1-library-glow" />
                <div className={`ch1-line-block ch1-reveal ${showReveal && !hideReveal ? 'show' : ''}`}>
                  <div className="ch1-line">{T.revealCopy}</div>
                </div>
              </section>
            </div>

            {showMeadowControls && (
              <div className="ch1-controls">
                <Ch1ChoiceButton onClick={handleStay}>{T.stayBtn}</Ch1ChoiceButton>
                <Ch1ChoiceButton onClick={handleToDiscover}>{T.toLibraryBtn}</Ch1ChoiceButton>
              </div>
            )}

            {showDiscoverControls && (
              <div className="ch1-controls">
                {showApproach && <Ch1ChoiceButton onClick={handleApproach}>{T.approachBtn}</Ch1ChoiceButton>}
              </div>
            )}

            {showLibraryControls && (
              <div className="ch1-controls">
                <Ch1ChoiceButton subtle onClick={handleBackOff}>{T.backOffBtn}</Ch1ChoiceButton>
                <Ch1ChoiceButton onClick={handleContinue}>{T.continueBtn}</Ch1ChoiceButton>
              </div>
            )}

            <Ch1ProfilePanel unlocked={profileUnlocked} T={T} />
          </>
        ) : (
          <>
            <Ch1CrossingField onComplete={handleCrossingComplete} T={T} />
            <Ch1ProfilePanel unlocked={true} T={T} />
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// FALLING WORDS GENERATOR
// ============================================================================
function genFallingWords(t) {
  const all = ["Roberto", "Marchesini", "Creative", "Director", "AI", "Systems",
    ...t.hero.split(/\s+/),
    ...t.services.flatMap(s => [s.title, ...s.desc.split(/\s+/).slice(0, 5)]),
    ...t.method.flatMap(m => [...m.title.split(/\s+/), ...m.desc.split(/\s+/).slice(0, 3)]),
    t.trashBtn, t.contactBtn];
  const u = [...new Set(all)].filter(w => w.length > 1).slice(0, 55);
  const special = ["Roberto", "Marchesini", "Create", "Grow", "Evolve", "Teach"];
  return u.map((w, i) => ({
    text: w, x: 5 + Math.random() * 85, y: 5 + (i / u.length) * 80,
    del: Math.random() * .7, dur: .7 + Math.random() * .5, rot: (Math.random() - .5) * 50,
    size: special.includes(w) ? 22 : (w.length > 8 ? 11 : 13),
    color: ["Roberto", "Marchesini"].includes(w) ? "#F0ECE6" : ["Create", "Grow", "Evolve", "Teach"].includes(w) ? "#FF4D00" : "#666",
    serif: special.includes(w), bold: special.includes(w), italic: ["Create", "Grow", "Evolve", "Teach"].includes(w),
  }));
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function Roberto() {
  const [lang, setLang] = useState("it");
  const [phase, setPhase] = useState("loading");
  const [glitch, setGlitch] = useState(false);
  const [progress, setProgress] = useState(0);
  const [hoverTrash, setHoverTrash] = useState(false);
  const [trashScale, setTrashScale] = useState(1);
  const [hoverContact, setHoverContact] = useState(false);
  const [hoverBlog, setHoverBlog] = useState(false);
  const [flicker, setFlicker] = useState(false);
  const [blackout, setBlackout] = useState(false);
  const [falling, setFalling] = useState(false);
  const [fallingWords, setFallingWords] = useState([]);
  const [contentFading, setContentFading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [ghostReady, setGhostReady] = useState(false);
  const timeOnPage = useRef(0);
  const hasScrolled = useRef(false);

  const T = LANG[lang];

  // Loading
  useEffect(() => {
    const iv = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(iv); setTimeout(() => { setFlicker(true); setTimeout(() => { setPhase("main"); setFlicker(false); }, 200); }, 400); return 100; }
        return p + Math.random() * 12 + 3;
      });
    }, 90);
    return () => clearInterval(iv);
  }, []);

  // Glitch on main
  useEffect(() => { if (phase === "main") { setGlitch(true); setTimeout(() => setGlitch(false), 600); } }, [phase]);

  // Rare random flicker
  useEffect(() => {
    if (phase !== "main" && phase !== "game") return;
    const iv = setInterval(() => { if (Math.random() > .93) { setFlicker(true); setTimeout(() => setFlicker(false), 50 + Math.random() * 80); } }, 5000);
    return () => clearInterval(iv);
  }, [phase]);

  // Smart ghost trigger
  useEffect(() => {
    if (phase !== "main" || ghostReady) return;
    const timeInterval = setInterval(() => {
      timeOnPage.current += 100;
      if (timeOnPage.current >= 3000 && hasScrolled.current && !ghostReady) {
        setTimeout(() => setGhostReady(true), 1500);
        clearInterval(timeInterval);
      }
    }, 100);
    return () => clearInterval(timeInterval);
  }, [phase, ghostReady]);

  // Scroll tracking
  useEffect(() => {
    if (phase !== "main") return;
    const fn = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      if (scrollY > 20) { hasScrolled.current = true; setScrolled(true); }
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [phase]);

  // Trash button grow
  useEffect(() => {
    if (!hoverTrash) { setTrashScale(1); return; }
    let s = 1;
    const iv = setInterval(() => { s += .007; if (s > 1.3) s = 1.3; setTrashScale(s); }, 30);
    return () => clearInterval(iv);
  }, [hoverTrash]);

  const switchLang = useCallback(() => {
    setBlackout(true);
    setTimeout(() => { setLang(l => l === "it" ? "en" : "it"); }, 200);
    setTimeout(() => { setBlackout(false); setGlitch(true); setTimeout(() => setGlitch(false), 500); }, 400);
  }, []);

  const handleTrash = () => {
    setFallingWords(genFallingWords(T));
    setFalling(true);
    setContentFading(true);
    setTimeout(() => { setFalling(false); setPhase("trashed"); }, 2000);
    setTimeout(() => setPhase("game"), 4000);
  };

  const handleBack = () => {
    setFalling(false); setFallingWords([]); setContentFading(false);
    setPhase("main"); setGlitch(true); setTimeout(() => setGlitch(false), 500);
    // Reset ghost system
    setGhostReady(false);
    timeOnPage.current = 0;
    hasScrolled.current = false;
  };

  const openContact = () => window.open("mailto:info@robertomarchesini.com", "_blank");

  return (
    <div style={{ background: "#050505", minHeight: "100vh", color: "#E8E4DE", fontFamily: "'IBM Plex Mono','Courier New',monospace", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::selection{background:#FF4D00;color:#050505}
        @keyframes scanbeam{0%{transform:translateY(-100vh)}100%{transform:translateY(100vh)}}
        @keyframes glowPulse{0%,100%{box-shadow:0 0 15px rgba(255,77,0,.12)}50%{box-shadow:0 0 35px rgba(255,77,0,.25)}}
        @keyframes nameGlow{0%,100%{text-shadow:0 0 30px rgba(255,77,0,.04)}50%{text-shadow:0 0 50px rgba(255,77,0,.08)}}
        @keyframes trashPulse{0%,100%{box-shadow:0 0 0 rgba(255,77,0,0)}50%{box-shadow:0 0 12px rgba(255,77,0,.12)}}
        @keyframes fall{0%{transform:translateY(0) rotate(0deg);opacity:1}15%{opacity:1}100%{transform:translateY(105vh) rotate(var(--rot,20deg));opacity:0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes appear{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
        .svc{padding:22px 24px;border:1px solid #141414;border-radius:4px;transition:all .3s;cursor:default}
        .svc:hover{border-color:rgba(255,77,0,.35);background:rgba(255,77,0,.02)}
        .svc:hover .svc-t{color:#FF4D00!important;text-shadow:0 0 15px rgba(255,77,0,.12)}
        .mth{padding-left:16px;border-left:2px solid #161616;transition:all .25s;cursor:default}
        .mth:hover{border-left-color:#FF4D00;padding-left:20px}
        .mth:hover .mth-t{color:#FF4D00!important}
        .btn-trash{padding:16px 38px;background:transparent;border:1px solid #FF4D00;color:#FF4D00;font-size:12px;font-family:'IBM Plex Mono',monospace;letter-spacing:2.5px;cursor:pointer;text-transform:uppercase;font-weight:500;animation:trashPulse 3s ease-in-out infinite;transition:background .2s,color .2s}
        .btn-talk{padding:16px 38px;background:transparent;border:1px solid #444;color:#AAA;font-size:12px;font-family:'IBM Plex Mono',monospace;letter-spacing:2.5px;cursor:pointer;text-transform:uppercase;font-weight:500;transition:all .25s}
        .btn-talk:hover{background:#E8E4DE;color:#050505;border-color:#E8E4DE;box-shadow:0 0 20px rgba(232,228,222,.12)}
        .fl-word{position:absolute;white-space:nowrap;opacity:0}
        .fl-word.go{animation:fall var(--dur) var(--del) ease-in forwards}
        .top-btn{background:transparent;border:1px solid #161616;border-radius:3px;padding:5px 12px;cursor:pointer;transition:all .25s;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1px;color:#333}
        .top-btn:hover{border-color:rgba(255,77,0,.4);color:#FF4D00}
        .foot-l{transition:color .2s;cursor:pointer;color:#444}
        .foot-l:hover{color:#888}
        .ghost-phrase{line-height:1.5}
        .ghost-mobile{text-align:center}
        .crt-vignette{box-shadow:inset 0 0 130px 70px rgba(0,0,0,.7), inset 0 0 40px 15px rgba(0,0,0,.35)}
        
        /* Chapter 1 styles */
        .ch1-root{min-height:100vh;background:#050505;color:#ece7de;font-family:"IBM Plex Mono",monospace;display:flex;align-items:center;justify-content:center;padding:24px}
        .ch1-wrap{width:min(92vw,880px);display:flex;flex-direction:column;align-items:center}
        .ch1-top{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:14px}
        .ch1-kicker{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,77,0,.72)}
        .ch1-back-btn{background:transparent;border:1px solid #222;border-radius:3px;padding:5px 12px;cursor:pointer;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1px;color:#444;transition:all .25s}
        .ch1-back-btn:hover{border-color:rgba(255,77,0,.4);color:#FF4D00}
        .ch1-stage{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:8px;border:1px solid #161616;background:#0b0f12;box-shadow:0 0 0 1px rgba(255,255,255,.02),0 30px 70px rgba(0,0,0,.35)}
        .ch1-scene{position:absolute;inset:0;opacity:0;pointer-events:none;transition:opacity .35s ease}
        .ch1-scene.active{opacity:1;pointer-events:auto}
        .ch1-label{position:absolute;left:18px;top:16px;z-index:8;font-size:10px;letter-spacing:2.6px;text-transform:uppercase;color:rgba(232,228,222,.56)}
        .ch1-scan{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.055) 2px,rgba(0,0,0,.055) 4px);z-index:10;opacity:.35;pointer-events:none}
        .ch1-stage img,.ch1-stage video{display:block;width:100%;height:100%;object-fit:cover}
        .ch1-fill{position:absolute;inset:0;z-index:1}
        .ch1-grass-loop{clip-path:inset(72% 0 0 0);z-index:2;pointer-events:none}
        .ch1-meadow-shade{position:absolute;inset:0;background:linear-gradient(to bottom,rgba(0,0,0,.02),rgba(0,0,0,.08));z-index:3}
        .ch1-stay-feedback{position:absolute;right:22px;top:22px;z-index:9;font-size:11px;color:rgba(220,231,222,.6);font-family:Georgia,serif;font-style:italic;opacity:0;transform:translateY(-8px);transition:opacity .4s ease,transform .4s ease}
        .ch1-stay-feedback.show{opacity:1;transform:translateY(0)}
        .ch1-discover-overlay{position:absolute;inset:0;z-index:3;background:linear-gradient(180deg,rgba(5,8,10,.18),rgba(5,8,10,.28))}
        .ch1-line-block{position:absolute;left:22px;right:22px;bottom:26px;z-index:8;max-width:560px;border-top:1px solid rgba(167,203,216,.18);padding-top:12px}
        .ch1-line-block.ch1-reveal{opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .45s ease}
        .ch1-line-block.ch1-reveal.show{opacity:1;transform:translateY(0)}
        .ch1-line{color:#dce7de;font-family:Georgia,serif;font-style:italic;font-size:clamp(18px,2.2vw,26px);line-height:1.3}
        .ch1-library-glow{position:absolute;inset:0;z-index:3;background:radial-gradient(circle at 19% 71%,rgba(167,203,216,.13),transparent 18%);opacity:.65}
        .ch1-feedback{position:absolute;left:22px;right:22px;bottom:22px;z-index:8;max-width:420px;border-top:1px solid rgba(167,203,216,.18);padding-top:12px;opacity:0;transform:translateY(10px);transition:opacity .25s ease,transform .25s ease}
        .ch1-feedback.show{opacity:1;transform:translateY(0)}
        .ch1-controls{width:100%;display:grid;gap:10px;margin-top:14px}
        .ch1-choice{width:100%;text-align:left;padding:12px 14px;border-radius:8px;border:1px solid rgba(80,80,80,.72);background:rgba(0,0,0,.32);color:#f2eee6;font-family:inherit;font-size:12px;letter-spacing:.02em;backdrop-filter:blur(4px);cursor:pointer;transition:background .2s ease,border-color .2s ease}
        .ch1-choice-subtle{background:rgba(0,0,0,.2);color:#d0d0d0;border-color:rgba(90,90,90,.8)}
        .ch1-choice:hover{background:rgba(0,0,0,.48);border-color:rgba(255,77,0,.45)}
        .ch1-choice:disabled{opacity:.48;cursor:default}
        .ch1-profile{width:100%;margin-top:18px;border-top:1px solid #161616;padding-top:18px}
        .ch1-profile-title{font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:#5c5c5c;margin-bottom:12px}
        .ch1-profile-idle{color:#666;font-size:12px;font-style:italic;font-family:Georgia,serif}
        .ch1-profile-card{display:grid;gap:7px;border:1px solid #1b1b1b;border-radius:8px;background:rgba(167,203,216,.035);padding:14px 16px}
        .ch1-profile-cap{color:#FF4D00;font-size:11px;letter-spacing:1.2px;text-transform:uppercase}
        .ch1-profile-headline{color:#ece7de;font-size:18px;font-family:Georgia,serif;font-style:italic;line-height:1.25}
        .ch1-profile-subcap{color:#6a6a6a;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px}
        .ch1-profile-body{color:#9a9a9a;font-size:12px;line-height:1.65}
        .ch1-crossing-wrap{width:100%;display:flex;flex-direction:column;gap:12px}
        .ch1-crossing-kicker{font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(232,228,222,.46)}
        .ch1-crossing-frame{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:8px;border:1px solid rgba(15,22,16,.72);background:linear-gradient(180deg,#d7e1b7 0%,#c5d090 46%,#b7c07f 100%);touch-action:none;user-select:none}
        .ch1-crossing-noise{position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.04) 3px,rgba(0,0,0,.04) 6px);opacity:.38}
        .ch1-gate,.ch1-gate-mark{position:absolute;top:0;bottom:0;width:16px;transform:translateX(-50%)}
        .ch1-gate-top,.ch1-gate-bottom{position:absolute;left:0;width:16px;background:rgba(8,12,8,.86)}
        .ch1-gate-top{top:0}
        .ch1-gate.is-passed .ch1-gate-top,.ch1-gate.is-passed .ch1-gate-bottom{opacity:.32}
        .ch1-gate-mark{border-left:1px solid rgba(8,12,8,.18)}
        .ch1-cursor{position:absolute;width:12px;height:12px;background:#090d08;transform:translate(-50%,-50%);box-shadow:0 0 0 1px rgba(8,12,8,.22)}
        .ch1-cursor.is-done{background:#050505;box-shadow:0 0 0 1px rgba(255,255,255,.18),0 0 12px rgba(255,255,255,.22)}
        .ch1-crossing-copy{position:absolute;left:18px;top:16px;z-index:5;display:grid;gap:5px;color:rgba(7,12,7,.78);font-size:12px}
        .ch1-crossing-subcopy{font-size:10px;letter-spacing:1.4px;text-transform:uppercase;color:rgba(7,12,7,.48)}
        .ch1-crossing-complete{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;z-index:6;background:rgba(215,225,183,.14);backdrop-filter:blur(2px)}
        .ch1-crossing-complete-line{color:#111611;font-family:Georgia,serif;font-style:italic;font-size:clamp(24px,2.8vw,32px)}
        
        @media(max-width:600px){
          .svc-in{flex-direction:column!important;gap:8px!important}
          .svc-tw{min-width:auto!important}
          .wrap{padding:60px 20px 40px!important}
          .nm{font-size:38px!important}
          .brow{flex-direction:column!important;gap:12px!important}
          .brow .orsep{display:none}
          .crt-vignette{box-shadow:inset 0 0 50px 25px rgba(0,0,0,.5),inset 0 0 20px 8px rgba(0,0,0,.25)!important}
          .ghost-phrase{font-size:11px!important}
          .ch1-root{padding:18px}
          .ch1-line-block,.ch1-feedback{left:16px;right:16px;bottom:18px}
          .ch1-top{flex-direction:column;align-items:flex-start;gap:8px}
        }
      `}</style>

      {/* CRT overlay - always visible */}
      <div className="crt-vignette" style={{ position: "fixed", inset: 0, zIndex: 80, pointerEvents: "none", borderRadius: 16 }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 81, pointerEvents: "none", background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,.1) 2px,rgba(0,0,0,.1) 4px)", opacity: .4 }} />
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 6, zIndex: 82, pointerEvents: "none", background: "linear-gradient(to bottom,transparent,rgba(255,77,0,.03),rgba(255,77,0,.08),rgba(255,77,0,.03),transparent)", animation: "scanbeam 3.5s linear infinite" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 79, pointerEvents: "none", background: "radial-gradient(ellipse at center,transparent 60%,rgba(255,50,0,.012) 80%,rgba(255,30,0,.03) 100%)" }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 78, pointerEvents: "none", background: "radial-gradient(ellipse at 0% 0%,rgba(0,0,0,.18) 0%,transparent 35%),radial-gradient(ellipse at 100% 0%,rgba(0,0,0,.18) 0%,transparent 35%),radial-gradient(ellipse at 0% 100%,rgba(0,0,0,.18) 0%,transparent 35%),radial-gradient(ellipse at 100% 100%,rgba(0,0,0,.18) 0%,transparent 35%)" }} />
      <div style={{ position: "fixed", inset: -1, zIndex: 77, pointerEvents: "none", border: "1.5px solid rgba(255,77,0,.025)", borderRadius: 18 }} />
      <div style={{ position: "fixed", inset: 0, zIndex: 83, pointerEvents: "none", opacity: flicker ? .3 : 0, background: "linear-gradient(90deg,rgba(255,0,0,.03) 33%,rgba(0,255,0,.03) 33% 66%,rgba(0,80,255,.03) 66%)", transition: "opacity .04s", mixBlendMode: "screen" }} />

      {/* Blackout for transitions */}
      <div style={{ position: "fixed", inset: 0, zIndex: 200, background: "#050505", opacity: blackout ? 1 : 0, pointerEvents: "none", transition: "opacity .15s" }} />

      {/* Ghost annotations */}
      {phase === "main" && <GhostLayer ghostPhases={T.ghostPhases} active={ghostReady} scrollProgress={scrollProgress} />}

      {/* Falling words */}
      {falling && (
        <div style={{ position: "fixed", inset: 0, zIndex: 70, pointerEvents: "none", overflow: "hidden" }}>
          {fallingWords.map((w, i) => (
            <div key={i} className="fl-word go" style={{
              left: `${w.x}%`, top: `${w.y}%`, fontSize: w.size, color: w.color,
              fontFamily: w.serif ? "'Playfair Display',serif" : "'IBM Plex Mono',monospace",
              fontWeight: w.bold ? 600 : 400, fontStyle: w.italic ? "italic" : "normal",
              "--dur": `${w.dur}s`, "--del": `${w.del}s`, "--rot": `${w.rot}deg`,
            }}>{w.text}</div>
          ))}
        </div>
      )}

      {/* Top bar */}
      {phase !== "loading" && phase !== "game" && !blackout && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 90, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", background: "linear-gradient(to bottom,rgba(5,5,5,.95),rgba(5,5,5,0))" }}>
          <button className="top-btn" onClick={() => window.location.href = "/blog"}
            onMouseEnter={() => setHoverBlog(true)} onMouseLeave={() => setHoverBlog(false)}>
            {hoverBlog ? "→ /blog" : ">_ blog"}
          </button>
          <button className="top-btn" onClick={switchLang}>{lang === "it" ? "EN" : "IT"}</button>
        </div>
      )}

      {/* LOADING */}
      {phase === "loading" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40 }}>
          <div style={{ fontSize: 10, letterSpacing: 5, color: "#2A2A2A", marginBottom: 28, textTransform: "uppercase" }}>{T.init}</div>
          <div style={{ width: 260, height: 1.5, background: "#0F0F0F", borderRadius: 1, overflow: "hidden" }}>
            <div style={{ width: `${Math.min(progress, 100)}%`, height: "100%", background: "#FF4D00", transition: "width .12s linear", boxShadow: "0 0 10px rgba(255,77,0,.5),0 0 4px rgba(255,77,0,.8)" }} />
          </div>
          <div style={{ fontSize: 10, color: "#1A1A1A", marginTop: 14, fontVariantNumeric: "tabular-nums", letterSpacing: 2 }}>{Math.min(Math.round(progress), 100)}%</div>
        </div>
      )}

      {/* MAIN */}
      {phase === "main" && (
        <div className="wrap" style={{
          maxWidth: 660, margin: "0 auto", padding: "72px 32px 40px",
          opacity: contentFading ? 0 : (flicker ? .85 : 1),
          transition: contentFading ? "opacity .6s ease-out" : "opacity .04s",
        }}>
          <Section delay={0.05}>
            <div style={{ marginBottom: 48 }}>
              <h1 className="nm" style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 700, lineHeight: 1.02, margin: "0 0 10px", color: "#F0ECE6", animation: "nameGlow 6s ease-in-out infinite" }}>
                <GlitchText text="Roberto" active={glitch} /><br />
                <GlitchText text="Marchesini" active={glitch} />
              </h1>
              <div style={{ fontSize: 14, color: "#666", fontWeight: 400, letterSpacing: 1.5, marginTop: 12 }}>Creative Director · AI Systems</div>
              <div style={{ fontSize: 13, color: "#999", marginTop: 16, lineHeight: 1.9, maxWidth: 520 }}>{T.hero}</div>
            </div>
          </Section>

          <Section delay={0.1}>
            <div style={{ height: 1, background: "linear-gradient(to right,#FF4D00 0%,rgba(255,77,0,.12) 45%,transparent 100%)", marginBottom: 48 }} />
          </Section>

          <Section delay={0.12}>
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#FF4D00", textTransform: "uppercase", marginBottom: 24, opacity: .6 }}>{T.whatido}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {T.services.map((svc, i) => (
                  <div key={i} className="svc">
                    <div className="svc-in" style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
                      <div className="svc-tw" style={{ minWidth: 105, flexShrink: 0 }}>
                        <span className="svc-t" style={{ fontSize: 28, fontWeight: 600, color: "#E8E4DE", fontFamily: "'Playfair Display',serif", fontStyle: "italic", transition: "all .25s" }}>
                          {svc.title}<span style={{ color: "#FF4D00", fontStyle: "normal" }}>.</span>
                        </span>
                      </div>
                      <div style={{ fontSize: 13, color: "#AAA", lineHeight: 1.85 }}>{svc.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section delay={0.15}>
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#FF4D00", textTransform: "uppercase", marginBottom: 20, opacity: .6 }}>{T.howLabel}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {T.method.map((m, i) => (
                  <div key={i} className="mth">
                    <div className="mth-t" style={{ fontSize: 12, fontWeight: 500, color: "#CCC", marginBottom: 3, transition: "all .2s", letterSpacing: .3 }}>{m.title}</div>
                    <div style={{ fontSize: 11, color: "#777", lineHeight: 1.7 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          <Section delay={0.18}>
            <div style={{ height: 1, background: "linear-gradient(to right,transparent,#1A1A1A,transparent)", marginBottom: 56 }} />
          </Section>

          <Section delay={0.2}>
            <div style={{ marginBottom: 8 }}>
              <div className="brow" style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "center" }}>
                <button className="btn-trash" onClick={handleTrash}
                  onMouseEnter={() => setHoverTrash(true)}
                  onMouseLeave={() => { setHoverTrash(false); setTrashScale(1); }}
                  onTouchStart={() => setHoverTrash(true)}
                  onTouchEnd={() => { setTimeout(() => { setHoverTrash(false); setTrashScale(1); }, 150); }}
                  style={{
                    transform: `scale(${trashScale})`,
                    transition: trashScale > 1.05 ? "none" : "transform .25s",
                    boxShadow: hoverTrash ? `0 0 ${18 + (trashScale - 1) * 70}px rgba(255,77,0,${.12 + (trashScale - 1) * .7})` : undefined,
                    animation: hoverTrash ? "none" : "trashPulse 3s ease-in-out infinite",
                  }}>
                  {hoverTrash ? T.trashHover : T.trashBtn}
                </button>
                <span className="orsep" style={{ fontSize: 11, color: "#222" }}>{T.or}</span>
                <button className="btn-talk" onClick={openContact}
                  onMouseEnter={() => setHoverContact(true)} onMouseLeave={() => setHoverContact(false)}>
                  {hoverContact ? T.contactHover : T.contactBtn}
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: 18, fontSize: 11, color: "#555", fontStyle: "italic", fontFamily: "'Playfair Display',serif", letterSpacing: .5 }}>
                {hoverTrash ? T.hintTrash : T.hintDefault}
              </div>
            </div>
          </Section>

          <div style={{
            borderTop: "1px solid #0F0F0F", padding: "24px 0 10px", marginTop: 72,
            display: "flex", justifyContent: "center", alignItems: "center", gap: 16, flexWrap: "wrap",
            fontSize: 10, letterSpacing: .8, fontFamily: "'IBM Plex Mono',monospace",
          }}>
            <span className="foot-l">{T.footerPiva}</span>
            <span style={{ color: "#1A1A1A" }}>·</span>
            <span className="foot-l">{T.footerPrivacy}</span>
            <span style={{ color: "#1A1A1A" }}>·</span>
            <span className="foot-l" onClick={openContact}>info@robertomarchesini.com</span>
          </div>
        </div>
      )}

      {/* TRASHED — transition */}
      {phase === "trashed" && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 40, animation: "fadeIn 1s ease-out" }}>
          <div style={{ fontSize: 38, marginBottom: 24, fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#FF4D00", textShadow: "0 0 50px rgba(255,77,0,.2)", letterSpacing: 1 }}>
            {T.finally}
          </div>
          <div style={{ fontSize: 13, color: "#666", letterSpacing: .5, textAlign: "center", lineHeight: 1.9, maxWidth: 380 }}>
            {T.realStory}
          </div>
          <div style={{ marginTop: 40, width: 50, height: 1.5, background: "#FF4D00", animation: "glowPulse 2s infinite", borderRadius: 1 }} />
        </div>
      )}

      {/* GAME — Chapter 1 */}
      {phase === "game" && (
        <ChapterOne 
          T={T.ch1} 
          onBack={handleBack}
          onRequestChapterTwo={() => {
            // Hook per capitolo 2
            console.log("Chapter 1 complete, ready for Chapter 2");
          }}
        />
      )}
    </div>
  );
}
