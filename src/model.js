import * as SurveyCore from 'survey-core';
import Survey from './components/Survey.svelte';

const Core = SurveyCore.default;

export const StylesManager = Core.StylesManager;

StylesManager.applyTheme("modern");

export class Model extends Core.SurveyModel {
	constructor(json) {
		super(json);
	}

	setPropertyValueCore(propertiesHash, name, val) {
		super.setPropertyValueCore(propertiesHash, name, val);
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
			props: {
				model: this
			},
		});

		this.renderCallback = function () {
			var counter =
				!!self.state && !!self.state.modelChanged
					? self.state.modelChanged
					: 0;
			self.setState({ modelChanged: counter + 1 });
		};

		this.onPropertyChanged.add(() => {});
	}
}
