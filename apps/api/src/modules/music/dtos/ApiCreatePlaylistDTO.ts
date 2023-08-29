export class ApiCreatePlaylistDTO {
  name: string
  description?: string

  constructor({ description, name }: { name: string, description?: string }) {
    this.description = description
    this.name = name
  }
}
