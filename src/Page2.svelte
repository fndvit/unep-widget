<script lang="ts">
    import SubNav from './components/SubNav.svelte';

    const subNavMenuOptions = [
        {text: "Land Temperature", icon: 'test'},
        {text: "Ocean Temperature", icon: 'test'},
        {text: "Fires", icon: 'test'},
    ];

    let selectedNav = subNavMenuOptions[0];


</script>

<SubNav bind:selected={selectedNav} options={subNavMenuOptions} />

<style>
</style>