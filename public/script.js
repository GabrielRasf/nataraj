document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const menu = document.querySelector('.menu-ul');
  const headerBar = document.querySelector('.menu-section');

  const setMenuOpen = (open) => {
    if (!menu || !hamburger) return;
    menu.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    hamburger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  if (hamburger && menu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      setMenuOpen(!menu.classList.contains('active'));
    });

    menu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    });
  }

  if (headerBar) {
    const onScroll = () => {
      headerBar.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  const sectionLinks = new Map(
    [...document.querySelectorAll('.menu-ul a[href^="#"]')].map((link) => [
      link.getAttribute('href').slice(1),
      link
    ])
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const link = sectionLinks.get(entry.target.id);
        if (!link || !entry.isIntersecting) return;
        sectionLinks.forEach((item) => item.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

    ['sobre-mim', 'massoterapia', 'tantra', 'cursos', 'contato'].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
});

const logoLink = document.querySelector('.logo a');
if (logoLink) {
  logoLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

let lastFocus = null;

function openDialog(popup) {
  lastFocus = document.activeElement;
  popup.style.display = 'flex';
  document.body.classList.add('modal-open');
  const closeBtn = popup.querySelector('.close');
  if (closeBtn) closeBtn.focus();
}

function trapFocus(event, popup) {
  if (event.key !== 'Tab' || popup.style.display !== 'flex') return;
  const focusable = [...popup.querySelectorAll('button, a[href], input, video, textarea, select')]
    .filter((el) => !el.disabled && el.getAttribute('tabindex') !== '-1');
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function closeDialog(popup) {
  popup.style.display = 'none';
  document.body.classList.remove('modal-open');
  const videos = popup.querySelectorAll('video');
  videos.forEach((video) => {
    video.pause();
  });
  if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
}

const popup = document.getElementById('popupMassoterapia');
const closePopup = document.getElementById('closePopupMassoterapia');
const openPopupBtns = document.querySelectorAll('.openPopupMassoterapia');
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (popup && closePopup && openPopupBtns.length > 0 && slider) {
  let currentIndex = 0;
  const slides = [];

  for (let i = 53; i <= 62; i++) {
    slides.push({ type: 'video', src: `/images/massoterapia/${i}.mp4` });
  }

  for (let i = 1; i <= 52; i++) {
    if (i === 29 || i === 31 || i === 34) continue;
    slides.push({ type: 'img', src: `/images/massoterapia/${i}.png` });
  }

  function showSlide(index) {
    const slide = slides[index];
    slider.replaceChildren();
    if (slide.type === 'img') {
      const image = document.createElement('img');
      image.src = slide.src;
      image.alt = `Depoimento de massoterapia ${index + 1}`;
      image.loading = 'lazy';
      slider.append(image);
      return;
    }
    const video = document.createElement('video');
    video.src = slide.src;
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = true;
    video.preload = 'metadata';
    slider.append(video);
  }

  openPopupBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog(popup);
      showSlide(currentIndex);
    });
  });

  function closeModal() {
    closeDialog(popup);
  }

  closePopup.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === popup) closeModal();
  });

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

  document.addEventListener('keydown', (e) => {
    if (popup.style.display !== 'flex') return;
    trapFocus(e, popup);
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
    if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
  });
}

const popupTantra = document.getElementById('popupTantra');
const closePopupTantra = document.getElementById('closePopupTantra');
const openPopupTantraBtns = document.querySelectorAll('.openPopupTantra');
const sliderTantra = document.querySelector('.slider-tantra');
const prevBtnTantra = document.getElementById('prevTantra');
const nextBtnTantra = document.getElementById('nextTantra');

