import { _decorator, CCString, Component, find, Node } from 'cc';
import { Debug } from '../../../Libraries/Util/Debug';
import { EventManager } from '../../../Libraries/Util/EventManager';
import { Validator } from '../../../Libraries/Util/Validator';

const { ccclass, property, executionOrder } = _decorator;

export interface INodeReferencesListener
{
    NodeReferencesOnLoad(references: NodeReferences): void;
    NodeReferencesOnEnable(references: NodeReferences): void;
    NodeReferencesOnDisable(references: NodeReferences): void;
    NodeReferencesOnDestroy(references: NodeReferences): void;
}

@ccclass('NodeReferences')
@executionOrder(0)
export class NodeReferences extends Component
{
    @property(CCString)
    public id: string;

    @property(CCString)
    public type: string;

    protected nodes = new Map<string, Node>();
    protected visuals = new Map<string, Component>();

    protected onLoad(): void
    {
        EventManager.Emit("NodeReferencesOnLoad", this);
    }

    protected onEnable(): void
    {
        EventManager.Emit("NodeReferencesOnEnable", this);
    }

    protected onDisable(): void
    {
        EventManager.Emit("NodeReferencesOnDisable", this);
    }

    protected onDestroy(): void
    {
        EventManager.Emit("NodeReferencesOnDestroy", this);
    }

    public GetNode(nodePath: string, callback?: (node: Node) => void): Node | null
    {
        if (Validator.IsObjectIllegal(nodePath, "nodePath")) return null;
        if (this.nodes.has(nodePath))
            return this.nodes.get(nodePath);
        else
        {
            var node = find(nodePath, this.node);
            if (Validator.IsObjectIllegal(node, `node from ${nodePath}`))
                return null;
            else
            {
                this.nodes.set(nodePath, node);
                if (!Validator.IsObjectEmpty(callback)) callback(node);
                return node;
            }
        }
    }

    public GetVisual<T extends Component>(nodePath: string, type: any, callback?: (component: T) => void): T | null
    {
        if (Validator.IsObjectIllegal(nodePath, "nodePath")) return null;
        if (Validator.IsObjectIllegal(type, "type")) return null;
        var key = `${nodePath}/${type}`;
        var component: T;
        if (this.visuals.has(key))
        {
            component = this.visuals.get(key) as T;
            if (component == null)
                Debug.Error(`路径为${nodePath}的组件类型转换失败`);
            return component;
        }
        else
        {
            var node = this.GetNode(nodePath);
            if (Validator.IsObjectEmpty(node)) return null;
            component = node.getComponent(type);
            if (Validator.IsObjectEmpty(component))
            {
                Debug.Error(`节点${node.name}上未找到组件${type}`);
                return null;
            }
            this.visuals.set(key, component);
            if (!Validator.IsObjectEmpty(callback)) callback(component);
            return component;
        }
    }
}