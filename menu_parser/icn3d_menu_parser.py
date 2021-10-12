from bs4 import BeautifulSoup
from selenium import webdriver
import re
import json


url = 'http://localhost'
browser = webdriver.Chrome()
browser.get(url)

soup = BeautifulSoup(browser.page_source, 'html.parser')
menu = soup.findAll('div', {'class': 'icn3d-menu'})

menu_dict = {}


def find_all_children(parent, menu_dict):
    if parent is not None:
        child = parent.findChildren(recursive=False)
        if len(child) < 1:
            try:
                if parent.text is not None and parent.text != '':
                    if parent.get('id') is not None:
                        menu_dict[parent.text] = [parent.get('id'), 1]
                    elif parent.parent.get('id') is not None:
                        menu_dict[parent.text] = [parent.parent.get('id'), 1]
                    else:
                        menu_dict[parent.text] = [parent.parent.parent.get('id'), 1]
            except:
                pass

        elif child[0].name == 'h3':
            menu_dict[child[0].text] = {}
            for i in child:
                find_all_children(i, menu_dict[child[0].text])

        else:
            try:
                if parent.text is not None and parent.text != '':
                    if parent.name == 'ul' and parent.previous_sibling is not None:
                        menu_dict[parent.previous_sibling.text] = {"self": [parent.previous_sibling.get('id'), 1]}
                        for i in child:
                            find_all_children(i, menu_dict[parent.previous_sibling.text])
                    else:
                        for i in child:
                            find_all_children(i, menu_dict)
            except:
                pass


for item in menu:
    find_all_children(item, menu_dict)

format_dict = json.dumps(menu_dict, indent=4)
format_dict = re.sub(r'": \[\s+', '": [', format_dict)
format_dict = re.sub(r'\[\s+', '"[', format_dict)
format_dict = re.sub(r'",\s+', '", ', format_dict)
format_dict = re.sub(r'\s+\]', ']', format_dict)
format_dict = re.sub(r'l,\s+', 'l, ', format_dict)

print(format_dict)

browser.quit()

with open('menu.json', 'w') as file:
    file.write(format_dict)
