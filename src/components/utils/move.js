export default function(pixels = []) {
  let i = 0;
  let l = pixels.length;
  let inProgress = false;
  while (i < l) {
    const p = pixels[i];
    if (p.update) {
      inProgress = true;
      p.ry += p.speed;
      if (p.y <= p.ry) {
        p.ry = p.y;
        p.update = false;
      }
    }
    i++;
  }
  return inProgress;
}
