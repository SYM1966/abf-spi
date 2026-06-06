import { useState, useEffect, useRef } from "react";

// ── THEME ──────────────────────────────────────────────────────────────────
const C = {
  accent:     "#D4622A",   // orange brûlé
  accentSoft: "#E8854E",
  accentDim:  "rgba(212,98,42,0.12)",
  accentBord: "rgba(212,98,42,0.28)",
  bg:         "#0A0806",
  bg2:        "#100D0A",
  bg3:        "#181210",
  text:       "#F0EAE2",
  muted:      "#7A6E65",
  border:     "rgba(255,255,255,0.07)",
};

// ── DATA ───────────────────────────────────────────────────────────────────
const NAV_LINKS = ["Services","Méthode","Projets","À Propos","Contact"];

const SERVICES = [
  { icon:"◈", title:"Gestion de Programmes & Projets Industriels", desc:"Pilotage structuré de vos programmes et projets industriels complexes, de la phase de cadrage jusqu'à la clôture. Maîtrise des délais, budgets, ressources et livrables.", tags:["PMO","MSP","Agile"] },
  { icon:"⬡", title:"Audits de Systèmes Industriels", desc:"Évaluation approfondie de vos systèmes de production, processus et organisations. Identification des écarts, des risques et des opportunités d'amélioration.", tags:["Audit terrain","Diagnostic","Benchmarking"] },
  { icon:"◎", title:"Plans d'Actions", desc:"Élaboration, priorisation et suivi de plans d'actions correctifs et préventifs. Pilotage rigoureux des jalons et des responsabilités pour garantir l'atteinte des objectifs.", tags:["PDCA","Suivi KPI","Reporting"] },
  { icon:"▣", title:"Résolution de Problèmes", desc:"Application des méthodes structurées de résolution de problèmes pour éliminer durablement les causes racines de vos dysfonctionnements industriels.", tags:["8D","QRQC","5 Pourquoi","Ishikawa"] },
  { icon:"⟁", title:"Management de Transition", desc:"Pilotage opérationnel de vos fonctions industrielles en période de transition ou de transformation. Stabilisation rapide et transfert de compétences vers vos équipes.", tags:["Interim Mgmt","Transformation","Leadership"] },
  { icon:"⊕", title:"Conduite du Changement", desc:"Accompagnement humain et organisationnel pour ancrer durablement les nouvelles pratiques. Mobilisation des équipes, communication et formation aux nouvelles méthodes de travail.", tags:["Change Mgmt","Formation","Coaching"] },
  { icon:"◐", title:"Amélioration Continue Lean Kaizen / WCM", desc:"Déploiement des systèmes d'excellence opérationnelle Lean, Kaizen et World Class Manufacturing. Réduction des gaspillages, amélioration de la qualité et augmentation de la productivité.", tags:["Lean","Kaizen","WCM","5S","VSM"] },
  { icon:"◧", title:"Planification Stratégique de Développement Industriel", desc:"Conception et déploiement de feuilles de route industrielles long terme. Alignement de votre stratégie de production avec vos objectifs de croissance et de compétitivité.", tags:["Roadmap","Stratégie","Capacité"] },
  { icon:"⬢", title:"Recherche & Développement / Innovation Technologique", desc:"Pilotage de projets R&D et d'innovation technologique industrielle. Intégration de nouvelles technologies pour moderniser vos processus et renforcer votre avantage compétitif.", tags:["R&D","Innovation","Industrie 4.0"] },
  { icon:"✦", title:"Stratégie & Opérations Industrielles", desc:"Alignement de votre stratégie d'entreprise avec vos opérations industrielles. Optimisation de la chaîne de valeur, des flux et de la performance globale de vos sites.", tags:["S&OP","Supply Chain","Performance"] },
  { icon:"◉", title:"Développement d'Activités Stratégiques (DAS)", desc:"Identification, structuration et développement de nouveaux domaines d'activité stratégiques. Analyse de marché, positionnement et plans de déploiement opérationnel.", tags:["Business Dev","Diversification","DAS"] },
  { icon:"⊞", title:"QHSE", desc:"Déploiement et pilotage de systèmes de management Qualité, Hygiène, Sécurité et Environnement. Mise en conformité, certification et culture QHSE au sein de vos équipes.", tags:["ISO 9001","ISO 14001","OHSAS 18001"] },
  { icon:"⊟", title:"Élaboration & Pilotage d'Indicateurs Clés de Performance (KPI)", desc:"Conception de tableaux de bord industriels sur mesure, définition des KPIs stratégiques et opérationnels, et mise en place de rituels de pilotage pour une prise de décision éclairée.", tags:["KPI","Dashboard","TRS/OEE","Balanced Scorecard"] },
];

