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
    import {getGHGCategory, extractTimeseries, getCountryBaseData, globalEmissions, endYear} from '../data';
    import { onMount } from "svelte";
    export let data: GHGData;
    export let chartTextType: number;

    const timeseriesData = extractTimeseries(data);
    const category = getGHGCategory(timeseriesData);
    const country = getCountryBaseData(data.code);
    const latestYear = timeseriesData[timeseriesData.length-1].year;
    const lastFigure = timeseriesData[timeseriesData.length-1].value;
    const lastFigStr = Math.round(lastFigure).toLocaleString();
    var globalTotal: number;

    function getChartText(data: GHGData, _globalTotal: number, chartTextType: number) {
        const latestEmissions = data.emissions[`${endYear}`];
        const emissionShare = (latestEmissions / _globalTotal);
        const emissionPerc = (emissionShare * 100).toFixed(2);
        switch (chartTextType) {
            case ChartTextType.Largest:
                return `<b>${country.name}</b> accounts for ${emissionPerc}% of global GHG emissions. In ${latestYear}, it emitted ${lastFigStr} million tonnes.`;
            case ChartTextType.Relative:
            case ChartTextType.PerCapita:
                const change = data.emissions[`${endYear}`] / data.emissions['1990'];
                const fallen = change <= 1;
                const relChange = fallen ? 1-change : change-1;
                const percStr = Math.round(relChange * 100).toFixed(0);
                return `GHG emissions in <b>${country.name}</b> have ${fallen? 'fallen' : 'risen'} ${percStr}% since 1990. `
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
    <MiniLineChart data={timeseriesData} category={category} />
    <h3 class="chart-figure">{lastFigStr}</h3>
    <p class="chart-summary">{@html summary}</p>
</div>

<style>
    .chart-figure {
        text-align: left;
        font-size: 24px;
        line-height: 32px;
        font-weight: 300;
        color: #111;
        margin-bottom: 4px;
        margin-top: 0px;
    }

    .chart-summary {
        text-align: left;
        margin-top:0;
        font-size: 16px;
        line-height: 24px;
        font-weight:300;
    }

    .chart-summary :global(b) {
        color:black;
        font-size: 18px;
        font-weight: 600;
    }

</style>