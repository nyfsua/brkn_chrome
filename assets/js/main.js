document.addEventListener('DOMContentLoaded', () => {
  const loader      = document.getElementById('loader');
  const enterButton = document.getElementById('enter-button');
  const app         = document.getElementById('app');

  // Fade out loader & reveal app
  enterButton.addEventListener('click', () => {
    loader.classList.add('loader--loaded');
    loader.addEventListener('transitionend', () => {
      loader.style.display = 'none';
      app.hidden = false;
    }, { once: true });

    // Called whenever we need to skip loader
  function showAppInstantly() {
    loader.style.display = 'none';
    app.hidden = false;
  }

  // If we've already hidden the loader this session, do it now
  if (sessionStorage.getItem('loaderHidden')) {
    showAppInstantly();
  } else {
    // First visit: wait for user to enter
    enterButton.addEventListener('click', () => {
      loader.classList.add('loader--loaded');
      loader.addEventListener('transitionend', () => {
        // hide loader, reveal app
        loader.style.display = 'none';
        app.hidden = false;
        // remember for the rest of this session
        sessionStorage.setItem('loaderHidden', 'true');
      }, { once: true });
    });
  }
});

// Also handle page restore from bfcache (back/forward)
window.addEventListener('pageshow', (e) => {
  if (e.persisted && sessionStorage.getItem('loaderHidden')) {
    const loader = document.getElementById('loader');
    const app    = document.getElementById('app');
    loader.style.display = 'none';
    app.hidden = false;
  }

    document.body.classList.remove('no-scroll');
  });

});

// 1) Submit search on Enter
const searchInput = document.querySelector('.site-nav__search');
searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const q = searchInput.value.trim();
    if (q) {
      window.location.href = `/search?q=${encodeURIComponent(q)}`;
    }
  }
});

// 2) (Optional) Fetch live shop count
const shopCountEl = document.querySelector('.site-nav__shop-count');
fetch('/api/products/count')
  .then(res => res.json())
  .then(data => {
    shopCountEl.textContent = data.count.toLocaleString();
  })
  .catch(() => {
    /* silent fail—keep the placeholder number */
  });


  document.addEventListener('DOMContentLoaded', () => {
    // 1) Generate the 40 product tiles
    const products = [
      { file: 'giran.png',   name: 'Giran Deck',   price: '₦100,000', slug: 'giran-deck' },

      { file: 'gxng.png', name: 'Gxng Deck', price: '₦100,000', slug: 'gxng-deck' },

      { file: 'legacy.png', name: 'Legac Deck', price: '₦100,000', slug: 'legacy-deck' },

      { file: 'itutu.png', name: 'Itutu Deck', price: '₦FS', slug: 'itutu-deck' },
          
      { file: 'convergence-front.png',   name: 'Convergence Windbreaker',   price: '₦50,000', slug: 'convergence-windbreaker' },

      { file: 'bandana.png',   name: 'Convergence Bandana',   price: '₦10,000', slug: 'convergence-bandana' },

      { file: 'oraca-black.png',   name: 'Convergence Socks',   price: '₦10,000', slug: 'convergence-socks' },

      { file: 'convergence-deck.png',   name: 'Convergence Deck',   price: '₦150,000', slug: 'convergence-deck' },

      { file: 'wheel.png', name: 'Generis Wheel', price: '₦10,000 x 4', slug: 'generis-wheel' },

      { file: 'skateboard-stand.png', name: 'Skateboard Stand', price: '₦5,000', slug: 'stand' },

      { file: 'irony-white.png', name: 'Irony Socks', price: '₦10,000', slug: 'irony-socks' },

      { file: 'stickers.png', name: 'Stciker Pack', price: '₦5,000', slug: 'sticker-pack' },

      { file: 'fs.png', name: 'FS Shirt', price: '₦20,000', slug: 'fs-shirt' },

      { file: '000.png', name: '000 Shirt', price: '₦20,000', slug: '000-shirt' },  
      
      { file: 'maelstrom.png', name: 'Maelstrom Deck', price: '₦100,000', slug: 'maelstrom-deck' },

      { file: 'opal.png', name: 'Opal Deck', price: '₦100,000', slug: 'opal-deck' },

      { file: 'wura.png', name: 'Wura Deck', price: '₦100,000', slug: 'wura-deck' },

      


      // …add any other unique product definitions here…
    ];
  
    const total = 40;
    const grid  = document.getElementById('product-grid');
  
    for (let i = 0; i < total; i++) {
      const { file, name, price, slug } = products[i % products.length];
  
      const tile = document.createElement('div');
      tile.className        = 'product-item';
      tile.dataset.name     = name;
      tile.dataset.price    = price;

      const link = document.createElement('a');
      link.href  = `product.html?slug=${encodeURIComponent(slug)}`;
      link.title = name;
  
      const img = document.createElement('img');
      img.src = `assets/img/products/${encodeURIComponent(file)}`;
      img.alt = name;
      
      link.appendChild(img);
      tile.appendChild(link);
      grid.appendChild(tile);
    }
  
    // 2) Tooltip logic
    const tooltip = document.getElementById('tooltip');
    document.querySelectorAll('.product-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const name  = item.dataset.name  || '';
        const price = item.dataset.price || '';
        tooltip.innerHTML = `<strong>${name}</strong><br>${price}`;
        tooltip.classList.add('visible');
      });
      item.addEventListener('mousemove', e => {
        tooltip.style.left = `${e.clientX + 12}px`;
        tooltip.style.top  = `${e.clientY + 12}px`;
      });
      item.addEventListener('mouseleave', () => {
        tooltip.classList.remove('visible');
      });
    });
  });
  