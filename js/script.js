const openBtn = document.getElementById("openVideoBtn");
const closeBtn = document.getElementById("closeVideoBtn");
const modal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");

openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    videoFrame.src = "img/video.MOV"; // Replace with real summer event video URL
});

closeBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    videoFrame.src = "";
});

// Quiz Data: each answer maps to a Friends character
const quizData = [
    {
        question: "How you doin’?",
        answers: [
            { text: "Smooth and confident", character: "Joey" },
            { text: "Awkward but charming", character: "Ross" },
            { text: "Playfully sarcastic", character: "Chandler" },
            { text: "Cheerfully friendly", character: "Phoebe" },
        ],
    },
    {
        question:
            "What’s your “pivot” moment at work – a time when everything had to suddenly change?",
        answers: [
            { text: "I lead the change", character: "Monica" },
            { text: "I adapt quietly", character: "Ross" },
            { text: "I joke through it", character: "Chandler" },
            { text: "I help everyone stay calm", character: "Phoebe" },
        ],
    },
    {
        question:
            "What’s your go-to comfort snack during a stressful deadline?",
        answers: [
            { text: "Pizza", character: "Joey" },
            { text: "Cookies", character: "Rachel" },
            { text: "Coffee", character: "Chandler" },
            { text: "Ice cream", character: "Monica" },
        ],
    },
    {
        question:
            "If your job were a Friends episode title, what would it be called?",
        answers: [
            { text: "The One with the Crazy Deadline", character: "Monica" },
            { text: "The One Where We Nailed It", character: "Rachel" },
            { text: "The One with Too Much Coffee", character: "Chandler" },
            { text: "The One with the All-Nighter", character: "Ross" },
        ],
    },
    {
        question: "What's one thing the team doesn't know about you... yet?",
        answers: [
            { text: "I play music", character: "Phoebe" },
            { text: "I love cooking", character: "Monica" },
            { text: "I’m secretly competitive", character: "Rachel" },
            { text: "I’ve met a celebrity", character: "Joey" },
        ],
    },
];

// Character descriptions
const characterDescriptions = {
    Joey: "You're Joey Tribbiani! Charming, lovable, and always ready for pizza or a laugh. 'How you doin'?'",
    Chandler:
        "You're Chandler Bing! Master of sarcasm with a heart of gold and an endless coffee cup.",
    Monica:
        "You're Monica Geller! Organized, competitive, and the one who keeps everyone together.",
    Rachel:
        "You're Rachel Green! Stylish, ambitious, and a true friend who’s grown in every season.",
    Ross: "You're Ross Geller! Passionate, intelligent, and a bit awkward—but that’s part of your charm.",
    Phoebe:
        "You're Phoebe Buffay! Quirky, creative, and a free spirit who brings joy to every room.",
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
    // Remove highlight from all buttons
    [...answersContainer.children].forEach((btn) =>
        btn.classList.remove("bg-[var(--yellow)]")
    );
    // Highlight selected button
    selectedBtn.classList.add("bg-[var(--yellow)]");
    // Store character vote
    selectedBtn.dataset.character = character;
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

    // Find character with max score
    let topCharacter = Object.keys(answersCount).reduce((a, b) =>
        answersCount[a] > answersCount[b] ? a : b
    );

    resultTitle.textContent = `You are ${topCharacter}!`;
    resultDescription.textContent = characterDescriptions[topCharacter];
}

// Initialize quiz
loadQuestion();