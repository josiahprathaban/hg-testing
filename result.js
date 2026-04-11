const STORAGE_KEY = 'hg-testing:endless-exploration-launcher'

const $ = (id) => document.getElementById(id)

const els = {
  backendUrl: $('backendUrl'),
  scoreToken: $('scoreToken'),
  fetchBtn: $('fetchBtn'),
  copyBtn: $('copyBtn'),
  backBtn: $('backBtn'),
  status: $('status'),
  resultJson: $('resultJson'),
  playerName: $('playerName'),
  gameId: $('gameId'),
  levelId: $('levelId'),
  roomId: $('roomId'),
  totalScore: $('totalScore'),
  bossCollected: $('bossCollected'),
}

let lastResponseText = '{}'

const setStatus = (message, isError = false) => {
  els.status.textContent = message
  els.status.style.color = isError ? '#b53328' : '#2f2418'
}

const safeJson = (value) => JSON.stringify(value, null, 2)

const restoreBackendUrl = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return
  }
  try {
    const parsed = JSON.parse(raw)
    if (typeof parsed.backendUrl === 'string' && parsed.backendUrl.trim()) {
      els.backendUrl.value = parsed.backendUrl.trim()
    }
  } catch {
    // ignore invalid saved form data
  }
}

const readScoreTokenFromUrl = () => {
  const url = new URL(window.location.href)
  return url.searchParams.get('scoreToken') || ''
}

const updateSummary = (payload) => {
  const data = payload?.data
  const player = data?.player || {}
  const game = data?.game || {}
  const score = data?.score || {}

  els.playerName.textContent = player.name || '-'
  els.gameId.textContent = game.gameId || '-'
  els.levelId.textContent = game.levelId || '-'
  els.roomId.textContent = game.roomId || '-'
  els.totalScore.textContent = Number.isFinite(score.total) ? String(score.total) : '-'
  els.bossCollected.textContent =
    typeof score.isBossCollected === 'boolean' ? String(score.isBossCollected) : '-'
}

const renderResponse = (payload) => {
  lastResponseText = safeJson(payload)
  els.resultJson.textContent = lastResponseText
  updateSummary(payload)
}

const fetchResult = async () => {
  const backendUrl = els.backendUrl.value.trim().replace(/\/+$/, '')
  const scoreToken = els.scoreToken.value.trim()

  if (!backendUrl) {
    throw new Error('Backend URL is required.')
  }
  if (!scoreToken) {
    throw new Error('Score token is required.')
  }

  setStatus('Fetching score from HG World Backend...')

  const response = await fetch(`${backendUrl}/api/game/score/${encodeURIComponent(scoreToken)}`)
  const payload = await response.json().catch(() => ({}))
  renderResponse(payload)

  if (!response.ok || !payload?.success) {
    const message = payload?.message || `Fetch failed with ${response.status}`
    throw new Error(message)
  }

  setStatus('Score fetched successfully.')
}

const copyRawJson = async () => {
  await navigator.clipboard.writeText(lastResponseText)
  setStatus('Raw JSON copied to clipboard.')
}

const goBack = () => {
  window.location.href = './test-endless-exploration.html'
}

const handleError = (error) => {
  console.error(error)
  setStatus(error instanceof Error ? error.message : String(error), true)
}

restoreBackendUrl()
els.scoreToken.value = readScoreTokenFromUrl()
renderResponse({})

els.fetchBtn.addEventListener('click', async () => {
  try {
    await fetchResult()
  } catch (error) {
    handleError(error)
  }
})

els.copyBtn.addEventListener('click', async () => {
  try {
    await copyRawJson()
  } catch (error) {
    handleError(error)
  }
})

els.backBtn.addEventListener('click', goBack)

if (els.scoreToken.value) {
  void fetchResult().catch(handleError)
}
