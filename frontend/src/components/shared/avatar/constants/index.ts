const letterColorMap: Record<string, string> = {
  A: 'bg-red-600 text-muted-50 dark:bg-red-900 dark:text-red-300',
  B: 'bg-orange-600 text-muted-50 dark:bg-orange-900 dark:text-orange-300',
  C: 'bg-yellow-600 text-muted-50 dark:bg-yellow-900 dark:text-yellow-300',
  D: 'bg-lime-600 text-muted-50 dark:bg-lime-900 dark:text-lime-300',
  E: 'bg-green-600 text-muted-50 dark:bg-green-900 dark:text-green-300',
  F: 'bg-emerald-600 text-muted-50 dark:bg-emerald-900 dark:text-emerald-300',
  G: 'bg-teal-600 text-muted-50 dark:bg-teal-900 dark:text-teal-300',
  H: 'bg-cyan-600 text-muted-50 dark:bg-cyan-900 dark:text-cyan-300',
  I: 'bg-sky-600 text-muted-50 dark:bg-sky-900 dark:text-sky-300',
  J: 'bg-blue-600 text-muted-50 dark:bg-blue-900 dark:text-blue-300',
  K: 'bg-indigo-600 text-muted-50 dark:bg-indigo-900 dark:text-indigo-300',
  L: 'bg-violet-600 text-muted-50 dark:bg-violet-900 dark:text-violet-300',
  M: 'bg-purple-600 text-muted-50 dark:bg-purple-900 dark:text-purple-300',
  N: 'bg-fuchsia-600 text-muted-50 dark:bg-fuchsia-900 dark:text-fuchsia-300',
  O: 'bg-pink-600 text-muted-50 dark:bg-pink-900 dark:text-pink-300',
  P: 'bg-rose-600 text-muted-50 dark:bg-rose-900 dark:text-rose-300',
  Q: 'bg-red-600 text-muted-50 dark:bg-red-900 dark:text-red-300',
  R: 'bg-orange-600 text-muted-50 dark:bg-orange-900 dark:text-orange-300',
  S: 'bg-yellow-600 text-muted-50 dark:bg-yellow-900 dark:text-yellow-300',
  T: 'bg-lime-600 text-muted-50 dark:bg-lime-900 dark:text-lime-300',
  U: 'bg-green-600 text-muted-50 dark:bg-green-900 dark:text-green-300',
  V: 'bg-emerald-600 text-muted-50 dark:bg-emerald-900 dark:text-emerald-300',
  W: 'bg-teal-600 text-muted-50 dark:bg-teal-900 dark:text-teal-300',
  X: 'bg-cyan-600 text-muted-50 dark:bg-cyan-900 dark:text-cyan-300',
  Y: 'bg-sky-600 text-muted-50 dark:bg-sky-900 dark:text-sky-300',
  Z: 'bg-blue-600 text-muted-50 dark:bg-blue-900 dark:text-blue-300',
}

export function getColorClassFromLetter(letter: string): string {
  if (!letter) return ''
  const upper = letter.toUpperCase()
  return letterColorMap[upper] || 'bg-muted'
}

export function getInitials(name: string): string {
  if (!name) return 'U'
  const words = name.trim().split(/\s+/)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase() // e.g. "Rihanna" → "RI"
  }
  const first = words[0][0]
  const last = words[words.length - 1][0]
  return (first + last).toUpperCase()
}
