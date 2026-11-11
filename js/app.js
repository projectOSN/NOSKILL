const form = document.getElementById("loginForm");
const identity = document.getElementById("identity");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginButton = document.getElementById("loginButton");
const formMessage = document.getElementById("formMessage");
const forgotButton = document.getElementById("forgotButton");
const toast = document.getElementById("toast");
const remember = document.getElementById("remember");

const AUTH_USER = "Buahmentah";
const AUTH_PASS = "Buahtinggal";
const SESSION_KEY = "tgp_auth_session";
const APP_PAGE = "tracking-generator.html";

document.getElementById("year").textContent = new Date().getFullYear();

// Sudah login → langsung ke app
(function redirectIfLoggedIn() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY) || localStorage.getItem(SESSION_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (data && data.ok && data.user === AUTH_USER) {
      window.location.replace(APP_PAGE);
    }
  } catch (e) {}
})();

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2800);
}

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    const isVisible = password.type === "text";
    password.type = isVisible ? "password" : "text";
    togglePassword.setAttribute("aria-pressed", String(!isVisible));
    togglePassword.setAttribute(
      "aria-label",
      isVisible ? "Tampilkan password" : "Sembunyikan password"
    );
    const img = togglePassword.querySelector("img");
    if (img) {
      img.src = isVisible ? "assets/icons/eye.svg" : "assets/icons/eye-off.svg";
    }
  });
}

if (forgotButton) {
  forgotButton.addEventListener("click", () => {
    showToast("Silakan hubungi administrator untuk reset password.");
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.classList.remove("success");

  const user = identity.value.trim();
  const pass = password.value;

  if (!user) {
    formMessage.textContent = "Username atau email wajib diisi.";
    identity.focus();
    return;
  }
  if (!pass) {
    formMessage.textContent = "Password wajib diisi.";
    password.focus();
    return;
  }

  loginButton.classList.add("loading");
  loginButton.querySelector("span:first-child").textContent = "Memeriksa...";
  formMessage.textContent = "";

  window.setTimeout(() => {
    const ok = user === AUTH_USER && pass === AUTH_PASS;

    loginButton.classList.remove("loading");
    loginButton.querySelector("span:first-child").textContent = "Masuk ke akun";

    if (!ok) {
      formMessage.textContent = "Username atau password salah.";
      formMessage.classList.remove("success");
      password.focus();
      return;
    }

    const payload = JSON.stringify({
      ok: true,
      user: AUTH_USER,
      at: Date.now(),
    });

    sessionStorage.setItem(SESSION_KEY, payload);
    if (remember && remember.checked) {
      localStorage.setItem(SESSION_KEY, payload);
    } else {
      localStorage.removeItem(SESSION_KEY);
    }

    formMessage.textContent = "Berhasil masuk. Mengalihkan…";
    formMessage.classList.add("success");
    window.location.href = APP_PAGE;
  }, 450);
});
