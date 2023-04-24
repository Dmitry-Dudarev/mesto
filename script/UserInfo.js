// Итак, этот класс будет посредником. 
// он должен принимать данные как из попапа с 
// данными редактора профиля,
// так и данные из профиля. 
export class UserInfo {
  constructor({ userNameSelector, userCareerSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userCareer = document.querySelector(userCareerSelector);



    this._userData = {};
  }

  getUserInfo() {
    this._userData.name = this._userName.textContent;
    this._userData.career = this._userCareer.textContent;
    return this._userData;
  }

  setUserInfo(userData) {
    this._userName.textContent = userData.profileName;
    this._userCareer.textContent = userData.profileCareer;
  }
}