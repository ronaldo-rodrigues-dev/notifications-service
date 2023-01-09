import { makeNotification } from "@test/factories/norification-factory"
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-respository-notifications"
import { CountRecipientNotification } from "./count-recipient-notification"

describe('Count Recipient Notification', () => {
    test('deve ser capaz de contar as notificações', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const countRecipientNotification = new CountRecipientNotification(notificationRepository) 

        await notificationRepository.create(makeNotification())
        await notificationRepository.create(makeNotification())        
        await notificationRepository.create(
            makeNotification({ 
                recipientID: 'recipientUUID' 
            })
        )        

        const { count } = await countRecipientNotification.execute({
            recipientID: 'recipientID'
        })        

        expect(count).toEqual(2)         
    }) 
})