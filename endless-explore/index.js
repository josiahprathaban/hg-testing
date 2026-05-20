const STORAGE_KEY = 'hg-testing:endless-exploration-launcher'

const characterData = [
  {
    key: 'katy',
    name: 'Katy',
    avatar: '{"charKey":"mochi_v4","body":"cat","mouth":"cat","pColor":"FCE83F","hat":"","left":"","right":"","back":""}',
  },
  {
    key: 'beary',
    name: 'Beary',
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"C67334","hat":"","left":"","right":"","back":""}',
  },
  {
    key: 'ruby',
    name: 'Ruby',
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0280_H","left":"","right":"","back":""}',
  },
  {
    key: 'hamochi',
    name: 'Hamochi',
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0010_H","left":"","right":"","back":""}',
  },
  {
    key: 'villager1',
    name: 'Villager 1',
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"9E8C7E","hat":"","left":"S0280_L","right":"","back":""}',
  },
  {
    key: 'villager2',
    name: 'Villager 2',
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"FFB6C1","hat":"","left":"","right":"","back":""}',
  },
  {
    key: 'builder',
    name: 'Builder',
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0060_H","left":"","right":"S0060_R","back":""}',
  },
  {
    key: 'explorer',
    name: 'Explorer',
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0050_H","left":"S0050_L","right":"","back":"S0030_B"}',
  },
  {
    key: 'wizard',
    name: 'Wizard',
    avatar: '{"charKey":"mochi_v4","body":"hamster","mouth":"hamster","pColor":"EEC883","hat":"S0120_H","left":"S0120_L","right":"S0120_R","back":""}',
  },
  {
    key: 'witch',
    name: 'Witch',
    avatar: '{"charKey":"mochi_v4","body":"cat","mouth":"cat","pColor":"FCE83F","hat":"S0120_H","left":"S0120_L","right":"S0120_R","back":""}',
  },
  {
    key: 'warrior',
    name: 'Warrior',
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"C67334","hat":"S0280_H","left":"S0400_L","right":"S0400_R","back":""}',
  },
  {
    key: 'hunter',
    name: 'Hunter',
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0280_H","left":"S0260_L","right":"S0050_R","back":"S0260_B"}',
  },
  {
    key: 'farmer',
    name: 'Farmer',
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0070_H","left":"S0010_L","right":"S0010_R","back":"S0010_B"}',
  },
  {
    key: 'forager',
    name: 'Forager',
    avatar: '{"charKey":"mochi_v4","body":"rabbit","mouth":"rabbit","pColor":"FFFFFF","hat":"S0300_H","left":"S0300_L","right":"S0030_R","back":"S0010_B"}',
  },
  {
    key: 'chef',
    name: 'Chef',
    avatar: '{"charKey":"mochi_v4","body":"bear","mouth":"bear","pColor":"C67334","hat":"S0090_H","left":"S0090_L","right":"S0090_R","back":"S0090_B"}',
  },
  {
    key: 'witchdoctor',
    name: 'Witch Doctor',
    avatar: '{"charKey":"mochi_v4","body":"cat","mouth":"cat","pColor":"FCE83F","hat":"S0340_H","left":"S0340_L","right":"S0340_R","back":"S0340_B"}',
  },
]

const $ = (id) => document.getElementById(id)

const els = {
  form: $('launch-form'),
  backendUrl: $('backendUrl'),
  frontendUrl: $('frontendUrl'),
  locale: $('locale'),
  gameId: $('gameId'),
  playerId: $('playerId'),
  playerName: $('playerName'),
  characterKey: $('characterKey'),
  levelId: $('levelId'),
  difficulty: $('difficulty'),
  mapId: $('mapId'),
  questionKey: $('questionKey'),
  collectionName: $('collectionName'),
  collectionImage: $('collectionImage'),
  returnUrl: $('returnUrl'),
  status: $('status'),
  requestPreview: $('request-preview'),
  responsePreview: $('response-preview'),
  redirectPreview: $('redirect-preview'),
  avatarPreview: $('avatar-preview'),
  previewBtn: $('preview-btn'),
  copyUrlBtn: $('copy-url-btn'),
  resetBtn: $('reset-btn'),
}

