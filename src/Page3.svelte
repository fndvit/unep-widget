<script lang="ts">
    import SubNav from './components/SubNav.svelte';

    const subNavMenuOptions = [
        {text: "A", icon: 'test'},
        {text: "B", icon: 'test'},
        {text: "C", icon: 'test'},
    ];

    let selectedNav = subNavMenuOptions[0];


</script>

<SubNav bind:selected={selectedNav} options={subNavMenuOptions} />

<style>
</style>