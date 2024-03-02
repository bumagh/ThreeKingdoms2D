import { _decorator, Component, Label, Node } from 'cc';
import { NodeReferences } from '../Common/NodeReferences';
const { ccclass, property } = _decorator;

@ccclass('PlayerUI')
export class PlayerUI extends NodeReferences
{
    public nameLabel: Label;
    protected onLoad(): void
    {
        this.nameLabel = this.GetVisual("Label", Label);
    }
}