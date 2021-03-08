<script lang="ts">
    import TotalEmissions from './Page1Viz-TotalEmissions.svelte';
    import PerCapita from './Page1Viz-PerCapita.svelte';
    import Trends from './Page1Viz-Trends.svelte';
    import Page1Charts from './Page1Charts.svelte';
    import SubNav from './components/SubNav.svelte';


    const subNavMenuOptions = [
        {text: "Total emissions", icon: 'test'},
        {text: "Per capita emissions", icon: 'test'},
        {text: "Country trends", icon: 'test'},
    ];

    let selectedNav = subNavMenuOptions[0];


</script>

<SubNav bind:selected={selectedNav} options={subNavMenuOptions} />

{#if selectedNav === subNavMenuOptions[0]}
<TotalEmissions/>
{:else if selectedNav === subNavMenuOptions[1]}
<PerCapita/>
{:else if selectedNav === subNavMenuOptions[2]}
<Trends/>
{/if}

<Page1Charts/>

<style>
</style>