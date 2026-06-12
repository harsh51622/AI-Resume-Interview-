from django.urls import path, include
from .views import *

urlpatterns = [
    path('questions/', questions_list.as_view() ),
    path("submit-answer/",SubmitAnswerView.as_view()),
    path("start/", StartInterviewView.as_view()),
    path("complete/",CompleteInterviewView.as_view()),
]