const safeJson = (value) => JSON.stringify(value, null, 2)

const getCharacter = (key) => characterData.find((entry) => entry.key === key) ?? characterData[0]

const setStatus = (message, isError = false) => {
  els.status.textContent = message
  els.status.style.color = isError ? '#b53328' : '#2f2418'
}

const persistForm = () => {
  const payload = {
    backendUrl: els.backendUrl.value,
    frontendUrl: els.frontendUrl.value,
    locale: els.locale.value,
    gameId: els.gameId.value,
    playerId: els.playerId.value,
    playerName: els.playerName.value,
    characterKey: els.characterKey.value,
    levelId: els.levelId.value,
    difficulty: els.difficulty.value,
    mapId: els.mapId.value,
    questionKey: els.questionKey.value,
    collectionName: els.collectionName.value,
    collectionImage: els.collectionImage.value,
    returnUrl: els.returnUrl.value,
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
}

const restoreForm = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) {
    return
  }
  try {
    const parsed = JSON.parse(raw)
    for (const [key, value] of Object.entries(parsed)) {
      if (els[key] && typeof value === 'string') {
        els[key].value = value
      }
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY)
  }
}

const populateCharacters = () => {
  characterData.forEach((character) => {
    const option = document.createElement('option')
    option.value = character.key
    option.textContent = `${character.name} (${character.key})`
    els.characterKey.appendChild(option)
  })
}

const populateLevels = () => {
  for (let level = 1; level <= 15; level += 1) {
    const option = document.createElement('option')
    option.value = String(level)
    option.textContent = `Level ${level}`
    els.levelId.appendChild(option)
  }
}

const updateTutorialDefaults = () => {
  const isTutorial = els.gameId.value === 'ENDLESS_EXPLORATION_TUTORIAL'
  els.levelId.disabled = isTutorial
  els.difficulty.disabled = false
  if (isTutorial) {
    els.levelId.value = '1'
    els.mapId.value = '1'
    if (!els.questionKey.value || els.questionKey.value === 's010_c020_q040') {
      els.questionKey.value = 's010_c010_q010'
    }
  } else {
    els.mapId.value = els.levelId.value
    if (!els.questionKey.value || els.questionKey.value === 's010_c010_q010') {
      els.questionKey.value = 's010_c020_q040'
    }
  }
}

const updateAvatarPreview = () => {
  const character = getCharacter(els.characterKey.value)
  const avatar = JSON.parse(character.avatar)
  els.avatarPreview.innerHTML = `
    <div class="avatar-badge">${character.name.slice(0, 2).toUpperCase()}</div>
    <div>
      <div><strong>${character.name}</strong></div>
      <div class="muted">${character.key}</div>
      <div class="muted">body=${avatar.body}, mouth=${avatar.mouth}, color=${avatar.pColor}</div>
    </div>
  `
}

const buildTransferBody = () => {
  const character = getCharacter(els.characterKey.value)
  const levelId = els.levelId.value
  const collectionName = els.collectionName.value.trim()
  const collectionImage = els.collectionImage.value.trim()
  return {
    auth: {
      Player: {
        mochiId: els.playerId.value.trim(),
        avatar: character.avatar,
      },
      User: {
        name: els.playerName.value.trim(),
      },
    },
    gameId: els.gameId.value,
    levelId,
    mapId: els.mapId.value.trim() || levelId,
    difficulty: els.difficulty.value,
    questionKey: els.questionKey.value.trim(),
    collectionData: {
      collectionName,
      collectionImage,
    },
    returnUrl: els.returnUrl.value.trim(),
  }
}

const buildRedirectUrl = (token) => {
  const frontendBase = els.frontendUrl.value.trim().replace(/\/+$/, '')
  const locale = els.locale.value.trim() || 'en'
  return `${frontendBase}/${locale}?token=${encodeURIComponent(token)}`
}

const refreshPreview = (responseData = null, token = '') => {
  const requestBody = buildTransferBody()
  const redirectUrl = token ? buildRedirectUrl(token) : ''
  els.requestPreview.textContent = safeJson(requestBody)
  els.responsePreview.textContent = responseData ? safeJson(responseData) : '{}'
  els.redirectPreview.textContent = redirectUrl
}

