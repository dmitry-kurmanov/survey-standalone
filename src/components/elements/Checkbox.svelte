<script>
	import CheckboxItem from './CheckboxItem.svelte';
	export let element = null;
	export let css = null;
</script>

<fieldset class={element.cssClasses.root}>
	<legend aria-label={element.locTitle.renderedHtml} />

	{#if !element.hasColumns}
		{#each element.visibleChoices as item, index (item.value)}
			<CheckboxItem {element} {item} {index} />
		{/each}
	{/if}

	{#if element.hasColumns}
		{#each element.columns as column, colIndex}
			<div class={element.getColumnClass()}>
				{#each column as item, index (item.value)}
					<CheckboxItem
						{element}
						{item}
						index={'' + colIndex + index}
						{values} />
				{/each}
			</div>
		{/each}
	{/if}
</fieldset>
