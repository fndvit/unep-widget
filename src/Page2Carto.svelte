<script lang="ts">
    import type { MediaAnnotation } from "./maps/AnnotatedMedia.svelte";
    import { AnnotatedMedia } from "./maps";
    import type { copy as Copy } from './data';
    import { copy } from './data';
    import svg from './svg';


    type InputAnnotation = typeof Copy.happening.surface.annotation[0];

    function mapAnnotation(input: InputAnnotation): MediaAnnotation {
        const [xStr, yStr] = input.coords.split(',');
        return {
            text: input.text,
            x: parseInt(xStr), y: parseInt(yStr)
        };
    }

    export var selectedSectionStr: string;

    const sections: {[section: string]: {imgTitle: string, src: string, poster?: string, alt: string, annotations: MediaAnnotation[]}} = {
        "Land temperature": {
            imgTitle: '<b>Surface temperature anomalies</b> (May 2020)',
            src: "surface.jpg",
            alt: "Land Temperature Anomaly Map",
            annotations: copy.happening.surface.annotation.map(mapAnnotation)
        },
        "Ocean temperature": {
            imgTitle: '<b>Ocean temperature</b> (May 2020)',
            src: "ocean.jpg",
            alt: "Ocean Temperature Map",
            annotations: copy.happening.ocean.annotation.map(mapAnnotation)
        },
        "Fires": {
            imgTitle: '<b>A decade of fires</b> (monthly data from 2010 to 2020)',
            src: "fire.mp4",
            poster: "fire.jpg",
            alt: "Fires Map",
            annotations: copy.happening.fire.annotation.map(mapAnnotation)
        }
    }

    $: selectedSection = sections[selectedSectionStr];

    var selectedAnnotation: MediaAnnotation;
    function onChangeAnnotation(a: MediaAnnotation) {
        selectedAnnotation = a;
    }

</script>


<div class="container">
    <div class="title {selectedSectionStr === 'Ocean temperature' ? 'white' : ''}">
        {@html selectedSection.imgTitle}
    </div>
    <div class="aimg-container">
        <AnnotatedMedia src={selectedSection.src} alt={selectedSection.alt} video={selectedSection.src === 'fire.mp4'}
            annotations={selectedSection.annotations} onChangeAnnotation={onChangeAnnotation}
        />
    </div>
    {#if selectedSectionStr === "Land temperature"}
    <div class="legend">
        <p class="legend-text">Colder</p>
        <div class="legend-scale">{@html svg.legends.land}</div>
        <p class="legend-text">Warmer than the avg. for the 2000s</p>
    </div>
    {:else if selectedSectionStr === "Ocean temperature"}
    <div class="legend">
        <p class="legend-text">Cold</p>
        <div class="legend-scale">{@html svg.legends.sea}</div>
        <p class="legend-text">Warm</p>
    </div>
    {/if}

    <div class="inline-annotation">
        {#each selectedSection.annotations as annotation}
        <div class:visible={selectedAnnotation === annotation}>{annotation.text}</div>
        {/each}
    </div>
</div>


<style>
    .container {
        width: 100%;
    }
    .title {
        font-size: 14px;
        padding-left: 12px;
        margin: 10px 0 12px 0;
    }

    .aimg-container {
        flex: 1;
        position: relative;
        overflow: hidden;
    }

    .inline-annotation {
        font-size: 14px;
        line-height: 1.5;
        padding: 0 10px;
        margin-top: 10px;
        display: grid;

    }
    .inline-annotation div {
        grid-column: 1;
        grid-row: 1;
        visibility: hidden;
    }
    .inline-annotation div.visible {
        visibility: visible;
    }

    .legend {
        display: inline-block;
        margin: auto;
        margin-top: 8px;
        flex: 0;
        padding-left: 10px;
        white-space: nowrap;
    }

    .legend-scale {
        max-width: 270px;
        display: inline-block;
    }
    .legend-scale > :global(svg) {
        width: 100%;
    }

    .legend-text {
        display: inline-block;
        font-size: 14px;
        vertical-align: middle;
        margin-bottom: 18px;
    }

    @media (max-width: 600px) {

        .container :global(.aimg .annotation) {
            display: none;
        }

        .legend-text {
            display: none;
        }

        .legend {
            position: absolute;
            top: 25px;
        }

        .aimg-container {
            margin-top: 45px;
        }
    }


    @media (min-width: 600px) {

        .inline-annotation {
            display: none;
        }
    }

    @media (min-width: 600px) {
        .title {
            position: absolute;
            top:35%;
            left:2rem;
            max-width: 120px;
            font-size: 14px;
            line-height: 1.3;
            color:#808080;
            z-index: 5;
        }

        .white {
            color:#FFF;
        }
    }

    @media (min-width: 900px) {
        .aimg-container :global(.aimg-media) {
            max-height: 315px;
        }
    }

    @media (min-width: 1400px) {
        .aimg-container :global(.aimg-media) {
            max-height: none;
        }
    }

</style>
