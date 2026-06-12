from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Resumes
from .serializers import ResumesSerializers
from .services.pdf_extracter import extract_text_pdf
from ai_engine.gemini_service import generate_questions
from interviews.services.question_parser import question_parser
from interviews.models import Question


class UploadResume(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ResumesSerializers(data=request.data)

        if serializer.is_valid():
            resume = serializer.save(user=request.user)
            text = extract_text_pdf(resume.resumes_file.path)
            questions_raw = generate_questions(text)
            questions = question_parser(questions_raw)

            # save questions
            for q in questions:
                Question.objects.create(
                    resume=resume,
                    question_text=q
                )

            # save extracted text
            resume.extracted_text = text
            resume.save()

            return Response({
                "resume": ResumesSerializers(resume).data,
                "questions": questions
            })

        return Response(serializer.errors, status=400)