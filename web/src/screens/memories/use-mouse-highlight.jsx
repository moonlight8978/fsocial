import { useState } from 'react'

const useMouseHighlight = () => {
  const [highlightedId, setHighlightedId] = useState(null)

  const handleMouseOut = () => setHighlightedId(null)
  const handleMouseOver = id => () => setHighlightedId(id)

  return [highlightedId, { handleMouseOut, handleMouseOver }]
}

export default useMouseHighlight
