---
type: command
id: git-init
endpoint: /api/actions/run
label: Initiera Git
icon: "🔧"
confirm: true
confirm_message: "Vill du initiera/konfigurera git-repo i REPOSITORY?"
---

# Git Init

Initiera git-repo i REPOSITORY med remote URL.

## Beskrivning

Initierar ett nytt git-repository i REPOSITORY-mappen och konfigurerar remote URL.
Om ett repository redan finns kan remote URL ändras.

## URL-format

| Input | Resultat |
|-------|----------|
| `user/repo` | `git@github.com:user/repo.git` |
| `github.com/user/repo` | `git@github.com:user/repo.git` |
| `git@github.com:user/repo.git` | Oförändrad |
| `https://github.com/user/repo` | Oförändrad |
