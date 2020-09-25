<script>
	import ToolboxItem from './ToolboxItem.svelte';

	export let categories = [];

	export let rootClass = 'svc-toolbox';
	export let categoryClass = 'svc-toolbox__category';
</script>

<style lang="scss" global>
	.svc-toolbox {
		width: 48px;
	}

	.svc-toolbox__category {
		border-bottom: 1px solid #d6d6d6;
		padding-bottom: 22px;
	}

	.svc-toolbox__category:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}
</style>

<div class={rootClass}>
	{#each categories as category}
		<div class={categoryClass}>
			{#each category.items as item}
				<ToolboxItem title={item.title} icon={item.icon} />
			{/each}
		</div>
	{/each}
</div>
