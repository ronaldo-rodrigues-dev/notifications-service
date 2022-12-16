export class Content {
    private readonly content: string 

    constructor(content: string) { 
        let isContentLengthValid = this.validateContentLength(content)
        if (!isContentLengthValid) {
            throw new Error('Content Erro Length.')
        } 

        this.content = content
    }

    get value(): string {
        return this.content
    } 

    private validateContentLength(content: string): boolean {
        return content.length >=5 && content.length <= 255
    }
}