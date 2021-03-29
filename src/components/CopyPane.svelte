<script lang="ts">
    export var title: string;
    export var summary: string;
</script>

<div class="copy-pane">
    <h1>{title}</h1>
    <p>{summary}</p>
</div>

<style>

    .copy-pane {
        box-sizing: border-box;
        text-align: left;
        color: #222;
    }

    h1 {
        color: #000;
        font-size: 38px;
        line-height: 42px;
        font-weight: 300;
        margin-bottom: 20px;
        margin-top: 14px;
    }

    @media (max-width: 1000px) {
        h1 {
            font-size: 30px;
            line-height: 36px;
        }
    }

    p {
        font-size: 18px;
        line-height: 28px;
        margin-bottom: 0;
    }

    @media (max-width: 1000px) {
        p {
            font-size: 16px;
            line-height: 26px;
        }
    }

</style>