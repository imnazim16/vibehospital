/* ==========================================================
   VibeMed Hospital – shared layout + demo data + page logic
   Works directly from file:// (no server required)
   ========================================================== */

const IMG = (id, w = 800) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const FALLBACK_IMG = 'https://placehold.co/800x500/0a5fb4/ffffff?text=VibeMed+Hospital';
const PHONE_EMERGENCY = '+91 98765 43210';
const PHONE_APPOINTMENT = '+91 98765 43211';

/* ---------------- DEMO DATA ---------------- */
const SPECIALITIES = [
  { key: 'cardiology', name: 'Cardiology', icon: 'ri-heart-pulse-line', img: IMG('photo-1505751172876-fa1923c5c528'),
    short: 'Expert cardiac care with advanced diagnosis and treatment.',
    about: 'Our Heart Institute offers complete cardiac care – from preventive screening to complex interventions – supported by a 24/7 cath lab, cardiac ICU and an experienced team of cardiologists and cardiac surgeons.',
    services: ['Preventive Cardiology', 'Interventional Cardiology', 'Cardiac Surgery', 'Heart Failure Management', 'Electrophysiology', 'Paediatric Cardiology'] },
  { key: 'neurology', name: 'Neurology', icon: 'ri-brain-line', img: IMG('photo-1559757175-0eb30cd8c063'),
    short: 'Comprehensive care for brain, spine and nerve disorders.',
    about: 'The Neurosciences team treats stroke, epilepsy, movement disorders and spine conditions using advanced neuro-imaging, neuro-navigation and a dedicated stroke unit.',
    services: ['Stroke Management', 'Epilepsy Care', 'Neurosurgery', 'Spine Surgery', 'Movement Disorders', 'Neuro Rehabilitation'] },
  { key: 'orthopaedics', name: 'Orthopaedics', icon: 'ri-walk-line', img: IMG('photo-1530026405186-ed1f139313f8'),
    short: 'Joint replacement, sports injuries and trauma care.',
    about: 'Our Orthopaedics department combines robotic-assisted joint replacement, arthroscopy and physiotherapy to get you back on your feet faster.',
    services: ['Knee & Hip Replacement', 'Arthroscopy', 'Sports Medicine', 'Trauma Surgery', 'Spine Care', 'Physiotherapy'] },
  { key: 'gastroenterology', name: 'Gastroenterology', icon: 'ri-capsule-line', img: IMG('photo-1579684385127-1ef15d508118'),
    short: 'Advanced digestive and liver care.',
    about: 'From endoscopy to liver disease management, our gastroenterologists diagnose and treat the full range of digestive disorders.',
    services: ['Endoscopy & Colonoscopy', 'Liver Disease Management', 'IBS & Acid Reflux', 'Pancreatic Disorders', 'ERCP', 'Nutrition Counselling'] },
  { key: 'nephrology', name: 'Nephrology', icon: 'ri-drop-line', img: IMG('photo-1576091160550-2173dba999ef'),
    short: 'Kidney care, dialysis and transplant services.',
    about: 'Our Renal Sciences team provides complete kidney care including a 30-bed dialysis unit and a successful kidney transplant programme.',
    services: ['Chronic Kidney Disease', 'Haemodialysis', 'Peritoneal Dialysis', 'Kidney Transplant', 'Hypertension Clinic', 'Renal Nutrition'] },
  { key: 'urology', name: 'Urology', icon: 'ri-flask-line', img: IMG('photo-1581056771107-24ca5f033842'),
    short: 'Minimally invasive urological treatments.',
    about: 'Laser and laparoscopic techniques for kidney stones, prostate and bladder conditions with faster recovery.',
    services: ['Kidney Stone Treatment', 'Prostate Care', 'Laser Urology', 'Uro-Oncology', 'Female Urology', 'Andrology'] },
  { key: 'oncology', name: 'Oncology', icon: 'ri-dna-line', img: IMG('photo-1579154204601-01588f351e67'),
    short: 'Comprehensive cancer diagnosis and treatment.',
    about: 'A multidisciplinary tumour board, modern radiation therapy and day-care chemotherapy deliver personalised cancer care under one roof.',
    services: ['Medical Oncology', 'Surgical Oncology', 'Radiation Oncology', 'Chemotherapy', 'Immunotherapy', 'Palliative Care'] },
  { key: 'gynaecology', name: 'Gynaecology', icon: 'ri-women-line', img: IMG('photo-1584515933487-779824d29309'),
    short: 'Women’s health, maternity and fertility care.',
    about: 'Complete care for women at every stage of life – adolescent health, high-risk pregnancy, fertility and laparoscopic gynae surgery.',
    services: ['High-Risk Pregnancy', 'Normal & C-Section Delivery', 'Infertility (IVF)', 'Laparoscopic Surgery', 'Menopause Clinic', 'PCOS Care'] },
  { key: 'pulmonology', name: 'Pulmonology', icon: 'ri-lungs-line', img: IMG('photo-1631815588090-d4bfec5b1ccb'),
    short: 'Lung, critical care and sleep medicine.',
    about: 'Diagnosis and treatment of asthma, COPD, lung infections and sleep disorders with advanced bronchoscopy and a sleep lab.',
    services: ['Asthma & COPD', 'Bronchoscopy', 'Sleep Studies', 'Interstitial Lung Disease', 'Tuberculosis Care', 'Pulmonary Rehab'] },
  { key: 'general-surgery', name: 'General Surgery', icon: 'ri-surgical-mask-line', img: IMG('photo-1551190822-a9333d879b1f'),
    short: 'Laparoscopic and advanced general surgery.',
    about: 'Our surgeons perform minimally invasive and robotic surgeries for hernia, gallbladder, appendix and bariatric procedures.',
    services: ['Laparoscopic Surgery', 'Hernia Repair', 'Gallbladder Surgery', 'Bariatric Surgery', 'Robotic Surgery', 'Day-Care Procedures'] }
];

