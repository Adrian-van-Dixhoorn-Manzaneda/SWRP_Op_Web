/* ============================================================
   ================  ZONA DE EDICIÓN  ==========================
   ============================================================
   Copia y pega un bloque nuevo dentro de cada lista para añadir
   contenido. No necesitas tocar nada más del archivo.
   ============================================================ */

/* ---------------------------------------------------------
   ==== AÑADIR CAZARRECOMPENSAS ====

   El árbol tiene una forma fija, igual que en la referencia:

        nodo central
            │
        4 ramas (jefes de división)
            │
        1 nodo por rama (su mano derecha)
            │
        4 nodos por rama (la tropa)

   1) CENTRO -> rellena "centerNode".
   2) RAMAS  -> el array "network" debe tener EXACTAMENTE 4 objetos.
      Cada uno tiene "head" (jefe), "second" (mano derecha) y
      "outer" (un array de EXACTAMENTE 4 soldados).

   Cada personaje admite estos campos:
     id       -> identificador único, sin espacios (ej: "bossk")
     name     -> nombre que se ve bajo el retrato
     codename -> alias / apodo (aparece en el panel de detalle)
     role     -> su función en la banda
     image    -> URL o ruta a la foto (cuadrada funciona mejor)
     status   -> "target" | "captured" | "neutral" | "leader"
     bio      -> texto que aparece al hacer clic en el nodo

   Si todavía no lo has identificado en el rol, escribe
   simplemente:   { locked: true }
   y el nodo aparecerá bloqueado con un candado, como en la
   referencia, hasta que rellenes sus datos. Esto también vale
   para "centerNode": puedes poner
        const centerNode = { locked: true };
   y el nodo central saldrá bloqueado igual que los demás.

  id: " ",
  name: " ",
  codename: "« »",
  role: " ",
  image: " ",
  status: "",
  bio: "  "

--------------------------------------------------------- */
/* ---- Jefazo (centro) ---- */
const centerNode = {
  locked: true
};

const network = [
  /* ---- Rama 1: Jefe de Seguridad (arriba izq) ---- */
  {
    head: { locked: true },
    second: { locked: true },
    outer: [
      { locked: true },
      { locked: true },
      { locked: true },
      { locked: true }
    ]
  },
  /* ---- Rama 2: Jefe de Contrabando  (arriba derecha)---- */
  {
    head: { locked: true },
    second: { locked: true },
    outer: [
      { locked: true },
      { locked: true },
      { locked: true },
      { locked: true }
    ]
  },
  /* ---- Rama 3: Jefe de Finanzas (abajo izq) ---- */
  {
    head: { locked: true},
    second: { locked: true },
    outer: [
      { locked: true },
      { locked: true },
      { locked: true },
      { locked: true }
    ]
  },
  /* ---- Rama 4: Jefe de Ejecución (abajo derecha) ---- */
  {
    head: { locked: true },
    second: { locked: true },
    outer: [
      { locked: true },
      { locked: true },
      { locked: true },
      { locked: true }
    ]
  }
];

/* ---------------------------------------------------------
   ==== AÑADIR MISIONES ====
   Cada objeto es una entrada de la bitácora (izquierda).

   title       -> título de la misión
   image       -> URL o ruta a la foto
   description -> texto que se despliega al hacer clic
   legiones    -> array con las legiones que participaron.
                  Usa EXACTAMENTE estos valores: "501", "SH",
                  "327", "41", "212", "21"
                  Puede haber una sola (ej: ["501"]) o varias si
                  fue una OP conjunta (ej: ["501", "212"]).
   planeta     -> planeta donde ocurrió. Usa EXACTAMENTE uno de:
                  "Anaxes", "Hoth", "Tatooine", "Kashyyyk", "Umbara"
   objetivos   -> array con el "id" de los personajes del mapa
                  implicados en esta misión (ej: ["bossk"]).
                  Puedes dejarlo vacío [] si no aplica.

  {
   title: " ",
   image: " ",
   description: " ",
   legiones: [" "],
   planeta: " ",
   objetivos: [" "]
   },
--------------------------------------------------------- */
const missionLog = [
  /*


  {
   title: " ",
   image: " ",
   description: " ",
   legiones: [" "],
   planeta: " ",
   objetivos: [" "]
   },


  */

];

/* ============================================================
   ================  NO ES NECESARIO TOCAR DE AQUÍ HACIA ABAJO
   ============================================================ */

