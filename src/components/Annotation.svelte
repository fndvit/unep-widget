<script lang="ts">
    import { clamp } from "../util";

    export var canvasWidth: number;
    export var canvasHeight: number;
    export var x: number;
    export var y: number;
    export var text: string;
    export var radius: number;
    export var forceTopWherePossible: boolean = false;

    var textEl: HTMLElement;
    var el: HTMLElement;
    var pos: string;
    var textShiftX: number;
    var textShiftY: number;
    const textWidth = 250;

    interface StyleCss {
        left?: number;
        top?: number;
        bottom?: number;
        right?: number;
        width?: number;
        height?: number;
        transform?: string;
    }

    $: textWidthPerc = 100 * textWidth / canvasWidth;
    $: xPerc = (x / canvasWidth) * 100;
    $: yPerc = (y / canvasHeight) * 100;
    $: radiusX = 100 * radius / canvasWidth;
    $: radiusY = 100 * radius / canvasHeight;

    $: {
        if (forceTopWherePossible) {
            if (yPerc < 15) {
                pos = xPerc > 50  ? 'left' : 'right';
            } else {
                pos = 'above';
            }
        }
        else {
            const horizontal = xPerc > 65 || xPerc < 35;
            if (horizontal) {
                pos = xPerc > 50  ? 'left' : 'right';
            } else {
                pos = yPerc < 20 ? 'below' : 'above';
            }
        }
    }

    $: {
        textShiftX = null;
        textShiftY = null;
        if (pos === 'left') {
            style = {
                right: 100 - (xPerc - radiusX),
                top: yPerc,
            }

        }
        else if (pos === 'right') {
            style = {
                left: xPerc + radiusX,
                top: yPerc,
            }
        }
        else if (pos === 'above') {
            const topPaddingPx = 5;
            const topMin = 100 * (topPaddingPx / canvasHeight);
            style = {
                left: xPerc,
                top: forceTopWherePossible ? topMin : Math.max(topMin, yPerc - radiusY - 40),
                bottom: 100 - (yPerc - radiusY)
            }

        }
        else if (pos === 'below') {
            style = {
                left: xPerc,
                top: yPerc + radiusY,
                bottom: Math.max(0, 100 - yPerc - 50)
            }
        }

        if (pos === 'left' || pos === 'right') {
            const yShiftFactor = 25;
            if (yPerc < yShiftFactor) {
                textShiftY = -50 + ((yShiftFactor-yPerc) * (50/yShiftFactor));
            }
            else if (yPerc > (100-yShiftFactor)) {
                const _y = yShiftFactor - (100 - yPerc);
                textShiftY = -50 + (_y * (50/yShiftFactor));
            }
            else {
                textShiftY = -50;
            }
        }
        else if (pos === 'above' || pos === 'below') {
            const leftPaddingPx = 5;
            const leftPadding = (100 * leftPaddingPx/canvasWidth);
            const _textShiftX  = clamp(-(textWidthPerc/3), -xPerc + leftPadding, (100 - xPerc) - textWidthPerc);
            textShiftX = 100 * _textShiftX / textWidthPerc;
        }
    }

    var style: StyleCss;

    function calcStyle(style: StyleCss) {
        const dimProps = ['left', 'top', 'bottom', 'right', 'width', 'height']

        const dimStr = dimProps
            .filter(prop => style[prop] !== undefined)
            .map(prop => `${prop}: ${style[prop]}%; `)
            .join('')

        const transformStr = `transform: ${style.transform};`;
        return dimStr + transformStr;
    }


    $: styleStr = style ? calcStyle(style) : '';
    var textStyleStr: string;
    $: {
        const translateX = textShiftX !== null ? `translateX(${textShiftX}%)` : '';
        const translateY = textShiftY !== null ? `translateY(${textShiftY}%)` : '';
        textStyleStr = (translateX || translateY) ? `transform: ${translateX} ${translateY};` : '';
    }

</script>

<div class="annotation annotation--{pos}" style={styleStr}
    bind:this={el}>
    <div class="line line-before"></div>
    <div class="text" style={textStyleStr} bind:this={textEl}>
        {@html text}
    </div>
    <div class="line line-after"></div>
</div>

<style>

    .annotation {
        display: flex;
        position: absolute;
        pointer-events: none;
        height: auto !important;
        width: 0;
    }

    .text {
        flex: 0 0;
    }

    .prerender {
        visibility: hidden;
    }

    .line {
        flex: 1 1;
    }

    .annotation--right .line,
    .annotation--left .line {
        border-top: 1px solid black;
        height: 0;
    }
    .annotation--above .line,
    .annotation--below .line {
        border-left: 1px solid black;
        width: 0;
    }

    .annotation--left,
    .annotation--right {
        flex-direction: row;
        width: calc(250px + 5%);
    }

    .annotation--left .text,
    .annotation--right .text {
        flex: 0 0 250px;
    }

    .annotation--above,
    .annotation--below {
        flex-direction: column;
        height: 200px;
    }

    .annotation--above .line-before,
    .annotation--below .line-after,
    .annotation--left .line-before,
    .annotation--right .line-after {
        display: none;
    }

    .text {
        font-size: 13px;
        line-height: 1.3;
        width: 250px;
        text-shadow: 1px 1px 1px #f3f3f3, -1px 1px 1px #f3f3f3, 1px -1px 1px #f3f3f3, -1px -1px 1px #f3f3f3,
            2px 2px 2px #f3f3f3, -2px 2px 2px #f3f3f3, 2px -2px 2px #f3f3f3, -2px -2px 2px #f3f3f3,
            3px 3px 2px #f3f3f3, -3px 3px 2px #f3f3f3, 3px -3px 2px #f3f3f3, -3px -3px 2px #f3f3f3,
            -3px 0 2px #f3f3f3, 3px 0 2px #f3f3f3, 0 -3px 2px #f3f3f3, 0 3px 2px #f3f3f3,
            -4px 0 2px #f3f3f3, 4px 0 2px #f3f3f3, 0 -4px 2px #f3f3f3, 0 4px 2px #f3f3f3;
        z-index: 5;
        pointer-events: none;
    }

</style>
