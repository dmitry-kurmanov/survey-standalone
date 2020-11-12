<script>
	export let element = null;
	export let commentClass = '';

	function onchange(event) {
		element.comment = event.target.value;
	}

	function onkeyup(event) {
		if (!element.isSurveyInputTextUpdate) return;
		element.comment = event.target.value;
	}
</script>

<div class="form-group">
	{#if !element.isReadOnlyRenderDiv()}
		<textarea
			readonly={element.isReadOnly}
			disabled={element.isReadOnly}
			class={element.cssClasses.other || commentClass}
			bind:value={element.comment}
			maxlength={element.getOthersMaxLength()}
			placeholder={element.otherPlaceHolder}
			aria-label={element.locTitle.renderedHtml}
			on:change={onchange}
			on:keyup={onkeyup} />
	{:else}
		<div>{element.comment}</div>
	{/if}
</div>
