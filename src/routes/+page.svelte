<!-- <script>
    export let data
  console.log(data)
    function checkAvatarImage (avatar) {
      if (avatar.includes('https')) {
        return true
      } 
  
      return false
    }
  </script>
  
  <main>

    <div class="container">
        <div class="card">
          <div class="front">
                <h1>{data.name} {data.surname}</h1>
                    <p>Frontend designer en developer</p>
          <div class="front-image-container">
             <img src="{data.avatar}" alt="profielfoto"> 
          </div>
        </div>
          <div class="back">
            <div class="back-content">
              <div class="biografie">
                <h2>Biografie</h2>
                  <p>{data.bio}</p>
              </div>
            <div class="contactgegevens">
                <h2>Contactgegevens</h2>
                
              </div>
            </div>
          </div>
        </div>
    </div> 

  </main>
  
  <style>
        h1 {
        color: var(--textColor);
        font-family: var(--primaryFont);
        font-size: 3em;
        justify-content: center;
        align-items: center;
        justify-content: flex-start;
        margin-top: 40px;
        text-transform: uppercase;
        

        }
        p {
        display: flex;
        font-family: var(--primaryFont);
        color: var(--textColor);
        font-size: 1.5em;
        margin: 18px;
        justify-content: center;
        align-items: center;
        }

        h2 {
        font-size: 2em;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        justify-content: flex-start;
        color: var(--textColor);
        margin-top: 70px;
        text-transform: uppercase;
        }

        /* hier staat image1 ipv img zodat ik alle fotos kan onderscheiden en verschillende properties kan toepassen */
        .front-image-container {
        position: relative;
        /* align-items: center; */
        top: 1rem;
        

        & img {
            width: 350px;
            height: auto;
            max-height: 350px;
            object-fit: cover;
            border: 1px solid black;
            border-radius: 10px;
        }
        }

        .container {
        width: 450px;
        height: 600px;
        perspective: 700px;
        }

        .card {
        height: 100%;
        width: 100%;
        position: relative;
        transition: transform 1500ms;
        transform-style: preserve-3d;
        border: 1px solid black;
        border-radius: 10px;
        background: #F2EFE6;
        }
        /* De transition property zorgt ervor dat er een animatie op de 180 graden flip zit */
        /* De preserve-3d property staat er zodat mijn card word behandeld als een 3d object. Zonder deze property liggen de kaarten niet de juiste kant op.*/


        .front,
        .back {
        height: 100%;
        width: 100%;
        position: absolute;
        box-shadow: 0 0 20px 20px rgba(50, 50, 50, 0.101);
        border-radius: 10px;
        backface-visibility: hidden;
        }
        /* Hier staat backface-visibility hidden zodat elke keer de achterkant niet zichtbaar is */

        .front {
        
        display: flex;
        flex-direction: column;
        align-items: center;
        }

        /* Er staat >card bij omdat als je hem alleen op card toepast word het heel buggy als je heen en weer gaat. 
        Nu staat het bij container want die staat vast omdat die geen animatie heeft */
        .container:hover > .card {
        cursor: pointer;
        transform: rotateY(180deg);
        }

        .back {
        transform: rotateY(180deg);
        }

  </style> -->
 <script>
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
    <li class="card card-4">
      <div class="content">
        <h2>Kaart 4</h2>
      </div>
    </li>
    <li class="card card-5">
      <div class="content">
        <h2>Kaart 5</h2>
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
</style>
