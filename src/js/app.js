document.addEventListener('DOMContentLoaded', function(){
  startApp();
});

function startApp() {
  navPinUp();
  createGallery();
  scrollNav();
}

function navPinUp() {
  const barra = document.querySelector('.header');
  const aboutFestival = document.querySelector('.about-festival');
  const body = document.querySelector('body');

  window.addEventListener('scroll', () => {
    if (aboutFestival.getBoundingClientRect().top < 0) {
      barra.classList.add('fixed');
      body.classList.add('fixed');
    } else {
      barra.classList.remove('fixed');
      body.classList.remove('fixed');
    }
  });
}
function scrollNav() {
  const enlaces = document.querySelectorAll('.main-nav a');
  enlaces.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      const scrollSection = e.target.attributes.href.value;
      const section = document.querySelector(scrollSection)
      console.log(section);
      section.scrollIntoView({behavior: 'smooth'});
    })
  });
}

function createGallery() {
  const gallery = document.querySelector('.img-gallery');

  for(let i = 1; i<= 12; i++) {
    const img = document.createElement('picture');
    img.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif" />
      <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
      <img
        loading="lazy"
        width="200"
        height="300"
        src="build/img/thumb/${i}.jpg"
        alt="Imagen galeria"
      />
    `;
    img.onclick = function() {
      displayImg(i);
    }
    gallery.appendChild(img);
  }
}

function displayImg(idx) {
  const img = document.createElement('picture');
  img.innerHTML = `
    <source srcset="build/img/grande/${idx}.avif" type="image/avif" />
    <source srcset="build/img/grande/${idx}.webp" type="image/webp" />
    <img
      loading="lazy"
      width="200"
      height="300"
      src="build/img/grande/${idx}.jpg"
      alt="Imagen galeria"
    />
  `;
  //Create overlay with img
  const overlay = document.createElement('div');
  overlay.appendChild(img);
  overlay.classList.add('overlay');
  overlay.onclick = function() {
    const body = document.querySelector('body');
    body.classList.remove('set-body')
    overlay.remove();
  }
  // Btn to close modal
  const closeModal = document.createElement('p');
  closeModal.textContent = 'X';
  closeModal.classList.add('close-btn');
  overlay.appendChild(closeModal);
  closeModal.onclick = function() {
    const body = document.querySelector('body');
    body.classList.remove('set-body')
    overlay.remove();
  };

  //Add to HTML
  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('set-body')
}