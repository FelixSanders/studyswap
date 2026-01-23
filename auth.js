console.log("auth.js loaded");

/* ---------- STORAGE HELPERS ---------- */
function getUsers() {
  return JSON.parse(localStorage.getItem("users") || "[]");
}

function saveUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function setCurrentUser(email) {
  localStorage.setItem("currentUser", email);
}

function getCurrentUser() {
  const email = localStorage.getItem("currentUser");
  if (!email) return null;

  return getUsers().find(u => u.email === email) || null;
}

/* ---------- ERROR UI ---------- */
function setError(msg) {
  const e = document.getElementById("error");
  if (e) {
    e.textContent = msg;
    e.style.display = "block";
  }
}

function clearError() {
  const e = document.getElementById("error");
  if (e) {
    e.textContent = "";
    e.style.display = "none";
  }
}

/* ---------- SIGN UP ---------- */
function signup(email, name, phone, pass, confirmPass) {
  clearError();

  email = email.trim();
  name = name.trim();
  phone = phone.trim();

  if (!email || !name || !phone || !pass || !confirmPass) {
    setError("Please fill in all fields");
    return false;
  }

  if (pass !== confirmPass) {
    setError("Passwords do not match");
    return false;
  }

  const users = getUsers();

  if (users.some(u => u.email === email)) {
    setError("Email already exists");
    return false;
  }

  users.push({
    email,
    name,
    phone,
    pass
  });

  saveUsers(users);
  setCurrentUser(email);
  return true;
}

/* ---------- LOGIN ---------- */
function login(email, pass) {
  clearError();

  email = email.trim();

  if (!email || !pass) {
    setError("Please fill in all fields");
    return false;
  }

  const users = getUsers();
  const user = users.find(
    u => u.email === email && u.pass === pass
  );

  if (!user) {
    setError("Wrong email or password");
    return false;
  }

  setCurrentUser(user.email);
  return true;
}

/* ---------- LOGOUT (OPTIONAL) ---------- */
function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "auth/login.html";
}
