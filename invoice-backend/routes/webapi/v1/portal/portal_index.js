var express = require('express');
var router = express.Router();
var common = require("./../../../../controller/common/common");

var authController = require('./auth/authController');
var authValidation = require('./auth/authValidation');
router.post('/webapi/v1/login', authValidation.login, authController.login);
router.post('/webapi/v1/changepassword', authValidation.changePasswordValidation, authController.changepassword);
router.post('/webapi/v1/savelogindetails', common.checkTokenExistOrNot, authController.savelogindetails);
router.post('/webapi/v1/userlogout', authController.userlogout);
router.post('/webapi/v1/sponsorforgetpassword', authController.sponsorforgetpassword);
router.post('/webapi/v1/senduserpassword', authValidation.sendUserPasswordValidation, authController.sendUserPassword);
router.post('/webapi/v1/getcompanysetting', authValidation.getCompanySetting, authController.getCompanySetting);
router.post('/webapi/v1/sendsupplierotp', authValidation.sendSupplierOTP, authController.sendSupplierOTP);
router.post('/webapi/v1/submitemailotp', authValidation.submitEmailOTP, authController.submitEmailOTP);

var companySizeController = require('./company_size/companySizeController');
var companySizeValidation = require('./company_size/companySizeValidation');
router.post('/webapi/v1/getcompanysizeocpr', companySizeController.getCompanySizeOcpr);
router.get('/webapi/v1/getcompanysize', common.checkTokenExistOrNot, companySizeController.getCompanySize);
router.post('/webapi/v1/savecompanysize', common.checkTokenExistOrNot, companySizeValidation.saveCompanySize, companySizeController.saveCompanySize);
router.post('/webapi/v1/deletecompanysize', common.checkTokenExistOrNot, companySizeValidation.deleteCompanySize, companySizeController.deleteCompanySize);
router.post('/webapi/v1/importcompanysize', common.checkTokenExistOrNot, companySizeController.importCompanySize);
router.get('/webapi/v1/exportcompanysize', common.checkTokenExistOrNot, companySizeController.exportCompanySize);



var companyTypeController = require('./company_type/companyTypeController');
var companyTypeValidation = require('./company_type/companyTypeValidation');
router.post('/webapi/v1/getcompanytypeocpr', companyTypeController.getCompanyTypeOcpr);
router.get('/webapi/v1/getcompanytype', common.checkTokenExistOrNot, companyTypeController.getCompanyType);
router.post('/webapi/v1/savecompanytype', common.checkTokenExistOrNot, companyTypeValidation.saveCompanyType, companyTypeController.saveCompanyType);
router.post('/webapi/v1/deletecompanytype', common.checkTokenExistOrNot, companyTypeValidation.deleteCompanyType, companyTypeController.deleteCompanyType);
router.post('/webapi/v1/importcompanytype', common.checkTokenExistOrNot, companyTypeController.importCompanyType);
router.get('/webapi/v1/exportcompanytype', common.checkTokenExistOrNot, companyTypeController.exportCompanyType);



var companyCodeController = require('./company_code/companyCodeController');
var companyCodeValidation = require('./company_code/companyCodeValidation');
router.post('/webapi/v1/getcompanycodeocpr', companyCodeValidation.getCompanyCodeOcpr, companyCodeController.getCompanyCodeOcpr);
router.get('/webapi/v1/getcompanycode', common.checkTokenExistOrNot, companyCodeController.getCompanyCode);
router.post('/webapi/v1/savecompanycode', common.checkTokenExistOrNot, companyCodeValidation.saveCompanyCode, companyCodeController.saveCompanyCode);
router.post('/webapi/v1/deletecompanycode', common.checkTokenExistOrNot, companyCodeValidation.deleteCompanyCode, companyCodeController.deleteCompanyCode);
router.post('/webapi/v1/getdatatablecompanycode', common.checkTokenExistOrNot, companyCodeController.getCompanyCodeDatatables);
router.post('/webapi/v1/getonecompanycode', common.checkTokenExistOrNot, companyCodeController.getOneCompanyCode);
router.post('/webapi/v1/importcompnaycode', common.checkTokenExistOrNot, companyCodeController.importCompnayCode);
router.get('/webapi/v1/exportcompnaycode', common.checkTokenExistOrNot, companyCodeController.exportcompnaycode);


