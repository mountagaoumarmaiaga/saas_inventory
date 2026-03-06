import PublicInvoiceController from './PublicInvoiceController'
import DashboardController from './DashboardController'
import Admin from './Admin'
import ReportController from './ReportController'
import ProductController from './ProductController'
import CategoryController from './CategoryController'
import SubCategoryController from './SubCategoryController'
import StockMovementController from './StockMovementController'
import InvoiceController from './InvoiceController'
import PaymentController from './PaymentController'
import AccountingExportController from './AccountingExportController'
import ClientController from './ClientController'
import EntrepriseSettingsController from './EntrepriseSettingsController'
import DeliveryNoteController from './DeliveryNoteController'
import SupplierController from './SupplierController'
import PurchaseController from './PurchaseController'
import QuoteController from './QuoteController'
import SuperAdmin from './SuperAdmin'
import Settings from './Settings'

const Controllers = {
    PublicInvoiceController: Object.assign(PublicInvoiceController, PublicInvoiceController),
    DashboardController: Object.assign(DashboardController, DashboardController),
    Admin: Object.assign(Admin, Admin),
    ReportController: Object.assign(ReportController, ReportController),
    ProductController: Object.assign(ProductController, ProductController),
    CategoryController: Object.assign(CategoryController, CategoryController),
    SubCategoryController: Object.assign(SubCategoryController, SubCategoryController),
    StockMovementController: Object.assign(StockMovementController, StockMovementController),
    InvoiceController: Object.assign(InvoiceController, InvoiceController),
    PaymentController: Object.assign(PaymentController, PaymentController),
    AccountingExportController: Object.assign(AccountingExportController, AccountingExportController),
    ClientController: Object.assign(ClientController, ClientController),
    EntrepriseSettingsController: Object.assign(EntrepriseSettingsController, EntrepriseSettingsController),
    DeliveryNoteController: Object.assign(DeliveryNoteController, DeliveryNoteController),
    SupplierController: Object.assign(SupplierController, SupplierController),
    PurchaseController: Object.assign(PurchaseController, PurchaseController),
    QuoteController: Object.assign(QuoteController, QuoteController),
    SuperAdmin: Object.assign(SuperAdmin, SuperAdmin),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers