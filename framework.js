var main;

var textEl;
var setText = function setTextFn(msg)
{
    textEl.innerHTML = msg;
};

var fpsEl;

var canvas;
var setInterval = function setInterval(fn)
{
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.mozRequestAnimationFrame;

    var getTime = Date.now;

    var performance = window.performance;
    if (performance)
    {
        getTime = function () { return performance.now(); };
    }

    var iterations = 1;

    var lastUpdateTime = getTime();

    var executionTime = 0;
    var frameCount = 0;

    var wrap = function wrapFn()
    {
        var startTime = getTime();

        for (var i = 0 ; i < iterations ; ++i)
        {
            fn();
        }

        var endTime = getTime();
        executionTime += (endTime - startTime);

        ++frameCount;

        var interval = endTime - lastUpdateTime;
        if (1000 < interval)
        {
            var fps = 1000.0 * frameCount / interval;
            fps = Math.round(100.0 * fps) / 100.0;

            var msPerFrame = interval / frameCount;
            msPerFrame = Math.round(100.0 * msPerFrame) / 100.0;

            var msExecutionPerFrame = executionTime / frameCount;
            msExecutionPerFrame = Math.round(100.0 * msExecutionPerFrame) / 100.0;

            fpsEl.innerHTML = "" + " FPS: " + fps +
                ", frameTime (ms): " + msPerFrame +
                ", execTime (ms): " + msExecutionPerFrame;

            lastUpdateTime = endTime;

            frameCount = 0;
            executionTime = 0;
        }

        requestAnimationFrame(wrap, canvas);
    };
    wrap();
};

window.onload = function ()
{
    fpsEl = document.getElementById("fps");
    textEl = document.getElementById("text");
    canvas = document.getElementById('turbulenz_game_engine_canvas');

    var runMain = function runMain()
    {
        if (main)
        {
            main();
        }
        else
        {
            window.setTimeout(runMain, 0.01);
        };
    }
    runMain();
};
