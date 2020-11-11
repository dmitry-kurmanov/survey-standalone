<script>
	import SurveyElements from './Elements.svelte';

	export let row = null;
	export let model = null;
	export let css = null;
</script>

<div>
	{#each row.elements as element (element.id)}
		{#if element.visible}
			<SurveyElements {element} {model} {css} />
		{/if}
	{/each}
</div>
