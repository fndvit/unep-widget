<script lang="ts">
    import MainViz from './components/MainViz.svelte';
    import Page1Charts from './Page1Charts.svelte';
    import SubNav from './components/SubNav.svelte';
    import ChartsContainer from './components/ChartsContainer.svelte';
    import GHGCartogram from './maps/GHGCartogram.svelte';
    import {default as copy} from './data/copy.json';
    import {Datasets} from './maps/GHGCartogram.svelte';
    import svg from './svg';
    import ScrollableCopyPane from './components/ScrollableCopyPane.svelte';
    import ScrollableX from './components/ScrollableX.svelte';

    const sections = [
        {
            text: "Total emissions", icon: svg.stateoftheclimate.emissions, // nav menu
            copy: copy.state.total, // section copy
            dataset: Datasets.GHGTotal
        },
        {
            text: "Per capita emissions", icon: svg.stateoftheclimate.percapita,
            copy: copy.state.percapita, // section copy
            dataset: Datasets.GHGPerCapita
        },
        {
            text: "Country trends", icon: svg.stateoftheclimate.trends,
            copy: copy.state.trend, // section copy
            dataset: Datasets.GHGTrends
        },
    ]

    let selectedSection = sections[0];

</script>

<SubNav bind:selected={selectedSection} options={sections} />

<div class="top-section">
    <div class="p1-copy">
        <ScrollableCopyPane {...selectedSection.copy} />
    </div>

    <div class="cartogram-pane">
        <ScrollableX>
            <GHGCartogram dataset={selectedSection.dataset} />
        </ScrollableX>
    </div>
</div>


<div class="p1-chart-pane">
    <h2 class="chart-section-title">Top emitters, rises and drops since 1990</h2>
    <ScrollableX>
        <div class="p1-charts">
            <Page1Charts/>
        </div>
    </ScrollableX>
</div>

<style>
    .top-section {
        display: flex;
        position: relative;
        height: 400px;
    }

    .cartogram-pane {
        display: flex;
        width: 700px;
        position: relative;
        box-sizing: border-box;
    }

    .cartogram-pane:hover {
        z-index: 2;
    }

    .cartogram-pane > :global(.cartogram-container) {
        flex: 0 0 100%;
    }

    .cartogram-pane :global(svg) {
        width: 100%;
    }
    .cartogram-pane :global(.scrollable) {
        width: 100%;
    }

    .cartogram-pane :global(.cartogram-container) {
        min-width: 500px;
    }

    .cartogram-pane :global(.scrollable-content) {
        flex: 0 0 100%;
        display: flex;
    }

    .p1-copy {
        width: 450px;
        display: flex;
        padding-left: 12px;
        box-sizing: border-box;
    }

    .p1-charts {
        display: flex;
        justify-content: space-between;
        min-width: 1000px;
    }

    .p1-charts > :global(*) {
        flex: 1 1 25%;
        padding: 0 12px;
    }

    .p1-charts :global(svg) {
        width: 100%;
        box-sizing: border-box;
    }

    .chart-section-title {
        font-size: 14px;
        margin: 0;
        margin-top: 12px;
        margin-bottom: -5px;
        padding-left: 12px;
        color: black;
        text-align: left;
        position: relative;
        z-index: 6;
    }

    @media (min-width: 1300px) {
        .cartogram-pane {
            /* right-side overflow to enlarge cartogram when we have space */
            margin-right: -100px;
        }
    }

    @media (max-width: 1400px) {
        .top-section {
            height: 360px;
        }
        .p1-charts :global(.chart-summary) {
            font-size: 14px;
        }
    }



    @media (max-width: 900px) {

        .top-section {
            display: block;
            height: auto;
        }

        .cartogram-pane {
            height: 320px;
            width: 100%;
        }

        .p1-copy {
            width: auto;
            padding-right: 20%;
        }
        .p1-copy :global(h1) {
            font-size: 24px;
            line-height: 30px;
            margin-top: 10px;
            font-weight: 500;
        }
        .p1-copy :global(p) {
            display: none;
        }
    }



    @media (max-width: 600px) {

        /* TODO: tmp disabled annotations for mobile */
        .cartogram-pane :global(.annotation) {
            display: none;
        }
        .p1-copy {
            padding-right: 20px;
        }
        .p1-copy :global(h1) {
            font-weight: 300;
        }

        :global(.p1-chart-pane .chart-figure) {
            display: none;
        }
    }

</style>