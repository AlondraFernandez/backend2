const adoptionsMock = [
    { _id: '1', user: 'User A', pet: 'Pet X' },
    { _id: '2', user: 'User B', pet: 'Pet Y' }
];

const adoptionsController = {
    getAllAdoptions: (req, res) => {
        res.status(200).json(adoptionsMock);
    },

    getAdoption: (req, res) => {
        const { aid } = req.params;
        const adoption = adoptionsMock.find(a => a._id === aid);

        if (!adoption) {
            return res.status(404).json({ message: 'Adopción no encontrada' });
        }

        res.status(200).json(adoption);
    },

    createAdoption: (req, res) => {
        const { uid, pid } = req.params;
        const newAdoption = {
            _id: String(Date.now()), 
            user: `Usuario con ID ${uid}`,
            pet: `Mascota con ID ${pid}`
        };

        adoptionsMock.push(newAdoption);
        res.status(201).json({ 
            message: 'Adopción procesada',
            adoption: newAdoption,
            adoptionId: newAdoption._id 
        });
    }
};

export default adoptionsController;