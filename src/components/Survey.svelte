<script>
	import { onMount, onDestroy } from 'svelte';

	import Header from './Header.svelte';
	import Navigation from './Navigation.svelte';
	import NavigationStartButton from './NavigationStartButton.svelte';
	import Progress from './Progress.svelte';
	import TimerPanel from './TimerPanel.svelte';
	import SurveyPage from './Page.svelte';

	export let model = null;

	$: hasCompletedPage =
		model.showCompletedPage && model.state === 'completed';

	const css = model.getCss();
	const completedPageClasses = css.body + ' ' + css.completedPage;
	const completedStateClasses = css.saveData[model.completedState];

	function updateModel(newModel) {
		model = newModel;
	}

	function doTrySaveAgain() {
		model.doComplete();
	}

	onMount(() => {
		model.onCurrentPageChanged.add(updateModel);
		// model.onVisibleChanged.add(updateModel);
		model.onValueChanged.add(updateModel);
		model.onComplete.add(updateModel);
		model.onPartialSend.add(updateModel);
		model.onPageVisibleChanged.add(updateModel);
		model.onStarted.add(updateModel);
		model.onTimer.add(updateModel);

		model.renderCallback = () => {
			model = model;
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

<style lang="scss">
	@import '../node_modules/survey-core/modern';

	:global(.sjs-hide) {
		display: none;
	}
</style>

<div class={css.root}>
	<form onsubmit="return false;">
		{#if !model.hasLogo}
			<div class="sv_custom_header" />
		{/if}

		<div class={css.container}>
			<Header {model} />

			{#if model.state === 'starting'}
				<div class={css.body}>
					{#if model.isNavigationButtonsShowing === 'top' || model.isNavigationButtonsShowing === 'both'}
						<NavigationStartButton {css} {model} />
					{/if}

					<SurveyPage
						id={model.startedPage.id}
						survey={model}
						page={model.startedPage}
						{css} />

					{#if model.isNavigationButtonsShowing === 'bottom' || model.isNavigationButtonsShowing === 'both'}
						<NavigationStartButton {css} {model} />
					{/if}
				</div>
			{/if}

			{#if model.state === 'running' || model.state === 'preview'}
				<div class={css.body}>
					{#if model.isShowProgressBarOnTop}
						<Progress {model} {css} />
					{/if}

					{#if model.isTimerPanelShowingOnTop}
						<TimerPanel {model} />
					{/if}

					{#if model.isNavigationButtonsShowing === 'top' || model.isNavigationButtonsShowing === 'both'}
						<Navigation {model} {css} />
					{/if}

					<SurveyPage {model} page={model.currentPage} {css} />

					{#if model.isTimerPanelShowingOnBottom}
						<TimerPanel {model} />
					{/if}

					{#if model.isShowProgressBarOnBottom}
						<Progress {model} {css} />
					{/if}

					{#if model.isNavigationButtonsShowing === 'bottom' || model.isNavigationButtonsShowing === 'both'}
						<Navigation {model} {css} />
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
										on:click={doTrySaveAgain}
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
				<div class={css.bodyEmpty}>
					{@html model.emptySurveyText}
				</div>
			{/if}
		</div>
	</form>
</div>
