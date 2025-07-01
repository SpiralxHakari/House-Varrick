function openApp(appId) {
  const windowArea = document.getElementById("window-area");
  const existing = document.getElementById(`app-${appId}`);
  if (existing) return;

  const win = document.createElement("div");
  win.className = "app-window";
  win.id = `app-${appId}`;
  win.innerHTML = `
    <div class="app-header">
      <span>${appId.toUpperCase()}</span>
      <button onclick="closeApp('${appId}')">X</button>
    </div>
    <div class="app-body">
      <p>Loading ${appId} module...</p>
    </div>
  `;
  windowArea.appendChild(win);
}

function closeApp(appId) {
  const win = document.getElementById(`app-${appId}`);
  if (win) win.remove();
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});
