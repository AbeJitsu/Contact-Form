// Form submission handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.getElementById('email');

    // Additional email validation on input
    emailInput.addEventListener('input', () => {
        validateEmail(emailInput);
    });

    // Validate on blur (when user leaves the field)
    emailInput.addEventListener('blur', () => {
        validateEmail(emailInput);
    });

    function validateEmail(input) {
        const value = input.value.trim();

        // Basic format check (already handled by HTML pattern)
        if (!value) return;

        // Extract domain (everything after @)
        const atIndex = value.indexOf('@');
        if (atIndex === -1) return;

        const domain = value.substring(atIndex + 1);
        const domainParts = domain.split('.');

        // Check domain has at least domain + TLD
        if (domainParts.length < 2) {
            input.setCustomValidity('Email must include a valid domain (e.g., gmail.com)');
            return;
        }

        const domainName = domainParts[0];
        const tld = domainParts[domainParts.length - 1];

        // Domain name should be at least 2 characters
        if (domainName.length < 2) {
            input.setCustomValidity('Domain name is too short (e.g., "gm" should be "gmail")');
            return;
        }

        // TLD should be at least 2 characters
        if (tld.length < 2) {
            input.setCustomValidity('Invalid domain extension');
            return;
        }

        // Common typo detection for popular email providers
        const commonDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com'];
        const typoSuggestions = {
            'gmial.com': 'gmail.com',
            'gmai.com': 'gmail.com',
            'gamil.com': 'gmail.com',
            'yaho.com': 'yahoo.com',
            'yahooo.com': 'yahoo.com',
            'outloo.com': 'outlook.com',
            'outlok.com': 'outlook.com',
            'hotmial.com': 'hotmail.com',
            'hotmai.com': 'hotmail.com'
        };

        if (typoSuggestions[domain.toLowerCase()]) {
            input.setCustomValidity(`Did you mean ${typoSuggestions[domain.toLowerCase()]}?`);
            return;
        }

        // Clear any custom validation if all checks pass
        input.setCustomValidity('');
    }

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
