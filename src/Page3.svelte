<script lang="ts">
    import CopyPane from './components/CopyPane.svelte';
    import SubNav from './components/SubNav.svelte';
    import { copy } from './data';
    import svgs from './svg';

    const sections = [
        {
            text: "NDCs", icon: svgs.test, // nav menu
            copy: copy.progress.ndcs, // section copy
            // dataset: Datasets.GHGTotal
        },
        {
            text: "Public", icon: svgs.test,
            copy: copy.progress.public, // section copy
            // dataset: Datasets.GHGPerCapita
        }
    ];
    let selectedSection = sections[0];

</script>

<SubNav bind:selected={selectedSection} options={sections} />

<div class="top-section">
    <div class="p3-copy">
        <CopyPane {...selectedSection.copy} />
    </div>

    <div class="cartogram-pane">
    </div>
</div>

<style>
</style>