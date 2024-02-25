import { _decorator, CCBoolean, Component, EditBox, EventTouch, Label, Node, ProgressBar, Sprite, tween, TweenAction } from 'cc';
import { EventManager } from '../../../Libraries/Util/EventManager';
import { Architecture } from '../Architecture';
import { TouchEventProxy } from '../Common/TouchEventProxy';

const { ccclass, property } = _decorator;
export enum GameBtns
{
    Exit = "Exit",
}
@ccclass('GameUIController')
export class GameUIController extends Component
{
    @property(Label)
    private playerLabel: Label;

    protected start(): void
    {

    }

    public InitPlayer(id: string)
    {
        this.playerLabel.string = id;
    }
    protected onLoad(): void
    {
        EventManager.On("GameBtnTouched", this.GameBtnTouched, this);
    }
    protected onDestroy(): void
    {
        EventManager.Off("GameBtnTouched", this.GameBtnTouched, this);

    }


    private GameBtnTouched(proxy: TouchEventProxy, event: EventTouch)
    {
        switch (proxy.eventArg)
        {

            case GameBtns.Exit:
                Architecture.instance.BackToScene("Menu");
                break;
            default:
                break;
        }
    }
}