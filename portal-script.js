
    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '⬆️';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
\n// Add interactive effects and animations

document.addEventListener('DOMContentLoaded', () => {
    // Add hover sound effect (optional - can be enabled later)
    const gameCards = document.querySelectorAll('.game-card');
    
    gameCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to play buttons
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.animation = 'ripple 0.6s ease-out';
            
            const rect = btn.getBoundingClientRect();
            ripple.style.left = (e.clientX - rect.left - 10) + 'px';
            ripple.style.top = (e.clientY - rect.top - 10) + 'px';
            
            btn.style.position = 'relative';
            btn.appendChild(ripple);
            
            ripple.addEventListener("animationend", () => ripple.remove());
        });
    });

    // Add parallax effect to game cards
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.game-card');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        cards.forEach((card, index) => {
            const speed = (index + 1) * 2;
            const xOffset = (x - 0.5) * speed;
            const yOffset = (y - 0.5) * speed;
            
            card.style.transform = `translateX(${xOffset}px) translateY(${yOffset}px)`;
        });
    });

    // Add dynamic stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach((stat, index) => {
            if (index === 0) {
                // Animate number 4
                let count = 0;
                const interval = setInterval(() => {
                    if (count <= 4) {
                        stat.textContent = count;
                        count++;
                    } else {
                        clearInterval(interval);
                    }
                }, 100);
            }
        });
    };

    // Trigger stats animation when footer is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    });

    const footer = document.querySelector('.footer');
    if (footer) {
        observer.observe(footer);
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        const cards = Array.from(document.querySelectorAll('.game-card'));
        const currentFocus = document.activeElement;
        const currentIndex = cards.findIndex(card => card.contains(currentFocus));
        
        if (e.key === 'ArrowRight' && currentIndex < cards.length - 1) {
            cards[currentIndex + 1].querySelector('.play-btn').focus();
        } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
            cards[currentIndex - 1].querySelector('.play-btn').focus();
        }
    });

    // Add loading state to buttons
    playButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.opacity = '0.7';
            this.innerHTML = '<span>Loading...</span>';
            
            // Reset after 2 seconds (in case link doesn't open)
            setTimeout(() => {
                this.style.opacity = '1';
            }, 2000);
        });
    });

    // Console welcome message
    console.log('%c🎮 Game Hub Loaded', 'background: #667eea; color: white; padding: 5px 10px; border-radius: 3px;');
    console.log('%cEnjoy playing our collection of multiplayer games!', 'font-size: 14px; color: #764ba2;');
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
