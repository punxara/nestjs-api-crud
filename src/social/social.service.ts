import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {EntityManager} from "typeorm";
import {Social} from "./social.entity";
import {SocialDto} from "./dto/social.dto";

@Injectable()
export class SocialService {

    constructor(
        private entityManager: EntityManager,
    ) {
    }

    async create(item: Social): Promise<SocialDto> {
        const entity: Social = new Social();
        entity.platform = item.platform;
        entity.username = item.username;
        entity.link = item.link;
        entity.isPublic = 1;
        return await this.entityManager.save(entity);
    }

    async update(id: number, item: Social): Promise<SocialDto> {

        const entity: Social = await this.entityManager.findOneBy(Social, {id});
        if (!entity) {
            throw new HttpException(`Sorry, movie doesn't exist.`, HttpStatus.BAD_REQUEST,);
        }

        entity.platform = item.platform;
        entity.username = item.username;
        entity.link = item.link;
        entity.isPublic = item.isPublic;

        try {
            return await this.entityManager.transaction(async transactionalEntityManager => {
                    return await transactionalEntityManager.save(entity);
                }
            );
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async changePublicity(id: number, isPublic: {}): Promise<SocialDto> {

        const entity: Social = await this.entityManager.findOneBy(Social, {id});
        if (!entity) {
            throw new HttpException(`Sorry, movie doesn't exist.`, HttpStatus.BAD_REQUEST);
        }

        if (isPublic['isPublic'] === 0) {
            entity.isPublic = 1;
        } else if (isPublic['isPublic'] === 1) {
            entity.isPublic = 0;
        }
        try {
            return await this.entityManager.transaction(async transactionalEntityManager => {
                    return await transactionalEntityManager.save(entity);
                }
            );
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    async get(id: number): Promise<SocialDto> {
        return await this.entityManager.findOneBy(Social, {id: id});
    }

    async getAll(): Promise<SocialDto[]> {
        return await this.entityManager.find(Social);
    }
}
