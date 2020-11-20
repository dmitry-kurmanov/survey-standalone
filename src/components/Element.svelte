<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	import SurveyString from './String.svelte';
	import ElementHeader from './ElementHeader.svelte';
	import SurveyErrors from './Errors.svelte';
	import OtherChoice from './OtherChoice.svelte';
	import { getElementByName } from './elements/_register.js';

	import customwidget from './CustomWidget.svelte';

	export let element = null;
	export let model = null;
	export let css = null;

	$: hasErrorsOnTop =
		!element.isPanel && model.questionErrorLocation === 'top';

	$: hasErrorsOnBottom =
		!element.isPanel && model.questionErrorLocation === 'bottom';

	$: dynamicElement = element.customWidget
		? customwidget
		: getElementByName(element.getTemplate());

	function getRootClass(element) {
		let cssRoot = element.cssRoot;
		if (element.isReadOnly) {
			cssRoot += ' ' + element.cssClasses.disabled;
		}

		return cssRoot;
	}

	let domNode = null;

	onMount(() => {
		if (element.isPanel) {
			element.afterRender(domNode);
		}
	});
	afterUpdate(() => {
		addCoreTwoWayBinding(element, () => {
			element = element;
		});
	});
	onDestroy(() => {
		removeCoreTwoWayBinding(element);
	});

	function addCoreTwoWayBinding(element, handler) {
		if (!element) return;
		if (!element.iteratePropertiesHash) return;

		const doIterate = (hash, key) => {
			let val = hash[key];
			if (!Array.isArray(val)) return;
			val['onArrayChanged'] = handler;
		};

		element.iteratePropertiesHash(doIterate);

		element.setPropertyValueCoreHandler = (hash, key, val) => {
			if (hash[key] === val) return;
			hash[key] = val;
			handler();
		};

		element.visibleRowsChangedCallback = handler;
	}

	function removeCoreTwoWayBinding(element) {
		if (!element) return;
		if (!element.iteratePropertiesHash) return;

		const doIterate = (hash, key) => {
			let val = hash[key];
			if (!Array.isArray(val)) return;
			val['onArrayChanged'] = () => {};
		};

		element.iteratePropertiesHash(doIterate);

		element.setPropertyValueCoreHandler = undefined;
		element.visibleRowsChangedCallback = null;
	}
</script>

<div
	bind:this={domNode}
	class={getRootClass(element)}
	id={element.id}
	name={element.name}
	role={element.ariaRole}
	style="display: inline-block; padding-left: {element.paddingLeft}; padding-right: {element.paddingRight}; flex-basis: {element.renderWidth}; flex-grow: 1; flex-shrink: 1; width: {element.renderWidth}; min-width: {element.minWidth}; max-width: {element.maxWidth};"
	aria-labelledby={element.hasTitle ? element.ariaTitleId : null}>
	{#if element.hasTitleOnLeftTop}
		<ElementHeader {element} />
	{/if}

	<div class={element.cssContent}>
		{#if hasErrorsOnTop}
			<SurveyErrors {element} location="top" />
		{/if}

		<svelte:component this={dynamicElement} {element} {css} />

		{#if element.hasComment}
			<div class={element.cssClasses.formGroup}>
				<div>{element.commentText}</div>
				<OtherChoice commentClass={css.comment} {element} />
			</div>
		{/if}

		{#if hasErrorsOnBottom}
			<SurveyErrors {element} location="bottom" />
		{/if}

		{#if element.hasDescriptionUnderInput}
			<div class={element.cssClasses.descriptionUnderInput}>
				<SurveyString locString={element.locDescription} />
			</div>
		{/if}
	</div>

	{#if element.hasTitleOnBottom}
		<ElementHeader {element} />
	{/if}
</div>
