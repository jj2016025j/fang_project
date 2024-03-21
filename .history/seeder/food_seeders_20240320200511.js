var sample_foods = require('./data.js');
var fs = require('fs');

const typeToImageFolder = {
    'hotpot': './picture/鍋類',
    'dumplings': './picture/火鍋餃類',
    'seafood': './picture/海鮮類',
    'vegetable': './picture/蔬菜類',
    'meat': './picture/肉類'
}
const typeToId = {
    'hotpot': 1,
    'dumplings': 5,
    'seafood': 3,
    'vegetable': 4,
    'meat': 2
}

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

// Run migration
const insertFood = (price) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO migrations (name) VALUES ('${migrationName}')
        `;
        connection.query(query, (err) => {
            if (err) {
               resolve(false)
            }else{
                resolve(true)
            }
        });
    })
};


asyncForEach(sample_foods, async (food) => {
    var product_name = food.product.replace('（', '').replace('）', '');
    var type = typeToId[food.type];
    var jpg_path = typeToImageFolder[food.type] + '/' + product_name + '.jpg';
    var png_path = typeToImageFolder[food.type] + '/' + product_name + '.png';
    var image_path = ''
    //check image path exist
    if(await checkImageExist(jpg_path)){
        image_path = jpg_path
    }else if(await checkImageExist(png_path)){
        image_path = png_path
    }

    if(!image_path){
        console.log('Image not found:', food.product)
        console.log(food);
    }else{


    }
})
