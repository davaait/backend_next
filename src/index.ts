import express, {Request, Response} from 'express'
export const app = express()
require('dotenv').config()
const port = 8080
app.use(express.json())

export enum HTTP_CODES {
    // positive codes
    OK_200 = 200,
    CREATED_201 = 201,
    NO_CONTENT_204 = 204,
    // negative codes
    BAD_REQUEST_400 = 400,
    NOT_FOUND_400 = 400
}

const db: {products: {id: number; brand: string}[]} = {
    products: [
    {id: 1, brand: 'First'},
    {id: 2, brand: 'Second'},
    {id: 2, brand: 'Second'}
    ]
}

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!!!')
})

app.get('/products', (req: Request, res: Response) => {
    res.send(db.products)
})

app.get('/product/:id', (req: Request, res: Response) => {
    const foundProduct = db.products.find(item => item.id === +req.params.id)
    res.send(foundProduct)
})

app.post('/product', (req: Request, res: Response) => {
    const newProduct = req.body;
    db.products.push(newProduct);
    res.sendStatus(HTTP_CODES.CREATED_201).send(db.products)
})

app.delete('/product/:id', (req: Request, res: Response) => {
    db.products.forEach((item, index) => {
        if(item.id === +req.params.id) {
            db.products.splice(index, 1);
        }
    })
    res.send(db.products)
})

app.get('*', (req: Request, res: Response) => {
    res.send('404 Page Not Found!!!')
})

app.post('/tests/data', (req: Request, res: Response) => {
    res.send('404 Page Not Found!!!')
})

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})