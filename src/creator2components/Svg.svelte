<script>
	export let rootClass = 'svc-svg';

	export let iconName = null;
	export let width = 16;
	export let height = 16;
</script>

<svg class="{rootClass}" width="{width}" height="{height}">
	<use href="#svc-icon-{iconName}" />
</svg>

<style>
	:global(.svc-svg use) {
		fill: #909090;
	}
</style>
