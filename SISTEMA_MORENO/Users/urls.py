from Users.Views.signin import SigninView
from Users.Views.signup import SignupView
from Users.Views.user import GetUserView

from django.urls import path

urlpatterns = [
     path('signin/', SigninView.as_view()),
     path('signup', SignupView.as_view()),
     path('users', GetUserView.as_view()),
]