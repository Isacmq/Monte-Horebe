// Script dos slides do Carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

// Evita acionar efeitos no resize do navegador
let resizeTimer; 
window.addEventListener('resize', () => {
document.body.classList.add('resizing');
clearTimeout(resizeTimer);
resizeTimer = setTimeout(() => {
    document.body.classList.remove('resizing');
}, 400);
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
// Initialize all functionality
initNavigation();
initHero();
initScrollEffects();
initBackToTop();
initAccessibility();
optimizeImages();
});

// Função do menu de navegação
function initNavigation() {

// Carrega as classes do html e transforma em variaveis
// querySelectorAll = Pega todas as classes com o nome indicado entre parenteses (APENAS CLASSES, para ID se usa getElementById)
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Script que faz o icone do menu hamburguer exibir a div escondida ao ser clicado
hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Fechar menu ao clicar em links - versão otimizada
navLinks.forEach(link => {
    link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Redireciona para a seção clicada no menu de forma suave
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

}

// Função da Hero section
function initHero() {

// Script que chama o modal do culto online(Edite aqui se quiser realmente usar)
// É só mudar o link url dentro da tag iframe e o paragrafo que está escrito a data.
const cultoOnlineBtn = document.getElementById('culto-online');

if (cultoOnlineBtn) {
    cultoOnlineBtn.addEventListener('click', function (e) {
        e.preventDefault();

        const modal = createModal('Culto Online', `
            <div style="text-align: center; padding: 2rem;">
                <i class="fas fa-video" style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;"></i>
                <h3>Culto ao Vivo</h3>
                <p>Nosso culto está sendo transmitido ao vivo!</p>
                <div style="margin: 2rem 0;">
                    <iframe width="100%" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                            frameborder="0" allowfullscreen></iframe>
                </div>
                <p><strong>Próximo culto:</strong> Domingo às 19:00</p>
            </div>
        `);

        document.body.appendChild(modal);
    });
}
}

// Função que adiciona efeitos ao rolar o scroll. Ele trabalha com o plugin AOS(pesquisar à respeito) que foi adicionado no HTML
function initScrollEffects() {
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.ministry-card, .contact-item, .about-text, .schedule-table');
animateElements.forEach(el => observer.observe(el));
}

// Função do icone flutuante. Ao descer a página ele aparece (ao rolar 300px, acima disso ele some). Ao clicar ele volta para o topo da página
function initBackToTop() {
const backToTopBtn = document.getElementById('backToTop');

// Aqui exibe o icone quando descer a página. Se quiser editar quando o icone vai aparecer é aqui: window.scrollY > 300 (Ex: window.scrollY > 500)
if (backToTopBtn) {
    window.addEventListener('scroll', function () {
        backToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    });

    // Ao clicar no icone redireciona para top: 0(Topo da página) de forma suave(smooth)
    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
}

// Estilização e funções do modal de forma dinâmica 
function createModal(title, content) {
const modal = document.createElement('div');
modal.className = 'modal-overlay';
modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
`;

const modalContent = document.createElement('div');
modalContent.style.cssText = `
    background: white;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
`;

const modalHeader = document.createElement('div');
modalHeader.style.cssText = `
    padding: 1rem 2rem;
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const modalTitle = document.createElement('h3');
modalTitle.textContent = title;
modalTitle.style.margin = '0';

const closeButton = document.createElement('button');
closeButton.innerHTML = '&times;';
closeButton.style.cssText = `
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #999;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const modalBody = document.createElement('div');
modalBody.innerHTML = content;

modalHeader.appendChild(modalTitle);
modalHeader.appendChild(closeButton);
modalContent.appendChild(modalHeader);
modalContent.appendChild(modalBody);
modal.appendChild(modalContent);

closeButton.addEventListener('click', function () {
    document.body.removeChild(modal);
    document.body.style.overflow = 'auto';
});

modal.addEventListener('click', function (e) {
    if (e.target === modal) {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }
});

document.body.style.overflow = 'hidden';
return modal;
}

// Carrega as imagens apenas quando está olhando (Apenas para aumentar a performance do site)
function optimizeImages() {
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', function () {
        this.style.opacity = '1';
    });

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        images.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
});
}

// Accessibility improvements
// Faz a tecla TAB do teclado interagir com links
function initAccessibility() {
const skipLink = document.createElement('a');
skipLink.href = '#inicio';
skipLink.textContent = 'Pular para o conteúdo principal';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 6px;
    background: var(--accent-color);
    color: white;
    padding: 8px;
    text-decoration: none;
    border-radius: 4px;
    z-index: 1000;
    transition: top 0.3s;
`;

skipLink.addEventListener('focus', function () {
    this.style.top = '6px';
});

skipLink.addEventListener('blur', function () {
    this.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);
}

// Error handling
window.addEventListener('error', function (e) {
console.error('JavaScript error:', e.error);
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.message-content');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    });
  
    sections.forEach(section => {
      observer.observe(section);
    });
  });