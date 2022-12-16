import { Content } from "./content"

describe('Notification Content', () => { 
    it('should be able to create a notification content', () => {
        const content = new Content('Você recebeu uma solicitação de amizade')
    
        expect(content).toBeTruthy()
    }) 
    
    it('should be able to create a notification content with less than 5 characters', () => {    
        expect(() => new Content('Oi')).toThrow()
    }) 
    
    it('should be able to create a notification content with more than 255 characters', () => {    
        expect(() => new Content('a'.repeat(256))).toThrow()
    })

    // test('It should be able to create a notification content', () => { 
    //     const content = new Content('Você recebeu uma solicitação de amizade') 
    
    //     expect(content).toBeTruthy()
    // }) 
    
    // test('It should be able to create a notification content with less than 5 characters', () => {    
    //     expect(() => new Content('Oi')).toThrow()
    // }) 
    
    // test('It should be able to create a notification content with more than 255 characters', () => {    
    //     expect(() => new Content('a'.repeat(256))).toThrow()
    // })
})