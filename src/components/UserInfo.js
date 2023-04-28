export class UserInfo {
  constructor({ userNameSelector, userCareerSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userCareer = document.querySelector(userCareerSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.career = this._userCareer.textContent;
    return userData;
  }

  setUserInfo(newUserDataFromForm) {
    this._userName.textContent = newUserDataFromForm.profileName;
    this._userCareer.textContent = newUserDataFromForm.profileCareer;
  }
};