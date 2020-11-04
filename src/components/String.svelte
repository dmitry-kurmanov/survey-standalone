<script>
	export let locString = null;
</script>

<span style="position: static;">
	{#if locString.hasHtml}
		<span style="position: static;">
			{@html locString.renderedHtml}
		</span>
	{:else}{locString.renderedHtml}{/if}
</span>
