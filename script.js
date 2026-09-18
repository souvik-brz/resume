// script.js

document.addEventListener('DOMContentLoaded', function () {
  // Set footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Tab logic
  var tabs = Array.from(document.querySelectorAll('.tab'));
  var panels = Array.from(document.querySelectorAll('.tab-panel'));

  function activateTab(tab) {
    tabs.forEach(function (t) { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach(function (p) { p.classList.remove('active'); p.setAttribute('hidden', 'true'); });

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    var targetId = tab.getAttribute('data-target');
    var panel = document.getElementById(targetId);
    if (panel) {
      panel.classList.add('active');
      panel.removeAttribute('hidden');
      panel.setAttribute('tabindex', '-1');
      panel.focus({ preventScroll: true });
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () { activateTab(tab); });
    tab.addEventListener('keydown', function (e) {
      var idx = tabs.indexOf(tab);
      if (e.key === 'ArrowRight') { var next = tabs[(idx + 1) % tabs.length]; next.focus(); activateTab(next); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { var prev = tabs[(idx - 1 + tabs.length) % tabs.length]; prev.focus(); activateTab(prev); e.preventDefault(); }
    });
  });

  // Programmatic timeline helper
  // date: string (e.g., "Apr 2025 - Present")
  // role: string (e.g., "Solution Architect")
  // company: string (e.g., "CitiusTech")
  // companyUrl: optional string (relative or absolute)
  function addTimelineNode(date, role, company, companyUrl) {
    var container = document.getElementById('career-timeline');
    if (!container) return;

    var card = document.createElement('div');
    card.className = 'timeline-card';

    var body = document.createElement('div');
    body.className = 'timeline-body';

    var dateEl = document.createElement('div');
    dateEl.className = 'timeline-date';
    dateEl.textContent = date || '';

    var roleEl = document.createElement('h4');
    roleEl.className = 'timeline-role';
    roleEl.textContent = role || '';

    var companyEl = document.createElement('a');
    companyEl.className = 'timeline-company';
    companyEl.href = companyUrl || '#';
    companyEl.target = '_blank';
    companyEl.rel = 'noopener noreferrer';
    companyEl.textContent = company || '';

    body.appendChild(dateEl);
    body.appendChild(roleEl);
    body.appendChild(companyEl);

    card.appendChild(body);

    var prevLast = container.querySelector('.timeline-card.last');
    if (prevLast) prevLast.classList.remove('last');

    container.appendChild(card);
    card.classList.add('last');

    return card;
  }

  window.addTimelineNode = addTimelineNode;

  addTimelineNode(
    'Apr 2025 - Present',
    'Solution Architect',
    'CitiusTech',
    'https://www.citiustech.com'
  );

  addTimelineNode(
    'Oct 2022 - Mar 2025',
    'Senior Software Engineer',
    'Kubapay (Unwire)',
    'https://www.unwire.com'
  );

  addTimelineNode(
    'Mar 2013 - Sep 2022',
    'Technical Lead',
    'Tata Consultancy Services',
    'https://www.tcs.com'
  );

  // Add education entries programmatically
  function addEducation(
    degree,
    institution,
    specialization,
    duration,
    institutionUrl
  ) {
    const container = document.getElementById('education-grid');

    if (!container) return;

    const block = document.createElement('div');
    block.className = 'education-block';

    const degreeEl = document.createElement('div');
    degreeEl.className = 'education-degree';
    degreeEl.textContent = degree;

    const institutionEl = document.createElement('a');
    institutionEl.className = 'education-school';
    institutionEl.href = institutionUrl || '#';
    institutionEl.target = '_blank';
    institutionEl.rel = 'noopener noreferrer';
    institutionEl.textContent = institution;

    const durationEl = document.createElement('div');
    durationEl.className = 'education-duration';
    durationEl.textContent = duration;

    const specializationEl = document.createElement('div');
    specializationEl.className = 'education-specialization';
    specializationEl.textContent = specialization;

    block.appendChild(degreeEl);
    block.appendChild(institutionEl);
    block.appendChild(durationEl);
    block.appendChild(specializationEl);

    container.appendChild(block);

    return block;
  }

  window.addEducation = addEducation;

  addEducation(
    'Master of Technology (Online)',
    'IIT Kanpur',
    'Artificial Intelligence and Machine Learning',
    '2026 - Currently Pursuing',
    'https://online.iitk.ac.in'
  );

  addEducation(
    'Post Graduate Diploma',
    'IIIT Bangalore',
    'Data Science with specialization in Deep Learning',
    '2020 - 2021',
    'https://www.iiitb.ac.in'
  );

  addEducation(
    'Bachelor of Engineering',
    'University of Burdwan',
    'Computer Science and Engineering',
    '2008 - 2012',
    'https://www.buruniv.ac.in'
  );


  function renderExperiences() {

    const container =
      document.getElementById("experience-grid");

    if (!container) {
      console.error("experience-grid not found");
      return;
    }

    experiences.forEach(exp => {

      const block =
        document.createElement("div");

      block.className =
        "experience-block";

      block.innerHTML = `
            <div class="experience-role">
                ${exp.role}
            </div>
            <div class="experience-company">
                ${exp.company}
            </div>

            <div class="experience-duration">
                ${exp.duration}
            </div>

            <ul class="experience-achievements">
                ${exp.achievements
          .map(item => `<li>${item}</li>`)
          .join("")}
            </ul>
        `;

      container.appendChild(block);
    });
  }

  renderExperiences();

});
