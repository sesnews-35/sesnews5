(function(){
  const C = window.SHESH;
  const $ = (s, r=document)=>r.querySelector(s);
  const $$ = (s, r=document)=>[...r.querySelectorAll(s)];
  const grid = $('#grid'), nav = $('#cat-nav'), ticker = $('#ticker'), info=$('#filter-info');
  const q = $('#q'), refresh = $('#refresh'), sentinel = $('#sentinel'), yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // categories header
  nav.innerHTML = C.categories.map(c=>`<a href="./?cat=${encodeURIComponent(c)}">${c}</a>`).join('');
  const params = new URLSearchParams(location.search);
  const urlCat = params.get('cat');

  let cache = [], filtered=[], page=0, ended=false, loading=false;

  const driveView = (url)=>{
    if(!url) return url;
    const m = url.match(C.driveIdRegex);
    if(!m) return url;
    return `https://drive.google.com/uc?export=view&id=${m[1]}`;
  };

  const bnDate = (d)=>{ try { return new Date(d).toLocaleString('bn-BD', {dateStyle: 'medium', timeStyle: 'short'}); } catch(e){ return d } };
  const strip = (h)=> (h||'').toString().replace(/<[^>]*>/g, ' ');

  // Normalize rows (supports English/Bangla headers)
  const pick = (obj, keys)=>{
    for(const k of keys){
      if (k in obj && obj[k]) return obj[k];
      // try case-insensitive / underscore variations
      const found = Object.keys(obj).find(x => x.toLowerCase() === k.toLowerCase());
      if(found && obj[found]) return obj[found];
    }
    return "";
  };

  const normalize = (row, idx)=>{
    // allow array rows with header mapping
    if (Array.isArray(row)) return { id: idx+1, title: String(row[1]||row[2]||'') };

    const title = pick(row, ['title','headline','শিরোনাম']);
    const summary = pick(row, ['summary','content','body','বিবরণ','বডি']);
    const category = pick(row, ['category','ক্যাটাগরি','ধরন']);
    const image_url_raw = pick(row, ['image_url','image','img','ছবি','ইমেজ']);
    const published_at = pick(row, ['published_at','time','date','timestamp','সময়','তারিখ']) || row['Timestamp'] || row['timestamp'];
    const id = String(pick(row, ['id','slug','ref','code']) || idx+1);

    return {
      id,
      title: title || '(শিরোনাম নেই)',
      summary: strip(summary).slice(0, 400),
      category: category || 'সর্বশেষ',
      image_url: driveView(image_url_raw) || C.imageFallback,
      published_at: published_at || new Date().toISOString()
    };
  };

  async function fetchJson(url){
    const res = await fetch(url, {cache:'no-store'});
    if(!res.ok) throw new Error('fetch failed');
    return res.json();
  }

  async function loadNews(){
    try {
      const data = await fetchJson(C.appsScriptFeed);
      const list = Array.isArray(data) ? data : (data.items || []);
      cache = list.map(normalize);
    } catch (e){
      // fallback to local file
      const data = await fetchJson(C.dataPath);
      cache = (Array.isArray(data) ? data : (data.items||[])).map(normalize);
    }
    cache.sort((a,b)=> new Date(b.published_at) - new Date(a.published_at));
  }

  function applyFilters(reset=true){
    const query = (q?.value||'').trim();
    let items = cache;
    if (urlCat && urlCat!=='সর্বশেষ') items = items.filter(n => (n.category||'') === urlCat);
    if (query) items = items.filter(n => (n.title||'').includes(query) || (n.summary||'').includes(query));
    filtered = items;
    info.textContent = `${urlCat?('ক্যাটাগরি: '+urlCat+' · '):''}${query?('সার্চ: '+query+' · '):''}${items.length} ফলাফল`;
    if(reset){ page=0; ended=false; grid.innerHTML=''; }
  }

  function card(n){
    const href = `./news.html?id=${encodeURIComponent(n.id)}`;
    return `<article class="card">
      <a class="media" href="${href}"><img src="${n.image_url}" alt="${n.title}" loading="lazy"></a>
      <div class="card-body">
        <div class="meta"><span class="chip">${n.category||'সর্বশেষ'}</span> · <time>${bnDate(n.published_at)}</time></div>
        <h2><a href="${href}">${n.title}</a></h2>
        <p>${n.summary||''}</p>
      </div>
      <div class="card-footer"><a href="${href}">বিস্তারিত</a></div>
    </article>`;
  }

  function renderNext(){
    if(loading || ended) return;
    loading = true;
    const start = page*C.pageSize, end = start + C.pageSize;
    const slice = filtered.slice(start, end);
    grid.insertAdjacentHTML('beforeend', slice.map(card).join(''));
    page++; loading=false;
    if(end >= filtered.length) ended = true;
    ticker.innerHTML = cache.slice(0, C.tickerCount).map(n=>`<a href="./news.html?id=${encodeURIComponent(n.id)}">${n.title}</a>`).join(' | ');
  }

  const io = new IntersectionObserver((es)=>{
    es.forEach(e=>{ if(e.isIntersecting) renderNext(); });
  }, {rootMargin: '600px'});
  io.observe(sentinel);

  q?.addEventListener('input', ()=>{ applyFilters(true); renderNext(); });
  refresh?.addEventListener('click', ()=> init(true));

  async function init(initial=false){
    await loadNews();
    applyFilters(true);
    if(initial) grid.innerHTML='';
    renderNext();
  }

  init(true);
  setInterval(()=> init(false), C.pollMs);
})();
