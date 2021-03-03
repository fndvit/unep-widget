<script lang="ts">
    import svgs from './svgs';
    export let icon: string;
    export let selected: boolean = false;
</script>


<button class:selected={selected} disabled={selected}>
    <i>{@html svgs[icon]}</i>
    <slot/>
</button>

<style>
    button {
        border: 0;
        border-radius: 0;
        padding: 20px;
        padding-bottom: 10px;
        background: none;
        border-bottom: 1px solid #dcdcdc;
        margin: 0;
        display: block;
        position: relative;
        box-sizing: border-box;
        height: 55px;
    }

    button:not(.selected):hover {
        background: #E6E6E6;
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
        width: 18px;
        height: 18px;
        display: inline-block;
        position: relative;
    }

    i :global(svg) {
        width: 100%;
    }
</style>