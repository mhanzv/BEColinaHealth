import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Appointment } from 'src/appointment/entities/appointment.entity';
import { Company } from 'src/company/entities/company.entity';
import { EmergencyContact } from 'src/emergency_contact/entities/emergency_contact.entity';
import { LabResults } from 'src/lab_results/entities/lab_result.entity';
import { MedicalHistory } from 'src/medical_history/entities/medical_history.entity';
import { Medication } from 'src/medication/entities/medication.entity';
import { Notes } from 'src/notes/entities/note.entity';
import { VitalSigns } from 'src/vital_signs/entities/vital_sign.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class PatientInformation {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  uuid: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ nullable: true })
  @Field((type) => Int)
  age: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  @Field()
  dateOfBirth: Date;

  @Column()
  @Field()
  gender: string;

  @Column()
  @Field()
  city: string;

  @Column()
  @Field()
  state: string;

  @Column()
  @Field()
  zip: string;

  @Column()
  @Field()
  country: string;

  @Column()
  @Field()
  phoneNo: string;

  @Column()
  @Field()
  allergies: string;

  @Column()
  @Field()
  codeStatus: string;

  @Column({ nullable: true })
  @Field()
  updated_at: string;

  @Column({ nullable: true })
  @Field()
  created_at: string;

  @Column({ nullable: true })
  @Field()
  deleted_at: string;

  //RELATIONAL FIELDS

  //Patient information to table medication
  @OneToMany(() => Medication, (medication) => medication.patient)
  @Field(() => [Medication], { nullable: true })
  medications: Medication[];

  //Patient information to table VitalSigns
  @OneToMany(() => VitalSigns, (vital_signs) => vital_signs.patient)
  @Field(() => [VitalSigns], { nullable: true })
  vital_signs: VitalSigns[];

  //Patient information to table MedicalHistory
  @OneToMany(() => MedicalHistory, (medical_history) => medical_history.patient)
  @Field(() => [MedicalHistory], { nullable: true })
  medical_history: MedicalHistory[];

  //Patient information to table LabResults
  @OneToMany(() => LabResults, (lab_results) => lab_results.patient)
  @Field(() => [LabResults], { nullable: true })
  lab_results: LabResults[];

  //Patient information to table Notes
  @OneToMany(() => Notes, (notes) => notes.patient)
  @Field(() => [Notes], { nullable: true })
  notes: Notes[];

  //Patient information to table Appointment
  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  @Field(() => [Appointment], { nullable: true })
  appointment: Appointment[];

  //Patient information to table Emergency Contact
  @OneToMany(
    () => EmergencyContact,
    (emergency_contact) => emergency_contact.patient,
  )
  @Field(() => [EmergencyContact], { nullable: true })
  emergency_contact: EmergencyContact[];

  //Patient Information with FK patientId from Company table
  @ManyToOne(() => Company, (company) => company.patient)
  @JoinColumn({
    name: 'companyId',
  })
  company: Company;
}