document.addEventListener('DOMContentLoaded', () => {
    const galleryImg = document.querySelector('.about-page__gallery img');
    const sections   = document.querySelectorAll('.about-section');
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const imgFile = entry.target.dataset.image;
          if (imgFile && galleryImg.src.indexOf(imgFile) < 0) {
            galleryImg.src = `assets/img/about/${imgFile}`;
          }
        }
      });
    }, {
      root: null,
      threshold: 0.5
    });
  
    sections.forEach(section => observer.observe(section));
  });
  