<script lang="ts" context="module">
    import type { YearlyTimeseriesDatum } from '../data';

    export interface CountryDataPoint {
        name: string;
        short: string;
        code: string;
        x: number;
        y: number;
        value: number;
    }

    export interface TrendsDataset {
        code: string;
        data: YearlyTimeseriesDatum[]
    }
</script>

<script lang="ts">
    import * as d3 from '../d3';
    import { clamp, createLookup, throttle, trailingDebounce } from '../util';
    import MiniTrendCharts from './MiniTrendCharts.svelte';
    import MiniLineChart from '../components/MiniLineChart.svelte';

    interface CartogramDataPoint extends CountryDataPoint {
        category: string;
        trendsTimeseries: YearlyTimeseriesDatum[];

        left: number;
        top: number;
        width: number;
        height: number;
    }

    export var data: CountryDataPoint[];
    export var nodeSize: number = 100;
    export var domain: [number, number];
    export var trendsMode: boolean = false;
    export var trendsTimeseriesData: TrendsDataset[] = [];
    export var helpText: {code: string, text: string} = null;
    export var categoryFn: (code: CountryDataPoint) => string;
    export var hoverTextFn: (country: CountryDataPoint) => string;
    export var onHoverFn: (country: CountryDataPoint) => void = c => null
    export var hideLabels: boolean = false;

    var containerEl: Element;
    let loaded: boolean = false;

    const trendsTimeseriesLookup = createLookup(trendsTimeseriesData, d => d.code, d => d.data)

    // used to scale to container el
    const originalWidth = 700;
    const originalHeight = 400;
    var targetWidth: number = originalWidth;
    var targetHeight: number = originalHeight;

    var lineDisplayBlock: boolean = false;
    var lineFadeIn: boolean = false;
    var hoverTimeout: number;
    let hoverData: {x: number, y: number, country: CartogramDataPoint} = null;
    var helpTextFade: boolean = false;
    var annotation: Annotation;
    var hoveredForX: boolean = false;

    $: largestVal = Math.max(...data.map(d => d.value));

    $: radius = d3.scaleSqrt()
        .domain([0, largestVal])
        .range([0, nodeSize]);

    $: xScale = d3.scaleLinear()
        .domain([0, domain[0]])
        .range([0, targetWidth]);

    $: yScale = d3.scaleLinear()
            .domain([0, domain[1]])
            .range([0, targetHeight]);

    var cartogramData: CartogramDataPoint[];
    $: cartogramData = data.map(d => {
        const trendsTimeseries = trendsTimeseriesLookup[d.code];
        const r = radius(d.value);
        return {
            ...d,

            category: categoryFn(d),
            trendsTimeseries,

            left: xScale(d.x - r),
            top: yScale(d.y - r),

            // width height should be the same if the aspect is correct
            width: xScale(r * 2),
            height: yScale(r * 2),
        };
    });

    // performance tweaks for transitioning to the trendsmode cartogram
    var timeout: number;
    $: {
        if (trendsMode) {
            const delay = 200;
            timeout = window.setTimeout(() => {
                lineDisplayBlock = true;
                window.setTimeout(() => {
                    lineFadeIn = true;
                    timeout = null;
                }, 1)
            }, delay)

        }
    }
    $: {
        if (!trendsMode) {
            if (timeout) {
                window.clearTimeout(timeout);
                timeout = null;
            }
            lineDisplayBlock = false;
            lineFadeIn = false;
        }
    }

    function calcStyle(d: CartogramDataPoint) {
        const styles = [
            `left: ${d.left}px`,
            `top: ${d.top}px`,
            `width: ${d.width}px`,
            `height: ${d.height}px`,
        ];
        return styles.join(';');
    }

    function resize() {
        if (containerEl) {
            const containerStyle = getComputedStyle(containerEl);
            const containerWidth = containerEl.clientWidth - parseFloat(containerStyle.paddingLeft) - parseFloat(containerStyle.paddingRight);
            const containerHeight = containerEl.clientHeight - parseFloat(containerStyle.paddingTop) - parseFloat(containerStyle.paddingBottom);
            const scale = Math.min(containerWidth / originalWidth, containerHeight / originalHeight);
            targetWidth = originalWidth * scale;
            targetHeight = originalHeight * scale;
        }
    }

    window.setTimeout(() => {
        resize();
        loaded = true;
    }, 0);

    // ANNOTATIONS....  yea it's pretty complicated... :(

    interface Annotation {
        x: number;
        y: number;
        html: string;
        class?: string
    }

    const _debouncedShowHelpText = trailingDebounce(() => helpTextFade = false, 200);

    function onMouseEnterCountry(evt: MouseEvent, country: CartogramDataPoint) {
        onHoverFn(country);
        helpTextFade = false;
        _debouncedShowHelpText.cancel();
        hoverData = {
            country,
            x: country.left + (country.width / 2),
            y: country.top - 2
        };
        hoverTimeout = window.setTimeout(() => hoveredForX = true, 350);
    }

    function onMouseLeaveCountry(evt: MouseEvent, country: CartogramDataPoint) {
        clearHoverState();
        onHoverFn(null);
    }

    function clearHoverState() {
        hoverData = null;
        hoveredForX = false;
        window.clearTimeout(hoverTimeout);
        hoverTimeout = null;
        fadeInHelpText();
    }

    function fadeInHelpText() {
        helpTextFade = true;
        _debouncedShowHelpText();
    }

    function trendsHoverText(country: CartogramDataPoint): string {
        let value = Math.round(country.trendsTimeseries[45].value).toLocaleString();
        return `${value} Mt`
    }

    $: helpCountry = helpText ? cartogramData.find(d => d.code === helpText.code) : null;

    $: helpAnnotation = {
        x: helpCountry.left - 1 + helpCountry.width/2,
        y: helpCountry.top - 2,
        html: helpText.text,
        class: 'help'
    };

    $: countryAnnotation = hoverTextFn && hoverData && !trendsMode && {
        x: hoverData.x,
        y: hoverData.y,
        html: hoverTextFn(hoverData.country)
    }
    $: annotation = countryAnnotation || helpAnnotation;

    $: hideAnnotation = helpTextFade || (!countryAnnotation && hoverData)

    $: data && fadeInHelpText();

    $: showTrendsChart = trendsMode && hoverData && hoveredForX;

