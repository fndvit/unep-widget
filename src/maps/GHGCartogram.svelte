<script lang="ts" context="module">
    export enum Datasets {
        GHGTotal, GHGPerCapita
    }
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import DemersCartogram from './DemersCartogram.svelte';
    import {ghg, percapita} from '../data';
    import type {GHGData, PerCapitaData} from '../data';
    import type { CountryDataPoint } from './DemersCartogram.svelte';
    import {default as coords} from '../data/coords.json';

    export var dataset: number = Datasets.GHGTotal;

    let loaded: boolean = false;

    var datasets: {[key: number]: CountryDataPoint[]};

    const scaling = {
        [Datasets.GHGTotal]: 100,
        [Datasets.GHGPerCapita]: 38
    };

    onMount(async () => {
        const ghgData = await ghg;
        const percapitaData = await percapita;

        let ghgDataLookup: {[code: string]: GHGData} = {};
        let percapitaDataLookup: {[code: string]: PerCapitaData} = {};

        ghgData.forEach(d => ghgDataLookup[d.code] = d);
        percapitaData.forEach(d => percapitaDataLookup[d.code] = d);

        datasets = {
            [Datasets.GHGTotal]: coords.map(d => {
                return {
                    ...d,
                    ...d.total,
                    value: ghgDataLookup[d.code]['2015']
                }
            }),
            [Datasets.GHGPerCapita]: coords
                .filter(d => percapitaDataLookup[d.code]) // TODO: hack while we have inconsistent/mock data
                .map(d => {
                    return {
                        ...d,
                        ...d.percapita,
                        value: percapitaDataLookup[d.code]['percapita2017']
                    }
                })
        }



        loaded = true;

	});

</script>

{#if loaded}
    <DemersCartogram data={datasets[dataset]} nodeSize={scaling[dataset]}/>
{/if}

