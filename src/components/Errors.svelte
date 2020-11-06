<script>
	import SurveyString from './string.svelte';

	export let element = null;

	$: classes = element.cssClasses
		? element.cssClasses.error.root
		: 'panel-error-root';
</script>

<div
	role="alert"
	class:sjs-hide={!element.errors || element.errors.length === 0}
	class={classes}>
	{#each element.errors as error}
		<div>
			<span
				class={element.cssClasses ? element.cssClasses.error.icon : 'panel-error-icon'}
				aria-hidden="true" />
			<span
				class={element.cssClasses ? element.cssClasses.error.item : 'panel-error-item'}>
				<SurveyString locString={error.locText} />
			</span>
		</div>
	{/each}
</div>
