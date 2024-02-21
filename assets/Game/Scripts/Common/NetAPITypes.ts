export const UrlBase = "https://vmdev/";
export class ApiEnums
{
    static UserMgr = 'hxsg/api/user_mgr';
    static MsgMgr = 'hxsg/api/msg_mgr';
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
