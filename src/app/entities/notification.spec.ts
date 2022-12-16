import { Content } from "./content"
import { Notification } from "./notification"

describe('Notification', () => { 
    it('deve ser capaz de criar uma notificação', () => {
        const notification = new Notification({
            recipientID: 'example-recipient-ID', 
            content: new Content('Você recebeu uma solicitação de amizade'), 
            category: 'Social'            
        })        
    
        expect(notification).toBeTruthy()
    })     
})