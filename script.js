const accounts = [
  {
    name: "YouTube",
    image: "assets/youtube.png",
    speed: 5,
    jump: 4,
    attack: 5,
    description: "Gaming videos, highlights, long-form content, and the main home for your biggest drops.",
    playLink: "https://www.youtube.com/@Y3omar",
    reviewLink: "https://www.youtube.com/@Y3omar"
  },
  {
    name: "Kick",
    image: "assets/kick.png",
    speed: 4,
    jump: 3,
    attack: 4,
    description: "Live streams, direct community interaction, and fast-paced sessions built around real-time energy.",
    playLink: "https://kick.com/y3omar",
    reviewLink: "https://kick.com/y3omar"
  },
  {
    name: "Instagram",
    image: "assets/instagram.png",
    speed: 3,
    jump: 5,
    attack: 3,
    description: "Photos, reels, updates, and branded content that keeps your audience close between streams.",
    playLink: "https://www.instagram.com/y3omargaming/?hl=en",
    reviewLink: "https://www.instagram.com/y3omargaming/?hl=en"
  },
  {
    name: "TikTok",
    image: "assets/tiktok.png",
    speed: 5,
    jump: 5,
    attack: 4,
    description: "Short clips, viral moments, and rapid-fire edits designed for discovery and replay value.",
    playLink: "https://www.tiktok.com/@y3omargaming",
    reviewLink: "https://www.tiktok.com/@y3omargaming"
  }
];

const heroImage = document.getElementById("heroImage");
const heroName = document.getElementById("heroName");
const heroDesc = document.getElementById("heroDesc");
const speedPips = document.getElementById("speedPips");
const jumpPips = document.getElementById("jumpPips");
const attackPips = document.getElementById("attackPips");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const reviewBtn = document.getElementById("reviewBtn");
const clickSound = document.getElementById("clickSound");

let currentHeroIndex = 0;
const soundEnabled = true;
const clickVolume = 0.18;

function playClickSound() {
  if (!soundEnabled || !clickSound) {
    return;
  }

  clickSound.volume = clickVolume;
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});
}

function buildPips(container, value, max = 5) {
  container.innerHTML = "";

  for (let index = 0; index < max; index += 1) {
    const pip = document.createElement("span");
    pip.className = `pip${index < value ? " active" : ""}`;
    container.appendChild(pip);
  }
}

function renderHero() {
  const hero = accounts[currentHeroIndex];

  heroImage.classList.add("swap");

  window.setTimeout(() => {
    heroImage.src = hero.image;
    heroImage.alt = hero.name;
    heroName.textContent = hero.name;
    heroDesc.textContent = hero.description;

    buildPips(speedPips, hero.speed);
    buildPips(jumpPips, hero.jump);
    buildPips(attackPips, hero.attack);

    heroImage.classList.remove("swap");
  }, 140);
}

function stepHero(direction) {
  currentHeroIndex = (currentHeroIndex + direction + accounts.length) % accounts.length;
  playClickSound();
  renderHero();
}

prevBtn.addEventListener("click", () => stepHero(-1));
nextBtn.addEventListener("click", () => stepHero(1));

reviewBtn.addEventListener("click", () => {
  window.open(accounts[currentHeroIndex].reviewLink, "_blank", "noopener,noreferrer");
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    stepHero(-1);
  }

  if (event.key === "ArrowRight") {
    stepHero(1);
  }
});

renderHero();
