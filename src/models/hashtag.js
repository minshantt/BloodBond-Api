module.exports = (sequelize, Datatypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: {
        type: Datatypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
    },
    { underscored: true }
  );
  return Hashtag;
};
