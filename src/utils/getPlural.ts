const pluralRules = new Intl.PluralRules();
function getPlural(number: number, singular: string, plural: string) {
    return pluralRules.select(number) === 'one' ? singular : plural;
}

export default getPlural;
