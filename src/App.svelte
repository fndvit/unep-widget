<script lang="ts">
    import Page1 from './Page1.svelte';
    import Page2 from './Page2.svelte';
    import Page3 from './Page3.svelte';
    import MainNav from './components/MainNav.svelte';
    import type {MenuOption} from './components/MainNav.svelte';

    const mainNavOptions = [
        {text: "State of the climate", icon: 'test'},
        {text: "What's happening", icon: 'test'},
        {text: "Climate action progress", icon: 'test'},
    ];

    let selectedNavOption = mainNavOptions[0];

    function onMenuChange(option: MenuOption) {
        // go to spash or change page
        // change page for now
        selectedNavOption = option;
    }

</script>

<div class="widget">
    <div class="content">
        <div class="navcontainer">
            <MainNav options={mainNavOptions} bind:selected={selectedNavOption} onchange={onMenuChange} />
        </div>
        <div>
        {#if selectedNavOption === mainNavOptions[0]}
        <Page1/>
        {:else if selectedNavOption === mainNavOptions[1]}
        <Page2/>
        {:else if selectedNavOption === mainNavOptions[2]}
        <Page3/>
        {/if}
        </div>
    </div>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');

    :global(body) {
        padding: 0;
    }
    .widget {
        text-align: center;
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        background-color: #F3F3F3;
    }
    .navcontainer {
        position: absolute;
        right: 100%;
        width: 200px;
    }
    .content {
        max-width: 1200px;
        margin: auto;
        position: relative;
    }
</style>