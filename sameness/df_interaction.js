// For users top tracks and artists
// Fill in users genres
// By information from users tracks, artists and genres fill in table Rooms (using function from sameness_finder)

var sameness = require('./sameness_finder');
console.log(typeof sameness.GetGenre);
console.log(typeof sameness.GetArtistsOrTracks);
console.log(typeof sameness.GetTop);

function FillInData(){
    // select top_artists, top_tracks for each user in users table

        // var genres = sameness.GetGenres(top_artists)
        // save genres to users.top_genres
        // create global merged_top_genres array, add genres to this array ()

        // var artists = sameness.GetArtistsOrTracks(top_artists)
        // create global merged_top_artists array, add artists to this array

        // var tracks = sameness.GetArtistsOrTracks(top_tracks)
        // create global merged_top_tracks array, add tracks to this array

    // five_artists = sameness.GetTop(merged_top_artists)
    // five_tracks = sameness.GetTop(merged_top_tracks)
    // five_genres = sameness.GetTop(merged_top_genres)

    // Insert into rooms (seed_artists, seed_tracks, seed_genres) value (five_artists, five_tracks, five_genres)
}    