'use strict'

/**
 * Проверка успешности запроса и вывод инфо сообщений
 * @param {*} response - Ответ от сервера
 */
function checkResponseMoney(response) {

  if (response.success) {
    ProfileWidget.showProfile(response.data);
    moneyManager.setMessage(true, 'Операция успешно выполнена');

  } else {
    moneyManager.setMessage(false, response.error);
  }
}


/**
 * Проверка успешности запроса и вывод инфо сообщений списка избранного
 * @param {*} response - Ответ от сервера
 */
function checkResponseFavoritesWidget(response) {

  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
    favoritesWidget.setMessage(true, 'Операция успешно выполнена');
  } else {
    favoritesWidget.setMessage(false, response.error);
  }
}


/**
 * Запрос на получение курсов валют
 */
function requestCourse() {

  ApiConnector.getStocks((response) => {

    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    }
  });
}


//* Выход из личного кабинета

const logoutButton = new LogoutButton();

logoutButton.action = () => {

  ApiConnector.logout((response) => {

    if (response.success) location.reload();
  });
}


//* Получение информации о пользователе

ApiConnector.current((response) => {

  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});


//* Получение текущих курсов валюты
//! Подумать над интервалом

const ratesBoard = new RatesBoard();

requestCourse();
setInterval(requestCourse, 60000);


//* Операции с деньгами 


//* Пополнение баланса

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {

  ApiConnector.addMoney(data, (response) => {
    checkResponseMoney(response);
  });
}


//* Конвертирование валюты
//! Одинкаковое сравнение if

moneyManager.conversionMoneyCallback = (data) => {

  ApiConnector.convertMoney(data, (response) => {
    checkResponseMoney(response);
  });
};


//* Перевод валюты

moneyManager.sendMoneyCallback = (data) => {

  ApiConnector.transferMoney(data, (response) => {
    checkResponseMoney(response);
  });
}


//* Работа с избранным

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {

  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (data) => {

  ApiConnector.addUserToFavorites(data, (response) => {

    checkResponseFavoritesWidget(response);
  });
}

favoritesWidget.removeUserCallback = (data) => {

  ApiConnector.removeUserFromFavorites(data, (response) => {

    checkResponseFavoritesWidget(response);
  });
}