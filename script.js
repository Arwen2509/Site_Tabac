/* ============================================================
   TABAC DU CENTRE — script.js
   ============================================================ */

/* ---------- HORAIRES D'OUVERTURE ----------
   Modifiez les horaires ici si besoin.
   0 = dimanche, 1 = lundi, ..., 6 = samedi
   format : [heure_ouverture, heure_fermeture] en minutes depuis minuit
*/
const HORAIRES = {
  0: { ouvert: true,  debut: 6 * 60 + 30,  fin: 19 * 60},  // Lundi
  1: { ouvert: true,  debut: 6 * 60 + 30,  fin: 19 * 60},  // Mardi
  2: { ouvert: true,  debut: 6 * 60 + 30,  fin: 19 * 60},  // Mercredi
  3: { ouvert: true,  debut: 6 * 60 + 30,  fin: 19 * 60},  // Jeudi
  4: { ouvert: true,  debut: 6 * 60 + 30,  fin: 19 * 60},  // Vendredi
  5: { ouvert: true,  debut: 6 * 60 + 30,  fin: 12 * 60 + 15},  // Samedi
};

function isOuvert() {
  const now = new Date();
  const jour = now.getDay();
  const minutesDuJour = now.getHours() * 60 + now.getMinutes();
  const h = HORAIRES[jour];
  if (!h || !h.ouvert) return false;
  return minutesDuJour >= h.debut && minutesDuJour < h.fin;
}

function updateStatus() {
  const el = document.getElementById('hoursStatus');
  if (!el) return;
  if (isOuvert()) {
    el.textContent = 'Ouvert maintenant';
    el.classList.remove('ferme');
  } else {
    el.textContent = 'Fermé';
    el.classList.add('ferme');
    el.style.setProperty('--dot', '#922');
  }
}

updateStatus();
setInterval(updateStatus, 60 * 1000);


/* ---------- MENU MOBILE ---------- */
const burger = document.getElementById('burger');
const navMobile = document.getElementById('navMobile');

burger.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});

function closeMenu() {
  navMobile.classList.remove('open');
}


/* ---------- FORMULAIRE COLIS ----------
   En production, remplacez l'action du formulaire par un vrai
   service d'envoi (Formspree, EmailJS, etc.)
   Voir les commentaires ci-dessous.
*/
const colisForm = document.getElementById('colisForm');
const colisConfirm = document.getElementById('colisConfirm');

colisForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const nom = document.getElementById('colisNom').value.trim();
  const tel = document.getElementById('colisTel').value.trim();

  /* -------------------------------------------------------
     OPTION A — Formspree (gratuit jusqu'à 50 envois/mois)
     1. Créez un compte sur https://formspree.io
     2. Créez un formulaire et copiez l'URL donnée
     3. Remplacez l'URL ci-dessous

  const res = await fetch('https://formspree.io/f/VOTRE_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify({ nom, telephone: tel })
  });
  if (!res.ok) { alert('Erreur, veuillez appeler directement.'); return; }

     ------------------------------------------------------- */

  /* -------------------------------------------------------
     OPTION B — EmailJS (gratuit jusqu'à 200 envois/mois)
     Permet d'envoyer directement vers l'adresse email de votre mère.
     Voir https://www.emailjs.com pour la configuration.
     ------------------------------------------------------- */

  /* Pour l'instant, on simule juste la confirmation */
  console.log('Demande colis :', { nom, tel });

  colisForm.reset();
  colisConfirm.hidden = false;
  setTimeout(() => { colisConfirm.hidden = true; }, 5000);
});
