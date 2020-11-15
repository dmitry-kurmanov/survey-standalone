<script>
	export let model = null;
</script>

<div class={model.logoClassNames}>
	<img
		alt=""
		class={model.css.logoImage}
		src={model.locLogo.renderedHtml}
		width={model.logoWidth ? model.logoWidth + 'px' : undefined}
		height={model.logoHeight ? model.logoHeight + 'px' : undefined}
		style="object-fit:{model.logoFit}" />
</div>
