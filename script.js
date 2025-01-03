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

/*-------------------------------------------------------------Index3_------------------------------------------------------*/


const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: false, // Stops the loop for continuous scrolling
  speed: 2000, // Slower flip speed
  slidesPerView: 3, // Display 3 slides at once
  spaceBetween: 30, // Adjust space between slides
  mousewheel: true, // Allow mousewheel scrolling
  parallax: true,
  centeredSlides: true,
  effect: "coverflow", // Apply coverflow effect for 3D view
  coverflowEffect: {
    rotate: 40,
    slideShadows: true
  },
  autoplay: {
    delay: 3000, // Set autoplay delay to 3 seconds
    pauseOnMouseEnter: true // Pause autoplay when mouse hovers over carousel
  },
  scrollbar: {
    el: ".swiper-scrollbar"
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1000: {
      slidesPerView: 3,
      spaceBetween: 30
    }
  }
});

// Adding event listeners to stop the scrolling once an item is selected
const swiperSlides = document.querySelectorAll('.swiper-slide');
swiperSlides.forEach(slide => {
  slide.addEventListener('click', function () {
    swiper.autoplay.stop(); // Stops carousel autoplay once an item is clicked
    // You could display additional info or change the state here if needed
  });

  // Adding a download button below each card (for Canva A4 page download)
  const downloadBtn = document.createElement('button');
  downloadBtn.textContent = "Download Canva A4 File"; // Text of the download button
  downloadBtn.classList.add('download-btn');

  // Event listener for the download button
  downloadBtn.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent swiper click event from being triggered
    // Replace 'path/to/your/file.pdf' with the actual URL to your Canva A4 file
    const fileUrl = 'path/to/your/canva-a4-file.pdf'; // URL of the Canva A4 file
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Canva-A4-Page.pdf'; // This is the filename for the download
    link.click();
  });

  // Append the download button to each slide
  slide.appendChild(downloadBtn);
});

/*---------------------------------------quize-------------------------------------------------*/


var inputData = [
  {
      question: "Q1.Which was not one of voldemort's Horcruxes?",
      for_val: "question1",
      id_val: "0",
      answer: "Harry",
      options: ["Harry", "Nagini","Helga's Diadem","Tom Riddle's Diary"],
      selected: null,
  },
  {
      question: "Q2.Which of these are not one of Hagrid's many pets?",
      for_val: "question2",
      id_val: "1",
      answer: "Grawp",
      options: ["Grawp","Fluffy","Aragog","Noberta"],
      selected: null,
  },
  {
      question: "Q3.Which class did Severus Snape always want to teach?",
      for_val: "question3",
      id_val: "2",
      answer: "Defense against Dark Arts",
      options: ["Potions","Charms","Defense against Dark Arts","Transfiguration"],
      selected: null,
  },
  {
      question: "Q4.Which Hohwarts house did Moaning Myrtle belong in?",
      for_val: "question4",
      id_val: "3",
      answer: "Ravenclaw",
      options: ["Gryffinder","Slytherin","Ravenclaw","Hufflepuff"],
      selected: null,
  },
  {
      question: "Q5.What class did Neville end up teaching at Hogwarts?",
      for_val: "question5",
      id_val: "4",
      answer: "Herbology",
      options: ["Astronomy","Herbology","Charms","Muggle Studies"],
      selected: null,
  }
];

var quizeApp = document.getElementById("quize-app");
var quizeSection = document.createElement("div");
quizeSection.className = "quize-section";
quizeApp.appendChild(quizeSection);
var pageTitle = document.createElement("h1");
pageTitle.className = "title";
pageTitle.innerText = "The Quiz App";
quizeSection.appendChild(pageTitle);
var questionSection = document.createElement("form");
questionSection.id = "form";
questionSection.className = "question_section";
quizeSection.appendChild(questionSection);
var questions = document.createElement("div");
questionSection.appendChild(questions);
var btnWrapper = document.createElement("div");
btnWrapper.className = "submit_btn_wrapper";
questionSection.appendChild(btnWrapper);
var btn = document.createElement("input");
btn.className = "submit_button";
btn.type = "submit";
btn.value = "Submit";
btn.id = "submit_btn";
btnWrapper.appendChild(btn);
var marksSection = document.createElement("div");
marksSection.className = "marks_section";
quizeApp.appendChild(marksSection);
var scoreTitle = document.createElement("div");
scoreTitle.innerText = "Score:";
scoreTitle.className = "score_title";
marksSection.appendChild(scoreTitle);
var scoreValue = document.createElement("div");
scoreValue.innerText = "0/5";
scoreValue.id = "calScore";
scoreValue.className = "score_count";
marksSection.appendChild(scoreValue);

function quizeAppCreater(data){
  var eachQuestion = document.createElement("div");
  eachQuestion.className = "each_question_wrapper";
  eachQuestion.id = data.id_val;
  eachQuestion.onchange = function(e){
      inputData[parseInt(data.id_val)].selected = e.target.value;
  }
  questions.appendChild(eachQuestion);
  var label = document.createElement("label");
  label.for = data.for_val;
  label.innerText = data.question;
  eachQuestion.appendChild(label);
  for(var j=0; j<data.options.length; j++){
      var optionWrapper = document.createElement("label");
      optionWrapper.className = "options";
      var input = document.createElement("input");
      input.type = "radio";
      input.value = data.options[j];
      input.name = data.for_val;
      input.required = true;
      var span = document.createElement("span")
      span.innerText = data.options[j];
      optionWrapper.appendChild(input);
      optionWrapper.appendChild(span);
      eachQuestion.appendChild(optionWrapper);
  }
}

for(var i=0; i<inputData.length; i++){
  quizeAppCreater(inputData[i]);
}

var formSubmit = document.getElementById("form");
formSubmit.onsubmit = function(e){
  e.preventDefault();
  var myScore = 0;
  for(var k=0; k<inputData.length;k++){
      if(inputData[k].selected === inputData[k].answer){
          myScore += 1;
      }
  }
  var res = document.getElementById("calScore");
  res.innerText = myScore+"/5";
}

