import { Debug } from "../../../Libraries/Util/Debug";
import { EventManager } from "../../../Libraries/Util/EventManager";
import { UrlBase } from "./NetAPITypes";


export class NetworkAPIManager 
{
    constructor()
    {
        NetworkAPIManager.self = this;
    }

    private static self: NetworkAPIManager;
    private httpUrl: string = UrlBase;
    private code: string;
    private token: string;
    private debugTag: string = "NetworkAPIManager";
    OnEnable(): void
    {
        EventManager.On("RequestAPI", this.RequestAPI, this);

    }

    OnDisable(): void
    {
        EventManager.Off("RequestAPI", this.RequestAPI, this);

    }

    private OnGameArcadeControllerLoad(): void
    {
    }


    private GenerateUUID(): string
    {
        var guid = "";
        for (var i = 1; i <= 32; i++)
        {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
        }
        return guid;
    }
    private RequestAPI(url: string, data: any = null, onSuccess: (response: any) => void = null, method: any = "POST"): void
    {
        const urlEncodedData = Object.keys(data).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`).join('&');
        var requestUrl = `${NetworkAPIManager.self.httpUrl}${url}`;
        var requestObject: RequestInit = {
            method: method,
            mode: 'cors',
            headers: {
                'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: urlEncodedData
        };

        fetch(requestUrl, requestObject).then((response) =>
        {
            Debug.Log(response.json(), NetworkAPIManager.self.debugTag);
        }).then((data) =>
        {
            Debug.Log(`${url} 请求成功`, NetworkAPIManager.self.debugTag);
            Debug.Log(data, NetworkAPIManager.self.debugTag);
            // if (result.data["error"] != 0) return;
            // if (onSuccess == null) return;
            // onSuccess(result.data["result"]); 
        }).catch((err) =>
        {
            Debug.Log(err);
        });
    }

}