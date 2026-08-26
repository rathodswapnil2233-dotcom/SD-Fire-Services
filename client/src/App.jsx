import { useEffect, useMemo, useState } from 'react';
import { Routes, Route, Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BellRing, CheckCircle2, ChevronDown, ClipboardCheck, CloudRain, Droplets, Flame, Menu, Phone, ShieldCheck, Sparkles, Wrench, X, MapPin, Mail, MessageCircle, Quote, Star } from 'lucide-react';
import { getServices, getSettings, submitLead } from './api';

const gallery = [
  { src:'/gallery/work15.webp', title:'Site team & safety review' },
  { src:'/gallery/work14.webp', title:'Extinguisher readiness' },
  { src:'/gallery/work16.webp', title:'On-site inspection' },
  { src:'/gallery/work17.webp', title:'Fire safety drill' },
 // { src:'/gallery/work.webp', title:'Hydrant system installation' },
 // { src:'/gallery/work.webp', title:'Extinguisher servicing' },
 // { src:'/gallery/work.webp', title:'Safety awareness' },
  //{ src:'/gallery/work.webp', title:'Emergency response training' },
 // { src:'/gallery/work.webp', title:'Fire pump room' },
 // { src:'/gallery/team-hero.png', title:'Professional fire safety team' },
  { src:'/gallery/work-01.jpeg', title:'Fire protection project installation' },
  { src:'/gallery/work-02.jpeg', title:'External hydrant pipeline installation' },
  { src:'/gallery/work-03.jpeg', title:'Fire pump room installation' },
  { src:'/gallery/work-04.jpeg', title:'On-site fire pipeline installation' },
  { src:'/gallery/work-05.jpeg', title:'Ceiling fire alarm installation' },
  { src:'/gallery/work-06.jpeg', title:'Sprinkler head installation' },
  { src:'/gallery/work-07.jpeg', title:'Fire pump system commissioning' },
  { src:'/gallery/work-08.jpeg', title:'Fire pump and hydrant equipment' },
  { src:'/gallery/work-09.jpeg', title:'Outdoor fire pump installation' },
  { src:'/gallery/work-10.jpeg', title:'Hydrant pipeline site work' },
  { src:'/gallery/work-11.jpeg', title:'Fire hydrant pipeline project' },
  { src:'/gallery/work-12.jpeg', title:'Industrial fire pump system' },
  { src:'/gallery/work-13.jpeg', title:'Fire hose reel installation' },
];

const iconMap = { Droplets, BellRing, CloudRain, ShieldCheck, ClipboardCheck, Wrench, Flame };

const staticServices = [
  {title:'Fire Hydrant Systems', slug:'fire-hydrant-systems', shortDescription:'Design and installation of fire hydrant networks for industrial and commercial sites.', icon:'Droplets'},
  {title:'Fire Alarm & Detection', slug:'fire-alarm-detection', shortDescription:'Addressable and conventional detection systems with professional commissioning.', icon:'BellRing'},
  {title:'Fire Sprinkler Systems', slug:'fire-sprinkler-systems', shortDescription:'Automatic sprinkler solutions designed for effective fire control.', icon:'CloudRain'},
  {title:'Fire Suppression Systems', slug:'fire-suppression-systems', shortDescription:'Specialized suppression for server rooms, electrical rooms, kitchens and industry.', icon:'ShieldCheck'},
  {title:'Fire Safety Audit', slug:'fire-safety-audit', shortDescription:'Risk assessment, compliance inspection and actionable corrective plans.', icon:'ClipboardCheck'},
  {title:'AMC & Extinguisher Services', slug:'amc-extinguisher', shortDescription:'Supply, refilling, testing and annual maintenance for fire safety assets.', icon:'Wrench'}
];

