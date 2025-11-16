 
Universidad: Organización y Método
 (O&M)
 
Materia: Inteligencia Artificial 

📝 	Título de Proyecto: Creación de Página de Web 

🙍 Estudiante: Esmeralda R. Guzmán Feliz

👨‍🏫 Maestro: Juancito Peña


INTRODUCCION


El Desarrollo Web es el arte y la ciencia de construir y mantener sitios y aplicaciones en internet. En la era digital, dominar esta disciplina es una puerta de entrada a la innovación tecnológica y a un vasto campo laboral. Este recurso educativo está diseñado para desmitificar el proceso de creación de una tienda en línea funcional, el proyecto Clickmart.
A través de este manual, exploraremos los pilares del desarrollo frontend: HTML (la estructura), CSS (el estilo) y JavaScript (la interactividad). Utilizaremos marcos de trabajo modernos como Bootstrap para acelerar el diseño responsivo y Font Awesome para la iconografía. Finalmente, cubriremos el proceso crucial de despliegue, llevando nuestro código desde el editor de Visual Studio Code hasta ser visible globalmente a través de plataformas profesionales como GitHub Pages y Vercel. Este documento es tu mapa detallado para convertirte, paso a paso, de principiante a desarrollador capaz de publicar proyectos en la web.


📚 Guía Integral de Desarrollo Web: Proyecto Clickmart:

1. Fundamentos de la Programación Web
La Programación Web es el proceso de crear sitios y aplicaciones que se ejecutan en navegadores de internet. Se divide en dos grandes áreas:
•	Frontend (Diseño y Maquetado Web): Lo que el usuario ve e interactúa (HTML, CSS, JavaScript).
•	Backend: La lógica que maneja los datos y el servidor (Bases de datos, APIs, etc.).
Tecnologías Fundamentales (Orden Histórico)
Tecnología	Rol Histórico	Descripción
HTML	1991 (El Papiro Digital)	Estructura de la página. Define el contenido (texto, imágenes, enlaces, etc.). Es la base de cualquier sitio web.
CSS	1996 (El Maquillaje)	Estilo y presentación. Controla la apariencia (colores, fuentes, diseño, animaciones). Separa el contenido del diseño.
JavaScript (JS)	1995 (El Cerebro)	Comportamiento e interactividad. Permite crear funciones dinámicas, validar formularios y manipular la página en tiempo real.
Font Awesome	2012 (Los Iconos)	Librería de iconografía gratuita. Se usa para añadir iconos escalables y vectoriales a la interfaz (ej., 🛒, <i class="fas fa-shopping-cart"></i>).
Bootstrap	2011 (El Marco de Trabajo)	Framework de CSS para diseño responsivo. Proporciona componentes pre-diseñados (botones, navegación, carruseles, grids) que aceleran el maquetado.
2. Aplicación de las Tecnologías en el Proyecto Clickmart
El proyecto Clickmart es un ejemplo de Frontend (Diseño y Maquetado Web) que utiliza las siguientes tecnologías:
Tecnología	Uso en Clickmart
HTML	Crea la estructura de la página: header, main, footer, la lista de productos (div id="product-list"), el carrito (offcanvas), y los modales (modal).
CSS	Se usa el archivo style.css (aunque vacío en el ejemplo) para cualquier ajuste de estilo personalizado, si Bootstrap no fuera suficiente.
Bootstrap	Maquetado Rápido y Responsivo: Define el layout (sistema de grid), el diseño del Navbar, el Carrusel, la tarjeta de producto, el Offcanvas (carrito) y los Modales (detalle y pago).
Font Awesome	Se usa para los iconos clave como 🛒 (fa-shopping-cart), 🔍 (fa-search), y las redes sociales del footer.
JavaScript	Lógica de la Aplicación: Maneja la carga de productos (desde una API externa), el filtrado por búsqueda, la adición/eliminación del carrito, el cálculo del total y la generación del PDF de pago.
3. Guía Detallada del Proyecto (Manual Documentado)
Este proyecto se compone de tres archivos principales que deben estar en la misma carpeta: index.html, style.css, y script.js.
3.1. 📄 index.html (Estructura y Maquetado)
HTML
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clickmart 🛒 | Tienda Ficticia</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <header>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <span class="fs-4 me-2">🛒</span> <span class="fs-3">Clickmart</span>
                </a>
                <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart">
                    Carrito <i class="fas fa-shopping-cart"></i> <span id="cart-counter" class="badge bg-danger rounded-pill">0</span>
                </button>
            </div>
        </nav>
    </header>

    <main class="container mt-5 pt-5">
        <h1 class="my-4 text-center text-primary">🛍️ Nuestros Productos</h1>

        <div id="heroCarousel" class="carousel slide mb-5 shadow-lg rounded-3 overflow-hidden" data-bs-ride="carousel" style="height: 250px;">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner h-100">
                <div class="carousel-item active h-100"><img src="https://cdn.pixabay.com/photo/2015/08/07/23/58/ring-879932_1280.jpg" class="d-block w-100 h-100 object-fit-cover" alt="Joyeria Fina">...</div>
                <div class="carousel-item h-100"><img src="https://cdn.pixabay.com/photo/2017/08/10/03/16/computer-2617622_1280.jpg" class="d-block w-100 h-100 object-fit-cover" alt="Ofertas de Electrónica">...</div>
                <div class="carousel-item h-100"><img src="https://cdn.pixabay.com/photo/2023/06/03/05/41/jacket-8036987_1280.png" class="d-block w-100 h-100 object-fit-cover" alt="Nueva Coleccion de Ropa">...</div>
            </div>
            </div>

        <div class="row mb-4">
            <div class="col-lg-6 offset-lg-3">
                <div class="input-group shadow-sm">
                    <span class="input-group-text bg-light border-end-0 text-primary"><i class="fas fa-search"></i></span>
                    <input type="text" id="search-input" class="form-control border-start-0" placeholder="Buscar productos por nombre..." onkeyup="filterProducts()">
                    <button class="btn btn-primary" onclick="filterProducts()">Buscar</button>
                </div>
            </div>
        </div>

        <div id="product-list" class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            </div>

    </main>

    <footer class="bg-primary text-white pt-5 pb-3 mt-5 shadow-lg">
        </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="script.js"></script>
