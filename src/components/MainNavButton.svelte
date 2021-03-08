<script lang="ts">
    export let selected: boolean = false;
    import svgs from '../svg';
    export let icon: string;
    export let onclick: () => any;
</script>

<button class:selected={selected} disabled={selected} on:click={onclick}>
    <div class="buttoncontent">
        <span class="text">
            <slot/>
        </span>
        <i>{@html svgs[icon]}</i>
    </div>
</button>

<style>

    button {
        display: block;
        width: 100%;
        position: relative;
        margin: 0;
        height: 56px;
        box-sizing: border-box;
        border: none;
        color: #222;
        font-weight: 300;
        text-align: left;
        padding: 0;
        outline: inherit;
    }

    button.selected {
        background: black;
        color: #d1d1d1;
    }

    button.selected i {
        fill: white;
        border-color: black;
    }


    button:not(:disabled) {
        cursor: pointer;
    }


    .buttoncontent {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        border: 1px solid #DCDCDC;
    }

    button.selected .buttoncontent {
        width: 100%;
        border-color: black;
    }

    button:not(.selected) .buttoncontent {
        width: 56px;
    }

    button:not(.selected) .buttoncontent .text {
        opacity: 0;
    }

    button:not(.selected):hover .buttoncontent {
        width: 100%;
        transition: 0.2s;
        background: #E6E6E6;
    }

    button:not(.selected):hover .buttoncontent .text {
        opacity: 1;
        transition: 0.2s;
        transition-delay: 0.1s;
    }

    .text {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        padding: 10px;
        width: 120px;
    }

    i {
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        padding: 12px;
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        fill: #999999;
    }

</style>