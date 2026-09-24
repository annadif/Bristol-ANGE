import './style.css'

type BristolData = {
  name: string
  title: string
  institution: string
  date: string
  eyebrow: string
  footer: string
  standaloneTitle: string
}

const defaults: BristolData = {
  name: 'M. Ahmed Bartchiret',
  title: "Président de l'ANGE",
  institution: 'Agence nationale de gestion des élections',
  date: '24 septembre 2026',
  eyebrow: 'Honneur & protocole',
  footer: 'CÉRÉMONIE OFFICIELLE',
  standaloneTitle: 'Membre du gouvernement',
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="topbar">
    <div class="brand-lockup">
      <div class="brand-mark">B</div>
      <div><span class="eyebrow">Atelier protocolaire</span><strong>Bristol Studio</strong></div>
    </div>
    <div class="topbar-note"><span class="status-dot"></span> Modèle officiel · A4 plié en deux</div>
  </header>

  <main class="workspace">
    <section class="intro">
      <div>
        <p class="kicker">Création de carton nominatif</p>
        <h1>Un accueil qui<br><em>marque la place.</em></h1>
        <p class="intro-copy">Composez un bristol protocolaire net, lisible et prêt à imprimer pour vos cérémonies officielles.</p>
      </div>
      <div class="step-chip"><span>01</span><div><b>Votre modèle</b><small>Renseignez les informations</small></div></div>
    </section>

    <div class="studio-grid">
      <section class="panel form-panel" aria-labelledby="form-title">
        <div class="panel-heading"><div><span class="section-index">01 / INFORMATIONS</span><h2 id="form-title">Personnalisez le bristol</h2></div><span class="edit-icon">✎</span></div>
        <form id="bristol-form">
          <label>Nom et prénom<input id="name" name="name" value="${defaults.name}" autocomplete="name"></label>
          <label>Titre ou fonction<input id="title" name="title" value="${defaults.title}"></label>
          <label>Institution<input id="institution" name="institution" value="${defaults.institution}"></label>
          <label>Date de la cérémonie <span class="optional">optionnel</span><input id="date" name="date" value="${defaults.date}"></label>
          <div class="form-divider"></div>
          <span class="section-index custom-section">TYPE DE BRISTOL</span>
          <div class="format-choice" role="group" aria-label="Type de bristol">
            <label class="format-option"><input type="radio" name="layout" value="details" checked><span>Avec informations</span><small>Nom, fonction, institution</small></label>
            <label class="format-option"><input type="radio" name="layout" value="title-only"><span>Titre seul</span><small>Un titre centré</small></label>
          </div>
          <label>Titre à imprimer seul<input id="standaloneTitle" name="standaloneTitle" value="${defaults.standaloneTitle}"></label>
          <div class="form-divider"></div>
          <span class="section-index custom-section">TEXTES DU BRISTOL</span>
          <label>Texte au-dessus du nom<input id="eyebrow" name="eyebrow" value="${defaults.eyebrow}"></label>
          <label>Texte au bas du bristol<input id="footer" name="footer" value="${defaults.footer}"></label>
          <label class="logo-upload">Logo de l'institution<input id="logo" name="logo" type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml"><span class="file-button">Choisir un logo</span><small id="logo-name">Logo ANGE actuel</small></label>
          <div class="form-divider"></div>
          <div class="format-row"><div><span class="section-index">FORMAT DE LA FEUILLE</span><strong id="format-label">A4 · 2 parties</strong></div><span class="paper-icon">▤</span></div>
          <div class="format-choice" role="group" aria-label="Format de la feuille">
            <label class="format-option"><input type="radio" name="format" value="two" checked><span>2 parties</span><small>Deux faces lisibles</small></label>
            <label class="format-option"><input type="radio" name="format" value="three"><span>3 parties</span><small>2 faces + 1 vide</small></label>
          </div>
          <button class="primary-button" type="button" id="download-pdf"><span>↓</span> Générer le PDF prêt à imprimer</button>
          <p class="helper" id="format-helper">Deux faces identiques sur une feuille A4. Le volet supérieur est retourné pour rester lisible après pliage.</p>
        </form>
      </section>

      <section class="preview-area" aria-labelledby="preview-title">
        <div class="preview-heading"><div><span class="section-index">02 / APERÇU EN DIRECT</span><h2 id="preview-title">Votre bristol</h2></div><div class="preview-tools"><span class="zoom">100 %</span><span class="dots">•••</span></div></div>
        <div class="paper-stage"><div class="a4-sheet" id="a4-sheet">
          <div class="bristol-card"><span class="fold-label" aria-hidden="true"></span><div class="card-content"><img class="preview-logo" src="/logo-ange.png" alt="Logo de l'institution"><div class="card-copy"><span class="card-eyebrow">${defaults.eyebrow}</span><h3 class="preview-name">${defaults.name}</h3><p class="preview-title">${defaults.title}</p><div class="gold-rule"></div><p class="preview-institution">${defaults.institution}</p></div></div><span class="card-foot">${defaults.footer}</span><span class="title-only-text">${defaults.standaloneTitle}</span></div>
          <div class="fold-line" aria-hidden="true"></div>
          <div class="bristol-card"><span class="fold-label" aria-hidden="true"></span><div class="card-content"><img class="preview-logo" src="/logo-ange.png" alt="Logo de l'institution"><div class="card-copy"><span class="card-eyebrow">${defaults.eyebrow}</span><h3 class="preview-name">${defaults.name}</h3><p class="preview-title">${defaults.title}</p><div class="gold-rule"></div><p class="preview-institution">${defaults.institution}</p></div></div><span class="card-foot">${defaults.footer}</span><span class="title-only-text">${defaults.standaloneTitle}</span></div>
          <div class="fold-line second-fold" aria-hidden="true"></div>
          <div class="blank-card"><span>PARTIE VIDE</span></div>
        </div></div>
        <div class="preview-caption"><span><i class="legend-dot"></i> <span id="format-caption">Volet supérieur retourné pour le pliage</span></span><span id="preview-date">${defaults.date}</span></div>
      </section>
    </div>
  </main>
  <footer><span>Bristol Studio</span><span>Conçu pour les cérémonies officielles</span></footer>
`

const form = document.querySelector<HTMLFormElement>('#bristol-form')!
const fields = ['name', 'title', 'institution', 'date', 'eyebrow', 'footer', 'standaloneTitle'] as const
const sheet = document.querySelector<HTMLElement>('#a4-sheet')!

function updateFormat() {
  const selected = document.querySelector<HTMLInputElement>('input[name="format"]:checked')!.value
  const isThreePart = selected === 'three'
  sheet.classList.toggle('format-three', isThreePart)
  document.querySelector<HTMLElement>('#format-label')!.textContent = isThreePart ? 'A4 · 3 parties' : 'A4 · 2 parties'
  document.querySelector<HTMLElement>('#format-helper')!.textContent = isThreePart
    ? 'Deux faces lisibles sur les deux premiers tiers. Le tiers inférieur reste volontairement vide.'
    : 'Deux faces identiques sur une feuille A4. Le volet supérieur est retourné pour rester lisible après pliage.'
  document.querySelector<HTMLElement>('#format-caption')!.textContent = isThreePart
    ? '2 faces lisibles + 1 partie vide'
    : 'Volet supérieur retourné pour le pliage'
}

function updatePreview() {
  const values = Object.fromEntries(fields.map((field) => [field, (document.querySelector<HTMLInputElement>(`#${field}`)!.value || defaults[field])])) as BristolData
  document.querySelectorAll<HTMLElement>('.preview-name').forEach((node) => node.textContent = values.name)
  document.querySelectorAll<HTMLElement>('.preview-title').forEach((node) => node.textContent = values.title)
  document.querySelectorAll<HTMLElement>('.preview-institution').forEach((node) => node.textContent = values.institution)
  document.querySelectorAll<HTMLElement>('.card-eyebrow').forEach((node) => node.textContent = values.eyebrow)
  document.querySelectorAll<HTMLElement>('.card-foot').forEach((node) => node.textContent = values.footer)
  document.querySelectorAll<HTMLElement>('.title-only-text').forEach((node) => node.textContent = values.standaloneTitle)
  document.querySelector<HTMLElement>('#preview-date')!.textContent = values.date
}

