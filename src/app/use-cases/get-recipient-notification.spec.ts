import { makeNotification } from "@test/factories/norification-factory"
import { InMemoryNotificationRepository } from "@test/repositories/in-memory-respository-notifications"
import { GetRecipientNotification } from "./get-recipient-notifications"

describe('Get Recipient Notification', () => {
    test('deve ser capaz de obter um lista de notificações', async () => {
        const notificationRepository = new InMemoryNotificationRepository()                
        const getRecipientNotification = new GetRecipientNotification(notificationRepository) 

        await notificationRepository.create(makeNotification({ recipientID: 'recipient_1' }))
        await notificationRepository.create(makeNotification({ recipientID: 'recipient_2' }))
        await notificationRepository.create(makeNotification({ recipientID: 'recipient_1' }))        
        await notificationRepository.create(makeNotification({ recipientID: 'recipient_3' })) 

        const { notifications } = await getRecipientNotification.execute({
            recipientID: 'recipient_1'
        })        

        expect(notifications).toHaveLength(2) 
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientID: 'recipient_1' }), 
                expect.objectContaining({ recipientID: 'recipient_1' }), 
            ])
        ) 
    }) 
})