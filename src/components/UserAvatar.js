class UserAvatar {
    constructor(linkSelector) {
        this._link = document.querySelector(linkSelector);
    }
    
    changeUserAvatar(data) {
        this._link.src = data.avatar;
    }
}

export default UserAvatar;