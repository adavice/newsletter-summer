new WOW().init();

const video = document.getElementById('myVideo');
const playBtn = document.getElementById('playButton');

playBtn.addEventListener('click', () => {
    video.muted = false; // Enable sound
    video.play();
    playBtn.style.display = 'none'; // Hide button after playing
});

const quizData = [
    {
        question: "How you doin’?",
        answers: [
            { text: "Smooth and confident", character: "Joey" },
            { text: "Awkward but charming", character: "Ross" },
            { text: "Playfully sarcastic", character: "Chandler" },
            { text: "Cheerfully friendly", character: "Phoebe" },
            { text: "Organized and precise", character: "Monica" },
            { text: "Stylish and ambitious", character: "Rachel" },
        ],
    },
    {
        question: "What’s your “pivot” moment at work – a time when everything had to suddenly change?",
        answers: [
            { text: "I lead the change", character: "Monica" },
            { text: "I adapt quietly", character: "Ross" },
            { text: "I joke through it", character: "Chandler" },
            { text: "I help everyone stay calm", character: "Phoebe" },
            { text: "I cheer for the team", character: "Joey" },
            { text: "I look stylish while doing it", character: "Rachel" },
        ],
    },
    {
        question: "What’s your go-to comfort snack during a stressful deadline?",
        answers: [
            { text: "Pizza", character: "Joey" },
            { text: "Cookies", character: "Rachel" },
            { text: "Coffee", character: "Chandler" },
            { text: "Ice cream", character: "Monica" },
            { text: "Smoothies", character: "Phoebe" },
            { text: "Salad", character: "Ross" },
        ],
    },
    {
        question: "If your job were a Friends episode title, what would it be called?",
        answers: [
            { text: "The One with the Crazy Deadline", character: "Monica" },
            { text: "The One Where We Nailed It", character: "Rachel" },
            { text: "The One with Too Much Coffee", character: "Chandler" },
            { text: "The One with the All-Nighter", character: "Ross" },
            { text: "The One with Random Music", character: "Phoebe" },
            { text: "The One Who Eats Everything", character: "Joey" },
        ],
    },
    {
        question: "What's one thing the team doesn't know about you... yet?",
        answers: [
            { text: "I play music", character: "Phoebe" },
            { text: "I love cooking", character: "Monica" },
            { text: "I’m secretly competitive", character: "Rachel" },
            { text: "I’ve met a celebrity", character: "Joey" },
            { text: "I overthink everything", character: "Ross" },
            { text: "I crack jokes constantly", character: "Chandler" },
        ],
    },
];

const characterDescriptions = {
    Joey: "You're Joey Tribbiani! Charming, lovable, and always ready for pizza or a laugh. 'How you doin'?'",
    Chandler: "You're Chandler Bing! Master of sarcasm with a heart of gold and an endless coffee cup.",
    Monica: "You're Monica Geller! Organized, competitive, and the one who keeps everyone together.",
    Rachel: "You're Rachel Green! Stylish, ambitious, and a true friend who’s grown in every season.",
    Ross: "You're Ross Geller! Passionate, intelligent, and a bit awkward—but that’s part of your charm.",
    Phoebe: "You're Phoebe Buffay! Quirky, creative, and a free spirit who brings joy to every room.",
};

const characterImages = {
    Joey: "img/joey.gif",
    Chandler: "img/chandler.gif",
    Monica: "img/monica-1.webp",
    Rachel: "img/rachel.webp",
    Ross: "img/ross.gif",
    Phoebe: "img/phoebe.webp",
};

let currentQuestion = 0;
let answersCount = {
    Joey: 0,
    Chandler: 0,
    Monica: 0,
    Rachel: 0,
    Ross: 0,
    Phoebe: 0,
};

const questionText = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");
const nextBtn = document.getElementById("nextBtn");
const quizContainer = document.getElementById("quizContainer");
const resultContainer = document.getElementById("resultContainer");
const resultTitle = document.getElementById("resultTitle");
const resultDescription = document.getElementById("resultDescription");

function loadQuestion() {
    const qData = quizData[currentQuestion];
    questionText.textContent = qData.question;
    answersContainer.innerHTML = "";
    nextBtn.disabled = true; // disable until answer selected

    qData.answers.forEach((answer) => {
        const btn = document.createElement("button");
        btn.textContent = answer.text;
        btn.className =
            "w-full bg-white border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition";
        btn.onclick = () => selectAnswer(btn, answer.character);
        answersContainer.appendChild(btn);
    });
}

function selectAnswer(selectedBtn, character) {
    [...answersContainer.children].forEach((btn) =>
        btn.classList.remove("bg-[var(--purple)]", "text-white")
    );
    selectedBtn.classList.remove("bg-white");
    selectedBtn.classList.add("bg-[var(--purple)]", "text-white");
    nextBtn.dataset.character = character;
    nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
    const selectedCharacter = nextBtn.dataset.character;
    if (selectedCharacter) {
        answersCount[selectedCharacter]++;
    }

    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    resultContainer.innerHTML = ""; // Clear previous content

    let topCharacter = Object.keys(answersCount).reduce((a, b) =>
        answersCount[a] > answersCount[b] ? a : b
    );

    // Character image on top
    const img = document.createElement("img");
    img.src = characterImages[topCharacter];
    img.alt = topCharacter;
    img.className = "w-32 h-32 mx-auto mb-4 rounded-xl shadow-lg";
    resultContainer.appendChild(img);

    // Result text
    const title = document.createElement("h2");
    title.textContent = `You are ${topCharacter}!`;
    title.className = "text-2xl font-bold mb-2 text-[var(--orange)]";
    resultContainer.appendChild(title);

    const description = document.createElement("p");
    description.textContent = characterDescriptions[topCharacter];
    description.className = "mb-4";
    resultContainer.appendChild(description);
}

loadQuestion();

document.addEventListener("DOMContentLoaded", () => {
    new Swiper(".carousel-barcelona", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
        }
    });

    new Swiper(".carousel-seville", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
        }
    });

    new Swiper(".carousel-malta", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
        }
    });

    new Swiper(".carousel-london", {
        slidesPerView: 1,
        spaceBetween: 10,
        loop: true,
        autoplay: {
            delay: 5000,
        }
    });
});