<script>
	import { getMaxLength } from '../utils.js';

	export let element = null;
	export let commentClass = '';
</script>

<div class="form-group">
	{#if !element.isReadOnly}
		<input
			type="text"
			class={element.cssClasses.other || commentClass}
			bind:value={element.comment}
			maxlength={getMaxLength(element.getOthersMaxLength())}
			aria-label={element.locTitle.renderedHtml} />
	{:else}
		<div class={element.cssClasses.other}>{element.comment}</div>
	{/if}
</div>
