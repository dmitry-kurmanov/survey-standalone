<script>
	import SurveyString from './String.svelte';

	export let element = null;

	$: titleClass = element.cssTitle;
	$: headerClass = element.cssHeader;

	function onClick() {
		if (element.hasInput) element.focus();
		return true;
	}
</script>

<div class={headerClass} on:click={onClick()}>
	{#if element.hasTitle}
		<h5
			class={titleClass}
			aria-label={element.locTitle.renderedHtml}
			id={element.ariaTitleId}>
			{#if element.isRequireTextOnStart}
				<span
					class={element.cssClasses.requiredText}>{element.requiredText}</span>
			{/if}

			{#if element.no}
				<span
					style="position: static;"
					class={element.cssClasses.number}>{element.no}</span>
			{/if}

			{#if element.isRequireTextBeforeTitle}
				<span
					class={element.cssClasses.requiredText}>{element.requiredText}</span>
			{/if}

			<SurveyString locString={element.locTitle} />

			{#if element.isRequireTextAfterTitle}
				<span
					class={element.cssClasses.requiredText}>{element.requiredText}</span>
			{/if}
		</h5>
	{/if}

	{#if element.hasDescriptionUnderTitle}
		<div class={element.cssClasses.description}>
			<SurveyString locString={element.locDescription} />
		</div>
	{/if}
</div>