const serviceDetails = {
  'fire-hydrant-systems': {
    title: 'Complete Fire Hydrant System Solutions',
    label: 'FIRE HYDRANT SYSTEMS',
    overview: 'We provide complete design, supply, installation, testing and maintenance of fire hydrant systems for industrial, commercial and large residential properties. Our solutions are planned according to site conditions, fire risks and operational requirements to provide a reliable water supply during fire emergencies.',
    services: ['Site survey and risk assessment', 'Hydrant network design and layout', 'Fire pump and pump-room installation', 'Hydrant pipeline installation', 'Hose reel and hose-box installation', 'Pressure testing and commissioning', 'Repair and annual maintenance'],
    components: ['Main fire pump', 'Jockey and standby pump', 'Pump control panel', 'Fire-water storage tank', 'Hydrant valve and hose box', 'Hose reel and branch pipe', 'Fire brigade inlet', 'MS/GI pipeline'],
    suitableFor: 'Factories, warehouses, hospitals, hotels, shopping malls, commercial complexes and residential projects.',
    photos: [
      {src:'/gallery/hydrant-system-room.jpeg', title:'Complete hydrant system room'},
      {src:'/gallery/hydrant-pump-room.jpeg', title:'Hydrant pump room'},
      {src:'/gallery/hydrant-valve-room.jpeg', title:'Hydrant valve and hose-box system'},
      {src:'/gallery/hydrant-hose-reel.jpeg', title:'Hydrant hose reel installation'},
      {src:'/gallery/hydrant-pump-equipment.jpeg', title:'Fire pump equipment'}
    ]
  },
  'fire-alarm-detection': {
    title: 'Early Detection for Faster Emergency Response',
    label: 'FIRE ALARM & DETECTION SYSTEMS',
    overview: 'We design and install conventional and addressable fire alarm systems for early detection of smoke, heat and fire. Each system is professionally configured, tested and commissioned to provide fast alerts and help occupants respond safely during an emergency.',
    services: ['Site inspection and system planning', 'Conventional fire alarm systems', 'Addressable fire alarm systems', 'Detector and control-panel installation', 'Alarm zoning and programming', 'Cable testing and commissioning', 'Fault repair and periodic maintenance'],
    components: ['Fire alarm control panel', 'Smoke detector', 'Heat detector', 'Manual call point', 'Hooter and sounder', 'Response indicator', 'Input/output modules', 'Fire-resistant cables'],
    suitableFor: 'Offices, hospitals, hotels, schools, factories, warehouses, malls and residential buildings.',
    photos: [
      {src:'/gallery/fire-alarm-panel.jpeg', title:'Fire alarm control panel'},
      {src:'/gallery/fire-alarm-control-panel.jpeg', title:'Addressable alarm panel'},
      {src:'/gallery/fire-alarm-installation.jpeg', title:'Fire alarm system installation'},
      {src:'/gallery/fire-alarm-devices.jpeg', title:'Alarm devices and detectors'},
      {src:'/gallery/fire-alarm-zone-panel.jpeg', title:'Fire alarm zone panel'},
      {src:'/gallery/fire-alarm-sensors.jpeg', title:'Smoke and heat sensors'}
    ]
  },
  'fire-sprinkler-systems': {
    title: 'Automatic Fire Sprinkler Protection',
    label: 'FIRE SPRINKLER SYSTEMS',
    overview: 'Our automatic sprinkler systems are designed to detect heat and control fire at an early stage. We provide complete sprinkler layout planning, equipment supply, pipeline installation, pressure testing and commissioning for different types of properties.',
    services: ['Site survey and sprinkler layout', 'Hydraulic planning', 'Sprinkler pipeline installation', 'Sprinkler head installation', 'Zone-control setup', 'Pressure and leakage testing', 'Inspection and maintenance'],
    components: ['Sprinkler heads', 'Sprinkler pipeline', 'Alarm valve assembly', 'Zone control valve', 'Flow switch', 'Pressure gauge', 'Test and drain valve', 'Fire pump connection'],
    suitableFor: 'Warehouses, factories, offices, hotels, malls, hospitals, basements and parking areas.',
    photos: [
      {src:'/gallery/sprinkler-ceiling-system.jpeg', title:'Industrial sprinkler ceiling system'},
      {src:'/gallery/sprinkler-warehouse.jpeg', title:'Warehouse sprinkler protection'},
      {src:'/gallery/sprinkler-pipeline.jpeg', title:'Sprinkler pipeline network'},
      {src:'/gallery/sprinkler-installation.jpeg', title:'Sprinkler system installation'},
      {src:'/gallery/sprinkler-head.jpeg', title:'Sprinkler head and pipework'}
    ]
  },
  'fire-suppression-systems': {
    title: 'Specialised Protection for Critical Areas',
    label: 'FIRE SUPPRESSION SYSTEMS',
    overview: 'We provide specialised fire suppression solutions for areas where conventional water-based systems may not be suitable. These systems are designed to detect and suppress fire quickly while helping protect sensitive equipment and critical operations.',
    services: ['Risk assessment and room inspection', 'Suppression system design', 'Cylinder and pipeline installation', 'Detection and control integration', 'Discharge nozzle installation', 'System testing and commissioning', 'Refilling and maintenance support'],
    components: ['Suppression-agent cylinders', 'Discharge nozzles', 'Detection system', 'Control panel', 'Manual release station', 'Abort switch', 'Audio-visual warning device', 'Pressure monitoring equipment'],
    suitableFor: 'Server rooms, data centres, electrical rooms, control rooms, commercial kitchens and industrial machinery areas.',
    photos: [
      {src:'/gallery/suppression-cylinder-room.jpeg', title:'Specialised suppression cylinder room'},
      {src:'/gallery/suppression-valve-system.jpeg', title:'Suppression valve and pipeline system'},
      {src:'/gallery/suppression-data-center.jpeg', title:'Data centre fire suppression'},
      {src:'/gallery/suppression-server-installation.jpeg', title:'Server room suppression installation'},
      {src:'/gallery/suppression-agent-cylinders.jpeg', title:'Clean-agent cylinders'},
      {src:'/gallery/suppression-control-system.jpeg', title:'Suppression control system'},
      {src:'/gallery/suppression-pipeline-system.jpeg', title:'Suppression pipeline network'}
    ]
  },
  'fire-safety-audit': {
    title: 'Identify Risks Before They Become Emergencies',
    label: 'FIRE SAFETY AUDIT',
    secondaryLabel: 'DELIVERABLES',
    secondaryTitle: 'Clear actions after inspection',
    overview: 'Our fire safety audit evaluates the existing fire-protection arrangements, emergency preparedness and potential risks within a property. After the inspection, we provide practical observations and priority-based corrective recommendations.',
    services: ['Fire extinguisher inspection', 'Hydrant and sprinkler system checks', 'Fire alarm system inspection', 'Emergency-exit assessment', 'Exit signage and lighting checks', 'Evacuation-route inspection', 'Electrical-panel observations', 'Fire-safety documentation review', 'Employee preparedness assessment'],
    components: ['Detailed inspection report', 'Risk observations', 'Site photographs', 'Equipment-condition summary', 'Priority-wise corrective actions', 'Maintenance recommendations', 'Suggested improvement plan'],
    suitableFor: 'Factories, corporate offices, hospitals, schools, hotels, malls, warehouses and residential societies.',
    photos: [
      {src:'/gallery/audit-warehouse-inspection.jpeg', title:'Warehouse fire safety inspection'},
      {src:'/gallery/audit-extinguisher-check.jpeg', title:'Extinguisher condition check'},
      {src:'/gallery/audit-checklist.jpeg', title:'Fire safety audit checklist'},
      {src:'/gallery/audit-safety-team.jpeg', title:'On-site safety assessment'},
      {src:'/gallery/audit-fire-equipment.jpeg', title:'Fire equipment review'},
      {src:'/gallery/audit-site-inspection.jpeg', title:'Site inspection and reporting'}
    ]
  },
  'amc-extinguisher': {
    title: 'Reliable Maintenance for Fire Safety Equipment',
    label: 'AMC & EXTINGUISHER SERVICES',
    secondaryLabel: 'EXTINGUISHER CATEGORIES',
    secondaryTitle: 'The right equipment for each risk',
    overview: 'We provide supply, installation, inspection, refilling, testing and annual maintenance services for fire extinguishers and fire-protection systems. Scheduled maintenance helps keep equipment ready for use and identifies faults before an emergency occurs.',
    services: ['New fire-extinguisher supply', 'Extinguisher installation', 'Periodic inspection', 'Refilling and servicing', 'Pressure-gauge inspection', 'Leakage and damage checks', 'Spare-part replacement', 'Service tagging and records', 'Fire-safety demonstrations', 'Annual Maintenance Contracts'],
    components: ['ABC dry chemical', 'CO2', 'Water', 'Foam', 'Wet chemical', 'Suitable specialised extinguishers'],
    coverage: ['Fire extinguishers', 'Fire hydrant systems', 'Fire alarm systems', 'Sprinkler systems', 'Fire pumps and panels', 'Emergency signage'],
    suitableFor: 'Factories, offices, warehouses, hospitals, hotels, schools, malls and residential societies requiring inspection-ready fire safety equipment.',
    photos: [
      {src:'/gallery/amc-extinguisher-types.jpeg', title:'Different extinguisher types'},
      {src:'/gallery/amc-refilling-process.jpeg', title:'Extinguisher refilling process'},
      {src:'/gallery/amc-pressure-inspection.jpeg', title:'Pressure-gauge inspection'},
      {src:'/gallery/amc-technician-service.jpeg', title:'Technician servicing extinguisher'},
      {src:'/gallery/amc-wall-extinguisher.jpeg', title:'Wall-mounted extinguisher'},
      {src:'/gallery/amc-service-record.jpeg', title:'Service label and maintenance record'},
      {src:'/gallery/amc-maintenance-workshop.jpeg', title:'Fire equipment maintenance'}
    ]
  }
};

