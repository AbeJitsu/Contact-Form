// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check if form is valid
        if (form.checkValidity()) {
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Log form data (in production, you'd send this to a server)
            console.log('Form submitted:', formData);

            // Show success message
            showSuccessMessage();

            // Reset form
            form.reset();
        } else {
            // Trigger native validation UI
            form.reportValidity();
        }
    });

    function showSuccessMessage() {
        // Create success notification
        const successNotification = document.createElement('div');
        successNotification.className = 'success-notification';
        successNotification.innerHTML = `
            <div class="success-notification-content">
                <div class="success-icon"></div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you soon.</p>
                <button class="close-notification">Close</button>
            </div>
        `;

        // Add to page
        document.body.appendChild(successNotification);

        // Trigger animation
        setTimeout(() => {
            successNotification.classList.add('show');
        }, 10);

        // Close button handler
        const closeBtn = successNotification.querySelector('.close-notification');
        closeBtn.addEventListener('click', () => {
            closeSuccessMessage(successNotification);
        });

        // Auto-close after 5 seconds
        setTimeout(() => {
            closeSuccessMessage(successNotification);
        }, 5000);

        // Click outside to close
        successNotification.addEventListener('click', (e) => {
            if (e.target === successNotification) {
                closeSuccessMessage(successNotification);
            }
        });
    }

    function closeSuccessMessage(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }
});
