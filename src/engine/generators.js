// Problem generators for each topic/grade/tier
// Returns { question, answer, choices, type, hint }

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const shuffle = arr => [...arr].sort(() => Math.random() - 0.5)

function makeChoices(answer, range = 10, count = 4) {
  const wrong = new Set()
  while (wrong.size < count - 1) {
    const v = answer + rand(-range, range)
    if (v !== answer && v >= 0) wrong.add(v)
  }
  return shuffle([answer, ...wrong])
}

const WORD_CONTEXTS = [
  { noun: 'apples', emoji: '🍎' },
  { noun: 'stars', emoji: '⭐' },
  { noun: 'balloons', emoji: '🎈' },
  { noun: 'cookies', emoji: '🍪' },
  { noun: 'fish', emoji: '🐟' },
  { noun: 'flowers', emoji: '🌸' },
  { noun: 'pencils', emoji: '✏️' },
  { noun: 'stickers', emoji: '🌟' },
]
const ctx = () => WORD_CONTEXTS[rand(0, WORD_CONTEXTS.length - 1)]

// ── Grade 1 ──────────────────────────────────────────────────────────────────

function add20(tier) {
  const max = tier === 1 ? 10 : tier === 2 ? 15 : 20
  const a = rand(1, max - 1), b = rand(1, max - a)
  const answer = a + b
  const type = tier === 3 && Math.random() > 0.5 ? 'fill' : 'mc'
  return {
    question: `${a} + ${b} = ?`,
    display: `${a} + ${b} = ___`,
    answer,
    choices: makeChoices(answer, 4),
    type,
    hint: `Try counting up from ${a} by ${b} steps on a number line.`,
    hintVisual: 'numberline',
    hintArgs: { start: 0, end: max + 2, mark: a, jump: b },
  }
}

function sub20(tier) {
  const max = tier === 1 ? 10 : tier === 2 ? 15 : 20
  const b = rand(1, max - 1), a = rand(b, max)
  const answer = a - b
  const type = tier === 3 ? 'fill' : 'mc'
  return {
    question: `${a} − ${b} = ?`,
    display: `${a} − ${b} = ___`,
    answer,
    choices: makeChoices(answer, 4),
    type,
    hint: `Start at ${a} and count back ${b} steps.`,
    hintVisual: 'numberline',
    hintArgs: { start: 0, end: max, mark: a, jump: -b },
  }
}

function place1(tier) {
  const tens = rand(1, tier === 1 ? 5 : 9)
  const ones = rand(0, 9)
  const num = tens * 10 + ones
  const variants = [
    { question: `How many tens are in ${num}?`, answer: tens, choices: makeChoices(tens, 3, 4) },
    { question: `How many ones are in ${num}?`, answer: ones, choices: makeChoices(ones, 3, 4) },
    { question: `${tens} tens and ${ones} ones = ?`, answer: num, choices: makeChoices(num, 10) },
  ]
  const v = variants[rand(0, variants.length - 1)]
  return { ...v, type: 'mc', hint: `Remember: tens × 10 + ones = the number.`, display: v.question }
}

function add100(tier) {
  const a = rand(10, tier === 1 ? 50 : 90)
  const b = rand(1, 100 - a)
  const answer = a + b
  return {
    question: `${a} + ${b} = ?`, display: `${a} + ${b} = ___`, answer,
    choices: makeChoices(answer, 10), type: tier === 3 ? 'fill' : 'mc',
    hint: `Add the ones first, then the tens.`,
  }
}

function time1(tier) {
  const hours = rand(1, 12)
  const mins = tier === 1 ? 0 : 30
  const timeStr = `${hours}:${mins === 0 ? '00' : '30'}`
  const label = mins === 0 ? `${hours} o'clock` : `${hours} thirty`
  const wrongs = shuffle([1,2,3,4,5,6,7,8,9,10,11,12].filter(h => h !== hours)).slice(0, 3)
  const choices = shuffle([label, ...wrongs.map(h => mins === 0 ? `${h} o'clock` : `${h} thirty`)])
  return {
    question: `What time does the clock show?`, display: `🕐 Clock showing ${timeStr}`,
    answer: label, choices, type: 'mc',
    hint: `The short hand points to the hour, the long hand points to 12 (o'clock) or 6 (half past).`,
    clockTime: { hours, mins },
    isClockProblem: true,
  }
}