const detailSlugs = Object.keys(serviceDetails);
function servicePath(service) {
  const slug = service.slug?.trim().toLowerCase();
  const normalizedTitle = service.title?.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
  const matchedSlug = detailSlugs.includes(slug) ? slug : detailSlugs.find(item => normalizedTitle?.includes(item.replace('fire-alarm-detection', 'fire alarm and detection').replaceAll('-', ' ')));
  return matchedSlug ? `/services/${matchedSlug}` : '/services';
}

function Layout({children}){
  const [open,setOpen]=useState(false);
  const location=useLocation();
  useEffect(()=>{setOpen(false)},[location.pathname]);
  useEffect(()=>{
    if(!location.hash)window.scrollTo({top:0,left:0,behavior:'auto'});
  },[location.pathname]);
  useEffect(()=>{
    if(!location.hash)return;
    const frame=requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'smooth',block:'start'}));
    return ()=>cancelAnimationFrame(frame);
  },[location.pathname,location.hash]);
  return <>
    <header className="nav-shell">
      <div className="container nav">
        <Link className="brand" to="/"><img src="/SD-Fire-logo-clean.png" alt="SD Fire Services" /></Link>
        <button className="mobile-menu" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button>
        <nav className={open?'nav-links open':'nav-links'}>
          {['/','/services','/about','/projects','/contact'].map((p,i)=><NavLink key={p} to={p} className={({isActive})=>isActive?'active':''}>{['Home','Services','About','Projects','Contact'][i]}</NavLink>)}
          <Link className="nav-cta" to="/#appointment">Book Inspection <ArrowRight size={15}/></Link>
        </nav>
      </div>
    </header>
    {children}
    <footer className="footer"><div className="container footer-grid">
      <div><div className="brand light"><img src="/SD-Fire-logo-clean.png" alt="SD Fire Services" /></div><p>Engineered fire protection for industrial, commercial and institutional premises.</p></div>
      <div><h4>Quick links</h4><Link to="/services">Services</Link><Link to="/about">About us</Link><Link to="/projects">Projects</Link></div>
      <div><h4>Reach us</h4><a href="tel:+919270777733">+91 92707 77733</a><a href="tel:+917972451110">+91 7972451110</a><a href="mailto:sdfireserivices111@gmail.com">sdfireserivices111@gmail.com</a><span>Yas Park, Plot no 62, Chakan, Kadachiwadi, Chakan, Maharashtra 410501<br/>Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507</span></div>
    </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} SD Fire Services. All rights reserved.</span><span>Built for safer spaces.</span></div></footer>
  </>;
}

