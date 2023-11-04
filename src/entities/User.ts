import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column('varchar', {length: 250})
    name: string

    @Column('date')
    dt_nascimento: Date

    @Column('varchar', {length: 250})
    email: string

    @Column('varchar', {length: 400})
    emailToken: string

    @Column('varchar', {length: 250})
    password: string

    @Column('varchar', {length: 11})
    cellphone: string

    @Column('int')
    whatsapp: number

    @Column('varchar', {length: 10})
    phone: string

    @Column('int')
    cep: number

    @Column('varchar', {length: 250})
    adress: string

    @Column('int')
    level: number

    @Column('int')
    status: number    
}