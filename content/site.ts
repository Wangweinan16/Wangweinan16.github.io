import ebl from "./ebl.json";
export type Project = {
  id: string;
  title: string;
  label: string;
  summary: string;
  details: string;
  status: string;
  figures: { src: string; alt: string; caption: string }[];
  links: { label: string; url: string }[];
};
export type Photo = { src: string; alt: string; caption: string; location?: string };

export const site = {
  name: "Weinan Wang",
  initials: "WW",
  field: "Neural interfaces & bioelectronics",
  affiliation: "Applied Physics Ph.D. candidate · Rice University",
  headline: "Neural interfaces, built for the long view.",
  intro: "I develop ultraflexible neural interfaces for recording and stimulating the brain over long timescales. My research connects high-density device fabrication, automated implantation, and integrated electronics.",
  email: "ww40@rice.edu",
  links: [
    { label: "Xie Lab profile", url: "https://www.chongxie.net/Team/weinan-wang" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/weinanjaywang/" },
  ],
  themes: [
    { number: "01", title: "Small footprints. More connections.", text: "High-density interconnects patterned with electron-beam lithography, designed to expand the bandwidth of ultraflexible neural probes." },
    { number: "02", title: "From one thread to many.", text: "Automated, configurable implantation of multiple nanoelectronic thread probes to reach distributed brain circuits." },
    { number: "03", title: "Interfaces that stay connected.", text: "Integrated systems for chronic neural recording and stimulation, bringing together probes, implantation tools, and ASIC electronics." },
  ],
  experience: [
    { organization: "Rice University", role: "Graduate Researcher · Aug 2020–present", description: "Applied Physics Ph.D. candidate in the Chong Xie Lab, Department of Electrical and Computer Engineering and Neuroengineering Initiative. Research in ultraflexible neural interfaces, fabrication, robotic implantation, and integrated electronics. Ph.D. expected December 2026.", link: "https://www.chongxie.net/Team/weinan-wang" },
    { organization: "Tsinghua University", role: "Undergraduate · Aug 2016–Jun 2020", description: "BS in Mathematics and Physics with Honors; second major in Economics (Finance).", link: null },
    { organization: "UCLA", role: "Visiting program · Jul–Sep 2019", description: "Cross-disciplinary Scholars in Science & Technology program.", link: null },
  ],
};

// Only approved public summaries and figures belong here. Add paper/code/data links as available.
export const projects: Project[] = [
  { id: "ebl", title: "EBL", label: "Research project", summary: ebl.title, details: "Electron-beam lithography on polymer enables dense, ultraflexible neural interfaces for chronic recording and spatially selective stimulation. The latest manuscript covers probe fabrication and characterization, stable chronic recordings, bidirectional microstimulation, rodent behavior, and intraoperative human recordings. Explore the manuscript summary and all five main and fourteen supplemental figures, with their source captions.", status: "Manuscript draft · Nov 16, 2026", figures: [{ src: ebl.figures.main[0].src, alt: ebl.figures.main[0].alt, caption: "Figure 1. Design, fabrication and characterization of EBL-NETs. Open the project page for all figures and full captions." }], links: [{label:"Explore manuscript and all figures",url:"/research/ebl/"}] },
  { id: "centimani", title: "Centimani", label: "Research project", summary: "Precision robotics for parallel flexible-probe implantation.", details: "Centimani: A precision robotic system for minimally invasive, large-scale, parallel implantation of flexible neural probes into rodents. The project brings together optical registration, coordinated software, and controlled implantation workflows. Manuscript in preparation; public figures and further details forthcoming.", status: "Manuscript in preparation", figures: [], links: [] },
  { id: "gchip", title: "GChip", label: "Research project", summary: "Project overview and selected figures forthcoming.", details: "A dedicated home for the GChip project. A public summary, my contribution, approved figures, and manuscript links will be added when ready to share.", status: "Public materials forthcoming", figures: [], links: [] },
];

export const publication = {
  title: "High-channel-count neural recording and stimulation platform with 5376 simultaneous recording channels",
  authors: "Y. Fan, Y. Ma, P. Zolotavin, G. Topalli, W. Wang, M. Karlsson, M. Karlsson, L. Luan, C. Xie & T. Chi",
  journal: "npj Biomedical Innovations 3, Article 46 (2026)",
  url: "https://www.nature.com/articles/s44385-026-00103-8",
};

// Personal photos only. Supply descriptive alt text and a caption for every image.
export const photos: Photo[] = [];
