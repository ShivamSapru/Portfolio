
'use strict';

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. INITIALIZE UI COMPONENTS ---
    initWebGL();
    initScrollAnimations();
    initCommandPalette();
    initTheme();

    // --- 2. THREE.JS WEBGL SCENE ---
    function initWebGL() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('webgl-canvas'), alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const particles = createParticles();
        scene.add(particles);

        camera.position.z = 5;

        function animate() {
            requestAnimationFrame(animate);
            particles.rotation.x += 0.0005;
            particles.rotation.y += 0.0005;
            renderer.render(scene, camera);
        }

        if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
            animate();
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    function createParticles() {
        const geometry = new THREE.BufferGeometry();
        const vertices = [];
        const numParticles = 10000;

        for (let i = 0; i < numParticles; i++) {
            vertices.push(
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20,
                (Math.random() - 0.5) * 20
            );
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        const material = new THREE.PointsMaterial({ color: 0x4FC3F7, size: 0.02, transparent: true, opacity: 0.6 });
        return new THREE.Points(geometry, material);
    }

    // --- 3. GSAP SCROLL ANIMATIONS ---
    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        document.querySelectorAll('section').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 0.6
            });
        });
    }

    // --- 4. COMMAND PALETTE (CMD+K) ---
    function initCommandPalette() {
        const palette = document.getElementById('command-palette');
        // Basic implementation: show/hide on Ctrl+K
        window.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                palette.hidden = !palette.hidden;
            }
        });
    }

    // --- 5. THEME TOGGLER (DARK/LIGHT) ---
    function initTheme() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            // Add theme switching logic here
            alert("Theme switching not yet implemented.");
        });
    }
});

// --- 6. SERVICE WORKER FOR PWA ---
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