const DOCTORS = [
  { id: 'rahul-sharma', name: 'Dr. Rahul Sharma', spec: 'cardiology', title: 'Senior Consultant', exp: 15, qual: 'MD, DM Cardiology', focus: 'Interventional Cardiology', img: IMG('photo-1612349317150-e413f6a5b16d', 600),
    expertise: ['Angioplasty', 'Heart Failure', 'Preventive Cardiology', 'Cardiac Care'] },
  { id: 'priya-mehta', name: 'Dr. Priya Mehta', spec: 'neurology', title: 'Senior Consultant', exp: 12, qual: 'MD, DM Neurology', focus: 'Stroke & Epilepsy', img: IMG('photo-1559839734-2b71ea197ec2', 600),
    expertise: ['Stroke Management', 'Epilepsy', 'Headache & Migraine', 'Neuro-muscular Disorders'] },
  { id: 'amit-verma', name: 'Dr. Amit Verma', spec: 'orthopaedics', title: 'Director', exp: 20, qual: 'MS Ortho, Fellowship Joint Replacement', focus: 'Robotic Joint Replacement', img: IMG('photo-1622253692010-333f2da6031d', 600),
    expertise: ['Knee Replacement', 'Hip Replacement', 'Sports Injuries', 'Arthroscopy'] },
  { id: 'vikram-singh', name: 'Dr. Vikram Singh', spec: 'gastroenterology', title: 'Consultant', exp: 10, qual: 'MD, DM Gastroenterology', focus: 'Therapeutic Endoscopy', img: IMG('photo-1537368910025-700350fe46c7', 600),
    expertise: ['Endoscopy', 'ERCP', 'Liver Diseases', 'IBD'] },
  { id: 'arjun-nair', name: 'Dr. Arjun Nair', spec: 'nephrology', title: 'Senior Consultant', exp: 14, qual: 'MD, DM Nephrology', focus: 'Kidney Transplant', img: IMG('photo-1582750433449-648ed127bb54', 600),
    expertise: ['Dialysis', 'Kidney Transplant', 'CKD', 'Hypertension'] },
  { id: 'rohan-gupta', name: 'Dr. Rohan Gupta', spec: 'urology', title: 'Consultant', exp: 9, qual: 'MS, MCh Urology', focus: 'Laser Urology', img: IMG('photo-1607990281513-2c110a25bd8c', 600),
    expertise: ['Kidney Stones', 'Prostate (HoLEP)', 'Uro-Oncology', 'Laparoscopic Urology'] },
  { id: 'anjali-rao', name: 'Dr. Anjali Rao', spec: 'oncology', title: 'Senior Consultant', exp: 16, qual: 'MD, DM Medical Oncology', focus: 'Breast & Lung Cancer', img: IMG('photo-1651008376811-b90baee60c1f', 600),
    expertise: ['Chemotherapy', 'Immunotherapy', 'Targeted Therapy', 'Breast Cancer'] },
  { id: 'sneha-kapoor', name: 'Dr. Sneha Kapoor', spec: 'gynaecology', title: 'Senior Consultant', exp: 13, qual: 'MS OBG, FRCOG', focus: 'High-Risk Pregnancy', img: IMG('photo-1594824476967-48c8b964273f', 600),
    expertise: ['High-Risk Pregnancy', 'Laparoscopy', 'Infertility', 'PCOS'] },
  { id: 'kavita-joshi', name: 'Dr. Kavita Joshi', spec: 'pulmonology', title: 'Consultant', exp: 11, qual: 'MD Pulmonary Medicine', focus: 'Interventional Pulmonology', img: IMG('photo-1527613426441-4da17471b66d', 600),
    expertise: ['Asthma', 'COPD', 'Bronchoscopy', 'Sleep Medicine'] },
  { id: 'neha-bansal', name: 'Dr. Neha Bansal', spec: 'general-surgery', title: 'Consultant', exp: 8, qual: 'MS General Surgery, FMAS', focus: 'Laparoscopic Surgery', img: IMG('photo-1638202993928-7267aad84c31', 600),
    expertise: ['Hernia Repair', 'Gallbladder Surgery', 'Appendectomy', 'Bariatric Surgery'] }
];

