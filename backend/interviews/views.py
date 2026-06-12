from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import *
from .models import *
from resumes.models import Resumes

class questions_list(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):

        latest_resume = Resumes.objects.filter(user=request.user).last()
        question = Question.objects.filter(resume=latest_resume)
        serializer = InterviewSerializer(question, many=True)
        return Response(serializer.data)


class SubmitAnswerView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AnswerSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        session=InterviewSession.objects.get(id=serializer.validated_data["session_id"])
        question = Question.objects.get(id=serializer.validated_data["question_id"])
        answer = Answer.objects.create(
            session=session,
            question=question,
            answer_text=serializer.validated_data["answer_text"]
        )

        return Response({"message":"Answer Saved"})

class StartInterviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        resume_id = request.data.get("resume_id")
        resume = Resumes.objects.get(id=resume_id)
        session = InterviewSession.objects.create(resume_id=resume)
        return Response({"session_id": session.id})

class CompleteInterviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        session_id = request.data.get("session_id")
        session = InterviewSession.objects.get(id=session_id)
        session.completed = True
        session.save()
        return Response({"message":"Interview Completed"})        




