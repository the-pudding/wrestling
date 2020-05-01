<style>
  canvas {
    display: none;
  }
</style>

<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { onDeck, sprite } from "./../components/utils/stores.js";
  import loadImage from "./../components/utils/load-image.js";

  let canvas;
  export let width;
  export let height;

  const dispatch = createEventDispatcher();

  function getPixels({ data }) {
    const output = [];
    for (let i = 0; i < data.length; i += 4) {
      const index = Math.floor(i / 4);
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      const rgb = `rgb(${r},${g},${b})`;
      if (a)
        output.push({
          index,
          x: index % width,
          y: Math.floor(index / width),
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
    loadImage("./assets/images/spritesheet.png").then(img => ($sprite = img));

    onDeck.subscribe(d => {
      if (!d) return;
      const { id, x, y } = d;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage($sprite, x, y, width * 2, height * 2, 0, 0, width, height);
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = getPixels(imageData);
      dispatch("pixels", { pixels, id });
    });
  });
</script>

<canvas bind:this="{canvas}" {width} {height}></canvas>
