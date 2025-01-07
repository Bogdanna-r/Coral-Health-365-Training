document.addEventListener('DOMContentLoaded', function () { 
  // Scroll-triggered animation
  const sections = document.querySelectorAll('.section');
  
  const animateOnScroll = () => {
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        section.classList.add('animate');
      }
    });
  };

  // Trigger animation on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Modal animation logic
  const modal = document.getElementById('modal');
  if (!modal) {
    console.error('Modal element not found!');
    return;
  }
  
  const openModalButton = document.createElement('button');
  openModalButton.innerHTML = 'Open Modal';
  openModalButton.classList.add('open-modal-btn');
  document.body.appendChild(openModalButton);
  
  openModalButton.addEventListener('click', () => {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Disable background scrolling when modal is open
  });
  
  const closeModalButton = document.getElementById('closeModal');
  if (closeModalButton) {
    closeModalButton.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto'; // Enable background scrolling
    });
  } else {
    console.error('Close Modal button not found!');
  }
  
  // CSS for smooth animations
  const style = document.createElement('style');
  style.innerHTML = `
    .section {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .section.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Hover effect for links and buttons */
    .open-modal-btn, .section a {
      transition: transform 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
    }
    .open-modal-btn:hover, .section a:hover {
      transform: scale(1.05);
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
      color: #ff6347; /* Or any modern color */
    }
    
    /* Modal Animation */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      animation: fadeIn 0.3s ease-out;
    }
    
    .modal.show {
      display: flex;
      animation: slideUp 0.4s ease-out forwards;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes slideUp {
      from {
        transform: translateY(100%);
      }
      to {
        transform: translateY(0);
      }
    }
    
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 80%;
      max-width: 500px;
      text-align: center;
      transform: scale(0.8);
      animation: modalScaleIn 0.5s ease-out forwards;
    }
    
    @keyframes modalScaleIn {
      from {
        transform: scale(0.8);
      }
      to {
        transform: scale(1);
      }
    }
  `;
  document.head.appendChild(style);
  
  // Initial animation trigger
  animateOnScroll();
});
const cuboid = document.querySelector(".cuboid");
if (cuboid) {
  let isDragging = false;
  let startX, startY;
  let currentX = 0, currentY = 0;

  cuboid.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    cuboid.style.animation = "none"; // Pause animation when dragging
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    startX = e.clientX;
    startY = e.clientY;

    currentX += deltaY * 0.5;
    currentY += deltaX * 0.5;

    cuboid.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    cuboid.style.animation = "autoRotate 10s infinite linear"; // Resume animation after dragging
  });
} else {
  console.error('Cuboid element not found!');
}
function init() {
  // Assuming you already have the necessary Three.js objects like camera, scene, and renderer
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Set up animation loop
  animate();
}

function animate() {
  requestAnimationFrame(animate);

  // Update camera and controls if any (e.g., if using OrbitControls)

  renderer.render(scene, camera);
}

// Call the init function on page load
window.onload = init;





/*-----------------index2------------------------------------*/
let currentIndex = 0; // Initialize the starting index
const videos = document.querySelectorAll('.sell-phone-videos-card');
const totalVideos = videos.length;

function moveCarousel(direction) {
  // Pause the currently active video when changing slides
  const currentVideo = videos[currentIndex].querySelector('video');
  if (currentVideo) {
    currentVideo.pause();
  }

  // Update the index based on the direction
  if (direction === 'next') {
    currentIndex = (currentIndex + 1) % totalVideos; // Move to next video
  } else {
    currentIndex = (currentIndex - 1 + totalVideos) % totalVideos; // Move to previous video
  }

  // Update the carousel to reflect the new active video
  updateCarousel();
}

function updateCarousel() {
  videos.forEach((video, index) => {
    video.classList.remove('active'); // Remove 'active' class from all videos
    const videoElement = video.querySelector('video');
    if (index === currentIndex) {
      video.classList.add('active'); // Add 'active' class to the current video
      // Play the current video
      if (videoElement) {
        videoElement.play();
      }
    }
  });

  // Apply the sliding effect by adjusting the container's transform property
  const container = document.querySelector('.sell-phone-videos-cards-container');
  container.style.transform = `translateX(-${currentIndex * 375}px)`; // Move container to the left based on currentIndex
}

// Initialize the carousel to display the first video correctly
updateCarousel();

/*--------------------------------------------------------------------------index3--------------------------------------------------------------------*/
const swiper = new Swiper(".swiper-container .swiper", {
  direction: "horizontal",
  loop: true, // Loop the slides
  speed: 1000,
  slidesPerView: 4,
  spaceBetween: 60,
  mousewheel: true,
  parallax: true,
  centeredSlides: true,
  effect: "coverflow",
  coverflowEffect: {
    rotate: 40,
    slideShadows: true
  },
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true
  },
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 60
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 60
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 60
    },
    1400: {
      slidesPerView: 4,
      spaceBetween: 60
    },
    2300: {
      slidesPerView: 5,
      spaceBetween: 60
    },
    2900: {
      slidesPerView: 6,
      spaceBetween: 60
    }
  }
});
