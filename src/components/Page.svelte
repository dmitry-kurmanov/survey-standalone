<script>
	import SurveyString from './String.svelte';
	import SurveyRow from './Row.svelte';

	export let model = null;
	export let page = null;
	export let css = null;

	$: hasDescription = !!page.description;
	$: rows = page.rows;
</script>

<div class={page.cssClasses.page.root}>
	{#if page._showTitle}
		<h4 class={page.cssClasses.page.title}>
			<SurveyString locString={page.locTitle} />
		</h4>
	{/if}

	{#if page._showDescription}
		<div class={page.cssClasses.page.description}>
			<SurveyString locString={page.locDescription} />
		</div>
	{/if}

	{#each rows as row, index (page.id + '_' + index)}
		{#if row.visible}
			<div class={css.row}>
				<SurveyRow {row} {model} {css} />
			</div>
		{/if}
	{/each}
</div>
