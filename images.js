// ============================================================
//  FEL & Associates - Image Injection
//  Logo floating above icon | CEO full portrait | Team portrait
//  Clean, independent, no layout impact
// ============================================================

(function() {
    'use strict';

    const IMAGES = {
        logo: 'logo.png',
        ceo: 'ceo.png',
        team: 'team.png'
    };

    function addImages() {
        // 1. LOGO - Independent, floating above icon, no layout impact
        var brand = document.querySelector('.brand');
        if (brand && !brand.querySelector('.logo-float')) {
            // Position the brand relative for absolute positioning
            brand.style.cssText = 'position:relative;display:flex;align-items:center;gap:11px;';
            
            // Hide the old brand-mark icon
            var oldMark = brand.querySelector('.brand-mark');
            if (oldMark) {
                oldMark.style.cssText = 'display:flex;align-items:center;justify-content:center;width:44px;height:44px;overflow:hidden;background:transparent;box-shadow:none;border-radius:0;position:relative;';
            }
            
            // Create floating logo - positioned absolutely above the icon
            var floatWrap = document.createElement('div');
            floatWrap.className = 'logo-float';
            floatWrap.style.cssText = `
                position: absolute;
                top: 50%;
                left: 22px;
                transform: translate(-50%, -50%);
                z-index: 10;
                pointer-events: none;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 44px;
                height: 44px;
            `;
            
            var logoImg = document.createElement('img');
            logoImg.src = IMAGES.logo;
            logoImg.alt = 'FEL & Associates';
            logoImg.style.cssText = `
                width: 44px;
                height: 44px;
                object-fit: contain;
                display: block;
                filter: drop-shadow(0 2px 8px rgba(37,42,97,0.2));
            `;
            
            floatWrap.appendChild(logoImg);
            brand.appendChild(floatWrap);
            
            console.log('✅ Logo - independent, floating above icon');
        }

        // 2. CEO - Full portrait, no crop, no caption
        var aboutGrid = document.querySelector('.about-grid');
        if (aboutGrid && !aboutGrid.querySelector('.ceo-portrait')) {
            var seal = aboutGrid.querySelector('.seal-large');
            if (seal) {
                var portraitWrap = document.createElement('div');
                portraitWrap.className = 'ceo-portrait';
                portraitWrap.style.cssText = 'width:100%;max-width:420px;margin:0 auto;';
                
                var img = document.createElement('img');
                img.src = IMAGES.ceo;
                img.alt = 'Fel Mbaya';
                img.style.cssText = 'width:100%;height:auto;display:block;border-radius:12px;';
                portraitWrap.appendChild(img);
                
                seal.parentNode.replaceChild(portraitWrap, seal);
                console.log('✅ CEO full portrait');
            }
        }

        // 3. TEAM - Matching CEO portrait style
        var copy = document.querySelector('.about-copy');
        if (copy && !copy.querySelector('.team-portrait')) {
            var paras = copy.querySelectorAll('p');
            if (paras.length >= 2) {
                var teamWrap = document.createElement('div');
                teamWrap.className = 'team-portrait';
                teamWrap.style.cssText = 'margin:24px 0 20px 0;';
                
                var teamImg = document.createElement('img');
                teamImg.src = IMAGES.team;
                teamImg.alt = 'FEL & Associates Team';
                teamImg.style.cssText = 'width:100%;height:auto;display:block;border-radius:12px;';
                teamWrap.appendChild(teamImg);
                
                paras[1].parentNode.insertBefore(teamWrap, paras[1].nextSibling);
                console.log('✅ Team - matching portrait style');
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(addImages, 300);
        });
    } else {
        setTimeout(addImages, 300);
    }

})();