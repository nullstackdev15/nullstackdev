// Enhanced Page Loader Functionality
document.addEventListener('DOMContentLoaded', function () {
    const loader = document.getElementById('page-loader');
    const progressBar = document.getElementById('progress-bar');
    const percentageText = document.getElementById('loader-percentage');
    const body = document.body;
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 12;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Hide loader and show content
            setTimeout(() => {
                loader.style.opacity = '0';
                loader.style.visibility = 'hidden';
                setTimeout(() => {
                    loader.style.display = 'none';
                    body.style.overflow = 'auto';
                    initAnimations();
                }, 800);
            }, 800);
        }
        progressBar.style.width = progress + '%';
        percentageText.textContent = Math.round(progress) + '%';
    }, 200);

    // Enhanced Mobile menu toggle with animation
    menuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('open');
        menuBtn.classList.toggle('open');

        // Change icon based on menu state
        const icon = menuBtn.querySelector('i');
        if (mobileMenu.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuBtn.classList.remove('open');
            const icon = menuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            // Smooth scroll to section
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Enhanced smooth scrolling for desktop navigation
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Initialize animations
function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate all sections with fade-in effect
    gsap.utils.toArray('.section-hidden').forEach(section => {
        gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate staggered items
    gsap.utils.toArray('.stagger-item').forEach((item, i) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
                trigger: item,
                start: "top 90%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate slide-in elements
    gsap.utils.toArray('.slide-in-left').forEach(item => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    gsap.utils.toArray('.slide-in-right').forEach(item => {
        gsap.to(item, {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Animate the hero text
    gsap.fromTo('.text-gradient',
        { backgroundPosition: '0% 50%' },
        {
            backgroundPosition: '100% 50%',
            duration: 8,
            ease: "none",
            repeat: -1
        }
    );
} 