from Users.models import User
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from Users.serializers import UserSerializer

class GetUserView(APIView):
     permission_classes = [IsAuthenticated]
     
     def get(self, request) -> None:
          user = request.user
          serializer = UserSerializer(user)
          
          return Response({'user': serializer.data})
     