export const UrlBase = "https://mini/";
export class ApiEnums
{
    static UserMgr = 'hxsg/api/user_mgr';
    static MsgMgr = 'hxsg/api/msg_mgr';
}

export type NetHttpLoginResp = {
    code: number,
    data: string,
    msg: string
}