from django.db import models
from interviews.models import InterviewSession

class InterviewResult(models.Model):
    session = models.OneToOneField(InterviewSession, on_delete=models.CASCADE)
    overall_score = models.IntegerField()
    communication_score = models.IntegerField()
    technical_score = models.IntegerField()
    confidence_score = models.IntegerField()
    strengths = models.TextField()
    weaknesses = models.TextField()
    feedback = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
