<script>
  export let data;
  import { onMount } from 'svelte';

  let isAnimating = false; // Variabele om bij te houden of een animatie bezig is

  onMount(() => {
    const cardsSplit = document.querySelector('.card-container');

    if (cardsSplit) {
      cardsSplit.addEventListener('click', () => {
        // Blokkeer klikken als er al een animatie bezig is
        if (isAnimating) return;

        // Zet de animatie lock aan
        isAnimating = true;

        const isSpread = cardsSplit.classList.contains('spread');

        // Als de kaarten al verspreid zijn (isSpread), eerst terug flippen en dan unspread
        if (isSpread) {
          const cards = document.querySelectorAll('.card-inner');
          cards.forEach((card, index) => {
            setTimeout(() => {
              // Eerst flippen naar de voorkant (verwijder 'flipped')
              card.classList.toggle('flipped');
              console.log(`Card ${index + 1} flipped state toggled`);
            }, index * 350);
          });

          // Wacht op het flippen voordat de kaarten weer teruggaan naar hun originele positie
          setTimeout(() => {
            cardsSplit.classList.toggle('spread');
            // Animatie is klaar, lock opheffen
            isAnimating = false;
          }, 1000); // Wacht 1,5 seconde (1 seconde voor het flippen en 0,5 voor de verspreiding)
        } else {
          // Als de kaarten niet verspreid zijn, eerst spread doen
          cardsSplit.classList.toggle('spread');

          // Wacht met flippen tot de kaarten verspreid zijn
          setTimeout(() => {
            const cards = document.querySelectorAll('.card-inner');
            cards.forEach((card, index) => {
              setTimeout(() => {
                // Flip de kaarten (toggle 'flipped' class)
                card.classList.toggle('flipped');
                console.log(`Card ${index + 1} flipped state toggled`);
              }, index * 350);
            });

            // Animatie is klaar na flippen
            setTimeout(() => {
              isAnimating = false; // Animatie lock opheffen
            }, 1500); // Wacht 1,5 seconde voor de volledige animatie
          }, 300); // Wacht 1 seconde voor de verspreidingsanimatie
        }
      });
    }
  });
</script>

<main>
  <ul class="card-container">
    <li class="card card-1">
      <div class="card-inner">
        <div class="card-front">
          <img src="/card.png" alt="Kaart 1">
        </div>
        <div class="card-back">
          <h3 class='card-icon top-left'>10♠️</h3> <h3 class='card-icon top-right'>10♠️</h3>
          <div class="card-content">
            <!-- <img src="{data.avatar}"> -->
            <h2>{data.name} {data.surname}</h2>
          </div>
          <h3 class='card-icon bottom-left'>10♠️</h3> <h3 class='card-icon bottom-right'>10♠️</h3>
        </div>
      </div>
    </li>
    <li class="card card-2">
      <div class="card-inner">
        <div class="card-front">
          <img src="/card.png" alt="Kaart 2">
        </div>
        <div class="card-back">
          <h3 class='card-icon top-left red'>2♦️</h3> <h3 class='card-icon top-right red'>2♦️</h3>
          <div class="card-content">
            <h2>Bio</h2>
            <pre>{data.bio}</pre>
          </div>
          <h3 class='card-icon bottom-left red'>2♦️</h3> <h3 class='card-icon bottom-right red'>2♦️</h3>
        </div>
      </div>
    </li>
    <li class="card card-3">
      <div class="card-inner">
        <div class="card-front">
          <img src="/card.png" alt="Kaart 3">
        </div>
        <div class="card-back">
          <h3 class='card-icon top-left'>J♣️</h3> <h3 class='card-icon top-right'>J♣️</h3>
            <h2>Tekst 3</h2>
          <h3 class='card-icon bottom-left'>J♣️</h3> <h3 class='card-icon bottom-right'>J♣️</h3>
        </div>
      </div>
    </li>
  </ul>
</main>
<style>
.card-container {
  display: flex;
  justify-content: center;
  width: 360px;
  height: 700px;
  list-style-type: none;
  position: relative;
  margin: auto;
  cursor: pointer;
  perspective: 1000px; /* Zorgt voor diepte-effect */
}

