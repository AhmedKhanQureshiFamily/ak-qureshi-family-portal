import { familyData, getChronologicalTimeline, getFamilyStatistics } from './data/familyData.js';

// State
let currentFilter = 'all';
let searchQuery = '';
let currentView = 'timeline';

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

// Elements
const statsContainer = document.getElementById('stats-container');
const timelineStream = document.getElementById('timeline-stream');
const spineProgressFill = document.getElementById('spine-progress-fill');
const searchInput = document.getElementById('search-input');
const filterPills = document.querySelectorAll('.pill');
const btnViewTimeline = document.getElementById('btn-view-timeline');
const btnViewTree = document.getElementById('btn-view-tree');
const btnDbArchitecture = document.getElementById('btn-db-architecture');
const viewTimelinePanel = document.getElementById('view-timeline');
const viewTreePanel = document.getElementById('view-tree');
const treeCanvas = document.getElementById('tree-canvas');

// Modals
const profileModal = document.getElementById('profile-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalContent = document.getElementById('modal-content');

const dbModal = document.getElementById('db-modal');
const dbModalCloseBtn = document.getElementById('db-modal-close-btn');
const dbTabContent = document.getElementById('db-tab-content');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderTimeline();
  renderTree();
  setupScrollProgressTracker();
  setupEventListeners();
  setupDbArchitectureModal();
});

// Render Key Stats in Hero Section
function renderStats() {
  const stats = getFamilyStatistics();
  statsContainer.innerHTML = `
    <div class="stat-card">
      <span class="stat-value">${stats.foundingDecade}</span>
      <span class="stat-label">Dynasty Origin</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.totalGenerations}</span>
      <span class="stat-label">Generations</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.offspringCount}</span>
      <span class="stat-label">Offspring (The 9)</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.grandchildrenCount}</span>
      <span class="stat-label">Grandchildren</span>
    </div>
    <div class="stat-card">
      <span class="stat-value">${stats.spanYears}</span>
      <span class="stat-label">Years of Heritage</span>
    </div>
  `;
}

