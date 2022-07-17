const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashmap = xObject || [
  {
    logo: "B",
    logoType: "text",
    url: "https://www.bilibili.com/",
  },
  { logo: "T", logoType: "text", url: "https://www.taobao.com/" },
  { logo: "Z", logoType: "text", url: "https://www.zhihu.com/" },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.last)").remove();

  hashmap.forEach((node, index) => {
    const $li = $(` <li>
    <div class="site">
      <div class="logo">${node.logo}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class="close"><svg class="iconpark-icon"><use href="#close"></use></svg></svg></div>
      </div>
</li>`).insertBefore($lastLi);
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashmap.splice(index, 1);
      render();
    });
  });
};
render();

$(".addButton").on("click", () => {
  let url = window.prompt("输入你想添加的网址");
  if (url.indexOf(`http`) !== 0) {
    url = `https://` + url;
  }
  hashmap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  console.log(url);
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashmap);
  localStorage.setItem("x", string);
};
//键盘监听我注释掉了，bug有点多，譬如搜索按到相应key也会打开页面，还有如果有两个相同字母，就很难用，譬如github和google
/*$(document).on("keypress", (e) => {
  const key = e.key;
  for (let i = 0; i < hashmap.length; i++) {
    if (hashmap[i].logo.toLowerCase() === key) {
      window.open(hashmap[i].url);
    }
  }
});*/
