var DEFAULT_CONFIG = {
    styleMediumStatic: false,
    styleSmallStatic: false,
    styleSmallAnimated: true,
    use12Hour: true,
    showSeconds: true,
    showBackground: true,
    zoomLevel: 1.5,
    timeZoneOffset: 0,
    widgetTopPosition: 40
};

var refreshTimer = null;
var currentFolder = "assets/s-animated/";
var currentExt = ".gif";

function onload() {
    buildPreloadCache();
    applyConfiguration();
    refreshClock();
}

function buildPreloadCache() {
    var cacheContainer = document.getElementById("preload-cache");
    var folders = ["assets/m-static/", "assets/s-animated/", "assets/s-static/"];
    var html = "";
    for (var f = 0; f < folders.length; f++) {
        var ext = folders[f].indexOf("static") !== -1 ? ".png" : ".gif";
        for (var i = 0; i <= 9; i++) {
            html += "<img src='" + folders[f] + i + ext + "'>";
        }
    }
    if (cacheContainer) {
        cacheContainer.innerHTML = html;
    }
}

function applyConfiguration() {
    var settings = resolvedConfig();
    var root = document.documentElement;
    var clockRoot = document.getElementById("ani-time-root");
    var timeBox = document.querySelector(".time-box");

    root.style.setProperty("--widget-zoom", settings.zoomLevel);
    root.style.setProperty("--widget-top", settings.widgetTopPosition + "px");

    if (settings.styleMediumStatic === true) {
        currentFolder = "assets/m-static/";
        currentExt = ".png";
    } else if (settings.styleSmallStatic === true) {
        currentFolder = "assets/s-static/";
        currentExt = ".png";
    } else {
        currentFolder = "assets/s-animated/";
        currentExt = ".gif";
    }

    if (clockRoot) {
        if (settings.showSeconds) {
            clockRoot.classList.add("show-sec");
        } else {
            clockRoot.classList.remove("show-sec");
        }
    }

    if (timeBox) {
        if (settings.showBackground) {
            timeBox.classList.add("with-bg");
            document.body.classList.remove("dark-mode");
        } else {
            timeBox.classList.remove("with-bg");
            document.body.classList.add("dark-mode");
        }
    }
}

function resolvedConfig() {
    var source = typeof config === "object" && config !== null ? config : {};

    return {
        styleMediumStatic: booleanValue(source.styleMediumStatic, DEFAULT_CONFIG.styleMediumStatic),
        styleSmallStatic: booleanValue(source.styleSmallStatic, DEFAULT_CONFIG.styleSmallStatic),
        styleSmallAnimated: booleanValue(source.styleSmallAnimated, DEFAULT_CONFIG.styleSmallAnimated),
        use12Hour: booleanValue(source.use12Hour, DEFAULT_CONFIG.use12Hour),
        showSeconds: booleanValue(source.showSeconds, DEFAULT_CONFIG.showSeconds),
        showBackground: booleanValue(source.showBackground, DEFAULT_CONFIG.showBackground),
        zoomLevel: numberValue(source.zoomLevel, DEFAULT_CONFIG.zoomLevel),
        timeZoneOffset: numberValue(source.timeZoneOffset, DEFAULT_CONFIG.timeZoneOffset),
        widgetTopPosition: numberValue(source.widgetTopPosition, DEFAULT_CONFIG.widgetTopPosition)
    };
}

function numberValue(value, fallback) {
    var parsed = Number(value);
    return isFinite(parsed) ? parsed : fallback;
}

function booleanValue(value, fallback) {
    if (value === true || value === "true" || value === 1 || value === "1") return true;
    if (value === false || value === "false" || value === 0 || value === "0") return false;
    return fallback;
}

function refreshClock() {
    var settings = resolvedConfig();
    var now = new Date();

    if (settings.timeZoneOffset !== 0) {
        var utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        now = new Date(utc + (3600000 * settings.timeZoneOffset));
    }

    var hours = now.getHours();
    if (settings.use12Hour) {
        hours = hours % 12;
        hours = hours ? hours : 12;
    }

    var hoursStr = hours.toString().padStart(2, '0');
    var minutesStr = now.getMinutes().toString().padStart(2, '0');
    var secondsStr = now.getSeconds().toString().padStart(2, '0');

    var h1 = hoursStr.charAt(0);
    var h2 = hoursStr.charAt(1);
    var m1 = minutesStr.charAt(0);
    var m2 = minutesStr.charAt(1);
    var s1 = secondsStr.charAt(0);
    var s2 = secondsStr.charAt(1);

    var elH1 = document.getElementById('c-h1');
    var elH2 = document.getElementById('c-h2');
    var elM1 = document.getElementById('c-m1');
    var elM2 = document.getElementById('c-m2');
    var elS1 = document.getElementById('c-s1');
    var elS2 = document.getElementById('c-s2');

    if (elH1) elH1.style.backgroundImage = "url('" + currentFolder + h1 + currentExt + "')";
    if (elH2) elH2.style.backgroundImage = "url('" + currentFolder + h2 + currentExt + "')";
    if (elM1) elM1.style.backgroundImage = "url('" + currentFolder + m1 + currentExt + "')";
    if (elM2) elM2.style.backgroundImage = "url('" + currentFolder + m2 + currentExt + "')";

    if (settings.showSeconds) {
        if (elS1) elS1.style.backgroundImage = "url('" + currentFolder + s1 + currentExt + "')";
        if (elS2) elS2.style.backgroundImage = "url('" + currentFolder + s2 + currentExt + "')";
    }

    if (refreshTimer !== null) {
        clearTimeout(refreshTimer);
    }

    refreshTimer = setTimeout(refreshClock, 1000);
}
