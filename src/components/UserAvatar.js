class UserAvatar {
    constructor(linkSelector) {
        this._link = document.querySelector(linkSelector);
    }

    getUserAvatar() { 
        return {avatar: this._link.src};
    }
    
    changeUserAvatar(data) {
        this._link.src = data.avatar;
    }
}

export default UserAvatar;