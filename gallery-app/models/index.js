const Gallery = require("./Gallery");
const Painting = require("./Painting");


Gallery.hasMany(Painting, {
    foreignKey: 'gallery_id'
});

module.exports = {
    Gallery,
    Painting
}