// Get 20 top-artists from everyone and find common
// For each of 20 artists find 5 similar, merge altogether
// Randomize

var artists1 = ['TheKooks', 'TheFratellis', 'FranzFerdinand', 'BonJovi', 'TheBeatles'];
var artists2 = ['AmmyWinehouse', 'TheFratellis', 'TheClash', 'BonJovi'];
var artists3 = ['TheFratellis', 'BonJovi', 'TheBeatles'];
var artists4 = ['Chopin', 'TheFratellis', 'BonJovi', 'TheBeatles'];
var artists5 = ['TheFratellis', 'Chopin', 'BonJovi'];

var song1 = ['Song1', 'Song6', 'Song4', 'Song1', 'Song5'];
var song2 = ['Song7', 'Song1', 'Song4', 'Song2'];
var song3 = ['Song5', 'Song1', 'Song3'];
var song4 = ['Song5', 'Song3', 'Song1', 'Song2'];
var song5 = ['Song3', 'Song7', 'Song2'];

// Merge arrays of artists into one array
var merged_top_artists = artists1.concat(artists2, artists3, artists4, artists5);
var merged_top_songs = song1.concat(song2, song3, song4, song5);
// -------------------------------------------------------------------------------------------

// Count popularity of artists amond friends

// Create frequency dict
function CountFreq(arr){
    var result = { };
    for (var i = 0, j = arr.length; i < j; i++) {
       result[arr[i]] = (result[arr[i]] || 0) + 1;
    }
    // console.log(result);
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

    var five = items.slice(0, 5);
    // Create a new array with only the first 5 items

    var five_clean = [];
    for (var i = 0, j = five.length; i < j; i++) {
        five_clean.push(five[i][0]);
    }
    console.log('Top five', five_clean);
    return five_clean;  
}

var five_artists = GetTop(merged_top_artists);
var five_songs = GetTop(merged_top_songs);

// For top-artists get list genres artist is associated with https://developer.spotify.com/web-api/get-users-top-artists-and-tracks/ 
// Implement GetTopArtists for genres
// Merge all together

var seeds = five_artists.concat(five_songs);
console.log('Seeds', seeds)