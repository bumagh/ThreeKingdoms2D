export const UrlBase = "https://mini/";
export class ApiEnums
{
    static UserMgr = 'hxsg/login';
    static MsgMgr = 'hxsg/msg_mgr';
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
