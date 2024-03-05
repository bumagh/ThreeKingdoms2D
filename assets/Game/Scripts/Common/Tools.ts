import { Sprite, assetManager, ImageAsset, SpriteFrame, Texture2D, director, sys } from "cc";
import { Validator } from "../../../Libraries/Util/Validator";

export class Tools
{
    // 废弃
    /**
    * 用远程图片设置Sprite
    */
    public static SetRemoteSpriteFrame(sprite: Sprite, avatarUrl: string): void
    {
        if (Validator.IsObjectIllegal(sprite, "sprite")) return;
        if (Validator.IsStringIllegal(avatarUrl, "avatarUrl")) return;
        assetManager.loadRemote<ImageAsset>(avatarUrl, { ext: '.jpg' }, function (err, imageAsset)
        {
            if (err) return;
            const spriteFrame = new SpriteFrame();
            const texture = new Texture2D();
            texture.image = imageAsset;
            spriteFrame.texture = texture;
            sprite.spriteFrame = spriteFrame;
        });
    }

    /**
     * 是否在Arcade场景中
     */
    public static IsInArcadeScene(): boolean
    {
        return director.getScene().name == "Arcade";
    }

    /**
     * 是否为本机玩家
     */
    public static IsClientPlayer(playerId: string): boolean
    {
        if (Validator.IsStringIllegal(playerId, "playerId")) return false;
        return playerId == Tools.GetClientPlayerId();
    }

    /**
     * 获取本机玩家的id
     */
    public static GetClientPlayerId(): string
    {
        return sys.localStorage.getItem("ClientPlayerId");
    }

    /**
     * 获取WebSocket的客户端id
     */
    public static GetClientId(): string
    {
        return sys.localStorage.getItem("ClientId");
    }

    /**
     * 获取大厅的Id
     */
    public static GetArcadeId(): string
    {
        return sys.localStorage.getItem("ArcadeId");
    }

    public static SetCurrentGameId(gameId: string): void
    {
        if (Validator.IsStringIllegal(gameId, "gameId")) return;
        sys.localStorage.setItem("CurrentGameId", gameId);
    }

    public static GetCurrentGameId(): string
    {
        return sys.localStorage.getItem("CurrentGameId");
    }
}