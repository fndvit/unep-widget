<script lang="ts">
    import MainViz from './components/MainViz.svelte';
    import CopyPane from './components/CopyPane.svelte';
    import CopyHeadline from './components/CopyHeadline.svelte';
    import CopyMain from './components/CopyMain.svelte';
	import {default as copy} from './data/copy.json';
</script>

<MainViz>
    <CopyPane>
        <CopyHeadline>{copy.happening.ocean.title}</CopyHeadline>
        <CopyMain>{copy.happening.ocean.summary}</CopyMain>
    </CopyPane>
</MainViz>

<style>

</style>