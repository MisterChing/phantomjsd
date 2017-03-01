#coding:utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')
from selenium import webdriver
import time
driver = webdriver.Firefox(executable_path='/path/bin/geckodriver')
driver.set_window_size(1366,768)
driver.get('http://www.bilibili.com')
js1 = 'return document.body.scrollHeight'
js2 = 'window.scrollTo(0, document.body.scrollHeight)'
old_scroll_height = 0
while(driver.execute_script(js1) > old_scroll_height):
    old_scroll_height = driver.execute_script(js1)
    driver.execute_script(js2)
    time.sleep(3)
driver.save_screenshot('./gg.png')
print driver.page_source

driver.quit()

