<script lang="ts" context="module">
    export enum Datasets {
        GHGTotal, GHGPerCapita, GHGTrends
    }
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import DemersCartogram from './DemersCartogram.svelte';
    import {ghg, percapita, startYear, endYear} from '../data';
    import type {GHGData, PerCapitaData } from '../data';
    import type { CountryDataPoint, TrendsDataset } from './DemersCartogram.svelte';
    import {default as countries} from '../data/countries.json';
    import CartogramLegend from './CartogramLegend.svelte';

    export var dataset: number = Datasets.GHGTotal;

    let loaded: boolean = false;

    var datasets: {[key: number]: CountryDataPoint[]};
    var trendsTimeseriesData: TrendsDataset[];

    const datasetParams = {
        [Datasets.GHGTotal]: {
            nodeSize: 80,
            domain: [740, 420],
            helpText: {
                code: "DEU",
                text: "Each square represents a country, scaled by its emissions"
            },
            hoverText: "<b>%country%</b> emitted %value% Mt <span>CO<sub>2</sub>e</span> in %year%"
        },
        [Datasets.GHGPerCapita]: {
            nodeSize: 38,
            domain: [740, 420],
            helpText: {
                code: "RUS",
                text: "Each square represents a country, scaled by its per capita emissions"
            },
            hoverText: "<b>%country%</b> emitted %value1dp% Mt <span>CO<sub>2</sub>e</span> per capita in %year%"
        },
        [Datasets.GHGTrends]: {
            nodeSize: 16,
            domain: [1350, 1350 / (740/435)],
            offset: [0, 0],
            helpText: {
                code: "UZB",
                text: "Each tile represents individual country trends in greenhouse gas emissions"
            }


        }
    }

    onMount(async () => {
        const ghgData = await ghg;
        const percapitaData = await percapita;

        let ghgDataLookup: {[code: string]: GHGData} = {};
        let percapitaDataLookup: {[code: string]: PerCapitaData} = {};

        ghgData.forEach(d => ghgDataLookup[d.code] = d);
        percapitaData.forEach(d => percapitaDataLookup[d.code] = d);


        let mockLineCharData = {};
        function* generateRange(end: number, start = 0, step = 1) {
            let x = start - step;
            while(x < end - step) yield x += step;
        }
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

        countries.forEach(d => {
            if (!ghgDataLookup[d.code]) console.warn(`Missing GHG data for ${d.name} (${d.code})`);
            if (!percapitaDataLookup[d.code]) console.warn(`Missing per capita data for ${d.name} (${d.code})`);
        })

        datasets = {
            [Datasets.GHGTotal]: countries
                .filter(d => ghgDataLookup[d.code]) // TODO: hack while we have inconsistent/mock data
                .map(d => {
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
            offset={datasetParams[dataset].offset || [0,0]}
            trendsMode={dataset === Datasets.GHGTrends}
            trendsTimeseriesData={trendsTimeseriesData}
            helpText={datasetParams[dataset].helpText}
            hoverText={datasetParams[dataset].hoverText}
        />
        <div class="legend">
            <CartogramLegend/>
        </div>
    </div>
{/if}

<style>
    .cartogram-container {
        box-sizing: border-box;
        padding-bottom: 20px;
        flex: 0 0 100%;
    }

    .legend {
        position: absolute;
        bottom: 0;
        left: 50px;
    }

</style>
