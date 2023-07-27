function getLogoNameArray(logoName: string) {
    const LOGO: string[] = [];
    for (let i = 0; i < logoName.length; i++) {
        LOGO.push(logoName[i] as string);
    }
    return LOGO;
}

export default getLogoNameArray;
