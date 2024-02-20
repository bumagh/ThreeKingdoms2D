import { CCBoolean, Component, _decorator, director, sys } from "cc";
import { MenuUIController } from "./MenuUIController";

const { ccclass, property } = _decorator;
@ccclass('MenuController')
export class MenuController extends Component
{
    @property(MenuUIController)
    private MenuUIController: MenuUIController;
    private debugTag: string = "MenuController";

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