var companyMinorityCodeController = require('./company_minority_code/companyMinorityCodeController');
var companyMinorityCodeValidation = require('./company_minority_code/companyMinorityCodeValidation');
router.post('/webapi/v1/getcompanyminoritycodeocpr', companyMinorityCodeController.getCompanyMinorityCodeOCPR);
router.get('/webapi/v1/getcompanyminoritycode', companyMinorityCodeController.getCompanyMinorityCode);
router.post('/webapi/v1/savecompanyminoritycode', common.checkTokenExistOrNot, companyMinorityCodeValidation.saveCompanyMinorityCode, companyMinorityCodeController.saveCompanyMinorityCode);
router.post('/webapi/v1/deletecompanyminoritycode', common.checkTokenExistOrNot, companyMinorityCodeValidation.deleteCompanyMinorityCode, companyMinorityCodeController.deleteCompanyMinorityCode);
router.post('/webapi/v1/importminoritytype', common.checkTokenExistOrNot, companyMinorityCodeController.importMinorityType);
router.get('/webapi/v1/exportminoritytype', common.checkTokenExistOrNot, companyMinorityCodeController.exportMinorityType);


var saveAttechment = require("./../../../../controller/common/saveAttechment");
router.post('/webapi/v1/saveimagesinwasabiv2', saveAttechment.saveImagesInWasabiV2);
router.post('/webapi/v1/saveAttechment', saveAttechment.saveAttechment);
router.post('/webapi/v1/saveAttechmentv2', saveAttechment.saveAttechmentV2);

var signatureUpload = require("./../../../../controller/common/signatureUpload");
router.post('/webapi/v1/savesignaturewasabiv2', signatureUpload.saveSignatureWasabiv2);

var csiDivisionController = require("./csi_division/csiDivisionController");
var csiDivisionValidation = require("./csi_division/csiDivisionValidation");
router.post('/webapi/v1/getcsidivisionocpr', csiDivisionController.getCSIDivisionOcpr);
router.get('/webapi/v1/getcsidivision', common.checkTokenExistOrNot, csiDivisionController.getCSIDivision);
router.post('/webapi/v1/savecsidivision', common.checkTokenExistOrNot, csiDivisionValidation.saveCSIDivision, csiDivisionController.saveCSIDivision);
router.post('/webapi/v1/deletecsidivision', common.checkTokenExistOrNot, csiDivisionValidation.deleteCSIDivision, csiDivisionController.deleteCSIDivision);
router.post('/webapi/v1/importcsidivision', common.checkTokenExistOrNot, csiDivisionController.importCSIDivision);
router.get('/webapi/v1/exportcsidivision', common.checkTokenExistOrNot, csiDivisionController.exportCSIDivision);

var documentTypeController = require("./document_types/documentTypesController");
var documentTypeValidation = require("./document_types/documentTypesValidation");
router.get('/webapi/v1/getdocumenttype', common.checkTokenExistOrNot, documentTypeController.getDocumentType);
router.post('/webapi/v1/savedocumenttype', common.checkTokenExistOrNot, documentTypeValidation.saveDocumentType, documentTypeController.saveDocumentType);
router.post('/webapi/v1/deletedocumenttype', common.checkTokenExistOrNot, documentTypeValidation.deleteDocumentType, documentTypeController.deleteDocumentType);
router.post('/webapi/v1/getdocumenttypeocpr', documentTypeController.getDocumentTypeOcpr);
router.post('/webapi/v1/importdocumenttype', documentTypeController.importDocumentType);
router.get('/webapi/v1/exportdocumenttype', documentTypeController.exportDocumentType);

