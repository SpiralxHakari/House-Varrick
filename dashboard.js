function openApp(appId) {
  const windowArea = document.getElementById("window-area");
  const existing = document.getElementById(`app-${appId}`);
  if (existing) return;

  const win = document.createElement("div");
  win.className = "app-window";
  win.id = `app-${appId}`;
  win.innerHTML = `
    <div class="app-header">
      <span>${getAppTitle(appId)}</span>
      <button onclick="closeApp('${appId}')">✖</button>
    </div>
    <div class="app-body">
      ${getAppContent(appId)}
    </div>
  `;
  windowArea.appendChild(win);
}

function closeApp(appId) {
  const win = document.getElementById(`app-${appId}`);
  if (win) win.remove();
}

// Dynamically return app titles
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

// Inject app-specific content (can be expanded later)
function getAppContent(appId) {
  switch (appId) {
    case 'secure-docs':
      return `<p>This module is coming soon.</p>`;
    case 'chat':
      return `<p>Secure chat system coming soon.</p>`;
    case 'sipr':
      return `<p>SIPR interface is under construction.</p>`;
    case 'journal':
      return `<textarea placeholder="Your encrypted journal..."></textarea>`;
    case 'settings':
      return `<p>Settings interface not yet implemented.</p>`;
    case 'contacts':
      return `<p>Contact list coming soon.</p>`;
    default:
      return `<p>Unknown module: ${appId}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("toggle-sidebar");
  const sidebar = document.getElementById("sidebar");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
  });
});

