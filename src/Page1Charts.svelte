<script lang="ts">
    import { onMount } from 'svelte';
    import { ChartTextType } from './components/LineChartWidget.svelte';
    import LineChartWidget from './components/LineChartWidget.svelte';
    import { ghg, percapita, getCountryBaseData, endYear } from './data';
    import type { GHGData, PerCapitaData } from './data';
    import { createLookup } from './util';

    let ghgData: GHGData[];
    let percapitaData: PerCapitaData[];
    var chartData: GHGData[];

    function calcRelativeChange(d: GHGData, fromYear: number, toYear: number): number {
        const a = d.emissions[`${fromYear}`];
        const b = d.emissions[`${toYear}`];
        return (b - a) / a;
    }

    function getRandom(data: GHGData[]): GHGData {
        const r = Math.floor(Math.random() * data.length);
        return data[r];
    }

    onMount(async () => {
        ghgData = await ghg;
        percapitaData = await percapita;
        const useableCountries = ghgData
            .filter(c => getCountryBaseData(c.code))
            .filter(c => c.emissions[`${endYear}`] > 5) // TODO: wheredo we set the cutoff here?

        const largest10Emitters = useableCountries
            .sort((a, b) => b.emissions[`${endYear}`] - a.emissions[`${endYear}`])
            .slice(0, 10);

        const largest10EmittersCodes = largest10Emitters.map(d => d.code);

        const remainingCountries = useableCountries.filter(d => largest10EmittersCodes.indexOf(d.code) === -1)
        const dataWithRelChanges = remainingCountries.map<[GHGData, number]>(d => [d, calcRelativeChange(d, 1990, endYear)])

        const largest10Increase = [...dataWithRelChanges]
            .sort((a,b) => b[1] - a[1])
            .map(d => d[0])
            .slice(0, 10)

        const largest10Decrease = [...dataWithRelChanges]
            .sort((a,b) => a[1] - b[1])
            .map(d => d[0])
            .slice(0, 10)

        const usedCountryCodes = [...largest10Emitters, ...largest10Increase, ...largest10Decrease].map(d => d.code);

        const perCapitaLookup = createLookup(percapitaData, d => d.code, d => d.emissions_percapita)

        const largest10PerCapita = useableCountries
            .filter(d => usedCountryCodes.indexOf(d.code) === -1)
            .sort((a,b) => perCapitaLookup[b.code] - perCapitaLookup[a.code])
            .slice(0, 10)

        const _largest10PerCapita = percapitaData
            .sort((a,b) => b.emissions_percapita - a.emissions_percapita)

        chartData = [
            getRandom(largest10Emitters),
            getRandom(largest10Decrease),
            getRandom(largest10Increase),
            getRandom(largest10PerCapita),
        ];
    });

    </script>

{#if chartData && chartData.length === 4}
<LineChartWidget data={chartData[0]} chartTextType={ChartTextType.Largest}/>
<LineChartWidget data={chartData[1]} chartTextType={ChartTextType.Relative}/>
<LineChartWidget data={chartData[2]} chartTextType={ChartTextType.Relative}/>
<LineChartWidget data={chartData[3]} chartTextType={ChartTextType.PerCapita}/>
{/if}
