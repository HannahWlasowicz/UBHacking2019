from twitter import *
from gleamdata import data
from selenium.webdriver.firefox.options import Options
from selenium import webdriver
import multiprocessing as mp
from multiprocessing import Pool
from operator import is_not
from functools import partial
#from pyvirtualdisplay import Display
import urllib.request
from bs4 import BeautifulSoup
def worker():
    op = Options()

    driver = webdriver.Firefox(firefox_options=op)

    #driver = webdriver.Firefox(firefox_profile=firefoxProfile, firefox_options=op)
    #driver = webdriver.Chrome()
    try:
        shortset = set([])
        for i in range(20):
            nonduplink = set([])
            print('launching twitter')
            links = launch_twitter(driver) #grabs list of gleam urls from twitter

            print('urls grabbed from twitter')
            print(links)
            poo = Pool(processes=20)
            #valid = []
            valid = list(map(expand, links))
            #for each in links:
            #    valid.append(expand(each))
            poo.close()
            poo.terminate()
            poo.join()
            del links
            valid = list(filter(partial(is_not, None), valid))
            #valid = set(expand(links))
            print(valid)
            print("have expanded links")
            big_daddy = []
            for url in valid:
                try:
                    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
                    html = urllib.request.urlopen(req).read()

                    soup = BeautifulSoup(html, 'html.parser')
                    title = soup.find('title')
                except Exception as e:
                    print(e)
                    continue

                if title.string != "discord":
                    big_daddy.append(url)
            insert(big_daddy)

    except Exception as e:
        print(e)
        driver.close()
        driver.quit()
        return
    driver.close()
    driver.quit()
  

if __name__ == '__main__':
    while True:
        #display = Display(visible=0, size=(800,600))
        #display.start()
        p = mp.Process(target=worker())
        p.start()
        #display.stop()
        p.join()
