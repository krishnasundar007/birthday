/* =========================================================
   RAKSHI BIRTHDAY EXPERIENCE — PERSONALIZATION CONFIG
   Change only this section to personalize the experience.
   ========================================================= */
const birthdayConfig = {
  name: "Rakshi",

  birthdayMessage:
    "Some people make life louder. Some make it brighter. And then there are people who simply make ordinary days feel a little more worth remembering. You are one of those people. I hope this birthday reminds you of how deeply you are appreciated, how many good moments are still waiting for you, and how much happiness you deserve.",

  birthdayDate: "", // Optional: "2026-08-25". Leave empty to show "A day worth celebrating".

  qualities: [
    { icon: "✦", title: "Your Smile", text: "Somehow it makes ordinary moments feel a little better." },
    { icon: "◌", title: "Your Energy", text: "You bring a certain kind of life into every room you enter." },
    { icon: "♡", title: "Your Kindness", text: "Small things you probably don't even realize can mean a lot." },
    { icon: "∞", title: "Your Friendship", text: "Some people simply become important before we notice when it happened." }
  ],

  memories: [
    { image: "assets/images/memory1.jpg", title: "That Moment", caption: "A little moment worth keeping.", date: "Memory I" },
    { image: "assets/images/memory2.jpg", title: "The Good Days", caption: "The kind of day you wish you could replay.", date: "Memory II" },
    { image: "assets/images/memory3.jpg", title: "A Favorite", caption: "Some memories don't need much explanation.", date: "Memory III" },
    { image: "assets/images/memory4.jpg", title: "Just Us", caption: "One for the memory book.", date: "Memory IV" },
    { image: "assets/images/memory5.jpg", title: "Keep This One", caption: "Because the little things become the big things.", date: "Memory V" }
  ],

  memoryCards: [
    { label: "A memory", title: "Open this one", text: "Some moments are small when they happen and somehow enormous when you look back." },
    { label: "Something I appreciate", title: "Open this one", text: "Thank you for being exactly the kind of person whose presence makes a difference." },
    { label: "A wish for the future", title: "Open this one", text: "May the next chapter surprise you in all the best ways." },
    { label: "A secret compliment", title: "Open this one", text: "You are probably more special to the people around you than you realize." },
    { label: "A funny little thought", title: "Open this one", text: "Official birthday rule: today, you are allowed to be ridiculously happy." },
    { label: "One final surprise", title: "Open this one", text: "Keep this page. Come back to it on a difficult day and remember that someone was glad you existed." }
  ],

  finalLetter:
    "Dear Rakshi,\\n\\nIf this little website could say one thing perfectly, I think it would simply be this: I hope life is kind to you. I hope you get the opportunities you quietly wish for, the people who make you laugh until your stomach hurts, the adventures you will talk about years from now, and the peaceful days you never knew you needed.\\n\\nKeep being you. Keep growing, laughing, dreaming and making memories. And whenever another birthday comes around, I hope you can look back and realize just how much beautiful life you have collected along the way.\\n\\nHappy Birthday. You deserve a beautiful year.",

  music: "assets/music/birthday-song.mp3"
};
/* ========================================================= */

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  createStars(95);
  setupLoader();
  setupExperience();
  setupReveal();
  setupCursor();
  setupNavigation();
  setupMusic();
  setupCandle();
  setupCards();
  setupSurprise();
  setupEasterEggs();
});