const statusMeta = {
  leader:   { color: "var(--leader)",   label: "Cabecilla",        icon: "★" },
  target:   { color: "var(--green)",    label: "Objetivo activo",  icon: "◎" },
  captured: { color: "var(--clone)",    label: "Capturado",        icon: "⛓" },
  neutral:  { color: "var(--red)",      label: "Neutralizado",     icon: "✕" },
  locked:   { color: "var(--locked)",   label: "Sin identificar",  icon: "🔒" }
};
const LOCKED_IMAGE = "media/GIF_BH.gif";

// --- estrellas de ambiente (fondo general, landing) ---
(function starfield(){
  const field = document.getElementById('starfield');
  const n = 55;
  for(let i=0;i<n;i++){
    const s = document.createElement('span');
    s.className = 'star';
    s.style.left = Math.random()*100 + 'vw';
    s.style.top = Math.random()*100 + 'vh';
    s.style.animationDelay = (Math.random()*4) + 's';
    s.style.opacity = (Math.random()*.5+.2).toFixed(2);
    field.appendChild(s);
  }
})();

// --- estrellas dentro del propio mapa táctico (para que se vean de verdad,
// ya que el fondo del mapa es opaco y tapa el starfield general de arriba) ---
(function mapStarfield(){
  const field = document.getElementById('map-starfield');
  const n = 70;
  for(let i=0;i<n;i++){
    const s = document.createElement('span');
    s.className = 'star';
    const size = Math.random()*1.6 + .6; // entre .6px y 2.2px, variedad de profundidad
    s.style.width = size.toFixed(2) + 'px';
    s.style.height = size.toFixed(2) + 'px';
    s.style.left = (Math.random()*100).toFixed(2) + '%';
    s.style.top = (Math.random()*100).toFixed(2) + '%';
    s.style.animationDelay = (Math.random()*4).toFixed(2) + 's';
    s.style.opacity = (Math.random()*.45+.15).toFixed(2);
    // las estrellas más grandes se sienten "más cerca" y se mueven algo más
    // con el ratón; las más pequeñas apenas se inmutan
    s.dataset.depth = (((size - .6) / 1.6) * .5 + .04).toFixed(3);
    field.appendChild(s);
  }
})();

