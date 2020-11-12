<script>
	import { onMount, afterUpdate, onDestroy } from 'svelte';

	import SurveyString from './String.svelte';
	import SurveyErrors from './Errors.svelte';
	import OtherChoice from './OtherChoice.svelte';
	import { getIndentSize, getComponentByName } from '../utils.js';

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

	$: questionRootClass =
		model.questionTitleLocation === 'left'
			? css.question.mainRoot + ' sv_qstn_left'
			: css.question.mainRoot;

	let domNode = null;

	onMount(() => {
		if (model && !element.isPanel) {
			model.afterRenderQuestion(element, domNode);
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
	class={questionRootClass}
	id={element.id}
	style="padding-left: {getIndentSize(element, element.indent)}; padding-right: {getIndentSize(element, element.rightIndent)}; width: {element.renderWidth}">
	{#if element.hasTitleOnLeftTop}
		<div class={element.hasTitleOnLeft ? 'title-left' : ''}>
			{#if element.hasTitle}
				<h5 class={element.cssClasses.title}>
					<SurveyString locString={element.locTitle} />
				</h5>
			{/if}
			{#if element.hasDescription}
				<div class={element.cssClasses.description}>
					<SurveyString locString={element.locDescription} />
				</div>
			{/if}
		</div>
	{/if}

	<div class={element.hasTitleOnLeft ? 'content-left' : ''}>
		{#if hasErrorsOnTop}
			<SurveyErrors {element} />
		{/if}

		<svelte:component this={dynamicComponent} {element} {css} />

		{#if element.hasComment}
			<div>
				<div>{element.commentText}</div>
				<OtherChoice commentClass={css.comment} {element} />
			</div>
		{/if}

		{#if hasErrorsOnBottom}
			<SurveyErrors {element} />
		{/if}

		{#if element.hasTitleOnBottom}
			<h5 class={element.cssClasses.title}>
				<SurveyString locString={element.locTitle} />
			</h5>
		{/if}
		{#if element.hasDescription}
			<div
				class:sjs-hide={!element.hasTitleOnBottom}
				class={element.cssClasses.description}>
				<SurveyString locString={element.locDescription} />
			</div>
		{/if}
	</div>
</div>
