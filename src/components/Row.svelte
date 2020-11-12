<script>
	import SurveyElement from './Element.svelte';

	export let row = null;
	export let model = null;
	export let css = null;
</script>

<div>
	{#each row.elements as element (element.idValue)}
		{#if row.isNeedRender && element.visible}
			<SurveyElement {element} {model} {css} />
		{/if}
	{/each}
</div>
