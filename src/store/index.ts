import {createStore} from 'vuex'
import {ICompletedSteps} from '@/imports/interfaces/store/ICompletedSteps'
import {IMaterialStep} from '@/imports/interfaces/store/IMaterialStep'

const initialState = () => ({
    materials: {
      mortar: null,
      mortarEmissions: null,
      bricks: null,
      bricksEmissions: null,
      vehicleType: null,
      vehicleTotalTravel: null,
      vehicleEmissions: null,
    },
    materialsStepEmissions: null,
    equipment: [
      {
        "equipmentName": null,
        "poweredBy": null,
        "unitType": null,
        "totalValue": null,
        "transportDistance": null,
        "transportMode": null,
        "emissions": null,
        "completed": false
      }
    ],
    equipmentStepEmissions: null,
    personnel: [
      {
        'vehicleCount': null,
        'transportMode': null,
        'transportModeEmissions': null,
        'transportDistance': null,
        "emissions": null,
        "completed": false
      }
    ],
    personnelStepEmissions: null,
    stepsCompleted: {
      'landing': false,
      'materials': false,
      'equipment': false,
      'personnel': false,
      'personnel-compact': false,
      'personnel-detailed': false,
      'summary': false,
    },
})

const store = createStore({
  state: initialState(),
  getters: {
    getStepsCompleted(state) {
      return state.stepsCompleted
    },
    getMaterials(state) {
      return state.materials
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
  },
  mutations: {
    resetStoreState(state) {
      Object.assign(state, initialState())
    },
    updateStepsCompleted(state, payload) {
      const [index, value] = payload;
      const stepKey: keyof ICompletedSteps = index;
      state.stepsCompleted[stepKey] = value;
    },
    updateMaterials(state, payload) {
      const [index, value] = payload;
      const materialKey: keyof IMaterialStep = index;
      state.materials[materialKey] = value;
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
      const [index, name] = payload;
      state.equipment[index]['unitType'] = name;
    },
    updateEquipmentDataCompletion(state, payload) {
      const [index, value] = payload;
      state.equipment[index]['completed'] = value;
    },
    updateEquipmentEmissions(state, payload) {
      const [index, value] = payload;
      state.equipment[index]['emissions'] = value;
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
    },
    updatePersonnelRowEmissions(state, payload) {
      const [index, value] = payload;
      state.personnel[index]['emissions'] = value;
    },
    updatePersonnelRowDataCompletion(state, payload) {
      const [index, value] = payload;
      state.personnel[index]['completed'] = value;
    },
  },
  actions: {
    resetState({ commit }) {
      commit('resetStoreState')
    },
  }
})

export default store;