<script lang="ts">
    import type { MediaAnnotation } from "./maps/AnnotatedMedia.svelte";
    import { AnnotatedMedia } from "./maps";
    import svg from './svg';

    export var selectedSectionStr: string;

    const sections: {[section: string]: {imgTitle: string, src: string, poster?: string, alt: string, annotations: MediaAnnotation[]}} = {
        "Land temperature": {
            imgTitle: '<b>Surface temperature anomalies</b> (May 2020)',
            src: "surface.jpg",
            alt: "Land Temperature Anomaly Map",
            annotations: [
                {
                    text: "In Madagascar, temperatures have risen significantly (0.2°C over the north and 0.1°C over the south) in recent years. Rainfall patterns have also changed.",
                    x: 517, y: 266, // 828 x 420
                },
                {
                    text: "In Arctic Siberia, average temperatures reached as high as 10°C above normal for both May and June 2020. Rising temperatures have caused intense wildfires across the region’s boreal forests and tundra",
                    x: 591, y: 27,
                },
                {
                    text: "India has suffered increasingly frequent and extreme heatwaves since the start of the century. A report found the country’s average temperature had risen by 0.7°C from 1901-2018.",
                    x: 590, y: 175,
                },
                {
                    text: "In the Himalayan state of Uttarakhand, a deadly flood, caused when a glacier broke away and fell into a valley, killed around 140 people in 2021. Data suggests that global warming will cause mountain temperatures to rise twice as fast as the global average.",
                    x: 590, y: 135,
                },
                {
                    text: "Over the last 20 years, California experienced more years of drought than it did without drought. There were droughts between 2001 and 2005, 2007 and 2010, and from 2012 to 2017.",
                    x: 155, y: 115
                },
                {
                    text: "The northernmost inhabited Arctic town, Longyearbyen on the Norwegian archipelago of Svalbard, saw a new record temperature of 21.7°C on 25 July 2020, compared to July average of 5.9°C, according to Norway's national meteorological service.",
                    x: 439, y: 20
                }
            ]
        },
        "Ocean temperature": {
            imgTitle: '<b>Ocean temperature</b> (May 2020)',
            src: "ocean.jpg",
            alt: "Ocean Temperature Map",
            annotations: [
                {
                    text: "In September 2020, Arctic sea ice shrank to the second-lowest extent ever recorded (3.709 million square kilometres). Also last July, the area of Arctic sea ice was the lowest on record for that month.",
                    x: 412, y: 29
                },
                {
                    text: "In March 2020, Australia’s Great Barrier Reef suffered a third mass coral bleaching event in five years due to increasingly warmer temperatures recorded in February.",
                    x: 752, y: 261
                }
            ]
        },
        "Fires": {
            imgTitle: '<b>A decade of fires</b> (monthly data from 2010 to 2020)',
            src: "fire.mp4",
            poster: "fire.jpg",
            alt: "Fires Map",
            annotations: [
                {
                    text: "In Australia, the 2019-2020 wildfire season was the worst on record, burning 18.3 million hectares by mid-January, causing loss of life, homes, livelihoods and the reported deaths of a billion animals.",
                    x: 733, y: 305
                },
                {
                    text: "In the western United States, following record-breaking high temperatures in August 2020, lightning strikes from severe thunderstorms ignited fires in California, Oregon and Washington. By the end of September, these blazes had consumed over 2 million hectares across the three states, destroyed over 7,000 structures and left at least 40 people dead.",
                    x: 155, y: 115

                },
                {
                    text: "In Arctic Siberia, exceptional and prolonged heat fuelled unprecedented fires during the summer of 2020. Temperatures were more than 5°C above average from January to June, and in June up to 10°C above average.",
                    x: 591, y: 27,
                },
                {
                    text: "Canada suffered the worst wildfire season on record in 2018, with 16,000 people evacuated as 2,117 wildfires filled the skies of western Canada with smoke. Weather was a key driver with late July bringing record-breaking temperatures and severe lightning storms to many areas.",
                    x: 164, y: 66
                },
                {
                    text: "In 2020, Brazil’s Amazon rainforest experienced its worst outbreak of fires in a decade, with blazes increasing 13 per cent in the first nine months compared to 2019. Satellites in September recorded 32,017 hotspots, a 61 per cent rise from the same month in 2019.",
                    x: 270, y: 220
                },
            ]
        }
    }

    $: selectedSection = sections[selectedSectionStr];

    var selectedAnnotation: MediaAnnotation;
    function onChangeAnnotation(a: MediaAnnotation) {
        selectedAnnotation = a;
    }

</script>


<div class="container">
    <div class="title {selectedSection.src === 'ocean' ? 'white' : ''}">
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
