<script lang="ts">
    import type { CRIData } from '../data';
    import * as d3 from '../d3';

    export var data: CRIData;

    let chartWidth = 200;
    let chartHeight = 70;
    let barWidth = 6;
    let barHeight = 16;
    const y_track1 = 20;
    const y_track2 = 44;
    const y_track3 = 68;

    const x = d3.scaleLinear()
        .domain([0, 150])
        .range([chartWidth-(barWidth/2), barWidth/2]);

    const x_cri = x(data.cri_rank);
    const x_fat = x(data.fatalities_per_100000_inhabitants);
    const x_gdp = x(data.losses_per_unit_gdp_percentage);
    const cat_cri = getCategory(data.cri_rank);
    const cat_gdp = getCategory(data.losses_per_unit_gdp_percentage);
    const cat_fat = getCategory(data.fatalities_per_100000_inhabitants);

    function midPoint(a: number, b: number) {
        const diff = (b-a) / 2;
        const result = (a + diff);
        return Number(result.toFixed(2));
    }

    function getCategory(rank: number) {
        if (rank < 50) return 'high';
        else if (rank < 100) return 'med';
        else return 'low';
    }

    function curvePath(x1: number, y1: number, x2: number, y2: number) {
        const offset1 = 2;
        const offset2 = 3;
        let start = `${x1} ${y1}`;
        let c1 = `${x1} ${y1 + offset1}`;
        let c2 = `${x1} ${y1 + offset2}`;
        let c3 = `${midPoint(x1, x2)} ${midPoint(y1, y2)}`;
        let s0 = `${x2} ${y2 - offset1}`;
        let s1 = `${x2} ${y2}`;
        return `M ${start} C ${c1}, ${c2}, ${c3} S ${s0}, ${s1}`
    }

    function getPathStroke(cat1: string, cat2: string) {
        if (cat1===cat2) {
            const strokeColors = {
                low: '#00AACC',
                med: '#BDC7CD',
                high: '#FC7C2D'
            };
            return strokeColors[cat1];
        }

        const sorted = [cat1,cat2].sort();
        return `url(#${sorted[0]}-${sorted[1]})`;

    }

</script>

<svg viewBox="0 10 {chartWidth} {chartHeight}">
    <defs>
        <linearGradient id="high-med" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#BDC7CD;" />
            <stop offset="100%" style="stop-color:#FC7C2D;" />
        </linearGradient>

        <linearGradient id="low-med" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00AACC;" />
            <stop offset="100%" style="stop-color:#BDC7CD;" />
        </linearGradient>

        <linearGradient id="high-low" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#00AACC;" />
            <stop offset="50%" style="stop-color:#BDC7CD;" />
            <stop offset="100%" style="stop-color:#FC7C2D;" />
        </linearGradient>

    </defs>
    <g class="tracks">
        <line x1="0" y1={y_track1} x2="200" y2={y_track1}></line>
        <line x1="0" y1={y_track2} x2="200" y2={y_track2}></line>
        <line x1="0" y1={y_track3} x2="200" y2={y_track3}></line>
    </g>
    <g class="paths">

        <path stroke={getPathStroke(cat_cri, cat_fat)}
            d={curvePath(x_cri + (barWidth/2), y_track1 + (barHeight/2), x_fat + (barWidth/2), y_track2 - (barHeight/2))} />

        <path stroke={getPathStroke(cat_fat, cat_gdp)}
            d={curvePath(x_fat + (barWidth/2), y_track2 + (barHeight/2), x_gdp + (barWidth/2), y_track3 - (barHeight/2))} />
    </g>
    <g class="bars">
        <rect class="bar--{cat_cri}" height={barHeight} width={barWidth} x={x_cri} y={y_track1 - barHeight/2} rx="2" />
        <rect class="bar--{cat_fat}" height={barHeight} width={barWidth} x={x_fat} y={y_track2 - barHeight/2} rx="2" />
        <rect class="bar--{cat_gdp}" height={barHeight} width={barWidth} x={x_gdp} y={y_track3 - barHeight/2} rx="2" />
    </g>
</svg>

<style>

    .tracks line {
        stroke: #dddddd;
        shape-rendering: crispEdges;
        stroke-width: 1px;
        fill: none;
    }

    .bar--high { fill: #FC7C2D; }
    .bar--med { fill: #BDC7CD; }
    .bar--low { fill: #00AACC; }

    .paths path {
        fill: transparent;
        stroke-width: 1.5px;
    }

</style>