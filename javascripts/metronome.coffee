class window.Metronome
  constructor: (@container, @beatsPerMinute = 100, @beatsPerCycle = 4) ->
    @html = HTML 'div', className: 'metronome'
    @beat = HTML 'div', className: 'beat'
    @html.appendChild @beat

    @controls = new Metronome.Controls(this)
    @html.appendChild @controls.html
    @container.appendChild @html

    @sounds = {
      tick: new Howl(urls: ['sounds/tick.mp3']),
      tock: new Howl(urls: ['sounds/tock.mp3'])
    }

  start: =>
    if @html.getAttribute('data-started') != 'true'
      @beat.innerHTML = ''
      @html.setAttribute 'data-started', 'true'
      @tick()

  stop: =>
    @html.setAttribute 'data-started', 'false'

  tick: =>
    if @html.getAttribute('data-started') == 'true'
      currentBeat = parseInt @beat.innerHTML
      nextBeat = if isNaN currentBeat then 1 else currentBeat + 1
      sound = if nextBeat == @beatsPerCycle then @sounds.tock else @sounds.tick
      sound.play()
      nextBeat = 1 if nextBeat > @beatsPerCycle
      @beat.innerHTML = nextBeat
      setTimeout @tick, 1000*60/@beatsPerMinute

class window.Metronome.Controls
  constructor: (@metronome) ->
    @html = HTML 'div', className: 'controls'

    bpm = new Metronome.Controls.Toggle 'BPM',
      @metronome.beatsPerMinute,
      (value) => @metronome.beatsPerMinute = parseInt value unless isNaN value
    @html.appendChild bpm.html

    bpc = new Metronome.Controls.Toggle 'BPC',
      @metronome.beatsPerCycle,
      (value) => @metronome.beatsPerCycle = parseInt value unless isNaN value
    @html.appendChild bpc.html

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