const products = [
  { id: 1, name: "Love Keychain", price: 99, category: "Keychains", image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=400&q=80", description: "Heart-shaped keychain perfect for gifts." },
  { id: 2, name: "Custom Mug", price: 249, category: "Mugs", image: "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=400&q=80", description: "Add your own photo or name!" },
  { id: 3, name: "Wooden Photo Frame", price: 499, category: "Photo Frames", image: "https://images.unsplash.com/photo-1601655782461-5f62b7fc8a6f?auto=format&fit=crop&w=400&q=80", description: "Decorative wooden photo frame for memories." },
  { id: 4, name: "Gift Hamper Box", price: 999, category: "Gift Items", image: "https://images.unsplash.com/photo-1607082349250-576c2d5dbfe3?auto=format&fit=crop&w=400&q=80", description: "All-in-one surprise gift box!" },
  { id: 5, name: "Ceramic Tea Cup", price: 199, category: "Cups", image: "https://images.unsplash.com/photo-1525715843408-dba7d0e4c58e?auto=format&fit=crop&w=400&q=80", description: "Premium ceramic tea cup set." },
  { id: 6, name: "Couple Keychain Set", price: 149, category: "Keychains", image: "https://images.unsplash.com/photo-1614335169047-98b5e5cfec19?auto=format&fit=crop&w=400&q=80", description: "Romantic gift for couples." },
  { id: 7, name: "Magic Mug", price: 399, category: "Mugs", image: "https://images.unsplash.com/photo-1612154242639-4fe39f10c568?auto=format&fit=crop&w=400&q=80", description: "Reveals photo with hot water!" },
  { id: 8, name: "Engraved Wooden Frame", price: 599, category: "Photo Frames", image: "https://images.unsplash.com/photo-1556135063-94a3582b6ec9?auto=format&fit=crop&w=400&q=80", description: "Engraved with your custom text." },
  { id: 9, name: "Gift Basket Surprise", price: 899, category: "Gift Items", image: "https://images.unsplash.com/photo-1587202372775-74e05f3c17c7?auto=format&fit=crop&w=400&q=80", description: "Includes sweets, card, and more!" },
  { id: 10, name: "Glass Cup Set", price: 349, category: "Cups", image: "https://images.unsplash.com/photo-1524593119773-e09d4efba59c?auto=format&fit=crop&w=400&q=80", description: "Elegant glass set for guests." }
];

function showPage(page) {
  document.querySelectorAll("main > section").forEach(s => s.style.display = 'none');
  document.getElementById(`${page}-page`).style.display = 'block';
}

function showCategory(category) {
  showPage('home');
  const list = category === 'All' ? products : products.filter(p => p.category === category);
  let html = '<div class="product-grid">';
  list.forEach(p => {
    html += `<div class="product-card">
              <img src="${p.image}" alt="${p.name}">
              <h2>${p.name}</h2>
              <p>₹${p.price}</p>
              <p><small>${p.category}</small></p>
              <button onclick="showDetails(${p.id})">View</button>
            </div>`;
  });
  html += '</div>';
  document.getElementById("home-page").innerHTML = html;
}

function showDetails(id) {
  const p = products.find(pr => pr.id === id);
  if (!p) return;
  document.getElementById("product-details-page").innerHTML = `<div class='product-details'>
    <img src='${p.image}' alt='${p.name}' />
    <h2>${p.name}</h2>
    <p><strong>₹${p.price}</strong></p>
    <p>${p.description}</p>
    <p><em>Category: ${p.category}</em></p>
    <button>Add to Cart</button><br><br>
    <a href='#' onclick='showCategory("All")'>← Back</a>
  </div>`;
  showPage("product-details");
}

function addProduct() {
  const name = document.getElementById("admin-name").value.trim();
  const price = parseFloat(document.getElementById("admin-price").value);
  const category = document.getElementById("admin-category").value.trim();
  const image = document.getElementById("admin-image").value.trim();
  const description = document.getElementById("admin-description").value.trim();
  if (!name || !price || !category || !image || !description) return alert("Fill all fields");
  const newId = products.length + 1;
  products.push({ id: newId, name, price, category, image, description });
  alert("Product added!");
  showCategory("All");
}

window.onload = () => showCategory("All");