.card {
  background: none;
  overflow: hidden;
  height: 200px;
  width: 140px;
  margin: auto;
  border-radius: 10px;
  position: absolute;
  top: 233px;
  transition: transform 0.4s ease-in-out, top 0.4s ease-in-out;
}

.card-inner {
  height: 100%;
  width: 100%;
  transition: transform 0.5s ease-in-out;
  transform-style: preserve-3d; /* Houdt de 3D-transformaties vast */
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden; /* Verberg de achterkant bij het omdraaien */
  border-radius: 10px;
}

.card-front {
  transform: rotateY(0deg); /* Voorkant is zichtbaar */
}

.card-front img {
  width: 100%;
  height: 100%;
}

.card-back {
  transform: rotateY(180deg); /* Achterkant is verborgen */
  background: #F8F8F8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.card-content h2 {
  font-size: 18px;
}

.card-content pre {
  text-align: center;
  font-size: 9px;
  line-height: 20px;
  margin: 0 10px 10px;
}

.card-icon {
  font-size: 14px;
}

.top-left {
  position: absolute;
  top: 8px;
  left: 8px;
}

.top-right {
  position: absolute;
  top: 8px;
  right: 8px;
}

.bottom-left {
  position: absolute;
  bottom: 8px;
  left: 8px;
  transform: rotateX(180deg);
}

.bottom-right {
  position: absolute;
  bottom: 8px;
  right: 8px;
  transform: rotateX(180deg);
}

.red {
  color: red;
}

/* Globale CSS voor het flippen van de kaarten */
:global(.card-inner.flipped) {
  transform: rotateY(180deg); /* Draait de kaart om */
}

/* Kaarten draaien terug naar hun oorspronkelijke positie */
:global(.card-inner:not(.flipped)) {
  transform: rotateY(0deg); /* Draai terug naar de voorkant */
}

/* Posities en rotaties voor de kaarten */
.card-1 {
  z-index: 10;
  transform: rotateZ(-2deg);
}

.card-2 {
  z-index: 9;
  transform: rotateZ(-7deg);
}

.card-3 {
  z-index: 8;
  transform: rotateZ(5deg);
}

/* Verspreidingsanimatie zorgt ervoor dat de kaarten recht draaien */
:global(.card-container.spread .card-1) {
  top: 0px;
  transform: rotateZ(0deg);
}

:global(.card-container.spread .card-2) {
  top: 250px;
  transform: rotateZ(0deg);
}

:global(.card-container.spread .card-3) {
  top: 500px;
  transform: rotateZ(0deg);
}

/* Desktopvariant vanaf 900px breed */
@media screen and (min-width: 900px) {

  .card-container {
    width: 1000px;
    height: 480px;
  }

  .card {
    height: 400px;
    width: 300px;
    left: 333px;
    top: 0;
    transition: transform 0.4s ease-in-out, left 0.4s ease-in-out;
  }

  .card-content h2 {
    font-size: 28px;
    margin-bottom: 12px;
  }

  .card-content pre {
  font-size: 18px;
  line-height: 36px;
  margin: 0; /* Verwijder marges die tekst van de kaart zouden kunnen duwen */
  white-space: pre-wrap; /* Breek lange regels af in het pre-element */
  word-wrap: break-word; /* Breek woorden af als ze te lang zijn */
  }

  .card-icon {
    font-size: 26px;
  }

  .top-left {
    top: 10px;
    left: 10px;
  }

  .top-right {
    top: 10px;
    right: 10px;
  }

  .bottom-left {
    bottom: 10px;
    left: 10px;
  }

  .bottom-right {
    bottom: 10px;
    right: 10px;
  }

  /* Verspreidingsanimatie zorgt ervoor dat de kaarten recht draaien */
  :global(.card-container.spread .card-1) {
    left: 0px;
    top: 0;
    transform: rotateZ(0deg);
  }

  :global(.card-container.spread .card-2) {
    left: 350px;
    top: 0;
    transform: rotateZ(0deg);
  }

  :global(.card-container.spread .card-3) {
    left: 700px;
    top: 0;
    transform: rotateZ(0deg);
  }
}
</style>
