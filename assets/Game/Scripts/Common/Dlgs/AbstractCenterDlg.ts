import { _decorator, Button, Color, Component, Node, Sprite, Tween, Vec3 } from 'cc';
import { TouchEventProxy } from '../TouchEventProxy';
import { Validator } from '../../../../Libraries/Util/Validator';
import { TweenAnimator } from '../TweenAnimator';

const { ccclass, property } = _decorator;

/**
 * 显示在屏幕中央的对话框的抽象父类
 */
@ccclass('AbstractCenterDlg')
export abstract class AbstractCenterDlg extends Component
{
    @property(Node)
    protected block: Node;

    @property(Node)
    protected panel: Node;

    @property([Button])
    protected buttons: Button[] = [];

    @property([TouchEventProxy])
    protected touchEventProxies: TouchEventProxy[] = [];

    protected blockSprite: Sprite;
    protected panelSprite: Sprite;

    // 动画相关的属性
    protected showAnimations: Tween<any>[] = [];
    protected closeAnimations: Tween<any>[] = [];
    protected defaultColor: Color = new Color(255, 255, 255, 255);
    protected defaultBlockColor: Color = new Color("#0F0F0F66");
    protected fadedColor: Color = new Color(255, 255, 255, 0);
    protected defaultPanelColor = new Color(255, 255, 255, 120);
    protected scaleAnimDuration: number = 0.25;
    protected fadeAnimDuration: number = 0.25;

    protected defaultShowBlockAlpha = 120;
    public showing: boolean = false;

    protected start(): void
    {
        this.blockSprite = this.block.getComponent(Sprite);
        this.panelSprite = this.panel.getComponent(Sprite);
        Validator.IsObjectIllegal(this.blockSprite, "this.blockSprite");
        Validator.IsObjectIllegal(this.panelSprite, "this.panelSprite");
    }

    protected ShowDlg(): void
    {
        if (this.showing) return;
        this.showing = true;
        this.ShowPanel(true);
        this.PlayShowAnimations();
    }

    /**
     * 开始关闭对话框
     */
    protected CloseDlg(): void
    {
        if (!this.showing) return;
        this.showing = false;
        this.buttons.forEach(button => button.interactable = false);
        this.touchEventProxies.forEach(proxy => proxy.interactable = false);
        this.PlayCloseAnimations();
        var maxDuration = Math.max(this.scaleAnimDuration, this.fadeAnimDuration);
        this.scheduleOnce(() =>
        {
            this.ShowPanel(false);
            this.buttons.forEach(button => button.interactable = true);
            this.touchEventProxies.forEach(proxy => proxy.interactable = true);
            this.OnCloseDlgEnd();
        }, maxDuration);
    }

    /**
     * 关闭对话框的过程结束了
     */
    protected OnCloseDlgEnd(): void { }

    protected ShowPanel(show: boolean): void
    {
        this.block.active = show;
        this.panel.active = show;
    }


    protected PlayShowAnimations(): void
    {
        this.ClearShowAnimations();
        this.ClearCloseAnimations();
        this.showAnimations.push(TweenAnimator.PlayScaleChangeEffect(this.panel, this.scaleAnimDuration, Vec3.ONE, "cubicOut"));
        this.showAnimations.push(TweenAnimator.PlayFadeEffect(this.panelSprite, this.fadeAnimDuration, 255, this.defaultPanelColor));
        this.showAnimations.push(TweenAnimator.PlayFadeEffect(this.blockSprite, this.fadeAnimDuration, this.defaultShowBlockAlpha));
    }

    protected PlayCloseAnimations(): void
    {
        this.ClearShowAnimations();
        this.ClearCloseAnimations();
        this.closeAnimations.push(TweenAnimator.PlayScaleChangeEffect(this.panel, this.scaleAnimDuration, Vec3.ZERO, "cubicIn"));
        this.closeAnimations.push(TweenAnimator.PlayFadeEffect(this.panelSprite, this.fadeAnimDuration, 0, this.defaultPanelColor));
        this.closeAnimations.push(TweenAnimator.PlayFadeEffect(this.blockSprite, this.fadeAnimDuration, 0));
    }

    protected ClearShowAnimations(): void
    {
        if (this.showAnimations.length == 0) return;
        this.showAnimations.forEach(t => t.stop());
        this.showAnimations.length = 0;
        this.panel.scale = Vec3.ONE;
        this.panelSprite.color = this.defaultColor;
        this.blockSprite.color = this.defaultBlockColor;
    }

    protected ClearCloseAnimations(): void
    {
        if (this.closeAnimations.length == 0) return;
        this.closeAnimations.forEach(t => t.stop());
        this.closeAnimations.length = 0;
        this.panel.scale = Vec3.ZERO;
        this.panelSprite.color = this.fadedColor;
        this.blockSprite.color = this.fadedColor;
    }
}