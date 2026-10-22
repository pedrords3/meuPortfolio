/*
 * Portfólio — Pedro Rodrigues
 * Animações, idioma, modais de mídia e player da música. Sem dependências.
 */

const state = {
    lang: 'pt',
    scrollY: 0,
    lastScrollY: 0,
    ticking: false,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    finePointer: window.matchMedia('(hover: hover) and (pointer: fine)').matches
};

const dom = {};

const CURSOR_EN = { Jogar: 'Play', Baixar: 'Download', Ver: 'View', Visitar: 'Visit', Abrir: 'Open', Assistir: 'Watch' };

const UI_TEXT = {
    pt: { media: 'Mídias', video: 'Vídeo', image: 'Imagem', play: 'Tocar Four Years On', pause: 'Pausar Four Years On', items: n => `${n} mídia${n === 1 ? '' : 's'}` },
    en: { media: 'Media', video: 'Video', image: 'Image', play: 'Play Four Years On', pause: 'Pause Four Years On', items: n => `${n} item${n === 1 ? '' : 's'}` }
};

/* ---------- utilidades ---------- */

function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
}

function t(value) {
    return typeof value === 'object' && value !== null ? value[state.lang] : value;
}

function storage(action, key, value) {
    try {
        if (action === 'get') return localStorage.getItem(key);
        localStorage.setItem(key, value);
    } catch (e) {
        return null;
    }
}

/* ---------- idioma ---------- */

function initLanguage() {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.dataset.pt = el.innerHTML.trim();
    });

    document.querySelector('.lang-toggle').addEventListener('click', () => {
        setLanguage(state.lang === 'pt' ? 'en' : 'pt');
    });

    const saved = storage('get', 'lang');
    if (saved === 'en') setLanguage('en');
}

function setLanguage(lang) {
    state.lang = lang;
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.querySelectorAll('[data-en]').forEach(el => {
        el.innerHTML = lang === 'en' ? el.dataset.en : el.dataset.pt;
    });
    document.querySelectorAll('.lang-toggle [data-lang]').forEach(el => {
        el.classList.toggle('is-active', el.dataset.lang === lang);
    });
    storage('set', 'lang', lang);

    splitWords();
    updateStatement();
    updateTrackLabel();
    if (dom.mediaDialog.open) renderMedia();
}

/* ---------- intro ---------- */

