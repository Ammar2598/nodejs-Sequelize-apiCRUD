module.exports = (sequelize, Datatype) => {
  const Product = sequelize.define("Product", {
    name: {
      type: Datatype.STRING,
      allowNull: false,
    },
    price: {
      type: Datatype.STRING,
      allowNull: false,
    },
  });
  Product.associate = (models) => {
    Product.belongsTo(models.User, {
      onDelete: "cascade",
    });
  };
  return Product;
};
