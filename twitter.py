from selenium import webdriver
from expander import resolve_url as exp
from expander import resolve_url_req as expreq
import sqlite3
import time
from datetime import datetime


def launch_twitter(driver: webdriver):
    """
    :type driver: selenium.webdriver.firefox.webdriver.WebDriver
    """
    twitter_url = "https://twitter.com/search?q=discord.gg&src=typed_query&f=live"
    driver.get(twitter_url)
    URLs = driver.find_elements_by_css_selector("li[data-item-id]")
    lurl = []

    for tweet in URLs:
       if tweet.find_elements_by_class_name("twitter-timeline-link"):
            linkr = tweet.find_element_by_class_name("twitter-timeline-link")
            text = linkr.get_attribute("href")
            lurl.append(text)
    return lurl


def expand(bob):
    """

    :type bob: list
    """
    try:
        expanded = expreq(bob)
        if bob is None or not 'discord' in expanded:
            return ""
        #if expanded is not None and ("wn." in expanded or ".io" in expanded or "/contest/" in expanded):
        return expanded
    except Exception as e:
        print(e)
        print('error expanding url'+ bob)
        #expreq(bob)
        return None


def gatherinfo(url, driver):
    """
    :type driver: selenium.webdriver.firefox.webdriver.WebDriver
    """
    driver.get(url)
    end = 0
    try:
        if len(driver.find_elements_by_css_selector("div.color-square:nth-child(3) > span:nth-child(2) > span:nth-child(2)")) is not 0:
            end = int(driver.find_element_by_css_selector("div.color-square:nth-child(3) > span:nth-child(2)").get_attribute("data-ends"))
        elif len(driver.find_elements_by_css_selector("span.description:nth-child(2)")) is not 0:
            end = int(driver.find_element_by_css_selector("span.square-describe:nth-child(2)").get_attribute("data-ends"))
    except:
        print('instant win')
        return url, driver.title, 1
    return url, driver.title, end


def insert(dat):
    print("inserting into db")
    try:
        conn = sqlite3.connect('/home/py_server/gleam2.db', timeout =15)
    except Error as e:
        print(e)
        return
    for each in dat:
        c = conn.cursor()
        c.execute("Insert or ignore Into tmp2 Values (?,?,?,?,?)", [each.get_url(), each.get_title(), str(round(time.time())), str(each.get_end()), '0'])
    conn.commit()
    conn.close()
    print("inserted into db")

