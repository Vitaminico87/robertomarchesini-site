import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";

// ============================================================================
// GAME TOGGLE - Set to true when the game is ready for launch
// ============================================================================
const GAME_ENABLED = true;
const CH2_DEBUG = false;

// ============================================================================
// ASSET CONFIGURATION
// ============================================================================
const ASSET_BASE = "https://robertomarchesini.com/assets/chapter1";
const ASSET_BASE_CH2 = "https://robertomarchesini.com/assets/chapter2";
const ASSETS = {
  pratoFirstFrame: `${ASSET_BASE}/prato_first_frame.png`,
  pratoFull: `${ASSET_BASE}/pratofull.mp4`,
  discoverCrtCloseup: `${ASSET_BASE}/discover_crt_closeup_v4_color_match_precise.webp?v=4`,
  libraryLoop: `${ASSET_BASE}/loopbiblioteca.mp4`,
  libraryFull: `${ASSET_BASE}/fullbiblioteca.mp4`,
  chapter2DeskFrame: `${ASSET_BASE_CH2}/chapter2_desk_frame.png?v=1`,
  chapter2DeskLoop: `${ASSET_BASE_CH2}/chapter2_daynight_loop.mp4?v=1`,
  chapter2StreetFrame: `${ASSET_BASE_CH2}/chapter2_street_frame_v01.png?v=1`,
  chapter2DeskGameBase: `${ASSET_BASE_CH2}/chapter2_desk_game_base.png?v=1`,
  chapter3Frame1: "https://www.robertomarchesini.com/assets/chapter3/chapter3_q1_backstage.png",
  chapter3RoomTone: "https://www.robertomarchesini.com/assets/chapter3/ch3_roomtone.wav",
  chapter3OpenChatter: "https://www.robertomarchesini.com/assets/chapter3/ch3_open_chatter.wav",
};
const CV_DOWNLOAD_URL = "/assets/roberto-marchesini-cv.pdf";


const CASE_STUDIES = {
  it: {
    largo: {
      backLabel: "← Torna ai lavori",
      openLabel: "Apri case study",
      kicker: "Case study",
      meta: "Direzione creativa · Sistema contenuti · Continuità editoriale",
      lead: "Un sistema contenuti costruito per reggere una venue con programmazione continua, oltre 150 eventi l’anno e una presenza editoriale che non poteva diventare generica.",
      proof: ["150+ eventi l’anno", "1M+ visualizzazioni mensili", "palinsesto settimanale continuo"],
      sections: [
        {
          title: "Il problema",
          body: "Largo non aveva bisogno di singoli post riusciti. Aveva bisogno di una struttura capace di sostenere ritmo, varietà e identità, settimana dopo settimana, senza collassare nella ripetizione."
        },
        {
          title: "Il sistema costruito",
          body: "Ho impostato un impianto editoriale e promozionale capace di tenere insieme programmazione, format ricorrenti, annunci, repertorio fotografico e tono di voce. Non una sequenza di output isolati, ma una macchina creativa leggibile e continua."
        },
        {
          title: "Cosa ha retto davvero",
          body: "La continuità. La riconoscibilità. La capacità di far convivere serate, pubblici e linguaggi diversi senza perdere la sensazione di un luogo con una firma precisa."
        }
      ],
      closing: "Un sistema creativo utile non serve solo a pubblicare di più. Serve a reggere meglio nel tempo."
    },
    ndp: {
      backLabel: "← Torna ai lavori",
      openLabel: "Apri case study",
      kicker: "Case study",
      heroImage: "https://www.robertomarchesini.com/assets/clients/notre_dame_case_hero.jpg",
      meta: "Direzione creativa · Sistema contenuti · Crescita audience",
      lead: "Dodici anni di direzione creativa e sistema contenuti per uno dei live brand più riconoscibili in Italia. Un lavoro lungo, costruito per dare continuità e scala a un racconto che non poteva disperdersi.",
      proof: ["12 anni di continuità", "400K+ audience", "narrazione a scala nazionale"],
      sections: [
        {
          title: "Il problema",
          body: "Notre Dame de Paris non chiedeva solo comunicazione. Chiedeva una struttura narrativa capace di restare coerente nel tempo, reggere cicli lunghi, tournée, riaperture e un pubblico molto ampio senza perdere riconoscibilità."
        },
        {
          title: "Il sistema costruito",
          body: "Ho lavorato su direzione creativa, contenuti e architettura del racconto digitale, tenendo insieme continuità, desiderabilità e memoria del progetto. Il punto non era produrre di più, ma dare al brand una traiettoria leggibile e persistente."
        },
        {
          title: "Cosa ha retto davvero",
          body: "La capacità di far crescere il racconto insieme all’audience, mantenendo riconoscibilità e tenuta anche nel lungo periodo. È qui che la narrativa è diventata sistema, non ornamento."
        }
      ],
      closing: "Quando un progetto dura davvero, la creatività da sola non basta. Serve una struttura che sappia reggere il tempo."
    },
    theia: {
      backLabel: "← Torna ai lavori",
      openLabel: "Apri case study",
      kicker: "Case study",
      meta: "Posizionamento · Sito · Architettura digitale",
      lead: "Un lavoro di posizionamento, direzione del sito e struttura digitale pensato per aumentare credibilità, chiarezza e capacità di contatto di un brand eventi premium.",
      proof: ["posizionamento premium", "brand + landing + tracking", "architettura orientata al lead"],
      sections: [
        {
          title: "Il problema",
          body: "THEIA non aveva bisogno di un sito decorativo. Aveva bisogno di una presenza digitale capace di sostenere percezione premium, chiarezza dell’offerta e qualità del contatto commerciale."
        },
        {
          title: "Il sistema costruito",
          body: "Ho lavorato su tono, struttura delle pagine, gerarchia dei contenuti e architettura del sito per costruire un’esperienza più credibile, più leggibile e più utile come macchina di presentazione e di acquisizione."
        },
        {
          title: "Cosa ha retto davvero",
          body: "L’allineamento tra percezione del brand, navigazione e qualità del lead. Non solo un’estetica premium, ma una struttura digitale pensata per sostenere fiducia e contatto."
        }
      ],
      closing: "Quando posizionamento e struttura lavorano insieme, il sito smette di essere vetrina e diventa sistema."
    }
  },
  en: {
    largo: {
      backLabel: "← Back to work",
      openLabel: "Open case study",
      kicker: "Case study",
      meta: "Creative direction · Content system · Editorial continuity",
      lead: "A content system built to sustain a venue with continuous programming, 150+ events per year, and an editorial presence that could not afford to become generic.",
      proof: ["150+ events per year", "1M+ monthly views", "continuous weekly system"],
      sections: [
        {
          title: "The problem",
          body: "Largo did not need isolated good posts. It needed a structure able to sustain rhythm, variety, and identity week after week, without collapsing into repetition."
        },
        {
          title: "The system built",
          body: "I designed an editorial and promotional structure able to hold programming, recurring formats, announcements, live photography, and tone of voice together. Not a sequence of isolated outputs, but a readable and continuous creative machine."
        },
        {
          title: "What actually held up",
          body: "Continuity. Recognizability. The ability to let different nights, audiences, and tones coexist without losing the feeling of a place with a precise signature."
        }
      ],
      closing: "A useful creative system is not there to publish more. It is there to hold up better over time."
    },
    ndp: {
      backLabel: "← Back to work",
      openLabel: "Open case study",
      kicker: "Case study",
      heroImage: "https://www.robertomarchesini.com/assets/clients/notre_dame_case_hero.jpg",
      meta: "Creative direction · Content system · Audience growth",
      lead: "Twelve years of creative direction and content system design for one of Italy’s most recognizable live brands. Long-term work built to give continuity and scale to a narrative that could not afford to disperse.",
      proof: ["12 years of continuity", "400K+ audience", "national-scale narrative"],
      sections: [
        {
          title: "The problem",
          body: "Notre Dame de Paris did not need communication alone. It needed a narrative structure able to stay coherent over time, hold up through long cycles, tours, and relaunches, and speak to a very large audience without losing recognizability."
        },
        {
          title: "The system built",
          body: "I worked on creative direction, content, and digital narrative architecture, keeping continuity, desirability, and memory of the project together. The point was not to produce more, but to give the brand a readable and persistent trajectory."
        },
        {
          title: "What actually held up",
          body: "The ability to let the narrative grow with the audience while keeping recognizability and long-term consistency. This is where narrative became system, not ornament."
        }
      ],
      closing: "When a project truly lasts, creativity alone is not enough. It needs a structure that can hold time."
    },
    theia: {
      backLabel: "← Back to work",
      openLabel: "Open case study",
      kicker: "Case study",
      meta: "Positioning · Website · Digital architecture",
      lead: "A positioning, website direction, and digital structure project designed to increase credibility, clarity, and lead quality for a premium event brand.",
      proof: ["premium positioning", "brand + landing + tracking", "lead-oriented architecture"],
      sections: [
        {
          title: "The problem",
          body: "THEIA did not need a decorative website. It needed a digital presence able to sustain premium perception, clarity of offer, and the quality of commercial contact."
        },
        {
          title: "The system built",
          body: "I worked on tone, page structure, content hierarchy, and website architecture to build an experience that was more credible, more readable, and more useful as both a presentation layer and an acquisition system."
        },
        {
          title: "What actually held up",
          body: "The alignment between brand perception, navigation, and lead quality. Not just a premium aesthetic, but a digital structure designed to sustain trust and contact."
        }
      ],
      closing: "When positioning and structure work together, the website stops being a showcase and becomes a system."
    }
  }
};

// ============================================================================
// LANGUAGE STRINGS
// ============================================================================
const LANG = {
  it: {
    status: { listening: "Aphex Twin — Windowlicker", watching: "Il Petroliere", rating: 5, imdb: "https://www.imdb.com/title/tt0469494/" },
    statusLabel: { listening: "ascoltando", watching: "ultimo film" },
    hero: "Costruisco sistemi creativi per trasformare idee complesse in contenuti, prodotti ed esperienze che reggano nel tempo.",
    heroSub: "",
    heroMobileSub: "Direzione creativa, narrativa e AI con criterio.",
    proofStrip: "Narrativa · sistemi · AI",
    proofStripMobile: "Narrativa · sistemi · AI",
    whatido: "Cosa costruisco",
    services: [
      { title: "Chiarezza", subtitle: "Capire cosa rendere chiaro", desc: "Definisco posizionamento, messaggio e struttura, così un progetto smette di disperdersi e inizia a farsi leggere meglio.", mobileDesc: "Definisco posizionamento, messaggio e struttura." },
      { title: "Forma", subtitle: "Dare forma visiva e narrativa", desc: "Trasformo idee e materiali sparsi in una struttura visiva e narrativa più coerente, leggibile e durevole.", mobileDesc: "Trasformo materiali sparsi in una struttura più coerente." },
      { title: "Rilascio", subtitle: "Far emergere un progetto nel modo giusto", desc: "Organizzo contenuti, gerarchie e touchpoint perché un progetto emerga nel modo giusto e venga capito meglio.", mobileDesc: "Organizzo contenuti, gerarchie e touchpoint." },
      { title: "Sistema", subtitle: "Costruire meglio, con controllo", desc: "Progetto workflow creativi con AI per aumentare velocità, varianti e controllo qualitativo senza abbassare il livello.", mobileDesc: "Progetto workflow creativi con AI per aumentare velocità e controllo." },
    ],
    selectedWorkLabel: "Lavori scelti",
    selectedWorkSub: "Tre progetti reali. Responsabilità vere. Strutture che hanno dovuto reggere.",
    selectedWorkMobileSub: "Progetti reali. Responsabilità vere. Strutture che hanno dovuto reggere.",
    selectedWork: [
      {
        title: "Largo Venue",
        period: "2019 – in corso",
        status: "active",
        narrative: "Direzione creativa e sistema contenuti per una venue con oltre 150 eventi l'anno.",
        mobileNarrative: "Direzione creativa e sistema contenuti per una venue con oltre 150 eventi l'anno.",
        narrative2: "Un impianto editoriale costruito per reggere ritmo, varietà e riconoscibilità nel tempo. Oltre 1M di visualizzazioni mensili.",
        technical: "Identità · Sistema contenuti · Continuità editoriale",
        proof: ["150+ eventi/anno", "1M+ view/mese", "sistema continuativo"],
        tags: ["Cultural venue", "Content system", "Weekly execution"]
      },
      {
        title: "Notre Dame de Paris",
        period: "2012 – 2024",
        status: "completed",
        narrative: "Dodici anni di direzione creativa e sistema contenuti per uno dei live brand più riconoscibili in Italia.",
        mobileNarrative: "Dodici anni di direzione creativa e sistema contenuti per uno dei live brand più riconoscibili in Italia.",
        narrative2: "Un sistema costruito nel tempo per dare continuità, scala e riconoscibilità al racconto del progetto, con un'audience cresciuta oltre 400K persone.",
        technical: "Direzione creativa · Sistema contenuti · Crescita audience",
        proof: ["12 anni di continuità", "audience oltre 400K", "sistema a scala nazionale"],
        tags: ["Live entertainment", "Project narrative", "Digital experience"]
      },
      {
        title: "THEIA Events",
        period: "2025",
        status: "active",
        narrative: "Posizionamento premium, sito e architettura digitale per un brand eventi orientato a credibilità e contatti.",
        mobileNarrative: "Posizionamento premium, sito e architettura digitale per un brand eventi orientato a credibilità e contatti.",
        narrative2: "Un'identità più chiara e una presenza digitale progettata per reggere percezione, fiducia e contatto.",
        technical: "Posizionamento · Sito · Architettura digitale",
        proof: ["posizionamento premium", "architettura orientata al lead", "brand + landing + tracking"],
        tags: ["Positioning", "Digital experience", "Qualified leads"]
      }
    ],
    howLabel: "Metodo",
    method: [
      { title: "Chiarezza prima del rumore", desc: "Si parte da ciò che deve essere capito, percepito o ricordato.", mobileDesc: "Si parte da ciò che deve restare." },
      { title: "Gli strumenti non bastano", desc: "Gli strumenti valgono per quello che rendono possibile, ma solo dentro una struttura che li governa.", mobileDesc: "Gli strumenti valgono dentro una struttura." },
      { title: "Creatività che regge nella realtà", desc: "Un sistema creativo deve reggere tempi, adattamenti, contesto e pressione.", mobileDesc: "La creatività deve reggere tempi, contesto e pressione." },
    ],
    nowBuildingLabel: "",
    nowBuilding: "",
    availableFor: "Aperto a poche collaborazioni selezionate.",
    trashPlay: "Gioca",
    ctaHint: "",
    trashBtn: "Cestina", trashHover: "Fallo.",
    contactBtn: "Parliamo", contactHover: "Vediamo se ha senso.",
    hintDefault: "Questa pagina spiega il lavoro. Il resto è il motivo per cui lo faccio.",
    hintTrash: "Questa è la superficie. Sotto c'è una storia.",
    finally: "Finalmente.", realStory: "I servizi spiegano cosa faccio. Il resto mostra come ci sono arrivato.",
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
      meadowIntro: "Da bambino ero un\'isola. I libri erano oceani, e io ci annegavo volentieri.",
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
      crossingUnlockLines: [
        "Sinapsi attiva.",
        "+1 immaginazione.",
        "Apertura di mondi.",
        "Connessioni in corso.",
        "Sistema aperto.",
      ],
      crossingTapHint: "Tocca quando la luce è al centro",
      crossingAria: "Attraversa. Tocca quando la luce è al centro.",
      backToSurface: "← Torna in superficie",
      introTitle: "L'origine",
    },
    ch2: {
      kicker: "Capitolo 2 · Conflitto",
      introCopy: "Di giorno studiavo all’università. Di notte costruivo altro.",
      continueBuildBtn: "Continua a costruire",
      stepOutBtn: "Capisci cosa tenere",
      continueFeedback: [
        "Come se non avessi già abbastanza cose aperte.",
        "Un problema solo era chiaramente troppo semplice.",
        "Ovviamente ho deciso di aggiungerne un altro.",
      ],
      streetCopy: "Fuori, almeno, il rumore cambiava forma.",
      streetNarrative: "Per schiarirmi le idee, sono uscito a mangiare qualcosa sotto la pioggia. Avevo bisogno di svuotare la testa per capire cosa tenere davvero.",
      streetNarrativeLines: [
        "Per schiarirmi le idee, sono uscito a mangiare qualcosa sotto la pioggia.",
        "Avevo bisogno di svuotare la testa per capire cosa tenere davvero.",
      ],
      streetNarrativeMobileLines: [
        "Sono uscito sotto la pioggia per schiarirmi le idee.",
        "Dovevo capire cosa tenere davvero.",
      ],
      streetStayBtn: "Resta lì un altro minuto",
      streetFocusBtn: "Capisci cosa tenere",
      streetWaitFeedback: [
        "Non era una fuga. Era una pausa per sentire meglio.",
        "Per un attimo bastavano pioggia, fari e un panino caldo.",
        "Il punto non era sparire. Era togliere rumore.",
      ],
      streetResolveFeedback: "Non dovevo tenere tutto. Solo quello che avrebbe retto.",
      streetBridgeHint: "Non potevo portarmi dietro tutto. Dovevo capire cosa restava.",
      gameSlotsLabel: "Zaino · 3 slot",
      gameIntroLine: "Non potevo portarmi dietro tutto. Dovevo scegliere cosa restava davvero.",
      gameMobilePrompt: "Scegli i 3 oggetti che porto con me.",
      gameDuplicate: "Quello è già dentro. Non serve convincersi due volte.",
      gameOrderWrong: "Ci sta. Ma non è il prossimo tassello.",
      gameCompleteKicker: "Non tutto. Questo sì.",
      gameFinalLine: "Non avevo ancora un ruolo. Avevo già una direzione.",
      backToSurface: "← Torna in superficie",
      introTitle: "Il conflitto",
    },
    ch3: {
      kicker: "Capitolo 3 · Sintesi",
      introTitle: "Sintesi",
      line: "Quando tutto si muove, serve un centro fermo.",
      stayBtn: "Resta nel flusso",
      centerBtn: "Trova il centro",
      stayFeedback: [
        "Muoversi non bastava.",
        "Il rumore da solo non decide niente.",
        "Serviva un punto fermo, non altro movimento.",
      ],
      continueBtn: "Continua",
      backToSurface: "← Torna in superficie",
    }
  },
  en: {
    status: { listening: "Aphex Twin — Windowlicker", watching: "There Will Be Blood", rating: 5, imdb: "https://www.imdb.com/title/tt0469494/" },
    statusLabel: { listening: "listening to", watching: "last watched" },
    hero: "I build creative systems to turn complex ideas into content, products, and experiences that hold up over time.",
    heroSub: "",
    heroMobileSub: "Creative direction, narrative, and AI where they actually help.",
    proofStrip: "Narrative · systems · AI",
    proofStripMobile: "Narrative · systems · AI",
    whatido: "What I build",
    services: [
      { title: "Position", subtitle: "Clarify what needs to be understood", desc: "I define positioning, message, and structure so a project stops dispersing and starts reading more clearly.", mobileDesc: "I define positioning, message, and structure." },
      { title: "Shape", subtitle: "Give ideas visual and narrative form", desc: "I turn ideas and scattered materials into a visual and narrative structure that is more coherent, readable, and durable.", mobileDesc: "I turn scattered materials into a more coherent structure." },
      { title: "Launch", subtitle: "Make a project land the right way", desc: "I organize content, hierarchy, and touchpoints so a project lands in the right way and is understood more clearly.", mobileDesc: "I organize content, hierarchy, and touchpoints." },
      { title: "System", subtitle: "Build better, with control", desc: "I design AI-assisted creative workflows to increase speed, variation, and quality control without lowering the standard.", mobileDesc: "I design AI-assisted workflows to increase speed and control." },
    ],
    selectedWorkLabel: "Selected Work",
    selectedWorkSub: "Three real projects. Real responsibility. Structures that had to hold up.",
    selectedWorkMobileSub: "Real projects. Real responsibility. Structures that had to hold up.",
    selectedWork: [
      {
        title: "Largo Venue",
        period: "2019 – ongoing",
        status: "active",
        narrative: "Creative direction and content system for a venue with weekly programming and over 150 events a year.",
        mobileNarrative: "Creative direction and content system for a venue with over 150 events a year.",
        narrative2: "An editorial and promotional structure built to sustain rhythm, variety, and recognizability over time. Over 1M monthly views.",
        technical: "Identity · Content system · Editorial continuity",
        proof: ["150+ events/year", "1M+ monthly views", "continuous content system"],
        tags: ["Cultural venue", "Content system", "Weekly execution"]
      },
      {
        title: "Notre Dame de Paris",
        period: "2012 – 2024",
        status: "completed",
        narrative: "Twelve years of creative direction and content system design for the digital communication of one of Italy's most recognizable live brands.",
        mobileNarrative: "Twelve years of creative direction and content systems for one of Italy's strongest live brands.",
        narrative2: "A system built over time to give continuity, scale, and recognizability to the project’s narrative, with an audience grown beyond 400K people.",
        technical: "Creative direction · Content system · Audience growth",
        proof: ["12 years of continuity", "audience beyond 400K", "system at national scale"],
        tags: ["Live entertainment", "Project narrative", "Digital experience"]
      },
      {
        title: "THEIA Events",
        period: "2025",
        status: "active",
        narrative: "Premium positioning, website direction, and digital architecture for an event brand driven by credibility and qualified leads.",
        mobileNarrative: "Premium positioning, website, and digital architecture for an event brand built on credibility and leads.",
        narrative2: "A clearer identity and a digital presence designed to sustain perception, trust, and contact.",
        technical: "Positioning · Website · Digital architecture",
        proof: ["premium positioning", "lead-oriented architecture", "brand + landing + tracking"],
        tags: ["Positioning", "Digital experience", "Qualified leads"]
      }
    ],
    howLabel: "Method",
    method: [
      { title: "Clarity before noise", desc: "Start from what needs to be understood, perceived, or remembered. The rest comes later.", mobileDesc: "Start from what needs to remain." },
      { title: "Tools are not enough", desc: "Tools matter for what they make possible, but only inside a structure that governs them.", mobileDesc: "Tools matter inside a structure." },
      { title: "Creativity that holds up in reality", desc: "A creative system has to hold up across timing, adaptations, context, and pressure.", mobileDesc: "Creativity has to survive timing, context, and pressure." },
    ],
    nowBuildingLabel: "",
    nowBuilding: "",
    availableFor: "Open to a small number of selected collaborations.",
    trashPlay: "Play",
    ctaHint: "",
    trashBtn: "Trash this", trashHover: "Do it.",
    contactBtn: "Let's talk", contactHover: "Let's see if it makes sense.",
    hintDefault: "This page explains the work. The rest is why I do it.",
    hintTrash: "This is the surface. There's a story underneath.",
    finally: "Finally.", realStory: "The services explain what I do. The rest shows how I got here.",
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
      crossingUnlockLines: [
        "Synapse active.",
        "+1 imagination.",
        "Worlds opening.",
        "Connections online.",
        "System open.",
      ],
      crossingTapHint: "Tap when the light is centered",
      crossingAria: "Cross. Tap when the light is centered.",
      backToSurface: "← Back to surface",
      introTitle: "Origin",
    },
    ch2: {
      kicker: "Chapter 2 · Conflict",
      introCopy: "By day I studied at university. By night I built something else.",
      continueBuildBtn: "Keep building",
      stepOutBtn: "Decide what stays",
      continueFeedback: [
        "As if I didn't already have enough things open.",
        "One problem was obviously far too simple.",
        "Naturally, I decided to add another one.",
      ],
      streetCopy: "Outside, at least, the noise changed shape.",
      streetNarrative: "To clear my head, I stepped out to eat something in the rain. I needed to empty it out and understand what was actually worth keeping.",
      streetNarrativeLines: [
        "To clear my head, I stepped out to eat something in the rain.",
        "I needed to empty it out and understand what was actually worth keeping.",
      ],
      streetNarrativeMobileLines: [
        "I stepped out in the rain to clear my head.",
        "I needed to understand what was worth keeping.",
      ],
      streetStayBtn: "Stay there a little longer",
      streetFocusBtn: "Decide what stays",
      streetWaitFeedback: [
        "It wasn't an escape. It was a pause to hear things better.",
        "For a moment, rain, headlights, and a warm sandwich were enough.",
        "The point wasn't to disappear. It was to remove noise.",
      ],
      streetResolveFeedback: "I didn't need to keep everything. Only what would hold.",
      streetBridgeHint: "I couldn't carry everything forward. I had to figure out what remained.",
      gameSlotsLabel: "Backpack · 3 slots",
      gameIntroLine: "I couldn't carry everything forward. I had to choose what truly remained.",
      gameMobilePrompt: "Choose the 3 objects I carry with me.",
      gameDuplicate: "That's already in. No need to convince yourself twice.",
      gameOrderWrong: "Fair. But it's not the next piece.",
      gameCompleteKicker: "Not everything. This one stays.",
      gameFinalLine: "I didn't have a role yet. I already had a direction.",
      backToSurface: "← Back to surface",
      introTitle: "Conflict",
    },
    ch3: {
      kicker: "Chapter 3 · Synthesis",
      introTitle: "Synthesis",
      line: "When everything moves, you need a steady center.",
      stayBtn: "Stay in the flow",
      centerBtn: "Find the center",
      stayFeedback: [
        "Movement alone wasn't enough.",
        "Noise doesn't decide anything by itself.",
        "It needed a fixed point, not more motion.",
      ],
      continueBtn: "Continue",
      backToSurface: "← Back to surface",
    }
  },
};

