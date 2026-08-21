// SPTS

(function() {
    'use strict';

    // ===== Developer details=====
    const CONFIG = {
        email: 'infospteamstudio@gmail.com',
        whatsapp: '254701874917',
        whatsappMessage: 'I need a website',
        developerName: 'SP Team Studio',
        shortName: 'SPTS',
        triggerText: '@dev_sp',
    };

    // ===== BUILD  =====
    const style = document.createElement('style');
    style.textContent = `
        /* SPTS */
        
        .spts-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 10, 0, 0.92);
            backdrop-filter: blur(12px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 100000;
            font-family: 'Courier New', 'Fira Code', monospace;
            padding: 20px;
            box-sizing: border-box;
        }
        .spts-modal-overlay.active {
            display: flex;
        }

        .spts-modal-card {
            background: #0a0f0a;
            max-width: 480px;
            width: 100%;
            border-radius: 8px;
            padding: 40px 32px 32px;
            border: 1px solid #1a3a1a;
            box-shadow: 0 0 60px rgba(0, 255, 65, 0.06), inset 0 0 60px rgba(0, 255, 65, 0.02);
            position: relative;
            transform: scale(0.95);
            transition: transform 0.3s ease, opacity 0.3s ease;
            opacity: 0;
            max-height: 90vh;
            overflow-y: auto;
        }
        .spts-modal-overlay.active .spts-modal-card {
            transform: scale(1);
            opacity: 1;
        }

        /* Scanline effect */
        .spts-modal-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                rgba(0, 255, 65, 0.015) 2px,
                rgba(0, 255, 65, 0.015) 4px
            );
            pointer-events: none;
            border-radius: 8px;
        }

        /* Glow border */
        .spts-modal-card::after {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: 9px;
            padding: 1px;
            background: linear-gradient(135deg, #1a3a1a, #0a2a0a, #1a3a1a);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
        }

        /* Terminal cursor blink */
        .spts-terminal-cursor {
            display: inline-block;
            width: 10px;
            height: 1.2em;
            background: #00ff41;
            animation: sptsBlink 1s step-end infinite;
            vertical-align: text-bottom;
            margin-left: 2px;
        }

        @keyframes sptsBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }

        .spts-welcome {
            position: relative;
            z-index: 2;
            margin-bottom: 24px;
            padding-bottom: 20px;
            border-bottom: 1px solid #1a2a1a;
        }

        .spts-welcome .spts-prompt {
            color: #1a5a1a;
            font-size: 0.7rem;
            letter-spacing: 0.1em;
            margin-bottom: 8px;
            font-weight: 400;
        }

        .spts-welcome .spts-prompt::before {
            content: '> ';
            color: #00ff41;
        }

        .spts-welcome h2 {
            font-size: 1.2rem;
            font-weight: 400;
            color: #00ff41;
            margin: 0 0 8px 0;
            letter-spacing: -0.02em;
            font-family: 'Courier New', monospace;
        }

        .spts-welcome h2 .highlight {
            color: #ffffff;
            position: relative;
        }

        .spts-welcome h2 .highlight::before {
            content: '[';
            color: #00ff41;
            opacity: 0.5;
        }

        .spts-welcome h2 .highlight::after {
            content: ']';
            color: #00ff41;
            opacity: 0.5;
        }

        .spts-welcome p {
            font-size: 0.8rem;
            color: #6a8a6a;
            line-height: 1.6;
            margin: 0;
            font-weight: 300;
        }

        .spts-welcome .spts-tagline {
            margin-top: 12px;
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }

        .spts-welcome .spts-tagline span {
            font-size: 0.6rem;
            color: #3a6a3a;
            border: 1px solid #1a2a1a;
            padding: 2px 12px;
            border-radius: 2px;
            letter-spacing: 0.05em;
        }

        .spts-actions {
            display: flex;
            gap: 10px;
            margin: 20px 0 18px;
            position: relative;
            z-index: 2;
        }

        .spts-action-btn {
            flex: 1;
            padding: 12px 16px;
            border: 1px solid #1a3a1a;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 0.7rem;
            font-weight: 400;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            text-decoration: none;
            background: transparent;
            color: #6a8a6a;
            letter-spacing: 0.05em;
        }

        .spts-action-btn:hover {
            border-color: #00ff41;
            color: #00ff41;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.05);
        }

        .spts-action-btn.primary {
            border-color: #00ff41;
            color: #00ff41;
        }

        .spts-action-btn.primary:hover {
            background: rgba(0, 255, 65, 0.05);
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.08);
        }

        .spts-action-btn.whatsapp {
            border-color: #1a5a2a;
            color: #3a8a4a;
        }

        .spts-action-btn.whatsapp:hover {
            border-color: #00ff41;
            color: #00ff41;
        }

        .spts-form-container {
            display: none;
            position: relative;
            z-index: 2;
            margin-top: 4px;
            animation: sptsFadeIn 0.3s ease;
        }
        .spts-form-container.active {
            display: block;
        }

        @keyframes sptsFadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .spts-form-group {
            margin-bottom: 14px;
        }

        .spts-form-group label {
            display: block;
            font-size: 0.6rem;
            font-weight: 400;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #3a5a3a;
            margin-bottom: 4px;
        }

        .spts-form-group input,
        .spts-form-group textarea {
            width: 100%;
            padding: 10px 14px;
            font-family: 'Courier New', monospace;
            font-size: 0.8rem;
            font-weight: 300;
            color: #8aaa8a;
            background: #050a05;
            border: 1px solid #1a2a1a;
            border-radius: 4px;
            transition: all 0.2s ease;
            outline: none;
            box-sizing: border-box;
            line-height: 1.4;
        }

        .spts-form-group input:focus,
        .spts-form-group textarea:focus {
            border-color: #00ff41;
            background: #0a100a;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.04);
        }

        .spts-form-group input::placeholder,
        .spts-form-group textarea::placeholder {
            color: #2a3a2a;
            font-weight: 300;
            font-size: 0.7rem;
        }

        .spts-form-group textarea {
            min-height: 70px;
            resize: vertical;
        }

        .spts-form-row {
            display: flex;
            gap: 12px;
        }
        .spts-form-row .spts-form-group {
            flex: 1;
        }

        .spts-submit-btn {
            width: 100%;
            padding: 12px;
            background: transparent;
            border: 1px solid #00ff41;
            border-radius: 4px;
            color: #00ff41;
            font-family: 'Courier New', monospace;
            font-size: 0.75rem;
            font-weight: 400;
            cursor: pointer;
            transition: all 0.2s ease;
            margin-top: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            letter-spacing: 0.05em;
        }

        .spts-submit-btn:hover {
            background: rgba(0, 255, 65, 0.05);
            box-shadow: 0 0 30px rgba(0, 255, 65, 0.06);
        }

        .spts-close-btn {
            position: absolute;
            top: 12px;
            right: 16px;
            background: none;
            border: none;
            font-size: 1rem;
            color: #2a4a2a;
            cursor: pointer;
            z-index: 5;
            padding: 4px 8px;
            border-radius: 4px;
            transition: 0.2s;
            font-family: 'Courier New', monospace;
        }

        .spts-close-btn:hover {
            color: #00ff41;
            background: rgba(0, 255, 65, 0.04);
        }

        .spts-back-link {
            display: inline-block;
            margin-top: 12px;
            font-size: 0.65rem;
            color: #3a5a3a;
            cursor: pointer;
            background: none;
            border: none;
            font-family: 'Courier New', monospace;
            padding: 4px 0;
            transition: 0.2s;
            letter-spacing: 0.05em;
        }

        .spts-back-link:hover {
            color: #00ff41;
        }

        @media (max-width: 480px) {
            .spts-modal-card {
                padding: 28px 18px 22px;
            }
            .spts-actions {
                flex-direction: column;
            }
            .spts-form-row {
                flex-direction: column;
                gap: 0;
            }
            .spts-welcome h2 {
                font-size: 1rem;
            }
        }

        /* Scrollbar */
        .spts-modal-card::-webkit-scrollbar {
            width: 3px;
        }
        .spts-modal-card::-webkit-scrollbar-track {
            background: #050a05;
        }
        .spts-modal-card::-webkit-scrollbar-thumb {
            background: #1a3a1a;
            border-radius: 2px;
        }
        .spts-modal-card::-webkit-scrollbar-thumb:hover {
            background: #00ff41;
        }
    `;
    document.head.appendChild(style);

    // ===== BUILD=====

    // 1. Trigger link - completely unstyled
    const trigger = document.createElement('a');
    trigger.href = 'javascript:void(0)';
    trigger.textContent = CONFIG.triggerText;
    trigger.style.cssText = 'all: unset; cursor: pointer;';
    trigger.setAttribute('role', 'button');
    trigger.setAttribute('aria-label', 'Open contact form');
    trigger.addEventListener('click', openModal);

    // Insert after footer or at end of body
    const footer = document.querySelector('footer');
    if (footer) {
        footer.parentNode.insertBefore(trigger, footer.nextSibling);
    } else {
        document.body.appendChild(trigger);
    }

    // 2. Modal overlay (NO FLOATING WHATSAPP BUTTON)
    const overlay = document.createElement('div');
    overlay.className = 'spts-modal-overlay';
    overlay.id = 'sptsModalOverlay';
    overlay.innerHTML = `
        <div class="spts-modal-card">
            <button class="spts-close-btn" id="sptsCloseModal" aria-label="Close form">
                <i class="fas fa-times"></i>
            </button>

            <div class="spts-welcome" id="sptsWelcome">
                <div class="spts-prompt">SPTS::TERMINAL</div>
                <h2>
                    <span class="highlight">${CONFIG.developerName}</span>
                    <span class="spts-terminal-cursor"></span>
                </h2>
                <p>Professional Websites. Digital Tools made by Developer SP & Team with Excellence</p>
                <p style="margin-top: 6px; font-size: 0.75rem; opacity: 0.6;">
                    Modern, high-quality websites that build credibility and grow online.
                </p>
                <div class="spts-tagline">
                    <span>SEO Efficiency</span>
                    <span>Digital tools</span>
                    <span>Hosting</span>
                    <span>Data Export</span>
                    <span>Fast and Responsive</span>
 <span>Excellent Ux</span>
 <span>Clean UI</span>
<span>Sub domains</span>
 <span>Secure Backend Payments Validation</span>
 
                </div>
            </div>

            <div class="spts-actions">
                <button class="spts-action-btn primary" id="sptsContactBtn">
                    <i class="fas fa-envelope"></i> CONTACT
                </button>
                <a href="https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage)}" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   class="spts-action-btn whatsapp">
                    <i class="fab fa-whatsapp"></i> WHATSAPP
                </a>
            </div>

            <div class="spts-form-container" id="sptsFormContainer">
                <form class="spts-form" id="sptsContactForm" action="https://formsubmit.co/${CONFIG.email}" method="POST">
                    <input type="text" name="_honey" style="display:none">
                    <input type="hidden" name="_captcha" value="false">
                    <input type="hidden" name="_template" value="table">
                    <input type="hidden" name="_subject" value="New website inquiry from SPTS">

                    <div class="spts-form-row">
                        <div class="spts-form-group">
                            <label for="sptsName">NAME</label>
                            <input type="text" id="sptsName" name="name" placeholder="Your name" required>
                        </div>
                        <div class="spts-form-group">
                            <label for="sptsEmail">EMAIL</label>
                            <input type="email" id="sptsEmail" name="email" placeholder="you@domain.com" required>
                        </div>
                    </div>

                    <div class="spts-form-group">
                        <label for="sptsMessage">MESSAGE</label>
                        <textarea id="sptsMessage" name="message" placeholder="Tell me about your project..." required></textarea>
                    </div>

                    <button type="submit" class="spts-submit-btn">
                        <i class="fas fa-paper-plane"></i> SEND MESSAGE
                    </button>
                </form>

                <button class="spts-back-link" id="sptsBackBtn">
                    <i class="fas fa-arrow-left"></i> BACK
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Load Font Awesome if not present
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const faLink = document.createElement('link');
        faLink.rel = 'stylesheet';
        faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
        document.head.appendChild(faLink);
    }

    // =====  CONTROLS =====

    let isFormVisible = false;

    function openModal(e) {
        if (e) e.preventDefault();
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        showWelcome();
    }

    function closeModal() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            showWelcome();
        }, 300);
    }

    function showWelcome() {
        document.getElementById('sptsWelcome').style.display = 'block';
        document.getElementById('sptsFormContainer').classList.remove('active');
        isFormVisible = false;
    }

    function showForm() {
        document.getElementById('sptsWelcome').style.display = 'none';
        document.getElementById('sptsFormContainer').classList.add('active');
        isFormVisible = true;
    }

    document.getElementById('sptsCloseModal').addEventListener('click', closeModal);
    document.getElementById('sptsContactBtn').addEventListener('click', showForm);
    document.getElementById('sptsBackBtn').addEventListener('click', showWelcome);

    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeModal();
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });

    const form = document.getElementById('sptsContactForm');
    form.addEventListener('submit', function(e) {
        const btn = this.querySelector('.spts-submit-btn');
        const original = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> SENDING...';
        btn.disabled = true;
        setTimeout(() => {
            btn.innerHTML = original;
            btn.disabled = false;
        }, 5000);
        setTimeout(() => {
            closeModal();
        }, 800);
    });

    console.log('✅ SPTS  active · WhatsApp: ' + CONFIG.whatsapp);
})();