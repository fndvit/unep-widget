<script context="module" lang="ts">
    export enum ChartTextType {
        Largest,
        Increase,
        Decrease,
        PerCapita
    }
</script>

<script lang="ts">
    import MiniLineChart from "./MiniLineChart.svelte";
    import type { GHGData, YearlyTimeseriesDatum } from '../data';
    import {getGHGCategory, extractTimeseries, getCountryBaseData} from '../data';
    export let data: GHGData;
    export let chartTextType: number;

    const dummyText = "Lorem ipsum dolor sit amet, sed diam nonummy nibh, consectetuer";

    const timeseriesData = extractTimeseries(data);
    const category = getGHGCategory(timeseriesData);
    const country = getCountryBaseData(data.code);
    const latestYear = timeseriesData[timeseriesData.length-1].year;
    const lastFigure = timeseriesData[timeseriesData.length-1].value;
    const lastFigStr = Math.round(lastFigure).toLocaleString();

    function getChartText(data: GHGData, chartTextType: number) {
        switch (chartTextType) {
            case ChartTextType.Largest:
                return `<b>${country.name}</b> accounts for x% of global emissions. In ${latestYear}, it emitted ${lastFigStr} tonnes of CO2.`;
            case ChartTextType.Increase:
                return `CO2 emissions in <b>${country.name}</b> have risen x% since 1970. Today, it accounts for x% of global emissions.`;
            default:
                return `CO2 emissions in <b>${country.name}</b> have fallen x% since 1970. Today, it accounts for x% of global emissions.`;
        }
    }

</script>

<div>
    <MiniLineChart data={timeseriesData} category={category} />
    <h2>{lastFigStr}</h2>
    <p>{@html getChartText(data, chartTextType)}</p>
</div>

<style>
    h2 {
        text-align: left;
        font-size: 30px;
        line-height: 36px;
        font-weight: 300;
        color: #111;
        margin-bottom: 4px;
        margin-top: 0px;
    }

    p {
        text-align: left;
        margin-top:0;
        font-size: 16px;
        line-height: 24px;
    }

    p :global(b) {
        color:black;
        font-size: 18px;
        font-weight: 600;
    }

</style>