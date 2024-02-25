import { CCBoolean, Component, _decorator, director, sys } from "cc";
import { GameUIController } from "./GameUIController";
import { Player } from "../../../Framework/Common/Player/Player";

const { ccclass, property } = _decorator;
@ccclass('GameController')
export class GameController extends Component
{
    @property(GameUIController)
    private GameUIController: GameUIController;
    private debugTag: string = "GameController";

    protected onLoad(): void
    {
        var playerStr = sys.localStorage.getItem("Player");
        var clientPlayer: Player = JSON.parse(playerStr);
        this.GameUIController.InitPlayer(clientPlayer.id);
    }

    protected start(): void
    {

    }
    protected onDestroy(): void
    {

    }


}
