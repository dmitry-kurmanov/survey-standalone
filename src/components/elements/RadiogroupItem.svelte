<script>
	import SurveyString from '../String.svelte';
	import OtherChoice from '../OtherChoice.svelte';

	export let element = null;
	export let index = '';
	export let item = null;
	export let hideLabel = false;

	$: labelClass = element.getLabelClass(item);
	$: controlLabelClass = element.getControlLabelClass(item);

	function getItemClass(item) {
		return element.getItemClass(item);
	}
</script>

<div class={getItemClass(item)}>
	<label class={labelClass}>
		<input
			type="radio"
			name={element.name + '_' + element.id}
			bind:value={item.value}
			checked={element.renderedValue}
			id={element.inputId + '_' + index}
			role="radio"
			disabled={element.isReadOnly || !item.isEnabled}
			aria-required={element.isRequired}
			aria-label={item.locText.renderedHtml}
			aria-invalid={element.errors.length > 0}
			aria-describedby={element.errors.length > 0 ? element.id + '_errors' : null}
			class={element.cssClasses.itemControl} />
		<span class={element.cssClasses.materialDecorator}>
			<svg
				class={element.cssClasses.itemDecorator}
				viewBox="-12 -12 24 24">
				<circle r="6" cx="0" cy="0" /></svg>
		</span>
		<span class="check" />
		{#if !hideLabel}
			<span class={controlLabelClass} title={item.locText.koRenderedHtml}>
				<SurveyString locString={item.locText} />
			</span>
		{/if}
	</label>
	{#if item.value == element.otherItem.value}
		<div
			class:sjs-hide={!element.hasOther || !element.renderedValue || !element.isOtherSelected}>
			<OtherChoice {element} />
		</div>
	{/if}
</div>
