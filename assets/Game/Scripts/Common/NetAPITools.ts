import { sys } from "cc";
import { EventManager } from "../../../Libraries/Util/EventManager";
import { ApiEnums, NetHttpLogin, NetHttpRegister } from "./NetAPITypes";
export class NetAPITools
{
    public static NetLogin(account: string, pwd: string, callBackEventName: string = null)
    {
        var query: NetHttpLogin.NetHttpLoginQuery = { action: 'loginUser', account: account, pwd: pwd };
        EventManager.Emit("RequestAPI", ApiEnums.UserMgr, query, (res: any) =>
        {
            callBackEventName != null && EventManager.Emit(callBackEventName, res as NetHttpLogin.NetHttpLoginResp);
        });

    }
    public static NetRegister(account: string, pwd: string, callBackEventName: string = null)
    {
        var query: NetHttpRegister.NetHttpRegisterQuery = { action: 'addUser', account: account, pwd: pwd };
        EventManager.Emit("RequestAPI", ApiEnums.UserMgr, query, (res: any) =>
        {
            callBackEventName != null && EventManager.Emit(callBackEventName, res as NetHttpRegister.NetHttpRegisterResp);
        });

    }

    public static NetWsEnterGame()
    {
        EventManager.Emit("SendMsg", JSON.stringify({ type: "EnterGame", id: sys.localStorage.getItem("ClientPlayerId") }));
    }


}