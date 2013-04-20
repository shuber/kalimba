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
    @beat.innerHTML = ''
    @html.setAttribute 'data-started'
    @tick()

  stop: => @html.removeAttribute 'data-started'

  tick: =>
    if @html.getAttribute 'data-started'
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

    bpm = new Metronome.Controls.Increment 'BPM',
      @metronome.beatsPerMinute,
      (value) => @metronome.beatsPerMinute = parseInt value unless isNaN value
    @html.appendChild bpm.html

    bpc = new Metronome.Controls.Increment 'BPC',
      @metronome.beatsPerCycle,
      (value) => @metronome.beatsPerCycle = parseInt value unless isNaN value
    @html.appendChild bpc.html

    button = new Metronome.Controls.Toggle ['Start', 'Stop'],
      (value) => if value == 'Start' then @metronome.start() else @metronome.stop()
    @html.appendChild button.html

class window.Metronome.Controls.Increment
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

class window.Metronome.Controls.Toggle
  constructor: (@values, @callback) ->
    @index = 0
    @html = HTML 'input',
      type: 'button',
      value: @values[0],
      className: 'toggle',
      onclick: @click

  click: =>
    value = @values[@index]
    @index = @index + 1
    @index = 0 if typeof @values[@index] == 'undefined'
    @html.value = @values[@index]
    @callback value
    