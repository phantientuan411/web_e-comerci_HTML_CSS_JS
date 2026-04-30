const item = JSON.parse(localStorage.getItem("lastItemSelected"))
function renderStars(star) {
    let full = Math.floor(star);
    let half = star % 1 >= 0.5;
    let empty = 5 - full - (half ? 1 : 0);

    let stars = "";

    for (let i = 0; i < full; i++) stars += "⭐";
    if (half) stars += "⭐";
    for (let i = 0; i < empty; i++) stars += "☆";

    return stars;
}

function loadSelectedColor(item) {
    const savedColor = localStorage.getItem("selectedColor");
    const colorCircles = document.querySelectorAll('.circle');

    if (!savedColor) return;

    colorCircles.forEach(circle => {
        if (circle.dataset.color === savedColor) {
            colorCircles.forEach(c => c.classList.remove('active'));
            circle.classList.add('active');
        }
    });
}
document.getElementById("mainP").innerHTML = `
            <div class="product-gallery">
                <div class="thumbnails">
                    <div class="thumb-box"><img src="${item.anh_main}" alt=""></div>
                    <div class="thumb-box"><img src="${item.anh1}" alt=""></div>
                    <div class="thumb-box"><img src="${item.anh2}" alt=""></div>
                    <div class="thumb-box"><img src="${item.anh3}" alt=""></div>
                </div>

                <div class="main-image">
                    <img src="${item.anh_main}" id="picMain" alt="Main Gamepad">
                </div>
            </div>
            <div class="product-info">
                <h2 class="name" id="nameIt">${item.name}</h2>
                <div class="rating" id="rating">
                    ${renderStars(item.star)} 
                    <span>(${item.reviews || 0} Reviews) | <span class="stock">In Stock</span></span>
                </div>
                <div class="price_p" id="price">$${item.price - (item.price * item.sale)}</div>
                <p class="desc" id="desc">The PS5 DualSense controller is one of the multi-connection controllers that
                    doesn't
                    have a stable connection with all gaming consoles, but it remains a useful device for mobile gamers.
                </p>
                <hr>

                <div class="options">
                    <div class="colors">
                    Colours: 
                        ${item.color.map(c => `
                            <span class="circle ${c}" data-color="${c}" style="background:${c}"></span>
                        `).join("")}
                    </div>
                    <div class="sizes">
                        Size:
                        <span class="size-box">XS</span>
                        <span class="size-box active">S</span>
                        <span class="size-box">M</span>
                        <span class="size-box">L</span>
                        <span class="size-box">XL</span>
                    </div>
                </div>

                <div class="buy-actions">
                    <div class="quantity">
                        <button id="minus">-</button>
                        <input type="number" id="qty-value" value="1" readonly>
                        <button id="plus" class="plus">+</button>
                    </div>
                    <button class="btn-buy">Buy Now</button>
                    <div class="wishlist-icon">❤️</div>
                </div>

                <div class="services-box">
                    <div class="service-item">
                        <div class="icon">🚚</div>
                        <div class="text">
                            <h3>Free Delivery</h3>
                            <p><a href="#">Enter your postal code for Delivery Availability</a></p>
                        </div>
                    </div>

                    <div class="service-item">
                        <div class="icon">🔄</div>
                        <div class="text">
                            <h3>Return Delivery</h3>
                            <p>Free 30 Days Delivery Returns. <a href="#">Details</a></p>
                        </div>
                    </div>
                </div>
            </div>
`
// 1. Xử lý Tăng/Giảm số lượng
const minusBtn = document.getElementById('minus');
const plusBtn = document.getElementById('plus');
const qtyInput = document.getElementById('qty-value');

if (minusBtn && plusBtn) {
    plusBtn.onclick = () => {
        qtyInput.value = parseInt(qtyInput.value) + 1;
    };

    minusBtn.onclick = () => {
        let val = parseInt(qtyInput.value);
        if (val > 1) qtyInput.value = val - 1;
    };
}

// 2. Xử lý Chọn Size
const sizeBoxes = document.querySelectorAll('.size-box');

sizeBoxes.forEach(box => {
    box.onclick = () => {
        // Xóa class active ở các ô khác
        sizeBoxes.forEach(b => b.classList.remove('active'));
        // Thêm class active vào ô vừa chọn
        box.classList.add('active');
    };
});

// 2.1. Xử lý Chọn Màu
const colorCircles = document.querySelectorAll('.circle');

colorCircles.forEach(circle => {
    circle.addEventListener('click', () => {
        colorCircles.forEach(c => c.classList.remove('active'));
        circle.classList.add('active');
    });
});

// 3. Xử lý đổi ảnh lớn khi click vào thumbnail
const thumbnails = document.querySelectorAll('.thumbnails img');
const mainImage = document.querySelector('.main-image img');

if (thumbnails.length && mainImage) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });
    });

    // Mặc định chọn thumbnail đầu tiên khi trang tải
    thumbnails[0].classList.add('active');
}

// 4. Xử lý Modal cho sản phẩm liên quan
const modal = document.getElementById('product-modal');
const closeModal = document.querySelector('.close-modal');

if (modal && closeModal) {
    // Đóng modal khi click vào X
    closeModal.onclick = () => {
        modal.style.display = 'none';
    };

    // Đóng modal khi click bên ngoài
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Xử lý click vào eye icon
    document.addEventListener('click', (event) => {
        if (event.target.closest('.card-icons svg:nth-child(2)')) { // Eye icon là svg thứ 2
            const productCard = event.target.closest('.product-card');
            if (productCard) {
                // Lấy thông tin từ product card
                const imgSrc = productCard.querySelector('.image-box img').src;
                const name = productCard.querySelector('.product-name').textContent;
                const currentPrice = productCard.querySelector('.current-price').textContent;
                const oldPrice = productCard.querySelector('.old-price').textContent;
                const rating = productCard.querySelector('.product-rating').innerHTML;

                // Điền vào modal
                document.getElementById('modal-image').src = imgSrc;
                document.getElementById('modal-name').textContent = name;
                document.getElementById('modal-current-price').textContent = currentPrice;
                document.getElementById('modal-old-price').textContent = oldPrice;
                document.getElementById('modal-rating').innerHTML = rating;

                // Hiển thị modal
                modal.style.display = 'flex';
            }
        }
    });
}
