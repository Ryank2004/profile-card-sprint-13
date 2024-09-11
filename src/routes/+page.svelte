 <!-- <script>
  import { onMount } from 'svelte';

  onMount(() => {
    const cardsSplit = document.querySelector('.card-container');

    if (cardsSplit) {
      cardsSplit.addEventListener('click', () => {
        cardsSplit.classList.toggle('transition');
      });
    }
  });
</script>

<main>
  <ul class="card-container">
    <li class="card card-1">
      <div class="content">
        <h2>Kaart 1</h2>
      </div>
    </li>
    <li class="card card-2">
      <div class="content">
        <h2>Kaart 2</h2>
      </div>
    </li>
    <li class="card card-3">
      <div class="content">
        <h2>Kaart 3</h2>
      </div>
    </li>
  </ul>
</main>

<style>
  .card-container {
    width: 900px;
    height: 480px;
    list-style-type: none;
    position: relative;
    margin: 0 auto 20px;
    padding: 20px;
    cursor: pointer;
    scale: 2;
  }

  .card {
    background: #FFF;
    overflow: hidden;
    height: 360px;
    width: 280px;
    border-radius: 10px;
    position: absolute;
    left: 300px;
    box-shadow: 1px 2px 2px 0 #aaa;
    transition: all 0.4s cubic-bezier(0.63, 0.15, 0.03, 1.12);
  }

  .content {
    padding: .5em;
  }

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

  :global(.card-container.transition .card) {
      transform: rotateZ(0deg);
  }

  :global(.card-container.transition .card-1) {
      left: 0px;
  }

  :global(.card-container.transition .card-2) {
      left: 600px;
  }

  :global(.card-container.transition .card-3) {
      left: 300px;
  }
</style> -->
<script>
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
          <h2>Tekst 1</h2>
        </div>
      </div>
    </li>
    <li class="card card-2">
      <div class="card-inner">
        <div class="card-front">
          <img src="/card.png" alt="Kaart 2">
        </div>
        <div class="card-back">
          <h2>Tekst 2</h2>
        </div>
      </div>
    </li>
    <li class="card card-3">
      <div class="card-inner">
        <div class="card-front">
          <img src="/card.png" alt="Kaart 3">
        </div>
        <div class="card-back">
          <h2>Tekst 3</h2>
        </div>
      </div>
    </li>
  </ul>
</main>

<style>
  .card-container {
    width: 900px;
    height: 480px;
    list-style-type: none;
    position: relative;
    margin: 0 auto 20px;
    padding: 20px;
    cursor: pointer;
    scale: 2;
    perspective: 1000px; /* Zorgt voor diepte-effect */
  }

  .card {
    background: none;
    overflow: hidden;
    height: 360px;
    width: 280px;
    border-radius: 10px;
    position: absolute;
    left: 300px;
    box-shadow: 1px 2px 2px 0 #aaa;
    transition: transform 0.4s ease-in-out, left 0.4s ease-in-out; /* Beide transities: draaien en verplaatsen */
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
    left: 0px;
    transform: rotateZ(0deg);
  }

  :global(.card-container.spread .card-2) {
    left: 300px;
    transform: rotateZ(0deg);
  }

  :global(.card-container.spread .card-3) {
    left: 600px;
    transform: rotateZ(0deg);
  }
</style>
