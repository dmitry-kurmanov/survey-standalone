import radiogroup from './components/elements/Radiogroup.svelte';

const components = {
	radiogroup,
};

export const getComponentByName = (name) => {
	return components[name];
};
