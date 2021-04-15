<script lang="ts">
  import * as d3 from '../d3';
  export var data;

  export var width: number;
  export var selected: boolean = false;
  $: height = selected ? width * .7 : width * .8;
  let margin = { top: selected ? 60 : 10, right: 0, bottom: selected ? 16 : 0, left: selected ? 8 : 3};

  $: x = d3.scaleLinear()
        .domain([new Date(2013, 2), new Date(2018, 6)])
        .range([ margin.left, width - margin.right]);

  $: y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height - margin.bottom, margin.top]);

  $: lineGenerator = d3.line<any>()
    .x(d => x(d3.timeParse("%m/%Y")(d.year)))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);;
  
  $: areaGenerator = d3.area<any>()
    .x(d => x(d3.timeParse("%m/%Y")(d.year)))
    .y0(y(0))
    .y1(d => y(d.value))
    .curve(d3.curveMonotoneX);;

</script>
<div class='container'>
<svg width={width} height={height} >
  {#each data as d,i}
  <circle class="circle" cx={x(d3.timeParse("%m/%Y")(d.year))} cy={y(d.value)} r={selected ? (i === data.length -1 ) ? 4.5 : 3 : 2} />
  {/each}
  <path class="line {selected ? 'selected' : ''}" d={lineGenerator(data)} />
  <path class="area" d={areaGenerator(data)} />
  {#if selected}
  <g class="axis">
    <line x1={x(new Date(2013, 2))} y1={y(0)} x2={x(new Date(2018, 2))} y2={y(0)} />
    <text x={x(new Date(2013, 2))} y={y(0) + 16}>2013</text>
    <text x={x(new Date(2018, 2))} y={y(0) + 16} text-anchor='end'>2018</text>
  </g>
  {/if}
</svg>

</div>
    
<style>
  path {
    pointer-events: none;
  }
  .area {
    fill: #00aacc;
    opacity: .2;
  }
  .line {
    stroke: #00aacc;
    stroke-width: 2px;
    fill:none;
  }
  .selected { stroke-width: 3px;}
  .circle {
    fill: #00aacc;
  }
  .container {
    width: 100%;
    pointer-events: none;
  }

  .axis line {
    stroke:#AAAAAA;
  }

  .axis text {
    font-size: 12px;
    fill: #808080;
  }
</style>