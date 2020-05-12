<style src="./../styles/menu-desktop.styl">

</style>

<script>
  import lang from "./../components/utils/lang.js";
  import {
    copy,
    mode,
    updateMode,
    storyHed,
    language
  } from "./../components/utils/stores.js";
  import Filters from "./../components/Filters.svelte";
  import svgFile from "./../svg/file-text.svg";
  import svgLeft from "./../svg/arrow-left-circle.svg";
  import svgInfo from "./../svg/info.svg";

  let hed;
  $: if ($mode === "story") {
    const m = $copy.stories.find(d => d.hed[0].text === $storyHed);
    if (m) hed = m.hed.find(d => d.lang === $language).text;
  }
</script>

<button class="back alt" on:click="{() => updateMode('intro')}">
  <span class="span-mode" class:visible="{$mode === 'story'}">
    {@html lang($copy.modeStory)}
    &nbsp;| {hed}
  </span>
  <span class="span-mode" class:visible="{$mode === 'explore'}">
    {@html lang($copy.modeExplore)}
  </span>
  {@html svgLeft}
</button>

<div class="right">
  <!-- <button
    class="long-prompt"
    class:visible="{$mode === 'story'}"
    on:click="{() => updateMode('long')}">
    {@html lang($copy.longPrompt)}
    <span class="icon">
      {@html svgFile}
    </span>
  </button> -->

  <div class="ui" class:visible="{$mode === 'explore'}">
    <p class="label">
      {@html lang($copy.filter)}
    </p>
    <Filters />
  </div>

  <button on:click="{() => updateMode('about')}" class="about alt">
    {@html svgInfo}
  </button>
</div>
