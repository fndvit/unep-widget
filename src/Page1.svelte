<script lang="ts">
    import GHGPage from './GHGPage.svelte';
    // import Page from './Page.svelte';
    import SubNav from './SubNav.svelte';
    import SubNavButton from './SubNavButton.svelte';
</script>

<SubNav>
    <SubNavButton icon="test" selected>Total emissions</SubNavButton>
    <SubNavButton icon="test">Per capita emissions</SubNavButton>
    <SubNavButton icon="test">Country trends</SubNavButton>
</SubNav>
<GHGPage/>

<style>
</style>