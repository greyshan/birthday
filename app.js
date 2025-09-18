// ----------------- FRIENDS & ENVELOPES -----------------
const friends = [
  { friend: 'Aakash', message: 'Aakas h wishes a day full of love!' },
  { friend: 'Kunal', message: 'Kunal hopes your year is amazing!' },
  { friend: 'Sneha', message: 'Sneha says you’re the best friend ever!' },
  { friend: 'Amritanshu', message: 'Amritanshu sends hugs and laughter!' },
  { friend: 'Aarti', message: 'Aarti says may all your dreams come true!' },
  { friend: 'Shubhra', message: 'Shubhra says you light up every room!' },
  { friend: 'Me', message: 'I love you endlessly ❤️' }
];

const grid = document.getElementById('envelopeGrid');

// Create envelope elements
friends.forEach(f => {
  const env = document.createElement('div');
  env.className = 'envelope';
  env.innerHTML = `<div class="flap"></div>`;
  env.addEventListener('click', () => {
    env.classList.add('open');
    showLetter(f.friend, f.message);
  });
  grid.appendChild(env);
});

// Show letter with typewriter effect
function showLetter(name, message) {
  const overlay = document.createElement('div');
  overlay.className = 'letter-overlay';
  const letter = document.createElement('div');
  letter.className = 'letter';
  letter.innerHTML = `<h3>${name}</h3><p id="typewriter"></p>`;
  overlay.appendChild(letter);
  document.body.appendChild(overlay);

  let i = 0;
  const typerElem = letter.querySelector('#typewriter');
  const typer = setInterval(() => {
    if (i < message.length) {
      typerElem.textContent += message.charAt(i);
      i++;
    } else {
      clearInterval(typer);
    }
  }, 50);

  overlay.addEventListener('click', () => {
    clearInterval(typer);
    overlay.remove();
  });
}

// ----------------- PHOTO GALLERY FADE-IN -----------------
// ----------------- GIFT BOX PHOTO REVEAL -----------------
// ----------------- GIFT BOX PHOTO REVEAL (UPDATED) -----------------
const giftBox = document.getElementById('giftBox');
const giftContent = giftBox.querySelector('.content');

// ✅ Use your actual file names here
const riddhiPhotos = [
  'riddhi 1.png','riddhi 2.jpg','riddhi 3.jpg',
  'riddhi 4.jpg','riddhi 5.jpg', 'riddhi 5.png', 'riddhi 6.jpg',
  'riddhi 7.jpg','riddhi 8.jpg','riddhi 9.jpg',
  'riddhi 4.png'
];
 

let photoIndex = 0;
let boxOpen = false;

giftBox.addEventListener('click', () => {
  // First tap → open box, hide panda, show first photo
  if (!boxOpen) {
    giftBox.classList.add('open');
    const panda = giftBox.querySelector('.panda');
    if (panda) panda.style.display = 'none';
    showNextPhoto();
    boxOpen = true;
    return;
  }

  // Show next photo if any remain
  if (photoIndex < riddhiPhotos.length) {
    showNextPhoto();
  }
  // After the last photo → show final message
  else if (photoIndex === riddhiPhotos.length) {
    const finalText = "Once again happy birthday dear RIDDHI 🎉🎂";
    giftContent.innerHTML = `<h2 id="finalMessage" class="fade-text" 
      style="color:#ffcc00; text-shadow:2px 2px 4px #000;"></h2>`;
    const finalElem = document.getElementById("finalMessage");
    let i = 0;
    const words = finalText.split(" ");
    const typer = setInterval(() => {
      if (i < words.length) {
        finalElem.textContent += (i === 0 ? "" : " ") + words[i];
        i++;
      } else {
        clearInterval(typer);
      }
    }, 250);
    photoIndex++;
  }
  // Close and reset
  else {
    giftBox.classList.remove('open');
    giftContent.innerHTML = '';
    photoIndex = 0;
    boxOpen = false;
    const panda = giftBox.querySelector('.panda');
    if (panda) panda.style.display = 'block';
  }
});

function showNextPhoto() {
  // Insert the new photo with the flip animation class
  giftContent.innerHTML = `<img src="${riddhiPhotos[photoIndex]}" class="photo-animate">`;

  // Re-trigger the animation by forcing a reflow
  const img = giftContent.querySelector("img");
  void img.offsetWidth; // 🔄 Forces reflow so animation restarts if the class is reused
  img.classList.add("photo-animate");

  photoIndex++;
}


// ----------------- CAKE & CONFETTI -----------------
const cake = document.getElementById('cake');
const flame = cake.querySelector('.flame');
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');

let confettiPieces = [];
let animFrame;

function launchConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
  confettiPieces = Array.from({ length: 60 }, () => createHeart());
  animateConfetti();
}

function createHeart() {
  return {
    x: Math.random() * confettiCanvas.width,
    y: -20 - Math.random() * confettiCanvas.height,
    size: Math.random() * 12 + 8,
    speed: Math.random() * 2 + 1,
    color: `hsl(${Math.random() * 360}, 80%, 60%)`,
    rotation: Math.random() * 2 * Math.PI,
    rotationSpeed: (Math.random() - 0.5) * 0.05
  };
}

function drawHeart(x, y, size, color, rotation) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.scale(size / 16, size / 16);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 4);
  ctx.bezierCurveTo(0, -2, -8, -2, -8, 4);
  ctx.bezierCurveTo(-8, 10, 0, 14, 0, 18);
  ctx.bezierCurveTo(0, 14, 8, 10, 8, 4);
  ctx.bezierCurveTo(8, -2, 0, -2, 0, 4);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function animateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    drawHeart(p.x, p.y, p.size, p.color, p.rotation);
    p.y += p.speed;
    p.rotation += p.rotationSpeed;
  });
  confettiPieces = confettiPieces.filter(p => p.y < confettiCanvas.height + 20);
  while (confettiPieces.length < 60) {
    confettiPieces.push(createHeart());
  }
  animFrame = requestAnimationFrame(animateConfetti);
}

cake.addEventListener('click', () => {
  flame.classList.toggle('off');
  if (!flame.classList.contains('off')) {
    cancelAnimationFrame(animFrame);
    launchConfetti();
  } else {
    cancelAnimationFrame(animFrame);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces = [];
  }
});

window.addEventListener('resize', () => {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});
// ----------------- 🎵 AUDIO CONTROLS -----------------
const audio = document.getElementById('bg-music');
const toggleAudio = document.getElementById('toggle-audio');

// Play music when page is first clicked/tapped anywhere
document.body.addEventListener('click', () => {
  if (audio.paused) {
    audio.play().catch(err => console.log('Autoplay blocked:', err));
  }
}, { once: true }); // runs only on first click

// Play/pause button toggle
toggleAudio.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent triggering body click again
  if (audio.paused) {
    audio.play();
    toggleAudio.textContent = '⏸ Pause';
  } else {
    audio.pause();
    toggleAudio.textContent = '▶ Play';
  }
});

