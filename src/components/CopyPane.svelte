<script lang="ts">
    export var title: string;
    export var summary: string;
</script>

<div class="copy-pane">
    <h2>{title}</h2>
    <p>{summary}</p>
</div>

<style>

    .copy-pane {
        box-sizing: border-box;
        text-align: left;
        color: #222;
    }

    h2 {
        color: #000;
        font-size: 30px;
        line-height: 38px;
        font-weight: 300;
        margin-bottom: 20px;
        margin-top: 20px;
    }

    @media (max-width: 1000px) {
        h2 {
            font-size: 22px;
            line-height: 28px;
        }
    }

    p {
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 0;
        font-weight:300;
    }

    @media (max-width: 1000px) {
        p {
            font-size: 16px;
            line-height: 1.5;
            font-weight:300;
        }
    }

</style>