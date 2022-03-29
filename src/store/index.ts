import {createStore} from 'vuex'

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
    equipment: [
      {
        "equipmentName": null,
        "poweredBy": null,
        "unitType": null,
        "totalValue": null,
        "transportDistance": null,
        "transportMode": null
      }
    ],
    equipmentStepEmissions: null,
    personnelStepEmissions: null,
    personnel: [{
      'vehicleCount': null,
      'transportMode': null,
      'transportModeEmissions': '--',
      'transportDistance': null,
    }],
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
    getEquipment(state) {
      return state.equipment
    },
    getPersonnel(state) {
      return state.personnel
    },
    getPersonnelStepEmissions(state) {
      return state.personnelStepEmissions
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
    updateEquipment(state, payload) {
      state.equipment.push(payload);
    },
    updateEquipmentUnitName(state, payload) {
      const {index, name} = payload;
      state.equipment[index]['unitType'] = name;
    },
    updatedCompletedSteps(state, payload) {
      state.materialsStepEmissions = payload;
    },
    updateSingleEquipmentByKey(state, [index, value]) {
      state.equipment[index] = value;
    },
    removeSingleEquipmentByKey(state, payload) {
      state.equipment.splice(payload, 1);
    },
    updatePersonnel(state, payload) {
      state.personnel.push(payload);
    },
    updateSinglePersonnelByKey(state, [index, value]) {
      state.personnel[index] = value;
    },
    updatePersonnelTransportModeName(state, payload) {
      const {index, name} = payload;
      state.personnel[index]['transportMode'] = name;
    },
    removeSinglePersonnelByKey(state, payload) {
      state.personnel.splice(payload, 1);
    },
    updatePersonnelStepEmissions(state, payload) {
      state.personnelStepEmissions = payload;
    }
  },
})

export default store;