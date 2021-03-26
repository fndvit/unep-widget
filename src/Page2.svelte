<script lang="ts">
    import SubNav from './components/SubNav.svelte';
    import MainViz from './components/MainViz.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import CopyHeadline from './components/CopyHeadline.svelte';
    import CopyMain from './components/CopyMain.svelte';
    import ChartsContainer from './components/ChartsContainer.svelte';
    import Page2Charts from './Page2Charts.svelte';
    import {default as copy} from './data/copy.json';
    import svg from './svg';

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


<MainViz>
    <div class="p2-copy p2-copy-{selectedSection.class}">
        {#if selectedSection.text === "Land Temperature"}
        <CopyPane>
            <CopyHeadline>{selectedSection.copy.title}</CopyHeadline>
            <CopyMain>{selectedSection.copy.summary}</CopyMain>
        </CopyPane>
        {:else if selectedSection.text === "Ocean Temperature"}
        <CopyPane>
            <CopyHeadline>{selectedSection.copy.title}</CopyHeadline>
            <CopyMain>{selectedSection.copy.summary}</CopyMain>
        </CopyPane>
        {:else if selectedSection.text === "Fires"}
        <CopyPane>
            <CopyHeadline>{selectedSection.copy.title}</CopyHeadline>
            <CopyMain>{selectedSection.copy.summary}</CopyMain>
        </CopyPane>

        {/if}
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


</MainViz>

<ChartsContainer>
    <Page2Charts></Page2Charts>
</ChartsContainer>

<style>
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