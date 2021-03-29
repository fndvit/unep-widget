<script lang="ts">
    import ScrollablePane from "./ScrollablePane.svelte";
    import CopyPane from "./CopyPane.svelte";
    export let title: string;
    export let description: string;
</script>

<ScrollablePane resetOnChange={{title, description}}>
    <CopyPane {...$$props} />
</ScrollablePane>