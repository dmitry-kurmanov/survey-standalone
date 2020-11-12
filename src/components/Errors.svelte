<script>
	import SurveyString from './string.svelte';

	export let element = null;
	export let location = '';

	function getClasses(element) {
		let classes = element.cssClasses
			? element.cssClasses.error.root
			: 'panel-error-root';

		let additionalClasses = '';

		if (location === 'top') {
			additionalClasses = element.cssClasses.error.locationTop;
		} else if (location === 'bottom') {
			additionalClasses = element.cssClasses.error.locationBottom;
		}

		if (additionalClasses) classes += ' ' + additionalClasses;

		return classes;
	}
</script>

<div
	role="alert"
	class:sjs-hide={!element.errors || element.errors.length === 0}
	class={getClasses(element)}>
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
