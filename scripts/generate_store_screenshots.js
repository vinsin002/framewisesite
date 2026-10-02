import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const OUT_DIR = path.resolve('chrome_store_screenshots');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

// Common styles & layout template
function wrapSlide({ tag, title, subtitle, contentHtml, accentColor = '#3b82f6' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1280px;
    height: 800px;
    overflow: hidden;
    background: #090d16;
    color: #f8fafc;
    font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 38px 48px 24px;
    user-select: none;
    -webkit-font-smoothing: antialiased;
  }

  /* Ambient background glows */
  .bg-glow-1 {
    position: absolute;
    top: -120px;
    left: 50%;
    transform: translateX(-50%);
    width: 820px;
    height: 380px;
    background: radial-gradient(ellipse at center, ${accentColor}33 0%, transparent 70%);
    filter: blur(60px);
    pointer-events: none;
    z-index: 0;
  }
  .bg-glow-2 {
    position: absolute;
    bottom: -100px;
    right: 10%;
    width: 600px;
    height: 300px;
    background: radial-gradient(ellipse at center, #6366f120 0%, transparent 70%);
    filter: blur(70px);
    pointer-events: none;
    z-index: 0;
  }
  .bg-grid {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
    z-index: 0;
  }

  /* Header */
  .header {
    text-align: center;
    z-index: 2;
    margin-bottom: 24px;
    max-width: 980px;
  }
  .badge-tag {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #93c5fd;
    margin-bottom: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }
  .badge-tag .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${accentColor};
    box-shadow: 0 0 8px ${accentColor};
  }
  .headline {
    font-size: 34px;
    line-height: 1.15;
    font-weight: 800;
    letter-spacing: -0.025em;
    background: linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .subheadline {
    font-size: 16px;
    line-height: 1.4;
    color: #94a3b8;
    margin-top: 6px;
    font-weight: 450;
  }
  .subheadline b {
    color: #f1f5f9;
    font-weight: 600;
  }

  /* Main mockup display container */
  .mockup-wrap {
    z-index: 2;
    width: 100%;
    max-width: 1184px;
    height: 570px;
    position: relative;
    border-radius: 16px;
    background: #0f172a;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 24px 60px -15px rgba(0, 0, 0, 0.7),
                0 0 0 1px rgba(255, 255, 255, 0.05);
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* Window topbar */
  .window-topbar {
    height: 38px;
    background: #151e33;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 8px;
  }
  .traffic-light {
    width: 11px;
    height: 11px;
    border-radius: 50%;
  }
  .tl-red { background: #ef4444; }
  .tl-yellow { background: #f59e0b; }
  .tl-green { background: #10b981; }
  .topbar-tab {
    margin-left: 12px;
    background: #0f172a;
    padding: 5px 16px;
    border-radius: 6px 6px 0 0;
    font-size: 12px;
    color: #cbd5e1;
    display: flex;
    align-items: center;
    gap: 8px;
    border-top: 2px solid ${accentColor};
  }
  .topbar-url {
    margin-left: auto;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 4px 14px;
    border-radius: 20px;
    font-size: 11px;
    color: #64748b;
    font-family: monospace;
    width: 320px;
    text-align: center;
  }

  /* Inner workspace */
  .workspace {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #0a0e17;
  }
</style>
</head>
<body>
  <div class="bg-glow-1"></div>
  <div class="bg-glow-2"></div>
  <div class="bg-grid"></div>

  <div class="header">
    <div class="badge-tag"><span class="dot"></span>${tag}</div>
    <h1 class="headline">${title}</h1>
    <p class="subheadline">${subtitle}</p>
  </div>

  <div class="mockup-wrap">
    ${contentHtml}
  </div>
</body>
</html>`;
}

// -------------------------------------------------------------
// SCREENSHOT 1: One-Key Slide Snapping on YouTube
// -------------------------------------------------------------
function getScreenshot1() {
  const content = `
    <div class="window-topbar">
      <div class="traffic-light tl-red"></div>
      <div class="traffic-light tl-yellow"></div>
      <div class="traffic-light tl-green"></div>
      <div class="topbar-tab">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#ef4444"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
        <span>Stanford CS229: Machine Learning — Lecture 03</span>
      </div>
      <div class="topbar-url">youtube.com/watch?v=jGwO_UgTS7I</div>
    </div>
    <div class="workspace" style="display: flex; flex-direction: column;">
      <!-- Main YouTube Video Area -->
      <div style="flex: 1; position: relative; background: #000; overflow: hidden; display: flex; align-items: center; justify-content: center;">
        
        <!-- Video Slide Content -->
        <div style="width: 86%; height: 86%; background: #1e293b; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); padding: 36px 48px; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid #334155; position: relative;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3b82f6; padding-bottom: 12px; margin-bottom: 24px;">
              <h2 style="font-size: 26px; color: #f8fafc; font-weight: 700;">Gradient Descent: Cost Function Optimization</h2>
              <span style="background: #3b82f620; color: #60a5fa; padding: 4px 10px; border-radius: 6px; font-size: 13px; font-weight: 600;">CS229 — Slide 14</span>
            </div>
            <p style="font-size: 16px; color: #94a3b8; margin-bottom: 20px;">Updating parameters in batch gradient descent to minimize empirical mean squared error:</p>
            
            <div style="background: #0f172a; padding: 20px 28px; border-radius: 10px; border-left: 4px solid #38bdf8; margin-bottom: 20px; font-family: 'SF Pro Display', serif;">
              <div style="font-size: 22px; color: #f1f5f9; font-style: italic; letter-spacing: 0.04em;">
                &theta;<sub>j</sub> := &theta;<sub>j</sub> &minus; &alpha; &middot; &part; / &part;&theta;<sub>j</sub> J(&theta;)
              </div>
              <div style="font-size: 15px; color: #64748b; margin-top: 8px; font-style: normal;">
                where &alpha; is the learning rate &middot; J(&theta;) = 1/(2m) &sum; (h<sub>&theta;</sub>(x<sup>(i)</sup>) &minus; y<sup>(i)</sup>)<sup>2</sup>
              </div>
            </div>

            <div style="display: flex; gap: 24px;">
              <div style="flex: 1; background: #0f172a80; padding: 14px 18px; border-radius: 8px; border: 1px solid #334155;">
                <span style="color: #38bdf8; font-weight: 600; font-size: 14px;">1. Convergence Guarantee</span>
                <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Guaranteed convex minimum when J(&theta;) is strictly quadratic.</p>
              </div>
              <div style="flex: 1; background: #0f172a80; padding: 14px 18px; border-radius: 8px; border: 1px solid #334155;">
                <span style="color: #10b981; font-weight: 600; font-size: 14px;">2. Vectorized NumPy Form</span>
                <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">&theta; = &theta; &minus; (&alpha;/m) &times; X<sup>T</sup> (X&theta; &minus; y)</p>
              </div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b;">
            <span>Stanford Engineering Online &copy; 2026</span>
            <span>Lecture 03 / Supervised Learning</span>
          </div>
        </div>

        <!-- Floating Framewise Success Toast -->
        <div style="position: absolute; top: 28px; right: 36px; background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(12px); border: 1px solid #38bdf8; border-radius: 12px; padding: 12px 20px; display: flex; align-items: center; gap: 14px; box-shadow: 0 16px 36px rgba(0,0,0,0.6); animation: pulse 2s infinite;">
          <div style="width: 36px; height: 36px; border-radius: 50%; background: #0284c7; display: flex; align-items: center; justify-content: center; color: white;">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
          </div>
          <div>
            <div style="font-size: 14px; font-weight: 700; color: #ffffff; display: flex; align-items: center; gap: 6px;">
              <span>Slide Captured at 14:28</span>
              <span style="background: #10b981; color: #fff; font-size: 10px; padding: 2px 6px; border-radius: 4px;">HD 1080p</span>
            </div>
            <div style="font-size: 12px; color: #94a3b8; margin-top: 2px;">Saved to CS229 Lecture Deck &middot; Press <b>S</b> anytime</div>
          </div>
        </div>

        <!-- Feature Spotlight Indicator Pointer -->
        <div style="position: absolute; bottom: 84px; right: 250px; display: flex; flex-direction: column; align-items: center; z-index: 10;">
          <div style="background: linear-gradient(135deg, #0284c7, #2563eb); color: #fff; padding: 8px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; box-shadow: 0 8px 24px rgba(37,99,235,0.5); display: flex; align-items: center; gap: 8px;">
            <span>📸 Framewise Quick-Snap Button</span>
            <span style="background: rgba(255,255,255,0.25); padding: 2px 8px; border-radius: 10px; font-size: 11px;">Press 'S'</span>
          </div>
          <div style="width: 2px; height: 18px; background: #38bdf8;"></div>
          <div style="width: 8px; height: 8px; border-radius: 50%; background: #38bdf8; box-shadow: 0 0 10px #38bdf8;"></div>
        </div>

      </div>

      <!-- YouTube Native Controls Bar with Framewise Button -->
      <div style="height: 52px; background: #0f0f0f; border-top: 1px solid #222; display: flex; align-items: center; padding: 0 20px; position: relative;">
        <!-- Red progress bar -->
        <div style="position: absolute; top: -3px; left: 0; right: 0; height: 3px; background: #444;">
          <div style="width: 32%; height: 100%; background: #ff0000; position: relative;">
            <div style="position: absolute; right: -5px; top: -4px; width: 11px; height: 11px; border-radius: 50%; background: #ff0000;"></div>
          </div>
        </div>

        <!-- Left controls -->
        <div style="display: flex; align-items: center; gap: 18px;">
          <!-- Play -->
          <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <!-- Next -->
          <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          <!-- Volume -->
          <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
          <!-- Time -->
          <span style="font-size: 13px; color: #ddd; font-family: sans-serif; font-weight: 500;">14:28 / 45:10</span>
        </div>

        <!-- Right controls with Framewise Camera icon -->
        <div style="margin-left: auto; display: flex; align-items: center; gap: 16px;">
          
          <!-- FRAMEWISE BUTTON HIGHLIGHTED -->
          <div style="background: rgba(14, 165, 233, 0.25); border: 1.5px solid #38bdf8; border-radius: 8px; padding: 6px 12px; display: flex; align-items: center; gap: 7px; color: #38bdf8; cursor: pointer; box-shadow: 0 0 16px rgba(56, 189, 248, 0.4);">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>
            <span style="font-size: 12px; font-weight: 700; color: #ffffff;">Snap</span>
          </div>

          <!-- YouTube CC -->
          <div style="border: 1px solid #777; border-radius: 3px; padding: 1px 5px; font-size: 11px; font-weight: bold; color: #aaa;">CC</div>
          <!-- Settings gear -->
          <svg width="18" height="18" fill="#aaa" viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg>
          <!-- Fullscreen -->
          <svg width="18" height="18" fill="#aaa" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>
        </div>
      </div>
    </div>
  `;

  return wrapSlide({
    tag: '⚡ 1-CLICK INSTANT CAPTURE',
    title: 'Snap Lecture Slides Without Leaving YouTube',
    subtitle: 'Press <b>S</b> on your keyboard or click the integrated camera button. High resolution, zero UI clutter.',
    accentColor: '#38bdf8',
    contentHtml: content
  });
}

// -------------------------------------------------------------
// SCREENSHOT 2: Popup Deck & Click-to-Seek
// -------------------------------------------------------------
function getScreenshot2() {
  const content = `
    <div class="window-topbar">
      <div class="traffic-light tl-red"></div>
      <div class="traffic-light tl-yellow"></div>
      <div class="traffic-light tl-green"></div>
      <div class="topbar-tab">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#3b82f6"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        <span>YouTube + Framewise Companion Popup</span>
      </div>
      <div class="topbar-url">chrome-extension://framewise/popup.html</div>
    </div>
    <div class="workspace" style="display: flex; padding: 24px 32px; gap: 24px; align-items: center; justify-content: center; background: #0c1220;">
      
      <!-- YouTube Video background (dimmed) -->
      <div style="flex: 1.1; height: 100%; background: #162032; border-radius: 12px; border: 1px solid #1e293b; padding: 24px; display: flex; flex-direction: column; justify-content: space-between; position: relative;">
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 14px;">
          <div>
            <span style="font-size: 11px; font-weight: 700; color: #ef4444; text-transform: uppercase;">Active Video Playing</span>
            <h3 style="font-size: 18px; color: #f8fafc; margin-top: 4px;">MIT 6.006: Introduction to Algorithms</h3>
          </div>
          <span style="background: #1e293b; color: #94a3b8; font-size: 12px; padding: 4px 10px; border-radius: 6px;">⏱ 21:05</span>
        </div>
        <div style="flex: 1; margin: 18px 0; background: #0b1120; border-radius: 8px; border: 1px solid #1e293b; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 24px;">
          <div style="width: 280px; height: 120px; background: #1e293b; border-radius: 8px; border: 1px solid #334155; padding: 12px; display: flex; flex-direction: column; justify-content: space-between; margin-bottom: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.4);">
            <div style="font-size: 11px; color: #38bdf8; font-weight: 700;">DIVIDE & CONQUER TREE &middot; DEPTH log n</div>
            <div style="display: flex; justify-content: center; gap: 16px; margin: 6px 0;">
              <div style="width: 48px; height: 26px; background: #2563eb30; border: 1px solid #3b82f6; border-radius: 4px; font-size: 10px; display: flex; align-items: center; justify-content: center; color: #93c5fd;">T(n/2)</div>
              <div style="width: 48px; height: 26px; background: #2563eb30; border: 1px solid #3b82f6; border-radius: 4px; font-size: 10px; display: flex; align-items: center; justify-content: center; color: #93c5fd;">T(n/2)</div>
            </div>
            <div style="font-size: 10px; color: #64748b; text-align: center;">Per level work: cn &rarr; Total complexity: &Theta;(n log n)</div>
          </div>
          <div style="display: flex; gap: 12px;">
            <div style="padding: 6px 14px; background: rgba(59,130,246,0.15); border: 1px solid #3b82f6; border-radius: 20px; font-size: 12px; color: #60a5fa;">
              Seeked to 21:05 via Framewise Popup ⚡
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 12px; color: #64748b;">
          <span>Video Tab Synchronized</span>
          <span>16:9 Widescreen Stream</span>
        </div>
      </div>

      <!-- Framewise Companion Popup (Floating Highlight) -->
      <div style="width: 440px; height: 100%; background: #0f172a; border-radius: 14px; border: 1px solid #3b82f660; box-shadow: 0 20px 40px rgba(0,0,0,0.8), 0 0 24px rgba(59,130,246,0.25); display: flex; flex-direction: column; overflow: hidden;">
        
        <!-- Popup Header -->
        <div style="padding: 16px 20px; background: #172554; border-bottom: 1px solid rgba(59,130,246,0.3); display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="width: 28px; height: 28px; border-radius: 6px; background: #2563eb; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 14px;">F</div>
            <div>
              <h4 style="font-size: 14px; font-weight: 700; color: #fff;">Framewise Deck</h4>
              <span style="font-size: 11px; color: #93c5fd;">6 Slides Captured in This Session</span>
            </div>
          </div>
          <button style="background: #2563eb; color: #fff; border: none; padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; display: flex; align-items: center; gap: 5px; cursor: pointer;">
            <span>Review in Studio</span>
            <span>&rarr;</span>
          </button>
        </div>

        <!-- Popup Slide Grid / List -->
        <div style="flex: 1; padding: 14px 16px; overflow-y: hidden; display: flex; flex-direction: column; gap: 10px;">
          
          <!-- Slide Card 1 (Hovered / Clicked to seek) -->
          <div style="background: #1e293b; border: 1.5px solid #38bdf8; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 12px; position: relative;">
            <div style="width: 90px; height: 50px; background: #0b1329; border-radius: 4px; border: 1px solid #334155; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #94a3b8; font-weight: 600;">
              Slide #3
            </div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="background: #0284c7; color: #fff; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">⏱ 21:05</span>
                <span style="font-size: 11px; color: #38bdf8; font-weight: 600;">Jumping video...</span>
              </div>
              <h5 style="font-size: 12px; color: #f8fafc; font-weight: 600; margin-top: 4px;">Divide & Conquer Recurrence</h5>
            </div>
            <div style="color: #64748b; font-size: 16px;">&times;</div>
          </div>

          <!-- Slide Card 2 -->
          <div style="background: #131d2e; border: 1px solid #1e293b; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 12px;">
            <div style="width: 90px; height: 50px; background: #0b1329; border-radius: 4px; border: 1px solid #334155; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #94a3b8; font-weight: 600;">
              Slide #2
            </div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="background: #1e293b; color: #94a3b8; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">⏱ 12:40</span>
              </div>
              <h5 style="font-size: 12px; color: #cbd5e1; font-weight: 500; margin-top: 4px;">Master Theorem Cases 1-3</h5>
            </div>
            <div style="color: #475569; font-size: 16px;">&times;</div>
          </div>

          <!-- Slide Card 3 -->
          <div style="background: #131d2e; border: 1px solid #1e293b; border-radius: 8px; padding: 10px 12px; display: flex; align-items: center; gap: 12px;">
            <div style="width: 90px; height: 50px; background: #0b1329; border-radius: 4px; border: 1px solid #334155; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #94a3b8; font-weight: 600;">
              Slide #1
            </div>
            <div style="flex: 1;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="background: #1e293b; color: #94a3b8; font-size: 10px; font-weight: 700; padding: 2px 6px; border-radius: 4px;">⏱ 04:15</span>
              </div>
              <h5 style="font-size: 12px; color: #cbd5e1; font-weight: 500; margin-top: 4px;">Asymptotic Complexity Bounds</h5>
            </div>
            <div style="color: #475569; font-size: 16px;">&times;</div>
          </div>

        </div>

        <!-- Popup Footer Actions -->
        <div style="padding: 12px 16px; background: #0a0f1d; border-top: 1px solid #1e293b; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 11px; color: #64748b;">Click any slide to seek active tab</span>
          <span style="font-size: 11px; color: #ef4444; font-weight: 600; cursor: pointer;">Clear All</span>
        </div>

      </div>

    </div>
  `;

  return wrapSlide({
    tag: '🔍 REAL-TIME THUMBNAIL STREAM & SEEK',
    title: 'Review Slides & Jump Video to Exact Timestamps',
    subtitle: 'Inspect every captured frame in the companion popup or side panel. Click any slide to seek playback.',
    accentColor: '#60a5fa',
    contentHtml: content
  });
}

// -------------------------------------------------------------
// SCREENSHOT 3: Framewise Studio Annotation Suite
// -------------------------------------------------------------
function getScreenshot3() {
  const content = `
    <div class="window-topbar">
      <div class="traffic-light tl-red"></div>
      <div class="traffic-light tl-yellow"></div>
      <div class="traffic-light tl-green"></div>
      <div class="topbar-tab">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#a855f7"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
        <span>Framewise Studio — Annotations & Deck Editor</span>
      </div>
      <div class="topbar-url">framewise://studio/deck/cs189-spring2026</div>
    </div>
    <div class="workspace" style="display: flex; flex-direction: column;">
      
      <!-- Studio Top Toolbar -->
      <div style="height: 52px; background: #111827; border-bottom: 1px solid #1f2937; display: flex; align-items: center; padding: 0 20px; gap: 14px;">
        <div style="display: flex; background: #1f2937; padding: 3px; border-radius: 8px; gap: 4px;">
          <!-- Select -->
          <div style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #9ca3af;">Select</div>
          <!-- Pen -->
          <div style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #9ca3af;">✏️ Pen</div>
          <!-- Highlighter (ACTIVE) -->
          <div style="padding: 6px 14px; background: #a855f7; border-radius: 6px; font-size: 12px; font-weight: 700; color: #ffffff; box-shadow: 0 0 12px rgba(168,85,247,0.5);">🖍️ Highlighter</div>
          <!-- Text -->
          <div style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #9ca3af;">T Text</div>
          <!-- Arrow -->
          <div style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #9ca3af;">&rarr; Arrow</div>
          <!-- Shapes -->
          <div style="padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; color: #9ca3af;">&square; Box</div>
        </div>

        <div style="height: 24px; width: 1px; background: #374151;"></div>

        <!-- Color Swatches -->
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #facc15; box-shadow: 0 0 0 2px #fff;"></div>
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #38bdf8;"></div>
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #4ade80;"></div>
          <div style="width: 20px; height: 20px; border-radius: 50%; background: #f43f5e;"></div>
        </div>

        <!-- Right Studio Actions -->
        <div style="margin-left: auto; display: flex; align-items: center; gap: 12px;">
          <button style="background: #1f2937; border: 1px solid #374151; color: #e5e7eb; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;">+ Add Blank Slide</button>
          <button style="background: #1f2937; border: 1px solid #374151; color: #e5e7eb; padding: 6px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;">Sort by time</button>
          <button style="background: #a855f7; border: none; color: #fff; padding: 6px 16px; border-radius: 6px; font-size: 12px; font-weight: 700; box-shadow: 0 4px 12px rgba(168,85,247,0.3);">Export PDF &rarr;</button>
        </div>
      </div>

      <!-- Studio Canvas Area -->
      <div style="flex: 1; display: flex; padding: 20px 24px; gap: 20px; background: #0b0f19;">
        
        <!-- Left Slide Filmstrip -->
        <div style="width: 170px; display: flex; flex-direction: column; gap: 12px;">
          <div style="font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase;">Slides (4/18)</div>
          
          <div style="background: #1e1b4b; border: 2px solid #a855f7; border-radius: 8px; padding: 6px; position: relative;">
            <div style="width: 100%; height: 74px; background: #1e293b; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #c4b5fd;">
              Current Slide
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #a855f7; margin-top: 4px; font-weight: 700;">
              <span>#1 Active</span>
              <span>18:42</span>
            </div>
          </div>

          <div style="background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 6px;">
            <div style="width: 100%; height: 74px; background: #1e293b; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #9ca3af;">
              Blank Card
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #6b7280; margin-top: 4px;">
              <span>#2 Note</span>
              <span>Text</span>
            </div>
          </div>

          <div style="background: #111827; border: 1px solid #1f2937; border-radius: 8px; padding: 6px;">
            <div style="width: 100%; height: 74px; background: #1e293b; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 10px; color: #9ca3af;">
              Slide 3
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; color: #6b7280; margin-top: 4px;">
              <span>#3 Slide</span>
              <span>24:10</span>
            </div>
          </div>
        </div>

        <!-- Main Editable Slide Canvas -->
        <div style="flex: 1; background: #1e293b; border-radius: 12px; border: 1px solid #334155; box-shadow: 0 10px 25px rgba(0,0,0,0.5); padding: 32px 42px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
          
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #a855f7; padding-bottom: 12px; margin-bottom: 24px;">
              <h2 style="font-size: 24px; color: #f8fafc; font-weight: 700;">Dijkstra&rsquo;s Shortest Path Algorithm: Priority Queue Analysis</h2>
              <span style="background: #a855f720; color: #d8b4fe; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 700;">⏱ 18:42</span>
            </div>

            <!-- Annotated Section with simulated highlighter -->
            <div style="position: relative; margin-bottom: 24px; max-width: 600px;">
              <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
                For any weighted directed graph G = (V, E) with non-negative edge weights w(u, v) &ge; 0:
              </p>
              
              <div style="margin-top: 14px; position: relative; display: inline-block;">
                <!-- Glowing yellow highlight box overlay -->
                <div style="position: absolute; inset: -4px -8px; background: rgba(250, 204, 21, 0.35); border: 1px dashed #facc15; border-radius: 6px; transform: rotate(-0.5deg);"></div>
                <div style="position: relative; font-size: 19px; font-weight: 700; color: #fef08a; font-family: monospace;">
                  Overall Complexity: O((|V| + |E|) &middot; log |V|)
                </div>
              </div>

              <!-- Vector arrow annotation below equation -->
              <div style="margin-top: 14px; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 16px; color: #f43f5e; font-weight: bold;">&uarr;</span>
                <span style="font-size: 11px; background: #f43f5e20; border: 1px solid #f43f5e; color: #fda4af; padding: 2px 8px; border-radius: 4px; font-weight: 600;">Min-Heap Priority Queue Optimization</span>
              </div>
            </div>

            <!-- Hand-drawn style sticky callout annotation -->
            <div style="position: absolute; right: 30px; top: 90px; width: 220px; background: #fef9c3; color: #713f12; padding: 14px 16px; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.4); transform: rotate(1.5deg); border-left: 5px solid #eab308;">
              <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #a16207; margin-bottom: 4px;">📌 Exam Callout Note</div>
              <p style="font-size: 12px; font-weight: 600; line-height: 1.4;">Always state that non-negative weights are required! Otherwise use Bellman-Ford.</p>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #64748b; border-top: 1px solid #334155; padding-top: 12px;">
            <span>Canvas Objects: 1 Highlighter &middot; 1 Sticky Note &middot; 1 Vector Arrow</span>
            <span style="color: #a855f7; font-weight: 600;">100% Vector Canvas &middot; Lossless Annotations</span>
          </div>

        </div>

      </div>

    </div>
  `;

  return wrapSlide({
    tag: '🎨 POWERFUL ANNOTATION STUDIO',
    title: 'Annotate Slides, Highlight Formulas & Add Callouts',
    subtitle: 'Highlight essential proofs, circle diagrams, insert sticky notes, and reorder your slides with drag & drop.',
    accentColor: '#a855f7',
    contentHtml: content
  });
}

// -------------------------------------------------------------
// SCREENSHOT 4: Blank Paper Slides & Template Customizer
// -------------------------------------------------------------
function getScreenshot4() {
  const content = `
    <div class="window-topbar">
      <div class="traffic-light tl-red"></div>
      <div class="traffic-light tl-yellow"></div>
      <div class="traffic-light tl-green"></div>
      <div class="topbar-tab">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#10b981"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
        <span>Framewise Paper Style Studio</span>
      </div>
      <div class="topbar-url">framewise://studio/templates</div>
    </div>
    <div class="workspace" style="display: flex; flex-direction: column; padding: 24px 32px; background: #0a0f1d;">
      
      <!-- Template Selector Ribbon -->
      <div style="background: #111827; border: 1px solid #1f2937; border-radius: 12px; padding: 14px 20px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
        <div>
          <h4 style="font-size: 15px; color: #f3f4f6; font-weight: 700;">Choose Your Blank Slide Paper Style</h4>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 2px;">Insert custom note cards, cheat sheets, or chapter dividers anywhere in your deck.</p>
        </div>
        <div style="display: flex; gap: 8px;">
          <div style="padding: 6px 12px; background: #10b98120; border: 1.5px solid #10b981; border-radius: 8px; font-size: 12px; font-weight: 700; color: #34d399; display: flex; align-items: center; gap: 6px;">
            <span>📐 Blueprint Grid</span>
          </div>
          <div style="padding: 6px 12px; background: #1f2937; border: 1px solid #374151; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1;">
            <span>📓 Blackboard</span>
          </div>
          <div style="padding: 6px 12px; background: #1f2937; border: 1px solid #374151; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1;">
            <span>📄 Warm Paper</span>
          </div>
          <div style="padding: 6px 12px; background: #1f2937; border: 1px solid #374151; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1;">
            <span>📝 Yellow Pad</span>
          </div>
          <div style="padding: 6px 12px; background: #1f2937; border: 1px solid #374151; border-radius: 8px; font-size: 12px; font-weight: 600; color: #cbd5e1;">
            <span>🌸 Soft Rose</span>
          </div>
        </div>
      </div>

      <!-- Side-by-Side Paper Slide Previews -->
      <div style="flex: 1; display: flex; gap: 20px;">
        
        <!-- Blueprint Grid Slide -->
        <div style="flex: 1; background: #0c4a6e; border-radius: 12px; border: 2px solid #38bdf8; box-shadow: 0 12px 30px rgba(12,74,110,0.5); padding: 24px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;
          background-image: linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px); background-size: 24px 24px;">
          
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #38bdf8; padding-bottom: 8px; margin-bottom: 16px;">
              <span style="font-size: 18px; font-weight: 800; color: #e0f2fe; letter-spacing: 0.05em; text-transform: uppercase;">📐 Engineering Blueprint Note</span>
              <span style="background: #38bdf825; color: #7dd3fc; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 700;">Custom Card #1</span>
            </div>
            
            <div style="font-family: monospace; color: #bae6fd; font-size: 14px; line-height: 1.6;">
              <div style="font-weight: 700; color: #ffffff; margin-bottom: 6px;">&bull; Derivation Summary:</div>
              <div>&bull; Boundary condition: &part;V/&part;t + 1/2 &sigma;&sup2;S&sup2; (&part;&sup2;V/&part;S&sup2;) + rS(&part;V/&part;S) - rV = 0</div>
              <div>&bull; Black-Scholes PDE closed-form solution:</div>
              <div style="margin: 8px 0; padding: 8px 14px; background: rgba(0,0,0,0.3); border-radius: 6px; border: 1px solid #38bdf860;">
                C(S, t) = N(d<sub>1</sub>)S &minus; N(d<sub>2</sub>) K e<sup>&minus;r(T &minus; t)</sup>
              </div>
              <div style="color: #7dd3fc;">&check; Calibrated against market implied volatility surface</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #7dd3fc; border-top: 1px solid #0284c7; padding-top: 8px;">
            <span>Style: Engineering Blueprint Grid</span>
            <span>16:9 Landscape Ratio</span>
          </div>
        </div>

        <!-- Blackboard Chalkboard Slide -->
        <div style="flex: 1; background: #18181b; border-radius: 12px; border: 2px solid #52525b; box-shadow: 0 12px 30px rgba(0,0,0,0.6); padding: 24px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: space-between;">
          
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #a1a1aa; padding-bottom: 8px; margin-bottom: 16px;">
              <span style="font-size: 18px; font-weight: 800; color: #fafafa; letter-spacing: 0.05em; text-transform: uppercase;">📓 Blackboard Chalk Card</span>
              <span style="background: #3f3f46; color: #d4d4d8; font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 700;">Custom Card #2</span>
            </div>
            
            <div style="font-family: 'SF Pro Display', serif; color: #e4e4e7; font-size: 15px; line-height: 1.6;">
              <div style="font-size: 17px; font-weight: 700; color: #fef08a; font-family: sans-serif;">Key Concepts to Memorize for Exam:</div>
              <div style="margin-top: 8px;">1. Spectral Graph Partitioning via Fiedler vector</div>
              <div>2. Normalized Laplacian L<sub>sym</sub> = D<sup>&minus;1/2</sup> L D<sup>&minus;1/2</sup></div>
              <div style="margin: 8px 0; padding: 8px 14px; background: rgba(255,255,255,0.05); border-radius: 6px; border: 1px dashed #71717a; font-family: monospace;">
                &lambda;<sub>2</sub> &le; 2 &middot; h(G) &le; &radic;(2 &middot; &Delta; &middot; &lambda;<sub>2</sub>) [Cheeger's Inequality]
              </div>
              <div style="color: #a1a1aa; font-style: italic;">Professor emphasized this in 2026 review session!</div>
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #71717a; border-top: 1px solid #27272a; padding-top: 8px;">
            <span>Style: Dark Chalkboard</span>
            <span>Seamlessly Merged into Export PDF</span>
          </div>
        </div>

      </div>

    </div>
  `;

  return wrapSlide({
    tag: '📝 EXPAND YOUR LECTURE NOTES',
    title: 'Insert Custom Blank Slides & Paper Styles',
    subtitle: 'Add custom note cards anywhere in your deck: Blueprint Grid, Blackboard, Warm Paper, or Yellow Pad.',
    accentColor: '#10b981',
    contentHtml: content
  });
}

// -------------------------------------------------------------
// SCREENSHOT 5: 16:9 Landscape PDF Export with Layouts
// -------------------------------------------------------------
function getScreenshot5() {
  const content = `
    <div class="window-topbar">
      <div class="traffic-light tl-red"></div>
      <div class="traffic-light tl-yellow"></div>
      <div class="traffic-light tl-green"></div>
      <div class="topbar-tab">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H8V4h12v12zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6z"/></svg>
        <span>Framewise PDF Export & Live Preview</span>
      </div>
      <div class="topbar-url">framewise://export/preview.pdf</div>
    </div>
    <div class="workspace" style="display: flex; padding: 20px 24px; gap: 24px; background: #0c111d;">
      
      <!-- Left: Export Layout Selector Controls -->
      <div style="width: 380px; display: flex; flex-direction: column; gap: 14px;">
        <div>
          <span style="font-size: 11px; font-weight: 700; color: #f59e0b; text-transform: uppercase;">Export Settings</span>
          <h3 style="font-size: 18px; color: #f9fafb; font-weight: 700; margin-top: 2px;">Select PDF Layout</h3>
          <p style="font-size: 12px; color: #9ca3af; margin-top: 2px;">Optimized for widescreen reading on iPad, Android & printouts.</p>
        </div>

        <!-- Layout 1: Full Page (Selected) -->
        <div style="background: #1e1b4b; border: 2px solid #6366f1; border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; box-shadow: 0 4px 14px rgba(99,102,241,0.25);">
          <div style="font-size: 26px;">🖼️</div>
          <div style="flex: 1;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <h4 style="font-size: 13px; font-weight: 700; color: #ffffff;">Full Page (16:9 Widescreen)</h4>
              <span style="background: #6366f1; color: #fff; font-size: 9px; padding: 2px 6px; border-radius: 4px; font-weight: 700;">ACTIVE</span>
            </div>
            <p style="font-size: 11px; color: #c7d2fe; margin-top: 2px;">Full-bleed slide per page. Ideal for tablets, GoodNotes & Notion.</p>
          </div>
        </div>

        <!-- Layout 2: Slide + Notes -->
        <div style="background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 26px;">📑</div>
          <div style="flex: 1;">
            <h4 style="font-size: 13px; font-weight: 600; color: #e5e7eb;">Slide + Notes Side-by-Side</h4>
            <p style="font-size: 11px; color: #9ca3af; margin-top: 2px;">Slide on left, lined study note rules on right for handwritten notes.</p>
          </div>
        </div>

        <!-- Layout 3: 4 in 1 Cheat Sheet -->
        <div style="background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 12px 14px; display: flex; align-items: center; gap: 12px;">
          <div style="font-size: 26px;">📊</div>
          <div style="flex: 1;">
            <h4 style="font-size: 13px; font-weight: 600; color: #e5e7eb;">4-in-1 Compact Cheat Sheet</h4>
            <p style="font-size: 11px; color: #9ca3af; margin-top: 2px;">4 slides per page for high-density fast exam revision.</p>
          </div>
        </div>

        <!-- Primary Action Download Button -->
        <div style="margin-top: auto; background: #111827; border: 1px solid #1f2937; border-radius: 10px; padding: 14px;">
          <button style="width: 100%; background: linear-gradient(135deg, #f59e0b, #d97706); border: none; padding: 12px; border-radius: 8px; color: #fff; font-size: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 16px rgba(245,158,11,0.4);">
            <span>Download 16:9 PDF Booklet</span>
            <span>&darr;</span>
          </button>
          <div style="display: flex; justify-content: space-between; font-size: 11px; color: #9ca3af; margin-top: 10px;">
            <span>✓ 18 Pages Compiled</span>
            <span>✓ 100% Client-Side PDF</span>
          </div>
        </div>
      </div>

      <!-- Right: Live PDF Preview Canvas -->
      <div style="flex: 1; background: #1f2937; border-radius: 12px; border: 1px solid #374151; box-shadow: inset 0 2px 10px rgba(0,0,0,0.5); padding: 18px; display: flex; flex-direction: column;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span style="font-size: 12px; font-weight: 600; color: #e5e7eb;">Interactive PDF Preview &middot; Page 1 of 18</span>
          <div style="display: flex; gap: 6px;">
            <span style="padding: 2px 8px; background: #374151; border-radius: 4px; font-size: 11px; color: #cbd5e1;">&larr; Prev</span>
            <span style="padding: 2px 8px; background: #374151; border-radius: 4px; font-size: 11px; color: #cbd5e1;">Next &rarr;</span>
          </div>
        </div>

        <!-- Rendered Landscape 16:9 PDF Page Sample -->
        <div style="flex: 1; background: #0f172a; border-radius: 8px; border: 2px solid #4b5563; box-shadow: 0 8px 24px rgba(0,0,0,0.7); padding: 24px 32px; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 16px;">
              <span style="font-size: 14px; font-weight: 700; color: #f1f5f9;">CS229 &middot; Supervised Learning Lecture Deck</span>
              <span style="font-size: 12px; color: #38bdf8; font-weight: 600;">Framewise HD Capture</span>
            </div>
            <h3 style="font-size: 20px; color: #ffffff; font-weight: 800;">Support Vector Machines: Maximum Margin Classifier</h3>
            <div style="margin-top: 14px; background: #1e293b; padding: 14px 18px; border-radius: 8px; border-left: 4px solid #f59e0b; font-family: monospace; font-size: 13px; color: #fef3c7;">
              min<sub>w, b</sub> 1/2 ||w||<sup>2</sup> &emsp; s.t. &emsp; y<sup>(i)</sup> (w<sup>T</sup> x<sup>(i)</sup> + b) &ge; 1, &forall;i
            </div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 12px;">The optimal separating hyperplane maximizes geometric margin &gamma; = 1 / ||w||.</p>
          </div>

          <div style="display: flex; justify-content: space-between; font-size: 10px; color: #64748b; border-top: 1px solid #1e293b; padding-top: 8px;">
            <span>Exported via Framewise Chrome Extension</span>
            <span>Timestamp 32:15 &middot; Page 1/18</span>
          </div>
        </div>
      </div>

    </div>
  `;

  return wrapSlide({
    tag: '📄 PUBLICATION-GRADE PDF EXPORT',
    title: 'Export 16:9 Landscape PDF Study Booklets',
    subtitle: 'Widescreen booklets built for tablets, iPad, and Notion. Choose Full Page, Slide + Notes, or 4-in-1 layouts.',
    accentColor: '#f59e0b',
    contentHtml: content
  });
}

// Generate all 5 HTML files and render them
const slides = [
  { name: 'screenshot-1-capture', html: getScreenshot1() },
  { name: 'screenshot-2-seek', html: getScreenshot2() },
  { name: 'screenshot-3-studio', html: getScreenshot3() },
  { name: 'screenshot-4-templates', html: getScreenshot4() },
  { name: 'screenshot-5-export', html: getScreenshot5() },
];

console.log('Generating HTML files and capturing 1280x800 screenshots...');

for (let i = 0; i < slides.length; i++) {
  const slide = slides[i];
  const htmlPath = path.join(OUT_DIR, `${slide.name}.html`);
  const pngPath = path.join(OUT_DIR, `${slide.name}.png`);
  const jpgPath = path.join(OUT_DIR, `${slide.name}.jpg`);

  fs.writeFileSync(htmlPath, slide.html, 'utf-8');
  console.log(`[${i + 1}/5] Rendered ${htmlPath}`);

  // Capture with Chrome Headless
  const cmd = `"${CHROME_PATH}" --headless --disable-gpu --window-size=1280,800 --screenshot="${pngPath}" "file://${htmlPath}"`;
  execSync(cmd, { stdio: 'pipe' });

  // Use sips to verify and create JPG and strip any alpha if present
  execSync(`sips -s format png "${pngPath}" --out "${pngPath}"`, { stdio: 'pipe' });
  execSync(`sips -s format jpeg -s formatOptions 95 "${pngPath}" --out "${jpgPath}"`, { stdio: 'pipe' });

  // Inspect dimensions & alpha
  const probe = execSync(`sips -g pixelWidth -g pixelHeight -g hasAlpha "${pngPath}"`).toString();
  console.log(`[${i + 1}/5] Completed: ${slide.name}\n${probe.trim()}`);
}

console.log('All 5 screenshots generated successfully in chrome_store_screenshots/!');
