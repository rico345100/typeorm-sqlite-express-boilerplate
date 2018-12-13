import * as express from 'express';
import { getRepository } from 'typeorm';
import { Test } from '../../entities/Test';

const router = express.Router();

router.get('/', async (req, res, next) => {
    const testRepo = getRepository(Test);
    const [data, total] = await testRepo.findAndCount();
    
    res.json({ data, total });
});

router.get('/:title', async(req, res, next) => {
    const { title } = req.params;

    const testRepo = getRepository(Test);
    const data = await testRepo.findOne({
        where: {
            title
        }
    });
    
    res.json(data || {});
});

router.post('/:title/:description', async (req, res, next) => {
    const { title, description } = req.params;

    const testRepo = getRepository(Test);
    const newTest = new Test();
    newTest.title = title;
    newTest.description = description;

    await testRepo.save(newTest)
    
    res.json(newTest);
});

export default router;