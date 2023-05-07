from youtube_transcript_api import YouTubeTranscriptApi
from dotenv import load_dotenv
import os
import openai

load_dotenv()
openai.api_key = os.environ.get("OPENAI_KEY")

def transcript_generator(video):
    transcript = YouTubeTranscriptApi.get_transcript(video[32:47])
    l = []
    s = ""
    for i in transcript:
        l.append(i['text'])
        cur_text =  i['text'] + " "
        s = s + cur_text
    return s

def options_return(reply):
    questiondata =[reply[:reply.find('2.')], reply[reply.find('2.'):reply.find('3.')], reply[reply.find('3.'):reply.find('4.')], reply[reply.find('4.'):reply.find('5.')], reply[reply.find('5.'):]]
    print(questiondata)
    qnalst = []
    for i in questiondata:
        lst = i.split('\n')
        lst = [i for i in lst if i != '']
        qnalst.append(lst)

    qns = []
    for i in range(len(qnalst)):
        qnstemp = {}
        qnstemp['num'] = i+1
        qnstemp['title'] = qnalst[i][0]
        qnstemp['option'] = list(qnalst[i][1:-1])
        qnstemp['ans'] = qnalst[i][-1][8:]
        qns.append(qnstemp)

    return qns

def create_options(transcript):
    messages = []
    messages.append(
            {"role": "user", "content": "give me 5 questions and answers with 4 options for the above content:\n" + transcript},
        )
    
    chat = openai.ChatCompletion.create(
            model="gpt-3.5-turbo", messages=messages
        )
    
    reply = chat.choices[0].message.content
    return reply

def question_creator(url):
    transcripts = transcript_generator(url)[:512]
    options = create_options(transcripts)
    print(options)
    finaldict = options_return(options)

    return finaldict 