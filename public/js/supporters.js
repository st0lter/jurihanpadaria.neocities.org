(function(){
  function getInitials(name){
    if(!name) return '??';
    const parts = name.trim().split(/\s+/);
    const first = parts[0] ? parts[0][0] : '';
    const second = parts[1] ? parts[1][0] : (parts[0] && parts[0][1] ? parts[0][1] : '');
    return (first+second).toUpperCase();
  }

  function makePlaceholderDataUrl(name, bg='#1B998B', fg='#151515'){
    const initials = getInitials(name);
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 256 256'>`+
      `<rect width='100%' height='100%' fill='${bg}'/>`+
      `<text x='50%' y='54%' font-family='Kode Mono, Verdana, monospace' font-size='96' fill='${fg}' text-anchor='middle' dominant-baseline='middle'>${initials}</text>`+
      `</svg>`;
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.supporter').forEach(function(s){
      const img = s.querySelector('img');
      const nameEl = s.querySelector('.supporter-name');
      const name = nameEl ? nameEl.textContent.trim() : '';

      // set placeholder when src missing or empty
      if(img){
        const src = img.getAttribute('src');
        if(!src || src.trim() === ''){
          img.src = makePlaceholderDataUrl(name || '??');
        }

        // handle broken images
        img.addEventListener('error', function onerr(){
          img.removeEventListener('error', onerr);
          img.src = makePlaceholderDataUrl(name || '??');
        });
      }

      // insert social icons if data attributes exist
      const actions = s.querySelector('.supporter-actions');
      if(!actions) return;
      const addIcon = function(href, cls, label){
        const a = document.createElement('a');
        a.href = href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.setAttribute('aria-label', label);
        a.innerHTML = `<i class="bi ${cls}"></i>`;
        actions.appendChild(a);
      };

      if(s.dataset.youtube) addIcon(s.dataset.youtube, 'bi-youtube', 'YouTube');
      if(s.dataset.twitter) addIcon(s.dataset.twitter, 'bi-twitter', 'Twitter');
      if(s.dataset.website) addIcon(s.dataset.website, 'bi-globe2', 'Website');
      if(s.dataset.discord) addIcon(s.dataset.discord, 'bi-discord', 'Discord');
      if(s.dataset.email) addIcon('mailto:' + s.dataset.email, 'bi-envelope', 'Email');
      if(s.dataset.bluesky) addIcon(s.dataset.bluesky, 'bi-bluesky', 'Bluesky');
      if(s.dataset.twitch) addIcon(s.dataset.twitch, 'bi-twitch', 'Twitch');

      // ensure there's a supporter-title element and populate it
      let titleEl = s.querySelector('.supporter-title');
      const defaultTitle = s.dataset.title || 'Collaborator';
      if(!titleEl){
        titleEl = document.createElement('div');
        titleEl.className = 'supporter-title';
        s.appendChild(titleEl);
      }
      titleEl.textContent = defaultTitle;
    });
  });
})();
