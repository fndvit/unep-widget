<script lang="ts">
    import GHGCartogram from './GHGCartogram.svelte';
    import LineChartWidget from './LineChartWidget.svelte';

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

<main>
    <div class="content">
        <div class="top-section">
            <div class="left-pane">
                <h1>Carbon dioxide emissions are choking the planet —
                    but contributions vary by
                    country</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, label legend A , label legend B ,
                    label legend C , sed diam nonummy nibh euismod tincidunt ut laoreet
                </p>
            </div>
            <div class="cartogram-container">
                <GHGCartogram />
            </div>
        </div>

        <div class="charts">
            <LineChartWidget data={getDataForCountry('CHN')} />
            <LineChartWidget data={getDataForCountry('USA')} />
            <LineChartWidget data={getDataForCountry('MYS')} />
            <LineChartWidget data={getDataForCountry('BRA')} />
        </div>
    </div>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');

    :global(body) {
        padding: 0;
    }

    main {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        margin-top: 100px;
        background-color: #F3F3F3;
    }

    .content {
        max-width: 1200px;
        margin: auto;
    }

    .top-section {
        display: flex;
    }

    .left-pane {
        width: 400px;
        text-align: left;
    }

    .left-pane h1 {
        color: #111;
        font-size: 34px;
        font-weight: 300;
        margin-bottom: 20px;
    }
    .left-pane p {
        font-size: 18px;
        line-height: 28px;
    }

    .cartogram-container {
        width: 800px;
        margin-top: -60px;
    }

    .cartogram-container :global(svg) {
        width: calc(100% + 50px);
    }

    .charts :global(svg) {
        width: 100%;
    }

    .charts {
        display: flex;
        gap: 40px;
    }
</style>