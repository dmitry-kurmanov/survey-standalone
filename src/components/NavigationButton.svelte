<script>
	export let model = null;
	export let css = null;
</script>

<div class={css.footer}>
	<input
		type="button"
		value={model.startSurveyText}
		class={model.cssNavigationStart}
		on:click={model.start()} />
</div>
