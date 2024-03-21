var sample_foods = require('./data.js');

const typeToImageFolder = {
    'hotpot': './picture/鍋類',
    'dumplings': './picture/火鍋餃類',
    'seafood': './picture/海鮮類',
    'vegetable': './picture/蔬菜類',
    'meat': './picture/肉類'
}
console.log(sample_foods);

var checkImageExist = (path) => {
    return new Promise((resolve, reject) => {
        fs.access(path, fs.F_OK, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}

sample_foods.forEach((food) => {
    var image_path = typeToImageFolder[food.type] + '/' + food.product + '.jpg';

    //check image path exist
    fs.access(image_path, fs.F_OK, (err) => {

    })

    console.log(image_path);
})