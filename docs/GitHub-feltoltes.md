# GitHub feltöltése magyarul

Ez az útmutató bemutatja, hogyan tudod a helyi `gyula` ágat GitHub-ra feltölteni.

## 1. Git állapot ellenőrzése

A repo könyvtárában futtasd:

```bash
git status --short --branch
```

Ez megmutatja, hogy milyen fájlok módosultak és melyik ágon vagy.

## 2. Remote ellenőrzése

A távoli git címeket így nézheted meg:

```bash
git remote -v
```

Ha már van `origin`, akkor nem kell újra hozzáadni.

## 3. Remote átállítása vagy új remote hozzáadása

Ha a `origin` rossz címet mutat, állítsd át:

```bash
git remote set-url origin https://github.com/gyula1213/puzzletv.git
```

Ha egy másik nevet használnál, például `gyula`:

```bash
git remote add gyula https://github.com/gyula1213/puzzletv.git
```

Ha teljesen törölni akarod a régit:

```bash
git remote remove origin
```

## 4. Commit létrehozása

Ha még nincs commit:

```bash
git add .
git commit -m "Első feltöltés vagy változtatások" 
```

## 5. Feltöltés GitHub-ra

Ha a `origin` a helyes távoli repo, és a helyi ág `gyula`:

```bash
git push -u origin gyula
```

Ha másik remote-ot adtál meg:

```bash
git push -u gyula gyula
```

## 6. Hitelesítés GitHub-on

GitHub már nem fogad el felhasználónév/jelszó párost HTTPS-hez. Két megoldás van:

### HTTPS + személyes hozzáférési token (PAT)

1. Készíts GitHubon PAT-ot a `repo` jogosultsággal.
2. Amikor `git push`-t futtatsz, a felhasználónévhez írd be GitHub felhasználóneved, a jelszóhoz pedig a PAT-ot.

### SSH használata

1. Hozz létre SSH kulcsot, ha még nincs:

```bash
ssh-keygen -t ed25519 -C "email@example.com"
```

2. Másold be a `~/.ssh/id_ed25519.pub` tartalmát GitHub `SSH and GPG keys` oldalára.
3. Állítsd be a remote-ot SSH-re:

```bash
git remote set-url origin git@github.com:gyula1213/puzzletv.git
```

4. Ezután:

```bash
git push -u origin gyula
```

## 7. Gyakori hibaüzenetek

- `remote origin already exists.` – ez akkor van, ha már van `origin` remote.
- `Invalid username or token. Password authentication is not supported for Git operations.` – ez azt jelenti, hogy GitHubon PAT-ra vagy SSH-re van szükség.

## 8. Tippek

- Használj rövid, érthető commit üzenetet.
- Ha még nem hoztál létre repo-t GitHubon, előbb hozd létre a távoli repót.
- Ha később többször szeretnél feltölteni, elég lesz csak `git push origin gyula`.
