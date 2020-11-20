# 🔌 survey-standalone
[SurveyJS](https://github.com/surveyjs/survey-library) library standalone implementation. It can be used with any framework or without any one.

## examples
* script tag (no framework): https://plnkr.co/edit/mU5ct7cCCGrG4eNp
* es vanilla (no framework): https://codesandbox.io/s/survey-standalone-vanilla-example-g0k31
* Svelte: https://codesandbox.io/s/survey-standalone-svelte-example-sis80
* React: https://codesandbox.io/s/survey-standalone-react-example-34081
* Vue: https://codesandbox.io/s/survey-standalone-vue-example-zdcnr
* Angular: https://codesandbox.io/s/survey-standalone-angular-example-2x4c6

## installation (npm): 
`npm install survey-standalone`

## installation (es5 style / script):  
```html
<link rel="stylesheet" href="https://unpkg.com/survey-standalone/dist/survey-standalone.css" />
<script src="https://unpkg.com/survey-standalone/dist/survey-standalone.min.js"></script>
```

## usage
```html
<div id="surveyElement"></div>
```

```js
Survey.StylesManager.applyTheme('modern');

var json = {
  title: 'Survey standalone example !',
  pages: [
    {
      questions: [
        {
          type: 'radiogroup',
          name: 'car',
          title: 'What car are you driving?',
          isRequired: true,
          hasOther: true,
          colCount: 4,
          choices: [
            'None',
            'Ford',
            'Vauxhall',
            'Volkswagen',
            'Nissan',
            'Audi',
            'Mercedes-Benz',
            'BMW',
            'Peugeot',
            'Toyota',
            'Citroen',
          ],
        },
      ],
    }
  ],
};

var targetNode = document.querySelector('#surveyElement');
window.survey = new Survey.Survey(json);
survey.showProgressBar = 'top';
survey.render(targetNode);
```

# Thanks to
[SurveyJS](https://surveyjs.io/)  
[SvelteJS](https://github.com/sveltejs/svelte)  
[RollupJS](https://github.com/rollup/rollup)  
[YogliB](https://github.com/YogliB/svelte-component-template)
