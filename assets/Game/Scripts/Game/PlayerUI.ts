import { _decorator, Component, Label, Node } from 'cc';
import { NodeReferences } from '../Common/NodeReferences';
import { Player } from '../../../Framework/Common/Player/Player';
const { ccclass, property } = _decorator;

@ccclass('PlayerUI')
export class PlayerUI extends NodeReferences
{
    public nameLabel: Label;
    public player: Player;
    protected onLoad(): void
    {
        this.nameLabel = this.GetVisual("Label", Label);
    }
    public Init(player: Player)
    {
        this.player = player;
        this.nameLabel.string = player.id;
        this.node.setPosition(player.x, player.y);
    }
}