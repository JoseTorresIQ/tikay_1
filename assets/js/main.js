// Esperamos a que todo el HTML cargue antes de ejecutar las funciones
document.addEventListener('DOMContentLoaded', () => {

    /* ====================================================================
       1. LÓGICA DEL MENÚ MÓVIL (HAMBURGUESA)
       ==================================================================== */
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');

    // Solo se ejecuta si el botón del menú existe en la página
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Cambia el icono de hamburguesa (bars) a la 'X' (times)
            if (navMenu.classList.contains('active')) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    }


    /* ====================================================================
       2. LÓGICA DEL CARRUSEL DE IMÁGENES
       ==================================================================== */
    let slides = document.getElementsByClassName("slide");
    
    // Solo inicia el carrusel si hay slides en la página actual
    if (slides.length > 0) {
        let slideIndex = 1;
        mostrarSlides(slideIndex);

        // Cambio automático cada 5 segundos
        setInterval(() => { cambiarSlide(1); }, 5000);

        // Exponemos la función cambiarSlide globalmente para que funcionen los botones HTML
        window.cambiarSlide = function(n) {
            mostrarSlides(slideIndex += n);
        }

        function mostrarSlides(n) {
            if (n > slides.length) { slideIndex = 1 }
            if (n < 1) { slideIndex = slides.length }
            
            // Oculta todos los slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                slides[i].classList.remove("activo");
            }
            
            // Muestra el slide actual con un pequeño retraso para la animación
            slides[slideIndex - 1].style.display = "block";
            setTimeout(() => { slides[slideIndex - 1].classList.add("activo"); }, 50);
        }
    }


    /* ====================================================================
       3. LÓGICA DE LAS PESTAÑAS (TABS) EN EL INDEX
       ==================================================================== */
    const botonesPestanas = document.querySelectorAll('.pestana-btn');
    const panelesPestanas = document.querySelectorAll('.panel-pestana');

    // Solo se ejecuta si la página (como el index) tiene pestañas
    if (botonesPestanas.length > 0) {
        botonesPestanas.forEach(boton => {
            boton.addEventListener('click', () => {
                // 1. Quitar la clase 'activo' de todos los botones y paneles
                botonesPestanas.forEach(b => b.classList.remove('activo'));
                panelesPestanas.forEach(p => p.classList.remove('activo'));
                
                // 2. Activar el botón clicado
                boton.classList.add('activo');
                
                // 3. Buscar y activar el panel correspondiente
                const target = boton.getAttribute('data-target');
                document.getElementById(target).classList.add('activo');
                
                // 4. Centrar suavemente el botón en móviles al tocarlo
                boton.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
        });
    }
});