function shapes1(tier) {
  const shapes = [
    { name: 'circle', sides: 0, emoji: '⭕' },
    { name: 'square', sides: 4, emoji: '🟥' },
    { name: 'triangle', sides: 3, emoji: '🔺' },
    { name: 'rectangle', sides: 4, emoji: '▬' },
  ]
  const s = shapes[rand(0, shapes.length - 1)]
  if (tier === 1) {
    return {
      question: `Which shape has ${s.sides === 0 ? 'no' : s.sides} sides?`,
      display: `Which shape has ${s.sides === 0 ? 'no' : s.sides} sides?`,
      answer: s.name, choices: shuffle(shapes.map(x => x.name)), type: 'mc',
      hint: `Count the corners to find the sides.`,
    }
  }
  return {
    question: `How many sides does a ${s.name} have?`,
    display: `How many sides does a ${s.name} ${s.emoji} have?`,
    answer: s.sides === 0 ? 0 : s.sides,
    choices: shuffle([0, 3, 4, 6]), type: 'mc',
    hint: `Trace the shape in your mind and count each side.`,
  }
}

function compare1(tier) {
  const max = tier === 1 ? 20 : tier === 2 ? 100 : 1000
  let a = rand(1, max), b = rand(1, max)
  while (a === b) b = rand(1, max)
  const answer = a > b ? '>' : '<'
  return {
    question: `${a}  ___  ${b}`, display: `${a}  ___  ${b}`, answer,
    choices: ['<', '>', '='], type: 'mc',
    hint: `The open side of the symbol always faces the bigger number.`,
  }
}

// ── Grade 2 ──────────────────────────────────────────────────────────────────

function add100r(tier) {
  const a = rand(10, 89), b = rand(10, 99 - a)
  const answer = a + b
  return {
    question: `${a} + ${b} = ?`, display: `${a} + ${b} = ___`, answer,
    choices: makeChoices(answer, 10), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Add ones: ${a % 10} + ${b % 10}. If it's 10 or more, carry 1 to the tens.`,
  }
}

function sub100(tier) {
  const b = rand(10, 80), a = rand(b + 1, 99)
  const answer = a - b
  return {
    question: `${a} − ${b} = ?`, display: `${a} − ${b} = ___`, answer,
    choices: makeChoices(answer, 10), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Subtract ones first. If you can't, regroup from the tens.`,
  }
}

