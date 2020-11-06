<script>
	import SurveyString from './String.svelte';
	import SurveyRow from './Row.svelte';

	export let model = null;
	export let page = null;
	export let css = null;

	$: hasTitle = model.showPageTitles && !!page.title;
	$: hasDescription = !!page.description;
	$: rows = page.rows;
</script>

<div class={css.page.root}>
	<h4 class:sjs-hide={!hasTitle} class={css.pageTitle}>
		<SurveyString locString={page.locTitle} />
	</h4>
	<div class:sjs-hide={!hasDescription} class={css.pageDescription}>
		<SurveyString locString={page.locDescription} />
	</div>
	{#each rows as row}
		{#if row.visible}
			<div class={css.row}>
				<SurveyRow {row} {model} {css} />
			</div>
		{/if}
	{/each}
</div>
