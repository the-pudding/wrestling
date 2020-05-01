export default function(arr) {
  return arr
    .map(({ lang, text }) => {
      const visible = lang === "en" ? "visible" : "";
      let html;
      if (typeof text === "string")
        html = `<span class="lang lang--${lang} ${visible}">${text}</span>`;
      else {
        html = text
          .map(({ type, value }) => {
            const tag = type === "text" ? "p" : type;
            if (tag === "iframe") {
              const prop = `src="https://www.youtube.com/embed/${value}" frameborder="0"`;
              return `<div class='yt'><${tag} class="lang lang--${lang} ${visible}" ${prop}>${value}</${tag}></div>`;
            }
            return `<${tag} class="lang lang--${lang} ${visible}">${value}</${tag}>`;
          })
          .join("");
      }
      return html;
    })
    .join("");
}
