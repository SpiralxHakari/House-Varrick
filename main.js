const bootLines = [
  "Initializing Starhaven OS v7.9...",
  "Connecting to House Varrick SecureNet...",
  "[****************************************]",
  "Connected...",
  "Verifying clearance level...",
  "[****************************************]",
  "Clearance verified...",
  "Loading environment modules...",
  "Mounting virtual drives...",
  "System integrity: Nominal",
  "Launching Dashboard Interface..."
];

const typedText = document.getElementById("typed-text");
const dashboard = document.getElementById("dashboard-content");
const bootScreen = document.getElementById("boot-screen");

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex < bootLines.length) {
    const line = bootLines[lineIndex];
    if (charIndex < line.length) {
      typedText.textContent += line[charIndex];
      charIndex++;
      setTimeout(typeLine, 90);
    } else {
      typedText.textContent += "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 200);
    }
  } else {
    // After boot sequence, fade into dashboard
    setTimeout(() => {
      bootScreen.classList.add("hidden");
      dashboard.classList.remove("hidden");
      dashboard.classList.add("loaded");
    }, 1500);
  }
}

window.onload = () => {
  typeLine();
};
