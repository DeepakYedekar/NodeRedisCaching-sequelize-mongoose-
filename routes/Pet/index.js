const route = require('express').Router();
const { getPet,getPetById,addPet,deletePet,updatePet } = require('../../controller/Pet/index');
route.get("/pets", getPet);
route.get("/pets/:id", getPetById);
route.post('/pets',addPet);
route.patch('/pets/:id',updatePet);
route.delete('/pets/:id',deletePet);

module.exports = {
    Pet : route
}