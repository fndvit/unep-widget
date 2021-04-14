<script context="module" lang="ts">
    export interface ImageAnnotation {
        text: string;
        x: number;
        y: number;
    }

</script>

<script lang="ts">
import { onDestroy } from 'svelte';

    import { clamp } from '../util';
    export var src: string;
    export var alt: string;
    export var title: string;
    export var annotations: ImageAnnotation[];
    var imgEl: HTMLImageElement;
    var vidEl: HTMLVideoElement;
    var imgRatio: number;
    var loaded: boolean = false;
    var srcImgHeight: number;
    var srcImgWidth: number;

    $: mappedAnnotations = annotations.map(a => {
        return {text: a.text, x: (a.x/srcImgWidth)*100, y: (a.y/srcImgHeight)*100}
    });

    $: annotation = mappedAnnotations && mappedAnnotations[0];

    function onImgLoad() {
        console.log(`loaded ${src}`)
        srcImgHeight = src === 'fire' ? vidEl.videoHeight : imgEl.naturalHeight;
        srcImgWidth = src === 'fire' ? vidEl.videoWidth : imgEl.naturalWidth;
        imgRatio = srcImgWidth / srcImgHeight;
        startCycling();
        loaded = true;
    }

    function nextAnnotation() {
        const nextIndex = mappedAnnotations.indexOf(annotation) + 1;
        annotation = mappedAnnotations[nextIndex === annotations.length ? 0 : nextIndex];
    }

    var stopCycling: () => any = () => null;
    function startCycling() {
        const interval = window.setInterval(nextAnnotation, 7000);
        stopCycling = () => window.clearInterval(interval);
    }

    function onClickAnnotation(a: ImageAnnotation) {
        annotation = a;
        stopCycling();
    }

    onDestroy(stopCycling);

    const circleRadiusX = 2.2;
    $: circleRadiusY = circleRadiusX * imgRatio;
    $: annotateHorizontally = annotation.x > 70 || annotation.x < 30;
    $: annotateBelow = !annotateHorizontally && annotation.y < 20;
    $: annotateLeft = annotateHorizontally && annotation.x > 50;
    $: lineLength = annotateHorizontally ? 5 : 15;

    $: line = annotateHorizontally ?
        { // horizontal line
            left: annotateLeft
                ? annotation.x - lineLength - circleRadiusX
                : annotation.x + circleRadiusX,
            top: annotation.y,
            height: 0,
            width: lineLength
        }
        : { // top side line
            left: annotation.x,
            top: annotateBelow
                ? annotation.y + circleRadiusY
                : annotation.y - lineLength  - circleRadiusY,
            height: lineLength,
            width: 0
        }

    $: text = annotateHorizontally ?
    { // horziontal annotation text
        left: annotateLeft
            ? line.left
            : line.left + lineLength,
        top: clamp(annotation.y, 10, 90),
        transform: `translateY(-50%) `
            + (annotateLeft ? 'translateX(-100%)' : '')
    }
    : { // top-side text
        left: annotation.x,
        top: annotateBelow
            ? annotation.y + lineLength + circleRadiusY
            : annotation.y - lineLength - circleRadiusY,
        transform: "translateX(-35%) " + (annotateBelow ? '' : " translateY(-100%)")
    }

</script>

<div class="aimg">
  {#if src === 'fire'}
    <video
        src='{src}.mp4'
        poster='{src}.png'
        muted
        autoplay
        loop
        bind:this={vidEl}
        on:playing={onImgLoad}>
        <track kind="captions">
    </video>
    {:else}
    <img src='{src}.jpg' {alt} on:load={onImgLoad} bind:this={imgEl}/>
    {/if}
    {#if loaded}

    <div class="annotation">
        <div class="text"
            style="left: {text.left}%; top: {text.top}%; transform: {text.transform};">
            {annotation.text}
        </div>
        <div class="line"
            style="left: {line.left}%; top: {line.top}%; height: {line.height}%; width: {line.width}%"/>
    </div>

    {#each mappedAnnotations as a}
        <div class="circle-container" class:selected={a === annotation}
            on:click={() => onClickAnnotation(a)}
            style="left: {a.x}%; top: {a.y}%;">
            <div class="circle" />
        </div>

    {/each}

    {/if}

    <div class="title {src === 'ocean' ? 'white' : ''}">
        <p>{@html title}</p>
    </div>
</div>

<style>

    .aimg {
        position: relative;
    }

    .aimg img, .aimg video {
        width: 100%;
        object-fit: contain;
        display: block;
    }

    .title {
        position: absolute;
        top:8.5rem;
        left:2rem;
        max-width: 120px;
        font-size: 14px;
        line-height: 1.3;
        color:#808080;
    }

    .white {
        color:#FFF;
    }

    .text {
        position: absolute;
        font-size: 13px;
        line-height: 1.3;
        width: 250px;
        text-shadow: 1px 1px 1px #f3f3f3, -1px 1px 1px #f3f3f3, 1px -1px 1px #f3f3f3, -1px -1px 1px #f3f3f3,
            2px 2px 2px #f3f3f3, -2px 2px 2px #f3f3f3, 2px -2px 2px #f3f3f3, -2px -2px 2px #f3f3f3,
            3px 3px 2px #f3f3f3, -3px 3px 2px #f3f3f3, 3px -3px 2px #f3f3f3, -3px -3px 2px #f3f3f3,
            -3px 0 2px #f3f3f3, 3px 0 2px #f3f3f3, 0 -3px 2px #f3f3f3, 0 3px 2px #f3f3f3,
            -4px 0 2px #f3f3f3, 4px 0 2px #f3f3f3, 0 -4px 2px #f3f3f3, 0 4px 2px #f3f3f3;
        z-index: 5;
        pointer-events: none;
    }

    .line {
        position: absolute;
        border-left: 1px solid #222;
        border-top: 1px solid #222;
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