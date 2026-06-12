from.views import UploadResume
from django.urls import path, include


urlpatterns = [
    path('upload/', UploadResume.as_view()),

]