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
      { file: 'giran.png',   name: 'Giran S4BR Deck',   price: '₦100,000', slug: 'giran-s4br-deck' },
      { file: 'itutu.png', name: 'Itutu S4BR Deck', price: '₦FS', slug: 'itutu-s4br-deck' },
      { file: 'fs.png', name: 'FS S4BR Shirt', price: '₦20,000', slug: 'fs-s4br-shirt' },
      { file: 'gxng.png', name: 'Gxng S4BR Deck', price: '₦100,000', slug: 'gxng-s4br-deck' },
      { file: 'fashionista01.png', name: 'Fashionista S3BR Shirt', price: '₦20,000', slug: 'fashionista01-s3br-shirt' },
      { file: 'stickers.png', name: 'Stciker Pack S4BR', price: '₦5,000', slug: 'sticker-pack-s4br' },
      { file: 'wura.png', name: 'Wura S4BR Deck', price: '₦100,000', slug: 'wura-s4br-deck' },
      { file: 'irony-white.png', name: 'Irony S4BR Socks', price: '₦10,000', slug: 'irony-s4br-socks' },
      { file: 'oraca-black.png',   name: 'Oraca S4BR Socks',   price: '₦10,000', slug: 'oraca-s4br-socks' },
      { file: 'maelstrom.png', name: 'Maelstrom S4BR Deck', price: '₦100,000', slug: 'maelstrom-s4br-deck' },
      { file: 'legacy.png', name: 'Legacy S4BR Deck', price: '₦100,000', slug: 'legacy-s4br-deck' },
      { file: 'convergence-front.png',   name: 'Convergence S4BR Windbreaker',   price: '₦Prototype', slug: 'convergence-s4br-windbreaker' },

      { file: 'opal.png', name: 'Opal S4BR Deck', price: '₦100,000', slug: 'opal-s4br-deck' },
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
  