const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu-ul");

hamburger.addEventListener("click", (e) => {
  e.stopPropagation(); // <--- impede que o document feche o menu
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