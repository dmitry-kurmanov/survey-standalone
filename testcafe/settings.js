import { ClientFunction } from 'testcafe';
export const url = 'http://127.0.0.1:5000/testcafe.html';

export const initSurvey = ClientFunction((json, events) => {
	console.error = (msg) => {
		throw new Error(msg);
	};
	console.warn = (msg) => {
		throw new Error(msg);
	};
	console.log('surveyjs console.error and console.warn override');

	Survey.StylesManager.applyTheme('default');

	var model = new Survey.Model(json);
	var surveyComplete = function (model) {
		window.SurveyResult = model.data;
		document.getElementById(
			'surveyResultElement'
		).innerHTML = JSON.stringify(model.data);
	};
	if (!!events) {
		for (var str in events) {
			model[str].add(events[str]);
		}
	}
	model.onComplete.add(surveyComplete);

	var targetNode = document.querySelector('#surveyElement');
	targetNode.innerHTML = '';
	model.render(targetNode);
	window.survey = model;
});

export const getSurveyResult = ClientFunction(() => {
	var result = window.SurveyResult;
	if (typeof result === 'undefined') {
		return result;
	}
	//clean result object from the vuejs stuff
	return JSON.parse(JSON.stringify(result));
});

export const setOptions = ClientFunction((questionName, modValue) => {
	var targetNode = document.querySelector('#surveyElement');
	var mergeOptions = function (obj1, obj2) {
		for (var attrname in obj2) {
			obj1[attrname] = obj2[attrname];
		}
	};
	var q = survey.getQuestionByName(questionName || 'car');
	mergeOptions(q, modValue);
	survey.render();
});

export const joinElementInnerText = ClientFunction((tagName, index) => {
	let el = document.getElementsByTagName(tagName)[index];
	const spans = el.querySelectorAll('span');
	let res = '';
	for (let i = 0; i < spans.length; i++) {
		var sp = spans[i];
		if (!sp.innerHTML || sp.innerHTML == '&nbsp;') continue;
		let childs = sp.getElementsByTagName('span');
		if (childs.length > 0) continue;
		if (!!res) res += ' ';
		res += sp.innerHTML;
	}
	return res;
});
