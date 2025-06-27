export class Todo {
    public id: number
    public texto: string
    public completado: boolean

    constructor(id: number, texto: string, completado: boolean) {
        this.texto = texto
        this.id = id
        this.completado = completado
    }
}