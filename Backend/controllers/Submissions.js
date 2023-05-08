const Submission = require("../model/Submission");

const submit = async(req,res) => {
    const {
      sequenceMoleculeType,
        sequencingTechnology,
        visibility,
        researchDefinition,
        submissionCategory,
        contact
    } = req.body;
    try {
        const result = await Submission.create({
            "visibility": visibility,
            "submissionCategory": submissionCategory,
            "sequenceMoleculeType": sequenceMoleculeType,
            "sequencingTechnology": sequencingTechnology,
            "researchDefinition": researchDefinition,
            "contact":contact
        });
        console.log(result);

        res.status(201).json({ success: `New submission ${result} created!` });
    } catch (err) {
         res.status(500).json({ message: err.message });
    }
}

module.exports = { submit };