<script lang="ts">
    import svgs from '../svg';
    import BaseFooter from './BaseFooter.svelte';
    export var embed: string;

    var showEmbedCode: boolean = false;
    var inputEl: HTMLInputElement;

    function click(evt: MouseEvent) {
        showEmbedCode = true;
        evt.preventDefault();
        window.setTimeout(() => {
            inputEl.focus();
            selectAll();
        }, 0);
    }

    function reset() {
        showEmbedCode = false;
    }

    function selectAll() {
        inputEl.setSelectionRange(0, inputEl.value.length);
    }

    const urlParts = window.location.href.split('/');
    const urlPath = urlParts.slice(0, -1).join('/');
    const embedScript = `${urlPath}/embed.js`

    $: embed && reset();

</script>

<BaseFooter icon={svgs.embed} background="#C8C8C8">
    <slot slot="text">
        {#if !showEmbedCode}
        <a href="" on:click={click}>Want to embed the visualizations?</a>
        {/if}
    </slot>
    <div slot="content" class="input-container">
        <input type="text" bind:this={inputEl} readonly={true}
            on:click={selectAll}
            class:visible={showEmbedCode}
            value="<script async src='{embedScript}' data-embed='{embed}'></script>" />
    </div>
</BaseFooter>

<style>
    .input-container {
        display: flex;
        align-items: center;
    }
    input {
        visibility: hidden;
        margin: 0;
        font-size: 13px;
        width: 300px;
        outline: 1px solid #555;
        background: #f6f6f6;
    }
    .visible {
        visibility: visible;
    }
</style>
