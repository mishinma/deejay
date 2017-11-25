// Create seeds
// Count popularity of artists amond friends

// Create frequency dict
function CountFreq(arr){
    var result = { };
    for (var i = 0, j = arr.length; i < j; i++) {
       result[arr[i]] = (result[arr[i]] || 0) + 1;
    }
  return result;
}

function GetTop(merged_top){

    // Create frequency dict
    var dict = CountFreq(merged_top);

    // Choose top 5 artists from the dict
    var items = Object.keys(dict).map(function(key) {
        return [key, dict[key]];
    });

    // Sort the array based on the second element
    items.sort(function(first, second) {
        return second[1] - first[1];
    });

    console.log('SORTED', items) 
    var five = items.slice(0, 5);
    // Create a new array with only the first 5 items

    var five_clean = [];
    for (var i = 0, j = five.length; i < j; i++) {
        five_clean.push(five[i][0]);
    }
    console.log('Top five', five_clean);
    return five_clean;  
}

// Recieve recommended songs based on seeds

function GetArtistsOrTracks(filename){
    var result = []
    var dict = require(filename);
    // console.log(misha.items)
    for (let item of dict.items) {
        result.push(item.name);
        console.log(item.name);
    }
    return result
}

function GetGenres(filename){
    var result = []
    var dict = require(filename);
    for (let item of dict.items) {
        for (let item2 of item.genres) {
            result.push(item2)
        }
    }
    console.log(result);
    return result
}    

// ----------------------------------------------------
var misha = GetGenres('./misha.json')
console.log()
var lena = GetGenres('./lena.json')
console.log()
var max = GetGenres('./max.json')
console.log()
var dicle = GetGenres('./dicle.json')

var merged_top_genres = misha.concat(lena, max, dicle);
var five_genres = GetTop(merged_top_genres);

// ----------------------------------------------------
var misha = GetArtistsOrTracks('./misha.json')
console.log()
var lena = GetArtistsOrTracks('./lena.json')
console.log()
var max = GetArtistsOrTracks('./max.json')
console.log()
var dicle = GetArtistsOrTracks('./dicle.json')

var merged_top_artists = misha.concat(lena, max, dicle);
var five_artists = GetTop(merged_top_artists);

// ----------------------------------------------------
var misha = GetArtistsOrTracks('./misha_tracks.json')
console.log()
var lena = GetArtistsOrTracks('./lena_tracks.json')

var merged_top_tracks = misha.concat(lena, max, dicle);
var five_tracks = GetTop(merged_top_tracks);

// ----------------------------------------------------

// Merge all together
var seeds = five_artists.concat(five_genres, five_tracks);
console.log('Seeds', seeds)

// Return string of ids

// Send seeds to Spotify GetRecommendations, recieve playlist
// Add one favourite song of eaveryone of us to the final playlist
// Shuffle

// + when getting recommendations, give an option to adjust min_popularity, energy, max_tempo:
// spotifyApi.getRecommendations({min_energy : 0.4, market : 'ES', seed_artists : '6mfK6Q2tzLMEchAr0e9Uzu,4DYFVNKZ1uixa6SQTvzQwJ', limit : 5, min_popularity : 50})
  