"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLocation = exports.editLocation = exports.getLocations = exports.createLocation = void 0;
const locationService = __importStar(require("../services/location.service"));
const createLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // non-null assertion
        const { name, latitude, longitude } = req.body;
        const location = yield locationService.addLocation(userId, name, latitude, longitude);
        res.status(201).json(location);
    }
    catch (error) {
        next(error);
    }
});
exports.createLocation = createLocation;
const getLocations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id; // non-null assertion
        const locations = yield locationService.getUserLocations(userId);
        res.status(200).json(locations);
    }
    catch (error) {
        next(error);
    }
});
exports.getLocations = getLocations;
const editLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locationId = req.params.id;
        const userId = req.user.id; // non-null assertion
        const { name, latitude, longitude } = req.body;
        const updatedLocation = yield locationService.updateLocation(userId, locationId, { name, latitude, longitude });
        if (!updatedLocation)
            return res.status(404).json({ message: "Location not found" });
        res.status(200).json(updatedLocation);
    }
    catch (error) {
        next(error);
    }
});
exports.editLocation = editLocation;
const removeLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const locationId = req.params.id;
        const userId = req.user.id;
        const deletedLocation = yield locationService.deleteLocation(userId, locationId);
        if (!deletedLocation) {
            return res.status(404).json({ message: "Location not found" });
        }
        res.status(200).json({ message: "Location deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.removeLocation = removeLocation;
