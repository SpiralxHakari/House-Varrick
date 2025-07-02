function openApp(appId) {
  const windowArea = document.getElementById("window-area");
  const existing = document.getElementById(`app-${appId}`);
  if (existing) return;

  const win = document.createElement("div");
  win.className = "app-window";
  win.id = `app-${appId}`;

  const offset = document.querySelectorAll('.app-window').length * 30;
  win.style.top = `${100 + offset}px`;
  win.style.left = `${100 + offset}px`;
  win.style.position = "absolute";

  win.innerHTML = `
    <div class="app-header">
      <span>${getAppTitle(appId)}</span>
      <button onclick="closeApp('${appId}')">X</button>
    </div>
    <div class="app-body">
      ${getAppContent(appId)}
    </div>
  `;

  windowArea.appendChild(win);
  makeDraggable(win);
}

function closeApp(appId) {
  const win = document.getElementById(`app-${appId}`);
  if (win) win.remove();
}

function getAppTitle(appId) {
  switch (appId) {
    case 'secure-docs': return '📁 Secure Docs';
    case 'chat': return '💬 Communications';
    case 'sipr': return '🌐 SIPR Browser';
    case 'journal': return '📓 Encrypted Journal';
    case 'settings': return '⚙️ Settings';
    case 'contacts': return '📇 Contacts';
    default: return appId.charAt(0).toUpperCase() + appId.slice(1);
  }
}

function getAppContent(appId) {
  switch (appId) {
    case 'secure-docs':
      return `<p>This module is coming soon.</p>`;
    case 'chat':
      return `<p>Secure chat system coming soon.</p>`;
    case 'sipr':
      return `<p>SIPR interface is under construction.</p>`;
    case 'journal':
      return `<textarea placeholder="Your encrypted journal..." style="width: 100%; height: 200px;"></textarea>`;
    case 'settings':
      return `<p>Settings interface not yet implemented.</p>`;
    case 'contacts':
      return `<p>Contact list coming soon.</p>`;
    default:
      return `<p>Unknown module: ${appId}</p>`;
  }
}

function makeDraggable(win) {
  const header = win.querySelector(".app-header");
  let offsetX = 0, offsetY = 0, isDown = false;

  header.style.cursor = "move";
  header.addEventListener("mousedown", (e) => {
    isDown = true;
    offsetX = e.clientX - win.offsetLeft;
    offsetY = e.clientY - win.offsetTop;
    win.style.zIndex = 1000;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    win.style.left = `${e.clientX - offsetX}px`;
    win.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
  });
}
