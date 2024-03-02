import { CCBoolean, Component, EventTouch, _decorator, director, sys } from "cc";
import { GameUIController } from "./GameUIController";
import { Player } from "../../../Framework/Common/Player/Player";
import { EventManager } from "../../../Libraries/Util/EventManager";
import { TouchEventProxy } from "../Common/TouchEventProxy";
import { Debug } from "../../../Libraries/Util/Debug";
import { NetAPITools } from "../Common/NetAPITools";

const { ccclass, property } = _decorator;
@ccclass('GameController')
export class GameController extends Component
{
    @property(GameUIController)
    private gameUIController: GameUIController;
    private debugTag: string = "GameController";

    protected onLoad(): void
    {
        EventManager.On("GraphicsTouched", this.GraphicsTouched, this);
        EventManager.On("OnWsNotice", this.OnWsNotice, this);
        EventManager.On("OnWsEnterGame", this.OnWsEnterGame, this);
    }

    protected onDestroy(): void
    {
        EventManager.Off("GraphicsTouched", this.GraphicsTouched, this);
        EventManager.Off("OnWsNotice", this.OnWsNotice, this);
        EventManager.Off("OnWsEnterGame", this.OnWsEnterGame, this);

    }

    private OnWsEnterGame(data: any)
    {
        if (data['pid'] == sys.localStorage.getItem("ClientPlayerId"))
        {
            //是本地玩家
        } else
        {
            this.gameUIController.CreatePlayer(data['pid']);
        }
        Debug.Log(data, this.debugTag);
    }
    private OnWsNotice(data: any)
    {
        Debug.Log(data, this.debugTag);
    }
    private GraphicsTouched(proxy: TouchEventProxy, event: EventTouch)
    {
        var playerPos = this.gameUIController.playerNode.position;
        var localTouchPos = this.gameUIController.GetPos(event.getUILocation());
        if (localTouchPos.x < playerPos.x)
        {
            this.gameUIController.playerNode.setPosition(playerPos.x - 10, playerPos.y);
        }
        if (localTouchPos.x > playerPos.x)
        {
            this.gameUIController.playerNode.setPosition(playerPos.x + 10, playerPos.y);
        }
        if (localTouchPos.y < playerPos.y)
        {
            this.gameUIController.playerNode.setPosition(playerPos.x, playerPos.y - 10);
        }
        if (localTouchPos.y > playerPos.y)
        {
            this.gameUIController.playerNode.setPosition(playerPos.x, playerPos.y + 10);
        }
        NetAPITools.NetWsNotice({ x: playerPos.x, y: playerPos.y })
    }
    protected start(): void
    {
        var playerStr = sys.localStorage.getItem("Player");
        var clientPlayer: Player = JSON.parse(playerStr);
        this.gameUIController.InitPlayer(clientPlayer.id);
    }


}
