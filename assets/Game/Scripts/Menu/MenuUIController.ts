import { _decorator, CCBoolean, Component, EditBox, EventTouch, Label, Node, ProgressBar, Sprite, sys, tween, TweenAction } from 'cc';
import { EventManager } from '../../../Libraries/Util/EventManager';
import { TouchEventProxy } from '../Common/TouchEventProxy';
import { NetAPITools } from '../Common/NetAPITools';
import { Debug } from '../../../Libraries/Util/Debug';
import { Architecture } from '../Architecture';
import { LoginDataResp, NetHttpLogin, NetHttpRegister } from '../Common/NetAPITypes';
import { DlgEnums } from '../Common/Dlgs/DlgEnums';
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
        var loginInfoStr = sys.localStorage.getItem("loginInfo");
        if (loginInfoStr != null)
        {
            var loginInfo: { account: string, pwd: string } = JSON.parse(loginInfoStr);
            this.accountEb.string = loginInfo.account;
            this.pwdEb.string = loginInfo.pwd;
        }
    }

    protected onLoad(): void
    {
        EventManager.On("MenuBtnTouched", this.MenuBtnTouched, this);
        EventManager.On("OnMenuLogined", this.OnMenuLogined, this);
        EventManager.On("OnMenuRegistered", this.OnMenuRegistered, this);
    }
    protected onDestroy(): void
    {
        EventManager.Off("MenuBtnTouched", this.MenuBtnTouched, this);
        EventManager.Off("OnMenuLogined", this.OnMenuLogined, this);
        EventManager.Off("OnMenuRegistered", this.OnMenuRegistered, this);

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
    private OnMenuLogined(res: NetHttpLogin.NetHttpLoginResp)
    {
        if (res.code == 200)
        {
            this.MenuChange("zone");
            sys.localStorage.setItem("loginInfo", JSON.stringify({ account: this.accountEb.string, pwd: this.pwdEb.string }));
            var data: LoginDataResp = res.data as unknown as LoginDataResp;
            sys.localStorage.setItem("Player", JSON.stringify(data));
            sys.localStorage.setItem("ClientPlayerId", data.id);

        } else
        {
            EventManager.Emit(DlgEnums.ShowSimpleTipDlg, "账号或密码错误");
        }
    }
    private OnMenuRegistered(res: NetHttpRegister.NetHttpRegisterResp)
    {
        if (res.code == 200)
        {
            EventManager.Emit(DlgEnums.ShowSimpleTipDlg, "注册成功");
            //保存信息
            sys.localStorage.setItem("loginInfo", JSON.stringify({ account: this.accountEb.string, pwd: this.pwdEb.string }));
            // this.MenuChange("zone");
        } else
        {
            EventManager.Emit(DlgEnums.ShowSimpleTipDlg, "账号已存在");
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
                NetAPITools.NetRegister(this.accountEb.string, this.pwdEb.string, "OnMenuRegistered");
                break;
            case MenuBtns.ZoneTouched:
                this.MenuChange("player");
                break;
            case MenuBtns.PlayerTouched:
                //开始发socket消息
                NetAPITools.NetWsEnterGame();
                Architecture.instance.BackToScene("Game");
                break;
            default:
                break;
        }
    }
}