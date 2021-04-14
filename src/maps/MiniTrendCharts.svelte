
<script lang="ts">
	import * as d3 from '../d3';
    import type { YearlyTimeseriesDatum } from '../data';

    // TODO: optimization these should only be created once on load
    // currently inconsistent data means some are being created on
    // the cartogram transition

    export var data: YearlyTimeseriesDatum[];
    export var category: string = 'stable';
    export var tileSize = 32;

    const years = data.map(d => d.year);
    const startYear = Math.min(...years);
    const endYear = Math.max(...years);

    const x = d3.scaleLinear()
        .domain([startYear, endYear+1])
        .range([ 0, tileSize ]);


    function datumToPath(c) {

        const yVals = data.map(d => d.value);

        const maxVal = Math.max(...yVals);
        const minVal = 0;
        const range = maxVal - minVal;
        const padding = range / 6;

        const y = d3.scaleLinear()
            .domain([minVal - padding, maxVal + padding])
            .range([ tileSize, 0 ]);

        const pathGenerator = d3.line<any>()
            .x(d => x(d.year))
            .y(d => y(d.value));

        return {
            ...c,
            path: pathGenerator(data)
        };
    }

    const _tmp = datumToPath(data);

</script>

<svg width={tileSize} height={tileSize} viewBox="0 0 {tileSize} {tileSize}">
<!-- <rect class="tile-rect" width={tileSize} height={tileSize} /> -->
    <path class="line stroke--{category}" d={_tmp.path} />
</svg>

<style>

    path {
        fill: none;
        stroke-width: 2px;
        pointer-events: none;
    }


</style>