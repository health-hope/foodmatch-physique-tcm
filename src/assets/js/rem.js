(function () {
    function resizeBaseFontSize () {
        var rootHtml = document.documentElement;
            var deviceWidth = rootHtml.clientWidth;
        if (deviceWidth > 800) {
            deviceWidth = 800;
        }
        rootHtml.style.fontSize = deviceWidth / 18.75 + 'px';
    }
    resizeBaseFontSize();
    window.addEventListener('resize', resizeBaseFontSize, false);
    window.addEventListener('orientationchange', resizeBaseFontSize, false);
})();
