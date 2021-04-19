<script lang="ts">
    import { onMount } from 'svelte';
    import {cri, getCountryBaseData} from './data';
    import type {CRIData} from './data';
    import ClimateRiskViz from './components/ClimateRiskViz.svelte';

    let criData: CRIData[];
    // var useableData: CRIData[];

    onMount(async () => {
        criData = await cri;
    });

    function getRandom(arr: any[]) {
        const rand = Math.floor(arr.length * Math.random());
        return arr[rand];
    }

    </script>

{#if criData}
<div class="p2-chart-container">
    <div class="p2-charts-leftpane p2-charts-leftpane--large">
        <h3>How each country's climate risk compares</h3>
        <div>
            <span>Climate risk index</span>
            <span>Fatalities per 100K people</span>
            <span>Losses as pct. of GDP</span>
        </div>
    </div>
    <div class="p2-charts-leftpane p2-charts-leftpane--small">
        <h3>Country’s clim. risk rank in ’19</h3>
        <div>
            <span>Clim. risk ind.</span>
            <span>Deaths per 100K</span>
            <span>Loss % GDP</span>
        </div>
    </div>
    <div class="p2-charts">
        <ClimateRiskViz data={getRandom(criData)} header={true}/>
        <ClimateRiskViz data={getRandom(criData)}/>
        <ClimateRiskViz data={getRandom(criData)}/>
        <ClimateRiskViz data={getRandom(criData)}/>
    </div>
</div>
{/if}

<style>
    .p2-charts-leftpane {
        font-size: 14px;
        position: relative;
        flex: 0;
    }

    .p2-charts-leftpane h3 {
        font-size: 14px;
        margin: 0;
        position: absolute;
        bottom: 100%;
        margin-bottom: 8px;
        color: #000;
    }
    .p2-charts-leftpane span {
        line-height: 24px;
        white-space: nowrap;
        position: relative;
        top: -1px;
        display: flex;
        background: #f3f3f3;
        display: inline-block;
        padding-right: 5px;
    }
    .p2-chart-container {
        padding-top: 60px;
        display: flex;
    }

    .p2-charts {
        flex-grow: 1;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .p2-charts > :global(*) {
        width: 200px;
        margin: 0 12px;
    }

    .p2-charts > :global(*:last-child) {
        margin: 0;
    }

    .p2-charts :global(svg) {
        width: 100%;
    }
    .p2-charts > :global(*:first-child svg) {
        width: calc(100% + 100px);
        margin-left: -100px;
    }

    .p2-charts-leftpane--large {
        display: none;
    }
    .p2-charts-leftpane--large h3 { max-width: 140px; }
    .p2-charts-leftpane--small h3 { max-width: 100px; }

    @media (min-width: 500px) {
        .p2-charts-leftpane--small { display: none; }
        .p2-charts-leftpane--large { display: block; }
    }



</style>


<!-- <style type = 'text/css'>
    .flex { display: flex; flex-direction: row; justify-content: space-between; width: 800px; border: 1px solid gray; padding: 4px;}
    .flex div { border: 1px solid gray; padding: 4px; background: #A4F2D8; font-family: verdana; font-size: 19px; text-align: center; color: gray; }
</style>
<div class = 'flex'>
    <div style = 'width: 50px; height: 30px'>1</div>
    <div style = 'width: 50px; height: 30px'>2</div>
    <div style = 'width: 50px; height: 30px'>3</div>
</div> -->