// --- parallax sutil de las estrellas del mapa al mover el ratón ---
(function starParallax(){
  const wrap = document.getElementById('map-wrap');
  const stars = Array.from(document.querySelectorAll('#map-starfield .star'));
  if(!wrap || !stars.length) return;
  const MAX_PX = 16; // desplazamiento máximo para la estrella "más cercana"
  let targetX = 0, targetY = 0, curX = 0, curY = 0;

  wrap.addEventListener('mousemove', (ev) => {
    const rect = wrap.getBoundingClientRect();
    targetX = ((ev.clientX - rect.left) / rect.width - .5) * 2;  // -1..1
    targetY = ((ev.clientY - rect.top) / rect.height - .5) * 2;
  });
  wrap.addEventListener('mouseleave', () => { targetX = 0; targetY = 0; });

  function loop(){
    // suavizado (easing) para que el movimiento no sea brusco
    curX += (targetX - curX) * .06;
    curY += (targetY - curY) * .06;
    stars.forEach(s => {
      const depth = parseFloat(s.dataset.depth || .1);
      const dx = -curX * depth * MAX_PX;
      const dy = -curY * depth * MAX_PX;
      s.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    });
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();

// --- render bitácora ---
const missionListEl = document.getElementById('mission-list');
document.getElementById('mission-count').textContent = String(missionLog.length).padStart(2,'0');

// índice id -> nombre de personaje, construido ya (antes de dibujar el árbol
// más abajo) para poder mostrar nombres legibles en el filtro de "objetivo"
const nodeNameById = {};
(function buildNodeIndex(){
  const collect = (person, fallbackId) => {
    const p = normalize(person, fallbackId);
    if(p.id && !p.locked) nodeNameById[p.id] = p.name || p.id;
  };
  collect(centerNode, "center");
  network.slice(0, 4).forEach((branch, bi) => {
    collect(branch.head, "head" + bi);
    collect(branch.second, "second" + bi);
    (branch.outer || []).slice(0, 4).forEach((o, oi) => collect(o, "outer" + bi + oi));
  });
})();

// --- "misiones no leídas" (por navegador, vía localStorage) ---
// Se usa el título de la misión como identificador único: si cambias el
// título de una misión ya vista, volverá a marcarse como "NUEVO".
const SEEN_KEY = 'nieblaazul_misiones_vistas';
function getSeenTitles(){
  try{ return new Set(JSON.parse(localStorage.getItem(SEEN_KEY) || '[]')); }
  catch(e){ return new Set(); }
}
function saveSeenTitles(set){
  try{ localStorage.setItem(SEEN_KEY, JSON.stringify([...set])); }
  catch(e){ /* localStorage no disponible: la marca de "nuevo" no persistirá */ }
}
const seenTitles = getSeenTitles();

function updateUnseenBadges(){
  const unseenCount = document.querySelectorAll('#mission-list .mission.is-new').length;
  const badge = document.getElementById('mission-badge');
  const dot = document.getElementById('sidebar-badge-dot');
  if(badge){ badge.textContent = String(unseenCount); badge.hidden = unseenCount === 0; }
  if(dot){ dot.hidden = unseenCount === 0; }
}

function missionCard(m, i){
  const wrap = document.createElement('div');
  wrap.className = 'mission';
  wrap.dataset.legiones = (m.legiones || []).join(',');
  wrap.dataset.planeta = m.planeta || '';
  wrap.dataset.objetivos = (m.objetivos || []).join(',');
  const isUnseen = !seenTitles.has(m.title);
  if(isUnseen) wrap.classList.add('is-new');
  wrap.innerHTML = `
    <button class="mission-head" aria-expanded="false">
      <span class="mission-num">${String(i+1).padStart(2,'0')}</span>
      <img class="mission-thumb" src="${m.image}" alt="">
      <span class="mission-title">${m.title}</span>
      <svg class="mission-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 6 15 12 9 18"/></svg>
    </button>
    <div class="mission-body">
      <div class="mission-body-inner">
        <img class="mission-photo" src="${m.image}" alt="">
        <p class="mission-desc">${m.description}</p>
      </div>
    </div>
  `;
  const head = wrap.querySelector('.mission-head');
  head.addEventListener('click', () => {
    const isOpen = wrap.classList.contains('is-open');
    document.querySelectorAll('.mission.is-open').forEach(el => { el.classList.remove('is-open'); el.querySelector('.mission-head').setAttribute('aria-expanded','false'); });
    if(!isOpen){ wrap.classList.add('is-open'); head.setAttribute('aria-expanded','true'); }
    if(wrap.classList.contains('is-new')){
      wrap.classList.remove('is-new');
      seenTitles.add(m.title);
      saveSeenTitles(seenTitles);
      updateUnseenBadges();
    }
  });
  return wrap;
}

missionLog.forEach((m, i) => missionListEl.appendChild(missionCard(m, i)));
updateUnseenBadges();

// --- filtros de la bitácora (legión / planeta / objetivo) ---
(function missionFilters(){
  const filterToggle = document.getElementById('filter-toggle');
  const filtersWrap = document.getElementById('mission-filters-wrap');
  const legionGroup = document.getElementById('filter-legion');
  const legionBtns = legionGroup ? Array.from(legionGroup.querySelectorAll('.legion-btn')) : [];
  const selPlaneta = document.getElementById('filter-planeta');
  const selObjetivo = document.getElementById('filter-objetivo');
  const clearBtn = document.getElementById('filter-clear');
  const emptyMsg = document.getElementById('mission-empty');

  if(!legionGroup || !missionLog.length){
    // sin misiones todavía: no tiene sentido mostrar filtros
    if(filtersWrap) filtersWrap.hidden = true;
    if(filterToggle) filterToggle.hidden = true;
    return;
  }

  // --- desplegar/ocultar el panel de filtros ---
  filterToggle.addEventListener('click', () => {
    const isOpen = filtersWrap.classList.toggle('is-open');
    filterToggle.classList.toggle('is-active', isOpen);
    filterToggle.setAttribute('aria-expanded', String(isOpen));
  });

  const fillOptions = (select, values) => {
    values.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.value;
      opt.textContent = v.label;
      select.appendChild(opt);
    });
  };

  const objetivoIds = [...new Set(missionLog.flatMap(m => m.objetivos || []).filter(Boolean))];
  fillOptions(selObjetivo, objetivoIds.map(id => ({ value: id, label: nodeNameById[id] || id })).sort((a,b) => a.label.localeCompare(b.label)));

  // --- legión: selección múltiple ---
  const activeLegions = new Set();

  function applyFilters(){
    const fPlaneta = selPlaneta.value;
    const fObjetivo = selObjetivo.value;
    let visibleCount = 0;

    document.querySelectorAll('#mission-list .mission').forEach(card => {
      const objetivos = card.dataset.objetivos ? card.dataset.objetivos.split(',') : [];
      const legiones = card.dataset.legiones ? card.dataset.legiones.split(',') : [];
      const matches =
        (activeLegions.size === 0 || legiones.some(l => activeLegions.has(l))) &&
        (!fPlaneta || card.dataset.planeta === fPlaneta) &&
        (!fObjetivo || objetivos.includes(fObjetivo));
      card.hidden = !matches;
      if(matches) visibleCount++;
    });

    emptyMsg.hidden = visibleCount !== 0;
  }

  legionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const legion = btn.dataset.legion;
      if(activeLegions.has(legion)){
        activeLegions.delete(legion);
        btn.classList.remove('is-active');
      } else {
        activeLegions.add(legion);
        btn.classList.add('is-active');
      }
      applyFilters();
    });
  });

  [selPlaneta, selObjetivo].forEach(sel => sel.addEventListener('change', applyFilters));
  clearBtn.addEventListener('click', () => {
    legionBtns.forEach(b => b.classList.remove('is-active'));
    activeLegions.clear();
    selPlaneta.value = ''; selObjetivo.value = '';
    applyFilters();
  });
})();

