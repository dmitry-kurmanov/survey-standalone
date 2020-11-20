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
<div id="container" class="rating-container"></div>
```

```js
const rating = new WW_Rating({
  target: document.querySelector("#container"),
  props: {
    title: "Rate your health",
    name: "health",
    icon: "star",
    value: 3,
    items: [
      {
        value: 1,
        text: "very bad"
      },
      {
        value: 2,
        text: "bad"
      },
      {
        value: 3,
        text: "normal"
      },
      {
        value: 4,
        text: "good"
      },
      {
        value: 5,
        text: "exelent"
      }
    ]
  }
});

rating.title = "My New Title";

console.log(rating.value);
```

# Thanks to
[SurveyJS](https://surveyjs.io/)  
[SvelteJS](https://github.com/sveltejs/svelte)  
[RollupJS](https://github.com/rollup/rollup)  
[YogliB](https://github.com/YogliB/svelte-component-template)
