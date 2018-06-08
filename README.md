

# Voicings

Generates all voicings for a given chord on any fretted/stringed instrument.

### Usage

First define your instrument by passing in the number of strings, number of frets, and the tuning of each string, bottom to top.

    var v = new Voicings().setInstrument(6, 24, ["E","B","G","D","A","E"])

Now set the notes in the chord with `setChord`.

    v.setChord(["C","E","G"])

Now you can get an array of all possible voicings for this chord with the `getAllVoicings` method. You can optionally pass this method a number indicating the maximum fret range, assuming you can't fret a note on the 1st and 13th fret at the same time with the same hand.

    var voicings = v.getAllVoicings(5);
    // returns..
    // [
    //   [0,  1,  0,  2,  3,  0],
    //   [3,  1,  0,  2,  3,  0],
    //   [0,  1,  0,  2,  3,  3]
    //   ....
    // ]

You can also use it to get all occurrences of a certain note on the fretboard.

    var all_e_positions = v.getAllOccurencesOfNote("E");

You can also use it to get *all* note on the fretboard

    var fretboard = v.getFretboard();

### Use Case

I'm too lazy to memorize all this shit and I can't find any complete chart sets that has all the stuff I want, so I'm making them myself.

### License

See  [wtfpl.net](http://www.wtfpl.net/)  or the included LICENSE file.