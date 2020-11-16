from django.http.response import JsonResponse
from django.http import Http404


def responseerror404(request, exception=None):
    return JsonResponse({"error": "Not Found"}, status= 404)
