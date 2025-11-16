// Constantes y Variables Globales
const API_URL = 'https://fakestoreapi.com/products';
const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartCounter = document.getElementById('cart-counter');
const checkoutBtn = document.getElementById('checkout-btn');
const paymentTotalElement = document.getElementById('payment-total');
const paymentForm = document.getElementById('payment-form');

// Usando 'clickmartCart' como clave de LocalStorage
let cart = JSON.parse(localStorage.getItem('clickmartCart')) || [];
let productsData = []; // Para almacenar los productos de la API

// --- I. FUNCIONES PRINCIPALES ---

/**
 * Traduce una descripción del producto de inglés a español (Simulado y Mejorado).
 * @param {string} englishDescription - Descripción original en inglés.
 * @returns {string} - Descripción "traducida" o adaptada al español.
 */
function translateDescription(englishDescription) {
    if (!englishDescription) return 'No hay descripción disponible.';

    let translated = englishDescription;

    // Sustituciones para categorías y términos comunes si aparecen en la descripción
    translated = translated
        .replace(/men's clothing/g, 'Ropa de hombre')
        .replace(/women's clothing/g, 'Ropa de mujer')
        .replace(/jewelery/g, 'Joyería')
        .replace(/electronics/g, 'Electrónica')
        .replace(/clothing/g, 'ropa')
        .replace(/great for/g, 'ideal para')
        .replace(/t-shirts/g, 'camisetas')
        .replace(/jacket/g, 'chaqueta')
        .replace(/bag/g, 'bolso')
        .replace(/cup/g, 'taza')
        .replace(/laptop/g, 'portátil');

    // Truncamos si es muy larga y ofrecemos ver el original.
    const maxLen = 150;
    if (englishDescription.length > maxLen) {
        return `<strong>Descripción:</strong> ${translated.substring(0, maxLen)}... <br><small class="text-info"> (Texto original en inglés para detalles completos) </small>`;
    } else {
        return `<strong>Descripción:</strong> ${translated}`;
    }
}


/**
 * 1. Carga los productos de la API y los renderiza.
 */
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        productsData = await response.json();
        renderProducts(productsData);
        updateCartDisplay(); // Inicializa el carrito al cargar la página
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        productList.innerHTML = `<div class="alert alert-danger" role="alert">
            <i class="fas fa-exclamation-triangle me-2"></i> Error al cargar productos. Inténtelo más tarde.
        </div>`;
    }
}

/**
 * 2. Renderiza la lista de productos en cards.
 * @param {Array} products - Lista de productos.
 */
