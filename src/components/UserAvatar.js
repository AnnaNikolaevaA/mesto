class UserAvatar {
    constructor(linkSelector) {
        this._link = document.querySelector(linkSelector);
    }
    
    changeUserAvatar(data) {
        this._link.src = data.link;
    }
}

export default UserAvatar;