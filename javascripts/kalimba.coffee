sounds = {
  A4: new Howl(urls: ['sounds/A4.wav']),
  B3: new Howl(urls: ['sounds/B3.wav']),
  D6: new Howl(urls: ['sounds/D6.wav']),
  F5: new Howl(urls: ['sounds/F5.wav']),
  G4: new Howl(urls: ['sounds/G4.wav']),
  G5: new Howl(urls: ['sounds/G5.wav'])
}

class window.Kalimba
  constructor: (@container, notes = 'alto') ->
    @html = HTML 'div', className: 'kalimba'

    if tuning = Kalimba.Tunings[notes]
      @html.setAttribute 'data-tuning', notes
      notes = tuning

    @frequencies = {}
    @frequencies[key] = Tuner.frequencies[key] for key, value in notes

    @html.setAttribute 'data-notes', notes
    @html.appendChild @tines(notes)
    @html.appendChild HTML('div', className: 'hole')
    @html.appendChild HTML('div', className: 'bar')
    @container.appendChild @html

  press: ->
    sound.play() if sound = sounds[@getAttribute('data-note')];
    console.log "pressed #{$(this).addClass('pressed').data('note')}"

  release: ->
    console.log "released #{$(this).removeClass('pressed').data('note')}"

  tine: (note) =>
    wrapper = HTML 'div', className: 'tine-wrapper'
    tine = HTML 'div',
      className: 'tine',
      innerHTML: "<span class=\"note\">#{note}</span>",
      onmouseover: @press,
      onmouseout: @release,
    tine.setAttribute 'data-note', note
    tine.setAttribute 'data-frequency', @frequencies[note]
    wrapper.appendChild tine
    wrapper

  tines: (notes) =>
    tines = HTML 'div', className: 'tines'
    height = 300
    root = Math.ceil(notes.length / 2)
    for note, index in notes
      tine = @tine note
      offset = index + 1 - root
      margin = (if offset < 0 then 10 else -13) * offset
      tine.style.height = (height + margin) + 'px'
      tines.appendChild tine
    tines

window.Kalimba.Tunings = {
  'alto': ['F#5', 'D5', 'B5', 'G4', 'E4', 'C4', 'A4', 'G3', 'B4', 'D4', 'F#4', 'A5', 'C5', 'E5', 'G5']
}