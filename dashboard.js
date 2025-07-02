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
  return `
    <textarea id="journal-entry" placeholder="Write your entry here..." style="width: 100%; height: 100px;"></textarea>
    <div class="button-group">
      <button onclick="saveJournalEntry()">Save</button>
      <button onclick="clearJournal()">Clear All</button>
    </div>
    <div id="journal-history" style="margin-top: 1em;"></div>
    <script>loadJournalHistory();</script>
  `;
    case 'settings':
      return `<p>Settings interface not yet implemented.</p>`;
case 'contacts':
  return `
    <div style="margin-bottom: 1em;">
      <input type="text" id="contact-name" placeholder="Name" />
      <input type="text" id="contact-role" placeholder="Role" />
      <textarea id="contact-notes" placeholder="Notes..."></textarea>
      <button onclick="addContact()">Add Contact</button>
    </div>
    <div id="contact-list"></div>
  `;
    default:
      return `<p>Unknown module: ${appId}</p>`;
  }
}

function makeDraggable(element) {
  let offsetX = 0, offsetY = 0, isDragging = false;

  function startDrag(e) {
    isDragging = true;
    const pos = e.touches ? e.touches[0] : e;
    offsetX = pos.clientX - element.offsetLeft;
    offsetY = pos.clientY - element.offsetTop;
    document.addEventListener(e.type === 'touchstart' ? 'touchmove' : 'mousemove', onDrag);
    document.addEventListener(e.type === 'touchstart' ? 'touchend' : 'mouseup', stopDrag);
  }

  function onDrag(e) {
    if (!isDragging) return;
    const pos = e.touches ? e.touches[0] : e;
    element.style.left = (pos.clientX - offsetX) + 'px';
    element.style.top = (pos.clientY - offsetY) + 'px';
  }

  function stopDrag(e) {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('touchend', stopDrag);
  }

  element.addEventListener('mousedown', startDrag);
  element.addEventListener('touchstart', startDrag, { passive: false });
}

document.addEventListener("DOMContentLoaded", () => {
  const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

  if (!hasSeenWelcome) {
    const modal = document.getElementById("welcome-modal");
    const video = document.getElementById("welcome-video");
    const skip = document.getElementById("skip-welcome");

    modal.style.display = "flex";

    const endWelcome = () => {
      modal.style.display = "none";
      localStorage.setItem("hasSeenWelcome", "true");
    };

    video.addEventListener("ended", endWelcome);
    skip.addEventListener("click", endWelcome);
  }
});

// Get character ID from URL
function getCharacterID() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id') || 'UNKNOWN';
}

// Key generator
function getJournalKey() {
  return `journal_${getCharacterID()}`;
}

// Save entry
function saveJournalEntry() {
  const text = document.getElementById('journal-entry').value.trim();
  if (!text) return;

  const timestamp = new Date().toISOString();
  const entry = { text, timestamp };

  let journal = JSON.parse(localStorage.getItem(getJournalKey()) || "[]");
  journal.unshift(entry); // latest on top
  localStorage.setItem(getJournalKey(), JSON.stringify(journal));

  document.getElementById('journal-entry').value = '';
  loadJournalHistory();
}

// Load entries
function loadJournalHistory() {
  const historyContainer = document.getElementById('journal-history');
  const journal = JSON.parse(localStorage.getItem(getJournalKey()) || "[]");

  historyContainer.innerHTML = journal.length
    ? journal.map(entry => `
        <div class="journal-entry">
          <small>${new Date(entry.timestamp).toLocaleString()}</small>
          <p>${entry.text}</p>
          <hr />
        </div>
      `).join('')
    : '<em>No entries yet.</em>';
}

// Clear entries
function clearJournal() {
  if (confirm("Are you sure you want to delete all journal entries for this ID?")) {
    localStorage.removeItem(getJournalKey());
    loadJournalHistory();
  }
}

// Optionally call this when opening the module
if (appId === 'journal') loadJournalHistory();

function getContactsKey() {
  return `contacts_${getCharacterID()}`;
}

function loadContacts() {
  const list = document.getElementById('contact-list');
  const contacts = JSON.parse(localStorage.getItem(getContactsKey()) || '[]');

  list.innerHTML = contacts.length
    ? contacts.map((c, i) => `
        <div class="contact-entry">
          <strong>${c.name}</strong> - ${c.role}<br />
          <small>${c.notes}</small><br />
          <button onclick="deleteContact(${i})">Delete</button>
          <hr/>
        </div>
      `).join('')
    : '<em>No contacts added yet.</em>';
}

function addContact() {
  const name = document.getElementById('contact-name').value.trim();
  const role = document.getElementById('contact-role').value.trim();
  const notes = document.getElementById('contact-notes').value.trim();
  if (!name) return;

  const contact = { name, role, notes };
  const contacts = JSON.parse(localStorage.getItem(getContactsKey()) || '[]');
  contacts.push(contact);
  localStorage.setItem(getContactsKey(), JSON.stringify(contacts));

  document.getElementById('contact-name').value = '';
  document.getElementById('contact-role').value = '';
  document.getElementById('contact-notes').value = '';
  loadContacts();
}

function deleteContact(index) {
  const contacts = JSON.parse(localStorage.getItem(getContactsKey()) || '[]');
  contacts.splice(index, 1);
  localStorage.setItem(getContactsKey(), JSON.stringify(contacts));
  loadContacts();
}

if (appId === 'contacts') {
  setTimeout(loadContacts, 0); // Let the DOM update first
}

