<script>
	export let model = null;
	export let css = null;
</script>

<div class={css.progress}>
	<div
		class={css.progressBar}
		style="width: {model.getProgress() + '%'}"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100">
		<span class={css.progressText}> {model.progressText} </span>
	</div>
</div>
