<style global src="./../styles/global.styl">

</style>

<script>
  import { onMount } from "svelte";
  import { windowWidth } from "./../components/utils/stores.js";
  import Meta from "./../components/Meta.svelte";
  import Header from "./../components/Header.svelte";
  import Article from "./../components/Article.svelte";
  import { prevMode, mode } from "./../components/utils/stores.js";

  let path = "";
  let mounted = false;

  $: if (mounted) {
    if ($prevMode !== $mode && $prevMode !== "about" && $mode !== "intro") {
      history.pushState($prevMode, null, `?${$mode}`);
    } else if ($prevMode === "about")
      history.replaceState(null, null, `?${$mode}`);
    else history.replaceState(null, null, path);
  }

  function handleState(e) {
    $mode = e.state || "intro";
  }

  onMount(() => {
    path = window.location.pathname;
    mounted = true;
  });
</script>

<svelte:head>
  <Meta />
</svelte:head>

<svelte:window bind:innerWidth="{$windowWidth}" on:popstate="{handleState}" />

<Header />

<Article />
