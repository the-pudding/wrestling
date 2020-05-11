<script>
  import { copy, meta } from "./../components/utils/stores.js";
</script>

<title>{$copy.title[0].text}</title>
<meta name="description" content="{$copy.description[0].text}" />
<meta name="news_keywords" content="{$meta.keywords}" />

<meta property="og:title" content="{$copy.title[0].text}" />
<meta property="og:site_name" content="{$meta.siteName}" />
<meta property="og:url" content="{$meta.url}" />
<meta property="og:description" content="{$copy.description[0].text}" />
<meta property="og:type" content="article" />
<meta property="og:locale" content="en_US" />

<meta property="og:image" content="{$meta.imgFacebook}" />
<meta property="og:image:type" content="image/jpeg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="600" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="{$meta.site}" />
<meta name="twitter:creator" content="{$meta.author.twitterHandle}" />
<meta name="twitter:title" content="{$copy.title[0].text}" />
<meta name="twitter:description" content="{$copy.description[0].text}" />
<meta name="twitter:image:src" content="{$meta.imgTwitter}" />

<link rel="canonical" href="{$meta.url}" />

<link
  rel="preload"
  type="font/woff2"
  as="font"
  crossorigin
  href="https://pudding.cool/assets/fonts/national/National2Web-Bold.woff2" />

<link
  rel="preload"
  type="font/woff2"
  as="font"
  crossorigin
  href="https://pudding.cool/assets/fonts/national/National2Web-Regular.woff2" />

<link
  rel="apple-touch-icon"
  sizes="180x180"
  href="https://pudding.cool/apple-touch-icon.png" />
<link
  rel="icon"
  type="image/png"
  sizes="32x32"
  href="https://pudding.cool/favicon-32x32.png" />
<link
  rel="icon"
  type="image/png"
  sizes="16x16"
  href="https://pudding.cool/favicon-16x16.png" />
<link rel="manifest" href="https://pudding.cool/site.webmanifest" />
<link
  rel="mask-icon"
  href="https://pudding.cool/safari-pinned-tab.svg"
  color="#5bbad5" />
<meta name="msapplication-TileColor" content="#ffc40d" />
<meta name="theme-color" content="#ffffff" />
