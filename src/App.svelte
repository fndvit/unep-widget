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
                    Lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit, label legend A, label legend B, label
                    legend C, sed diam nonummy nibh euismod
                    tincidunt ut laoreet Lorem ipsum dolor sit amet,
                    consectetuer adipiscing elit, sed diam nonumm
                </p>
            </div>
            <div class="cartogram-container">
                <GHGCartogram />
                <div class="cartogram-legend">
                    <div class="legend-item legend-item--climbing">Climbing</div>
                    <div class="legend-item legend-item--decreasing">Decreasing</div>
                    <div class="legend-item legend-item--stable">Stable emissions</div>
                </div>
            </div>
        </div>

        <div class="charts">
            <div class="charts-row">
                <LineChartWidget data={getDataForCountry('CHN')} headlineFigure="67.12%" text="China's CO2 emissions have risen by 67.12% since 2005" />
                <LineChartWidget data={getDataForCountry('USA')} />
                <LineChartWidget data={getDataForCountry('MYS')} />
                <LineChartWidget data={getDataForCountry('BRA')} />
            </div>
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
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        margin-top: 100px;
        background-color: #F3F3F3;
        padding-bottom: 30px;
        padding-top: 20px;
    }

    .content {
        max-width: 1200px;
        margin: auto;
        position: relative;
    }

    .top-section {
        /* display: flex; */
        position: relative;
        height: 430px;
    }

    .left-pane {
        width: 450px;
        text-align: left;
        position: absolute;
    }

    .left-pane h1 {
        color: #111;
        font-size: 38px;
        font-weight: 300;
        margin-bottom: 20px;
    }
    .left-pane p {
        font-size: 18px;
        line-height: 28px;
    }

    .cartogram-container {
        width: 700px;
        margin-top: -80px;
        position: absolute;
        left: 500px;
    }

    .cartogram-container :global(svg) {
        width: calc(100% + 50px);
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
        width: calc(25% - 6px);
        margin-right: 8px;
    }

    .charts-row > :global(*:last-child) {
        margin: 0;
    }

    .cartogram-legend {
        position: absolute;
        left: 40px;
        top: 485px;
    }

    .legend-item {
        display: inline-block;
        margin-right: 12px;
    }

    .legend-item:before {
        content: '';
        display: inline-block;
        width: 18px;
        height: 18px;
        margin-right: 5px;
        border-radius: 5px;
        margin-bottom: -2px;
    }
    .legend-item--climbing:before { background-color: #FD7D2E; }
    .legend-item--decreasing:before { background-color: #00AACC; }
    .legend-item--stable:before { background-color: #BEC7CD; }

</style>