var company_othersettingController = require("./company_othersetting/company_othersettingController");
var company_othersettingValidation = require("./company_othersetting/company_othersettingValidation");
router.get('/webapi/v1/compnayinformation', common.checkTokenExistOrNot, company_othersettingController.compnayinformation);
router.get('/webapi/v1/portal/compnaysmtp', common.checkTokenExistOrNot, company_othersettingController.compnaysmtp);
router.post('/webapi/v1/editcompany', common.checkTokenExistOrNot, company_othersettingController.editCompany);
router.post('/webapi/v1/compnayupdatesmtp', common.checkTokenExistOrNot, company_othersettingValidation.smtpUpdateValidation, company_othersettingController.compnayupdatesmtp);
router.post('/webapi/v1/compnayverifysmtp', common.checkTokenExistOrNot, company_othersettingValidation.smtpUpdateValidation, company_othersettingController.compnayverifysmtp);
router.post('/webapi/v1/sendiframecode', common.checkTokenExistOrNot, company_othersettingValidation.sendIframeCode, company_othersettingController.sendIframeCode);
router.get('/webapi/v1/portal/compnayusage', common.checkTokenExistOrNot, company_othersettingController.compnayUsage);

var employeeController = require('./employee/employeeController');
var employeeValidation = require('./employee/employeeValidation');
router.get('/webapi/v1/portal/getalluserlist', common.checkTokenExistOrNot, employeeController.getAllUserList);
router.post('/webapi/v1/portal/getspecificusers', common.checkTokenExistOrNot, employeeController.getSpecificUsers);
router.post('/webapi/v1/portal/saveemployee', common.checkTokenExistOrNot, employeeController.saveEmployee);
router.post('/webapi/v1/portal/saveuserdocument', common.checkTokenExistOrNot, employeeController.saveUserDocument);
router.post('/webapi/v1/portal/getuserdocumenthistory', common.checkTokenExistOrNot, employeeController.getUserDocumentHistory);
router.get('/webapi/v1/portal/getalluser', common.checkTokenExistOrNot, employeeController.getAllUser);
router.post('/webapi/v1/portal/getalluserhistory', common.checkTokenExistOrNot, employeeController.getAllUserHistory);
router.post('/webapi/v1/portal/getoneuser', common.checkTokenExistOrNot, employeeController.getOneUser);
router.post('/webapi/v1/portal/savepersonalinfo', common.checkTokenExistOrNot, employeeController.savePersonalInfo);
router.post('/webapi/v1/portal/savemobilephoto', common.checkTokenExistOrNot, employeeController.saveMobilePhoto);
router.post('/webapi/v1/portal/savecontactinfo', common.checkTokenExistOrNot, employeeController.saveContactInfo);
router.post('/webapi/v1/portal/saveemployeeinfo', common.checkTokenExistOrNot, employeeController.saveEmployeeInfo);
router.post('/webapi/v1/portal/deleteteammember', common.checkTokenExistOrNot, employeeController.deleteTeamMember);
router.get('/webapi/v1/portal/getallsupervisors', common.checkTokenExistOrNot, employeeController.getallsupervisors);
router.post('/webapi/v1/portal/sendappinvitation', common.checkTokenExistOrNot, employeeValidation.sendAppInvitationValidation, employeeController.sendappinvitation);
router.post('/webapi/v1/portal/senddocumentexpiration', common.checkTokenExistOrNot, employeeValidation.sendDocumentExpirationValidation, employeeController.senddocumentexpiration);
router.post('/webapi/v1/portal/saveusersignature', common.checkTokenExistOrNot, employeeValidation.saveSignatureValidation, employeeController.savesignature);
router.get('/webapi/v1/portal/tempAddUserAsProjectProjectWorker', common.checkTokenExistOrNot, employeeController.tempAddUserAsProjectProjectWorker);
router.post('/webapi/v1/portal/updateshowidcardflag', common.checkTokenExistOrNot, employeeValidation.userIdCardFlagUpdateValidation, employeeController.updateShowIDCardFlag);
// router.post('/webapi/v1/portal/getsupplierprojectofuserdatatables', common.checkTokenExistOrNot, employeeController.getSupplierProjectOfUserDatatables);
router.post('/webapi/v1/portal/getallemployeereport', common.checkTokenExistOrNot, employeeController.getAllEmployeeReport);
router.post('/webapi/v1/portal/importemployees', common.checkTokenExistOrNot, employeeController.importEmployees);
router.post('/webapi/v1/portal/checkandinsertimportdata', common.checkTokenExistOrNot, employeeController.checkAndInsertImportData);
router.get('/webapi/v1/portal/getarchiveteams', common.checkTokenExistOrNot, employeeController.getarchiveteams);
router.post('/webapi/v1/portal/recoverteam', common.checkTokenExistOrNot, employeeController.recoverteam);

