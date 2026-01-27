const tap = document.getElementById("tap");
const screen = document.getElementById("screen");
const prank = document.getElementById("prank");
const terminal = document.getElementById("terminal");
const bar = document.getElementById("bar");
const ip = document.getElementById("ip");

tap.addEventListener("click", () => {
  document.documentElement.requestFullscreen?.();
  tap.classList.add("hidden");
  systemPopup.classList.remove("hidden");
}, { once: true });

document.getElementById("popupBtn").addEventListener("click", () => {
  systemPopup.classList.add("hidden");
  screen.classList.remove("hidden");

  // BARU LOCK INPUT DI SINI
  document.addEventListener("keydown", e => e.preventDefault());
  document.addEventListener("contextmenu", e => e.preventDefault());

  startPrank();
});

history.pushState(null,"",location.href);
window.onpopstate = () => history.pushState(null,"",location.href);

tap.addEventListener("click", () => {
  document.documentElement.requestFullscreen?.();
  tap.classList.add("hidden");

  // tampilkan popup dulu
  document.getElementById("systemPopup").classList.remove("hidden");
}, { once: true });

document.getElementById("popupBtn").addEventListener("click", () => {
  document.getElementById("systemPopup").classList.add("hidden");
  screen.classList.remove("hidden");
  startPrank();
});


ip.textContent = `IP: 192.168.${rand(10,99)}.${rand(10,99)}`;

const logs = [
  "Initializing exploit module...",
  "Bypassing security layer...",
  "Access granted.",
  "Scanning storage...",
  "Collecting credentials...",
  "Encrypting media files...",
  "Uploading data to server...",
  "Finalizing process..."
];

function startPrank(){
  let li=0, p=0;

  const t = setInterval(()=>{
    terminal.innerHTML += "> " + logs[li] + "<br>";
    terminal.scrollTop = terminal.scrollHeight;
    li++; if(li>=logs.length) clearInterval(t);
  }, 600);

  const b = setInterval(()=>{
    p++; bar.style.width = p+"%";
    if(p>=100){ clearInterval(b); setTimeout(endPrank,300); }
  }, 80); // ±8 detik
}

function endPrank(){
  screen.classList.add("hidden");
  prank.classList.remove("hidden");
}

function rand(a,b){ return Math.floor(Math.random()*(b-a+1))+a; }

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("popupBtn");

  btn.addEventListener("click", () => {
    document.getElementById("systemPopup").classList.add("hidden");
    screen.classList.remove("hidden");
    startPrank();
  });
});
