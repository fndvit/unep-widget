<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import svgs from '../svg';
    export var resetOnChange: any = null;
    var el: HTMLElement;
    var isScrollable: boolean = false;
    var scrollTop: number = 0;
    var atBottom: boolean = false;
    var scrollHeight: number;
    var clientHeight: number;

    $: atBottom = scrollHeight === clientHeight + scrollTop;
    $: atTop = scrollTop === 0;
    $: resetOnChange && resetScroll(); // svelte syntax: this code will run when resetOnChange updates

    function resetScroll() {
        if (el) el.scrollTop = 0;
    }

    function update() {
        scrollHeight = el.scrollHeight;
        clientHeight = el.clientHeight;
    }

    function onscroll() {
        scrollTop = el.scrollTop;
        scrollHeight = el.scrollHeight;
    }

    $: isScrollable = clientHeight < scrollHeight;

    onMount(() => document.fonts.ready.then(update));
    afterUpdate(update);
    var blurTimeout: number;

    function touchstart(evt: TouchEvent) {
        el.focus();
        if (blurTimeout) {
            window.clearTimeout(blurTimeout);
            blurTimeout = null;
        }
    }

    function touchend() {
        blurTimeout = window.setTimeout(() => {
            el.blur();
            blurTimeout = null;
        }, 1000);
    }

</script>

<svelte:window on:resize={update} />

<div class="scrollable"  on:touchstart={touchstart}>
    <div tabindex="-1" class="scrollable-content"  on:scroll={onscroll} bind:this={el} on:touchstart={touchstart} on:touchend={touchend}>
        <slot />
    </div>

    {#if isScrollable}
        <div class="overflow overflow-bottom" class:overflow-visible={!atBottom}>
            <div class="overflow-icon">{@html svgs.arrows.down}</div>
        </div>
        <div class="overflow overflow-top" class:overflow-visible={!atTop}>
            <div class="overflow-icon">{@html svgs.arrows.down}</div>
        </div>
    {/if}
</div>

<style>

    .overflow {
        position: absolute;
        pointer-events: none;
        left: 0;
        right: 12px;
        height: 100px;
        /* display: none; */
        opacity: 0;
        transition: opacity 100ms;
    }
    .overflow-bottom {
        bottom: 0;
        background: linear-gradient(0deg, rgba(243,243,243,1) 15%, rgba(243,243,243,0) 100%);
    }

    .overflow-top {
        top: 0;
        background: linear-gradient(0deg, rgba(243,243,243,0) 0%, rgba(243,243,243,1) 90%);
    }

    .overflow::before {
        content: '';
        display: block;
        border-top: 1px solid #DCDCDC;
        position: absolute;
        left: 0;
        right: 0;
    }
    .overflow-bottom::before {
        bottom: 10px;
    }
    .overflow-top::before {
        top: 10px;
    }

    .overflow-visible {
        /* display: block; */
        opacity: 1;
    }

    .overflow-icon :global(svg) {
        width: 26px;
        fill: #999999;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        background: #F3F3F3;
    }

    .overflow-top .overflow-icon :global(svg) { top: 1px; }
    .overflow-bottom .overflow-icon :global(svg) { bottom: 1px; }

    .overflow-top .overflow-icon :global(svg) {
        transform: rotate(180deg);
        transform-origin: 50% 50%;
    }


    .scrollable {
        box-sizing: border-box;
        display: flex;
        position: relative;
        scrollbar-color: transparent transparent;
    }

    .scrollable-content {
        scrollbar-width: thin;
        overflow-y: auto;
        outline: none;
    }
    .scrollable-content > * {
        visibility: visible;
    }

    .scrollable-content::-webkit-scrollbar {
        width: 12px;
    }

    .scrollable-content::-webkit-scrollbar-thumb {
        background-color: #b9b9b9;
        border-radius: 20px;
        border: 3px solid #F3F3F3;
        visibility: hidden;
    }
    .scrollable-content:hover::-webkit-scrollbar-thumb,
    .scrollable-content:focus::-webkit-scrollbar-thumb {
        visibility: visible;
    }

    .scrollable-content:focus, .scrollable-content:hover {
        scrollbar-color: #b9b9b9 transparent;
    }


</style>