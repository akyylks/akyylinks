// ── DADOS — edite aqui seus links ──────────────────────

const LINKS = [
  {
    network: 'youtube',
    label: 'YouTube',
    url: 'https://www.youtube.com/@Akyyz1nha',
    adult: false,
  },
  {
    network: 'instagram',
    label: 'Instagram',
    url: 'https://instagram.com',
    adult: false,
  },
  {
    network: 'telegram',
    label: 'Telegram (prévias)',
    url: 'https://t.me/+IPc3U_Nadds0ZmE5',
    adult: true,
  },
];

const PROFILE = {
  name: 'Akyy Personalizados',
  bio: 'Bem-vinda aos meus links 🌸',
  avatar: 'avatar.png',
};

// ── METADADOS POR REDE ─────────────────────────────────

const NETWORK_META = {
  instagram: { icon: '📸', class: 'net-instagram' },
  tiktok:    { icon: '🎵', class: 'net-tiktok'    },
  twitter:   { icon: '🐦', class: 'net-twitter'   },
  youtube:   { icon: '▶️',  class: 'net-youtube'   },
  twitch:    { icon: '🟣', class: 'net-twitch'    },
  facebook:  { icon: '👥', class: 'net-facebook'  },
  pinterest: { icon: '📌', class: 'net-pinterest' },
  spotify:   { icon: '🎧', class: 'net-spotify'   },
  telegram:  { icon: '✈️',  class: 'net-telegram'  },
  whatsapp:  { icon: '💬', class: 'net-whatsapp'  },
  onlyfans:  { icon: '🔒', class: 'net-onlyfans'  },
  privacy:   { icon: '💗', class: 'net-privacy'   },
  kvng:      { icon: '👑', class: 'net-kvng'      },
  hotmart:   { icon: '🔥', class: 'net-hotmart'   },
  linktree:  { icon: '🌳', class: 'net-linktree'  },
  custom:    { icon: '🔗', class: 'net-custom'    },
};

// ── ESTADO ─────────────────────────────────────────────

let pendingUrl = null;

// ── MODAL +18 ──────────────────────────────────────────

const adultOverlay = document.getElementById('adult-overlay');
const adultConfirm = document.getElementById('adult-confirm-btn');
const adultCancel  = document.getElementById('adult-cancel-btn');

function showAdultModal() {
  adultOverlay.classList.remove('hidden');
}

function hideAdultModal() {
  adultOverlay.classList.add('hidden');
  pendingUrl = null;
}

adultConfirm.addEventListener('click', () => {
  if (pendingUrl) openUrl(pendingUrl);
  hideAdultModal();
});

adultCancel.addEventListener('click', hideAdultModal);

adultOverlay.addEventListener('click', (e) => {
  if (e.target === adultOverlay) hideAdultModal();
});

// ── HELPERS ────────────────────────────────────────────

function openUrl(url) {
  const href = /^https?:\/\//i.test(url) ? url : 'https://' + url;
  window.open(href, '_blank', 'noopener,noreferrer');
}

// ── RENDER ─────────────────────────────────────────────

function renderProfile() {
  document.getElementById('profile-name').textContent = PROFILE.name;
  document.getElementById('profile-bio').textContent  = PROFILE.bio;
  const img = document.getElementById('profile-avatar');
  img.src = PROFILE.avatar;
  img.onerror = () => { img.style.display = 'none'; };
}

function renderLinks() {
  const container = document.getElementById('links-container');
  container.innerHTML = '';

  LINKS.forEach((link, idx) => {
    const meta = NETWORK_META[link.network] || NETWORK_META.custom;

    const btn = document.createElement('button');
    btn.className = `link-btn ${meta.class}`;
    btn.id        = `link-${link.network}-${idx}`;
    btn.setAttribute('aria-label', `Acessar ${link.label}`);
    btn.style.animationDelay = `${idx * 0.06}s`;

    btn.innerHTML = `
      <span class="link-icon">${meta.icon}</span>
      <span class="link-label">${link.label}</span>
      ${link.adult ? '<span class="link-adult-badge">+18</span>' : ''}
    `;

    btn.addEventListener('click', () => {
      if (link.adult) {
        pendingUrl = link.url;
        showAdultModal();
      } else {
        openUrl(link.url);
      }
    });

    container.appendChild(btn);
  });
}

// ── INIT ───────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  renderLinks();
});