const DOMAINS = [
  { label:"Automobile & Mobilité", icon:"⬡" },
  { label:"Agroalimentaire", icon:"◎" },
  { label:"Énergie & Utilities", icon:"◈" },
  { label:"Aéronautique", icon:"▣" },
  { label:"Chimie & Pharmacie", icon:"⟁" },
  { label:"Logistique & Supply Chain", icon:"⊕" },
  { label:"Équipements industriels", icon:"◐" },
  { label:"BTP & Infrastructure", icon:"◧" },
  { label:"Métallurgie", icon:"⬢" },
  { label:"Matériaux composites & Plasturgie", icon:"◉" },
  { label:"Chimie industrielle", icon:"⊞" },
  { label:"Spatial", icon:"⊟" },
  { label:"Nucléaire", icon:"✦" },
  { label:"Mécanique", icon:"◈" },
];

const PROCESS = [
  { num:"01", title:"Diagnostic", desc:"Analyse terrain de vos processus, identification des dysfonctionnements et cartographie des flux de valeur." },
  { num:"02", title:"Cadrage", desc:"Définition des objectifs SMART, périmètre du projet, plan de charge et validation des parties prenantes." },
  { num:"03", title:"Déploiement", desc:"Mise en œuvre des solutions avec vos équipes, en mode agile ou classique selon le contexte." },
  { num:"04", title:"Mesure", desc:"Suivi des indicateurs de performance, ajustements continus et reporting régulier à votre direction." },
  { num:"05", title:"Ancrage", desc:"Formation, documentation et transfert de compétences pour pérenniser les gains obtenus." },
];

const STATS = [
  { value:"180+", label:"Projets livrés" },
  { value:"100%",  label:"Taux de satisfaction" },
  { value:"27 ans", label:"D'expérience" },
  { value:"10Md€", label:"De gains générés (€)" },
];

const PROJECTS = [
  { sector:"Mines & Extractif — Sénégal", title:"Optimisation des opérations minières", result:"−22% coûts opérationnels", desc:"Déploiement d'un système Lean adapté sur site minier. Réduction des temps d'arrêt et amélioration du taux de disponibilité des équipements.", color:C.accent },
  { sector:"Agroalimentaire — Côte d'Ivoire", title:"Mise en conformité QHSE & certification ISO 22000", result:"Certification obtenue", desc:"Audit complet, plan d'actions et accompagnement à la certification d'une unité de transformation agroalimentaire.", color:C.accentSoft },
  { sector:"BTP & Infrastructure — Sénégal", title:"Pilotage de programme de construction industrielle", result:"Livraison dans les délais", desc:"Management de programme multi-sites pour la construction d'unités industrielles dans le cadre d'un projet d'infrastructure nationale.", color:"#7EB4DC" },
  { sector:"Énergie & Utilities — Afrique de l'Ouest", title:"Déploiement d'indicateurs de performance KPI", result:"+35% visibilité opérationnelle", desc:"Conception et implémentation de tableaux de bord de pilotage pour une société de distribution d'énergie couvrant 3 pays.", color:C.accent },
  { sector:"Industrie Manufacturière — Sénégal", title:"Transformation Lean & amélioration continue", result:"−30% gaspillages production", desc:"Déploiement d'une démarche Kaizen sur lignes de production : 5S, VSM, chantiers d'amélioration et formation des équipes terrain.", color:C.accentSoft },
  { sector:"Logistique & Supply Chain — Dakar", title:"Réorganisation & optimisation de la chaîne logistique", result:"+40% efficacité livraisons", desc:"Refonte des processus logistiques, réduction des délais de livraison et mise en place d'un système de suivi de la performance.", color:"#7EB4DC" },
];

