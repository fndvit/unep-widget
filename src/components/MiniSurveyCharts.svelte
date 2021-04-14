<script lang="ts">
  import * as d3 from '../d3';
  export var data;

  export var width: number;
  $: height = width * .8;
  let margin = { top: 10, right: 3, bottom: 0, left: 3};

  $: x = d3.scaleLinear()
        .domain([new Date(2013, 2), new Date(2018, 2)])
        .range([ margin.left, width - margin.right]);

  $: y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height - margin.bottom, margin.top]);

  $: lineGenerator = d3.line<any>()
    .x(d => x(d.year))
    .y(d => y(d.value))
    .curve(d3.curveMonotoneX);;
  
  $: areaGenerator = d3.area<any>()
    .x(d => x(d.year))
    .y0(y(0))
    .y1(d => y(d.value))
    .curve(d3.curveMonotoneX);;

</script>
<div class='container'>
<svg width={width - margin.left - margin.right} height={height - margin.top - margin.bottom} >
  <path class="line" d={lineGenerator(data)} />
  <path class="area" d={areaGenerator(data)} />
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
    stroke-width: 1.5px;
    fill:none;
  }
  .container {
    width: 100%;
  }
</style>