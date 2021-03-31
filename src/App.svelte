<script lang="ts">
    import Page1 from './Page1.svelte';
    import Page2 from './Page2.svelte';
    import Page3 from './Page3.svelte';
    import MainNav from './components/MainNav.svelte';
    import type {MenuOption} from './components/MainNav.svelte';
    import svgs from './svg';
    import { afterUpdate } from 'svelte';
    import { throttle } from './util';
    import Footer from './components/Footer.svelte';
    import Intro from './components/Intro.svelte';

    const mainNavOptions = [
        {text: "State of the climate", icon: svgs.stateoftheclimate.main},
        {text: "What's happening", icon: svgs.whatshappening.main},
        // {text: "Climate action progress", icon: 'test'},
    ];
    var widgetEl: HTMLElement;

    let intro = true, width, height;

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
    <div class="intro {intro ? '' : 'hiddenIntro'}">
        <Intro 
        on:click={(e) => intro = false}
        visible={intro}
        />
    </div>
    <div class="content {intro ? 'hidden' : 'visibleWidget'}" bind:clientWidth={width} bind:clientHeight={height}>
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
    <div class="footer {intro ? 'hidden' : 'visibleWidget'}">
        <Footer currentSection={selectedNavOption.text}/>
    </div>
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

    .visibleWidget {
        visibility:visible;
        opacity: 1;
        transition: opacity 1s;
        transition-delay: .75s;
    }

    .hiddenIntro {
        opacity: 0;
        transition: opacity 1s;
    }

    .hidden {
        opacity:0;
        visibility:hidden;
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

    :global(.stroke--stable) { stroke: #BEC7CD; }
    :global(.stroke--falling) { stroke: #00AACC; }
    :global(.stroke--climbing) { stroke: #FDCC4D; }
    :global(.stroke--climbing-fast) { stroke: #FD7D2E; }

    :global(.bg--stable) { background-color: #BEC7CD; }
    :global(.bg--falling) { background-color: #00AACC; }
    :global(.bg--climbing) { background-color: #FDCC4D; }
    :global(.bg--climbing-fast) { background-color: #FD7D2E; }

    :global(.cover) {
        width: 100%;
        height:100%;
        object-fit: cover;
    }

</style>