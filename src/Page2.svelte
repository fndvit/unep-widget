<script lang="ts">
    import SubNav from './components/SubNav.svelte';
    import MainViz from './components/MainViz.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import CopyHeadline from './components/CopyHeadline.svelte';
    import CopyMain from './components/CopyMain.svelte';
    import ChartsContainer from './components/ChartsContainer.svelte';
    import Page2Charts from './Page2Charts.svelte';
    import {default as copy} from './data/copy.json';

    const sections = [
        {
            text: "Land Temperature", icon: 'test',
            copy: copy.happening.surface,
        },
        {
            text: "Ocean Temperature", icon: 'test',
            copy: copy.happening.ocean,
        },
        {
            text: "Fires", icon: 'test',
            copy: copy.happening.fire,
        },
    ];

    let selectedSection = sections[0];

</script>

<SubNav bind:selected={selectedSection} options={sections} />


<MainViz>
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
    .cartogram-container > img {
        margin-right: -100px;
        width: 600px;
    }
</style>