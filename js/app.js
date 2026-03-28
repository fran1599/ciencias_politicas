/* ============================================================
   CIENCIAS POLÍTICAS — UNC
   app.js
   ============================================================ */

/* ── Tab navigation ─────────────────────────────────────────── */
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById('panel-' + target).classList.add('active');
      // Lazy-init canvas on first open
      if (target === 'correlatividades' && !window._correlInited) {
        window._correlInited = true;
        setTimeout(initCorrelatividades, 50);
      }
    });
  });
}

/* ── Tooltip ─────────────────────────────────────────────────── */
const tooltip = document.getElementById('tooltip');
document.addEventListener('mousemove', e => {
  if (tooltip.style.display === 'none') return;
  tooltip.style.left = (e.clientX + 16) + 'px';
  tooltip.style.top  = (e.clientY - 10) + 'px';
});
function showTip(e, html) {
  tooltip.innerHTML = html;
  tooltip.style.display = 'block';
}
function hideTip() { tooltip.style.display = 'none'; }

/* ══════════════════════════════════════════════════════════════
   HORARIOS
   ══════════════════════════════════════════════════════════════ */
const MATERIA_COLOR_MAP = {
  'Historia Social y Política I': 'c-hist',
  'Sociología Sistemática': 'c-socio',
  'Fundamentos de la Ciencia Política': 'c-fund',
  'Introducción al Conocimiento en las Ciencias Sociales': 'c-intro',
};

async function initHorarios() {
  const data = await fetch('data/horarios.json').then(r => r.json());

  const DIAS = ['lunes', 'martes', 'miércoles', 'jueves'];
  const HORA_START = 14;
  const SLOTS = 16; // 14:00–22:00 en bloques de 30min

  const grid = document.getElementById('schedule-grid');
  grid.style.gridTemplateColumns = '52px repeat(4, 1fr)';
  grid.style.gridTemplateRows = '32px repeat(' + SLOTS + ', 30px)';

  // Header
  addCell(grid, 'cell-header', '');
  DIAS.forEach(d => addCell(grid, 'cell-header', cap(d)));

  // Slot map
  const slotMap = {};
  const covered = {};
  DIAS.forEach(d => { slotMap[d] = {}; covered[d] = {}; });

  data.forEach(c => {
    c.color = MATERIA_COLOR_MAP[c.materia] || 'c-hist';
    for (let s = toSlot(c.hora_inicio, HORA_START); s < toSlot(c.hora_fin, HORA_START); s++) {
      slotMap[c.dia][s] = c;
    }
  });

  for (let slot = 0; slot < SLOTS; slot++) {
    const hour = HORA_START + slot / 2;
    const isHalf = slot % 2 === 1;
    addCell(grid, 'cell-time', isHalf ? '' : hour + ':00');

    DIAS.forEach(d => {
      if (covered[d][slot]) return;
      const clase = slotMap[d][slot];
      if (clase && slot === toSlot(clase.hora_inicio, HORA_START)) {
        const span = toSlot(clase.hora_fin, HORA_START) - toSlot(clase.hora_inicio, HORA_START);
        const cell = document.createElement('div');
        cell.className = 'cell-block ' + clase.color;
        cell.style.gridRow = 'span ' + span;
        cell.innerHTML =
          '<div class="b-time">' + clase.hora_inicio + ':00 – ' + clase.hora_fin + ':00</div>' +
          '<div class="b-mat">' + clase.materia + '</div>' +
          '<div class="b-tipo">' + clase.tipo + '</div>' +
          '<div class="b-aula">' + clase.aula + '</div>';
        cell.addEventListener('mouseenter', e => {
          showTip(e,
            '<strong>' + clase.materia + '</strong>' +
            '<span class="tl">Horario</span> ' + clase.hora_inicio + ':00 – ' + clase.hora_fin + ':00<br>' +
            '<span class="tl">Tipo</span> ' + clase.tipo + '<br>' +
            '<span class="tl">Aula</span> ' + clase.aula + '<br>' +
            '<span class="tl">Docentes</span> ' + clase.docentes.join(', ')
          );
        });
        cell.addEventListener('mouseleave', hideTip);
        grid.appendChild(cell);
        for (let i = 1; i < span; i++) covered[d][toSlot(clase.hora_inicio, HORA_START) + i] = true;
      } else if (!clase) {
        addCell(grid, 'cell-empty', '');
      }
    });
  }
}

function addCell(parent, cls, text) {
  const el = document.createElement('div');
  el.className = cls;
  el.textContent = text;
  parent.appendChild(el);
}
function toSlot(h, start) { return (h - start) * 2; }
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

