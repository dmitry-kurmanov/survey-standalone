<script>
	import SurveyString from './String.svelte';
	import OtherChoice from './OtherChoice.svelte';

	export let element = null;
	export let css = null;

	$: choicesCount = element.visibleChoices.length - 1;

	function doClear() {
		element.clearValue();
	}
	function setValue(newValue) {
		element.value = newValue;
	}
	function getItemClass(item) {
		var itemClass =
			element.cssClasses.item +
			(element.colCount === 0
				? ' sv_q_radiogroup_inline'
				: ' sv-q-col-' + element.colCount);
		if (item.value === element.value) itemClass += ' checked';
		return itemClass;
	}
</script>

<fieldset class={element.cssClasses.root}>
	<legend aria-label={element.locTitle.renderedHtml} />
	{#each element.visibleChoices as item, index}
		<div class={getItemClass(item)}>
			<label class={element.cssClasses.label}>
				<input
					type="radio"
					name={element.name + '_' + element.id}
					value={item.value}
					on:change={setValue(this.value)}
					id={element.inputId}
					disabled={element.isReadOnly}
					aria-label={item.locText.renderedHtml}
					checked={element.value === item.value}
					class={element.cssClasses.itemControl} />
				<span class={element.cssClasses.materialDecorator} />
				<span class="check" />
				<span class={element.cssClasses.controlLabel}>
					<SurveyString locString={item.locText} />
				</span>
				{#if index == choicesCount}
					<div
						class:sjs-hide={!element.hasOther || !element.isOtherSelected}>
						<OtherChoice {element} />
					</div>
				{/if}
			</label>
		</div>
	{/each}
	{#if element.showClearButton}
		<div>
			<input
				type="button"
				class={element.cssClasses.clearButton}
				on:click={doClear()}
				value={element.clearButtonCaption} />
		</div>
	{/if}
</fieldset>
