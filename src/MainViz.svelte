<script lang="ts">
    import type { SvelteComponent } from "svelte";
    import MainNav from './components/MainNav.svelte';
    import type { MenuOption } from './components/MainNav.svelte';
    import svg from './svg';
    import Footer from './components/Footer.svelte';
    import { copy } from './data';
    import GhgCartogram, { Datasets } from './maps/GHGCartogram.svelte';
    import SubNav from './components/SubNav.svelte';
    import ScrollableX from './components/ScrollableX.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import Page1Charts from './Page1Charts.svelte';
    import Page2Carto from './Page2Carto.svelte';
    import Page3Charts from './Page3Charts.svelte';
    import Page2Charts from './Page2Charts.svelte';
    import NdcCartogram from './maps/NDCCartogram.svelte';

    interface Section extends MenuOption {
        copy: {
            title: string;
            summary: string;
        };
        dataset?: number;
        class?: string;
    }

    interface Page extends MenuOption {
        sections: Section[];
        class: string;
        bottomSectionTitle?: string;
        bottomComponent: typeof SvelteComponent;
    }

    const pages: Page[] = [
        {
            text: "State of the climate",
            icon: svg.stateoftheclimate.main,
            class: "sotc",
            bottomSectionTitle: "Top emitters and country trends since 1990",
            bottomComponent: Page1Charts,
            sections: [
                {
                    text: "Total emissions",
                    icon: svg.stateoftheclimate.emissions,
                    copy: copy.state.total,
                    dataset: Datasets.GHGTotal
                },
                {
                    text: "Per capita emissions",
                    icon: svg.stateoftheclimate.percapita,
                    copy: copy.state.percapita,
                    dataset: Datasets.GHGPerCapita
                },
                {
                    text: "Country trends",
                    icon: svg.stateoftheclimate.trends,
                    copy: copy.state.trend,
                    dataset: Datasets.GHGTrends
                },
            ]
        },
        {
            text: "What's happening",
            icon: svg.whatshappening.main,
            class: "whatshappening",
            bottomComponent: Page2Charts,
            sections: [
                {
                    text: "Land temperature",
                    icon: svg.whatshappening.surface,
                    copy: copy.happening.surface,
                    class: 'temp'
                },
                {
                    text: "Ocean temperature",
                    icon: svg.whatshappening.ocean,
                    copy: copy.happening.ocean,
                    class: 'ocean'
                },
                {
                    text: "Fires",
                    icon: svg.whatshappening.fire,
                    copy: copy.happening.fire,
                    class: 'fires'
                }
            ]
        },
        {
            text: "Climate action progress",
            icon: svg.climateactionprogress.main,
            class: "cap",
            bottomSectionTitle: "Countries' GHG emission targets",
            bottomComponent: Page3Charts,
            sections: [
                {
                    text: "NDC submissions",
                    icon: svg.climateactionprogress.ndc,
                    copy: copy.progress.ndcs,
                },
                {
                    text: "Public opinion",
                    icon: svg.climateactionprogress.opinion,
                    copy: copy.progress.public,
                }
            ]
        },
    ];

    let selectedPage = pages[0];
    let selectedSection = selectedPage.sections[0];

    function onMenuChange(option: Page) {
        // go to spash or change page
        // change page for now
        selectedPage = option;
        selectedSection = selectedPage.sections[0];
        window.setTimeout(() => document.dispatchEvent(new CustomEvent('content-resize')), 0);
    }

</script>

