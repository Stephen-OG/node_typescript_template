import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({tableName: "testresults"})
export class TestResult extends Model {
  
@Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    })
    id!: string;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    })
    userId!: string;

  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    })
    courseId!: string;
    
@Column({
    type: DataType.INTEGER,
    allowNull: false,
    })
  score!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    })
  time!: number;

}