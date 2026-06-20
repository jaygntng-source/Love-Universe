// ========================================
// LOADING SCREEN - PASTI JALAN
// ========================================

(function() {
    const loading = document.getElementById('loading');
    const fill = document.getElementById('progressFill');
    let progress = 0;

    const timer = setInterval(() => {
        progress += Math.random() * 6 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(timer);
            finishLoading();
        }
        fill.style.width = progress + '%';
    }, 120);

    function finishLoading() {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 800);
        }, 500);
    }

    // FALLBACK - MAKSIMAL 4 DETIK
    setTimeout(() => {
        if (!loading.classList.contains('hidden')) {
            progress = 100;
            fill.style.width = '100%';
            clearInterval(timer);
            finishLoading();
        }
    }, 4000);
})();

// ========================================
// CUSTOM CURSOR
// ========================================

const cursor = document.getElementById('customCursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseover', (e) => {
    const hover = e.target.closest('button, .gallery-item, .timeline-card, .btn-primary, .secret-box, .food-grid img');
    cursor.classList.toggle('hover', !!hover);
});

// ========================================
// OPENING BUTTON
// ========================================

document.getElementById('startBtn').addEventListener('click', function() {
    const opening = document.getElementById('opening');
    const counter = document.getElementById('counter');

    opening.style.transition = 'all 0.6s ease';
    opening.style.opacity = '0';
    opening.style.transform = 'scale(0.96)';

    setTimeout(() => {
        opening.style.display = 'none';
        counter.classList.add('visible');
        counter.scrollIntoView({ behavior: 'smooth' });
    }, 650);
});

// ========================================
// RELATIONSHIP COUNTER
// ========================================

const startDate = new Date('2025-01-14');

function updateCounter() {
    const now = new Date();
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    document.getElementById('days').textContent = days;
    document.getElementById('months').textContent = months;
    document.getElementById('years').textContent = years;
}

updateCounter();
setInterval(updateCounter, 1000);

// ========================================
// SCROLL REVEAL - SECTION
// ========================================

const sections = document.querySelectorAll('.section:not(#opening)');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

sections.forEach(section => sectionObserver.observe(section));

// ========================================
// SCROLL REVEAL - STORY TEXT
// ========================================

const storyParagraphs = document.querySelectorAll('.story-text p');

const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('reveal');
            }, index * 280);
        }
    });
}, { threshold: 0.25 });

storyParagraphs.forEach(p => storyObserver.observe(p));

// ========================================
// MEMORY GALLERY
// ========================================

const memories = [
    { src: 'assets/images/memories/photo1.jpg', caption: 'Our First Memory' },
    { src: 'assets/images/memories/photo2.jpg', caption: 'Together We Grow' },
    { src: 'assets/images/memories/photo3.jpg', caption: 'Beautiful Moments' },
    { src: 'assets/images/memories/photo4.jpg', caption: 'Love & Laughter' },
    { src: 'assets/images/memories/photo5.jpg', caption: 'Through The Years' },
    { src: 'assets/images/memories/photo6.jpg', caption: 'Endless Stories' },
    { src: 'assets/images/memories/photo7.jpg', caption: 'Our Little World' },
    { src: 'assets/images/memories/photo8.jpg', caption: 'Forever Us' },
    { src: 'assets/images/memories/photo9.jpg', caption: 'Always Together' },
    { src: 'assets/images/memories/photo10.jpg', caption: 'To Be Continued...' }
];

const galleryGrid = document.getElementById('memoryGrid');

