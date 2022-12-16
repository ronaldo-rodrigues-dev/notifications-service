import { Content } from "./content"

describe('Notification Content', () => { 
    it('deve ser capaz de criar um conteúdo de notificação', () => {
        const content = new Content('Você recebeu uma solicitação de amizade')
    
        expect(content).toBeTruthy()
    }) 
    
    it('não deve ser capaz de criar um conteúdo de notificação com menos de 5 caracteres', () => {    
        expect(() => new Content('Oi')).toThrow()
    }) 
    
    it('não deve ser capaz de criar um conteúdo de notificação com mais de 255 caracteres', () => {    
        expect(() => new Content('a'.repeat(256))).toThrow()
    })
})