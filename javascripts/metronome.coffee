class window.Metronome
  constructor: (@container, @beatsPerMinute = 100, @beatsPerBar = 4) ->
    @html = HTML 'div', className: 'metronome'
    @beat = HTML 'div', className: 'beat'
    @html.appendChild @beat

    @controls = new Metronome.Controls(this)
    @html.appendChild @controls.html
    @container.appendChild @html

  start: =>
    @stop()
    @html.setAttribute 'data-started', 'true'
    @tick()

  stop: =>
    @html.setAttribute 'data-started', 'false'
    @beat.innerHTML = ''

  tick: =>
    if @html.getAttribute('data-started') == 'true'
      currentBeat = parseInt @beat.innerHTML
      currentBeat = 0 if currentBeat >= @beatsPerBar || isNaN currentBeat
      @beat.innerHTML = currentBeat + 1
      setTimeout @tick, 1000*60/@beatsPerMinute

class window.Metronome.Controls
  constructor: (@metronome) ->
    @html = HTML 'div', className: 'controls'

    bpm = new Metronome.Controls.Toggle 'BPM',
      @metronome.beatsPerMinute,
      (value) => @metronome.beatsPerMinute = value unless isNaN value
    @html.appendChild bpm.html

    bpb = new Metronome.Controls.Toggle 'BPB',
      @metronome.beatsPerBar,
      (value) => @metronome.beatsPerBar = value unless isNaN value
    @html.appendChild bpb.html

    start = HTML 'input', type: 'button', value: 'Start'
    start.onclick = @metronome.start
    @html.appendChild start

    stop = HTML 'input', type: 'button', value: 'Stop'
    stop.onclick = @metronome.stop
    @html.appendChild stop

class window.Metronome.Controls.Toggle
  constructor: (name, value, @callback) ->
    @html = HTML 'div', className: "toggle #{name}"

    @html.appendChild HTML 'label', innerHTML: name

    @html.appendChild HTML 'input',
      type: 'button',
      name: 'decrease',
      value: '-',
      onclick: @decrease

    @value = HTML 'input',
      type: 'input',
      name: 'value',
      value: value,
      onchange: @change
    @html.appendChild @value

    @html.appendChild HTML 'input',
      type: 'button',
      name: 'increase',
      value: '+',
      onclick: @increase

  change: (value) =>
    @value.value = value if typeof value != 'object'
    @callback @value.value

  decrease: => @change parseInt(@value.value) - 1

  increase: => @change parseInt(@value.value) + 1