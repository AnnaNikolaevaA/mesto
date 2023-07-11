class UserInfo {
    constructor(nameSelector, descriptionSelector) {

        this._nameContainer = document.querySelector(nameSelector);
        this._descriptionContainer = document.querySelector(descriptionSelector);
    }

    getUserInfo() { 
        return {name: this._nameContainer.textContent, about: this._descriptionContainer.textContent};
    }

    setUserInfo(data) {
        this._nameContainer.textContent = data.name;
        this._descriptionContainer.textContent = data.about;
    }
}

export default UserInfo;