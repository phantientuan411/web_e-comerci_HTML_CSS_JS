function Carttotal()
{
    const boxsubtotal=document.getElementById("subtotal");
    const boxtotal=document.getElementById("total");
    const boxcoupon=document.getElementById("coupontotal");
    const couponrow=document.getElementById("couponrow");
    const couponhr=document.getElementById("couponhr");
    const coupon=document.getElementById("coupon-input").value.trim();
    const valindexcoupon=['CODEWEB10DIEM','WEBCOBAN'];
    let alltotal=0;
    cart.forEach(item => {
        alltotal+=item.price*item.quantity;
    });
    const subtotal=alltotal;
    let total=alltotal;
    if(valindexcoupon.includes(coupon.toUpperCase()))
    {
        total=alltotal*0.9;
        couponrow.style.display="flex";
        couponrow.style.justifyContent="space-between";
        couponhr.style.display="block";
        boxcoupon.innerHTML="10%";
    }
    boxsubtotal.innerHTML = `$${subtotal}`;
    boxtotal.innerHTML = `$${total}`;
}

function checkCoupon()
{
    const coupon=document.getElementById("coupon-input").value.trim();
    const messagetag=document.getElementById("coupon-message");
    const valindexcoupon=['CODEWEB10DIEM','WEBCOBAN'];
    if(coupon==="")
    {
        messagetag.innerHTML="Please enter the coupon code!";
        messagetag.className="message error";
    }
    else if(valindexcoupon.includes(coupon.toUpperCase()))
    {
        messagetag.innerHTML="Coupon code applied successfully!";
        messagetag.className="message success";
    }
    else
    {
        messagetag.innerHTML="Invalindex coupon code!";
        messagetag.className="message error";
    }
    Carttotal();
}

let cart = JSON.parse(localStorage.getItem("cart"))

// Fix image paths for cart items (cart.html is in subfolder)
function fixImagePath(path) {
    if (path && path.includes('anh/')) {
        return '../' + path;
    }
    return path;
}

if (cart) {
    cart.forEach(item => {
        item.anh_main = fixImagePath(item.anh_main);
        item.anh1 = fixImagePath(item.anh1);
        item.anh2 = fixImagePath(item.anh2);
        item.anh3 = fixImagePath(item.anh3);
    });
}

const cartitem = document.getElementById("item");

function getcart()
{
    cartitem.innerHTML="";

    cart.forEach((item, index) =>
    {
        const itemtotal = item.price * item.quantity;

        const carthtml = `
        <div class="cart-item">
            <div class="product-info">
                <span class="delete" onclick="deleteitem(${index})">X</span>
                <img src="${item.anh_main}" class="product-img">
                <span class="product-name">${item.name}</span>
            </div>

            <div class="product-price">
                $${item.price}
            </div>

            <div class="product-quantity">
                <button onclick="decreaseQuantity(${index})">-</button>

                <input type="number" min="1"
                value="${item.quantity}"
                onchange="changequantity(${index}, this.value)">

                <button onclick="increaseQuantity(${index})">+</button>
            </div>

            <div class="product-subtotal">
                $${itemtotal}
            </div>
        </div>`;

        cartitem.innerHTML += carthtml;
    });

    Carttotal();
}
function updateCart(){
    localStorage.setItem("cart", JSON.stringify(cart));
    getcart();
}
function changequantity(index, value){
    cart[index].quantity = Math.max(1, parseInt(value) || 1);
    updateCart();
}

function increaseQuantity(index){
    cart[index].quantity++;
    updateCart();
}

function decreaseQuantity(index){
    if(cart[index].quantity > 1){
        cart[index].quantity--;
        updateCart();
    }
}
function deleteitem(index)
{
    cart.splice(index, 1);
    updateCart();
}

function Gotocheckout()
{
    if(cart.length===0)
        alert("Your cart is empty!");
    else
        window.location.href="./checkout.html";
}

getcart();