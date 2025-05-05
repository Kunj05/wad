document.addEventListener('DOMContentLoaded', function () {
    // Enable tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Form validation
    var forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                // For demo purposes, prevent actual form submission
                event.preventDefault();
                alert('Registration successful! Thank you for registering.');
            }
            
            form.classList.add('was-validated');
        }, false);
    });
});
