<script lang="ts">
    import { onMount } from 'svelte';
    import {ChartTextType} from './components/LineChartWidget.svelte';
    import LineChartWidget from './components/LineChartWidget.svelte';
    import {ghg, getGHGCategory, getCountryBaseData} from './data';
    import type {GHGData, YearlyTimeseriesDatum} from './data';

    let ghgData: GHGData[];
    var chartData: GHGData[];

    function calcRelativeChange(d: GHGData, fromYear: number, toYear: number): number {
        const a = d.emissions[`${fromYear}`];
        const b = d.emissions[`${toYear}`];
        console.log(`${d.code} ${(b - a) / a}`);
        return (b - a) / a;
    }

    function getRandom(data: GHGData[]): GHGData {
        const r = Math.floor(Math.random() * data.length);
        return data[r];
    }

    onMount(async () => {
        ghgData = await ghg;
        const useableCountries = ghgData
            .filter(c => getCountryBaseData(c.code))
            .filter(c => c.emissions['2018'] > 1000) // TODO: wheredo we set the cutoff here?

        const dataWithRelChanges = useableCountries.map<[GHGData, number]>(d => [d, calcRelativeChange(d, 1970, 2018)])

        const largest10Emitters = useableCountries
            .sort((a, b) => b.emissions['2018'] - a.emissions['2018'])
            .slice(0, 10);

        const largest10Increase = [...dataWithRelChanges]
            .sort((a,b) => b[1] - a[1])
            .map(d => d[0])
            .slice(0, 10)

        const largest10Decrease = [...dataWithRelChanges]
            .sort((a,b) => a[1] - b[1])
            .map(d => d[0])
            .slice(0, 10)

        chartData = [
            getRandom(largest10Emitters),
            getRandom(largest10Decrease),
            getRandom(largest10Increase),
            getRandom(largest10Increase),
        ];
    });

    </script>

{#if ghgData}
<div class="p1-charts">
    <LineChartWidget data={chartData[0]} chartTextType={ChartTextType.Largest}/>
    <LineChartWidget data={chartData[1]} chartTextType={ChartTextType.Decrease}/>
    <LineChartWidget data={chartData[2]} chartTextType={ChartTextType.Increase}/>
    <LineChartWidget data={chartData[3]} chartTextType={ChartTextType.PerCapita}/>
</div>
{/if}

<style>

    .p1-charts {
        display: flex;
        justify-content: space-between;
    }

    .p1-charts > :global(*) {
        width: 250px;
    }

    .p1-charts :global(svg) {
        width: 100%;
    }

</style>