let employeeCron = require("./employee/employeeCron");
router.post('/webapi/v1/portal/userdocumentexpiryalert', common.checkTokenExistOrNot, employeeCron.userDocumentExpiryAlert);
router.post('/webapi/v1/portal/useremergencycontactalertcron', common.checkTokenExistOrNot, employeeCron.userEmergencyContactAlertCron);

let payrollgroupController = require("./payrollgroup/payrollgroupController");
let payrollgroupValidation = require("./payrollgroup/payrollgroupValidation");
router.get('/webapi/v1/portal/getAllpayroll_group', common.checkTokenExistOrNot, payrollgroupController.getAllpayroll_group);
router.post('/webapi/v1/portal/savepayrollgroup', common.checkTokenExistOrNot, payrollgroupValidation.payrollgroupValidation, payrollgroupController.savePayrollgroup);
router.post('/webapi/v1/portal/deletepayrollgroup', common.checkTokenExistOrNot, payrollgroupValidation.payrollgroupDeleteValidation, payrollgroupController.deletePayrollgroup);

let jobtypeController = require('./jobtype/jobtypeController');
let jobtypeValidation = require('./jobtype/jobtypeValidation');
router.get('/webapi/v1/portal/getAlljobtype', common.checkTokenExistOrNot, jobtypeController.getAlljob_type);
router.post('/webapi/v1/portal/savejobtype', common.checkTokenExistOrNot, jobtypeValidation.jobTypeValidation, jobtypeController.savejobtype);
router.post('/webapi/v1/portal/deletejobtype', common.checkTokenExistOrNot, jobtypeValidation.jobTypeDeleteValidation, jobtypeController.deletejobtype);

let jobtitleController = require('./job_title/jobtitleController');
let jobtitleValidation = require('./job_title/jobtitleValidation');
router.get('/webapi/v1/portal/getAlljobtitle', common.checkTokenExistOrNot, jobtitleController.getAlljob_title);
router.post('/webapi/v1/portal/savejobtitle', common.checkTokenExistOrNot, jobtitleValidation.jobtitleValidation, jobtitleController.saveJobTitle);
router.post('/webapi/v1/portal/deletejobtitle', common.checkTokenExistOrNot, jobtitleValidation.jobtitleDeleteValidation, jobtitleController.deleteJobTitle);

var departmentController = require("./department/departmentController");
var departmentValidation = require("./department/departmentValidation");
router.get('/webapi/v1/portal/getalldepartment', common.checkTokenExistOrNot, departmentController.getalldepartment);
router.post('/webapi/v1/portal/savedepartment', common.checkTokenExistOrNot, departmentValidation.departmentValidation, departmentController.savedepartment);
router.post('/webapi/v1/portal/deletedepartment', common.checkTokenExistOrNot, departmentValidation.departmentDeleteValidation, departmentController.deleteDepartment);

var documenttypeController = require('./documenttype/documenttypeController');
var documenttypeValidation = require('./documenttype/documenttypeValidation');
router.get('/webapi/v1/portal/getalldoctype', common.checkTokenExistOrNot, documenttypeController.getalldoctype);
router.post('/webapi/v1/portal/savedoctype', common.checkTokenExistOrNot, documenttypeValidation.documentTypeValidation, documenttypeController.saveDocType);
router.post('/webapi/v1/portal/deletedoctype', common.checkTokenExistOrNot, documenttypeValidation.documentTypeDeleteValidation, documenttypeController.deleteDocType);

let rolespermissionController = require("./roles/rolesandpermissionController");
router.get('/webapi/v1/portal/getallroles', common.checkTokenExistOrNot, rolespermissionController.getAllRoles);
router.get('/webapi/v1/portal/getallrolespermission', common.checkTokenExistOrNot, rolespermissionController.getAllRoles);
router.post('/webapi/v1/portal/saveRoles', common.checkTokenExistOrNot, rolespermissionController.saveRoles);

