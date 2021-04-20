<script lang="ts">
    import { groups } from 'd3-array';
    import type { PewData } from '../data';
    import { pew } from '../data';
    import { onMount } from 'svelte';
    import MiniSurveyCharts from '../components/MiniSurveyCharts.svelte';
    import {fade} from 'svelte/transition'

    let loaded: boolean = false;
    let selectedCountry:Array<any>;
    let width: number = 100;
    $: tileWidth = width * .1;
    let hover: boolean = false;
    var dataset: PewData [];
    let groupByCountry;
    let detailChartPosition: {x:number, y:number};
    let container:HTMLElement;
    let offset:{x:number, y:number, width: number, height: number};

    onMount(async () => {
        dataset = await pew;
        let dataFiltered = dataset.filter(d => d.value !== null)
        groupByCountry = groups(dataFiltered, d => d.country).map(d => d[1]);
        groupByCountry.sort((a,b) => b[b.length - 1].value - a[a.length - 1].value );
        loaded = true;
    })

    function selectCountry(selection:Array<any>, pos:{x:number, y:number}) {

        offset = {
            x: container.getBoundingClientRect().x,
            y: container.getBoundingClientRect().y,
            width: container.getBoundingClientRect().width,
            height: container.getBoundingClientRect().height
        }

        selectedCountry = selection;
        hover = true;

        detailChartPosition = pos

        if (pos.x > offset.width - 200) {
            detailChartPosition.x = offset.width - 200
        }
        if (pos.y > offset.height - 150) {
            detailChartPosition.y = offset.height - 150
        }
        if (pos.x < 92) {
            detailChartPosition.x = 92
        }

        if (pos.y < 32) {
            detailChartPosition.y = 32
        }

    }

    const nameOverrides = {
        "United States of America": "United States"
    }
</script>

{#if loaded}
<div class="pew-container" bind:clientWidth={width} bind:this={container} >
    {#each groupByCountry as country}
    <div class="mini-chart"
    on:mouseenter={(e) => selectCountry(country, {x: e.target.offsetLeft, y: e.target.offsetTop})}
    on:mouseleave={() => hover = false }
    >
        <p class="label">{nameOverrides[country[0].short] || country[0].short}</p>
        <MiniSurveyCharts
            data={country}
            width={tileWidth}
            selected={false}
         />
    </div>
    {/each}
</div>
{/if}

{#if hover && selectedCountry}
    <div class="detail-chart" style='top:{detailChartPosition.y}px; left:{detailChartPosition.x}px' transition:fade={{duration:100}}>
    <p class="description"><span class='value'>{selectedCountry[selectedCountry.length - 1].value}%</span> of people in <span class='country'>{selectedCountry[0].country}</span> consider climate change a major threat
    </p>
    <MiniSurveyCharts
            data={selectedCountry}
            width={270}
            selected={true}
         />
    </div>
{/if}

<style>
    .pew-container {
        box-sizing: border-box;
        padding-bottom: 20px;
        flex: 0 0 100%;
        text-align: left;
        margin-top:30px;
    }

    .mini-chart {
        width: 10%;
        margin-right: 2px;
        margin-bottom: 2px;
        padding: 20px 2px 0 2px;
        background-color: #eaeaea;
        display: inline-block;
        position:relative;
        overflow: hidden;
    }

    .mini-chart:hover {
        background-color: #dadada;
        transform: scale(1.2);
        transition: transform 0.1s;
        z-index: 5;
    }

    .label {
        font-size: 13px;
        margin:0;
        padding:0;
        text-align:left;
        position:absolute;
        color: #666;
        top: 2px;
        left: 2px;
        pointer-events: none;
    }

    .detail-chart {
        width:270px;
        height:calc(270px * 0.75);
        z-index:1000;
        margin-right: 2px;
        margin-bottom: 2px;
        padding: 10px 0 0 2px;
        background-color: rgba(234,234,234,.85);
        box-shadow: 0px 0px 15px 0px #00000018;
        position:absolute;
        pointer-events: none;
        transform: translate(-30%, -15%);
    }

    .description {
        width:270px;
        font-size:14px;
        line-height: 20px;
        font-weight: 300;
        padding:0;
        text-align:left;
        width: 70%;
        padding-left: 5px;
        padding-top: 2px;
        margin-bottom: -10px;
        margin-top: 0;
        position: absolute;
        top:10px;
        left:6px;
    }

    .country {
        font-size:18px;
        font-weight: 600;
    }

    .value {
        font-size:18px;
    }

    @media (max-width: 900px) {
        .label {
            font-size: 11px;
        }
        .pew-container {
            margin-top:0;
        }
    }
</style>