const EMERGED_PROFILE = {
  it: {
    currentLabel: "in emersione",
    entries: [
      {
        id: "origin",
        cap: "Origine",
        headline: "Vede prima di riempire",
        subcap: "traduzione operativa",
        body: "osservazione, immaginazione strutturata",
      },
      {
        id: "conflict",
        cap: "Conflitto",
        headline: "Tiene insieme direzioni diverse",
        subcap: "traduzione operativa",
        body: "filtro, priorità, costruzione sotto pressione",
      },
      {
        id: "synthesis",
        cap: "Sintesi",
        headline: "Trasforma attrito in metodo",
        subcap: "traduzione operativa",
        body: "narrativa, sistemi, chiarezza operativa",
      },
      {
        id: "future",
        cap: "Futuro",
        headline: "Costruisce con gli altri",
        subcap: "traduzione operativa",
        body: "collaborazione, product thinking, nuove possibilità",
      },
    ],
  },
  en: {
    currentLabel: "emerging",
    entries: [
      {
        id: "origin",
        cap: "Origin",
        headline: "Sees before filling",
        subcap: "operational translation",
        body: "observation, structured imagination",
      },
      {
        id: "conflict",
        cap: "Conflict",
        headline: "Holds different directions together",
        subcap: "operational translation",
        body: "filtering, prioritization, building under pressure",
      },
      {
        id: "synthesis",
        cap: "Synthesis",
        headline: "Turns friction into method",
        subcap: "operational translation",
        body: "narrative, systems, operational clarity",
      },
      {
        id: "future",
        cap: "Future",
        headline: "Builds with others",
        subcap: "operational translation",
        body: "collaboration, product thinking, new possibilities",
      },
    ],
  },
};

const CH2_OBJECTS = {
  it: [
    { id: "vinyl", label: "Vinile", type: "decoy", description: "Bella presenza. Funzione discutibile.", wrongLine: "Molto atmosfera. Poco avanzamento." },
    { id: "notebook", label: "Taccuino", type: "correct", description: "Per idee, appunti, connessioni.", wrongLine: "Da solo non basta. Ma senza questo mancava una base.", placedLine: "Prima di capire cosa fare, di solito scrivevo." },
    { id: "badge", label: "Badge corporate", type: "decoy", description: "Arriverà. Ma non da qui.", wrongLine: "Un po' presto per fingersi già risolto." },
    { id: "camera", label: "Macchina fotografica", type: "correct", description: "Per imparare a guardare davvero.", wrongLine: "Serve. Ma non è il primo tassello.", placedLine: "Guardare bene veniva prima di spiegare bene." },
    { id: "floppy", label: "Floppy disk", type: "correct", description: "Per il lato sistema, memoria, macchina.", wrongLine: "Ci arrivo. Ma non ancora.", placedLine: "Una parte di tutto questo passava già da una macchina." },
    { id: "ticket", label: "Biglietto aereo", type: "decoy", description: "Tentazione chiara. Tempismo sbagliato.", wrongLine: "Prima la traiettoria. Poi l'aeroporto." },
  ],
  en: [
    { id: "vinyl", label: "Vinyl", type: "decoy", description: "Great presence. Questionable function.", wrongLine: "A lot of atmosphere. Not much progress." },
    { id: "notebook", label: "Notebook", type: "correct", description: "For ideas, notes, connections.", wrongLine: "Not enough on its own. But without it, the base was missing.", placedLine: "Before figuring out what to do, I usually wrote." },
    { id: "badge", label: "Corporate badge", type: "decoy", description: "That comes later. Not from here.", wrongLine: "A little early to pretend it was already solved." },
    { id: "camera", label: "Camera", type: "correct", description: "To learn how to really look.", wrongLine: "It matters. But it's not the first piece.", placedLine: "Looking well came before explaining well." },
    { id: "floppy", label: "Floppy disk", type: "correct", description: "For the system side: memory, machine, structure.", wrongLine: "I get there. But not yet.", placedLine: "Part of all this already passed through a machine." },
    { id: "ticket", label: "Plane ticket", type: "decoy", description: "Clear temptation. Wrong timing.", wrongLine: "First the trajectory. Then the airport." },
  ],
};

const CH2_OBJECT_ORDER = ["notebook", "camera", "floppy"];
const CH2_OBJECT_ICONS = {
  vinyl: "◎",
  notebook: "✎",
  badge: "▣",
  camera: "◉",
  floppy: "◫",
  ticket: "➝",
};

function shuffleArray(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

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


function PixelInstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="8" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="6" width="2" height="2" fill="currentColor" />
    </svg>
  );
}

function PixelLinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="3" y="3" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="7" y="10" width="2" height="7" fill="currentColor" />
      <rect x="7" y="7" width="2" height="2" fill="currentColor" />
      <path d="M11 10h2v1h1v-1h2v7h-2v-4h-1v4h-2z" fill="currentColor" />
    </svg>
  );
}

function PixelDownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" shapeRendering="crispEdges">
      <rect x="3" y="18" width="18" height="3" fill="currentColor" />
      <rect x="11" y="4" width="2" height="9" fill="currentColor" />
      <rect x="9" y="11" width="2" height="2" fill="currentColor" />
      <rect x="13" y="11" width="2" height="2" fill="currentColor" />
      <rect x="8" y="13" width="8" height="2" fill="currentColor" />
    </svg>
  );
}

function HomeSocialRail({ mobile = false }) {
  const links = [
    {
      href: 'https://www.instagram.com/roberto_marchesini_/',
      label: 'Instagram',
      icon: <PixelInstagramIcon />,
      external: true,
    },
    {
      href: 'https://www.linkedin.com/in/robertocreativegrowth/',
      label: 'LinkedIn',
      icon: <PixelLinkedinIcon />,
      external: true,
    },
    {
      href: CV_DOWNLOAD_URL,
      label: 'CV',
      icon: <PixelDownloadIcon />,
      download: true,
    },
  ];

  return (
    <div className={mobile ? "home-social-rail home-social-rail-mobile" : "home-social-rail"} aria-label="Social links">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className={mobile ? "pixel-social-link pixel-social-link-mobile" : "pixel-social-link"}
          target={link.external ? '_blank' : undefined}
          rel={link.external ? 'noopener noreferrer' : undefined}
          download={link.download ? true : undefined}
          aria-label={link.label}
        >
          <span className="pixel-social-icon">{link.icon}</span>
          <span className="pixel-social-label">{link.label}</span>
        </a>
      ))}
    </div>
  );
}


function getWorkSlug(title) {
  if (title === "Largo Venue") return "largo";
  if (title === "Notre Dame de Paris") return "ndp";
  if (title === "THEIA Events") return "theia";
  return "";
}

function CaseStudyPage({ lang = "it", work, data, onBack, onContact }) {
  if (!work || !data) return null;
  const hasHeroImage = Boolean(data.heroImage);
  return (
    <div className="case-study-page" style={{ maxWidth: 1040, margin: "0 auto", padding: "72px 0 42px", animation: "fadeIn .28s ease-out" }}>
      <button className="top-btn case-study-back-btn" onClick={onBack} style={{ marginBottom: 48, color: "#FF4D00", borderColor: "rgba(255,77,0,.32)", background: "rgba(255,77,0,.03)" }}>{data.backLabel}</button>

      {hasHeroImage ? (
        <div className="case-study-hero-image-shell" style={{ position: "relative", marginBottom: 40, borderRadius: 8, overflow: "hidden", border: "1px solid rgba(255,255,255,.06)", aspectRatio: "1.68 / 1", background: "#080808" }}>
          <img src={data.heroImage} alt={work.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(1) contrast(1.02) brightness(.82)" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(5,5,5,.74) 0%, rgba(5,5,5,.28) 38%, rgba(5,5,5,.10) 100%), linear-gradient(180deg, rgba(5,5,5,.12) 0%, rgba(5,5,5,.42) 100%)" }} />
          <div style={{ position: "absolute", left: 24, right: 24, bottom: 20, maxWidth: 560 }}>
            <div className="case-study-kicker" style={{ fontSize: 10, letterSpacing: 3, color: "#FF4D00", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 12 }}>{data.kicker}</div>
            <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(38px,5.6vw,64px)", fontStyle: "italic", fontWeight: 600, lineHeight: 0.98, color: "#F6F1EA", margin: "0 0 12px", letterSpacing: "-.02em" }}>
              {work.title}<span style={{ color: "#FF4D00", fontStyle: "normal" }}>.</span>
            </h2>
            <div style={{ fontSize: 11, color: "#c1b6aa", letterSpacing: 1.45, textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.7 }}>
              {work.period} · {data.meta}
            </div>
          </div>
        </div>
      ) : (
        <div className="case-study-hero" style={{ marginBottom: 48 }}>
          <div className="case-study-kicker" style={{ fontSize: 10, letterSpacing: 3, color: "#FF4D00", textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace", marginBottom: 16 }}>{data.kicker}</div>
          <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: "clamp(42px,6vw,68px)", fontStyle: "italic", fontWeight: 600, lineHeight: 0.98, color: "#F6F1EA", margin: "0 0 14px", letterSpacing: "-.02em" }}>
            {work.title}<span style={{ color: "#FF4D00", fontStyle: "normal" }}>.</span>
          </h2>
          <div style={{ fontSize: 11, color: "#9d948a", letterSpacing: 1.55, textTransform: "uppercase", marginBottom: 28, fontFamily: "'IBM Plex Mono', monospace" }}>
            {work.period} · {data.meta}
          </div>
        </div>
      )}

      <div className="case-study-hero-copy" style={{ marginBottom: 42 }}>
        <div className="home-pretty" style={{ fontSize: 22, color: "#F6F1EA", lineHeight: 1.68, maxWidth: 700 }}>{data.lead}</div>
      </div>

      <div className="case-study-proof-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 18, marginBottom: 56 }}>
        {data.proof.map((item, idx) => (
          <div key={idx} className="case-study-proof-card" style={{ padding: "18px 18px", border: "1px solid rgba(255,77,0,.12)", borderRadius: 4, background: "linear-gradient(180deg, rgba(255,77,0,.03), rgba(255,255,255,.008))", color: "#F6F1EA", fontSize: 10, lineHeight: 1.82, letterSpacing: .36, textTransform: "uppercase", fontFamily: "'IBM Plex Mono', monospace" }}>{item}</div>
        ))}
      </div>

      <div className="case-study-sections" style={{ display: "flex", flexDirection: "column", gap: 46, marginBottom: 56 }}>
        {data.sections.map((section, idx) => (
          <section key={idx} className="case-study-section" style={{ paddingTop: 18, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <div style={{ fontSize: 25, fontFamily: "'Playfair Display',serif", fontStyle: "italic", color: "#F6F1EA", marginBottom: 14, lineHeight: 1.14 }}>{section.title}</div>
            <div className="home-pretty" style={{ fontSize: 16, color: "#E0D8CE", lineHeight: 1.96, maxWidth: 720 }}>{section.body}</div>
          </section>
        ))}
      </div>

      <div className="case-study-closing" style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 30, marginBottom: 38 }}>
        <div className="home-pretty" style={{ fontSize: 17, color: "#F6F1EA", lineHeight: 1.88, maxWidth: 690 }}>{data.closing}</div>
      </div>

      <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
        <button className="btn-talk" onClick={onContact}>{lang === "it" ? "Parliamone" : "Let's talk"}</button>
        <button className="top-btn case-study-back-btn" onClick={onBack}>{data.backLabel}</button>
      </div>
    </div>
  );
}

