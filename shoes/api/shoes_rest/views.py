from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from common.json import ModelEncoder
from .models import Shoe, BinVO


class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = [
        "closet_name",
        "bin_number",
        "bin_size",
        "import_href",
    ]


# class ShoeListEncoder(ModelEncoder):
#     model = Shoe
#     properties = [
#         "id",
#         "manufacturer",
#         "model_name",
#     ]

class ShoeDetailEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
        "bin"
    ]

    encoders = {
        "bin": BinVODetailEncoder()
    }


@require_http_methods(["GET", "POST"])
def api_list_shoes(request, bin_vo_id=None):
    if request.method == "GET":
        shoes = Shoe.objects.all()
        return JsonResponse(
            shoes,
            encoder=ShoeDetailEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        try:
            bin_href = content["bin"]
            bin = BinVO.objects.get(import_href=bin_href)
            content["bin"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoe = Shoe.objects.create(**content)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False
        )


@require_http_methods(["DELETE", "GET", "PUT"])
def api_show_shoes(request, pk):
    if request.method == "GET":
        shoe = Shoe.objects.get(id=pk)
        return JsonResponse(
            shoe,
            encoder=ShoeDetailEncoder,
            safe=False,

        )
    else:
        try:
            count, _ = Shoe.objects.filter(id=pk).delete()
            return JsonResponse({"Deleted": count > 0})
        except Shoe.DoesNotExist:
            return JsonResponse({"Note": "Shoe doesn't exist"})
