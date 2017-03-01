var page = require('webpage').create(),
    system = require('system'),
    url;
if (system.args.length === 1) {
    phantom.exit(1);
} else {
    url = system.args[1];
    page.settings.resourceTimeout = 2000;
    page.onResourceTimeout = function(request){
        console.log(request.id);
        page.close();
        phantom.exit();
    };
    page.open(url, function(status){
        window.setTimeout(function(){
            var readyState = page.evaluate(function(){
                return document.readyState;
            });
            if (readyState === 'complete') {
                console.log(page.content);
                page.close();
                console.log('render ok');
                phantom.exit();
            } else {
                console.log(111)
            }
        }, 1000);
    });
}
