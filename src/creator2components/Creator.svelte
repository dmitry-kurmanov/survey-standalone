<script>
	import Icons from './Icons.svelte';
	import Toolbox from './toolbox/Toolbox.svelte';

	export let rootClass = 'svc-root';

	export let toolboxCategories = [
		{
			items: [
				{
					title: 'Rating',
					icon: 'search',
				},
				{
					title: 'Radiogroup',
					icon: 'search',
				},
			],
		},
	];
</script>

<style lang="scss" global>
	.svc-root {
	}
</style>

<div class="{rootClass}">
	<Icons></Icons>

	<Toolbox categories="{toolboxCategories}"></Toolbox>
</div>
