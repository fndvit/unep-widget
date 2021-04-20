import WHEmbed from './WHEmbed.svelte';

var script = document.currentScript;
const dataView = script.getAttribute('data-view');
const embeds = [ "temp", "ocean", "fires" ];

if (embeds.indexOf(dataView) === -1) {
	throw Error("unknown embed");
}

const app = new WHEmbed({
	target: document.body,
	props: {
		view: dataView
	}
});

export default app;