const STORAGE_KEY = 'hg-testing:shooting-game-lobby-launcher'
const BACKEND_URL = 'http://localhost:3000'
const FRONTEND_URL = 'http://localhost:5173'
const GAME_ID = 'ISLAND_EXPLORATION_V3_LOBBY'
const QUESTION_KEY = 's010_c020_q040'

const characters = [
  { key: 'katy', name: 'Katy', avatar: '{"charKey":"mochi_v4","body":"cat","mouth":"cat","pColor":"FCE83F","hat":"","left":"","right":"","back":""}' },
  { key: 'beary', name: 'Beary', avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"C67334","hat":"","left":"","right":"","back":""}' },
  { key: 'ruby', name: 'Ruby', avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0280_H","left":"","right":"","back":""}' },
  { key: 'explorer', name: 'Explorer', avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0050_H","left":"S0050_L","right":"","back":"S0030_B"}' },
]

const form = document.getElementById('lobby-launch-form')
const playerName = document.getElementById('playerName')
const playerLevel = document.getElementById('playerLevel')
const playerExperience = document.getElementById('playerExperience')
const stageResults = document.getElementById('stageResults')
const avatar = document.getElementById('avatar')
const avatarPreview = document.getElementById('avatarPreview')
const status = document.getElementById('status')
const launchButton = document.getElementById('launchButton')

const currentCharacter = () => characters.find((item) => item.key === avatar.value) ?? characters[0]
const createPlayerId = () => window.crypto?.randomUUID?.() ?? `player-${Math.random().toString(36).slice(2, 10)}`
const getReturnUrl = () => new URL('../index.html', window.location.href).toString()
const setStatus = (message, error = false) => {
  status.textContent = message
  status.classList.toggle('status--error', error)
}
const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify({
  playerName: playerName.value,
  playerLevel: playerLevel.value,
  playerExperience: playerExperience.value,
  stageResults: stageResults.value,
  avatar: avatar.value,
}))
const restore = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
    if (typeof saved.playerName === 'string') playerName.value = saved.playerName
    if (typeof saved.playerLevel === 'string') playerLevel.value = saved.playerLevel
    if (typeof saved.playerExperience === 'string') playerExperience.value = saved.playerExperience
    if (typeof saved.stageResults === 'string') stageResults.value = saved.stageResults
    if (typeof saved.avatar === 'string') avatar.value = saved.avatar
  } catch { localStorage.removeItem(STORAGE_KEY) }
}
const updateAvatarPreview = () => {
  const character = currentCharacter()
  avatarPreview.innerHTML = `<div class="avatar-preview__badge">${character.name.slice(0, 2).toUpperCase()}</div><div><strong>${character.name}</strong><span>Host-platform avatar payload</span></div>`
}

characters.forEach((character) => {
  const option = document.createElement('option')
  option.value = character.key
  option.textContent = character.name
  avatar.appendChild(option)
})
playerName.value = `Shooter-${Math.random().toString(36).slice(2, 6).toUpperCase()}`
avatar.value = characters[0].key
restore()
updateAvatarPreview()

;[playerName, playerLevel, playerExperience, stageResults, avatar].forEach((input) => input.addEventListener('change', () => { save(); updateAvatarPreview() }))
playerName.addEventListener('input', save)

form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const name = playerName.value.trim()
  const level = Math.max(1, Math.floor(Number(playerLevel.value) || 1))
  const experience = Math.max(0, Math.floor(Number(playerExperience.value) || 0))
  const clearedStageIds = [...new Set(
    stageResults.value
      .split(',')
      .map((value) => Math.floor(Number(value.trim())))
      .filter((value) => Number.isFinite(value) && value > 0)
  )]
  if (!name) { setStatus('Player name is required.', true); return }
  const character = currentCharacter()
  const payload = {
    auth: { Player: { mochiId: createPlayerId(), avatar: character.avatar }, User: { name } },
    gameId: GAME_ID,
    levelId: String(level),
    shootingProgress: {
      level,
      experience,
      stageResults: clearedStageIds.map((levelId) => ({ levelId, cleared: true })),
    },
    mapId: 1,
    difficulty: '2',
    questionKey: QUESTION_KEY,
    returnUrl: getReturnUrl(),
  }
  launchButton.disabled = true
  setStatus('Sending player profile to the V3 lobby...')
  try {
    const response = await fetch(`${BACKEND_URL}/auth/transfer`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    const data = await response.json().catch(() => ({}))
    if (!response.ok || data.success !== true || !data.token) throw new Error(data.error || 'Launch request failed.')
    window.location.href = `${FRONTEND_URL}/en?token=${encodeURIComponent(data.token)}`
  } catch (error) {
    setStatus(error instanceof Error ? error.message : 'Launch request failed.', true)
    launchButton.disabled = false
  }
})
