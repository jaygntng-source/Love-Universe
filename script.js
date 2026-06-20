// ========================================
// LOADING SCREEN - FIXED
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const fill = document.getElementById('progressFill');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loading.classList.add('hide');
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 1200);
            }, 400);
        }
        fill.style.width = progress + '%';
    }, 150);

    // FALLBACK - PASTI KELUAR DALAM 5 DETIK
    setTimeout(() => {
        if (progress < 100) {
            progress = 100;
            fill.style.width = '100%';
            clearInterval(interval);
            setTimeout(() => {
                loading.classList.add('hide');
                setTimeout(() => {
                    loading.style.display = 'none';
                }, 1200);
            }, 400);
        }
    }, 5000);
});

// ========================================
// CUSTOM CURSOR
// ========================================

const cursor = document.getElementById('cursor');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mouseover', (e) => {
    if (e.target.closest('button, .gallery-item, .tl-content, .btn, .secret-box')) {
        cursor.classList.add('big');
    } else {
        cursor.classList.remove('big');
    }
});

// ========================================
// OPENING
// ========================================

document.getElementById('startBtn').addEventListener('click', function() {
    const opening = document.getElementById('opening');
    const counter = document.getElementById('counter');

    opening.style.opacity = '0';
    opening.style.transform = 'scale(0.95)';

    setTimeout(() => {
        opening.style.display = 'none';
        counter.classList.add('show');
        counter.scrollIntoView({ behavior: 'smooth' });
    }, 600);
});

// ========================================
// RELATIONSHIP COUNTER
// ========================================

const start = new Date('2025-01-14');

function updateCounter() {
    const now = new Date();
    const diff = now - start;
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
// SCROLL REVEAL
// ========================================

const sections = document.querySelectorAll('.section:not(#opening)');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.15 });

sections.forEach(section => observer.observe(section));

// ========================================
// STORY TEXT REVEAL
// ========================================

const storyTexts = document.querySelectorAll('.story p');

const storyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('show');
            }, i * 300);
        }
    });
}, { threshold: 0.3 });

storyTexts.forEach(text => storyObserver.observe(text));

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

const grid = document.getElementById('memoryGrid');

memories.forEach((img, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.innerHTML = `
        <img src="${img.src}" alt="${img.caption}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect width=%22400%22 height=%22300%22 fill=%22%23f5a6b8%22/%3E%3Ctext x=%2250%%22 y=%2250%%22 font-family=%22Arial%22 font-size=%2220%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EMemory ${i+1}%3C/text%3E%3C/svg%3E'">
        <div class="overlay"><span>${img.caption}</span></div>
    `;
    item.addEventListener('click', () => openLightbox(img.src));
    grid.appendChild(item);
});

// ========================================
// LIGHTBOX
// ========================================

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

document.getElementById('closeLightbox').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

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
    reveal.classList.toggle('hidden');
    this.textContent = reveal.classList.contains('hidden') ? 'Open Gift ✨' : 'Close Gift ✨';
});

// ========================================
// FOOD FAVORITES
// ========================================

const fikriFood = [
    'assets/images/food/fikri1.jpg',
    'assets/images/food/fikri2.jpg',
    'assets/images/food/fikri3.jpg'
];

const zahraFood = [
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
        img.onerror = function() {
            this.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22225%22%3E%3Crect width=%22300%22 height=%22225%22 fill=%22%23e8748a%22/%3E%3Ctext x=%2250%%22 y=%2250%%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22white%22 text-anchor=%22middle%22 dy=%22.3em%22%3EFood%3C/text%3E%3C/svg%3E';
        };
        container.appendChild(img);
    });
}

loadFood('fikriFood', fikriFood);
loadFood('zahraFood', zahraFood);

// ========================================
// EASTER EGG - KLIK LOGO 5X
// ========================================

let clicks = 0;
const title = document.querySelector('.opening-box h1');

title.addEventListener('click', function() {
    clicks++;
    if (clicks === 5) {
        sparkleEffect();
        clicks = 0;
    }
});

function sparkleEffect() {
    const container = document.createElement('div');
    container.style.cssText = `
        position: fixed;
        inset: 0;
        pointer-events: none;
        z-index: 9999;
    `;

    for (let i = 0; i < 50; i++) {
        const el = document.createElement('div');
        el.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 2}px;
            height: ${Math.random() * 10 + 2}px;
            background: radial-gradient(circle, #f5a6b8, #e8748a);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: burst ${Math.random() * 1 + 0.5}s ease forwards;
            box-shadow: 0 0 20px rgba(245,166,184,0.6);
        `;
        container.appendChild(el);
    }

    document.body.appendChild(container);
    setTimeout(() => container.remove(), 2000);
}

// Tambahin keyframes ke style
const style = document.createElement('style');
style.textContent = `
    @keyframes burst {
        0% { transform: scale(0) rotate(0deg); opacity: 1; }
        100% { transform: scale(1) rotate(720deg) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========================================
// MUSIC PLAYER
// ========================================

const audio = new Audio('assets/music/song.mp3');
let isPlaying = false;

const playBtn = document.getElementById('playBtn');
const progressFillMusic = document.getElementById('musicProgress');

playBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶';
    } else {
        audio.play().catch(() => {
            playBtn.textContent = '⏸';
        });
        playBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressFillMusic.style.width = progress + '%';
    }
});

document.getElementById('volumeBtn').addEventListener('click', function() {
    audio.muted = !audio.muted;
    this.textContent = audio.muted ? '🔇' : '🔊';
});

// ========================================
// CINEMA MODE
// ========================================

document.getElementById('cinemaBtn').addEventListener('click', function() {
    document.body.classList.toggle('cinema');
    this.classList.toggle('active');
    this.textContent = document.body.classList.contains('cinema') ? '🎬 Exit Cinema' : '🎬 Cinema Mode';
});

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', (e) => {
    if (e.key === ' ' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        playBtn.click();
    }
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

console.log('✨ OUR LITTLE UNIVERSE — Fikri & Zahra ✨');
console.log('💀 Made with love and code 💀');