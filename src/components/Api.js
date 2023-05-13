import { data } from "autoprefixer";

export class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getInitialCards() {
    const initialCardsServerAnswer = await fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers
      });
    return this._checkResponseData(initialCardsServerAnswer,
      'Ошибка при загрузке массива карточек с сервера')
  }

  async getInformationAboutUser() {
    const informationAboutUserServerAnswer = await fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers
      });
    return this._checkResponseData(informationAboutUserServerAnswer,
      'Ошибка при загрузке данных пользователя с сервера')
  }

  async setInformationAboutUser(newUserDataFromForm) {
    const patchInformationAboutUser = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${newUserDataFromForm.profileName}`,
        about: `${newUserDataFromForm.profileCareer}`
      })
    });
    return this._checkResponseData(patchInformationAboutUser,
      'Ошибка при обновлении данных пользователя на сервере')
  }

  async createNewCardForServer(newCardData) {
    const newCardForServer = await fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${newCardData.cardName}`,
        link: `${newCardData.cardLink}`
      })
    });
    return this._checkResponseData(newCardForServer,
      'Ошибка при передаче данных карточки на сервер')
  }

  async deleteCardById(cardId) {
    const deleteCardServerAnswer = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
    if (!deleteCardServerAnswer.ok) {
      return Promise.reject(`Ошибка при отправке на сервер запроса об удалении карточки: ${deleteCardServerAnswer.status}`)
    }
    return deleteCardServerAnswer.ok;
  }

  async changeCardLikes(cardId, typeOfMethod) {
    const serverAnswerCardLikes = await fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: typeOfMethod,
      headers: this._headers
    });
    return this._checkResponseData(serverAnswerCardLikes,
      'Ошибка при отправке информации о лайке на сервер')
  }

  async setNewUserAvatar(newAvatarLink) {
    const serverAnswerNewAvatarLink = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${newAvatarLink}`
      })
    });
    return this._checkResponseData(serverAnswerNewAvatarLink,
      'Ошибка при отправке новой ссылки на аватар на сервер')
  }

  _checkResponseData(responseData, misstakeMessage) {
    if (!responseData) {
      return Promise.reject(`${misstakeMessage}: ${responseData.status}`)
    }
    return responseData.json()
  }
}