<script>
	import { onMount } from 'svelte';
	import SurveyString from './String.svelte';
	import Logo from './Logo.svelte';

	export let model = null;

	let domNode = null;

	onMount(() => {
		model.afterRenderHeader(domNode);
	});
</script>

{#if (model.locTitle.renderedHtml.length > 0 && model.showTitle) || model.hasLogo}
	<div bind:this={domNode} class={model.css.header}>
		{#if model.isLogoBefore}
			<Logo {model} />
		{/if}

		{#if model.locTitle.renderedHtml.length > 0 && model.showTitle}
			<div class={model.css.headerText}>
				<h3 class={model.css.title}>
					<SurveyString locString={model.locTitle} />
				</h3>
				<h5 class={model.css.description}>
					<SurveyString locString={model.locDescription} />
				</h5>
			</div>
		{/if}

		{#if model.isLogoAfter}
			<Logo {model} />
			<div class="sv-logo--right-tail" />
		{/if}
	</div>
{/if}
