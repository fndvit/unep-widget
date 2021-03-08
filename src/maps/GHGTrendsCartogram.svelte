<script lang="ts">
    import type {IDatum} from '../components/MiniLineChart.svelte';
    import MiniLineChart from '../components/MiniLineChart.svelte';

	import * as d3 from '../d3';
    import rawData from '../data/ghgdata-full.json';

    const width = 1220;
	const height = 520;
    const tileSize = 32;
    const startYear = 1950;
    const endYear = 2015;
    var containerEl: Element;


    const x = d3.scaleLinear()
        .domain([startYear, endYear+1])
        .range([ 0, tileSize ]);

    function* generateRange(end: number, start = 0, step = 1) {
        let x = start - step;
        while(x < end - step) yield x += step;
    }

    interface HoverData {
        x: number,
        y: number,
        country: any,
        showHoverChart: boolean
    }

    let hoverData;

    const data = rawData
        .filter(c => c.tx && c.ty)
        .map(c => {
            const years = Array.from(generateRange(endYear, startYear));
            const lineData: IDatum[] = years.map(year => {
                return {year, value:c[year]}
            });

            const yVals = lineData.map(d => d.value);

            const maxVal = Math.max(...yVals);
            const minVal = Math.min(...yVals);
            const range = maxVal - minVal;
            const padding = range / 6;

            const y = d3.scaleLinear()
                .domain([minVal - padding, maxVal + padding])
                .range([ tileSize, 0 ]);

            const pathGenerator = d3.line<IDatum>()
                .x(d => x(d.year))
                .y(d => y(d.value));

            return {
                ...c,
                path: pathGenerator(lineData),
                lineData
            };
        });



        var hoverTimeout: number;

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

            hoverTimeout = window.setTimeout(() => hoverData.showHoverChart = true, 300)
        }

        function onMouseOut() {
            hoverData = null;
            window.clearTimeout(hoverTimeout);
        }

</script>

<div class="container" bind:this={containerEl}></div>
<svg class="hoversvg" width={width} height={height} viewBox="-20 -20 {width+100} {height+140}" background-color="#E6EFF5">
    {#each data as country}
        <g transform="translate({country.tx - tileSize/2},{country.ty -tileSize / 2})"
            data-country={country.name} >
        <rect class="hover-rect" width={tileSize} height={tileSize}
            on:mouseover={(evt) => onMouseOver(evt, country)} on:mouseout={onMouseOut} />
        </g>
    {/each}
</svg>

<svg width={width} height={height} viewBox="-20 -20 {width+100} {height+140}" background-color="#E6EFF5">
    <g>
        {#each data as country}
        <g transform="translate({country.tx - tileSize/2},{country.ty -tileSize / 2})"
            data-country={country.name} >

            <g class:hovered={hoverData && hoverData.country === country}>
                <rect class="tile-rect" width={tileSize} height={tileSize} />
                <path class="line" d={country.path} />
            </g>

        </g>
        {/each}
    </g>
</svg>

{#if hoverData}
<div class="hover-chart" class:hover-chart--show={hoverData.showHoverChart}
    style="top: {hoverData.y}px; left: {hoverData.x}px;" >
        <h2>{hoverData.country.name}</h2>
        <MiniLineChart data={hoverData.country.lineData}  />
</div>
{/if}

<style>

    .hover-chart h2 {
        font-size: 20px;
        font-weight: 500;
        margin: 0;
    }
    .hovered rect {
        /* stroke-width: 2px;
        stroke: #BDC6CD; */
        filter: brightness(1.2);
    }

    .hoversvg {
        z-index: 100;
        position: absolute;
        left: 0;
        top: 0;
    }

    /* svg {
    } */

    .hover-chart {
        position: absolute;
        width: 200px;
        pointer-events: none !important;
        transform: translateX(-50%) translateY(-50%);
        background: #EAEAEA;
        padding: 5px;
        box-shadow: 0px 0px 0px 0px #00000018;
        visibility: hidden;
        border: 1px solid #E7E7E7;
    }

    .hover-chart--show {
        visibility: visible;
        box-shadow: 0px 0px 15px 0px #00000018;
        transition: box-shadow 0.1s;

    }

    .hover-chart :global(svg) {
        width: 200px;
        height: 100px;
    }

    .tile-rect {
        fill: #EAEAEA;
        pointer-events: none;
        /* stroke-width: 1px;
        stroke: #555555; */
    }
    .line {
        stroke-width: 2px;
        stroke: #BDC6CD;
        fill: none;
        pointer-events: none;
    }

    .hover-rect {
        fill: none;
        pointer-events: visible;
        cursor: pointer;
    }

</style>