function HomeSignalBreak({ mobile = false }) {
  return (
    <div
      aria-hidden="true"
      style={{
        marginBottom: mobile ? 34 : 40,
        borderTop: "1px solid rgba(255,77,0,.12)",
        borderBottom: "1px solid rgba(255,255,255,.04)",
        padding: mobile ? "14px 0 12px" : "18px 0 16px",
      }}
    >
      <div
        style={{
          position: "relative",
          height: mobile ? 38 : 46,
          borderRadius: 6,
          overflow: "hidden",
          background: "linear-gradient(90deg, rgba(255,77,0,.03) 0%, rgba(255,255,255,.015) 50%, rgba(255,77,0,.03) 100%)",
          border: "1px solid rgba(255,255,255,.05)",
        }}
      >
        <div className="home-memory-scan" />
        <span className="home-memory-dot home-memory-dot-a" />
        <span className="home-memory-dot home-memory-dot-b" />
        <span className="home-memory-dot home-memory-dot-c" />
        <span className="home-memory-thread home-memory-thread-a" />
        <span className="home-memory-thread home-memory-thread-b" />
      </div>
    </div>
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

function EmergingProfilePanel({ title, idle, profiles, unlockedIds = [], currentId = null, currentLabel = "" }) {
  const unlockedSet = useMemo(() => new Set(unlockedIds), [unlockedIds]);
  const visibleProfiles = profiles.filter((profile) => unlockedSet.has(profile.id) || profile.id === currentId);

  return (
    <div className="ch1-profile">
      <div className="ch1-profile-title">{title}</div>
      {visibleProfiles.length === 0 ? (
        <div className="ch1-profile-idle">{idle}</div>
      ) : (
        <div className="ch1-profile-stack">
          {visibleProfiles.map((profile) => {
            const isUnlocked = unlockedSet.has(profile.id);
            const isCurrent = !isUnlocked && profile.id === currentId;
            return (
              <div
                key={profile.id}
                className={`ch1-profile-card ${isCurrent ? 'is-current' : 'is-unlocked'}`}
              >
                <div className="ch1-profile-meta-row">
                  <div className="ch1-profile-cap">{profile.cap}</div>
                  {isCurrent && currentLabel ? (
                    <div className="ch1-profile-status">{currentLabel}</div>
                  ) : null}
                </div>
                <div className="ch1-profile-headline">{profile.headline}</div>
                <div className="ch1-profile-subcap">{profile.subcap}</div>
                <div className="ch1-profile-body">{profile.body}</div>
              </div>
            );
          })}
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
  { x: 420, y: 820 },   // ingresso già dentro il ritmo
  { x: 640, y: 770 },   // sale
  { x: 880, y: 750 },   // picco centrale
  { x: 1120, y: 780 },  // scende
  { x: 1320, y: 830 },  // uscita verso il salto finale
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
const TOUCH_TARGET_WIDTH_MULTIPLIER = 1.14;

// Intensità effetti per salto (5 nodi attivi)
const LANDING_INTENSITY = [
  { flash: 0.34, shake: 0, breath: 1.006, saturation: 1.01 },  // Salto 1
  { flash: 0.48, shake: 1, breath: 1.011, saturation: 1.04 },  // Salto 2
  { flash: 0.62, shake: 1, breath: 1.016, saturation: 1.07 },  // Salto 3
  { flash: 0.78, shake: 2, breath: 1.022, saturation: 1.11 },  // Salto 4
  { flash: 1.0, shake: 4, breath: 1.035, saturation: 1.18 },   // Salto 5 finale
];

// Note musicali per ogni salto (5 nodi, ultima nota tenuta)
const LANDING_NOTES = [
  { freq: 262, duration: 280 },   // Do4
  { freq: 294, duration: 290 },   // Re4
  { freq: 330, duration: 310 },   // Mi4
  { freq: 392, duration: 330 },   // Sol4
  { freq: 523, duration: 2200, hold: true },  // Do5 - ultimo, tiene a lungo
];

const CROSSING_ASSETS = {
  idle: "https://www.robertomarchesini.com/assets/chapter1/boy-idle.png?v=3",
  jump: "https://www.robertomarchesini.com/assets/chapter1/boy-jump.png?v=3",
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

const VOID_ANTEPENULTIMATE_VEINS = [
  { points: [{x: 875, y: 748}, {x: 930, y: 630}, {x: 990, y: 420}, {x: 1050, y: 110}], width: 0.9 },
  { points: [{x: 880, y: 752}, {x: 950, y: 860}, {x: 1020, y: 1010}, {x: 1100, y: 1290}], width: 0.9 },
  { points: [{x: 880, y: 748}, {x: 1010, y: 710}, {x: 1160, y: 670}, {x: 1410, y: 620}], width: 0.8 },
];

const VOID_PENULTIMATE_VEINS = [
  { points: [{x: 1110, y: 785}, {x: 1160, y: 660}, {x: 1210, y: 430}, {x: 1260, y: 120}], width: 0.95 },
  { points: [{x: 1120, y: 790}, {x: 1180, y: 915}, {x: 1240, y: 1090}, {x: 1300, y: 1310}], width: 0.95 },
  { points: [{x: 1120, y: 782}, {x: 1260, y: 720}, {x: 1420, y: 660}, {x: 1710, y: 610}], width: 0.85 },
];

const VOID_FINAL_VEINS = [
  { points: [{x: 1315, y: 832}, {x: 1380, y: 650}, {x: 1450, y: 370}, {x: 1520, y: 40}], width: 1.0 },
  { points: [{x: 1320, y: 836}, {x: 1400, y: 970}, {x: 1480, y: 1140}, {x: 1580, y: 1380}], width: 1.0 },
  { points: [{x: 1320, y: 830}, {x: 1470, y: 790}, {x: 1680, y: 745}, {x: 1930, y: 700}], width: 0.85 },
  { points: [{x: 1300, y: 828}, {x: 1220, y: 700}, {x: 1120, y: 520}, {x: 980, y: 260}], width: 0.8 },
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
      const veinsToRender = [
        ...VOID_VEINS,
        ...(nodeCount >= 4 ? VOID_ANTEPENULTIMATE_VEINS : []),
        ...(nodeCount >= 5 ? VOID_PENULTIMATE_VEINS : []),
        ...(nodeCount >= 6 ? VOID_FINAL_VEINS : []),
      ];
      
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
      veinsToRender.forEach((vein) => {
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


function useObjectPlaceSound() {
  const audioCtxRef = useRef(null);

  return useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const gain2 = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(392, now);
      osc.frequency.exponentialRampToValueAtTime(523, now + 0.12);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(784, now);
      osc2.frequency.exponentialRampToValueAtTime(1046, now + 0.12);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(0.8, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

      gain2.gain.setValueAtTime(0.0001, now);
      gain2.gain.linearRampToValueAtTime(0.035, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      osc2.connect(gain2);
      gain.connect(filter);
      gain2.connect(filter);
      filter.connect(ctx.destination);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + 0.28);
      osc2.stop(now + 0.24);
    } catch (e) {
      // Audio non supportato, ignora silenziosamente
    }
  }, []);
}

function useLibrarySwosh() {
  const audioCtxRef = useRef(null);

  return useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const duration = 1.95;

      const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        const shaped = Math.pow(1 - t, 1.12);
        const softened = 0.72 + 0.28 * Math.sin(t * Math.PI * 0.5);
        data[i] = (Math.random() * 2 - 1) * shaped * softened * 0.42;
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(120, now);

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(220, now);
      bandpass.frequency.exponentialRampToValueAtTime(860, now + duration);
      bandpass.Q.setValueAtTime(0.38, now);

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(1800, now);
      lowpass.frequency.exponentialRampToValueAtTime(980, now + duration);

      const pad = ctx.createOscillator();
      pad.type = 'sine';
      pad.frequency.setValueAtTime(180, now);
      pad.frequency.exponentialRampToValueAtTime(118, now + duration);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.0001, now);
      padGain.gain.linearRampToValueAtTime(0.018, now + 0.36);
      padGain.gain.linearRampToValueAtTime(0.011, now + 1.05);
      padGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.042, now + 0.34);
      gain.gain.linearRampToValueAtTime(0.033, now + 0.95);
      gain.gain.linearRampToValueAtTime(0.020, now + 1.45);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      source.connect(highpass);
      highpass.connect(bandpass);
      bandpass.connect(lowpass);
      lowpass.connect(gain);
      gain.connect(ctx.destination);

      pad.connect(padGain);
      padGain.connect(ctx.destination);

      source.start(now);
      pad.start(now);
      source.stop(now + duration);
      pad.stop(now + duration + 0.02);
    } catch (e) {
      // Audio non supportato, ignora silenziosamente
    }
  }, []);
}


function useStreetAmbience() {
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const activeRef = useRef(false);
  const loopNodesRef = useRef([]);
  const carTimeoutRef = useRef(null);
  const clinkTimeoutRef = useRef(null);

  const ensureContext = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtxRef.current;
  }, []);

  const createNoiseBuffer = useCallback((ctx, duration = 2.4) => {
    const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < length; i++) {
      const white = Math.random() * 2 - 1;
      last = (last * 0.965) + (white * 0.035);
      data[i] = last;
    }
    return buffer;
  }, []);

  const clearCars = useCallback(() => {
    if (carTimeoutRef.current) {
      clearTimeout(carTimeoutRef.current);
      carTimeoutRef.current = null;
    }
  }, []);

  const clearClinks = useCallback(() => {
    if (clinkTimeoutRef.current) {
      clearTimeout(clinkTimeoutRef.current);
      clinkTimeoutRef.current = null;
    }
  }, []);

  const playCarPass = useCallback((ctx, master) => {
    const now = ctx.currentTime;
    const duration = 3.6;
    const source = ctx.createBufferSource();
    source.buffer = createNoiseBuffer(ctx, duration);
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(420, now);
    bandpass.frequency.exponentialRampToValueAtTime(1220, now + duration * 0.55);
    bandpass.frequency.exponentialRampToValueAtTime(560, now + duration);
    bandpass.Q.setValueAtTime(0.42, now);
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1500, now);
    lowpass.frequency.exponentialRampToValueAtTime(920, now + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.024, now + 0.9);
    gain.gain.linearRampToValueAtTime(0.013, now + 2.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null;
    if (panner) {
      const fromLeft = Math.random() > 0.5;
      panner.pan.setValueAtTime(fromLeft ? -0.68 : 0.68, now);
      panner.pan.linearRampToValueAtTime(fromLeft ? 0.58 : -0.58, now + duration);
    }
    source.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(gain);
    if (panner) {
      gain.connect(panner);
      panner.connect(master);
    } else {
      gain.connect(master);
    }
    source.start(now);
    source.stop(now + duration + 0.05);
  }, [createNoiseBuffer]);

  const scheduleCars = useCallback(() => {
    clearCars();
    const delay = 2400 + Math.random() * 2600;
    carTimeoutRef.current = setTimeout(() => {
      if (!activeRef.current || !audioCtxRef.current || !masterGainRef.current) return;
      playCarPass(audioCtxRef.current, masterGainRef.current);
      scheduleCars();
    }, delay);
  }, [clearCars, playCarPass]);

  const playDishClink = useCallback((ctx, master) => {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1380 + Math.random() * 520, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.0105, now + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1900, now);
    bandpass.Q.setValueAtTime(3.4, now);

    const panner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null;
    if (panner) {
      panner.pan.setValueAtTime(0.26 + Math.random() * 0.18, now);
    }

    osc.connect(gain);
    gain.connect(bandpass);
    if (panner) {
      bandpass.connect(panner);
      panner.connect(master);
    } else {
      bandpass.connect(master);
    }

    osc.start(now);
    osc.stop(now + 0.26);
  }, []);

  const scheduleClinks = useCallback(() => {
    clearClinks();
    const delay = 2800 + Math.random() * 3600;
    clinkTimeoutRef.current = setTimeout(() => {
      if (!activeRef.current || !audioCtxRef.current || !masterGainRef.current) return;
      playDishClink(audioCtxRef.current, masterGainRef.current);
      scheduleClinks();
    }, delay);
  }, [clearClinks, playDishClink]);

  const stop = useCallback(() => {
    activeRef.current = false;
    clearCars();
    clearClinks();

    const ctx = audioCtxRef.current;
    const master = masterGainRef.current;
    if (ctx && master) {
      const now = ctx.currentTime;
      try {
        master.gain.cancelScheduledValues(now);
        master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
        master.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);
      } catch (e) {}
    }

    const nodesToStop = [...loopNodesRef.current];
    loopNodesRef.current = [];

    nodesToStop.forEach((node) => {
      try { node.stop?.((audioCtxRef.current?.currentTime || 0) + 0.9); } catch (e) {}
    });

    setTimeout(() => {
      nodesToStop.forEach((node) => {
        try { node.disconnect?.(); } catch (e) {}
      });
      if (!activeRef.current) {
        masterGainRef.current = null;
      }
    }, 1000);
  }, [clearCars, clearClinks]);

  const start = useCallback(() => {
    try {
      const ctx = ensureContext();
      if (ctx.state === 'suspended') ctx.resume();
      if (activeRef.current) return;

      activeRef.current = true;
      const now = ctx.currentTime;

      const master = ctx.createGain();
      master.gain.setValueAtTime(0.0001, now);
      master.gain.linearRampToValueAtTime(0.42, now + 0.85);
      master.connect(ctx.destination);
      masterGainRef.current = master;

      const rainSource = ctx.createBufferSource();
      rainSource.buffer = createNoiseBuffer(ctx, 2.8);
      rainSource.loop = true;
      const rainHigh = ctx.createBiquadFilter();
      rainHigh.type = 'highpass';
      rainHigh.frequency.setValueAtTime(1800, now);
      const rainLow = ctx.createBiquadFilter();
      rainLow.type = 'lowpass';
      rainLow.frequency.setValueAtTime(7600, now);
      const rainGain = ctx.createGain();
      rainGain.gain.setValueAtTime(0.088, now);
      rainSource.connect(rainHigh);
      rainHigh.connect(rainLow);
      rainLow.connect(rainGain);
      rainGain.connect(master);
      rainSource.start(now);

      const roomSource = ctx.createBufferSource();
      roomSource.buffer = createNoiseBuffer(ctx, 3.2);
      roomSource.loop = true;
      const roomBand = ctx.createBiquadFilter();
      roomBand.type = 'bandpass';
      roomBand.frequency.setValueAtTime(540, now);
      roomBand.Q.setValueAtTime(0.35, now);
      const roomGain = ctx.createGain();
      roomGain.gain.setValueAtTime(0.034, now);
      roomSource.connect(roomBand);
      roomBand.connect(roomGain);
      roomGain.connect(master);
      roomSource.start(now);

      const roomBed = ctx.createOscillator();
      roomBed.type = 'triangle';
      roomBed.frequency.setValueAtTime(142, now);
      const roomBedGain = ctx.createGain();
      roomBedGain.gain.setValueAtTime(0.0001, now);
      roomBedGain.gain.linearRampToValueAtTime(0.0068, now + 0.9);
      roomBedGain.gain.linearRampToValueAtTime(0.0052, now + 4.2);
      roomBed.connect(roomBedGain);
      roomBedGain.connect(master);
      roomBed.start(now);

      const restaurantSource = ctx.createBufferSource();
      restaurantSource.buffer = createNoiseBuffer(ctx, 4.2);
      restaurantSource.loop = true;
      const restaurantHigh = ctx.createBiquadFilter();
      restaurantHigh.type = 'highpass';
      restaurantHigh.frequency.setValueAtTime(260, now);
      const restaurantBand = ctx.createBiquadFilter();
      restaurantBand.type = 'bandpass';
      restaurantBand.frequency.setValueAtTime(880, now);
      restaurantBand.Q.setValueAtTime(0.52, now);
      const restaurantLow = ctx.createBiquadFilter();
      restaurantLow.type = 'lowpass';
      restaurantLow.frequency.setValueAtTime(2200, now);
      const restaurantGain = ctx.createGain();
      restaurantGain.gain.setValueAtTime(0.022, now);

      const restaurantLfo = ctx.createOscillator();
      restaurantLfo.type = 'sine';
      restaurantLfo.frequency.setValueAtTime(0.11, now);
      const restaurantLfoGain = ctx.createGain();
      restaurantLfoGain.gain.setValueAtTime(0.0062, now);
      restaurantLfo.connect(restaurantLfoGain);
      restaurantLfoGain.connect(restaurantGain.gain);

      const restaurantPanner = typeof ctx.createStereoPanner === 'function' ? ctx.createStereoPanner() : null;
      if (restaurantPanner) {
        restaurantPanner.pan.setValueAtTime(0.18, now);
      }

      restaurantSource.connect(restaurantHigh);
      restaurantHigh.connect(restaurantBand);
      restaurantBand.connect(restaurantLow);
      restaurantLow.connect(restaurantGain);
      if (restaurantPanner) {
        restaurantGain.connect(restaurantPanner);
        restaurantPanner.connect(master);
      } else {
        restaurantGain.connect(master);
      }
      restaurantSource.start(now);
      restaurantLfo.start(now);

      loopNodesRef.current = [rainSource, roomSource, roomBed, restaurantSource, restaurantLfo];
      scheduleCars();
      scheduleClinks();
    } catch (e) {
      // Audio non supportato, ignora silenziosamente
    }
  }, [createNoiseBuffer, ensureContext, scheduleCars, scheduleClinks]);

  useEffect(() => () => stop(), [stop]);

  return { start, stop };
}


function useChapterThreeAmbience() {
  const roomRef = useRef(null);
  const chatterRef = useRef(null);
  const isUnlockedRef = useRef(false);

  const unlock = useCallback(() => {
    isUnlockedRef.current = true;
  }, []);

  const stop = useCallback(() => {
    [roomRef.current, chatterRef.current].forEach((audio) => {
      if (!audio) return;
      audio.pause();
      try { audio.currentTime = 0; } catch (e) {}
    });
  }, []);

  const start = useCallback(() => {
    if (!isUnlockedRef.current) return;
    const room = roomRef.current;
    const chatter = chatterRef.current;
    if (!room || !chatter) return;

    room.loop = true;
    chatter.loop = true;
    room.volume = 0.22;
    chatter.volume = 0.14;

    const playSafely = (audio) => {
      try {
        const p = audio.play();
        if (p?.catch) p.catch(() => {});
      } catch (e) {}
    };

    playSafely(room);
    playSafely(chatter);
  }, []);

  return { roomRef, chatterRef, unlock, start, stop };
}

