<script lang="ts">
    import { onMount } from 'svelte';
    import {cri, getCountryBaseData} from './data';
    import type {CRIData} from './data';
    import ClimateRiskViz from './components/ClimateRiskViz.svelte';

    let criData: CRIData[];
    // var useableData: CRIData[];

    onMount(async () => {
        criData = await cri;
        // useableData = criData.filter(c => getCountryBaseData(c.code));
    });

    function getRandom(arr: any[]) {
        const rand = Math.floor(arr.length * Math.random());
        return arr[rand];
    }

    </script>

{#if criData}
<div class="p2-charts">
    <div class="test">
        <h2>How each country's climate risk compares</h2>
        <div>
            <span>Climate risk index</span>
            <span>Fatalities per 100K people</span>
            <span>Losses as pct. of GDP</span>
        </div>
    </div>
    <div class="charts">
        <ClimateRiskViz data={getRandom(criData)} header={true}/>
        <ClimateRiskViz data={getRandom(criData)}/>
        <ClimateRiskViz data={getRandom(criData)}/>
        <ClimateRiskViz data={getRandom(criData)}/>
    </div>
</div>
{/if}

<style>
    .test {
        width: 165px;
        height: 500px;
        font-size: 14px;
        text-align: left;
        position: relative;
    }

    .test h2 {
        font-size: 14px;
        margin: 0;
        position: absolute;
        bottom: 100%;
        margin-bottom: 8px;
        color: #000;
    }
    .test span {
        line-height: 24px;
        white-space: nowrap;
        position: relative;
        /* display: inline-block; */
        top: -1px;
        width: 165px;
        display: flex;
    }
    /* .test span:after {
        content: "";
        top: 11px;
        flex-grow: 1;
        position: relative;
        top: 11px;
        border-top: 1px solid #ddd;
    } */

    .p2-charts {
        padding-top: 60px;
        display: flex;
    }

    .charts {
        flex-grow: 1;
        float: left;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .charts > :global(*) {
        width: 200px;
    }

    .charts > :global(*:last-child) {
        margin: 0;
    }

    .charts :global(svg) {
        width: 100%;
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