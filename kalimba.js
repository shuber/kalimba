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
  this.element.appendChild(bar());
  this.container.appendChild(this.element);


  function tines(notes) {
    var tines = document.createElement('div');
    tines.className = 'tines';
    var height = 300;
    for (var index = 0, length = notes.length, root = Math.ceil(length / 2); index < length; index++) {
      var current_tine = tine(notes[index]);
      var offset = index + 1 - root;
      var margin = (offset < 0 ? 10 : -13) * offset;
      current_tine.setAttribute('data-offset', offset);
      current_tine.style.height = (height + margin) + 'px';
      tines.appendChild(current_tine);
    }
    return tines;
  }

  function tine(note) {
    var tine = document.createElement('div');
    tine.className = 'tine';
    tine.setAttribute('data-note', note);
    tine.innerHTML = '<span>' + note + '</span>';
    tine.onclick = play_tine;
    return tine;
  }

  function hole() {
    var hole = document.createElement('div');
    hole.className = 'hole';
    return hole;
  }

  function bar() {
    var bar = document.createElement('div');
    bar.className = 'bar';
    return bar;
  }

  function play_tine() {
    console.log(this.getAttribute('data-note'));
  }
}

Kalimba.Tunings = {
  'alto': ['F#', 'D', 'B', 'G', 'E', 'C', 'A', 'G', 'B', 'D', 'F#', 'A', 'C', 'E', 'G']
}