var emergencycontactsController = require('./emergency_contacts/emergency_contactsController');
var emergencycontactsValidation = require('./emergency_contacts/emergency_contactsValidation');
router.post('/webapi/v1/portal/saveemergencycontact', common.checkTokenExistOrNot, emergencycontactsValidation.emergencycontactsValidation, emergencycontactsController.saveemergencycontact);
router.post('/webapi/v1/portal/deleteemergencycontact', common.checkTokenExistOrNot, emergencycontactsValidation.emergencycontactsDeleteValidation, emergencycontactsController.deleteemergencycontact);
router.post('/webapi/v1/portal/getemergencycontact', common.checkTokenExistOrNot, emergencycontactsController.getemergencycontact);
router.post('/webapi/v1/portal/sendemergencycontactreminder', common.checkTokenExistOrNot, emergencycontactsValidation.emergencycontactsSendReminderValidation, emergencycontactsController.sendEmergencyContactReminder);

let userDocumentController = require('./document/documentController');
let userDocumentValidation = require('./document/documentValidation');
router.post('/webapi/v1/portal/getuserdocument', common.checkTokenExistOrNot, userDocumentController.getUserDocument);
router.post('/webapi/v1/portal/deleteuserdocument', common.checkTokenExistOrNot, userDocumentValidation.deleteDocumentValidation, userDocumentController.deleteUserDocument);
router.post('/webapi/v1/portal/edituserdocument', common.checkTokenExistOrNot, userDocumentController.editUserDocument);

var locationController = require('./location/locationController');
router.post('/webapi/v1/portal/getalllocation', common.checkTokenExistOrNot, locationController.getAllLocation);
router.get('/webapi/v1/portal/getalllocation', common.checkTokenExistOrNot, locationController.getAll_Location);

let settingsController = require('./settings/settingsController');
let settingsValidation = require('./settings/settingsValidation');
router.post('/webapi/v1/portal/compnayinformation', common.checkTokenExistOrNot, settingsController.compnayinformation);
router.get('/webapi/v1/portal/getallsetting', common.checkTokenExistOrNot, settingsController.getAllSetting);
router.post('/webapi/v1/portal/getupdatesetting', common.checkTokenExistOrNot, settingsController.getUpdateSetting);

let languageController = require("./language/languageController");
let languageValidation = require("./language/languageValidation");
router.get('/webapi/v1/portal/getlanguage', common.checkTokenExistOrNot, languageController.getlanguage);
router.post('/webapi/v1/portal/savelanguage', common.checkTokenExistOrNot, languageValidation.languageValidation, languageController.savelanguage);
router.post('/webapi/v1/portal/deletelanguage', common.checkTokenExistOrNot, languageValidation.languageDeleteValidation, languageController.deletelanguage);

let costCodeController = require('./costcode/costcodeController');
let costCodeValidation = require('./costcode/costCodeValidation');
router.post('/webapi/v1/portal/getallcostcode', common.checkTokenExistOrNot, costCodeValidation.getAllCostCodeValidation, costCodeController.getallcostcode);
router.post('/webapi/v1/portal/getcostcode', common.checkTokenExistOrNot, costCodeValidation.getCostCodeValidation, costCodeController.getcostcode);
router.post('/webapi/v1/portal/savecostcode', common.checkTokenExistOrNot, costCodeValidation.costCodeValidation, costCodeController.savecostcode);
router.post('/webapi/v1/portal/deletecostcode', common.checkTokenExistOrNot, costCodeValidation.costCodeDeleteValidation, costCodeController.deletecostcode);
router.post('/webapi/v1/portal/getcostcodefordatatable', common.checkTokenExistOrNot, costCodeController.getCostCodeForDatatable);
router.post('/webapi/v1/portal/savexlsxcostcode', common.checkTokenExistOrNot, costCodeController.savexlsxcostcode);

let creditcardsettingsController = require("./creditcardsettings/creditcardsettingsController");
let creditcardsettingsValidation = require('./creditcardsettings/creditcardsettingsValidation');
router.get('/webapi/v1/portal/getcreditcardsettings', common.checkTokenExistOrNot, creditcardsettingsController.getcreditcardsettings);
router.post('/webapi/v1/portal/savecreditcardsettings', common.checkTokenExistOrNot, creditcardsettingsValidation.manufacturerValidation, creditcardsettingsController.savecreditcardsettings);
router.post('/webapi/v1/portal/deletecreditcardsettings', common.checkTokenExistOrNot, creditcardsettingsValidation.manufacturerDeleteValidation, creditcardsettingsController.deletecreditcardsettings);

