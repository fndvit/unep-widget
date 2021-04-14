<script lang="ts">
  import * as d3 from '../d3';
  export var data;

  let width: number = 100;
  let height: number = 50;

  data.forEach(d => d.year = d3.timeParse("%m/%Y")(d.year))
  const defined = data.filter(d => d.value !== null)

  const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.year))
        .range([ 0, width]);

  const y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0]);
  
  const pathGenerator = d3.area<any>()
    .x(d => x(d.year))
    .y0(y(0))
    .y1(d => y(d.value));

</script>

<svg {width} {height} >
  <path class="line" d={pathGenerator(defined)} />
</svg>
    
<style>
  path {
    stroke-width: 2px;
    pointer-events: none;
  }
</style>