import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StartupProfile } from "../models/startupProfile.model.js";
import { Founders } from "../models/founders.model.js";

// ----------------------
// Update a startup by founder ID
// ----------------------
export const updateStartup = asyncHandler(async (req, res) => {
    const { id } = req.params; // founder/user ID
    const updateData = req.body;

    if (!Object.keys(updateData).length) {
        throw new ApiError(400, [{ message: "No fields provided to update" }]);
    }

    const updatedStartup = await StartupProfile.findOneAndUpdate(
        { user_id: id },
        updateData,
        { new: true }
    );

    if (!updatedStartup) {
        throw new ApiError(404, [{ message: "Startup not found" }]);
    }

    res.status(200).json(
        new ApiResponse(
            200,
            updatedStartup,
            "Startup profile updated successfully"
        )
    );
});

// ----------------------
// Get all startups
// ----------------------
export const getStartupList = asyncHandler(async (req, res) => {
    const startups = await StartupProfile.find();
    res.status(200).json(
        new ApiResponse(200, startups, "Startups fetched successfully")
    );
});

// ----------------------
// Approve a startup
// ----------------------
export const approveStartup = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const startup = await StartupProfile.findOneAndUpdate(
        { user_id: id },
        { isApproved: true },
        { new: true }
    );

    if (!startup) {
        throw new ApiError(404, [{ message: "Startup not found" }]);
    }

    res.status(200).json(
        new ApiResponse(200, startup, "Startup approved successfully")
    );
});

// ----------------------
// Reject a startup
// ----------------------
export const rejectStartup = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const deletedStartup = await StartupProfile.findOneAndDelete({ user_id: id });

    if (!deletedStartup) {
        throw new ApiError(404, [{ message: "Startup not found" }]);
    }

    res.status(200).json(
        new ApiResponse(200, null, "Startup rejected and deleted successfully")
    );
});

// ----------------------
// Get current startup by founder email
// ----------------------
export const getCurrentStartup = asyncHandler(async (req, res) => {
    // Get email from authenticated user token
    const email = req.user?.email;

    if (!email || typeof email !== "string") {
        throw new ApiError(400, [{ message: "Email is required" }]);
    }

    const founder = await Founders.findOne({ email });

    if (!founder) {
        throw new ApiError(404, [{ message: "Founder not found" }]);
    }

    // Find startup by using the founder's user_id which points to the startup's _id
    const startup = await StartupProfile.findById(founder.user_id);

    if (!startup) {
        throw new ApiError(404, [{ message: "Startup not found" }]);
    }

    res.status(200).json(
        new ApiResponse(200, startup, "Current startup fetched successfully")
    );
});
