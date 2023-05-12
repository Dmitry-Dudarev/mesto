export class UserInfo {
  constructor({ userNameSelector, userCareerSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userCareer = document.querySelector(userCareerSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._userName.textContent;
    userData.career = this._userCareer.textContent;
    return userData;
  }

  setUserInfo(newUserData) {
    this._userName.textContent = newUserData.profileName;
    this._userCareer.textContent = newUserData.profileCareer;
  }

  getUserAvatar() {
    const userAvatar = this._userAvatar.src;
    return userAvatar;
  }

  setUserAvatar(userData) {
    this._userAvatar.src = userData.avatar;
  }
};