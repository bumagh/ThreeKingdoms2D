import { _decorator, Camera, CCBoolean, Component, EditBox, EventTouch, find, instantiate, Label, Node, Prefab, ProgressBar, Sprite, tween, TweenAction, Vec2, Vec3 } from 'cc';
import { EventManager } from '../../../Libraries/Util/EventManager';
import { Architecture } from '../Architecture';
import { TouchEventProxy } from '../Common/TouchEventProxy';
import { Debug } from '../../../Libraries/Util/Debug';
import { PlayerUI } from './PlayerUI';

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
    @property(Node)
    public panelNode: Node;
    @property(Node)
    public playerNode: Node;
    @property(Prefab)
    public playerPrefab: Prefab;
    private camera: Camera;
    protected start(): void
    {

    }
    public CreatePlayer(name: string)
    {
        var newNode: Node = instantiate(this.playerPrefab);
        newNode.setParent(this.panelNode);
        newNode.getComponent<PlayerUI>(PlayerUI).nameLabel.string = name;
    }
    public InitPlayer(id: string)
    {
        this.playerLabel.string = id;
    }
    protected onLoad(): void
    {
        EventManager.On("GameBtnTouched", this.GameBtnTouched, this);
        this.camera = find("Canvas/Camera").getComponent<Camera>(Camera);
    }
    protected onDestroy(): void
    {
        EventManager.Off("GameBtnTouched", this.GameBtnTouched, this);
    }
    public GetPos(pos: Vec2): Vec3
    {
        return this.camera.convertToUINode(new Vec3(pos.x, pos.y, 0), this.panelNode);
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