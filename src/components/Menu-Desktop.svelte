<style src="./../styles/menu-desktop.styl">

</style>

<script>
  import lang from "./../components/utils/lang.js";
  import {
    copy,
    mode,
    updateMode,
    storyHed
  } from "./../components/utils/stores.js";
  import Filters from "./../components/Filters.svelte";
  import svgFile from "./../svg/file-text.svg";
  import svgLeft from "./../svg/arrow-left-circle.svg";
  import svgInfo from "./../svg/info.svg";
</script>

<button class="back alt" on:click="{() => updateMode('intro')}">
  {#if $mode === 'story'}
    {@html lang($copy.modeStory)}
    &nbsp;| {$storyHed}
  {:else if $mode === 'explore'}
    {@html lang($copy.modeExplore)}
  {/if}
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
