<script>
	export let model = null;
	export let css = null;

	function start() {
		model.start();
	}
</script>

<div class={css.footer}>
	<input
		type="button"
		value={model.startSurveyText}
		class={model.cssNavigationStart}
		on:click={start} />
</div>
