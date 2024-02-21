import { CCBoolean, Component, _decorator, director, sys } from "cc";
import { GameUIController } from "./GameUIController";

const { ccclass, property } = _decorator;
@ccclass('GameController')
export class GameController extends Component
{
    @property(GameUIController)
    private GameUIController: GameUIController;
    private debugTag: string = "GameController";

    protected onLoad(): void
    {

    }

    protected start(): void
    {

    }
    protected onDestroy(): void
    {

    }


}
