export default class Repository {
    constructor(key) {
        this.key = key
    }

    store(data){
        console.log('hogehogeo')
        let localStrageData = localStorage.getItem(this.key)
        console.log('localStrageData')
        console.log(localStrageData)

        //新規の場合
        if(!localStrageData) {
            console.log('new')
            let saveData = []
            data.id = 1
            saveData.push(data)
            localStorage.setItem(this.key, JSON.stringify(saveData))
            return
        }

        //追加の場合
        localStrageData = JSON.parse(localStrageData)
        const id = +Math.max.apply(null, [...localStrageData].map((data) => { return data.id })) + 1
        data.id = id
        const upDatelocalStrageData = [...localStrageData, data]
        localStorage.setItem(this.key, JSON.stringify(upDatelocalStrageData))
        return
    }

    update(data){
        console.log('data')
        console.log(data)
        let localStrageData = localStorage.getItem(this.key)
        localStrageData = [...JSON.parse(localStrageData)]
        localStrageData.forEach(localStorageData =>{
            if(localStorageData.id == data.id){
                console.log('localStorageData')
                console.log(localStorageData)
                localStorageData.title = data.title
                localStorageData.text = data.text
            }
        })
        console.log('updateLocalStrageData')
        console.log(localStrageData)
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
        console.log(JSON.parse(localStrageData))
        return JSON.parse(localStrageData)
    }
}