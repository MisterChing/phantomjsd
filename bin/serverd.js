var system = require('system');
if (system.args.length === 1) {
    phantom.exit(1);
} else {
    var server = require('webserver').create();
    server.listen(system.args[1], function(request, response){
        var request_string = request.url;
        var url = request_string.replace('/?url=', '');
        if (!request_string || !url) {
            response.statusCode = 450;
            response.write('no url input!');
            response.close();
        }
        var page = require('webpage').create();
        page.settings.resourceTimeout = 10000;
        page.onResourceTimeout = function(request){
            page.close();
            response.statusCode = 451;
            response.write('phantomjs time out!');
            response.close();
        };
        page.settings.clearMemoryCaches = true;
        page.clearMemoryCache();
        var html;
        page.open(url, function(status){
            window.setTimeout(function(){
                var readyState = page.evaluate(function(){
                    return document.readyState;
                });
                if (readyState === 'complete') {
                    html = page.content;
                    page.close();
                    /*
                     * window.setTimeout(function(){
                     *     window.setTimeout(function(){
                     *         page.close();
                     *     }, 1);
                     * }, 500);
                     */
                    if (html.length > 40) {
                        response.write(html);
                        response.close();
                    } else {
                        response.statusCode = 452;
                        response.write('no content return, body too small!');
                        response.close();
                    }
                } else {
                    /*
                     * window.setTimeout(function(){
                     *     window.setTimeout(function(){
                     *         page.close();
                     *     }, 1);
                     * }, 500);
                     */
                    page.close();
                    response.statusCode = 453;
                    response.write('no content return, body render failed!');
                    response.close();
                }
            }, 1000);
        });
    });
}
