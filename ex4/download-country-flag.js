import { readJsonFile } from './util.service.js'
import { download } from './util.service.js'

downloadCountryFlags()
function downloadCountryFlags() {
    const countries = getCountries()
    console.log('Countries:', countries.map(c => c.name))
    downloadFlags(countries)
    .then(() => {
       console.log('Your flags are ready')
    })
}

function getCountries() {
    var countries = []
    const data = readJsonFile('../countries.json')
    // sort by population (descending)
    data.sort((countryA, countryB) => (countryB.population - countryA.population))
    console.log(data[0].population, data[1].population, data[2].population)
    // return the top 5
    return data.slice(0, 5)
}
// console.log(getCountries().map((country) => ({name: country.name, population: country.population})))


function downloadFlags(countries) {
    const prms = countries.map(country => {
        return download(
            country.flags.svg,
            `flags/${country.name.common}.svg`
        )
    })
    return Promise.all(prms)
}