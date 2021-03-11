<script lang="ts">
    import MiniLineChart from '../components/MiniLineChart.svelte';

</script>

<div class="hover-chart" class:hover-chart--show={hoverData.showHoverChart}
    style="top: {hoverData.y}px; left: {hoverData.x}px;" >
        <h2>{hoverData.country.name}</h2>
        <MiniLineChart data={hoverData.country.lineData}  />
</div>

<style>

    .hover-chart h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
    }

    .hover-chart {
        position: absolute;
        width: 200px;
        pointer-events: none !important;
        background: #EAEAEA;
        padding: 5px;
        box-shadow: 0px 0px 0px 0px #00000018;
        visibility: hidden;
        border: 1px solid #E7E7E7;
        transform: translate(-50%, -50%) translate(10px, 10px) scale(0.3);
        transform-origin: 50% 50%;
    }

    .hover-chart--show {
        visibility: visible;
        box-shadow: 0px 0px 15px 0px #00000018;
        transition: box-shadow 0.1s, transform 0.03s ease-in;
        transform: translate(-50%, -50%) translate(10px, 10px) scale(1);

    }

    .hover-chart :global(svg) {
        width: 200px;
        height: 100px;
    }

</style>