import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StartupProfile } from "../models/startupProfile.model.js";
import { Founders } from "../models/founders.model.js";
import { hashPassword } from "../utils/hash.js";

// Register a startup
export const registerStartup = asyncHandler(async (req, res) => {
    const {
        name,
        entity_name,
        sector,
        categories,
        year,
        brand_name,
        entityRegistrationStatus,
        stage,
        detailsText,
        size,
        incubation_status,
        startupIndiaRegister,
        reg_number,
        reg_date,
        reg_certificate,
        gst,
        ipr,
        addrLine1,
        addLine2,
        state,
        city,
        district,
        pincode,
        founderName,
        designation,
        mobile,
        address,
        equity,
        password,
        email,
        pitch_deck,
        Aadhar_Number,
        Pan_Number,
        Dipp_number,
    } = req.body;

    // Minimal validation
    if (!name || !founderName || !email || !password || !entity_name || !sector || !categories || !year || !size) {
        throw new ApiError(400, [
            {
                message:
                    "Required fields missing: name, entity_name, sector, categories, year, size, founderName, email, password",
            },
        ]);
    }

    // Check if founder email already exists
    const existingFounder = await Founders.findOne({ email });
    if (existingFounder) {
        throw new ApiError(400, [
            {
                message: "Founder with this email already exists",
            },
        ]);
    }

    const startup = await StartupProfile.create({
        name,
        entity_name,
        sector,
        categories,
        year,
        brand_name,
        entityRegistrationStatus,
        stage,
        detailsText,
        size,
        incubation_status: incubation_status || false,
        isApproved: false,
        startupIndiaRegister: startupIndiaRegister || false,
    });

    // Automatically create founder account linked to the startup
    const hashedPassword = await hashPassword(password);
    const founder = await Founders.create({
        user_id: startup._id,
        name: founderName,
        designation,
        mobile,
        address,
        equity: equity || 0,
        password: hashedPassword,
        email,
    });

    res.status(201).json(
        new ApiResponse(
            201, 
            { 
                startup, 
                founder: { 
                    email: founder.email, 
                    name: founder.name,
                    message: "Login credentials created automatically"
                } 
            }, 
            "Startup and founder account registered successfully"
        )
    );
});
