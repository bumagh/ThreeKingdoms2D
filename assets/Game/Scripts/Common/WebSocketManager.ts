import { IEntity } from "../../../Framework/IEntity";
import { Debug } from "../../../Libraries/Util/Debug";
import { EventManager } from "../../../Libraries/Util/EventManager";
import { Validator } from "../../../Libraries/Util/Validator";


export abstract class WebSocketManager implements IEntity
{
    private wssUrl: string = "ws://vmdev:8812/wsnotice";
    private ws: WebSocket = null;
    private debugTag = "WebSocketManager";

    protected abstract OnWebSocketOpen(event: Event): void;
    protected abstract OnWebSocketMessage(dataObj: any): void;
    protected abstract OnWebSocketClose(event: CloseEvent): void;

    OnEnable(): void
    {
        EventManager.On("InitWebSocket", this.InitWebSocket, this);
        EventManager.On("CloseWebSocket", this.CloseWebSocket, this);
        EventManager.On("SendMsg", this.SendMsg, this);
    }

    OnDisable(): void
    {
        EventManager.Off("InitWebSocket", this.InitWebSocket, this);
        EventManager.Off("CloseWebSocket", this.CloseWebSocket, this);
        EventManager.Off("SendMsg", this.SendMsg, this);

    }

    public InitWebSocket(): void
    {
        if (this.ws != null) return;
        var ws = new WebSocket(this.wssUrl);
        this.ws = ws;
        ws.onopen = (event: Event) =>
        {
            Debug.Log("WebSocket连接成功", this.debugTag);
            this.OnWebSocketOpen(event);
        };
        ws.onmessage = (event: MessageEvent) =>
        {
            var dataObj = JSON.parse(event.data);
            Debug.Log("WebSocket响应消息", this.debugTag);
            Debug.Log(event.data, this.debugTag);
            this.OnWebSocketMessage(dataObj);
        };
        ws.onclose = (event: CloseEvent) =>
        {
            Debug.Log("WebSocket连接关闭", this.debugTag);
            this.OnWebSocketClose(event);
        };
    }

    public SendMsg(msg: string): void
    {
        if (Validator.IsStringIllegal(msg, "msg")) return;
        if (this.ws == null) return;
        this.ws.send(msg);
    }

    public CloseWebSocket(): void
    {
        if (this.ws == null) return;
        this.ws.close();
        this.ws = null;
    }
}