function add1000(tier) {
  const a = rand(100, 800), b = rand(100, 999 - a)
  const answer = a + b
  return {
    question: `${a} + ${b} = ?`, display: `${a} + ${b} = ___`, answer,
    choices: makeChoices(answer, 50), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Add hundreds, tens, and ones separately, then combine.`,
  }
}

function place2(tier) {
  const h = rand(1, 9), t = rand(0, 9), o = rand(0, 9)
  const num = h * 100 + t * 10 + o
  const variants = [
    { q: `How many hundreds in ${num}?`, a: h },
    { q: `What is the value of the hundreds digit in ${num}?`, a: h * 100 },
    { q: `Write ${h} hundreds, ${t} tens, and ${o} ones as a number.`, a: num },
  ]
  const v = variants[rand(0, 2)]
  return {
    question: v.q, display: v.q, answer: v.a,
    choices: makeChoices(v.a, v.a > 100 ? 100 : 3),
    type: tier >= 3 ? 'fill' : 'mc',
    hint: `Hundreds = 100s place, Tens = 10s place, Ones = 1s place.`,
  }
}

function skip2(tier) {
  const steps = [5, 10, 100]
  const step = steps[rand(0, tier === 1 ? 1 : 2)]
  const start = rand(0, 5) * step
  const seq = Array.from({ length: 5 }, (_, i) => start + i * step)
  const blankIdx = rand(2, 4)
  const answer = seq[blankIdx]
  const display = seq.map((v, i) => i === blankIdx ? '___' : v).join(', ')
  return {
    question: `Fill in the blank: ${display}`, display: `${display}`,
    answer, choices: makeChoices(answer, step * 2),
    type: 'mc', hint: `Each number increases by ${step}. Count by ${step}s.`,
  }
}

function odd2(tier) {
  const n = rand(1, tier === 1 ? 20 : 50)
  const answer = n % 2 === 0 ? 'Even' : 'Odd'
  return {
    question: `Is ${n} odd or even?`, display: `Is ${n} odd or even?`,
    answer, choices: ['Odd', 'Even'], type: 'mc',
    hint: `Even numbers end in 0, 2, 4, 6, or 8. Odd numbers end in 1, 3, 5, 7, or 9.`,
  }
}

function time2(tier) {
  const hours = rand(1, 12)
  const minOpts = tier === 1 ? [0, 15, 30, 45] : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  const mins = minOpts[rand(0, minOpts.length - 1)]
  const pad = m => String(m).padStart(2, '0')
  const label = `${hours}:${pad(mins)}`
  const wrongs = []
  while (wrongs.length < 3) {
    const wh = rand(1, 12), wm = minOpts[rand(0, minOpts.length - 1)]
    const wl = `${wh}:${pad(wm)}`
    if (wl !== label && !wrongs.includes(wl)) wrongs.push(wl)
  }
  return {
    question: 'What time does the clock show?', display: `🕐 Clock showing ${label}`,
    answer: label, choices: shuffle([label, ...wrongs]), type: 'mc',
    hint: `Count the minute marks from 12. Each mark = 5 minutes.`,
    clockTime: { hours, mins }, isClockProblem: true,
  }
}

function money2(tier) {
  const coins = [
    { name: 'penny', value: 1, emoji: '🪙' },
    { name: 'nickel', value: 5, emoji: '🔵' },
    { name: 'dime', value: 10, emoji: '⚪' },
    { name: 'quarter', value: 25, emoji: '🟡' },
  ]
  const count = tier === 1 ? 3 : 5
  const selection = Array.from({ length: count }, () => coins[rand(0, coins.length - 1)])
  const total = selection.reduce((s, c) => s + c.value, 0)
  const display = selection.map(c => c.emoji).join(' ')
  return {
    question: `How many cents is ${display}?`, display: `${display}`,
    answer: total, choices: makeChoices(total, 15),
    type: tier >= 3 ? 'fill' : 'mc',
    hint: `Add up each coin: penny=1¢, nickel=5¢, dime=10¢, quarter=25¢.`,
  }
}

function word2(tier) {
  const c = ctx()
  const a = rand(10, tier === 1 ? 30 : 50)
  const b = rand(5, tier === 1 ? 20 : 40)
  const ops = [
    { text: `${c.emoji} Maya has ${a} ${c.noun}. She gets ${b} more. How many does she have now?`, answer: a + b },
    { text: `${c.emoji} There are ${a + b} ${c.noun}. ${b} are taken away. How many are left?`, answer: a },
  ]
  const op = ops[rand(0, 1)]
  return {
    question: op.text, display: op.text, answer: op.answer,
    choices: makeChoices(op.answer, 10), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Read carefully: are you adding or subtracting?`,
  }
}

function compare2(tier) {
  const max = tier === 1 ? 100 : 1000
  let a = rand(1, max), b = rand(1, max)
  while (a === b) b = rand(1, max)
  const answer = a > b ? '>' : '<'
  return {
    question: `${a}  ___  ${b}`, display: `${a}  ___  ${b}`, answer,
    choices: ['<', '>', '='], type: 'mc',
    hint: `Compare hundreds first, then tens, then ones.`,
  }
}

// ── Grade 3 ──────────────────────────────────────────────────────────────────

function mult3(tier) {
  const max = tier === 1 ? 5 : tier === 2 ? 8 : 10
  const a = rand(0, max), b = rand(0, max)
  const answer = a * b
  return {
    question: `${a} × ${b} = ?`, display: `${a} × ${b} = ___`, answer,
    choices: makeChoices(answer, 10, 4), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Think of ${a} groups of ${b}, or use skip counting by ${b}.`,
  }
}

function div3(tier) {
  const max = tier === 1 ? 5 : tier === 2 ? 8 : 10
  const b = rand(1, max), a = rand(1, max)
  const dividend = a * b
  return {
    question: `${dividend} ÷ ${b} = ?`, display: `${dividend} ÷ ${b} = ___`, answer: a,
    choices: makeChoices(a, 5), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Think: what times ${b} equals ${dividend}?`,
  }
}

function add1000r(tier) {
  const a = rand(100, 800), b = rand(100, 999 - a)
  const answer = a + b
  return {
    question: `${a} + ${b} = ?`, display: `${a} + ${b} = ___`, answer,
    choices: makeChoices(answer, 50), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Line up the digits and add column by column, right to left.`,
  }
}

function sub1000(tier) {
  const b = rand(100, 700), a = rand(b + 1, 999)
  const answer = a - b
  return {
    question: `${a} − ${b} = ?`, display: `${a} − ${b} = ___`, answer,
    choices: makeChoices(answer, 50), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Subtract ones, tens, then hundreds. Regroup if needed.`,
  }
}

