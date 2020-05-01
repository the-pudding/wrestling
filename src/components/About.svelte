<style src="./../styles/about.styl">

</style>

<script>
  import lang from "./../components/utils/lang.js";
  import {
    copy,
    lexicon,
    language,
    mode,
    updateMode
  } from "./../components/utils/stores.js";
  import svgX from "./../svg/x-circle.svg";
  import wordmark from "./../svg/pudding/wordmark.svg";

  $: visible = $mode === "about";
</script>

<section id="about" class:visible>
  <div class="content">
    <div class="wordmark">
      <a href="https://pudding.cool" target="_blank">
        {@html wordmark}
      </a>
    </div>
    <div class="byline">
      {@html lang($copy.about.byline)}
    </div>
    <div class="recirc">
      {@html lang($copy.about.recirc)}
    </div>
    <div class="terms">
      <div class="terms__hed">
        {@html lang($copy.terms)}
      </div>
      <ul>
        {#each $lexicon as term}
          <li>
            <strong>{term[`word_${$language}`]}:</strong>
            {term[`description_${$language}`]}
          </li>
        {/each}
      </ul>
    </div>
    <div class="method">
      {@html lang($copy.about.method)}
    </div>

    <button class="alt close" on:click="{updateMode}">
      {@html svgX}
    </button>
  </div>

</section>
