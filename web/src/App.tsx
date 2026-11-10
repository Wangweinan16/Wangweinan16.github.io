"use client";

import { useEffect, useRef, useState } from "react";
import { photos, projects, publication, site } from "../../content/site";
import analyticsConfig from "../../content/analytics.json";
import { createAnalytics, privacyKey, validEndpoint } from "./analytics.mjs";

type Section = "home" | "research" | "experience" | "interests" | "photos";
const nav: { id: Section; label: string }[] = [
  { id: "research", label: "Research" },
  { id: "experience", label: "Experience" },
  { id: "interests", label: "Beyond research" },
  { id: "photos", label: "Photos" },
];
const analyticsConfigured = validEndpoint(analyticsConfig.endpoint);
let analyticsClient: ReturnType<typeof createAnalytics> | undefined;

function browserPrivacyChoice() {
  return navigator.doNotTrack === "1" || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl === true;
}

function sendVisit(page: Section) {
  try {
    analyticsClient ??= createAnalytics({ window, document, navigator, storage: localStorage, ...analyticsConfig });
    analyticsClient.track(page);
  } catch { /* Privacy preferences and browsing remain usable if storage is unavailable. */ }
}

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ThreadSchematic() {
  return <figure className="thread-figure">
    <div className="figure-top"><span className="micro-label">Connections across scales</span><span className="figure-cross" aria-hidden="true">+</span></div>
    <svg viewBox="0 0 580 520" role="img" aria-labelledby="thread-title thread-desc" className="thread-art">
      <title id="thread-title">Illustration of ultraflexible neural threads</title>
      <desc id="thread-desc">An abstract schematic of thin electrode traces connecting a chip to a network. This is an illustration, not experimental data.</desc>
      <defs>
        <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.8" fill="#203b35" opacity=".12" /></pattern>
        <linearGradient id="threadfill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#cfb58e" /><stop offset="1" stopColor="#ae7754" /></linearGradient>
      </defs>
      <rect width="580" height="520" fill="url(#dotgrid)" />
      <ellipse cx="303" cy="277" rx="199" ry="175" fill="none" stroke="#203b35" strokeOpacity=".13" strokeDasharray="3 7" />
      <ellipse cx="303" cy="277" rx="160" ry="134" fill="none" stroke="#203b35" strokeOpacity=".1" />
      <g stroke="#203b35" strokeWidth="1" opacity=".18" fill="none">
        <path d="M132 292 194 256 246 309 294 264 351 297 406 247 464 283M158 353 246 309 286 379 351 297 393 357M194 256 226 192 294 264 337 192 406 247 446 185M226 192 273 157 337 192 370 137M246 309 213 383M406 247 476 221M294 264 286 379" />
      </g>
      <g fill="#203b35" opacity=".35">
        {[[132,292],[194,256],[246,309],[294,264],[351,297],[406,247],[464,283],[158,353],[286,379],[393,357],[226,192],[337,192],[446,185],[273,157],[370,137],[213,383],[476,221]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 4 : 2.5} />)}
      </g>
      <g transform="translate(80 57) rotate(-8 73 45)">
        <rect x="0" y="0" width="144" height="89" rx="4" fill="#203b35" />
        <rect x="8" y="8" width="128" height="73" rx="2" fill="#2d4a43" stroke="#71847a" strokeWidth=".5" />
        <g fill="#d7b98b">{Array.from({length: 11},(_,i) => <rect key={i} x={16+i*11} y="73" width="5" height="12" rx="1" />)}</g>
        <path d="M40 38h24m-12-12v24m29-22h24m-12 0v24" fill="none" stroke="#e7e7d7" strokeOpacity=".6" strokeWidth="1.2" />
      </g>
      <g fill="none" stroke="url(#threadfill)" strokeLinecap="round">
        <path d="M107 145C106 204 176 185 177 250S135 329 163 408" strokeWidth="7" />
        <path d="M130 143C127 213 220 181 224 262S182 343 210 419" strokeWidth="7" />
        <path d="M153 141C156 227 267 192 273 271S233 368 261 434" strokeWidth="7" />
        <path d="M176 137C175 214 315 205 322 281S288 382 318 438" strokeWidth="7" />
        <path d="M199 134C201 221 363 213 372 284S345 376 372 426" strokeWidth="7" />
      </g>
      <g fill="none" stroke="#f6ecd5" strokeWidth=".9" strokeLinecap="round">
        <path d="M107 145C106 204 176 185 177 250S135 329 163 408" />
        <path d="M130 143C127 213 220 181 224 262S182 343 210 419" />
        <path d="M153 141C156 227 267 192 273 271S233 368 261 434" />
        <path d="M176 137C175 214 315 205 322 281S288 382 318 438" />
        <path d="M199 134C201 221 363 213 372 284S345 376 372 426" />
      </g>
      <g fill="#203b35" stroke="#f2ead7" strokeWidth="1.5">
        {[[163,408],[210,419],[261,434],[318,438],[372,426],[155,382],[203,391],[254,405],[309,410],[363,396]].map(([x,y],i) => <circle key={i} cx={x} cy={y} r="4" />)}
      </g>
      <g stroke="#79877d" strokeWidth=".7" fill="none"><path d="M227 91h165v40M381 419h90v-49M100 273H57v50" /></g>
      <g fill="#52675b" fontFamily="Arial,sans-serif" fontSize="10" letterSpacing="1.5"><text x="402" y="133">ELECTRONICS</text><text x="418" y="361">THREADS</text><text x="44" y="342">NETWORK</text></g>
      <circle cx="486" cy="437" r="26" fill="none" stroke="#203b35" strokeOpacity=".25" /><path d="M474 437h24m-12-12v24" stroke="#203b35" strokeWidth=".8" />
    </svg>
    <figcaption><span>01 / Ultraflexible interfaces</span><span>Conceptual schematic · not data</span></figcaption>
  </figure>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [optedOut, setOptedOut] = useState(false);
  const [browserOptOut, setBrowserOptOut] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const privacyDialog = useRef<HTMLDialogElement>(null);
  const photoDialog = useRef<HTMLDialogElement>(null);
  const trackedHome = useRef(false);
  const trackedSections = useRef(new Set<Section>(["home"]));

  useEffect(() => {
    setBrowserOptOut(browserPrivacyChoice());
    try { setOptedOut(localStorage.getItem(privacyKey) === "true"); } catch {}
    if (!trackedHome.current) { trackedHome.current = true; sendVisit("home"); }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const section = entry.target.id as Section;
        setActiveSection(section);
        if (!trackedSections.current.has(section)) {
          trackedSections.current.add(section);
          sendVisit(section);
        }
      }
    }, { rootMargin: "-10% 0px -60% 0px", threshold: 0 });
    document.querySelectorAll("[data-section]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function navigate(id: Section) { setMenuOpen(false); setActiveSection(id); }
  function changePrivacy(value: boolean) {
    setOptedOut(value);
    try { localStorage.setItem(privacyKey, String(value)); } catch {}
    if (value) analyticsClient?.clear();
  }
  const selectedPhoto = photos[photoIndex];

  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="site-header">
      <a className="wordmark" href="#home" onClick={() => navigate("home")} aria-label="Weinan Wang, home"><span className="monogram">WW<span aria-hidden="true">.</span></span><span className="wordmark-name">Weinan Wang</span></a>
      <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="main-nav" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "Close" : "Menu"}<span aria-hidden="true">{menuOpen ? "−" : "+"}</span></button>
      <nav id="main-nav" aria-label="Main navigation" className={menuOpen ? "main-nav is-open" : "main-nav"}>
        {nav.map(item => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined} onClick={() => navigate(item.id)}>{item.label}</a>)}
        <a className="nav-contact" href={`mailto:${site.email}`}>Get in touch <Arrow diagonal /></a>
      </nav>
    </header>

    <main id="main-content">
      <section className="hero section-shell" id="home" data-section>
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" aria-hidden="true" />{site.field}</p>
          <h1>Weinan<br /><span>Wang</span><span className="name-period" aria-hidden="true">.</span></h1>
          <h2>{site.headline}</h2><p className="hero-affiliation">{site.affiliation}</p>
          <p className="hero-intro">{site.intro}</p>
          <div className="hero-actions"><a href="#research" className="button button-dark" onClick={() => navigate("research")}>Explore my research <Arrow /></a><a className="text-link" href={`mailto:${site.email}`}>Say hello <Arrow diagonal /></a></div>
          <div className="hero-footnote"><span className="micro-label">Research, in context</span><span>Devices. Systems. A life beyond the lab.</span></div>
        </div>
        <ThreadSchematic />
      </section>

      <div className="section-divider section-shell"><span>Selected work & ongoing questions</span><a href="#research" onClick={() => navigate("research")} aria-label="Continue to research"><span aria-hidden="true">↓</span></a><span>Across scales, over time</span></div>

      <section className="research-section" id="research" data-section>
        <div className="section-shell">
          <div className="section-heading"><p className="eyebrow">01 / Research</p><div><h2>A conversation between<br />electronics and the brain.</h2><p>Building tools to connect neural activity across space and time—from individual cells to distributed circuits, and from fast dynamics to chronic studies.</p></div></div>
          <div className="theme-grid">{site.themes.map(theme => <article className="theme" key={theme.number}><span className="theme-number">{theme.number}</span><h3>{theme.title}</h3><p>{theme.text}</p></article>)}</div>
          <div className="project-heading"><h3>Projects & manuscripts</h3><p>A growing record of the work.</p></div>
          <div className="project-list">{projects.map((project,index) => <details className="project" key={project.id}>
            <summary><span className="project-index">0{index + 1}</span><span className="project-summary"><span className="project-title">{project.title}</span><span className="project-description">{project.summary}</span></span><span className="project-status">{project.status}</span><span className="expand-icon" aria-hidden="true">+</span></summary>
            <div className="project-body"><p>{project.details}</p>{project.figures.map(figure => <figure className="project-figure" key={figure.src}><img src={figure.src} alt={figure.alt} loading="lazy" /><figcaption>{figure.caption}</figcaption></figure>)}{project.links.length > 0 && <div className="project-links">{project.links.map(link => <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label} <Arrow diagonal /></a>)}</div>}{project.figures.length === 0 && <p className="materials-note"><span aria-hidden="true">↳</span> Public summaries, figures, and manuscript links will appear here as they become available.</p>}</div>
          </details>)}</div>
          <article className="publication"><p className="micro-label">Selected publication · Open access</p><a href={publication.url} target="_blank" rel="noopener noreferrer"><h3>{publication.title}</h3><Arrow diagonal /></a><p>{publication.authors}</p><p className="publication-journal">{publication.journal}</p></article><p className="research-source">Research background: <a href={site.links[0].url} target="_blank" rel="noopener noreferrer">Xie Lab profile <Arrow diagonal /></a></p>
        </div>
      </section>

      <section className="experience-section section-shell" id="experience" data-section>
        <div className="section-heading"><p className="eyebrow">02 / Experience</p><div><h2>A foundation for<br />what comes next.</h2><p>From mathematics and physics to the engineering of tools for neuroscience.</p></div></div>
        <div className="experience-layout"><div className="experience-aside"><span className="large-asterisk" aria-hidden="true">✳</span><p>Ideas develop through<br />people, places, and practice.</p></div><div className="timeline">{site.experience.map((item,index) => <article className="timeline-item" key={item.organization}><span className="timeline-marker" aria-hidden="true">{index + 1}</span><p className="micro-label">{item.role}</p><h3>{item.organization}</h3><p>{item.description}</p>{item.link && <a className="text-link" href={item.link} target="_blank" rel="noopener noreferrer">Lab profile <Arrow diagonal /></a>}</article>)}</div></div>
      </section>

      <section className="interests-section" id="interests" data-section><div className="section-shell interests-layout"><div><p className="eyebrow">03 / Beyond research</p><h2>Room for<br /><em>curiosity.</em></h2></div><div className="interests-copy"><span className="small-asterisk" aria-hidden="true">✳</span><p className="large-copy">There’s a life alongside the experiments.</p><p>This is a space for the interests, experiences, and small discoveries that make their way into it.</p><p className="coming-note">Personal notes and interests are on their way.</p><a className="text-link" href="#photos" onClick={() => navigate("photos")}>A place for moments <Arrow /></a></div></div></section>

      <section className="photos-section section-shell" id="photos" data-section>
        <div className="photo-heading"><div><p className="eyebrow">04 / Selected photos</p><h2>Looking a little closer.</h2></div><p>Places, people, and details worth keeping.</p></div>
        {photos.length ? <div className="photo-grid">{photos.map((photo,index) => <figure key={photo.src}><button className="photo-button" onClick={() => {setPhotoIndex(index); photoDialog.current?.showModal();}} aria-label={`Enlarge photo: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span aria-hidden="true">↗</span></button><figcaption>{photo.caption}{photo.location && <span>{photo.location}</span>}</figcaption></figure>)}</div> : <div className="gallery-empty"><div className="empty-frame" aria-hidden="true"><svg viewBox="0 0 180 130" fill="none"><rect x="24" y="19" width="132" height="92" rx="1" stroke="currentColor" /><path d="m24 92 37-30 32 23 22-16 41 28M42 12h118v83" stroke="currentColor" /><circle cx="124" cy="44" r="9" stroke="currentColor" /></svg></div><div><p className="micro-label">A collection in the making</p><h3>Personal photos, coming soon.</h3><p>This gallery is waiting for the first selection. Every photograph will have its own caption and room to be explored.</p></div><span className="gallery-number" aria-hidden="true">01—∞</span></div>}
      </section>

      <section className="contact-section section-shell"><p className="eyebrow">Keep the conversation going</p><a className="contact-title" href={`mailto:${site.email}`}>Let’s connect.<Arrow diagonal /></a><div className="contact-bottom"><a className="email-link" href={`mailto:${site.email}`}>{site.email}</a><div className="profile-links">{site.links.map(link => <a href={link.url} key={link.url} target="_blank" rel="noopener noreferrer">{link.label}<Arrow diagonal /></a>)}</div></div></section>
    </main>

    <footer className="site-footer section-shell"><p>© {new Date().getFullYear()} {site.name}</p><span className="footer-note">A growing record of research & life.</span><button className="privacy-link" onClick={() => privacyDialog.current?.showModal()}>Privacy & visitor analytics</button></footer>

    <dialog className="privacy-dialog" ref={privacyDialog} onClick={event => {if(event.target === event.currentTarget) privacyDialog.current?.close();}} aria-labelledby="privacy-title"><div className="dialog-content"><div className="dialog-top"><p className="eyebrow">Your visit</p><button className="close-dialog" onClick={() => privacyDialog.current?.close()} aria-label="Close privacy information">×</button></div><h2 id="privacy-title">A little context.<br />Respect for your privacy.</h2><p>This site uses GoatCounter for aggregate visitor analytics when enabled. Page views, section visits, referring domains, and basic browser and approximate location statistics help me understand how people discover and explore my work.</p><p>The integration sends fixed page or section names and referring domains, without URL query strings. GoatCounter uses no tracking cookies. It temporarily processes IP addresses and browser information to estimate repeat visits, and states that raw IP addresses are not retained in its analytics database. No public statistics are displayed on this site.</p><label className="privacy-choice"><input type="checkbox" checked={optedOut} onChange={event => changePrivacy(event.target.checked)} /><span>Don’t include my visits in analytics.</span></label><p className="privacy-state" role="status">{!analyticsConfigured ? "Visitor analytics are currently disabled while setup is completed." : browserOptOut ? "Your browser’s Do Not Track or Global Privacy Control preference is active. Your visits are not counted." : optedOut ? "Your visits are not counted. This preference is saved on this device." : "Anonymous visit counting is enabled. You can opt out at any time."}</p><p className="dialog-fine-print">Your opt-out choice uses local storage on this device. GitHub and GoatCounter process requests under their respective privacy policies.</p><p><a className="text-link" href="https://www.goatcounter.com/help/privacy" target="_blank" rel="noopener noreferrer">GoatCounter privacy policy</a></p><button className="button button-dark" onClick={() => privacyDialog.current?.close()}>Done <Arrow /></button></div></dialog>
    <dialog className="photo-dialog" ref={photoDialog} onClick={event => {if(event.target === event.currentTarget) photoDialog.current?.close();}} aria-label="Expanded photograph"><button className="close-dialog" onClick={() => photoDialog.current?.close()} aria-label="Close photograph">×</button>{selectedPhoto && <figure><img src={selectedPhoto.src} alt={selectedPhoto.alt} /><figcaption>{selectedPhoto.caption}{selectedPhoto.location && <span>{selectedPhoto.location}</span>}</figcaption></figure>}</dialog>
  </>;
}


