import React from "react";
import { Suggestion } from "./SearchBox.component";
// interface SuggestionProps {
//   onClick?: (e: React.ChangeEvent<HTMLInputElement>) => void;
// }
type SuggestionProps = {
  key: number,
  style: any,
  onClick: any,
  data: string
}

export const Suggestions = ({ key, style, onClick, data }: SuggestionProps) => {
  return (
    <Suggestion style={style} onClick={onClick}>{data}</Suggestion>
  )
}