
<script lang="ts">
    import ScrollableX from "./ScrollableX.svelte";

    interface MenuOption {
        text: string;
        icon: string;
    }
    export let options: MenuOption[];
    export let selected: MenuOption;
</script>

<ScrollableX>
    <nav>
        <div class="subnavbuttons">
            {#each options as option}

            <button class:selected={selected === option} disabled={selected === option} on:click={() => selected = option} title={option.text}>
                <i>{@html option.icon}</i>
                {option.text}
            </button>

            {/each}
        </div>
    </nav>
</ScrollableX>

<style>
    .subnavbuttons {
        display: flex;
        position: relative;
        z-index: 1;
    }

    .subnavbuttons::-webkit-scrollbar {
        display: none;
    }

    button {
        border: 0;
        border-radius: 0;
        padding: 16px 16px 4px 40px;
        background: none;
        border-bottom: 1px solid #dcdcdc;
        margin: 0;
        display: block;
        position: relative;
        box-sizing: border-box;
        height: 49px;
        font-size: 16px;
        outline: none;
        white-space: nowrap;
        margin-bottom: 1px;
    }

    button:not(.selected):hover {
        background: #E6E6E6;
    }

    button:not(.selected) :global(svg *) {
        stroke: #999999;
    }

    button:not(:disabled) {
        cursor: pointer;
    }

    button.selected {
        font-weight: 700;
        color: #222;
    }

    .selected:before {
        content: '';
        display: block;
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background: #1E1E1E;
    }
    i {
        width: 22px;
        height: 22px;
        display: block;
        position: absolute;
        left: 10px;
        bottom: 8px;
    }

    i :global(svg) {
        width: 100%;
    }

    button::after {
        /* this is a hack to stop the button width
           changing when bolding the text */
        display: block;
        content: attr(title);
        font-weight: bold;
        height: 1px;
        color: transparent;
        overflow: hidden;
        visibility: hidden;
        margin-bottom: -1px;
    }
    @media (max-width: 900px) {
        button {
            height: 39px;
            padding-top: 6px;
            font-size: 14px;
        }
    }

</style>