memories.forEach((mem, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${mem.src}" alt="${mem.caption}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23f5a6b8%22/%3E%3Ctext x=%2250%%22 y=%2250%%22 font-family=%22Inter%22 font-size=%2220%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EMemory ${index+1}%3C/text%3E%3C/svg%3E'" />
        <div class="overlay"><span>${mem.caption}</span></div>
    `;
    div.addEventListener('click', () => openLightbox(mem.src));
    galleryGrid.appendChild(div);
});

// ========================================
// LIGHTBOX
// ========================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImage');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
});

// ========================================
// SECRET BOX
// ========================================

const secretBox = document.getElementById('secretBox');
secretBox.addEventListener('click', function() {
    this.classList.toggle('open');
});

// ========================================
// GIFT
// ========================================

document.getElementById('giftBtn').addEventListener('click', function() {
    const reveal = document.getElementById('giftReveal');
    const isHidden = reveal.classList.toggle('hidden');
    this.textContent = isHidden ? 'Open Gift ✨' : 'Close Gift ✨';
});

// ========================================
// FOOD FAVORITES
// ========================================

const fikriFoods = [
    'assets/images/food/fikri1.jpg',
    'assets/images/food/fikri2.jpg',
    'assets/images/food/fikri3.jpg'
];

const zahraFoods = [
    'assets/images/food/zahra1.jpg',
    'assets/images/food/zahra2.jpg',
    'assets/images/food/zahra3.jpg'
];

function loadFood(containerId, images) {
    const container = document.getElementById(containerId);
    images.forEach(src => {
        const img = document.createElement('img');
        img.src = src;
        img.loading = 'lazy';
        img.alt = 'Food';
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22225%22%3E%3Crect width=%22300%22 height=%22225%22 fill=%22%23e8748a%22/%3E%3Ctext x=%2250%%22 y=%2250%%22 font-family=%22Inter%22 font-size=%2216%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EFood%3C/text%3E%3C/svg%3E';
        };
        container.appendChild(img);
    });
}

loadFood('fikriFood', fikriFoods);
loadFood('zahraFood', zahraFoods);

// ========================================
// EASTER EGG - KLIK LOGO 5X
// ========================================

let logoClickCount = 0;
const logo = document.querySelector('.opening-content h1');

logo.addEventListener('click', function() {
    logoClickCount++;
    if (logoClickCount === 5) {
        createSparkle();
        logoClickCount = 0;
    }
});

function createSparkle() {
    const container = document.createElement('div');
    container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999';

    for (let i = 0; i < 60; i++) {
        const el = document.createElement('div');
        const size = Math.random() * 10 + 3;
        el.style.cssText = `
            position:absolute;
            width:${size}px;
            height:${size}px;
            background:radial-gradient(circle, #f5a6b8, #e8748a);
            border-radius:50%;
            left:${Math.random() * 100}%;
            top:${Math.random() * 100}%;
            animation:sparkleBurst ${Math.random() * 1 + 0.6}s ease forwards;
            box-shadow:0 0 20px rgba(245,166,184,0.5);
        `;
        container.appendChild(el);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 2000);
}

// Inject keyframes for sparkle
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleBurst {
        0% { transform: scale(0) rotate(0deg); opacity:1; }
        100% { transform: scale(1) rotate(720deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity:0; }
    }
`;
document.head.appendChild(sparkleStyle);

// ========================================
// MUSIC PLAYER
// ========================================

const audio = new Audio('assets/music/song.mp3');
let isPlaying = false;

const playBtn = document.getElementById('playBtn');
const progressFillMusic = document.getElementById('musicProgress');

playBtn.addEventListener('click', function() {
    if (isPlaying) {
        audio.pause();
        this.textContent = '▶';
    } else {
        audio.play().catch(() => {});
        this.textContent = '⏸';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFillMusic.style.width = pct + '%';
    }
});

document.getElementById('volumeBtn').addEventListener('click', function() {
    audio.muted = !audio.muted;
    this.textContent = audio.muted ? '🔇' : '🔊';
});

// ========================================
// CINEMA MODE
// ========================================

document.getElementById('cinemaToggle').addEventListener('click', function() {
    document.body.classList.toggle('cinema-mode');
    this.classList.toggle('active');
    this.textContent = document.body.classList.contains('cinema-mode') ? '🎬 Exit' : '🎬 Cinema';
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        playBtn.click();
    }
});

// ========================================
// LOG READY
// ========================================

console.log('✨ OUR LITTLE UNIVERSE — Fikri & Zahra ✨');
console.log('💀 Made with love and code 💀');