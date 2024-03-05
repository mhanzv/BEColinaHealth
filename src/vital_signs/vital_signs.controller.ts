import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { VitalSignsService } from './vital_signs.service';
import { CreateVitalSignInput } from './dto/create-vital_sign.input';
import { UpdateVitalSignInput } from './dto/update-vital_sign.input';

@Controller('vital-signs')
export class VitalSignsController {
    constructor(private readonly vitalSignService: VitalSignsService) { }

    @Post()
    createVitalSign(@Body() createVitalSignInput: CreateVitalSignInput) {
        return this.vitalSignService.createVitalSign(createVitalSignInput);
    }
    @Get()
    getAllVitalSigns() {
        return this.vitalSignService.getAllVitalSign();
    }
    @Get(':id')
    findAllPatientVitalSigns(
        @Param('id') patientId: number,
        @Query('page') page: number,
        @Query('sortBy') sortBy: string,
        @Query('sortOrder') sortOrder: 'ASC' | 'DESC',) {
        return this.vitalSignService.getAllVitalSignsByPatient(patientId, page, sortBy, sortOrder);
    }
    //onClick from prescription- get prescriptionId for patch
    @Patch('update/:id')
    updateVitalSign(@Param('id') id: number, @Body() updateVitalSignInput: UpdateVitalSignInput) {
        return this.vitalSignService.updateVitalSign(id, updateVitalSignInput);
    }

    @Patch('delete/:id')
    softDeleteVitalSign(@Param('id') id: number) {
        return this.vitalSignService.softDeleteVitalSign(id);
    }
}
