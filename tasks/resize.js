const fs = require("fs");
const jimp = require("jimp");
const rimraf = require("rimraf");

const EXT = ".png";
const PATH_IN = "./process/illustrations";
const PATH_OUT = "./process/resized";
// const SIZE_IN = 480;
const SIZE_OUT = 160;

const files = fs.readdirSync(PATH_IN).filter(d => d.includes(EXT));

async function resize(file) {
  const image = await jimp.read(`${PATH_IN}/${file}`);
  await image.resize(SIZE_OUT, jimp.AUTO);
  await image.writeAsync(`${PATH_OUT}/${file}`);
  return true;
}

async function init() {
  for (let f of files) {
    await resize(f);
  }
}

rimraf(`${PATH_OUT}/*.png`, init);
