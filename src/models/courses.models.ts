import { Table, Column, Model, DataType } from 'sequelize-typescript'

@Table({tableName: "courses"})
export class Course extends Model {
  
@Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    })
    id!: string;
    
@Column({
    type: DataType.STRING,
    allowNull: false,
    })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    })
  code!: string;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    })
  units!: number;

}