function initIntro() {
    const intro = document.querySelector('.intro');
    const count = intro.querySelector('.intro__count');
    const bar = intro.querySelector('.intro__bar i');

    const finish = () => {
        document.body.classList.add('is-ready');
        intro.classList.add('is-done');
        window.setTimeout(() => intro.remove(), 1200);
    };

    if (state.reducedMotion) {
        finish();
        return;
    }

    const duration = 1300;
    const start = performance.now();
    function step(now) {
        const p = clamp((now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        count.textContent = String(Math.round(eased * 100)).padStart(3, '0');
        bar.style.transform = `scaleX(${eased})`;
        if (p < 1) requestAnimationFrame(step);
        else window.setTimeout(finish, 180);
    }
    requestAnimationFrame(step);
}

/* ---------- texto animado ---------- */

function splitChars() {
    document.querySelectorAll('.split').forEach(el => {
        const text = el.textContent;
        el.setAttribute('aria-label', text);
        el.innerHTML = [...text].map((char, i) =>
            `<span class="split-char" aria-hidden="true" style="--i:${i}">${char}</span>`
        ).join('');
    });
}

function splitWords() {
    document.querySelectorAll('[data-words]').forEach(el => {
        const words = el.textContent.trim().split(/\s+/);
        el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
    });
    dom.words = [...document.querySelectorAll('[data-words] .word')];
}

function updateStatement() {
    if (!dom.words || !dom.words.length) return;
    if (state.reducedMotion) {
        dom.words.forEach(w => w.classList.add('is-lit'));
        return;
    }
    const el = dom.words[0].parentElement;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // Acende palavra por palavra enquanto o parágrafo atravessa a tela.
    const progress = clamp((vh * 0.85 - rect.top) / (rect.height + vh * 0.35));
    const lit = Math.round(progress * dom.words.length);
    dom.words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
}

/* ---------- reveal e contadores ---------- */

function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (state.reducedMotion || !('IntersectionObserver' in window)) {
        elements.forEach(el => el.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -6%' });
    elements.forEach(el => observer.observe(el));
}

function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    const animate = el => {
        const target = Number(el.dataset.counter);
        const start = performance.now();
        const step = now => {
            const p = clamp((now - start) / 1200);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if (state.reducedMotion || !('IntersectionObserver' in window)) {
        counters.forEach(el => { el.textContent = el.dataset.counter; });
        return;
    }
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            animate(entry.target);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.6 });
    counters.forEach(el => observer.observe(el));
}

/* ---------- ticker ---------- */

function initTicker() {
    const track = document.querySelector('.ticker__track');
    if (!track) return;
    // Duplica o conteúdo para o loop ficar contínuo.
    track.innerHTML += track.innerHTML;
}

/* ---------- parallax, header e nav ---------- */

function updateParallax() {
    if (state.reducedMotion) return;
    dom.parallax.forEach(el => {
        const rect = el.getBoundingClientRect();
        const p = clamp((window.innerHeight - rect.top) / (window.innerHeight + rect.height));
        const amount = Number(el.dataset.parallax || 0);
        el.style.setProperty('--parallax', `${(p - 0.5) * amount * 2}px`);
    });
}

function updateHeader() {
    const y = state.scrollY;
    dom.header.classList.toggle('is-scrolled', y > 40);
    const goingDown = y > state.lastScrollY && y > 300;
    dom.header.classList.toggle('is-hidden', goingDown && !document.body.classList.contains('menu-open'));
    state.lastScrollY = y;

    let current = '';
    dom.sections.forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight * 0.4) current = section.id;
    });
    dom.navLinks.forEach(link => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${current}`);
    });
}

function onScroll() {
    state.ticking = false;
    state.scrollY = window.scrollY;
    updateHeader();
    updateParallax();
    updateStatement();
}

function requestUpdate() {
    if (state.ticking) return;
    state.ticking = true;
    requestAnimationFrame(onScroll);
}

function initScroll() {
    onScroll();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
}

function initMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const close = () => {
        document.body.classList.remove('menu-open');
        toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
        const open = document.body.classList.toggle('menu-open');
        toggle.setAttribute('aria-expanded', String(open));
    });
    dom.navLinks.forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* ---------- cursor e preview dos projetos ---------- */

function initCursor() {
    if (!state.finePointer || state.reducedMotion) return;
    const cursor = document.querySelector('.cursor');
    const label = cursor.querySelector('.cursor__label');
    const preview = document.querySelector('.hover-preview');
    const previewImg = preview.querySelector('img');

    // Posição aplicada direto no evento, sem suavização: a bolha acompanha o ponteiro sem atraso.
    window.addEventListener('pointermove', e => {
        const position = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursor.style.transform = position;
        preview.style.transform = position;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => {
        cursor.classList.remove('is-label');
        preview.classList.remove('is-visible');
    });

    document.addEventListener('pointerover', e => {
        const labelled = e.target.closest('[data-cursor]');
        cursor.classList.toggle('is-label', !!labelled);
        if (labelled) {
            const text = labelled.dataset.cursor;
            label.textContent = state.lang === 'en' ? (CURSOR_EN[text] || text) : text;
        }

        const project = e.target.closest('.project[data-preview]');
        if (project) {
            if (previewImg.getAttribute('src') !== project.dataset.preview) previewImg.src = project.dataset.preview;
            preview.classList.add('is-visible');
        } else {
            preview.classList.remove('is-visible');
        }
    });
}

/* ---------- modais ---------- */

function initDialogs() {
    document.querySelectorAll('dialog').forEach(dialog => {
        dialog.addEventListener('click', e => {
            // Clique no fundo (fora do conteúdo) fecha.
            if (e.target === dialog || e.target.closest('[data-close]')) dialog.close();
        });
        dialog.addEventListener('close', () => {
            document.body.classList.remove('dialog-open');
            if (dialog === dom.mediaDialog) dom.mediaStage.innerHTML = '';
        });
    });
}

function openDialog(dialog) {
    document.body.classList.add('dialog-open');
    dialog.showModal();
}

/* ---------- galeria de mídias ---------- */

const media = { project: '', name: '', index: 0, filter: 'all' };

function initMedia() {
    document.querySelectorAll('.view-media-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            media.project = btn.dataset.project;
            media.name = btn.dataset.projectName;
            media.index = Number(btn.dataset.index || 0);
            media.filter = 'all';
            renderMedia();
            openDialog(dom.mediaDialog);
            // Só dá para rolar a lista depois que o modal está visível.
            dom.mediaThumbs.querySelector('.is-active')?.scrollIntoView({ block: 'nearest' });
        });
    });

    dom.mediaDialog.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            media.filter = btn.dataset.filter;
            renderThumbs();
        });
    });

    dom.mediaDialog.addEventListener('keydown', e => {
        const items = projectMedia[media.project] || [];
        if (e.key === 'ArrowRight') showMedia((media.index + 1) % items.length);
        if (e.key === 'ArrowLeft') showMedia((media.index - 1 + items.length) % items.length);
    });
}

function renderMedia() {
    const ui = UI_TEXT[state.lang];
    document.getElementById('mediaDialogTitle').textContent = `${media.name} — ${ui.media}`;
    renderThumbs();
    showMedia(media.index);
}

function renderThumbs() {
    const items = projectMedia[media.project] || [];
    const ui = UI_TEXT[state.lang];
    const hasVideo = items.some(m => m.type === 'video');
    const hasImage = items.some(m => m.type === 'image');
    dom.mediaDialog.querySelector('.media-filters').hidden = !(hasVideo && hasImage);
    dom.mediaDialog.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.toggle('is-active', btn.dataset.filter === media.filter);
    });

    dom.mediaThumbs.innerHTML = '';
    let count = 0;
    items.forEach((item, index) => {
        if (media.filter !== 'all' && item.type !== media.filter) return;
        count++;
        const thumb = document.createElement('button');
        thumb.type = 'button';
        thumb.className = 'media-thumb' + (index === media.index ? ' is-active' : '');
        thumb.dataset.index = index;
        thumb.innerHTML = `
            <img src="${item.thumbnail || item.path}" alt="" loading="lazy">
            <i class="bi ${item.type === 'video' ? 'bi-play-fill' : 'bi-image'}"></i>
            <span>${t(item.title)}</span>`;
        thumb.addEventListener('click', () => showMedia(index));
        dom.mediaThumbs.appendChild(thumb);
    });

    const counter = document.createElement('p');
    counter.className = 'media-count';
    counter.textContent = ui.items(count);
    dom.mediaThumbs.appendChild(counter);
}

function showMedia(index) {
    const items = projectMedia[media.project] || [];
    const item = items[index];
    if (!item) return;
    media.index = index;
    const ui = UI_TEXT[state.lang];

    if (item.type === 'video') {
        dom.mediaStage.innerHTML = `<video controls autoplay playsinline poster="${item.thumbnail || ''}"><source src="${item.path}" type="video/mp4"></video>`;
        const video = dom.mediaStage.querySelector('video');
        video.play().catch(() => {});
        if (dom.audio && !dom.audio.paused) dom.audio.pause();
    } else {
        dom.mediaStage.innerHTML = `<a href="${item.path}" target="_blank" rel="noopener" class="media-stage__img"><img src="${item.path}" alt="${t(item.title)}"></a>`;
    }

    document.getElementById('mediaType').innerHTML = item.type === 'video'
        ? `<i class="bi bi-play-circle"></i> ${ui.video}`
        : `<i class="bi bi-image"></i> ${ui.image}`;
    document.getElementById('mediaTitle').textContent = t(item.title);
    document.getElementById('mediaDescription').textContent = t(item.description);

    dom.mediaThumbs.querySelectorAll('.media-thumb').forEach(thumb => {
        const active = Number(thumb.dataset.index) === index;
        thumb.classList.toggle('is-active', active);
        if (active) thumb.scrollIntoView({ block: 'nearest' });
    });
}

/* ---------- música ---------- */

function initTrack() {
    const track = document.querySelector('.track');
    const play = track.querySelector('.track__play');
    const icon = play.querySelector('i');
    const bar = track.querySelector('.track__progress i');
    dom.audio = document.getElementById('musicPlayer');
    dom.trackPlay = play;

    play.addEventListener('click', () => {
        if (dom.audio.paused) dom.audio.play().catch(() => {});
        else dom.audio.pause();
    });

    const sync = () => {
        const playing = !dom.audio.paused;
        track.classList.toggle('is-playing', playing);
        icon.className = playing ? 'bi bi-pause-fill' : 'bi bi-play-fill';
        updateTrackLabel();
    };
    dom.audio.addEventListener('play', sync);
    dom.audio.addEventListener('pause', sync);
    dom.audio.addEventListener('ended', sync);
    dom.audio.addEventListener('timeupdate', () => {
        const p = dom.audio.duration ? dom.audio.currentTime / dom.audio.duration : 0;
        bar.style.transform = `scaleX(${p})`;
    });

    track.querySelector('.track__lyrics').addEventListener('click', () => openDialog(dom.lyricsDialog));
}

function updateTrackLabel() {
    if (!dom.audio) return;
    const ui = UI_TEXT[state.lang];
    dom.trackPlay.setAttribute('aria-label', dom.audio.paused ? ui.play : ui.pause);
}

/* ---------- init ---------- */

function cacheDom() {
    dom.header = document.querySelector('.site-header');
    dom.navLinks = [...document.querySelectorAll('.nav a')];
    dom.sections = [...document.querySelectorAll('main section[id]')];
    dom.parallax = [...document.querySelectorAll('[data-parallax]')];
    dom.mediaDialog = document.getElementById('mediaDialog');
    dom.mediaStage = document.getElementById('mediaStage');
    dom.mediaThumbs = document.getElementById('mediaThumbs');
    dom.lyricsDialog = document.getElementById('lyricsDialog');
}

function init() {
    cacheDom();
    splitChars();
    initLanguage();
    if (!dom.words) splitWords();
    initIntro();
    initTicker();
    initReveal();
    initCounters();
    initMenu();
    initCursor();
    initDialogs();
    initMedia();
    initTrack();
    initScroll();
}

document.addEventListener('DOMContentLoaded', init, { once: true });
