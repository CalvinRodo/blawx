from django.db import models

# Create your models here.
class RuleDoc(models.Model):
    ruledoc_name = models.CharField(max_length=200)
    akoma_ntoso = models.TextField(default="",blank=True)
    scasp_encoding = models.TextField(default="",blank=True)

    def __str__(self):
        return self.ruledoc_name

class Workspace(models.Model):
    ruledoc = models.ForeignKey(RuleDoc, on_delete=models.CASCADE)
    workspace_name = models.CharField(max_length=200)
    xml_content = models.TextField(default="",blank=True)
    scasp_encoding = models.TextField(default="",blank=True)

    def __str__(self):
        return self.workspace_name

class WorkspaceTemplate(models.Model):
    template_name = models.CharField(max_length=200)
    xml_content = models.TextField(default="")

    def __str__(self):
        return self.template_name

class Query(models.Model):
    ruledoc = models.ForeignKey(Workspace, on_delete=models.CASCADE)
    query_name = models.CharField(max_length=200)
    xml_content = models.TextField(default="",blank=True)
    published = models.BooleanField()

    def __str__(self):
        return self.query_name

class DocPage(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    path = models.CharField(primary_key = True, max_length=200)

    def __str__(self):
        return self.title