</body>
3.2. 🎨 style.css (Estilos Personalizados)
Este archivo se deja en blanco para permitir estilos futuros, pero es crucial para las buenas prácticas.
CSS
/* Aquí puedes agregar cualquier estilo CSS personalizado que no esté cubierto por Bootstrap. */
/* Por ejemplo, cambiar el color del fondo de la página o ajustar fuentes específicas. */
3.3. 💻 script.js (Lógica y Funcionalidad)
Este archivo contiene la lógica completa del proyecto, incluyendo la comunicación con la API.
JavaScript
// =========================================================
// 1. VARIABLES GLOBALES Y CONFIGURACIÓN
// =========================================================
const API_URL = 'https://fakestoreapi.com/products';
const productList = document.getElementById('product-list');
const cartItemsContainer = document.getElementById('cart-items');
const cartCounter = document.getElementById('cart-counter');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const paymentForm = document.getElementById('payment-form');

let productsData = []; // Almacena todos los productos cargados de la API
let cart = JSON.parse(localStorage.getItem('cart')) || []; // Carga el carrito del almacenamiento local

// =========================================================
// 2. CARGA DE PRODUCTOS
// =========================================================
/**
 * Obtiene los productos de la API y los renderiza.
 */
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        productsData = await response.json();
        renderProducts(productsData);
        updateCartDisplay(); // Inicializa el carrito al cargar
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        productList.innerHTML = `<div class="col-12 text-center mt-5">
            <h4 class="text-danger">Error: No se pudieron cargar los productos de la API.</h4>
        </div>`;
    }
}

