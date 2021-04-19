<script lang="ts">
    import ScrollablePane from "./ScrollablePane.svelte";

    export var title: string;
    export var summary: string;
</script>

<div class="copy-pane">
    <h2>{title}</h2>

    <div class="summary-container">
        <ScrollablePane resetOnChange={summary}>
            <p>{summary}</p>
        </ScrollablePane>
    </div>


</div>

<style>
    .copy-pane {
        box-sizing: border-box;
        color: #222;
        display: flex;
        flex-flow: column;
    }

    .summary-container {
        flex: 1;
        position: relative;
    }

    .summary-container > :global(.scrollable) {
        position: absolute !important;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    h2 {
        color: #000;
        font-size: 30px;
        line-height: 38px;
        font-weight: 300;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    p {
        font-size: 18px;
        line-height: 1.5;
        margin: 0;
        font-weight:300;
    }

    @media (max-width: 1100px) {
        h2 {
            font-size: 22px;
            line-height: 28px;
        }
        p {
            font-size: 16px;
            line-height: 1.5;
            font-weight:300;
        }
    }

</style>