/* ══════════════════════════════════════════════════════════════
   CORRELATIVIDADES (Canvas)
   ══════════════════════════════════════════════════════════════ */
async function initCorrelatividades() {
  const data = await fetch('data/correlatividades.json').then(r => r.json());
  const { nodes, edges } = data;

  const COLORS = {
    nivelacion:  { bg: '#3a3a38', border: '#888780', text: '#f1efe8' },
    comun:       { bg: '#2e2980', border: '#7f77dd', text: '#d0cefc' },
    especifica:  { bg: '#0a4a38', border: '#1d9e75', text: '#9fe1cb' },
    profesional: { bg: '#4a2e08', border: '#ba7517', text: '#fac775' },
  };

  const HORA_START_LAYOUT = 14;
  const NODE_H = 48;
  const GAP_X  = 12;
  const GAP_Y  = 28;
  const ROW_LBL_H = 18;
  const ROW_H  = NODE_H + GAP_Y + ROW_LBL_H;
  const PAD_V  = 28;
  const PAD_H  = 20;

  const offscreen = document.createElement('canvas');
  const octx = offscreen.getContext('2d');
  octx.font = '11px "JetBrains Mono", monospace';

  function measureNode(label) {
    const words = label.split(' ');
    let best = { w: Infinity };
    for (let i = 1; i < words.length; i++) {
      const l1 = words.slice(0, i).join(' ');
      const l2 = words.slice(i).join(' ');
      const w = Math.max(octx.measureText(l1).width, octx.measureText(l2).width);
      if (w < best.w) best = { w, l1, l2 };
    }
    const single = octx.measureText(label).width;
    if (single < best.w) return { w: single + 22, l1: label, l2: '' };
    return { w: best.w + 22, l1: best.l1, l2: best.l2 };
  }

  const nodeMap = {};
  nodes.forEach(n => {
    const m = measureNode(n.label);
    n.nodeW = Math.max(150, Math.ceil(m.w));
    n.l1 = m.l1; n.l2 = m.l2;
    nodeMap[n.id] = n;
  });

  const byC = {};
  nodes.forEach(n => { if (!byC[n.cuatrimestre]) byC[n.cuatrimestre] = []; byC[n.cuatrimestre].push(n); });
  const cuats = Object.keys(byC).map(Number).sort((a,b)=>a-b);

  let maxRowW = 0;
  cuats.forEach(ci => {
    const row = byC[ci];
    const w = row.reduce((s,n)=>s+n.nodeW,0) + (row.length-1)*GAP_X;
    if (w > maxRowW) maxRowW = w;
  });

  const canvasW = maxRowW + PAD_H * 2;
  const canvasH = PAD_V + cuats.length * ROW_H + PAD_V;

  cuats.forEach(ci => {
    const row = byC[ci];
    const totalW = row.reduce((s,n)=>s+n.nodeW,0) + (row.length-1)*GAP_X;
    let x = (canvasW - totalW) / 2;
    row.forEach(n => {
      n.x = x;
      n.y = PAD_V + ROW_LBL_H + cuats.indexOf(ci) * ROW_H;
      x += n.nodeW + GAP_X;
    });
  });

  const canvas = document.getElementById('correl-canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width  = canvasW * dpr;
  canvas.height = canvasH * dpr;
  canvas.style.width  = canvasW + 'px';
  canvas.style.height = canvasH + 'px';
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const CUAT_LABELS = ['Nivelación','1° Cuatrimestre','2° Cuatrimestre','3° Cuatrimestre',
    '4° Cuatrimestre','5° Cuatrimestre','6° Cuatrimestre','7° Cuatrimestre',
    '8° Cuatrimestre','9° Cuatrimestre','10° Cuatrimestre'];

  let hoveredId = null;

  function getConnected(id) {
    const from = new Set(), to = new Set();
    edges.forEach(([a,b]) => { if (a===id) to.add(b); if (b===id) from.add(a); });
    return { from, to };
  }

  function rr(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y);
    ctx.arcTo(x+w,y,x+w,y+r,r); ctx.lineTo(x+w,y+h-r);
    ctx.arcTo(x+w,y+h,x+w-r,y+h,r); ctx.lineTo(x+r,y+h);
    ctx.arcTo(x,y+h,x,y+h-r,r); ctx.lineTo(x,y+r);
    ctx.arcTo(x,y,x+r,y,r); ctx.closePath();
  }

  function wrapDraw(ctx, l1, l2, cx, ny) {
    ctx.font = '11px "JetBrains Mono", monospace';
    if (l2) {
      ctx.fillText(l1, cx, ny + NODE_H/2 - 5);
      ctx.fillText(l2, cx, ny + NODE_H/2 + 9);
    } else {
      ctx.fillText(l1, cx, ny + NODE_H/2 + 4);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.fillStyle = '#131312';
    ctx.fillRect(0, 0, canvasW, canvasH);

    const { from: hlFrom, to: hlTo } = hoveredId ? getConnected(hoveredId) : { from: new Set(), to: new Set() };

    // Row backgrounds
    cuats.forEach((ci, idx) => {
      const y = PAD_V + idx * ROW_H;
      ctx.fillStyle = idx % 2 === 0 ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.01)';
      ctx.fillRect(0, y, canvasW, ROW_H);
      ctx.fillStyle = '#5f5e5a';
      ctx.font = '9px "JetBrains Mono", monospace';
      ctx.textAlign = 'left';
      ctx.fillText(CUAT_LABELS[ci] || ('Cuatrimestre ' + ci), 10, y + 12);
    });

    // Edges
    edges.forEach(([a,b]) => {
      const na = nodeMap[a], nb = nodeMap[b];
      if (!na||!nb) return;
      const isHL = hoveredId && (a===hoveredId||b===hoveredId||hlFrom.has(b)||hlTo.has(a));
      const ax = na.x + na.nodeW/2, ay = na.y + NODE_H;
      const bx = nb.x + nb.nodeW/2, by = nb.y;
      const mid = (ay+by)/2;
      ctx.beginPath();
      ctx.moveTo(ax,ay);
      ctx.bezierCurveTo(ax,mid,bx,mid,bx,by);
      ctx.strokeStyle = isHL ? 'rgba(200,169,110,0.8)' : 'rgba(180,178,169,0.1)';
      ctx.lineWidth = isHL ? 1.8 : 0.6;
      ctx.stroke();
      if (isHL) {
        ctx.beginPath();
        ctx.moveTo(bx,by);
        ctx.lineTo(bx-6*Math.cos(-0.4),by-6*Math.sin(-0.4));
        ctx.lineTo(bx-6*Math.cos(0.4), by-6*Math.sin(0.4));
        ctx.closePath();
        ctx.fillStyle = 'rgba(200,169,110,0.8)';
        ctx.fill();
      }
    });

    // Nodes
    nodes.forEach(n => {
      const c = COLORS[n.ciclo];
      const isHov = n.id === hoveredId;
      const isConn = hoveredId && (hlFrom.has(n.id)||hlTo.has(n.id));
      const dim = hoveredId && !isHov && !isConn;
      ctx.globalAlpha = dim ? 0.18 : 1;
      rr(ctx, n.x, n.y, n.nodeW, NODE_H, 6);
      ctx.fillStyle = c.bg;
      ctx.fill();
      ctx.strokeStyle = isHov ? '#c8a96e' : c.border;
      ctx.lineWidth = isHov ? 1.8 : 0.7;
      ctx.stroke();
      ctx.fillStyle = c.text;
      ctx.textAlign = 'center';
      wrapDraw(ctx, n.l1, n.l2, n.x + n.nodeW/2, n.y);
      ctx.globalAlpha = 1;
    });
  }

  draw();

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    let found = null;
    for (const n of nodes) {
      if (mx>=n.x&&mx<=n.x+n.nodeW&&my>=n.y&&my<=n.y+NODE_H) { found=n; break; }
    }
    if (found) {
      canvas.style.cursor = 'pointer';
      hoveredId = found.id;
      const { from, to } = getConnected(found.id);
      const pre = [...from].map(id=>nodeMap[id]?.label||id).join('<br>• ') || 'ninguna';
      const des = [...to].map(id=>nodeMap[id]?.label||id).join('<br>• ') || 'ninguna';
      showTip(e,
        '<strong>' + found.label + '</strong>' +
        '<span class="tl">Requiere</span><br>• ' + pre + '<br>' +
        '<span class="tl">Habilita</span><br>• ' + des
      );
    } else {
      canvas.style.cursor = 'default';
      hoveredId = null;
      hideTip();
    }
    draw();
  });
  canvas.addEventListener('mouseleave', () => { hoveredId=null; hideTip(); draw(); });
}

