import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentsInput } from './dto/create-appointments.input';
import { UpdateAppointmentsInput } from './dto/update-appointments.input';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentService: AppointmentsService) { }
  @Post(':id')
  createAppointments(@Param('id') patientId: string, @Body() createAppointmentsInput: CreateAppointmentsInput) {
    return this.appointmentService.createAppointments(patientId, createAppointmentsInput);
  }
  @Post('getAll')
  getAppointments() {
    return this.appointmentService.getAllAppointments();
  }
  @Post('list/:id')
  findAllAppointmentsByPatient(
    @Param('id') patientId: string,
    @Body() body: { term: string, page: number, sortBy: string, sortOrder: 'ASC' | 'DESC' }
  ) {
    const { term = "", page, sortBy, sortOrder } = body;
    return this.appointmentService.getAllAppointmentsByPatient(patientId, term, page, sortBy, sortOrder);

  }
  @Patch('update/:id')
  updateAppointments(
    @Param('id') id: string,
    @Body() updateAppointmentsInput: UpdateAppointmentsInput,
  ) {
    return this.appointmentService.updateAppointment(
      id,
      updateAppointmentsInput,
    );
  }
  @Patch(':id/mark-successful')
  async markAppointmentAsSuccessful(@Param('id') id: string) {

    await this.appointmentService.markAppointmentAsSuccessful(id);
    return { message: 'Appointment marked as successful' };
  }
  @Patch('delete/:id')
  deleteAppointments(@Param('id') id: string) {
    return this.appointmentService.softDeleteAppointment(id);
  }
}
