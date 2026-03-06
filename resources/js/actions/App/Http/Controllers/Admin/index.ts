import ExpenseController from './ExpenseController'
import UserController from './UserController'
import ExpenseCategoryController from './ExpenseCategoryController'

const Admin = {
    ExpenseController: Object.assign(ExpenseController, ExpenseController),
    UserController: Object.assign(UserController, UserController),
    ExpenseCategoryController: Object.assign(ExpenseCategoryController, ExpenseCategoryController),
}

export default Admin