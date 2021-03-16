<script lang="ts">
    import SubNav from './components/SubNav.svelte';
    import Land from './Page2Viz-Land.svelte';
    import Ocean from './Page2Viz-Ocean.svelte';
    import Fires from './Page2Viz-Fires.svelte';
    import ChartsContainer from './components/ChartsContainer.svelte';
    import Page2Charts from './Page2Charts.svelte';

    const subNavMenuOptions = [
        {text: "Land Temperature", icon: 'test'},
        {text: "Ocean Temperature", icon: 'test'},
        {text: "Fires", icon: 'test'},
    ];

    let selectedNav = subNavMenuOptions[0];


</script>

<SubNav bind:selected={selectedNav} options={subNavMenuOptions} />

{#if selectedNav === subNavMenuOptions[0]}
<Land/>
{:else if selectedNav === subNavMenuOptions[1]}
<Ocean/>
{:else if selectedNav === subNavMenuOptions[2]}
<Fires/>
{/if}

<ChartsContainer>
    <Page2Charts></Page2Charts>

</ChartsContainer>

<style>
</style>