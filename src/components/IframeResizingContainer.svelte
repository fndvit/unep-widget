<script lang="ts">
    import { afterUpdate, onDestroy, onMount } from 'svelte';
    import { throttle } from '../util';

    var el: HTMLElement;

    const inIframe = (function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    })();

    function getCurrentHeight() {
        return el.clientHeight;
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

    document.addEventListener('content-resize', resizeIframe);

    // periodically resize incase content resizes without triggering an event
    var resizeInterval: number;
    onMount(() => resizeInterval = window.setInterval(resizeIframe, 1000))
    onDestroy(() => window.clearInterval(resizeInterval))

</script>

<svelte:window on:resize={throttle(resizeIframe, 100)}/>

<div class="iframe-resizer" bind:this={el}>
    <slot />
</div>