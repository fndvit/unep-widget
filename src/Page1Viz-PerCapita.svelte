<script lang="ts">
    import MainViz from './components/MainViz.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import CopyHeadline from './components/CopyHeadline.svelte';
    import CopyMain from './components/CopyMain.svelte';
	import {default as copy} from './data/copy.json';
</script>

<MainViz>
    <CopyPane>
        <CopyHeadline>{copy.state.percapita.title}</CopyHeadline>
        <CopyMain>{copy.state.percapita.summary}</CopyMain>
    </CopyPane>
    <div class="cartogram-container">
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

</style>