export default class Repository {
    constructor(key) {
        this.key = key;
    }
    store(data) {
        const localStrageData = localStorage.getItem(this.key);
        //新規の場合
        if (!localStrageData || localStrageData.length <= 2) {
            let saveData = [];
            data.id = "1";
            saveData.push(data);
            localStorage.setItem(this.key, JSON.stringify(saveData));
            return;
        }
        //追加の場合
        const _localStrageData = [
            ...JSON.parse(localStorage.getItem(this.key)),
        ];
        const ids = _localStrageData.map((data) => {
            return +data.id;
        });
        data.id = String(Math.max.apply(null, _localStrageData.map((data) => {
            return +data.id;
        })) + 1);
        const upDatelocalStrageData = [..._localStrageData, data];
        localStorage.setItem(this.key, JSON.stringify(upDatelocalStrageData));
        return;
    }
    update(data) {
        const localStrageData = [...JSON.parse(localStorage.getItem(this.key))] || [];
        localStrageData.forEach((localStorageData) => {
            if (localStorageData.id == data.id) {
                localStorageData.title = data.title;
                localStorageData.text = data.text;
            }
        });
        localStorage.setItem(this.key, JSON.stringify(localStrageData));
    }
    delete(id) {
        const localStrageData = [...JSON.parse(localStorage.getItem(this.key))] || [];
        let _localStrageData = [];
        localStrageData.forEach((localStorageData) => {
            if (localStorageData.id != id) {
                _localStrageData.push(localStorageData);
            }
        });
        localStorage.setItem(this.key, JSON.stringify(_localStrageData));
    }
    //リスクあるので実装しない
    deleteAll() {
        // localStorage.removeItem(this.key)
    }
    get getAll() {
        const localStrageData = localStorage.getItem(this.key);
        if (!localStrageData)
            return;
        return JSON.parse(localStrageData);
    }
}
