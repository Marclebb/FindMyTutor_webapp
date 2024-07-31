module.exports=(sequelize,DataTypes)=>{
    const users=sequelize.define("users",{
        firstname:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        accounttype:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
    return users;
}