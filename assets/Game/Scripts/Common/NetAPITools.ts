import { EventManager } from "../../../Libraries/Util/EventManager";
import { ApiEnums, NetHttpLoginResp } from "./NetAPITypes";

export class NetAPITools
{
    public static NetLogin(account: string, pwd: string, callBackEventName: string = null)
    {

        EventManager.Emit("RequestAPI", ApiEnums.UserMgr, { action: 'loginUser', account: account, pwd: pwd }, (res: any) =>
        {
            callBackEventName != null && EventManager.Emit(callBackEventName, res as NetHttpLoginResp);
        });

    }



}