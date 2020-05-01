<script>
  import * as d3Array from "d3-array";
  import { onMount } from "svelte";
  import {
    copy,
    data,
    language,
    mode,
    filters
  } from "./../components/utils/stores.js";
  import lang from "./../components/utils/lang.js";

  let decades = [];
  let nationalitiesFR = [];
  let nationalitiesEN = [];
  let themesFR = [];
  let themesEN = [];
  let selectedDecade;
  let selectedNationalityFR;
  let selectedNationalityEN;
  let selectedThemeFR;
  let selectedThemeEN;

  const DECADE_START = 1950;

  mode.subscribe(d => {
    if (d === "intro") reset();
  });

  function getUnique(prop) {
    const all = [].concat(...$data.map(d => d[prop]));
    const deduped = [...new Set(all)];
    deduped.sort((a, b) => d3Array.ascending(a, b));
    return deduped;
  }

  $: if ($data && $data.length) {
    // decades
    decades = [`Pre-${DECADE_START}`].concat(
      getUnique("decade").filter(d => d >= DECADE_START)
    );

    nationalitiesFR = getUnique("nationality_fr").filter(d => !d.includes(","));
    nationalitiesEN = getUnique("nationality_en").filter(d => !d.includes(","));

    themesFR = getUnique("mask_theme_fr");
    themesEN = getUnique("mask_theme_en");
  }

  $: $filters.decade = selectedDecade;
  $: $filters.nationality_fr = selectedNationalityFR;
  $: $filters.nationality_en = selectedNationalityEN;
  $: $filters.mask_theme_fr = selectedThemeFR;
  $: $filters.mask_theme_en = selectedThemeEN;

  function reset(d) {
    selectedDecade = "label";
    selectedNationalityFR = "label";
    selectedNationalityEN = "label";
    selectedThemeFR = "label";
    selectedThemeEN = "label";
  }

  language.subscribe(reset);
</script>

<form>
  <fieldset>

    <select
      bind:value="{selectedNationalityEN}"
      class="nationality lang"
      class:visible="{$language === 'en'}">
      <option value="label">{$copy.nationality[0].text}</option>
      {#each nationalitiesEN as d}
        <option value="{d}">{d}</option>
      {/each}
    </select>

    <select
      bind:value="{selectedNationalityFR}"
      class="nationality lang"
      class:visible="{$language === 'fr'}">
      <option value="label">{$copy.nationality[1].text}</option>
      {#each nationalitiesFR as d}
        <option value="{d}">{d}</option>
      {/each}
    </select>

    <select
      bind:value="{selectedDecade}"
      class="decade lang"
      class:visible="{$language === 'en'}">
      <option value="label">{$copy.decade[0].text}</option>
      {#each decades as d}
        <option value="{d}">{d}s</option>
      {/each}
    </select>

    <select
      bind:value="{selectedDecade}"
      class="decade lang"
      class:visible="{$language === 'fr'}">
      <option value="label">{$copy.decade[1].text}</option>
      {#each decades as d}
        <option value="{d}">{d}s</option>
      {/each}
    </select>

    <select
      bind:value="{selectedThemeEN}"
      class="theme lang"
      class:visible="{$language === 'en'}">
      <option value="label">{$copy.theme[0].text}</option>
      {#each themesEN as d}
        <option value="{d}">{d}</option>
      {/each}
    </select>

    <select
      bind:value="{selectedThemeFR}"
      class="theme lang"
      class:visible="{$language === 'fr'}">
      <option value="label">{$copy.theme[1].text}</option>
      {#each themesFR as d}
        <option value="{d}">{d}</option>
      {/each}
    </select>

  </fieldset>
</form>
