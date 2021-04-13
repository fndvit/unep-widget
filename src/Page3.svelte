<script lang="ts">
    import CopyPane from './components/CopyPane.svelte';
    import ScrollableX from './components/ScrollableX.svelte';
    import SubNav from './components/SubNav.svelte';
    import { copy } from './data';
    import NDCCartogram from './maps/NDCCartogram.svelte';
    import svgs from './svg';

    const sections = [
        {
            text: "NDC submissions", icon: svgs.climateactionprogress.ndc,
            copy: copy.progress.ndcs,
        },
        {
            text: "Public opinion", icon: svgs.climateactionprogress.opinion,
            copy: copy.progress.public,
        }
    ];
    let selectedSection = sections[0];

</script>

<SubNav bind:selected={selectedSection} options={sections} />

<div class="top-section">
    <div class="p3-copy">
        <CopyPane {...selectedSection.copy} />
    </div>

    <div class="cartogram-pane">
        {#if selectedSection.text === 'NDC submissions' }
        <ScrollableX>
            <NDCCartogram />
        </ScrollableX>
        {/if}
    </div>
</div>

<style>

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

    .p3-copy {
        width: 450px;
        display: flex;
        padding-left: 12px;
        box-sizing: border-box;
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

        .p3-copy {
            width: auto;
            padding-right: 20%;
        }
        .p3-copy :global(h1) {
            font-size: 24px;
            line-height: 30px;
            margin-top: 10px;
            font-weight: 500;
        }
        .p3-copy :global(.summary-container) {
            display: none;
        }
    }

    @media (max-width: 600px) {
        /* TODO: tmp disabled annotations for mobile */
        .cartogram-pane :global(.annotation) {
            display: none;
        }
        .p3-copy {
            padding-right: 20px;
        }
        .p3-copy :global(h1) {
            font-weight: 300;
        }

        :global(.p3-chart-pane .chart-figure) {
            display: none;
        }
    }

</style>