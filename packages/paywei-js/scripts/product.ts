/**
 * Create a product
 * 
 * npm run product create [filename = ./product.json]
 */

import { Paywei } from '@/modules'
import { Prisma, Product } from '@prisma/client'
import fs from 'fs'

const command = process.argv[2] || 'create'
const productFilename = process.argv[3]

const paywei = new Paywei({ apiKey: '', network: 5 })

const main = async () => {
  if (command == 'create') {
    const data = fs.readFileSync(productFilename, 'utf8')
    const product = JSON.parse(data) as Prisma.ProductCreateInput
    console.log('Creating product')
    console.log(JSON.stringify(product, null, 2))
    try {
      const created = await paywei.products.create(product)
      const newProduct = {
        ...product,
        ...created
      }
      console.log('Created', newProduct)
      console.log('Saving')
      fs.writeFileSync(productFilename, JSON.stringify(newProduct, null, 2), 'utf8')
      console.log('Saved')
    } catch(error) {
      console.log(error)
    }
  } else if (command == 'get') {
    const data = fs.readFileSync(productFilename, 'utf8')
    const json = JSON.parse(data) as Product
    console.log('Fetching product')
    try {
      const product = await paywei.products.get(json.id)
      console.log(JSON.stringify(product, null, 2))
    } catch (error) {
      console.log(error)
    }
  } else if (command == 'buildPayment') {
    const data = fs.readFileSync(productFilename, 'utf8')
    const json = JSON.parse(data) as Product
    console.log('Building payment transaction')
    try {
      const product = await paywei.products.get(json.id)
      const tx = product.buildPayment()
      console.log(JSON.stringify(tx, null, 2))
    } catch (error) {
      console.log(error)
    }
  }
}

main()
