"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.getLocations = exports.addLocation = void 0;
const location_1 = __importDefault(require("../models/location"));
const addLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, latitude, longitude } = req.body;
        const userId = req.userId;
        const location = yield location_1.default.create({
            userId,
            name,
            latitude,
            longitude,
        });
        res.status(201).json(location);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add location", error });
    }
});
exports.addLocation = addLocation;
const getLocations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const locations = yield location_1.default.find({ userId });
        res.json(locations);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch locations", error });
    }
});
exports.getLocations = getLocations;
const deleteLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const { id } = req.params;
        const location = yield location_1.default.findOneAndDelete({ _id: id, userId });
        if (!location)
            return res.status(404).json({ message: "Location not found" });
        res.json({ message: "Location deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete location", error });
    }
});
exports.deleteLocation = deleteLocation;
