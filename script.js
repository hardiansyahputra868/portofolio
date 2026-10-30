js

// 1. Efek Navbar Sticky & Highlight Menu Aktif
const header = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Navbar Sticky
    if (window.scrollY > 50) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    // Highlight Menu yang Aktif saat di-scroll
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 2. Toggle Menu Mobile (Hamburger Menu)
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.querySelector('.nav-links');

menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Ganti ikon burger menjadi silang (X)
    const icon = menuIcon.querySelector('i');
    if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Tutup menu mobile ketika salah satu link diklik
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuIcon.querySelector('i').classList.remove('fa-times');
        menuIcon.querySelector('i').classList.add('fa-bars');
    });
});

// 3. Animasi Scroll (Reveal Elements)
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 120; // Mulai muncul sebelum elemen terlihat penuh

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

// 4. Efek Mengetik (Typewriter) pada bagian About
const aboutTextElement = document.getElementById('about-text');

if (aboutTextElement) {
    const textToType = aboutTextElement.innerHTML;
    aboutTextElement.innerHTML = ''; // Kosongkan teks di HTML saat awal dimuat
    
    let isTyping = false; // Mencegah fungsi berjalan berulang kali
    let i = 0;

    function typeWriter() {
        if (i < textToType.length) {
            aboutTextElement.innerHTML += textToType.charAt(i);
            i++;
            setTimeout(typeWriter, 30); // Angka 30 adalah kecepatan ketik (milidetik). Semakin kecil semakin cepat.
        }
    }

    // Menggunakan Intersection Observer agar efek mengetik mulai HANYA saat bagian About terlihat di layar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping) {
                isTyping = true;
                setTimeout(typeWriter, 500); // Beri jeda 0.5 detik sebelum mulai mengetik
            }
        });
    }, { threshold: 0.5 }); // threshold 0.5 berarti efek dimulai saat setengah bagian About terlihat

    observer.observe(aboutTextElement);
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger pertama kali saat halaman dimuat