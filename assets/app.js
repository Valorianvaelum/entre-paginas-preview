(() => {
  'use strict';
  const data = window.BOOK_CONTENT;
  if (!data || !Array.isArray(data.modules)) return;

  const prefix = 'entre-paginas-v1:';
  const storageAvailable = (() => {
    try {
      const probe = prefix + '__probe';
      localStorage.setItem(probe, '1');
      localStorage.removeItem(probe);
      return true;
    } catch {
      return false;
    }
  })();

  const safeRead = (key, fallback) => {
    if (!storageAvailable) return fallback;
    try {
      const v = localStorage.getItem(prefix + key);
      return v === null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  };

  const safeWrite = (key, value) => {
    if (!storageAvailable) return false;
    try {
      localStorage.setItem(prefix + key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  };

  const sanitizeComplete = (val) => {
    if (!Array.isArray(val)) return [];
    const valid = new Set(data.modules.map((m) => m.id));
    return [...new Set(val.map(Number).filter((n) => Number.isInteger(n) && valid.has(n)))].sort((a, b) => a - b);
  };

  const sanitizeNotes = (val) => {
    if (!val || typeof val !== 'object' || Array.isArray(val)) return {};
    const out = {};
    for (const [k, v] of Object.entries(val)) {
      if (typeof v === 'string') out[String(k)] = v;
    }
    return out;
  };

  const sanitizeEnum = (val, allowed, fallback) => (allowed.includes(val) ? val : fallback);

  const sanitizeLast = (val) => {
    const n = Number(val);
    return Number.isInteger(n) && data.modules.some((m) => m.id === n) ? n : 1;
  };

  const state = {
    complete: sanitizeComplete(safeRead('completed', [])),
    notes: sanitizeNotes(safeRead('notes', {})),
    size: sanitizeEnum(safeRead('size', 'regular'), ['small', 'regular', 'large'], 'regular'),
    theme: sanitizeEnum(safeRead('theme', 'light'), ['light', 'dark'], 'light'),
    last: sanitizeLast(safeRead('last', 1)),
    focus: Boolean(safeRead('focus', false)),
  };

  const LAB_CONTENT = {
    promptParts: [
      { key: 'rol', label: '1. Rol', seg: 'Actuá como asistente metodológico en Trabajo Social.', hint: 'Acota la perspectiva disciplinar y el criterio técnico esperado.' },
      { key: 'contexto', label: '2. Contexto', seg: 'Estoy explorando barreras de acceso a programas sociales en un territorio aún no definido.', hint: 'Delimita la situación, población y etapa exploratoria.' },
      { key: 'objetivo', label: '3. Objetivo', seg: 'Proponé una matriz preliminar de dimensiones, indicadores y fuentes posibles.', hint: 'Define el producto concreto que necesitás construir.' },
      { key: 'restricciones', label: '4. Restricciones', seg: 'Diferenciá hipótesis de evidencia; no inventes datos, testimonios ni citas.', hint: 'Evita alucinaciones y separa lo observado de lo supuesto.' },
      { key: 'formato', label: '5. Formato', seg: 'Presentá la respuesta en una tabla y cerrá con cinco preguntas que necesito resolver.', hint: 'Ordena la salida para revisarla con claridad.' },
    ],
    rScript: `# Ejercicio reproducible - DATOS FICTICIOS\ndatos <- read.csv("datos_practica_ts.csv", fileEncoding="UTF-8-BOM", stringsAsFactors=FALSE)\nstopifnot(nrow(datos) == 10, ncol(datos) == 5, !anyNA(datos),\n          all(datos$zona %in% c("Urbana", "Rural")), all(datos$acceso %in% c(0, 1)))\nstr(datos)\nprint(colSums(is.na(datos)))\ntabla <- table(datos$zona, datos$acceso, dnn = c("Zona", "Acceso (0=No, 1=Si)"))\nprint(tabla)\nprint(round(prop.table(tabla, 1) * 100, 1))\nprint(aggregate(distancia_km ~ zona, data = datos, FUN = mean))\nboxplot(distancia_km ~ zona, data = datos, main="Distancia (datos ficticios)", ylab="km")`,
    stataScript: `* ATENCION: import delimited ..., clear descarta datos previos en memoria.\nimport delimited using "datos_practica_ts.csv", clear varnames(1) encoding("UTF-8")\ndescribe\nassert _N == 10\nassert inlist(acceso, 0, 1)\nassert inlist(zona, "Urbana", "Rural")\nmisstable summarize\nlabel define lbl_acceso 0 "Sin acceso" 1 "Con acceso"\nlabel values acceso lbl_acceso\ntabulate zona acceso, row\ntabstat distancia_km, by(zona) statistics(n mean sd min max)\ngraph box distancia_km, over(zona)`,
    interviews: [
      { id: 'Entrevista 01 (Ficticia)', text: 'Tuve que viajar varias veces porque cada vez me pedían un papel diferente. El colectivo me salía caro y no siempre tenía plata para volver.' },
      { id: 'Entrevista 02 (Ficticia)', text: 'Me enteré del programa por una vecina. Antes había ido a consultar, pero nadie me explicó bien qué documentación necesitaba.' },
      { id: 'Entrevista 03 (Ficticia)', text: 'Cuando finalmente conseguí presentar los papeles, me dijeron que debía esperar. Pasaron varias semanas y no sabía dónde consultar el estado del trámite.' },
    ],
  };

  const PAUSE_QUOTES = {
    1: 'Preguntar con precisión ya es parte del método.',
    2: 'Ordenar las fuentes protege tanto el rigor como a las personas.',
    3: 'Un buen diseño aclara qué se sabe y qué falta comprobar.',
    4: 'Los números descriptivos invitan a hacerse mejores preguntas, no a forzar causas.',
    5: 'Cada relato conserva un matiz que ninguna categoría automática debería borrar.',
    6: 'Comunicar con honestidad vale más que llenar páginas con cifras supuestas.',
    7: 'El criterio profesional nunca se delega: la herramienta acompaña, vos decidís.',
  };

  const $ = (selector) => document.querySelector(selector);
  const create = (tag, cls, value) => {
    const el = document.createElement(tag);
    if (cls) el.className = cls;
    if (value !== undefined) el.textContent = value;
    return el;
  };

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const svgEl = (tag, attrs = {}, text) => {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, String(v));
    if (text !== undefined) el.textContent = text;
    return el;
  };

  const notify = (message) => {
    const el = $('#toast');
    if (!el) return;
    el.textContent = message;
    el.classList.add('show');
    clearTimeout(notify.timer);
    notify.timer = setTimeout(() => el.classList.remove('show'), 2400);
  };

  let pendingNoteTimer = null;
  let pendingNoteDirty = false;
  let activeNoteChapterId = null;
  let lastValidHash = '#inicio';
  let openingFromCover = false;

  function flushPendingNotes(statusEl) {
    if (pendingNoteTimer) {
      clearTimeout(pendingNoteTimer);
      pendingNoteTimer = null;
    }
    if (!pendingNoteDirty) return true;
    const activeInput = $('#chapter-note');
    if (activeInput && activeNoteChapterId !== null) {
      state.notes[activeNoteChapterId] = activeInput.value;
    }
    pendingNoteDirty = false;
    const saved = safeWrite('notes', state.notes);
    const targetStatus = statusEl || $('#journal-status');
    if (targetStatus) {
      targetStatus.textContent = saved
        ? 'Tus notas están guardadas en este navegador.'
        : 'Almacenamiento no disponible: usá “Descargar mis notas (.txt)” para conservar tus apuntes.';
    }
    return saved;
  }

  function exportAllNotes() {
    flushPendingNotes();
    const lines = [
      'ENTRE PÁGINAS — CUADERNO DE LECTURA (RESPALDO LOCAL)',
      'Manual de IA aplicada al Trabajo Social',
      'Nota: este archivo es de uso personal. No incluyas datos personales ni historias reales.',
      '',
    ];
    let count = 0;
    for (const ch of data.modules) {
      const content = (state.notes[ch.id] || '').trim();
      if (!content) continue;
      count += 1;
      lines.push('==================================================');
      lines.push(`Capítulo ${String(ch.id).padStart(2, '0')} — ${ch.title}`);
      lines.push('==================================================');
      lines.push(content);
      lines.push('');
    }
    if (!count) {
      notify('Todavía no escribiste notas para descargar.');
      return;
    }
    try {
      const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'entre_paginas_mis_notas.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      notify('Notas descargadas en formato .txt.');
    } catch {
      notify('No se pudo iniciar la descarga de notas.');
    }
  }

  function applyPreferences() {
    document.documentElement.dataset.theme = state.theme;
    document.documentElement.dataset.size = state.size;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', state.theme === 'dark' ? '#131615' : '#F4F1EA');
    }
    document.querySelectorAll('[data-theme],[data-size]').forEach((b) => {
      const key = b.dataset.theme ? 'theme' : 'size';
      const val = b.dataset.theme || b.dataset.size;
      const on = state[key] === val;
      b.classList.toggle('selected', on);
      b.setAttribute('aria-pressed', String(on));
    });
    const grid = $('.body-grid');
    if (grid) grid.classList.toggle('focus-mode', state.focus);
    const focusBtn = $('#toggle-focus');
    if (focusBtn) {
      focusBtn.classList.toggle('active', state.focus);
      focusBtn.setAttribute('aria-pressed', String(state.focus));
    }
    const storageNote = $('#storage-status-note');
    if (storageNote && !storageAvailable) {
      storageNote.textContent = 'Tu navegador restringe el almacenamiento local en esta sesión. Podés descargar tus notas en .txt antes de cerrar.';
    }
  }

  function updateNavigation(route) {
    const navContainer = $('#chapter-nav');
    navContainer.replaceChildren();
    for (const chapter of data.modules) {
      const a = create('a', 'nav-link');
      a.href = '#capitulo-' + chapter.id;
      a.dataset.route = String(chapter.id);
      a.append(
        create('span', 'nav-symbol', String(chapter.id).padStart(2, '0')),
        create('span', '', chapter.title)
      );
      if (state.complete.includes(chapter.id)) {
        const mark = create('span', 'nav-complete', '✓');
        mark.setAttribute('aria-label', 'leído');
        a.append(mark);
      }
      navContainer.append(a);
    }
    document.querySelectorAll('.nav-link').forEach((a) => {
      const on = a.dataset.route === route;
      a.classList.toggle('active', on);
      if (on) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    const navEl = $('.sidebar nav');
    const activeNav = navEl ? navEl.querySelector('.nav-link.active') : null;
    if (navEl && activeNav && navEl.scrollWidth > navEl.clientWidth) {
      navEl.scrollLeft = Math.max(0, activeNav.offsetLeft - navEl.clientWidth / 2 + activeNav.offsetWidth / 2);
    }
    $('#global-progress').textContent = `${state.complete.length} de ${data.modules.length}`;
    $('#global-bar').style.width = `${(state.complete.length / data.modules.length) * 100}%`;
  }

  /* Ilustraciones conceptuales vectoriales ligeras para la portada y cada uno de los 7 capítulos */
  function buildCoverIllustration() {
    const fig = create('figure', 'cover-art-panel');
    const svg = svgEl('svg', {
      viewBox: '0 0 460 206',
      role: 'img',
      'aria-label': 'Ilustración cartográfica territorial: núcleo urbano a 3,2 km y zona rural a 22,0 km del caso ficticio',
    });
    svg.append(
      svgEl('rect', { width: 460, height: 206, rx: 8, fill: 'var(--paper)' }),
      svgEl('path', { d: 'M0 156 Q120 105 240 144 T460 120', fill: 'none', stroke: 'var(--line)', 'stroke-width': 1.5 }),
      svgEl('path', { d: 'M0 180 Q150 130 280 162 T460 148', fill: 'none', stroke: 'var(--line)', 'stroke-width': 1.2, 'stroke-dasharray': '4 4' }),
      svgEl('circle', { cx: 118, cy: 86, r: 40, fill: 'var(--green-soft)', stroke: 'var(--green)', 'stroke-width': 1.5 }),
      svgEl('circle', { cx: 118, cy: 86, r: 6, fill: 'var(--green)' }),
      svgEl('path', { d: 'M102 72 L118 86 M134 72 L118 86 M102 100 L118 86 M134 100 L118 86', stroke: 'var(--green)', 'stroke-width': 1.4 }),
      svgEl('text', { x: 118, y: 146, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 11, 'font-weight': 700, fill: 'var(--green)' }, 'ZONA URBANA · ~3,2 KM'),
      svgEl('path', { d: 'M158 86 C228 86, 260 118, 340 96', fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2, 'stroke-dasharray': '6 5' }),
      svgEl('circle', { cx: 344, cy: 96, r: 32, fill: 'var(--accent-soft)', stroke: 'var(--accent)', 'stroke-width': 1.5 }),
      svgEl('circle', { cx: 334, cy: 86, r: 4, fill: 'var(--accent)' }),
      svgEl('circle', { cx: 354, cy: 105, r: 4, fill: 'var(--accent)' }),
      svgEl('circle', { cx: 350, cy: 84, r: 4, fill: 'var(--accent)' }),
      svgEl('text', { x: 344, y: 146, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 11, 'font-weight': 700, fill: 'var(--accent)' }, 'ZONA RURAL · ~22,0 KM')
    );
    const cap = create('figcaption', 'plate-caption', 'Lámina de apertura — Caso transversal ficticio: barreras territoriales e informativas de acceso a programas sociales.');
    fig.append(svg, cap);
    return fig;
  }

  function renderChapterIllustration(id) {
    const fig = create('figure', 'chapter-illustration');
    const captions = {
      1: 'Lámina I — Los cinco elementos estructuran el pedido antes de revisar supuestos.',
      2: 'Lámina II — Espacio organizado por proyecto: fuentes públicas o ficticias, nunca casos reales.',
      3: 'Lámina III — Diálogo entre enfoques cuantitativo, cualitativo y mixto con búsqueda verificable.',
      4: 'Lámina IV — Base ficticia (N = 10): contraste descriptivo sin inferencia causal.',
      5: 'Lámina V — Tres relatos ficticios enlazados a códigos y memos trazables en ATLAS.ti.',
      6: 'Lámina VI — De hechos estrictamente conocidos al borrador institucional revisado.',
      7: 'Lámina VII — Protocolo de revisión en seis pasos bajo criterio profesional.',
    };
    const svg = svgEl('svg', {
      viewBox: '0 0 360 180',
      role: 'img',
      'aria-label': captions[id] || 'Ilustración conceptual del capítulo',
    });
    svg.append(svgEl('rect', { width: 360, height: 180, rx: 8, fill: 'var(--paper)' }));

    if (id === 1) {
      svg.append(
        svgEl('circle', { cx: 180, cy: 90, r: 58, fill: 'var(--green-soft)', stroke: 'var(--green)', 'stroke-width': 1.5 }),
        svgEl('polygon', { points: '180,32 235,72 214,136 146,136 125,72', fill: 'none', stroke: 'var(--accent)', 'stroke-width': 1.8 }),
        svgEl('circle', { cx: 180, cy: 90, r: 5, fill: 'var(--green)' }),
        svgEl('text', { x: 180, y: 22, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, 'ROL · CONTEXTO · OBJETIVO'),
        svgEl('text', { x: 180, y: 164, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--accent)' }, 'RESTRICCIONES · FORMATO')
      );
    } else if (id === 2) {
      svg.append(
        svgEl('rect', { x: 54, y: 36, width: 112, height: 112, rx: 8, fill: 'var(--green-soft)', stroke: 'var(--green)', 'stroke-width': 1.5 }),
        svgEl('rect', { x: 194, y: 36, width: 112, height: 112, rx: 8, fill: 'var(--accent-soft)', stroke: 'var(--accent)', 'stroke-width': 1.5 }),
        svgEl('path', { d: 'M74 68 H146 M74 88 H146 M74 108 H126', stroke: 'var(--green)', 'stroke-width': 2 }),
        svgEl('circle', { cx: 250, cy: 84, r: 22, fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2 }),
        svgEl('path', { d: 'M240 84 L248 92 L262 76', fill: 'none', stroke: 'var(--accent)', 'stroke-width': 2 }),
        svgEl('text', { x: 110, y: 134, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, 'FUENTE CITADA'),
        svgEl('text', { x: 250, y: 134, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--accent)' }, 'PRIVACIDAD')
      );
    } else if (id === 3) {
      svg.append(
        svgEl('circle', { cx: 145, cy: 86, r: 44, fill: 'var(--green-soft)', opacity: 0.9, stroke: 'var(--green)', 'stroke-width': 1.5 }),
        svgEl('circle', { cx: 215, cy: 86, r: 44, fill: 'var(--accent-soft)', opacity: 0.8, stroke: 'var(--accent)', 'stroke-width': 1.5 }),
        svgEl('text', { x: 120, y: 89, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, 'CUANTI'),
        svgEl('text', { x: 240, y: 89, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--accent)' }, 'CUALI'),
        svgEl('text', { x: 180, y: 158, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--ochre)' }, 'DISEÑOS + BÚSQUEDA AND / OR')
      );
    } else if (id === 4) {
      svg.append(
        svgEl('text', { x: 24, y: 34, 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, 'RESULTADOS ESPERADOS · N = 10'),
        svgEl('text', { x: 24, y: 66, 'font-family': 'Lora, serif', 'font-size': 13, fill: 'var(--ink)' }, 'Urbana (5/5 acceso)'),
        svgEl('rect', { x: 24, y: 76, width: 46, height: 18, rx: 4, fill: 'var(--green)' }),
        svgEl('text', { x: 78, y: 89, 'font-family': 'DM Sans, sans-serif', 'font-size': 12, 'font-weight': 700, fill: 'var(--green)' }, '3,2 km'),
        svgEl('text', { x: 24, y: 124, 'font-family': 'Lora, serif', 'font-size': 13, fill: 'var(--ink)' }, 'Rural (0/5 acceso)'),
        svgEl('rect', { x: 24, y: 134, width: 250, height: 18, rx: 4, fill: 'var(--accent)' }),
        svgEl('text', { x: 282, y: 147, 'font-family': 'DM Sans, sans-serif', 'font-size': 12, 'font-weight': 700, fill: 'var(--accent)' }, '22,0 km')
      );
    } else if (id === 5) {
      svg.append(
        svgEl('rect', { x: 28, y: 32, width: 88, height: 32, rx: 6, fill: 'var(--green-soft)', stroke: 'var(--green)' }),
        svgEl('rect', { x: 28, y: 74, width: 88, height: 32, rx: 6, fill: 'var(--green-soft)', stroke: 'var(--green)' }),
        svgEl('rect', { x: 28, y: 116, width: 88, height: 32, rx: 6, fill: 'var(--green-soft)', stroke: 'var(--green)' }),
        svgEl('path', { d: 'M116 48 L210 90 M116 90 L210 90 M116 132 L210 90', stroke: 'var(--accent)', 'stroke-width': 1.6, 'stroke-dasharray': '4 3' }),
        svgEl('rect', { x: 210, y: 54, width: 122, height: 72, rx: 10, fill: 'var(--accent-soft)', stroke: 'var(--accent)', 'stroke-width': 1.5 }),
        svgEl('text', { x: 72, y: 52, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, 'RELATO 01'),
        svgEl('text', { x: 72, y: 94, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, 'RELATO 02'),
        svgEl('text', { x: 72, y: 136, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, 'RELATO 03'),
        svgEl('text', { x: 271, y: 86, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--accent)' }, 'CÓDIGOS + MEMO'),
        svgEl('text', { x: 271, y: 104, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, fill: 'var(--ink)' }, 'ATLAS.ti')
      );
    } else if (id === 6) {
      svg.append(
        svgEl('rect', { x: 36, y: 54, width: 84, height: 72, rx: 8, fill: 'var(--green-soft)', stroke: 'var(--green)' }),
        svgEl('path', { d: 'M126 90 H164', stroke: 'var(--ochre)', 'stroke-width': 2 }),
        svgEl('rect', { x: 170, y: 44, width: 154, height: 92, rx: 8, fill: 'var(--paper-verso)', stroke: 'var(--accent)', 'stroke-width': 1.5 }),
        svgEl('text', { x: 78, y: 86, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, '4 TALLERES'),
        svgEl('text', { x: 78, y: 104, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, fill: 'var(--ink)' }, '35 personas'),
        svgEl('text', { x: 247, y: 84, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 11, 'font-weight': 700, fill: 'var(--accent)' }, 'BORRADOR REVISADO'),
        svgEl('text', { x: 247, y: 104, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, fill: 'var(--ink)' }, 'Word · DOCX · PDF')
      );
    } else {
      svg.append(
        svgEl('path', { d: 'M180 28 L254 54 V102 C254 134 218 154 180 162 C142 154 106 134 106 102 V54 Z', fill: 'var(--green-soft)', stroke: 'var(--green)', 'stroke-width': 1.8 }),
        svgEl('path', { d: 'M158 92 L174 108 L206 74', fill: 'none', stroke: 'var(--accent)', 'stroke-width': 3 }),
        svgEl('text', { x: 180, y: 140, 'text-anchor': 'middle', 'font-family': 'DM Sans, sans-serif', 'font-size': 10, 'font-weight': 700, fill: 'var(--green)' }, '6 PASOS DE AUDITORÍA')
      );
    }

    fig.append(svg, create('figcaption', 'plate-caption', captions[id] || ''));
    return fig;
  }

  function appendRichText(parent, text) {
    const urlPattern = /(https:\/\/[^\s]+)/g;
    const parts = String(text).split(urlPattern);
    parts.forEach((part) => {
      if (!part) return;
      if (part.startsWith('https://')) {
        const clean = part.replace(/[.,;)]+$/, '');
        const trailing = part.slice(clean.length);
        const link = create('a', '', clean);
        link.href = clean;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        parent.append(link);
        if (trailing) parent.append(document.createTextNode(trailing));
      } else {
        parent.append(document.createTextNode(part));
      }
    });
  }

  function buildPromptBox(block, chapterId) {
    const box = create('section', 'prompt-box reveal-item');
    const head = create('div', 'prompt-top');
    head.append(create('strong', '', 'PARA PROBAR EN CHATGPT'));
    const btn = create('button', 'copy-btn', 'Copiar instrucción');
    btn.type = 'button';
    btn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(block.text);
        } else {
          throw new Error('clipboard unavailable');
        }
        notify('Instrucción copiada.');
      } catch {
        notify('No se pudo copiar automáticamente. Seleccioná el texto manualmente.');
      }
    });
    head.append(btn);
    const bodyP = create('p', '', block.text);
    box.append(head, bodyP);

    if (chapterId === 1) {
      const anatomy = create('div', 'prompt-anatomy');
      const pills = create('div', 'anatomy-pills');
      pills.setAttribute('role', 'group');
      pills.setAttribute('aria-label', 'Inspeccionar los cinco elementos del prompt');
      const note = create('p', 'anatomy-note', LAB_CONTENT.promptParts[0].hint);

      const renderHighlight = (activeKey) => {
        bodyP.replaceChildren();
        LAB_CONTENT.promptParts.forEach((part, idx) => {
          const span = create('span', part.key === activeKey ? 'anatomy-highlight' : '', part.seg);
          bodyP.append(span);
          if (idx < LAB_CONTENT.promptParts.length - 1) bodyP.append(document.createTextNode(' '));
        });
      };

      LAB_CONTENT.promptParts.forEach((part, idx) => {
        const pill = create('button', 'anatomy-pill' + (idx === 0 ? ' active' : ''), part.label);
        pill.type = 'button';
        pill.setAttribute('aria-pressed', String(idx === 0));
        pill.addEventListener('click', () => {
          pills.querySelectorAll('.anatomy-pill').forEach((b) => {
            const on = b === pill;
            b.classList.toggle('active', on);
            b.setAttribute('aria-pressed', String(on));
          });
          renderHighlight(part.key);
          note.textContent = part.hint;
        });
        pills.append(pill);
      });

      renderHighlight(LAB_CONTENT.promptParts[0].key);
      anatomy.append(pills, note);
      box.append(anatomy);
    }

    return box;
  }

  function buildLabExplorer(chapterId) {
    if (chapterId === 4) {
      const box = create('section', 'lab-explorer');
      box.setAttribute('aria-label', 'Mesa de laboratorio interactiva');
      const head = create('div', 'lab-header');
      head.append(create('span', 'lab-eyebrow', 'Mesa de laboratorio · 10 casos ficticios'));
      const tabs = create('div', 'lab-tabs');
      tabs.setAttribute('role', 'tablist');

      const panels = [
        { id: 'bars', label: 'Gráfico de control' },
        { id: 'r', label: 'analisis_RStudio.R' },
        { id: 'stata', label: 'analisis_Stata.do' },
      ];

      const panelWrap = create('div');
      const buildPanel = (key) => {
        const p = create('div', 'lab-panel' + (key === 'bars' ? ' active' : ''));
        p.dataset.panel = key;
        if (key === 'bars') {
          const bars = create('div', 'lab-bars');
          [
            { title: 'Zona Urbana (5 de 5 con acceso)', val: '3,2 km media', cls: 'lab-fill-urb' },
            { title: 'Zona Rural (0 de 5 con acceso)', val: '22,0 km media', cls: 'lab-fill-rur' },
          ].forEach((row) => {
            const card = create('div', 'lab-bar-card');
            const meta = create('div', 'lab-bar-meta');
            meta.append(create('span', '', row.title), create('span', '', row.val));
            const track = create('div', 'lab-track');
            track.append(create('div', row.cls));
            card.append(meta, track);
            bars.append(card);
          });
          p.append(bars);
        } else {
          const pre = create('pre', 'lab-code', key === 'r' ? LAB_CONTENT.rScript : LAB_CONTENT.stataScript);
          p.append(pre);
        }
        return p;
      };

      panels.forEach((item, idx) => {
        const btn = create('button', 'lab-tab' + (idx === 0 ? ' active' : ''), item.label);
        btn.type = 'button';
        btn.setAttribute('role', 'tab');
        btn.setAttribute('aria-selected', String(idx === 0));
        btn.addEventListener('click', () => {
          tabs.querySelectorAll('.lab-tab').forEach((t) => {
            const on = t === btn;
            t.classList.toggle('active', on);
            t.setAttribute('aria-selected', String(on));
          });
          panelWrap.querySelectorAll('.lab-panel').forEach((pl) => {
            pl.classList.toggle('active', pl.dataset.panel === item.id);
          });
        });
        tabs.append(btn);
        panelWrap.append(buildPanel(item.id));
      });

      box.append(head, tabs, panelWrap);
      return box;
    }

    if (chapterId === 5) {
      const box = create('section', 'lab-explorer');
      box.setAttribute('aria-label', 'Lectura de entrevistas ficticias');
      const head = create('div', 'lab-header');
      head.append(create('span', 'lab-eyebrow', 'Testimonios ficticios de práctica · ATLAS.ti'));
      box.append(head);
      LAB_CONTENT.interviews.forEach((item) => {
        const q = create('blockquote', 'interview-quote');
        q.append(create('strong', '', item.id), document.createTextNode(item.text));
        box.append(q);
      });
      return box;
    }

    return null;
  }

  function renderBlock(block, options = {}) {
    if (block.type === 'prompt') {
      return buildPromptBox(block, options.chapterId);
    }

    if (block.type === 'table') {
      const wrap = create('div', 'table-wrap');
      wrap.tabIndex = 0;
      wrap.setAttribute('role', 'region');
      wrap.setAttribute('aria-label', 'Tabla de referencia');
      const table = create('table');
      const rows = Array.isArray(block.rows) ? block.rows : [];
      if (rows.length > 0) {
        const thead = create('thead');
        const headRow = create('tr');
        rows[0].forEach((cell) => {
          const th = create('th', '', cell);
          th.scope = 'col';
          headRow.append(th);
        });
        thead.append(headRow);
        table.append(thead);
      }
      if (rows.length > 1) {
        const tbody = create('tbody');
        rows.slice(1).forEach((r) => {
          const tr = create('tr');
          r.forEach((cell) => tr.append(create('td', '', cell)));
          tbody.append(tr);
        });
        table.append(tbody);
      }
      wrap.append(table);
      return wrap;
    }

    if (block.type === 'h2') {
      const h2 = create('h2', '', block.text);
      if (options.sectionPrefix) {
        h2.id = `${options.sectionPrefix}-${options.index}`;
        h2.tabIndex = -1;
      }
      return h2;
    }

    if (block.type === 'h3') return create('h3', '', block.text);
    if (block.type === 'li') {
      const li = create('li');
      appendRichText(li, block.text);
      return li;
    }

    const pText = String(block.text || '');
    if (/^(Control:|Interpretación:|Caso transversal|ESTADO:|Nota editorial:)/.test(pText)) {
      const callout = create('div', 'callout-box');
      const p = create('p');
      appendRichText(p, pText);
      callout.append(p);
      return callout;
    }

    const p = create('p', options.isFirstParagraph ? 'first-paragraph' : '');
    appendRichText(p, pText);
    return p;
  }

  function renderBlocksList(blocks, container, sectionPrefix = '', chapterId = null) {
    let ul = null;
    let ol = null;
    let assignedDropcap = false;
    const headings = [];

    blocks.forEach((block, index) => {
      if (block.type === 'li') {
        ol = null;
        if (!ul) {
          ul = create('ul');
          container.append(ul);
        }
        ul.append(renderBlock(block, { chapterId }));
        return;
      }

      const numberedMatch = block.type === 'p' ? /^\d+\.\s+(.+)$/.exec(block.text || '') : null;
      if (numberedMatch) {
        ul = null;
        if (!ol) {
          ol = create('ol', 'steps-list');
          container.append(ol);
        }
        const li = create('li');
        appendRichText(li, numberedMatch[1]);
        ol.append(li);
        return;
      }

      ul = null;
      ol = null;
      const isPlainLeadP =
        chapterId !== null &&
        !assignedDropcap &&
        block.type === 'p' &&
        !/^(Control:|Interpretación:|Caso transversal|ESTADO:|Nota editorial:)/.test(block.text || '');
      if (isPlainLeadP) assignedDropcap = true;

      const node = renderBlock(block, { sectionPrefix, index, chapterId, isFirstParagraph: isPlainLeadP });
      if (block.type === 'h2' && sectionPrefix) {
        headings.push({ id: node.id, text: block.text });
      }
      container.append(node);
    });

    return headings;
  }

  /* Ilustración física de los tres libros en portada + separación por cursor o toque */
  function buildHeroBooks(versoContainer) {
    const wrap = create('div', 'hero-illustration');
    wrap.setAttribute('role', 'button');
    wrap.tabIndex = 0;
    wrap.setAttribute('aria-label', 'Acomodar libros ilustrados sobre el escritorio');
    const stack = create('div', 'books');
    stack.setAttribute('aria-hidden', 'true');
    ['book-one', 'book-two', 'book-three'].forEach((cls) => {
      const layer = create('div', `book-layer layer-${cls}`);
      const book = create('div', `book-shape ${cls}`);
      book.append(create('span', 'book-pages'));
      layer.append(book);
      stack.append(layer);
    });
    wrap.append(stack);

    const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let fanTimer = null;
    const triggerFan = () => {
      if (reduceMotion()) return;
      clearTimeout(fanTimer);
      stack.style.removeProperty('--book-spread');
      stack.classList.add('is-fanned');
      fanTimer = setTimeout(() => stack.classList.remove('is-fanned'), 1100);
    };

    wrap.addEventListener('click', (e) => {
      if (e.detail === 0 || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        triggerFan();
      } else {
        triggerFan();
      }
    });
    wrap.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerFan();
      }
    });

    if (versoContainer) {
      versoContainer.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || reduceMotion()) return;
        const rect = versoContainer.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        const overBooks = Boolean(e.target && e.target.closest && e.target.closest('.hero-illustration'));
        stack.style.setProperty('--book-dx', (nx * 6).toFixed(2) + 'px');
        stack.style.setProperty('--book-dy', (ny * 4.5).toFixed(2) + 'px');
        stack.style.setProperty('--book-spread', overBooks ? '1' : '0.65');
      });
      versoContainer.addEventListener('pointerleave', (e) => {
        if (e.pointerType !== 'mouse') return;
        stack.style.removeProperty('--book-dx');
        stack.style.removeProperty('--book-dy');
        stack.style.removeProperty('--book-spread');
      });
    }
    return wrap;
  }

  let activeMotionObserver = null;
  function setupEditorialMotion(container) {
    if (activeMotionObserver) {
      activeMotionObserver.disconnect();
      activeMotionObserver = null;
    }
    const items = Array.from(container.querySelectorAll('.reveal-item'));
    if (!items.length) return;

    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || typeof IntersectionObserver === 'undefined') {
      items.forEach((el) => el.classList.add('is-visible', 'is-settled'));
      return;
    }

    const revealElement = (el, delayMs) => {
      el.style.setProperty('--stagger-delay', `${delayMs}ms`);
      el.classList.add('is-visible');
      setTimeout(() => {
        el.classList.add('is-settled');
        el.style.removeProperty('--stagger-delay');
      }, 650 + delayMs);
    };

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!container.isConnected) return;
        activeMotionObserver = new IntersectionObserver(
          (entries, obs) => {
            let batchIndex = 0;
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                revealElement(entry.target, batchIndex * 75);
                batchIndex += 1;
                obs.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05, rootMargin: '24px 0px -12px 0px' }
        );

        let initialBatch = 0;
        items.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.96) {
            revealElement(el, initialBatch * 75);
            initialBatch += 1;
          } else {
            activeMotionObserver.observe(el);
          }
        });
      });
    });
  }

  function makePage(kind = '') {
    return create('div', 'page ' + kind);
  }

  function renderIntro() {
    const page = makePage('home-page');
    const spread = create('section', 'book-spread');
    spread.setAttribute('aria-label', 'Portada e índice del libro');

    const verso = create('div', 'page-verso');
    const eyebrow = create('div', 'eyebrow', 'CUADERNO DE CAMPO · TRABAJO SOCIAL E IA');
    const h1 = create('h1', 'hero-title');
    h1.append(document.createTextNode('Aprender también es '), create('em', '', 'darse tiempo.'));
    const p1 = create('p', 'hero-copy', 'Un libro ilustrado para descubrir cómo la inteligencia artificial puede acompañar tu trabajo, tus investigaciones con RStudio, Stata y ATLAS.ti, y tus propias ideas. Sin apuro, a tu ritmo.');

    const actions = create('div', 'welcome-actions');
    const hasProgress = state.last > 1 || state.complete.length > 0;
    const startText = hasProgress
      ? `Continuar lectura · Cap. ${String(state.last).padStart(2, '0')}`
      : 'Empezar a leer';
    const start = create('a', 'primary-btn');
    start.href = '#capitulo-' + (state.last || 1);
    start.addEventListener('click', () => {
      openingFromCover = true;
    });
    const startArrow = create('span', 'btn-arrow', '↗');
    startArrow.setAttribute('aria-hidden', 'true');
    start.append(create('span', 'btn-label', startText), startArrow);

    const resources = create('a', 'secondary-btn');
    resources.href = '#recursos';
    const resArrow = create('span', 'btn-arrow', '→');
    resArrow.setAttribute('aria-hidden', 'true');
    resources.append(create('span', 'btn-label', 'Explorar materiales'), resArrow);
    actions.append(start, resources);

    verso.append(eyebrow, h1, p1, actions, buildHeroBooks(verso), buildCoverIllustration());

    const recto = create('div', 'page-recto');
    recto.append(
      create('div', 'eyebrow', 'PRÓLOGO E ÍNDICE DE LÁMINAS'),
      create('h2', 'recto-title', 'Una página a la vez'),
      create('p', 'recto-intro', 'Siete capítulos con ejercicios ficticios reproducibles, pausas de lectura y un cuaderno punteado para tus propias notas.')
    );

    if (Array.isArray(data.front) && data.front.length > 0) {
      const guideDetails = create('details', 'home-guide');
      const summary = create('summary', '', 'Cómo usar este manual y ruta de aprendizaje');
      const body = create('div', 'home-guide-body');
      renderBlocksList(data.front, body);
      guideDetails.append(summary, body);
      recto.append(guideDetails);
    }

    const index = create('div', 'chapter-index');
    data.modules.forEach((ch) => {
      const a = create('a', 'chapter-tile reveal-item');
      a.href = '#capitulo-' + ch.id;
      const body = create('div', 'tile-body');
      const detail = create('span', 'tile-editorial-detail', `Folio ${String(ch.id).padStart(2, '0')} · ${ch.tag} — Abrir pliego →`);
      body.append(create('h3', '', ch.title), create('p', '', ch.subtitle), detail);
      const aside = create('div', 'tile-aside');
      aside.append(create('span', '', `~${ch.minutes} min`));
      const tags = [];
      if (state.complete.includes(ch.id)) tags.push('Leído ✓');
      if ((state.notes[ch.id] || '').trim()) tags.push('Con notas');
      if (tags.length) aside.append(create('span', 'tile-status', tags.join(' · ')));

      let touchTimer = null;
      a.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse') return;
        clearTimeout(touchTimer);
        a.classList.add('is-active-touch');
      });
      const clearTouch = () => {
        clearTimeout(touchTimer);
        touchTimer = setTimeout(() => a.classList.remove('is-active-touch'), 220);
      };
      a.addEventListener('pointerup', clearTouch);
      a.addEventListener('pointercancel', clearTouch);
      a.addEventListener('blur', clearTouch);

      a.append(create('div', 'chapter-number', String(ch.id).padStart(2, '0')), body, aside);
      index.append(a);
    });
    recto.append(index);

    spread.append(verso, recto);
    page.append(spread, create('p', 'reading-quote reveal-item', '“El conocimiento no exige velocidad. Solo un lugar donde poder volver.”'));
    return page;
  }

  function renderChapter(id) {
    const ch = data.modules.find((m) => m.id === id);
    if (!ch) return renderIntro();
    state.last = id;
    safeWrite('last', id);

    const isOpeningFromCover = openingFromCover;
    openingFromCover = false;

    const page = makePage('chapter-view');
    const paper = create('article', 'paper chapter-page' + (isOpeningFromCover ? ' opening-from-cover' : ''));
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isOpeningFromCover && !reduceMotion) {
      const turnLeaf = create('div', 'cover-turn-leaf');
      turnLeaf.setAttribute('aria-hidden', 'true');
      turnLeaf.addEventListener('animationend', () => turnLeaf.remove(), { once: true });
      setTimeout(() => { if (turnLeaf.isConnected) turnLeaf.remove(); }, 780);
      paper.append(turnLeaf);
    }

    const opener = create('header', 'chapter-opener-grid');
    const openerLeft = create('div');
    openerLeft.append(
      create('div', 'eyebrow', `CAPÍTULO ${String(id).padStart(2, '0')} DE 07 · ${ch.tag.toUpperCase()}`),
      create('h1', 'chapter-title', ch.title),
      create('p', 'chapter-lead', ch.subtitle)
    );

    const meta = create('div', 'chapter-meta');
    meta.append(
      create('span', 'pill', 'Lectura y práctica'),
      create('span', '', `Lectura estimada: ~${ch.minutes} min`),
      create('span', '', 'A tu propio ritmo')
    );
    openerLeft.append(meta);

    const guide = create('section', 'chapter-guide');
    guide.setAttribute('aria-label', 'Orientación del capítulo');
    guide.append(
      create('div', 'guide-label', 'Objetivo del capítulo'),
      create('p', 'guide-goal', ch.goal || ch.subtitle)
    );

    if (Array.isArray(ch.files) && ch.files.length > 0) {
      const filesRow = create('div', 'guide-files');
      filesRow.append(create('strong', '', 'Materiales vinculados:'));
      ch.files.forEach((fname) => {
        const chip = create('a', 'file-chip', `${fname} ↗`);
        chip.href = 'materiales/' + fname;
        chip.download = fname;
        filesRow.append(chip);
      });
      guide.append(filesRow);
    }

    const content = create('div', 'reading-content');
    const headings = renderBlocksList(ch.blocks, content, `cap-${id}-sec`, id);

    if (headings.length > 0) {
      const toc = create('div', 'chapter-toc');
      toc.append(create('span', 'toc-label', 'En este capítulo:'));
      headings.forEach((h) => {
        const btn = create('button', 'toc-chip', h.text);
        btn.type = 'button';
        btn.addEventListener('click', () => {
          paper.querySelectorAll('.reveal-item').forEach((el) => el.classList.add('is-visible'));
          const target = document.getElementById(h.id);
          if (target) {
            target.scrollIntoView({ behavior: 'auto', block: 'start' });
            target.focus({ preventScroll: true });
          }
        });
        toc.append(btn);
      });
      const journalBtn = create('button', 'toc-chip', 'Cuaderno');
      journalBtn.type = 'button';
      journalBtn.addEventListener('click', () => {
        paper.querySelectorAll('.reveal-item').forEach((el) => el.classList.add('is-visible'));
        const target = $('#chapter-journal');
        if (target) {
          target.scrollIntoView({ behavior: 'auto', block: 'start' });
          const textarea = $('#chapter-note');
          if (textarea) textarea.focus({ preventScroll: true });
        }
      });
      toc.append(journalBtn);
      guide.append(toc);
    }

    openerLeft.append(guide);
    opener.append(openerLeft, renderChapterIllustration(id));
    paper.append(opener, create('hr', 'chapter-divider'), content);

    const labBlock = buildLabExplorer(id);
    if (labBlock) {
      labBlock.classList.add('reveal-item');
      paper.append(labBlock);
    }

    const pause = create('div', 'visual-pause reveal-item');
    pause.append(create('span', '', '❦'), document.createTextNode(PAUSE_QUOTES[id] || ''));
    paper.append(pause);

    if (ch.check || ch.pitfall) {
      const pedBox = create('aside', 'pedagogy-box reveal-item');
      pedBox.setAttribute('aria-label', 'Comprobación y cuidado metodológico');
      if (ch.check) {
        const checkItem = create('div', 'pedagogy-item');
        checkItem.append(create('h3', '', 'Comprobación sugerida'), create('p', '', ch.check));
        pedBox.append(checkItem);
      }
      if (ch.pitfall) {
        const pitItem = create('div', 'pedagogy-item');
        pitItem.append(create('h3', '', 'Para evitar confusiones'), create('p', '', ch.pitfall));
        pedBox.append(pitItem);
      }
      paper.append(pedBox);
    }

    const note = create('section', 'journal reveal-item');
    note.id = 'chapter-journal';
    note.append(
      create('h2', '', 'Mi cuaderno de lectura'),
      create('p', '', '¿Qué aprendiste? ¿Qué te gustaría probar después? Tus notas quedan guardadas en este navegador. No incluyas datos personales de casos reales.')
    );
    const textarea = create('textarea');
    textarea.id = 'chapter-note';
    textarea.setAttribute('aria-label', `Notas del capítulo ${id}`);
    textarea.setAttribute('aria-describedby', 'journal-status');
    textarea.placeholder = 'Escribí acá tus propias ideas, sin apuro…';
    textarea.value = state.notes[id] || '';
    activeNoteChapterId = id;

    const status = create('div', 'journal-status', storageAvailable ? 'Guardado local automático' : 'Almacenamiento local deshabilitado: descargá tus notas en .txt');
    status.id = 'journal-status';

    textarea.addEventListener('input', () => {
      state.notes[id] = textarea.value;
      activeNoteChapterId = id;
      pendingNoteDirty = true;
      status.textContent = 'Guardando…';
      clearTimeout(pendingNoteTimer);
      pendingNoteTimer = setTimeout(() => flushPendingNotes(status), 250);
    });
    textarea.addEventListener('blur', () => flushPendingNotes(status));
    textarea.addEventListener('change', () => flushPendingNotes(status));

    const journalActions = create('div', 'journal-actions');
    const exportBtn = create('button', 'journal-export-btn', 'Descargar mis notas (.txt)');
    exportBtn.type = 'button';
    exportBtn.addEventListener('click', exportAllNotes);
    journalActions.append(status, exportBtn);

    note.append(textarea, journalActions);
    paper.append(note);

    const controls = create('div', 'chapter-controls');
    const prev = create('a', 'text-btn', id === 1 ? '← Volver a portada' : `← Cap. ${String(id - 1).padStart(2, '0')}`);
    prev.href = id === 1 ? '#inicio' : '#capitulo-' + (id - 1);
    controls.append(prev);

    const isDone = state.complete.includes(id);
    const done = create('button', isDone ? 'secondary-btn' : 'primary-btn', isDone ? '✓ Capítulo leído' : 'Marcar como leído  ✓');
    done.type = 'button';
    done.setAttribute('aria-pressed', String(isDone));
    done.addEventListener('click', () => {
      flushPendingNotes(status);
      const currentlyDone = state.complete.includes(id);
      state.complete = currentlyDone
        ? state.complete.filter((n) => n !== id)
        : [...state.complete, id].sort((a, b) => a - b);
      safeWrite('completed', state.complete);
      const nowDone = state.complete.includes(id);
      done.className = nowDone ? 'secondary-btn' : 'primary-btn';
      done.textContent = nowDone ? '✓ Capítulo leído' : 'Marcar como leído  ✓';
      done.setAttribute('aria-pressed', String(nowDone));
      updateNavigation(String(id));
      notify(nowDone ? 'Capítulo marcado como leído.' : 'Marcador actualizado.');
    });
    controls.append(done);

    if (id < data.modules.length) {
      const next = create('a', 'text-btn', `Cap. ${String(id + 1).padStart(2, '0')} →`);
      next.href = '#capitulo-' + (id + 1);
      controls.append(next);
    } else {
      const next = create('a', 'text-btn', 'Ver materiales →');
      next.href = '#recursos';
      controls.append(next);
    }
    paper.append(controls);
    page.append(paper);
    return page;
  }

  function renderResources() {
    const page = makePage('resources-page');
    const paper = create('section', 'paper chapter-page');
    paper.append(
      create('div', 'eyebrow', 'TU MESA DE TRABAJO'),
      create('h1', 'chapter-title', 'Materiales para practicar'),
      create('p', 'chapter-lead', 'Archivos ficticios, listos para acompañarte mientras leés. Ninguno contiene información de personas reales.')
    );

    const list = create('div', 'resources-list');
    [
      ['datos_practica_ts.csv', 'Base de datos ficticia (.csv)', 'Diez registros sintéticos para practicar tablas, frecuencias y análisis descriptivo en RStudio o Stata.'],
      ['analisis_RStudio.R', 'Ejercicio para RStudio (.R)', 'Script de práctica con controles de integridad, tablas y boxplot. Revisalo antes de ejecutarlo.'],
      ['analisis_Stata.do', 'Ejercicio para Stata (.do)', 'Do-file comentado con advertencia sobre clear, etiquetas de valor y tablas de control.'],
      ['entrevistas_ficticias.txt', 'Entrevistas simuladas (.txt)', 'Tres relatos ficticios y guía de códigos, memos y categorías para practicar en ATLAS.ti.'],
    ].forEach(([file, title, description]) => {
      const item = create('div', 'resource reveal-item');
      const left = create('div');
      left.append(create('h3', '', title), create('p', '', description));
      const a = create('a', '', 'Descargar ↗');
      a.href = 'materiales/' + file;
      a.download = file;
      item.append(left, a);
      list.append(item);
    });
    paper.append(list);

    const caution = create('div', 'quiet-note', 'Una recomendación: usá únicamente estos archivos ficticios para los ejercicios. Los datos de personas reales requieren autorización y protección especial.');
    paper.append(caution);

    const appendix = data.appendix;
    if (Array.isArray(appendix) && appendix.length) {
      const heading = create('h2', 'chapter-title appendix-heading', 'Para seguir consultando');
      paper.append(heading);
      const content = create('div', 'reading-content');
      renderBlocksList(appendix, content, 'apendice');
      paper.append(content);
    }
    page.append(paper);
    return page;
  }

  function parseRoute() {
    const hash = decodeURIComponent(location.hash.replace(/^#/, ''));
    if (hash === 'recursos') return { type: 'resources', name: 'recursos', hash: '#recursos' };
    const match = /^capitulo-([1-7])$/.exec(hash);
    if (match) return { type: 'chapter', id: Number(match[1]), name: match[1], hash: '#capitulo-' + match[1] };
    return { type: 'home', name: 'inicio', hash: '#inicio' };
  }

  function render() {
    flushPendingNotes();
    activeNoteChapterId = null;
    const prevHash = lastValidHash;
    const route = parseRoute();
    if (route.type === 'chapter' && prevHash === '#inicio') {
      openingFromCover = true;
    }
    lastValidHash = route.hash;
    updateNavigation(route.name);
    const view =
      route.type === 'chapter'
        ? renderChapter(route.id)
        : route.type === 'resources'
        ? renderResources()
        : renderIntro();
    $('#page-content').replaceChildren(view);
    setupEditorialMotion(view);
    document.title = (route.type === 'chapter' ? `${data.modules[route.id - 1].title} · ` : '') + 'Entre páginas · IA y Trabajo Social';
  }

  function blockSearchText(block) {
    if (block.text) return block.text;
    if (Array.isArray(block.rows)) return block.rows.flat().join(' ');
    return '';
  }

  function search(query) {
    const q = query.trim().toLocaleLowerCase('es');
    const result = $('#search-results');
    result.replaceChildren();
    if (q.length < 2) {
      result.append(create('p', '', 'Escribí al menos dos letras para buscar.'));
      return;
    }

    let count = 0;
    for (const chapter of data.modules) {
      const blockTexts = chapter.blocks.map(blockSearchText);
      const matchText = blockTexts.find((t) => t.toLocaleLowerCase('es').includes(q));
      const metaMatch = [chapter.title, chapter.subtitle, chapter.tag, chapter.goal, chapter.check, chapter.pitfall]
        .filter(Boolean)
        .find((t) => t.toLocaleLowerCase('es').includes(q));

      if (!matchText && !metaMatch) continue;
      const item = create('button', 'search-item');
      item.type = 'button';
      const snippet = (matchText || metaMatch || chapter.subtitle).slice(0, 140);
      item.append(
        create('strong', '', `${String(chapter.id).padStart(2, '0')} · ${chapter.title}`),
        create('span', '', snippet)
      );
      item.addEventListener('click', () => {
        flushPendingNotes();
        location.hash = 'capitulo-' + chapter.id;
        $('#search-dialog').close();
      });
      result.append(item);
      count++;
    }

    if (Array.isArray(data.appendix)) {
      const appMatch = data.appendix.map(blockSearchText).find((t) => t.toLocaleLowerCase('es').includes(q));
      if (appMatch) {
        const item = create('button', 'search-item');
        item.type = 'button';
        item.append(
          create('strong', '', 'Materiales y apéndice · Para seguir consultando'),
          create('span', '', appMatch.slice(0, 140))
        );
        item.addEventListener('click', () => {
          flushPendingNotes();
          location.hash = 'recursos';
          $('#search-dialog').close();
        });
        result.append(item);
        count++;
      }
    }

    if (!count) {
      result.append(create('p', '', 'No encontramos ese término. Probá con otra palabra.'));
    }
  }

  function wireDialogBackdrop(dialog) {
    if (!dialog) return;
    dialog.addEventListener('click', (e) => {
      if (e.target === dialog) dialog.close();
    });
  }

  const skipLink = $('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', (e) => {
      e.preventDefault();
      const mainEl = $('#main');
      if (mainEl) {
        mainEl.focus({ preventScroll: false });
        mainEl.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    });
  }

  const settingsDialog = $('#settings-dialog');
  const searchDialog = $('#search-dialog');
  wireDialogBackdrop(settingsDialog);
  wireDialogBackdrop(searchDialog);

  $('#open-settings').addEventListener('click', () => settingsDialog.showModal());
  $('#open-search').addEventListener('click', () => {
    searchDialog.showModal();
    $('#search-input').focus();
    search($('#search-input').value);
  });
  $('#search-input').addEventListener('input', (e) => search(e.target.value));

  const focusBtn = $('#toggle-focus');
  if (focusBtn) {
    focusBtn.addEventListener('click', () => {
      state.focus = !state.focus;
      safeWrite('focus', state.focus);
      applyPreferences();
      notify(state.focus ? 'Modo de lectura concentrada activado.' : 'Índice lateral visible.');
    });
  }

  const exportSettingsBtn = $('#export-all-notes');
  if (exportSettingsBtn) {
    exportSettingsBtn.addEventListener('click', exportAllNotes);
  }

  document.querySelectorAll('[data-size]').forEach((btn) =>
    btn.addEventListener('click', () => {
      state.size = btn.dataset.size;
      safeWrite('size', state.size);
      applyPreferences();
    })
  );
  document.querySelectorAll('[data-theme]').forEach((btn) =>
    btn.addEventListener('click', () => {
      state.theme = btn.dataset.theme;
      safeWrite('theme', state.theme);
      applyPreferences();
    })
  );

  window.addEventListener('hashchange', () => {
    if (location.hash === '#main') {
      const mainEl = $('#main');
      if (mainEl) mainEl.focus({ preventScroll: false });
      try {
        history.replaceState(null, '', lastValidHash);
      } catch {
        // ignore replaceState restrictions
      }
      return;
    }
    flushPendingNotes();
    render();
    window.scrollTo({ top: 0, behavior: 'auto' });
  });

  window.addEventListener('beforeunload', () => flushPendingNotes());
  window.addEventListener('pagehide', () => flushPendingNotes());
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') flushPendingNotes();
  });

  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchDialog.showModal();
      $('#search-input').focus();
      search($('#search-input').value);
    }
  });

  applyPreferences();
  render();
})();
