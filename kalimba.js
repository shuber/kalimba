var Kalimba = function(notes, container) {
  this.element = document.createElement('div');
  this.element.className = 'kalimba';

  if (Kalimba.Tunings[notes]) {
    this.element.setAttribute('data-tuning', notes);
    notes = Kalimba.Tunings[notes];
  }

  this.notes = notes;
  this.container = container;
  this.tines = tines(notes)

  this.element.appendChild(this.tines);
  this.element.appendChild(hole());
  this.container.appendChild(this.element);

  function tines(notes) {
    var tines = document.createElement('div');
    tines.className = 'tines';
    for (i=0, l=notes.length; i < l; i++) {
      tines.appendChild(tine(notes[i]));
    }
    return tines;
  }

  function tine(note) {
    var tine = document.createElement('div');
    tine.className = 'tine';
    tine.setAttribute('data-note', note);
    tine.onclick = play_tine;
    return tine;
  }

  function hole() {
    var hole = document.createElement('div');
    hole.className = 'hole';
    return hole;
  }

  function play_tine() {
    console.log(this.getAttribute('data-note'));
  }
}

Kalimba.Tunings = {
  'alto': ['F#', 'D', 'B', 'G', 'E', 'C', 'A', 'G', 'B', 'D', 'F#', 'A', 'C', 'E', 'G']
}