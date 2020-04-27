/* eslint-disable */
(function (configData) {
  function load(agency) {
    // var polyfillUrl =
    //   "https://polyfill.io/v3/polyfill.min.js?features=default%2Cfetch%2CObject.getOwnPropertyDescriptor&amp";
    var manifestUrl = "http://localhost:8080/static/manifest/manifest.json";


    var acceptedEnv = ["dev", "staging", "prod"];
    var acceptedComponents = [
      "spa",
      "carousel",
      "landing",
      "landing-old",
      "search",
    ];
    if (!agency) {
      throw new Error("agency365 is missing on the global scope");
    }
    // if (!agency.config) {
    //   throw new Error(
    //     "agency365.config is undefined. Provide a path to a config file or pass config inline as JS object"
    //   );
    // }
    if (!agency.renderInElementWithId) {
      throw new Error(
        "agency365.renderInElementWithId is undefined. Provide an id for an element where to render an SPA component"
      );
    }
    if (!document.getElementById(agency.renderInElementWithId)) {
      throw new Error(
        "Element with id: " +
        renderInElementWithId +
        "can not be found. Make sure it is present on the page"
      );
    }
    // if (
    //   !agency.component ||
    //   acceptedComponents.indexOf(agency.component) === -1
    // ) {
    //   var acceptedValues = acceptedEnv.join("|");
    //   throw new Error(
    //     "agency365.component is undefined. Provide which SPA component to render, accepted values: " +
    //     acceptedValues
    //   );
    // }
    // if (!agency.env || acceptedEnv.indexOf(agency.env) === -1) {
    //   throw new Error(
    //     "agency365.env is undefined or set to a wrong value. Provide which environment you are running, accepted values: dev|staging|prod"
    //   );
    // }
    // if (agency.siteId) {
    //   console.warn(
    //     "agency.siteId is deprecated. siteId is now read from the config"
    //   );
    // }

    function waitForGlobal(keys, callback) {
      const keyPresent = !!window[keys];

      if (keyPresent) {
        callback();
      } else {
        setTimeout(function () {
          console.error("key not present, trying in half a second");
          waitForGlobal(keys, callback);
        }, 500);
      }
    }

    function loadScript(path, callback, deferred) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = path;
      script.onload = callback;
      if (deferred) script.setAttribute("defer", "");
      document.head.appendChild(script);
    }

    function loadCSS(fileName) {
      if (fileName === undefined) {
        return;
      }

      var head = document.head;
      var link = document.createElement("link");

      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = fileName;

      head.appendChild(link);
    }


    function waitForScriptsToLoad(config) {
      waitForGlobal(["Agency365Search"], function () {
        var cbre = new Agency365Search();
        cbre.renderSearch(agency.renderInElementWithId, config, agency.path);
      });
    }

    function onV2ManifestLoaded(manifest, config) {
      // loadCSS(manifest["main.css"]);
      loadScript(manifest["runtime-main.js"]);
      loadScript(manifest["vendors-main.js"]);
      loadScript(manifest["main.js"]);
      waitForScriptsToLoad(config);
    }

    function loadResources(config) {
      fetch(manifestUrl)
        .then(function (res) {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then(function (manifest) {
          onV2ManifestLoaded(manifest, config);
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  
    loadResources();
  }

  function addCss(fileName) {
    var head = document.head;
    var link = document.createElement("link");

    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;

    head.appendChild(link);
  }

  if (Array.isArray(configData)) {
    configData.forEach(load);
  } else {
    load(configData);
  }
})(window.agency365 || [{"renderInElementWithId":"root1"}, {"renderInElementWithId": "root2"}]);
