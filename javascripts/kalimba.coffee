# See http://coffeescript.org/

class window.Kalimba
  constructor: (notes, @container) ->
    @html = @div 'kalimba'

    if tuning = Kalimba.Tunings[notes]
      @html.setAttribute 'data-tuning', notes
      notes = tuning

    @html.setAttribute 'data-notes', notes
    @html.appendChild @tines(notes)
    @html.appendChild @hole()
    @html.appendChild @bar()
    @container.appendChild @html

  bar: -> @div 'bar'

  div: (className) ->
    div = document.createElement 'div'
    div.className = className
    div

  hole: -> @div 'hole'

  play: ->
    # TODO: generate audio sound
    console.log @getAttribute('data-note')

  tine: (note) ->
    tine = @div 'tine'
    tine.setAttribute 'data-note', note
    tine.innerHTML = "<span>#{note}</span>"
    tine.onmouseover = @play
    tine

  tines: (notes) ->
    tines = @div 'tines'
    height = 300
    root = Math.ceil(notes.length / 2)
    for note, index in notes
      tine = @tine note
      offset = index + 1 - root
      margin = (if offset < 0 then 10 else -13) * offset
      tine.setAttribute 'data-offset', offset
      tine.style.height = (height + margin) + 'px'
      console.log(index   + ' => ' + margin + ' => ' + tine.style.height);
      tines.appendChild tine
    tines

window.Kalimba.Tunings = {
  'alto': ["F#'", "D'", "B'", 'G', 'E', 'C', 'A', 'G-', 'B', 'D', 'F#', "A'", "C'", "E'", "G'"]
}