</script>

<svelte:window on:resize={throttle(resize, 50)} />

<div class="cartogram" bind:this={containerEl}
    class:trends-mode={trendsMode} class:trends-visible={lineFadeIn}
    class:cartogram-country-hover={hoverData} class:showing-trends-chart={showTrendsChart}
    class:trends-block={lineDisplayBlock}
    on:touchstart={clearHoverState}
>
    {#if loaded}
    <div class="countries">
        {#each cartogramData as d (d.code)}
        {#if d.x && d.y}
        <div class="country bg--{d.category}"
            style={calcStyle(d)}
            data-code={d.code}
            on:mouseenter={(evt) => onMouseEnterCountry(evt, d)}
            on:mouseleave={(evt) => onMouseLeaveCountry(evt, d)}
        >
            {#if !hideLabels && d.width > 50}
                <span class="country-text">{d.short}</span>
            {/if}

            {#if d.trendsTimeseries}
                <div class="trendline" >
                    <MiniTrendCharts data={d.trendsTimeseries} category={d.category} />
                </div>
            {/if}

        </div>
        {/if}
        {/each}
    </div>

    {/if}

    {#if annotation}
    <div class="annotation annotation-{annotation.class || 'default'}" class:annotation-hide={hideAnnotation}>
        <div class="annotation-text" style="left: {clamp(annotation.x - 60, 0, targetWidth - 220)}px;">
            <span class="annotation-textspan">
                {@html annotation.html}
            </span>
        </div>
        <div class="annotation-line"
            style="left: {annotation.x}px; height: {annotation.y}px;">
        </div>
    </div>
    {/if}


    {#if trendsMode && showTrendsChart && hoverData}
    <div class="hover-chart" class:hover-chart--show={hoverData}
        style="top: {hoverData.y}px; left: {hoverData.x}px;" >
            <h3>{hoverData.country.name}</h3>
            <h3 class='light'>{@html trendsHoverText(hoverData.country)}</h3>
            <MiniLineChart data={hoverData.country.trendsTimeseries} category={hoverData.country.category} />
    </div>
    {/if}
</div>

<style>
    .cartogram {
        transform-origin: 0 0;
        height: 100%;
        width: 100%;
        display: flex;
    }

    h3 {
        font-size:18px;
        font-weight: 600;
        padding:0;
        text-align:left;
        width: 70%;
        padding-left: 5px;
        padding-top: 2px;
        margin-bottom: -10px;
        margin-top: 0;
    }

    .light{
        font-size:16px;
        font-weight: 300;
        text-align:right;
        right:8px;
        top:8px;
        position:absolute;
    }

    .label {
        font-size: 14px;
    }

    .countries {
        flex: 0 0 100%;
        transform: rotateY(0.001deg);
    }

    .trends-mode .country, .trends-mode .country * {
        cursor: none;
    }

    .cartogram-country-hover.trends-mode .country:hover {
        background-color: #dadada;
        transform: scale(1.5);
        transition: transform 0.1s;
        z-index: 5;
    }

    .trendline {
        display: none;
        opacity: 0;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
    }

    .country {
        position: absolute;
        border-radius: 4px;
        cursor: pointer;
        opacity: 1;
        z-index: 2;
        transition: top 0.2s, left 0.2s, width 0.2s, height 0.2s, background-color 0.2s, opacity 0.45s ease 0.15s;
        will-change: opacity, background-color, border-radius;
    }

    .trendline :global(svg) {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    .trends-block .trendline {
        display: block;
    }

    .trends-visible .trendline {
        opacity: 1;
        transition: opacity 0.2s;
    }

    .trends-mode .country {
        border-radius: 2px;
        background-color: #EAEAEA;
    }


    .country-text {
        color: white;
        font-weight: 500;
        font-size: 14px;
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        transform: translateY(-50%);
        text-align: center;
    }

    .cartogram-country-hover:not(.trends-mode) .country:not(:hover) {
        opacity: 0.65;
        transition: opacity 0.05s;
    }

    .cartogram-country-hover:not(.trends-mode) .country:hover {
        opacity: 0.999;
        transition: opacity 0s;
        z-index: 3;
    }
    .hover-chart {
        position: absolute;
        width: 200px;
        pointer-events: none !important;
        cursor: none;
        background: #EAEAEA;
        padding: 5px;
        box-shadow: 0px 0px 0px 0px #00000018;
        visibility: hidden;
        border: 1px solid #E7E7E7;
        transform: translate(-50%, -50%) translate(10px, 10px) scale(0.3);
        transform-origin: 50% 50%;
        z-index: 3;
    }

    .hover-chart--show {
        visibility: visible;
        box-shadow: 0px 0px 15px 0px #00000018;
        transition: box-shadow 0.1s, transform 0.03s ease-in;
        transform: translate(-50%, -50%) translate(10px, 10px) scale(1);

    }

    .hover-chart :global(svg) {
        width: 200px;
        height: 100px;
    }

    .help {
        opacity: 0;
    }

    .help-show {
        opacity: 1;
        transition: opacity 200ms;
    }

    .help-text {
        position: absolute;
        font-size: 14px;
        line-height: 20px;
        width: 180px;
        padding-bottom: 5px;
        z-index: 2;
    }

    .help-line {
        position: absolute;
        z-index: 1;
        border-left: 1px solid #dfdfdf;
    }

    .annotation-text {
        position: absolute;
        font-size: 14px;
        line-height: 20px;
        width: 220px;
        padding-bottom: 5px;
        z-index: 6;
        top: -35px;
        box-sizing: border-box;
    }


    .annotation-text:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 9px;
        top: 9px;
        width: 10px;
        background: #f3f3f3;
        box-shadow: -3px 0 2px 2px #f3f3f3;
        border-radius: 2px;
    }

    .annotation-textspan {
        position: relative;
        border-radius: 2px;
        background: #f3f3f3;
        box-shadow: -2px 0 2px 2px #f3f3f3, 3px 0 2px 2px #f3f3f3;
        box-decoration-break: clone;
        -webkit-box-decoration-break: clone;
    }

    .annotation-textspan > :global(span) {
        white-space: nowrap;
    }

    .annotation-text :global(sub) {
        margin-bottom: -0.2em;
        display: inline-block;
        font-size: 10px;
    }


    .annotation-line {
        position: absolute;
        top: 0;
        z-index: 5;
        border-left: 1px solid #bbbbbb;
    }

    .annotation {
        opacity: 1;
        pointer-events: none;
    }
    .annotation-help {
        transition: opacity 500ms;
    }

    .annotation-hide {
        opacity: 0;
        transition: opacity 0s;
    }

</style>