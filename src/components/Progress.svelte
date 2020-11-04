<script>
	export let model = null;
	export let css = null;
</script>

<style>
</style>

<div class={css.progress}>
	<div
		class={css.progressBar}
		style="width: {model.getProgress() + '%'}"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100">
		<span> {model.progressText} </span>
	</div>
</div>