const ARTICLES = [
  { id: 'heart-health', title: 'Understanding Heart Health', author: 'rahul-sharma', date: 'October 7, 2026', cat: 'Cardiology', img: IMG('photo-1505751172876-fa1923c5c528', 1200),
    excerpt: 'Simple daily habits that keep your heart strong and help prevent cardiovascular disease.' },
  { id: 'better-digestion', title: '5 Tips for Better Digestion', author: 'vikram-singh', date: 'September 28, 2026', cat: 'Gastroenterology', img: IMG('photo-1490645935967-10de6ba17061', 1200),
    excerpt: 'Fibre, hydration and mindful eating – small changes that make a big difference to gut health.' },
  { id: 'see-orthopaedic', title: 'When Should You See an Orthopaedic?', author: 'amit-verma', date: 'September 15, 2026', cat: 'Orthopaedics', img: IMG('photo-1571019613454-1cb2f99b2d8b', 1200),
    excerpt: 'Persistent joint pain, stiffness or swelling? Here is when it is time to consult a specialist.' },
  { id: 'kidney-health', title: 'Understanding Kidney Health', author: 'arjun-nair', date: 'August 30, 2026', cat: 'Nephrology', img: IMG('photo-1576091160550-2173dba999ef', 1200),
    excerpt: 'Your kidneys filter 180 litres of blood daily. Learn how to protect them.' },
  { id: 'preventive-checkups', title: 'Benefits of Preventive Health Checkups', author: 'priya-mehta', date: 'August 12, 2026', cat: 'Wellness', img: IMG('photo-1576091160399-112ba8d25d1d', 1200),
    excerpt: 'Early detection saves lives. Why an annual health checkup should be on your calendar.' }
];

const specByKey = k => SPECIALITIES.find(s => s.key === k);
const docById = id => DOCTORS.find(d => d.id === id);
const qs = name => new URLSearchParams(location.search).get(name);

