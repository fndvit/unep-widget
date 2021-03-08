<script lang="ts">
    import GHGCartogram from './GHGCartogram.svelte';
    import MainViz from './components/MainViz.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import CopyHeadline from './components/CopyHeadline.svelte';
    import CopyMain from './components/CopyMain.svelte';
	import {default as copy} from './data/copy.json';
</script>

<MainViz>
    <CopyPane>
        <CopyHeadline>{copy.state.total.title}</CopyHeadline>
        <CopyMain>{copy.state.total.summary}</CopyMain>
    </CopyPane>
    <div class="cartogram-container">
        <GHGCartogram />
        <div class="cartogram-legend">
            <div class="legend-item legend-item--climbing">Climbing</div>
            <div class="legend-item legend-item--decreasing">Decreasing</div>
            <div class="legend-item legend-item--stable">Stable emissions</div>
        </div>
    </div>
</MainViz>

<style>

    .cartogram-container {
        width: 700px;
        margin-top: -80px;
        position: absolute;
        left: 500px;
    }

    .cartogram-container :global(svg) {
        width: calc(100% + 50px);
    }

    .cartogram-legend {
        position: absolute;
        left: 40px;
        top: 485px;
    }

    .legend-item {
        display: inline-block;
        margin-right: 12px;
    }

    .legend-item:before {
        content: '';
        display: inline-block;
        width: 17px;
        height: 17px;
        margin-right: 5px;
        border-radius: 5px;
        margin-bottom: -2px;
    }
    .legend-item--climbing:before { background-color: #FD7D2E; }
    .legend-item--decreasing:before { background-color: #00AACC; }
    .legend-item--stable:before { background-color: #BEC7CD; }

</style>