var relationshipsController = require('./relationships/relationshipsController');
var relationshipsValidation = require('./relationships/relationshipsValidation');
router.get('/webapi/v1/portal/getallrelationships', common.checkTokenExistOrNot, relationshipsController.getAllRelationships);
router.post('/webapi/v1/portal/saverelationship', common.checkTokenExistOrNot, relationshipsValidation.relationshipValidation, relationshipsController.saveRelationship);
router.post('/webapi/v1/portal/deleterelationship', common.checkTokenExistOrNot, relationshipsValidation.relationshipDeleteValidation, relationshipsController.deleteRelationship);

let shortcustsController = require("./shortcusts/shortcustsController");
router.get('/webapi/v1/portal/getshortcusts', common.checkTokenExistOrNot, shortcustsController.getusershortcuts);
router.post('/webapi/v1/portal/saveshortcusts', common.checkTokenExistOrNot, shortcustsController.saveusershortcuts);
router.post('/webapi/v1/portal/deleteshortcusts', common.checkTokenExistOrNot, shortcustsController.deleteusershortcuts);

// Location
var locationController = require('./location/locationController');
var locationValidation = require('./location/locationValidation');
router.post('/webapi/v1/portal/getalllocation', common.checkTokenExistOrNot, locationController.getAllLocation);
router.post('/webapi/v1/portal/savelocation', common.checkTokenExistOrNot, locationValidation.locationValidation, locationController.saveLocation);
router.post('/webapi/v1/portal/deletelocation', common.checkTokenExistOrNot, locationValidation.locationDeleteValidation, locationController.deleteLocation);
router.post('/webapi/v1/portal/getonelocation', common.checkTokenExistOrNot, locationValidation.locationDeleteValidation, locationController.getOneLocation);
router.get('/webapi/v1/portal/getalllocation', common.checkTokenExistOrNot, locationController.getAll_Location);
router.post('/webapi/v1/portal/savelocationxslx', common.checkTokenExistOrNot, locationController.saveLocationXslx);
router.post('/webapi/v1/portal/getalllocationhistory', common.checkTokenExistOrNot, locationController.getAllLocationHistory);

let gifLoaderController = require('./gif_loader/gifLoaderController');
let gifLoaderValidation = require('./gif_loader/gifLoaderValidation');
router.post('/webapi/v1/getgifloader', gifLoaderValidation.getGIFLoader, gifLoaderController.getGIFLoader);

let taxRateController = require('./tax_rate/taxRateController');
let taxRateValidation = require('./tax_rate/taxRateValidation');
router.post('/webapi/v1/portal/savetaxrate', common.checkTokenExistOrNot, taxRateValidation.saveTaxRate, taxRateController.saveTaxRate);
router.get('/webapi/v1/portal/gettaxrate', common.checkTokenExistOrNot, taxRateController.getTaxRate);
router.post('/webapi/v1/portal/deletetaxrate', common.checkTokenExistOrNot, taxRateValidation.deleteTaxRate, taxRateController.deleteTaxRate);


let invoice_documentController = require('./invoice_document/documentController');
let invoice_documentValidation = require('./invoice_document/documentValidation');
router.post('/webapi/v1/portal/saveinvoicedocument', common.checkTokenExistOrNot, invoice_documentValidation.saveInvoice_Document, invoice_documentController.saveInvoicedocument);
router.get('/webapi/v1/portal/getinvoicedocument', common.checkTokenExistOrNot, invoice_documentController.getInvoiceDocument);
router.post('/webapi/v1/portal/deleteInvoiceDocument', common.checkTokenExistOrNot, invoice_documentValidation.deleteInvoice_Document, invoice_documentController.deleteInvoiceDocument);

