import {default as ghgMockData} from './data/mock/ghg-by-country.json';
import {default as globalEmissionsData} from './data/mock/global-emissions.json';
import {default as percapitaMockData} from './data/mock/ghg-per-capita.json';
import {default as criMockData} from './data/mock/cri.json';
import {default as ndcMockData} from './data/mock/ndc.json';
import {default as countries} from './data/countries.json';
import {default as copyJson} from './data/copy.json'
import {default as pewSurveyMockData} from './data/mock/pewsurvey.json'
import { createLookup } from './util';

export const copy = copyJson;

// mock data while we wait for API
const mockData = {
    globalEmissions: globalEmissionsData,
    ghg: ghgMockData,
    percapita: percapitaMockData,
    cri: criMockData,
    ndc: ndcMockData,
    pew: pewSurveyMockData
}

async function getMockData<DatumType>(dataset) {
    return mockData[dataset] as DatumType;
}

async function getJsonData(url) {
    return fetch(url).then(response => response.json());
}

export const startYear = 1970;
export const endYear = 2015;

export const ghg = getMockData<GHGDataRaw[]>('ghg')
    .then(data => {
        return data.map(d => {
            const timeseries = extractTimeseries(d);
            const processedData: GHGData = {
                ...d,
                timeseries,
                category: getGHGCategory(timeseries)
            }
            return processedData
        });
    });

export const percapita = getMockData<PerCapitaData[]>('percapita');
export const cri = getMockData<CRIData[]>('cri');
export const ndc = getMockData<NDCData[]>('ndc');
export const globalEmissions = getMockData<EmissionsData>('globalEmissions');
export const pew = getMockData<PewData[]>('pew');

function getGHGCategory(data: YearlyTimeseriesDatum[]) {
    const baseValue = data.find(d => d.year === 1990).value;
    const lastValue = data.find(d => d.year === endYear).value;
    const diff = (lastValue - baseValue) / baseValue;
    // 0 means the same. 0.5 means 50% increase. 1 means 100% increase. etc
    if (Math.abs(diff) < 0.25) return 'stable';
    else if (diff < -0.25) return 'falling';
    else return 'climbing-fast';
}

export function getNDCCategory(ndc: NDCData): string {

    const ndcCategories: {category: string, re: RegExp}[] = [
        {
            category: 'ndc-first2020',
            re: /^2020 NDC ((\(First NDC\))|(\(Updated First NDC\)))/
        },
        {
            category: 'ndc-second2020',
            re: /^2020 NDC ((\(Second NDC\))|(\(Updated Second NDC\)))/
        },
        {
            category: 'ndc-indc',
            re: /^Only INDC/
        },
        {
            category: 'ndc-first',
            re: /^Only First NDC/
        },
        {
            category: 'ndc-nosubmission',
            re: /^Nothing submitted/
        }
    ];
    const ndcCategory = ndcCategories.find(d => d.re.test(ndc.latest_submission))
    return ndcCategory ? ndcCategory.category : 'ndc-unknown'
}

function* generateRange(end: number, start = 0, step = 1) {
    let x = start - step;
    while(x < end - step) yield x += step;
}

function extractTimeseries(data: GHGDataRaw): YearlyTimeseriesDatum[] {
    const years = Array.from(generateRange(endYear+1, startYear));
    return years.map(year => {
        return {
            year, value: data.emissions[year]
        };
    });
}

const countryLookup = createLookup(countries, d => d.code, d => d);
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
    cri_score: number,
    fatalities_per_100000_inhabitants: number,
    fatalities_in_2019: number,
    losses_in_millions_usd: number,
    losses_per_unit_gdp_percentage: number
}

export interface NDCData {
    country: string,
    iso: string,
    latest_submission: string,
    ghg: string,
    ghg_target: string
}

export interface PewData {
    country: string,
    year: string,
    value: number
}

export interface YearlyTimeseriesDatum {
    year: number,
    value: number
}

export interface PerCapitaData {
    code: string,
    emissions_percapita: number
}

interface EmissionsData {
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

interface GHGDataRaw {
    code: string;
    emissions: EmissionsData;
}

export interface GHGData extends GHGDataRaw {
    category: string;
    timeseries: YearlyTimeseriesDatum[];
}

