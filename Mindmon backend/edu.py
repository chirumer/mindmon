import openai
import requests
from bs4 import BeautifulSoup

openai.api_key = "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"

def get_title(link):
  response = requests.get(link)
  soup = BeautifulSoup(response.content, "html.parser")
  title = soup.find("meta", property="og:title")["content"]
  return(title)

def edu_check(title):
    messages = []
    messages.append(
            {"role": "user", "content": title +  "is this an educational video yes or no"},
        )
    chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )
    
    reply = chat.choices[0].message.content
    reply = reply.lower()
    edu = 1 if reply.startswith("yes") else 0
    return edu

def is_educational(link):
    title = get_title(link)
    edu = edu_check(title)
    return edu