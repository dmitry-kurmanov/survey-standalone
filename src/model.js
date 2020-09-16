import * as SurveyCore from 'survey-core';
import Survey from './components/Survey.svelte';

const Core = SurveyCore.default;

export class Model extends Core.SurveyModel {
	constructor(json) {
		super(json);
	}

	render(targetNode) {
		if (!targetNode) {
			console.warn(
				'surveyjs: please define target node for survey.render method'
			);
			return;
		}

		new Survey({
			target: targetNode,
			props: {},
		});
	}
}
