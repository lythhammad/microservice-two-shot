import django
import os
import sys
import time
import json
import requests

from hats_rest.models import LocationVO


sys.path.append("hats/api")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Import models from hats_rest, here.
# from hats_rest.models import Something


def get_locations():
    response = requests.get("http://wardrobe-api:8000/api/locations/")
    content = json.loads(response.content)
    for location in content["locations"]:
        LocationVO.objects.update_or_create(
            import_href=location["href"],
            section_number=location["section_number"],
            shelf_number=location["shelf_number"],
            closet_name=location["closet_name"],
            defaults={"id": location["id"]},
        )


def poll():
    while True:
        print('Hats poller polling for data')
        try:
            get_locations()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
