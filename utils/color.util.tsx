import { IFlagColorType } from '../interfaces/country.interface';
import alpha from 'color-alpha'
//import chroma from 'chroma-js';

export const getFlagColors = (colors: IFlagColorType[]) => {
    let arr;
    if (colors)
        arr = colors.map(c => c.color);
    else arr = ["#ccc"]
    return arr
}

export const getColor = (list: IFlagColorType[], key: number, a = 1, isWhiteOk: boolean = true) => {
    const sortedList = list;

    let color = findColor(sortedList, key)
    let coloredConditional = whiteOrCustom(color, isWhiteOk,list,key,a) || "#999999"
    return coloredConditional //alpha(coloredConditional, a)
}

function findColor(l, index) {
    let counter = index;
    if (counter < 0 || counter == 0) {
        return l[0].color
    }
    else {

        if (l[counter] && l[counter] != undefined) {
            return l[counter].color
        }
        else {

            console.log(l)
            for (let i = counter--; i > 0; i++) {
                if (l[i])
                    return l[i].color
            }
            return l[0] || "#88cc21"
        }
    }
}

function whiteOrCustom(color, isWhiteOk, list, index,a) {
    if (color === "white" || color === "#fff" || color === "#ffffff") {
        if (isWhiteOk) {
            return color
        }
        else {
            if (index === 0)
                return alpha(color,a)//"#555555"
            else
            if(list[index+1] && list[index+1]!= undefined)
                return list[index+1].color || "red"
        }
    }
}

// function sortColors(list: IFlagColorType[]) {
//     let sortedList: IFlagColorType[] = [];//[...list].slice();
//     list.forEach(el => sortedList.push(el));
//     sortedList.sort(function (c1, c2) {
//         const p1 = c1.percentage//.toLowerCase();
//         const p2 = c2.percentage//.toLowerCase();
//         if (p1 > p2) { return 1; }
//         if (p1 < p2) { return -1; }
//         return 0;
//     })
//     return sortedList;
// }

