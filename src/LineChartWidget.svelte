<script lang="ts">
    import MiniLineChart from "./MiniLineChart.svelte";
    import type {IDatum} from "./MiniLineChart.svelte";
    export let data: IDatum[];

</script>

<main>
    <MiniLineChart data={data} />
    <h2>0.0</h2>
    <p>Lorem ipsum dolor sit amet,
        consectetuer adipiscing elit, sed
        diam nonummy nibh</p>
</main>

<style>
    h2 {
        text-align: left;
        font-size: 48px;
        font-weight: 300;
        color: #111;
        margin-bottom: 8px;
        margin-top: 4px;
    }

    p {
        text-align: left;
        margin-top:0;
        font-size: 16px;
        line-height: 24px;
    }

</style>