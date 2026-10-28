// Fortschrittsbalken oben erzeugen
const balken = document.createElement("div");
balken.className = "fortschritt";
document.body.appendChild(balken);

const links = document.querySelectorAll("nav a");
const abschnitte = document.querySelectorAll("main h2[id]");

function beimScrollen() {
  // Balken: wie weit ist man gescrollt?
  const max = document.documentElement.scrollHeight - window.innerHeight;
  balken.style.width = (window.scrollY / max) * 100 + "%";

  // Aktiven Menüpunkt markieren
  let aktuell = "";
  abschnitte.forEach((h) => {
    if (h.getBoundingClientRect().top < 150) aktuell = h.id;
  });
  links.forEach((a) => {
    a.classList.toggle("aktiv", a.getAttribute("href") === "#" + aktuell);
  });
}
window.addEventListener("scroll", beimScrollen);

// Inhalte beim Scrollen einblenden
const beobachter = new IntersectionObserver((eintraege) => {
  eintraege.forEach((eintrag) => {
    if (eintrag.isIntersecting) {
      eintrag.target.classList.add("sichtbar");
      beobachter.unobserve(eintrag.target);
      setTimeout(() => (eintrag.target.style.transitionDelay = ""), 1200);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll("main h2, .karte, .projekt, .station").forEach((el) => {
  el.classList.add("einblenden");
  beobachter.observe(el);
});

// Karten nacheinander einblenden
document.querySelectorAll(".karte").forEach((karte, i) => {
  karte.style.transitionDelay = i * 0.12 + "s";
});
// Szene starten, sobald sie sichtbar ist
const szene = document.querySelector(".szene");
if (szene) {
  new IntersectionObserver((eintraege, obs) => {
    if (eintraege[0].isIntersecting) {
      szene.classList.add("los");
      obs.disconnect();
    }
  }, { threshold: 0.5 }).observe(szene);
}

// Spotlight und 3D-Kippen (nur mit Maus und ohne "weniger Bewegung")
const bewegungOk =
  window.matchMedia("(hover: hover)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (bewegungOk) {
  document.querySelectorAll(".karte, .projekt").forEach((karte) => {
    karte.addEventListener("mousemove", (e) => {
      const r = karte.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      karte.style.setProperty("--x", x + "px");
      karte.style.setProperty("--y", y + "px");
      const kippX = (y / r.height - 0.5) * -8;
      const kippY = (x / r.width - 0.5) * 8;
      karte.style.transform =
        `perspective(800px) rotateX(${kippX}deg) rotateY(${kippY}deg) translateY(-6px)`;
    });
    karte.addEventListener("mouseleave", () => {
      karte.style.transform = "";
    });
  });
}