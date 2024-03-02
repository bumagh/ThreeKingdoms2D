export const UrlBase = "http://vmdev:8812/";
export class ApiEnums
{
    static HttpLogin = 'login';
    static MsgMgr = 'hxsg/msg_mgr';
    static WsEnter = "enter";
    static WsEnterGame = "enterGame";
    static WsLeave = "leave"
    static WsNotice = "notice"
}
interface BaseResp
{
    code: number,
    data: string,
    msg: string
}
interface BaseQuery
{
    action: string,
    account: string,
    pwd: string
}
export declare namespace NetHttpLogin 
{
    type NetHttpLoginResp = BaseResp;
    type NetHttpLoginQuery = BaseQuery;

}

export declare namespace NetHttpRegister
{
    type NetHttpRegisterResp = BaseResp;
    type NetHttpRegisterQuery = BaseQuery;
}
export interface LoginDataResp
{
    id: string
}