function round3(tier) {
  const to = tier === 1 ? 10 : [10, 100][rand(0, 1)]
  const n = rand(11, 999)
  const answer = Math.round(n / to) * to
  return {
    question: `Round ${n} to the nearest ${to}.`, display: `Round ${n} to the nearest ${to}.`,
    answer, choices: makeChoices(answer, to * 2),
    type: 'mc', hint: `If the digit to the right of the rounding place is 5 or more, round up.`,
  }
}

function frac3(tier) {
  const denoms = tier === 1 ? [2, 4] : tier === 2 ? [2, 3, 4, 6] : [2, 3, 4, 6, 8]
  const denom = denoms[rand(0, denoms.length - 1)]
  const num = rand(1, denom - 1)
  const variants = [
    { q: `What fraction is shaded? (${num} out of ${denom} equal parts)`, a: `${num}/${denom}`,
      choices: shuffle([`${num}/${denom}`, `${denom}/${num}`, `1/${denom}`, `${num}/2`]) },
    { q: `Which fraction is bigger: 1/${denom} or 1/2?`,
      a: denom < 2 ? `1/${denom}` : `1/2`,
      choices: [`1/${denom}`, '1/2'] },
  ]
  const v = variants[rand(0, 0)]
  return {
    question: v.q, display: v.q, answer: v.a, choices: v.choices, type: 'mc',
    hint: `The bottom number tells how many equal pieces. The top number tells how many you have.`,
  }
}

function time3(tier) {
  const hours = rand(1, 12)
  const mins = rand(0, 11) * 5
  const pad = m => String(m).padStart(2, '0')
  const label = `${hours}:${pad(mins)}`
  const wrongs = []
  while (wrongs.length < 3) {
    const wh = rand(1, 12), wm = rand(0, 11) * 5
    const wl = `${wh}:${pad(wm)}`
    if (wl !== label && !wrongs.includes(wl)) wrongs.push(wl)
  }
  return {
    question: 'What time does the clock show?', display: `Clock showing ${label}`,
    answer: label, choices: shuffle([label, ...wrongs]), type: 'mc',
    hint: `The minute hand: count by 5s from 12.`,
    clockTime: { hours, mins }, isClockProblem: true,
  }
}

function word3(tier) {
  const c = ctx()
  const a = rand(2, 6), b = rand(2, 8)
  const ops = [
    { text: `${c.emoji} There are ${a} bags with ${b} ${c.noun} each. How many ${c.noun} in all?`, answer: a * b },
    { text: `${c.emoji} ${a * b} ${c.noun} are shared equally among ${a} friends. How many does each get?`, answer: b },
    { text: `${c.emoji} Sam has ${a * b} ${c.noun}. He puts ${b} in each box. How many boxes does he need?`, answer: a },
  ]
  const op = ops[rand(0, ops.length - 1)]
  return {
    question: op.text, display: op.text, answer: op.answer,
    choices: makeChoices(op.answer, 5), type: tier >= 2 ? 'fill' : 'mc',
    hint: `Look for keywords: "each" and "in all" suggest multiplication. "shared equally" suggests division.`,
  }
}

function shapes3(tier) {
  const shapes = [
    { name: 'square', sides: 4, angles: 4 },
    { name: 'rectangle', sides: 4, angles: 4 },
    { name: 'rhombus', sides: 4, angles: 4 },
    { name: 'trapezoid', sides: 4, angles: 4 },
    { name: 'pentagon', sides: 5, angles: 5 },
    { name: 'hexagon', sides: 6, angles: 6 },
  ]
  const s = shapes[rand(0, shapes.length - 1)]
  return {
    question: `How many sides does a ${s.name} have?`,
    display: `How many sides does a ${s.name} have?`,
    answer: s.sides, choices: shuffle([3, 4, 5, 6]),
    type: 'mc', hint: `Quadrilaterals have 4 sides. Count the corners to confirm.`,
  }
}

// ── Generator map ─────────────────────────────────────────────────────────────

const GENERATORS = {
  // Grade 1
  add20, sub20, place1, add100, time1, shapes1, compare1,
  // Grade 2
  add100r, sub100, add1000, place2, skip2, odd2, time2, money2, word2, compare2,
  // Grade 3
  mult3, div3, add1000r, sub1000, round3, frac3, time3, word3, shapes3,
}

export function generateProblem(topicId, tier) {
  const gen = GENERATORS[topicId]
  if (!gen) return null
  return gen(tier)
}
