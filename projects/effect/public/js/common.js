/* eslint-disable */

window.setTitle = function (title, appendString) {
  appendString = appendString || "%webSiteTitle% - ";
  document.title = appendString + title;
};

window.setLoadingState = (function () {
  let int;
  let start = Date.now();

  function getLoadingState() {
    try {
      return parseFloat(document.body.style.getPropertyValue("--loading-progress")) || 0;
    } catch {
      return 0;
    }
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
      onFinishScriptList();

      console.log("加载耗时", ((Date.now() - start) / 1000) + "秒");
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

window.setLoadingState(0);

function onLoad() {
  window.setLoadingState(20);
}

// script加载全部完成时候
function onFinishScriptList() {
  const mask = document.getElementById("CircleLoopMask");
  const mask2 = document.getElementById("CircleLoopMask2");
  const mask3 = document.getElementById("CircleLoopMask3");
  const textContainer = document.getElementById("textContainer");
  const appContainer = document.getElementById("AppContainer");
  const maskContainer = mask.children[0];
  const mask2Container = mask2.children[0];
  const mask3Container = mask3.children[0];
  // maskContainer容器的动画结束时
  maskContainer.addEventListener("animationend", function _AnimationEnd(e) {
    if (e.currentTarget === maskContainer) {
      mask2Container.addEventListener("animationend", _AnimationEnd);
      mask2Container.classList.add("start");
      maskContainer.removeEventListener("animationend", _AnimationEnd);
    } else if (e.currentTarget === mask2Container) {
      mask3Container.addEventListener("animationend", _AnimationEnd);
      mask3Container.classList.add("start");
      appContainer.classList.add("start");
      mask2Container.removeEventListener("animationend", _AnimationEnd);
    } else if (e.currentTarget === mask3Container) {
      document.getElementById("LoadingSVG").style.display = "none";
      document.body.classList.remove("overflow-hidden");
      mask3Container.removeEventListener("animationend", _AnimationEnd);
    }
  });
  textContainer.classList.add("start");
  maskContainer.classList.add("start");
}
