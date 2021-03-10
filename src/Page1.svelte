<script lang="ts">
    import MainViz from './components/MainViz.svelte';
    import Page1Charts from './Page1Charts.svelte';
    import SubNav from './components/SubNav.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import CopyHeadline from './components/CopyHeadline.svelte';
    import CopyMain from './components/CopyMain.svelte';
    import GHGCartogram from './maps/GHGCartogram.svelte';
    import GHGTrendsCartogram from './maps/GHGTrendsCartogram.svelte';
    import {default as copy} from './data/copy.json';
    import {Datasets} from './maps/GHGCartogram.svelte';

    const sections = [
        {
            text: "Total emissions", icon: 'test', // nav menu
            copy: copy.state.total // section copy
        },
        {
            text: "Per capita emissions", icon: 'test',
            copy: copy.state.percapita // section copy
        },
        {
            text: "Country trends", icon: 'test',
            copy: copy.state.trend // section copy
        },
    ]

    let selectedSection = sections[0];

</script>

<SubNav bind:selected={selectedSection} options={sections} />

<MainViz>
    {#if selectedSection.text === "Total emissions"}
    <CopyPane>
        <CopyHeadline>{selectedSection.copy.title}</CopyHeadline>
        <CopyMain>{selectedSection.copy.summary}</CopyMain>
    </CopyPane>
    {:else if selectedSection.text === "Per capita emissions"}
    <CopyPane >
        <CopyHeadline>{selectedSection.copy.title}</CopyHeadline>
        <CopyMain>{selectedSection.copy.summary}</CopyMain>
    </CopyPane>
    {:else if selectedSection.text === "Country trends"}
    <CopyPane >
        <CopyHeadline>{selectedSection.copy.title}</CopyHeadline>
        <CopyMain>{selectedSection.copy.summary}</CopyMain>
    </CopyPane>

    {/if}


    <div class="cartogram-container">
        {#if selectedSection.text === "Total emissions" || selectedSection.text === "Per capita emissions"}
        <div>{selectedSection.text === "Total emissions" ? Datasets.GHGTotal : Datasets.GHGPerCapita}</div>
        <GHGCartogram dataset={selectedSection.text === "Total emissions" ? Datasets.GHGTotal : Datasets.GHGPerCapita} />
        {:else if selectedSection.text === "Country trends"}
        <GHGTrendsCartogram />
        {/if}
    </div>


</MainViz>

<Page1Charts/>

<style>

    .cartogram-container {
        width: 700px;
        margin-top: -80px;
        position: absolute;
        left: 500px;
    }

    .cartogram-container :global(svg) {
        width: 100%;
    }

    .cartogram-legend {
        position: absolute;
        left: 40px;
        top: 485px;
    }


</style>