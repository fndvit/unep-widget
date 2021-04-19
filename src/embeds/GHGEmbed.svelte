<script lang="ts">
    import Footer from '../components/Footer.svelte';
    import IframeResizingContainer from '../components/IframeResizingContainer.svelte';
    import ScrollableX from '../components/ScrollableX.svelte';
    import CartogramLegend from '../maps/CartogramLegend.svelte';
    import GhgCartogram, { Datasets } from '../maps/GHGCartogram.svelte';
    import unepLogo from '../svg/unep-logo.svg';

    const legend = [
        { text: "Decreased since 1990", class: "falling" },
        { text: "Stable since 1990", class: "stable" },
        { text: "Still climbing", class: "climbing-fast" },
    ];

</script>

<IframeResizingContainer>
    <div class="container">

        <h1>GHG emissions are changing our climate and choking our world</h1>

        <div class="content">

            <div class="legend-container">
                <CartogramLegend categories={legend}/>
            </div>
            <div class="cartogram-pane">
                <ScrollableX>
                    <div class="cartogram-aspect"></div>
                    <GhgCartogram dataset={Datasets.GHGTotal} hideLegend={true} />
                </ScrollableX>
            </div>

            <div class="logo-copy">
                <div class="unep-logo">{@html unepLogo}</div>
                <p class="copy">To expore more about the state of the climate and the effects on the planet visit <a href="https://www.unep.org/">unep.org</a></p>
            </div>

        </div>

    </div>
    <Footer currentSection="State of the climate" />
</IframeResizingContainer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');

    :global(body) {
        padding: 0;
        text-align: left;
        margin: 0;
        font-family: 'Roboto', sans-serif;
        background-color: #F3F3F3;
        font-size: 24px;
    }

    .container {
        padding: 20px 20px 0;
        max-width: 1100px;
        margin: auto;
    }

    .content {
        position: relative;
    }

    .copy {
        font-size: 18px;
        line-height: 1.5;
    }

    h1 {
        font-size: 22px;
        line-height: 28px;
        margin-top: 0;
    }

    .container :global(.cartogram-container) {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        min-width: 600px;
    }

    .cartogram-pane {
        position: relative;
    }

    .cartogram-aspect {
        padding-bottom: calc(57.15%); /* 700/400 aspect */
        width: 100%;
        min-width: 800px;
    }

    .unep-logo {
        width: 100px;
        margin-right: 20px;
        flex: 0 0 100px;
    }

    .logo-copy {
        display: flex;
        align-items: center;
    }

    .cartogram-pane :global(.scrollable) {
        overflow: hidden;
    }

    .cartogram-pane :global(.scrollable-content) {
        min-width: 600px !important;
        position: relative;
    }


    @media (min-width: 800px) {
        .cartogram-pane {
            margin-left: 200px;
        }
        .copy {
            position: absolute;
            top: 30px;
            left: 0;
            width: 200px;
        }

        .unep-logo {
            position: absolute;
            bottom: 20px;
            left: 0;
        }

    }

    @media (max-width: 600px) {
        .copy {
            font-size: 14px;
        }
    }

</style>