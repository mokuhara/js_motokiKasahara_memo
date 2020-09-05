var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from "./config.js";
export default class AIBot {
    constructor(text) {
        this.text = text;
    }
    //APIにメッセージ送信
    _getMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("fetchStart");
                const endpoint_url = config.ENDPOINT_URL +
                    "?key=" +
                    encodeURIComponent(config.API_KEY) +
                    "&message=" +
                    encodeURIComponent(this.text);
                const response = yield fetch(endpoint_url, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                });
                console.log("fetchFinish");
                const data = yield response.json();
                if (!data || data.status != "success" || !data.result)
                    return "";
                return data.result;
            }
            catch (e) {
                console.error(e);
            }
        });
    }
    //返却されたメッセージの整形
    createAIBotReply() {
        const text = this._getMessage();
        if (!text)
            return;
        return {
            title: "AIBotからの返信",
            text: text,
        };
    }
}
