var sample_foods = require('./data.js');

const typeToImageFolder = {
    'hotpot': './picture/鍋類',
    'dumplings': './picture/火鍋餃類',
    'seafood': './picture/海鮮類',
    'vegetable': './picture/蔬菜類',
    'meat': './picture/肉類'
}
console.log(sample_foods);

sample_foods.forEach((food) => {
    var image_path = typeToImageFolder[food.type] + '/' + food.product + '.jpg';
    console.log(image_path);
})