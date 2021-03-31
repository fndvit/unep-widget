<script lang="ts">
  import { onMount } from 'svelte';
  import Video from './Video.svelte'
  import { fly } from 'svelte/transition'
  import { CountUp } from 'countup.js';
  import svgs from '../svg';

  export var height:number;
  export var width:number;
  export var visible:boolean;

  let pop:boolean;

  onMount(() => {
    const options = {
      startVal: 1970,
      useEasing: false,
      duration: 15,
      separator: '',
      decimal: '',
    };  
    let year = new CountUp('year', 2015, options);
    year.start()
    const loop = setInterval(() => { 
      year.reset();
      year.start();
     }, 20200);
  })

</script>
<div class="overlay" style='height:{height}px; width: {width}px'>
  <Video 
    src='co2-particles.mp4'
    layout='cover' />
  
  <div class='overlay'>
    <div class='col-wrapper'>
      <div
        class='col-text {pop ? 'pop' : 'flat'}'
        on:mouseover={() => pop = true}
        on:mouseout={() => pop = false}>
        <h1><b>Greenhouse gas emissions</b> are changing our climate.</h1>
        <h1>The particles choking your screen depict the emissions for <b><span id='year'>1970</span></b></h1>
        {#if visible}
        <button class='button' on:click transition:fly={{y: -500, duration:1000}}>
          What does the <b>data</b> say<br/>about the <b>state of the climate</b>?
          <div class="icon">{@html svgs.stateoftheclimate.main}</div>
        </button>
        {/if}
      </div>
    </div>
  </div>
</div>
<style>
  h1 {
    font-size: 30px;
    line-height: 42px;
    font-weight: 300;
  }

  .overlay { 
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height: 100%;
  }

  .col-wrapper {
    max-width: 1100px;
    margin:auto;
    text-align: left;
    
  }

  .col-text {
    max-width: 420px;
    padding-top: 40px;
    margin:10px;
  }

  button {
    border: 0;
    border-radius: 0;
    padding: 12px;
    background: #009ee2;
    margin: 0;
    display: block;
    position: relative;
    box-sizing: border-box;
    font-size: 16px;
    outline: none;
    white-space: nowrap;
    margin-bottom: 1px;
    color:#FFF;
    transition: background-color .3s;
    text-align:left;
    line-height:21px;
    font-weight: 300;
    width:300px;
    height: 76px;
  }

  button:not(:disabled) {
        cursor: pointer;
  }

  button:not(.selected):hover {
    background: #1E1E1E;
  }

  .icon {
        position: absolute;
        right: 16px;
        top: 16px;
        width: 42px;
        height: 42px;
        box-sizing: border-box;
        z-index: 2;
    }

  button .icon :global(svg *) {
      stroke: white;
  }

  .pop {
    text-shadow: rgb(243, 243, 243) 8px 0px 0px, rgb(243, 243, 243) 7.93758px 0.997398px 0px, rgb(243, 243, 243) 7.7513px 1.97923px 0px, rgb(243, 243, 243) 7.44406px 2.93018px 0px, rgb(243, 243, 243) 7.02066px 3.8354px 0px, rgb(243, 243, 243) 6.4877px 4.68078px 0px, rgb(243, 243, 243) 5.85351px 5.45311px 0px, rgb(243, 243, 243) 5.12797px 6.14035px 0px, rgb(243, 243, 243) 4.32242px 6.73177px 0px, rgb(243, 243, 243) 3.44941px 7.21814px 0px, rgb(243, 243, 243) 2.52258px 7.59188px 0px, rgb(243, 243, 243) 1.55638px 7.84714px 0px, rgb(243, 243, 243) 0.565898px 7.97996px 0px, rgb(243, 243, 243) -0.433417px 7.98825px 0px, rgb(243, 243, 243) -1.42597px 7.87189px 0px, rgb(243, 243, 243) -2.39627px 7.63269px 0px, rgb(243, 243, 243) -3.32917px 7.27438px 0px, rgb(243, 243, 243) -4.21013px 6.80256px 0px, rgb(243, 243, 243) -5.02539px 6.22459px 0px, rgb(243, 243, 243) -5.76223px 5.54948px 0px, rgb(243, 243, 243) -6.40915px 4.78778px 0px, rgb(243, 243, 243) -6.95606px 3.95136px 0px, rgb(243, 243, 243) -7.39442px 3.05329px 0px, rgb(243, 243, 243) -7.71739px 2.10757px 0px, rgb(243, 243, 243) -7.91994px 1.12896px 0px, rgb(243, 243, 243) -7.9989px 0.132735px 0px, rgb(243, 243, 243) -7.95304px -0.865561px 0px, rgb(243, 243, 243) -7.78307px -1.85035px 0px, rgb(243, 243, 243) -7.49165px -2.80627px 0px, rgb(243, 243, 243) -7.08333px -3.71839px 0px, rgb(243, 243, 243) -6.56448px -4.57249px 0px, rgb(243, 243, 243) -5.94318px -5.35524px 0px, rgb(243, 243, 243) -5.22915px -6.05442px 0px, rgb(243, 243, 243) -4.43352px -6.65912px 0px, rgb(243, 243, 243) -3.5687px -7.15991px 0px, rgb(243, 243, 243) -2.6482px -7.54898px 0px, rgb(243, 243, 243) -1.68637px -7.82024px 0px, rgb(243, 243, 243) -0.698222px -7.96947px 0px, rgb(243, 243, 243) 0.300817px -7.99434px 0px, rgb(243, 243, 243) 1.29516px -7.89446px 0px, rgb(243, 243, 243) 2.2693px -7.67139px 0px, rgb(243, 243, 243) 3.20802px -7.32862px 0px, rgb(243, 243, 243) 4.09668px -6.87148px 0px, rgb(243, 243, 243) 4.92142px -6.30711px 0px, rgb(243, 243, 243) 5.66936px -5.64432px 0px, rgb(243, 243, 243) 6.32883px -4.89346px 0px, rgb(243, 243, 243) 6.88954px -4.06623px 0px, rgb(243, 243, 243) 7.34274px -3.17555px 0px, rgb(243, 243, 243) 7.68136px -2.23532px 0px, rgb(243, 243, 243) 7.90012px -1.26021px 0px, rgb(243, 243, 243) 7.9956px -0.265434px 0px;
    transition: text-shadow .5s;
  }

  .flat {
    text-shadow:none;
    transition: text-shadow .5s;
  }

  @media (min-width: 900px) {
    h1 {
      font-size: 42px;
      line-height: 54px;
      margin-left:0;
    }

    .col-text {
      margin:0;
    }
  }

</style>