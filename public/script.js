/* ======================================= */
/* HAMBURGER MENU  */
/* ======================================= */
document.addEventListener('DOMContentLoaded', () => {

  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu-ul');

  if (hamburger && menu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('active');
      console.log('Menu clicado, active:', menu.classList.contains('active'));
    });

    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        menu.classList.remove('active');
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 660) {
        menu.classList.remove('active');
      }
    });
  }
})


/* ======================================= */
/* LOGO SCROLL SUAVE */
/* ======================================= */
const logoLink = document.querySelector('.logo a');
if (logoLink) {
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* ======================================= */
/* FORM CONTATO */
/* ======================================= */
const form = document.querySelector('#contactForm');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Erro no envio');

      const result = await response.json();
      alert(result.message || 'Mensagem enviada com sucesso!');
      form.reset();
    } catch (error) {
      alert('Erro ao enviar formulário. Tente novamente mais tarde.');
      console.error(error);
    }
  });
}


/* ======================================= */
/* POPUP MASSOTERAPIA */
/* ======================================= */
const popup = document.getElementById('popupMassoterapia');
const closePopup = document.getElementById('closePopupMassoterapia');
const openPopupBtns = document.querySelectorAll('.openPopupMassoterapia');
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (popup && closePopup && openPopupBtns.length > 0 && slider) {
  let currentIndex = 0;

  // Cria array de slides (vídeos primeiro, depois imagens)
  const slides = [];

  // Adiciona vídeos 53 a 62 (10 vídeos)
  for (let i = 53; i <= 62; i++) {
    slides.push({ type: 'video', src: `public/images/massoterapia/${i}.mp4` });
  }

  // Adiciona imagens 1 a 52
  for (let i = 1; i <= 52; i++) {
    slides.push({ type: 'img', src: `public/images/massoterapia/${i}.png` });
  }

  // Função para exibir slide atual
  function showSlide(index) {
    const slide = slides[index];
    if (slide.type === 'img') {
      slider.innerHTML = `<img src="${slide.src}" alt="Depoimento ${index + 1}" loading="lazy">`;
    } else if (slide.type === 'video') {
      slider.innerHTML = `
        <video src="${slide.src}" autoplay muted loop controls preload="metadata"></video>
      `;
    }
  }

  // Abrir popup
  openPopupBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      popup.style.display = 'flex';
      showSlide(currentIndex);
      document.body.style.overflow = 'hidden'; // Evita rolagem de fundo
    });
  });

  // Fechar popup
  closePopup.addEventListener('click', closeModal);
  window.addEventListener('click', e => {
    if (e.target === popup) closeModal();
  });

  function closeModal() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Navegação dos slides
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });
  }
}


/* ======================================= */
/* POPUP TANTRA */
/* ======================================= */
const popupTantra = document.getElementById('popupTantra');
const closePopupTantra = document.getElementById('closePopupTantra');
const openPopupTantraBtns = document.querySelectorAll('.openPopupTantra');
const sliderTantra = document.querySelector('.slider-tantra');
const prevBtnTantra = document.getElementById('prevBtnTantra');
const nextBtnTantra = document.getElementById('nextBtnTantra');

if (popupTantra && closePopupTantra && openPopupTantraBtns.length > 0 && sliderTantra) {
  let currentIndexTantra = 0;

  // Cria array de slides (vídeos primeiro, depois imagens)
  const slidesTantra = [];

  // Adiciona vídeos (exemplo: 5 vídeos de 31 a 35)

  // Adiciona imagens (exemplo: 30 imagens de 1 a 30)
  for (let i = 1; i <= 30; i++) {
    slidesTantra.push({ type: 'img', src: `public/images/tantra/${i}.png` });
  }

  // Função para exibir slide atual
  function showSlideTantra(index) {
    const slide = slidesTantra[index];
    if (slide.type === 'img') {
      sliderTantra.innerHTML = `<img src="${slide.src}" alt="Depoimento Tantra ${index + 1}" loading="lazy">`;
    } else if (slide.type === 'video') {
      sliderTantra.innerHTML = `
        <video src="${slide.src}" autoplay muted loop controls preload="metadata"></video>
      `;
    }
  }

  // Abrir popup
  openPopupTantraBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      popupTantra.style.display = 'flex';
      showSlideTantra(currentIndexTantra);
      document.body.style.overflow = 'hidden';
    });
  });

  // Fechar popup
  closePopupTantra.addEventListener('click', closePopupTantraFn);
  window.addEventListener('click', e => {
    if (e.target === popupTantra) closePopupTantraFn();
  });

  function closePopupTantraFn() {
    popupTantra.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Navegação dos slides
  if (prevBtnTantra && nextBtnTantra) {
    prevBtnTantra.addEventListener('click', () => {
      currentIndexTantra = (currentIndexTantra - 1 + slidesTantra.length) % slidesTantra.length;
      showSlideTantra(currentIndexTantra);
    });

    nextBtnTantra.addEventListener('click', () => {
      currentIndexTantra = (currentIndexTantra + 1) % slidesTantra.length;
      showSlideTantra(currentIndexTantra);
    });
  }
}
