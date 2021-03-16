<script lang="ts">
    import { onMount } from 'svelte';
    import LineChartWidget from './components/LineChartWidget.svelte';
    import {ghg} from './data';
    import type {GHGData} from './data';

    let ghgData: GHGData[];

    onMount(async () => {
        ghgData = await ghg;
    });

    function getDataForCountry(code: string) {
        function* generateRange(end: number, start = 0, step = 1) {
            let x = start - step;
            while(x < end - step) yield x += step;
        }

        const data = ghgData.find(c => c.code === code)
        const years = Array.from(generateRange(2016, 1950));
        return years.map(year => {
            return {
                year, value: data[year]
            };
        });
    }
    </script>

{#if ghgData}
<div class="p1-charts">
    <LineChartWidget data={getDataForCountry('CHN')} headlineFigure="67.1%" text="China's CO2 emissions have risen by 67.12% since 2005" />
    <LineChartWidget data={getDataForCountry('USA')} />
    <LineChartWidget data={getDataForCountry('MYS')} />
    <LineChartWidget data={getDataForCountry('BRA')} />
</div>
{/if}

<style>


    .p1-charts:after {
        content: "";
        clear: both;
        display: table;
    }

    .p1-charts > :global(*) {
        float: left;
        width: calc(25% - 12px);
        margin-right: 16px;
    }

    .p1-charts > :global(*:last-child) {
        margin: 0;
    }

    .p1-charts :global(svg) {
        width: 100%;
    }

</style>