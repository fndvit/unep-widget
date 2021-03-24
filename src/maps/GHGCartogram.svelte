<script lang="ts" context="module">
    export enum Datasets {
        GHGTotal, GHGPerCapita, GHGTrends
    }
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import DemersCartogram from './DemersCartogram.svelte';
    import {ghg, percapita} from '../data';
    import type {GHGData, PerCapitaData} from '../data';
    import type { CountryDataPoint, TrendsDataset } from './DemersCartogram.svelte';
    import {default as countries} from '../data/countries.json';
    import CartogramLegend from './CartogramLegend.svelte';

    export var dataset: number = Datasets.GHGTotal;

    let loaded: boolean = false;

    var datasets: {[key: number]: CountryDataPoint[]};
    var trendsTimeseriesData: TrendsDataset[];

    function mergeDatasets(baseCountries, data: [{code:string, value: number}]) {
        // here we're taking the base country data and adding:
        // - appropriate x, y and value data for the cartogram node size & position
    }

    const datasetParams = {
        [Datasets.GHGTotal]: {
            nodeSize: 81,
            domain: [740, 420],
            helpText: {
                code: "IRL",
                text: "Each square is a country, sized by their <b>greenhouse gas</b> emissions"
            }
        },
        [Datasets.GHGPerCapita]: {
            nodeSize: 34,
            domain: [740, 420],
            helpText: {
                code: "JPN",
                text: "Each square is a country, sized by their per capita <b>greenhouse gas</b> emissions"
            }
        },
        [Datasets.GHGTrends]: {
            nodeSize: 16,
            domain: [1350, 1350 / (740/435)],
            offset: [0, 0],
            helpText: {
                code: "PRK",
                text: "Each tile shows the country's trend in <b>greenhouse gas</b> emissions since 1950"
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
        var startYear = 1970;
        var endYear = 2018;
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
                        value: ghgDataLookup[d.code].emissions['2018']
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
    <div class="container">
        <DemersCartogram data={datasets[dataset]}
            nodeSize={datasetParams[dataset].nodeSize}
            domain={datasetParams[dataset].domain}
            offset={datasetParams[dataset].offset || [0,0]}
            trendsMode={dataset === Datasets.GHGTrends}
            trendsTimeseriesData={trendsTimeseriesData}
            helpText={datasetParams[dataset].helpText}
        />
        <div class="legend">
            <CartogramLegend/>
        </div>
    </div>
{/if}

<style>
    .container {
        position: relative;
        height: 420px;
    }
    .legend {
        position: absolute;
        bottom: 0;
        left: 50px;
    }
</style>
