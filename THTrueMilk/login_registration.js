const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});

// Hàm chung để xử lý ẩn/hiện mật khẩu
function setupPasswordToggle(inputId, iconId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(iconId);

    if (passwordInput && toggleIcon) {
        toggleIcon.addEventListener('click', function () {
            // Kiểm tra type hiện tại và đổi ngược lại
            const isPassword = passwordInput.getAttribute('type') === 'password';
            passwordInput.setAttribute('type', isPassword ? 'text' : 'password');

            // Đổi class của icon Boxicons (ẩn <-> hiện)
            this.classList.toggle('bx-hide');
            this.classList.toggle('bx-show');
        });
    }
}
// Chạy hàm cho cả form Login và form Register
setupPasswordToggle('password-login', 'toggle-login-pass');
setupPasswordToggle('password-register', 'toggle-register-pass');

function HandleRegister() {
    const username = document.getElementById("username-register").value.trim();
    const email = document.getElementById("email-register").value.trim();
    const password = document.getElementById("password-register").value.trim();

    if (!username || !email || !password) {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Email không hợp lệ!");
        return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
        alert("Mật khẩu yếu!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("user")) || {};

    if (users[email]) {
        alert("Email đã được sử dụng!");
        return;
    }

    users[email] = { username, email, password };

    localStorage.setItem("user", JSON.stringify(users));

    alert("Đăng ký thành công!");
}

function HandleLogin() {
    const email = document.getElementById("username-login").value.trim();
    const password = document.getElementById("password-login").value.trim();

    let users = JSON.parse(localStorage.getItem("user")) || {};

    const user = users[email];

    if (user) {
        if (user.password === password) {
            alert("Đăng nhập thành công!");

            localStorage.setItem("alreadyLogin", "1");
            localStorage.setItem("currentUser", JSON.stringify(user));

            window.location.href = "../home/index.html";
        } else {
            alert("Sai mật khẩu!");
        }
    } else {
        alert("Tài khoản không tồn tại!");
    }
}

