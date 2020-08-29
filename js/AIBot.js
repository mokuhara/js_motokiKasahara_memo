import config from './config.js'

export default class AIBot {
    constructor(text){
        this.text = text
    }

    //APIにメッセージ送信
    async _getMessage() {
        console.log('fetchStart')
        const endpoint_url = config.ENDPOINT_URL + '?key=' + encodeURIComponent(config.API_KEY) + '&message=' + encodeURIComponent(this.text)
        const response = await fetch(endpoint_url, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
        })
        console.log('fetchFinish')
        const data = await response.json()
        if(!data || data.status != 'success' || !data.result) return
        return data.result
    }

    //返却されたメッセージの整形
    createAIBotReply(){
        return {
            title: "AIBotからの返信",
            text: this._getMessage()
        }
    }
}