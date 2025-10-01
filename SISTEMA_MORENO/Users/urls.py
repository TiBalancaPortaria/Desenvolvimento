from django.urls import path

from Users.Views.MeView import MeView
from Users.Views.signin import SigninView
from Users.Views.signup import SignupView
from Users.Views.user import GetUserView


urlpatterns = [
     path('me/', MeView.as_view()),
     path('signin/', SigninView.as_view()),
     path('signup/', SignupView.as_view()),
     path('users/', GetUserView.as_view()),
]
