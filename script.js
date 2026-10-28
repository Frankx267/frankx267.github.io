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