const TEAM = [
  { name:"Youssoupha Samuel MBAYE", role:"Ing. EdD, Opérations Industrielles — CEO & Fondateur", xp:"Ingénieur Docteur spécialisé en opérations industrielles. Expert en gestion de projets complexes, amélioration continue et transformation des systèmes de production.", initials:"YM" },
];

const CERTIFS = [
  { name:"ISO 9001", desc:"Management de la qualité" },
  { name:"ISO 14001", desc:"Management environnemental" },
  { name:"Lean Six Sigma", desc:"Black Belt certifié" },
  { name:"Prince2", desc:"Gestion de projets" },
  { name:"OPQF", desc:"Organisme de formation qualifié" },
  { name:"Qualiopi", desc:"Certification formation professionnelle" },
];

// ── HOOKS ──────────────────────────────────────────────────────────────────
const useIntersection = (threshold = 0.12) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
};

const Counter = ({ target }) => {
  const [count, setCount] = useState(0);
  const [ref, visible] = useIntersection(0.5);
  const num = parseInt(target.replace(/\D/g,""));
  useEffect(() => {
    if (!visible) return;
    let s = 0; const step = Math.ceil(num/60);
    const t = setInterval(() => { s += step; if (s >= num){ setCount(num); clearInterval(t); } else setCount(s); }, 24);
    return () => clearInterval(t);
  }, [visible, num]);
  const display = target.includes("Md€") ? `${count}Md€+` : target.includes("M€") ? `${count}M€` : target.includes("%") ? `${count}%` : target.includes("ans") ? `${count} ans` : `${count}+`;
  return <span ref={ref}>{display}</span>;
};

