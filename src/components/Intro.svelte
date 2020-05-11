<style src="./../styles/intro.styl">

</style>

<script>
  import { onMount } from "svelte";
  import lang from "./../components/utils/lang.js";
  import OffscreenIntro from "./../components/Offscreen-Intro.svelte";
  import {
    meta,
    copy,
    data,
    mode,
    storyHed,
    updateMode,
    language,
    sprite,
    windowHeight,
    HEADER_HEIGHT
  } from "./../components/utils/stores.js";
  import move from "./../components/utils/move.js";
  import prepareTransition from "./../components/utils/prepare-transition.js";

  let canvas;
  let ctx;
  let livePixels;
  let dpr = 2;
  let width = 200;
  let height = 100;
  let mult = 1;
  let clientWidth = 0;
  let pixels = {};
  let currentTransition = "en";

  $: h = Math.max(0, $windowHeight - $HEADER_HEIGHT);
  $: mult = Math.min(3, (clientWidth - 32) / width);
  $: sprited = !!$sprite;
  $: if (livePixels && currentTransition !== $language) {
    livePixels = prepareTransition({
      enter: pixels[$language].map(d => ({ ...d })),
      exit: livePixels.enter,
      width,
      height,
      style: "fax"
    });
    runTransition();
  }

  function handleStoryClick() {
    const en = this.querySelector(".lang--en");
    $storyHed = en.innerHTML;
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
    currentTransition = $language;
    const inProgressExit = move(livePixels.exit);
    const inProgressEnter = move(livePixels.enter);
    render();
    if (inProgressExit || inProgressEnter) requestAnimationFrame(runTransition);
    else {
    }
  }

  function handlePixels(event) {
    pixels = event.detail.pixels;
    livePixels = prepareTransition({
      enter: pixels[$language].map(d => ({ ...d })),
      width,
      height,
      style: "fax"
    });
    // TODO why
    setTimeout(runTransition, 250);
  }

  onMount(() => {
    ctx = canvas.getContext("2d");
  });
</script>

<section
  id="intro"
  class:visible="{$mode === 'intro'}"
  bind:clientWidth
  style="height: {h}px;">
  <div class="bg" class:visible="{sprited}"></div>
  <h1>{$copy.title[0].text}</h1>
  <OffscreenIntro {width} height="{height * 2}" on:pixels="{handlePixels}" />
  <canvas
    bind:this="{canvas}"
    width="{width * mult * dpr}"
    height="{height * mult * dpr}"
    style="width: {width * mult}px; height: {height * mult}px;"></canvas>

  {#if $data.length}
    <div class="choices">

      <div class="choice">
        <p class="label">
          {@html lang($copy.intro.storyLabel)}
        </p>
        <ul>
          {#each $copy.stories as { hed }}
            <li>
              <button
                on:click="{() => updateMode('story')}"
                on:click="{handleStoryClick}">
                {@html lang(hed)}
              </button>
            </li>
          {/each}
        </ul>
      </div>

      <div class="choice">
        <p class="label">
          {@html lang($copy.intro.exploreLabel)}
        </p>
        <ul>
          <li>
            <button on:click="{() => updateMode('explore')}">
              {@html lang($copy.intro.exploreButton)}
            </button>
          </li>
        </ul>
      </div>

    </div>
  {/if}

  <p class="byline">
    {@html lang($copy.intro.byline)}
    <a href="{$meta.author2.url}" target="_blank">{$meta.author2.name}</a>
    +
    <a href="{$meta.author.url}" target="_blank">{$meta.author.name}</a>
    +
    <a href="{$meta.author3.url}" target="_blank">{$meta.author3.name}</a>
  </p>

</section>
