/* eslint-disable */

window.setTitle = function (title, appendString) {
  appendString = appendString || "%webSiteTitle% - ";
  document.title = appendString + title;
};

window.setLoadingState = (function () {
  let int;

  function getLoadingState() {
    return parseFloat(document.body.style.getPropertyValue("--loading-progress")) || 0;
  }

  const state = function (percent) {
    const currentPercent = getLoadingState();
    const resultPercent = Math.min(currentPercent + percent, 100);
    requestAnimationFrame(() => {
      document.body.style.setProperty("--loading-progress", `${resultPercent}%`);
    });
    console.log("进度条：", resultPercent + "%");
    // 加载完毕时
    if (resultPercent >= 100) {
      // document.getElementById("LoadingContainerRef").classList.add("off");
      clearInterval(int);
      window.setLoadingState = () => "";
    }
  };

  int = setInterval(function () {
    const len = getLoadingState();
    if (len <= 70) {
      return state(Math.floor(Math.random() * 10));
    }

    clearInterval(int);
  }, 1000);

  return state;
})();

function onLoad() {
  window.setLoadingState(20);
}
