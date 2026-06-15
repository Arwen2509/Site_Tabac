const HORAIRES = {
  1: { ouvert: true, debut: 6 * 60 + 30, fin: 19 * 60 },
  2: { ouvert: true, debut: 6 * 60 + 30, fin: 19 * 60 },
  3: { ouvert: true, debut: 6 * 60 + 30, fin: 19 * 60 },
  4: { ouvert: true, debut: 6 * 60 + 30, fin: 19 * 60 },
  5: { ouvert: true, debut: 6 * 60 + 30, fin: 19 * 60 },
  6: { ouvert: true, debut: 6 * 60 + 30, fin: 12 * 60 + 15 }
};

function isOuvert() {
  const now = new Date();
  const jour = now.getDay();
  const minutesDuJour = now.getHours() * 60 + now.getMinutes();
  const horairesDuJour = HORAIRES[jour];

  if (!horairesDuJour || !horairesDuJour.ouvert) {
    return false;
  }

  return (
    minutesDuJour >= horairesDuJour.debut &&
    minutesDuJour < horairesDuJour.fin
  );
}

function updateStatus() {
  const status = document.getElementById("hoursStatus");

  if (!status) {
    return;
  }

  if (isOuvert()) {
    status.textContent = "Ouvert maintenant";
    status.classList.remove("ferme");
  } else {
    status.textContent = "Ferme";
    status.classList.add("ferme");
  }
}

updateStatus();
setInterval(updateStatus, 60 * 1000);

const burger = document.getElementById("burger");
const navMobile = document.getElementById("navMobile");

if (burger && navMobile) {
  burger.addEventListener("click", () => {
    navMobile.classList.toggle("open");
  });
}

function closeMenu() {
  if (navMobile) {
    navMobile.classList.remove("open");
  }
}

const colisForm = document.getElementById("colisForm");
const colisConfirm = document.getElementById("colisConfirm");

if (colisForm && colisConfirm) {
  colisForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nom = document.getElementById("colisNom").value.trim();
    const tel = document.getElementById("colisTel").value.trim();

    console.log("Demande colis :", { nom, tel });

    colisForm.reset();
    colisConfirm.hidden = false;

    setTimeout(() => {
      colisConfirm.hidden = true;
    }, 5000);
  });
}
