<style global src="./../styles/global.styl">

</style>

<script>
  import { windowWidth } from "./../components/utils/stores.js";
  import Meta from "./../components/Meta.svelte";
  import Header from "./../components/Header.svelte";
  import Article from "./../components/Article.svelte";
</script>

<svelte:head>
  <Meta />
</svelte:head>

<svelte:window bind:innerWidth="{$windowWidth}" />

<Header />

<Article />