let invoice_termController = require('./invoice_term/termController');
let invoice_termValidation = require('./invoice_term/termValidation');
router.post('/webapi/v1/portal/saveinvoiceterm', common.checkTokenExistOrNot, invoice_termValidation.saveterm, invoice_termController.saveterm);
router.get('/webapi/v1/portal/getinvoiceterm', common.checkTokenExistOrNot, invoice_termController.getterm);
router.post('/webapi/v1/portal/deleteInvoiceterm', common.checkTokenExistOrNot, invoice_termValidation.deleteterm, invoice_termController.deleteinvoiceterm);

let invoice_costcodeController = require('./invoice_cost_code/cost_code.Controller');
let invoice_costcodeValidation = require('./invoice_cost_code/cost_codeValidation');
router.post('/webapi/v1/portal/saveinvoicecostcode', common.checkTokenExistOrNot, invoice_costcodeValidation.savecostcode, invoice_costcodeController.savecostCode);
router.get('/webapi/v1/portal/getinvoicecostcode', common.checkTokenExistOrNot, invoice_costcodeController.getcostCode);
router.post('/webapi/v1/portal/deleteInvoicecostcode', common.checkTokenExistOrNot, invoice_costcodeValidation.deletecostCode, invoice_costcodeController.deleteinvoicecostCode);

let invoice_Controller = require('./invoices/invoice_Controller');
let invoiceValidation = require('./invoices/invoiceValidation');
router.post('/webapi/v1/portal/saveinvoice', common.checkTokenExistOrNot, invoice_Controller.saveinvoice);
router.get('/webapi/v1/portal/getinvoice', common.checkTokenExistOrNot, invoice_Controller.getInvoice);
router.get('/webapi/v1/portal/deleteinvoice', common.checkTokenExistOrNot, invoiceValidation.deleteinvoice, invoice_Controller.deleteInvoice);


let invoiceDashboard = require('./dashboard/dashboardController');
router.get('/webapi/v1/portal/getdashboardcount', common.checkTokenExistOrNot, invoiceDashboard.getdashboardcount);
router.get('/webapi/v1/portal/getdashboardpending', common.checkTokenExistOrNot, invoiceDashboard.pendinginvoice);


let invoice_vendorController = require('./vendor/vendorController');
let invoice_vendorValidation = require('./vendor/vendorValidation');
router.post('/webapi/v1/portal/savevendor', common.checkTokenExistOrNot, invoice_vendorValidation.savevendor, invoice_vendorController.savevendor);
router.get('/webapi/v1/portal/getvendor', common.checkTokenExistOrNot, invoice_vendorController.getvendor);
router.post('/webapi/v1/portal/deletevendor', common.checkTokenExistOrNot, invoice_vendorValidation.deletevendor, invoice_vendorController.deletevendor);
router.post('/webapi/v1/portal/getvendordatatable', common.checkTokenExistOrNot, invoice_vendorValidation.vendordatatable, invoice_vendorController.getvendordatatable);
router.post('/webapi/v1/portal/vendorStatusUpdate', common.checkTokenExistOrNot, invoice_vendorValidation.updateStatus, invoice_vendorController.vendorStatusUpdate);
router.post('/webapi/v1/portal/gethistoryvendordatatable', common.checkTokenExistOrNot, invoice_vendorValidation.vendorhistorydatatable, invoice_vendorController.gethistoryvendordatatable);


let invoice_templateController = require('./template/templateController');
let invoice_templateValidation = require('./template/templateValidation');
router.post('/webapi/v1/portal/savetemplate', common.checkTokenExistOrNot, invoice_templateValidation.saveTemplate, invoice_templateController.savetemplate);
router.get('/webapi/v1/portal/gettemplate', common.checkTokenExistOrNot, invoice_templateController.gettemplate);
router.post('/webapi/v1/portal/deletetemplate', common.checkTokenExistOrNot, invoice_templateValidation.deleteTemplate, invoice_templateController.deleteTemplate);
router.post('/webapi/v1/portal/datatabletemplate', common.checkTokenExistOrNot, invoice_templateValidation.datatableTemplate, invoice_templateController.datatabletemplate);
router.post('/webapi/v1/portal/datatablehistorytemplate', common.checkTokenExistOrNot, invoice_templateValidation.datatablehistoryTemplate, invoice_templateController.historydatatable);

module.exports = router;