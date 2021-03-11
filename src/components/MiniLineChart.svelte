<script lang="ts">
    import * as d3 from '../d3';
    import type { YearlyTimeseriesDatum } from '../data';

    export let data: YearlyTimeseriesDatum[];

    const startYear = data[0].year;
    const endYear = data[data.length-1].year;
    const topPadding = 50;

    const chartWidth = 320;
    const chartHeight = 100;
    const width = chartWidth;
    const height = chartHeight + topPadding;
    const axisHeight = 20;



    const x = d3.scaleLinear()
        .domain([startYear, endYear])
        .range([ 0, chartWidth ]);

    const y = d3.scaleLinear()
        .domain([0, Math.max(...data.map(d => d.value))])
        .range([ chartHeight, 0 ]);

    const linePath = d3.line<YearlyTimeseriesDatum>().x(d => x(d.year)).y(d => y(d.value))(data);

    let hoverDatum: YearlyTimeseriesDatum;

    function mouseMove(event: any) {
        const pointer = d3.pointer(event);
        const closestYear = Math.round(x.invert(pointer[0]));
        hoverDatum = data.find(d => d.year === closestYear);
    }
</script>

<div class="chart-container">
    <svg width={width} height={height} viewBox="0 0 {width} {height + axisHeight}">

        <g class="x-axis" transform="translate(0, {y(0) + topPadding})">
            <line class="x-axis-line" x1={x(startYear)} x2={x(endYear)} y1="0" y2="0" />
            <text class="x-axis-text x-axis-text--min" y="2">{startYear}</text>
            <text class="x-axis-text x-axis-text--max" x={x(endYear)} y="2">{endYear}</text>
        </g>

        <g transform="translate(0, {topPadding})">
            <path class="line" d={linePath}></path>
        </g>

        {#if hoverDatum}
        <g transform="translate(0, {topPadding})">
            <line class="hover-line" x1={x(hoverDatum.year)} x2={x(hoverDatum.year)}
                y1={y(hoverDatum.value)} y2={y(0)} />
            <circle class="hover-circle" r="4" cx={x(hoverDatum.year)} cy={y(hoverDatum.value)} />
            <text class="hover-year" x={x(hoverDatum.year)} y={y(2) - 5}>{hoverDatum.year}</text>
            <text class="hover-value" x={x(hoverDatum.year)} y={y(hoverDatum.value) - 10}>{hoverDatum.value.toLocaleString()}</text>
        </g>
        {/if}

        <rect class="mouse-rect" width={width} height={height}
            on:mousemove={mouseMove} on:mouseout={() => hoverDatum = null} />

    </svg>

</div>

<style>
    .mouse-rect {
        fill: none;
        pointer-events: none;
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

    .hover-year {
        text-anchor: middle;
        dominant-baseline: bottom;
        fill: #555555;
        font-size: 16px;
    }

    .hover-value {
        text-anchor: middle;
        dominant-baseline: bottom;
        fill: #555555;
        font-weight: bold;
        font-size: 16px;
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
        font-size: 16px;
    }

    .x-axis-text--min {
        text-anchor: start;
    }
    .x-axis-text--max {
        text-anchor: end;
    }

    .chart-container {
        pointer-events: none;
    }
    .chart-container svg {
        pointer-events: none;
    }
</style>