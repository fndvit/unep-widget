<script lang="ts">
	import GHGCartogram from './GHGCartogram.svelte';
	import LineChartWidget from './LineChartWidget.svelte';

    import {default as rawData } from './data/ghgdata-full.json';

	function getDataForCountry(code: string) {
		function* generateRange(end: number, start = 0, step = 1) {
			let x = start - step;
			while(x < end - step) yield x += step;
		}

		const data = rawData.find(c => c.code === code)
		const years = Array.from(generateRange(2016, 1950));
		return years.map(year => {
			return {
				year, value: data[year]
			};
		});
	}
	
</script>

<main>
	<div class="top-section">
		<div class="left-pane">
			<h1>Lorem ipsum dolor sit amet, consectetuer</h1>
			<p>
				Lorem ipsum dolor sit amet, consectetuer adipiscing elit, label legend A , label legend B ,
				label legend C , sed diam nonummy nibh euismod tincidunt ut laoreet
			</p>
		</div>
		<div class="cartogram-container">
			<GHGCartogram />
		</div>
	</div>
	
	<div class="charts">
		<LineChartWidget data={getDataForCountry('CHN')} />
		<LineChartWidget data={getDataForCountry('USA')} />
		<LineChartWidget data={getDataForCountry('MYS')} />
		<LineChartWidget data={getDataForCountry('BRA')} />
	</div>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400&display=swap');

	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		font-family: 'Roboto', sans-serif;
		margin-top: 100px;
		background-color: #E6EFF5;
	}

	.top-section {
		display: flex;
	}

	.left-pane {
		width: 400px;
		text-align: left;
	}

	.left-pane h1 {
		color: #111;
		font-size: 52px;
		font-weight: 400;
		margin-bottom: 20px;
	}
	.left-pane p {
		font-size: 18px;
		line-height: 28px;
	}

	.cartogram-container {
		width: 800px;
		margin-top: -60px;
	}
	
	.cartogram-container :global(svg) {
		width: 100%;
	}

	
	.charts :global(svg) {
		width: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: 1200px;
		}
	}

	.charts {
		display: flex;
		gap: 40px;
	}
</style>