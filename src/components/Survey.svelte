<script>
	export let model = null;
	const css = model.getCss();
	const hasTitle = model.showTitle && !!model.title;
</script>

<style>
</style>

<div class={css.root}>
	<div class="sv_custom_header" />
	<div class="sv_container" />

	{#if hasTitle}
		<div class={css.header}>
			<h3>{model.locTitle}</h3>
		</div>
	{/if}
</div>
