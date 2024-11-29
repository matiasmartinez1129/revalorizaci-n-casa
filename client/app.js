// Elementos
const modal = document.getElementById('contact-modal');
const modalContent = document.getElementById('modal-content');
const openModalButton = document.getElementById('open-modal'); // Ícono de correo
const openPhoneModalButton = document.getElementById('open-phone-modal'); // Ícono de teléfono
const ctaButton = document.querySelector('.cta-button'); // Botón "Saber Más"

// Función para cerrar el modal
function closeModal() {
    modal.classList.remove('show');
}

// Función para abrir el modal con contenido dinámico
function openModalWithContent(contentHTML) {
    modalContent.innerHTML = `
        <button class="close-modal">&times;</button> <!-- Botón de cierre -->
        ${contentHTML}
    `;
    modal.classList.add('show');

    // Asignar el evento de clic al botón de cierre
    const closeModalButton = modalContent.querySelector('.close-modal');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Asignar evento de envío al formulario solo una vez
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.removeEventListener('submit', handleSubmit); // Elimina el listener anterior si existe
        contactForm.addEventListener('submit', handleSubmit);
    }
}

// Función de manejo del envío del formulario
async function handleSubmit(e) {
    e.preventDefault(); // Evitar recargar la página

    // Obtener los datos del formulario
    const fullname = document.getElementById('fullname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const description = document.getElementById('description').value;

    try {
        // Hacer la solicitud al backend
        const response = await fetch('http://localhost:3000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullname, email, phone, description }),
        });

        const result = await response.json();
        if (response.ok) {
            alert('Correo enviado con éxito.');
            closeModal(); // Cerrar el modal después de enviar
        } else {
            alert(`Error: ${result.message}`);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al enviar el correo.');
    }
}

// Abrir el modal con el contenido de contacto
openModalButton.addEventListener('click', (event) => {
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
openPhoneModalButton.addEventListener('click', (event) => {
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

// Abrir el modal con el formulario de contacto desde el botón "Saber Más"
ctaButton.addEventListener('click', (event) => {
    event.preventDefault();
    openModalWithContent(`
        <h2>Contacto</h2>
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

// Cerrar el modal al hacer clic fuera del contenedor
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Volver al inicio
document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
