var page = require('webpage').create(),
    system = require('system'),
    url, output, size;
if (system.args.length < 3 || system.args.lenth > 5) {
    console.log('Usage: render.js URL filemame');
    phantom.exit(1);
} else {
    url = system.args[1];
    // output = system.args[2];
    output = '/path/current/public_html/render.png';
    page.viewportSize = {width:1366, height:768};
    page.open(url, function(status){
        var cus = page.evaluate(function(){
            return document.getElementsByTagName('html')[0].getBoundingClientRect();
        });
        page.clipRect = {
            top: cus.top,
            left: cus.left,
            width: cus.width,
            height: cus.height
        };
        window.setTimeout(function(){
            var readyState = page.evaluate(function(){
                return document.readyState;
            });
            if (readyState === 'complete') {
                page.render(output);
                page.close();
                console.log('render ok');
                phantom.exit();
            }
        }, 1000);
    });
}
