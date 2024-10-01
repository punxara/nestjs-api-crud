import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("social")
export class Social {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    platform: string;

    @Column()
    username: string;

    @Column()
    link: string;

    @Column()
    isPublic: 1 | 0;
}
