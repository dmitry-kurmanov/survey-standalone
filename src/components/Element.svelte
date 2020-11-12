<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	import SurveyString from './String.svelte';
	import ElementHeader from './ElementHeader.svelte';
	import SurveyErrors from './Errors.svelte';
	import OtherChoice from './OtherChoice.svelte';
	import { getComponentByName } from '../utils.js';

	import customwidget from './elements/CustomWidget.svelte';

	export let element = null;
	export let model = null;
	export let css = null;

	$: hasErrorsOnTop =
		!element.isPanel && model.questionErrorLocation === 'top';

	$: hasErrorsOnBottom =
		!element.isPanel && model.questionErrorLocation === 'bottom';

	$: dynamicComponent = element.customWidget
		? customwidget
		: getComponentByName(element.getTemplate());

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
	aria-labelledby={element.hasTitle ? element.ariaTitleId : null}
	style="paddingLeft: {element.paddingLeft}, paddingRight: {element.paddingRight}, flexBasis: {element.renderWidth}, flexGrow: 1, flexShrink: 1, width: {element.renderWidth}, minWidth: {element.minWidth}, maxWidth: {element.maxWidth}, display: 'inline-block' ">
	{#if element.hasTitleOnLeftTop}
		<ElementHeader {element} />
	{/if}

	<div class={element.cssContent}>
		{#if hasErrorsOnTop}
			<SurveyErrors {element} location="top" />
		{/if}

		<svelte:component this={dynamicComponent} {element} {css} />

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
