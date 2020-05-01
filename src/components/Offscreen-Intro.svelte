<style>
  canvas {
    display: none;
  }
</style>

<script>
  import { onMount, createEventDispatcher } from "svelte";
  import loadImage from "./../components/utils/load-image.js";

  let canvas;
  export let width;
  export let height;

  const dispatch = createEventDispatcher();

  function getPixels({ data }) {
    const output = { en: [], fr: [] };
    for (let i = 0; i < data.length; i += 4) {
      const index = Math.floor(i / 4);
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const rgb = `rgb(${r},${g},${b})`;
      const o = index < (width * height) / 2 ? "en" : "fr";
      if (a)
        output[o].push({
          index,
          x: index % width,
          y: Math.floor(index / width - (o === "fr" ? height / 2 : 0)),
          r,
          g,
          b,
          rgb
        });
    }
    return output;
  }

  onMount(() => {
    const ctx = canvas.getContext("2d");
    let sprite;
    loadImage("./assets/images/title.png").then(img => {
      ctx.drawImage(img, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = getPixels(imageData);
      dispatch("pixels", { pixels });
    });
  });
</script>

<canvas bind:this="{canvas}" {width} {height}></canvas>