// --- construir el árbol: centro -> 4 ramas -> 1 nodo -> 4 nodos ---
// (coordenadas en % dentro de un lienzo de 0 a 100, igual que el resto del mapa)
//
// ¿QUÉ TOCAR SI QUIERES AJUSTAR EL DIBUJO A MANO?
//   - R1 / R2      -> qué tan lejos del centro están el "jefe" y la "mano
//                      derecha" de cada rama. Sube los números para separarlos
//                      más del centro, bájalos para acercarlos.
//   - OUTER_LOCAL  -> qué tan lejos de SU PROPIA "mano derecha" se abren los
//                      4 soldados de la tropa (ya no se miden desde el centro,
//                      así no importa el ángulo de la rama: siempre quedan
//                      igual de separados).
//   - BRANCH_ANGLES-> el ángulo (en grados) de cada una de las 4 ramas.
//                      0=derecha, 90=abajo, 180=izquierda, 270=arriba.
//                      Deben estar separadas ~90° entre sí para que no se
//                      encimen (por eso 225/315/135/45, formando una X).
//   - OUTER_FAN    -> el ángulo, relativo a su rama, en el que se coloca cada
//                      uno de los 4 soldados alrededor de su "mano derecha".
const CX = 50, CY = 50;
const R1 = { x: 16, y: 12 };          // radio del jefe de división (desde el centro)
const R2 = { x: 32, y: 24 };          // radio de la mano derecha (desde el centro)
const OUTER_LOCAL = { x: 13, y: 21 }; // qué tan lejos se abre la tropa alrededor de su mano derecha
const BRANCH_ANGLES = [225, 315, 135, 45];   // arriba-izq, arriba-der, abajo-izq, abajo-der (90° entre ramas)
const OUTER_FAN = [-60, -20, 20, 60];        // ángulo de cada soldado, relativo a su rama

