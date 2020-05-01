<style src="./../styles/header.styl">

</style>

<script>
  import lang from "./../components/utils/lang.js";
  import { copy, mode, data, language } from "./../components/utils/stores.js";
  import MenuDesktop from "./../components/Menu-Desktop.svelte";
  import MenuMobile from "./../components/Menu-Mobile.svelte";
  import wordmark from "./../svg/pudding/wordmark.svg";
  import logo from "./../svg/pudding/logo.svg";
  import globe from "./../svg/globe.svg";

  $: visible = $mode !== "intro";

  function toggleLanguage() {
    const elementsRemove = document.querySelectorAll(`.lang--${$language}`);
    [...elementsRemove].forEach(el => el.classList.remove("visible"));
    $language = $language === "en" ? "fr" : "en";
    const elementsAdd = document.querySelectorAll(`.lang--${$language}`);
    [...elementsAdd].forEach(el => el.classList.add("visible"));
  }
</script>

<a href="#content" class="skip-to-main">Skip to main content</a>

<header>
  <div class="header--intro" class:visible="{!visible}">
    <p class="updated">
      <strong>{$data.length || 0}</strong>
      {@html lang($copy.updated)}
    </p>

    <div class="wordmark">
      <a href="https://pudding.cool" target="_blank">
        {@html wordmark}
      </a>
    </div>

    <div class="language">
      <button class="alt" on:click="{toggleLanguage}">
        {@html lang($copy.intro.language)}
        {@html globe}
      </button>
    </div>
  </div>

  <div class="header--not" class:visible>
    <div class="logo">
      <a href="https://pudding.cool" target="_blank">
        {@html logo}
      </a>
    </div>

    <div class="desktop">
      <MenuDesktop />
    </div>

    <div class="mobile">
      <MenuMobile />
    </div>

  </div>
</header>
