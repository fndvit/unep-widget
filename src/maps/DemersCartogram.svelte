<script lang="ts" context="module">
    export interface CountryDataPoint {
        name: string;
        short: string;
        code: string;
        x: number;
        y: number;
        value: number;
    }
</script>

<script lang="ts">

	import * as d3 from '../d3';

    interface CartogramDataPoint extends CountryDataPoint {
        r: number
    }

    export var data: CountryDataPoint[];
    export var nodeSize: number = 100;


    var cartogramData: CartogramDataPoint[];

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
                //category: category(d)
            };
        });
    }

    // function getNodeCategory(diff: number) {
    //     // 0 means the same. 0.5 means 50% increase. 1 means 100% increase. etc
    //     if (Math.abs(diff) < 0.05) return 'stable';
    //     else if (diff < -0.05) return 'falling';
    //     else if (diff > 0.4) return 'climbing-fast';
    //     else if (diff > 0.05) return 'climbing';
    //     else return 'none';
    // }

    let hoverNode: CartogramDataPoint;

    function calcStyle(d: CartogramDataPoint) {
        const width = 950;
        const height = 550;

        const xScale = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, 600])
            .range([0, height]);

        const styles = [
            `left: ${xScale(d.x - d.r)}px`,
            `top: ${yScale(d.y - d.r)}px`,
            `width: ${xScale(d.r * 2)}px`,
            `height: ${yScale(d.r * 2)}px`,
        ];
        return styles.join(';');
    }

</script>

<div class="container">

    <div class="countries">
        {#each cartogramData as d}
        <div class="country" class:faded={hoverNode && hoverNode !== d}
            style={calcStyle(d)}
            on:mouseover={() => hoverNode = d}
            on:mouseout={() => hoverNode = null}
        >
            {#if d.r > 30}
            <span class="country-text">{d.short}</span>
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
</div>

<style>

    .container {
        position: relative;
    }

    .countries {
        position: relative;
        top: 120px;
        left: -100px;
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

    .faded {
        opacity: 0.5;
    }

    .country {
        /* rx: 4px; */
        position: absolute;
        border-radius: 4px;
        background-color: #BEC7CD;
        cursor: pointer;
        transition: opacity 0.1s, top 0.2s, left 0.2s, width 0.2s, height 0.2s;
    }

    /* .country--stable { fill: #BEC7CD; }
    .country--falling { fill: #00AACC; }
    .country--climbing { fill: #FDCC4D; }
    .country--climbing-fast { fill: #FD7D2E; }

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

</style>