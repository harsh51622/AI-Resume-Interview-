from django.db import models
from resumes.models import Resumes

class Question(models.Model):
    resume = models.ForeignKey(Resumes, on_delete=models.CASCADE , related_name="questions")
    question_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class InterviewSession(models.Model):
    resume_id = models.ForeignKey(Resumes, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add= True)
    completed = models.BooleanField(default = False)    

class Answer(models.Model):
    session = models.ForeignKey(InterviewSession, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete = models.CASCADE)
    answer_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add= True)      
