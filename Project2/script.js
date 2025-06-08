document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for all internal navigation links and buttons
    // This now targets any <a> tag with an href starting with '#'
    // which includes your main nav links AND the "View My Work" button.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior
            const targetId = this.getAttribute('href'); // Get the ID from the href (e.g., "#projects")
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get the height of your fixed header.
                // Ensure your <header> element has a defined height in CSS and is positioned fixed.
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found

                // Calculate the target scroll position.
                // We subtract the headerHeight to ensure the section title is not hidden under the fixed nav bar.
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

                // Scroll to the calculated position with smooth behavior.
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Hero Section Typing Effect ---
    const typedTextSpan = document.querySelector('.typed-text');
    // List of professions to cycle through for the typing animation.
    const professions = ["Web Developer", "Software Engineer","Digital Creator","Student", "Frontend Enthusiast", "Problem Solver", "Cybersecurity Expert", "Coder"];
    let professionIndex = 0; // Current index in the professions array.
    let charIndex = 0;       // Current character index for typing/deleting.
    let isDeleting = false;  // Flag to determine if currently typing or deleting.
    let typingSpeed = 120;   // Milliseconds per character for typing.
    let deletingSpeed = 80;  // Milliseconds per character for deleting.
    let delayBetweenProfessions = 1500; // Milliseconds pause before starting to delete.

    /**
     * Implements the typing and deleting animation for the hero section text.
     */
    function typeEffect() {
        const currentProfession = professions[professionIndex];
        if (!isDeleting) {
            // Typing mode: Add characters one by one.
            typedTextSpan.textContent = currentProfession.substring(0, charIndex);
            charIndex++;
            if (charIndex > currentProfession.length) {
                // If done typing the current profession, switch to deleting mode and pause.
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenProfessions);
            } else {
                // Continue typing.
                setTimeout(typeEffect, typingSpeed);
            }
        } else {
            // Deleting mode: Remove characters one by one.
            typedTextSpan.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                // If done deleting, switch back to typing mode for the next profession.
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length; // Loop back to the start of the array if at the end.
                setTimeout(typeEffect, typingSpeed);
            } else {
                // Continue deleting.
                setTimeout(typeEffect, deletingSpeed);
            }
        }
    }

    // Start the typing effect when the page loads.
    typeEffect();

    // --- Hero content fade-in animation ---
    const heroSection = document.getElementById('hero');
    // Add the 'visible' class after a short delay to trigger a CSS fade-in animation
    // for the hero section content (h1, p, button).
    setTimeout(() => {
        heroSection.classList.add('visible');
    }, 1000); // 1 second delay to allow initial typing to begin.

    // --- Section Scroll Reveal Animation using Intersection Observer ---
    const sections = document.querySelectorAll('.section'); // Select all elements with the class 'section'.

    // Options for the Intersection Observer.
    const observerOptions = {
        root: null, // Use the viewport as the root element for observation.
        rootMargin: '0px', // No margin around the root.
        threshold: 0.15 // Trigger when 15% of the target element is visible in the viewport.
    };

    // Create a new Intersection Observer instance.
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // If the section is in view, add the 'active' class to trigger its animation.
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing the section once it has been animated.
            }
        });
    }, observerOptions);

    // Observe each section element for visibility changes.
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
