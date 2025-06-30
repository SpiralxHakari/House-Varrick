const bootLines = [
  "Initializing Starhaven OS v7.9...",
  "Connecting to House Varrick SecureNet...",
  "Verifying clearance level...",
  "Clearance verified...",
  "Loading environment modules...",
  "Mounting virtual drives...",
  "System integrity: Nominal",
  "Launching Dashboard Interface..."
];

const bootOutput = document.getElementById("boot-output");
const dashboard = document.getElementById("dashboard-content");
const bootScreen = document.getElementById("boot-screen");

let i = 0;

function typeLine() {
  if (lineIndex < bootLines.length) {
    const line = bootLines[lineIndex];
    if (charIndex < line.length) {
      bootOutput.innerHTML += line[charIndex];
      charIndex++;
      setTimeout(typeLine, 30); // character typing speed
    } else {
      bootOutput.innerHTML += "\n";
      lineIndex++;
      charIndex = 0;
      setTimeout(typeLine, 200); // delay between lines
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
