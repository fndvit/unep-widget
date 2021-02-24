<script lang="ts">
	import GHGCartogram from './GHGCartogram.svelte';
	import MiniLineChart from './MiniLineChart.svelte';

    import {default as rawData } from './data/ghgdata-full.json';

	function getTestDataUSA() {

		function* generateRange(end: number, start = 0, step = 1) {
			let x = start - step;
			while(x < end - step) yield x += step;
		}

		const USA = rawData.find(c => c.code === "USA")
		const years = Array.from(generateRange(2016, 1950));
		return years.map(year => {
			return {
				year, value: USA[year]
			};
		});
	}
	
</script>

<main>
	<MiniLineChart data={getTestDataUSA()} />
	<GHGCartogram />
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>