export const normalizePhone = value => value.replace(/\D/g, '')

export const sortByUpNumber = (prev, next) => {
  return Number(normalizePhone(prev.phone)) - Number(normalizePhone(next.phone))
}

export const sortByDownNumber = (prev, next) => {
  return (Number(next.phone.replace(/\D/g, '')) - Number(prev.phone.replace(/\D/g, '')))
}

export const sortByUp = key => (prev, next) => {
  if (prev[key] < next[key]) return -1
  if (prev[key] > next[key]) return 1
}

export const sortByDown = key => (prev, next) => {
  if (prev[key] > next[key]) return -1
  if (prev[key] < next[key]) return 1
}