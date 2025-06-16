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
exports.deleteLocation = exports.updateLocation = exports.getUserLocations = exports.addLocation = void 0;
const location_model_1 = __importDefault(require("../models/location.model"));
const addLocation = (userId, name, latitude, longitude) => __awaiter(void 0, void 0, void 0, function* () {
    const location = new location_model_1.default({ user: userId, name, latitude, longitude });
    return yield location.save();
});
exports.addLocation = addLocation;
const getUserLocations = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield location_model_1.default.find({ user: userId });
});
exports.getUserLocations = getUserLocations;
const updateLocation = (locationId, userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield location_model_1.default.findOneAndUpdate({ _id: locationId, user: userId }, data, { new: true });
});
exports.updateLocation = updateLocation;
const deleteLocation = (locationId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield location_model_1.default.findOneAndDelete({ _id: locationId, user: userId });
});
exports.deleteLocation = deleteLocation;
