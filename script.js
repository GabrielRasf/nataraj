
/* ======================================= */
/* HAMBURGER */
/* ======================================= */
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
});

menu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => menu.classList.remove("active"));
});

document.addEventListener("click", (e) => {
  if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
    menu.classList.remove("active");
  }
});


// Scroll suave ao clicar no logo
const logoLink = document.querySelector(".logo a");
logoLink.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* ======================================= */
/* FORM */
/* ======================================= */

const form = document.querySelector('#contactForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(form));

  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
    form.reset();
  } catch (error) {
    alert('Erro ao enviar formulário');
    console.error(error);
  }
});

/* ======================================= */
/* POPUP MASSOTERAPIA*/
/* ======================================= */

const popup = document.getElementById('popupMassoterapia');
const closePopup = document.getElementById('closePopupMassoterapia');
const openPopupBtns = document.querySelectorAll('.openPopupMassoterapia');
const slider = document.querySelector('.slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Carregar imagens dinamicamente
const totalImages = 50;
let currentIndex = 0;
const images = [];

// Adiciona imagens ao array
for (let i = 1; i <= totalImages; i++) {
    images.push(`src/images/depoimentos/massoterapia/${i}.png`);
}

// Função para exibir a imagem atual
function showImage(index) {
    slider.innerHTML = `<img src="${images[index]}" alt="Depoimento ${index + 1}">`;
}

// Abrir popup
openPopupBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.preventDefault();
        popup.style.display = 'flex';
        showImage(currentIndex);
    });
});

// Fechar popup
closePopup.addEventListener('click', () => popup.style.display = 'none');
window.addEventListener('click', e => { if(e.target === popup) popup.style.display = 'none'; });

// Navegação
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalImages) % totalImages;
    showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalImages;
    showImage(currentIndex);
});

/* ======================================= */
/* POPUP MASSOTERAPIA*/
/* ======================================= */

