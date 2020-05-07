<style src="./../styles/app.styl">

</style>

<script>
  import { onMount } from "svelte";
  import Intro from "./../components/Intro.svelte";
  import Explore from "./../components/Explore.svelte";
  import Modal from "./../components/Modal.svelte";
  // import Long from "./../components/Long.svelte";
  import About from "./../components/About.svelte";
  import {
    HEADER_HEIGHT,
    mode,
    data,
    windowHeight
  } from "./../components/utils/stores.js";

  let tempH = 0;

  $: if (tempH > 0) $windowHeight = tempH;
  $: h = Math.max(0, $windowHeight - $HEADER_HEIGHT);
</script>

<article
  class:reveal="{['story', 'explore'].includes($mode)}"
  class:loaded="{!!$data.length}">
  <Intro />
  <Explore />
  <Modal />
  <!-- <Long /> -->
</article>
<About />
{#if !$data.length}
  <p>
    <strong>Loading...</strong>
  </p>
{/if}

<svelte:window bind:innerHeight="{tempH}" />
