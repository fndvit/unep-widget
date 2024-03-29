<script context="module" lang="ts">
    export enum ChartTextType {
        Largest,
        Relative,
        PerCapita
    }
</script>

<script lang="ts">
    import MiniLineChart from "./MiniLineChart.svelte";
    import type { GHGData } from '../data';
    import {getCountryBaseData, globalEmissions, endYear} from '../data';
    import { onMount } from "svelte";
    export let data: GHGData;
    export let chartTextType: number;

    const country = getCountryBaseData(data.code);
    const latestYear = data.timeseries[data.timeseries.length-1].year;
    const lastFigure = data.timeseries[data.timeseries.length-1].value;
    const lastFigStr = Math.round(lastFigure).toLocaleString();
    var globalTotal: number;

    function getChartText(data: GHGData, _globalTotal: number, chartTextType: number) {
        const latestEmissions = data.emissions[`${endYear}`];
        const emissionShare = (latestEmissions / _globalTotal);
        const emissionPerc = (emissionShare * 100).toFixed(2);
        switch (chartTextType) {
            case ChartTextType.Largest:
                return `<b>${country.name}</b> is one of the top emitters accounting for ${emissionPerc}% of global GHG emissions. In ${latestYear}, it emitted ${lastFigStr} million tonnes.`;
            case ChartTextType.Relative:
            case ChartTextType.PerCapita:
                const change = data.emissions[`${endYear}`] / data.emissions['1990'];
                const fallen = change <= 1;
                const relChange = fallen ? 1-change : change-1;
                const percStr = Math.round(relChange * 100).toFixed(0);
                return `<b>${country.name}</b> has had one of the biggest ${fallen? 'drops' : 'increases'} in GHG emissions —${percStr}% since 1990. `
                    + `Today, it accounts for ${emissionPerc}% of global emissions.`;
        }
    }

    onMount(async () => {
        const _globalEmissions = await globalEmissions;
        globalTotal = _globalEmissions[endYear];
    });

    $: summary = globalTotal ? getChartText(data, globalTotal, chartTextType) : "";

</script>

<div>
    <MiniLineChart data={data.timeseries} category={data.category} />
    <h3 class="chart-figure">{lastFigStr} <span class='units'>million tonnes of GHG</span></h3>
    <p class="chart-summary">{@html summary}</p>
</div>

<style>
    .chart-figure {
        font-size: 24px;
        line-height: 32px;
        font-weight: 300;
        color: #111;
        margin-top: 0px;
        white-space: nowrap;
    }

    .chart-summary {
        margin: 0;
        font-size: 16px;
        line-height: 24px;
        font-weight:300;
    }

    .chart-summary :global(b) {
        color:black;
        font-size: 18px;
        font-weight: 600;
    }

    .units {
        font-size:16px;
    }

</style>