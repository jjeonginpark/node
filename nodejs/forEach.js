
const adnetwork = [ 'admob', 'mobvista', 'unityads', 'adexchange', 'batmobi', 'facebook', 'mopub', 'facebook_1', 'facebook_2', 'ironsource_1', 'ironsource_2', 'ironsource_3', 'ironsource_2_extra', 'mobvista_extra', 'unityads_extra', 'vungle_1', 'vungle_2', 'vungle_3', 'vungle_extra', 'du', 'yeahmobi', 'mobvista_1', 'facebook_extra', 'ironsource_3_extra', 'vungle_1_extra', 'vungle_2_extra', 'admob_1', 'admob_2', 'admob_3_extra', 'admob_2_extra', 'admob_1_extra', 'mobfox', 'admob_3', 'facebook_3', 'ironsource', 'cauly', 'admob_extra', 'adpie', 'du_extra', 'vungle', 'adfit_1', 'adfit_2', 'unityads_1', 'unityads_2', 'mobvista_2', 'vungle_4', 'adexchange_1', 'adexchange_2', 'adexchange_extra', 'cauly_1', 'cauly_2', 'tnk_extra', 'batmobi_extra', 'adpie_1', 'adpie_2', 'unityads_3', 'adcolony_1', 'adcolony_2', 'adpie_3', 'adcolony', 'facebook_openbidding_extra', 'mopub_1', 'mopub_2', 'cauly_extra', 'facebook_4', 'mopub_3', 'tam']


const lineColorSet = [
    '#fc5382', '#5275fb', '#2ed933', '#27d4d5',
    '#7d57fb', '#fdb92b', '#f41117', '#9046a9',
    '#fd692b', '#302afa', '#e8e23f', '#c98f87',
    '#588bb2', '#22860e', '#bd6f00', '#005365',
    '#267487', '#a082fa', '#33b1ff', '#21ae53',
    '#5e578d', '#cee102', '#009361', '#f716ff',
    '#a82405', '#d75e5e', '#215785', '#666633',
    '#788096', '#9d8f70', '#ff8400', '#28b278',
    '#b3b3b3', '#b3ad00', '#7d4141', '#fe3f06',
    '#003370', '#b98b11', '#58b293', '#ffcb6e',
    '#fca001', '#ff0078', '#e77d44', '#60b1bb',
    '#bbbb60', '#6c969d', '#74066e', '#b27990',
    '#cdbe12', '#b84b5d', '#616033', '#fb7862',
    '#5288bf', '#ce028d',
];


var colorList = ["#ff8480", "#5275fb", "#2ed933", "#fdb92b", "#f716ff"];
const countryColorMap =["RU", "JP", "Others", "DE", "FR", "IT", "VN", "AL", "AT", "AU", "AW"];

//const countryColorMap = {};

//사용된 색깔 목록
const colorUsed  = new Set();



function getColor ( country ) {
    if( country in countryColorMap ) {

        //console.log('country', country);
        return countryColorMap[country];
    }
    for(var color of colorList){
        if( colorUsed.has(color) ) {
            continue;
        }
        countryColorMap[country] = color;

        colorUsed.add(color);

        //console.log('color' , color);

        return color;
    }
    //TODO return random color
    colorUsed.add(color);
    countryColorMap[country] = colorList[0];
    return colorList[0];
}


countryColorMap.forEach(() => {
    
});

console.log(countryColorMap);
console.log(colorUsed);