/* ══════════════════════════════════════════════════════════════
   MATERIAS
   ══════════════════════════════════════════════════════════════ */
async function initMaterias() {
  const data = await fetch('data/materias.json').then(r => r.json());
  const container = document.getElementById('materias-container');

  // Notas se guardan en localStorage por materia
  function getNota(id) { return localStorage.getItem('nota_' + id) || ''; }
  function saveNota(id, val) { localStorage.setItem('nota_' + id, val); }

  const COLOR_BORDER = { hist:'#7f77dd', socio:'#1d9e75', fund:'#ba7517', intro:'#a32d2d' };
  const COLOR_BG     = { hist:'#26215c', socio:'#04342c', fund:'#412402', intro:'#3a1010' };

  data.forEach(m => {
    const card = document.createElement('div');
    card.className = 'materia-card';
    card.id = 'card-' + m.id;

    // Color accent
    const borderColor = COLOR_BORDER[m.color] || '#888780';
    const bgColor     = COLOR_BG[m.color] || '#2a2a28';

    // Materiales HTML
    const matHtml = m.materiales.length
      ? '<ul class="links-list">' + m.materiales.map(r =>
          '<li><a href="' + r.url + '" target="_blank" rel="noopener">' + r.titulo + '</a></li>'
        ).join('') + '</ul>'
      : '<p class="empty-state">Todavía no hay materiales cargados.</p>';

    // NotebookLM HTML
    const nbHtml = m.notebook_lm.length
      ? '<ul class="links-list">' + m.notebook_lm.map(r =>
          '<li><a href="' + r.url + '" target="_blank" rel="noopener">' + r.titulo + '</a></li>'
        ).join('') + '</ul>'
      : '<p class="empty-state">Todavía no hay notebooks vinculados.</p>';

    // Parciales HTML
    const parHtml = m.parciales.length
      ? '<ul class="parciales-list">' + m.parciales.map(p =>
          '<li><span class="parcial-date">' + p.fecha + '</span>' + p.descripcion + '</li>'
        ).join('') + '</ul>'
      : '<p class="empty-state">Todavía no hay fechas cargadas.</p>';

    // Docentes
    const docTags = (arr) => arr.map(d => '<span class="docente-tag">' + d + '</span>').join('');

    card.innerHTML =
      '<div class="card-header" style="border-left-color:' + borderColor + '; background: linear-gradient(90deg, ' + bgColor + '55 0%, transparent 100%)">' +
        '<div>' +
          '<h3>' + m.nombre + (m.subtitulo ? ' <em style="font-weight:300;font-style:italic;color:var(--muted)">' + m.subtitulo + '</em>' : '') + '</h3>' +
          '<div class="cod">Cód. ' + m.codigo + ' · ' + m.cuatrimestre + '° cuatrimestre</div>' +
        '</div>' +
        '<span class="card-chevron">▾</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<div class="card-section">' +
          '<div class="card-section-title">Descripción</div>' +
          '<p>' + m.programa.descripcion + '</p>' +
        '</div>' +
        '<div class="card-section">' +
          '<div class="card-section-title">Unidades temáticas</div>' +
          '<ul class="unidades-list">' + m.programa.unidades.map(u => '<li>' + u + '</li>').join('') + '</ul>' +
        '</div>' +
        '<div class="card-section">' +
          '<div class="card-section-title">Docentes</div>' +
          '<div class="docentes-grid">' +
            (m.docentes.teorico.length ? '<div style="width:100%;margin-bottom:4px"><span style="font-family:var(--font-mono);font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em">Teórico</span></div>' + docTags(m.docentes.teorico) : '') +
            (m.docentes.practico.length ? '<div style="width:100%;margin:6px 0 4px"><span style="font-family:var(--font-mono);font-size:0.6rem;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em">Práctico</span></div>' + docTags(m.docentes.practico) : '') +
          '</div>' +
        '</div>' +
        '<div class="card-section">' +
          '<div class="card-section-title">Materiales y bibliografía</div>' +
          matHtml +
        '</div>' +
        '<div class="card-section">' +
          '<div class="card-section-title">NotebookLM</div>' +
          nbHtml +
        '</div>' +
        '<div class="card-section">' +
          '<div class="card-section-title">Parciales y entregas</div>' +
          parHtml +
        '</div>' +
        '<div class="card-section">' +
          '<div class="card-section-title">Mis notas</div>' +
          '<textarea class="notas-area" data-id="' + m.id + '" placeholder="Anotá acá resúmenes, ideas, dudas...">' + getNota(m.id) + '</textarea>' +
        '</div>' +
      '</div>';

    // Toggle open/close
    card.querySelector('.card-header').addEventListener('click', () => {
      card.classList.toggle('open');
    });

    // Save notes on input
    card.querySelector('.notas-area').addEventListener('input', e => {
      saveNota(m.id, e.target.value);
    });

    container.appendChild(card);
  });
}

/* ── Bootstrap ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initHorarios();
  initMaterias();
});
