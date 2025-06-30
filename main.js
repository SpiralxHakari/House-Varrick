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
  if (i < bootLines.length) {
    bootOutput.innerHTML += bootLines[i] + "\n";
    i++;
    setTimeout(typeLine, 30); // Adjust speed here
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
