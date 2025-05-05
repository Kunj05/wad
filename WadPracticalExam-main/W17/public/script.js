fetch('http://localhost:3000/api/employees')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('employee-list');

    data.forEach(emp => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <img src="${emp.profileImage}" alt="${emp.name}">
        <h3>${emp.name}</h3>
        <p><strong>Designation:</strong> ${emp.designation}</p>
        <p><strong>Department:</strong> ${emp.department}</p>
        <p><strong>Salary:</strong> $${emp.salary}</p>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Failed to fetch employees:', err);
  });
