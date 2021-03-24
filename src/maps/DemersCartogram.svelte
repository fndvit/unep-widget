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
    import { getGHGCategory } from '../data';

	import * as d3 from '../d3';
    import MiniTrendCharts from './MiniTrendCharts.svelte';
    import MiniLineChart from '../components/MiniLineChart.svelte';

    interface CartogramDataPoint extends CountryDataPoint {
        r: number;
        category: string;
        trendsTimeseries: YearlyTimeseriesDatum[];
    }

    export var data: CountryDataPoint[];
    export var nodeSize: number = 100;
    export var datasetWidth: number;
    export var xOffset: number = 0;
    export var trendsMode: boolean = false;
    export var trendsTimeseriesData: TrendsDataset[];
    var containerEl: Element;

    var cartogramData: CartogramDataPoint[];

    var trendsTimeseriesLookup: {[code: string]: YearlyTimeseriesDatum[]} = {};
    trendsTimeseriesData.forEach(d=> trendsTimeseriesLookup[d.code] = d.data)

    $: {
	    const largestVal = Math.max(...data.map(d => d.value));
        // TODO: do we use 0 for range bottom? what about negative emissions?
        const radius = d3.scaleSqrt()
            .domain([0, largestVal])
            .range([0, nodeSize]);

        // add r values and categories
        cartogramData = data.map(d => {
            return {
                ...d,
                r: radius(d.value),
                category: getGHGCategory(trendsTimeseriesLookup[d.code]),
                trendsTimeseries: trendsTimeseriesLookup[d.code]
            };
        });
    }

    var lineDisplayBlock: boolean = false;
    var lineFadeIn: boolean = false;
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
        if (!trendsMode) {
            if (timeout) {
                window.clearTimeout(timeout);
                timeout = null;
            }
            lineDisplayBlock = false;
            lineFadeIn = false;
        }
    }

    let hoverNode: CartogramDataPoint;

    function calcStyle(d: CartogramDataPoint) {
        const ratio = 0.6

        const xScale = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, datasetWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, 600])
            .range([0, datasetWidth * ratio]);

        const styles = [
            `left: ${xScale(d.x - d.r) + (xOffset || 0)}px`,
            `top: ${yScale(d.y - d.r)}px`,
            `width: ${xScale(d.r * 2)}px`,
            `height: ${yScale(d.r * 2)}px`,
        ];
        return styles.join(';');
    }


    var hoverTimeout: number;
    interface HoverData {
        x: number,
        y: number,
        country: CartogramDataPoint,
        showHoverChart: boolean
    }

    let hoverData: HoverData = null;

    function onMouseOver(evt: MouseEvent, country) {
        const el = evt.currentTarget as Element;
        const {left,top} = el.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();

        hoverData = {
            country,
            x: left - containerRect.left,
            y: top - containerRect.top,
            showHoverChart: false
        };

        hoverTimeout = window.setTimeout(() => hoverData.showHoverChart = true, 400)
    }

    function onMouseOut() {
        hoverData = null;
        window.clearTimeout(hoverTimeout);
        console.log('mouseout');
    }

</script>

<div class="cartogram" bind:this={containerEl}
    class:trends-mode={trendsMode} class:test={lineDisplayBlock} class:trends-visible={lineFadeIn}
    class:hovering={hoverData !== null}
>

    <div class="countries" >
        {#each cartogramData as d (d.code)}
        <div class="country bg--{d.category}"
            style={calcStyle(d)}
            on:mouseover={(evt) => onMouseOver(evt, d)}
            on:mouseleave={onMouseOut}
        >
            {#if d.r > 30}
            <span class="country-text">{d.short}</span>
            {/if}

            {#if d.trendsTimeseries}
                <div class="trendline" >
                    <MiniTrendCharts data={d.trendsTimeseries} category={d.category} />
                </div>
            {/if}

        </div>
        {/each}


<!--
    {#if hoverNode}
    <g class="hover-group">
        <line class="hover-line" x1={hoverNode.x} x2={hoverNode.x} y1={-50} y2={hoverNode.y - hoverNode.r - 5} />
        <foreignObject x={hoverNode.x - 20} y="-100" width="180" height="180">
            <div>
                <p class="hover-text">
                    {hoverNode.name} emitted {hoverNode.value.toLocaleString()} in 2019
                </p>
            </div>
        </foreignObject>
    </g>
    {/if} -->
    </div>

    {#if trendsMode && hoverData}
    <div class="hover-chart" class:hover-chart--show={hoverData.showHoverChart}
        style="top: {hoverData.y}px; left: {hoverData.x}px;" >
            <h2>{hoverData.country.name}</h2>
            <MiniLineChart data={hoverData.country.trendsTimeseries} category={hoverData.country.category} />
    </div>
    {/if}
</div>

<style>

    .cartogram {
        position: relative;
    }

    .countries {
        position: relative;
        top: 120px;
    }

    .hovering:not(.trends-mode) .country {
        opacity: 0.6;
    }

    .hovering:not(.trends-mode) .country:hover {
        opacity: 1;
    }

    .hovering.trends-mode .country:hover {
        filter: brightness(1.05);
        transform: scale(1.5);
        transition: transform 0.1s;
        z-index: 2;
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

    .test .trendline {
        display: block;
    }

    .trendline :global(svg) {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
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
    }

    .country {
        position: absolute;
        border-radius: 4px;
        cursor: pointer;
        transition: opacity 0.1s, top 0.2s, left 0.2s, width 0.2s, height 0.2s, background-color 0.2s;
    }


    /*
    .country-text {
        pointer-events: none;
        text-anchor: middle;
        dominant-baseline: middle;
    }

    .hover-group {
        pointer-events: none;
    }

    .hover-line {
        stroke: 1px;
        shape-rendering: crispEdges;
        stroke: #777777;
    }

    .hover-text {
        margin: 0;
        text-align: left;
    } */

    .hover-chart h2 {
        font-size: 18px;
        font-weight: 500;
        margin: 0;
        text-align: left;
        width: 100%;
        padding-left: 5px;
        padding-top: 2px;
        margin-bottom: -10px;

    }
    .hover-chart {
        position: absolute;
        width: 200px;
        pointer-events: none !important;
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

</style>