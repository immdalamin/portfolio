document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for all internal navigation links and buttons
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#') {
            // Scroll to top when href is "#"
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

            if (targetElement) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0; // Get header height, default to 0 if not found
                
                // Increased buffer to ensure content is always visible, accounting for shadows or slight miscalculations.
                const scrollOffsetBuffer = 20; // Increased from 10px for more robust clearance

                // Calculate the target scroll position, subtracting header height and buffer.
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - scrollOffsetBuffer;

                // Scroll to the calculated position with smooth behavior.
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

    // --- Hero Section Typing Effect ---
    const typedTextSpan = document.querySelector('.typed-text-container .typed-text');
    const professions = ["Programmer", "Web Developer", "Software Engineer", "Digital Creator", "Student", "Frontend Enthusiast", "Problem Solver", "Cybersecurity Expert", "Coder"];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 120;
    let deletingSpeed = 80;
    let delayBetweenProfessions = 1500;

    function typeEffect() {
        const currentProfession = professions[professionIndex];
        if (!isDeleting) {
            typedTextSpan.textContent = currentProfession.substring(0, charIndex);
            charIndex++;
            if (charIndex > currentProfession.length) {
                isDeleting = true;
                setTimeout(typeEffect, delayBetweenProfessions);
            } else {
                setTimeout(typeEffect, typingSpeed);
            }
        } else {
            typedTextSpan.textContent = currentProfession.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                professionIndex = (professionIndex + 1) % professions.length;
                setTimeout(typeEffect, typingSpeed);
            } else {
                setTimeout(typeEffect, deletingSpeed);
            }
        }
    }

    typeEffect();

    // --- Hero content fade-in animation ---
    const heroSection = document.getElementById('hero');
    setTimeout(() => {
        heroSection.classList.add('visible');
    }, 1000);

    // --- Section Scroll Reveal Animation using Intersection Observer ---
    const sections = document.querySelectorAll('.section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });