module.exports = (sequelize, Datatype) => {
  const Profile = sequelize.define("Profile", {
    firstname: {
      type: Datatype.STRING,
      allowNull: false,
    },
    lastname: {
      type: Datatype.STRING,
      allowNull: false,
    },
    country: {
      type: Datatype.STRING,
      allowNull: false,
    },
  });
  Profile.associate = (models) => {
    Profile.belongsTo(models.User, {
      onDelete: "cascade",
    });
  };
  return Profile;
};
