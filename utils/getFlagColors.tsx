import { CountryFlagColors } from '../interfaces/country.interface'
const getFlagColors = (colors: CountryFlagColors[]) => {
    let arr;
    if (colors)
        arr = colors.map(c => c.color);
    else arr = ["#ffffff"]
    return arr
}

export default getFlagColors;

