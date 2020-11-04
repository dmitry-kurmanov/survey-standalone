<script>
	import { onMount, onDestroy } from 'svelte';

	import SurveyString from './String.svelte';
	import Progress from './Progress.svelte';
	import TimerPanel from './TimerPanel.svelte';
	import SurveyPage from './Page.svelte';

	export let model = null;

	$: hasTitle = model.showTitle && model.title;
	$: hasCompletedPage =
		model.showCompletedPage && model.state === 'completed';

	const css = model.getCss();
	const completedPageClasses = css.body + ' ' + css.completedPage;
	const completedStateClasses = css.saveData[model.completedState];

	function getNavBtnClasses(css, btnType) {
		return (css.navigationButton + ' ' + css.navigation[btnType]).trim();
	}

	function updateModel(newModel) {
		model = newModel;
	}

	onMount(() => {
		model.onCurrentPageChanged.add(updateModel);
		// model.onVisibleChanged.add(updateModel);
		model.onValueChanged.add(updateModel);
		model.onComplete.add((updateModel));
		model.onPartialSend.add(updateModel);
		model.onPageVisibleChanged.add(updateModel);
		model.onStarted.add(updateModel);
		model.onTimer.add(updateModel);

		model.renderCallback = () => {
			model = Object.assign({}, model);
		};
	});

	onDestroy(() => {
		model.onCurrentPageChanged.remove(updateModel);
		// model.onVisibleChanged.remove(updateModel);
		model.onValueChanged.remove(updateModel);
		model.onComplete.remove(updateModel);
		model.onPartialSend.remove(updateModel);
		model.onPageVisibleChanged.remove(updateModel);
		model.onStarted.remove(updateModel);
		model.onTimer.remove(updateModel);

		model.renderCallback = null;
	});
</script>

<style>
	.sv_main :global(.sjs-hide) {
		display: none;
	}
</style>

<div class={css.root}>
	<div class="sv_custom_header" />
	<div class="sv_container" />

	{#if hasTitle}
		<div class={css.header}>
			<h3>
				<SurveyString locString={model.locTitle} />
			</h3>
		</div>
	{/if}

	{#if model.state === 'starting'}
		<div class={css.body}>
			<SurveyPage
				id={model.startedPage.id}
				survey={model}
				page={model.startedPage}
				{css} />

			{#if model.isNavigationButtonsShowing}
				<div class={css.footer}>
					<input
						type="button"
						value={model.startSurveyText}
						class={getNavBtnClasses(css, 'start')}
						on:click={model.start()} />
				</div>
			{/if}
		</div>
	{/if}

	{#if model.state === 'running'}
		<div class={css.body}>
			{#if model.isShowProgressBarOnTop}
				<Progress {model} {css} />
			{/if}

			{#if model.isTimerPanelShowingOnTop}
				<TimerPanel {model} />
			{/if}

			<SurveyPage
				id={model.currentPage.id}
				{model}
				page={model.currentPage}
				{css} />

			{#if model.isTimerPanelShowingOnBottom}
				<TimerPanel {model} />
			{/if}

			{#if model.isShowProgressBarOnBottom}
				<div style="margin-top: 1em">
					<Progress {model} {css} />
				</div>
			{/if}

			{#if model.isNavigationButtonsShowing}
				<div class={css.footer}>
					<input
						type="button"
						class:sjs-hide={model.isFirstPage || !model.isShowPrevButton}
						value={model.pagePrevText}
						class={getNavBtnClasses(css, 'prev')}
						on:click={model.prevPage()} />
					<input
						type="button"
						class:sjs-hide={model.isLastPage}
						value={model.pageNextText}
						class={getNavBtnClasses(css, 'next')}
						on:click={model.nextPage()} />

					{#if model.isEditMode}
						<input
							type="button"
							class:sjs-hide={!model.isLastPage}
							value={model.completeText}
							class={getNavBtnClasses(css, 'complete')}
							on:click={model.completeLastPage()} />
					{/if}
				</div>
			{/if}
		</div>
	{/if}

	{#if hasCompletedPage}
		<div>
			<div class={completedPageClasses}>
				{@html model.processedCompletedHtml}
			</div>

			{#if model.completedState != ''}
				<div class={css.saveData.root}>
					<div class={completedStateClasses()}>
						<span>{model.completedStateText}</span>

						{#if model.completedState == 'error'}
							<input
								type="button"
								value={model.getLocString('saveAgainButton')}
								on:click={model.doComplete()}
								class={css.saveData.saveAgainButton} />
						{/if}
					</div>
				</div>
			{/if}
		</div>
	{/if}

	{#if model.state === 'completedbefore'}
		<div class={css.body}>
			{@html model.processedCompletedBeforeHtml}
		</div>
	{/if}

	{#if model.state === 'loading'}
		<div class={css.body}>
			{@html model.processedLoadingHtml}
		</div>
	{/if}

	{#if model.state === 'empty'}
		<div class={css.body}>
			{@html model.emptySurveyText}
		</div>
	{/if}
</div>