<div class="content content--{selectedPage.class}">

    <div class="navcontainer">
        <MainNav options={pages} bind:selected={selectedPage} onchange={onMenuChange} />
    </div>

    <SubNav bind:selected={selectedSection} options={selectedPage.sections} />

    <div class="top-section">

        <div class="copy-container">
            <CopyPane {...selectedSection.copy} />
        </div>

        <div class="cartogram-pane">
            {#if selectedPage.text === "State of the climate"}
                <ScrollableX>
                    <GhgCartogram dataset={selectedSection.dataset} />
                </ScrollableX>
            {:else if selectedPage.text === "What's happening"}
                <Page2Carto selectedSectionStr={selectedSection.text} />
            {:else if selectedPage.text === "Climate action progress"}
                {#if selectedSection.text === "NDC submissions"}
                <ScrollableX>
                    <NdcCartogram />
                </ScrollableX>
                {/if}
            {/if}
        </div>

    </div>

    <div class="bottom-section">

        {#if selectedPage.bottomSectionTitle}
            <h3 class="chart-section-title">{selectedPage.bottomSectionTitle}</h3>
        {/if}

        <ScrollableX>
            <div class="chart-container">
                <svelte:component this={selectedPage.bottomComponent} />
            </div>
        </ScrollableX>

    </div>

</div>

<Footer currentSection={selectedPage.text}/>

<style>

    .content {
        max-width: 1100px;
        margin: auto;
        position: relative;
    }

    @media (min-width: 1400px) {
        .navcontainer {
            position: absolute;
            right: 100%;
            width: 150px;
        }
    }

    /* GHG emission category colours */
    :global(.stroke--stable) { stroke: #BEC7CD; }
    :global(.stroke--falling) { stroke: #00AACC; }
    :global(.stroke--climbing) { stroke: #FDCC4D; }
    :global(.stroke--climbing-fast) { stroke: #FD7D2E; }

    :global(.bg--stable) { background-color: #BEC7CD; }
    :global(.bg--falling) { background-color: #00AACC; }
    :global(.bg--climbing) { background-color: #FDCC4D; }
    :global(.bg--climbing-fast) { background-color: #FD7D2E; }

    /* NDC category colors */
    :global(.bg--ndc-first2020) { background-color: #1EA3C7; }
    :global(.bg--ndc-second2020) { background-color: #33E3FF; }
    :global(.bg--ndc-first) { background-color: #4A7D94; }
    :global(.bg--ndc-indc) { background-color: #A3A4A6; }
    :global(.bg--ndc-nosubmission) { background-color: #D5D7D9; }

    /* colors for testing only */
    :global(.bg--ndc-nodata) { background-color: purple; }
    :global(.bg--ndc-unknown) { background-color: red; }



    .top-section {
        display: flex;
        position: relative;
        height: 420px;
        padding-bottom:20px;
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

    .copy-container {
        width: 450px;
        display: flex;
        padding-left: 12px;
        box-sizing: border-box;
    }

    .chart-container {
        display: flex;
        justify-content: space-between;
        min-width: 1000px;
    }

    .chart-container > :global(*) {
        flex: 1 1 25%;
        padding: 0 12px;
    }

    .chart-container :global(svg) {
        width: 100%;
        box-sizing: border-box;
    }

    .chart-section-title {
        font-size: 14px;
        margin: 0;
        margin-top: 12px;
        padding-left: 12px;
        color: black;
        position: relative;
        z-index: 6;
        margin-bottom: 10px;
    }
    .content--cap .chart-section-title {
        margin-bottom: 20px;
    }

    .bottom-section {
        padding-bottom: 20px;
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
        .chart-container :global(.chart-summary) {
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

        .copy-container {
            width: auto;
            padding-right: 20%;
        }
        .copy-container :global(h1) {
            font-size: 24px;
            line-height: 30px;
            margin-top: 10px;
            font-weight: 500;
        }
        .copy-container :global(.summary-container) {
            display: none;
        }
    }



    @media (max-width: 600px) {

        /* TODO: tmp disabled annotations for mobile */
        .cartogram-pane :global(.annotation) {
            display: none;
        }
        .copy-container {
            padding-right: 20px;
        }
        .copy-container :global(h1) {
            font-weight: 300;
        }

        :global(.bottom-section .chart-figure) {
            display: none;
        }
    }

</style>