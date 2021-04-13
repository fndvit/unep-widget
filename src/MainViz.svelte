<script lang="ts">
    import Page1 from './Page1.svelte';
    import Page2 from './Page2.svelte';
    import Page3 from './Page3.svelte';
    import MainNav from './components/MainNav.svelte';
    import type { MenuOption } from './components/MainNav.svelte';
    import svgs from './svg';
    import Footer from './components/Footer.svelte';
    const mainNavOptions: MenuOption[] = [
        {
            text: "State of the climate", icon: svgs.stateoftheclimate.main,
            component: Page1
        },
        {
            text: "What's happening", icon: svgs.whatshappening.main,
            component: Page2
        },
        {
            text: "Climate action progress", icon: svgs.climateactionprogress.main,
            component: Page3
        },
    ];

    let selectedNavOption = mainNavOptions[0];

    function onMenuChange(option: MenuOption) {
        // go to spash or change page
        // change page for now
        selectedNavOption = option;
        window.setTimeout(() => document.dispatchEvent(new CustomEvent('content-resize')), 0);
    }

</script>

<div class="content">
    <div class="navcontainer">
        <MainNav options={mainNavOptions} bind:selected={selectedNavOption} onchange={onMenuChange} />
    </div>
    <div>
        <svelte:component this={selectedNavOption.component} />
    </div>
</div>

<Footer currentSection={selectedNavOption.text}/>


<style>

    .content {
        max-width: 1100px;
        margin: auto;
        position: relative;
    }

    @media (min-width: 1400px) {
        .navcontainer {
            position: absolute;
            right: 100%;
            width: 150px;
        }
    }

    /* GHG emission category colours */
    :global(.stroke--stable) { stroke: #BEC7CD; }
    :global(.stroke--falling) { stroke: #00AACC; }
    :global(.stroke--climbing) { stroke: #FDCC4D; }
    :global(.stroke--climbing-fast) { stroke: #FD7D2E; }

    :global(.bg--stable) { background-color: #BEC7CD; }
    :global(.bg--falling) { background-color: #00AACC; }
    :global(.bg--climbing) { background-color: #FDCC4D; }
    :global(.bg--climbing-fast) { background-color: #FD7D2E; }

    /* NDC category colors */
    :global(.bg--ndc-first2020) { background-color: #1EA3C7; }
    :global(.bg--ndc-second2020) { background-color: #33E3FF; }
    :global(.bg--ndc-first) { background-color: #4A7D94; }
    :global(.bg--ndc-indc) { background-color: #A3A4A6; }
    :global(.bg--ndc-nosubmission) { background-color: #D5D7D9; }

    /* colors for testing only */
    :global(.bg--ndc-nodata) { background-color: purple; }
    :global(.bg--ndc-unknown) { background-color: red; }



</style>