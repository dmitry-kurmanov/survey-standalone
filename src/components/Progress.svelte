<script>
	export let model = null;
	export let css = null;

	$: progress = model.progressValue + '%';
</script>

<div class={css.progress}>
	<div
		class={css.progressBar}
		style="width: {progress}"
		role="progressbar"
		aria-valuemin="0"
		aria-valuemax="100">
		<span class={css.progressText + ' ' + css.progressTextInBar}>
			{model.progressText}
		</span>
	</div>
	<span
		class={css.progressText + ' ' + css.progressTextUnderBar}>{model.progressText}</span>
</div>
