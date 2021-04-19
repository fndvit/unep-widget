<script context="module" lang="ts">
    export interface MediaAnnotation {
        text: string;
        x: number;
        y: number;
    }

</script>

<script lang="ts">
    import { onDestroy } from 'svelte';
    import { Annotation } from '../components';
    export var src: string;
    export var poster: string = null;
    export var alt: string;
    export var video: boolean = false;
    export var annotations: MediaAnnotation[];
    export var onChangeAnnotation: (a: MediaAnnotation) => void = () => null;
    var imgEl: HTMLImageElement;
    var vidEl: HTMLVideoElement;
    var loaded: boolean = false;
    var srcImgHeight: number;
    var srcImgWidth: number;

    $: mappedAnnotations = annotations.map(a => {
        return {text: a.text, x: a.x, y: a.y}
    });

    $: annotation = mappedAnnotations && mappedAnnotations[0];

    $: selectedIndex = mappedAnnotations.indexOf(annotation);
    $: onChangeAnnotation(annotations[selectedIndex]);

    function onImgLoad() {
        srcImgHeight = video ? vidEl.videoHeight : imgEl.naturalHeight;
        srcImgWidth = video ? vidEl.videoWidth : imgEl.naturalWidth;
        startCycling();
        loaded = true;
    }

    function nextAnnotation() {
        const nextIndex = mappedAnnotations.indexOf(annotation) + 1;
        annotation = mappedAnnotations[nextIndex === annotations.length ? 0 : nextIndex];
    }

    var stopCycling: () => any = () => null;
    function startCycling() {
        stopCycling();
        const interval = window.setInterval(nextAnnotation, 7000);
        stopCycling = () => window.clearInterval(interval);
    }

    function onClickAnnotation(a: MediaAnnotation) {
        annotation = a;
        stopCycling();
    }

    onDestroy(stopCycling);

</script>

<div class="aimg">
  {#if video}
    <video
        class="aimg-media"
        src='{src}'
        poster='{poster}'
        muted
        autoplay
        loop
        bind:this={vidEl}
        on:playing={onImgLoad}>
        <track kind="captions">
    </video>
    {:else}
    <img class="aimg-media" src='{src}' {alt} on:load={onImgLoad} bind:this={imgEl}/>
    {/if}
    {#if loaded}

    <Annotation canvasWidth={srcImgWidth} canvasHeight={srcImgHeight}
        radius={0.022 * srcImgWidth} x={annotation.x} y={annotation.y} text={annotation.text} />

    {#each mappedAnnotations as a}
        <div class="circle-container" class:selected={a === annotation}
            on:click={() => onClickAnnotation(a)}
            style="left: {100* a.x/srcImgWidth}%; top: {100 * a.y / srcImgHeight}%;">
            <div class="circle" />
        </div>

    {/each}

    {/if}
</div>

<style>

    .aimg {
        position: relative;
        height: fit-content;
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }

    .aimg-media {
        max-width: 100%;
        flex-grow: 0;
        object-fit: contain;
    }

    .circle-container {
        position: absolute;
        width: 5%;
        padding-bottom: 5%;
        transform: translate(-50%, -50%);
        z-index: 2;
    }

    .circle {
        position: absolute;
        left: 1px;
        right: 1px;
        top: 1px;
        bottom: 1px;
        border-radius: 50%;
        border: 2px solid #111;
        transition: cubic-bezier(0.23, 1, 0.32, 1) 75ms;
        transform: scale(0.5);
        transform-origin: 50%;
    }

    .circle-container:hover .circle {
        transform: scale(1);
        cursor: pointer;
    }

    .circle-container.selected .circle {
        transform: scale(1);
    }

</style>