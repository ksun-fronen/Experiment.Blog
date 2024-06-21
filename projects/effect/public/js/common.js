(function ApplicationStart() {
  const AnimationIsClosed = document.documentElement.getAttribute("animation-startup") === "Closed";

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
      let body = document.body;
      if (body) {
        body.style.setProperty("--loading-progress", `${resultPercent}`);
      }
      console.log("%c进度条：%c" + resultPercent + "%\r", "color:#999;font-weight:bold;", "background: darkred;color:#fff;border-radius: 5px;padding:0 10px;");
      // 加载完毕时
      if (resultPercent >= 100) {
        // document.getElementById("LoadingContainerRef").classList.add("off");
        clearInterval(int);

        // return () => ''

        let totalLoadTimeout = (Date.now() - start) / 1000;

        /*if (totalLoadTimeout < 0.2) {
          // 小于0.5的加载时间就直接过了
          document.getElementById("AppContainer").classList.remove("body-container-animation");
          document.getElementById("LoadingSVG").remove();

          return;
        }*/
        const promise = onFinishScriptList(totalLoadTimeout < 0.5 ? "Skip" : "");
        console.log("加载耗时", totalLoadTimeout + "秒");
        window.setLoadingState = () => "";
        return {
          finish: callback => promise.then(() => callback && callback()),
        };
      }
    };

    /*
        int = setInterval(function () {
          const len = getLoadingState();
          if (len <= 70) {
            return state(Math.floor(Math.random() * 10));
          }

          clearInterval(int);
        }, 1000);
    */

    return state;
  })();

  window.setLoadingState(0);

  document.body.onload = function onLoad() {
    if (!AnimationIsClosed) {
      document.getElementById("LoadingSVG").style.opacity = "1";
    }

    window.setLoadingState(20);
  };

  // script加载全部完成时候
  function onFinishScriptList(stepType) {
    // todo: 按钮3D化需要做
    return new Promise(function (resolve) {
      const mask = document.getElementById("CircleLoopMask");
      const mask2 = document.getElementById("CircleLoopMask2");
      const mask3 = document.getElementById("CircleLoopMask3");
      const textContainer = document.getElementById("textContainer");
      const appContainer = document.getElementById("AppContainer");
      const maskContainer = mask.children[0];
      const mask2Container = mask2.children[0];
      const mask3Container = mask3.children[0];
      let proxy = maskContainer;

      if (stepType === "Skip") {
        proxy = mask3Container;
      }

      function _startupApplication() {
        document.getElementById("LoadingSVG").style.display = "none";
        document.body.classList.remove("overflow-hidden");
        window.removeEventListener("resize", window.$$__ISUMI_SET_SVG_VIEW_BOX);
        appContainer.classList.remove("body-container-animation");
        delete window.$$__ISUMI_SET_SVG_VIEW_BOX;
        document.getElementById("ScriptOtherDOM").remove();
        resolve();
      }

      if (AnimationIsClosed) {
        return _startupApplication();
      }

      // maskContainer容器的动画结束时
      proxy.addEventListener("animationend", function _AnimationEnd(e) {
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
          _startupApplication();
          mask3Container.removeEventListener("animationend", _AnimationEnd);
        }
      });
      textContainer.classList.add("start");
      proxy.classList.add("start");
      if (proxy === mask3Container) {
        appContainer.classList.add("start");
      }
    });
  }
})();
