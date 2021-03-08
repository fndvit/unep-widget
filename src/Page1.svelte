<script lang="ts">
    import GHGPage from './GHGPage.svelte';
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
<GHGPage/>
{/if}
<Page1Charts/>

<style>
</style>