function Home(){
  const [services,setServices]=useState(staticServices); const [settings,setSettings]=useState({});
  useEffect(()=>{getServices().then(setServices).catch(()=>{}); getSettings().then(setSettings).catch(()=>{})},[]);
  return <>
    <section className="hero">
      <div className="hero-overlay"/><div className="container hero-content">
        <motion.div initial={{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="hero-copy">
          <div className="eyebrow"><span/> FIRE SAFETY & PROTECTION <span/></div>
          <h1>Safety isn't an option.<br/><em>It's engineered.</em></h1>
          <p>From fire hydrants to intelligent detection, SD Fire Services creates protection systems that perform when every second counts.</p>
          <div className="hero-actions"><a className="btn primary" href="#appointment">Request Site Inspection <ArrowRight size={17}/></a><Link className="btn ghost" to="/services">Explore Services</Link></div>
          <div className="trust-row"><span><CheckCircle2 size={16}/> End-to-end fire protection</span><span><CheckCircle2 size={16}/> Industrial & commercial</span><span><CheckCircle2 size={16}/> AMC & compliance support</span></div>
        </motion.div>
        <div className="hero-card"><div className="hero-badge"><ShieldCheck size={18}/><span>AUTHORIZED FIRE SAFETY AGENCY</span></div><img src="/gallery/engineer-hero.png" alt="Fire safety engineer"/><div className="hero-card-meta"><span>Site-ready expertise</span><b>01 / 06</b></div></div>
      </div>
    </section>

    <section className="stats"><div className="container stats-grid"><div><strong>24/7</strong><span>Emergency-minded support</span></div><div><strong>360°</strong><span>Protection lifecycle</span></div><div><strong>6+</strong><span>Core service verticals</span></div><div><strong>100%</strong><span>Safety-first execution</span></div></div></section>

    <section className="section section-dark"><div className="container">
      <div className="section-head"><div><div className="kicker">CAPABILITIES</div><h2>Protection designed<br/><span>around your risk.</span></h2></div><p>One team from assessment through installation, testing and maintenance.</p></div>
      <div className="service-grid">{services.slice(0,6).map((s,i)=>{const Icon=iconMap[s.icon]||Flame;return <Link to={servicePath(s)} className="service-card" key={s._id||s.slug}><motion.div initial={{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.06}}><div className="icon-wrap"><Icon size={23}/></div><h3>{s.title}</h3><p>{s.shortDescription}</p><span>View capability <ArrowRight size={15}/></span></motion.div></Link>})}</div>
    </div></section>

    <section className="section split"><div className="container split-grid"><div className="image-stack"><img className="image-main" src="/gallery/hydrant-room.jpg" alt="Hydrant room"/><img className="image-float" src="/gallery/team-hero.png" alt="Fire safety team"/><div className="image-tag"><span>FIELD</span><b>Ready protection</b></div></div><div className="copy"><div className="kicker">WHY SD FIRE SERVICES</div><h2>Built for the moments that <span>matter.</span></h2><p>Our work combines practical fire engineering, installation discipline and ongoing maintenance. Every system is planned to protect people, reduce downtime and support compliance.</p><div className="check-list"><span><CheckCircle2/> Risk-first site survey</span><span><CheckCircle2/> Professional installation & testing</span><span><CheckCircle2/> Documentation & handover</span><span><CheckCircle2/> AMC & preventive maintenance</span></div><Link className="text-link" to="/about">More about SD Fire Services <ArrowRight size={16}/></Link></div></div></section>

    <section className="section section-soft"><div className="container"><div className="section-head"><div><div className="kicker">PROJECT VISUALS</div><h2>Work that looks <span>ready.</span></h2></div><Link className="text-link" to="/projects">View full gallery <ArrowRight size={16}/></Link></div><Gallery items={gallery.slice(0,6)} featured/></div></section>

    <section className="section quote-section"><div className="container quote-grid"><div><div className="kicker">TRUSTED DELIVERY</div><h2>“Professional, compliant, and reliable.”</h2><p>Our safety work is built around dependable execution, documentation and long-term maintenance relationships.</p></div><div className="client-wall"><div className="client-chip">MANUFACTURING</div><div className="client-chip">HEALTHCARE</div><div className="client-chip">HOSPITALITY</div><div className="client-chip">EDUCATION</div><div className="client-chip">INDUSTRIAL</div><div className="client-chip">SMART INFRA</div></div></div></section>
    <section className="section section-soft"><div className="container"><div className="section-head"><div><div className="kicker">HEADQUARTERS</div><h2>Find us at <span>Ghorawadi.</span></h2></div><p>Visit our facility in Pune for consultations, inspections and system demonstrations.</p></div><div className="location-wrapper"><iframe title="SD Services location" src={`https://www.google.com/maps?q=${encodeURIComponent(settings.mapQuery||'Railway station road, Ghorawadi, Talegaon Dabhade, Pune 410507')}&output=embed`} loading="lazy" referrerPolicy="no-referrer" className="location-map"></iframe></div></div></section>
    <Appointment settings={settings}/>
    <CTA/>
  </>;
}

function Appointment({settings}){
  const [form,setForm]=useState({name:'',company:'',phone:'',email:'',service:'Fire Safety Audit',message:''}); const [status,setStatus]=useState('');
  const handleSubmit=async(e)=>{e.preventDefault();setStatus('Sending…');try{await submitLead(form);setStatus('Request received — our team will contact you shortly.');setForm({name:'',company:'',phone:'',email:'',service:'Fire Safety Audit',message:''})}catch(err){setStatus(err?.response?.data?.message||'Could not submit. Please call us directly.')}};
  return <section id="appointment" className="section appointment"><div className="container appointment-grid"><div className="appointment-copy"><div className="kicker">SITE INSPECTION</div><h2>Let's make your site <span>safer.</span></h2><p>Tell us what you need and our team can plan the right fire protection scope for your facility.</p><div className="contact-pills"><a href="tel:+919270777733"><Phone size={16}/> Call now</a><a href="https://wa.me/919270777733" target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp</a></div></div><form className="lead-form" onSubmit={handleSubmit}><div className="form-row"><label>Name<input required placeholder="Enter your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Company<input placeholder="Enter company name" value={form.company} onChange={e=>setForm({...form,company:e.target.value})}/></label></div><div className="form-row"><label>Phone<input required type="tel" placeholder="Enter mobile number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label><label>Email<input type="email" placeholder="Enter email address" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label></div><label>Service<select value={form.service} onChange={e=>setForm({...form,service:e.target.value})}>{staticServices.map(s=><option key={s.slug}>{s.title}</option>)}</select></label><label>Project notes<textarea rows="4" placeholder="Tell us about your project or requirements" value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label><button className="btn primary full" type="submit">Request inspection <ArrowRight size={17}/></button>{status&&<div className="form-status">{status}</div>}</form></div></section>
}

function CTA(){ return <section className="cta"><div className="container cta-inner"><div><div className="kicker">NEED A FAST RESPONSE?</div><h2>Let's protect your next project.</h2></div><a className="btn dark" href="#appointment">Talk to SD Fire Services <ArrowRight size={17}/></a></div></section> }

function ServicesPage(){const [services,setServices]=useState(staticServices);useEffect(()=>{getServices().then(setServices).catch(()=>{})},[]);return <PageHero kicker="OUR SERVICES" title={<>Fire protection from <span>assessment to AMC.</span></>}><div className="section"><div className="container service-grid large">{services.map((s,i)=>{const Icon=iconMap[s.icon]||Flame;const detail=serviceDetails[s.slug];const photo=detail?.photos?.[0];return <Link to={servicePath(s)} className="service-card big" key={s._id||s.slug}><motion.div whileHover={{y:-5}}>{photo&&<img className="service-card-image" src={photo.src} alt={photo.title}/>}<div className="icon-wrap"><Icon size={25}/></div><div className="num">0{i+1}</div><h3>{s.title}</h3><p>{s.shortDescription}</p><span className="text-link">View capability <ArrowRight size={15}/></span></motion.div></Link>})}</div></div></PageHero>}
function ServiceDetail({slug}){const detail=serviceDetails[slug];if(!detail)return <PageHero kicker="SERVICE" title={<>Service details <span>coming soon.</span></>}/>;return <><PageHero kicker={detail.label} title={<>{detail.title}</>}/><section className="section service-detail-page"><div className="container"><div className="service-detail-intro"><div><div className="kicker">OVERVIEW</div><h2>Designed around your <span>risk.</span></h2></div><p>{detail.overview}</p></div><div className="service-photo-grid">{detail.photos.map(photo=><figure key={photo.src}><img src={photo.src} alt={photo.title}/><figcaption>{photo.title}</figcaption></figure>)}</div><div className="service-info-grid"><div className="info-panel"><div className="kicker">{slug==='fire-safety-audit'?'AUDIT COVERAGE':'OUR SERVICES'}</div><h3>{slug==='fire-safety-audit'?'What we inspect':'What we deliver'}</h3><ul>{detail.services.map(item=><li key={item}><CheckCircle2 size={17}/><span>{item}</span></li>)}</ul></div><div className="info-panel dark-panel"><div className="kicker">{detail.secondaryLabel||'MAIN COMPONENTS'}</div><h3>{detail.secondaryTitle||'Built for dependable response'}</h3><ul>{detail.components.map(item=><li key={item}><CheckCircle2 size={17}/><span>{item}</span></li>)}</ul></div></div>{detail.coverage&&<div className="info-panel coverage-panel"><div className="kicker">AMC CAN COVER</div><h3>Protection kept inspection-ready</h3><ul>{detail.coverage.map(item=><li key={item}><CheckCircle2 size={17}/><span>{item}</span></li>)}</ul></div>}<div className="suitable-panel"><div><div className="kicker">SUITABLE FOR</div><h3>Protection for demanding sites.</h3></div><p>{detail.suitableFor}</p><Link className="btn primary" to="/#appointment">Request site inspection <ArrowRight size={17}/></Link></div></div></section></>}
function About(){return <><PageHero kicker="ABOUT SD FIRE SERVICES" title={<>Engineering trust into <span>every layer.</span></>}/><section className="section"><div className="container split-grid about-grid"><div><div className="kicker">OUR MISSION</div><h2>Protection that works <span>before the alarm.</span></h2><p>SD Fire Services is positioned as a full-service fire protection partner for industrial, commercial, healthcare, hospitality and institutional premises around Chakan and Pune.</p><p>We combine field inspection, system design, installation, testing, documentation and ongoing maintenance into one practical delivery model.</p><div className="metric-row"><div><b>01</b><span>Survey & risk map</span></div><div><b>02</b><span>Design & install</span></div><div><b>03</b><span>Test & handover</span></div><div><b>04</b><span>Maintain & improve</span></div></div></div><img className="about-image" src="/gallery/team-hero.png" alt="SD Fire Services fire safety team"/></div></section><section className="section section-dark"><div className="container"><div className="section-head"><div><div className="kicker">HOW WE WORK</div><h2>Clarity at every <span>stage.</span></h2></div></div><div className="process-grid">{[['01','Survey','Understand occupancy, hazards, site constraints and existing systems.'],['02','Design','Translate risk into a clear, maintainable fire protection scope.'],['03','Install','Execute with disciplined workmanship, testing and documentation.'],['04','Maintain','Keep equipment inspection-ready through AMC and preventive care.']].map(x=><div className="process-card" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></div>)}</div></div></section></>}
function Gallery({items,featured=false}){
  const [selected,setSelected]=useState(null);
  useEffect(()=>{
    if(!selected)return undefined;
    const closeOnEscape=(event)=>{if(event.key==='Escape')setSelected(null)};
    document.addEventListener('keydown',closeOnEscape);
    return ()=>document.removeEventListener('keydown',closeOnEscape);
  },[selected]);
  return <>
    <div className={featured?'masonry':'masonry all'}>{items.map((item,index)=><button className={`gallery-tile ${featured?`t${index}`:''}`} type="button" key={item.src} onClick={()=>setSelected(item)} aria-label={`View ${item.title}`}><img src={item.src} alt={item.title}/><span><span>{item.title}</span></span></button>)}</div>
    {selected&&<div className="lightbox" role="dialog" aria-modal="true" aria-label={selected.title} onClick={()=>setSelected(null)}><div className="lightbox-content" onClick={event=>event.stopPropagation()}><button className="lightbox-close" type="button" onClick={()=>setSelected(null)} aria-label="Close photo"><X size={24}/></button><img src={selected.src} alt={selected.title}/><p>{selected.title}</p></div></div>}
  </>;
}
function Projects(){return <><PageHero kicker="PROJECT GALLERY" title={<>Proof from the <span>field.</span></>}/><section className="section section-soft"><div className="container"><Gallery items={gallery}/></div></section></>}
function Contact(){const [settings,setSettings]=useState({});useEffect(()=>{getSettings().then(setSettings).catch(()=>{})},[]);const mapQ=encodeURIComponent(settings.mapQuery||'Yas Park, Plot no 62, Chakan, Kadachiwadi, Chakan, Maharashtra 410501');return <><PageHero kicker="CONTACT" title={<>Bring us into your <span>safety plan.</span></>}/><section className="section"><div className="container contact-grid"><div className="contact-card"><div><div className="kicker">SD SERVICES</div><h2>Let's connect.</h2><p style={{marginBottom:'24px',color:'#606d76',fontSize:'14px'}}>Professional fire protection consultancy and installation services.</p></div><div className="contact-line"><MapPin/><span>{settings.address||'Yas Park, Plot no 62, Chakan, Kadachiwadi, Chakan, Maharashtra 410501'}</span></div><div className="contact-line"><Mail/><a href={`mailto:${settings.email||'sdfireserivices111@gmail.com'}`}>{settings.email||'sdfireserivices111@gmail.com'}</a></div>{(settings.phones||['+91 7972451110','+91 9623871857','+91 9021561190']).map(p=><div className="contact-line" key={p}><Phone/><a href={`tel:${p.replace(/\s/g,'')}`}>{p}</a></div>)}<div style={{marginTop:'32px',paddingTop:'24px',borderTop:'1px solid var(--line)'}}><div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'16px'}}><div><small style={{color:'#93a0a8'}}>Response time</small><p style={{margin:'6px 0 0',fontWeight:'600',fontSize:'13px'}}>24 hours</p></div><div><small style={{color:'#93a0a8'}}>Service area</small><p style={{margin:'6px 0 0',fontWeight:'600',fontSize:'13px'}}>Chakan, Pune</p></div></div></div><a className="btn primary" href={`https://www.google.com/maps/dir/?api=1&destination=${mapQ}`} target="_blank" rel="noreferrer" style={{marginTop:'24px',width:'100%',textAlign:'center'}}>Get directions <ArrowRight size={16}/></a></div><div className="map-wrap"><iframe title="SD Services map" src={`https://www.google.com/maps?q=${mapQ}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div></div></section><Appointment settings={settings}/></>}
function PageHero({kicker,title,children}){return <><section className="page-hero"><div className="container"><div className="eyebrow"><span/> {kicker} <span/></div><h1>{title}</h1></div></section>{children}</>}

export default function App(){return <Layout><Routes><Route path="/" element={<Home/>}/><Route path="/services" element={<ServicesPage/>}/><Route path="/services/:slug" element={<ServiceDetailRoute/>}/><Route path="/about" element={<About/>}/><Route path="/projects" element={<Projects/>}/><Route path="/contact" element={<Contact/>}/></Routes></Layout>}

function ServiceDetailRoute(){const location=useLocation();return <ServiceDetail slug={location.pathname.split('/').pop()}/>}
