<script lang="ts">
    import LineChartWidget from './components/LineChartWidget.svelte';
    import {default as rawData } from './data/ghgdata-full.json';

    function getDataForCountry(code: string) {
        function* generateRange(end: number, start = 0, step = 1) {
            let x = start - step;
            while(x < end - step) yield x += step;
        }

        const data = rawData.find(c => c.code === code)
        const years = Array.from(generateRange(2016, 1950));
        return years.map(year => {
            return {
                year, value: data[year]
            };
        });
    }
    </script>

<div class="charts">
    <div class="charts-row">
        <LineChartWidget data={getDataForCountry('CHN')} headlineFigure="67.1%" text="China's CO2 emissions have risen by 67.12% since 2005" />
        <LineChartWidget data={getDataForCountry('USA')} />
        <LineChartWidget data={getDataForCountry('MYS')} />
        <LineChartWidget data={getDataForCountry('BRA')} />
    </div>
</div>

<style>
    .charts {
        position: relative;
        z-index: 5;
        padding-left: 20px;
    }

    .charts :global(svg) {
        width: 100%;
    }

    .charts-row:after {
        content: "";
        clear: both;
        display: table;
    }

    .charts-row > :global(*) {
        float: left;
        width: calc(25% - 12px);
        margin-right: 16px;
    }

    .charts-row > :global(*:last-child) {
        margin: 0;
    }

</style>