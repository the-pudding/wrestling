<style src="./../styles/modal.styl">

</style>

<script>
  import jump from "jump.js";
  import {
    disableBodyScroll,
    enableBodyScroll,
    clearAllBodyScrollLocks
  } from "body-scroll-lock";
  import lang from "./../components/utils/lang.js";
  import move from "./../components/utils/move.js";
  import prepareTransition from "./../components/utils/prepare-transition.js";
  import {
    rawSize,
    HEADER_HEIGHT,
    onDeck,
    copy,
    mode,
    data,
    storyHed,
    windowHeight,
    language,
    currentStory,
    slideIndex,
    mobile
  } from "./../components/utils/stores.js";
  import { onMount, afterUpdate } from "svelte";
  import Offscreen from "./../components/Offscreen.svelte";
  import svgLeft from "./../svg/chevron-left.svg";
  import svgRight from "./../svg/chevron-right.svg";
  import svgPlus from "./../svg/plus-circle.svg";
  import svgX from "./../svg/x-circle.svg";

  const PADDING = 32;

  let canvas;
  let ctx;
  let index = "";
  let nameWrestling = "";
  let nameCrew = "";
  let nameReal = "";
  let nameAlt = "";
  let active = "";
  let description = "";
  let years = "";
  let nationality = "";
  let unclicked = true;

  let clientWidth = 0;
  let prev = { id: null };
  let livePixels = {};
  let dpr = 2;
  let showInfo = false;
  let pulse = true;
  let disableR = false;
  let disableL = true;
  let slideText = "";
  let slideTitle = "";
  let reveal;
  let modalEl;

  $: maxMult = $windowHeight < 750 ? 3 : 7;
  $: mult = 6;
  $: width = Math.max(240, $rawSize * mult);
  $: height = width;
  $: if ($currentStory) {
    disableL = true;
    disableR = false;
    $slideIndex = 0;
  }

  $: $onDeck =
    $currentStory && $currentStory.slides[$slideIndex]
      ? $data.find(
          d => d.id === $currentStory.slides[$slideIndex].wrestler.toLowerCase()
        )
      : null;
  $: modalH = Math.max(0, $windowHeight - $HEADER_HEIGHT);
  $: if ($mode === "story" && $currentStory && $slideIndex > -1) {
    slideText = getText("body");
    slideTitle = getText("title");
  }
  $: if ($mode === "intro") {
    reveal = false;
  }
  $: if ($mode === "story") {
    reveal = true;
  }

  $: if (["explore", "story"].includes($mode) && reveal && $mobile) {
    disableBodyScroll(modalEl);
  } else {
    enableBodyScroll(modalEl);
  }

  $: if ($currentStory) {
    disableR = $slideIndex === $currentStory.slides.length - 1;
    disableL = $slideIndex === 0;
  }

  onMount(() => {
    ctx = canvas.getContext("2d");
  });

  afterUpdate(() => {
    const spans = [...document.querySelectorAll(".description span")];
    spans.forEach(s => s.addEventListener("click", handleLink, false));
  });

  function handleLink() {
    $onDeck = $data.find(d => d.id === this.dataset.id.toLowerCase());
  }

  function inc(val) {
    const last = $currentStory.slides.length - 1;
    const m = Math.min($slideIndex + val, last);
    $slideIndex = Math.max(0, m);
    pulse = false;
  }

  function drawPixel(p) {
    ctx.fillStyle = p.rgb;
    ctx.fillRect(p.rx * mult * dpr, p.ry * mult * dpr, mult * dpr, mult * dpr);
  }

  function render() {
    ctx.save();
    ctx.clearRect(0, 0, width * mult * dpr, height * mult * dpr);
    const { enter, exit } = livePixels;
    let i = 0;
    let l = Math.max(enter.length, exit.length);
    while (i < l) {
      if (enter[i]) drawPixel(enter[i]);
      if (exit[i]) drawPixel(exit[i]);
      i++;
    }
    ctx.restore();
  }

  function runTransition() {
    const inProgressExit = move(livePixels.exit);
    const inProgressEnter = move(livePixels.enter);
    render();
    if (inProgressExit || inProgressEnter) requestAnimationFrame(runTransition);
    else {
      // transition is done
    }
  }

  function center() {
    const el = document.querySelector(`[data-id=${$onDeck.id}]`);
    const { top } = el.getBoundingClientRect();
    if (top < $rawSize || top > $windowHeight - $rawSize) {
      jump(el, {
        duration: 500,
        offset: -Math.floor($windowHeight / 2)
      });
    }
  }

  function handlePixels(event) {
    const { pixels, id } = event.detail;
    const datum = $data.find(d => d.id === id);

    const enter = pixels;
    const exit = prev.pixels;

    if (prev.id === id) return false;

    livePixels = prepareTransition({
      enter,
      exit,
      style: "fax",
      // chunks: 32,
      // chunkType: "ordered",
      height: $rawSize,
      width: $rawSize
    });

    prev = { pixels: enter, id };
    index = datum.index + 1;
    nameWrestling = datum.name_wrestling;
    nameCrew = datum.name_crew;
    nameReal = datum.name_real;
    nameAlt = datum.name_alt;
    description = datum[`info_${$language}`];
    nationality = datum[`nationality_${$language}`].join(", ");
    active = datum[`active_${$language}`];

    const end =
      datum.year_end || $copy.present.find(v => v.lang === $language).text;
    years = `${datum.year_start} - ${end}`;
    showInfo = false;

    reveal = true;
    runTransition();
    center();
  }

  function handleKeyup(e) {
    let dir;
    if (e.key === "ArrowRight") dir = 1;
    else if (e.key === "ArrowLeft") dir = -1;

    if ($mode === "story") inc(dir);
  }

  function getText(prop) {
    const slide = $currentStory.slides[$slideIndex];
    return slide[prop].find(v => v.lang === $language).text;
  }

  function kick() {
    let i = 0;
    setInterval(() => {
      i += 1;
      $onDeck = $data[i];
    }, 3750);
  }
  mode.subscribe(d => {
    if (d === "explore" && !$mobile) {
      setTimeout(() => {
        $onDeck = $data[0];
        kick();
      }, 1500);
    }
  });
</script>

<svelte:window on:keyup="{handleKeyup}" />

<section
  id="modal"
  bind:this="{modalEl}"
  class:reveal
  class:visible="{$mode !== 'intro'}"
  bind:clientWidth>
  <Offscreen
    width="{$rawSize}"
    height="{$rawSize}"
    on:pixels="{handlePixels}" />
  <canvas
    bind:this="{canvas}"
    width="{width * dpr}"
    height="{height * dpr}"
    style="width: {width}px; height: {height}px;"></canvas>

  <div class="person">
    <!-- <p class="crew">{nameCrew}</p> -->
    <p class="name">{nameWrestling}</p>
    {#if nameReal}
      <p class="real">{nameReal}</p>
    {/if}
    {#if nameAlt}
      <p class="alt">a.k.a. {nameAlt}</p>
    {/if}
  </div>

  <div class="info">
    {#if years}
      <h4>Active Years</h4>
      <p>{years}</p>
    {/if}
    {#if nationality}
      <h4>Nationality</h4>
      <p>{nationality}</p>
    {/if}
  </div>

  <img src="./assets/images/title.png" />
</section>
