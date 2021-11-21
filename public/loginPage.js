'use strict'

const userForm = new UserForm();

/**
 * Проверяет успешность запроса и выводит сообщения
 * @param {*} response - Ответ от сервера
 */
function checkResponseForm(response) {

  if (response.success) {
    location.reload();
  } else {
    userForm.setLoginErrorMessage(response.error);
  }
}


userForm.loginFormCallback = (data) => {
  ApiConnector.login(data, (response) => checkResponseForm(response));
}


userForm.registerFormCallback = (data) => {
  ApiConnector.register(data, (response) => checkResponseForm(response));
}