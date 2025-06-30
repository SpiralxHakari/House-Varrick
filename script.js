// script.js
const lines = [
  ">> INITIATING CLEARANCE PROTOCOL...\n",
  ">> VERIFICATION TOKEN ACCEPTED\n",
  ">> CROSSCHECKING ASSIGNED CREDENTIALS...\n",
  ">> HOUSE VARRICK ID CONFIRMED\n"
];

const typewriter = document.getElementById("typewriter");
const popup = document.getElementById("access-popup");
const blackout = document.getElementById("blackout");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex >= lines.length) {
    showAccessPopup();
    return;
  }

  const line = lines[lineIndex];
  if (charIndex < line.length) {
    typewriter.textContent += line.charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 30); // typing speed
  } else {
    typewriter.textContent += '\n';
    charIndex = 0;
    lineIndex++;
    setTimeout(typeLine, 400); // delay between lines
  }
}

function showAccessPopup() {
  popup.classList.remove("hidden");
  setTimeout(() => {
    blackout.classList.remove("hidden");
    setTimeout(() => {
      window.location.href = "dashboard.html"; // or whatever your next page is
    }, 1500);
  }, 2000); // time before blackout
}

window.onload = () => {
  typeLine();
};

