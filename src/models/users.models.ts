import { Table, Column, Model, DataType, IsEmail } from 'sequelize-typescript'

@Table({tableName: "users"})
export class User extends Model {
  
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
    email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    })
  isAdmin!: boolean;

}