// Render the Timeline Stream
function renderTimeline() {
  const allEvents = getChronologicalTimeline();
  
  const filteredEvents = allEvents.filter(ev => {
    // Filter pill matching
    let matchesFilter = true;
    if (currentFilter === 'founders') {
      matchesFilter = (ev.generation === 0);
    } else if (currentFilter === 'offspring') {
      matchesFilter = (ev.generation === 1 && !ev.eventType.startsWith('passing'));
    } else if (currentFilter === 'grandchildren') {
      matchesFilter = (ev.generation === 2);
    } else if (currentFilter === 'memorial') {
      matchesFilter = ev.eventType.startsWith('passing');
    }

    // Search query matching
    let matchesSearch = true;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      matchesSearch = 
        ev.personName.toLowerCase().includes(q) ||
        (ev.nameNastaleeq && ev.nameNastaleeq.includes(searchQuery)) ||
        (ev.nickname && ev.nickname.toLowerCase().includes(q)) ||
        ev.title.toLowerCase().includes(q) ||
        ev.desc.toLowerCase().includes(q) ||
        ev.displayDate.toLowerCase().includes(q) ||
        String(ev.year).includes(q);
    }

    return matchesFilter && matchesSearch;
  });

  if (filteredEvents.length === 0) {
    timelineStream.innerHTML = `
      <div style="text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
        <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No family milestones found matching "${escapeHtml(searchQuery)}"</p>
        <button class="pill active" onclick="document.getElementById('search-input').value=''; document.getElementById('search-input').dispatchEvent(new Event('input'));">Clear Search</button>
      </div>
    `;
    updateSpineProgress();
    return;
  }

  timelineStream.innerHTML = filteredEvents.map((ev, index) => {
    const isGenesis = ev.personId === 'ahmed-khan-qureshi' || ev.personId === 'surriya-qureshi';
    const isFirstNode = index === 0;

    return `
      <div class="timeline-item ${isGenesis ? 'genesis-node' : ''} ${isFirstNode ? 'active-node' : ''}" 
           data-id="${ev.id}" 
           data-year="${ev.year}"
           data-category="${ev.category}">
        
        <!-- Year Tag on opposite side -->
        <div class="timeline-year-tag">
          <span>${ev.displayDate}</span>
        </div>

        <!-- Central Timeline Node Dot -->
        <div class="timeline-node">
          <div class="node-dot" title="${ev.title} (${ev.displayDate})"></div>
        </div>

        <!-- Timeline Information Card -->
        <div class="timeline-card">
          <div class="card-header-row">
            <span class="category-badge">${ev.category}</span>
            <span class="date-pill">${ev.displayDate}</span>
          </div>

          <h3 class="card-title">${ev.title}</h3>
          ${ev.nameNastaleeq ? `<div class="card-nastaleeq-name">${ev.nameNastaleeq}</div>` : ''}

          <div class="card-subtitle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            <span>${ev.role}</span>
          </div>

          <p class="card-desc">${ev.desc}</p>

          <div class="card-footer-action">
            <div class="avatar-preview">
              <div class="avatar-circle">${ev.avatarText}</div>
              <span class="avatar-label">${ev.personName}</span>
            </div>
            ${ev.eventType === 'union' ? '' : `
            <button class="btn-card-details" data-person-id="${ev.personId}" data-event-id="${ev.id}">
              View Profile & Branch
            </button>`}
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Observe nodes for active-node scrolling trigger
  setupTimelineObserver();

  // Timeline height changed, so redraw the spine
  updateSpineProgress();
}

// Scroll Progress Tracker: dynamically draws line downwards
function updateSpineProgress() {
  if (currentView !== 'timeline') return;

  const timelineWrapper = document.querySelector('.timeline-wrapper');
  if (!timelineWrapper || !spineProgressFill) return;

  const rect = timelineWrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  // Trigger line starting from upper portion of screen
  const startOffset = windowHeight * 0.45;
  const totalHeight = rect.height - startOffset;
  const scrolledDistance = Math.max(0, -rect.top + startOffset);

  const progressPercentage = Math.min(100, Math.max(0, (scrolledDistance / totalHeight) * 100));
  spineProgressFill.style.height = `${progressPercentage}%`;
}

function setupScrollProgressTracker() {
  window.addEventListener('scroll', updateSpineProgress, { passive: true });
  window.addEventListener('resize', updateSpineProgress);
  updateSpineProgress();
}

// Setup IntersectionObserver for items
function setupTimelineObserver() {
  const items = document.querySelectorAll('.timeline-item');
  if (items.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active-node');
      }
    });
  }, {
    rootMargin: '0px 0px -15% 0px',
    threshold: 0.15
  });

  items.forEach(item => observer.observe(item));
}

// Render Genealogical Tree View
function renderTree() {
  const { patriarch, matriarch, offspring } = familyData;

  treeCanvas.innerHTML = `
    <!-- Top Level: Patriarch & Matriarch -->
    <div class="tree-founders-level">
      <div class="founder-card" data-person-id="${patriarch.id}">
        <div class="category-badge">Patriarch • بانیِ خاندان</div>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--gold-100); margin: 0.5rem 0 0.1rem;">${patriarch.name}</h4>
        <div class="card-nastaleeq-name" style="font-size: 1.4rem;">${patriarch.nameNastaleeq}</div>
        <div style="font-size: 0.85rem; color: var(--gold-400);">${patriarch.birthDateFormatted} – ${patriarch.deathDateFormatted}</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">${patriarch.tributeQuote}</p>
      </div>

      <div class="founder-card" data-person-id="${matriarch.id}">
        <div class="category-badge">Matriarch • والدہ محترمہ</div>
        <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--gold-100); margin: 0.5rem 0 0.1rem;">${matriarch.name}</h4>
        <div class="card-nastaleeq-name" style="font-size: 1.4rem;">${matriarch.nameNastaleeq}</div>
        <div style="font-size: 0.85rem; color: var(--gold-400);">${matriarch.birthDateFormatted} – ${matriarch.deathDateFormatted}</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem;">${matriarch.tributeQuote}</p>
      </div>
    </div>

    <!-- Connector Bar -->
    <div class="tree-connector-bar"></div>

    <!-- 9 Offspring Branches Grid -->
    <div class="tree-offspring-grid">
      ${offspring.map(child => `
        <div class="tree-branch-card" data-person-id="${child.id}">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
            <span class="branch-num">Branch #${child.order} of 9</span>
            ${child.status === 'Deceased' ? `<span class="status-badge-deceased">مرحوم/مرحومہ</span>` : ''}
          </div>

          <div class="branch-name" style="margin-bottom: 0.1rem;">${child.name}</div>
          <div class="card-nastaleeq-name" style="font-size: 1.25rem; margin-bottom: 0.4rem;">${child.nameNastaleeq}</div>

          ${child.nickname ? `
            <div style="font-size: 0.8rem; color: var(--gold-400); margin-bottom: 0.5rem;">
              Nickname: <strong>${child.nickname}</strong> 
              ${child.nicknameNastaleeq ? `<span class="nastaleeq" style="font-size: 0.95rem; margin-right: 0.3rem;">(${child.nicknameNastaleeq})</span>` : ''}
            </div>
          ` : ''}

          <div class="branch-meta">
            Born: ${child.birthDateFormatted} ${child.spouse ? `• Spouse: ${child.spouse} (${child.spouseNastaleeq})` : ''}
          </div>

          <div class="branch-grandchildren">
            <div class="grandchildren-title">Grandchildren (${child.grandchildren.length}):</div>
            <div>
              ${child.grandchildren.map(gc => `
                <span class="gc-tag" title="${gc.relation} ${gc.birthDateFormatted ? `• Born: ${gc.birthDateFormatted}` : ''} • ${gc.bio}">
                  <strong>${gc.name}</strong> <span class="nastaleeq" style="font-size: 0.85rem;">(${gc.nameNastaleeq})</span>
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// Setup Event Listeners
function setupEventListeners() {
  // Filter pills
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilter = pill.dataset.filter;
      renderTimeline();
    });
  });

  // Search Input
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderTimeline();
  });

  // View Switchers
  btnViewTimeline.addEventListener('click', () => {
    currentView = 'timeline';
    btnViewTimeline.classList.add('active');
    btnViewTree.classList.remove('active');
    viewTimelinePanel.classList.add('active');
    viewTreePanel.classList.remove('active');
  });

  btnViewTree.addEventListener('click', () => {
    currentView = 'tree';
    btnViewTree.classList.add('active');
    btnViewTimeline.classList.remove('active');
    viewTreePanel.classList.add('active');
    viewTimelinePanel.classList.remove('active');
  });

  // Card detail button clicks (Event delegation)
  document.addEventListener('click', (e) => {
    const detailBtn = e.target.closest('.btn-card-details');
    if (detailBtn) {
      const personId = detailBtn.dataset.personId;
      openPersonProfileModal(personId);
      return;
    }

    const treeCard = e.target.closest('.tree-branch-card, .founder-card');
    if (treeCard) {
      const personId = treeCard.dataset.personId;
      openPersonProfileModal(personId);
      return;
    }
  });

  // Modal Closures
  modalCloseBtn.addEventListener('click', () => {
    profileModal.classList.remove('active');
  });
  profileModal.addEventListener('click', (e) => {
    if (e.target === profileModal) profileModal.classList.remove('active');
  });

  // DB Architecture Modal
  btnDbArchitecture.addEventListener('click', () => {
    dbModal.classList.add('active');
  });
  dbModalCloseBtn.addEventListener('click', () => {
    dbModal.classList.remove('active');
  });
  dbModal.addEventListener('click', (e) => {
    if (e.target === dbModal) dbModal.classList.remove('active');
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      profileModal.classList.remove('active');
      dbModal.classList.remove('active');
    }
  });
}

