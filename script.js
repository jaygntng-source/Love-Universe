document.addEventListener("DOMContentLoaded", () => {
    
    // --- APP CHANNELS & STATE CONFIG ---
    const CONFIG = {
        startDate: "2025-01-14T00:00:00",
        easterEggTriggerCount: 5,
        totalMemories: 10,
        totalFoodsPerCouple: 3
    };

    let easterEggCounter = 0;
    let isCinemaMode = false;

    // --- DOM INTERACTION TARGET ELEMENTS ---
    const loadingScreen = document.getElementById("loadingScreen");
    const progressLine = document.getElementById("progressLine");
    const customCursor = document.getElementById("customCursor");
    const easterEggLogo = document.getElementById("easterEggLogo");
    const cinemaToggle = document.getElementById("cinemaToggle");
    const startJourneyBtn = document.getElementById("startJourneyBtn");
    const memoryGalleryGrid = document.getElementById("memoryGalleryGrid");
    const fikriFoodGrid = document.getElementById("fikriFoodGrid");
    const zahraFoodGrid = document.getElementById("zahraFoodGrid");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.getElementById("lightboxClose");
    
    // --- MODERN PREMIUM CUSTOM CURSOR ORCHESTRATION ---
    if (customCursor) {
        document.addEventListener("mousemove", (e) => {
            customCursor.style.left = `${e.clientX}px`;
            customCursor.style.top = `${e.clientY}px`;
        });
        document.addEventListener("mousedown", () => customCursor.style.transform = "translate(-50%, -50%) scale(0.8)");
        document.addEventListener("mouseup", () => customCursor.style.transform = "translate(-50%, -50%) scale(1)");
    }

    // --- LOADING PROGRESS ENGINE ---
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.style.opacity = "0";
                loadingScreen.style.filter = "blur(10px)";
                setTimeout(() => loadingScreen.classList.add("hidden"), 1000);
            }, 400);
        }
        progressLine.style.width = `${progress}%`;
    }, 80);

    // --- NAVIGATION CINEMATIC SMOOTH SCROLL ---
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener("click", () => {
            document.getElementById("counterSection").scrollIntoView({ behavior: "smooth" });
        });
    }

    // --- DYNAMIC REALTIME RELATIONSHIP TIMEPASS GENERATOR ---
    function updateRelationshipCounter() {
        const start = new Date(CONFIG.startDate).getTime();
        const now = new Date().getTime();
        const diff = now - start;

        if (diff < 0) return;

        const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
        
        const years = Math.floor(totalDays / 365);
        const remainingDaysAfterYears = totalDays % 365;
        const months = Math.floor(remainingDaysAfterYears / 30);
        const days = remainingDaysAfterYears % 30;

        document.getElementById("countYears").textContent = String(years).padStart(2, '0');
        document.getElementById("countMonths").textContent = String(months).padStart(2, '0');
        document.getElementById("countDays").textContent = String(days).padStart(2, '0');
    }
    setInterval(updateRelationshipCounter, 1000);
    updateRelationshipCounter();

    // --- INTERSECTION OBSERVER STRUCTURAL VISUAL REVEAL ENGINE ---
    const revealElements = document.querySelectorAll(".reveal");
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

    // --- AUTOMATIC IMAGE ARCHITECTURE MANAGEMENT & FALLBACK CODES ---
    function buildMemoryGallery() {
        memoryGalleryGrid.innerHTML = "";
        for (let i = 1; i <= CONFIG.totalMemories; i++) {
            const card = document.createElement("div");
            card.className = "gallery-card reveal";
            
            const imgPath = `assets/images/memories/photo${i}.jpg`;
            
            card.innerHTML = `
                <img src="${imgPath}" class="gallery-img" alt="Memory Moment ${i}" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');">
                <div class="gallery-card-fallback hidden">
                    <span class="fallback-icon">🖼️</span>
                    <span class="fallback-title">Moment #${i}</span>
                </div>
                <div class="gallery-overlay">
                    <span class="meta-chapter">Chapter ${i}</span>
                    <h4 class="meta-label">Memory Archive</h4>
                    <p class="meta-caption">Another piece of our story</p>
                </div>
            `;
            
            card.addEventListener("click", () => openLightbox(imgPath, `Another piece of our story - Moment ${i}`));
            memoryGalleryGrid.appendChild(card);
            revealObserver.observe(card);
        }
    }

    const favData = {
        fikri: [ { name: "Mie Ayam", file: "fikri1.jpg" }, { name: "Martabak", file: "fikri2.jpg" }, { name: "Americano", file: "fikri3.jpg" } ],
        zahra: [ { name: "Tahu Kucek", file: "zahra1.jpg" }, { name: "Mie Pedas", file: "zahra2.jpg" }, { name: "Matcha", file: "zahra3.jpg" } ]
    };

    function buildFoodGallery(couple, gridElement) {
        gridElement.innerHTML = "";
        favData[couple].forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "food-card";
            const imgPath = `assets/images/food/${item.file}`;
            
            card.innerHTML = `
                <img src="${imgPath}" class="food-img" alt="${item.name}" onerror="this.style.display='none'; this.nextElementSibling.classList.remove('hidden');">
                <div class="gallery-card-fallback hidden" style="height: 100%;">
                    <span class="fallback-icon">🍔</span>
                </div>
                <div class="food-info">${item.name}</div>
            `;
            
            card.addEventListener("click", () => openLightbox(imgPath, item.name));
            gridElement.appendChild(card);
        });
    }

    buildMemoryGallery();
    buildFoodGallery("fikri", fikriFoodGrid);
    buildFoodGallery("zahra", zahraFoodGrid);

    // --- PREMIUM LIGHTBOX ENGINE SYSTEM ---
    function openLightbox(src, captionText) {
        lightboxImg.src = src;
        lightboxCaption.textContent = captionText;
        lightbox.style.display = "flex";
        
        // Dynamic detection for broken images in lightbox view
        lightboxImg.onerror = function() {
            this.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 24 24' fill='none' stroke='%23ffb7c5' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'><rect x='3' y='3' width='18' height='18' rx='2' ry='2'/><circle cx='8.5' cy='8.5' r='1.5'/><polyline points='21 15 16 10 5 21'/></svg>";
        };
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => lightbox.style.display = "none");
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) lightbox.style.display = "none";
        });
    }

    // --- INTERACTIVE LETTER EXPANSION ARCHITECTURE ---
    const letterBox = document.getElementById("letterBox");
    const letterPreview = document.getElementById("letterPreview");
    const letterFullContent = document.getElementById("letterFullContent");

    if (letterBox) {
        letterBox.addEventListener("click", () => {
            letterPreview.classList.add("hidden");
            letterFullContent.classList.remove("hidden");
            letterBox.style.cursor = "default";
        });
    }

    // --- SECRET BOX OPERATIONAL LOGIC ---
    const secretBox = document.getElementById("secretBox");
    const boxClosed = document.getElementById("boxClosed");
    const boxOpen = document.getElementById("boxOpen");

    if (secretBox) {
        secretBox.addEventListener("click", () => {
            boxClosed.classList.add("hidden");
            boxOpen.classList.remove("hidden");
        });
    }

    // --- EASTER EGG BRAND MANAGER CODES ---
    if (easterEggLogo) {
        easterEggLogo.addEventListener("click", () => {
            easterEggCounter++;
            if (easterEggCounter >= CONFIG.easterEggTriggerCount) {
                triggerPremiumEasterEgg();
                easterEggCounter = 0;
            }
        });
    }

    function triggerPremiumEasterEgg() {
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0"; overlay.style.left = "0"; overlay.style.width = "100%"; overlay.style.height = "100%";
        overlay.style.background = "rgba(255, 183, 195, 0.15)";
        overlay.style.backdropFilter = "blur(15px)";
        overlay.style.webkitBackdropFilter = "blur(15px)";
        overlay.style.zIndex = "99999";
        overlay.style.display = "flex"; overlay.style.justifyContent = "center"; overlay.style.alignItems = "center";
        overlay.style.animation = "blurReveal 0.8s ease forwards";

        overlay.innerHTML = `<h2 style="font-family:'Cormorant Garamond', serif; font-size: 2rem; color:#fff; text-shadow:0 0 20px #ffb7c5;">✨ You Discovered Our Secret Multiverse ✨</h2>`;
        document.body.appendChild(overlay);

        setTimeout(() => {
            overlay.style.opacity = "0";
            overlay.style.transition = "opacity 0.8s ease";
            setTimeout(() => overlay.remove(), 800);
        }, 3000);
    }

    // --- GIFT INTEGRATED ANIMATION INTERACTIVE SYSTEM ---
    const openGiftBtn = document.getElementById("openGiftBtn");
    const giftResult = document.getElementById("giftResult");

    if (openGiftBtn) {
        openGiftBtn.addEventListener("click", () => {
            openGiftBtn.style.transform = "scale(0.9) rotate(5deg)";
            setTimeout(() => {
                openGiftBtn.classList.add("hidden");
                giftResult.classList.remove("hidden");
                createSparkleBurst();
            }, 300);
        });
    }

    function createSparkleBurst() {
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement("div");
            sparkle.innerHTML = "✨";
            sparkle.style.position = "fixed";
            sparkle.style.top = "50%"; sparkle.style.left = "50%";
            sparkle.style.fontSize = "1.5rem";
            sparkle.style.pointerEvents = "none";
            sparkle.style.zIndex = "9999";
            sparkle.style.transition = "all 1s cubic-bezier(0.25, 1, 0.5, 1)";
            
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 200 + 50;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            document.body.appendChild(sparkle);

            setTimeout(() => {
                sparkle.style.transform = `translate(${x}px, ${y}px) scale(0)`;
                sparkle.style.opacity = "0";
                setTimeout(() => sparkle.remove(), 1000);
            }, 50);
        }
    }

    // --- iOS HIGH-FIDELITY AUDIO MUSIC CONTROLLER & FALLBACK SYSTEM ---
    const audio = document.getElementById("bgAudio");
    const playBtn = document.getElementById("playBtn");
    const progressBar = document.getElementById("progressBar");
    const volumeBtn = document.getElementById("volumeBtn");
    const volumeBar = document.getElementById("volumeBar");
    const trackStatus = document.getElementById("trackStatus");

    if (audio) {
        audio.addEventListener("error", () => {
            trackStatus.textContent = "Standby Mode";
            progressBar.disabled = true;
            volumeBar.disabled = true;
        });

        audio.addEventListener("canplaythrough", () => {
            trackStatus.textContent = "Ready to Play";
        });

        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                audio.play().then(() => {
                    trackStatus.textContent = "Now Playing";
                    playBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
                }).catch(() => {
                    trackStatus.textContent = "Standby Mode";
                });
            } else {
                audio.pause();
                trackStatus.textContent = "Paused";
                playBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>`;
            }
        });

        audio.addEventListener("timeupdate", () => {
            if(audio.duration) {
                progressBar.value = (audio.currentTime / audio.duration) * 100;
            }
        });

        progressBar.addEventListener("input", () => {
            if(audio.duration) {
                audio.currentTime = (progressBar.value / 100) * audio.duration;
            }
        });

        volumeBar.addEventListener("input", () => {
            audio.volume = volumeBar.value / 100;
        });

        volumeBtn.addEventListener("click", () => {
            audio.muted = !audio.muted;
            volumeBtn.style.opacity = audio.muted ? "0.4" : "0.8";
        });
    }

    // --- IMMERSIVE CINEMA EXPERIENTIAL TOGGLE SYSTEM ---
    if (cinemaToggle) {
        cinemaToggle.addEventListener("click", () => {
            isCinemaMode = !isCinemaMode;
            if (isCinemaMode) {
                document.body.classList.add("cinema-mode");
                document.documentElement.style.setProperty('--cinema-multiplier', '2');
                cinemaToggle.style.background = "var(--primary-pink)";
                cinemaToggle.style.color = var(--deep-blue);
            } else {
                document.body.classList.remove("cinema-mode");
                document.documentElement.style.setProperty('--cinema-multiplier', '1');
                cinemaToggle.style.background = "var(--glass-bg)";
                cinemaToggle.style.color = var(--clean-white);
            }
        });
    }

    // --- 3D PARTICLE GLOWING HEART MATRIX FORMATION ENGINE ---
    const heart3D = document.getElementById("heart3D");
    if (heart3D) {
        const totalParticles = 60;
        for (let i = 0; i < totalParticles; i++) {
            const particle = document.createElement("div");
            particle.className = "heart-particle";
            
            const t = (i / totalParticles) * Math.PI * 2;
            // Native Parametric Mathematical Heart Equation Formulas
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            const zSpread = (Math.random() * 40) - 20;
            const scale = (Math.random() * 0.4) + 0.8;
            
            particle.style.transform = `translate3d(${x * 4}px, ${y * 4}px, ${zSpread}px) scale(${scale})`;
            heart3D.appendChild(particle);
        }
    }
});
