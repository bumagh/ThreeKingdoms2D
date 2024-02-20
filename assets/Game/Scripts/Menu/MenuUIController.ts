import { _decorator, CCBoolean, Component, EditBox, EventTouch, Label, Node, ProgressBar, Sprite, tween, TweenAction } from 'cc';
import { EventManager } from '../../../Libraries/Util/EventManager';
import { TouchEventProxy } from '../Common/TouchEventProxy';
import { NetAPITools } from '../Common/NetAPITools';
import { NetHttpLoginResp } from '../Common/NetAPITypes';
import { Debug } from '../../../Libraries/Util/Debug';
import { Architecture } from '../Architecture';
const { ccclass, property } = _decorator;
export enum MenuBtns
{
    Login = "Login",
    Register = "Register",
    ZoneTouched = "ZoneTouched",
    PlayerTouched = "PlayerTouched"
}
@ccclass('MenuUIController')
export class MenuUIController extends Component
{
    @property(EditBox)
    private accountEb: EditBox;
    @property(EditBox)
    private pwdEb: EditBox;
    @property(Node)
    private menuNode: Node;
    @property(Node)
    private zoneNode: Node;
    @property(Node)
    private playerNode: Node;
    protected start(): void
    {

    }

    protected onLoad(): void
    {
        EventManager.On("MenuBtnTouched", this.MenuBtnTouched, this);
        EventManager.On("OnMenuLogined", this.OnMenuLogined, this);
    }
    protected onDestroy(): void
    {
        EventManager.Off("MenuBtnTouched", this.MenuBtnTouched, this);
        EventManager.Off("OnMenuLogined", this.OnMenuLogined, this);

    }
    private MenuChange(name: string)
    {
        switch (name)
        {
            case "zone":
                this.menuNode.active = false;
                this.playerNode.active = false;
                this.zoneNode.active = true
                break;
            case "login":
                this.menuNode.active = true;
                this.playerNode.active = false;
                this.zoneNode.active = false
                break;
            case "player":
                this.menuNode.active = false;
                this.playerNode.active = true;
                this.zoneNode.active = false
                break;

            default:
                break;
        }
    }
    private OnMenuLogined(res: NetHttpLoginResp)
    {
        if (res.code == 200)
        {
            this.MenuChange("zone");
        }
    }
    private MenuBtnTouched(proxy: TouchEventProxy, event: EventTouch)
    {
        switch (proxy.eventArg)
        {
            case MenuBtns.Login:
                NetAPITools.NetLogin(this.accountEb.string, this.pwdEb.string, "OnMenuLogined");
                break;
            case MenuBtns.Register:

                break;
            case MenuBtns.ZoneTouched:
                this.MenuChange("player");
                break;
            case MenuBtns.PlayerTouched:
                Architecture.instance.BackToScene("Game");
                break;
            default:
                break;
        }
    }
}