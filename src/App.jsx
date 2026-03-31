import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ============================================================================
// GAME TOGGLE - Set to true when the game is ready for launch
// ============================================================================
const GAME_ENABLED = true;

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
    hero: "Creatività, strategia e AI per costruire brand, lanci ed esperienze che funzionano.",
    heroSub: "Aiuto brand e progetti a diventare chiari, desiderabili e difficili da ignorare.",
    proofStrip: "Brand · Lanci · Sistemi AI",
    whatido: "Cosa faccio",
    services: [
      { title: "Position", subtitle: "Rendere chiaro cosa ti distingue", desc: "Definisco posizionamento, tono e messaggio, così un brand o un progetto smette di sembrare intercambiabile." },
      { title: "Shape", subtitle: "Dare forma visiva e narrativa alle idee", desc: "Costruisco identità, contenuti e direzione creativa con un linguaggio coerente, riconoscibile e vivo." },
      { title: "Launch", subtitle: "Portare un progetto nel mondo nel modo giusto", desc: "Lavoro su lanci, attivazioni ed esperienze per far arrivare un'idea con più chiarezza, forza e desiderabilità." },
      { title: "Build", subtitle: "Usare l'AI per creare meglio, non solo più in fretta", desc: "Progetto sistemi, flussi e nuovi formati che aumentano qualità, velocità e possibilità creative." },
    ],
    selectedWorkLabel: "Lavori scelti",
    selectedWorkSub: "Progetti reali, responsabilità vere, lavoro che ha dovuto reggere nel tempo.",
    selectedWork: [
      {
        title: "Largo Venue",
        period: "2019 – in corso",
        status: "active",
        narrative: "Creative direction e sistema di comunicazione per un venue con programmazione settimanale e oltre 150 eventi l'anno.",
        narrative2: "Identità, promozione e continuità editoriale costruite per reggere ritmo, varietà e riconoscibilità nel tempo. Oltre 1M di visualizzazioni mensili.",
        technical: "Identità · Promozione · Continuità editoriale",
        tags: ["Cultural venue", "Brand system", "Weekly execution"]
      },
      {
        title: "Notre Dame de Paris",
        period: "2012 – 2024",
        status: "completed",
        narrative: "Dodici anni di direzione creativa per comunicazione e contenuti digitali di uno dei live brand più riconoscibili in Italia.",
        narrative2: "Un sistema di contenuti costruito nel tempo, con un'audience cresciuta oltre 400K persone.",
        technical: "Direzione creativa · Contenuti · Crescita audience",
        tags: ["Live entertainment", "Brand narrative", "Digital experience"]
      },
      {
        title: "THEIA Events",
        period: "2025",
        status: "active",
        narrative: "Posizionamento premium, website direction e architettura digitale per un brand eventi orientato a credibilità e lead qualificati.",
        narrative2: "Un'identità più chiara, un tono più forte e una presenza digitale pensata per essere ricordata e contattata.",
        technical: "Posizionamento · Website · Architettura digitale",
        tags: ["Positioning", "Digital experience", "Lead architecture"]
      }
    ],
    howLabel: "Come lavoro",
    method: [
      { title: "Chiarezza prima del rumore", desc: "Ogni progetto parte da una domanda semplice: cosa deve essere capito, percepito o ricordato davvero?" },
      { title: "Standard alto, processi intelligenti", desc: "Uso l'AI per aumentare qualità, velocità e possibilità, non per abbassare il livello o riempire spazio." },
      { title: "Creatività che regge nella realtà", desc: "Le idee devono essere forti, ma anche leggibili per il pubblico, coerenti con il contesto e utili per chi le commissiona." },
    ],
    nowBuildingLabel: "",
    nowBuilding: "",
    availableFor: "Disponibile per collaborazioni selezionate.",
    ctaHint: "",
    trashBtn: "Cestina", trashHover: "Fallo.",
    contactBtn: "Parliamo", contactHover: "Vediamo se ha senso.",
    hintDefault: "Questa pagina spiega il lavoro. Il resto è il motivo per cui lo faccio.",
    hintTrash: "Questa è la superficie. Sotto c'è una storia.",
    finally: "Finalmente.", realStory: "I servizi spiegano cosa faccio. Il resto spiega come ci sono arrivato.",
    backBtn: "← Torna alla pagina noiosa", or: "o",
    footerPiva: "P.IVA 10893121003", footerPrivacy: "Privacy Policy", init: "Inizializzazione",
    comingSoonTitle: "In costruzione.",
    comingSoonSub: "Qui ci sarà qualcosa che vale la pena aspettare.",
    comingSoonHint: "Nel frattempo, la pagina noiosa dice già tutto quello che serve.",
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
    hero: "Creativity, strategy, and AI to build brands, launches, and experiences that work.",
    heroSub: "I help brands and projects become clearer, more desirable, and harder to ignore.",
    proofStrip: "Brand · Launches · AI Systems",
    whatido: "What I do",
    services: [
      { title: "Position", subtitle: "Make clear what sets you apart", desc: "I define positioning, tone, and message, so a brand or project stops looking interchangeable." },
      { title: "Shape", subtitle: "Give visual and narrative form to ideas", desc: "I build identity, content, and creative direction with a coherent, recognizable, and living language." },
      { title: "Launch", subtitle: "Bring a project into the world the right way", desc: "I work on launches, activations, and experiences to make an idea land with more clarity, strength, and desirability." },
      { title: "Build", subtitle: "Use AI to create better, not just faster", desc: "I design systems, workflows, and new formats that increase quality, speed, and creative possibilities." },
    ],
    selectedWorkLabel: "Selected Work",
    selectedWorkSub: "Real projects, real responsibilities, work that had to hold up over time.",
    selectedWork: [
      {
        title: "Largo Venue",
        period: "2019 – ongoing",
        status: "active",
        narrative: "Creative direction and communication system for a venue with weekly programming and over 150 events a year.",
        narrative2: "Identity, promotion, and editorial continuity built to sustain rhythm, variety, and recognizability over time. Over 1M monthly views.",
        technical: "Identity · Promotion · Editorial continuity",
        tags: ["Cultural venue", "Brand system", "Weekly execution"]
      },
      {
        title: "Notre Dame de Paris",
        period: "2012 – 2024",
        status: "completed",
        narrative: "Twelve years of creative direction for the communications and digital content of one of Italy's most recognizable live brands.",
        narrative2: "A content system built over time, with an audience grown to over 400K people.",
        technical: "Creative direction · Content · Audience growth",
        tags: ["Live entertainment", "Brand narrative", "Digital experience"]
      },
      {
        title: "THEIA Events",
        period: "2025",
        status: "active",
        narrative: "Premium positioning, website direction, and digital architecture for an event brand driven by credibility and qualified leads.",
        narrative2: "A clearer identity, a stronger tone, and a digital presence designed to be remembered and contacted.",
        technical: "Positioning · Website · Digital architecture",
        tags: ["Positioning", "Digital experience", "Lead architecture"]
      }
    ],
    howLabel: "How I work",
    method: [
      { title: "Clarity before noise", desc: "Every project starts from a simple question: what needs to be understood, perceived, or remembered?" },
      { title: "High standards, smart processes", desc: "I use AI to increase quality, speed, and possibilities — not to lower the bar or fill space." },
      { title: "Creativity that holds up in reality", desc: "Ideas need to be strong, but also readable for the audience, consistent with context, and useful for whoever commissions them." },
    ],
    nowBuildingLabel: "",
    nowBuilding: "",
    availableFor: "Available for selected collaborations.",
    ctaHint: "",
    trashBtn: "Trash this", trashHover: "Do it.",
    contactBtn: "Let's talk", contactHover: "Let's see if it makes sense.",
    hintDefault: "This page explains the work. The rest is why I do it.",
    hintTrash: "This is the surface. There's a story underneath.",
    finally: "Finally.", realStory: "The services explain what I do. The rest explains how I got here.",
    backBtn: "← Back to the boring page", or: "or",
    footerPiva: "VAT IT10893121003", footerPrivacy: "Privacy Policy", init: "Initializing",
    comingSoonTitle: "Under construction.",
    comingSoonSub: "Something worth waiting for is being built here.",
    comingSoonHint: "In the meantime, the boring page already says everything you need.",
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
    if (progress < 0.40) return "early";
    if (progress < 0.75) return "mid";
    return "late";
  };

  const getStageConfig = (mobile) => ({
    early: { opacity: mobile ? 0.6 : 0.45, duration: mobile ? 3500 : 3000, yRange: mobile ? [55, 65] : [45, 55] },
    mid: { opacity: mobile ? 0.65 : 0.5, duration: mobile ? 3800 : 3200, yRange: mobile ? [60, 70] : [55, 68] },
    late: { opacity: mobile ? 0.7 : 0.55, duration: mobile ? 4000 : 3500, yRange: mobile ? [65, 78] : [65, 80] }
  });

  useEffect(() => {
    return () => { timers.current.forEach(clearTimeout); isRunning.current = false; };
  }, []);

  useEffect(() => {
    if (!active || animPhase !== "idle" || isRunning.current) return;
    isRunning.current = true;
    const baseDelay = isMobile ? 5000 : 4000;
    const randomDelay = isMobile ? 3000 : 2500;
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

// Constants for ConnectionsCrossing - basate su bg 1600x1200
const CROSSING_BASE_W = 1600;
const CROSSING_BASE_H = 1200;
const CROSSING_ENTRY = { x: 110, y: 880 };
const CROSSING_EXIT = { x: 1750, y: 650 }; // Fuori schermo a destra
const CROSSING_NODES = [
  { x: 220, y: 860 },   // basso sinistra
  { x: 420, y: 820 },   // sale
  { x: 640, y: 770 },   // sale ancora  
  { x: 880, y: 750 },   // picco centrale
  { x: 1120, y: 780 },  // scende
  { x: 1320, y: 830 },  // scende ancora
];

// Difficoltà progressiva
const TIMING_DIFFICULTY = [
  { cycleDuration: 2800, targetWidth: 0.40 },
  { cycleDuration: 2600, targetWidth: 0.38 },
  { cycleDuration: 2400, targetWidth: 0.36 },
  { cycleDuration: 2200, targetWidth: 0.34 },
  { cycleDuration: 2000, targetWidth: 0.32 },
  { cycleDuration: 1800, targetWidth: 0.30 },
  { cycleDuration: 1600, targetWidth: 0.35 },
];

// Intensità effetti per salto (0-5)
const LANDING_INTENSITY = [
  { flash: 0.3, shake: 0, breath: 1.005, saturation: 1.0 },   // Salto 1 - sottile
  { flash: 0.4, shake: 0, breath: 1.008, saturation: 1.02 },  // Salto 2 - leggero
  { flash: 0.55, shake: 1, breath: 1.012, saturation: 1.05 }, // Salto 3 - medio
  { flash: 0.7, shake: 2, breath: 1.018, saturation: 1.08 },  // Salto 4 - forte
  { flash: 0.85, shake: 3, breath: 1.025, saturation: 1.12 }, // Salto 5 - intenso
  { flash: 1.0, shake: 4, breath: 1.035, saturation: 1.18 },  // Salto 6 - massimo (innesco)
];

// Note musicali per ogni salto (scala ascendente in Hz)
const LANDING_NOTES = [
  { freq: 262, duration: 280 },  // Do4
  { freq: 294, duration: 280 },  // Re4
  { freq: 330, duration: 300 },  // Mi4
  { freq: 392, duration: 320 },  // Sol4
  { freq: 440, duration: 340 },  // La4
  { freq: 523, duration: 2200, hold: true },  // Do5 - ultimo, tiene a lungo
];

const CROSSING_ASSETS = {
  idle: "https://robertomarchesini.com/assets/chapter1/boy-idle.png?v=2",
  jump: "https://robertomarchesini.com/assets/chapter1/boy-jump.png?v=2",
};

// ============================================================================
// VOID SYNAPSE BACKGROUND - Procedurale
// ============================================================================

// Venature predefinite - curve organiche che collegano i nodi
const VOID_VEINS = [
  // Venatura principale che attraversa tutto il campo
  { points: [{x: 50, y: 920}, {x: 200, y: 870}, {x: 400, y: 830}, {x: 650, y: 780}, {x: 900, y: 760}, {x: 1150, y: 790}, {x: 1400, y: 850}], width: 3 },
  // Venature secondarie - rami
  { points: [{x: 100, y: 950}, {x: 250, y: 880}, {x: 350, y: 850}], width: 2 },
  { points: [{x: 500, y: 900}, {x: 620, y: 820}, {x: 750, y: 780}], width: 2 },
  { points: [{x: 850, y: 850}, {x: 950, y: 780}, {x: 1100, y: 760}], width: 2 },
  { points: [{x: 1200, y: 900}, {x: 1300, y: 850}, {x: 1450, y: 820}], width: 2 },
  // Venature terziarie - più sottili
  { points: [{x: 180, y: 980}, {x: 280, y: 900}, {x: 320, y: 860}], width: 1.5 },
  { points: [{x: 700, y: 920}, {x: 800, y: 830}, {x: 870, y: 770}], width: 1.5 },
  { points: [{x: 1050, y: 880}, {x: 1150, y: 810}, {x: 1250, y: 800}], width: 1.5 },
];

function VoidSynapseBackground({ activatedNodes, scenePulse, allNodesGlow }) {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const pulseWavesRef = useRef([]);
  const revealLevelRef = useRef(0);
  
  const revealLevel = Math.min(1, activatedNodes.length / CROSSING_NODES.length);
  
  useEffect(() => {
    revealLevelRef.current = revealLevel;
  }, [revealLevel]);
  
  // Onde di impulso - PIU' LEGGERE
  useEffect(() => {
    if (scenePulse) {
      const nodeCount = activatedNodes.length;
      pulseWavesRef.current.push({
        x: scenePulse.x,
        y: scenePulse.y,
        startTime: performance.now(),
        intensity: scenePulse.intensity * (1 + nodeCount * 0.12),
        maxRadius: 300 + nodeCount * 40,
        duration: 600 + nodeCount * 50,
      });
    }
  }, [scenePulse?.key, activatedNodes.length]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();
    
    const render = (now) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const scaleX = w / CROSSING_BASE_W;
      const scaleY = h / CROSSING_BASE_H;
      
      const reveal = revealLevelRef.current;
      const nodeCount = activatedNodes.length;
      
      // Fondo nero/verde
      ctx.fillStyle = '#080b09';
      ctx.fillRect(0, 0, w, h);
      
      // Texture sottile - RIDOTTA
      ctx.globalAlpha = 0.015 + reveal * 0.015;
      for (let i = 0; i < 25; i++) {
        const x = (Math.sin(i * 0.7 + now * 0.00008) * 0.5 + 0.5) * w;
        const y = (Math.cos(i * 0.5 + now * 0.00006) * 0.5 + 0.5) * h;
        const r = 80 + Math.sin(i * 1.3) * 30;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, `rgba(35, 60, 40, 0.25)`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      ctx.globalAlpha = 1;
      
      // Ambient glow - PIU' SOTTILE
      if (reveal > 0.2) {
        const ambientGlow = ctx.createRadialGradient(w * 0.5, h * 0.7, 0, w * 0.5, h * 0.7, h * 0.7);
        ambientGlow.addColorStop(0, `rgba(50, 90, 55, ${reveal * 0.08})`);
        ambientGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = ambientGlow;
        ctx.fillRect(0, 0, w, h);
      }
      
      // Venature - SEMPLIFICATE
      VOID_VEINS.forEach((vein) => {
        if (vein.points.length < 2) return;
        
        let veinActivation = 0.03 + reveal * 0.04;
        
        activatedNodes.forEach(nodeIdx => {
          const node = CROSSING_NODES[nodeIdx];
          vein.points.forEach(pt => {
            const dist = Math.hypot(pt.x - node.x, pt.y - node.y);
            if (dist < 300) {
              veinActivation = Math.max(veinActivation, 0.18 * (1 - dist / 300));
            }
          });
        });
        
        pulseWavesRef.current.forEach(wave => {
          const elapsed = now - wave.startTime;
          if (elapsed < wave.duration) {
            const progress = elapsed / wave.duration;
            const radius = progress * wave.maxRadius;
            const fade = 1 - progress;
            vein.points.forEach(pt => {
              const dist = Math.hypot(pt.x - wave.x, pt.y - wave.y);
              if (Math.abs(dist - radius) < 80) {
                veinActivation = Math.max(veinActivation, 0.35 * fade * wave.intensity);
              }
            });
          }
        });
        
        if (allNodesGlow) veinActivation = 0.6;
        
        ctx.beginPath();
        ctx.moveTo(vein.points[0].x * scaleX, vein.points[0].y * scaleY);
        for (let i = 1; i < vein.points.length - 1; i++) {
          const xc = (vein.points[i].x + vein.points[i + 1].x) / 2 * scaleX;
          const yc = (vein.points[i].y + vein.points[i + 1].y) / 2 * scaleY;
          ctx.quadraticCurveTo(vein.points[i].x * scaleX, vein.points[i].y * scaleY, xc, yc);
        }
        ctx.lineTo(vein.points[vein.points.length - 1].x * scaleX, vein.points[vein.points.length - 1].y * scaleY);
        
        ctx.strokeStyle = `rgba(60, 110, 70, ${veinActivation})`;
        ctx.lineWidth = vein.width * (1 + veinActivation * 2);
        ctx.lineCap = 'round';
        ctx.stroke();
        
        // Glow solo se abbastanza attivo
        if (veinActivation > 0.15) {
          ctx.strokeStyle = `rgba(90, 160, 95, ${veinActivation * 0.4})`;
          ctx.lineWidth = vein.width * 4;
          ctx.filter = 'blur(6px)';
          ctx.stroke();
          ctx.filter = 'none';
        }
      });
      
      // Nodi - SEMPLIFICATI
      CROSSING_NODES.forEach((node, index) => {
        const isActivated = activatedNodes.includes(index);
        const x = node.x * scaleX;
        const y = node.y * scaleY;
        
        let nodeAlpha = 0.05 + reveal * 0.05;
        let nodeSize = 4;
        let glowSize = 0;
        
        if (isActivated) {
          nodeAlpha = 0.7 + Math.sin(now * 0.002 + index) * 0.1;
          nodeSize = 8 + index * 0.5;
          glowSize = 25 + index * 4;
        }
        
        pulseWavesRef.current.forEach(wave => {
          const elapsed = now - wave.startTime;
          if (elapsed < wave.duration) {
            const progress = elapsed / wave.duration;
            const radius = progress * wave.maxRadius;
            const dist = Math.hypot(node.x - wave.x, node.y - wave.y);
            if (Math.abs(dist - radius) < 60) {
              const fade = 1 - progress;
              nodeAlpha = Math.max(nodeAlpha, 0.5 * fade * wave.intensity);
              nodeSize = Math.max(nodeSize, 6);
            }
          }
        });
        
        if (allNodesGlow) {
          nodeAlpha = 1;
          nodeSize = 12;
          glowSize = 45;
        }
        
        // Glow
        if (glowSize > 0) {
          const glowGrad = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
          glowGrad.addColorStop(0, `rgba(160, 210, 150, ${nodeAlpha * 0.4})`);
          glowGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = glowGrad;
          ctx.beginPath();
          ctx.arc(x, y, glowSize, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Core
        const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, nodeSize);
        coreGrad.addColorStop(0, `rgba(230, 250, 220, ${nodeAlpha})`);
        coreGrad.addColorStop(0.6, `rgba(160, 210, 150, ${nodeAlpha * 0.7})`);
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(x, y, nodeSize, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Onde - SEMPLIFICATE
      pulseWavesRef.current = pulseWavesRef.current.filter(wave => {
        const elapsed = now - wave.startTime;
        if (elapsed >= wave.duration) return false;
        
        const progress = elapsed / wave.duration;
        const radius = progress * wave.maxRadius * scaleX;
        const fade = (1 - progress) * wave.intensity;
        const x = wave.x * scaleX;
        const y = wave.y * scaleY;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(120, 190, 120, ${fade * 0.35})`;
        ctx.lineWidth = 2 + fade * 3;
        ctx.stroke();
        
        return true;
      });
      
      // Flash finale
      if (allNodesGlow) {
        const finalFlash = ctx.createRadialGradient(w * 0.5, h * 0.65, 0, w * 0.5, h * 0.65, h * 0.6);
        finalFlash.addColorStop(0, 'rgba(150, 220, 140, 0.18)');
        finalFlash.addColorStop(1, 'transparent');
        ctx.fillStyle = finalFlash;
        ctx.fillRect(0, 0, w, h);
      }
      
      // Vignette
      const vignetteGrad = ctx.createRadialGradient(w/2, h/2, h * 0.3, w/2, h/2, h * 0.9);
      vignetteGrad.addColorStop(0, 'transparent');
      vignetteGrad.addColorStop(1, `rgba(5, 8, 6, ${0.45 - reveal * 0.1})`);
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, w, h);
      
      animationRef.current = requestAnimationFrame(render);
    };
    
    animationRef.current = requestAnimationFrame(render);
    
    window.addEventListener('resize', updateSize);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateSize);
    };
  }, [activatedNodes, allNodesGlow]);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}

// Hook per generare suoni con Web Audio API
function useLandingSound() {
  const audioCtxRef = useRef(null);
  
  const playNote = useCallback((noteIndex) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();
      
      const note = LANDING_NOTES[Math.min(noteIndex, LANDING_NOTES.length - 1)];
      const now = ctx.currentTime;
      const isHold = note.hold;
      
      // Oscillatore principale (onda triangolare per suono caldo)
      const osc = ctx.createOscillator();
      osc.type = isHold ? 'sine' : 'triangle'; // Sine per nota finale (più puro)
      osc.frequency.setValueAtTime(note.freq, now);
      
      // Leggero detune per suono più organico
      osc.detune.setValueAtTime(Math.random() * 10 - 5, now);
      
      // Secondo oscillatore per armonico (ottava sopra, molto sottile)
      const osc2 = ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(note.freq * 2, now);
      
      // Terzo oscillatore per nota hold (quinta, crea accordo)
      const osc3 = isHold ? ctx.createOscillator() : null;
      if (osc3) {
        osc3.type = 'sine';
        osc3.frequency.setValueAtTime(note.freq * 1.5, now); // Quinta
      }
      
      // Gain principale con envelope ADSR
      const gainNode = ctx.createGain();
      const volume = isHold ? 0.18 : (0.12 + noteIndex * 0.015);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(volume, now + (isHold ? 0.05 : 0.02)); // Attack
      
      if (isHold) {
        // Sustain lungo per nota finale
        gainNode.gain.linearRampToValueAtTime(volume * 0.8, now + 0.3);
        gainNode.gain.linearRampToValueAtTime(volume * 0.6, now + 1.0);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + note.duration / 1000);
      } else {
        gainNode.gain.exponentialRampToValueAtTime(volume * 0.6, now + 0.08); // Decay
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + note.duration / 1000); // Release
      }
      
      // Gain per armonico
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(volume * (isHold ? 0.25 : 0.15), now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + note.duration / 1200);
      
      // Gain per terzo oscillatore (quinta)
      const gain3 = isHold ? ctx.createGain() : null;
      if (gain3) {
        gain3.gain.setValueAtTime(0, now);
        gain3.gain.linearRampToValueAtTime(volume * 0.12, now + 0.1);
        gain3.gain.exponentialRampToValueAtTime(0.001, now + note.duration / 1000);
      }
      
      // Filtro passa-basso per suono più morbido
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(isHold ? 2000 : (1200 + noteIndex * 200), now);
      filter.Q.setValueAtTime(0.5, now);
      
      // Connessioni
      osc.connect(gainNode);
      osc2.connect(gain2);
      gainNode.connect(filter);
      gain2.connect(filter);
      if (osc3 && gain3) {
        osc3.connect(gain3);
        gain3.connect(filter);
      }
      filter.connect(ctx.destination);
      
      // Start e stop
      osc.start(now);
      osc2.start(now);
      if (osc3) osc3.start(now);
      osc.stop(now + note.duration / 1000 + 0.1);
      osc2.stop(now + note.duration / 1000 + 0.1);
      if (osc3) osc3.stop(now + note.duration / 1000 + 0.1);
    } catch (e) {
      // Audio non supportato, ignora silenziosamente
    }
  }, []);
  
  return playNote;
}

function ConnectionsCrossing({ onComplete, jumpDuration = 440, arcHeight = 115, finalPause = 3500 }) {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
  const [activatedNodes, setActivatedNodes] = useState([]);
  const [isJumping, setIsJumping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isFinalJump, setIsFinalJump] = useState(false);
  const [characterPos, setCharacterPos] = useState(CROSSING_ENTRY);
  const [characterVisible, setCharacterVisible] = useState(true);
  const [scenePulse, setScenePulse] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [trail, setTrail] = useState([]);
  const [squash, setSquash] = useState(false);
  const [transition, setTransition] = useState(null);
  const [particles, setParticles] = useState([]);
  const [birds, setBirds] = useState([]);
  
  // Audio
  const playLandingNote = useLandingSound();
  
  // Effetti fondale
  const [bgBreath, setBgBreath] = useState(1);
  const [bgSaturation, setBgSaturation] = useState(1);
  const [bgShake, setBgShake] = useState(0);
  const [allNodesGlow, setAllNodesGlow] = useState(false);
  
  // Timing bar state
  const [pulsePosition, setPulsePosition] = useState(0);
  const [timingMiss, setTimingMiss] = useState(false);
  const [timingHit, setTimingHit] = useState(false);

  const rafRef = useRef(null);
  const pulseRafRef = useRef(null);
  const scenePulseTimeoutRef = useRef(null);
  const hintTimeoutRef = useRef(null);
  const squashTimeoutRef = useRef(null);
  const missTimeoutRef = useRef(null);
  const breathTimeoutRef = useRef(null);
  const shakeTimeoutRef = useRef(null);
  const hasInteracted = useRef(false);
  const pulseStartTime = useRef(0);
  const birdIntervalRef = useRef(null);

  const toPercentX = (x) => `${(x / CROSSING_BASE_W) * 100}%`;
  const toPercentY = (y) => `${(y / CROSSING_BASE_H) * 100}%`;

  // Current difficulty
  const nextJumpIndex = currentNodeIndex + 1;
  const difficulty = TIMING_DIFFICULTY[Math.min(nextJumpIndex, TIMING_DIFFICULTY.length - 1)];
  const targetCenter = 0.5;
  const targetStart = targetCenter - difficulty.targetWidth / 2;
  const targetEnd = targetCenter + difficulty.targetWidth / 2;

  // Segmenti attivi
  const activeSegments = useMemo(() => {
    if (activatedNodes.length === 0) return [];
    const segs = [];
    if (activatedNodes.length >= 1) {
      const a = CROSSING_ENTRY;
      const b = CROSSING_NODES[activatedNodes[0]];
      const dx = b.x - a.x, dy = b.y - a.y;
      segs.push({ x: a.x, y: a.y, length: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) * (180 / Math.PI) });
    }
    for (let i = 1; i < activatedNodes.length; i++) {
      const a = CROSSING_NODES[activatedNodes[i - 1]];
      const b = CROSSING_NODES[activatedNodes[i]];
      const dx = b.x - a.x, dy = b.y - a.y;
      segs.push({ x: a.x, y: a.y, length: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) * (180 / Math.PI) });
    }
    return segs;
  }, [activatedNodes]);

  // Pulse animation
  useEffect(() => {
    if (isJumping || isComplete || isFinalJump || transition) return;
    pulseStartTime.current = performance.now();
    const animatePulse = (now) => {
      const elapsed = now - pulseStartTime.current;
      const progress = (elapsed % difficulty.cycleDuration) / difficulty.cycleDuration;
      setPulsePosition(progress);
      pulseRafRef.current = requestAnimationFrame(animatePulse);
    };
    pulseRafRef.current = requestAnimationFrame(animatePulse);
    return () => { if (pulseRafRef.current) cancelAnimationFrame(pulseRafRef.current); };
  }, [isJumping, isComplete, isFinalJump, transition, difficulty.cycleDuration, currentNodeIndex]);

  // Particelle ambientali
  useEffect(() => {
    const createParticle = () => ({
      id: Date.now() + Math.random(),
      x: Math.random() * 100,
      y: 30 + Math.random() * 55,
      size: 2 + Math.random() * 2.5,
      speed: 0.25 + Math.random() * 0.35,
      opacity: 0.15 + Math.random() * 0.25,
      drift: (Math.random() - 0.5) * 0.4,
    });
    setParticles(Array(6).fill(0).map(createParticle));
    const interval = setInterval(() => {
      setParticles(prev => {
        const updated = prev.map(p => ({
          ...p, x: p.x + p.speed,
          y: p.y + p.drift + Math.sin(Date.now() / 1200 + p.id) * 0.08,
        })).filter(p => p.x < 105);
        if (updated.length < 6 && Math.random() > 0.6) {
          updated.push({ ...createParticle(), x: -2 });
        }
        return updated;
      });
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Uccelli pixel
  useEffect(() => {
    const createBird = (startX = -5, isStormBird = false) => ({
      id: Date.now() + Math.random(),
      x: startX,
      y: isStormBird ? (20 + Math.random() * 35) : (15 + Math.random() * 25),
      speed: 0.15 + Math.random() * 0.12, // Molto più lenti
      size: 3 + Math.random() * 2,
      wingPhase: Math.random() * Math.PI * 2,
      fleeing: false,
    });
    
    // Spawn uccelli ogni 10-18 secondi
    const spawnBird = () => {
      if (Math.random() > 0.5) {
        setBirds(prev => {
          if (prev.length < 3) return [...prev, createBird()];
          return prev;
        });
      }
    };
    
    birdIntervalRef.current = setInterval(spawnBird, 10000 + Math.random() * 8000);
    
    // Movimento uccelli
    const moveInterval = setInterval(() => {
      setBirds(prev => prev.map(b => ({
        ...b,
        x: b.x + (b.fleeing ? b.speed * 4 : b.speed),
        y: b.y + Math.sin(Date.now() / 400 + b.wingPhase) * 0.08 + (b.fleeing ? -0.15 : 0),
        wingPhase: b.wingPhase + 0.1,
      })).filter(b => b.x < 115));
    }, 50);
    
    return () => {
      if (birdIntervalRef.current) clearInterval(birdIntervalRef.current);
      clearInterval(moveInterval);
    };
  }, []);
  
  // Funzione per spawnare stormo finale
  const spawnFinalFlock = useCallback(() => {
    const flockBirds = [];
    for (let i = 0; i < 6; i++) {
      flockBirds.push({
        id: Date.now() + Math.random() + i,
        x: -8 - Math.random() * 15,
        y: 25 + Math.random() * 30,
        speed: 0.4 + Math.random() * 0.2,
        size: 2.5 + Math.random() * 2,
        wingPhase: Math.random() * Math.PI * 2,
        fleeing: true, // Partono già in volo rapido
      });
    }
    setBirds(prev => [...prev, ...flockBirds]);
  }, []);

  // Hint
  useEffect(() => {
    hintTimeoutRef.current = setTimeout(() => {
      if (!hasInteracted.current) setShowHint(true);
    }, 2000);
    return () => { if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current); };
  }, []);

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pulseRafRef.current) cancelAnimationFrame(pulseRafRef.current);
      if (scenePulseTimeoutRef.current) clearTimeout(scenePulseTimeoutRef.current);
      if (squashTimeoutRef.current) clearTimeout(squashTimeoutRef.current);
      if (missTimeoutRef.current) clearTimeout(missTimeoutRef.current);
      if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
    };
  }, []);

  const triggerLandingFx = (nodeIndex) => {
    const node = CROSSING_NODES[nodeIndex];
    const intensity = LANDING_INTENSITY[Math.min(nodeIndex, LANDING_INTENSITY.length - 1)];
    
    // Suona la nota
    playLandingNote(nodeIndex);
    
    // Flash locale con intensità
    setScenePulse({ key: `${nodeIndex}-${Date.now()}`, x: node.x, y: node.y, intensity: intensity.flash });
    
    // Squash
    setSquash(true);
    if (squashTimeoutRef.current) clearTimeout(squashTimeoutRef.current);
    squashTimeoutRef.current = setTimeout(() => setSquash(false), 140);
    
    // Breath del fondale
    setBgBreath(intensity.breath);
    setBgSaturation(intensity.saturation);
    if (breathTimeoutRef.current) clearTimeout(breathTimeoutRef.current);
    breathTimeoutRef.current = setTimeout(() => {
      setBgBreath(1);
      setBgSaturation(s => Math.min(s, 1 + nodeIndex * 0.015)); // Mantiene un po' di saturazione
    }, 400);
    
    // Shake (solo da salto 3 in poi)
    if (intensity.shake > 0) {
      setBgShake(intensity.shake);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
      shakeTimeoutRef.current = setTimeout(() => setBgShake(0), 300);
    }
    
    // Uccelli: si alzano in volo dopo salto 4, volano via tutti al salto 6
    if (nodeIndex >= 3) {
      setBirds(prev => prev.map(b => ({ ...b, fleeing: true })));
    }
    
    // Ultimo nodo: effetto speciale "innesco" + salto automatico
    if (nodeIndex === CROSSING_NODES.length - 1) {
      // Tutti i nodi brillano insieme
      setAllNodesGlow(true);
      setTimeout(() => setAllNodesGlow(false), 800);
      // Spawn stormo finale che attraversa
      spawnFinalFlock();
      // Salto automatico dopo pausa drammatica (nota che tiene + stormo passa)
      setIsComplete(true);
      setTimeout(() => doFinalJump(), 1800);
    }
    
    if (scenePulseTimeoutRef.current) clearTimeout(scenePulseTimeoutRef.current);
    scenePulseTimeoutRef.current = setTimeout(() => setScenePulse(null), 500 + intensity.flash * 200);
  };

  const doFinalJump = () => {
    const start = CROSSING_NODES[CROSSING_NODES.length - 1];
    const end = CROSSING_EXIT;
    setIsFinalJump(true);
    setIsJumping(true);
    setTrail([]);
    
    // Uccelli volano via tutti
    setBirds(prev => prev.map(b => ({ ...b, fleeing: true, speed: b.speed * 2 })));
    
    const startedAt = performance.now();
    const dur = 700;
    let lastTrailTime = 0;
    const tick = (now) => {
      const p = Math.min((now - startedAt) / dur, 1);
      const arc = (arcHeight * 1.5) * Math.sin(p * Math.PI);
      const x = start.x + (end.x - start.x) * p;
      const y = start.y + (end.y - start.y) * p - arc;
      setCharacterPos({ x, y });
      if (now - lastTrailTime > 25) { lastTrailTime = now; setTrail(prev => [...prev.slice(-12), { x, y, id: now }]); }
      if (p < 1) { rafRef.current = requestAnimationFrame(tick); return; }
      setCharacterVisible(false);
      setTrail([]);
      setIsJumping(false);
      setTimeout(() => setTransition('fadeWhite'), 100);
      setTimeout(() => setTransition('phrase'), 900);
      setTimeout(() => setTransition('chapter2'), 2600);
      setTimeout(() => onComplete?.(), finalPause);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const doJump = (targetIndex) => {
    const start = currentNodeIndex >= 0 ? CROSSING_NODES[currentNodeIndex] : CROSSING_ENTRY;
    const end = CROSSING_NODES[targetIndex];
    setIsJumping(true);
    setTrail([]);
    const startedAt = performance.now();
    let lastTrailTime = 0;
    const tick = (now) => {
      const p = Math.min((now - startedAt) / jumpDuration, 1);
      const arc = arcHeight * Math.sin(p * Math.PI);
      const x = start.x + (end.x - start.x) * p;
      const y = start.y + (end.y - start.y) * p - arc;
      setCharacterPos({ x, y });
      if (now - lastTrailTime > 38) { lastTrailTime = now; setTrail(prev => [...prev.slice(-6), { x, y, id: now }]); }
      if (p < 1) { rafRef.current = requestAnimationFrame(tick); return; }
      setCharacterPos(end);
      setIsJumping(false);
      setTrail([]);
      setCurrentNodeIndex(targetIndex);
      setActivatedNodes(prev => [...prev, targetIndex]);
      triggerLandingFx(targetIndex);
      pulseStartTime.current = performance.now();
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const handleAdvance = () => {
    if (isJumping || isComplete || isFinalJump || timingMiss) return;
    if (!hasInteracted.current) { hasInteracted.current = true; setShowHint(false); }
    
    const isInTarget = pulsePosition >= targetStart && pulsePosition <= targetEnd;
    
    if (!isInTarget) {
      setTimingMiss(true);
      if (missTimeoutRef.current) clearTimeout(missTimeoutRef.current);
      missTimeoutRef.current = setTimeout(() => setTimingMiss(false), 400);
      pulseStartTime.current = performance.now();
      return;
    }
    
    setTimingHit(true);
    setTimeout(() => setTimingHit(false), 300);
    
    const targetIndex = currentNodeIndex + 1;
    if (targetIndex >= CROSSING_NODES.length) return;
    doJump(targetIndex);
  };

  const spriteSrc = isJumping ? CROSSING_ASSETS.jump : CROSSING_ASSETS.idle;
  const characterTransform = squash 
    ? "translate(-50%, -100%) scaleX(-1.12) scaleY(0.88)"
    : "translate(-50%, -100%) scaleX(-1)";

  const showTimingBar = !isJumping && !isComplete && !isFinalJump && !transition;
  
  // Stile fondale con effetti dinamici - ora procedurale
  const bgStyle = {
    position: "relative", width: "100%", aspectRatio: "4 / 3",
    maxHeight: "65vh",
    overflow: "hidden",
    backgroundColor: "#0a0d0b", // Nero/verde petrolio profondo
    cursor: isJumping || isComplete ? "default" : "pointer",
    userSelect: "none", touchAction: "manipulation", borderRadius: 8,
    transform: `scale(${bgBreath}) translateX(${bgShake ? (Math.random() - 0.5) * bgShake : 0}px)`,
    transition: "transform 0.15s ease-out",
  };

  return (
    <div
      role="button" tabIndex={0}
      aria-label="Attraversa. Tocca quando la luce è al centro."
      onPointerDown={handleAdvance}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleAdvance(); } }}
      style={bgStyle}
    >
      {/* VOID SYNAPSE BACKGROUND - Procedurale */}
      <VoidSynapseBackground 
        activatedNodes={activatedNodes}
        scenePulse={scenePulse}
        allNodesGlow={allNodesGlow}
      />
      
      {/* TIMING BAR - Fascio di luce minimal */}
      {showTimingBar && (() => {
        const isInTarget = pulsePosition >= targetStart && pulsePosition <= targetEnd;
        const distFromCenter = Math.abs(pulsePosition - 0.5);
        const centerIntensity = Math.max(0, 1 - distFromCenter * 2.5);
        
        return (
          <div style={{
            position: "absolute",
            top: "5%", left: "50%",
            transform: "translateX(-50%)",
            width: "55%", maxWidth: 360,
            height: 6,
            pointerEvents: "none",
            zIndex: 20,
            animation: timingMiss ? "crossingTimingShake 0.35s ease-out" : "none",
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(90deg, transparent 5%, rgba(199,212,160,0.08) 30%, rgba(199,212,160,0.12) 50%, rgba(199,212,160,0.08) 70%, transparent 95%)",
              borderRadius: 10,
            }} />
            <div style={{
              position: "absolute",
              left: "50%", top: "50%",
              transform: "translate(-50%, -50%)",
              width: "40%", height: 20,
              background: `radial-gradient(ellipse, rgba(199,212,160,${0.15 + centerIntensity * 0.5}) 0%, transparent 70%)`,
              filter: `blur(${4 + centerIntensity * 6}px)`,
              transition: "all 0.08s ease-out",
            }} />
            <div style={{
              position: "absolute",
              left: `${pulsePosition * 100}%`,
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: isInTarget ? 18 : 10,
              height: isInTarget ? 18 : 10,
              borderRadius: "50%",
              background: isInTarget
                ? `radial-gradient(circle, rgba(235,242,225,${0.9 + centerIntensity * 0.1}) 0%, rgba(199,212,160,0.7) 40%, transparent 70%)`
                : "radial-gradient(circle, rgba(199,212,160,0.6) 0%, rgba(126,143,99,0.3) 50%, transparent 70%)",
              boxShadow: isInTarget
                ? `0 0 ${12 + centerIntensity * 18}px rgba(199,212,160,${0.6 + centerIntensity * 0.4})`
                : "0 0 6px rgba(126,143,99,0.25)",
              transition: "width 0.12s, height 0.12s, box-shadow 0.08s",
            }} />
            {isInTarget && centerIntensity > 0.6 && (
              <div style={{
                position: "absolute",
                left: "50%", top: "50%",
                transform: "translate(-50%, -50%)",
                width: 60, height: 30,
                background: `radial-gradient(ellipse, rgba(235,242,225,${centerIntensity * 0.4}) 0%, transparent 60%)`,
                filter: "blur(8px)",
                pointerEvents: "none",
              }} />
            )}
            {timingMiss && (
              <div style={{
                position: "absolute", inset: -4,
                background: "radial-gradient(ellipse at center, rgba(255,100,100,0.15) 0%, transparent 70%)",
                borderRadius: 20,
              }} />
            )}
          </div>
        );
      })()}

      {/* Color grade overlay */}

      {/* Uccelli pixel */}
      {birds.map(bird => (
        <div key={bird.id} style={{
          position: "absolute",
          left: `${bird.x}%`,
          top: `${bird.y}%`,
          width: bird.size * 2,
          height: bird.size,
          pointerEvents: "none",
          zIndex: 5,
        }}>
          {/* Corpo */}
          <div style={{
            position: "absolute",
            left: "50%", top: "50%",
            transform: "translate(-50%, -50%)",
            width: bird.size,
            height: bird.size * 0.6,
            background: "rgba(40,45,35,0.8)",
            borderRadius: "50%",
          }} />
          {/* Ali */}
          <div style={{
            position: "absolute",
            left: "50%", top: "50%",
            transform: `translate(-50%, -50%) rotate(${Math.sin(bird.wingPhase) * 25}deg)`,
            width: bird.size * 1.8,
            height: bird.size * 0.3,
            background: "rgba(50,55,45,0.7)",
            borderRadius: "50%",
            transformOrigin: "center",
          }} />
        </div>
      ))}

      {/* Particelle ambientali */}
      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute", left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: "50%",
          background: `rgba(199,212,160,${p.opacity})`,
          boxShadow: `0 0 ${p.size * 1.5}px rgba(199,212,160,${p.opacity * 0.4})`,
          pointerEvents: "none", filter: "blur(0.5px)",
        }} />
      ))}

      {/* FLASH SINAPTICO FULLSCREEN con intensità progressiva */}
      {scenePulse && (
        <>
          <div key={`flash-${scenePulse.key}`} style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(circle at ${toPercentX(scenePulse.x)} ${toPercentY(scenePulse.y)}, 
              rgba(235,242,225,${0.7 + scenePulse.intensity * 0.3}) 0%, 
              rgba(199,212,160,${0.5 * scenePulse.intensity}) ${8 + scenePulse.intensity * 8}%, 
              rgba(199,212,160,${0.25 * scenePulse.intensity}) ${20 + scenePulse.intensity * 15}%, 
              rgba(126,143,99,${0.08 * scenePulse.intensity}) ${40 + scenePulse.intensity * 20}%,
              transparent ${60 + scenePulse.intensity * 25}%)`,
            animation: `crossingSynapseFlash ${400 + scenePulse.intensity * 150}ms ease-out forwards`,
          }} />
          {/* Overlay fullscreen per salti intensi */}
          {scenePulse.intensity > 0.5 && (
            <div key={`glow-${scenePulse.key}`} style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: `rgba(199,212,160,${0.08 * scenePulse.intensity})`,
              animation: "crossingSynapseGlow 400ms ease-out forwards",
            }} />
          )}
        </>
      )}

      {/* Linee connessione */}
      {activeSegments.map((seg, i) => (
        <div key={`seg-${i}`} style={{
          position: "absolute",
          left: toPercentX(seg.x), top: toPercentY(seg.y),
          width: `${(seg.length / CROSSING_BASE_W) * 100}%`,
          height: "0.3%", minHeight: 2,
          transformOrigin: "0 50%",
          transform: `translateY(-50%) rotate(${seg.angle}deg)`,
          borderRadius: 999,
          background: allNodesGlow 
            ? "linear-gradient(90deg, rgba(235,242,225,0.4), rgba(199,212,160,0.7))"
            : "linear-gradient(90deg, rgba(199,212,160,0.08), rgba(199,212,160,0.35))",
          boxShadow: allNodesGlow
            ? "0 0 15px rgba(199,212,160,0.5)"
            : "0 0 8px rgba(199,212,160,0.18)",
          animation: "crossingLineGlow 2.2s ease-in-out infinite",
          transition: "all 0.3s ease-out",
          pointerEvents: "none",
        }} />
      ))}

      {/* Nodi attivati */}
      {CROSSING_NODES.map((node, index) => {
        if (!activatedNodes.includes(index)) return null;
        const isGlowing = allNodesGlow;
        return (
          <div key={`node-${index}`} style={{
            position: "absolute",
            left: toPercentX(node.x), top: toPercentY(node.y),
            width: isGlowing ? 14 : 8, height: isGlowing ? 14 : 8, borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: isGlowing ? "rgba(235,242,225,0.95)" : "rgba(199,212,160,0.75)",
            boxShadow: isGlowing 
              ? "0 0 25px rgba(199,212,160,0.8), 0 0 50px rgba(199,212,160,0.4)"
              : "0 0 12px rgba(199,212,160,0.35)",
            animation: "crossingNodeBreath 2.2s ease-in-out infinite",
            transition: "all 0.3s ease-out",
            pointerEvents: "none",
          }} />
        );
      })}

      {/* Trail */}
      {trail.map((point, i) => (
        <div key={point.id} style={{
          position: "absolute",
          left: toPercentX(point.x), top: toPercentY(point.y),
          width: 4 - i * 0.4, height: 4 - i * 0.4,
          borderRadius: 999,
          background: `rgba(199,212,160,${0.28 - i * 0.03})`,
          transform: "translate(-50%, -50%)",
          filter: "blur(1px)",
          pointerEvents: "none",
        }} />
      ))}

      {/* Ombra personaggio */}
      {characterVisible && (
        <div style={{
          position: "absolute",
          left: toPercentX(characterPos.x), top: toPercentY(characterPos.y + 10),
          width: "clamp(14px, 2%, 24px)", height: "clamp(2px, 0.4%, 4px)",
          borderRadius: "50%", background: "rgba(0,0,0,0.22)",
          filter: "blur(2px)", transform: "translate(-50%, 0)",
          pointerEvents: "none",
          opacity: isJumping ? 0.25 : 0.5,
        }} />
      )}

      {/* Personaggio */}
      {characterVisible && (
        <img src={spriteSrc} alt="" draggable={false} style={{
          position: "absolute",
          left: toPercentX(characterPos.x), top: toPercentY(characterPos.y),
          width: "clamp(32px, 4.5%, 70px)",
          height: "auto", transform: characterTransform,
          transformOrigin: "center bottom",
          transition: squash ? "transform 0.07s ease-out" : "transform 0.09s ease-out",
          imageRendering: "pixelated", pointerEvents: "none",
          animation: !isJumping && !squash ? "crossingIdleFloat 2s ease-in-out infinite" : "none",
          filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.4)) brightness(1.8) saturate(0.3) contrast(0.9)",
        }} />
      )}

      {/* Tap hint - sotto la barra, al centro */}
      {showHint && (
        <div style={{
          position: "absolute",
          left: 0, right: 0, top: "10%",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          pointerEvents: "none", animation: "crossingHintPulse 1.4s ease-in-out infinite",
        }}>
          <div style={{
            color: "rgba(199,212,160,0.85)", fontSize: "clamp(9px, 2.5vw, 11px)",
            fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 1, textTransform: "uppercase",
            textAlign: "center", lineHeight: 1.4,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            padding: "0 10px",
          }}>
            Tap quando la luce è al centro
          </div>
          <div style={{
            width: 0, height: 0,
            borderLeft: "5px solid transparent",
            borderRight: "5px solid transparent",
            borderBottom: "6px solid rgba(199,212,160,0.4)",
            marginTop: 3,
          }} />
        </div>
      )}

      {/* === TRANSIZIONI FINALI === */}
      
      {transition && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "rgba(235,242,225,1)",
          opacity: transition === 'fadeWhite' ? 0 : 1,
          animation: transition === 'fadeWhite' ? "crossingFadeToWhite 800ms ease-in-out forwards" : "none",
        }} />
      )}

      {transition === 'phrase' && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(235,242,225,1)", pointerEvents: "none",
        }}>
          <div style={{
            color: "#191E1B", fontFamily: "Georgia, serif", fontStyle: "italic",
            fontSize: "clamp(15px, 2.4vw, 24px)", textAlign: "center", padding: "0 28px",
            opacity: 0, animation: "crossingPhraseIn 1.5s ease-out forwards",
          }}>
            Ogni salto lascia un segno.
          </div>
        </div>
      )}

      {transition === 'chapter2' && (
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6,
          background: "#191E1B", pointerEvents: "none",
          opacity: 0, animation: "crossingChapter2In 900ms ease-out forwards",
        }}>
          <div style={{
            color: "rgba(199,212,160,0.45)", fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "clamp(8px, 1.1vw, 10px)", letterSpacing: 4, textTransform: "uppercase",
          }}>Capitolo</div>
          <div style={{
            color: "#C7D4A0", fontFamily: "Georgia, serif",
            fontSize: "clamp(28px, 4.5vw, 48px)", fontWeight: 400,
          }}>2</div>
        </div>
      )}

      {/* Vignette dinamica */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        boxShadow: `inset 0 0 ${90 + (activatedNodes.length * 5)}px rgba(0,0,0,${0.28 - activatedNodes.length * 0.02})`,
        transition: "box-shadow 0.5s ease-out",
      }} />

      {/* Scanlines */}
      <div className="ch1-scan" />
    </div>
  );
}


