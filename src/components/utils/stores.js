import * as d3Fetch from "d3-fetch";
import * as d3Array from "d3-array";
import { writable, readable, derived } from "svelte/store";
import copyData from "./../../data/copy.json";
import metaData from "./../../data/meta.json";
import lexiconData from "./../../data/lexicon.csv";

const THIS_YEAR = new Date().getFullYear();
const BP = 960;

// internal helper functions
function splitTrim(values) {
  return values
    .split(",")
    .map(d => d.trim())
    .filter(d => d);
}

function getDecade(s, e) {
  if (!s) return [];
  const start = Math.floor(+s / 10) * 10;
  const tempE = e ? +e : THIS_YEAR;
  const end = Math.floor(+tempE / 10) * 10 + 10;
  return d3Array.range(start, end, 10);
}

function cleanData(values) {
  return values.map((d, i) => ({
    ...d,
    nationality_fr: splitTrim(d.nationality_fr),
    nationality_en: splitTrim(d.nationality_en),
    mask_theme_fr: splitTrim(d.mask_theme_fr),
    mask_theme_en: splitTrim(d.mask_theme_en),
    decade: getDecade(d.year_start, d.year_end),
    start: d.year_start ? +d.year_start : 2021,
    x: +d.x,
    y: +d.y,
    index: d.name_crew === "Author" ? d.name_real.substring(0, 1) : i
  }));
}

async function loadData() {
  try {
    const d = await d3Fetch.csv("./assets/data/wrestlers.csv");
    const clean = cleanData(d);
    clean.sort((a, b) => d3Array.ascending(a.start, b.start));
    return clean;
  } catch (err) {
    return err;
  }
}

// external functions
// keeps track of previous mode state
export const updateMode = next => {
  const newMode = typeof next === "string" ? next : null;
  mode.update(curMode => {
    let last = null;
    prevMode.update(p => {
      last = p;
      return curMode;
    });
    // if no new mode, pop prevMode
    if (newMode) window.scrollTo(0, 0);
    return newMode || last;
  });
};

export const HEADER_HEIGHT = readable(48);

export const copy = readable(copyData);
export const meta = readable(metaData);
export const lexicon = readable(lexiconData);
export const data = writable([], set => {
  loadData().then(set);
});
export const mode = writable("intro");
export const prevMode = writable("intro");
export const storyHed = writable("");
export const onDeck = writable(null);
export const windowWidth = writable(0);
export const mobile = derived(windowWidth, $w => $w < BP, false);
export const rawSize = readable(80);
export const thumbSize = derived(mobile, $m => ($m ? 72 : 80), 80);
export const windowHeight = writable(0);
export const language = writable("en");
export const exploreWidth = writable(0);
export const filters = writable({});
export const sprite = writable();
export const slideIndex = writable(0);
export const currentStory = derived(
  storyHed,
  $s => copyData.stories.find(d => d.hed[0].text === $s),
  null
);

// export const current = derived(onDeck, $d => ($d.length ? $d.length : 0));
