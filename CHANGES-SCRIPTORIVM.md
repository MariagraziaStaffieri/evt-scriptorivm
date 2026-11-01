# CHANGES-SCRIPTORIVM

Questo repository è un fork di [evt-project/evt-viewer-angular](https://github.com/evt-project/evt-viewer-angular)
(EVT — Edition Visualization Technology), a partire dal commit
`aecbb3efb21d7b9f24d35705dc2c45997b40af8f` (24 settembre 2026). Licenza, autori e
note di copyright sono quelli del progetto originale (GNU AGPL-3.0, `LICENSE.txt`).
Qui si elencano le migliorie aggiunte, ognuna in un commit a sé, perché EVT
funzioni bene con la codifica TEI. Ognuna è proposta anche al progetto originale.

This repository is a fork of [evt-project/evt-viewer-angular](https://github.com/evt-project/evt-viewer-angular)
(EVT — Edition Visualization Technology), starting from commit
`aecbb3efb21d7b9f24d35705dc2c45997b40af8f` (24 September 2026). Licence, authors and
copyright notices are those of the original project (GNU AGPL-3.0, `LICENSE.txt`).
This file lists the enhancements added, one commit each, so that EVT works well
with TEI encoding. Each one is also proposed to the original project.

Riferimento / reference: TEI P5 Guidelines, version 4.12.0.

---

## 1. Supporto per `lb/@break="no"` / Support for `lb/@break="no"`

**Italiano.**

- *Che cosa fa EVT oggi.* Quando le righe sono rese in linea (flusso «versi» nei
  livelli diplomatico e interpretativo, o prosa senza informazioni di riga),
  `lb.component.html` inserisce sempre uno spazio (`&nbsp;`) al posto di ogni
  `<lb/>`; `LBParser` non legge l'attributo `@break`. Una parola spezzata fra due
  righe e codificata `pala<lb break="no"/>bra` si legge quindi «pala bra».
- *Linee guida TEI.* `<lb>` è descritto in 3.11.3 *Milestone Elements*; il suo
  attributo `@break` viene dalla classe `att.breaking`: con il valore `no`
  l'elemento «is considered not to mark the end of any adjacent orthographic
  token», cioè la parola continua.
  <https://www.tei-c.org/release/doc/tei-p5-doc/en/html/CO.html#CORS5>,
  <https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-lb.html>,
  <https://www.tei-c.org/release/doc/tei-p5-doc/en/html/ref-att.breaking.html>.
- *Miglioria.* `LBParser` legge `@break` e lo conserva nel modello `Lb`; il
  componente non aggiunge lo spazio quando `@break="no"`. Per le edizioni che non
  usano `@break="no"` non cambia niente; la resa a blocchi (una riga per riga, con
  il numero) resta com'è.
- *File.* `src/app/models/evt-models.ts`, `src/app/services/xml-parsers/basic-parsers.ts`,
  `src/app/components/lb/lb.component.ts`, `src/app/components/lb/lb.component.html`;
  prove in `basic-parsers.spec.ts` (nuovo) e `lb.component.spec.ts`.

**English.**

- *What EVT does today.* When lines are rendered inline (the "verses" flow in the
  diplomatic and interpretative levels, or prose without line information),
  `lb.component.html` always inserts a space (`&nbsp;`) for each `<lb/>`;
  `LBParser` does not read `@break`. A word split across two lines and encoded as
  `pala<lb break="no"/>bra` therefore reads "pala bra".
- *TEI Guidelines.* `<lb>` is described in 3.11.3 *Milestone Elements*; its
  `@break` attribute comes from `att.breaking`: with the value `no` the element
  "is considered not to mark the end of any adjacent orthographic token", i.e. the
  word continues (links above).
- *Enhancement.* `LBParser` reads `@break` and keeps it in the `Lb` model; the
  component adds no space when `@break="no"`. Editions that do not use
  `@break="no"` are unaffected; the block rendering (one line per line, with its
  number) is unchanged.
- *Files.* As listed above.
