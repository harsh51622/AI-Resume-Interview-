from rest_framework import serializers
from .models import Resumes


class ResumesSerializers(serializers.ModelSerializer):
    class Meta:
        model = Resumes
        fields = '__all__'
        extra_kwargs = {
            'user': {'read_only': True}
        }