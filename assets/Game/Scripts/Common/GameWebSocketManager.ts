import { Debug } from "../../../Libraries/Util/Debug";
import { EventManager } from "../../../Libraries/Util/EventManager";
import { Validator } from "../../../Libraries/Util/Validator";
import { ApiEnums } from "./NetAPITypes";
import { WebSocketManager } from "./WebSocketManager";


export class GameWebSocketManager extends WebSocketManager
{
    constructor()
    {
        super();
        this.InitMessageCallbacks();
    }

    private gameDebugTag: string = "GameWebSocketManager";
    private callbacks = new Map<string, (dataObj: any) => void>();

    protected OnWebSocketOpen(event: Event): void { }
    protected OnWebSocketClose(event: CloseEvent): void { }

    private InitMessageCallbacks()
    {
        this.callbacks.set(ApiEnums.WsEnter, this.OnWsEnter);
        this.callbacks.set(ApiEnums.WsNotice, this.OnWsNotice);
        this.callbacks.set(ApiEnums.WsEnterGame, this.OnWsEnterGame);

    }

    protected OnWebSocketMessage(dataObj: any): void
    {
        Debug.Log(dataObj, `${this.gameDebugTag}_${dataObj.type}`);
        if (this.callbacks.has(dataObj.type))
            this.callbacks.get(dataObj.type).call(this, dataObj);
        else
            Debug.Log(`GameWebSocketManager未找到${dataObj.type}的回调`, this.gameDebugTag);
    }
    private OnWsEnter(dataObj: any): void
    {
        if (Validator.IsObjectIllegal(dataObj, "dataObj")) return;
        EventManager.Emit("OnWsEnter", dataObj);
        Debug.Log(`OnWsEnter`, this.gameDebugTag);
    }

    private OnWsNotice(dataObj: any): void
    {
        if (Validator.IsObjectIllegal(dataObj, "dataObj")) return;
        EventManager.Emit("OnWsNotice", dataObj);
        Debug.Log(`OnWsNotice`, this.gameDebugTag);
    }

    private OnWsEnterGame(dataObj: any): void
    {
        if (Validator.IsObjectIllegal(dataObj, "dataObj")) return;
        EventManager.Emit("OnWsEnterGame", dataObj);
        Debug.Log(`OnWsEnterGame`, this.gameDebugTag);
    }
}
