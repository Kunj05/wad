// Initialize local storage for users if it doesn't exist
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}

// Form validation functions
function validateName(name) {
  return name.trim().length >= 3;
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateMobile(mobile) {
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}

function validateDOB(dob) {
  if (!dob) return false;
  const currentDate = new Date();
  const inputDate = new Date(dob);
  return inputDate < currentDate;
}

function validateUsername(username) {
  return username.trim().length >= 4;
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateCity(city) {
  return city.trim().length >= 2;
}

function validateAddress(address) {
  return address.trim().length >= 10;
}

// User registration
if (document.getElementById("registrationForm")) {
  const registrationForm = document.getElementById("registrationForm");

  registrationForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const dob = document.getElementById("dob").value;
    const city = document.getElementById("city").value;
    const address = document.getElementById("address").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Clear previous error messages
    clearErrors();

    // Validate form inputs
    let isValid = true;

    if (!validateName(name)) {
      displayError("nameError", "Name must be at least 3 characters");
      isValid = false;
    }

    if (!validateEmail(email)) {
      displayError("emailError", "Please enter a valid email address");
      isValid = false;
    }

    if (!validateMobile(mobile)) {
      displayError("mobileError", "Mobile number must be 10 digits");
      isValid = false;
    }

    if (!validateDOB(dob)) {
      displayError("dobError", "Please enter a valid date of birth");
      isValid = false;
    }

    if (!validateCity(city)) {
      displayError("cityError", "City must be at least 2 characters");
      isValid = false;
    }

    if (!validateAddress(address)) {
      displayError("addressError", "Address must be at least 10 characters");
      isValid = false;
    }

    if (!validateUsername(username)) {
      displayError("usernameError", "Username must be at least 4 characters");
      isValid = false;
    }

    if (!validatePassword(password)) {
      displayError("passwordError", "Password must be at least 6 characters");
      isValid = false;
    }

    // Check if username already exists
    const users = JSON.parse(localStorage.getItem("users"));
    if (users.some((user) => user.username === username)) {
      displayError("usernameError", "Username already exists");
      isValid = false;
    }

    if (isValid) {
      // Create user object
      const user = {
        name,
        email,
        mobile,
        dob,
        city,
        address,
        username,
        password,
      };

      // Simulate AJAX POST request
      simulateAjaxPost("register", user)
        .then((response) => {
          // Add to local storage
          const users = JSON.parse(localStorage.getItem("users"));
          users.push(user);
          localStorage.setItem("users", JSON.stringify(users));

          // Show success message
          document.getElementById("registrationMessage").textContent =
            "Registration successful! You can now log in.";
          registrationForm.reset();

          // Redirect to login after 2 seconds
          setTimeout(() => {
            window.location.href = "login.html";
          }, 2000);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}

// User login
if (document.getElementById("loginForm")) {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Clear previous error messages
    clearErrors();

    // Validate form inputs
    let isValid = true;

    if (!validateUsername(username)) {
      displayError("usernameError", "Username must be at least 4 characters");
      isValid = false;
    }

    if (!validatePassword(password)) {
      displayError("passwordError", "Password must be at least 6 characters");
      isValid = false;
    }

    if (isValid) {
      // Create login object
      const loginData = {
        username,
        password,
      };

      // Simulate AJAX POST request
      simulateAjaxPost("login", loginData)
        .then((response) => {
          // Check if user exists
          const users = JSON.parse(localStorage.getItem("users"));
          const user = users.find(
            (u) => u.username === username && u.password === password
          );

          if (user) {
            // Show success message
            document.getElementById("loginMessage").textContent =
              "Login successful!";
            loginForm.reset();

            // Redirect to user data page after 1 second
            setTimeout(() => {
              window.location.href = "userdata.html";
            }, 1000);
          } else {
            displayError("usernameError", "Invalid username or password");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  });
}

// Helper functions
function displayError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

// Simulate AJAX POST request
function simulateAjaxPost(url, data) {
  return new Promise((resolve, reject) => {
    console.log(`AJAX POST to ${url}:`, data);
    // Simulate network delay
    setTimeout(() => {
      resolve({ success: true, data });
    }, 500);
  });
}
