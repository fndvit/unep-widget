<script lang="ts">
	import * as d3 from './d3';

    // this local JSON data is temporary until we have an API
	import {default as cartogramDataRaw} from './data/cartogram-data.json';

    interface ICartogramData { // data defs
        
        // existing fields in JSON data
        name: string;
        short: string;
        code: string;
        emissions: number;
        emissions2005: number;
        x: number;
        y: number;

        // fields calculated / added below
        r: number; // box size
        category: string; // category used for coloring
        diff: number; // % emission change (2005 to 2015)
    }
	
	const width = 950;
	const height = 550;

	const largestEmission = Math.max(...cartogramDataRaw.map(d => d.emissions));

	const radius = d3.scaleSqrt()
		.domain([0, largestEmission])
		.range([0, 100]);

    function getNodeCategory(diff: number) {
        // 0 means the same. 0.5 means 50% increase. 1 means 100% increase. etc
        if (Math.abs(diff) < 0.05) return 'stable';
        else if (diff < -0.05) return 'falling';
        else if (diff > 0.4) return 'climbing-fast';
        else if (diff > 0.05) return 'climbing';
        else return 'none';
    }

	const nodes: ICartogramData[] = cartogramDataRaw.map(d => {
        const diff = (d.emissions - d.emissions2005) / d.emissions2005;
		return {
			...d,
			r: radius(d.emissions),
            diff,
            category: getNodeCategory(diff)
		}
	})

    let hoverNode: ICartogramData;

</script>

<svg width={width} height={height} viewBox="50 -120 {width} {height}" background-color="#E6EFF5">

    <g class="country-group">
        {#each nodes as d}
        <rect class="country country--{d.category}"
            x={d.x - d.r} y={d.y - d.r} width={d.r * 2} height={d.r * 2} 
            on:mouseover={() => hoverNode = d}
            on:mouseout={() => hoverNode = null}
            opacity={(hoverNode && hoverNode !== d) ? 0.5 : 1}
        ></rect>
        {#if d.r > 30}
            <text class="country-text" x={d.x} y={d.y}>
                {d.short}
            </text>
        {/if}
        {/each}
    </g>
    
    {#if hoverNode}
    <g class="hover-group">
        <line class="hover-line" x1={hoverNode.x} x2={hoverNode.x} y1={-50} y2={hoverNode.y - hoverNode.r - 5} />
        <foreignObject x={hoverNode.x - 20} y="-100" width="180" height="180">
            <div>
                <p class="hover-text">
                    {hoverNode.name} emitted {hoverNode.emissions.toLocaleString()} in 2019
                </p>
            </div>
        </foreignObject>
    </g>
    {/if}
</svg>

<style>

    .country {
        rx: 4px;
        fill: black;
        cursor: pointer;
        transition: opacity 0.1s;
    }

    .country--stable { fill: #BEC7CD; }
    .country--falling { fill: #00AACC; }
    .country--climbing { fill: #FDCC4D; }
    .country--climbing-fast { fill: #FD7D2E; }

    .country-text {
        fill: white;
        font-weight: 500;
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
    }

</style>