import fetch from 'isomorphic-unfetch';
import { v4 as uuidv4 } from 'uuid';
const countryList = require('../public/country-list.json');
interface CountryBasicType {
    iso2: string,
    name: string
}
const getCountries = async () => {

    const mutedCountryList: CountryBasicType[] = countryList.slice(0).sort(function (c1, c2) {
        const name1 = c1.name.toLowerCase();
        const name2 = c2.name.toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
    })
        .map((c, i) => {
            return {
                ...c,
                index: i,
                id: uuidv4()
            }
        });

    const res = await fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=").then(response => {
        return response.json()
    }).then(data => data).catch(err => console.log(err))

    return {
        countries: mutedCountryList,
        data: res
    };
}

export default getCountries;