function ConnectionsCrossing({ onComplete, jumpDuration = 440, arcHeight = 115, finalPause = 3200, hintText = "Tap when the light is centered", ariaLabel = "Cross. Tap when the light is centered.", unlockLines = [] }) {
  const [currentNodeIndex, setCurrentNodeIndex] = useState(-1);
  const [activatedNodes, setActivatedNodes] = useState([]);
  const [isJumping, setIsJumping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isFinalJump, setIsFinalJump] = useState(false);
  const [characterPos, setCharacterPos] = useState(CROSSING_ENTRY);
  const [characterVisible, setCharacterVisible] = useState(true);
  const [scenePulse, setScenePulse] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [squash, setSquash] = useState(false);
  const [transition, setTransition] = useState(null);
  const [allNodesGlow, setAllNodesGlow] = useState(false);
  const [pulsePosition, setPulsePosition] = useState(0);
  const [timingMiss, setTimingMiss] = useState(false);
  const [finalTimingBurst, setFinalTimingBurst] = useState(false);
  const [finalTimingFill, setFinalTimingFill] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [unlockCue, setUnlockCue] = useState("");

  const playLandingNote = useLandingSound();

  const rafRef = useRef(null);
  const pulseRafRef = useRef(null);
  const finalTimingRafRef = useRef(null);
  const finalTimingTimeoutRef = useRef(null);
  const finalJumpTimeoutRef = useRef(null);
  const scenePulseTimeoutRef = useRef(null);
  const hintTimeoutRef = useRef(null);
  const squashTimeoutRef = useRef(null);
  const missTimeoutRef = useRef(null);
  const unlockCueTimeoutRef = useRef(null);
  const hasInteracted = useRef(false);
  const pulseStartTime = useRef(0);

  useEffect(() => {
    const checkTouch = () => {
      if (typeof window === 'undefined') return;
      const coarse = window.matchMedia?.('(pointer: coarse)')?.matches;
      const touchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsTouchDevice(Boolean(coarse || touchCapable));
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  const toPercentX = (x) => `${(x / CROSSING_BASE_W) * 100}%`;
  const toPercentY = (y) => `${(y / CROSSING_BASE_H) * 100}%`;

  const nextJumpIndex = currentNodeIndex + 1;
  const difficulty = TIMING_DIFFICULTY[Math.min(nextJumpIndex, TIMING_DIFFICULTY.length - 1)];
  const effectiveTargetWidth = clamp(difficulty.targetWidth * (isTouchDevice ? TOUCH_TARGET_WIDTH_MULTIPLIER : 1), 0.28, 0.52);
  const targetCenter = 0.5;
  const targetStart = targetCenter - effectiveTargetWidth / 2;
  const targetEnd = targetCenter + effectiveTargetWidth / 2;



  const baseSegments = useMemo(() => {
    const points = [
      { x: -120, y: 900 },
      CROSSING_ENTRY,
      ...CROSSING_NODES,
      CROSSING_EXIT,
      { x: 1880, y: 620 },
    ];
    const segs = [];
    for (let i = 0; i < points.length - 1; i++) {
      const a = points[i];
      const b = points[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      segs.push({
        x: a.x,
        y: a.y,
        length: Math.hypot(dx, dy),
        angle: Math.atan2(dy, dx) * (180 / Math.PI),
      });
    }
    return segs;
  }, []);
  const activeSegments = useMemo(() => {
    if (activatedNodes.length === 0) return [];
    const segs = [];
    if (activatedNodes.length >= 1) {
      const a = CROSSING_ENTRY;
      const b = CROSSING_NODES[activatedNodes[0]];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      segs.push({ x: a.x, y: a.y, length: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) * (180 / Math.PI) });
    }
    for (let i = 1; i < activatedNodes.length; i++) {
      const a = CROSSING_NODES[activatedNodes[i - 1]];
      const b = CROSSING_NODES[activatedNodes[i]];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      segs.push({ x: a.x, y: a.y, length: Math.hypot(dx, dy), angle: Math.atan2(dy, dx) * (180 / Math.PI) });
    }
    return segs;
  }, [activatedNodes]);

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
    return () => {
      if (pulseRafRef.current) cancelAnimationFrame(pulseRafRef.current);
    };
  }, [isJumping, isComplete, isFinalJump, transition, difficulty.cycleDuration, currentNodeIndex]);

  useEffect(() => {
    hintTimeoutRef.current = setTimeout(() => {
      if (!hasInteracted.current) setShowHint(true);
    }, 1800);
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      if (placedGlowTimeoutRef.current) clearTimeout(placedGlowTimeoutRef.current);
      if (slotPulseTimeoutRef.current) clearTimeout(slotPulseTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (pulseRafRef.current) cancelAnimationFrame(pulseRafRef.current);
      if (finalTimingRafRef.current) cancelAnimationFrame(finalTimingRafRef.current);
      if (scenePulseTimeoutRef.current) clearTimeout(scenePulseTimeoutRef.current);
      if (squashTimeoutRef.current) clearTimeout(squashTimeoutRef.current);
      if (missTimeoutRef.current) clearTimeout(missTimeoutRef.current);
      if (unlockCueTimeoutRef.current) clearTimeout(unlockCueTimeoutRef.current);
      if (finalTimingTimeoutRef.current) clearTimeout(finalTimingTimeoutRef.current);
      if (finalJumpTimeoutRef.current) clearTimeout(finalJumpTimeoutRef.current);
    };
  }, []);

  const triggerFinalTimingBurst = useCallback(() => {
    setFinalTimingBurst(true);
    setFinalTimingFill(0);

    if (finalTimingRafRef.current) cancelAnimationFrame(finalTimingRafRef.current);
    if (finalTimingTimeoutRef.current) clearTimeout(finalTimingTimeoutRef.current);

    const startedAt = performance.now();
    const duration = 760;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setFinalTimingFill(progress);
      if (progress < 1) {
        finalTimingRafRef.current = requestAnimationFrame(tick);
      }
    };

    finalTimingRafRef.current = requestAnimationFrame(tick);
  }, []);

  const doFinalJump = useCallback(() => {
    const start = CROSSING_NODES[CROSSING_NODES.length - 1];
    const end = CROSSING_EXIT;
    setIsFinalJump(true);
    setIsJumping(true);

    const startedAt = performance.now();
    const dur = 680;

    const tick = (now) => {
      const p = Math.min((now - startedAt) / dur, 1);
      const arc = (arcHeight * 1.35) * Math.sin(p * Math.PI);
      const x = start.x + (end.x - start.x) * p;
      const y = start.y + (end.y - start.y) * p - arc;
      setCharacterPos({ x, y });

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      setCharacterVisible(false);
      setIsJumping(false);
      setTimeout(() => setTransition('fadeWhite'), 100);
      setTimeout(() => onComplete?.(), finalPause);
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [arcHeight, finalPause, onComplete]);


  const triggerLandingFx = useCallback((nodeIndex) => {
    const node = CROSSING_NODES[nodeIndex];
    const intensity = LANDING_INTENSITY[Math.min(nodeIndex, LANDING_INTENSITY.length - 1)];

    playLandingNote(nodeIndex);
    setScenePulse({ key: `${nodeIndex}-${Date.now()}`, x: node.x, y: node.y, intensity: intensity.flash });

    const nextCue = unlockLines[nodeIndex];
    if (nextCue) {
      setUnlockCue(nextCue);
      if (unlockCueTimeoutRef.current) clearTimeout(unlockCueTimeoutRef.current);
      unlockCueTimeoutRef.current = setTimeout(() => setUnlockCue(""), 1150);
    }

    setSquash(true);
    if (squashTimeoutRef.current) clearTimeout(squashTimeoutRef.current);
    squashTimeoutRef.current = setTimeout(() => setSquash(false), 130);

    if (nodeIndex === CROSSING_NODES.length - 1) {
      setAllNodesGlow(true);
      triggerFinalTimingBurst();
      setIsComplete(true);

      if (finalJumpTimeoutRef.current) clearTimeout(finalJumpTimeoutRef.current);
      if (finalTimingTimeoutRef.current) clearTimeout(finalTimingTimeoutRef.current);

      setTimeout(() => setAllNodesGlow(false), 900);

      finalJumpTimeoutRef.current = setTimeout(() => {
        setFinalTimingBurst(false);
        doFinalJump();
      }, 980);
    }

    if (scenePulseTimeoutRef.current) clearTimeout(scenePulseTimeoutRef.current);
    scenePulseTimeoutRef.current = setTimeout(() => setScenePulse(null), 520);
  }, [doFinalJump, playLandingNote, triggerFinalTimingBurst, unlockLines]);

  const doJump = useCallback((targetIndex) => {
    const start = currentNodeIndex >= 0 ? CROSSING_NODES[currentNodeIndex] : CROSSING_ENTRY;
    const end = CROSSING_NODES[targetIndex];
    setIsJumping(true);

    const startedAt = performance.now();

    const tick = (now) => {
      const p = Math.min((now - startedAt) / jumpDuration, 1);
      const arc = arcHeight * Math.sin(p * Math.PI);
      const x = start.x + (end.x - start.x) * p;
      const y = start.y + (end.y - start.y) * p - arc;
      setCharacterPos({ x, y });

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      setCharacterPos(end);
      setIsJumping(false);
      setCurrentNodeIndex(targetIndex);
      setActivatedNodes(prev => [...prev, targetIndex]);
      triggerLandingFx(targetIndex);
      pulseStartTime.current = performance.now();
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [arcHeight, currentNodeIndex, jumpDuration, triggerLandingFx]);

  const handleAdvance = () => {
    if (isJumping || isComplete || isFinalJump || timingMiss) return;
    if (!hasInteracted.current) {
      hasInteracted.current = true;
      setShowHint(false);
    }

    const isInTarget = pulsePosition >= targetStart && pulsePosition <= targetEnd;

    if (!isInTarget) {
      setTimingMiss(true);
      if (missTimeoutRef.current) clearTimeout(missTimeoutRef.current);
      missTimeoutRef.current = setTimeout(() => setTimingMiss(false), 360);
      pulseStartTime.current = performance.now();
      return;
    }

    const targetIndex = currentNodeIndex + 1;
    if (targetIndex >= CROSSING_NODES.length) return;
    doJump(targetIndex);
  };

  const spriteSrc = isJumping ? CROSSING_ASSETS.jump : CROSSING_ASSETS.idle;
  const characterTransform = squash
    ? "translate(-50%, -100%) scaleX(-1.1) scaleY(0.9)"
    : "translate(-50%, -100%) scaleX(-1)";

  const showTimingBar = !isJumping && !isComplete && !isFinalJump && !transition;

  const bgStyle = {
    position: "relative",
    width: "100%",
    aspectRatio: "4 / 3",
    maxHeight: "65vh",
    overflow: "hidden",
    backgroundColor: "#0a0d0b",
    cursor: isJumping || isComplete ? "default" : "pointer",
    userSelect: "none",
    touchAction: "manipulation",
    borderRadius: 8,
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
      onPointerDown={handleAdvance}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleAdvance();
        }
      }}
      style={bgStyle}
    >
      <VoidSynapseBackground
        activatedNodes={activatedNodes}
        scenePulse={scenePulse}
        allNodesGlow={allNodesGlow}
      />

      {(showTimingBar || finalTimingBurst) && (() => {
        const isFinalBar = finalTimingBurst;
        const isInTarget = !isFinalBar && pulsePosition >= targetStart && pulsePosition <= targetEnd;
        const distFromCenter = Math.abs(pulsePosition - 0.5);
        const centerIntensity = isFinalBar ? 1 : Math.max(0, 1 - distFromCenter * 2.5);

        return (
          <div style={{
            position: "absolute",
            top: "5%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "55%",
            maxWidth: 360,
            height: 6,
            pointerEvents: "none",
            zIndex: 20,
            animation: timingMiss && !isFinalBar ? "crossingTimingShake 0.35s ease-out" : "none",
          }}>
            <div style={{
              position: "absolute",
              inset: 0,
              background: isFinalBar
                ? "linear-gradient(90deg, rgba(199,212,160,0.10) 0%, rgba(199,212,160,0.18) 100%)"
                : "linear-gradient(90deg, transparent 5%, rgba(199,212,160,0.08) 30%, rgba(199,212,160,0.12) 50%, rgba(199,212,160,0.08) 70%, transparent 95%)",
              borderRadius: 10,
            }} />
            {isFinalBar ? (
              <>
                <div style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 10,
                  background: `linear-gradient(90deg, rgba(220,232,188,${0.10 + finalTimingFill * 0.20}) 0%, rgba(255,255,245,${0.16 + finalTimingFill * 0.48}) 50%, rgba(220,232,188,${0.10 + finalTimingFill * 0.20}) 100%)`,
                  boxShadow: `0 0 ${14 + finalTimingFill * 26}px rgba(235,242,225,${0.16 + finalTimingFill * 0.42}), 0 0 ${28 + finalTimingFill * 34}px rgba(199,212,160,${0.10 + finalTimingFill * 0.24})`,
                }} />
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: `${42 + finalTimingFill * 26}%`,
                  height: 26,
                  background: `radial-gradient(ellipse, rgba(255,255,245,${0.10 + finalTimingFill * 0.26}) 0%, rgba(199,212,160,${0.08 + finalTimingFill * 0.12}) 45%, transparent 78%)`,
                  filter: `blur(${8 + finalTimingFill * 12}px)`,
                  pointerEvents: "none",
                }} />
              </>
            ) : (
              <>
                <div style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "40%",
                  height: 20,
                  background: `radial-gradient(ellipse, rgba(199,212,160,${0.12 + centerIntensity * 0.45}) 0%, transparent 70%)`,
                  filter: `blur(${4 + centerIntensity * 5}px)`,
                  transition: "all 0.08s ease-out",
                }} />
                <div style={{
                  position: "absolute",
                  left: `${pulsePosition * 100}%`,
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: isInTarget ? 16 : 10,
                  height: isInTarget ? 16 : 10,
                  borderRadius: "50%",
                  background: isInTarget
                    ? `radial-gradient(circle, rgba(235,242,225,${0.88 + centerIntensity * 0.1}) 0%, rgba(199,212,160,0.68) 40%, transparent 70%)`
                    : "radial-gradient(circle, rgba(199,212,160,0.58) 0%, rgba(126,143,99,0.28) 50%, transparent 70%)",
                  boxShadow: isInTarget
                    ? `0 0 ${10 + centerIntensity * 14}px rgba(199,212,160,${0.55 + centerIntensity * 0.3})`
                    : "0 0 6px rgba(126,143,99,0.22)",
                  transition: "width 0.12s, height 0.12s, box-shadow 0.08s",
                }} />
              </>
            )}
            {timingMiss && !isFinalBar && (
              <div style={{
                position: "absolute",
                inset: -4,
                background: "radial-gradient(ellipse at center, rgba(255,100,100,0.12) 0%, transparent 70%)",
                borderRadius: 20,
              }} />
            )}
          </div>
        );
      })()}

      {scenePulse && (
        <div
          key={`flash-${scenePulse.key}`}
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: `radial-gradient(circle at ${toPercentX(scenePulse.x)} ${toPercentY(scenePulse.y)},
              rgba(235,242,225,${0.62 + scenePulse.intensity * 0.22}) 0%,
              rgba(199,212,160,${0.38 * scenePulse.intensity}) ${10 + scenePulse.intensity * 8}%,
              rgba(126,143,99,${0.08 * scenePulse.intensity}) ${32 + scenePulse.intensity * 14}%,
              transparent ${56 + scenePulse.intensity * 16}%)`,
            animation: "crossingSynapseFlash 420ms ease-out forwards",
          }}
        />
      )}

      {baseSegments.map((seg, i) => (
        <div key={`base-seg-${i}`} style={{
          position: "absolute",
          left: toPercentX(seg.x), top: toPercentY(seg.y),
          width: `${(seg.length / CROSSING_BASE_W) * 100}%`,
          height: "0.22%", minHeight: 1,
          transformOrigin: "0 50%",
          transform: `translateY(-50%) rotate(${seg.angle}deg)`,
          borderRadius: 999,
          background: "linear-gradient(90deg, rgba(199,212,160,0.045), rgba(199,212,160,0.12))",
          boxShadow: "0 0 4px rgba(199,212,160,0.06)",
          pointerEvents: "none",
        }} />
      ))}

      {activeSegments.map((seg, i) => (
        <div key={`seg-${i}`} style={{
          position: "absolute",
          left: toPercentX(seg.x),
          top: toPercentY(seg.y),
          width: `${(seg.length / CROSSING_BASE_W) * 100}%`,
          height: "0.3%",
          minHeight: 2,
          transformOrigin: "0 50%",
          transform: `translateY(-50%) rotate(${seg.angle}deg)`,
          borderRadius: 999,
          background: allNodesGlow
            ? "linear-gradient(90deg, rgba(235,242,225,0.38), rgba(199,212,160,0.62))"
            : "linear-gradient(90deg, rgba(199,212,160,0.08), rgba(199,212,160,0.28))",
          boxShadow: allNodesGlow
            ? "0 0 12px rgba(199,212,160,0.38)"
            : "0 0 6px rgba(199,212,160,0.14)",
          animation: "crossingLineGlow 2.2s ease-in-out infinite",
          transition: "all 0.3s ease-out",
          pointerEvents: "none",
        }} />
      ))}

      {CROSSING_NODES.map((node, index) => {
        if (!activatedNodes.includes(index)) return null;
        const isGlowing = allNodesGlow;
        return (
          <div key={`node-${index}`} style={{
            position: "absolute",
            left: toPercentX(node.x),
            top: toPercentY(node.y),
            width: isGlowing ? 12 : 8,
            height: isGlowing ? 12 : 8,
            borderRadius: 999,
            transform: "translate(-50%, -50%)",
            background: isGlowing ? "rgba(235,242,225,0.94)" : "rgba(199,212,160,0.72)",
            boxShadow: isGlowing
              ? "0 0 20px rgba(199,212,160,0.58)"
              : "0 0 10px rgba(199,212,160,0.28)",
            animation: "crossingNodeBreath 2.2s ease-in-out infinite",
            transition: "all 0.3s ease-out",
            pointerEvents: "none",
          }} />
        );
      })}

      {characterVisible && (
        <div style={{
          position: "absolute",
          left: toPercentX(characterPos.x),
          top: toPercentY(characterPos.y + 10),
          width: "clamp(14px, 2%, 24px)",
          height: "clamp(2px, 0.4%, 4px)",
          borderRadius: "50%",
          background: "rgba(0,0,0,0.22)",
          filter: "blur(2px)",
          transform: "translate(-50%, 0)",
          pointerEvents: "none",
          opacity: isJumping ? 0.25 : 0.5,
        }} />
      )}

      {characterVisible && (
        <img src={spriteSrc} alt="" draggable={false} style={{
          position: "absolute",
          left: toPercentX(characterPos.x),
          top: toPercentY(characterPos.y),
          width: "clamp(32px, 4.5%, 70px)",
          height: "auto",
          transform: characterTransform,
          transformOrigin: "center bottom",
          transition: squash ? "transform 0.07s ease-out" : "transform 0.09s ease-out",
          imageRendering: "pixelated",
          pointerEvents: "none",
          animation: !isJumping && !squash ? "crossingIdleFloat 2s ease-in-out infinite" : "none",
          filter: "none",
          opacity: 1,
          mixBlendMode: "normal",
        }} />
      )}

      {showHint && (
        <div style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "10%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          pointerEvents: "none",
          animation: "crossingHintPulse 1.4s ease-in-out infinite",
        }}>
          <div style={{
            color: "rgba(199,212,160,0.84)",
            fontSize: "clamp(9px, 2.5vw, 11px)",
            fontFamily: "'IBM Plex Mono', monospace",
            letterSpacing: 1,
            textTransform: "uppercase",
            textAlign: "center",
            lineHeight: 1.4,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
            padding: "0 10px",
          }}>
            {hintText}
          </div>
        </div>
      )}

      {unlockCue ? (
        <div className="ch1-crossing-unlock-cue">{unlockCue}</div>
      ) : null}

      {transition && (
        <div style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "rgba(235,242,225,1)",
          opacity: transition === 'fadeWhite' ? 0 : 1,
          animation: transition === 'fadeWhite' ? "crossingFadeToWhite 800ms ease-in-out forwards" : "none",
        }} />
      )}

      <div style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        boxShadow: `inset 0 0 ${86 + (activatedNodes.length * 4)}px rgba(0,0,0,${0.3 - activatedNodes.length * 0.018})`,
        transition: "box-shadow 0.5s ease-out",
      }} />

      <div className="ch1-scan" />
    </div>
  );
}



function ChapterOne({ T, onBack, onRequestChapterTwo, profileUi, profileEntries, unlockedProfileIds, onUnlockProfile }) {
  const meadowVideoRef = useRef(null);
  const libraryLoopRef = useRef(null);
  const libraryFullRef = useRef(null);
  const revealTimeoutRef = useRef(null);
  const thesisTimeoutRef = useRef(null);
  const floodTimeoutRef = useRef(null);
  const dissolveTimeoutRef = useRef(null);
  const mountCrossingTimeoutRef = useRef(null);
  const swoshTimeoutRef = useRef(null);
  const meadowFeedbackTimeoutRef = useRef(null);
  const meadowBirdsTimeoutRef = useRef(null);

  const [scene, setScene] = useState('meadow');
  const [showMeadowFeedback, setShowMeadowFeedback] = useState(false);
  const [showMeadowBirds, setShowMeadowBirds] = useState(false);
  const [showApproach, setShowApproach] = useState(false);
  const [activated, setActivated] = useState(false);
  const [profileUnlocked, setProfileUnlocked] = useState(false);
  const [showCrossing, setShowCrossing] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const [showLibraryThesis, setShowLibraryThesis] = useState(false);
  const [libraryMonitorBloom, setLibraryMonitorBloom] = useState(false);
  const [libraryPropagationActive, setLibraryPropagationActive] = useState(false);
  const [libraryRoomGreen, setLibraryRoomGreen] = useState(false);
  const [libraryTakeoverSolid, setLibraryTakeoverSolid] = useState(false);

  const unlockAudio = useCallback(() => {
    if (!audioUnlocked) setAudioUnlocked(true);
  }, [audioUnlocked]);

  const playLibrarySwosh = useLibrarySwosh();

  const syncVideoAudio = useCallback((video, { loop = false, visible = true, muted = true } = {}) => {
    if (!video) return;
    video.loop = loop;
    video.muted = muted;
    video.playsInline = true;
    video.preload = 'auto';
    video.style.display = visible ? 'block' : 'none';
    if (visible) {
      const p = video.play();
      if (p?.catch) p.catch(() => {});
    } else {
      video.pause();
    }
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
      syncVideoAudio(loopVideo, { loop: true, visible: true, muted: !audioUnlocked });

      fullVideo.muted = true;
      fullVideo.playsInline = true;
      fullVideo.preload = 'auto';

      if (activated) {
        fullVideo.style.display = 'block';
        fullVideo.currentTime = 0.32;
        fullVideo.playbackRate = 0.86;
        const p = fullVideo.play();
        if (p?.catch) p.catch(() => {});
      } else {
        fullVideo.playbackRate = 1;
        fullVideo.pause();
        fullVideo.currentTime = 0;
        fullVideo.style.display = 'block';
      }
    } else {
      loopVideo.pause();
      loopVideo.style.display = 'none';
      fullVideo.pause();
      fullVideo.currentTime = 0;
      fullVideo.style.display = 'none';
    }
  }, [activated, scene, syncVideoAudio, audioUnlocked]);

  useEffect(() => {
    if (scene !== 'discover') {
      setShowApproach(false);
      return;
    }
    setShowApproach(true);
  }, [scene]);

  useEffect(() => {
    return () => {
      if (revealTimeoutRef.current) clearTimeout(revealTimeoutRef.current);
      if (thesisTimeoutRef.current) clearTimeout(thesisTimeoutRef.current);
      if (floodTimeoutRef.current) clearTimeout(floodTimeoutRef.current);
      if (dissolveTimeoutRef.current) clearTimeout(dissolveTimeoutRef.current);
      if (mountCrossingTimeoutRef.current) clearTimeout(mountCrossingTimeoutRef.current);
      if (swoshTimeoutRef.current) clearTimeout(swoshTimeoutRef.current);
      if (meadowFeedbackTimeoutRef.current) clearTimeout(meadowFeedbackTimeoutRef.current);
      if (meadowBirdsTimeoutRef.current) clearTimeout(meadowBirdsTimeoutRef.current);
    };
  }, []);

  const handleStay = useCallback(() => {
    unlockAudio();
    setShowMeadowFeedback(true);
    setShowMeadowBirds(true);
    if (meadowFeedbackTimeoutRef.current) clearTimeout(meadowFeedbackTimeoutRef.current);
    if (meadowBirdsTimeoutRef.current) clearTimeout(meadowBirdsTimeoutRef.current);
    meadowFeedbackTimeoutRef.current = setTimeout(() => setShowMeadowFeedback(false), 2200);
    meadowBirdsTimeoutRef.current = setTimeout(() => setShowMeadowBirds(false), 2600);
  }, [unlockAudio]);

  const handleToDiscover = useCallback(() => {
    unlockAudio();
    setScene('discover');
  }, [unlockAudio]);

  const handleApproach = useCallback(() => {
    unlockAudio();
    setScene('library');
    setActivated(false);
    setShowLibraryThesis(false);
    setLibraryMonitorBloom(false);
    setLibraryPropagationActive(false);
    setLibraryRoomGreen(false);
    setLibraryTakeoverSolid(false);
  }, [unlockAudio]);

  const handleBackOff = useCallback(() => {
    if (activated) return;
    unlockAudio();
    setScene('discover');
    setLibraryMonitorBloom(false);
    setLibraryPropagationActive(false);
    setLibraryRoomGreen(false);
    setLibraryTakeoverSolid(false);
    setShowLibraryThesis(false);
  }, [activated, unlockAudio]);

  const handleContinue = useCallback(() => {
    if (activated) return;
    unlockAudio();
    setActivated(true);
    setLibraryMonitorBloom(false);
    setLibraryPropagationActive(false);
    setLibraryRoomGreen(false);
    setLibraryTakeoverSolid(false);
    setShowLibraryThesis(false);

    swoshTimeoutRef.current = setTimeout(() => {
      playLibrarySwosh();
      setLibraryMonitorBloom(true);
    }, 50);

    floodTimeoutRef.current = setTimeout(() => {
      setLibraryPropagationActive(true);
    }, 150);

    thesisTimeoutRef.current = setTimeout(() => {
      setShowLibraryThesis(true);
    }, 540);

    revealTimeoutRef.current = setTimeout(() => {
      setLibraryRoomGreen(true);
      setProfileUnlocked(true);
      onUnlockProfile?.('origin');
    }, 860);

    dissolveTimeoutRef.current = setTimeout(() => {
      setLibraryTakeoverSolid(true);
    }, 1320);

    mountCrossingTimeoutRef.current = setTimeout(() => {
      setShowCrossing(true);
    }, 1650);
  }, [activated, unlockAudio, playLibrarySwosh, onUnlockProfile]);

  const handleCrossingComplete = useCallback(() => {
    onRequestChapterTwo?.();
  }, [onRequestChapterTwo]);

  const showMeadowControls = scene === 'meadow';
  const showDiscoverControls = scene === 'discover';
  const showLibraryControls = scene === 'library' && !activated;

  return (
    <div className="ch1-root">
      <div className="ch1-wrap">
        <div className="ch1-top-slot">
          <div className="ch1-top">
            <div className="ch1-kicker">{T.kicker}</div>
            <button className="ch1-back-btn" onClick={onBack}>{T.backToSurface}</button>
          </div>
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
                <div className={`ch1-birds ${showMeadowBirds ? 'show' : ''}`} aria-hidden="true">
                  <span className="ch1-bird ch1-bird-a" />
                  <span className="ch1-bird ch1-bird-b" />
                  <span className="ch1-bird ch1-bird-c" />
                  <span className="ch1-bird ch1-bird-d" />
                </div>
              </section>

              <section className={`ch1-scene ${scene === 'discover' ? 'active' : ''}`}>
                <img className="ch1-fill ch1-discover-frame" src={ASSETS.discoverCrtCloseup} alt="" />
                <div className="ch1-discover-overlay" />
                <div className="ch1-line-block">
                  <div className="ch1-line">{T.discoverCopy}</div>
                </div>
              </section>

              <section className={`ch1-scene ${scene === 'library' ? 'active' : ''}`}>
                <div className={`ch1-library-base-layer ${libraryTakeoverSolid ? 'taken' : ''}`}>
                  <video ref={libraryLoopRef} className="ch1-fill" src={ASSETS.libraryLoop} autoPlay loop muted playsInline preload="auto" />
                  <div className="ch1-library-glow" />
                  <div className={`ch1-line-block ch1-thesis ${showLibraryThesis ? 'show' : ''}`}>
                    <div className="ch1-line">{T.revealCopy}</div>
                  </div>
                </div>
                <video
                  ref={libraryFullRef}
                  className={`ch1-fill ch1-library-activation-video ${activated ? 'active' : ''}`}
                  src={ASSETS.libraryFull}
                  muted
                  playsInline
                  preload="auto"
                />
                <div className={`ch1-library-activated-glow ${activated ? 'active' : ''}`} />
                <div className={`ch1-library-monitor-bloom ${libraryMonitorBloom ? 'active' : ''}`} />
                <div className={`ch1-library-green-propagation ${libraryPropagationActive ? 'active' : ''}`} />
                <div className={`ch1-library-room-green ${libraryRoomGreen ? 'active' : ''}`} />
                <div className={`ch1-library-full-green ${libraryTakeoverSolid ? 'active' : ''}`} />
              </section>
            </div>

            <div className="ch1-controls-slot">
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
            </div>

            <div className="ch1-profile-slot">
              <EmergingProfilePanel
                title={profileUi.title}
                idle={profileUi.idle}
                profiles={profileEntries}
                unlockedIds={unlockedProfileIds}
                currentLabel={profileUi.currentLabel}
              />
            </div>
          </>
        ) : (
          <>
            <div className="ch1-crossing-shell">
              <ConnectionsCrossing
                onComplete={handleCrossingComplete}
                hintText={T.crossingTapHint}
                ariaLabel={T.crossingAria}
                unlockLines={T.crossingUnlockLines}
              />
            </div>
            <div className="ch1-controls-slot" aria-hidden="true" />
            <div className="ch1-profile-slot">
              <EmergingProfilePanel
                title={profileUi.title}
                idle={profileUi.idle}
                profiles={profileEntries}
                unlockedIds={unlockedProfileIds}
                currentLabel={profileUi.currentLabel}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}




