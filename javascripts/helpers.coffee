window.HTML = (type, attributes = {}) ->
  element = document.createElement type
  for attribute, value of attributes
    element[attribute] = value
  element