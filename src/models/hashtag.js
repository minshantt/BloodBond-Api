module.exports = (sequelize, Datatypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: Datatypes.STRING,
    },
    { underscored: true }
  );
};
