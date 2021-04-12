<script lang="ts">
    import Page1 from './Page1.svelte';
    import Page2 from './Page2.svelte';
    import Page3 from './Page3.svelte';
    import MainNav from './components/MainNav.svelte';
    import type { MenuOption } from './components/MainNav.svelte';
    import svgs from './svg';
    import { afterUpdate } from 'svelte';
    import { throttle } from './util';
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

    var widgetEl: HTMLElement;

    let selectedNavOption = mainNavOptions[0];

    function onMenuChange(option: MenuOption) {
        // go to spash or change page
        // change page for now
        selectedNavOption = option;
    }

    const inIframe = (function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    })();

    function getCurrentHeight() {
        return widgetEl.clientHeight;
    }

    var previousHeight: number;
    function resizeIframe() {
        if (inIframe) {
            const currentHeight = getCurrentHeight();
            if (currentHeight !== previousHeight) {
                previousHeight = currentHeight;
                window.parent.postMessage({
                    type: 'unep-widget:resize',
                    value: currentHeight
                }, '*');
            }
        }
    }

    afterUpdate(() => {
        if (inIframe) {
            window.setTimeout(resizeIframe, 0);
        }
    })


</script>

<svelte:window on:resize={throttle(resizeIframe, 100)}/>

<div class="widget" bind:this={widgetEl}>

    <div class="content">
        <div class="navcontainer">
            <MainNav options={mainNavOptions} bind:selected={selectedNavOption} onchange={onMenuChange} />
        </div>
        <div>
            <svelte:component this={selectedNavOption.component} />
        </div>
    </div>

    <Footer currentSection={selectedNavOption.text}/>
</div>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

    :global(body) {
        padding: 0;
    }

    .widget {
        text-align: center;
        margin: 0 auto;
        font-family: 'Roboto', sans-serif;
        background-color: #F3F3F3;
        font-size: 24px;
    }

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


    @media (max-width: 900px) {
        .widget {
            height: auto;
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