import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {SocialService} from "./social.service";
import {Social} from "./social.entity";

@Controller("social")
export class SocialController {

    constructor(
        private service: SocialService
    ) {
    }

    @Post()
    create(@Body() item: Social): Promise<Social> {
        return this.service.create(item);
    }

    @Put(":id")
    async update(@Param("id") id: number, @Body() item: Social): Promise<Social> {
        return await this.service.update(id, item);
    }

    @Put("change-publicity/:id")
    async changePublicity(@Param("id") id: number, @Body() isPublic: {}): Promise<Social> {
        return await this.service.changePublicity(id, isPublic);
    }

    @Get('get-by-id/:id')
    async get(@Param('id') id: string): Promise<Social> {
        return await this.service.get(+id);
    }

    @Get('get-all-socials')
    getAll(): Promise<Social[]> {
        return this.service.getAll();
    }

    @Delete(':id')
    remove(@Param('id') id: number): Promise<any> {
        return this.service.remove(+id);
    }
}
