import radiogroup from './components/elements/Radiogroup.svelte';

export const getIndentSize = (question, indent) => {
	if (indent < 1 || !question.survey) return '';
	const css = question.survey['css'];
	if (!css) return '';
	return indent * css.question.indent + 'px';
};

export const getMaxLength = (maxLengthValue) => {
	if (maxLengthValue === null) return 524288;
	return maxLengthValue;
};

export const getValue = (oldValue) => {
	return oldValue || '';
};

const components = {
	radiogroup,
};

export const getComponentByName = (name) => {
	return components[name];
};
