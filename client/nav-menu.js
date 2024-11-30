document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('nav-hamburger-btn');
    const closeMenuBtn = document.getElementById('nav-close-btn');
    const mobileMenu = document.getElementById('nav-mobile-menu');
    const menuLinks = document.querySelectorAll('.nav-menu-list a');
    const openModalButton2 = document.getElementById('open-modal-2'); // Ícono de correo
    const openPhoneModalButton2 = document.getElementById('open-phone-modal-2'); // Ícono de teléfono

    // Function to open menu
    const openMenu = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    // Function to close menu
    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Event listeners
    hamburgerBtn.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);

    // Close menu when clicking on a link
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') &&
            !mobileMenu.contains(e.target) &&
            !hamburgerBtn.contains(e.target)) {
            closeMenu();
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    openModalButton2.addEventListener('click', (event) => {
        event.preventDefault();
        openModalWithContent(`
            
            <h2 class="contact-title">Contacto</h2>
            <p class="contact-description">
                Complete el formulario o envíe un correo electrónico directo a: inmoandesign@gmail.com
            </p>
            <form class="contact-form">
                <div class="form-group">
                    <label for="fullname">Nombre completo</label>
                    <input type="text" id="fullname" name="fullname" placeholder="Nombre completo" required>
                </div>
                <div class="form-group">
                    <label for="email">Dirección de correo electrónico</label>
                    <input type="email" id="email" name="email" placeholder="Dirección de correo electrónico" required>
                </div>
                <div class="form-group">
                    <label for="phone">Número de Teléfono</label>
                    <input type="tel" id="phone" name="phone" placeholder="Número de Teléfono" required>
                </div>
                <div class="form-group">
                    <label for="description">Descripción</label>
                    <textarea id="description" name="description" placeholder="Descripción" rows="6" required></textarea>
                </div>
                <button type="submit" class="submit-button" id="contactButton">ENVIAR</button>
            </form>
        `);
    });
    
    // Abrir el modal con el contenido de contacto telefónico
    openPhoneModalButton2.addEventListener('click', (event) => {
        event.preventDefault();
        openModalWithContent(`
            <h2>Contáctanos por Teléfono</h2>
            <p class="contact-description">
                Si prefieres llamarnos, puedes hacerlo al siguiente número:
            </p>
            <div class="phone-content">
                <i class="fas fa-phone"></i>
                <p><strong>Llámanos al:</strong> +54 9 261 123 4567</p>
            </div>
        `);
    });
});

