const products = [
    {
        id: 1,
        name: "3D Key Chain",
        price: 5.99,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=400&q=80",
        description: "A stylish 3D key chain. Explore the model in 3D below!",
        model: "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
    }
];

let cart = [];
let loggedInUser = null;
let selectedCategory = "All";

function renderHome() {
    let html = `<div class="product-grid">`;
    products.forEach(product => {
        html += `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>$${product.price.toFixed(2)}</p>
            <button onclick="showPage('details', ${product.id})">View Details</button>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>`;
    });
    html += `</div>`;
    document.getElementById("home-page").innerHTML = html;
}

function renderProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    let modelViewerHTML = product.model
        ? `<div id="threejs-viewer"></div>`
        : `<img src="${product.image}" alt="${product.name}" style="max-width:300px; border-radius:8px;">`;

    document.getElementById("product-details-page").innerHTML = `
        <div class="product-details">
            ${modelViewerHTML}
            <h2>${product.name}</h2>
            <p>Category: ${product.category}</p>
            <p>$${product.price.toFixed(2)}</p>
            <p>${product.description}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
            <br>
            <a href="#" onclick="showPage('home')">Back to Products</a>
        </div>
    `;
    if (product.model) {
        load3DModel(product.model);
    }
}

function load3DModel(modelUrl) {
    const viewer = document.getElementById("threejs-viewer");
    viewer.innerHTML = '';

    const width = viewer.clientWidth || 600;
    const height = viewer.clientHeight || 350;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf4f4f4);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    viewer.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(2, 5, 5);
    scene.add(directionalLight);

    const loader = new THREE.GLTFLoader();
    loader.load(modelUrl, function(gltf) {
        const model = gltf.scene;
        model.rotation.y = Math.PI;
        scene.add(model);
        animate();
        function animate() {
            requestAnimationFrame(animate);
            model.rotation.y += 0.007;
            renderer.render(scene, camera);
        }
    }, undefined, function(error) {
        viewer.innerHTML = "<div style='color:red'>3D model failed to load.</div>";
    });
}

function showPage(page, productId = null) {
    document.getElementById("home-page").style.display = page === "home" ? "block" : "none";
    document.getElementById("product-details-page").style.display = page === "details" ? "block" : "none";

    if (page === "home") renderHome();
    if (page === "details" && productId !== null) renderProductDetails(productId);
}

window.onload = () => {
    showPage("home");
};