const fs = require("fs");
const dsv = require("d3-dsv");
const d3Array = require("d3-array");

const PATH_IN = "./process";

const COLUMNS = [
  "id",
  "name_wrestling",
  "name_crew",
  "name_real",
  "name_alt",
  "nationality_fr",
  "nationality_en",
  "year_start",
  "year_end",
  "mask_theme_fr",
  "mask_theme_en",
  "active_fr",
  "active_en",
  "info_fr",
  "info_en"
];

const themeDict = {
  basic: "fondamental",
  "elements/nature": "éléments/nature",
  animal: "animal",
  legacy: "héritage",
  "madness/mystery": "folie/mystère",
  "darkness/death/demon/macabre": "obscurité/mort/démon/macabre",
  "pop culture/comic/manga/movie": "culture pop/bande dessinée/manga/film",
  "mythology/folklore/history": "mythologie/folklore/histoire",
  "martial arts/warrior": "arts martiaux/guerrier",
  religious: "religieux",
  other: "autre",
  multiple: "plusieurs"
};

function getFrenchThemes(str) {
  if (str === "multiple") {
    return str
      .split(",")
      .map(d => themeDict[d.trim()])
      .filter(d => d)
      .join(", ");
  } else if (str) return themeDict[str];
  return "";
}

function clean(data) {
  return data.map(d => {
    const mask_theme_fr = getFrenchThemes(d.mask_theme_en);
    const mask_theme_en =
      d.mask_theme_en === "multiple"
        ? d.mask_theme_multiple_en
        : d.mask_theme_en;
    const temp = {
      ...d,
      id: d.id.toLowerCase(),
      mask_theme_fr,
      mask_theme_en
    };
    const output = {};
    Object.keys(temp).forEach(key => {
      if (COLUMNS.includes(key)) output[key] = temp[key].trim();
    });

    return output;
  });
}

const wrestlerData = clean(
  dsv.csvParse(fs.readFileSync(`${PATH_IN}/wrestler-data.csv`, "utf8"))
).filter(d => d.info_en);

const spriteData = dsv.csvParse(
  fs.readFileSync(`${PATH_IN}/sprite-data.csv`, "utf8")
);

const matchSprite = id => spriteData.find(d => d.id === id) || {};

const data = wrestlerData.map(d => ({
  ...d,
  ...matchSprite(d.id)
}));

data.sort((a, b) => d3Array.ascending(+a.name_wrestling, +b.name_wrestling));
const output = dsv.csvFormat(data);

fs.writeFileSync("./public/assets/data/wrestlers.csv", output);
