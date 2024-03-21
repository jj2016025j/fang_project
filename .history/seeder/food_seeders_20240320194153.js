var sample_foods = require('./data.js');
var fs = require('fs');

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
                resolve(false);
            } else {
                resolve(true);
            }
        })
    })
}

var asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

asyncForEach(sample_foods, async (food) => {
    var product_name = food.product.replace('（', '').replace('）', '');
    var image_path = typeToImageFolder[food.type] + '/' + product_name + '.jpg';

    //check image path exist
    try{
        await checkImageExist(image_path)
    }catch(e){
        console.log(food, e)
    }
})
