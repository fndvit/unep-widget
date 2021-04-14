<script lang="ts">
    import { groups } from 'd3-array';
    import * as d3 from '../d3';
    import type { PewData } from '../data';
    import { pew } from '../data';
    import { onMount } from 'svelte';
    import MiniSurveyCharts from '../components/MiniSurveyCharts.svelte';
import AnnotatedImage from './AnnotatedImage.svelte';

    let loaded: boolean = false;
    let width: number = 100;
    $: tileWidth = width * .1;

    var dataset: PewData [];
    let groupByCountry;

    onMount(async () => {
        dataset = await pew;
        dataset.forEach(d => d.year = d3.timeParse("%m/%Y")(d.year))
        let dataFiltered = dataset.filter(d => d.value !== null)
        groupByCountry = groups(dataFiltered, d => d.country).map(d => d[1]);
        console.log(groupByCountry.sort((a,b) => b[b.length - 1].value - a[a.length - 1].value ))
        loaded = true;        
    })
</script>

{#if loaded}
<div class="charts-container" bind:clientWidth={width}>
    {#each groupByCountry as country}
    <div class="mini-chart">
        <p class="label">{country[0].country}</p>
        <MiniSurveyCharts
            data={country}
            width={tileWidth}
         />
    </div>
    {/each}

</div>
{/if}

<style>
    .charts-container {
        box-sizing: border-box;
        padding-bottom: 20px;
        flex: 0 0 100%;
        text-align: left;
        padding-left: 20px;
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

    .label {
        font-size: 13px;
        margin:0;
        padding:0;
        text-align:left;
        position:absolute;
        color: #808080;
        top: 2px;
        left: 2px;
    }

    @media (max-width: 900px) {
        .label {
            font-size: 11px;
        }
    }
</style>