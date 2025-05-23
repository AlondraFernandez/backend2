import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { UserModel } from '../models/user.model.js'

export const generateUsersMock = (count) => {
    const users = []
    const hashedPassword = bcrypt.hashSync('coder123', 10)

    for (let i = 0; i < count; i++) {
        users.push({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email().toLowerCase(),
            password: hashedPassword,
            role: faker.helpers.arrayElement(['user', 'admin']),
            cart: null,
        })
    }

    return users
}

export const insertMockData = async (userCount, petCount) => {
    const users = generateUsersMock(userCount)
    const insertedUsers = await UserModel.insertMany(users)
    //  ahora ignoramos pets como ddijo el profe

    return {
        insertedUsers: insertedUsers.length,
        insertedPets: 0,
        message: 'Mock data inserted successfully',
    }
}