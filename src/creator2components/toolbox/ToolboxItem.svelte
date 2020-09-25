<script>
	import Svg from '../Svg.svelte';

	export let rootClass = 'svc-toolbox__item';

	export let title = null;
	export let icon = null;
</script>

<style lang="scss" global>
	.svc-toolbox__item {
		&:hover .svc-svg use {
			fill: #19b394;
		}
	}
</style>

<div class={rootClass}>
	<Svg width={24} height={24} iconName={icon} />

	<span> {title} </span>
</div>
