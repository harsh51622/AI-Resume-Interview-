import os
from dotenv import load_dotenv
from .prompts import QUESTION_GENERATION_PROMPT, INTERVIEW_EVALUATION_PROMPT
from google import genai
load_dotenv()


api_key = os.getenv("API_KEY")

genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-2.5-flash")


def generate_questions(resume_text):
    prompt = QUESTION_GENERATION_PROMPT.format(resume_text=resume_text)
    response= model.generate_content(prompt)
    return response.text

def evaluate_interview(interview_data):
    prompt = INTERVIEW_EVALUATION_PROMPT.format(interview_data=interview_data)
    response = model.generate_content(prompt)
    return response.text

