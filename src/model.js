import * as SurveyCore from 'survey-core';
import Survey from './components/Survey.svelte';

const Core = SurveyCore.default;

export const StylesManager = Core.StylesManager;

StylesManager.applyTheme('modern');

export class Model extends Core.SurveyModel {
	constructor(json) {
		super(json);
		this.SurveyComponentInstance = null;
	}

	setPropertyValueCore(propertiesHash, name, val) {
		super.setPropertyValueCore(propertiesHash, name, val);
	}

	render(domNodeOrId) {
		if (domNodeOrId && typeof domNodeOrId == 'string') {
			domNodeOrId = document.getElementById(domNodeOrId);
		}
		this.startTimerFromUI();

		if (!domNodeOrId) return;

		if (this.SurveyComponentInstance)
			this.SurveyComponentInstance.$destroy();

		this.SurveyComponentInstance = new Survey({
			target: domNodeOrId,
			props: {
				model: this,
			},
		});
	}
}