function ChapterIntroCard({ number, title, onDone, label = "Chapter" }) {
  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof onDone === "function") onDone();
    }, 4600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="ch1-root">
      <div className="ch1-wrap">
        <div className="ch1-top-slot chapter-intro-top-slot" aria-hidden="true" />
        <div className="chapter-intro-stage" onClick={onDone} role="button" tabIndex={0}
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onDone?.(); }}>
          <div className="chapter-intro-inner">
            <div className="chapter-intro-kicker">{label} {number}</div>
            <div className="chapter-intro-title">{title}</div>
          </div>
        </div>
        <div className="ch1-controls-slot chapter-intro-controls-slot" aria-hidden="true" />
        <div className="ch1-profile-slot chapter-intro-profile-slot" aria-hidden="true" />
      </div>
    </div>
  );
}

function ChapterTwoObjectGame({ lang, T, onComplete }) {
  const baseItems = CH2_OBJECTS[lang] || CH2_OBJECTS.it;
  const items = useMemo(() => shuffleArray(baseItems), [baseItems]);
  const [placedIds, setPlacedIds] = useState([]);
  const [feedback, setFeedback] = useState(T.gameIntroLine);
  const [shakeId, setShakeId] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showNextHint, setShowNextHint] = useState(false);
  const [lastPlacedId, setLastPlacedId] = useState(null);
  const [slotPulse, setSlotPulse] = useState(false);
  const [gameBaseSrc, setGameBaseSrc] = useState(ASSETS.chapter2DeskGameBase);
  const [imageState, setImageState] = useState("loading");
  const completeTimeoutRef = useRef(null);
  const shakeTimeoutRef = useRef(null);
  const hintTimeoutRef = useRef(null);
  const placedGlowTimeoutRef = useRef(null);
  const slotPulseTimeoutRef = useRef(null);
  const playObjectPlaceSound = useObjectPlaceSound();

  useEffect(() => {
    return () => {
      if (completeTimeoutRef.current) clearTimeout(completeTimeoutRef.current);
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      if (placedGlowTimeoutRef.current) clearTimeout(placedGlowTimeoutRef.current);
      if (slotPulseTimeoutRef.current) clearTimeout(slotPulseTimeoutRef.current);
    };
  }, []);

  const placedSet = useMemo(() => new Set(placedIds), [placedIds]);
  const expectedId = CH2_OBJECT_ORDER[placedIds.length];
  const finalLineParts = lang === 'it'
    ? ["Non avevo ancora un ruolo.", "Avevo già una direzione."]
    : ["I didn't have a role yet.", "I already had a direction."];

  useEffect(() => {
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    setShowNextHint(false);

    if (!expectedId || isComplete) return;

    hintTimeoutRef.current = setTimeout(() => {
      setShowNextHint(true);
    }, 2400);

    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      if (placedGlowTimeoutRef.current) clearTimeout(placedGlowTimeoutRef.current);
      if (slotPulseTimeoutRef.current) clearTimeout(slotPulseTimeoutRef.current);
    };
  }, [expectedId, isComplete]);

  const triggerShake = useCallback((id) => {
    setShakeId(id);
    if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current);
    shakeTimeoutRef.current = setTimeout(() => setShakeId(null), 320);
  }, []);

  const handlePick = useCallback((item) => {
    if (isComplete) return;

    if (placedSet.has(item.id)) {
      setFeedback(T.gameDuplicate);
      return;
    }

    if (item.type === 'decoy') {
      triggerShake(item.id);
      setFeedback(item.wrongLine);
      return;
    }

    if (item.id !== expectedId) {
      triggerShake(item.id);
      setFeedback(item.wrongLine || T.gameOrderWrong);
      return;
    }

    const nextPlaced = [...placedIds, item.id];
    setPlacedIds(nextPlaced);
    setLastPlacedId(item.id);
    setSlotPulse(true);
    setFeedback(item.placedLine);
    playObjectPlaceSound();

    if (placedGlowTimeoutRef.current) clearTimeout(placedGlowTimeoutRef.current);
    placedGlowTimeoutRef.current = setTimeout(() => setLastPlacedId(null), 520);
    if (slotPulseTimeoutRef.current) clearTimeout(slotPulseTimeoutRef.current);
    slotPulseTimeoutRef.current = setTimeout(() => setSlotPulse(false), 420);

    if (nextPlaced.length === CH2_OBJECT_ORDER.length) {
      setIsComplete(true);
      setFeedback(T.gameFinalLine);
      completeTimeoutRef.current = setTimeout(() => {
        onComplete?.();
      }, 2400);
    }
  }, [T.gameDuplicate, T.gameFinalLine, T.gameOrderWrong, expectedId, isComplete, onComplete, placedIds, placedSet, triggerShake]);

  return (
    <>
      <div className="ch2-stage ch2-game-stage">
        <img
          className="ch2-fill"
          src={gameBaseSrc}
          alt=""
          onLoad={() => setImageState("loaded")}
          onError={() => {
            if (gameBaseSrc !== ASSETS.chapter2DeskFrame) {
              setImageState("fallback");
              setGameBaseSrc(ASSETS.chapter2DeskFrame);
            } else {
              setImageState("error");
            }
          }}
        />
        <div className="ch2-game-vignette" />
        {CH2_DEBUG ? (
          <div className="ch2-debug-panel ch2-debug-panel-game">
            <div>scene: selection</div>
            <div>image: {imageState}</div>
            <div className="ch2-debug-src">{gameBaseSrc}</div>
          </div>
        ) : null}
        <div className="ch2-game-slot-shell">
          <div className="ch2-game-slot-label">{T.gameSlotsLabel}</div>
          <div className="ch2-game-slot-grid">
            {Array.from({ length: CH2_OBJECT_ORDER.length }).map((_, index) => {
              const placedId = placedIds[index];
              const placedItem = items.find((item) => item.id === placedId);
              return (
                <div key={index} className={`ch2-game-slot ${placedItem ? 'is-filled' : ''} ${slotPulse && placedItem ? 'is-pulsing' : ''}`}>
                  {placedItem ? placedItem.label : <span>Slot {index + 1}</span>}
                </div>
              );
            })}
          </div>
        </div>
        {isComplete ? (
          <div className="ch2-game-complete-card">
            <div className="ch2-game-complete-kicker">{T.gameCompleteKicker}</div>
            <div className="ch2-game-complete-line">
              {finalLineParts.map((line, index) => (
                <span key={index} className={index === 0 ? 'is-top' : 'is-bottom'}>{line}</span>
              ))}
            </div>
          </div>
        ) : null}
        <div className="ch1-scan" />
      </div>

      <div className="ch2-game-slot-shell ch2-game-slot-shell-mobile">
        <div className="ch2-game-slot-label">{T.gameSlotsLabel}</div>
        <div className="ch2-game-slot-grid">
          {Array.from({ length: CH2_OBJECT_ORDER.length }).map((_, index) => {
            const placedId = placedIds[index];
            const placedItem = items.find((item) => item.id === placedId);
            return (
              <div key={index} className={`ch2-game-slot ${placedItem ? 'is-filled' : ''} ${slotPulse && placedItem ? 'is-pulsing' : ''}`}>
                {placedItem ? placedItem.label : <span>Slot {index + 1}</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="ch1-controls-slot ch2-object-controls-slot">
        <div className={`ch2-game-feedback ${feedback ? 'show' : ''} ${isComplete ? 'is-complete' : ''}`}>{feedback}</div>
        {!isComplete ? <div className="ch2-game-prompt">{T.gameMobilePrompt}</div> : null}
        <div className="ch2-game-grid">
          {items.map((item) => {
            const isPlaced = placedSet.has(item.id);
            const isWrong = item.type === 'decoy';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePick(item)}
                disabled={isComplete}
                className={`ch2-game-object ${isPlaced ? 'is-placed' : ''} ${isWrong ? 'is-decoy' : ''} ${shakeId === item.id ? 'is-shaking' : ''} ${!isPlaced && !isComplete && showNextHint && item.id === expectedId ? 'is-next' : ''} ${lastPlacedId === item.id ? 'is-placed-feedback' : ''}`}
              >
                <span className="ch2-game-object-icon" aria-hidden="true">{CH2_OBJECT_ICONS[item.id] || "◻"}</span>
                <span className="ch2-game-object-title">{item.label}</span>
                <span className="ch2-game-object-desc">{item.description}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}


function ChapterTwoScene({ lang, T, onBack, onComplete, profileUi, profileEntries, unlockedProfileIds, currentProfileId, onUnlockProfile }) {
  const deskLoopRef = useRef(null);
  const continueIdxRef = useRef(0);
  const selectionTimeoutRef = useRef(null);

  const [scene, setScene] = useState("desk");
  const [windowGlow, setWindowGlow] = useState(0.08);
  const [roomDayLift, setRoomDayLift] = useState(0.08);
  const [roomNightShade, setRoomNightShade] = useState(0.16);
  const [deskFeedbackText, setDeskFeedbackText] = useState("");
  const [deskTransitioning, setDeskTransitioning] = useState(false);

  useEffect(() => {
    const video = deskLoopRef.current;
    if (!video) return;

    if (scene !== "desk") {
      video.pause();
      return;
    }

    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    const play = () => { const p = video.play(); if (p?.catch) p.catch(() => {}); };
    play();

    let raf = 0;
    const tick = () => {
      if (video.duration) {
        const phase = video.currentTime / video.duration;
        const eased = 0.5 - 0.5 * Math.cos(phase * Math.PI * 2);
        setWindowGlow(0.05 + eased * 0.13);
        setRoomDayLift(0.05 + eased * 0.18);
        setRoomNightShade(0.24 - eased * 0.14);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      video.pause();
    };
  }, [scene]);

  useEffect(() => {
    return () => {
      if (selectionTimeoutRef.current) clearTimeout(selectionTimeoutRef.current);
    };
  }, []);

  const handleContinueBuild = useCallback(() => {
    if (deskTransitioning) return;
    const lines = T.continueFeedback || [];
    if (!lines.length) return;
    const idx = continueIdxRef.current % lines.length;
    setDeskFeedbackText(lines[idx]);
    continueIdxRef.current = idx + 1;
  }, [T, deskTransitioning]);

  const handleStepOut = useCallback(() => {
    if (deskTransitioning) return;
    setDeskFeedbackText(T.streetBridgeHint);
    setDeskTransitioning(true);
    onUnlockProfile?.("conflict");
    if (selectionTimeoutRef.current) clearTimeout(selectionTimeoutRef.current);
    selectionTimeoutRef.current = setTimeout(() => {
      setScene("selection");
    }, 950);
  }, [T, deskTransitioning, onUnlockProfile]);

  useEffect(() => {
    if (CH2_DEBUG) {
      console.log("[CH2 DEBUG]", { scene, deskTransitioning });
    }
  }, [scene, deskTransitioning]);

  return (
    <div className="ch1-root">
      <div className="ch1-wrap">
        <div className="ch1-top-slot">
          <div className="ch1-top">
            <div className="ch1-kicker">{T.kicker}</div>
            <button className="ch1-back-btn" onClick={onBack}>{T.backToSurface}</button>
          </div>
        </div>

        {CH2_DEBUG ? (
          <div className="ch2-debug-panel ch2-debug-panel-global">
            <div>scene: {scene}</div>
            <div>transitioning: {deskTransitioning ? "yes" : "no"}</div>
          </div>
        ) : null}

        {scene === "desk" ? (
          <>
            <div className={`ch2-stage ${deskTransitioning ? "ch2-stage-transitioning" : ""}`}>
              <img className="ch2-fill" src={ASSETS.chapter2DeskFrame} alt="" />

              <div className="ch2-window-mask">
                <video
                  ref={deskLoopRef}
                  className="ch2-window-video"
                  src={ASSETS.chapter2DeskLoop}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                />
              </div>

              <div className="ch2-window-spill" style={{ opacity: windowGlow }} />
              <div className="ch2-room-daylift" style={{ opacity: roomDayLift }} />
              <div className="ch2-room-nightshade" style={{ opacity: roomNightShade }} />
              <div className="ch2-monitor-breath" />
              <div className="ch2-room-grade" />
              <div className="ch2-line-block">
                <div className="ch2-line">{T.introCopy}</div>
              </div>
              <div className={`ch2-feedback-overlay ${deskFeedbackText ? "show" : ""} ${deskTransitioning ? "is-bridge" : ""}`}>{deskFeedbackText}</div>
              <div className="ch1-scan" />
            </div>
            <div className="ch1-controls-slot">
              {deskTransitioning ? (
                <div className="ch2-desk-transition-copy">{T.streetBridgeHint}</div>
              ) : (
                <div className="ch1-controls ch2-controls">
                  <Ch1ChoiceButton onClick={handleContinueBuild}>{T.continueBuildBtn}</Ch1ChoiceButton>
                  <Ch1ChoiceButton subtle onClick={handleStepOut}>{T.stepOutBtn}</Ch1ChoiceButton>
                </div>
              )}
            </div>
          </>
        ) : (
          <ChapterTwoObjectGame lang={lang} T={T} onComplete={onComplete} />
        )}

        <div className="ch1-profile-slot ch2-profile-slot">
          <EmergingProfilePanel
            title={profileUi.title}
            idle={profileUi.idle}
            profiles={profileEntries}
            unlockedIds={unlockedProfileIds}
            currentId={currentProfileId}
            currentLabel={profileUi.currentLabel}
          />
        </div>
      </div>
    </div>
  );
}

function ChapterThreeScene({ T, onBack, onComplete, profileUi, profileEntries, unlockedProfileIds, currentProfileId, onUnlockProfile }) {
  const ambience = useChapterThreeAmbience();
  const feedbackTimeoutRef = useRef(null);
  const transitionTimeoutRef = useRef(null);
  const feedbackIdxRef = useRef(0);

  const [feedbackText, setFeedbackText] = useState("");
  const [sceneBreath, setSceneBreath] = useState(false);
  const [passingCrew, setPassingCrew] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);

  useEffect(() => {
    onUnlockProfile?.("synthesis");
    const breathT = setInterval(() => setSceneBreath((v) => !v), 2800);
    const crewT = setInterval(() => {
      setPassingCrew(true);
      setTimeout(() => setPassingCrew(false), 2400);
    }, 8200);
    return () => {
      if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
      if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
      clearInterval(breathT);
      clearInterval(crewT);
      ambience.stop();
    };
  }, [onUnlockProfile, ambience]);

  useEffect(() => {
    if (audioUnlocked) ambience.start();
    return undefined;
  }, [audioUnlocked, ambience]);

  const unlockAmbience = useCallback(() => {
    if (audioUnlocked) return;
    ambience.unlock();
    setAudioUnlocked(true);
  }, [audioUnlocked, ambience]);

  const handleStay = useCallback(() => {
    unlockAmbience();
    const lines = T.stayFeedback || [];
    if (!lines.length) return;
    const idx = feedbackIdxRef.current % lines.length;
    feedbackIdxRef.current = idx + 1;
    setFeedbackText(lines[idx]);
    if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
    feedbackTimeoutRef.current = setTimeout(() => setFeedbackText(""), 2200);
  }, [T.stayFeedback, unlockAmbience]);

  const handleCenter = useCallback(() => {
    unlockAmbience();
    setFeedbackText("");
    setTransitioning(true);
    if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
    transitionTimeoutRef.current = setTimeout(() => {
      onComplete?.();
    }, 850);
  }, [onComplete, unlockAmbience]);

  return (
    <div className="ch1-root">
      <div className="ch1-wrap">
        <div className="ch1-top-slot">
          <div className="ch1-top">
            <div className="ch1-kicker">{T.kicker}</div>
            <button className="ch1-back-btn" onClick={onBack}>{T.backToSurface}</button>
          </div>
        </div>

        <div
          className={`ch2-stage ch3-stage ${sceneBreath ? 'is-breathing' : ''} ${transitioning ? 'is-transitioning' : ''}`}
          onPointerDown={unlockAmbience}
        >
          <audio ref={ambience.roomRef} src={ASSETS.chapter3RoomTone} preload="auto" />
          <audio ref={ambience.chatterRef} src={ASSETS.chapter3OpenChatter} preload="auto" />
          <img className="ch2-fill" src={ASSETS.chapter3Frame1} alt="" />
          <div className="ch3-light-bloom" />
          <div className="ch3-grade" />
          <div className="ch3-floor-sweep" />
          <div className={`ch3-crew-pass ${passingCrew ? 'is-visible' : ''}`} />
          <div className="ch3-tech-flicker" />
          <div className="ch3-vignette" />
          <div className="ch2-line-block ch3-line-block">
            <div className="ch2-line ch3-line">{T.line}</div>
          </div>
          <div className={`ch2-feedback-overlay ch3-feedback-overlay ${feedbackText ? 'show' : ''}`}>{feedbackText}</div>
          <div className="ch1-scan" />
        </div>

        <div className="ch1-controls-slot">
          <div className="ch1-controls ch2-controls">
            <Ch1ChoiceButton subtle onClick={handleStay}>{T.stayBtn}</Ch1ChoiceButton>
            <Ch1ChoiceButton onClick={handleCenter}>{T.centerBtn}</Ch1ChoiceButton>
          </div>
        </div>

        <div className="ch1-profile-slot ch2-profile-slot">
          <EmergingProfilePanel
            title={profileUi.title}
            idle={profileUi.idle}
            profiles={profileEntries}
            unlockedIds={unlockedProfileIds}
            currentId={currentProfileId}
            currentLabel={profileUi.currentLabel}
          />
        </div>
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
  const falling = u.map((w, i) => ({
    text: w,
    x: 5 + Math.random() * 85,
    y: 5 + (i / u.length) * 80,
    del: Math.random() * .7,
    dur: .7 + Math.random() * .5,
    rot: (Math.random() - .5) * 50,
    size: special.includes(w) ? 22 : (w.length > 8 ? 11 : 13),
    color: ["Roberto", "Marchesini"].includes(w) ? "#F0ECE6" : ["Create", "Grow", "Evolve", "Teach"].includes(w) ? "#FF4D00" : "#666",
    serif: special.includes(w),
    bold: special.includes(w),
    italic: ["Create", "Grow", "Evolve", "Teach"].includes(w),
  }));

  return falling;
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
  const [showTrashPlay, setShowTrashPlay] = useState(false);
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
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const timeOnPage = useRef(0);
  const hasScrolled = useRef(false);

  const T = LANG[lang];
  const profileMeta = EMERGED_PROFILE[lang];
  const proofStripText = isMobileViewport ? (T.proofStripMobile || T.proofStrip) : T.proofStrip;
  const selectedWorkSubText = isMobileViewport ? (T.selectedWorkMobileSub || T.selectedWorkSub) : T.selectedWorkSub;
  const [gameFlow, setGameFlow] = useState("chapter1");
  const [unlockedProfileIds, setUnlockedProfileIds] = useState([]);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const scanAudioCtxRef = useRef(null);
  const scrollScanPlayedRef = useRef(false);

  const playScrollScan = useCallback(() => {
    try {
      if (!scanAudioCtxRef.current) {
        scanAudioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = scanAudioCtxRef.current;
      if (ctx.state === 'suspended') ctx.resume();

      const now = ctx.currentTime;
      const duration = 0.42;

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1280, now);
      osc.frequency.exponentialRampToValueAtTime(460, now + duration);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.012, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(920, now);
      filter.Q.setValueAtTime(0.8, now);

      const noiseBuffer = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * duration)), ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      for (let i = 0; i < data.length; i += 1) {
        data[i] = (Math.random() * 2 - 1) * (1 - (i / data.length)) * 0.22;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.linearRampToValueAtTime(0.009, now + 0.02);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(2200, now);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      osc.start(now);
      noise.start(now);
      osc.stop(now + duration + 0.02);
      noise.stop(now + duration + 0.02);
    } catch (e) {}
  }, []);

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

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      setIsMobileViewport(window.innerWidth <= 600);
    };
    updateViewport();
    window.addEventListener("resize", updateViewport, { passive: true });
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

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
      if (scrollY > 20) {
        hasScrolled.current = true;
        setScrolled(true);
        if (!scrollScanPlayedRef.current) {
          scrollScanPlayedRef.current = true;
          playScrollScan();
        }
      }
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

  useEffect(() => {
    if (phase !== "main" || hoverTrash) return;
    const interval = setInterval(() => {
      setShowTrashPlay(true);
      setTimeout(() => setShowTrashPlay(false), 1700);
    }, 7200);
    return () => clearInterval(interval);
  }, [phase, hoverTrash, lang]);

  const unlockProfile = useCallback((id) => {
    setUnlockedProfileIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const switchLang = useCallback(() => {
    setBlackout(true);
    setTimeout(() => { setLang(l => l === "it" ? "en" : "it"); }, 200);
    setTimeout(() => { setBlackout(false); setGlitch(true); setTimeout(() => setGlitch(false), 500); }, 400);
  }, []);

  const handleTrash = () => {
    scrollScanPlayedRef.current = false;
    setUnlockedProfileIds([]);
    setGameFlow("chapter1Intro");
    setActiveCaseStudy(null);
    setFallingWords(genFallingWords(T));
    setFalling(true);
    setContentFading(true);
    setTimeout(() => { setFalling(false); setPhase("trashed"); }, 2000);
    setTimeout(() => setPhase(GAME_ENABLED ? "game" : "comingSoon"), 4000);
  };

  const handleBack = () => {
    scrollScanPlayedRef.current = false;
    setUnlockedProfileIds([]);
    setGameFlow("chapter1");
    setActiveCaseStudy(null);
    setFalling(false);
    setFallingWords([]);
    setContentFading(false);
    setPhase("main");
    if (typeof window !== "undefined") window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setGlitch(true);
    setTimeout(() => setGlitch(false), 500);
    // Reset ghost system
    setGhostReady(false);
    setScrollProgress(0);
    setScrolled(false);
    timeOnPage.current = 0;
    hasScrolled.current = false;
  };

  const openContact = () => window.open("mailto:info@robertomarchesini.com", "_blank");
  const openCaseStudy = useCallback((slug) => setActiveCaseStudy(slug), []);
  const closeCaseStudy = useCallback(() => setActiveCaseStudy(null), []);

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
        @keyframes chapterCardHoldFade{0%{opacity:0}10%{opacity:1}78%{opacity:1}100%{opacity:0}}
        @keyframes chapterCardTextFloat{0%{opacity:0;transform:translateY(18px)}14%{opacity:1;transform:translateY(0)}78%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-8px)}}

        @keyframes homeSignalPulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:.72;transform:scale(1.06)}}
        @keyframes homeSignalBlink{0%,84%,100%{opacity:.22}88%{opacity:.7}92%{opacity:.3}}
        @keyframes homeSignalSweep{0%{transform:translateX(-120%)}100%{transform:translateX(180%)}}
        @keyframes homeSignalFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-2px)}}
        .home-signal-break{margin:4px 0 44px;padding:6px 0 2px}
        .home-signal-grid{display:grid;gap:12px;align-items:stretch}
        .home-signal-card{position:relative;min-height:88px;border:1px solid #141414;border-radius:8px;background:linear-gradient(180deg,rgba(255,255,255,.012),rgba(255,255,255,.004));overflow:hidden}
        .home-signal-card::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.035) 3px,rgba(0,0,0,.035) 6px);opacity:.32;pointer-events:none}
        .home-signal-card-center{min-height:88px}
        .home-signal-node-wrap,.home-signal-port-wrap,.home-signal-window{position:absolute;inset:0}
        .home-signal-node{position:absolute;width:8px;height:8px;border-radius:50%;background:rgba(255,77,0,.72);box-shadow:0 0 10px rgba(255,77,0,.18);animation:homeSignalPulse 3.4s ease-in-out infinite}
        .home-signal-node-a{left:24%;top:44%}
        .home-signal-node-b{left:50%;top:30%;animation-delay:.4s}
        .home-signal-node-c{left:72%;top:56%;animation-delay:.9s}
        .home-signal-link{position:absolute;height:1px;background:linear-gradient(90deg,rgba(255,77,0,.14),rgba(255,77,0,.42),rgba(255,77,0,.14));transform-origin:left center}
        .home-signal-link-ab{left:27%;top:47%;width:28%;transform:rotate(-18deg)}
        .home-signal-link-bc{left:52%;top:39%;width:25%;transform:rotate(30deg)}
        .home-signal-window{display:flex;align-items:center;justify-content:center}
        .home-signal-window::before{content:"";position:absolute;left:18%;right:18%;top:18%;bottom:18%;border:1px solid rgba(255,255,255,.08);border-radius:6px;background:rgba(255,255,255,.01)}
        .home-signal-window-glow{position:absolute;left:24%;right:24%;top:24%;bottom:24%;background:radial-gradient(circle,rgba(255,77,0,.12) 0%,rgba(255,77,0,.04) 48%,transparent 72%);filter:blur(8px);animation:homeSignalPulse 4.2s ease-in-out infinite}
        .home-signal-window-line{position:absolute;left:28%;right:28%;height:1px;background:linear-gradient(90deg,transparent,rgba(232,228,222,.5),transparent)}
        .home-signal-window-line-1{top:38%}
        .home-signal-window-line-2{top:50%;animation:homeSignalBlink 5.4s linear infinite}
        .home-signal-window-line-3{top:62%}
        .home-signal-port-shell{position:absolute;left:26%;right:26%;top:28%;bottom:28%;border:1px solid rgba(255,255,255,.08);border-radius:8px;background:rgba(255,255,255,.012)}
        .home-signal-port-slot{position:absolute;left:39%;right:39%;top:44%;height:10px;border-radius:2px;background:#0b0b0b;box-shadow:0 0 0 1px rgba(255,255,255,.04)}
        .home-signal-port-led{position:absolute;right:31%;top:35%;width:6px;height:6px;border-radius:50%;background:rgba(255,77,0,.62);box-shadow:0 0 10px rgba(255,77,0,.24);animation:homeSignalBlink 4.8s linear infinite}
        .work-card{transition:all .3s}
        .work-card:hover{padding-left:12px;border-left:2px solid rgba(255,77,0,.4)!important}
        .svc{padding:30px 32px;border:1px solid #151515;border-radius:4px;transition:all .3s;cursor:default}
        .svc:hover{border-color:rgba(255,77,0,.35);background:rgba(255,77,0,.02)}
        .svc:hover .svc-t{color:#FF4D00!important;text-shadow:0 0 15px rgba(255,77,0,.12)}
        .work-card{transition:all .3s;padding-left:0;border-left:3px solid transparent}
        .work-card:hover{border-left-color:#FF4D00;padding-left:22px;background:linear-gradient(90deg,rgba(255,77,0,.03) 0%,transparent 46%)}
        .mth{padding:4px 0 4px 20px;border-left:2px solid #161616;transition:all .25s;cursor:default}
        .mth:hover{border-left-color:#FF4D00;padding-left:24px}
        .mth:hover .mth-t{color:#FF4D00!important}
        .btn-trash{min-width:140px;padding:16px 38px;background:transparent;border:1px solid #FF4D00;color:#FF4D00;font-size:12px;font-family:'IBM Plex Mono',monospace;letter-spacing:2.5px;cursor:pointer;text-transform:uppercase;font-weight:500;transition:background .2s,color .2s}
        .btn-talk{padding:16px 38px;background:transparent;border:1px solid #444;color:#AAA;font-size:12px;font-family:'IBM Plex Mono',monospace;letter-spacing:2.5px;cursor:pointer;text-transform:uppercase;font-weight:500;transition:all .25s}
        .btn-talk:hover{background:#E8E4DE;color:#050505;border-color:#E8E4DE;box-shadow:0 0 20px rgba(232,228,222,.12)}
        .fl-word{position:absolute;white-space:nowrap;opacity:0}
        .fl-word.go{animation:fall var(--dur) var(--del) ease-in forwards}
        .top-btn{background:transparent;border:1px solid rgba(255,77,0,.22);border-radius:3px;padding:6px 12px;cursor:pointer;transition:all .25s;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1.1px;color:#FF4D00}
        .top-btn:hover{border-color:rgba(255,77,0,.5);color:#FFD7C3;background:rgba(255,77,0,.05)}
        .foot-l{transition:color .2s;cursor:pointer;color:#444}
        .foot-l:hover{color:#888}
        .ghost-phrase{line-height:1.5}
        .home-pretty{text-wrap:pretty}
        .home-balance{text-wrap:balance}
        .home-section-kicker{display:inline-block;font-size:clamp(24px,3vw,31px);letter-spacing:0;color:#FF4D00;text-transform:none;opacity:.94;font-family:'Playfair Display',serif;font-style:italic;line-height:1.04;text-wrap:balance;text-shadow:0 0 18px rgba(255,77,0,.06)}
        .home-section-sub{font-size:15px;color:#b7afa5;margin-bottom:48px;font-style:italic;font-family:'Playfair Display',serif;line-height:1.9;max-width:520px;text-wrap:pretty}
        .home-work-narrative{font-size:16px;color:#F4F0EA;line-height:1.9;margin-bottom:14px;max-width:600px;text-wrap:pretty}
        .home-work-secondary{font-size:13px;color:#aca39a;line-height:2.0;margin-bottom:22px;max-width:560px;text-wrap:pretty}
        .home-service-title{font-size:35px;font-weight:600;color:#EEE8E0;font-family:'Playfair Display',serif;font-style:italic;transition:all .25s;display:block;line-height:1.02;text-wrap:balance}
        .home-service-sub{font-size:13px;color:#bcaea1;margin-bottom:14px;font-style:italic;font-family:'Playfair Display',serif;line-height:1.66;text-wrap:pretty}
        .home-service-desc{font-size:14px;color:#ddd7cf;line-height:1.96;text-wrap:pretty;max-width:500px}
        .home-method-title{font-size:16px;font-weight:500;color:#ece5dc;margin-bottom:10px;transition:all .2s;letter-spacing:.1px;line-height:1.42;text-wrap:balance}
        .home-method-desc{font-size:14px;color:#c1b8ae;line-height:2.0;max-width:540px;text-wrap:pretty}
        .ghost-mobile{text-align:center}
        .crt-vignette{box-shadow:inset 0 0 130px 70px rgba(0,0,0,.7), inset 0 0 40px 15px rgba(0,0,0,.35)}
        .home-memory-scan{position:absolute;inset:0;background:linear-gradient(90deg,transparent 0%,rgba(255,77,0,.06) 18%,rgba(255,255,255,.04) 48%,rgba(255,77,0,.06) 82%,transparent 100%);animation:homeMemorySweep 7.5s ease-in-out infinite;opacity:.8}
        .home-memory-dot,.home-memory-thread{position:absolute;display:block;pointer-events:none}
        .home-memory-dot{top:50%;width:6px;height:6px;border-radius:999px;background:rgba(255,210,190,.46);box-shadow:0 0 8px rgba(255,77,0,.18);transform:translate(-50%,-50%)}
        .home-memory-dot-a{left:14%}.home-memory-dot-b{left:50%}.home-memory-dot-c{left:86%}
        .home-memory-thread{top:50%;height:1px;background:linear-gradient(90deg,rgba(255,77,0,.14),rgba(255,255,255,.08));transform:translateY(-50%)}
        .home-memory-thread-a{left:14%;width:36%}.home-memory-thread-b{left:50%;width:36%}
        @keyframes homeMemorySweep{0%,100%{transform:translateX(-8%);opacity:.45}50%{transform:translateX(8%);opacity:.9}}

        .home-hero-shell{position:relative;overflow:visible}
        .home-social-rail{position:absolute;top:8px;right:-98px;display:flex;flex-direction:column;gap:10px;align-items:flex-start;z-index:6}
        .home-social-rail-mobile{position:relative;top:auto;right:auto;display:flex;flex-direction:row;flex-wrap:wrap;gap:8px;align-items:center;margin-top:16px}
        .pixel-social-link{display:flex;align-items:center;gap:8px;padding:8px 9px;border:1px solid rgba(255,255,255,.08);border-radius:4px;background:rgba(5,5,5,.82);color:#8b8b8b;text-decoration:none;transition:border-color .22s ease,color .22s ease,transform .22s ease,background .22s ease}
        .pixel-social-link:hover{border-color:rgba(255,77,0,.34);color:#FF4D00;background:rgba(16,10,8,.92);transform:translateX(-2px)}
        .pixel-social-link-mobile{padding:8px 10px;background:rgba(7,7,7,.9)}
        .pixel-social-icon{display:flex;align-items:center;justify-content:center;flex:0 0 auto}
        .pixel-social-label{font-size:9px;letter-spacing:1.4px;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;line-height:1}
        
        /* Chapter 1 styles */
        .ch1-root{min-height:100dvh;background:#050505;color:#ece7de;font-family:"IBM Plex Mono",monospace;display:flex;align-items:flex-start;justify-content:center;padding:clamp(24px,5vh,44px) 16px 20px;padding-bottom:env(safe-area-inset-bottom,20px)}
        .ch1-wrap{width:min(94vw,880px);display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:0;padding-bottom:18px}
        .ch1-top-slot{width:100%;min-height:48px;display:flex;align-items:flex-end;margin-bottom:14px}
        .ch1-top{width:100%;display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:nowrap;min-height:34px}
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
        .ch1-birds{position:absolute;left:-14%;right:-8%;top:9%;height:20%;z-index:7;pointer-events:none;opacity:0;transition:opacity .24s ease}
        .ch1-birds.show{opacity:1}
        .ch1-bird{position:absolute;width:22px;height:10px;color:rgba(12,12,12,.88);opacity:1;filter:drop-shadow(0 1px 0 rgba(220,231,222,.08));animation:ch1BirdPass 2.8s linear forwards}
        .ch1-bird::before,.ch1-bird::after{content:"";position:absolute;top:0;width:8px;height:3px;background:currentColor}
        .ch1-bird::before{left:0;transform:skewX(-28deg)}
        .ch1-bird::after{right:0;transform:skewX(28deg)}
        .ch1-bird-a{top:16%;animation-delay:.0s}
        .ch1-bird-b{top:28%;animation-delay:.14s;transform:scale(.85)}
        .ch1-bird-c{top:11%;animation-delay:.28s;transform:scale(1.1)}
        .ch1-bird-d{top:24%;animation-delay:.42s;transform:scale(.72)}
        .ch1-discover-frame{filter:saturate(.96) contrast(1.02) brightness(.97)}
        .ch1-discover-overlay{position:absolute;inset:0;z-index:3;background:linear-gradient(180deg,rgba(4,7,10,.10),rgba(5,8,10,.24)),radial-gradient(circle at 20% 68%,rgba(102,156,124,.12),transparent 20%)}
        .ch1-line-block{position:absolute;left:22px;right:22px;bottom:26px;z-index:8;max-width:560px;border-top:1px solid rgba(167,203,216,.18);padding-top:12px;background:linear-gradient(to top,rgba(0,0,0,.45) 0%,rgba(0,0,0,.25) 70%,transparent 100%);padding-bottom:8px;margin-bottom:-8px}
        .ch1-line-block.ch1-reveal{opacity:0;transform:translateY(10px);transition:opacity .45s ease,transform .45s ease}
        .ch1-line-block.ch1-reveal.show{opacity:1;transform:translateY(0)}
        .ch1-line{color:#dce7de;font-family:Georgia,serif;font-style:italic;font-size:clamp(18px,2.2vw,26px);line-height:1.3}
        .ch1-library-base-layer{position:absolute;inset:0;z-index:1;transition:opacity 1.75s cubic-bezier(.22,.61,.36,1),filter 1.75s cubic-bezier(.22,.61,.36,1)}
        .ch1-library-base-layer.taken{opacity:.03;filter:brightness(.46) saturate(.72) blur(1.5px)}
        .ch1-library-glow{position:absolute;inset:0;z-index:3;background:radial-gradient(circle at 19% 71%,rgba(167,203,216,.13),transparent 18%);opacity:.65}
        .ch1-library-activation-video{z-index:4;opacity:0;mix-blend-mode:screen;clip-path:circle(1.2% at 21% 70%);transition:opacity 1.7s cubic-bezier(.22,.61,.36,1),filter 1.7s cubic-bezier(.22,.61,.36,1),clip-path 2.15s cubic-bezier(.19,1,.22,1);filter:brightness(.82) contrast(1.01) saturate(.98) hue-rotate(-8deg)}
        .ch1-library-activation-video.active{opacity:.54;clip-path:circle(178% at 21% 70%);filter:brightness(.86) contrast(1.01) saturate(.98) hue-rotate(-8deg)}
        .ch1-library-activated-glow{position:absolute;inset:0;z-index:5;opacity:0;background:radial-gradient(circle at 21% 70%,rgba(118,163,87,.05),transparent 15%),linear-gradient(180deg,rgba(62,96,56,.012),rgba(32,58,34,.07));transition:opacity 1.35s cubic-bezier(.22,.61,.36,1)}
        .ch1-library-activated-glow.active{opacity:1}
        .ch1-library-monitor-bloom{position:absolute;inset:0;z-index:6;opacity:0;pointer-events:none;background:radial-gradient(circle at 21% 70%,rgba(92,132,69,.04) 0%,rgba(88,131,68,.08) 5%,rgba(68,109,56,.13) 11%,rgba(41,74,40,.1) 17%,rgba(22,39,24,.05) 23%,transparent 31%);filter:blur(12px);transform:scale(.995);transition:opacity .62s cubic-bezier(.22,.61,.36,1),filter 1.28s cubic-bezier(.22,.61,.36,1),transform 1.28s cubic-bezier(.22,.61,.36,1)}
        .ch1-library-monitor-bloom.active{opacity:1;filter:blur(24px);transform:scale(1.012)}
        .ch1-library-green-propagation{position:absolute;inset:0;z-index:7;opacity:0;pointer-events:none;background:radial-gradient(circle at 21% 70%,rgba(91,132,69,.03) 0%,rgba(88,131,68,.08) 8%,rgba(72,115,59,.24) 18%,rgba(46,84,44,.56) 37%,rgba(18,34,20,.9) 69%,rgba(7,12,8,1) 100%);clip-path:circle(.8% at 21% 70%);filter:blur(38px) saturate(.96);transition:opacity 1.55s cubic-bezier(.22,.61,.36,1),clip-path 2.1s cubic-bezier(.19,1,.22,1),filter 1.55s cubic-bezier(.22,.61,.36,1)}
        .ch1-library-green-propagation.active{opacity:1;clip-path:circle(182% at 21% 70%);filter:blur(8px) saturate(.98)}
        .ch1-library-room-green{position:absolute;inset:0;z-index:8;opacity:0;pointer-events:none;background:linear-gradient(180deg,rgba(40,66,38,.028),rgba(31,55,33,.16) 52%,rgba(14,28,17,.56) 100%),radial-gradient(circle at 26% 66%,rgba(88,131,68,.14),transparent 46%);transition:opacity 1.15s cubic-bezier(.22,.61,.36,1)}
        .ch1-library-room-green.active{opacity:1}
        .ch1-library-full-green{position:absolute;inset:0;z-index:9;opacity:0;pointer-events:none;background:radial-gradient(circle at 21% 70%,rgba(86,125,65,.04) 0%,rgba(84,126,65,.1) 9%,rgba(68,109,56,.32) 20%,rgba(39,72,39,.78) 42%,rgba(14,28,17,.98) 74%,rgba(7,12,7,1) 100%);clip-path:circle(1.2% at 21% 70%);filter:blur(24px) saturate(.96);transition:opacity 1.2s cubic-bezier(.22,.61,.36,1),clip-path 1.6s cubic-bezier(.19,1,.22,1),filter 1.2s cubic-bezier(.22,.61,.36,1)}
        .ch1-library-full-green.active{opacity:1;clip-path:circle(188% at 21% 70%);filter:blur(2px) saturate(.98)}
        .ch1-line-block.ch1-thesis{z-index:8;opacity:0;transform:translateY(10px);transition:opacity .55s ease,transform .55s ease}
        .ch1-line-block.ch1-thesis.show{opacity:1;transform:translateY(0)}
        .ch1-crossing-shell{position:relative;width:100%}

        .ch1-feedback{position:absolute;left:22px;right:22px;bottom:22px;z-index:8;max-width:420px;border-top:1px solid rgba(167,203,216,.18);padding-top:12px;opacity:0;transform:translateY(10px);transition:opacity .25s ease,transform .25s ease}
        .ch1-feedback.show{opacity:1;transform:translateY(0)}
        .ch1-controls-slot{width:100%;min-height:122px;display:flex;align-items:flex-start;margin-top:14px}
        .ch1-controls{width:100%;display:grid;gap:10px}
        .ch1-choice{width:100%;text-align:left;padding:12px 14px;border-radius:8px;border:1px solid rgba(80,80,80,.72);background:rgba(0,0,0,.32);color:#f2eee6;font-family:inherit;font-size:12px;letter-spacing:.02em;backdrop-filter:blur(4px);cursor:pointer;transition:background .2s ease,border-color .2s ease}
        .ch1-choice-subtle{background:rgba(0,0,0,.2);color:#d0d0d0;border-color:rgba(90,90,90,.8)}
        .ch1-choice:hover{background:rgba(0,0,0,.48);border-color:rgba(255,77,0,.45)}
        .ch1-choice:disabled{opacity:.48;cursor:default}
        .ch1-profile-slot{width:100%;margin-top:18px}
        .ch1-profile{width:100%;border-top:1px solid #161616;padding-top:18px}
        .ch1-profile-title{font-size:10px;letter-spacing:2.4px;text-transform:uppercase;color:#5c5c5c;margin-bottom:12px}
        .ch1-profile-idle{color:#666;font-size:12px;font-style:italic;font-family:Georgia,serif}
        .ch1-profile-stack{display:grid;gap:12px}
        .ch1-profile-card{display:grid;gap:7px;border:1px solid #1b1b1b;border-radius:8px;background:rgba(167,203,216,.035);padding:14px 16px;transition:border-color .25s ease,background .25s ease,transform .25s ease}
        .ch1-profile-card.is-unlocked{border-color:rgba(167,203,216,.12)}
        .ch1-profile-card.is-current{border-color:rgba(255,77,0,.18);background:rgba(255,77,0,.03)}
        .ch1-profile-meta-row{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}
        .ch1-profile-cap{color:#FF4D00;font-size:11px;letter-spacing:1.2px;text-transform:uppercase}
        .ch1-profile-status{font-size:9px;letter-spacing:1.7px;text-transform:uppercase;color:#9b765f}
        .ch1-profile-headline{color:#ece7de;font-size:18px;font-family:Georgia,serif;font-style:italic;line-height:1.25}
        .ch1-profile-card.is-current .ch1-profile-headline{color:#d7c7ba}
        .ch1-profile-subcap{color:#6a6a6a;font-size:10px;letter-spacing:1.5px;text-transform:uppercase;margin-top:2px}
        .ch1-profile-body{color:#9a9a9a;font-size:12px;line-height:1.65}
        .ch1-profile-card.is-current .ch1-profile-body{color:#a99182}
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
        .ch1-crossing-unlock-cue{position:absolute;right:14px;top:16%;z-index:21;padding:8px 10px;border:1px solid rgba(199,212,160,.18);border-radius:999px;background:rgba(6,12,8,.72);color:rgba(220,232,188,.92);font-size:10px;line-height:1;letter-spacing:1px;text-transform:uppercase;font-family:'IBM Plex Mono',monospace;text-shadow:0 1px 4px rgba(0,0,0,.65);backdrop-filter:blur(6px);pointer-events:none;animation:crossingUnlockCueIn 1.12s ease-out forwards}
        
        /* ConnectionsCrossing animations */
        @keyframes crossingIdleFloat{0%{transform:translate(-50%,-100%) scaleX(-1) translateY(0)}50%{transform:translate(-50%,-100%) scaleX(-1) translateY(-3px)}100%{transform:translate(-50%,-100%) scaleX(-1) translateY(0)}}
        @keyframes crossingNodeBreath{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.75}50%{transform:translate(-50%,-50%) scale(1.08);opacity:1}}
        @keyframes crossingLineGlow{0%,100%{opacity:.5;filter:blur(0)}50%{opacity:.85;filter:blur(.4px)}}
        @keyframes crossingSynapseFlash{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(1.6)}}
        @keyframes crossingSynapseGlow{0%{opacity:1}100%{opacity:0}}
        @keyframes crossingHintPulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:.9;transform:scale(1.06)}}
        @keyframes crossingUnlockCueIn{0%{opacity:0;transform:translateY(-8px)}18%{opacity:1;transform:translateY(0)}82%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-6px)}}
        @keyframes crossingFadeToWhite{0%{opacity:0}100%{opacity:1}}
        @keyframes crossingPhraseIn{0%{opacity:0;transform:translateY(12px)}20%{opacity:1;transform:translateY(0)}80%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-8px)}}
        @keyframes crossingChapter2In{0%{opacity:0}100%{opacity:1}}
        @keyframes crossingTimingShake{0%,100%{transform:translateX(-50%)}15%{transform:translateX(calc(-50% + 6px))}30%{transform:translateX(calc(-50% - 5px))}45%{transform:translateX(calc(-50% + 4px))}60%{transform:translateX(calc(-50% - 3px))}75%{transform:translateX(calc(-50% + 2px))}90%{transform:translateX(calc(-50% - 1px))}}
        
        
                .chapter-intro-stage{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:8px;border:1px solid rgba(20,20,20,.12);background:#f5f2eb;box-shadow:0 0 0 1px rgba(0,0,0,.03),0 30px 70px rgba(0,0,0,.14);animation:chapterCardHoldFade 4.6s cubic-bezier(.22,.61,.36,1) both;display:flex;justify-content:center;align-items:center;cursor:pointer}
        .chapter-intro-top-slot{border:0}
        .chapter-intro-controls-slot,.chapter-intro-profile-slot{pointer-events:none}
        .chapter-intro-inner{text-align:center;animation:chapterCardTextFloat 4.6s cubic-bezier(.22,.61,.36,1) both;padding:0 24px;transform:translateY(-1.5%)}
        .chapter-intro-kicker{font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#7d756c;margin-bottom:14px}
        .chapter-intro-title{font-family:'Playfair Display',serif;font-style:italic;font-weight:600;font-size:clamp(38px,7vw,72px);line-height:1.02;color:#101010;letter-spacing:-0.5px;text-rendering:geometricPrecision}

.ch2-stage{position:relative;width:100%;aspect-ratio:4/3;overflow:hidden;border-radius:8px;border:1px solid #161616;background:#0b0f12;box-shadow:0 0 0 1px rgba(255,255,255,.02),0 30px 70px rgba(0,0,0,.35)}
        .ch2-fill{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
        .ch2-window-mask{position:absolute;inset:0;overflow:hidden;clip-path:polygon(19.2% 15.2%, 62.7% 15.2%, 62.7% 40.9%, 19.2% 40.9%);z-index:2}
        .ch2-window-video{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.02) brightness(1.06) contrast(1.02)}
        .ch2-window-spill{position:absolute;left:18.8%;top:14.8%;width:44.2%;height:31.9%;z-index:3;pointer-events:none;background:radial-gradient(circle at 50% 46%, rgba(205,232,255,.34), rgba(156,214,255,.16) 44%, rgba(0,0,0,0) 78%);mix-blend-mode:screen;transition:opacity .4s ease}
        .ch2-monitor-breath{position:absolute;left:31.6%;top:47.1%;width:13.8%;height:11.6%;z-index:3;pointer-events:none;background:radial-gradient(circle, rgba(215,255,255,.22) 0%, rgba(155,225,255,.11) 36%, rgba(0,0,0,0) 74%);filter:blur(10px);animation:ch2MonitorBreath 4.6s ease-in-out infinite}
        .ch2-room-daylift{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(circle at 41% 33%, rgba(215,235,255,.26), rgba(173,214,255,.10) 40%, rgba(0,0,0,0) 75%);mix-blend-mode:screen;transition:opacity .45s ease}.ch2-room-nightshade{position:absolute;inset:0;z-index:3;pointer-events:none;background:linear-gradient(180deg, rgba(2,7,14,.10), rgba(2,6,12,.28));mix-blend-mode:multiply;transition:opacity .45s ease}.ch2-room-grade{position:absolute;inset:0;z-index:4;pointer-events:none;background:linear-gradient(180deg, rgba(13,24,38,.03), rgba(4,8,12,.10));mix-blend-mode:multiply}
        .ch2-line-block{position:absolute;left:22px;right:22px;bottom:26px;z-index:8;max-width:560px;border-top:1px solid rgba(192,218,244,.18);padding-top:12px;background:linear-gradient(to top,rgba(0,0,0,.42) 0%,rgba(0,0,0,.22) 70%,transparent 100%);padding-bottom:8px;margin-bottom:-8px}.ch2-line{color:#e0e9f2;font-family:Georgia,serif;font-style:italic;font-size:clamp(18px,2.2vw,26px);line-height:1.3}.ch2-controls{margin-top:14px}.ch2-feedback-overlay{position:absolute;left:22px;right:22px;top:24px;z-index:9;display:flex;justify-content:center;pointer-events:none;color:#eef5ff;font-size:clamp(18px,2vw,24px);line-height:1.3;text-align:center;font-style:italic;font-family:'Playfair Display',serif;opacity:0;transform:translateY(6px);transition:opacity .28s ease,transform .28s ease;text-shadow:0 2px 14px rgba(0,0,0,.85), 0 0 30px rgba(0,0,0,.45)}.ch2-feedback-overlay.show{opacity:1;transform:translateY(0)}.ch2-feedback-overlay.is-bridge{top:50%;transform:translateY(-50%);left:36px;right:36px;font-size:clamp(20px,2.3vw,28px);line-height:1.18}.ch2-feedback-overlay.show.is-bridge{transform:translateY(-50%)}.ch2-stage-transitioning .ch2-window-mask,.ch2-stage-transitioning .ch2-monitor-breath{opacity:.82}.ch2-stage-transitioning .ch2-room-grade{background:linear-gradient(180deg, rgba(13,24,38,.08), rgba(4,8,12,.22))}.ch2-desk-transition-copy{width:100%;max-width:620px;margin:0 auto;border-top:1px solid rgba(192,218,244,.14);padding-top:12px;color:rgba(226,232,239,.9);font-size:12px;line-height:1.78;font-family:'IBM Plex Mono',monospace;letter-spacing:.01em;text-align:center;animation:fadeIn .24s ease-out}
        .ch2-street-stage{background:#081012}
        .ch2-street-frame{filter:saturate(1.03) contrast(1.03) brightness(.95);transform:scale(1.006);animation:ch2StreetFrameDrift 10s ease-in-out infinite}
        .ch2-street-grade,.ch2-street-cool-wash,.ch2-street-door-bloom,.ch2-street-reflection-boost,.ch2-street-rain,.ch2-street-headlights,.ch2-street-vignette{position:absolute;pointer-events:none}
        .ch2-street-grade{inset:0;background:
          linear-gradient(180deg,rgba(3,12,14,.24) 0%,rgba(2,8,10,.10) 36%,rgba(0,0,0,.14) 100%),
          radial-gradient(circle at 53% 33%, rgba(227,195,132,.06) 0%, rgba(0,0,0,0) 24%),
          linear-gradient(90deg,rgba(9,62,66,.10) 0%,rgba(0,0,0,0) 26%,rgba(0,0,0,0) 72%,rgba(6,38,42,.09) 100%)}
        .ch2-street-cool-wash{inset:-10%;background:
          radial-gradient(circle at 86% 16%, rgba(18,96,102,.03) 0%, rgba(0,0,0,0) 34%),
          radial-gradient(circle at 10% 82%, rgba(8,56,60,.035) 0%, rgba(0,0,0,0) 40%),
          linear-gradient(180deg, rgba(7,28,30,.02) 0%, rgba(0,0,0,0) 48%, rgba(4,14,16,.02) 100%);
          mix-blend-mode:multiply;opacity:.22;filter:blur(28px) saturate(1.04)}
        .ch2-street-door-bloom{left:40%;top:19%;width:24%;height:36%;background:
          radial-gradient(circle, rgba(255,208,132,.14) 0%, rgba(255,183,96,.06) 30%, rgba(0,0,0,0) 74%);
          filter:blur(18px);opacity:.6;animation:ch2DoorBloomPulse 5.2s ease-in-out infinite}
        .ch2-street-reflection-boost{left:0;right:0;bottom:0;height:34%;background:
          linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(13,24,28,.08) 18%, rgba(3,7,9,.42) 100%),
          radial-gradient(ellipse at 52% 16%, rgba(248,202,132,.08) 0%, rgba(0,0,0,0) 32%),
          linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(70,189,192,.032) 22%, rgba(0,0,0,0) 55%, rgba(82,201,202,.024) 100%);
          mix-blend-mode:screen;opacity:.68;animation:ch2StreetReflectionPulse 8.8s ease-in-out infinite}
        .ch2-street-rain{inset:-8% -3% 0 -3%;opacity:0}
        .ch2-street-rain-back{background-image:
          linear-gradient(104deg, rgba(196,225,232,.06) 47%, rgba(196,225,232,.18) 49%, rgba(196,225,232,.06) 51%, transparent 53%),
          linear-gradient(101deg, rgba(148,193,208,.04) 46%, rgba(148,193,208,.12) 48%, rgba(148,193,208,.04) 50%, transparent 52%);
          background-size:30px 74px, 44px 92px;background-position:0 0, 12px 24px;filter:blur(.2px);opacity:.18;animation:ch2RainBackShift 1.9s linear infinite}
        .ch2-street-rain-front{background-image:
          linear-gradient(106deg, rgba(223,239,244,.10) 46%, rgba(223,239,244,.28) 49%, rgba(223,239,244,.10) 52%, transparent 55%),
          linear-gradient(103deg, rgba(178,214,224,.06) 45%, rgba(178,214,224,.16) 48%, rgba(178,214,224,.06) 51%, transparent 54%);
          background-size:24px 58px, 36px 72px;background-position:8px 0, 20px 18px;filter:blur(.45px);opacity:.12;animation:ch2RainFrontShift 1.15s linear infinite}
        .ch2-street-headlights{left:-58%;width:56%;background:
          linear-gradient(90deg,rgba(255,247,226,0) 0%,rgba(255,243,215,.02) 38%,rgba(255,235,194,.072) 72%,rgba(255,231,184,.12) 100%);
          filter:blur(22px);mix-blend-mode:screen;transform:skewX(-13deg)}
        .ch2-street-headlights-back{top:55%;height:15%;animation:ch2StreetSweepBack 16.2s ease-in-out infinite 1.2s;opacity:.10}
        .ch2-street-headlights-front{top:63%;height:10%;animation:ch2StreetSweepFront 14.6s ease-in-out infinite 4.4s;opacity:.13}
        .ch2-street-vignette{inset:0;background:
          radial-gradient(ellipse at center, transparent 36%, rgba(0,0,0,.14) 68%, rgba(0,0,0,.5) 100%),
          linear-gradient(180deg, rgba(0,0,0,.16) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,.14) 100%)}
        .ch2-street-line-block{left:50%;right:auto;bottom:20px;width:min(calc(100% - 34px),690px);transform:translateX(-50%);border-top-color:rgba(255,203,154,.16);background:linear-gradient(to top,rgba(0,0,0,.68) 0%,rgba(0,0,0,.28) 70%,transparent 100%)}
        .ch2-street-line-block .ch2-line{text-align:center;font-size:clamp(18px,2.2vw,26px);white-space:nowrap}
        .ch2-street-narrative-wrap{position:absolute;left:50%;top:46px;z-index:9;width:min(calc(100% - 56px),760px);transform:translateX(-50%)}
        .ch2-street-narrative{color:rgba(239,233,224,.96);font-size:12px;line-height:1.82;font-family:'IBM Plex Mono',monospace;letter-spacing:.01em;text-align:center;text-shadow:0 2px 14px rgba(0,0,0,.88);background:linear-gradient(180deg, rgba(3,8,10,.68), rgba(3,8,10,.30));padding:12px 20px;border-top:1px solid rgba(255,203,154,.20);border-radius:8px;backdrop-filter:blur(5px)}
        .ch2-street-narrative-line{display:block}
        .ch2-street-mobile-copy{display:none}
                .ch2-game-prompt{width:100%;margin:0 0 10px 0;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,77,0,.18);background:rgba(255,77,0,.04);color:#e6d5c9;font-size:11px;line-height:1.7;letter-spacing:.01em;text-align:center}
        .ch2-street-stage.is-holding .ch2-street-door-bloom{opacity:.82;filter:blur(24px)}
        .ch2-street-stage.is-holding .ch2-street-reflection-boost{opacity:.84}
        .ch2-street-stage.is-transitioning .ch2-street-frame{filter:saturate(.98) contrast(1.04) brightness(.92);transform:scale(1.01)}
        .ch2-street-stage.is-transitioning .ch2-street-line-block{opacity:.82}
        .ch2-street-transition-copy{width:100%;max-width:620px;margin:0 auto;border-top:1px solid rgba(255,203,154,.16);padding-top:12px;color:rgba(234,223,210,.94);font-size:12px;line-height:1.82;font-family:'IBM Plex Mono',monospace;letter-spacing:.01em;text-align:center;animation:fadeIn .28s ease-out}
        .ch2-street-back-link{margin-top:12px;background:transparent;border:0;padding:0;color:#6e6e70;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:1px;cursor:pointer;transition:color .22s ease;align-self:flex-start}.ch2-street-back-link:hover{color:#FF4D00}
        @keyframes ch2StreetFrameDrift{0%,100%{transform:scale(1.006) translateY(0)}50%{transform:scale(1.01) translateY(-0.35%)}}
        @keyframes ch2DoorBloomPulse{0%,100%{opacity:.52;filter:blur(16px)}50%{opacity:.68;filter:blur(21px)}}
        @keyframes ch2StreetReflectionPulse{0%,100%{opacity:.64}50%{opacity:.76}}
        @keyframes ch2StreetSweepBack{0%,100%{transform:translateX(0) skewX(-13deg);opacity:0}16%{opacity:0}34%{opacity:.032}64%{transform:translateX(272%) skewX(-13deg);opacity:.105}82%{opacity:.024}100%{transform:translateX(272%) skewX(-13deg);opacity:0}}
        @keyframes ch2StreetSweepFront{0%,100%{transform:translateX(0) skewX(-13deg);opacity:0}20%{opacity:0}40%{opacity:.04}70%{transform:translateX(282%) skewX(-13deg);opacity:.145}88%{opacity:.03}100%{transform:translateX(282%) skewX(-13deg);opacity:0}}
        @keyframes ch2MonitorBreath{0%,100%{opacity:.38;transform:scale(1)}50%{opacity:.62;transform:scale(1.04)}}
        @keyframes ch1BirdPass{0%{transform:translateX(0) translateY(0)}45%{transform:translateX(58vw) translateY(-10px)}100%{transform:translateX(112vw) translateY(2px);opacity:0}}
        @keyframes ch2LampPulse{0%,100%{opacity:.74;transform:scale(1)}50%{opacity:.96;transform:scale(1.04)}}
        @keyframes ch2RainBackShift{0%{background-position:0 -6px, 12px 18px}100%{background-position:-18px 56px, -8px 82px}}
        @keyframes ch2RainFrontShift{0%{background-position:8px -10px, 20px 10px}100%{background-position:-22px 72px, -10px 96px}}
@keyframes ch2NextObjectGlow{0%,100%{box-shadow:0 0 0 rgba(255,77,0,0)}50%{box-shadow:0 0 12px rgba(255,77,0,.14)}}
        @keyframes ch2PlacedPulse{0%{transform:scale(1);box-shadow:0 0 0 rgba(255,196,132,0)}35%{transform:scale(1.03);box-shadow:0 0 18px rgba(255,196,132,.22)}100%{transform:scale(1);box-shadow:0 0 0 rgba(255,196,132,0)}}
        @keyframes ch2SlotPulse{0%{transform:scale(1)}40%{transform:scale(1.02)}100%{transform:scale(1)}}
        @keyframes ch2HeadlightSweepBack{0%,18%{transform:translateX(0) skewX(-16deg);opacity:0}30%,56%{opacity:.34}78%{transform:translateX(-195%) skewX(-16deg);opacity:.18}100%{transform:translateX(-195%) skewX(-16deg);opacity:0}}
        @keyframes ch2HeadlightSweepFront{0%,22%{transform:translateX(0) skewX(-16deg);opacity:0}34%,58%{opacity:.48}82%{transform:translateX(-214%) skewX(-16deg);opacity:.22}100%{transform:translateX(-214%) skewX(-16deg);opacity:0}}
        @keyframes ch2GameShake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
        @keyframes ch3FloorSweep{0%,100%{opacity:.24;transform:translateX(-2%)}50%{opacity:.46;transform:translateX(2%)}}
        @keyframes ch3CrewPass{0%{opacity:0;transform:translateX(-12px)}18%{opacity:.22}70%{opacity:.16;transform:translateX(20px)}100%{opacity:0;transform:translateX(34px)}}
        @keyframes ch3TechFlicker{0%,78%,100%{opacity:.08}79%{opacity:.26}80%{opacity:.1}88%{opacity:.18}89%{opacity:.08}}
        .ch2-game-stage{background:#0a0f12}
        .ch2-game-vignette{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg, rgba(4,7,10,.08), rgba(0,0,0,.18)), radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,.16) 74%, rgba(0,0,0,.42) 100%)}
        .ch2-game-slot-shell{position:absolute;left:18px;right:18px;bottom:18px;z-index:8;padding:12px 14px;border:1px solid rgba(148,174,188,.14);border-radius:10px;background:rgba(3,8,10,.62);backdrop-filter:blur(6px)}
        .ch2-game-slot-shell-mobile{display:none;position:relative;left:auto;right:auto;bottom:auto;margin-top:12px;background:rgba(3,8,10,.72)}
        .ch2-game-slot-label{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:rgba(223,232,238,.56);margin-bottom:10px}
        .ch2-game-slot-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
        .ch2-game-slot{min-height:54px;border-radius:8px;border:1px dashed rgba(162,186,198,.2);background:rgba(255,255,255,.02);display:flex;align-items:center;justify-content:center;text-align:center;padding:8px 6px;color:#6b7880;font-size:10px;line-height:1.35;text-transform:uppercase;letter-spacing:1px}
        .ch2-game-slot.is-filled{border-style:solid;border-color:rgba(255,77,0,.28);color:#ece7de;background:rgba(255,77,0,.07);text-transform:none;letter-spacing:0;font-size:11px}.ch2-game-slot.is-pulsing{animation:ch2SlotPulse .42s ease-out;box-shadow:0 0 18px rgba(255,196,132,.14)}
        .ch2-object-controls-slot{min-height:auto;display:block}
        .ch2-game-feedback{width:100%;margin-top:2px;margin-bottom:14px;min-height:52px;padding:13px 16px;border-radius:8px;border:1px solid rgba(148,174,188,.18);background:rgba(3,8,10,.72);color:#d8e0e6;font-size:12px;line-height:1.78;font-family:'IBM Plex Mono',monospace;transition:border-color .25s ease,color .25s ease,background .25s ease,opacity .2s ease}
        .ch2-game-feedback-overlay{position:absolute;left:18px;top:18px;z-index:8;max-width:430px;margin:0;background:rgba(3,8,10,.66);border-color:rgba(148,174,188,.16);backdrop-filter:blur(6px)}
        .ch2-game-feedback.is-complete{border-color:rgba(255,77,0,.24);color:#e8ddd3;background:rgba(255,77,0,.05)}
        .ch2-game-complete-card{position:absolute;left:50%;top:22px;z-index:9;width:min(calc(100% - 40px),540px);transform:translateX(-50%);padding:14px 18px 15px;border-radius:10px;border:1px solid rgba(255,77,0,.18);background:linear-gradient(180deg, rgba(18,9,6,.82), rgba(8,6,6,.58));backdrop-filter:blur(6px);text-align:center;animation:fadeIn .24s ease-out}
        .ch2-game-complete-kicker{font-size:10px;letter-spacing:2.2px;text-transform:uppercase;color:rgba(255,192,152,.78);margin-bottom:8px}
        .ch2-game-complete-line{display:flex;flex-direction:column;align-items:center;gap:3px;font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(21px,2.25vw,28px);line-height:1.02;color:#f1e8df;text-align:center}
        .ch2-game-complete-line span{display:block;text-wrap:initial;white-space:nowrap}.ch2-game-complete-line .is-top{letter-spacing:-.01em}.ch2-game-complete-line .is-bottom{letter-spacing:-.015em}
        .ch2-game-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
        .ch2-game-object{padding:14px 14px 15px;border-radius:10px;border:1px solid rgba(80,80,80,.72);background:rgba(0,0,0,.22);color:#ece7de;text-align:left;cursor:pointer;transition:background .2s ease,border-color .2s ease,transform .2s ease,box-shadow .35s ease}
        .ch2-game-object-icon{display:none;font-size:18px;line-height:1;color:#ddd2c4;margin-bottom:8px}
        .ch2-game-object:hover{border-color:rgba(255,77,0,.34);background:rgba(255,77,0,.04)}
        .ch2-game-object.is-decoy:hover{border-color:rgba(138,138,138,.28);background:rgba(255,255,255,.015)}
        .ch2-game-object.is-placed{border-color:rgba(255,77,0,.28);background:rgba(255,77,0,.08)}.ch2-game-object.is-placed-feedback{animation:ch2PlacedPulse .52s ease-out;border-color:rgba(255,196,132,.44);background:rgba(255,196,132,.10)}
.ch2-game-object.is-next{border-color:rgba(255,77,0,.22);box-shadow:0 0 0 rgba(255,77,0,0);animation:ch2NextObjectGlow 3.2s ease-in-out infinite}
        .ch2-game-object.is-shaking{animation:ch2GameShake .28s ease-out}
        .ch2-game-object-title{display:block;font-family:'Playfair Display',serif;font-style:italic;font-size:20px;line-height:1.05;color:#f0ece6;margin-bottom:8px}
        .ch2-game-object-desc{display:block;font-size:11px;line-height:1.7;color:#9ea4a8}
        .ch2-game-object:disabled{cursor:default}

        
        .ch2-debug-panel{width:100%;margin:0 0 12px 0;padding:10px 12px;border:1px dashed rgba(255,77,0,.35);border-radius:8px;background:rgba(255,77,0,.06);color:#d8c7bb;font-size:10px;letter-spacing:.4px;display:grid;gap:6px}
        .ch2-debug-panel-game{position:absolute;left:12px;top:12px;z-index:11;width:auto;max-width:78%;margin:0;background:rgba(5,5,5,.8);backdrop-filter:blur(4px)}
        .ch2-debug-panel-global{align-self:stretch}
        .ch2-debug-btn{padding:8px 10px;border-radius:6px;border:1px solid rgba(255,77,0,.45);background:transparent;color:#FF4D00;font-family:'IBM Plex Mono',monospace;font-size:10px;letter-spacing:.8px;cursor:pointer;justify-self:start}
        .ch2-debug-src{word-break:break-all;color:#b68f79}
        .ch3-stage{background:#0a0908}
        .ch3-light-bloom{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at 53% 34%, rgba(255,214,146,.22) 0%, rgba(255,190,118,.12) 24%, rgba(0,0,0,0) 54%);mix-blend-mode:screen;opacity:.82;transition:opacity 1.6s ease,transform 1.6s ease}
        .ch3-stage.is-breathing .ch3-light-bloom{opacity:.96;transform:scale(1.024)}
        .ch3-grade{position:absolute;inset:0;pointer-events:none;background:linear-gradient(180deg, rgba(22,14,10,.04), rgba(10,7,7,.12)), radial-gradient(circle at 52% 34%, rgba(255,204,132,.10), rgba(0,0,0,0) 40%);mix-blend-mode:screen}
        .ch3-floor-sweep{position:absolute;left:0;right:0;bottom:0;height:38%;pointer-events:none;background:linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(20,10,7,.06) 18%, rgba(255,178,110,.14) 52%, rgba(0,0,0,0) 100%);opacity:.62;animation:ch3FloorSweep 6.8s ease-in-out infinite}
        .ch3-crew-pass{position:absolute;left:58%;top:22%;width:11%;height:54%;pointer-events:none;background:linear-gradient(180deg, rgba(18,12,10,.0) 0%, rgba(28,16,12,.22) 24%, rgba(28,16,12,.38) 62%, rgba(18,12,10,0) 100%);filter:blur(3px);opacity:0;transform:translateX(-10px)}
        .ch3-crew-pass.is-visible{animation:ch3CrewPass 2.35s ease-out forwards}
        .ch3-tech-flicker{position:absolute;left:22%;top:42%;width:8%;height:5%;pointer-events:none;background:linear-gradient(90deg, rgba(255,219,168,.0), rgba(255,219,168,.34), rgba(255,219,168,0));opacity:.18;animation:ch3TechFlicker 4.2s steps(1,end) infinite}
        .ch3-vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center, transparent 42%, rgba(0,0,0,.16) 74%, rgba(0,0,0,.42) 100%), linear-gradient(180deg, rgba(0,0,0,.08) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,.22) 100%)}
        .ch3-line-block{border-top-color:rgba(255,194,146,.16);background:linear-gradient(to top,rgba(0,0,0,.58) 0%,rgba(0,0,0,.18) 72%,transparent 100%)}
        .ch3-line{white-space:nowrap}
        .ch3-feedback-overlay{top:24px}
        .ch3-stage.is-transitioning{filter:saturate(1.02) brightness(1.02)}
        .ch3-stage.is-transitioning .ch3-vignette{opacity:.78}

        @media(max-width:1024px){
          .home-social-rail:not(.home-social-rail-mobile){display:none!important}
        }

        @media(max-width:600px){
          .ch2-stage{aspect-ratio:4 / 3}
          .ch3-line{white-space:normal;font-size:clamp(17px,5vw,24px);line-height:1.18;text-align:center}
          .ch2-street-narrative-wrap{display:none}
          .ch2-street-line-block{display:none}
          .ch2-street-mobile-copy{display:flex;flex-direction:column;gap:10px;width:100%;margin-top:12px}
          .ch2-street-narrative-mobile{position:relative;left:auto;right:auto;top:auto;max-width:none;font-size:11px;line-height:1.72;padding:10px 12px;text-align:center;background:linear-gradient(180deg, rgba(3,8,10,.68), rgba(3,8,10,.30));border-top:1px solid rgba(255,203,154,.18);border-radius:8px;backdrop-filter:blur(5px)}
          .ch2-street-line-mobile{font-size:clamp(16px,4.9vw,22px);line-height:1.18;text-align:center;color:#e0e9f2}
          .ch2-game-slot-shell{display:none}
          .ch2-game-slot-shell-mobile{display:block}
          .ch2-game-prompt{font-size:11px;padding:10px 12px;margin-top:2px;margin-bottom:10px;line-height:1.65}
          .ch2-game-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
          .ch2-game-object{padding:10px 6px 9px;min-height:78px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}
          .ch2-game-object-icon{display:block;font-size:16px;margin-bottom:6px}
          .ch2-game-object-title{font-size:10px;line-height:1.15;margin-bottom:0;font-style:normal;font-family:'IBM Plex Mono',monospace;letter-spacing:.2px;color:#ece7de}
          .ch2-game-object-desc{display:none}
          .ch2-game-feedback{font-size:11px;line-height:1.66;min-height:40px;padding:10px 12px;margin-bottom:10px}

          .svc{padding:18px 18px!important}
          .svc-in{display:block!important;grid-template-columns:1fr!important;gap:0!important}
          .svc-tw{margin-bottom:10px!important}
          .svc-in > div:last-child{margin-top:0!important}
          .home-social-rail-mobile{display:flex!important}
          .pixel-social-link-mobile{min-width:0}
          .pixel-social-link-mobile .pixel-social-label{font-size:8px;letter-spacing:1.2px}
          .home-section-kicker{font-size:24px!important;line-height:1.05!important;margin-bottom:14px!important}
          .home-section-sub{font-size:14px!important;line-height:1.72!important;max-width:100%!important;margin-bottom:24px!important;color:#8f8f8f!important}
          .home-work-narrative{font-size:12px!important;line-height:1.84!important;color:#d8d2ca!important;max-width:100%!important}
          .home-work-secondary{display:none!important}
          .home-service-title{font-size:31px!important;line-height:1.0!important;display:block!important}
          .home-service-sub{font-size:13px!important;line-height:1.5!important;margin-bottom:8px!important;color:#9a9a9a!important}
          .home-service-desc{font-size:12px!important;line-height:1.82!important;color:#a5a5a5!important}
          .home-method-title{font-size:14px!important;line-height:1.42!important;margin-bottom:8px!important}
          .home-method-desc{font-size:12px!important;line-height:1.82!important;max-width:100%!important;color:#9e9e9e!important}
          .svc-tw{min-width:auto!important}
          .wrap{padding:58px 20px 44px!important}
          .nm{font-size:38px!important;line-height:1.02!important}
          .brow{flex-direction:column!important;gap:12px!important}
          .brow .orsep{display:none}
          .crt-vignette{box-shadow:inset 0 0 50px 25px rgba(0,0,0,.5),inset 0 0 20px 8px rgba(0,0,0,.25)!important}
          .ghost-phrase{font-size:11px!important}
          .ch1-root{padding:18px 16px 16px;align-items:flex-start}
          .ch1-wrap{width:min(94vw,760px)}
          .ch1-line-block,.ch1-feedback{left:16px;right:16px;bottom:18px}
          .ch1-top-slot{min-height:44px;margin-bottom:12px}
          .ch1-top{flex-direction:row;align-items:center;justify-content:space-between;gap:10px;flex-wrap:nowrap;min-height:32px}
          .ch1-controls-slot{min-height:114px;margin-top:12px}
          .ch1-kicker{font-size:9px;letter-spacing:2.4px}
          .ch1-back-btn{padding:4px 10px;font-size:9px}
          .ch2-street-transition-copy{max-width:none;font-size:11px;line-height:1.72}
          .ch2-street-line-block{width:min(calc(100% - 24px),620px);bottom:16px}
          .ch2-street-line-block .ch2-line{white-space:normal;font-size:clamp(17px,5.2vw,24px)}
          .ch2-street-narrative-wrap{left:50%;right:auto;top:26px;width:min(calc(100% - 20px),560px);transform:translateX(-50%)}
          .ch2-street-narrative{font-size:10px;line-height:1.68;padding:10px 12px}
          .ch2-street-door-bloom{left:35%;top:16%;width:34%;height:48%}
          .ch2-street-reflection-boost{height:42%}
          .ch2-game-slot-shell{left:14px;right:14px;bottom:14px;padding:10px 10px 11px}
          .ch2-game-slot-grid{gap:6px}
          .ch2-game-slot{min-height:48px;font-size:9px}
          .ch2-game-slot.is-filled{font-size:10px}
          .ch2-game-feedback{font-size:11px;line-height:1.68;min-height:42px;margin-bottom:10px}
          .ch2-game-feedback-overlay{left:14px;right:14px;top:14px;max-width:none}
          .ch2-game-complete-card{left:14px;right:14px;top:14px;width:auto;transform:none;padding:12px 12px 13px}
          .ch2-game-complete-line{font-size:22px;line-height:1.14}
          .ch2-game-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}
          .ch2-game-object{padding:10px 6px 9px;min-height:78px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:flex-start}
          .ch2-game-object-title{font-size:10px;line-height:1.15;margin-bottom:0;font-style:normal;font-family:'IBM Plex Mono',monospace;letter-spacing:.2px;color:#ece7de}
          .chapter-intro-inner{transform:translateY(0)}
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
              fontWeight: w.bold ? 700 : 400, fontStyle: w.italic ? "italic" : "normal",
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

      {/* CASE STUDY */}
      {phase === "main" && activeCaseStudy && (() => {
        const activeWork = T.selectedWork.find((work) => getWorkSlug(work.title) === activeCaseStudy);
        const activeData = CASE_STUDIES[lang]?.[activeCaseStudy];
        if (!activeWork || !activeData) return null;
        return (
          <CaseStudyPage
            lang={lang}
            work={activeWork}
            data={activeData}
            onBack={closeCaseStudy}
            onContact={openContact}
          />
        );
      })()}

      {/* MAIN */}
      {phase === "main" && !activeCaseStudy && (
        <div className="wrap" style={{
          maxWidth: 640, margin: "0 auto", padding: "80px 32px 48px",
          opacity: contentFading ? 0 : (flicker ? .85 : 1),
          transition: contentFading ? "opacity .6s ease-out" : "opacity .04s",
        }}>
          {/* 1. HERO */}
          <Section delay={0.05}>
            <div className="home-hero-shell" style={{ marginBottom: isMobileViewport ? 34 : 40 }}>
              <h1 className="nm" style={{ fontFamily: "'Playfair Display',serif", fontSize: 52, fontWeight: 700, lineHeight: 1.02, margin: "0 0 10px", color: "#F0ECE6", animation: "nameGlow 6s ease-in-out infinite" }}>
                <GlitchText text="Roberto" active={glitch} /><br />
                <GlitchText text="Marchesini" active={glitch} />
              </h1>
              <div className="home-pretty" style={{ fontSize: isMobileViewport ? 16 : 15, color: "#F0ECE6", marginTop: 18, lineHeight: isMobileViewport ? 1.8 : 1.95, maxWidth: isMobileViewport ? 430 : 500, textWrap: "pretty" }}>{T.hero}</div>
              {!isMobileViewport ? <HomeSocialRail /> : <HomeSocialRail mobile />}
            </div>
          </Section>

          {/* 2. DIVIDER */}
          <Section delay={0.1}>
            <div style={{ height: 1, background: "linear-gradient(to right,#FF4D00 0%,rgba(255,77,0,.12) 45%,transparent 100%)", marginBottom: 48 }} />
          </Section>

          {/* 4. SELECTED WORK */}
          <Section delay={0.12}>
            <div style={{ marginBottom: isMobileViewport ? 58 : 72 }}>
              <div className="home-section-kicker" style={{ marginBottom: 10 }}>{T.selectedWorkLabel}</div>
              <div className="home-section-sub">{selectedWorkSubText}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {T.selectedWork.map((work, i) => (
                  <div key={i} className="work-card" style={{
                    paddingTop: isMobileViewport ? 26 : 38,
                    paddingBottom: isMobileViewport ? 26 : 38,
                    paddingRight: 0,
                    borderBottom: i < T.selectedWork.length - 1 ? "1px solid #141414" : "none",
                    cursor: "pointer",
                    position: "relative",
                  }}
                    onClick={() => openCaseStudy(getWorkSlug(work.title))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        openCaseStudy(getWorkSlug(work.title));
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`${CASE_STUDIES[lang][getWorkSlug(work.title)]?.openLabel || (lang === "it" ? "Apri case study" : "Open case study")}: ${work.title}`}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 12, flexWrap: "wrap" }}>
                      <div style={{ fontSize: 30, fontWeight: 600, color: "#F5F0E8", fontFamily: "'Playfair Display',serif", fontStyle: "italic", lineHeight: 1.04 }}>
                        {work.title}<span style={{ color: "#FF4D00", fontStyle: "normal" }}>.</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 10, letterSpacing: 1.5, color: "#7d766d", fontFamily: "'IBM Plex Mono', monospace" }}>{work.period}</span>
                        {work.status === "active" && (
                          <span style={{ 
                            display: "inline-block", width: 6, height: 6, borderRadius: "50%", 
                            background: "#FF4D00", boxShadow: "0 0 8px rgba(255,77,0,.4)",
                            animation: "glowPulse 2s infinite",
                          }} />
                        )}
                      </div>
                    </div>
                    <div className="home-work-narrative">{isMobileViewport ? (work.mobileNarrative || work.narrative) : work.narrative}</div>
                    {(!isMobileViewport && work.narrative2) && <div className="home-work-secondary">{work.narrative2}</div>}
                    <div style={{ fontSize: 11, color: "#B1AAA1", lineHeight: 1.7, marginBottom: 16, letterSpacing: .35 }}>{work.technical}</div>
                    {work.proof?.length ? (
                      <div style={{
                        display: "grid",
                        gridTemplateColumns: isMobileViewport ? "1fr" : "repeat(3, minmax(0, 1fr))",
                        gap: 8,
                        marginBottom: 14,
                      }}>
                        {work.proof.map((item, proofIdx) => (
                          <div key={proofIdx} style={{
                            padding: isMobileViewport ? "9px 10px" : "10px 12px",
                            border: "1px solid rgba(255,77,0,.12)",
                            borderRadius: 4,
                            background: "linear-gradient(180deg, rgba(255,77,0,.05), rgba(255,255,255,.012))",
                            color: "#F0ECE6",
                            fontSize: 10,
                            lineHeight: 1.55,
                            letterSpacing: .35,
                            textTransform: "uppercase",
                            fontFamily: "'IBM Plex Mono', monospace",
                          }}>{item}</div>
                        ))}
                      </div>
                    ) : null}
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                      {work.tags.map((tag, j) => (
                        <span key={j} style={{ 
                          fontSize: 9, letterSpacing: 1.2, color: "#9d958d", textTransform: "uppercase", 
                          fontFamily: "'IBM Plex Mono', monospace",
                          padding: "3px 8px", border: "1px solid #2A2A2A", borderRadius: 2,
                        }}>{tag}</span>
                      ))}
                    </div>
                    <button className="top-btn" onClick={(e) => { e.stopPropagation(); openCaseStudy(getWorkSlug(work.title)); }}>{CASE_STUDIES[lang][getWorkSlug(work.title)]?.openLabel || (lang === "it" ? "Apri case study" : "Open case study")}</button>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* 5. WHAT I DO */}
          <Section delay={0.15}>
            <div style={{ marginBottom: isMobileViewport ? 52 : 66 }}>
              <div className="home-section-kicker" style={{ marginBottom: 24 }}>{T.whatido}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobileViewport ? 16 : 22 }}>
                {T.services.map((svc, i) => (
                  <div key={i} className="svc">
                    <div className="svc-in" style={{ display: isMobileViewport ? "block" : "grid", gridTemplateColumns: isMobileViewport ? "1fr" : "208px minmax(0,1fr)", gap: isMobileViewport ? 0 : 42, alignItems: "start" }}>
                      <div className="svc-tw" style={{ marginBottom: isMobileViewport ? 10 : 0, paddingRight: isMobileViewport ? 0 : 8 }}>
                        <span className="svc-t home-service-title">
                          {svc.title}<span style={{ color: "#FF4D00", fontStyle: "normal" }}>.</span>
                        </span>
                      </div>
                      <div>
                        {svc.subtitle && <div className="home-service-sub">{svc.subtitle}</div>}
                        <div className="home-service-desc">{isMobileViewport ? (svc.mobileDesc || svc.desc) : svc.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* 6. HOW I WORK */}
          <Section delay={0.18}>
            <div style={{ marginBottom: isMobileViewport ? 50 : 60 }}>
              <div className="home-section-kicker" style={{ marginBottom: 24 }}>{T.howLabel}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: isMobileViewport ? 18 : 22 }}>
                {T.method.map((m, i) => (
                  <div key={i} className="mth">
                    <div className="mth-t home-method-title">{m.title}</div>
                    <div className="home-method-desc">{isMobileViewport ? (m.mobileDesc || m.desc) : m.desc}</div>
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
              <div className="home-pretty" style={{ textAlign: "center", marginBottom: 22, fontSize: 11, color: "#9c9186", fontFamily: "'IBM Plex Mono', monospace", lineHeight: 1.9, maxWidth: 380, marginInline: "auto" }}>
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
                  {hoverTrash ? T.trashHover : (trashGlitchText || (showTrashPlay ? T.trashPlay : T.trashBtn))}
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
            {lang === "it" ? (
              <>
                <div>I servizi spiegano cosa faccio.</div>
                <div>Il resto spiega come ci sono arrivato.</div>
              </>
            ) : (
              <>
                <div>The services explain what I do.</div>
                <div>The rest explains how I got here.</div>
              </>
            )}
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

      {phase === "game" && gameFlow === "chapter1Intro" && (
        <ChapterIntroCard
          number="1"
          title={T.ch1.introTitle}
          label={lang === "it" ? "Capitolo" : "Chapter"}
          onDone={() => setGameFlow("chapter1")}
        />
      )}

      {phase === "game" && gameFlow === "chapter2Intro" && (
        <ChapterIntroCard
          number="2"
          title={T.ch2.introTitle}
          label={lang === "it" ? "Capitolo" : "Chapter"}
          onDone={() => setGameFlow("chapter2")}
        />
      )}

      {phase === "game" && gameFlow === "chapter3Intro" && (
        <ChapterIntroCard
          number="3"
          title={T.ch3.introTitle}
          label={lang === "it" ? "Capitolo" : "Chapter"}
          onDone={() => setGameFlow("chapter3")}
        />
      )}

      {phase === "game" && gameFlow === "chapter1" && (
        <ChapterOne 
          T={T.ch1}
          onBack={handleBack}
          profileUi={{
            title: T.ch1.profileTitle,
            idle: T.ch1.profileIdle,
            currentLabel: profileMeta.currentLabel,
          }}
          profileEntries={profileMeta.entries}
          unlockedProfileIds={unlockedProfileIds}
          onUnlockProfile={unlockProfile}
          onRequestChapterTwo={() => {
            setGameFlow("chapter2Intro");
          }}
        />
      )}

      {phase === "game" && gameFlow === "chapter2" && (
        <ChapterTwoScene
          lang={lang}
          T={T.ch2}
          onBack={handleBack}
          onComplete={() => setGameFlow("chapter3Intro")}
          profileUi={{
            title: T.ch1.profileTitle,
            idle: T.ch1.profileIdle,
            currentLabel: profileMeta.currentLabel,
          }}
          profileEntries={profileMeta.entries}
          unlockedProfileIds={unlockedProfileIds}
          currentProfileId={unlockedProfileIds.includes("conflict") ? null : "conflict"}
          onUnlockProfile={unlockProfile}
        />
      )}

      {phase === "game" && gameFlow === "chapter3" && (
        <ChapterThreeScene
          T={T.ch3}
          onBack={handleBack}
          onComplete={() => setPhase("comingSoon")}
          profileUi={{
            title: T.ch1.profileTitle,
            idle: T.ch1.profileIdle,
            currentLabel: profileMeta.currentLabel,
          }}
          profileEntries={profileMeta.entries}
          unlockedProfileIds={unlockedProfileIds}
          currentProfileId={unlockedProfileIds.includes("synthesis") ? null : "synthesis"}
          onUnlockProfile={unlockProfile}
        />
      )}
    </div>
  );
}