// Person Profile Modal Content Generator
function openPersonProfileModal(personId) {
  let person = null;
  let type = '';

  if (personId === familyData.patriarch.id) {
    person = familyData.patriarch;
    type = 'patriarch';
  } else if (personId === familyData.matriarch.id) {
    person = familyData.matriarch;
    type = 'matriarch';
  } else {
    person = familyData.offspring.find(c => c.id === personId);
    if (!person) {
      // Check grandchildren
      for (const child of familyData.offspring) {
        const gc = child.grandchildren.find(g => g.id === personId);
        if (gc) {
          person = { ...gc, parentName: child.name, parentNastaleeq: child.nameNastaleeq, order: child.order };
          type = 'grandchild';
          break;
        }
      }
    } else {
      type = 'offspring';
    }
  }

  if (!person) return;

  let modalHtml = '';

  if (type === 'patriarch' || type === 'matriarch') {
    modalHtml = `
      <div class="modal-badge">${type === 'patriarch' ? 'Patriarch & Progenitor • بانیِ خاندان' : 'Matriarch & Anchor • والدہ محترمہ'}</div>
      <h2 style="font-family: var(--font-serif); color: var(--gold-100); margin-bottom: 0.2rem;">${person.name}</h2>
      <div class="card-nastaleeq-name" style="font-size: 1.65rem; margin-bottom: 0.8rem;">${person.nameNastaleeq}</div>

      <div style="color: var(--gold-400); font-size: 0.95rem; margin-bottom: 1.25rem;">
        ${person.birthDateFormatted} – ${person.deathDateFormatted} • ${person.birthPlace}
      </div>

      <div style="background: rgba(245, 158, 11, 0.08); border-left: 3px solid var(--gold-400); padding: 1rem; border-radius: var(--radius-sm); margin-bottom: 1.5rem; font-style: italic; color: var(--gold-100);">
        "${person.tributeQuote}"
      </div>

      <h4 style="font-family: var(--font-serif); color: var(--text-primary); margin-bottom: 0.5rem;">Biography & Family Legacy</h4>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${person.bio}</p>

      <h4 style="font-family: var(--font-serif); color: var(--text-primary); margin-bottom: 0.5rem;">Key Milestones</h4>
      <ul style="list-style: none; padding: 0;">
        ${person.events.map(ev => `
          <li style="padding: 0.5rem 0; border-bottom: 1px solid var(--border-subtle); display: flex; gap: 0.75rem;">
            <strong style="color: var(--gold-400); min-width: 100px;">${ev.year}</strong>
            <div>
              <span style="color: var(--text-primary); font-weight: 600;">${ev.title}</span>: 
              <span style="color: var(--text-secondary);">${ev.desc}</span>
            </div>
          </li>
        `).join('')}
      </ul>
    `;
  } else if (type === 'offspring') {
    modalHtml = `
      <div class="modal-badge">Child #${person.order} of 9 • Generation 1 ${person.status === 'Deceased' ? '• مرحوم/مرحومہ' : ''}</div>
      <h2 style="font-family: var(--font-serif); color: var(--gold-100); margin-bottom: 0.2rem;">${person.name}</h2>
      <div class="card-nastaleeq-name" style="font-size: 1.55rem; margin-bottom: 0.5rem;">${person.nameNastaleeq}</div>

      ${person.nickname ? `
        <div style="background: rgba(245, 158, 11, 0.07); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: var(--radius-sm); padding: 0.75rem; margin-bottom: 1rem;">
          <strong style="color: var(--gold-300);">Nickname:</strong> ${person.nickname} 
          ${person.nicknameNastaleeq ? `<span class="nastaleeq" style="font-size: 1.1rem; margin-left: 0.4rem;">(${person.nicknameNastaleeq})</span>` : ''}
          ${person.nicknameOrigin ? `<div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">${person.nicknameOrigin}</div>` : ''}
        </div>
      ` : ''}

      <div style="color: var(--gold-400); font-size: 0.95rem; margin-bottom: 1.25rem;">
        Born: ${person.birthDateFormatted} ${person.deathDateFormatted ? `• Deceased: ${person.deathDateFormatted}` : ''}
        ${person.spouse ? `• Spouse: ${person.spouse} (${person.spouseNastaleeq})` : ''}
      </div>

      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${person.bio}</p>

      <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1.25rem; margin-bottom: 1.5rem;">
        <h4 style="font-family: var(--font-serif); color: var(--gold-300); margin-bottom: 0.75rem;">Lineage Links</h4>
        <div style="font-size: 0.9rem; color: var(--text-secondary); line-height: 1.8;">
          <div><strong>Father:</strong> Ahmed Khan Qureshi <span class="nastaleeq">(احمد خان قریشی)</span></div>
          <div><strong>Mother:</strong> Surriya Qureshi <span class="nastaleeq">(ثریا قریشی)</span></div>
          ${person.spouse ? `<div><strong>Spouse:</strong> ${person.spouse} <span class="nastaleeq">(${person.spouseNastaleeq})</span></div>` : ''}
          ${person.residence ? `<div><strong>Residence:</strong> ${person.residence}</div>` : ''}
        </div>
      </div>

      <h4 style="font-family: var(--font-serif); color: var(--text-primary); margin-bottom: 0.5rem;">
        Grandchildren (Branch of ${person.name.split(' ')[0]} / ${person.nameNastaleeq})
      </h4>
      <div style="display: flex; flex-direction: column; gap: 0.6rem;">
        ${person.grandchildren.map(gc => `
          <div style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 0.75rem;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <div>
                <strong style="color: var(--gold-100); font-size: 0.95rem;">${gc.name}</strong>
                <span class="nastaleeq" style="font-size: 1.05rem; color: var(--gold-300); margin-left: 0.4rem;">${gc.nameNastaleeq}</span>
              </div>
              <span style="font-size: 0.8rem; color: var(--gold-400);">${gc.birthDateFormatted || (gc.birthYear ? `Born ${gc.birthYear}` : '')}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.25rem;">
              ${gc.relation} • ${gc.bio}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } else {
    modalHtml = `
      <div class="modal-badge">Grandchild • Generation 2</div>
      <h2 style="font-family: var(--font-serif); color: var(--gold-100); margin-bottom: 0.2rem;">${person.name}</h2>
      <div class="card-nastaleeq-name" style="font-size: 1.55rem; margin-bottom: 0.5rem;">${person.nameNastaleeq}</div>
      <div style="color: var(--gold-400); font-size: 0.95rem; margin-bottom: 1.25rem;">
        ${person.birthDateFormatted ? `Born: ${person.birthDateFormatted}` : (person.birthYear ? `Born: ${person.birthYear}` : '')} 
        • Branch of ${person.parentName} <span class="nastaleeq">(${person.parentNastaleeq})</span>
      </div>
      <p style="color: var(--text-secondary); line-height: 1.7;">${person.bio}</p>
    `;
  }

  modalContent.innerHTML = modalHtml;
  profileModal.classList.add('active');
}

