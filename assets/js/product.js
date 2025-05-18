document.addEventListener('DOMContentLoaded', async () => {
    // 1) Get slug from URL
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) return window.location.href = '/';
  
    // 2) Load product data
    const res = await fetch('assets/data/products.json');
    const products = await res.json();
    const prod = products.find(p => p.slug === slug);
    if (!prod) return;
  
    // 3) Populate header
    document.title = `${prod.name} – BRKNBRDS`;
    document.getElementById('page-title').textContent = `${prod.name} – BRKNBRDS`;
  
    // 4) Fill info
    document.getElementById('prod-name').textContent = prod.name.toUpperCase();
    document.getElementById('prod-price').textContent = prod.price;
    document.getElementById('prod-desc').textContent = prod.description;
  
    // 5) Build image gallery & thumbnails
    const mainImg = document.getElementById('main-img');
    const thumbs  = document.getElementById('thumbs');
    prod.images.forEach((file, idx) => {
      const url = `assets/img/products/${file}`;
      if (idx === 0) mainImg.src = url;
      const img = document.createElement('img');
      img.src = url;
      img.alt = prod.name;
      if (idx === 0) img.classList.add('active');
      img.addEventListener('click', () => {
        mainImg.src = url;
        thumbs.querySelectorAll('img').forEach(i => i.classList.remove('active'));
        img.classList.add('active');
      });
      thumbs.appendChild(img);
    });
  
    // 6) Size toggles
    const womenBtn = document.getElementById('women-sizes-btn');
    const menBtn   = document.getElementById('men-sizes-btn');
    const sizeSel  = document.getElementById('size-select');
  
    function populateSizes(type) {
      sizeSel.innerHTML = '<option value="">Select Size</option>';
      prod.sizes[type].forEach(sz => {
        const opt = document.createElement('option');
        opt.value = sz;
        opt.textContent = sz;
        sizeSel.appendChild(opt);
      });
    }
  
    womenBtn.addEventListener('click', () => {
      womenBtn.classList.add('active');
      menBtn.classList.remove('active');
      populateSizes('women');
    });
    menBtn.addEventListener('click', () => {
      menBtn.classList.add('active');
      womenBtn.classList.remove('active');
      populateSizes('men');
    });
    // init default
    if (prod.sizes.women.length) {
      womenBtn.click();
    } else {
      menBtn.click();
    }
  
    // 7) Delivery date
    document.getElementById('delivery-date').textContent =
      `Estimated delivery date: ${prod.delivery.from} – ${prod.delivery.to}`;
  
    // 8) Accordions
    const accRoot = document.getElementById('accordions');
    prod.sections.forEach(({ title, content }) => {
      const sec = document.createElement('div');
      sec.className = 'accordion-section';
      const hdr = document.createElement('button');
      hdr.className = 'accordion-header';
      hdr.textContent = title;
      const pnl = document.createElement('div');
      pnl.className = 'accordion-panel';
      pnl.textContent = content;
      hdr.addEventListener('click', () => {
        hdr.classList.toggle('open');
        pnl.style.display = hdr.classList.contains('open') ? 'block' : 'none';
      });
      sec.append(hdr, pnl);
      accRoot.appendChild(sec);
    });
  
    // 9) Add to Basket (stub)
    document.getElementById('add-to-basket')
      .addEventListener('click', () => {
        const size = sizeSel.value || '(no size)';
        alert(`Added ${prod.name} ${size} to basket.`);
      });
  });
  