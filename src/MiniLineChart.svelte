<script context="module" lang="ts">
    export interface IDatum {
        year: number, value: number
    };
</script>

<script lang="ts">
    import * as d3 from './d3';

    export let data: IDatum[];

    const startYear = data[0].year;
    const endYear = data[data.length-1].year;
    const width = 300;
    const height = 100;

    const x = d3.scaleLinear()
        .domain([startYear, endYear])
        .range([ 0, width ]);

    const y = d3.scaleLinear()
        .domain([0, Math.max(...data.map(d => d.value))])
        .range([ height, 0 ]);

    const linePath = d3.line<IDatum>().x(d => x(d.year)).y(d => y(d.value))(data);

    let hoverDatum: IDatum;

    function mouseMove(event: any) {
        const pointer = d3.pointer(event);
        const closestYear = Math.round(x.invert(pointer[0]));
        hoverDatum = data.find(d => d.year === closestYear);
    }
</script>

<div id="chart-container">
    <svg width={width+4} height={height+24} viewBox="-2 -2 {width+4} {height+24}">

        <g class="x-axis" transform="translate(0, {y(0)})">
            <line class="x-axis-line" x1={x(startYear)} x2={x(endYear)} y1="0" y2="0" />
            <text class="x-axis-text x-axis-text--min" y="2">{startYear}</text>
            <text class="x-axis-text x-axis-text--max" x={x(endYear)} y="2">{endYear}</text>
        </g>

        <path class="line" d={linePath}></path>

        {#if hoverDatum}
        <g>
            <line class="hover-line" x1={x(hoverDatum.year)} x2={x(hoverDatum.year)} 
                y1={y(hoverDatum.value)} y2={y(0)} />
            <circle class="hover-circle" r="4" cx={x(hoverDatum.year)} cy={y(hoverDatum.value)} />
        </g>
        {/if}

        <rect class="mouse-rect" width={width} height={height}
            on:mousemove={mouseMove} on:mouseout={() => hoverDatum = null} />

    </svg>
        
</div>

<style>
    .mouse-rect {
        fill: none;
        pointer-events: all;
    }
    .hover-line {
        stroke-width: 1;
        stroke: #D7DFE5;
    }

    .hover-circle {
        stroke-width: 2;
        stroke: black;
        fill: none;
    }

    .line {
        fill: none;
        stroke: #00AACC;
        stroke-width: 3;
    }

    .x-axis-line {
        stroke-width: 1;
        stroke: #D7DFE5;
        shape-rendering: crispEdges;
    }

    .x-axis-text {
        font-weight: 100;
        fill: #a0a0a0;
        dominant-baseline: hanging;
    }
    
    .x-axis-text--min {
        text-anchor: start;
    }
    .x-axis-text--max {
        text-anchor: end;
    }
</style>