/* ---------------- HEADER ---------------- */
function renderHeader() {
  const el = document.getElementById('site-header');
  if (!el) return;
  const specLinks = SPECIALITIES.map(s => `<li><a class="dropdown-item" href="${s.key}.html"><i class="${s.icon} me-2 text-accent"></i>${s.name}</a></li>`).join('');
  el.innerHTML = `
  <div class="topbar py-2">
    <div class="container d-flex flex-wrap justify-content-between align-items-center gap-2">
      <div class="d-flex flex-wrap align-items-center gap-3 gap-md-4">
        <span class="d-none d-sm-inline"><i class="ri-map-pin-line me-1 text-accent"></i>123 Medical Avenue, New Delhi</span>
        <a href="mailto:info@hospitaldemo.com" class="d-none d-md-inline"><i class="ri-mail-line me-1 text-accent"></i>info@hospitaldemo.com</a>
        <a href="tel:${PHONE_EMERGENCY.replace(/\s/g,'')}" class="topbar-emergency d-inline-flex align-items-center gap-1 text-white fw-bold">
          <i class="ri-phone-fill text-danger me-1"></i><span class="badge bg-danger me-1">24/7 Emergency</span>${PHONE_EMERGENCY}
        </a>
      </div>
      <div class="d-none d-lg-flex align-items-center gap-3">
        <a href="international-patients.html"><i class="ri-global-line me-1"></i>International Patients</a>
        <a href="careers.html"><i class="ri-briefcase-line me-1"></i>Careers</a>
        <a href="contact.html#second-opinion"><i class="ri-stethoscope-line me-1"></i>Second Opinion</a>
      </div>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg site-navbar sticky-top py-2">
    <div class="container">
      <a class="navbar-brand vm-logo" href="index.html"><i class="ri-heart-pulse-fill"></i>Vibe<span>Med</span></a>
      <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
        <i class="ri-menu-3-line fs-2"></i>
      </button>
      <div class="collapse navbar-collapse" id="mainNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item"><a class="nav-link" data-nav="home" href="index.html">Home</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-nav="about" href="about.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">About</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="about.html">About Hospital</a></li>
              <li><a class="dropdown-item" href="vision-mission.html">Vision &amp; Mission</a></li>
              <li><a class="dropdown-item" href="infrastructure.html">Infrastructure / Facilities</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-nav="specialities" href="specialities.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Specialities</a>
            <ul class="dropdown-menu mega-menu">
              <div class="row g-0"><div class="col-lg-6">${specLinks.split('</li>').slice(0,5).join('</li>')}</div><div class="col-lg-6">${specLinks.split('</li>').slice(5).join('</li>')}</div></div>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item fw-semibold text-primary" href="specialities.html">View All Specialities <i class="ri-arrow-right-line"></i></a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" data-nav="doctors" href="doctors.html">Doctors</a></li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-nav="services" href="services.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Services</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="services.html#emergency">Emergency</a></li>
              <li><a class="dropdown-item" href="services.html#icu">ICU</a></li>
              <li><a class="dropdown-item" href="services.html#diagnostics">Diagnostic Services</a></li>
              <li><a class="dropdown-item" href="services.html#pharmacy">Pharmacy</a></li>
              <li><a class="dropdown-item" href="health-packages.html">Health Checkups</a></li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-nav="patients" href="book-appointment.html" role="button" data-bs-toggle="dropdown" aria-expanded="false">Patients</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="book-appointment.html">Book Appointment</a></li>
              <li><a class="dropdown-item" href="contact.html#second-opinion">Second Opinion</a></li>
              <li><a class="dropdown-item" href="health-packages.html">Health Packages</a></li>
              <li><a class="dropdown-item" href="patient-information.html#insurance">Insurance / TPA</a></li>
              <li><a class="dropdown-item" href="international-patients.html">International Patients</a></li>
              <li><a class="dropdown-item" href="patient-information.html">Patient Information</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link" data-nav="packages" href="health-packages.html">Health Packages</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="blog" href="blog.html">Blog</a></li>
          <li class="nav-item"><a class="nav-link" data-nav="contact" href="contact.html">Contact</a></li>
        </ul>
        <div class="d-flex align-items-center mt-3 mt-lg-0">
          <a href="book-appointment.html" class="btn btn-primary btn-sm w-100 w-lg-auto"><i class="ri-calendar-check-line me-1"></i>Book Appointment</a>
        </div>
      </div>
    </div>
  </nav>`;

  const current = document.body.dataset.nav;
  if (current) el.querySelectorAll(`[data-nav="${current}"]`).forEach(a => a.classList.add('active'));

  // Global sticky/fixed header on scroll with glassmorphism blur
  const handleScroll = () => {
    const navbar = document.querySelector('.site-navbar');
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ---------------- FOOTER ---------------- */
function renderFooter() {
  const el = document.getElementById('site-footer');
  if (!el) return;
  el.innerHTML = `
  <footer class="site-footer">
    <div class="container">
      <div class="row g-4">
        <div class="col-lg-4 col-md-6">
          <a class="navbar-brand vm-logo mb-3 d-inline-flex" href="index.html"><i class="ri-heart-pulse-fill"></i>Vibe<span>Med</span></a>
          <p>A 300-bed multispecialty hospital delivering compassionate care and advanced medical excellence since 2001.</p>
          <div class="social mt-3">
            <a href="#" aria-label="Facebook"><i class="ri-facebook-fill"></i></a>
            <a href="#" aria-label="Instagram"><i class="ri-instagram-line"></i></a>
            <a href="#" aria-label="LinkedIn"><i class="ri-linkedin-fill"></i></a>
            <a href="#" aria-label="YouTube"><i class="ri-youtube-fill"></i></a>
          </div>
        </div>
        <div class="col-lg-2 col-md-6 col-6">
          <h5>Quick Links</h5>
          <ul class="list-unstyled">
            <li><a href="about.html">About Us</a></li>
            <li><a href="doctors.html">Find a Doctor</a></li>
            <li><a href="health-packages.html">Health Packages</a></li>
            <li><a href="blog.html">Health Articles</a></li>
            <li><a href="careers.html">Careers</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-6 col-6">
          <h5>Specialities</h5>
          <ul class="list-unstyled">
            ${SPECIALITIES.slice(0, 6).map(s => `<li><a href="${s.key}.html">${s.name}</a></li>`).join('')}
          </ul>
        </div>
        <div class="col-lg-3 col-md-6">
          <h5>Contact</h5>
          <ul class="list-unstyled">
            <li><i class="ri-map-pin-line me-2"></i>123 Medical Avenue, New Delhi, India</li>
            <li><i class="ri-phone-line me-2"></i>Emergency: <a href="tel:${PHONE_EMERGENCY.replace(/\s/g,'')}">${PHONE_EMERGENCY}</a></li>
            <li><i class="ri-calendar-line me-2"></i>Appointment: <a href="tel:${PHONE_APPOINTMENT.replace(/\s/g,'')}">${PHONE_APPOINTMENT}</a></li>
            <li><i class="ri-mail-line me-2"></i><a href="mailto:info@hospitaldemo.com">info@hospitaldemo.com</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container d-flex flex-column flex-md-row justify-content-between gap-2">
        <span>© 2026 VibeMed Hospital. All rights reserved. (Demo website)</span>
        <span><a href="#">Privacy Policy</a> · <a href="#">Terms of Use</a></span>
      </div>
    </div>
  </footer>
  <a href="tel:${PHONE_EMERGENCY.replace(/\s/g,'')}" class="float-call d-lg-none" aria-label="Call emergency"><i class="ri-phone-fill"></i></a>`;
}

/* ---------------- REUSABLE CARD TEMPLATES ---------------- */
const specialityCard = s => `
  <div class="col-sm-6 col-lg-4">
    <a href="${s.key}.html" class="vm-card">
      <div class="icon"><i class="${s.icon}"></i></div>
      <h5>${s.name}</h5>
      <p>${s.short}</p>
      <span class="more">Learn more <i class="ri-arrow-right-line"></i></span>
    </a>
  </div>`;

const doctorCard = d => `
  <div class="col-sm-6 col-lg-4 col-xl-3">
    <div class="card doctor-card">
      <img src="${d.img}" class="card-img-top" alt="${d.name}" loading="lazy">
      <div class="card-body">
        <span class="badge rounded-pill mb-2">${specByKey(d.spec).name}</span>
        <h5 class="card-title mb-1">${d.name}</h5>
        <p class="text-muted small mb-1">${d.title}</p>
        <p class="small mb-3"><i class="ri-award-line text-accent me-1"></i>${d.exp}+ Years Experience</p>
        <div class="d-flex gap-2 flex-wrap">
          <a href="doctor-profile.html?id=${d.id}" class="btn btn-outline-primary btn-sm">View Profile</a>
          <a href="book-appointment.html?doctor=${d.id}" class="btn btn-primary btn-sm">Book</a>
        </div>
      </div>
    </div>
  </div>`;

const articleCard = a => `
  <div class="col-md-6 col-lg-4">
    <div class="card blog-card">
      <img src="${a.img}" class="card-img-top" alt="${a.title}" loading="lazy">
      <div class="card-body">
        <div class="meta mb-2"><span class="badge bg-primary-subtle text-primary me-2">${a.cat}</span>${a.date}</div>
        <h5 class="card-title">${a.title}</h5>
        <p class="card-text text-muted small">${a.excerpt}</p>
        <a href="article.html?id=${a.id}" class="fw-medium">Read More <i class="ri-arrow-right-line"></i></a>
      </div>
    </div>
  </div>`;

const doctorSlideCard = d => `
  <div class="swiper-slide h-auto">
    <div class="card doctor-card h-100">
      <img src="${d.img}" class="card-img-top" alt="${d.name}" loading="lazy">
      <div class="card-body d-flex flex-column">
        <span class="badge rounded-pill mb-2 align-self-start">${specByKey(d.spec).name}</span>
        <h5 class="card-title mb-1">${d.name}</h5>
        <p class="text-muted small mb-1">${d.title}</p>
        <p class="small mb-3"><i class="ri-award-line text-accent me-1"></i>${d.exp}+ Years Experience</p>
        <div class="mt-auto d-flex gap-2 flex-wrap">
          <a href="doctor-profile.html?id=${d.id}" class="btn btn-outline-primary btn-sm flex-grow-1 text-center">View Profile</a>
          <a href="book-appointment.html?doctor=${d.id}" class="btn btn-primary btn-sm flex-grow-1 text-center">Book</a>
        </div>
      </div>
    </div>
  </div>`;

const articleSlideCard = a => {
  const d = docById(a.author);
  return `
  <div class="swiper-slide h-auto">
    <div class="card blog-card h-100">
      <img src="${a.img}" class="card-img-top" alt="${a.title}" loading="lazy">
      <div class="card-body d-flex flex-column">
        <div class="meta mb-2 d-flex justify-content-between align-items-center">
          <span class="badge bg-primary-subtle text-primary">${a.cat}</span>
          <span class="small text-muted"><i class="ri-calendar-line me-1"></i>${a.date}</span>
        </div>
        <h5 class="card-title">${a.title}</h5>
        <p class="card-text text-muted small flex-grow-1">${a.excerpt}</p>
        <div class="pt-3 border-top d-flex align-items-center justify-content-between mt-auto">
          <small class="text-muted"><i class="ri-user-3-line me-1"></i>${d ? d.name : 'VibeMed Specialist'}</small>
          <a href="article.html?id=${a.id}" class="fw-semibold text-primary small">Read More <i class="ri-arrow-right-line"></i></a>
        </div>
      </div>
    </div>
  </div>`;
};

const fillSelect = (sel, items, placeholder) => {
  if (!sel) return;
  sel.innerHTML = `<option value="">${placeholder}</option>` + items.map(i => `<option value="${i.value}">${i.label}</option>`).join('');
};
const setHTML = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

/* ---------------- PAGE RENDERERS ---------------- */
function renderHome() {
  setHTML('home-specialities', SPECIALITIES.slice(0, 6).map(specialityCard).join(''));
  setHTML('featured-doctors-slider', DOCTORS.map(doctorSlideCard).join(''));
  setHTML('latest-articles-slider', ARTICLES.map(articleSlideCard).join(''));

  const specSel = document.getElementById('home-spec');
  const docSel = document.getElementById('home-doc');
  if (specSel) {
    fillSelect(specSel, SPECIALITIES.map(s => ({ value: s.key, label: s.name })), 'Select Speciality');
    const updateDocs = () => fillSelect(docSel, DOCTORS.filter(d => !specSel.value || d.spec === specSel.value).map(d => ({ value: d.id, label: d.name })), 'Select Doctor');
    specSel.addEventListener('change', updateDocs); updateDocs();
    document.getElementById('home-find-form').addEventListener('submit', e => {
      e.preventDefault();
      if (docSel.value) location.href = `doctor-profile.html?id=${docSel.value}`;
      else location.href = `doctors.html${specSel.value ? '?speciality=' + specSel.value : ''}`;
    });
  }

  // Initialize Swiper sliders if Swiper library is loaded
  if (typeof Swiper !== 'undefined') {
    // 1. Hero Swiper (3 images / slides)
    if (document.querySelector('.hero-swiper')) {
      new Swiper('.hero-swiper', {
        loop: true,
        speed: 900,
        autoplay: { delay: 5000, disableOnInteraction: false },
        effect: 'fade',
        fadeEffect: { crossFade: true },
        pagination: { el: '.hero-pagination', clickable: true },
        navigation: { nextEl: '.hero-next', prevEl: '.hero-prev' },
      });
    }

    // 2. Featured Doctors Swiper
    if (document.querySelector('.doctors-swiper')) {
      new Swiper('.doctors-swiper', {
        slidesPerView: 1.15,
        spaceBetween: 20,
        autoplay: { delay: 3500, disableOnInteraction: false },
        loop: true,
        pagination: { el: '.doctors-pagination', clickable: true },
        navigation: { nextEl: '.doctors-next', prevEl: '.doctors-prev' },
        breakpoints: {
          576: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 24 },
          1200: { slidesPerView: 4, spaceBetween: 24 }
        }
      });
    }

    // 3. Testimonials Swiper
    if (document.querySelector('.testimonials-swiper')) {
      new Swiper('.testimonials-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        autoplay: { delay: 4500, disableOnInteraction: false },
        loop: true,
        pagination: { el: '.testimonials-pagination', clickable: true },
        navigation: { nextEl: '.testimonials-next', prevEl: '.testimonials-prev' },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 24 },
          1200: { slidesPerView: 3, spaceBetween: 24 }
        }
      });
    }

    // 4. Latest Articles Swiper
    if (document.querySelector('.articles-swiper')) {
      new Swiper('.articles-swiper', {
        slidesPerView: 1.15,
        spaceBetween: 20,
        autoplay: { delay: 4000, disableOnInteraction: false },
        loop: true,
        pagination: { el: '.articles-pagination', clickable: true },
        navigation: { nextEl: '.articles-next', prevEl: '.articles-prev' },
        breakpoints: {
          768: { slidesPerView: 2, spaceBetween: 24 },
          1200: { slidesPerView: 3, spaceBetween: 24 }
        }
      });
    }
  }

  // Header sticky scroll effect
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.site-navbar');
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    }
  });
}

