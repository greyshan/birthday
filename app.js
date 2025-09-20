// ----------------- FRIENDS & ENVELOPES -----------------
const friends = [
  { friend: 'Aakash', message: 'Happy Birthday, my dear friend! 🥳✨ Wishing you lots of smiles, love, and beautiful memories in the year ahead. May this year be as amazing as you are 💕🎂' },
  { friend: 'Kunal', message: 'HAPPY BIRTHDAY🎂👉 RIDDHI🌷💐you little bundle of chaos and cuteness Keep spreading your 😜crazy vibes😁😁' },
  { friend: 'Sneha', message: 'Happy birthday Riddhi, you are the best and i enjoy when you call me DIDI' },
  { friend: 'Amritanshu', message: 'Happy Birthday Riddhi. Many many happy returns of the day!! You are proof that growing up is optional. Wishing you another year of laughter and never ending talks. Have an amazing day!! 👏 🎂🥳🎊🎉' },
  { friend: 'Siddhi', message: 'Happy birthday! Wishing you a day filled with all your favorite things and a year ahead that is even better than the last.....' },
  { friend: 'Shubhra', message: 'Happy birthday riddhi, stay happy and blessed, may you achieve everything you want this year, many returns of the day💓🧿' },
  { friend: 'Me', message: 'Happy birthday Riddhi, I am glad we are friends!  ' }
];

const grid = document.getElementById('envelopeGrid');

// Create envelopes

