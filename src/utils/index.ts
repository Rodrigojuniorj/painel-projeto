import { format } from "date-fns";

export function convertFirstToUpperCase(text: string) {
  const result = text[0].toUpperCase() + text.substring(1)

  return result
}

export function formatDate(date: Date) {
  return format(date, "dd/MM/yyyy");
}