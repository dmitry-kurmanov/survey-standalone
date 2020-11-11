<script>
	import RadiogroupItem from './RadiogroupItem.svelte';
	export let element = null;
	export let css = null;
</script>

<fieldset class={element.cssClasses.root}>
	<legend aria-label={element.locTitle.renderedHtml} />
	{#if !element.hasColumns}
		{#each element.visibleChoices as item, index (item.value)}
			<RadiogroupItem
				{element}
				{item}
				{index} />
		{/each}
	{/if}

	{#if element.hasColumns}
		{#each element.columns as column, colIndex}
			<div class={element.getColumnClass()}>
				{#each column as item, index (item.value)}
					<RadiogroupItem
						{element}
						{item}
						index={'' + colIndex + index} />
				{/each}
			</div>
		{/each}
	{/if}

	{#if element.canShowClearButton}
		<div>
			<input
				type="button"
				class={element.cssClasses.clearButton}
				on:click={element.clearValue()}
				value={element.clearButtonCaption} />
		</div>
	{/if}
</fieldset>
