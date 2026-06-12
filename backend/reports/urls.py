from django.urls import path
from .views import EvaluateInterviewView

urlpatterns = [

    path("evaluate/",EvaluateInterviewView.as_view())

]