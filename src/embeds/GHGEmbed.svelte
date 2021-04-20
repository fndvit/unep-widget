<script lang="ts">
    import ScrollableX from '../components/ScrollableX.svelte';
    import CartogramLegend from '../maps/CartogramLegend.svelte';
    import GhgCartogram, { Datasets } from '../maps/GHGCartogram.svelte';

    import BaseEmbed from './BaseEmbed.svelte'

    export var view: string;

    const legend = [
        { text: "Decreased since 1990", class: "falling" },
        { text: "Stable since 1990", class: "stable" },
        { text: "Still climbing", class: "climbing-fast" },
    ];

    const views = {
        total: {
            header: "GHG emissions are changing our climate and choking our world",
            dataset: Datasets.GHGTotal
        },
        percapita: {
            header: "Our individual carbon footprints vary wildly; wealth is a key factor",
            dataset: Datasets.GHGPerCapita
        },
        trends: {
            header: "Some countries are making progress but all nations need to step up",
            dataset: Datasets.GHGTrends
        },
    }

    const selectedView = views[view];

</script>

<BaseEmbed
    header={selectedView.header}
    footer="State of the climate">

    <slot slot="legend">
        <CartogramLegend categories={legend}/>
    </slot>

    <slot slot="viz">
        <ScrollableX>
            <div class="cartogram-aspect"></div>
            <GhgCartogram dataset={selectedView.dataset} hideLegend={true} />
        </ScrollableX>
    </slot>

</BaseEmbed>

<style>
    .cartogram-aspect {
        padding-bottom: calc(57.15%); /* 700/400 aspect */
        width: 100%;
        min-width: 660px;
    }

    @media (min-width: 800px) {

        .cartogram-aspect {
            min-width: 600px;
        }
    }

    @media (min-width: 960px) {

        .cartogram-aspect {
            min-width: 700px;
        }
    }

    @media (min-width: 1100px) {

        .cartogram-aspect {
            min-width: 795px;
        }
    }

</style>