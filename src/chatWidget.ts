// src/chatWidget.ts
// Vanilla, framework-free widget — works identically on every page
// (React SPA entry and the plain .html pages alike).

const BOT_URL = 'https://connect-ventures-chatbot.onrender.com'; // set after deploying Step 1

// sessionStorage instead of localStorage: it clears when the tab closes,
// so a returning visitor (or a different person on a shared computer)
// always starts a genuinely new conversation instead of silently
// continuing — and being confused by — someone else's saved session.
function getSessionId(): string {
  let id = sessionStorage.getItem('cv_chat_session');
  if (!id) {
    id = 'cv_' + Date.now() + '_' + Math.random().toString(36).slice(2, 10);
    sessionStorage.setItem('cv_chat_session', id);
  }
  return id;
}

const DEFAULT_GREETING =
  "Hi there! 👋 Welcome to Connect Ventures. I'm your global expansion advisor — here to help across Coaching, Consulting, Connecting, Collaboration, and Co-creation. Who am I speaking with?";

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
      #cv-chat-head { background:linear-gradient(135deg,#00c9a7 0%,#0070f3 100%); color:#fff; padding:14px 16px; font-weight:700;
        display:flex; align-items:center; justify-content:space-between; }
      #cv-chat-head button { background:none; border:none; color:#fff; font-size:18px; cursor:pointer; line-height:1; opacity:.85; }
      #cv-chat-body { flex:1; overflow-y:auto; padding:12px; background:#f2f7fc; }
      .cv-msg { margin:6px 0; padding:10px 12px; border-radius:12px; max-width:85%; font-size:14px; line-height:1.4; white-space:pre-wrap; }
      .cv-msg.user { background:#0070f3; color:#fff; margin-left:auto; }
      .cv-msg.bot  { background:#fff; color:#101824; border:1px solid #dde8f2; }
      .cv-msg.bot.typing { color:#8a97a8; font-style:italic; }
      #cv-chat-input-row { display:flex; border-top:1px solid #dde8f2; padding:8px; gap:8px; }
      #cv-chat-input { flex:1; border:1px solid #dde8f2; border-radius:8px; padding:8px 10px; font-size:14px; }
      #cv-chat-send { background:#0070f3; color:#fff; border:none; border-radius:8px; padding:8px 14px; cursor:pointer; }
      #cv-chat-send:disabled { opacity:.5; cursor:default; }

      /* Inline contact form (shown instead of the plain text input row
         when the bot needs name/email/phone) */
      #cv-chat-form { border-top:1px solid #dde8f2; padding:12px; background:#fff; display:flex; flex-direction:column; gap:8px; }
      #cv-chat-form label { font-size:12px; font-weight:600; color:#48566a; }
      #cv-chat-form input { border:1px solid #dde8f2; border-radius:8px; padding:8px 10px; font-size:14px; width:100%; box-sizing:border-box; }
      #cv-chat-form input.cv-err { border-color:#e5484d; }
      #cv-chat-form .cv-field-err { color:#e5484d; font-size:12px; margin-top:-4px; }
      #cv-chat-form-submit { background:#0070f3; color:#fff; border:none; border-radius:8px; padding:9px 14px; font-size:14px; font-weight:600; cursor:pointer; }
      #cv-chat-form-submit:disabled { opacity:.5; cursor:default; }
      #cv-chat-form-skip { background:none; border:none; color:#7a8798; font-size:12px; cursor:pointer; text-decoration:underline; align-self:flex-start; }
    </style>
    <button id="cv-chat-btn" aria-label="Open chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.4 8.5 8.5 0 0 1-4-1L3 21l1.1-5.5A8.4 8.4 0 0 1 3.5 11.5 8.5 8.5 0 1 1 21 11.5Z"/></svg>
    </button>
    <div id="cv-chat-panel">
      <div id="cv-chat-head">
        <span>Connect Ventures Advisor</span>
        <button id="cv-chat-newchat" title="Start a new conversation">↻ New chat</button>
      </div>
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
  const inputRow = document.getElementById('cv-chat-input-row')!;
  const input = document.getElementById('cv-chat-input') as HTMLInputElement;
  const send = document.getElementById('cv-chat-send') as HTMLButtonElement;
  const newChatBtn = document.getElementById('cv-chat-newchat')!;

  let opened = false;
  let currentPhase = 'onboarding_name';
  let knownName: string | null = null;

  btn.addEventListener('click', async () => {
    const willOpen = panel.style.display !== 'flex';
    panel.style.display = willOpen ? 'flex' : 'none';
    if (willOpen && !opened) {
      opened = true;
      await restoreOrGreet();
    }
  });

  newChatBtn.addEventListener('click', async () => {
    sessionStorage.removeItem('cv_chat_session');
    location.reload();
  });

  // On open: ask the backend what it actually knows about this session
  // (restoring the visible conversation to match) instead of always
  // showing the same hardcoded greeting regardless of session state.
  async function restoreOrGreet() {
    try {
      const res = await fetch(BOT_URL + '/api/chat/session/' + encodeURIComponent(sessionId));
      const data = await res.json();
      currentPhase = data.phase || 'onboarding_name';
      knownName = data.name || null;
      if (data.history && data.history.length > 0) {
        for (const m of data.history) pushMessage(m.role === 'user' ? 'user' : 'bot', m.content);
      } else {
        pushMessage('bot', DEFAULT_GREETING);
      }
    } catch {
      pushMessage('bot', DEFAULT_GREETING);
    }
    renderInputForPhase();
  }

  function pushMessage(role: 'user' | 'bot', text: string) {
    const el = document.createElement('div');
    el.className = 'cv-msg ' + role;
    el.textContent = text;
    body.appendChild(el);
    body.scrollTop = body.scrollHeight;
  }

  // Swap between the plain text row and the structured contact form
  // depending on what the bot currently needs.
  function renderInputForPhase() {
    const existingForm = document.getElementById('cv-chat-form');
    if (existingForm) existingForm.remove();

    if (currentPhase === 'onboarding_contact') {
      inputRow.style.display = 'none';
      mountContactForm(false);
    } else {
      inputRow.style.display = 'flex';
    }
  }

  function mountContactForm(includeName: boolean) {
    const form = document.createElement('div');
    form.id = 'cv-chat-form';
    form.innerHTML = `
      ${includeName ? `
      <label for="cv-f-name">Name</label>
      <input id="cv-f-name" placeholder="Your name" />
      ` : ''}
      <label for="cv-f-email">Email</label>
      <input id="cv-f-email" type="email" placeholder="you@company.com" />
      <label for="cv-f-phone">Phone (with country code)</label>
      <input id="cv-f-phone" placeholder="+91 98765 43210" />
      <button id="cv-chat-form-submit">Send my details</button>
      <button id="cv-chat-form-skip">Skip for now</button>
    `;
    panel.insertBefore(form, inputRow);

    const submitBtn = document.getElementById('cv-chat-form-submit') as HTMLButtonElement;
    const skipBtn = document.getElementById('cv-chat-form-skip')!;
    const nameInput = document.getElementById('cv-f-name') as HTMLInputElement | null;
    const emailInput = document.getElementById('cv-f-email') as HTMLInputElement;
    const phoneInput = document.getElementById('cv-f-phone') as HTMLInputElement;

    function clearFieldErrors() {
      [nameInput, emailInput, phoneInput].forEach((el) => el?.classList.remove('cv-err'));
      form.querySelectorAll('.cv-field-err').forEach((el) => el.remove());
    }

    function showFieldError(input: HTMLInputElement, message: string) {
      input.classList.add('cv-err');
      const err = document.createElement('div');
      err.className = 'cv-field-err';
      err.textContent = message;
      input.insertAdjacentElement('afterend', err);
    }

    submitBtn.addEventListener('click', async () => {
      clearFieldErrors();
      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!email && !phone) {
        showFieldError(emailInput, 'Please provide at least an email or a phone number.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      // Show what the person typed as a normal chat bubble for context.
      const submittedLine = [name && `Name: ${name}`, email && `Email: ${email}`, phone && `Phone: ${phone}`]
        .filter(Boolean).join(' · ');
      pushMessage('user', submittedLine);

      try {
        const res = await fetch(BOT_URL + '/api/chat/contact-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, name, email, phone }),
        });
        const data = await res.json();

        if (!data.success) {
          if (data.errors?.email) showFieldError(emailInput, data.errors.email);
          if (data.errors?.phone) showFieldError(phoneInput, data.errors.phone);
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send my details';
          // Undo the optimistic bubble we just added — the submission failed.
          body.removeChild(body.lastChild as ChildNode);
          return;
        }

        currentPhase = data.phase || 'advisory';
        knownName = data.name || knownName;
        if (data.reply) pushMessage('bot', data.reply);
        form.remove();
        renderInputForPhase();
      } catch {
        pushMessage('bot', 'Connection issue — please try again in a moment.');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send my details';
      }
    });

    skipBtn.addEventListener('click', () => {
      form.remove();
      inputRow.style.display = 'flex';
      sendRaw('skip');
    });
  }

  async function sendRaw(text: string) {
    pushMessage('user', text);
    await callChat(text);
  }

  async function callChat(text: string) {
    send.disabled = true;
    try {
      const res = await fetch(BOT_URL + '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId }),
      });
      const data = await res.json();
      pushMessage('bot', data.reply || 'Sorry, something went wrong — please try again.');
      if (data.phase) {
        currentPhase = data.phase;
        renderInputForPhase();
      }
    } catch {
      pushMessage('bot', 'Connection issue — please try again in a moment.');
    } finally {
      send.disabled = false;
    }
  }

  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    pushMessage('user', text);
    await callChat(text);
  }

  send.addEventListener('click', sendMessage);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMessage(); });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}
