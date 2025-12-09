import { defineStore } from 'pinia'
import type { IGameConfig, IGameState, IPosition, IDirection, ICell } from '~/types/game.ts'

export const useGameStore = defineStore('gameStore', () => {
  const CONFIG: IGameConfig = {
    initRows: 7,
    initCols: 9,
  }
  const state = ref<IGameState>({
    optionsRows: CONFIG.initRows,
    optionsCols: CONFIG.initCols,
    rows: CONFIG.initRows,
    cols: CONFIG.initCols,
    grid: [],
    player: { x: 0, y: 0 },
    moves: 0,
    solution: [],
    showSolution: false,
  })

  const flatCells = computed(() => state.value.grid.flat())

  function initEmptyGrid(r: number, c: number) {
    const arr = []
    for (let y = 0; y < r; y++) {
      const row = []
      for (let x = 0; x < c; x++) {
        row.push({ x, y, required: Infinity, remaining: Infinity, visits: 0 })
      }
      arr.push(row)
    }
    state.value.grid = arr
  }

  // generate a solvable grid by producing a random walk that covers all cells at least once.
  function generate() {
    state.value.rows = state.value.optionsRows
    state.value.cols = state.value.optionsCols
    initEmptyGrid(state.value.rows, state.value.cols)
    const walk = produceCoveringWalk(state.value.rows, state.value.cols)
    state.value.solution = [...walk]

    // compute visit counts
    const counts = Array.from({ length: state.value.rows }, () => Array(state.value.cols).fill(0))
    for (const p of walk) counts[p.y][p.x]++

    for (let y = 0; y < state.value.rows; y++) {
      for (let x = 0; x < state.value.cols; x++) {
        const v = counts[y][x]
        const cell = state.value.grid[y][x]
        cell.visits = v
        if (v === 1) {
          cell.required = 1
          cell.remaining = 1
        }
        else if (v === 2) {
          cell.required = 2
          cell.remaining = 2
        }
        else {
          cell.required = Infinity
          cell.remaining = Infinity
        }
      }
    }

    // place player at first walk position
    const start = walk[0]

    state.value.player.x = start.x
    state.value.player.y = start.y
    state.value.moves = 0
    state.value.showSolution = false
  }

  // produce a random walk that keeps going until every cell visited at least once
  function produceCoveringWalk(R: number, C: number): IPosition[] {
    // start at random
    const sx = Math.floor(Math.random() * C)
    const sy = Math.floor(Math.random() * R)
    const visited = Array.from({ length: R }, () => Array(C).fill(false))
    const walk = [{ x: sx, y: sy }]
    visited[sy][sx] = true
    let remaining = R * C - 1

    // do a random walk biased to visit unvisited neighbors first
    let attempts = 0
    while (remaining > 0 && attempts < 50000) {
      const cur = walk[walk.length - 1]
      const neighbors: IPosition[] = shuffle(neighborsOf(cur.x, cur.y, C, R))

      // prefer neighbors that are unvisited
      let chosen = neighbors.find((n: IPosition) => !visited[n.y][n.x])
      if (!chosen) chosen = neighbors[Math.floor(Math.random() * neighbors.length)]

      walk.push(chosen)
      if (!visited[chosen.y][chosen.x]) {
        visited[chosen.y][chosen.x] = true
        remaining--
      }
      attempts++
    }

    // optionally continue the walk a bit to create some cells with 2+ visits (adds variety)
    const extraSteps = Math.floor(Math.random() * (R * C / 2))
    for (let i = 0; i < extraSteps; i++) {
      const cur: IPosition = walk[walk.length - 1]
      const neighbors: IPosition[] = neighborsOf(cur.x, cur.y, C, R)
      const chosen: IPosition = neighbors[Math.floor(Math.random() * neighbors.length)]
      walk.push(chosen)
    }

    return walk
  }

  function neighborsOf(x: number, y: number, C: number, R: number): IPosition[] {
    const arr = []
    if (x > 0) arr.push({ x: x - 1, y })
    if (x < C - 1) arr.push({ x: x + 1, y })
    if (y > 0) arr.push({ x, y: y - 1 })
    if (y < R - 1) arr.push({ x, y: y + 1 })
    return arr
  }

  function shuffle(p: IPosition[]): IPosition[] {
    for (let i = p.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]]
    }
    return p
  }

  function move(dir: IDirection) {
    const nx = state.value.player.x + (dir === 'left' ? -1 : dir === 'right' ? 1 : 0)
    const ny = state.value.player.y + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)
    if (nx < 0 || ny < 0 || nx >= state.value.cols || ny >= state.value.rows) return

    // prevent moving onto cell with no remaining visits
    const target = state.value.grid[ny][nx]
    if (Number.isFinite(target.remaining) && target.remaining <= 0) {
      return // movement blocked
    }

    state.value.player.x = nx
    state.value.player.y = ny
    state.value.moves++
    stepOnCell(nx, ny)
  }

  function stepOnCell(x: number, y: number) {
    const cell = state.value.grid[y][x]
    // if remaining is finite and >0, decrement
    if (Number.isFinite(cell.remaining) && cell.remaining > 0) {
      cell.remaining--
    }
  }

  function resetPlayer() {
    if (state.value.solution.length) {
      const start = state.value.solution[0]
      state.value.player.x = start.x
      state.value.player.y = start.y
    }
    else {
      state.value.player.x = 0
      state.value.player.y = 0
    }
    state.value.moves = 0
    // reset remaining
    for (const c of flatCells.value) {
      c.remaining = Number.isFinite(c.required) ? c.required : Infinity
    }
  }

  const remainingNeeded = computed(() => {
    let count = 0
    for (const c of flatCells.value) {
      if (Number.isFinite(c.required) && c.remaining > 0) count++
    }
    return count
  })

  function cellLabel(cell: ICell): string {
    if (!Number.isFinite(cell.required)) return '∞'
    return String(cell.remaining)
  }

  // keyboard controls
  function onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowUp') move('up')
    if (e.key === 'ArrowDown') move('down')
    if (e.key === 'ArrowLeft') move('left')
    if (e.key === 'ArrowRight') move('right')
  }

  function toggleShowSolution() {
    state.value.showSolution = !state.value.showSolution
  }

  return {
    state,
    generate,
    onKey,
    resetPlayer,
    flatCells,
    remainingNeeded,
    cellLabel,
    move,
    toggleShowSolution,
  }
})
