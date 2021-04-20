<script lang="ts">
    import { throttle } from '../util';

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
    function resizeIframe(height: number) {
        if (inIframe) {
            if (height !== previousHeight) {
                previousHeight = height;
                window.parent.postMessage({
                    type: 'unep-widget:resize',
                    value: height
                }, '*');
            }
        }
    }

    $: resizeIframe(clientHeight);

</script>

<div class="iframe-resizer" bind:this={el} bind:clientHeight={clientHeight}>
    <slot />
</div>