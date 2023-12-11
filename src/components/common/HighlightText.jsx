import React from 'react'

function HighlightText({text, colorTheme = "blue"}) {
  let colorThemeGradient = colorTheme === "orange" ? "highlight-gradient-orange" : colorTheme === "red" ? "highlight-gradient-red" : colorTheme === "yellow" ? "highlight-gradient-yellow" : "highlight-gradient-blue";
  return (
    <span className={` font-bold ${colorThemeGradient}`}>
        {" "}
        {text}
    </span>
  )
}

export default HighlightText