function applyConfig() {
  $("#loaderName").textContent = birthdayConfig.name;
  $$(".opening-name").forEach(el => el.innerHTML = `${escapeHTML(birthdayConfig.name)}<span>...</span>`);
  document.title = `For ${birthdayConfig.name} — A Birthday Story`;

  typeText($("#birthdayMessage"), birthdayConfig.birthdayMessage);

  $("#qualityGrid").innerHTML = birthdayConfig.qualities.map(q => `
    <article class="quality-card reveal-on-scroll">
      <div class="quality-icon">${escapeHTML(q.icon)}</div>
      <h3>${escapeHTML(q.title)}</h3>
      <p>${escapeHTML(q.text)}</p>
    </article>
  `).join("");

  $("#memoryGallery").innerHTML = birthdayConfig.memories.map((m, i) => `
    <article class="memory-item reveal-on-scroll">
      <img src="${escapeAttr(m.image)}" alt="${escapeAttr(m.title)}" loading="lazy"
           onerror="this.style.display='none'; this.nextElementSibling.style.display='grid';">
      <div class="memory-placeholder" style="display:none">
        <div><strong>${escapeHTML(m.title)}</strong><br><small>Add ${escapeHTML(m.image)}</small></div>
      </div>
      <div class="memory-overlay">
        <span>${escapeHTML(m.date || `Memory ${i+1}`)}</span>
        <h3>${escapeHTML(m.title)}</h3>
        <small>${escapeHTML(m.caption)}</small>
      </div>
    </article>
  `).join("");

  $("#memoryCards").innerHTML = birthdayConfig.memoryCards.map(card => `
    <article class="secret-card reveal-on-scroll" tabindex="0" role="button" aria-label="Open ${escapeAttr(card.label)}">
      <div class="secret-card-inner">
        <div class="card-face card-front">
          <span class="card-label">${escapeHTML(card.label)}</span>
          <h3>${escapeHTML(card.title)}</h3>
          <span class="card-open">Click to open · ↻</span>
        </div>
        <div class="card-face card-back">
          <span class="card-label">${escapeHTML(card.label)}</span>
          <p>${escapeHTML(card.text)}</p>
        </div>
      </div>
    </article>
  `).join("");

  $("#finalLetter").textContent = birthdayConfig.finalLetter;
  if (birthdayConfig.birthdayDate) {
    const date = new Date(`${birthdayConfig.birthdayDate}T00:00:00`);
    if (!Number.isNaN(date.getTime())) {
      $("#birthdayDate").textContent = date.toLocaleDateString(undefined, {
        weekday:"long", month:"long", day:"numeric", year:"numeric"
      });
    }
  }
  $("#birthdayMusic").src = birthdayConfig.music;
}

function setupLoader() {
  document.body.classList.add("locked");
  setTimeout(() => {
    $("#loader").classList.add("hidden");
    document.body.classList.remove("locked");
  }, 1900);
}

function setupExperience() {
  $("#enterBtn").addEventListener("click", () => {
    $(".experience").classList.add("entered");
    document.body.classList.remove("locked");
    $("#home").scrollIntoView({ behavior:"smooth" });
    startMusic();
    createConfetti(28);
    toast(`Welcome to your birthday story, ${birthdayConfig.name}.`);
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  }, { threshold:.12, rootMargin:"0px 0px -40px 0px" });
  $$(".reveal-on-scroll").forEach(el => observer.observe(el));
}

function typeText(el, text) {
  el.textContent = "";
  let i = 0;
  let started = false;
  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || started) return;
    started = true;
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, text[i-1] === "." ? 90 : 25);
      }
    };
    tick();
    observer.disconnect();
  }, { threshold:.4 });
  observer.observe(el);
}

function createStars(count) {
  const container = $("#stars");
  const frag = document.createDocumentFragment();
  for (let i=0;i<count;i++) {
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${Math.random()*100}%`;
    star.style.top = `${Math.random()*100}%`;
    star.style.animationDelay = `${Math.random()*5}s`;
    star.style.animationDuration = `${3 + Math.random()*5}s`;
    frag.appendChild(star);
  }
  container.appendChild(frag);
}

function setupCursor() {
  if (matchMedia("(pointer: coarse)").matches) return;
  const dot = $(".cursor-dot"), ring = $(".cursor-ring");
  Object.assign(dot.style, {position:"fixed",zIndex:9999,width:"5px",height:"5px",borderRadius:"50%",background:"#f3d6a4",pointerEvents:"none",transform:"translate(-50%,-50%)"});
  Object.assign(ring.style, {position:"fixed",zIndex:9998,width:"28px",height:"28px",border:"1px solid rgba(243,214,164,.45)",borderRadius:"50%",pointerEvents:"none",transform:"translate(-50%,-50%)",transition:"width .25s,height .25s,border-color .25s"});
  let x=-50,y=-50,rx=-50,ry=-50;
  addEventListener("mousemove", e => { x=e.clientX;y=e.clientY; });
  const loop = () => { rx += (x-rx)*.16; ry += (y-ry)*.16; dot.style.left=`${x}px`;dot.style.top=`${y}px`;ring.style.left=`${rx}px`;ring.style.top=`${ry}px`;requestAnimationFrame(loop); };
  loop();
  $$("button,a,.secret-card").forEach(el => {
    el.addEventListener("mouseenter",()=>{ring.style.width="45px";ring.style.height="45px";ring.style.borderColor="rgba(243,214,164,.8)"});
    el.addEventListener("mouseleave",()=>{ring.style.width="28px";ring.style.height="28px";ring.style.borderColor="rgba(243,214,164,.45)"});
  });
}

function setupNavigation() {
  const sections = ["home","message","memories","surprise"];
  const links = $$(".floating-nav a");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => a.classList.toggle("nav-active", a.getAttribute("href") === `#${entry.target.id}`));
      }
    });
  }, { threshold:.45 });
  sections.forEach(id => { const el = document.getElementById(id); if(el) observer.observe(el); });
}

