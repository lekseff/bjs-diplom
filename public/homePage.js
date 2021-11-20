'use strict'

//* Выход из личного кабинета

const logoutButton = new LogoutButton();

logoutButton.action = () => {

  ApiConnector.logout((response) => {

    if (response.success) location.reload();
  });
};


//* Получение информации о пользователе

ApiConnector.current((response) => {
  // console.log(response);

  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});


//* Получение текущих курсов валюты
//! Подумать над интервалом

const ratesBoard = new RatesBoard();

function requestCourse() {

  ApiConnector.getStocks((response) => {

    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
      // console.log('обновилось');
    }
  });
};

requestCourse();
setInterval(requestCourse, 60000);


//* Операции с деньгами 


//* Пополнение баланса

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  // console.log(data);

  ApiConnector.addMoney(data, (response) => {
    // console.log(response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Операция успешно выполнена');

    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
}


//* Конвертирование валюты
//! Одинкаковое сравнение if

moneyManager.conversionMoneyCallback = (data) => {
  // console.log(data);

  ApiConnector.convertMoney(data, (response) => {
    // console.log(data);
    // console.log(response);

    if (response.success) {
      // console.log('Запрос успешен');
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Операция успешно выполнена');
    } else {
      moneyManager.setMessage(false, response.error);
    }

    // console.log(response);
  });
};


//* Перевод валюты

moneyManager.sendMoneyCallback = (data) => {
  // console.log(data);

  ApiConnector.transferMoney(data, (response) => {
    // console.log(response);

    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Операция успешно выполнена');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};


//* Работа с избранным

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  // console.log(response);

  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  // console.log(data);

  ApiConnector.addUserToFavorites(data, (response) => {
    // console.log(response);

    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, 'Операция успешно выполнена');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}

favoritesWidget.removeUserCallback = (data) => {
  // console.log(data);

  ApiConnector.removeUserFromFavorites(data, (response) => {
    // console.log(response);

    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
      favoritesWidget.setMessage(true, 'Операция успешно выполнена');
    } else {
      favoritesWidget.setMessage(false, response.error);
    }
  });
}