// Database & Frontend Architecture Discussion Content
function setupDbArchitectureModal() {
  const tabs = document.querySelectorAll('.db-tab-btn');
  
  const contentMap = {
    'tab-frontend': `
      <h3 style="font-family: var(--font-serif); color: var(--gold-300); margin-bottom: 0.75rem;">1. Front-End Technology Options & Trade-Offs</h3>
      <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
        To deliver a world-class vertical scrolling timeline with rich scrollytelling physics, SVG connecting lines, and Nastaleeq typography, here is an evaluation of the front-end stacks:
      </p>

      <div style="display: grid; gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <h4 style="color: var(--gold-400); margin-bottom: 0.3rem;">Option A: Next.js (React 19 / TypeScript) — Recommended for Full Production</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">
            <strong>Pros:</strong> Built-in server-side rendering (SSR), image optimization for historic high-resolution portraits, Server Actions for family submissions/edits, and access to industry-standard tree visualization libraries like <code>@xyflow/react</code> and <code>framer-motion</code>.<br/>
            <strong>Best when:</strong> You want authentication for family members, photo gallery uploads, and SEO.
          </p>
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <h4 style="color: var(--gold-400); margin-bottom: 0.3rem;">Option B: Vite + Vanilla JavaScript / CSS (Current Prototype)</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">
            <strong>Pros:</strong> Zero runtime bundle weight, instant 60fps scroll-driven performance, direct native CSS <code>scroll()</code> and <code>IntersectionObserver</code> control without virtual DOM overhead.<br/>
            <strong>Best when:</strong> Maximum speed, lightweight deployment (GitHub Pages / Cloudflare Pages / Vercel), pure simplicity.
          </p>
        </div>

        <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 1rem;">
          <h4 style="color: var(--gold-400); margin-bottom: 0.3rem;">Option C: SvelteKit or Astro</h4>
          <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.5;">
            <strong>Pros:</strong> Astro offers zero JavaScript by default for editorial and memorial pages, hydrating only the interactive scroll timeline island.<br/>
            <strong>Best when:</strong> The portal is predominantly read-only editorial content with occasional updates.
          </p>
        </div>
      </div>
    `,

    'tab-relational': `
      <h3 style="font-family: var(--font-serif); color: var(--gold-300); margin-bottom: 0.75rem;">2. Relational Database Schema (PostgreSQL with Multilingual Support)</h3>
      <p style="color: var(--text-secondary); line-height: 1.6;">
        Family trees represent hierarchical directed graphs. In PostgreSQL, we combine a normalized <strong>family_members</strong> table with both English and Nastaleeq columns, a <strong>relationships</strong> table, and <strong>timeline_events</strong>.
      </p>

      <pre class="code-block"><code>-- 1. Family Members Table (with Nastaleeq & Urdu support)
CREATE TABLE family_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    name_nastaleeq VARCHAR(200) NOT NULL, -- Urdu script: e.g. احمد خان قریشی
    nickname VARCHAR(100),
    nickname_nastaleeq VARCHAR(100),
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other')),
    birth_date DATE,
    birth_year INT NOT NULL,
    birth_place VARCHAR(200),
    death_date DATE,
    death_year INT,
    is_living BOOLEAN GENERATED ALWAYS AS (death_year IS NULL) STORED,
    generation_level INT NOT NULL DEFAULT 0, -- 0: Founders, 1: The 9, 2: Grandchildren
    bio TEXT,
    tribute_quote TEXT,
    avatar_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Relationships Table
CREATE TABLE relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
    relative_id UUID NOT NULL REFERENCES family_members(id) ON DELETE CASCADE,
    relation_type VARCHAR(50) NOT NULL CHECK (relation_type IN ('parent', 'child', 'spouse', 'step-parent', 'step-child')),
    marriage_date DATE,
    notes TEXT,
    CONSTRAINT unique_relation UNIQUE (person_id, relative_id, relation_type)
);

-- 3. Chronological Timeline Events
CREATE TABLE timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    person_id UUID REFERENCES family_members(id) ON DELETE SET NULL,
    event_year INT NOT NULL,
    event_date DATE,
    event_type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    title_nastaleeq VARCHAR(255),
    description TEXT,
    is_major_milestone BOOLEAN DEFAULT FALSE
);</code></pre>
    `,

    'tab-graph': `
      <h3 style="font-family: var(--font-serif); color: var(--gold-300); margin-bottom: 0.75rem;">3. Graph Database Model (Neo4j / Memgraph)</h3>
      <p style="color: var(--text-secondary); line-height: 1.6;">
        Graph model with bilingual nodes and edge traversals across branches:
      </p>

      <pre class="code-block"><code>// Cypher Definition
CREATE (ak:Person {
  id: "ahmed-khan", 
  name: "Ahmed Khan Qureshi", 
  nameNastaleeq: "احمد خان قریشی",
  birthYear: 1940, 
  role: "Patriarch"
})
CREATE (sq:Person {
  id: "surriya", 
  name: "Surriya Qureshi", 
  nameNastaleeq: "ثریا قریشی",
  birthYear: 1945, 
  deathYear: 2026, 
  role: "Matriarch"
})
CREATE (ak)-[:MARRIED_TO {year: 1963}]->(sq)

// Eldest Son: Tassawar
CREATE (c1:Person {id: "tassawar", name: "Tassawar Ahmed Qureshi", nameNastaleeq: "تصوّر احمد قریشی", nickname: "Hob Bhai"})
CREATE (ak)-[:FATHER_OF]->(c1)
CREATE (sq)-[:MOTHER_OF]->(c1)</code></pre>
    `,

    'tab-recommendation': `
      <h3 style="font-family: var(--font-serif); color: var(--gold-300); margin-bottom: 0.75rem;">4. Recommended Production Architecture</h3>
      <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid var(--border-gold); border-radius: var(--radius-md); padding: 1.25rem;">
        <h4 style="color: var(--gold-300); margin-bottom: 0.5rem;">Recommended Stack: Next.js + Supabase (PostgreSQL) + Cloudflare R2</h4>
        <ul style="color: var(--text-secondary); line-height: 1.8; padding-left: 1.25rem;">
          <li><strong>Frontend:</strong> Next.js App Router with Noto Nastaliq Urdu + Tailwind/CSS Modules + Framer Motion.</li>
          <li><strong>Database:</strong> Supabase (PostgreSQL) with UTF-8 multilingual support and Row Level Security.</li>
          <li><strong>Media Storage:</strong> Cloudflare R2 for family archives, historic documents, and voice recordings.</li>
        </ul>
      </div>
    `
  };

  // Initial tab render
  dbTabContent.innerHTML = contentMap['tab-frontend'];

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabId = tab.dataset.tab;
      dbTabContent.innerHTML = contentMap[tabId];
    });
  });
}