function updateLayout() {
  const isTitleOnly = document.querySelector<HTMLInputElement>('input[name="layout"]:checked')!.value === 'title-only'
  sheet.classList.toggle('title-only', isTitleOnly)
  document.querySelector<HTMLElement>('#format-helper')!.textContent = isTitleOnly
    ? 'Seul le titre saisi sera imprimé, centré en grand sur chaque face.'
    : document.querySelector<HTMLInputElement>('input[name="format"]:checked')!.value === 'three'
      ? 'Deux faces lisibles sur les deux premiers tiers. Le tiers inférieur reste volontairement vide.'
      : 'Deux faces identiques sur une feuille A4. Le volet supérieur est retourné pour rester lisible après pliage.'
}

form.addEventListener('input', updatePreview)
form.addEventListener('input', updateLayout)
form.addEventListener('change', updateFormat)
form.addEventListener('change', updateLayout)

document.querySelector<HTMLInputElement>('#logo')!.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.addEventListener('load', () => {
    document.querySelectorAll<HTMLImageElement>('.preview-logo').forEach((image) => image.src = String(reader.result))
    document.querySelector<HTMLElement>('#logo-name')!.textContent = file.name
  })
  reader.readAsDataURL(file)
})

document.querySelector<HTMLButtonElement>('#download-pdf')!.addEventListener('click', async () => {
  const values = Object.fromEntries(fields.map((field) => [field, (document.querySelector<HTMLInputElement>(`#${field}`)!.value || defaults[field])])) as BristolData
  const downloadButton = document.querySelector<HTMLButtonElement>('#download-pdf')!
  downloadButton.disabled = true
  downloadButton.innerHTML = '<span>…</span> Préparation du PDF'
  const [{ jsPDF }, { default: html2canvas }] = await Promise.all([import('jspdf'), import('html2canvas')])
  await document.fonts.ready
  const canvas = await html2canvas(sheet, {
    backgroundColor: '#f8f5ed',
    scale: 2,
    useCORS: true,
  })
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297)
  pdf.save(`bristol-${values.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'officiel'}.pdf`)
  downloadButton.disabled = false
  downloadButton.innerHTML = '<span>↓</span> Générer le PDF prêt à imprimer'
})
