
<script lang="ts">
    interface MenuOption {
        text: string;
        icon: string;
    }
    export let options: MenuOption[];
    export let selected: MenuOption;
</script>

<nav>
    <div class="subnavbuttons">
        {#each options as option}

        <button class:selected={selected === option} disabled={selected === option} on:click={() => selected = option}>
            <i>{@html option.icon}</i>
            {option.text}
        </button>

        {/each}
    </div>
</nav>

<style>
    .subnavbuttons {
        display: flex;
        scrollbar-width: none;
        overflow: auto;
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
    .selected:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 3px;
        background: black;
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

</style>
