// ==========================================================================
// CENTRO T'IKAY - LÓGICA INTERACTIVA & EXPERIENCIA DE USUARIO (UX)
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================================
       1. EFECTO DE SCROLL EN EL HEADER (GLASSMORPHISM ELEVADO)
       ==================================================================== */
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    /* ====================================================================
       2. MENÚ MÓVIL RESPONSIVO (HAMBURGUESA & CIERRE INTELIGENTE)
       ==================================================================== */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alternar icono entre barras y equis (X)
            if (navMenu.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });

        // Cerrar menú al hacer clic en un enlace que no sea el desplegable
        const navLinks = navMenu.querySelectorAll('a:not(.dropdown > a)');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }


    /* ====================================================================
       3. CARRUSEL DE IMÁGENES CON CONTROLES, DOTS Y AUTO-PLAY
       ==================================================================== */
    const slides = document.querySelectorAll('.slide');
    const carruselContenedor = document.querySelector('.carrusel-contenedor');
    
    if (slides.length > 0) {
        let slideIndex = 1;
        let slideInterval = null;

        // Generar dots dinámicos si no existen en el HTML
        let dotsContainer = document.querySelector('.carrusel-dots');
        if (!dotsContainer && carruselContenedor) {
            dotsContainer = document.createElement('div');
            dotsContainer.className = 'carrusel-dots';
            for (let i = 0; i < slides.length; i++) {
                const dot = document.createElement('span');
                dot.className = `dot ${i === 0 ? 'activo' : ''}`;
                dot.setAttribute('data-index', i + 1);
                dot.addEventListener('click', () => {
                    irASlide(i + 1);
                });
                dotsContainer.appendChild(dot);
            }
            carruselContenedor.appendChild(dotsContainer);
        }

        function mostrarSlides(n) {
            if (n > slides.length) { slideIndex = 1; }
            if (n < 1) { slideIndex = slides.length; }
            
            // Ocultar todos los slides
            slides.forEach(slide => {
                slide.style.display = "none";
                slide.classList.remove("activo");
            });

            // Actualizar estado de dots
            const dots = document.querySelectorAll('.dot');
            dots.forEach(d => d.classList.remove('activo'));
            if (dots[slideIndex - 1]) {
                dots[slideIndex - 1].classList.add('activo');
            }
            
            // Mostrar el slide actual
            slides[slideIndex - 1].style.display = "block";
            setTimeout(() => {
                slides[slideIndex - 1].classList.add("activo");
            }, 30);
        }

        function cambiarSlide(n) {
            mostrarSlides(slideIndex += n);
        }

        function irASlide(n) {
            mostrarSlides(slideIndex = n);
        }

        // Exponer globalmente para los botones onclick del HTML
        window.cambiarSlide = cambiarSlide;
        window.irASlide = irASlide;

        // Iniciar pase de diapositivas
        mostrarSlides(slideIndex);

        function iniciarAutoplay() {
            if (!slideInterval) {
                slideInterval = setInterval(() => {
                    cambiarSlide(1);
                }, 5000);
            }
        }

        function pausarAutoplay() {
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }

        iniciarAutoplay();

        // Pausar al pasar el ratón para una mejor experiencia de lectura
        if (carruselContenedor) {
            carruselContenedor.addEventListener('mouseenter', pausarAutoplay);
            carruselContenedor.addEventListener('mouseleave', iniciarAutoplay);

            // Soporte táctil básico (Touch Swipe) para celulares
            let startX = 0;
            let endX = 0;

            carruselContenedor.addEventListener('touchstart', (e) => {
                startX = e.changedTouches[0].screenX;
                pausarAutoplay();
            }, { passive: true });

            carruselContenedor.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].screenX;
                if (startX - endX > 45) {
                    cambiarSlide(1); // Deslizar a la izquierda -> Siguiente
                } else if (endX - startX > 45) {
                    cambiarSlide(-1); // Deslizar a la derecha -> Anterior
                }
                iniciarAutoplay();
            }, { passive: true });
        }
    }


    /* ====================================================================
       4. SISTEMA DE PESTAÑAS (TABS) INTERACTIVAS EN ESPECIALIDADES
       ==================================================================== */
    const botonesPestanas = document.querySelectorAll('.pestana-btn');
    const panelesPestanas = document.querySelectorAll('.panel-pestana');

    if (botonesPestanas.length > 0) {
        botonesPestanas.forEach(boton => {
            boton.addEventListener('click', () => {
                // 1. Quitar la clase 'activo' de todos los botones y paneles
                botonesPestanas.forEach(b => b.classList.remove('activo'));
                panelesPestanas.forEach(p => p.classList.remove('activo'));
                
                // 2. Activar el botón seleccionado
                boton.classList.add('activo');
                
                // 3. Activar el panel objetivo
                const targetId = boton.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('activo');
                }
                
                // 4. Centrar pestaña suavemente en pantallas táctiles
                boton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
        });
    }
});