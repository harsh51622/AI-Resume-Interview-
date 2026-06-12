import json
from rest_framework.views import APIView
from rest_framework.response import Response
from interviews.models import InterviewSession, Answer
from .models import InterviewResult
from rest_framework.permissions import IsAuthenticated
from ai_engine.gemini_service import evaluate_interview


class EvaluateInterviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        try:

            session_id = request.data.get("session_id")
            session = InterviewSession.objects.get(id=session_id)
            answers = Answer.objects.filter(session=session)

            data = []
            for answer in answers:
                data.append({"question":answer.question.question_text,
                    "answer": answer.answer_text})

            ai_response = evaluate_interview(data)
            result = json.loads(
                ai_response
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

            interview_result, created = (
                InterviewResult.objects.update_or_create(session=session,

                    defaults={
                        "overall_score":result.get("overall_score", 0),
                        "communication_score":result.get("communication_score", 0),
                        "technical_score":result.get("technical_score", 0),
                        "confidence_score":result.get("confidence_score", 0),
                        "strengths":result.get("strengths", ""),
                        "weaknesses":result.get("weaknesses", ""),
                        "feedback":result.get("feedback", "" )
                    })
            )

            return Response(result)

        except Exception as e:
            return Response({"error":str(e)}, status=500)