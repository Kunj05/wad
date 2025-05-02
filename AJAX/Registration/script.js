document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
  
    // Register form handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
  
        const user = {
          name: document.getElementById('name').value.trim(),
          email: document.getElementById('email').value.trim(),
          mobile: document.getElementById('mobile').value.trim(),
          dob: document.getElementById('dob').value,
          city: document.getElementById('city').value.trim(),
          address: document.getElementById('address').value.trim(),
          username: document.getElementById('username').value.trim(),
          password: document.getElementById('password').value.trim(),
        };
  
        // Validate mobile
        if (!/^\d{10}$/.test(user.mobile)) {
          alert("Mobile number must be 10 digits");
          return;
        }
  
        // Check if username exists
        if (users.some(u => u.username === user.username)) {
          alert("Username already exists.");
          return;
        }
  
        // Simulate AJAX POST with localStorage
        setTimeout(() => {
          users.push(user);
          localStorage.setItem('users', JSON.stringify(users));
          alert("Registration successful!");
          registerForm.reset();
          window.location.href = "login.html";
        }, 300);
      });
    }
  
    // Login form handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
  
        const user = users.find(u => u.username === username && u.password === password);
  
        if (user) {
          alert(`Welcome, ${user.name}!`);
          window.location.href = "users.html";
        } else {
          alert("Invalid credentials.");
        }
      });
    }
  
    // Display registered users on users.html
    const userList = document.getElementById('userList');
    if (userList) {
      if (users.length === 0) {
        userList.innerHTML = "<li>No users registered.</li>";
      } else {
        users.forEach(user => {
          const li = document.createElement('li');
          li.textContent = `${user.name} | ${user.email} | ${user.mobile} | ${user.city}`;
          userList.appendChild(li);
        });
      }
    }
  });
  