import random
import requests
import json
import replicate
from PIL import Image
import asyncio
from dotenv import load_dotenv
load_dotenv()
# REPLICATE_API_TOKEN

MINDMON_NAME_API_PORT = 4240

def mindmon_filename(x):
  return 'mindmons/mindmon-' + str(x) + '.png'

def load_config():
  with open("config.json", "r") as f:
    data = json.load(f)
  return data

def update_config(data):
  with open("config.json", "w") as f:
      json.dump(data, f)

async def add_mindmon_imgs(count):
  config = load_config()
  x = config['n_generated_mindmons'] + 1

  for i in range(x, x + count):
    filename = mindmon_filename(i)
    save_generated_mindmon_img(filename)
    config['n_generated_mindmons'] += 1
    update_config(config)

def random_from_file(filename):

  with open(filename, 'rb') as file:
      file_size = file.seek(0, 2)

      random_offset = random.randint(0, file_size - 1)
      file.seek(random_offset)
      file.readline().decode().strip()

      picked = file.readline()

  if not picked:
    return random_from_file(filename)

  return picked

def save_generated_mindmon_img(filename):
  animal = random_from_file('animals.txt')
  color = random_from_file('colors.txt')
  prompt = 'A pokemon that looks like a {}. {} in color. Facing left.'.format(animal, color)

  
  output = replicate.run(
      "lambdal/text-to-pokemon:3554d9e699e09693d3fa334a79c58be9a405dd021d3e11281256d53185868912",
      input={"prompt": prompt}
  )

  url = output[0]
  response = requests.get(url)

  with open(filename, "wb") as f:
      f.write(response.content)

def get_mindmon_img():
  config = load_config()
  if config['n_generated_mindmons'] == config['n_mindmons_existing']:
    return 'default.png'
  config['n_mindmons_existing'] += 1
  filename = mindmon_filename(config['n_mindmons_existing'])
  img = Image.open(filename)
  update_config(config)
  return img

def get_player_mindmon_img():
  img = Image.open('mindmons/default.png')
  return img
  
def get_mindmon_name():
  # resp = requests.get('http://localhost:{}/?amount=1'.format(MINDMON_NAME_API_PORT))
  # name = resp.json()[0]
  # return name
  return 'default name'




async def main():
  config = load_config()
  if config['n_generated_mindmons'] == config['n_mindmons_existing']:
    asyncio.create_task(add_mindmon_imgs(10))
  else:
    #asyncio.create_task(add_mindmon_imgs(2))
    pass
  

asyncio.run(main())