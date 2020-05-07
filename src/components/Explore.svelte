<style src="./../styles/explore.styl">

</style>

<script>
  import debounce from "lodash.debounce";
  import * as d3Array from "d3-array";
  import { onMount, afterUpdate } from "svelte";
  import {
    copy,
    data,
    mode,
    filters,
    mobile,
    thumbSize,
    currentStory,
    storyHed,
    slideIndex,
    onDeck
  } from "./../components/utils/stores.js";
  import lang from "./../components/utils/lang.js";
  import Wrestler from "./../components/Wrestler.svelte";
  let width;
  let exploreEl;
  // let widthWrestlers;
  // let units;
  let exploreData = [];
  let showPopup = false;

  const MARGIN = 8;
  $: storyWrestlers = $currentStory
    ? $currentStory.slides.map(d => d.wrestler.toLowerCase())
    : [];
  $: sz = $thumbSize + MARGIN * 2;
  $: height =
    $mode === "about"
      ? 1
      : Math.floor((exploreData.length - 1) / units) * sz + sz;

  $: if ($data.length) {
    const hide = d => {
      for (let f in $filters) {
        const val = $filters[f];
        if (val !== "label") {
          if (d.name_crew === "Author") return true;
          if (val === "Pre-1950") {
            if (d[f] && Math.min(...d[f]) >= 1950) return true;
          } else if (!d[f].includes(val)) return true;
        }
      }
      return false;
    };

    const storyHide = d => {
      if ($mode === "story" && storyWrestlers) {
        return !storyWrestlers.find(v => v === d.id);
      }
      return false;
    };

    exploreData = $data.map(d => ({
      ...d,
      inactive: hide(d) || storyHide(d)
    }));

    if ($mode === "explore")
      exploreData.sort(
        (a, b) =>
          d3Array.ascending(a.inactive, b.inactive) ||
          d3Array.ascending(
            typeof a.index === "string",
            typeof b.index === "string"
          ) ||
          d3Array.ascending(a.id, b.id)
      );
    else
      exploreData.sort(
        (a, b) =>
          d3Array.ascending(
            typeof a.index === "string",
            typeof b.index === "string"
          ) || d3Array.ascending(a.id, b.id)
      );
    exploreData.forEach((d, i) => {
      d.left = MARGIN + (i % units) * sz;
      d.top = Math.floor(i / units) * sz;
      d.sz = sz - MARGIN * 2;
    });

    if ($onDeck && $mode === "explore") {
      const inactive = exploreData.find(d => d.id === $onDeck.id && d.inactive);
      if (inactive) $onDeck = exploreData.find(d => !d.inactive);
    }
  }

  $: units = Math.floor(width / sz);
  $: widthWrestlers = units * sz;

  function resize() {
    width = exploreEl.clientWidth;
  }

  function handlePopup(event) {
    showPopup = true;
    setTimeout(() => (showPopup = false), 3000);
  }

  function handleInc(event) {
    const id = event.detail.id.toLowerCase();
    const index = $currentStory.slides.findIndex(
      d => d.wrestler.toLowerCase() === id
    );
    if (index > -1) $slideIndex = index;
  }

  afterUpdate(resize);

  // onMount(() => {
  //   let i = 0;
  //   setInterval(() => {
  //     i += 1;
  //     $onDeck = exploreData[i];
  //   }, 1500);
  // });
</script>

<section
  id="explore"
  style="height: {height}px"
  class:visible="{$mode !== 'intro'}"
  class:interactive="{$mode === 'explore'}"
  bind:this="{exploreEl}">
  <div class="wrestlers" style="width: {widthWrestlers}px;">
    {#each exploreData as d (d.index)}
      <Wrestler {...d} on:popup="{handlePopup}" on:inc="{handleInc}" />
    {/each}
  </div>
  <div class="popup" class:visible="{showPopup}">
    <p>
      {@html lang($copy.popup)}
    </p>
  </div>
</section>

<svelte:window on:resize="{debounce(resize, 300)}" />
