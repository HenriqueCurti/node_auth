import { User } from '../entities/User';
import appDataSource from '../database/appDataSource'

export const UserRepository = appDataSource.getRepository(User).extend({
    async findByEmail(email: string){
        return this.createQueryBuilder("user")
        .where("user.email =  :email", { email })
        .getMany()
    },
})