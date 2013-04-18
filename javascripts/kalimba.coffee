# See http://coffeescript.org/

class window.Kalimba
  constructor: (notes, @container) ->
    @html = @element 'div', className: 'kalimba'

    if tuning = Kalimba.Tunings[notes]
      @html.setAttribute 'data-tuning', notes
      notes = tuning

    @html.setAttribute 'data-notes', notes
    @html.appendChild @tines(notes)
    @html.appendChild @element('div', className: 'hole')
    @html.appendChild @element('div', className: 'bar')
    @container.appendChild @html

  element: (type, attributes = {}) ->
    element = document.createElement type
    for attribute, value of attributes
      element[attribute] = value
    element

  play: ->
    # TODO: generate audio sound
    console.log @getAttribute('data-note')

  tine: (note) ->
    tine = @element 'div',
      className: 'tine',
      innerHTML: "<span>#{note}</span>",
      onmouseover: @play,
    tine.setAttribute 'data-note', note
    tine

  tines: (notes) ->
    tines = @element 'div', className: 'tines'
    height = 300
    root = Math.ceil(notes.length / 2)
    for note, index in notes
      tine = @tine note
      offset = index + 1 - root
      margin = (if offset < 0 then 10 else -13) * offset
      tine.setAttribute 'data-offset', offset
      tine.style.height = (height + margin) + 'px'
      tines.appendChild tine
    tines

window.Kalimba.Tunings = {
  'alto': ["F#'", "D'", "B'", 'G', 'E', 'C', 'A', 'G-', 'B', 'D', 'F#', "A'", "C'", "E'", "G'"]
}