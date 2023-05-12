import { data } from "autoprefixer";

export class API {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this.userId = '';
  }

  async getInitialCards() {
    const initialCardsServerAnswer = await fetch(`${this._baseUrl}/cards`,
      {
        headers: this._headers
      });
    if (!initialCardsServerAnswer.ok) {
      return Promise.reject(`Ошибка при загрузке массива карточек с сервера: ${initialCardsServerAnswer.status}`)
    };
    return initialCardsServerAnswer.json();
  }

  async getInformationAboutUser() {
    const informationAboutUserServerAnswer = await fetch(`${this._baseUrl}/users/me`,
      {
        headers: this._headers
      });
    if (!informationAboutUserServerAnswer.ok) {
      return Promise.reject(`Ошибка при загрузке данных пользователя с сервера: ${informationAboutUserServerAnswer.status}`)
    };
    return informationAboutUserServerAnswer.json();
  }

  async getUserId() {
    const userData = await this.getInformationAboutUser();
    this.userId = userData._id;
    return this.userId;
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
    if (!patchInformationAboutUser.ok) {
      return Promise.reject(`Ошибка при обновлении данных пользователя на сервере: ${patchInformationAboutUser.status}`)
    }
    return patchInformationAboutUser.json();
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
    if (!newCardForServer.ok) {
      return Promise.reject(`Ошибка при передаче данных карточки на сервер: ${newCardForServer.status}`)
    }
    return newCardForServer.json();
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
    if (!serverAnswerCardLikes.ok) {
      return Promise.reject(`Ошибка при отправке информации о лайке на сервер: ${serverAnswerCardLikes.status}`)
    }
    return serverAnswerCardLikes.json();
  }

}