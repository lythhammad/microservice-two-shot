from django.shortcuts import render
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Hats, LocationVO
from django.http import JsonResponse
# Create your views here.


class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = [
        "closet_name",
        "section_number",
        "shelf_number",
        "import_href",
        ]


class HatListEncoder(ModelEncoder):
    model = Hats
    properties = [
        "id",
        "name",
        "picture_url",

    ]

    def get_extra_data(self, o):
        return {"location": o.location.id}


class HatDetailEncoder(ModelEncoder):
    model = Hats
    properties = [
        "name",
        "fabric",
        "style_name",
        "color",
        "picture_url",
    ]
    encoders = {
        "location": LocationVODetailEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        if location_vo_id is not None:
            hats = Hats.objects.filter(location=location_vo_id)
        else:
            hats = Hats.objects.all()
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder
        )
    else:
        content = json.loads(request.body)
        try:
            closet_name = content["location"]
            location = LocationVO.objects.get(closet_name=closet_name)
            content["location"] = location
        except LocationVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid location id"},
                status=400,
            )
        hat = Hats.objects.create(**content)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )


@require_http_methods(["DELETE", "GET"])
def api_show_hat(request, pk):
    if request.method == "GET":
        hat = Hats.objects.get(id=pk)
        return JsonResponse(
            hat,
            encoder=HatDetailEncoder,
            safe=False,
        )
    else:
        try:
            count, _ = Hats.objects.filter(id=pk).delete()
            return JsonResponse({"deleted": count > 0})
        except Hats.DoesNotExist:
            return JsonResponse({"Note": "Hat does not exist"})
