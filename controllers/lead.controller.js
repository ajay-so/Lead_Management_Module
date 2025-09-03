const Lead = require("../model/leadModel");
const applyPagination = require("../utils/pagination");

// Get all leads 
const getAllLeads = async (req, res) => {
    try {
        const { page = 1, limit = 5, status, source, search } = req.query;

        // filter object
        let filter = {};
        if (status) filter.status = status;
        if (source) filter.source = source;
        if (search) {
            filter.$or = [
                { firstName: new RegExp(search, "i") },
                { lastName: new RegExp(search, "i") },
                { email: new RegExp(search, "i") },
                { phone: new RegExp(search, "i") }
            ];
        }

        // apply pagination
        let query = Lead.find(filter);
        query = applyPagination(query, parseInt(page), parseInt(limit));

        // data fetch
        const leads = await query;
        const leadCount = await Lead.countDocuments(filter);

        if (!leadCount) {
            return res.status(404).json({ message: "No leads found" });
        }

        res.status(200).json({
            message: "All leads fetched successfully",
            total: leadCount,
            page: Number(page),
            limit: Number(limit),
            totalPages: Math.ceil(leadCount / limit),
            leads
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Create lead 
const createLead = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, source } = req.body;

        if (!firstName || !lastName || !email || !phone || !source) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newLead = new Lead({ firstName, lastName, email, phone, source });
        const savedLead = await newLead.save();

        res.status(201).json({ message: "Lead created successfully", newLead: savedLead });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update lead 
const updateLead = async (req, res) => {
    try{
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Lead id is required" });
      }

      const result = await Lead.findOneAndUpdate({id : id}, req.body, { new: true });
      if(!result){
        return res.status(404).json({ message: "Lead not found" });
      }

      res.status(200).json({message : "Lead updated successfully", updatedLead : result});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

// Delete lead 
const deleteLead = async (req, res) => {
    try{
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "Lead id is required" });
      }
   
      const deletedLead = await Lead.findOneAndDelete({id});
      
      if(!deletedLead){
        return res.status(404).json({ message: "Lead not found" });
      }

      res.status(200).json({message :"Lead deleted successfully", deletedLead});
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getAllLeads,
    createLead,
    updateLead,
    deleteLead
}