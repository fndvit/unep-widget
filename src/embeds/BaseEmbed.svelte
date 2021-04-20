<script lang="ts">
    import DatasourceFooter from '../components/DatasourceFooter.svelte';
    import IframeResizingContainer from '../components/IframeResizingContainer.svelte';
    import unepLogo from '../svg/unep-logo.svg';

    export var header: string;
    export var footer: string;
    export var view: string;

    const legend = [
        { text: "Decreased since 1990", class: "falling" },
        { text: "Stable since 1990", class: "stable" },
        { text: "Still climbing", class: "climbing-fast" },
    ];

</script>

<IframeResizingContainer>
    <div class="container">

        <h1>{header}</h1>

        <div class="content">

            <slot name="legend" />

            <div class="viz-pane">
                <slot name="viz" />
            </div>

            <div class="logo">
                <div class="unep-logo">{@html unepLogo}</div>
                <div class="copy" style='top:{(view !== 'pew-embed' && view !== 'temp' && view !== 'ocean' && view !== 'fires')?30:0}px'>
                    <p>To explore more about the climate emergency and the effects on the planet visit <b><a href="https://www.unep.org/">unep.org</a></b></p>
                    {#if view !== 'pew-embed' && view !== 'temp' && view !== 'ocean' && view !== 'fires' }
                    <p class="disclaimer">The boundaries and names shown, and the designations used on this map do not imply official endorsement or acceptance by the United Nations.</p>
                    {/if}
                </div>
            </div>

        </div>

    </div>
    <DatasourceFooter currentSection={footer} />
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
        font-weight: 300;
    }

    p {
        margin-top:0;
    }

    .disclaimer {
        font-size: 14px;
        line-height: 1.4;
        color:#808080;
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

    .viz-pane {
        position: relative;
    }

    .unep-logo {
        width: 72px;
        margin-right: 20px;
        flex: 0 0 100px;
    }

    .logo {
        display: flex;
        align-items: flex-start;
    }

    .viz-pane :global(.scrollable) {
        overflow: hidden;
    }

    .viz-pane :global(.scrollable-content) {
        min-width: 600px !important;
        position: relative;
    }


    @media (min-width: 800px) {

        .viz-pane {
            margin-left: 25%;
        }
        .copy {
            position: absolute;
            top: 30px;
            left: 0;
            width: 20%;
            min-width: 180px;
        }

        p {
            margin-top:10px;
        }

        .container {
            padding: 20px 12px 0;
        }

        .unep-logo {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 90px;
        }

    }

    @media (max-width: 600px) {
        .copy {
            font-size: 14px;
        }
        .container {
            padding: 20px 12px 0;
        }
    }


    @media (min-width: 1100px) {
        .content, h1 {
            margin-left:12px;
        }

    }

</style>