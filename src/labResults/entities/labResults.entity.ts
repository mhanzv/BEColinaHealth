import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Patients } from 'src/patients/entities/patients.entity';
import LabResultsFiles from '../../labResultsFiles/entities/labResultsFiles.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('labResults')
@ObjectType()
export class LabResults {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  uuid: string;

  @Column({ nullable: true })
  date: string;

  @Column()
  hemoglobinA1c: string;

  @Column()
  fastingBloodGlucose: string;

  @Column()
  totalCholesterol: string;

  @Column()
  ldlCholesterol: string;

  @Column()
  hdlCholesterol: string;

  @Column()
  triglycerides: string;

  @Column()
  @Field((type) => Int)
  patientId: number;

  @Column({ nullable: true })
  labFileId?: number;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  @Field()
  updatedAt: string;

  @CreateDateColumn({ name: 'createdAt', nullable: true })
  @Field()
  createdAt: string;

  @DeleteDateColumn({ name: 'deletedAt', nullable: true })
  @Field()
  deletedAt: string;


  //LabResults Table with FK patientId from Patients table
  @ManyToOne(() => Patients, (patient) => patient.lab_results)
  @JoinColumn({
    name: 'patientId',
  })
  patient: Patients;

  // @OneToOne(() => LabResultsFiles, (file) => file.lab)
  // @JoinColumn({
  //   name: 'labFileId',
  // })
  // labFile?: LabResultsFiles;

  @OneToOne(() => LabResultsFiles, (file) => file.lab)
  @JoinColumn({ name: 'id' }) // Specify the column name for the foreign key
  labFile?: LabResultsFiles;  

  // @JoinColumn({ name: 'labFileId' })
  // @OneToOne(
  //   () => LabResultsFiles,
  //   {
  //     nullable: true
  //   }
  // )
  // public labFile?: LabResultsFiles;
}