function renderProducts(products) {
    productList.innerHTML = products.map(product => `
        <div class="col">
            <div class="card h-100 product-card shadow-sm border-0">
                <img src="${product.image}" class="card-img-top product-image mx-auto" alt="${product.title}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-truncate">${product.title}</h5>
                    <p class="card-text text-muted mb-auto">${product.category}</p>
                    <p class="fs-4 fw-bold text-success mt-2">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-sm btn-primary mt-2" onclick="openProductModal(${product.id})">
                        Ver más <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

/**
 * 3. Abre el modal de detalles del producto.
 * @param {number} productId - ID del producto a mostrar.
 */
function openProductModal(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    // Llenar el modal con los datos del producto
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-title').textContent = product.title;
    document.getElementById('modal-category').textContent = product.category;

    // Traducción de la descripción (Simulada)
    const translatedDescription = translateDescription(product.description);
    document.getElementById('modal-description').innerHTML = translatedDescription;

    document.getElementById('modal-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('modal-quantity').value = 1; // Resetear cantidad

    // Asignar el ID del producto al botón de agregar al carrito
    document.getElementById('add-to-cart-btn').onclick = () => {
        const quantity = parseInt(document.getElementById('modal-quantity').value);
        addToCart(product, quantity);
        // Cerrar el modal después de agregar
        const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
        modal.hide();
        // Mostrar mensaje de confirmación
        showToast(`✅ ${quantity}x ${product.title.substring(0, 20)}... agregado al carrito.`);
    };

    // Mostrar el modal
    const productModal = new bootstrap.Modal(document.getElementById('productModal'));
    productModal.show();
}

/**
 * 3.5. Filtra los productos según el texto ingresado en la barra de búsqueda.
 * Llama a renderProducts con la lista filtrada.
 */
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();

    const filteredProducts = productsData.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );

    renderProducts(filteredProducts);

    // Muestra un mensaje si no hay resultados
    if (filteredProducts.length === 0) {
        productList.innerHTML = `<div class="col-12 text-center mt-5">
            <h4 class="text-muted">¡Ups! 🧐 No encontramos productos que coincidan con "${searchTerm}".</h4>
        </div>`;
    }
}

/**
 * 4. Agrega un producto al carrito.
 * @param {Object} product - Producto a agregar.
 * @param {number} quantity - Cantidad a agregar.
 */
function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }

    saveCart();
    updateCartDisplay();
}

/**
 * 5. Actualiza la persistencia del carrito en LocalStorage.
 */
function saveCart() {
    localStorage.setItem('clickmartCart', JSON.stringify(cart));
}

/**
 * 6. Renderiza la lista de items en el offcanvas del carrito.
 */
function updateCartDisplay() {
    let total = 0;

    // Limpiar el contenedor
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-center text-muted mt-5">Tu carrito está vacío. 🥺</p>';
        cartCounter.textContent = '0';
        checkoutBtn.disabled = true;
    } else {
        let totalItems = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            totalItems += item.quantity;

            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center p-3';
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${item.image}" alt="${item.title}" style="width: 50px; height: 50px; object-fit: contain; margin-right: 15px;">
                    <div>
                        <h6 class="mb-0 text-truncate" style="max-width: 150px;">${item.title}</h6>
                        <small class="text-muted">$${item.price.toFixed(2)} c/u</small>
                    </div>
                </div>
                <div class="d-flex align-items-center">
                    <div class="input-group input-group-sm me-2" style="width: 100px;">
                        <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${item.id}, -1)">
                            <i class="fas fa-minus"></i>
                        </button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" type="button" onclick="changeQuantity(${item.id}, 1)">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(li);
        });

        cartCounter.textContent = totalItems;
        checkoutBtn.disabled = false;
    }

    // Actualizar Total
    cartTotalElement.textContent = `$${total.toFixed(2)}`;
    // Actualizar Total en Modal de Pago
    paymentTotalElement.textContent = `$${total.toFixed(2)}`;
}

/**
 * 7. Modifica la cantidad de un producto en el carrito.
 * @param {number} productId - ID del producto.
 * @param {number} change - Cambio de cantidad (+1 o -1).
 */
function changeQuantity(productId, change) {
    const item = cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

/**
 * 8. Elimina un producto del carrito.
 * @param {number} productId - ID del producto a eliminar.
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartDisplay();
    showToast('🗑️ Producto eliminado del carrito.', 'danger');
}

/**
 * 9. Maneja el envío del formulario de pago (Simulación).
 */
paymentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Validación básica del formulario
    if (!this.checkValidity()) {
        e.stopPropagation();
        this.classList.add('was-validated');
        showToast('⚠️ Por favor, complete todos los campos de pago correctamente.', 'warning');
        return;
    }

    // SIMULACIÓN DE PAGO EXITOSO

    // 1. Obtener datos para el PDF
    const clientName = document.getElementById('fullName').value;
    const finalTotal = parseFloat(cartTotalElement.textContent.replace('$', ''));

    // 2. Generar y descargar el PDF
    generateReceiptPDF(clientName, finalTotal);

    // 3. Limpiar carrito y cerrar modales/offcanvas
    cart = [];
    saveCart();
    updateCartDisplay();

    // Cerrar modales
    const offcanvas = bootstrap.Offcanvas.getInstance(document.getElementById('offcanvasCart'));
    if (offcanvas) offcanvas.hide();
    const modal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    if (modal) modal.hide();

    // 4. Mostrar mensaje de éxito
    showToast('✅ ¡Pago exitoso! Se ha generado su ticket de compra.', 'success');

    // 5. Resetear formulario
    this.reset();
    this.classList.remove('was-validated');
});

/**
 * 10. Genera y descarga el ticket de compra en formato PDF (jsPDF).
 * Formato recibo más grande y legible (simulando 80mm).
 * @param {string} clientName - Nombre del cliente.
 * @param {number} finalTotal - Total de la compra.
 */
function generateReceiptPDF(clientName, finalTotal) {
    const { jsPDF } = window.jspdf;

    // Configuración para un recibo más ancho y legible (simulando 80mm)
    const docWidth = 80;    // <--- CAMBIO CLAVE: Ancho en mm (antes 58mm)
    const margin = 5;       // Margen de 5mm
    const col1 = margin;
    const col2 = docWidth - margin;
    const doc = new jsPDF({
        unit: 'mm',
        format: [docWidth, 0],
    });

    let y = 10; // Posición Y inicial (dejamos más espacio arriba)

    // --- TÍTULO Y DATOS EMPRESA ---
    doc.setFont('Courier', 'Bold');
    doc.setFontSize(12); // <--- CAMBIO CLAVE: Aumentamos el tamaño de la fuente para el título
    doc.text('CLICKMART 🛒', docWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFontSize(10); // <--- CAMBIO CLAVE: Aumentamos el tamaño de la fuente base
    doc.text('Recibo de Compra', docWidth / 2, y, { align: 'center' });
    y += 5;
    doc.text('----------------------------------------------------', docWidth / 2, y, { align: 'center' }); // Más guiones
    y += 4;

    // --- DATOS DEL CLIENTE Y FECHA ---
    doc.setFont('Courier', 'Normal');
    doc.text(`Cliente: ${clientName.substring(0, 30)}`, col1, y);
    y += 4;
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, col1, y);
    y += 4;
    doc.text(`Hora: ${new Date().toLocaleTimeString()}`, col1, y);
    y += 5;
    doc.text('----------------------------------------------------', docWidth / 2, y, { align: 'center' });
    y += 5;

    // --- ENCABEZADOS DE PRODUCTOS ---
    doc.setFont('Courier', 'Bold');
    doc.text('Cant. Producto', col1, y);
    doc.text('Precio', col2, y, { align: 'right' });
    y += 4;
    doc.setFont('Courier', 'Normal');
    doc.text('----------------------------------------------------', docWidth / 2, y, { align: 'center' });
    y += 5;

    // --- DETALLE DE PRODUCTOS ---
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;

        // Columna 1: Cantidad y Título (Truncado)
        const itemLine = `${item.quantity}x ${item.title.substring(0, 25)}...`; // Aumentamos truncado a 25
        doc.text(itemLine, col1, y);

        // Columna 2: Precio total del item
        doc.text(`$${itemTotal.toFixed(2)}`, col2, y, { align: 'right' });
        y += 5; // Espacio entre líneas
    });

    y += 3; // Espacio antes del total

    // --- TOTAL FINAL ---
    doc.text('====================================================', docWidth / 2, y, { align: 'center' });
    y += 5;
    doc.setFont('Courier', 'Bold');
    doc.text('TOTAL A PAGAR:', col1, y);
    doc.text(`$${finalTotal.toFixed(2)}`, col2, y, { align: 'right' });
    y += 6;

    // --- AGRADECIMIENTO ---
    doc.setFont('Courier', 'Normal');
    doc.text('¡GRACIAS POR SU COMPRA! 🙏', docWidth / 2, y, { align: 'center' });
    y += 4;
    doc.text('----------------------------------------------------', docWidth / 2, y, { align: 'center' });

    // Finalizar el documento y descargar
    doc.save(`Clickmart_Recibo_${new Date().getTime()}.pdf`);
}
/**
 * 11. Función de utilidad para mostrar mensajes de confirmación (Toasts de Bootstrap).
 */
function showToast(message, type = 'success') {
    const alertPlaceholder = document.body;
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible fade show fixed-bottom m-3" role="alert" style="z-index: 1050;">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);

    // Remover automáticamente
    setTimeout(() => {
        wrapper.remove();
    }, 3000);
}


// --- II. INICIALIZACIÓN ---

// Iniciar la carga de productos al cargar la página.
document.addEventListener('DOMContentLoaded', fetchProducts);