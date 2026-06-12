from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/interview/', include('interviews.urls')),
    path('api/resumes/', include('resumes.urls')),
    path("api/reports/", include("reports.urls")),
    path("api/users/", include("users.urls")),

]

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


