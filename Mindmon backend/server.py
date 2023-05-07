from flask import Flask,request, send_file
from flask_cors import CORS
from quiz import question_creator
from mindmon import get_mindmon_img, get_player_mindmon_img
from edu import is_educational
from io import BytesIO


app = Flask(__name__,  static_url_path='', 
            static_folder='static',
            template_folder='templates')
CORS(app)


@app.route('/')
def home_route():
  return 'server active'

@app.route('/play_game')
def play_game():
  return app.send_static_file('play_game.html')

@app.route('/get_questions')
def get_questions():
  # url = request.args.get('url')
  # questions = question_creator(url)
  # print(questions)
  # return questions

  questions = [{'num': 1, 'title': '1. How many small eggs were inside the giant egg?', 'option': ['A. 3 ', 'B. 4 ', 'C. 5 ', 'D. 6 '], 'ans': 'D '}, {'num': 2, 'title': '2. What is the color of the first egg that is cracked open?', 'option': ['A. Blue or Azul ', 'B. Green or Verde ', 'C. Yellow or Amarillo ', 'D. Pink or Rosa '], 'ans': 'D '}, {'num': 3, 'title': '3. What shape is the chicken that comes out of the first egg?', 'option': ['A. Circle or Circular ', 'B. Square or Cuadrado ', 'C. Rectangle or Rectangular ', 'D. Triangle or Triangular '], 'ans': 'D '}, {'num': 4, 'title': '4. What are the eggs used for?', 'option': ['A. Making pancakes ', 'B. Painting ', 'C. A birthday cake ', 'D. An omelette '], 'ans': 'C '}, {'num': 5, 'title': '5. Besides cracking open eggs, what is another activity described in the content?', 'option': ['A. Playing a game of soccer ', 'B. Learning some Spanish ', 'C. Going for a hike ', 'D. Making paper airplanes '], 'ans': 'B'}]
  return questions

def serve_pil_image(pil_img):
    img_io = BytesIO()
    pil_img.save(img_io, 'PNG', quality=70)
    img_io.seek(0)
    return send_file(img_io, mimetype='image/jpeg')

@app.route('/mindmon')
def mindmon():
  return serve_pil_image(get_mindmon_img())

@app.route('/player_mindmon')
def player_mindmon():
  return serve_pil_image(get_player_mindmon_img())





@app.route("/is_edu",methods=['GET', 'POST'])
def educlassifier():    #Generates the image for the boss using stable diffusion
  content = request.json
  url = content['url']
  print(is_educational(url))
  return str(is_educational(url))




if __name__ == '__main__':
  app.run(port='8250')