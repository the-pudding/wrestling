const fs = require("fs");
const Spritesmith = require("spritesmith");
const dsv = require("d3-dsv");

const EXT = ".png";
const PATH_IN = "./process/resized";

const src = fs
  .readdirSync(PATH_IN)
  .filter(d => d.includes(EXT))
  .map(d => `${PATH_IN}/${d}`);

Spritesmith.run({ src }, (err, result) => {
  const { width, height } = result.properties;
  if (err) console.log(err);
  const data = [];
  for (const img in result.coordinates) {
    const id = img.replace(`${PATH_IN}/`, "").replace(EXT, "");
    const { x, y } = result.coordinates[img];
    data.push({ id, x, y, w: width, h: height });
  }

  const output = dsv.csvFormat(data);

  fs.writeFileSync("./process/sprite-data.csv", output);
  fs.writeFileSync(`./static/images/spritesheet${EXT}`, result.image);
});
