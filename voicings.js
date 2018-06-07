const Voicings = (function(){
	var noteMap = ['C',['C#','Db'],'D',['D#','Eb'],'E','F',['F#','Gb'],'G',['G#','Ab'],'A',['A#','Bb'],'B'];
	
	function normalizeNote(note){
		note = note.toUpperCase();
		for(var i=0; i<noteMap.length; i++){
			if(Array.isArray(noteMap[i])){
				if(note === noteMap[i][0].toUpperCase() || note === noteMap[i][1].toUpperCase()) return noteMap[i][0];
			}else{
				if(note === noteMap[i].toUpperCase()) return noteMap[i];
			}
		}
		throw new Error("invalid note: "+note);
	}
	
	function getNextNote(note){
		idx=false;
		note = note.toUpperCase();
		for(var i=0; i<noteMap.length; i++){
			if(Array.isArray(noteMap[i])){
				if(note === noteMap[i][0].toUpperCase() || note === noteMap[i][1].toUpperCase()){
					idx = i; break;
				}
			}else{
				if(note === noteMap[i].toUpperCase()){
					idx = i; break;
				}
			}
		}
		idx++;
		if(idx==noteMap.length) idx=0;
		return Array.isArray(noteMap[idx])?noteMap[idx][0]:noteMap[idx];
	}
	
	class Voicings{
		constructor(){
			this.strings=null;
			this.tuning=null;
			this.frets=null;
			this.chord=[];
			this.fretboard=[];
		}
		
		getAllOccurencesOfNote(note){
			note = normalizeNote(note);
			var occurences = [];
			for(var string=0; string<this.fretboard.length; string++){
				var str = [];
				for(var fret=0; fret<this.fretboard[string].length; fret++){
					if(this.fretboard[string][fret] == note) str.push(fret);
				}
				occurences.push(str);
			}
			return occurences;
		}
		
		getNextVoicing(){
			// Get all ocurences of each note in the chord, 
			// Get all combinations of every note (1 per string)
			// filter each combinations to ones that are less than 6 frets apart
		}
		
		getFretboard(){
			var fb=[], string, note;
			for(var i=0; i<this.tuning.length; i++){
				string=[];
				note=this.tuning[i]; 
				for(var n=0; n<this.frets; n++){
					string.push(note);
					note=getNextNote(note);
				}
				fb.push(string);
			}
			return fb;
		}
		
		setInstrument(strings, frets, tuning){
			if(!strings || !frets || !tuning) throw new Error("The constructor requires a numeric 'strings', and 'frets' argument as well as a 'notes' array'");
			if(!Array.isArray(tuning) || tuning.length !== strings) throw new Error("The number of elements in the 'tuning' array must match the number of strings.");
			this.tuning=[];
			for(var i=0; i<tuning.length; i++) this.tuning.push(normalizeNote(tuning[i]));
			this.strings=parseInt(strings);
			this.frets=parseInt(frets);
			this.fretboard = this.getFretboard();
			return this;
		}
		
		setChord(chord){
			if(!Array.isArray(chord)) throw new Error("Chord must be an array of nbotes.");
			for(var i=0; i<chord.length; i++) this.chord.push(normalizeNote(chord[i]));
			return this;
		}
	}
	
	return Voicings;
})();