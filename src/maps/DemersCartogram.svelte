<script lang="ts" context="module">
    import type { YearlyTimeseriesDatum } from '../data';
    import { endYear } from '../data';

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
    export var offset: [number, number] = [0,0];
    export var trendsMode: boolean = false;
    export var trendsTimeseriesData: TrendsDataset[];
    export var helpText: {code: string, text: string} = null;
    export var hoverText: string = null;

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

        const xScale = d3.scaleLinear()
            .domain([0, domain[0]])
            .range([0, 740]);

        const yScale = d3.scaleLinear()
            .domain([0, domain[1]])
            .range([0, 420]);

        // add r values and categories
        cartogramData = data.map(d => {
            const trendsTimeseries = trendsTimeseriesLookup[d.code];
            const r = radius(d.value);
            return {
                ...d,

                category: getGHGCategory(trendsTimeseries),
                trendsTimeseries,

                left: xScale(d.x - r) + (offset[0] || 0),
                top: yScale(d.y - r) + (offset[1] || 0),

                // width height should be the same if the aspect is correct
                width: xScale(r * 2),
                height: yScale(r * 2),


            };
        });
        hoverData = null;
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

    var helpCountry: CartogramDataPoint;
    $: {
        helpCountry = null;
        window.setTimeout(() => {
            helpCountry = helpText ? cartogramData.find(d => d.code === helpText.code) : null;
        }, 10);

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

    var countryHoverState: boolean = false;
    var hoverTimeout: number;
    interface HoverData {
        x: number,
        y: number,
        country: CartogramDataPoint
    }

    let hoverData: HoverData = null;

    function onMouseOver(evt: MouseEvent, country) {
        const el = evt.currentTarget as Element;

        countryHoverState = true;

        hoverTimeout = window.setTimeout(() => {
            if (!countryHoverState) return;
            const {left,top} = el.getBoundingClientRect();
            const containerRect = containerEl.getBoundingClientRect();
            hoverData = {
                country,
                x: left - containerRect.left,
                y: top - containerRect.top
            };
        }, 350);
    }

    function generateHoverText(text: string, country: CartogramDataPoint): string {
        return text
            .replace("%country%", country.name)
            .replace("%value%", Math.round(country.value).toLocaleString())
            .replace("%value1dp%", (Math.round(country.value*10)/10).toLocaleString())
            .replace("%year%", `${endYear}`);
    }

    function onMouseOut() {
        hoverData = null;
        countryHoverState = false;
        window.clearTimeout(hoverTimeout);
    }

</script>

<div class="cartogram" bind:this={containerEl}
    class:trends-mode={trendsMode} class:test={lineDisplayBlock} class:trends-visible={lineFadeIn}
    class:hovering={countryHoverState} class:showing-chart={hoverData}
>

    <div class="countries" >
        {#each cartogramData as d (d.code)}
        {#if d.x && d.y}
        <div class="country bg--{d.category}"
            style={calcStyle(d)}
            data-code={d.code}
            on:mouseover={(evt) => onMouseOver(evt, d)}
            on:mouseleave={onMouseOut}
        >
            {#if d.width > 50}
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



    {#if helpText}
    <div class="help" class:help-show={helpCountry && !countryHoverState}>
        {#if helpCountry}
        <div class="help-line" style="left: {helpCountry.left - 1 + helpCountry.width/2}px; top: {0}px; height: {helpCountry.top - 2}px;"></div>
        <div class="help-text" style="top: -20px; left: {helpCountry.left - 40 + helpCountry.width/2}px;">{@html helpText.text}</div>
        {/if}
    </div>
    {/if}

    {#if hoverText && hoverData && !trendsMode }
    <div class="annotation">
        <div class="annotation-text" style="left: {hoverData.x - 80 + hoverData.country.width / 2}px;">
            <span class="annotation-textspan">
                {@html generateHoverText(hoverText, hoverData.country)}
            </span>
        </div>
        <div class="annotation-line"
            style="left: {hoverData.x + hoverData.country.width / 2}px; height: {hoverData.country.y - 16 - hoverData.country.height/2}px;">
        </div>
    </div>
    {/if}


    {#if trendsMode && hoverData}
    <div class="hover-chart" class:hover-chart--show={hoverData}
        style="top: {hoverData.y}px; left: {hoverData.x}px;" >
            <h2>{hoverData.country.name}</h2>
            <MiniLineChart data={hoverData.country.trendsTimeseries} category={hoverData.country.category} />
    </div>
    {/if}
</div>

<style>
    .cartogram {
        position: relative;
        transform-origin: 0 0;
        height: 100%;
        width: 100%;
    }

    .countries {
        position: relative;
        top: 0px;
    }

    .showing-chart .country:hover {
        cursor: none;
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
        opacity: 1;
        z-index: 2;
        transition: top 0.2s, left 0.2s, width 0.2s, height 0.2s, background-color 0.2s, opacity 0.45s ease 0.15s;
    }

    .hovering:not(.trends-mode) .country:not(:hover) {
        opacity: 0.65;
        transition: opacity 0.05s;
    }
    .hovering:not(.trends-mode) .country.bg--stable:not(:hover) {
        background-color: #bec7cde8;
    }

    .hovering:not(.trends-mode) .country:hover {
        opacity: 0.999; /* not 1 so it overrides the opacity: 1 in the other def */
        transition: opacity 0s;
        z-index: 3;
    }
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

    .help {
        opacity: 0;
    }

    .help-show {
        opacity: 1;
        transition: opacity 0.2s ease 0.2s;
    }

    .help-text {
        position: absolute;
        font-size: 14px;
        line-height: 20px;
        width: 180px;
        background-color: #F3F3F3;
        padding-bottom: 5px;
        z-index: 2;
        text-align: left;
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
        z-index: 3;
        text-align: left;
        bottom: calc(100% - 15px);
        padding: 0 20px;
        box-sizing: border-box;
    }

    .annotation-textspan {
        border-radius: 5px;
        background: #f3f3f3;
        box-shadow: -3px 0 2px 2px #f3f3f3, 3px 0 2px 2px #f3f3f3;
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
        top: 14px;
        z-index: 5;
        border-left: 1px solid #bbbbbb;
    }

</style>