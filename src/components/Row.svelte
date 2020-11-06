<script>
	import SurveyElement from './Element.svelte';

	export let row = null;
	export let model = null;
	export let css = null;
</script>

<div>
	{#each row.elements as element (element.id)}
		{#if element.visible}
			<SurveyElement {element} {model} {css} />
		{/if}
	{/each}
</div>
