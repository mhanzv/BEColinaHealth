import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Patients } from 'src/patients/entities/patients.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('emergencyContacts')
@ObjectType()
export class EmergencyContacts {
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

  @Column()
  @Field()
  phoneNumber: string;

  @Column()
  @Field()
  patientRelationship: string;

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
  countries: string;

  @Column()
  @Field((type) => Int)
  patientId: number;

  @Column({ nullable: true })
  @Field()
  updatedAt: string;

  @Column({ nullable: true })
  @Field()
  createdAt: string;

  @Column({ nullable: true })
  @Field()
  deletedAt: string;

  //Emergency Contact Table with FK patientId from Patients table
  @ManyToOne(() => Patients, (patient) => patient.emergencyContacts)
  @JoinColumn({
    name: 'patientId',
  })
  patient: Patients;
}