function renderSpecialitiesGrid() {
  setHTML('speciality-grid', SPECIALITIES.map(specialityCard).join(''));
}

function renderSpecialityPage() {
  const s = specByKey(document.body.dataset.speciality);
  const el = document.getElementById('speciality-page');
  if (!s || !el) return;
  document.title = `${s.name} – VibeMed Hospital`;
  const docs = DOCTORS.filter(d => d.spec === s.key);
  el.innerHTML = `
  <section class="page-banner">
    <div class="container">
      <nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="specialities.html">Specialities</a></li>
        <li class="breadcrumb-item active">${s.name}</li></ol></nav>
      <h1><i class="${s.icon} me-2"></i>${s.name}</h1>
      <p class="lead mb-0">${s.short}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="row g-5 align-items-center">
        <div class="col-lg-6"><img src="${s.img}" class="img-fluid img-rounded-lg w-100" alt="${s.name}"></div>
        <div class="col-lg-6">
          <span class="text-accent fw-semibold text-uppercase small">Centre of Excellence</span>
          <h2 class="mt-2 mb-3">${s.name} at VibeMed</h2>
          <p>${s.about}</p>
          <h5 class="mt-4 mb-3">Services</h5>
          <div class="row"><div class="col-sm-6"><ul class="check-list">${s.services.slice(0,3).map(x => `<li>${x}</li>`).join('')}</ul></div>
          <div class="col-sm-6"><ul class="check-list">${s.services.slice(3).map(x => `<li>${x}</li>`).join('')}</ul></div></div>
          <div class="d-flex gap-2 flex-wrap mt-3">
            <a href="doctors.html?speciality=${s.key}" class="btn btn-outline-primary"><i class="ri-user-heart-line me-1"></i>View Doctors</a>
            <a href="book-appointment.html?speciality=${s.key}" class="btn btn-primary"><i class="ri-calendar-check-line me-1"></i>Book Appointment</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="section bg-soft">
    <div class="container">
      <div class="section-title"><span class="eyebrow">Our Experts</span><h2>${s.name} Specialists</h2></div>
      <div class="row g-4 justify-content-center">${docs.map(doctorCard).join('') || '<p class="text-center">Doctor list coming soon.</p>'}</div>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="section-title"><span class="eyebrow">Explore</span><h2>Other Specialities</h2></div>
      <div class="row g-4">${SPECIALITIES.filter(x => x.key !== s.key).slice(0, 3).map(specialityCard).join('')}</div>
    </div>
  </section>`;
}