function setupMusic() {
  $("#musicToggle").addEventListener("click", () => {
    const audio = $("#birthdayMusic");
    if (audio.paused) startMusic(); else { audio.pause(); $("#musicToggle").classList.remove("music-playing"); }
  });
}

async function startMusic() {
  const audio = $("#birthdayMusic");
  try {
    await audio.play();
    $("#musicToggle").classList.add("music-playing");
  } catch {
    toast("Add your own MP3 at assets/music/birthday-song.mp3 to enable music.");
  }
}

function setupCandle() {
  $("#candleBtn").addEventListener("click", () => {
    const btn = $("#candleBtn");
    if (btn.classList.contains("blown")) return;
    btn.classList.add("blown");
    $("#candleArea").classList.add("wished");
    $("#wishResult").textContent = "I hope this year gives you more reasons to smile.";
    $("#oneMoreBtn").classList.remove("hidden");
    createConfetti(70);
  });
  $("#oneMoreBtn").addEventListener("click", () => $("#surprise").scrollIntoView({behavior:"smooth"}));
}

function setupCards() {
  $$(".secret-card").forEach(card => {
    const open = () => {
      card.classList.toggle("open");
      card.setAttribute("aria-pressed", card.classList.contains("open"));
      if (card.classList.contains("open")) createConfetti(5);
    };
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if(e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }});
  });
}

function setupSurprise() {
  $("#surpriseBtn").addEventListener("click", () => {
    $(".surprise-content").classList.add("dim");
    const reveal = $("#giftReveal");
    reveal.setAttribute("aria-hidden","false");
    setTimeout(() => {
      reveal.classList.add("active");
      createConfetti(120);
    }, 550);
  });
  $("#letterBtn").addEventListener("click", () => $("#letter").scrollIntoView({behavior:"smooth"}));
}

function createConfetti(count) {
  const container = $("#confetti");
  const symbols = ["✦","•","◆","♥"];
  for (let i=0;i<count;i++) {
    const p = document.createElement("span");
    p.className = "confetti-piece";
    p.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    p.style.left = `${Math.random()*100}%`;
    p.style.color = Math.random() > .5 ? "#f3d6a4" : "#d9a7a7";
    p.style.fontSize = `${8 + Math.random()*12}px`;
    p.style.setProperty("--x", `${(Math.random()-.5)*260}px`);
    p.style.animationDelay = `${Math.random()*.8}s`;
    container.appendChild(p);
    setTimeout(() => p.remove(), 4500);
  }
}

function setupEasterEggs() {
  let heartClicks = 0;
  document.addEventListener("click", e => {
    if (e.target.closest(".heart")) {
      heartClicks++;
      if (heartClicks === 3) {
        toast("Psst... you found a tiny birthday secret. ✦");
        createConfetti(25);
      }
    }
  });
  let memoryCount = 0;
  const memoryObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting && entry.target.classList.contains("memory-item")) {
        memoryCount++;
        if(memoryCount >= birthdayConfig.memories.length) {
          setTimeout(() => toast("You found them all. Keep the memories close. ♡"), 500);
          memoryObserver.disconnect();
        }
      }
    });
  }, {threshold:.6});
  $$(".memory-item").forEach(m => memoryObserver.observe(m));
}

function toast(message) {
  const el = $("#toast");
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;" }[c]));
}
function escapeAttr(value) { return escapeHTML(value); }
