<style src="./../styles/wrestler.styl">

</style>

<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { cubicIn } from "svelte/easing";
  import { onDeck, mode, windowHeight } from "./../components/utils/stores.js";

  export let index;
  export let id;
  export let x;
  export let y;
  export let w;
  export let h;
  export let top;
  export let left;
  export let inactive;
  export let sz;

  const dispatch = createEventDispatcher();
  const BASE = 160;
  // $: console.log(sz);
  $: div = BASE / sz;
  $: pos = `-${Math.round(x / div)}px -${Math.round(y / div)}px`;
  $: size = `${Math.round(w / div)}px ${Math.round(h / div)}px`;

  function handleClick() {
    if ($mode === "explore") $onDeck = { index, id, x, y };
    else if (inactive) dispatch("popup", { pos });
    else dispatch("inc", { id });
  }

  function animateIn(node) {
    return {
      delay: index,
      duration: 1000,
      css: t => {
        return `top: ${t * top}px;`;
      }
    };
  }

  function animateUpdate(node) {
    return {
      delay: 3000,
      duration: 1000,
      css: t => {
        return `top: ${t * top}px; left: ${t * left}px;`;
      }
    };
  }

  function animateOut(node) {
    return {
      duration: index,
      css: (t, u) => {
        return `top: ${top + u * $windowHeight}px; opacity: ${t}`;
      }
    };
  }
</script>

<div
  data-id="{id}"
  in:animateIn
  out:animateOut
  class="wrestler"
  class:inactive
  class:selected="{$onDeck ? $onDeck.id === id : false}"
  on:click="{handleClick}"
  style="top: {top}px; left: {left}px;">
  <p>{typeof index === 'number' ? index + 1 : index}</p>
  <figure style="background-position: {pos}; background-size: {size}"></figure>
</div>