friends.forEach((f, index) => {
  const env = document.createElement('div');
  env.className = 'envelope';
  env.innerHTML = `<div class="flap"></div>`;

  env.addEventListener('click', () => {
    // ▶ Play background music only when the first envelope is clicked
    if (index === 0 && bgMusic.paused) {
      playBg();
    }

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

// ----------------- GIFT BOX PHOTO REVEAL -----------------
const giftBox = document.getElementById('giftBox');
const giftContent = giftBox.querySelector('.content');
const riddhiPhotos = [
'riddhi 1.png', 'riddhi 11.png','riddhi 2.jpg','riddhi 12.png', 'riddhi 3.jpg', 'riddhi 13.png',
  'riddhi 4.jpg','riddhi 14.png', 'riddhi 5.jpg','riddhi 15.png', 'riddhi 5.png','riddhi 16.png', 'riddhi 6.jpg',
  'riddhi 7.jpg','riddhi 17.jpg', 'riddhi 8.jpg','riddhi 18.jpg', 'riddhi 9.jpg',  'riddhi 20.jpg',
  'riddhi 4.png','riddhi 21.jpg',  'riddh 22.jpg'
];

let photoIndex = 0;
let boxOpen = false;

giftBox.addEventListener('click', () => {
  if (!boxOpen) {
    giftBox.classList.add('open');
    const panda = giftBox.querySelector('.panda');
    if (panda) panda.style.display = 'none';
    startGiftMusic(); // Start gift music
    showNextPhoto();
    boxOpen = true;
    return;
  }

  if (photoIndex < riddhiPhotos.length) {
    showNextPhoto();
  } else if (photoIndex === riddhiPhotos.length) {
    const finalText = "Once again happy birthday dear RIDDHI 🎉🎂";
    giftContent.innerHTML = `<h2 id="finalMessage" class="fade-text" style="color:#ffcc00; text-shadow:2px 2px 4px #000;"></h2>`;
    const finalElem = document.getElementById("finalMessage");
    let i = 0;
    const words = finalText.split(" ");
    const typer = setInterval(() => {
      if (i < words.length) {
        finalElem.textContent += (i === 0 ? "" : " ") + words[i];
        i++;
      } else {
        clearInterval(typer);
        stopGiftMusic(); // Stop gift music after final message
      }
    }, 250);
    photoIndex++;
  } else {
    giftBox.classList.remove('open');
    giftContent.innerHTML = '';
    photoIndex = 0;
    boxOpen = false;
    const panda = giftBox.querySelector('.panda');
    if (panda) panda.style.display = 'block';
  }
});

function showNextPhoto() {
  giftContent.innerHTML = `<img src="${riddhiPhotos[photoIndex]}" class="photo-animate">`;
  const img = giftContent.querySelector("img");
  void img.offsetWidth; // Force reflow
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
  cake.addEventListener('click', () => {
  flame.classList.toggle('off');

  // 🔊 Play cake music whenever the cake is tapped
  startCakeMusic();

  if (!flame.classList.contains('off')) {
    cancelAnimationFrame(animFrame);
    launchConfetti();
  } else {
    cancelAnimationFrame(animFrame);
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiPieces = [];
  }
});

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
/* ----------------- 🎵 MUSIC CONTROL ----------------- */
const bgMusic    = document.getElementById('bgMusic');
const giftMusic  = document.getElementById('giftMusic');
const cakeMusic  = document.getElementById('cakeMusic');
const musicToggle = document.getElementById('musicToggle');

// ✅ Preload audio so it’s ready to play on mobile
[bgMusic, giftMusic, cakeMusic].forEach(track => {
  track.load();
  track.addEventListener('canplaythrough', () => {
    console.log(`${track.id} ready to play`);
  });
});


bgMusic.loop = false;  bgMusic.volume = 0.7;
giftMusic.loop = false; giftMusic.volume = 0.8;
cakeMusic.loop = false; cakeMusic.volume = 0.8;

let activeTrack = null; // gift or cake currently playing

// Autoplay background on first user interaction
document.addEventListener('pointerdown', () => {
  if (bgMusic.paused) playBg();
}, { once: true });

musicToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  if (bgMusic.paused) playBg();
  else pauseBg();
});

function playBg() {
  bgMusic.play()
    .then(() => {
      musicToggle.textContent = '⏸ Pause';
      musicToggle.classList.add('playing');
    })
    .catch(err => {
      console.warn('Background music could not play yet:', err);
    });
}

function pauseBg() {
  bgMusic.pause();
  musicToggle.textContent = '▶ Play';
  musicToggle.classList.remove('playing');
}

// Stop currently active track if any
function stopActive() {
  if (activeTrack && !activeTrack.paused) {
    activeTrack.pause();
    activeTrack.currentTime = 0;
  }
  activeTrack = null;
}

// Play gift music
function startGiftMusic() {
  stopActive();
  pauseBg();
  activeTrack = giftMusic;
  giftMusic.currentTime = 0;
  giftMusic.play().catch(()=>{});
}

// Call this when final gift message done
function stopGiftMusic() {
  stopActive();
  playBg();
}

// Play cake music
function startCakeMusic() {
  stopActive();
  pauseBg();
  activeTrack = cakeMusic;
  cakeMusic.currentTime = 0;
  cakeMusic.play().catch(()=>{});
}
 
// When gift/cake ends naturally, resume background
giftMusic.addEventListener('ended', () => {
  if (activeTrack === giftMusic) {
    activeTrack = null;
    playBg();
  }
});
cakeMusic.addEventListener('ended', () => {
  if (activeTrack === cakeMusic) {
    activeTrack = null;
    playBg();
  }
});

 // 🔑 Secret unlock logic
function showPasswordField() {
  document.getElementById("password-box").style.display = "block";
}

function checkPassword() {
  const input = document.getElementById("password").value;
  const secretSection = document.getElementById("secret-section");
  const hint = document.getElementById("hint");
  const secretImage = document.getElementById("secret-image");

  if (input === "riddhi45") { // ✅ Set your password
    secretSection.style.display = "block";
    hint.style.display = "none";
    secretImage.src = "special note.jpg"; // ✅ Replace with your image path
  } else {
    secretSection.style.display = "none";
    hint.style.display = "block";
  }
}
// Trigger password check on Enter key
document.getElementById("password").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission or page reload
    checkPassword();
  }
});