function ChapterOne({ T, onBack, onRequestChapterTwo }) {
  const meadowVideoRef = useRef(null);
  const libraryLoopRef = useRef(null);
  const libraryFullRef = useRef(null);
  const revealTimeoutRef = useRef(null);

  const [scene, setScene] = useState('meadow');
  const [showMeadowFeedback, setShowMeadowFeedback] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [activated, setActivated] = useState(false);
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
    if (scene !== 'discover') { setShowApproach(false); return; }
    setShowApproach(true);
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
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
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
    setScene('discover');
  }, [activated, unlockAudio]);

  const handleContinue = useCallback(() => {
    if (activated) return;
    unlockAudio();
    setActivated(true);
    revealTimeoutRef.current = setTimeout(() => {
      setProfileUnlocked(true);
      const fullVideo = libraryFullRef.current;
      if (fullVideo) fullVideo.currentTime = 0;
    }, 450);
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
                <div className={`ch1-line-block ch1-reveal ${scene === 'library' && !activated ? 'show' : ''}`}>
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
            <ConnectionsCrossing onComplete={handleCrossingComplete} />
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
  const [trashGlitchText, setTrashGlitchText] = useState(null);
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
      if (timeOnPage.current >= 8000 && hasScrolled.current && !ghostReady) {
        setTimeout(() => setGhostReady(true), 2500);
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

  // Trash text glitch - solo rumore visivo che attira
  useEffect(() => {
    if (phase !== "main" || hoverTrash) return;
    const chars = "!@#$%^&*_+-=<>?/~▓▒░█▄▀";
    const length = T.trashBtn.length;
    
    const triggerGlitch = () => {
      let frame = 0;
      const maxFrames = 4;
      const glitchInterval = setInterval(() => {
        if (frame >= maxFrames) {
          clearInterval(glitchInterval);
          setTrashGlitchText(null);
          return;
        }
        const glitched = Array(length).fill(0).map(() => 
          chars[Math.floor(Math.random() * chars.length)]
        ).join("");
        setTrashGlitchText(glitched);
        frame++;
      }, 40);
    };
    
    const interval = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch();
    }, 5000 + Math.random() * 4000);
    
    return () => clearInterval(interval);
  }, [phase, hoverTrash, T.trashBtn]);

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
    setTimeout(() => setPhase(GAME_ENABLED ? "game" : "comingSoon"), 4000);
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
        @keyframes trashBreath{0%,100%{box-shadow:0 0 20px rgba(255,77,0,.12), 0 0 40px rgba(255,77,0,.06);transform:scale(1)}50%{box-shadow:0 0 40px rgba(255,77,0,.25), 0 0 80px rgba(255,77,0,.12);transform:scale(1.02)}}
        @keyframes trashArrow{0%,100%{opacity:.3;transform:translateY(0)}50%{opacity:.6;transform:translateY(4px)}}
        @keyframes fall{0%{transform:translateY(0) rotate(0deg);opacity:1}15%{opacity:1}100%{transform:translateY(105vh) rotate(var(--rot,20deg));opacity:0}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes appear{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}
        .work-card{transition:all .3s}
        .work-card:hover{padding-left:12px;border-left:2px solid rgba(255,77,0,.4)!important}
        .svc{padding:22px 24px;border:1px solid #141414;border-radius:4px;transition:all .3s;cursor:default}
        .svc:hover{border-color:rgba(255,77,0,.35);background:rgba(255,77,0,.02)}
        .svc:hover .svc-t{color:#FF4D00!important;text-shadow:0 0 15px rgba(255,77,0,.12)}
        .work-card{transition:all .3s;padding-left:0;border-left:3px solid transparent}
        .work-card:hover{border-left-color:#FF4D00;padding-left:20px;background:linear-gradient(90deg,rgba(255,77,0,.025) 0%,transparent 40%)}
        .mth{padding-left:16px;border-left:2px solid #161616;transition:all .25s;cursor:default}
        .mth:hover{border-left-color:#FF4D00;padding-left:20px}
        .mth:hover .mth-t{color:#FF4D00!important}
        .btn-trash{min-width:140px;padding:16px 38px;background:transparent;border:1px solid #FF4D00;color:#FF4D00;font-size:12px;font-family:'IBM Plex Mono',monospace;letter-spacing:2.5px;cursor:pointer;text-transform:uppercase;font-weight:500;transition:background .2s,color .2s}
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
        .ch1-root{min-height:100dvh;background:#050505;color:#ece7de;font-family:"IBM Plex Mono",monospace;display:flex;align-items:flex-start;justify-content:center;padding:20px 16px;padding-bottom:env(safe-area-inset-bottom,20px)}
        .ch1-wrap{width:min(94vw,880px);display:flex;flex-direction:column;align-items:center;padding-top:12px;padding-bottom:30px}
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
        .ch1-stay-feedback{position:absolute;right:22px;top:22px;z-index:9;font-size:15px;color:rgba(220,231,222,.85);font-family:Georgia,serif;font-style:italic;text-shadow:0 2px 8px rgba(0,0,0,.7),0 0 20px rgba(0,0,0,.5);opacity:0;transform:translateY(-8px);transition:opacity .4s ease,transform .4s ease}
        .ch1-stay-feedback.show{opacity:1;transform:translateY(0)}
        .ch1-discover-overlay{position:absolute;inset:0;z-index:3;background:linear-gradient(180deg,rgba(5,8,10,.18),rgba(5,8,10,.28))}
        .ch1-line-block{position:absolute;left:22px;right:22px;bottom:26px;z-index:8;max-width:560px;border-top:1px solid rgba(167,203,216,.18);padding-top:12px;background:linear-gradient(to top,rgba(0,0,0,.45) 0%,rgba(0,0,0,.25) 70%,transparent 100%);padding-bottom:8px;margin-bottom:-8px}
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
        
        /* ConnectionsCrossing animations */
        @keyframes crossingIdleFloat{0%{transform:translate(-50%,-100%) scaleX(-1) translateY(0)}50%{transform:translate(-50%,-100%) scaleX(-1) translateY(-3px)}100%{transform:translate(-50%,-100%) scaleX(-1) translateY(0)}}
        @keyframes crossingNodeBreath{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.75}50%{transform:translate(-50%,-50%) scale(1.08);opacity:1}}
        @keyframes crossingLineGlow{0%,100%{opacity:.5;filter:blur(0)}50%{opacity:.85;filter:blur(.4px)}}
        @keyframes crossingSynapseFlash{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}
        @keyframes crossingSynapseGlow{0%{opacity:1}100%{opacity:0}}
        @keyframes crossingHintPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.9;transform:scale(1.06)}}
        @keyframes crossingFadeToWhite{0%{opacity:0}100%{opacity:1}}
        @keyframes crossingPhraseIn{0%{opacity:0;transform:translateY(12px)}20%{opacity:1;transform:translateY(0)}80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-8px)}}
        @keyframes crossingChapter2In{0%{opacity:0}100%{opacity:1}}
        @keyframes crossingTimingShake{0%,100%{transform:translateX(-50%)}15%{transform:translateX(calc(-50% + 6px))}30%{transform:translateX(calc(-50% - 5px))}45%{transform:translateX(calc(-50% + 4px))}60%{transform:translateX(calc(-50% - 3px))}75%{transform:translateX(calc(-50% + 2px))}90%{transform:translateX(calc(-50% - 1px))}}
        
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
          {/* 1. HERO */}
          <Section delay={0.05}>
            <div style={{ marginBottom: 32 }}>
              <h1 className="nm" style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 700, lineHeight: 1.02, margin: "0 0 10px", color: "#F0ECE6", animation: "nameGlow 6s ease-in-out infinite" }}>
                <GlitchText text="Roberto" active={glitch} /><br />
                <GlitchText text="Marchesini" active={glitch} />
              </h1>
              <div style={{ fontSize: 14, color: "#888", fontWeight: 400, letterSpacing: 1.5, marginTop: 12 }}>Creative Director · AI Systems</div>
              <div style={{ fontSize: 14, color: "#BBB", marginTop: 18, lineHeight: 1.85, maxWidth: 500 }}>{T.hero}</div>
              <div style={{ fontSize: 13, color: "#999", marginTop: 12, lineHeight: 1.8, maxWidth: 500 }}>{T.heroSub}</div>
            </div>
          </Section>

          {/* 2. PROOF STRIP */}
          <Section delay={0.08}>
            <div style={{ marginBottom: 32, textAlign: "center" }}>
              <div style={{ fontSize: 10, letterSpacing: 3, color: "#777", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>{T.proofStrip}</div>
            </div>
          </Section>

          {/* 3. DIVIDER */}
          <Section delay={0.1}>
            <div style={{ height: 1, background: "linear-gradient(to right,#FF4D00 0%,rgba(255,77,0,.12) 45%,transparent 100%)", marginBottom: 48 }} />
          </Section>

          {/* 4. SELECTED WORK */}
          <Section delay={0.12}>
            <div style={{ marginBottom: 56 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#FF4D00", textTransform: "uppercase", marginBottom: 6, opacity: .6 }}>{T.selectedWorkLabel}</div>
              <div style={{ fontSize: 11, color: "#777", marginBottom: 28, fontStyle: "italic", fontFamily: "'Playfair Display',serif" }}>{T.selectedWorkSub}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {T.selectedWork.map((work, i) => (
                  <div key={i} className="work-card" style={{
                    paddingTop: 28,
                    paddingBottom: 28,
                    paddingRight: 0,
                    borderBottom: i < T.selectedWork.length - 1 ? "1px solid #141414" : "none",
                    cursor: "default",
                    position: "relative",
                  }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10, flexWrap: "wrap" }}>
                      <div style={{ fontSize: 26, fontWeight: 600, color: "#E8E4DE", fontFamily: "'Playfair Display',serif", fontStyle: "italic", lineHeight: 1.1 }}>
                        {work.title}<span style={{ color: "#FF4D00", fontStyle: "normal" }}>.</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 10, letterSpacing: 1.5, color: "#444", fontFamily: "'IBM Plex Mono', monospace" }}>{work.period}</span>
                        {work.status === "active" && (
                          <span style={{ 
                            display: "inline-block", width: 6, height: 6, borderRadius: "50%", 
                            background: "#FF4D00", boxShadow: "0 0 8px rgba(255,77,0,.4)",
                            animation: "glowPulse 2s infinite",
                          }} />
                        )}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, color: "#BBB", lineHeight: 1.75, marginBottom: 8, maxWidth: 540 }}>{work.narrative}</div>
                    {work.narrative2 && <div style={{ fontSize: 12, color: "#999", lineHeight: 1.7, marginBottom: 12, maxWidth: 540 }}>{work.narrative2}</div>}
                    <div style={{ fontSize: 11, color: "#888", lineHeight: 1.6, marginBottom: 14, letterSpacing: .3 }}>{work.technical}</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {work.tags.map((tag, j) => (
                        <span key={j} style={{ 
                          fontSize: 9, letterSpacing: 1.2, color: "#777", textTransform: "uppercase", 
                          fontFamily: "'IBM Plex Mono', monospace",
                          padding: "3px 8px", border: "1px solid #2A2A2A", borderRadius: 2,
                        }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* 5. WHAT I DO */}
          <Section delay={0.15}>
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#FF4D00", textTransform: "uppercase", marginBottom: 24, opacity: .6 }}>{T.whatido}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {T.services.map((svc, i) => (
                  <div key={i} className="svc">
                    <div className="svc-in" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 20, alignItems: "start" }}>
                      <div className="svc-tw">
                        <span className="svc-t" style={{ fontSize: 28, fontWeight: 600, color: "#E8E4DE", fontFamily: "'Playfair Display',serif", fontStyle: "italic", transition: "all .25s", display: "block" }}>
                          {svc.title}<span style={{ color: "#FF4D00", fontStyle: "normal" }}>.</span>
                        </span>
                      </div>
                      <div>
                        {svc.subtitle && <div style={{ fontSize: 11, color: "#999", marginBottom: 6, fontStyle: "italic", fontFamily: "'Playfair Display',serif" }}>{svc.subtitle}</div>}
                        <div style={{ fontSize: 13, color: "#BBB", lineHeight: 1.85 }}>{svc.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* 6. HOW I WORK */}
          <Section delay={0.18}>
            <div style={{ marginBottom: 52 }}>
              <div style={{ fontSize: 10, letterSpacing: 4, color: "#FF4D00", textTransform: "uppercase", marginBottom: 20, opacity: .6 }}>{T.howLabel}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {T.method.map((m, i) => (
                  <div key={i} className="mth">
                    <div className="mth-t" style={{ fontSize: 12, fontWeight: 500, color: "#DDD", marginBottom: 4, transition: "all .2s", letterSpacing: .3 }}>{m.title}</div>
                    <div style={{ fontSize: 12, color: "#999", lineHeight: 1.75 }}>{m.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* DIVIDER */}
          <Section delay={0.2}>
            <div style={{ height: 1, background: "linear-gradient(to right,transparent,#1A1A1A,transparent)", marginBottom: 40 }} />
          </Section>

          {/* CTA + CESTINA - SEMPLIFICATO */}
          <Section delay={0.22}>
            <div style={{ marginBottom: 8 }}>
              <div style={{ textAlign: "center", marginBottom: 20, fontSize: 11, color: "#888", fontFamily: "'IBM Plex Mono', monospace" }}>
                {T.availableFor}
              </div>
              <div className="brow" style={{ display: "flex", gap: 18, justifyContent: "center", alignItems: "center" }}>
                <button className="btn-trash" onClick={handleTrash}
                  onMouseEnter={() => setHoverTrash(true)}
                  onMouseLeave={() => setHoverTrash(false)}
                  onTouchStart={() => setHoverTrash(true)}
                  onTouchEnd={() => { setTimeout(() => setHoverTrash(false), 150); }}
                  style={{
                    animation: "trashBreath 4s ease-in-out infinite",
                  }}>
                  {hoverTrash ? T.trashHover : (trashGlitchText || T.trashBtn)}
                </button>
                <span className="orsep" style={{ fontSize: 11, color: "#333" }}>{T.or}</span>
                <button className="btn-talk" onClick={openContact}
                  onMouseEnter={() => setHoverContact(true)} onMouseLeave={() => setHoverContact(false)}>
                  {hoverContact ? T.contactHover : T.contactBtn}
                </button>
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

      {/* COMING SOON — placeholder when game not ready */}
      {phase === "comingSoon" && (
        <div style={{ 
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", 
          minHeight: "100vh", padding: 40, animation: "fadeIn 1s ease-out",
          background: "radial-gradient(ellipse at center, #0A0A0A 0%, #050505 100%)",
        }}>
          <div style={{ 
            fontSize: "clamp(28px, 6vw, 42px)", 
            marginBottom: 20, 
            fontFamily: "'Playfair Display',serif", 
            fontStyle: "italic", 
            color: "#E8E4DE",
            letterSpacing: 1,
          }}>
            {T.comingSoonTitle}
          </div>
          <div style={{ 
            fontSize: 13, color: "#777", letterSpacing: .3, textAlign: "center", 
            lineHeight: 1.9, maxWidth: 400, marginBottom: 32,
          }}>
            {T.comingSoonSub}
          </div>
          <div style={{ 
            width: 60, height: 2, background: "linear-gradient(90deg, transparent, #FF4D00, transparent)", 
            marginBottom: 40, borderRadius: 1,
            animation: "glowPulse 3s infinite",
          }} />
          <div style={{ 
            fontSize: 11, color: "#555", letterSpacing: .5, textAlign: "center", 
            lineHeight: 1.8, maxWidth: 340, marginBottom: 36,
          }}>
            {T.comingSoonHint}
          </div>
          <button 
            onClick={handleBack}
            style={{
              padding: "12px 28px",
              background: "transparent",
              border: "1px solid #222",
              color: "#666",
              fontSize: 11,
              fontFamily: "'IBM Plex Mono', monospace",
              letterSpacing: 1.5,
              cursor: "pointer",
              transition: "all .25s",
            }}
            onMouseEnter={(e) => { e.target.style.borderColor = "#FF4D00"; e.target.style.color = "#FF4D00"; }}
            onMouseLeave={(e) => { e.target.style.borderColor = "#222"; e.target.style.color = "#666"; }}
          >
            {T.backBtn}
          </button>
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
