<script lang="ts">
    import SubNav from './components/SubNav.svelte';
    import Page2Charts from './Page2Charts.svelte';
    import {default as copy} from './data/copy.json';
    import svgs from './svg';
    import ScrollableX from './components/ScrollableX.svelte';
    import CopyPane from './components/CopyPane.svelte';

    const sections = [
        {
            text: "Land Temperature", icon: svgs.whatshappening.surface,
            copy: copy.happening.surface,
            class: 'temp'
        },
        {
            text: "Ocean Temperature", icon: svgs.whatshappening.ocean,
            copy: copy.happening.ocean,
            class: 'ocean'
        },
        {
            text: "Fires", icon: svgs.whatshappening.fire,
            copy: copy.happening.fire,
            class: 'fires'
        },
    ];

    let selectedSection = sections[0];

</script>

<SubNav bind:selected={selectedSection} options={sections} />


<div class="top-section">
    <div class="p2-copy p2-copy-{selectedSection.class}">
        <CopyPane {...selectedSection.copy} />
        <div class="p2-short-summary">{selectedSection.copy['short-summary']}</div>
    </div>

    <!-- @xaquingv will make them components, so it's a bit cleaner -->

    <div class="cartogram-container">
        {#if selectedSection.text === "Land Temperature"}
        <img src="surface.png" alt="Land Temperature Anomaly Map" />
        <div class="legend">
            <p class="text">Colder</p>
            <div class="legend-scale">{@html svgs.legends.land}</div>
            <p class="text">Warmer than the avg. for the 2000s</p>
        </div>
        {:else if selectedSection.text === "Ocean Temperature"}
        <img src="ocean.png" alt="Ocean Temperature Map" />
        <div class="legend">
            <p class="text">Cold</p>
            <div class="legend-scale">{@html svgs.legends.sea}</div>
            <p class="text">Warm</p>
        </div>
        {:else if selectedSection.text === "Fires"}
        <img src="fire.png" alt="Fires Map" />
        {/if}
    </div>

</div>

<div class="p2-chart-pane">
    <ScrollableX>
        <Page2Charts />
    </ScrollableX>
</div>

<style>

    .top-section {
        display: flex;
        position: relative;
        height: 375px;
        padding-bottom:20px;
    }

    .legend-scale {
        max-width: 270px;
        display: inline-block;
    }
    .legend-scale > :global(svg) {
        width: 100%;
    }

    .text {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
        margin-bottom: 18px;
    }
    .cartogram-container {
        flex-grow: 1;
        padding-top: 10px;
    }

    .p2-copy {
        flex-shrink: 0;
        width: 400px;
        position: relative;
        display: flex;
        padding-left: 12px;
    }

    .p2-copy-temp > :global(.scrollable),
    .p2-copy-fires > :global(.scrollable) {
        margin-right: -70px;
    }

    .p2-short-summary {
        display: none;
        font-size: 16px;
        line-height: 1.5;
        font-weight:300;
        margin: 0;
        text-align: left;
    }


    @media (max-width: 1100px) {
        .p2-copy {
            width: 330px;
        }
    }
    @media (max-width: 1000px) {
        .p2-copy {
            width: auto;
            flex: 1 1 300px;
        }
    }
    @media (max-width: 700px) {
        .p2-short-summary {
            display: block;
        }

        .p2-copy :global(.summary-container) {
            display: none;
        }
        .top-section {
            display: block;
            height: auto;
            padding-bottom: 0;
        }
        .p2-copy {
            padding-right: 10px;
            display: block;
            width: auto;
        }
        .p2-copy :global(h2) {
            margin-bottom: 10px;
        }
        .cartogram-container :global(.aimg .annotation),
        .cartogram-container :global(.aimg .circle-container) {
            display: none;
        }
    }
</style>