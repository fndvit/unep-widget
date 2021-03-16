<script lang="ts">
    import { onMount } from 'svelte';
    import {cri} from './data';
    import type {CRIData} from './data';
    import ClimateRiskViz from './components/ClimateRiskViz.svelte';

    let criData: CRIData[];

    onMount(async () => {
        criData = await cri;
    });

    function getRandomData() {
        const rand = Math.floor(criData.length * Math.random());
        return criData[rand];
    }

    </script>

{#if criData}
<div class="p2-charts">
    <ClimateRiskViz data={getRandomData()}/>
    <ClimateRiskViz data={getRandomData()}/>
    <ClimateRiskViz data={getRandomData()}/>
    <ClimateRiskViz data={getRandomData()}/>
</div>
{/if}

<style>


    .p2-charts:after {
        content: "";
        clear: both;
        display: table;
    }

    .p2-charts > :global(*) {
        float: left;
        width: calc(25% - 12px);
        margin-right: 16px;
    }

    .p2-charts > :global(*:last-child) {
        margin: 0;
    }

    .p2-charts :global(svg) {
        width: 100%;
    }

</style>