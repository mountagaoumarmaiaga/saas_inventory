import EnterpriseController from './EnterpriseController'

const SuperAdmin = {
    EnterpriseController: Object.assign(EnterpriseController, EnterpriseController),
}

export default SuperAdmin