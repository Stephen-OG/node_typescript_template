import { Table, Column, Model, DataType, IsEmail } from 'sequelize-typescript'
import { Options } from './Enums/answer.enum';

@Table({tableName: "questions"})
export class Question extends Model {
  
  @Column({
      type: DataType.UUID,
      primaryKey: true,
      allowNull: false,
      })
      id!: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    })
  courseId!: string;
    
  @Column({
      type: DataType.STRING,
      allowNull: false,
      })
    question!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      })
    A!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      })
    B!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      })
    C!: string;

    @Column({
      type: DataType.STRING,
      allowNull: false,
      })
    D!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    })
  answer!: Options;

  

}