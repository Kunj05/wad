// Function to load and display user data from local storage
function loadUserData() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const tableBody = document.getElementById("userTableBody");

  // Clear existing table rows
  tableBody.innerHTML = "";

  if (users.length === 0) {
    // If no users, show a message
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.setAttribute("colspan", "7");
    cell.textContent = "No users registered yet.";
    cell.style.textAlign = "center";
    cell.style.padding = "20px";
    row.appendChild(cell);
    tableBody.appendChild(row);
  } else {
    // Create a row for each user
    users.forEach((user) => {
      const row = document.createElement("tr");

      // Add user data to row
      const fields = [
        "name",
        "email",
        "mobile",
        "dob",
        "city",
        "address",
        "username",
      ];
      fields.forEach((field) => {
        const cell = document.createElement("td");
        cell.textContent = user[field];
        row.appendChild(cell);
      });

      tableBody.appendChild(row);
    });
  }
}

// Load user data when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadUserData();
});
