import { _decorator, CCBoolean, Component, EditBox, EventTouch, Label, Node, ProgressBar, Sprite, tween, TweenAction } from 'cc';
import { EventManager } from '../../../Libraries/Util/EventManager';
import { TouchEventProxy } from '../Common/TouchEventProxy';
import { NetAPITools } from '../Common/NetAPITools';
const { ccclass, property } = _decorator;
export enum MenuBtns
{
    Login = "Login",
    Register = "Register"
}
@ccclass('MenuUIController')
export class MenuUIController extends Component
{
    @property(EditBox)
    private accountEb: EditBox;
    @property(EditBox)
    private pwdEb: EditBox;
    protected start(): void
    {

    }

    protected onLoad(): void
    {
        EventManager.On("MenuBtnTouched", this.MenuBtnTouched, this);
    }
    protected onDestroy(): void
    {
        EventManager.Off("MenuBtnTouched", this.MenuBtnTouched, this);
    }

    private MenuBtnTouched(proxy: TouchEventProxy, event: EventTouch)
    {
        switch (proxy.eventArg)
        {
            case MenuBtns.Login:
                NetAPITools.NetLogin(this.accountEb.string, this.pwdEb.string);
                break;
            case MenuBtns.Register:

                break;
            default:
                break;
        }
    }
}