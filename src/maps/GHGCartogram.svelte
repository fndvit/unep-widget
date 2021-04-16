<script lang="ts" context="module">
    export enum Datasets {
        GHGTotal, GHGPerCapita, GHGTrends
    }
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import DemersCartogram from './DemersCartogram.svelte';
    import {ghg, percapita, startYear, endYear, getGHGCategory } from '../data';
    import type { GHGData } from '../data';
    import type { CountryDataPoint, TrendsDataset } from './DemersCartogram.svelte';
    import {default as countries} from '../data/countries.json';
    import CartogramLegend from './CartogramLegend.svelte';
    import { createLookup, displayVal, generateRange } from '../util';

    export var dataset: number = Datasets.GHGTotal;

    let loaded: boolean = false;

    var datasets: {[key: number]: CountryDataPoint[]};
    var trendsTimeseriesData: TrendsDataset[];
    var getCategory: (c: CountryDataPoint) => string;

    const legend = [
        { text: "Decreased since 1990", class: "falling" },
        { text: "Stable since 1990", class: "stable" },
        { text: "Still climbing", class: "climbing-fast" },
    ];

    const datasetParams = {
        [Datasets.GHGTotal]: {
            nodeSize: 80,
            domain: [740, 420],
            helpText: {
                code: "DEU",
                text: "Each square represents a country, scaled by its emissions"
            },
            hoverTextFn: (c: CountryDataPoint) => `<b>${c.name}</b> emitted ${displayVal(c.value, 0)} million tonnes of GHG in ${endYear}`
        },
        [Datasets.GHGPerCapita]: {
            nodeSize: 38,
            domain: [740, 420],
            helpText: {
                code: "RUS",
                text: "Each square represents a country, scaled by its per capita emissions"
            },
            hoverTextFn: (c: CountryDataPoint) => `<b>${c.name}</b> emitted ${displayVal(c.value, 1)} million tonnes of GHG per capita in ${endYear}`
        },
        [Datasets.GHGTrends]: {
            nodeSize: 16,
            domain: [1350, 1350 / (740/435)],
            helpText: {
                code: "UZB",
                text: "Each tile represents individual country trends in greenhouse gas emissions"
            }
        }
    }

    onMount(async () => {
        const ghgData = await ghg;
        const percapitaData = await percapita;

        const ghgDataLookup = createLookup(ghgData, d => d.code, d => d);
        const percapitaDataLookup = createLookup(percapitaData, d => d.code, d => d);

        function createLineChartData(d: GHGData) {
            const years = Array.from(generateRange(endYear+1, startYear));
            return years.map(year => {
                return {year, value:Math.max(0, d.emissions[year])}
            });
        }

        trendsTimeseriesData = ghgData.map(d => {
            return {
                code: d.code, data:createLineChartData(d)
            };
        })

        const trendsTimeseriesLookup = createLookup(trendsTimeseriesData, d => d.code, d => d.data);
        getCategory = c => getGHGCategory(trendsTimeseriesLookup[c.code]);

        countries.forEach(d => {
            if (!ghgDataLookup[d.code]) console.warn(`Missing GHG data for ${d.name} (${d.code})`);
            if (!percapitaDataLookup[d.code]) console.warn(`Missing per capita data for ${d.name} (${d.code})`);
        })

        datasets = {
            [Datasets.GHGTotal]: countries
                .filter(d => ghgDataLookup[d.code]) // TODO: hack while we have inconsistent/mock data
                .map(d => {
                    console.log(d.code, ghgDataLookup[d.code].emissions[`${endYear}`])
                    return {
                        ...d, ...d.total,
                        value: ghgDataLookup[d.code].emissions[`${endYear}`]
                    }
                }),
            [Datasets.GHGPerCapita]: countries
                .filter(d => percapitaDataLookup[d.code] && ghgDataLookup[d.code]) // TODO: hack while we have inconsistent/mock data
                .map(d => {
                    return {
                        ...d, ...d.percapita,
                        value: percapitaDataLookup[d.code].emissions_percapita,
                    }
                }),
            [Datasets.GHGTrends]: countries
                .filter(d => ghgDataLookup[d.code])
                .map(d => {
                    return { ...d, ...d.trends, value: 5 }
                })
        }

        loaded = true;
	});

</script>

{#if loaded}
    <div class="cartogram-container">
        <DemersCartogram data={datasets[dataset]}
            nodeSize={datasetParams[dataset].nodeSize}
            domain={datasetParams[dataset].domain}
            trendsMode={dataset === Datasets.GHGTrends}
            trendsTimeseriesData={trendsTimeseriesData}
            helpText={datasetParams[dataset].helpText}
            hoverTextFn={datasetParams[dataset].hoverTextFn}
            hideLabels={dataset === Datasets.GHGPerCapita}
            categoryFn={getCategory}
        />
        <div class="legend-container">
            <CartogramLegend categories={legend}/>
        </div>
    </div>
{/if}

<style>
    .cartogram-container {
        box-sizing: border-box;
        flex: 0 0 100%;
        display: flex;
        flex-direction: column;
    }

    .legend-container {
        padding-left: 50px;
    }
    @media (max-width: 900px) {
        .legend-container {
            padding-left: 10px;
        }
    }

</style>
