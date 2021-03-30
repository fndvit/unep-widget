<script lang="ts">
    import SubNav from './components/SubNav.svelte';
    import ScrollableCopyPane from './components/ScrollableCopyPane.svelte';
    import Page2Charts from './Page2Charts.svelte';
    import {default as copy} from './data/copy.json';
    import svg from './svg';
    import ScrollableX from './components/ScrollableX.svelte';

    const sections = [
        {
            text: "Land Temperature", icon: svg.whatshappening.surface,
            copy: copy.happening.surface,
            class: 'temp'
        },
        {
            text: "Ocean Temperature", icon: svg.whatshappening.ocean,
            copy: copy.happening.ocean,
            class: 'ocean'
        },
        {
            text: "Fires", icon: svg.whatshappening.fire,
            copy: copy.happening.fire,
            class: 'fires'
        },
    ];

    let selectedSection = sections[0];

</script>

<SubNav bind:selected={selectedSection} options={sections} />


<div class="top-section">
    <div class="p2-copy p2-copy-{selectedSection.class}">
        <ScrollableCopyPane {...selectedSection.copy} />
    </div>

    <div class="cartogram-container">
        {#if selectedSection.text === "Land Temperature"}
        <img src="surface.png" alt="Land Temperature Map" />
        {:else if selectedSection.text === "Ocean Temperature"}
        <img src="ocean.png" alt="Ocean Temperature Map" />
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


    .cartogram-container {
        flex-grow: 1;
        padding-top: 10px;
    }

    .cartogram-container > img {
        width: 100%;
    }
    .p2-copy {
        flex-shrink: 0;
        width: 400px;
        position: relative;
        display: flex;
        padding-left: 12px;
    }

    .p2-copy-temp :global(.copy-container) {
        margin-right: -80px;
    }

    .p2-copy-fires :global(.copy-container) {
        margin-right: -70px;
    }

    @media (max-width: 1000px) {
        .p2-copy {
            width: 350px;
        }
    }
</style>