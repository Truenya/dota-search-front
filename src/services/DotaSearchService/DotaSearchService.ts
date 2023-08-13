import {FIXMELATER, HttpStatusCode, ItemTypeC} from "../../shared/Constants";
import {getId, Player, Positions} from "../../shared";
import {itemActions} from "../../store/slice/item";
import store from "../../store/store";
import {FromArray, ToArray} from "../../shared/Types";

const defaultHeaders = {
    'Accept': '*/*',
};
export default class DotaSearchService {
    _urlBase = '95.31.249.76:322';
    _apiBase = `http://${this._urlBase}`;
    private ws: WebSocket;

    constructor() {
        this.ws = new WebSocket(`ws://${this._urlBase}/ws`);
        this.ws.onopen = () => {
            console.log(`Websocket connection opened: ${this.ws.url}`)
        };
        this.ws.onclose = () => {
            console.log(`Websocket connection closed: ${this.ws.url}`)
            this.ws = new WebSocket(`ws://${this._urlBase}/ws`);
        };
    }


    SendToWs(msg: Player) {
        this.ws.send(JSON.stringify(this._toWsMessage(msg)));
    }

    SetWsOnMessage(callback: FIXMELATER) {
        this.ws.onmessage = (v) => callback(this._fromWsMessage(JSON.parse(v.data)));
    }

    async getResource(url: string) {
        const options = {
            method: 'GET',
            headers: defaultHeaders,
        };
        const request = new Request(this._apiBase + url, options);

        return await fetch(request);
    }

    async postResource(url: string, value: FIXMELATER) {
        const response = await fetch(this._apiBase + url, {
            method: 'POST',
            headers: defaultHeaders,
            body: JSON.stringify(value),
        });
        if (response.status === HttpStatusCode.TooManyRequests)
            return {error: 'Too many requests.', status: 'error'};
        if (response.status === HttpStatusCode.BadRequest)
            return {error: await response.text(), status: 'error'};
        return response;
    }

    async getAllPlayers() {
        const response = await this.getResource('/player');
        if ([HttpStatusCode.NoContent, HttpStatusCode.TooManyRequests].includes(response.status)) return [];
        const users = await response.json();
        return Object.values(users).map(this._transformUser);
    }

    async getAllCommands() {
        const response = await this.getResource('/command');
        if ([HttpStatusCode.NoContent, HttpStatusCode.TooManyRequests].includes(response.status)) return [];
        const commands = await response.json();
        return Object.values(commands).map(this._transformCommand);
    }

    async getAllMessages(all: boolean) {
        let link = '/message';
        if (all) link += '?all=true';
        const response = await this.getResource(link);
        if (response.status === HttpStatusCode.NoContent) return [];
        const messages = await response.json();
        return Object.values(messages).map(this._transformMessage).sort(({Timestamp}, b) => {
            if (Timestamp !== b.Timestamp) {
                if (Timestamp < b.Timestamp)
                    return 1;
                return -1;
            }
            return 0;
        });
    }

    async getMessage(id: string) {
        const user = await this.getResource('/message/' + id);
        return this._transformMessage(user);
    }

    async getUser(id: string) {
        const user = await this.getResource('/player/' + id);
        return this._transformUser(user);
    }

    async getCommand(id: string) {
        const command = await this.getResource('/command/' + id);
        return this._transformCommand(command);
    }

    _transformUser(user: FIXMELATER) {
        return {
            Data: user.data,
            MMR: user.mmr,
            Link: user.link,
            PossiblePos: FromArray(user.possible_pos),
            Ip: user.ip,
        };
    }

    _transformCommand(command: FIXMELATER) {
        return {
            Data: command.data,
            MMR: command.mmr,
            Link: command.link,
            PossiblePos: FromArray(command.possible_pos),
            Ip: command.ip,
        };
    }

    _transformMessage(message: FIXMELATER) {
        return {
            ID: message.id,
            Data: message.data,
            Link: message.link,
            Timestamp: message.timestamp,
            Hash: message.hash,
        };
    }

    _toPostPossiblePos(possiblePos: Positions) {
        const a = ToArray(possiblePos);
        console.log(a);
        return a;
    }

    _toPostUser(user: Player) {
        console.log('POSTING USER ',JSON.stringify(user));
        return {
            data: user.Data,
            link: user.Link,
            mmr: Number(user.MMR),
            possible_pos: this._toPostPossiblePos(user.PossiblePos),
            msg_type: 'player',
        };
    }

    async postPlayer(user: Player) {
        return this.postResource('/player', this._toPostUser(user));
    }

    _toPostCommand(command: Player) {
        console.log('POSTING COMMAND ',JSON.stringify(command));
        return {
            data: command.Data,
            link: command.Link,
            mmr: Number(command.MMR),
            possible_pos: this._toPostPossiblePos(command.PossiblePos),
            msg_type: 'command',
        };
    }

    async postCommand(command: Player) {
        return this.postResource('/command', this._toPostCommand(command));
    }

    _fromWsMessage(value: FIXMELATER) {
        let val = Object()
        switch (value.msg_type) {
            case ItemTypeC.MESSAGE:
                val = this._transformMessage(value);
                break;
            case ItemTypeC.PLAYER:
                val = this._transformUser(value);
                break;
            case ItemTypeC.COMMAND:
                val = this._transformCommand(value);
                break;
            default:
                console.log(`ERROR websocket message with unknown type: ${value.msg_type}`)
                break
        }
        val.itemType = value.msg_type;
        val.Ip = value.ip;
        val.Timestamp = value.timestamp;
        return val;

    }

    _toWsMessage(value: Player) {
        switch (value.ItemType) {
            case ItemTypeC.PLAYER:
                console.log("PLAYER");
                return this._toPostUser(value);
            case ItemTypeC.COMMAND:
                console.log("COMMAND");
                return this._toPostCommand(value);
        }
        console.error("NOT VALID ITEM TYPE", value.ItemType);
    }
}

export const api = new DotaSearchService();


const processWsMessage = (v: FIXMELATER) => {
    const {addMessage, addPlayer, addCommand} = itemActions
    // v = api._fromWsMessage(v);
    v.key = getId(v.itemType);
    switch (v.itemType) {
        case ItemTypeC.MESSAGE:
            store.dispatch(
                addMessage(v));
            break;
        case ItemTypeC.PLAYER:
            store.dispatch(
                addPlayer(v));
            break;
        case ItemTypeC.COMMAND:
            store.dispatch(
                addCommand(v));
            break;
    }
}
api.SetWsOnMessage(processWsMessage);