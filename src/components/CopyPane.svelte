<script lang="ts">
    import { onMount } from "svelte";
    import svgs from '../svg';

    var el: Element;
    var scrollable: boolean = false;
    var scrollTop: number = 0;
    var atBottom: boolean = false;
    var scrollHeight: number;
    var clientHeight: number;

    $: {
        atBottom = scrollHeight === clientHeight + scrollTop;
    }

    function update() {
        scrollHeight = el.scrollHeight;
        clientHeight = el.clientHeight;
        scrollable = clientHeight < scrollHeight;
    }

    onMount(() => {
        update();
        document.fonts.ready.then(update);
    })

    function onscroll() {
        scrollTop = el.scrollTop;
        scrollHeight = el.scrollHeight;
    }

</script>

<div class="container">
    <div class="copy-pane" on:scroll={onscroll} bind:this={el}>
        <slot/>
    </div>
    {#if scrollable}
        <div class="overflow" class:overflow-visible={!atBottom}>
            <i>{@html svgs.downarrow}</i>
        </div>
    {/if}
</div>

<style>

    .container {
        height: 420px;
        position: relative;
        width: 450px;
        float: left;
    }

    .copy-pane {
        height: 420px;
        overflow-y: auto;
        visibility: hidden;
        box-sizing: border-box;
        text-align: left;
        color: #222;
        scrollbar-width: thin;
    }

    .copy-pane::-webkit-scrollbar {
        width: 12px;
    }
    /* .copy-pane::-webkit-scrollbar-track {
        background: orange;
    } */
    .copy-pane::-webkit-scrollbar-thumb {
        background-color: #b9b9b9;
        border-radius: 20px;
        border: 3px solid #F3F3F3;
    }
    .copy-pane > :global(*),
    .copy-pane:hover,
    .copy-pane:focus {
        visibility: visible;
    }
    .copy-pane:hover {
        transition: visibility 0s 0.2s;
    }

    .overflow {
        position: absolute;
        pointer-events: none;
        bottom: 0px;
        left: 0;
        right: 12px;
        height: 100px;
        background: red;
        display: none;
        background: rgb(255,255,255);
        background: linear-gradient(0deg, rgba(243,243,243,1) 30%, rgba(243,243,243,0) 100%);
    }

    .overflow-visible {
        display: block;
    }

    .overflow i :global(svg) {
        width: 26px;
        fill: #999999;
        position: absolute;
        bottom: 1px;
        left: 0;
        right: 0;
        margin: auto;
        background: #F3F3F3;
    }
    .overflow::before {
        content: '';
        display: block;
        border-top: 1px solid #DCDCDC;
        position: absolute;
        bottom: 10px;
        left: 0;
        right: 0;
    }

</style>