#coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from selenium import webdriver
import time
driver = webdriver.Firefox(executable_path='/path/bin/geckodriver')
driver.set_window_size(1366,768)
driver.get('http://www.bilibili.com')
driver.execute_script("""
    (function(){
        var y = 0;
        var step = 100;
        window.scroll(0, 0);
        
        function f(){
            if (y < document.body.scrollHeight) {
                y += step;
                window.scroll(0, y);
                setTimeout(f, 100);
            } else {
                window.scroll(0, 0);
                document.title += 'scroll-done';
            }
        }
        setTimeout(f, 1000);
    })();
""")

for i in xrange(30):
    if "scroll-done" in driver.title:
        break
    time.sleep(10)

driver.save_screenshot('./gg.png')
print driver.page_source

driver.quit()

