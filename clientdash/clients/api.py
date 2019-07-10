from clients.models import *
from rest_framework import viewsets, permissions
from .serializers import *


# Current Viewset
class CurrentViewSet(viewsets.ModelViewSet):
  permission_classes = [
      permissions.IsAuthenticated,
  ]
  serializer_class = CurrentSerializer

  """def get_queryset(self):
      return self.request.user.clients.all()

  def perform_create(self, serializer):
      serializer.save(owner=self.request.user)
  """


# Historical Viewset
class HistoricalViewSet(viewsets.ModelViewSet):
  permission_classes = [
      permissions.IsAuthenticated,
  ]
  serializer_class = HistoricalSerializer
