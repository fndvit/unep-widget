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
    import tmpData from '../data/ghgdata-tmp.json';

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
            nodeSize: 100,
            width: 900,
            xOffset: -100
        },
        [Datasets.GHGPerCapita]: {
            nodeSize: 38,
            width: 900,
            xOffset: -100
        },
        [Datasets.GHGTrends]: {
            nodeSize: 16,
            width: 600,
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
        var startYear = 1950;
        var endYear = 2015;
        function createLineChartData(d) {
            const years = Array.from(generateRange(endYear, startYear));
            return years.map(year => {
                return {year, value:Math.max(0, d[year])}
            });
        }

        trendsTimeseriesData = tmpData.map(d => {
            return {
                code: d.code, data:createLineChartData(d)
            };
        })


        datasets = {
            [Datasets.GHGTotal]: countries
                .map(d => {
                    return {
                        ...d, ...d.total,
                        value: ghgDataLookup[d.code]['2015'],
                    }
                }),
            [Datasets.GHGPerCapita]: countries
                .filter(d => percapitaDataLookup[d.code]) // TODO: hack while we have inconsistent/mock data
                .map(d => {
                    return {
                        ...d, ...d.percapita,
                        value: percapitaDataLookup[d.code]['percapita2017'],
                    }
                }),
            [Datasets.GHGTrends]: countries
                .map(d => {
                    return { ...d, ...d.trends, value: 5 }
                })
        }



        loaded = true;

	});

</script>

{#if loaded}
    <DemersCartogram data={datasets[dataset]}
        nodeSize={datasetParams[dataset].nodeSize}
        datasetWidth={datasetParams[dataset].width}
        xOffset={datasetParams[dataset].xOffset}
        trendsMode={dataset === Datasets.GHGTrends}
        trendsTimeseriesData={trendsTimeseriesData}
    />
{/if}

