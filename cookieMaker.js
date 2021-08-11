class CookieFactory {
    static set(key, data, expDays = 0, path = "/") {
        const date = new Date();
        const expiryDate = (date.getTime() + (expDays * 24 * 60 * 60 * 1000))
        const expiryString = `expires=${expiryDate}`

        const cookieString = this.cookieStringBuilder(key, data, expiryString, path);

        document.cookie = cookieString;
    }
    static remove(key) {
        document.cookie = this.cookieStringBuilder(key, "",  "Thu, 01 Jan 1970 00:00:00 UTC", "/");
    }
    static getByKey(key) {
        const cname = `${key}=`;
        const allCookies = document.cookie;
        const cookieArr = allCookies.split(";");
        for (let i = 0; i < cookieArr.length; i++) {
            const c = cookieArr[i];
            if (!c.includes(cname)) continue;

            const val = c.split("=")[1];

            return val !== "" ? val : null;
        }

        return null;
    }
    static cookieStringBuilder(key,data,expiryString,path) {
        return `${key}=${data};${expiryString};path=${path};`
    }
}

CookieFactory.set("username", "pepe");

console.log(CookieFactory.getByKey("username"));