function renderDoctorsPage() {
  const list = document.getElementById('doctor-list');
  if (!list) return;
  const q = document.getElementById('doc-search');
  const sp = document.getElementById('doc-spec');
  const ex = document.getElementById('doc-exp');
  fillSelect(sp, SPECIALITIES.map(s => ({ value: s.key, label: s.name })), 'All Specialities');
  if (qs('speciality')) sp.value = qs('speciality');
  const apply = () => {
    const term = q.value.trim().toLowerCase();
    const minExp = parseInt(ex.value || '0', 10);
    const res = DOCTORS.filter(d =>
      (!term || d.name.toLowerCase().includes(term) || specByKey(d.spec).name.toLowerCase().includes(term)) &&
      (!sp.value || d.spec === sp.value) && d.exp >= minExp);
    list.innerHTML = res.length ? res.map(doctorCard).join('') : '<div class="col-12 text-center py-5"><i class="ri-user-search-line display-4 text-muted"></i><p class="mt-2">No doctors match your search.</p></div>';
    document.getElementById('doc-count').textContent = `${res.length} doctor${res.length !== 1 ? 's' : ''} found`;
  };
  document.getElementById('doc-filter').addEventListener('submit', e => { e.preventDefault(); apply(); });
  [q, sp, ex].forEach(i => i.addEventListener('input', apply));
  apply();
}

