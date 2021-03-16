<script lang="ts">
    import MiniLineChart from "./MiniLineChart.svelte";
    import type { YearlyTimeseriesDatum } from '../data';
    export let data: YearlyTimeseriesDatum[];
    export let headlineFigure: string;
    export let text: string;


    const dummyText = "Lorem ipsum dolor sit amet, sed diam nonummy nibh, consectetuer";

</script>

<div>
    <MiniLineChart data={data} />
    <h2>{headlineFigure || data[data.length-1].value.toLocaleString()}</h2>
    <p>{text || dummyText}</p>
</div>

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