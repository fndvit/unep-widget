import {default as ghgMockData} from './data/mock/ghg-by-country.json';
import {default as percapitaMockData} from './data/mock/ghg-per-capita.json';
import {default as criMockData} from './data/mock/cri.json';
import {default as countries} from './data/countries.json';

// mock data while we wait for API
const mockData = {
    ghg: ghgMockData,
    percapita: percapitaMockData,
    cri: criMockData
}

async function getMockData<DatumType>(dataset) {
    return mockData[dataset] as DatumType[];
}

async function getJsonData(url) {
    return fetch(url).then(response => response.json());
}

export const startYear = 1970;
export const endYear = 2015;

export const ghg = getMockData<GHGData>('ghg');
export const percapita = getMockData<PerCapitaData>('percapita');
export const cri = getMockData<CRIData>('cri');

export function getGHGCategory(data: YearlyTimeseriesDatum[]) {
    // TODO: set thresholds
    const largest = Math.max(... data.slice(0, data.length-15).map(d => d.value) );
    const last = data[data.length-1].value;
    const diff = (last - largest) / largest;
    // 0 means the same. 0.5 means 50% increase. 1 means 100% increase. etc
    if (Math.abs(diff) < 0.2) return 'stable';
    else if (diff < -0.2) return 'falling';
    else if (diff > 0.7) return 'climbing-fast';
    else if (diff > 0.05) return 'climbing';
    else return 'none';
}

function* generateRange(end: number, start = 0, step = 1) {
    let x = start - step;
    while(x < end - step) yield x += step;
}

export function extractTimeseries(data: GHGData): YearlyTimeseriesDatum[] {
    const years = Array.from(generateRange(endYear+1, startYear));
    return years.map(year => {
        return {
            year, value: data.emissions[year]
        };
    });
}

const countryLookup: {[code: string]: CountryBaseData} = {};
countries.forEach(c => countryLookup[c.code] = c);
export function getCountryBaseData(code: string): CountryBaseData | null {
    return countryLookup[code];
}

// DATA TYPINGS

export interface CountryBaseData {
    code: string;
    name: string;
    short: string;
}

export interface CRIData {
    code: string,
    country: string,
    cri_rank: number,
    fatalities_per_100000_inhabitants: number,
    losses_per_unit_gdp_percentage: number
}

export interface YearlyTimeseriesDatum {
    year: number,
    value: number
}

export interface PerCapitaData {
    code: string,
    emissions_percapita: number
}
export interface GHGData {
    code: string,
    emissions: {
        "1960": number,
        "1961": number,
        "1962": number,
        "1963": number,
        "1964": number,
        "1965": number,
        "1966": number,
        "1967": number,
        "1968": number,
        "1969": number,
        "1970": number,
        "1971": number,
        "1972": number,
        "1973": number,
        "1974": number,
        "1975": number,
        "1976": number,
        "1977": number,
        "1978": number,
        "1979": number,
        "1980": number,
        "1981": number,
        "1982": number,
        "1983": number,
        "1984": number,
        "1985": number,
        "1986": number,
        "1987": number,
        "1988": number,
        "1989": number,
        "1990": number,
        "1991": number,
        "1992": number,
        "1993": number,
        "1994": number,
        "1995": number,
        "1996": number,
        "1997": number,
        "1998": number,
        "1999": number,
        "2000": number,
        "2001": number,
        "2002": number,
        "2003": number,
        "2004": number,
        "2005": number,
        "2006": number,
        "2007": number,
        "2008": number,
        "2009": number,
        "2010": number,
        "2011": number,
        "2012": number,
        "2013": number,
        "2014": number,
        "2015": number,
    }
}