const Logo = ({ size = 36 }) => {
  const ac = "#D4622A";
  const tx = "#F0EAE2";
  const mu = "#7A6E65";
  const cx = 20, cy = 20, R = 13, r = 6, teeth = 8;
  // Build gear path
  const toRad = d => d * Math.PI / 180;
  const pts = [];
  for (let i = 0; i < teeth; i++) {
    const base = (360 / teeth) * i;
    const half = 360 / teeth / 2;
    const gap = 7;
    [base - gap, base - gap + 4, base + half - 4, base + half + gap].forEach((a, j) => {
      const rad = toRad(a - 90);
      const rv = j === 1 || j === 2 ? R : R - 4;
      pts.push(`${cx + rv * Math.cos(rad)},${cy + rv * Math.sin(rad)}`);
    });
  }
  const gearPath = `M ${pts.join(' L ')} Z`;
  return (
    <svg width={size * 3.2} height={size} viewBox="0 0 128 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Gear outer */}
      <path d={gearPath} fill={`rgba(212,98,42,0.15)`} stroke={ac} strokeWidth="1.2" strokeLinejoin="round"/>
      {/* Gear center hole */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={ac} strokeWidth="1.2"/>
      {/* Inner cross — precision */}
      <line x1={cx} y1={cy-3.5} x2={cx} y2={cy+3.5} stroke={ac} strokeWidth="1" strokeLinecap="round"/>
      <line x1={cx-3.5} y1={cy} x2={cx+3.5} y2={cy} stroke={ac} strokeWidth="1" strokeLinecap="round"/>
      {/* Small upward arrow on gear — performance */}
      <polyline points={`${cx-2},${cy+1} ${cx},${cy-2} ${cx+2},${cy+1}`} stroke={ac} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      {/* Text */}
      <text x="46" y="15" fontFamily="IBM Plex Sans, sans-serif" fontWeight="700" fontSize="12" fill={tx} letterSpacing="2.5">ABF</text>
      <text x="46" y="26" fontFamily="IBM Plex Sans, sans-serif" fontWeight="400" fontSize="7.5" fill={mu} letterSpacing="1">SOLUTIONS</text>
      <text x="46" y="36" fontFamily="IBM Plex Sans, sans-serif" fontWeight="300" fontSize="5.8" fill={ac} letterSpacing="0.8">PERFORMANCE INDUSTRIELLE</text>
    </svg>
  );
};

// ── COMPONENT ──────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const [formData, setFormData] = useState({ nom:"", email:"", message:"" });
  const [sent, setSent] = useState(false);

  const [heroRef,    heroV]    = useIntersection(0.05);
  const [servRef,    servV]    = useIntersection(0.08);
  const [domRef,     domV]     = useIntersection(0.08);
  const [procRef,    procV]    = useIntersection(0.08);
  const [projRef,    projV]    = useIntersection(0.08);
  const [teamRef,    teamV]    = useIntersection(0.08);
  const [certRef,    certV]    = useIntersection(0.08);
  const [contactRef, contactV] = useIntersection(0.08);

  useEffect(() => {
    const ids = ["services","methode","projets","apropos","certifications","contact"];
    const onScroll = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el){ const r = el.getBoundingClientRect(); if (r.top <= 120 && r.bottom >= 120){ setActive(id); break; } }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior:"smooth" }); setMenuOpen(false); };

  const navIds = ["services","methode","projets","apropos","contact"];

  return (
    <div style={s.root}>

      {/* NAV */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={s.logo}>
            <Logo size={32}/>
          </div>
          <div style={s.navLinks}>
            {NAV_LINKS.map((l,i) => (
              <button key={l} onClick={() => scrollTo(navIds[i])} style={{ ...s.navLink, ...(active===navIds[i] ? s.navLinkActive : {}) }}>{l}</button>
            ))}
            <button style={s.navCta} onClick={() => scrollTo("contact")}>Nous contacter</button>
          </div>
          <button style={s.burger} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen?"✕":"☰"}</button>
        </div>
        {menuOpen && (
          <div style={s.mobileMenu}>
            {NAV_LINKS.map((l,i) => <button key={l} onClick={() => scrollTo(navIds[i])} style={s.mobileLink}>{l}</button>)}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={s.hero}>
        <div style={s.heroGrid}/>
        <div style={s.heroGlow}/>
        <div style={{ ...s.heroContent, opacity:heroV?1:0, transform:heroV?"translateY(0)":"translateY(40px)", transition:"opacity 0.9s ease, transform 0.9s ease" }}>
          <div style={s.badge}>Excellence Opérationnelle & Ingénierie Industrielle</div>
          <h1 style={s.heroTitle}>
            Transformons vos<br/>
            <span style={s.heroAccent}>processus industriels</span><br/>
            en performance durable.
          </h1>
          <p style={s.heroSub}>
            ABF Solutions Performance Industrielle est votre partenaire de confiance pour la gestion de projets complexes, l'ingénierie et le déploiement de l'amélioration continue.
          </p>
          <div style={s.heroCtas}>
            <button style={s.btnPrimary} onClick={() => scrollTo("projets")}>Voir nos réalisations</button>
            <button style={s.btnGhost} onClick={() => scrollTo("contact")}>Prendre rendez-vous →</button>
          </div>
        </div>
        <div style={s.heroVisual}>
          {["Lean","PMO","AMDEC","Kaizen","6σ","VSM","5S","OEE","PDCA"].map((t,i) => (
            <div key={t} style={{ ...s.hexTag, animationDelay:`${i*0.12}s` }}>{t}</div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <div style={s.statsBar}>
        {STATS.map(st => (
          <div key={st.label} style={s.statCard}>
            <div style={s.statVal}><Counter target={st.value}/></div>
            <div style={s.statLbl}>{st.label}</div>
          </div>
        ))}
      </div>

      {/* SERVICES */}
      <section id="services" ref={servRef} style={s.section}>
        <div style={s.secHead}>
          <div style={s.secTag}>— Nos Services</div>
          <h2 style={s.secTitle}>Une expertise complète<br/>au service de votre industrie</h2>
        </div>
        <div style={s.grid3}>
          {SERVICES.map((sv,i) => (
            <div key={sv.title} style={{ ...s.card, opacity:servV?1:0, transform:servV?"translateY(0)":"translateY(28px)", transition:`opacity 0.55s ease ${i*0.1}s, transform 0.55s ease ${i*0.1}s` }}>
              <div style={s.cardIcon}>{sv.icon}</div>
              <h3 style={s.cardTitle}>{sv.title}</h3>
              <p style={s.cardDesc}>{sv.desc}</p>
              <div style={s.tags}>{sv.tags.map(t => <span key={t} style={s.tag}>{t}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DOMAINES */}
      <section id="domaines" ref={domRef} style={{ ...s.section, background:C.bg2 }}>
        <div style={s.secHead}>
          <div style={s.secTag}>— Nos Domaines d'Intervention</div>
          <h2 style={s.secTitle}>Des secteurs industriels<br/>que nous maîtrisons</h2>
        </div>
        <div style={s.domGrid}>
          {DOMAINS.map((d,i) => (
            <div key={d.label} style={{ ...s.domCard, opacity:domV?1:0, transform:domV?"scale(1)":"scale(0.93)", transition:`opacity 0.5s ease ${i*0.07}s, transform 0.5s ease ${i*0.07}s` }}>
              <span style={s.domIcon}>{d.icon}</span>
              <span style={s.domLabel}>{d.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MÉTHODE */}
      <section id="methode" ref={procRef} style={s.section}>
        <div style={s.secHead}>
          <div style={s.secTag}>— Notre Méthode</div>
          <h2 style={s.secTitle}>Un processus éprouvé<br/>pour des résultats garantis</h2>
        </div>
        <div style={s.procWrap}>
          {PROCESS.map((p,i) => (
            <div key={p.num} style={{ ...s.procStep, opacity:procV?1:0, transform:procV?"translateX(0)":"translateX(-30px)", transition:`opacity 0.6s ease ${i*0.13}s, transform 0.6s ease ${i*0.13}s` }}>
              <div style={s.procNum}>{p.num}</div>
              <div style={s.procLine}/>
              <div style={s.procBody}>
                <h3 style={s.procTitle}>{p.title}</h3>
                <p style={s.procDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJETS */}
      <section id="projets" ref={projRef} style={{ ...s.section, background:C.bg2 }}>
        <div style={s.secHead}>
          <div style={s.secTag}>— Réalisations</div>
          <h2 style={s.secTitle}>Des résultats<br/>mesurables et concrets</h2>
        </div>
        <div style={s.grid3}>
          {PROJECTS.map((p,i) => (
            <div key={p.title} style={{ ...s.projCard, opacity:projV?1:0, transform:projV?"translateY(0)":"translateY(28px)", transition:`opacity 0.6s ease ${i*0.13}s, transform 0.6s ease ${i*0.13}s` }}>
              <div style={{ ...s.projLine, background:p.color }}/>
              <div style={s.projSector}>{p.sector}</div>
              <h3 style={s.cardTitle}>{p.title}</h3>
              <p style={s.cardDesc}>{p.desc}</p>
              <div style={{ ...s.projResult, color:p.color }}>{p.result}</div>
            </div>
          ))}
        </div>
      </section>

      {/* À PROPOS / ÉQUIPE */}
      <section id="apropos" ref={teamRef} style={s.section}>
        <div style={s.secHead}>
          <div style={s.secTag}>— À Propos</div>
          <h2 style={s.secTitle}>Une équipe d'experts<br/>à votre service</h2>
          <p style={{ ...s.cardDesc, maxWidth:640, marginTop:20 }}>
            ABF Solutions Performance Industrielle est fondée et dirigée par Youssoupha Samuel MBAYE, Ingénieur Docteur en Opérations Industrielles. Depuis Dakar, nous accompagnons les entreprises africaines et internationales dans leur transformation industrielle. Notre force : une expertise de haut niveau, ancrée dans la réalité du terrain.
          </p>
        </div>
        <div style={s.grid3}>
          {TEAM.map((m,i) => (
            <div key={m.name} style={{ ...s.teamCard, opacity:teamV?1:0, transform:teamV?"translateY(0)":"translateY(28px)", transition:`opacity 0.6s ease ${i*0.13}s, transform 0.6s ease ${i*0.13}s` }}>
              <div style={s.avatar}>{m.initials}</div>
              <h3 style={s.teamName}>{m.name}</h3>
              <div style={s.teamRole}>{m.role}</div>
              <p style={s.cardDesc}>{m.xp}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" ref={certRef} style={{ ...s.section, background:C.bg2 }}>
        <div style={s.secHead}>
          <div style={s.secTag}>— Certifications & Accréditations</div>
          <h2 style={s.secTitle}>Des garanties de<br/>qualité reconnues</h2>
        </div>
        <div style={s.certGrid}>
          {CERTIFS.map((c,i) => (
            <div key={c.name} style={{ ...s.certCard, opacity:certV?1:0, transform:certV?"scale(1)":"scale(0.92)", transition:`opacity 0.5s ease ${i*0.09}s, transform 0.5s ease ${i*0.09}s` }}>
              <div style={s.certBadge}>{c.name}</div>
              <div style={s.certDesc}>{c.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef} style={s.section}>
        <div style={s.contactWrap}>
          <div style={{ opacity:contactV?1:0, transform:contactV?"translateX(0)":"translateX(-30px)", transition:"opacity 0.7s ease, transform 0.7s ease" }}>
            <div style={s.secTag}>— Contact</div>
            <h2 style={s.secTitle}>Parlons de<br/>votre projet</h2>
            <p style={{ ...s.cardDesc, marginTop:20, marginBottom:36 }}>
              Chaque défi industriel est unique. Partagez-nous votre contexte et nous vous proposerons une approche sur mesure, sans engagement.
            </p>
            <div style={s.contactInfo}>
              <div style={s.contactLine}>✦ samuel.mbaye001@gmail.com</div>
              <div style={s.contactLine}>✦ +221 78 669 41 85</div>
              <div style={s.contactLine}>✦ Sicap Foire Lot 16 — Dakar, Sénégal</div>
            </div>
          </div>
          <div style={{ opacity:contactV?1:0, transform:contactV?"translateX(0)":"translateX(30px)", transition:"opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>
            {!sent ? (
              <div style={s.form}>
                <input style={s.input} placeholder="Nom & Prénom" value={formData.nom} onChange={e=>setFormData({...formData,nom:e.target.value})} />
                <input style={s.input} type="email" placeholder="Email professionnel" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} />
                <textarea style={{ ...s.input, height:120, resize:"vertical" }} placeholder="Décrivez votre projet ou besoin..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})} />
                <button style={s.btnPrimary} onClick={()=>setSent(true)}>Envoyer le message</button>
              </div>
            ) : (
              <div style={s.successBox}>
                <div style={{ fontSize:36, color:C.accent, marginBottom:20 }}>✦</div>
                <h3 style={{ color:C.accent, marginBottom:8 }}>Message envoyé !</h3>
                <p style={{ color:C.muted }}>Nous reviendrons vers vous sous 24h.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={s.footer}>
        <div style={s.footerInner}>
          <div style={s.logo}>
            <Logo size={28}/>
          </div>
          <p style={{ fontSize:12, color:C.muted }}>© 2026 ABF Solutions Performance Industrielle — Tous droits réservés</p>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{background:${C.bg};}
        ::-webkit-scrollbar{width:6px;}
        ::-webkit-scrollbar-track{background:${C.bg};}
        ::-webkit-scrollbar-thumb{background:${C.bg3};border-radius:3px;}
        button:hover{opacity:0.88;}
        @keyframes floatIn{from{opacity:0;transform:translateY(16px) scale(0.96);}to{opacity:1;transform:translateY(0) scale(1);}}
      `}</style>
    </div>
  );
}

// ── STYLES ─────────────────────────────────────────────────────────────────
const s = {
  root:{ fontFamily:"'IBM Plex Sans',sans-serif", background:C.bg, color:C.text, minHeight:"100vh", overflowX:"hidden" },
  nav:{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:"rgba(9,11,15,0.93)", backdropFilter:"blur(14px)", borderBottom:`1px solid ${C.border}` },
  navInner:{ maxWidth:1280, margin:"0 auto", padding:"0 40px", display:"flex", alignItems:"center", justifyContent:"space-between", height:68 },
  logo:{ display:"flex", alignItems:"center", gap:12 },
  logoMark:{ background:C.accent, color:"#fff", fontWeight:700, fontSize:13, letterSpacing:2, padding:"6px 10px", borderRadius:4 },
  logoName:{ fontSize:13, fontWeight:500, color:C.text, letterSpacing:0.5 },
  navLinks:{ display:"flex", alignItems:"center", gap:2 },
  navLink:{ background:"none", border:"none", cursor:"pointer", color:C.muted, fontSize:12, fontWeight:500, letterSpacing:1, padding:"6px 13px", borderRadius:4, textTransform:"uppercase", transition:"color 0.2s" },
  navLinkActive:{ color:C.accent },
  navCta:{ background:C.accent, color:"#fff", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, letterSpacing:1, padding:"8px 18px", borderRadius:4, textTransform:"uppercase", marginLeft:10 },
  burger:{ display:"none", background:"none", border:"none", color:C.text, fontSize:20, cursor:"pointer" },
  mobileMenu:{ display:"flex", flexDirection:"column", padding:"12px 40px 20px", gap:4, borderTop:`1px solid ${C.border}` },
  mobileLink:{ background:"none", border:"none", cursor:"pointer", color:C.muted, fontSize:14, textAlign:"left", padding:"10px 0", textTransform:"uppercase", letterSpacing:1 },

  hero:{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"110px 64px 70px", position:"relative", overflow:"hidden", maxWidth:1280, margin:"0 auto", gap:48 },
  heroGrid:{ position:"absolute", inset:0, backgroundImage:`linear-gradient(${C.accentBord.replace("0.25","0.05")} 1px,transparent 1px),linear-gradient(90deg,${C.accentBord.replace("0.25","0.05")} 1px,transparent 1px)`, backgroundSize:"64px 64px", pointerEvents:"none" },
  heroGlow:{ position:"absolute", right:-120, top:"40%", width:560, height:560, background:`radial-gradient(circle,${C.accentDim} 0%,transparent 70%)`, transform:"translateY(-50%)", pointerEvents:"none" },
  heroContent:{ flex:1, maxWidth:640, position:"relative" },
  badge:{ display:"inline-block", border:`1px solid ${C.accentBord}`, color:C.accent, fontSize:11, fontWeight:500, letterSpacing:2, padding:"5px 14px", borderRadius:2, textTransform:"uppercase", marginBottom:28 },
  heroTitle:{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(34px,5vw,60px)", lineHeight:1.1, fontWeight:400, color:C.text, marginBottom:24 },
  heroAccent:{ color:C.accent, fontStyle:"italic" },
  heroSub:{ fontSize:15, lineHeight:1.8, color:C.muted, marginBottom:40, maxWidth:500 },
  heroCtas:{ display:"flex", gap:16, flexWrap:"wrap" },
  btnPrimary:{ background:C.accent, color:"#fff", border:"none", cursor:"pointer", fontSize:13, fontWeight:600, letterSpacing:1, padding:"13px 28px", borderRadius:4, textTransform:"uppercase" },
  btnGhost:{ background:"none", border:`1px solid ${C.accentBord}`, color:C.accent, cursor:"pointer", fontSize:13, fontWeight:500, letterSpacing:1, padding:"13px 28px", borderRadius:4, textTransform:"uppercase" },
  heroVisual:{ flex:"0 0 300px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 },
  hexTag:{ background:C.accentDim, border:`1px solid ${C.accentBord}`, color:C.accent, fontSize:12, fontWeight:500, padding:"14px 8px", borderRadius:6, textAlign:"center", letterSpacing:1, animation:"floatIn 0.6s ease both" },

  statsBar:{ borderTop:`1px solid ${C.border}`, borderBottom:`1px solid ${C.border}`, background:C.bg2, padding:"52px 32px" },
  statCard:{ textAlign:"center", padding:12, flex:1 },
  statVal:{ fontFamily:"'DM Serif Display',serif", fontSize:46, color:C.accent, marginBottom:6, display:"block" },
  statLbl:{ fontSize:12, color:C.muted, letterSpacing:1, textTransform:"uppercase" },

  section:{ padding:"100px 64px", maxWidth:1280, margin:"0 auto" },
  secHead:{ marginBottom:60 },
  secTag:{ fontSize:11, letterSpacing:3, textTransform:"uppercase", color:C.accent, marginBottom:16 },
  secTitle:{ fontFamily:"'DM Serif Display',serif", fontSize:"clamp(26px,4vw,46px)", fontWeight:400, lineHeight:1.15, color:C.text },

  grid3:{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 },
  card:{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, borderRadius:8, padding:"34px 30px" },
  cardIcon:{ fontSize:26, color:C.accent, marginBottom:18 },
  cardTitle:{ fontSize:17, fontWeight:600, color:C.text, marginBottom:10 },
  cardDesc:{ fontSize:14, lineHeight:1.75, color:C.muted },
  tags:{ display:"flex", gap:8, flexWrap:"wrap", marginTop:20 },
  tag:{ background:C.accentDim, border:`1px solid ${C.accentBord}`, color:C.accent, fontSize:11, padding:"3px 10px", borderRadius:3, letterSpacing:1, textTransform:"uppercase" },

  domGrid:{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:16 },
  domCard:{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, borderRadius:6, padding:"20px 24px", display:"flex", alignItems:"center", gap:14 },
  domIcon:{ fontSize:20, color:C.accent },
  domLabel:{ fontSize:14, fontWeight:500, color:C.text },

  procWrap:{ display:"flex", flexDirection:"column", gap:0 },
  procStep:{ display:"flex", alignItems:"flex-start", gap:28, padding:"28px 0", borderBottom:`1px solid ${C.border}` },
  procNum:{ fontFamily:"'DM Serif Display',serif", fontSize:36, color:C.accent, opacity:0.5, minWidth:56 },
  procLine:{ width:2, alignSelf:"stretch", background:C.accentBord, marginTop:6, borderRadius:2 },
  procBody:{ flex:1 },
  procTitle:{ fontSize:18, fontWeight:600, color:C.text, marginBottom:8 },
  procDesc:{ fontSize:14, lineHeight:1.75, color:C.muted },

  projCard:{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, borderRadius:8, padding:"34px 30px", position:"relative", overflow:"hidden" },
  projLine:{ position:"absolute", top:0, left:0, right:0, height:3, borderRadius:"8px 8px 0 0" },
  projSector:{ fontSize:11, letterSpacing:2, textTransform:"uppercase", color:C.muted, marginBottom:12 },
  projResult:{ fontSize:22, fontWeight:700, fontFamily:"'DM Serif Display',serif", marginTop:18 },

  teamCard:{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, borderRadius:8, padding:"34px 30px", textAlign:"center" },
  avatar:{ width:64, height:64, borderRadius:"50%", background:C.accentDim, border:`2px solid ${C.accentBord}`, color:C.accent, fontSize:18, fontWeight:700, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" },
  teamName:{ fontSize:17, fontWeight:600, color:C.text, marginBottom:6 },
  teamRole:{ fontSize:12, color:C.accent, letterSpacing:1, textTransform:"uppercase", marginBottom:14 },

  certGrid:{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:20 },
  certCard:{ background:"rgba(255,255,255,0.03)", border:`1px solid ${C.border}`, borderRadius:8, padding:"28px 24px", textAlign:"center" },
  certBadge:{ fontSize:18, fontWeight:700, color:C.accent, marginBottom:10 },
  certDesc:{ fontSize:13, color:C.muted },

  contactWrap:{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"start" },
  contactInfo:{ display:"flex", flexDirection:"column", gap:12, marginTop:8 },
  contactLine:{ fontSize:14, color:C.muted },
  form:{ display:"flex", flexDirection:"column", gap:14 },
  input:{ background:"rgba(255,255,255,0.04)", border:`1px solid ${C.border}`, borderRadius:6, padding:"13px 16px", color:C.text, fontSize:14, outline:"none", width:"100%", fontFamily:"'IBM Plex Sans',sans-serif" },
  successBox:{ background:C.accentDim, border:`1px solid ${C.accentBord}`, borderRadius:8, padding:"48px 36px", textAlign:"center" },

  footer:{ borderTop:`1px solid ${C.border}`, padding:"28px 64px" },
  footerInner:{ maxWidth:1280, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 },
};