if (popupTantra && closePopupTantra && openPopupTantraBtns.length > 0 && sliderTantra) {
  let currentIndexTantra = 0;
  const tantraSlides = [
    'Cheguei um pouco apreensiva, sem saber exatamente o que esperar. Desde o primeiro contato, fui tratada com muito respeito e tranquilidade. A condução da sessão me fez perceber o quanto eu estava desconectada do meu próprio corpo. Saí leve, tranquila e com uma sensação muito boa de presença.',
    'Antes da sessão eu tinha bastante receio e muitas dúvidas. Tudo foi explicado com calma, respeitando meus limites e meu tempo. Em nenhum momento me senti pressionada. Foi uma experiência de relaxamento, consciência corporal e autoconhecimento que pretendo repetir.',
    'Minha rotina estava muito intensa e eu vinha carregando muita tensão. A sessão foi um momento para simplesmente parar, respirar e prestar atenção em mim. O ambiente, a condução e o cuidado fizeram toda diferença. Saí muito mais leve do que entrei.',
    'Foi uma experiência de presença e percepção. Durante a sessão fui percebendo tensões que eu nem sabia que carregava. Mais do que uma massagem, senti que foi um convite para me observar de outra maneira.',
    'Eu tinha algumas inseguranças antes de experimentar o Tantra. A conversa inicial foi fundamental para eu entender a proposta e me sentir segura. Tudo aconteceu com respeito, discrição e atenção aos meus limites. Foi uma experiência muito positiva.',
    'Não sabia muito bem o que esperar da primeira sessão. Fui aberta à experiência e me surpreendi com a sensação de relaxamento e conexão comigo mesma. Foi um momento em que consegui deixar a cabeça de lado e simplesmente estar presente.',
    'O mais interessante foi perceber como determinadas emoções aparecem também no corpo. A sessão me fez refletir sobre algumas coisas que eu vinha ignorando na minha rotina. Foi delicada, respeitosa e muito mais profunda do que eu imaginava.',
    'Tenho muita dificuldade para relaxar e permanecer presente. Durante a experiência, fui aos poucos desacelerando. Quando terminou, senti meu corpo mais solto e minha mente mais tranquila. Foi um daqueles momentos em que você percebe que precisava parar um pouco.',
    'O que mais gostei foi perceber que não existia pressa. Cada etapa foi conduzida com atenção e respeito. Pude ficar confortável com minhas próprias sensações e compreender melhor meus limites. Foi uma experiência muito pessoal e significativa.',
    'Minha primeira experiência com Tantra acabou sendo muito mais tranquila do que eu imaginava. O diálogo, o respeito e a atenção durante toda a sessão fizeram com que eu me sentisse acolhida. Saí com uma percepção diferente sobre meu corpo e com vontade de continuar conhecendo esse universo.'
  ].map((text) => ({ type: 'text', text }));

  for (let i = 1; i <= 4; i++) {
    tantraSlides.push({ type: 'img', src: `/images/tantra/${i}.png` });
  }

  function showImageTantra(index) {
    const slide = tantraSlides[index];
    sliderTantra.replaceChildren();

    if (slide.type === 'text') {
      const shot = document.createElement('div');
      shot.className = 'wa-shot';
      const bubble = document.createElement('div');
      bubble.className = 'wa-bubble';
      const paragraph = document.createElement('p');
      paragraph.textContent = slide.text;
      const time = document.createElement('span');
      time.className = 'wa-time';
      time.textContent = '14:26';
      bubble.append(paragraph, time);
      shot.append(bubble);
      sliderTantra.append(shot);
      return;
    }

    const image = document.createElement('img');
    image.src = slide.src;
    image.alt = `Depoimento de Tantra ${index + 1}`;
    image.loading = 'lazy';
    sliderTantra.append(image);
  }

  openPopupTantraBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openDialog(popupTantra);
      showImageTantra(currentIndexTantra);
    });
  });

  function closePopupTantraFn() {
    closeDialog(popupTantra);
  }

  closePopupTantra.addEventListener('click', closePopupTantraFn);
  window.addEventListener('click', (e) => {
    if (e.target === popupTantra) closePopupTantraFn();
  });

  if (prevBtnTantra && nextBtnTantra) {
    prevBtnTantra.addEventListener('click', () => {
      currentIndexTantra = (currentIndexTantra - 1 + tantraSlides.length) % tantraSlides.length;
      showImageTantra(currentIndexTantra);
    });

    nextBtnTantra.addEventListener('click', () => {
      currentIndexTantra = (currentIndexTantra + 1) % tantraSlides.length;
      showImageTantra(currentIndexTantra);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (popupTantra.style.display !== 'flex') return;
    trapFocus(e, popupTantra);
    if (e.key === 'Escape') closePopupTantraFn();
    if (e.key === 'ArrowLeft' && prevBtnTantra) prevBtnTantra.click();
    if (e.key === 'ArrowRight' && nextBtnTantra) nextBtnTantra.click();
  });
}
