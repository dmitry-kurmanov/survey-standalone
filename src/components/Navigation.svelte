<script>
	export let model = null;
	export let css = null;

	let mouseDownPage = null;

	function nextPage() {
		if (!!mouseDownPage && mouseDownPage !== model.currentPage) return;
		mouseDownPage = null;
		model.nextPage();
	}

	function nextButtonMouseDown() {
		mouseDownPage = model.currentPage;
		return model.navigationMouseDown();
	}

	function navigationMouseDown() {
		model.navigationMouseDown();
	}

	function prevPage() {
		model.prevPage();
	}

	function showPreview() {
		model.showPreview();
	}

	function completeLastPage() {
		model.completeLastPage();
	}
</script>

<div class={css.footer}>
	<input
		type="button"
		class:sjs-hide={model.isFirstPage || !model.isShowPrevButton}
		value={model.pagePrevText}
		class={model.cssNavigationPrev}
		on:mousedown={navigationMouseDown}
		on:click={prevPage} />
	<input
		type="button"
		class:sjs-hide={model.isLastPage}
		value={model.pageNextText}
		class={model.cssNavigationNext}
		on:mousedown={nextButtonMouseDown}
		on:click={nextPage} />

	{#if model.isPreviewButtonVisible}
		<input
			type="button"
			class:sjs-hide={!model.isLastPage}
			value={model.previewText}
			class={model.cssNavigationPreview}
			on:mousedown={navigationMouseDown}
			on:click={showPreview} />
	{/if}

	{#if model.isCompleteButtonVisible}
		<input
			type="button"
			class:sjs-hide={!model.isLastPage}
			value={model.completeText}
			class={model.cssNavigationComplete}
			on:mousedown={navigationMouseDown}
			on:click={completeLastPage} />
	{/if}
</div>
