<script>
	import { onMount, onDestroy } from 'svelte';
	import radiogroup from './Radiogroup.svelte';

	export let element = null;
	export let css = null;

	$: dynamicComponent = components[element.getTemplate()];

	const components = {
		radiogroup,
	};
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
		<svelte:component this={dynamicComponent} {element} {css} />
	{/if}
</div>
