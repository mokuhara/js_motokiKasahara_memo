export default class Repository {
    constructor(key) {
        this.key = key
    }

    store(data){
        let localStrageData = JSON.parse(localStorage.getItem(this.key))
        //新規の場合
        if(localStrageData.length < 1) {
            let saveData = []
            data.id = 1
            saveData.push(data)
            localStorage.setItem(this.key, JSON.stringify(saveData))
            return
        }

        //追加の場合
        const id = +Math.max.apply(null, [...localStrageData].map((data) => { return data.id })) + 1
        data.id = id
        const upDatelocalStrageData = [...localStrageData, data]
        localStorage.setItem(this.key, JSON.stringify(upDatelocalStrageData))
        return
    }

    update(data){
        let localStrageData = localStorage.getItem(this.key)
        localStrageData = [...JSON.parse(localStrageData)]
        localStrageData.forEach(localStorageData =>{
            if(localStorageData.id == data.id){
                localStorageData.title = data.title
                localStorageData.text = data.text
            }
        })
        localStorage.setItem(this.key, JSON.stringify(localStrageData))
    }

    delete(id){
        let localStrageData = localStorage.getItem(this.key)
        localStrageData = [...JSON.parse(localStrageData)]
        let _localStrageData = []
        localStrageData.forEach(localStorageData =>{
            if(localStorageData.id != id){
                _localStrageData.push(localStorageData)
            }
        })
        localStorage.setItem(this.key, JSON.stringify(_localStrageData))
    }

    //リスクあるので実装しない
    deleteAll(){
        // localStorage.removeItem(this.key)
    }

    getAll(){
        let localStrageData = localStorage.getItem(this.key)
        if(!localStrageData) return
        return JSON.parse(localStrageData)
    }
}