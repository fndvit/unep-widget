<script lang="ts">
    import ScrollableX from '../components/ScrollableX.svelte';
    import CartogramLegend from '../maps/CartogramLegend.svelte';
    import GhgCartogram, { Datasets } from '../maps/GHGCartogram.svelte';
    import NDCCartogram from '../maps/NDCCartogram.svelte';

    import BaseEmbed from './BaseEmbed.svelte'

    export var view: string;

    const legend = [
        { text: "Decreased since 1990", class: "falling" },
        { text: "Stable since 1990", class: "stable" },
        { text: "Still climbing", class: "climbing-fast" },
    ];

    const ndcLegend = [
        { text: "Nothing submitted", class: "ndc-nosubmission" },
        { text: "Only INDC", class: "ndc-indc" },
        { text: "Only First NDC", class: "ndc-first" },
        { text: "First 2020 NDC", class: "ndc-first2020" },
        { text: "Second 2020 NDC", class: "ndc-second2020" }
    ]

    const views = {
        total: {
            header: "GHG emissions are changing our climate and choking our world",
            dataset: Datasets.GHGTotal,
            footer: "State of the climate",
            legend
        },
        percapita: {
            header: "Our individual carbon footprints vary wildly; wealth is a key factor",
            dataset: Datasets.GHGPerCapita,
            footer: "State of the climate",
            legend
        },
        trends: {
            header: "Some countries are making progress but all nations need to step up",
            dataset: Datasets.GHGTrends,
            footer: "State of the climate",
            legend
        },
        ndc: {
            header: "Some countries are making progress but all nations need to step up",
            footer: "ndc-embed",
            legend: ndcLegend
        }
    }

    const selectedView = views[view];

</script>

<BaseEmbed
    header={selectedView.header}
    footer={selectedView.footer}
    {view}>

    <slot slot="legend">
        <CartogramLegend categories={selectedView.legend}/>
    </slot>

    <div slot="viz" class="cartogram-pane">
        <ScrollableX>
            <div class="cartogram-aspect">
                {#if view === 'ndc'}
                <NDCCartogram hideLegend={true} />
                {:else}
                <GhgCartogram dataset={selectedView.dataset} hideLegend={true} />
                {/if}
            </div>
        </ScrollableX>
    </div>

</BaseEmbed>

<style>

    .cartogram-aspect {
        min-width: 600px;
    }

    .cartogram-aspect:before {
        content: '';
        display: block;
        padding-bottom: calc(57.15%); /* 700/400 aspect */
        position: relative;
    }

    .cartogram-aspect > :global(*) {
        position: absolute !important;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
    }

    .cartogram-pane :global(.cartogram-container) {
        height: 100%;
        min-width: 600px;
    }

</style>