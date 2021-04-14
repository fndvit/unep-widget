<script lang="ts">
    import { group } from 'd3-array'
    import type { PewData } from '../data';
    import { pew } from '../data';
    import { onMount } from 'svelte';
    import MiniSurveyCharts from '../components/MiniSurveyCharts.svelte';
    let loaded: boolean = false;

    var dataset: PewData [];
    var groupByCountry = new Map();

    onMount(async () => {
        dataset = await pew;
        groupByCountry = group(dataset, d => d.country)
        loaded = true;        
    })
</script>

{#if loaded}
<div class="charts-container">
    <div class="mini-chart">
    {#each [ ...groupByCountry.values() ] as country}
        <MiniSurveyCharts
            data={country}
         />
    {/each}
    </div>
</div>
{/if}

<style>
    .charts-container {
        box-sizing: border-box;
        padding-bottom: 20px;
        flex: 0 0 100%;
    }

    .mini-chart {
        
    }
</style>