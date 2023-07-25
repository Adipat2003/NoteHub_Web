from django.db import models

# Create your models here.

class User(models.Model):
    Username = models.TextField(null=True, blank=True)
    Email = models.TextField(null=True, blank=True)
    Password = models.TextField(null=True, blank=True)
    User_ID = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.Username