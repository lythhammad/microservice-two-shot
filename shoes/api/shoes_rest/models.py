from django.db import models
from django.urls import reverse

class BinVO(models.Model):
    closet_name = models.CharField(max_length=100)
    bin_number = models.PositiveSmallIntegerField()
    bin_size = models.PositiveSmallIntegerField()
    import_href = models.CharField(max_length=200,unique = True)

class Shoe(models.Model):
    manufacturer = models.CharField(max_length=100)
    model_name = models.CharField(max_length=100)
    picture_url = models.URLField(null=True)
    color = models.CharField(max_length=100)
    bin = models.ForeignKey(
        BinVO,
        related_name = "shoes",
        on_delete=models.CASCADE,
    )

def __str__(self):
    return self.name

def get_api_url(self):
    return reverse("api_bin", kwargs={"pk": self.pk})
