const loginAready = localStorage.getItem("alreadyLogin")
if (loginAready !== "1") {
  const log = confirm("Bạn chưa đăng nhập!!!")
  window.location.href = getNavPath("index.html")
}
let img = document.getElementById("avatar");
let fileInput = document.getElementById("fileInput");

if (!window.user) {
  window.user = JSON.parse(localStorage.getItem("currentUser")) || {};
}

if (window.user.img) {
  img.src = window.user.img;
}

img.onclick = () => {
  fileInput.click();
};

fileInput.onchange = () => {
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const base64 = e.target.result;

      img.src = base64;

      window.user = JSON.parse(localStorage.getItem("currentUser")) || {};
      window.user.img = base64;

      localStorage.setItem("currentUser", JSON.stringify(window.user));

      let users = JSON.parse(localStorage.getItem("user")) || {};
      if (window.user.email) {
        users[window.user.email] = window.user;
        localStorage.setItem("user", JSON.stringify(users));
      }
    };

    reader.readAsDataURL(file);
  }
};
function saveInfor() {

}

function AccountSetting() {
  document.getElementById("user_main").innerHTML = `
    <h3>Account Setting</h3>
                <form action="">
                    <div class="User_input">
                        <div>
                            <p>First name</p>
                            <input type="text" id="first_name">

                        </div>
                        <div>
                            <p>Last Name</p>
                            <input type="text" id="last_name">

                        </div>
                    </div>
                    <div class="User_input">
                        <div>
                            <p>Email</p>
                            <input type="email" name="" id="user_email" readonly>

                        </div>
                        <div>
                            <p>Phone number</p>
                            <input type="text " id="number">
                        </div>
                    </div>
                    <div class="User_input">
                        <div>
                            <p>Address</p>
                            <input type="text" id='address'>
                        </div>
                    </div>
                    <div>
                        <p>Bio</p>
                        <textarea name="" id="bio"></textarea>
                    </div>
                    <div>
                        <button type="button" class="Uppdate_btn" onclick='updateInfor()'>Uppdate</button>
                        <button type="button" class="cancel_btn">cancel</button>
                    </div>
                </form>
  `
  if (window.user) {
    document.getElementById("first_name").value = window.user.fname || "";
    document.getElementById("last_name").value = window.user.lname || "";
    document.getElementById("user_email").value = window.user.email || "";
    document.getElementById("number").value = window.user.number || "";
    document.getElementById("address").value = window.user.address || "";
    document.getElementById("bio").value = window.user.bio || "";
  }
}
function passSet() {
  document.getElementById("user_main").innerHTML = `
  <h3>Password</h3>
                <form action="">
                    <div class="oin">
                        <p>Old Password</p>
                        <input type="password" name="" id="password">
                    </div>
                    <div class="User_input">
                        <div>
                            <p>new Password</p>
                            <input type="password" id="npass">
                        </div>
                        <div>
                            <p>re-enter password</p>
                            <input type="password" id="re_npass">

                        </div>
                    </div>
                    <div class="btn_form">
                        <button type="button" class="Uppdate_btn" id='savePass' onclick='updatePass()'>Uppdate</button>
                        <button type="button" class="cancel_btn">cancel</button>
                    </div>
                </form>`
}
function order() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const container = document.getElementById("user_main");

  if (orders.length === 0) {
    container.innerHTML = `<p>No orders found</p>`;
    return;
  }

  let html = "";

  orders.forEach((order, index) => {

    let itemsHtml = "";

    const items = Array.isArray(order.items)
      ? order.items
      : [order.items];

    items.forEach(item => {

      itemsHtml += `
    <div class="order_item">
      <span>${item.name} (x${item.quantity})</span>
      <span>$${(item.price * item.quantity).toFixed(2)}</span>
    </div>
  `;

    });

    html += `
      <div class="order_box">
        
        <div class="order_header">
          <span>Order #${index + 1}</span>
          <span>$${parseFloat(order.total).toFixed(2)}</span>
        </div>

        <div class="order_customer">
          <div>${order.customer.name}</div>
          <div>${order.customer.phone}</div>
          <div>${order.customer.address}, ${order.customer.city}</div>
        </div>

        <div class="order_items">
          ${itemsHtml}
        </div>

        <div class="order_footer">
          <span>Subtotal: $${parseFloat(order.subtotal).toFixed(2)}</span>
          ${order.discount ? `<span>Discount: ${order.discount}</span>` : ""}
        </div>

      </div>
    `;
  });

  container.innerHTML = html;
}

document.getElementById("name").innerText = window.user.username;
function updateInfor() {
  let fname = document.getElementById("first_name").value;
  let lname = document.getElementById("last_name").value;
  let number = document.getElementById("number").value;
  let address = document.getElementById("address").value;
  let bio = document.getElementById("bio").value;

  window.user.fname = fname;
  window.user.lname = lname;
  window.user.number = number;
  window.user.address = address;
  window.user.bio = bio;

  localStorage.setItem("currentUser", JSON.stringify(window.user));

  let users = JSON.parse(localStorage.getItem("user")) || {};

  if (window.user.email) {
    users[window.user.email] = window.user;
    localStorage.setItem("user", JSON.stringify(users));
  }

  alert("Cập nhật thành công!");
  window.location.reload();
}
function updatePass() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  let oldPass = document.getElementById("password").value;
  let newPass = document.getElementById("npass").value;
  let re_npass = document.getElementById('re_npass').value;

  if (oldPass !== user.password) {
    const check = alert("Mật khẩu bạn nhập không khớp !!!");
    return;
  }
  else if (newPass !== re_npass) {
    const check = alert("Mật khẩu bạn nhập không khớp !!");
    return;
  }
  else if (newPass === "") {
    alert("Mật khẩu không được trống.");
    return;
  }
  else {
    window.user.password = newPass;
    localStorage.setItem("currentUser", JSON.stringify(window.user));
    let users = JSON.parse(localStorage.getItem("user")) || {};
    if (window.user.email) {
      users[window.user.email] = window.user;
      localStorage.setItem("user", JSON.stringify(users));
    }
    alert("cập nhật thành công.");
    window.location.reload();
  }
}
function LogOut() {
  const check = confirm("Bạn có chắc muốn đăng xuất không?");
  if (check) {
    localStorage.removeItem("alreadyLogin");
    localStorage.setItem("alreadyLogin", "0");
    window.location.href = "../index.html";
  }
}
AccountSetting();