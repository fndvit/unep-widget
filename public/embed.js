var script = document.currentScript;

function getIframePath(embed) {
	const currentScript = document.currentScript;
	const urlParts = currentScript.src.split('/');
	const urlPath = urlParts.slice(0, -1).join('/');
	return `${urlPath}/embed-${embed}.html`;
}

function injectIframe() {
    const dataEmbed = script.getAttribute('data-embed');
    const embeds = [
        "main", "ghg", "ghg-percapita", "ghg-trends", "ndc",
        "wh-temp", "wh-ocean", "wh-fires"
    ];

    const embed = embeds.indexOf(dataEmbed) === -1 ? 'main' : dataEmbed;

	var iframe = document.createElement('iframe');
    iframe.src = getIframePath(embed);
    iframe.style.width = "100%";
    iframe.style.height = 0;
    iframe.style.border = 0;
    iframe.style.margin = 0;
    iframe.style.padding = 0;
	script.parentNode.insertBefore(iframe, script);

    window.addEventListener('message', function(event) {
        if (event.data.type && event.data.type === 'unep-widget:resize'
            && iframe.contentWindow === event.source
        ) {
            var height = parseInt(event.data.value);
            iframe.style.height = height + "px";
        }
    }, false);
}

injectIframe();