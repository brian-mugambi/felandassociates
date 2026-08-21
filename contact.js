// ============================================================
//  FEL & Associates - Contact Modal (FormSubmit)
//  Triggers after 5s idle, once per session
// ============================================================

(function() {
  'use strict';

  // --- CONFIG ---
  const FORM_ENDPOINT = 'https://formsubmit.co/fel.icloud';
  const IDLE_TIMEOUT = 5000;

  // --- STATE ---
  let isOpen = false;
  let isClosedThisSession = false;
  let idleTimer = null;
  let hasInteracted = false;

  // --- ICONS ---
  const ICONS = {
    scales: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L12 22"/><path d="M4 6L20 6"/><path d="M4 18L20 18"/><path d="M8 6L8 22"/><path d="M16 6L16 22"/><path d="M4 6L8 6"/><path d="M16 6L20 6"/><path d="M8 22L16 22"/></svg>`,
    close: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    send: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    spinner: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L12 6"/><path d="M12 18L12 22"/><path d="M4.93 4.93L7.76 7.76"/><path d="M16.24 16.24L19.07 19.07"/><path d="M2 12L6 12"/><path d="M18 12L22 12"/><path d="M4.93 19.07L7.76 16.24"/><path d="M16.24 7.76L19.07 4.93"/></svg>`
  };

  // --- STYLES ---
  function injectStyles() {
    if (document.getElementById('fel-styles')) return;
    const style = document.createElement('style');
    style.id = 'fel-styles';
    style.textContent = `
      @keyframes felIn{from{opacity:0}to{opacity:1}}
      @keyframes felSlide{from{opacity:0;transform:translateY(30px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes felSpin{from{transform:rotate(0)}to{transform:rotate(360deg)}}
      @keyframes felShake{0%,100%{transform:translateX(0)}10%,30%,50%,70%,90%{transform:translateX(-4px)}20%,40%,60%,80%{transform:translateX(4px)}}
      .fel-overlay{position:fixed;inset:0;background:rgba(23,27,70,0.7);backdrop-filter:blur(6px);z-index:99999;display:none;align-items:center;justify-content:center;padding:20px;animation:felIn .3s ease}
      .fel-modal{background:#fbf9fd;border-radius:28px;max-width:480px;width:100%;max-height:90vh;box-shadow:0 24px 70px rgba(29,27,68,.13);border:1px solid rgba(37,42,97,.08);overflow:hidden;animation:felSlide .35s cubic-bezier(.2,.8,.2,1)}
      .fel-header{padding:20px 24px 16px;background:#252a61;color:#fff;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #d6a63b}
      .fel-header-left{display:flex;align-items:center;gap:12px}
      .fel-icon-wrap{width:40px;height:40px;border-radius:50%;background:#d6a63b;color:#252a61;display:grid;place-items:center;flex-shrink:0}
      .fel-icon-wrap svg{width:20px;height:20px;stroke:#252a61}
      .fel-title{font-weight:800;font-size:18px;letter-spacing:-.02em;color:#fff}
      .fel-subtitle{font-size:11px;opacity:.7;font-weight:400;color:#edcf83}
      .fel-close-btn{background:rgba(255,255,255,.08);border:none;color:#fff;width:34px;height:34px;border-radius:50%;cursor:pointer;transition:all .2s;display:grid;place-items:center;padding:0}
      .fel-close-btn:hover{background:rgba(255,255,255,.15)}
      .fel-close-btn svg{width:16px;height:16px;stroke:currentColor}
      .fel-body{padding:24px 24px 28px;overflow-y:auto;max-height:calc(90vh - 80px)}
      .fel-body p{color:#6d6b7c;font-size:14px;margin:0 0 18px;line-height:1.6}
      .fel-group{margin-bottom:16px}
      .fel-group label{display:block;font-size:13px;font-weight:600;color:#252a61;margin-bottom:4px}
      .fel-group label .fel-req{color:#d6a63b;margin-left:2px}
      .fel-control{width:100%;padding:11px 14px;border:1px solid rgba(37,42,97,.12);border-radius:12px;font-size:14px;font-family:inherit;background:#fff;color:#24243a;transition:all .2s;outline:none;box-sizing:border-box}
      .fel-control:focus{border-color:#d6a63b;box-shadow:0 0 0 3px rgba(214,166,59,.15)}
      .fel-control::placeholder{color:#a0a0b0}
      .fel-control.error{border-color:#e74c3c;box-shadow:0 0 0 3px rgba(231,76,60,.12);animation:felShake .4s ease}
      .fel-row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .fel-textarea{min-height:90px;resize:vertical}
      .fel-submit{width:100%;padding:13px 20px;border:none;border-radius:999px;background:#252a61;color:#fff;font-weight:700;font-size:14px;cursor:pointer;transition:all .25s;font-family:inherit;display:inline-flex;align-items:center;justify-content:center;gap:8px;margin-top:4px}
      .fel-submit:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(37,42,97,.25)}
      .fel-submit:disabled{opacity:.6;cursor:not-allowed;transform:none!important;box-shadow:none!important}
      .fel-submit svg{width:16px;height:16px;stroke:currentColor}
      .fel-success{text-align:center;padding:30px 10px;animation:felIn .5s ease}
      .fel-success .fel-check{width:64px;height:64px;border-radius:50%;background:#edcf83;color:#252a61;display:grid;place-items:center;margin:0 auto 16px}
      .fel-success .fel-check svg{width:32px;height:32px;stroke:#252a61}
      .fel-success h3{color:#252a61;font-size:20px;margin:0 0 8px;letter-spacing:-.02em}
      .fel-success p{color:#6d6b7c;font-size:14px;margin:0;line-height:1.6}
      .fel-error{color:#e74c3c;font-size:13px;margin-top:10px;text-align:center;font-weight:500}
      .fel-spin{animation:felSpin .8s linear infinite}
      @media(max-width:500px){.fel-modal{border-radius:20px}.fel-body{padding:18px}.fel-header{padding:16px 18px 14px}.fel-row{grid-template-columns:1fr}.fel-title{font-size:16px}.fel-icon-wrap{width:36px;height:36px}.fel-icon-wrap svg{width:17px;height:17px}}
    `;
    document.head.appendChild(style);
  }

  // --- BUILD MODAL ---
  function buildModal() {
    const overlay = document.createElement('div');
    overlay.className = 'fel-overlay';
    overlay.id = 'fel-overlay';
    document.body.appendChild(overlay);

    const modal = document.createElement('div');
    modal.className = 'fel-modal';
    overlay.appendChild(modal);

    // Header
    const header = document.createElement('div');
    header.className = 'fel-header';
    header.innerHTML = `
      <div class="fel-header-left">
        <div class="fel-icon-wrap">${ICONS.scales}</div>
        <div>
          <div class="fel-title">Contact Us</div>
          <div class="fel-subtitle">FEL & Associates PC</div>
        </div>
      </div>
      <button class="fel-close-btn" id="fel-close-btn">${ICONS.close}</button>
    `;
    modal.appendChild(header);

    // Body
    const body = document.createElement('div');
    body.className = 'fel-body';
    body.id = 'fel-body';
    modal.appendChild(body);

    // Form
    body.innerHTML = `
      <p>Send us a message and our team will respond promptly.</p>
      <form id="fel-form" action="${FORM_ENDPOINT}" method="POST">
        <input type="hidden" name="_captcha" value="false">
        <input type="hidden" name="_template" value="table">
        <input type="hidden" name="_subject" value="New Contact Form - FEL & Associates">
        <div class="fel-group">
          <label for="fel-name">Full Name <span class="fel-req">*</span></label>
          <input type="text" id="fel-name" name="name" class="fel-control" placeholder="John Doe" required />
        </div>
        <div class="fel-row">
          <div class="fel-group">
            <label for="fel-email">Email <span class="fel-req">*</span></label>
            <input type="email" id="fel-email" name="email" class="fel-control" placeholder="you@example.com" required />
          </div>
          <div class="fel-group">
            <label for="fel-phone">Phone</label>
            <input type="tel" id="fel-phone" name="phone" class="fel-control" placeholder="+254 7XX XXX XXX" />
          </div>
        </div>
        <div class="fel-group">
          <label for="fel-subject">Subject <span class="fel-req">*</span></label>
          <input type="text" id="fel-subject" name="subject" class="fel-control" placeholder="Brief subject" required />
        </div>
        <div class="fel-group">
          <label for="fel-message">Message <span class="fel-req">*</span></label>
          <textarea id="fel-message" name="message" class="fel-control fel-textarea" placeholder="Describe your legal matter..." required></textarea>
        </div>
        <button type="submit" class="fel-submit" id="fel-submit-btn">${ICONS.send} Send Message</button>
      </form>
    `;

    // --- CLOSE HANDLERS ---
    function closeModal() {
      isOpen = false;
      overlay.style.display = 'none';
      document.body.style.overflow = '';
      isClosedThisSession = true;
    }

    document.getElementById('fel-close-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && isOpen) closeModal(); });

    // --- FORM SUBMIT ---
    const form = document.getElementById('fel-form');
    form.addEventListener('submit', async function(e) {
      e.preventDefault();

      const btn = document.getElementById('fel-submit-btn');
      const name = document.getElementById('fel-name');
      const email = document.getElementById('fel-email');
      const subject = document.getElementById('fel-subject');
      const message = document.getElementById('fel-message');

      // Reset errors
      form.querySelectorAll('.fel-control.error').forEach(el => el.classList.remove('error'));
      const oldError = form.querySelector('.fel-error');
      if (oldError) oldError.remove();

      // Validate
      let valid = true;
      if (!name.value.trim()) { name.classList.add('error'); valid = false; }
      if (!email.value.trim() || !email.value.includes('@')) { email.classList.add('error'); valid = false; }
      if (!subject.value.trim()) { subject.classList.add('error'); valid = false; }
      if (!message.value.trim()) { message.classList.add('error'); valid = false; }

      if (!valid) {
        const first = form.querySelector('.fel-control.error');
        if (first) first.focus();
        return;
      }

      // Submit
      btn.disabled = true;
      btn.innerHTML = `${ICONS.spinner} Sending...`;
      btn.querySelector('svg')?.classList.add('fel-spin');

      try {
        const data = new FormData(form);
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          const body = document.getElementById('fel-body');
          body.innerHTML = `
            <div class="fel-success">
              <div class="fel-check">${ICONS.check}</div>
              <h3>Message Sent!</h3>
              <p>Thank you for contacting FEL & Associates. We'll get back to you within 24 hours.</p>
            </div>
          `;
        } else {
          throw new Error('Server error');
        }
      } catch (err) {
        btn.disabled = false;
        btn.innerHTML = `${ICONS.send} Send Message`;
        const errDiv = document.createElement('div');
        errDiv.className = 'fel-error';
        errDiv.textContent = 'Failed to send. Please try again or call +254 116 090 356';
        form.appendChild(errDiv);
      }
    });

    // --- OPEN ---
    window._felOpen = function() {
      if (isClosedThisSession || isOpen) return;
      isOpen = true;
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const first = document.querySelector('#fel-name');
        if (first) first.focus();
      }, 400);
    };

    window._felClose = closeModal;
  }

  // --- TRACK INTERACTION ---
  function trackInteraction() {
    ['scroll', 'touchstart', 'mousedown', 'keydown', 'click'].forEach(event => {
      document.addEventListener(event, function() {
        hasInteracted = true;
        clearTimeout(idleTimer);
      }, { once: true });
    });
  }

  // --- START TIMER ---
  function startTimer() {
    idleTimer = setTimeout(() => {
      if (!hasInteracted && !isClosedThisSession) {
        if (window._felOpen) window._felOpen();
      }
    }, IDLE_TIMEOUT);
  }

  // --- INIT ---
  function init() {
    injectStyles();
    buildModal();
    trackInteraction();
    if (document.readyState === 'complete') {
      startTimer();
    } else {
      window.addEventListener('load', startTimer);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();