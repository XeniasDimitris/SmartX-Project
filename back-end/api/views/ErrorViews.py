from django.http.response import JsonResponse
from django.http import Http404


def responseerror404(request, exception=None):
    # Override the message for 404 error

    return JsonResponse({"error": "Not Found"}, status= 404)
