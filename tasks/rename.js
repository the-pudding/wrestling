const fs = require("fs");

const EXT = ".png";
const PATH_IN = "./process/illustrations";

const files = fs.readdirSync(PATH_IN).filter(d => d.includes(EXT));

async function rename(file) {
  const name = file.replace(".png", "");
  const r = name.toLowerCase().replace(/\W/g, "_");
  fs.renameSync(`${PATH_IN}/${file}`, `${PATH_IN}/${r}.png`);
  return true;
}

async function init() {
  for (let f of files) {
    await rename(f);
  }
}

init();
