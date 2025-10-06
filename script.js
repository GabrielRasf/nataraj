/* ======================================= */
/* HAMBURGER MENU  */
/* ======================================= */
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
  const totalImages = 50;
  let currentIndex = 0;
  const images = [];

  // Carrega imagens dinamicamente
  for (let i = 1; i <= totalImages; i++) {
    images.push(`src/images/depoimentos/massoterapia/${i}.png`);
  }

  // Exibe imagem atual
  function showImage(index) {
    slider.innerHTML = `<img src="${images[index]}" alt="Depoimento ${index + 1}" loading="lazy">`;
  }

  // Abrir popup
  openPopupBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      popup.style.display = 'flex';
      showImage(currentIndex);
      document.body.style.overflow = 'hidden'; // Evita rolagem de fundo
    });
  });

  // Fechar popup
  closePopup.addEventListener('click', () => closeModal());
  window.addEventListener('click', e => {
    if (e.target === popup) closeModal();
  });

  function closeModal() {
    popup.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Navegação das imagens
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalImages) % totalImages;
      showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalImages;
      showImage(currentIndex);
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
  const totalImagesTantra = 30; // número total de depoimentos Tantra
  let currentIndexTantra = 0;
  const imagesTantra = [];

  // Carregar imagens dinamicamente
  for (let i = 1; i <= totalImagesTantra; i++) {
    imagesTantra.push(`src/images/depoimentos/tantra/${i}.png`);
  }

  // Exibir imagem atual
  function showImageTantra(index) {
    sliderTantra.innerHTML = `<img src="${imagesTantra[index]}" alt="Depoimento Tantra ${index + 1}" loading="lazy">`;
  }

  // Abrir popup
  openPopupTantraBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      popupTantra.style.display = 'flex';
      showImageTantra(currentIndexTantra);
      document.body.style.overflow = 'hidden'; // bloqueia rolagem de fundo
    });
  });

  // Fechar popup
  closePopupTantra.addEventListener('click', () => closePopupTantraFn());
  window.addEventListener('click', e => {
    if (e.target === popupTantra) closePopupTantraFn();
  });

  function closePopupTantraFn() {
    popupTantra.style.display = 'none';
    document.body.style.overflow = 'auto';
  }

  // Navegação
  if (prevBtnTantra && nextBtnTantra) {
    prevBtnTantra.addEventListener('click', () => {
      currentIndexTantra = (currentIndexTantra - 1 + totalImagesTantra) % totalImagesTantra;
      showImageTantra(currentIndexTantra);
    });

    nextBtnTantra.addEventListener('click', () => {
      currentIndexTantra = (currentIndexTantra + 1) % totalImagesTantra;
      showImageTantra(currentIndexTantra);
    });
  }
}
