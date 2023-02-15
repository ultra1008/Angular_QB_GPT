var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var badge = new mongoose.Schema({
    vendor: { type: Boolean, default: false },
    vendor_id: { type: Boolean, default: false },
    customer_id: { type: Boolean, default: false },
    invoice: { type: Boolean, default: false },
    p_o: { type: Boolean, default: false },
    invoice_date: { type: Boolean, default: false },
    due_date: { type: Boolean, default: false },
    order_date: { type: Boolean, default: false },
    ship_date: { type: Boolean, default: false },
    terms: { type: Boolean, default: false },
    total: { type: Boolean, default: false },
    invoice_total: { type: Boolean, default: false },
    tax_amount: { type: Boolean, default: false },
    tax_id: { type: Boolean, default: false },
    sub_total: { type: Boolean, default: false },
    amount_due: { type: Boolean, default: false },
    receiving_date: { type: Boolean, default: false },
    job_number: { type: Boolean, default: false },
    notes: { type: Boolean, default: false },
    contract_number: { type: Boolean, default: false },
    account_number: { type: Boolean, default: false },
    delivery_address: { type: Boolean, default: false },
    discount: { type: Boolean, default: false },
    packing_slip: { type: Boolean, default: false },
    receiving_slip: { type: Boolean, default: false },
});
var badgeValue = {
    vendor: false,
    vendor_id: false,
    customer_id: false,
    invoice: false,
    p_o: false,
    invoice_date: false,
    due_date: false,
    order_date: false,
    ship_date: false,
    terms: false,
    total: false,
    invoice_total: false,
    tax_amount: false,
    tax_id: false,
    sub_total: false,
    amount_due: false,
    receiving_date: false,
    job_number: false,
    notes: false,
    contract_number: false,
    account_number: false,
    delivery_address: false,
    discount: false,
    packing_slip: false,
    receiving_slip: false,
};

var invoice_notes = new mongoose.Schema({
    notes: { type: String, default: "" },
    created_at: { type: Number },
    created_by: { type: mongoose.ObjectId },
    updated_at: { type: Number },
    updated_by: { type: mongoose.ObjectId },
    is_delete: { type: Number, default: 0 },
});

var invoice_history_Schema = new Schema({
    assign_to: { type: mongoose.ObjectId, default: "" },
    vendor: { type: mongoose.ObjectId, default: "" },
    vendor_id: { type: String, default: "" },
    customer_id: { type: String, default: "" },
    invoice: { type: String, default: "" },
    p_o: { type: String, default: "" },
    invoice_date: { type: String, default: "" },
    due_date: { type: String, default: "" },
    order_date: { type: String, default: "" },
    ship_date: { type: String, default: "" },
    terms: { type: String, default: "" },
    total: { type: String, default: "" },
    invoice_total: { type: String, default: "" },
    tax_amount: { type: String, default: "" },
    tax_id: { type: String, default: "" },
    sub_total: { type: String, default: "" },
    amount_due: { type: String, default: "" },
    cost_code: { type: mongoose.ObjectId, default: "" },
    gl_account: { type: String },
    receiving_date: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: { type: String, default: "Pending", enum: ['Pending', 'Approved', 'Rejected', 'Late'] },
    job_number: { type: String, default: "" },
    delivery_address: { type: String, default: "" },
    contract_number: { type: String, default: "" },
    account_number: { type: String, default: "" },
    discount: { type: String, default: "" },
    pdf_url: { type: String, default: "" },
    items: { type: Array, default: [] },
    packing_slip: { type: String, default: "" },
    receiving_slip: { type: String, default: "" },

    badge: { type: badge, default: badgeValue },
    invoice_notes: { type: [invoice_notes], default: [] },
    invoice_attachments: { type: Array, default: [] },

    created_by: { type: mongoose.ObjectId, default: "" },
    created_at: { type: Number, default: 0 },
    updated_by: { type: mongoose.ObjectId, default: "" },
    updated_at: { type: Number, default: 0 },
    is_delete: { type: Number, default: 0 },

    history_created_at: { type: Number, default: 0 },
    history_created_by: { type: mongoose.ObjectId, default: "" },
    action: { type: String, enum: ["Insert", "Update", "Delete", "Insert Note", "Update Note", "Delete Note", "Update Attachment"] },
    taken_device: { type: String, default: "Web", enum: ["Mobile", "Web"] },
    invoice_id: { type: mongoose.ObjectId, default: "" }
});

module.exports = invoice_history_Schema;
