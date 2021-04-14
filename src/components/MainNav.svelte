<script lang="ts" context="module">

    export interface MenuOption {
        text: string,
        icon: string
    }
</script>

<script lang="ts">
    export let options: MenuOption[];
    export let selected: MenuOption;
    export let onchange: (option: typeof options[0]) => void;
</script>

<nav class="mainnavbuttons">
    {#each options as option}
    <button class:selected={selected === option} disabled={selected === option} on:click={() => onchange(option)}>
        <div class="buttoncontent">
            <div class="text-container">
                <span class="text">
                    {option.text}
                </span>
            </div>
            <div class="icon">{@html option.icon}</div>
        </div>
    </button>
    {/each}
</nav>

<style>
    button {
        width: 100%;
        display: block;
        border: none;
        color: #222;
        font-weight: 300;
        padding: 0;
        outline: none;
        font-size: 14px;
        line-height: 18px;
        margin: 0;
        position: relative;
        -webkit-tap-highlight-color: transparent;
        overflow: hidden;
        text-align: left;
    }

    button.selected {
        color: #d1d1d1;
    }

    button.selected .icon :global(svg *) {
        stroke: white;
    }

    button:not(.selected) .icon :global(svg *) {
        stroke: #999999;
    }

    button:not(.selected):hover .icon :global(svg *) {
        stroke: #888888;
    }

    button:not(:disabled) {
        cursor: pointer;
    }

    .buttoncontent {
        border: 1px solid #DCDCDC;
        height: 50px;
        box-sizing: border-box;
        float: right;
        padding-right: 48px;
        overflow: hidden;
        position: relative;
    }

    button.selected .buttoncontent {
        border-color:  #1E1E1E;
        background:  #1E1E1E;
    }

    button:not(.selected):hover .buttoncontent {
        width: 100%;
        transition: width 0.2s;
        background: #E6E6E6;
    }

    button:hover .buttoncontent .text {
        transition: opacity 0.2s ease 0.1s;
    }

    .text-container {
        padding-left: 10px;
        height: 48px;
        display: flex;
        align-items: center;
        width: 100px;
        box-sizing: border-box;
    }

    .icon {
        position: absolute;
        right: 0;
        top: 0;
        width: 48px;
        height: 48px;
        padding: 8px;
        box-sizing: border-box;
        z-index: 2;
    }

    button.selected .text {
        opacity: 1;
    }


    @media (min-width: 1400px) {
        button:hover .text {
            opacity: 1;
        }
    }


    @media (max-width: 1400px) {

        .text {
            opacity: 0;
        }
        .mainnavbuttons {
            display: flex;
        }
        button {
            flex-grow: 0;
            flex-shrink: 1;
            flex-basis: 50px;
            transition: flex 500ms cubic-bezier(0.190, 1.000, 0.220, 1.000);
        }
        button.selected {
            flex-grow: 1;
        }
        button .buttoncontent {
            width: 100% !important;
            transition: background-color 300ms, border-color 300ms;
        }
    }


    @media (min-width: 500px) and (max-width: 1400px) {
        button {
            flex-basis: 150px;
        }
        button .text {
            opacity: 1;
        }
    }
</style>