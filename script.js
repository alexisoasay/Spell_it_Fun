let kidName = "";
let currentCategory = "";
let difficulty = "";
let words = [];
let currentIndex = 0;
let score = 0;

// Example word lists
const wordBank = {
  Animals: ["cat", "dog", "lion", "tiger", "monkey"],
  Fruits: ["apple", "banana", "grape", "mango", "orange"],
  Colors: ["red", "blue", "green", "yellow", "purple"],
  Objects: ["chair", "table", "ball", "book", "pencil"]
};

// Speech
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.pitch = 1;
  utterance.rate = 0.9;
  speechSynthesis.speak(utterance);
}

// Switch section
function showSection(id) {
  document.querySelectorAll("section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Step 1: Enter name
function startGameIntro() {
  const nameInput = document.getElementById("kid-name");
  kidName = nameInput.value.trim();

  if (kidName === "") {
    alert("Please enter your name first!");
    return;
  }

  document.getElementById("display-name").textContent = kidName;
  showSection("categories");
}

// Step 2: Choose category
function chooseCategory(category) {
  currentCategory = category;
  showSection("difficulty");
}

// Step 3: Choose difficulty and start
function startSpelling(level) {
  difficulty = level;
  words = [...wordBank[currentCategory]];
  currentIndex = 0;
  score = 0;

  document.getElementById("category-title").textContent =
    `${currentCategory} (${difficulty} Mode)`;
  document.getElementById("score").textContent = `Score: 0/${words.length}`;
  document.getElementById("feedback").textContent = "";

  showSection("game");
  playWord();
}

// Play sound
function playWord() {
  const word = words[currentIndex];
  speak(word);
}

// Check spelling
function checkAnswer() {
  const answer = document.getElementById("answer").value.trim().toLowerCase();
  const correctWord = words[currentIndex].toLowerCase();
  const feedback = document.getElementById("feedback");

  if (answer === "") return;

  if (answer === correctWord) {
    feedback.textContent = `✅ Great job, ${kidName}!`;
    feedback.style.color = "green";
    score++;
  } else {
    feedback.textContent = `❌ Oops! The word was "${correctWord}".`;
    feedback.style.color = "red";
  }

  document.getElementById("score").textContent = `Score: ${score}/${words.length}`;

  // Move to next automatically after 1.5s
  setTimeout(() => {
    nextWord();
  }, 1500);
}

// Next word
function nextWord() {
  currentIndex++;
  document.getElementById("answer").value = "";
  document.getElementById("feedback").textContent = "";

  if (currentIndex < words.length) {
    playWord();
  } else {
    showResult();
  }
}

// Show result
function showResult() {
  document.getElementById("final-name").textContent = kidName;
  document.getElementById("final-score").textContent = `You scored ${score} out of ${words.length}!`;
  showSection("result");
  speak(`Great job, ${kidName}! You got ${score} correct!`);
}

// Restart
function restart() {
  document.getElementById("kid-name").value = "";
  showSection("home");
}


