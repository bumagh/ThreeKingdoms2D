import { Debug } from "../../../Libraries/Util/Debug";
import { EventManager } from "../../../Libraries/Util/EventManager";
import { Validator } from "../../../Libraries/Util/Validator";
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
        // this.callbacks.set(WsApiEnum.WsRegister, this.OnRegister);

    }

    protected OnWebSocketMessage(dataObj: any): void
    {
        Debug.Log(dataObj, `${this.gameDebugTag}_${dataObj.method}`);
        if (this.callbacks.has(dataObj.method))
            this.callbacks.get(dataObj.method).call(this, dataObj);
        else
            Debug.Log(`GameWebSocketManager未找到${dataObj.type}的回调`, this.gameDebugTag);
    }
    private OnRegister(dataObj: any): void
    {
        // if (Validator.IsObjectIllegal(dataObj, "dataObj")) return;
        // var regData: RegRespData = dataObj.data as RegRespData;
        // EventManager.Emit("OnRegister", regData);
        // Debug.Log(`玩家注册`, this.gameDebugTag);
    }

}