function renderDoctorProfile() {
  const el = document.getElementById('doctor-profile');
  if (!el) return;
  const d = docById(qs('id')) || DOCTORS[0];
  const s = specByKey(d.spec);
  document.title = `${d.name} – VibeMed Hospital`;
  el.innerHTML = `
  <section class="page-banner">
    <div class="container">
      <nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="doctors.html">Doctors</a></li>
        <li class="breadcrumb-item active">${d.name}</li></ol></nav>
      <h1>${d.name}</h1>
      <p class="lead mb-0">${d.title} – ${s.name}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-4">
          <div class="card doctor-card">
            <img src="${d.img}" class="card-img-top" style="height:380px" alt="${d.name}">
            <div class="card-body">
              <ul class="list-unstyled mb-4">
                <li class="d-flex justify-content-between py-2 border-bottom"><span class="text-muted">Experience</span><strong>${d.exp}+ Years</strong></li>
                <li class="d-flex justify-content-between py-2 border-bottom"><span class="text-muted">Specialization</span><strong class="text-end">${d.focus}</strong></li>
                <li class="d-flex justify-content-between py-2"><span class="text-muted">Qualification</span><strong class="text-end">${d.qual}</strong></li>
              </ul>
              <a href="book-appointment.html?doctor=${d.id}" class="btn btn-primary w-100"><i class="ri-calendar-check-line me-1"></i>Book Appointment</a>
            </div>
          </div>
        </div>
        <div class="col-lg-8">
          <h3>About Doctor</h3>
          <p>${d.name} is an experienced ${s.name.toLowerCase()} specialist with over ${d.exp} years of clinical practice, specializing in ${d.focus.toLowerCase()}. Known for a patient-first approach, ${d.name.split(' ')[1]} has treated thousands of patients and is actively involved in teaching and clinical research.</p>
          <p>Prior to joining VibeMed, ${d.name} trained at leading institutions in India and abroad and has presented at several national and international conferences.</p>
          <hr class="my-4">
          <h4 class="mb-3">Areas of Expertise</h4>
          <div class="row"><div class="col-sm-6"><ul class="check-list">${d.expertise.slice(0,2).map(x => `<li>${x}</li>`).join('')}</ul></div>
          <div class="col-sm-6"><ul class="check-list">${d.expertise.slice(2).map(x => `<li>${x}</li>`).join('')}</ul></div></div>
          <hr class="my-4">
          <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
            <h4 class="mb-0"><i class="ri-calendar-check-line text-accent me-2"></i>OPD Timings &amp; Clinic Schedule</h4>
            <span class="badge bg-success-subtle text-success px-3 py-2 rounded-pill"><i class="ri-checkbox-circle-line me-1"></i>Available for Consultation</span>
          </div>
          <div class="table-responsive bg-white rounded-3 border p-2 mb-3">
            <table class="table table-sm table-borderless align-middle mb-0">
              <thead class="border-bottom text-muted small">
                <tr>
                  <th class="ps-3 py-2">Day</th>
                  <th class="py-2">Morning Session</th>
                  <th class="py-2">Evening Session</th>
                  <th class="py-2">Room / Clinic</th>
                </tr>
              </thead>
              <tbody class="small">
                <tr>
                  <td class="ps-3 fw-semibold">Monday – Wednesday</td>
                  <td><span class="badge bg-primary-subtle text-primary">09:30 AM – 01:30 PM</span></td>
                  <td><span class="badge bg-soft text-dark border">04:30 PM – 07:00 PM</span></td>
                  <td>OPD Block A, Room 204</td>
                </tr>
                <tr>
                  <td class="ps-3 fw-semibold">Thursday – Friday</td>
                  <td><span class="badge bg-primary-subtle text-primary">10:00 AM – 02:00 PM</span></td>
                  <td><span class="badge bg-soft text-dark border">05:00 PM – 07:30 PM</span></td>
                  <td>OPD Block A, Room 204</td>
                </tr>
                <tr>
                  <td class="ps-3 fw-semibold">Saturday</td>
                  <td><span class="badge bg-primary-subtle text-primary">10:00 AM – 01:30 PM</span></td>
                  <td><span class="text-muted">By Prior Appointment</span></td>
                  <td>OPD Block A, Room 204</td>
                </tr>
                <tr>
                  <td class="ps-3 fw-semibold text-danger">Sunday</td>
                  <td colspan="3"><span class="text-danger fw-medium"><i class="ri-close-circle-line me-1"></i>Closed (Emergency Services 24/7)</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="p-3 bg-soft rounded-3 d-flex align-items-center gap-3">
            <i class="ri-information-line text-primary fs-3"></i>
            <small class="text-muted"><strong>Note:</strong> Token distribution starts 30 minutes prior to session. Emergency admissions and IPD rounds take precedence during scheduled OPD hours.</small>
          </div>
          <div class="d-flex gap-2 flex-wrap mt-4">
            <a href="book-appointment.html?doctor=${d.id}" class="btn btn-primary"><i class="ri-calendar-check-line me-1"></i>Book OPD Appointment</a>
            <a href="${s.key}.html" class="btn btn-outline-primary">About ${s.name} Department</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function renderAppointmentForm() {
  const sp = document.getElementById('appt-spec');
  const dc = document.getElementById('appt-doc');
  if (!sp) return;
  fillSelect(sp, SPECIALITIES.map(s => ({ value: s.key, label: s.name })), 'Select Speciality');
  const updateDocs = () => fillSelect(dc, DOCTORS.filter(d => !sp.value || d.spec === sp.value).map(d => ({ value: d.id, label: d.name })), 'Select Doctor');
  sp.addEventListener('change', updateDocs);
  const preDoc = docById(qs('doctor'));
  if (preDoc) sp.value = preDoc.spec; else if (qs('speciality')) sp.value = qs('speciality');
  updateDocs();
  if (preDoc) dc.value = preDoc.id;
  const date = document.getElementById('appt-date');
  if (date) date.min = new Date().toISOString().split('T')[0];
}

function renderBlog() {
  const list = document.getElementById('blog-list');
  if (!list) return;
  const q = document.getElementById('blog-search');
  const apply = () => {
    const t = q.value.trim().toLowerCase();
    const res = ARTICLES.filter(a => !t || (a.title + a.excerpt + a.cat).toLowerCase().includes(t));
    list.innerHTML = res.length ? res.map(articleCard).join('') : '<p class="text-center py-5">No articles found.</p>';
  };
  q.addEventListener('input', apply);
  apply();
}

function renderArticle() {
  const el = document.getElementById('article-page');
  if (!el) return;
  const a = ARTICLES.find(x => x.id === qs('id')) || ARTICLES[0];
  const d = docById(a.author);
  document.title = `${a.title} – VibeMed Hospital`;
  el.innerHTML = `
  <section class="page-banner">
    <div class="container">
      <nav aria-label="breadcrumb"><ol class="breadcrumb mb-2">
        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
        <li class="breadcrumb-item"><a href="blog.html">Blog</a></li>
        <li class="breadcrumb-item active">${a.cat}</li></ol></nav>
      <h1>${a.title}</h1>
      <p class="mb-0"><i class="ri-user-line me-1"></i>By <a class="text-white fw-semibold" href="doctor-profile.html?id=${d.id}">${d.name}</a> &nbsp;·&nbsp; <i class="ri-calendar-line me-1"></i>${a.date}</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <div class="row g-5">
        <div class="col-lg-8">
          <img src="${a.img}" class="img-fluid img-rounded-lg w-100 mb-4" style="max-height:460px;object-fit:cover" alt="${a.title}">
          <p class="lead">${a.excerpt}</p>
          <p>Good health is built on everyday choices. Whether it is what you eat, how much you move, or how well you sleep, small consistent habits add up to long-term wellbeing. In this article our specialists share practical, evidence-based guidance you can start using today.</p>
          <h4 class="mt-4">Know the warning signs</h4>
          <p>Many conditions develop silently. Pay attention to persistent fatigue, unexplained pain, breathlessness or sudden changes in weight. If symptoms last more than a few days, consult a doctor rather than self-medicating.</p>
          <ul class="check-list">
            <li>Eat a balanced diet rich in fruits, vegetables and whole grains</li>
            <li>Exercise at least 30 minutes, five days a week</li>
            <li>Limit salt, sugar, alcohol and avoid tobacco</li>
            <li>Get 7–8 hours of quality sleep</li>
            <li>Schedule an annual preventive health checkup</li>
          </ul>
          <h4 class="mt-4">When to see a specialist</h4>
          <p>Early consultation leads to simpler treatment and better outcomes. Our ${a.cat} team is available Monday to Saturday, and our emergency department is open 24/7.</p>
          <div class="p-4 bg-soft rounded-4 d-flex flex-column flex-md-row align-items-md-center gap-3 mt-4">
            <img src="${d.img}" alt="${d.name}" class="rounded-circle" style="width:80px;height:80px;object-fit:cover">
            <div class="flex-grow-1"><small class="text-muted">Written by</small><h5 class="mb-0">${d.name}</h5><small>${d.title}, ${specByKey(d.spec).name}</small></div>
            <a href="book-appointment.html?doctor=${d.id}" class="btn btn-primary btn-sm">Consult Now</a>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="form-card">
            <h5 class="mb-3">Related Articles</h5>
            ${ARTICLES.filter(x => x.id !== a.id).slice(0, 4).map(x => `
              <a href="article.html?id=${x.id}" class="d-flex gap-3 mb-3 text-reset">
                <img src="${x.img}" alt="" style="width:80px;height:64px;object-fit:cover" class="rounded-3">
                <div><h6 class="mb-1 small fw-semibold">${x.title}</h6><small class="text-muted">${x.date}</small></div>
              </a>`).join('')}
          </div>
          <div class="cta-emergency mt-4 text-center p-4">
            <i class="ri-phone-fill display-5"></i>
            <h5 class="text-white mt-2">24/7 Emergency</h5>
            <a href="tel:${PHONE_EMERGENCY.replace(/\s/g,'')}" class="btn btn-light btn-sm mt-2">${PHONE_EMERGENCY}</a>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

/* Demo forms – show a success message instead of submitting */
function initDemoForms() {
  document.querySelectorAll('form.demo-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.classList.add('was-validated'); return; }
      const msg = form.dataset.success || 'Thank you! Our team will contact you shortly.';
      let alert = form.querySelector('.demo-alert');
      if (!alert) { alert = document.createElement('div'); alert.className = 'alert alert-success demo-alert mt-3 mb-0'; form.appendChild(alert); }
      alert.innerHTML = `<i class="ri-checkbox-circle-line me-1"></i>${msg}`;
      form.reset(); form.classList.remove('was-validated');
    });
  });
}

/* Replace any image that fails to load with a branded placeholder */
document.addEventListener('error', e => {
  const t = e.target;
  if (t.tagName === 'IMG' && t.src !== FALLBACK_IMG) t.src = FALLBACK_IMG;
}, true);

/* ---------------- INIT ---------------- */
renderHeader();
renderFooter();
renderHome();
renderSpecialitiesGrid();
renderSpecialityPage();
renderDoctorsPage();
renderDoctorProfile();
renderAppointmentForm();
renderBlog();
renderArticle();
initDemoForms();
