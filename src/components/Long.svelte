<style src="./../styles/long.styl">

</style>

<script>
  import lang from "./../components/utils/lang.js";
  import {
    copy,
    mode,
    updateMode,
    storyHed
  } from "./../components/utils/stores.js";
  import svgX from "./../svg/x-circle.svg";
</script>

<section id="long" class:visible="{$mode === 'long'}">
  <div class="column">
    {#each $copy.stories as { hed, long }}
      <div class="story" class:visible="{$storyHed === hed[0].text}">
        <h3>
          {@html lang(hed)}
        </h3>
        {@html lang(long)}
      </div>
    {/each}

  </div>

  <button class="alt close" on:click="{updateMode}">
    {@html svgX}
  </button>
</section>
