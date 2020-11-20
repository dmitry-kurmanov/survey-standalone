import radiogroup from './Radiogroup.svelte';
import checkbox from './Checkbox.svelte';

const elements = {
	radiogroup,
	checkbox,
};

export const getElementByName = (name) => {
	return elements[name];
};
