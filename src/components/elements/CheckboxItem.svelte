<script>
	import SurveyString from '../String.svelte';
	import OtherChoice from '../OtherChoice.svelte';

	export let element = null;
	export let index = '';
	export let item = null;
	export let hideLabel = false;
</script>

<div class={element.getItemClass(item)}>
	<label class={element.getLabelClass(item)}>
		{#if item == element.selectAllItem}
			<input
				type="checkbox"
				name={element.name}
				bind:value={element.isAllSelected}
				id={element.inputId + '_' + index}
				disabled={element.isReadOnly || !item.isEnabled}
				aria-required={element.isRequired}
				aria-label={item.locText.renderedHtml}
				aria-invalid={element.errors.length > 0}
				aria-describedby={element.errors.length > 0 ? element.id + '_errors' : null}
				class={element.cssClasses.itemControl} />
		{/if}

		{#if item != element.selectAllItem}
			<input
				type="checkbox"
				name={element.name}
				value={item.value}
				bind:group={element.renderedValue}
				id={element.inputId + '_' + index}
				disabled={element.isReadOnly || !item.isEnabled}
				aria-required={element.isRequired}
				aria-label={item.locText.renderedHtml}
				aria-invalid={element.errors.length > 0}
				aria-describedby={element.errors.length > 0 ? element.id + '_errors' : null}
				class={element.cssClasses.itemControl} />
		{/if}

		<span class={element.cssClasses.materialDecorator}>
			<svg viewBox="0 0 24 24" class={element.cssClasses.itemDecorator}>
				<path d="M5,13l2-2l3,3l7-7l2,2l-9,9L5,13z" />
			</svg>
			<span class="check" />
		</span>

		{#if !hideLabel}
			<span
				class={element.cssClasses.controlLabel}
				title={item.locText.koRenderedHtml}>
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
