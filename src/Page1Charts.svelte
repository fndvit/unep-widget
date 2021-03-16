<script lang="ts">
    import { onMount } from 'svelte';
    import LineChartWidget from './components/LineChartWidget.svelte';
    import {ghg, getGHGCategory} from './data';
    import type {GHGData, YearlyTimeseriesDatum} from './data';

    let ghgData: GHGData[];
    var test_data: YearlyTimeseriesDatum[][];

    onMount(async () => {
        ghgData = await ghg;
        test_data = [
            getDataForCountry('CHN'),
            getDataForCountry('USA'),
            getDataForCountry('MYS'),
            getDataForCountry('BRA')
        ];
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
    <LineChartWidget data={test_data[0]} category={getGHGCategory(test_data[0])} headlineFigure="67.1%" text="China's CO2 emissions have risen by 67.12% since 2005" />
    <LineChartWidget data={test_data[1]} category={getGHGCategory(test_data[1])}  />
    <LineChartWidget data={test_data[2]} category={getGHGCategory(test_data[2])}  />
    <LineChartWidget data={test_data[3]} category={getGHGCategory(test_data[3])}  />
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