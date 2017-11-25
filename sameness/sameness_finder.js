// Get 20 top-artists from everyone and find common
// For each of 20 artists find 5 similar, merge altogether
// Randomize

var artists1 = ['TheKooks', 'TheFratellis', 'FranzFerdinand', 'BonJovi', 'TheBeatles'];
var artists2 = ['AmmyWinehouse', 'TheFratellis', 'TheClash', 'BonJovi'];
var artists3 = ['TheFratellis', 'BonJovi', 'TheBeatles'];
var artists4 = ['Chopin', 'TheFratellis', 'BonJovi', 'TheBeatles'];
var artists5 = ['TheFratellis', 'Chopin', 'BonJovi'];

// Merge arrays of artists into one array
var merged_top_artists = artists1.concat(artists2, artists3, artists4, artists5);

// -------------------------------------------------------------------------------------------

// Count popularity of artists amond friends

// Create frequency dict
function CountFreq(arr){
    var result = { };
    for (var i = 0, j = arr.length; i < j; i++) {
       result[arr[i]] = (result[arr[i]] || 0) + 1;
    }
    console.log(result);
  return result;
}

function GetTopArtists(merged_top_artists){

    // Create frequency dict
    var dict = CountFreq(merged_top_artists);

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
    console.log('five_clean', five_clean);
    return five_clean;  
}

var five_clean = GetTopArtists(artists1, artists2, artists3, artists4, artists5);
