<script lang="ts">
    import Page2Carto from '../Page2Carto.svelte';
    import BaseEmbed from './BaseEmbed.svelte'

    export var view: string;

    const views = {
        temp: {
            header: "Rising land temperatures reinforce need for urgent action",
            carto: "Land temperature"
        },
        ocean: {
            header: "Our oceans are getting warmer and sea levels are rising",
            carto: "Ocean temperature"
        },
        fires: {
            header: "Wildfires raise spectre of terrifying new normal in hotter world",
            carto: "Fires"
        },
    }

    const selectedView = views[view];

</script>

<BaseEmbed
    header={selectedView.header}
    footer="What's happening"
    {view}>

    <slot slot="viz">
        <Page2Carto selectedSectionStr={selectedView.carto} />
    </slot>

</BaseEmbed>

<style>

</style>