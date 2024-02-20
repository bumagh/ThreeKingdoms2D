import { _decorator, Color, EventTouch, Label, Node } from 'cc';
import { EventManager } from '../../../../Libraries/Util/EventManager';
import { AbstractCenterDlg } from './AbstractCenterDlg';

const { ccclass, property } = _decorator;

@ccclass('SimpleTipDlg')
export class SimpleTipDlg extends AbstractCenterDlg
{
    @property(Label)
    private tip: Label;
    private onConfirmEvent: string;
    private onConfirmArgs: any;
    private debugTag: string = "SimpleTipDlg";
    protected defaultBlockColor: Color = new Color("#0F0F0F66");
    protected defaultPanelColor: Color = new Color("#FFFFFFFF");
    private tipDuration: number = 1;

    protected onLoad(): void
    {
        EventManager.On("ShowSimpleTipDlg", this.ShowSimpleTipDlg, this);
        EventManager.On("CloseSimpleTipDlg", this.CloseSimpleTipDlg, this);
    }

    protected onDestroy(): void
    {
        EventManager.Off("ShowSimpleTipDlg", this.ShowSimpleTipDlg, this);
        EventManager.Off("CloseSimpleTipDlg", this.CloseSimpleTipDlg, this);

    }

    /**
     * 显示提示
     * @param tipStr 提示的内容
     * @param tipDuration 显示多久
     * @param onConfirmEvent 确认后的回调事件
     * @param onConfirmArgs 确认后的回调事件参数
     */
    private ShowSimpleTipDlg(tipStr: string, tipDuration: number = 1, onConfirmEvent: string = null, onConfirmArgs = null): void
    {
        this.tip.string = tipStr;
        this.tipDuration = tipDuration;
        this.onConfirmEvent = onConfirmEvent;
        this.onConfirmArgs = onConfirmArgs;
        this.ShowDlg();
        this.scheduleOnce(this.CloseSimpleTipDlg, this.tipDuration);


    }

    private CloseSimpleTipDlg(): void
    {
        this.CloseDlg();
        if (this.onConfirmEvent != null)
            EventManager.Emit(this.onConfirmEvent, this.onConfirmArgs);
    }
    protected OnCloseDlgEnd(): void
    {
        this.tip.string = "";
    }
}