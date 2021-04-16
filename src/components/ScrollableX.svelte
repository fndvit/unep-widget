<script lang="ts">
    import { onMount, afterUpdate } from "svelte";
    import svgs from '../svg';
    var el: Element;
    var isScrollable: boolean = false;
    var scrollLeft: number = 0;
    var atEnd: boolean = false;
    var atStart: boolean = true;
    var scrollWidth: number;
    var clientWidth: number;

    $: atEnd = scrollWidth === clientWidth + scrollLeft;
    $: atStart = scrollLeft === 0;

    function update() {
        scrollWidth = el.scrollWidth;
        clientWidth = el.clientWidth;
        isScrollable = clientWidth < scrollWidth;
    }

    function onscroll() {
        scrollLeft = el.scrollLeft;
        scrollWidth = el.scrollWidth;
    }

    onMount(() => document.fonts.ready.then(update));
    afterUpdate(update);

    var dragging: boolean = false;
    var lastClientX: number;

    function startDrag(evt: MouseEvent) {
        lastClientX = evt.clientX;
        dragging = true;
    }

    function drag(evt: MouseEvent) {
        if (dragging) {
            const deltaX = evt.clientX - lastClientX;
            el.scrollLeft -= deltaX;
            lastClientX = evt.clientX;
        }
    }

    function endDrag() {
        dragging = false;
    }

    function scrollRightSmooth() {
        el.scrollTo({ left: el.scrollLeft + 200, behavior: 'smooth', });
    }
    function scrollLeftSmooth() {
        el.scrollTo({ left: el.scrollLeft - 200, behavior: 'smooth', });
    }

</script>

<svelte:window on:resize={update} on:mousemove={drag} on:mouseup={endDrag} />

<div class="scrollable" class:scrollable-dragging={dragging} class:scrollable-enabled={isScrollable}>
    <div class="scrollable-content"  on:scroll={onscroll} bind:this={el} on:mousedown={startDrag}>
        <slot />
    </div>

    {#if isScrollable}
        <div class="overflow overflow-right" class:overflow-visible={!atEnd} on:click={scrollRightSmooth}>
            <div>{@html svgs.arrows.right}</div>
        </div>
        <div class="overflow overflow-left" class:overflow-visible={!atStart} on:click={scrollLeftSmooth}>
            <div>{@html svgs.arrows.left}</div>
        </div>
    {/if}
</div>

<style>

    .overflow {
        position: absolute;
        top: 0;
        bottom: 0;
        display: none;
        width: 70px;
        z-index: 5;
    }

    .overflow-right {
        right: 0;
        background: linear-gradient(90deg, rgba(243,243,243,0) 0%, rgba(243,243,243,1) 100%);
    }
    .overflow-left {
        left: 0;
        background: linear-gradient(90deg, rgba(243,243,243,1) 0%, rgba(243,243,243,0) 100%);
    }

    .overflow-visible {
        display: block;
    }

    .overflow div {
        width: 18px;
        position: absolute;
        bottom: 0;
        top: 0;
        margin: auto;
        display: flex;
        align-items: center;
    }
    .overflow-right div {
        right: 2px;
    }
    .overflow-left div {
        left: 2px;
    }
    .overflow div :global(svg) {
        fill: #999999;
        width: 100%;
    }

    .scrollable {
        box-sizing: border-box;
        display: flex;
        position: relative;
    }

    .scrollable-enabled {
        user-select: none;
    }

    .scrollable-dragging {
        cursor: move !important;
    }

    .scrollable-content {
        overflow-x: scroll;
        scrollbar-width: none;
        min-width: 100%;
    }

    .scrollable-content::-webkit-scrollbar {
        display: none;
    }
    .scrollable-content::-webkit-scrollbar-thumb {
        background-color: #b9b9b9;
        border-radius: 20px;
        border: 3px solid #F3F3F3;
    }

</style>