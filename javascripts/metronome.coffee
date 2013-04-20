class window.Metronome
  constructor: (@container, @beatsPerMinute = 100, @beatsPerBar = 4) ->
    @html = HTML 'div', className: 'metronome'
    @beat = HTML 'div', className: 'beat'
    @html.appendChild @beat

    @controls = new Metronome.Controls(this)
    @html.appendChild @controls.html
    @container.appendChild @html

  start: =>
    @beat.innerHTML = ''
    @interval = setInterval @tick, 1000*60/@beatsPerMinute;

  stop: =>
    clearInterval @interval

  tick: =>
    currentBeat = parseInt @beat.innerHTML
    currentBeat = 0 if currentBeat == @beatsPerBar || isNaN currentBeat
    @beat.innerHTML = currentBeat + 1

class window.Metronome.Controls
  constructor: (@metronome) ->
    @html = HTML 'div', className: 'controls'

    start = HTML 'input', type: 'button', value: 'Start'
    start.onclick = @metronome.start
    @html.appendChild start

    stop = HTML 'input', type: 'button', value: 'Stop'
    stop.onclick = @metronome.stop
    @html.appendChild stop