function polar(cx, cy, rx, ry, angleDeg){
  const a = angleDeg * Math.PI / 180;
  return { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
}

function normalize(person, fallbackId){
  if(person.locked){
    return { id: fallbackId, locked: true, name: "Desconocido", role: "Sin identificar",
             image: LOCKED_IMAGE, status: "locked",
             bio: "Expediente incompleto. Aún no hay suficiente inteligencia para confirmar la identidad de este objetivo." };
  }
  return person;
}

const allNodes = [];  // { ...datos, x, y, tier }
const allEdges = [];  // { x1, y1, x2, y2, dim }

const centerNodeNormalized = normalize(centerNode, "center");
allNodes.push({ ...centerNodeNormalized, x: CX, y: CY, tier: "center" });

network.slice(0, 4).forEach((branch, bi) => {
  const angle = BRANCH_ANGLES[bi];

  const head = normalize(branch.head, "head" + bi);
  const headPos = polar(CX, CY, R1.x, R1.y, angle);
  allNodes.push({ ...head, x: headPos.x, y: headPos.y, tier: "head" });
  const headIndex = allNodes.length - 1;
  allEdges.push({ x1: CX, y1: CY, x2: headPos.x, y2: headPos.y,
                  dim: centerNodeNormalized.status === "locked" || head.status === "locked",
                  fromColor: (statusMeta[centerNodeNormalized.status] || statusMeta.target).color,
                  toColor: (statusMeta[head.status] || statusMeta.target).color,
                  fromIndex: 0,
                  toIndex: headIndex });

  const second = normalize(branch.second, "second" + bi);
  const secondPos = polar(CX, CY, R2.x, R2.y, angle);
  allNodes.push({ ...second, x: secondPos.x, y: secondPos.y, tier: "second" });
  const secondIndex = allNodes.length - 1;
  allEdges.push({ x1: headPos.x, y1: headPos.y, x2: secondPos.x, y2: secondPos.y,
                  dim: head.status === "locked" || second.status === "locked",
                  fromColor: (statusMeta[head.status] || statusMeta.target).color,
                  toColor: (statusMeta[second.status] || statusMeta.target).color,
                  fromIndex: headIndex,
                  toIndex: secondIndex });

  (branch.outer || []).slice(0, 4).forEach((raw, oi) => {
    const outer = normalize(raw, "outer" + bi + oi);
    // el punto de partida ya no es el centro del mapa, sino la posición
    // de "second": así la tropa siempre queda igual de separada de su jefe
    // inmediato, sin importar en qué ángulo esté la rama.
    const outerPos = polar(secondPos.x, secondPos.y, OUTER_LOCAL.x, OUTER_LOCAL.y, angle + (OUTER_FAN[oi] || 0));
    allNodes.push({ ...outer, x: outerPos.x, y: outerPos.y, tier: "outer" });
    allEdges.push({ x1: secondPos.x, y1: secondPos.y, x2: outerPos.x, y2: outerPos.y,
                    dim: second.status === "locked" || outer.status === "locked",
                    fromColor: (statusMeta[second.status] || statusMeta.target).color,
                    toColor: (statusMeta[outer.status] || statusMeta.target).color,
                    fromIndex: secondIndex,
                    toIndex: allNodes.length - 1 });
  });
});

// --- render conexiones ---
const mapInner = document.getElementById('map-inner');
const svg = document.getElementById('connections');

// filtro de resplandor compartido por todos los tramos de línea iluminados
const defs = document.createElementNS('http://www.w3.org/2000/svg','defs');
defs.innerHTML = `
  <filter id="pulse-glow" x="-200%" y="-200%" width="500%" height="500%">
    <feGaussianBlur stdDeviation="1.4"/>
  </filter>
`;
svg.appendChild(defs);

allEdges.forEach((e, i) => {
  const d = `M ${e.x1} ${e.y1} L ${e.x2} ${e.y2}`;

  const path = document.createElementNS('http://www.w3.org/2000/svg','path');
  path.setAttribute('d', d);
  path.setAttribute('class', 'trace-line' + (e.dim ? ' is-neutral' : ' is-active'));
  svg.appendChild(path);

  if(!e.dim){
    // se mide sobre la línea real para saber cuánto mide el tramo iluminado
    const totalLen = path.getTotalLength();
    const segLen = Math.min(totalLen * 0.4, Math.max(3, totalLen * 0.26));
    const dashArray = `${segLen.toFixed(2)} ${(totalLen - segLen).toFixed(2)}`;
    const durNum = 2.4 + Math.random() * 1.8;
    const dur = durNum.toFixed(2) + 's';
    // arranca en un punto aleatorio de su recorrido, para que no viajen todas a la vez
    const begin = (-(Math.random() * durNum)).toFixed(2) + 's';

    // dos capas superpuestas sobre la misma línea: un halo ancho y difuso
    // por debajo, y un núcleo fino y brillante encima. Juntas dan la
    // sensación de que ES la línea la que se enciende al pasar la luz.
    [
      { cls: 'trace-glow-halo', width: 3.2, opacity: .55 },
      { cls: 'trace-glow-core', width: 1.4, opacity: 1 }
    ].forEach(layer => {
      const glowPath = document.createElementNS('http://www.w3.org/2000/svg','path');
      glowPath.setAttribute('d', d);
      glowPath.setAttribute('class', layer.cls);
      glowPath.setAttribute('stroke-width', layer.width);
      glowPath.setAttribute('opacity', layer.opacity);
      glowPath.setAttribute('stroke', 'var(--clone)');
      glowPath.setAttribute('stroke-dasharray', dashArray);
      glowPath.setAttribute('stroke-dashoffset', totalLen.toFixed(2));

      // desplaza el tramo visible a lo largo de TODA la línea (bucle continuo,
      // sin salto, porque dash + hueco suman exactamente el largo del cable)
      const posAnim = document.createElementNS('http://www.w3.org/2000/svg','animate');
      posAnim.setAttribute('attributeName', 'stroke-dashoffset');
      posAnim.setAttribute('values', `${totalLen.toFixed(2)};0`);
      posAnim.setAttribute('dur', dur);
      posAnim.setAttribute('begin', begin);
      posAnim.setAttribute('repeatCount', 'indefinite');
      glowPath.appendChild(posAnim);

      // el impulso nace siempre en azul (la señal viajando por la red) y
      // llega con el color de estado del nodo destino: así se nota el
      // cambio de color justo cuando la línea "conecta" con él.
      const colorAnim = document.createElementNS('http://www.w3.org/2000/svg','animate');
      colorAnim.setAttribute('attributeName', 'stroke');
      colorAnim.setAttribute('values', `var(--clone);var(--clone);${e.toColor};${e.toColor}`);
      colorAnim.setAttribute('keyTimes', '0;0.5;0.95;1');
      colorAnim.setAttribute('dur', dur);
      colorAnim.setAttribute('begin', begin);
      colorAnim.setAttribute('repeatCount', 'indefinite');
      glowPath.appendChild(colorAnim);

      svg.appendChild(glowPath);
    });
  }
});

// --- render nodos ---
allNodes.forEach((h, i) => {
  const meta = statusMeta[h.status] || statusMeta.target;
  const node = document.createElement('button');
  node.className = 'node'
    + (h.tier === 'center' ? ' node--leader' : '')
    + (h.tier === 'outer' ? ' node--outer' : '')
    + (h.locked ? ' is-locked' : '');
  node.style.left = h.x + '%';
  node.style.top = h.y + '%';
  node.style.setProperty('--ring-color', meta.color);
  node.style.animationDelay = (.12 + i*.045) + 's';
  node.dataset.status = h.status;
  node.setAttribute('aria-label', h.locked ? 'Expediente bloqueado' : 'Ver expediente de ' + h.name);
  node.innerHTML = `
    <div class="node-ring">
      <img src="${h.image}" alt="">
      <span class="node-badge">${meta.icon}</span>
    </div>
    <span class="node-name">${h.name}</span>
    <span class="node-role">${h.role}</span>
  `;
  node.addEventListener('click', () => openDetail(h));
  mapInner.appendChild(node);
});

// --- panel de detalle ---
const overlay = document.getElementById('overlay');
const detail = document.getElementById('detail');

function openDetail(h){
  const meta = statusMeta[h.status] || statusMeta.target;
  const photoEl = document.getElementById('detail-photo');
  photoEl.src = h.image;
  photoEl.classList.toggle('is-locked', !!h.locked);
  document.getElementById('detail-codename').textContent = h.codename || '';
  document.getElementById('detail-name').textContent = h.name;
  document.getElementById('detail-role').textContent = h.role;
  document.getElementById('detail-bio').textContent = h.bio || '';
  const statusEl = document.getElementById('detail-status');
  statusEl.textContent = meta.label;
  statusEl.style.setProperty('--ring-color', meta.color);
  detail.style.setProperty('--ring-color', meta.color);
  overlay.classList.add('is-open');
  detail.classList.add('is-open');
}
function closeDetail(){
  overlay.classList.remove('is-open');
  detail.classList.remove('is-open');
}
overlay.addEventListener('click', closeDetail);
document.getElementById('detail-close').addEventListener('click', closeDetail);
window.addEventListener('keydown', e => { if(e.key === 'Escape') closeDetail(); });

// --- transición landing -> app ---
const landing = document.getElementById('landing');
const app = document.getElementById('app');
document.getElementById('open-map').addEventListener('click', () => {
  landing.classList.add('is-hidden');
  app.classList.add('is-active');
});
document.getElementById('back-to-landing').addEventListener('click', () => {
  landing.classList.remove('is-hidden');
  app.classList.remove('is-active');
  closeDetail();
});

// --- sidebar toggle (desktop: colapsa / mobile: drawer) ---
const sidebar = document.getElementById('sidebar');
document.getElementById('toggle-sidebar').addEventListener('click', () => {
  if(window.matchMedia('(max-width: 860px)').matches){
    sidebar.classList.toggle('is-open');
  } else {
    sidebar.classList.toggle('is-collapsed');
  }
});