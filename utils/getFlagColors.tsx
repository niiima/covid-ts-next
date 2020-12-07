import { CountryFlagColors } from '../interfaces/country.interface';
import alpha from 'color-alpha'
export const getFlagColors = (colors: CountryFlagColors[]) => {
    let arr;
    if (colors)
        arr = colors.map(c => c.color);
    else arr = ["#ccc"]
    return arr
}

export const getColor = (list: CountryFlagColors[], key: number, a = 1) => {
    const sortedList = sortColors(list);
    //let count = sortedList.length;
console.log(sortedList)
    if (sortedList[key])
        return sortedList[key].color

    let index = key - 1;
    const rec = (l, i) => {
        //l.reduceRight((_, item) => console.log(item), null);
        if (i < 0) {
            return "white"
        }
        else {
            if (l[index])
                return l[index].color
            else
                rec(l, index--)
        }
    }

    let color = rec(sortedList,index)
    console.log(color)
    return alpha(color,a)
    
}

function sortColors(list: CountryFlagColors[]) {
    let sortedList: CountryFlagColors[] = [];//[...list].slice();
    list.forEach(el => sortedList.push(el));
    sortedList.sort(function (c1, c2) {
        const p1 = c1.percentage//.toLowerCase();
        const p2 = c2.percentage//.toLowerCase();
        if (p1 > p2) { return 1; }
        if (p1 < p2) { return -1; }
        return 0;
    })
    return sortedList;
}
//export default getFlagColors;

