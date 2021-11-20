'use strict'

const userForm = new UserForm();



userForm.loginFormCallback = (data) => {

  //data - логин и пароль пользователя из формы ввода
  console.log(data);

  ApiConnector.login(data, (response) => {

    if (response.success) {
      location.reload();
    } else {
      userForm.setLoginErrorMessage(response.error);
    }

    //response - ответ сервера на запрос входа
    console.log(response);
  })
};


userForm.registerFormCallback = (data) => {

  ApiConnector.register(data, (response) => {

    if (response.success) {
      location.reload();
    } else {
      userForm.setRegisterErrorMessage(response.error);
    }

    console.log(response);
  });
}