// src/chatWidget.ts
// Vanilla, framework-free widget — works identically on every page
// (React SPA entry and the plain .html pages alike).

const BOT_URL = 'https://YOUR-CHATBOT-SERVICE-URL.onrender.com'; // set after deploying Step 1

function getSessionId(): string {
  let id = localStorage.getItem('cv_chat_session');
  if (!id) {
    id = 'cv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
    localStorage.setItem('cv_chat_session', id);
  }
  return id;
}

function mountWidget() {
  const sessionId = getSessionId();
  const root = document.createElement('div');
  root.innerHTML = `
    <style>
      #cv-chat-btn { position:fixed; bottom:24px; right:24px; width:60px; height:60px; border-radius:50%;
        background:linear-gradient(135deg,#00c9a7 0%,#0070f3 100%); box-shadow:0 8px 24px rgba(0,112,243,.35);
        border:none; cursor:pointer; z-index:9999; display:flex; align-items:center; justify-content:center; }
      #cv-chat-btn svg { width:28px; height:28px; }
      #cv-chat-panel { position:fixed; bottom:96px; right:24px; width:360px; max-width:92vw; height:520px;
        max-height:75vh; background:#fff; border-radius:16px; box-shadow:0 16px 48px rgba(8,12,20,.25);
        display:none; flex-direction:column; overflow:hidden; z-index:9999; font-family:'Plus Jakarta Sans',sans-serif; }
      #cv-chat-head { background:linear-gradient(135deg,#00c9a7 0%,#0070f3 100%); color:#fff; padding:14px 16px; font-weight:700; }
      #cv-chat-body { flex:1; overflow-y:auto; padding:12px; background:#f2f7fc; }
      .cv-msg { margin:6px 0; padding:10px 12px; border-radius:12px; max-width:85%; font-size:14px; line-height:1.4; white-space:pre-wrap; }
      .cv-msg.user { background:#0070f3; color:#fff; margin-left:auto; }
      .cv-msg.bot  { background:#fff; color:#101824; border:1px solid #dde8f2; }
      #cv-chat-input-row { display:flex; border-top:1px solid #dde8f2; padding:8px; gap:8px; }
      #cv-chat-input { flex:1; border:1px solid #dde8f2; border-radius:8px; padding:8px 10px; font-size:14px; }
      #cv-chat-send { background:#0070f3; color:#fff; border:none; border-radius:8px; padding:8px 14px; cursor:pointer; }
    </style>
    <button id="cv-chat-btn" aria-label="Open chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4 8.5 8.5 0 0 1-4-1L3 21l1.1-5.5A8.4 8.4 0 0 1 3.5 11.5 8.5 8.5 0 1 1 21 11.5Z"/></svg>
    </button>
    <div id="cv-chat-panel">
      <div id="cv-chat-head">Connect Ventures Advisor</div>
      <div id="cv-chat-body"></div>
      <div id="cv-chat-input-row">
        <input id="cv-chat-input" placeholder="Ask about expanding globally..." />
        <button id="cv-chat-send">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(root);

  const btn = document.getElementById('cv-chat-btn')!;
  const panel = document.getElementById('cv-chat-panel')!;
  const body = document.getElementById('cv-chat-body')!;
  const input = document.getElementById('cv-chat-input') as HTMLInputElement;
  const send = document.getElementById('cv-chat-send')!;

  let opened = false;
  btn.addEventListener('click', () => {
    panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
    if (!opened && panel.style.display === 'flex') {
      opened = true;
      pushMessage('bot', "Hi there! 👋 Welcome to Connect Ventures. I'm your global expansion advisor — here to help across Coaching, Consulting, Connecting, Collaboration, and Co-creation. Who am I speaking with?");
    }
  });

  function pushMessage(role: 'user' | 'bot', text: string) {
    const el = document.createElement('div');
    el.className = 'cv-msg ' + role;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    pushMessage('user', text);
    input.value = '';
    try {
      const res = await fetch(BOT_URL + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      pushMessage('bot', data.reply || 'Sorry, something went wrong — please try again.');
    } catch (err) {
      pushMessage('bot', 'Connection issue — please try again in a moment.');
    }
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}
