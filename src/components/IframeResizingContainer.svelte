<script lang="ts">
    import { afterUpdate } from "svelte";


    var el: HTMLElement;
    var clientHeight: number;

    const inIframe = (function () {
        try {
            return window.self !== window.top;
        } catch (e) {
            return true;
        }
    })();

    var previousHeight: number;
    function resizeIframe() {
        if (!el) return;
        const currentHeight = el.clientHeight;
        if (inIframe) {
            if (currentHeight !== previousHeight) {
                previousHeight = currentHeight;
                window.parent.postMessage({
                    type: 'unep-widget:resize',
                    value: currentHeight
                }, '*');
            }
        }
    }

    $: clientHeight && resizeIframe();

    afterUpdate(() => {
        if (inIframe) window.setTimeout(resizeIframe, 0);
    });

</script>

<div class="iframe-resizer" bind:this={el} bind:clientHeight={clientHeight}>
    <slot />
</div>