from django.db import models
from django.urls import reverse


class LocationVO(models.Model):
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveSmallIntegerField()
    shelf_number = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200, unique=True)

    def __str__(self):
        return f"{self.closer_name}, {self.id}"


class Hat(models.Model):
    name = models.CharField(max_length=100)
    fabric = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)

    location = models.ForeignKey(
        LocationVO,
        related_name="hats",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_loction", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.id}, {self.name}"
