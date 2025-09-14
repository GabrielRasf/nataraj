

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu-ul");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
});

// Fecha o menu ao clicar em qualquer link
const menuItems = menu.querySelectorAll("a");
menuItems.forEach(item => {
  item.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

// Fecha o menu ao clicar fora dele
document.addEventListener("click", () => {
  menu.classList.remove("active");
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

// Form

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
