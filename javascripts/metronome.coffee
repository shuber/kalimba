class window.Metronome
  constructor: (@container, @beatsPerMinute = 100, @beatsPerBar = 4) ->
    @html = HTML 'div', className: 'metronome'
    @beat = HTML 'div', className: 'beat'
    @html.appendChild @beat
    @html.appendChild @controls()
    @container.appendChild @html

  controls: ->
    controls = HTML 'div', className: 'controls'
    start = HTML 'input', type: 'button', value: 'Start'
    start.onclick = @start
    controls.appendChild start

    stop = HTML 'input', type: 'button', value: 'Stop'
    stop.onclick = @stop
    controls.appendChild stop
    controls

  start: =>
    @beat.innerHTML = ''
    @interval = setInterval @tick, 1000*60/@beatsPerMinute;

  stop: =>
    clearInterval @interval

  tick: =>
    currentBeat = parseInt @beat.innerHTML
    currentBeat = 0 if currentBeat == @beatsPerBar || isNaN currentBeat
    @beat.innerHTML = currentBeat + 1