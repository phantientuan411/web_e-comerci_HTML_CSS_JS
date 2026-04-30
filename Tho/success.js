function showOrder() {
    const orderData = JSON.parse(localStorage.getItem("mypayment"));
    const orderItemsContainer = document.getElementById("order-items");
    const orderIdContainer = document.getElementById("order-id");

    if (!orderData) {
        orderItemsContainer.innerHTML = "<p>Không tìm thấy đơn hàng.</p>";
        return;
    }

    if (!orderData.id) {
        orderData.id = Date.now();
        localStorage.setItem("mypayment", JSON.stringify(orderData));
    }

    orderIdContainer.innerText = "#ORDER" + orderData.id;

    let itemsHtml = "";

    orderData.items.forEach(item => {
        itemsHtml += `
            <div class="item-row">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });

    itemsHtml += `
        <hr>
        <div class="item-row">
            <span>Subtotal:</span>
            <span>$${parseFloat(orderData.subtotal).toFixed(2)}</span>
        </div>
    `;

    if(orderData.discount !== ""){
        itemsHtml += `
        <div class="item-row">
            <span>Discount:</span>
            <span>${orderData.discount}</span>
        </div>
        `;
    }

    itemsHtml += `
        <div class="item-row" style="font-weight: bold; font-size: 20px;">
            <span>Total:</span>
            <span>$${parseFloat(orderData.total).toFixed(2)}</span>
        </div>
    `;

    orderItemsContainer.innerHTML = itemsHtml;
}

showOrder();