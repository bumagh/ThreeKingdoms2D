import { _decorator, CCString, Component, director, game, macro, Settings, sys, view } from 'cc';
import { Debug } from '../../Libraries/Util/Debug';
import { EventManager } from '../../Libraries/Util/EventManager';
import { PipelineScheduleFunction } from '../../Libraries/Util/PipelineContext';
import { INodeReferencesListener, NodeReferences } from './Common/NodeReferences';
import { NetworkAPIManager } from './Common/NetworkAPIManager';
import { GameWebSocketManager } from './Common/GameWebSocketManager';
const { ccclass, property, executionOrder } = _decorator;

@ccclass('Architecture')
@executionOrder(-999)
export class Architecture extends Component implements INodeReferencesListener
{
    public static instance: Architecture;
    @property([CCString])
    private consoleIgnores: string[] = [];
    arcadeScenePreloaded: boolean;
    prefabsCreated: boolean;
    bundles: any;
    bundleNames: any;

    protected onLoad(): void
    {
        Architecture.instance = this;
        EventManager.On("BackToScene", this.BackToScene, this);
        EventManager.On("NodeReferencesOnLoad", this.NodeReferencesOnLoad, this);
        EventManager.On("NodeReferencesOnEnable", this.NodeReferencesOnEnable, this);
        EventManager.On("NodeReferencesOnDisable", this.NodeReferencesOnDisable, this);
        EventManager.On("NodeReferencesOnDestroy", this.NodeReferencesOnDestroy, this);
        Debug.SetIgnores(this.consoleIgnores);

        this.InitEventManager();
        this.InitWebSocketManager();
        this.InitNetworkAPIManager();
        this.InitPipelines();

    }
    protected onDestroy(): void
    {
        EventManager.Off("NodeReferencesOnLoad", this.NodeReferencesOnLoad, this);
        EventManager.Off("NodeReferencesOnEnable", this.NodeReferencesOnEnable, this);
        EventManager.Off("NodeReferencesOnDisable", this.NodeReferencesOnDisable, this);
        EventManager.Off("NodeReferencesOnDestroy", this.NodeReferencesOnDestroy, this);
        EventManager.Off("BackToScene", this.BackToScene, this);

    }
    protected start(): void
    {
        EventManager.Emit("InitWebSocket")

    }


    private InitEventManager(): void
    {
    }

    private InitWebSocketManager(): void
    {
        var webSocketManager = new GameWebSocketManager();
        webSocketManager.OnEnable();
    }

    private InitNetworkAPIManager(): void
    {
        var networkAPIManager = new NetworkAPIManager();
        networkAPIManager.OnEnable();
    }

    private InitPipelines(): void
    {
        PipelineScheduleFunction.scheduleOnce = (callback: any, delay?: number) => this.scheduleOnce(callback, delay);
    }

    public BackToScene(sceneName: string)
    {
        director.loadScene(sceneName, (error, scene) =>
        {
            if (error)
                Debug.Error(error);
        });
    }
    NodeReferencesOnLoad(references: NodeReferences): void { }
    NodeReferencesOnEnable(references: NodeReferences): void { }
    NodeReferencesOnDisable(references: NodeReferences): void { }
    NodeReferencesOnDestroy(references: NodeReferences): void { }
}