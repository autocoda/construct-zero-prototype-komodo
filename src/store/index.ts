import { createStore } from 'vuex'

const store = createStore({
  state: {
    usedMortar: null,
    usedMortarEmissions: '--',
    usedBricks: null,
    usedBricksEmissions: '--',
    usedVehicleType: null,
    projectTotalTravel: null,
    usedVehicleEmissions: '--',
    materialsStepEmissions: '--',
    equipmentStepEmissions: null,
    usedEquipment: [
      {
        "equipmentName": null,
        "poweredBy": null,
        "unitType": null,
        "totalValue": null,
        "transportDistance": null,
        "transportMode": null
      }
    ],
    stepsCompleted: {
      'landing': false,
      'materials': false,
      'equipment': false,
      'personnel': false,
      'summary': false,
    },
  },
  getters: {
    getUsedMortar(state) {
      return state.usedMortar
    },
    getUsedMortarEmissions(state) {
      return state.usedMortarEmissions
    },
    getUsedBricks(state) {
      return state.usedBricks
    },
    getUsedBricksEmissions(state) {
      return state.usedBricksEmissions
    },
    getUsedVehicleType(state) {
      return state.usedVehicleType
    },
    getProjectTotalTravel(state) {
      return state.projectTotalTravel
    },
    getUsedVehicleEmissions(state) {
      return state.usedVehicleEmissions
    },
    getMaterialsStepEmissions(state) {
      return state.materialsStepEmissions
    },
    getEquipmentStepEmissions(state) {
      return state.equipmentStepEmissions
    },
    getUsedEquipment(state) {
      return state.usedEquipment
    },
    getStepsCompleted(state) {
      return state.stepsCompleted
    }
  },
  mutations: {
    updateUsedMortar(state, payload) {
      state.usedMortar = payload;
    },
    updateUsedMortarEmissions(state, payload) {
      state.usedMortarEmissions = payload;
    },
    updateUsedBricks(state, payload) {
      state.usedBricks = payload
    },
    updateUsedBricksEmissions(state, payload) {
      state.usedBricksEmissions = payload;
    },
    updateUsedVehicleType(state, payload) {
      state.usedVehicleType = payload;
    },
    updateProjectTotalTravel(state, payload) {
      state.projectTotalTravel = payload;
    },
    updateUsedVehicleEmissions(state, payload) {
      state.usedVehicleEmissions = payload;
    },
    updateMaterialsStepEmissions(state, payload) {
      state.materialsStepEmissions = payload;
    },
    updateEquipmentStepEmissions(state, payload) {
      state.equipmentStepEmissions = payload;
    },
    updateUsedEquipment(state, payload) {
      state.usedEquipment.push(payload);
    },
    updateUsedEquipmentUnitName(state, payload) {
      const {index, name} = payload;

      state.usedEquipment[index]['unitType'] = name;
    },
    updatedCompletedSteps(state, payload) {
      state.materialsStepEmissions = payload;
    },
    updateSingleEquipmentByKey(state, [index, value]) {
      state.usedEquipment[index] = value;
    },
    removeSingleEquipmentByKey(state, payload) {
      state.usedEquipment.splice(payload, 1);
    },
  },
})

export default store;