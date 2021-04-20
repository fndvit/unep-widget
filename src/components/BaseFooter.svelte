<script lang="ts">
    import svgs from '../svg';
    import ScrollableX from './ScrollableX.svelte';

    export var background: string = "#e6e6e6";
    export var icon: string;
</script>

<footer style="background-color: {background}">
    <div class="footer-content">
        <ScrollableX>
            <div class="datasource">
                <div class="datasource-icon">{@html icon}</div>
                <span class="datasource-text">
                    <slot name="text" />
                </span>
                <slot name="content"/>
            </div>
        </ScrollableX>
    </div>
</footer>

<style>
    footer {
        position: relative;
    }
    .footer-content {
        max-width: 1100px;
        margin: auto;
    }

    .datasource {
        height: 50px;
        font-size: 16px;
        display: flex;
        align-items: center;
        color: #505050;
        font-weight: 300;
        white-space: nowrap;
    }

    .datasource .datasource-text {
        padding-right: 10px;
    }

    .datasource-icon {
        flex: 0 0 28px;
        padding-left: 8px;
        margin-right: 6px;
        position: relative;
        top: 2px;
    }
    .datasource-icon :global(svg *) {
        stroke: #666666;
    }
    @media (max-width: 700px) {
        .datasource {
            height: 40px;
            font-size: 14px;
            color:#333;
        }

        .datasource-icon {
            flex: 0 0 20px;
            top: 0;
        }
    }
</style>