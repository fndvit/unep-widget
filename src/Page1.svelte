<script lang="ts">
    import MainViz from './components/MainViz.svelte';
    import Page1Charts from './Page1Charts.svelte';
    import SubNav from './components/SubNav.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import CopyHeadline from './components/CopyHeadline.svelte';
    import CopyMain from './components/CopyMain.svelte';
    import ChartsContainer from './components/ChartsContainer.svelte';
    import GHGCartogram from './maps/GHGCartogram.svelte';
    import {default as copy} from './data/copy.json';
    import {Datasets} from './maps/GHGCartogram.svelte';
    import svgs from './svg';
import svg from './svg';

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

<MainViz>
    <div class="p1-copy">
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
        <CopyPane>
            <CopyHeadline>{selectedSection.copy.title}</CopyHeadline>
            <CopyMain>{selectedSection.copy.summary}</CopyMain>
        </CopyPane>

        {/if}
    </div>


    <div class="cartogram-container">
        <GHGCartogram dataset={selectedSection.dataset} />
    </div>


</MainViz>

<ChartsContainer>
    <Page1Charts/>
</ChartsContainer>

<style>

    .cartogram-container {
        width: 700px;
        float: left;
        margin-right: -100px; /* right-side overflow */
    }

    .cartogram-container :global(svg) {
        width: 100%;
    }

    .p1-copy {
        width: 450px;
        float: left;
    }

    @media (max-width: 1000px) {
        .p1-copy {
            width: 350px;
        }
    }

</style>