const validate = (payload) => {
  if (!payload.auth.Player.mochiId) {
    throw new Error('Player ID is required.')
  }
  if (!payload.auth.User.name) {
    throw new Error('Player name is required.')
  }
  if (!payload.returnUrl) {
    throw new Error('Return URL is required.')
  }
  if (!payload.questionKey) {
    throw new Error('Question key is required.')
  }
}

const launch = async () => {
  const backendUrl = els.backendUrl.value.trim().replace(/\/+$/, '')
  const requestBody = buildTransferBody()
  validate(requestBody)
  persistForm()
  refreshPreview()

  setStatus('Sending /auth/transfer request...')

  const response = await fetch(`${backendUrl}/auth/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  const responseData = await response.json().catch(() => ({}))
  const token = typeof responseData?.token === 'string' ? responseData.token : ''
  refreshPreview(responseData, token)

  if (!response.ok || !responseData?.success || !token) {
    const message = responseData?.error || responseData?.message || `Transfer failed with ${response.status}`
    throw new Error(message)
  }

  const redirectUrl = buildRedirectUrl(token)
  setStatus('Transfer succeeded. Redirecting to HG World Frontend...')
  window.location.href = redirectUrl
}

const copyRedirectUrl = async () => {
  const backendUrl = els.backendUrl.value.trim().replace(/\/+$/, '')
  const requestBody = buildTransferBody()
  validate(requestBody)
  persistForm()
  refreshPreview()
  setStatus('Requesting launch token for redirect URL copy...')

  const response = await fetch(`${backendUrl}/auth/transfer`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  const responseData = await response.json().catch(() => ({}))
  const token = typeof responseData?.token === 'string' ? responseData.token : ''
  refreshPreview(responseData, token)

  if (!response.ok || !responseData?.success || !token) {
    const message = responseData?.error || responseData?.message || `Transfer failed with ${response.status}`
    throw new Error(message)
  }

  const redirectUrl = buildRedirectUrl(token)
  await navigator.clipboard.writeText(redirectUrl)
  setStatus('Redirect URL copied to clipboard.')
}

const resetSavedForm = () => {
  localStorage.removeItem(STORAGE_KEY)
  window.location.reload()
}

const handleError = (error) => {
  console.error(error)
  setStatus(error instanceof Error ? error.message : String(error), true)
}

populateCharacters()
populateLevels()
restoreForm()
if (!els.characterKey.value) {
  els.characterKey.value = characterData[0].key
}
if (!els.levelId.value) {
  els.levelId.value = '1'
}
updateTutorialDefaults()
updateAvatarPreview()
refreshPreview()

els.characterKey.addEventListener('change', () => {
  updateAvatarPreview()
  persistForm()
  refreshPreview()
})
els.levelId.addEventListener('change', () => {
  if (els.gameId.value !== 'ENDLESS_EXPLORATION_TUTORIAL') {
    els.mapId.value = els.levelId.value
  }
  persistForm()
  refreshPreview()
})
els.gameId.addEventListener('change', () => {
  updateTutorialDefaults()
  persistForm()
  refreshPreview()
})

;[
  els.backendUrl,
  els.frontendUrl,
  els.locale,
  els.playerId,
  els.playerName,
  els.difficulty,
  els.mapId,
  els.questionKey,
  els.collectionName,
  els.collectionImage,
  els.returnUrl,
].forEach((input) => {
  input.addEventListener('input', () => {
    persistForm()
    refreshPreview()
  })
  input.addEventListener('change', () => {
    persistForm()
    refreshPreview()
  })
})

els.previewBtn.addEventListener('click', () => {
  persistForm()
  refreshPreview()
  setStatus('Payload preview refreshed.')
})

els.copyUrlBtn.addEventListener('click', async () => {
  try {
    await copyRedirectUrl()
  } catch (error) {
    handleError(error)
  }
})

els.resetBtn.addEventListener('click', resetSavedForm)

els.form.addEventListener('submit', async (event) => {
  event.preventDefault()
  try {
    await launch()
  } catch (error) {
    handleError(error)
  }
})
