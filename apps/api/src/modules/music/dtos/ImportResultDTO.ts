export class ImportResultDTO {
  exported: number
  saved: number

  constructor({ exported, saved }: { exported: number, saved: number }) {
    this.exported = exported
    this.saved = saved
  }
}