/**
 * Renderiza los productos en la interfaz.
 * @param {Array} products - Lista de productos a mostrar.
 */
function renderProducts(products) {
    productList.innerHTML = products.map(product => `
        <div class="col">
            <div class="card h-100 shadow-sm border-0">
                <img src="${product.image}" class="card-img-top p-3" alt="${product.title}" style="height: 200px; object-fit: contain;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title text-primary fs-6">${product.title.substring(0, 40)}...</h5>
                    <p class="card-text text-success fw-bold mt-auto">$${product.price.toFixed(2)}</p>
                    <button class="btn btn-outline-primary btn-sm mt-2" onclick="showProductDetails(${product.id})">
                        Detalles <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// =========================================================
// 3. FUNCIONALIDAD DE FILTRADO
// =========================================================
/**
 * Filtra los productos según el texto ingresado en la barra de búsqueda.
 */
function filterProducts() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    
    // Filtra el array de productos por título
    const filteredProducts = productsData.filter(product => {
        return product.title.toLowerCase().includes(searchTerm);
    });

    renderProducts(filteredProducts);

    if (filteredProducts.length === 0) {
        productList.innerHTML = `<div class="col-12 text-center mt-5">
            <h4 class="text-muted">¡Ups! 🧐 No encontramos productos que coincidan con la búsqueda.</h4>
        </div>`;
    }
}

// =========================================================
// 4. FUNCIONALIDAD DEL CARRITO (Añadir, Quitar, Actualizar)
// =========================================================

// ... (El resto del código JavaScript para carrito, modales, y PDF se mantiene igual)

// Carga inicial
fetchProducts(); 

4. Desarrollo en Visual Studio Code (VS Code)
VS Code es el editor de código más popular. Es una herramienta poderosa, pero sencilla para empezar.
4.1. Configuración del Entorno
1.	Instalar VS Code: Descarga e instala la aplicación oficial desde el sitio web.
2.	Crear Carpeta del Proyecto: Crea una carpeta en tu escritorio o documentos, por ejemplo, Clickmart-Project.
3.	Abrir en VS Code: Abre VS Code y ve a File > Open Folder... y selecciona tu carpeta Clickmart-Project.
4.2. Creación de Archivos
Dentro de la carpeta Clickmart-Project y usando el explorador de archivos de VS Code, crea los siguientes tres archivos:
•	index.html: Contiene toda la estructura del proyecto (copia el código de la sección 3.1).
•	style.css: Contiene las reglas de estilo (copia el código de la sección 3.2).
•	script.js: Contiene la lógica de programación (copia el código de la sección 3.3).
4.3. Visualización en el Navegador
Para ver tu proyecto en acción sin tener que recargar la página manualmente cada vez que haces un cambio, usaremos una extensión clave: Live Server.
1.	Instalar Live Server:
o	En VS Code, haz clic en el icono de Extensiones (cuatro cuadrados, uno separado) en la barra lateral izquierda.
o	En la barra de búsqueda, escribe "Live Server".
o	Haz clic en la extensión de Ritwick Dey y presiona el botón Install.
2.	Usar Live Server:
o	Vuelve a tu archivo index.html.
o	Haz clic derecho en cualquier parte del código y selecciona Open with Live Server.
o	Esto abrirá automáticamente tu proyecto en una nueva pestaña del navegador. Ahora, cada vez que guardes (Ctrl+S o Cmd+S) un cambio en html, css o js, la página se actualizará sola.
5. Despliegue del Proyecto en GitHub Pages (Manual)
GitHub es la plataforma más usada para alojar y compartir proyectos de código. GitHub Pages te permite publicar tu sitio web estático gratuitamente.
5.1. Creación de la Cuenta en GitHub
1.	Ve a https://github.com/.
2.	Haz clic en Sign up (Registrarse).
3.	Sigue los pasos: introduce tu correo, crea una contraseña y un nombre de usuario.
4.	Verifica tu cuenta por correo electrónico.
5.2. Creación del Repositorio (Proyecto)
1.	Inicia sesión en GitHub.
2.	En la esquina superior derecha, haz clic en el signo "+" y selecciona New repository (Nuevo repositorio).
3.	Repository name (Nombre del repositorio): Escribe un nombre único para tu proyecto (ej., Clickmart-Tienda).
4.	Description (Opcional): Una breve descripción del proyecto.
5.	Public/Private: Selecciona Public (Público) para que se pueda desplegar en GitHub Pages.
6.	Asegúrate de que las opciones Initialize this repository with: estén desmarcadas.
7.	Haz clic en el botón Create repository.
5.3. Subida de Archivos (Arrastrar y Soltar)
1.	Una vez creado el repositorio, verás una página que te pide subir archivos.
2.	Abre la carpeta de tu proyecto (Clickmart-Project) en tu computadora.
3.	Selecciona tus tres archivos (index.html, style.css, script.js) y arrástralos directamente al área de carga de la página de GitHub.
4.	En la parte inferior, escribe un Commit message (ej., "Primer commit de la tienda Clickmart").
5.	Haz clic en el botón verde Commit changes (Confirmar cambios).
5.4. Publicación en GitHub Pages
1.	En la página de tu repositorio, haz clic en la pestaña Settings (Configuración).
2.	En el menú lateral izquierdo, haz clic en Pages.
3.	Bajo el título Build and deployment (Compilación y despliegue):
o	En Source (Fuente), asegúrate de que esté seleccionada la opción Deploy from a branch (Desplegar desde una rama).
o	En Branch (Rama), selecciona la rama main (o master) y la carpeta /(root) (Raíz).
o	Haz clic en Save (Guardar).
4.	La página se recargará. Verás un mensaje que dice: "Your site is live at..." (Tu sitio está en vivo en...). Tarda unos minutos en activarse. Copia esta URL y compártela.
6. Despliegue en Vercel (Paso a Paso Resumido)
Vercel es una plataforma de hosting moderna que facilita el despliegue de proyectos web al vincularse directamente con GitHub.
6.1. Creación de Cuenta y Vinculación con GitHub
1.	Ve a https://vercel.com/.
2.	Haz clic en Sign Up (Registrarse).
3.	Selecciona la opción Continue with GitHub. (Es crucial para automatizar el despliegue).
4.	Sigue las instrucciones en GitHub para autorizar a Vercel a acceder a tus repositorios.
5.	Serás redirigido de vuelta a Vercel.
6.2. Importación y Despliegue del Proyecto
1.	En el Dashboard (Panel de Control) de Vercel, haz clic en Add New... y selecciona Project.
2.	Vercel mostrará una lista de tus repositorios de GitHub. Busca y selecciona el repositorio que creaste (Clickmart-Tienda).
3.	En la sección Configure Project:
o	Root Directory (Directorio Raíz): Déjalo en blanco o en . (ya que tus archivos están en la raíz).
o	Framework Preset: Déjalo en Other (Ya que es un proyecto simple de HTML/CSS/JS).
o	Build & Output Settings: No necesitas cambiar nada para este proyecto estático simple.
4.	Haz clic en el botón Deploy (Desplegar).
5.	Vercel compilará tu proyecto y, en menos de un minuto, verás una pantalla de "Congratulations!" con la URL final de tu sitio.
6.3. Visualización y Compartición
•	URL de Vercel: Vercel te proporcionará una URL profesional y aleatoria (ej., clickmart-tienda-xyz123.vercel.app). Haz clic en la URL para ver tu tienda en vivo.
•	Compartir: Esta URL es pública y puedes compartirla inmediatamente. Además, Vercel se encarga de que cualquier cambio que subas a la rama main de GitHub se actualice automáticamente en Vercel.


