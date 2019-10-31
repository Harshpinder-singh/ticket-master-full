const express = require('express')
const router = express.Router()
const customerController = require('../app/controllers/customerController')
const departmentController = require('../app/controllers/departmentController')
const employeeController = require('../app/controllers/employeeController')
const ticketController = require('../app/controllers/ticketController')
const { authenticatorUser } = require('../app/middlewares/authentication')
const userController = require('../app/controllers/userController')


//user
router.post('/register', userController.register)
router.get('/account', authenticatorUser, userController.account)
router.delete('/logout', authenticatorUser, userController.logout)
router.post('/login', userController.login)

//customer
router.get('/customers', authenticatorUser, customerController.list)
router.post('/customers', authenticatorUser, customerController.create)
router.get('/customers/:id', authenticatorUser, customerController.show)
router.put('/customers/:id', authenticatorUser, customerController.update)
router.delete('/customers/:id', authenticatorUser, customerController.destroy)

//department
router.get('/departments', authenticatorUser, departmentController.list)
router.post('/departments', authenticatorUser, departmentController.create)
router.get('/departments/:id', authenticatorUser, departmentController.show)
router.put('/departments/:id', authenticatorUser, departmentController.update)
router.delete('/departments/:id', authenticatorUser, departmentController.destroy)

//employee
router.get('/employees', authenticatorUser, employeeController.list)
router.post('/employees', authenticatorUser, employeeController.create)
router.get('/employees/:id', authenticatorUser, employeeController.show)
router.put('/employees/:id', authenticatorUser, employeeController.update)
router.delete('/employees/:id', authenticatorUser, employeeController.destroy)

//ticket
router.get('/tickets', authenticatorUser, ticketController.list)
router.get('/tickets/:id', authenticatorUser, ticketController.show)
router.put('/ticket/status', authenticatorUser, ticketController.statusChange)
router.post('/tickets', authenticatorUser, ticketController.create)
router.delete('/tickets/soft_delete/:id', authenticatorUser, ticketController.softdDelete)
router.delete('/tickets/:id', authenticatorUser, ticketController.delete)
router.put('/tickets/:id', authenticatorUser, ticketController.update)

module.exports = router