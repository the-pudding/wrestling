import * as d3Array from "d3-array";

function generateSpeeds(chunks) {
  const s = {};
  const base = 0.5;
  d3Array.range(chunks).map(a => {
    d3Array.range(chunks).map(b => {
      // chunks - index
      // s[`${a}${b}`] = 2 + b / a;
      // chunks - ordered
      // s[`${a}${b}`] = 0.25 + b * 0.25 + Math.random() * b * 0.25;
      // chunks-sand
      const y = (b / chunks) * 1.5;
      const r = (b / chunks) * Math.random() * 0.5;
      s[`${a}${b}`] = base + y + r;
    });
  });
  return s;
}

export default function prepareTransition({
  enter = [],
  exit = [],
  width,
  height,
  style = "fax",
  chunks = 2
}) {
  const speeds = style === "sand" ? generateSpeeds(chunks) : null;

  const setSpeed = (p, dir) => {
    switch (style) {
      case "fax":
        const base = dir === "exit" ? 2.5 : 1;
        p.speed = base + (p.y / height) * (p.y / height) * 3;
        break;

      case "sand":
        const x = Math.floor(p.x / (width / chunks));
        const y = Math.floor(p.y / (width / chunks));
        p.speed = speeds[`${x}${y}`];
        break;

      default:
        p.speed = 1;
        break;
    }
  };

  let l = enter.length;
  let i = 0;
  while (i < l) {
    const p = enter[i];

    // start render positions
    setSpeed(p, "enter");
    p.rx = p.x;
    // TODO maybe set 0 on scan?
    p.ry = -height + p.y;
    p.update = true;
    i++;
  }

  i = 0;
  l = exit.length;
  while (i < l) {
    const p = exit[i];

    setSpeed(p, "exit");
    p.ry = p.y;
    // TODO make more uniform?
    p.y = height + p.y + Math.floor(Math.random() * 0.25 * height);
    p.update = true;
    i++;
  }
  return { enter, exit };
}
