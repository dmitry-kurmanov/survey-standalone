<script>
  import Creator from '../creator2components/Creator.svelte';

  export let model = null;
  export let name = 'SurveyJS standalone :)';
</script>

<style>

</style>

<div>{model && model.getAllQuestions()[0].title}</div>
<Creator />
