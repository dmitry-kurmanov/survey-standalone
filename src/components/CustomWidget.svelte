<script>
	import { onMount, onDestroy } from 'svelte';
	import { getElementByName } from './elements/_register.js';

	export let element = null;
	export let css = null;

	$: dynamicElement = getElementByName(element.getTemplate());

	let domNode = null;

	onMount(() => {
		element.customWidget.afterRender(element, domNode);
	});
	onDestroy(() => {
		element.customWidget.willUnmount(element, domNode);
	});
</script>

<div bind:this={domNode}>
	{#if !!element.customWidget.htmlTemplate}
		<div>
			{@html element.customWidget.htmlTemplate}
		</div>
	{/if}
	{#if element.customWidget.isDefaultRender}
		<svelte:component this={dynamicElement} {element} {css} />
	{/if}
</div>
