import { math } from "cc";
import { List } from "./List";
import { Validator } from "./Validator";
import { Debug } from "./Debug";

export class Algorithm
{
    /**
     * 随机获取Map的一个元素的值
     */
    public static RandomItemFromMap<TKey, TValue>(map: Map<TKey, TValue>): [TKey, TValue]
    {
        var keys = Array.from(map.keys());
        var randomIndex = Math.floor(Math.random() * keys.length);
        var randomKey = keys[randomIndex];
        return [randomKey, map.get(randomKey)];
    }

    /**
     * 随机获取泛型列表的一个元素
     */
    public static RandomItemFormList<T>(list: List<T>): T
    {
        var randomIndex = Math.floor(Math.random() * list.Count);
        return list.ItemAt(randomIndex);
    }

    /**
     * 随机获取泛型数组的一个元素
     */
    public static RandomItemFormArray<T>(array: T[]): T
    {
        var randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
    }

    /**
     * 将大数字转换为“W”的形式
     */
    public static FormatBigNumber(num: number): string
    {
        if (num == undefined)
            num = 0;
        if (num > 1000)
        {
            num = num / 10000;
            var formattedNum = "";
            if (num > 1)
            {
                const numStr = num.toString();
                const dotIndex = numStr.indexOf(".");
                formattedNum = numStr.substring(0, dotIndex == -1 ? numStr.length : dotIndex) + "W";
            }
            else
            {
                formattedNum = num.toString().slice(0, 3) + "W";
            }
            return formattedNum;
        }
        else
        {
            return num.toString();
        }
    }

    /**
     * 移除字符串里的冒号和大括号，并根据分割符拆分成数组
     */
    public static RemoveColonAndBracesToArray(source: string, separator: string = ","): string[]
    {
        if (Validator.IsStringIllegal(source, "source")) return [];
        return source.replace(/[:{}"]/g, "").split(separator);
    }

    /**
     * 将字符串的每个字符拆开，并插入换行符
     */
    public static ConvertToNewlines(str: string): string
    {
        let result = '';
        for (let i = 0; i < str.length; i++)
        {
            result += str[i];
            if (i < str.length - 1)
            {
                result += '\n';
            }
        }
        return result;
    }

    /**
     * 随机获取数组里的元素
     */
    public static GetRandomElements<T>(array: T[], count: number): T[]
    {
        if (count > array.length)
        {
            throw new Error('Count cannot be greater than the array length.');
        }

        const result = [];
        const usedIndices = new Set();
        while (result.length < count)
        {
            const randomIndex = this.GetRandomNumber(array.length - 1, 0);
            // 检查该索引是否已经被使用过  
            if (!usedIndices.has(randomIndex))
            {
                usedIndices.add(randomIndex);
                result.push(array[randomIndex]);
            }
        }
        return result;
    }

    public static GetRandomNumber(max: number, min: number): number
    {
        return Math.round(Math.random() * (min - max) + max);
    }

    public static GetRandomItemByWeight<T>(map: Map<T, number>, seed: number): [T, number] | null
    {
        if (map.size === 0)
            return null;

        var totalWeight: number = 0;
        for (const item of map)
            totalWeight += item[1];

        const randomValue = math.pseudoRandomRange(seed, 0, totalWeight);
        var currentWeight: number = 0;
        var tempItem: [T, number];

        for (const item of map)
        {
            currentWeight += item[1];
            if (randomValue <= currentWeight)
                return item;
            tempItem = item;
        }

        return tempItem;
    }

    /**
     * 移除集合中的指定元素
     */
    public static RemoveItemFromArray<T>(array: T[], element: T): boolean
    {
        if (Validator.IsObjectIllegal(array, "array")) return false;
        if (Validator.IsObjectIllegal(element, "element")) return false;
        if (array.length == 0) return false;
        const index = array.indexOf(element);
        if (index !== -1)
        {
            array.splice(index, 1);
            return true;
        }
        return false;
    }

    /**
     * 将Map转换成二维数组
     */
    public static ConvertMapToArray<TKey, TValue>(map: Map<TKey, TValue>): [TKey, TValue][]
    {
        var array = new Array<[TKey, TValue]>();
        for (const item of map)
            array.push(item);
        return array;
    }

    /**
     * 洗牌算法
     */
    public static Shuffle<T>(array: T[]): T[]
    {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // 当还剩有元素未洗牌  
        while (0 !== currentIndex)
        {
            // 选取剩下的元素
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // 并与当前元素交换
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /**
     * 截断字符串
     */
    public static TruncateString(target: string, maxLength: number = 4, suffix = "..."): string
    {
        if (target.length > maxLength)
            return `${target.substring(0, maxLength)}${suffix}`;
        else
            return target;
    }
}